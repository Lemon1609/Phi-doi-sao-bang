'use strict';
// V306r · thẻ chạm ải: dòng "Sao: ★★☆" thành hàng 3 sao neon (đọc số sao game đã tính, không đổi cách tính).
(()=>{try{
 function run(){
  const sh=document.getElementById('cm-sheet');if(!sh||!sh.classList.contains('open'))return;
  const p=[...sh.querySelectorAll('p')].find(e=>/^\s*Sao:/.test(e.textContent)&&!e.querySelector('.c306-stars'));if(!p)return;
  const t=p.textContent.split(':').pop()||'',n=Math.min(3,(t.match(/★/g)||[]).length);
  const w=document.createElement('span');w.className='c306-stars';w.setAttribute('role','img');w.setAttribute('aria-label',n+' trên 3 sao');
  for(let i=0;i<3;i++){const s=document.createElement('i');s.className=i<n?'on':'off';w.appendChild(s);}
  p.textContent='';p.classList.add('c306-row');p.appendChild(w);
 }
 new MutationObserver(()=>setTimeout(run,0)).observe(document.body,{childList:true,subtree:true,characterData:true});
}catch(e){}})();
