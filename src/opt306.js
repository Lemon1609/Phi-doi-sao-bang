'use strict';
// V306q · TÙY CHỌN THỊ GIÁC / TRỢ NĂNG (thiết kế riêng, chủ dự án chọn 15/11/2026; mặc định giữ nguyên như cũ):
//  • ĐẠN TA: SÁNG / MỜ (đạn người chơi vẽ ở ~55% độ sáng để đạn địch nổi bật hơn)
//  • CHỮ: THƯỜNG / LỚN (phóng 12% các bảng giao diện)
//  • GIAO DIỆN: ĐẬM / DỊU (giảm bão hòa và độ sáng viền neon của giao diện)
// Lưu ở khóa mới saobang-opt306 (không đụng khóa cũ). Không đổi va chạm, sát thương, đạn địch.
(()=>{try{
 const KEY='saobang-opt306',DIM=.55;
 let O={ally:0,text:0,ui:0};
 try{const s=JSON.parse(localStorage.getItem(KEY)||'null');if(s)O={ally:s.ally?1:0,text:s.text?1:0,ui:s.ui?1:0};}catch{}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(O));}catch{}};
 const st=document.createElement('style');st.id='opt306-css';
 st.textContent=`body.opt306-big :is(.m63-card,#hub40,#rs,.cm-sheet,#nav74s,.adv-card,#hgr41 .h1-res){zoom:1.12}
body.opt306-soft :is(#nav74,#nav74s,#lb68 .cta,.h1-res,.h1-ribbon,.m63-card,#rs,.hb-filter){filter:saturate(.78) brightness(.9)}
#opt306{display:flex;gap:6px;flex-wrap:wrap;margin:6px 0}
#opt306 button{flex:1 1 30%;min-height:34px;padding:4px 6px;font:800 11px/1.15 'Neo',sans-serif;color:#e8f4ff;background:rgba(11,29,51,.85);border:1px solid #3e6f98;border-radius:6px;cursor:pointer}
#opt306 button[aria-pressed="true"]{border-color:#38d6ff;background:rgba(10,60,90,.9);color:#fff}`;
 document.head.appendChild(st);
 // ---- đạn ta mờ: bọc các hàm vẽ đạn mà vòng lặp chính gọi sau khi đặt globalAlpha (chỉ đạn trong mảng shots) ----
 let hooked=false,busy=false;
 function wrap(obj,name,hasCtx){
  const o=obj[name];if(typeof o!=='function'||o.__o306)return;
  const f=function(){
   if(!O.ally||busy)return o.apply(this,arguments);
   const s=hasCtx?arguments[1]:arguments[0];
   if(!s||typeof shots==='undefined'||shots.indexOf(s)<0)return o.apply(this,arguments);
   busy=true;const a=ctx.globalAlpha;ctx.globalAlpha=a*DIM;
   try{return o.apply(this,arguments);}finally{ctx.globalAlpha=a;busy=false;}
  };f.__o306=1;obj[name]=f;
 }
 function hook(){
  if(hooked)return;
  try{wrap(Fighters28,'draw',true);wrap(Equipment25,'drawShot',false);wrap(VisualFX,'drawShot',false);hooked=true;}catch(e){}
 }
 function apply(){
  document.body.classList.toggle('opt306-big',!!O.text);document.body.classList.toggle('opt306-soft',!!O.ui);
  if(O.ally)hook();
  const w=document.getElementById('opt306');if(!w)return;
  const L=[['ally','ĐẠN TA',['SÁNG','MỜ']],['text','CHỮ',['THƯỜNG','LỚN']],['ui','GIAO DIỆN',['ĐẬM','DỊU']]];
  w.innerHTML=L.map(([key,n,v])=>`<button type="button" data-o="${key}" aria-pressed="${O[key]?'true':'false'}">${n}: ${v[O[key]]}</button>`).join('');
 }
 function mount(){
  if(document.getElementById('opt306'))return;
  const anchor=document.querySelector('.save-code-toolbar');if(!anchor||!anchor.parentNode)return;
  const w=document.createElement('div');w.id='opt306';anchor.parentNode.insertBefore(w,anchor);
  w.addEventListener('click',e=>{const b=e.target.closest('button[data-o]');if(!b)return;const key=b.dataset.o;O[key]=O[key]?0:1;save();apply();});
  apply();
 }
 apply();mount();
 new MutationObserver(()=>{if(!document.getElementById('opt306'))mount();}).observe(document.body,{childList:true,subtree:true});
 window.OPT306={state:()=>({...O}),set:(key,v)=>{O[key]=v?1:0;save();apply();}};
}catch(e){}})();
