/* Meery Cake i18n — hand-authored translations, no external translation API.
   Original French is stored per text/attribute to allow reversible language changes.
   Works with dynamic catalogue and gallery content through MutationObserver. */
(function(){
'use strict';
const langs=['fr','en','es','de','it','pt','nl','pl'];
const dict=new Map();
function add(fr,en,es,de,it,pt,nl,pl){dict.set(fr,[fr,en,es,de,it,pt,nl,pl])}
const originalText=new WeakMap(),originalAttr=new WeakMap();
const excluded=new Set(['SCRIPT','STYLE','NOSCRIPT','TEXTAREA','CODE','PRE','OPTION_GAP']);
let translating=false,scheduled=false,current='fr';
function language(){try{const l=localStorage.getItem('meerycake-v3-lang')||'fr';return langs.includes(l)?l:'fr'}catch{return 'fr'}}
function translateText(node){
 const parent=node.parentElement;
 if(!parent||excluded.has(parent.tagName)||parent.closest('[data-no-translate],[contenteditable="true"],.mc-search-input,.mc-search-results #mcSearchInput'))return;
 const text=node.nodeValue;if(!text||!text.trim())return;
 if(!originalText.has(node))originalText.set(node,text);
 const source=originalText.get(node);
 const clean=source.trim();
 const matched=dict.get(clean);
 if(!matched)return;
 const idx=langs.indexOf(current);
 const result=matched[idx]||matched[1]||clean;
 const prefix=source.match(/^\s*/)?.[0]||'',suffix=source.match(/\s*$/)?.[0]||'';
 const translated=prefix+result+suffix;
 if(node.nodeValue!==translated)node.nodeValue=translated;
}
function translateAttr(el){
 if(!el||!el.getAttribute)return;
 for(const attr of ['placeholder','title','aria-label']){
  const value=el.getAttribute(attr);if(!value)continue;
  let record=originalAttr.get(el);if(!record){record={};originalAttr.set(el,record)}
  if(!(attr in record))record[attr]=value;
  const original=record[attr],translated=dict.get(original);
  if(translated)el.setAttribute(attr,translated[langs.indexOf(current)]||translated[1]||original);
 }
}
function walk(root){
 if(!root)return;
 if(root.nodeType===3){translateText(root);return}
 if(root.nodeType!==1&&root.nodeType!==9&&root.nodeType!==11)return;
 if(root.nodeType===1){
  if(excluded.has(root.tagName)||root.closest('[data-no-translate]'))return;
  translateAttr(root);
 }
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
 let text;
 while((text=walker.nextNode()))translateText(text);
 if(root.nodeType!==1||!root.matches('[placeholder],[title],[aria-label]')){}
 if(root.querySelectorAll)for(const el of root.querySelectorAll('[placeholder],[title],[aria-label]'))translateAttr(el);
}
function run(){
 if(translating)return;translating=true;
 current=language();document.documentElement.lang=current;
 const main=document.getElementById('main');
 if(main)walk(main);
 // Translate footer and editor tools while keeping the canonical navigation
 // handled by MC's existing 8-language dictionary.
 const footer=document.getElementById('siteFooter');if(footer)walk(footer);
 const header=document.getElementById('siteHeader');if(header)walk(header);
 document.title=(dict.get(document.title)||[])[langs.indexOf(current)]||document.title;
 translating=false;
}
function queue(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;run()})}
function bind(){
 const select=document.getElementById('langSelect');
 if(select){
   select.value=language();
   select.addEventListener('change',()=>{
     try{localStorage.setItem('meerycake-v3-lang',select.value)}catch{}
     // MC also handles navigation labels and catalogue content.
     queue();
   });
 }
 run();
 const root=document.body;
 const observer=new MutationObserver(mutations=>{
   if(translating)return;
   if(!mutations.some(m=>m.type==='childList'||m.type==='characterData'))return;
   queue();
 });
 observer.observe(root,{childList:true,characterData:true,subtree:true});
 window.addEventListener('pageshow',()=>queue());
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind);else bind();
})();
