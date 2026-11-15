'use strict';
// V306l · dải CẢNH BÁO BOSS (chỉ khi boss sắp xuất hiện; ~2,2 s; không chắn thao tác; chủ dự án duyệt ngoại lệ luật "không chữ trong trận" riêng cho boss).
(()=>{try{
 const f=document.getElementById('game-field');if(!f)return;
 let on=false,t=0;
 function show(){
  let e=document.getElementById('bw306');if(e)e.remove();
  e=document.createElement('div');e.id='bw306';e.setAttribute('aria-hidden','true');
  let ai='';try{const v=document.getElementById('mission-select').value;const m=document.getElementById('gamemode').value;if(m==='campaign'&&v)ai=' · ẢI '+v;}catch{}
  e.innerHTML='<b>CẢNH BÁO</b><small>BOSS ĐANG TIẾN TỚI'+ai+'</small>';
  f.appendChild(e);clearTimeout(t);t=setTimeout(()=>e.remove(),2300);
 }
 const mo=new MutationObserver(()=>{const w=f.classList.contains('boss-warn');if(w&&!on)show();on=w;});
 mo.observe(f,{attributes:true,attributeFilter:['class']});
}catch(e){}})();
