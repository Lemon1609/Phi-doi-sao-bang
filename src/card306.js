'use strict';
// V306r · thẻ chạm ải: dòng "Sao: ★★☆" thành hàng 3 sao neon (đọc số sao game đã tính, không đổi cách tính).
(()=>{try{
 function run(){
  const sh=document.getElementById('cm-sheet');if(!sh||!sh.classList.contains('open'))return;
  const p=[...sh.querySelectorAll('p')].find(e=>/Sao:/.test(e.textContent)&&!e.querySelector('.c306-stars'));if(!p)return;
  const all=[...p.querySelectorAll('span')],gold=all.find(x=>/ffd56a/i.test(x.getAttribute('style')||'')),n=Math.min(3,gold?(gold.textContent.match(/★/g)||[]).length:0);
  const sp=all.filter(x=>x===gold||(!gold&&/★/.test(x.textContent))||/★/.test(x.textContent));if(!sp.length)return;
  const w=document.createElement('span');w.className='c306-stars';w.setAttribute('role','img');w.setAttribute('aria-label',n+' trên 3 sao');
  for(let i=0;i<3;i++){const s=document.createElement('i');s.className=i<n?'on':'off';w.appendChild(s);}
  sp[0].before(w);sp.forEach(x=>x.remove());
 }
 new MutationObserver(()=>setTimeout(run,0)).observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['class']});
}catch(e){}})();
