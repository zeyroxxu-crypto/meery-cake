/* Meery Cake V7 · Lightweight interactive 3D cake + motion direction.
   No external 3D library, no analytics, no customer data transmission.
   3D mesh is projected and shaded locally via the Canvas API. */
(function(){
'use strict';
const $=id=>document.getElementById(id);
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const readMotion=()=>{
 let pref=null;try{pref=localStorage.getItem('meerycake-motion-preference')}catch{}
 return pref==='on'||(pref!=='off'&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
};
const make=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el};
const PALETTES={rose:['#edbdc9','#d18fa4','#fff9f2'],cacao:['#ad7567','#7d4a43','#f8e9d9'],lilas:['#c7bbdf','#9b89c5','#fffbf5'],vanille:['#f3dba6','#d9ae6d','#fff8ef'],bleu:['#a9cada','#6c9ebc','#fffdf9'],vert:['#bbd8b7','#8aaa86','#fffaf2'],rouge:['#d87987','#b55b6c','#fff9f3'],blanc:['#eee6e6','#c5b7bb','#fffdfb']};
const mix=(hex,factor)=>{
 const channels=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));
 const rgba=channels.map(n=>Math.round(clamp(factor>=0?n+(255-n)*factor:n*(1+factor),0,255)));
 return '#'+rgba.map(n=>n.toString(16).padStart(2,'0')).join('');
};
function getPalette(){
 const string=($('cakeColors')?.value||'rose').toLocaleLowerCase('fr');
 const choices=[[/chocolat|cacao|marron|brown|braun|brąz|castanh/, 'cacao'],[/lilas|lavande|violet|purple|fiolet/,'lilas'],[/vanille|jaune|gold|doré|yellow|żółt/,'vanille'],[/bleu|blue|azul|niebies|blauw/,'bleu'],[/vert|green|verde|zielon|groen/,'vert'],[/rouge|red|rojo|rosso|vermelh|rood|czerw/,'rouge'],[/blanc|white|bianco|branco|wit|biał/,'blanc']];
 for(const [test,k] of choices)if(test.test(string))return k;
 return 'rose';
}
function build3D(canvas,{editor=false}={}){
 if(!canvas?.getContext)return null;
 const ctx=canvas.getContext('2d',{alpha:true});
 if(!ctx)return null;
 let rect={w:0,h:0},dpr=1,drag=false,dragOrigin=null,yaw=-.55,pitch=.35,prevTime=0,frame=0,visible=true,disposed=false,renderPending=false;
 let preset='rose',tierCount=2,flowers=false,square=false;
 canvas.style.touchAction='pan-y';
 const status=canvas.closest('.mc7-canvas-shell')?.querySelector('.mc7-rotation-status');
 const refreshConfig=()=>{
  if(!editor)return;
  preset=getPalette();
  const form=($('cakeShape')?.value||'').toLowerCase();
  tierCount=/étage|tier|piani|andares|lagen|piętr/.test(form)?3:2;
  square=/carr|square|quadr|kwadrat|vierkant/.test(form);
  const theme=(($('cakeNotes')?.value||'')+' '+($('cakeOccasion')?.value||'')).toLowerCase();
  flowers=/fleur|flor|flower|blumen|bloem|kwiat|mariage|wedding|boda|hochzeit|ślub/.test(theme);
 };
 function resize(){
  const b=canvas.getBoundingClientRect();if(!b.width||!b.height)return false;
  const w=Math.round(b.width),h=Math.round(b.height),pixelRatio=clamp(devicePixelRatio||1,1,2);
  if(rect.w!==w||rect.h!==h||dpr!==pixelRatio){
   rect={w,h};dpr=pixelRatio;canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);
   ctx.setTransform(dpr,0,0,dpr,0,0)
  }
  return true;
 }
 function project([x,y,z]){
  const cy=Math.cos(yaw),sy=Math.sin(yaw),cp=Math.cos(pitch),sp=Math.sin(pitch);
  const X=x*cy-z*sy,Z=x*sy+z*cy,Y=y*cp-Z*sp,depth=Z*cp+y*sp;
  const perspective=6.4/(6.4-depth);
  const zoom=Math.min(rect.w/4.7,rect.h/3.95);
  return {x:rect.w*.5+X*perspective*zoom,y:rect.h*.55-Y*perspective*zoom,depth,scale:perspective*zoom};
 }
 function poly(points,fill,stroke,priority=0){
  const projections=points.map(project);
  return {depth:projections.reduce((s,p)=>s+p.depth,0)/projections.length+priority,fill,stroke,points:projections}
 }
 function tier(polys,base,r,y0,y1,detail=32){
  // Side faces plus the top surface triangulation in genuine perspective.
  for(let i=0;i<detail;i++){
   const a=i/detail*Math.PI*2,b=(i+1)/detail*Math.PI*2,mid=(a+b)/2;
   const x1=Math.cos(a)*r,z1=Math.sin(a)*r,x2=Math.cos(b)*r,z2=Math.sin(b)*r;
   const normal=clamp((Math.cos(mid+yaw)*.56+Math.sin(mid+yaw)*.32)+.1,-.8,.8);
   const side=mix(base[0],normal*.19-.10);
   const top=mix(base[0],.24);
   polys.push(poly([[x1,y0,z1],[x2,y0,z2],[x2,y1,z2],[x1,y1,z1]],side,mix(base[1],.08),.002));
   polys.push(poly([[0,y1,0],[x1,y1,z1],[x2,y1,z2]],top,top,.001));
  }
  // Icing band and scallops wrap around the cake.
  for(let i=0;i<detail;i++){
   const a=i/detail*Math.PI*2,b=(i+1)/detail*Math.PI*2;
   const x1=Math.cos(a)*r*1.014,z1=Math.sin(a)*r*1.014,x2=Math.cos(b)*r*1.014,z2=Math.sin(b)*r*1.014;
   polys.push(poly([[x1,y1-.12,z1],[x2,y1-.12,z2],[x2,y1-.07,z2],[x1,y1-.07,z1]],base[2],base[2],.007));
  }
 }
 function paint(){
  if(disposed||!resize())return;
  if(editor)refreshConfig();
  const palette=PALETTES[preset],w=rect.w,h=rect.h;
  ctx.clearRect(0,0,w,h);
  // Stage shadow is real, not a pre-rendered PNG.
  const shadow=ctx.createRadialGradient(w*.51,h*.79,8,w*.51,h*.79,w*.29);
  shadow.addColorStop(0,'rgba(92,52,69,.22)');shadow.addColorStop(1,'rgba(92,52,69,0)');
  ctx.fillStyle=shadow;ctx.beginPath();ctx.ellipse(w*.5,h*.80,w*.32,h*.072,0,0,Math.PI*2);ctx.fill();
  let polys=[];
  tier(polys,[mix(palette[0],.18),mix(palette[1],-.08),palette[2]],1.65,-1.15,-1.08);
  tier(polys,palette,1.36,-1.06,.06);
  tier(polys,[mix(palette[0],.13),palette[1],palette[2]],1.07,.06,.84);
  if(tierCount===3)tier(polys,[mix(palette[0],.24),palette[1],palette[2]],.76,.84,1.45);
  // Decorative gold trim on the plate is another layered surface.
  const ordered=polys.sort((a,b)=>a.depth-b.depth);
  ctx.lineWidth=.45;
  for(const p of ordered){
   ctx.beginPath();
   p.points.forEach((v,i)=>i?ctx.lineTo(v.x,v.y):ctx.moveTo(v.x,v.y));
   ctx.closePath();ctx.fillStyle=p.fill;ctx.fill();ctx.strokeStyle=p.stroke;ctx.stroke()
  }
  const points=[];
  const top=tierCount===3?1.45:.84,rad=tierCount===3?.57:.88;
  for(let i=0;i<12;i++){
   const a=i/12*Math.PI*2;
   points.push({pos:[Math.cos(a)*rad,top+.08,Math.sin(a)*rad],kind:'icing',index:i})
  }
  if(flowers){
   for(let i=0;i<4;i++){const a=i/4*Math.PI*2+.45;points.push({pos:[Math.cos(a)*rad*.63,top+.17,Math.sin(a)*rad*.63],kind:'flower',index:i})}
  }else{
   for(let i=0;i<6;i++){const a=i/6*Math.PI*2+.3;points.push({pos:[Math.cos(a)*rad*.61,top+.15,Math.sin(a)*rad*.61],kind:'berry',index:i})}
  }
  const sorted=points.map(p=>({...p,proj:project(p.pos)})).sort((a,b)=>a.proj.depth-b.proj.depth);
  for(const p of sorted){
   const x=p.proj.x,y=p.proj.y,r=clamp(p.proj.scale*.055,2,12);
   ctx.beginPath();ctx.ellipse(x,y,r,r*.62,0,0,Math.PI*2);
   ctx.fillStyle=p.kind==='berry'?'#b65373':p.kind==='flower'?'#fbf8ee':palette[2];ctx.fill();
   if(p.kind==='flower'){
    for(let j=0;j<5;j++){const a=j*2*Math.PI/5;ctx.beginPath();ctx.arc(x+Math.cos(a)*r*.77,y+Math.sin(a)*r*.69,r*.5,0,Math.PI*2);ctx.fillStyle='#fffaf0';ctx.fill()}
   }
   ctx.beginPath();ctx.arc(x,y,r*.32,0,Math.PI*2);ctx.fillStyle='#d7a875';ctx.fill()
  }
  // Drawing a little 3D plaque on the lower tier, following perspective.
  const plaque=project([-.05,-.53,1.369]);
  ctx.save();ctx.translate(plaque.x,plaque.y);ctx.rotate(-yaw*.045);ctx.fillStyle='#fff8f2';ctx.strokeStyle='#c7a6a4';
  const pw=clamp(plaque.scale*.65,40,90),ph=clamp(plaque.scale*.25,19,35);
  ctx.beginPath();ctx.roundRect(-pw/2,-ph/2,pw,ph,ph/3);ctx.fill();ctx.stroke();
  ctx.fillStyle='#885068';ctx.font='italic '+Math.round(ph*.53)+'px Georgia';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('Meery',0,0);ctx.restore();
 }
 function motion(){return readMotion()&&!document.hidden&&visible}
 function tick(time){
  frame=0;if(disposed)return;
  const dt=clamp(time-(prevTime||time),0,48);prevTime=time;
  if(motion()&&!drag){yaw+=dt*.00014}
  paint();
  if(motion())frame=requestAnimationFrame(tick)
 }
 function redraw(){if(frame)return;frame=requestAnimationFrame(tick)}
 function stop(){if(frame){cancelAnimationFrame(frame);frame=0}paint()}
 function pointerDown(e){
  if(e.button!==0&&e.pointerType==='mouse')return;
  drag=true;dragOrigin={x:e.clientX,y:e.clientY,yaw,pitch};
  canvas.setPointerCapture?.(e.pointerId);
  canvas.classList.add('mc7-dragging');
  if(status)status.textContent='Relâchez pour continuer la rotation';
 }
 function pointerMove(e){
  if(!drag||!dragOrigin)return;
  yaw=dragOrigin.yaw+(e.clientX-dragOrigin.x)*.009;
  pitch=clamp(dragOrigin.pitch-(e.clientY-dragOrigin.y)*.004,.12,.75);
  redraw();
 }
 function pointerUp(){
  drag=false;dragOrigin=null;canvas.classList.remove('mc7-dragging');
  if(status)status.textContent='Glissez pour faire pivoter le gâteau';
  redraw()
 }
 canvas.addEventListener('pointerdown',pointerDown);
 canvas.addEventListener('pointermove',pointerMove);
 canvas.addEventListener('pointerup',pointerUp);
 canvas.addEventListener('pointercancel',pointerUp);
 canvas.addEventListener('keydown',e=>{
  if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){
   e.preventDefault();
   if(e.key==='ArrowLeft')yaw-=.16;if(e.key==='ArrowRight')yaw+=.16;
   if(e.key==='ArrowUp')pitch=clamp(pitch+.07,.12,.75);if(e.key==='ArrowDown')pitch=clamp(pitch-.07,.12,.75);
   redraw()
  }
 });
 let ro=null;if('ResizeObserver' in window){ro=new ResizeObserver(redraw);ro.observe(canvas)}
 else addEventListener('resize',redraw,{passive:true});
 let io=null;if('IntersectionObserver'in window){io=new IntersectionObserver(e=>{visible=!!e[0]?.isIntersecting;if(visible)redraw();else stop()},{threshold:.03});io.observe(canvas)}
 document.addEventListener('visibilitychange',()=>document.hidden?stop():redraw());
 window.addEventListener('storage',redraw);
 window.addEventListener('mc:motion-preference-change',redraw);
 if(editor){
  const form=$('cakeForm');form?.addEventListener('input',redraw);form?.addEventListener('change',redraw);
  form?.addEventListener('click',e=>{if(e.target.closest('[data-choice]'))setTimeout(redraw,0)})
 }
 const setPreset=(name)=>{if(!PALETTES[name]||editor)return;preset=name;redraw()};
 const changeTiers=(count)=>{if(!editor){tierCount=count;redraw()}};
 redraw();
 return {setPreset,changeTiers,redraw,dispose(){disposed=true;if(frame)cancelAnimationFrame(frame);ro?.disconnect();io?.disconnect()}};
}
function makeStage(mode){
 const wrapper=make('section','mc7-canvas-shell'),stage=make('div','mc7-canvas-stage');
 const canvas=make('canvas','mc7-canvas');canvas.tabIndex=0;
 canvas.setAttribute('role','img');canvas.setAttribute('aria-label','Gâteau en trois dimensions interactif. Faites glisser ou utilisez les flèches pour le faire pivoter.');
 canvas.setAttribute('data-no-translate','');
 stage.append(canvas);
 const aria=make('p','mc7-rotation-status','Glissez pour faire pivoter le gâteau');
 wrapper.append(stage,aria);
 if(mode==='home'){
  const bar=make('div','mc7-presets');
  for(const [name,label] of [['rose','Rose poudré'],['cacao','Chocolat'],['lilas','Lilas'],['vanille','Vanille']]){
   const btn=make('button','mc7-preset',label);
   btn.type='button';btn.dataset.preset=name;btn.setAttribute('aria-pressed',name==='rose'?'true':'false');
   btn.addEventListener('click',()=>{bar.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));wrapper.mc7Controller?.setPreset(name)});
   bar.append(btn)
  }
  wrapper.append(bar)
 }
 return wrapper;
}
function startHome(){
 const host=$('mc7Home3D');if(!host)return;
 const stage=makeStage('home');
 const controller=build3D(stage.querySelector('canvas'));
 if(!controller)return; // Preserve the fallback message if canvas is unavailable.
 host.replaceChildren(stage);
 stage.mc7Controller=controller;
 const tiers=$('mc7TierToggle');
 tiers?.addEventListener('click',()=>{
  const mode=tiers.getAttribute('aria-pressed')!=='true';
  tiers.setAttribute('aria-pressed',String(mode));
  tiers.textContent=mode?'✓ Trois étages':'✧ Deux étages';
  stage.mc7Controller?.changeTiers(mode?3:2)
 });
}
function startCakeStudio(){
 const old=$('v6CakeStudio');if(!old)return;
 const currentStage=old.querySelector('.v6-cake-stage');
 if(!currentStage)return;
 const wrapper=makeStage('cake');
 wrapper.classList.add('mc7-editor-stage');
 currentStage.after(wrapper);
 const controls=make('div','mc7-view-controls');
 const three=make('button','mc7-view-button active','3D interactif'),illustration=make('button','mc7-view-button','Illustration 2D');
 for(const b of [three,illustration])b.type='button';
 controls.append(three,illustration);
 currentStage.before(controls);
 const controller=build3D(wrapper.querySelector('canvas'),{editor:true});
 const showThree=()=>{wrapper.hidden=false;currentStage.hidden=true;three.classList.add('active');illustration.classList.remove('active');controller?.redraw()};
 const showTwo=()=>{wrapper.hidden=true;currentStage.hidden=false;three.classList.remove('active');illustration.classList.add('active')};
 three.addEventListener('click',showThree);illustration.addEventListener('click',showTwo);
 showThree();
}
function initDepthEffects(){
 if(!window.matchMedia('(hover:hover) and (pointer:fine)').matches)return;
 const elements=document.querySelectorAll('.editorial-card,.v6-service-card,.promo-box,.event-card');
 for(const el of elements){
  el.classList.add('mc7-depth-card');
  let raf=0;el.addEventListener('pointermove',e=>{
   if(!readMotion())return;
   const r=el.getBoundingClientRect(),dx=(e.clientX-r.left)/r.width-.5,dy=(e.clientY-r.top)/r.height-.5;
   if(raf)cancelAnimationFrame(raf);
   raf=requestAnimationFrame(()=>{el.style.setProperty('--mc7-tilt-x',(-dy*5).toFixed(2)+'deg');el.style.setProperty('--mc7-tilt-y',(dx*6).toFixed(2)+'deg');el.style.setProperty('--mc7-glow-x',((dx+.5)*100)+'%');el.style.setProperty('--mc7-glow-y',((dy+.5)*100)+'%')})
  });
  el.addEventListener('pointerleave',()=>{if(raf)cancelAnimationFrame(raf);el.style.removeProperty('--mc7-tilt-x');el.style.removeProperty('--mc7-tilt-y')})
 }
}
function initScrollMeter(){
 const meter=make('div','mc7-reading-progress');meter.setAttribute('aria-hidden','true');document.body.append(meter);
 let pending=false;const update=()=>{
  pending=false;
  const max=document.documentElement.scrollHeight-innerHeight;
  meter.style.transform='scaleX('+(max>0?clamp(scrollY/max,0,1):0)+')'
 };
 addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(update)}},{passive:true});
 addEventListener('resize',update,{passive:true});update()
}
function initMagneticButtons(){
 if(!window.matchMedia('(hover:hover) and (pointer:fine)').matches)return;
 document.querySelectorAll('.hero-actions .button,.v6-banner .button,.mc7-main-cta').forEach(b=>{
  b.classList.add('mc7-magnetic');
  b.addEventListener('pointermove',e=>{
   if(!readMotion())return;
   const r=b.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;
   b.style.setProperty('--mc7-mx',clamp(x*.09,-9,9)+'px');
   b.style.setProperty('--mc7-my',clamp(y*.12,-6,6)+'px')
  });
  b.addEventListener('pointerleave',()=>{b.style.removeProperty('--mc7-mx');b.style.removeProperty('--mc7-my')})
 })
}
function init(){
 startHome();startCakeStudio();initScrollMeter();initDepthEffects();initMagneticButtons()
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();