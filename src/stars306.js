'use strict';
// V306n · băng 3 sao trên màn kết quả (đọc từ dòng "SAO ẢI n: ★★☆" game đã tính; không đổi cách tính sao).
(()=>{try{
 function run(){
  const rs=document.getElementById('rs');if(!rs||rs.querySelector('.rs306-stars'))return;
  const b=rs.querySelector('.summary392 b');if(!b)return;
  const m=/★+/.exec(b.textContent.split(':').pop()||'');
  const n=Math.min(3,m?m[0].length:0);
  const w=document.createElement('div');w.className='rs306-stars';w.setAttribute('role','img');w.setAttribute('aria-label',n+' trên 3 sao');
  for(let i=0;i<3;i++){const s=document.createElement('i');s.className=i<n?'on':'off';s.style.setProperty('--d',(.45+i*.28)+'s');w.appendChild(s);}
  const anchor=rs.querySelector('.rs-rib');(anchor||rs.firstChild).after?anchor.after(w):rs.prepend(w);
 }
 new MutationObserver(()=>setTimeout(run,0)).observe(document.body,{childList:true,subtree:true});
}catch(e){}})();
