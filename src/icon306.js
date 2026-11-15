'use strict';
// V306k · đổi emoji trong thẻ ải / hộp thoại sang icon LED (chỉ trong #cmap và .m63; không đụng trận đấu).
(()=>{try{
 const MAP={'⚡':'nl','🔋':'nl','🔒':'khoa','🎁':'qua','💎':'kc','💣':'bom','⚠':'cb','✓':'tich'};
 const RE=/[⚡🔋🔒🎁💎💣⚠✓]️?/gu;
 function fix(root){
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>RE.test(n.nodeValue)&&!n.parentElement.closest('canvas,script,style,.ic306')?1:2});
  RE.lastIndex=0;const L=[];while(w.nextNode())L.push(w.currentNode);
  for(const n of L){const f=document.createDocumentFragment();let s=n.nodeValue,i=0,m;RE.lastIndex=0;
   while((m=RE.exec(s))){if(m.index>i)f.appendChild(document.createTextNode(s.slice(i,m.index)));const e=document.createElement('i');e.className='ic306 ic306-'+MAP[m[0].replace('\uFE0F','')];e.setAttribute('role','img');e.setAttribute('aria-label',m[0].replace('\uFE0F',''));f.appendChild(e);i=m.index+m[0].length;}
   if(i<s.length)f.appendChild(document.createTextNode(s.slice(i)));n.replaceWith(f);}
 }
 let busy=false;
 const run=()=>{if(busy)return;busy=true;try{document.querySelectorAll('#cmap .cm-sheet,.m63 .m63-card').forEach(fix);}catch{}busy=false;};
 new MutationObserver(()=>setTimeout(run,0)).observe(document.body,{childList:true,subtree:true});
 run();
}catch(e){}})();
