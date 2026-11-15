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
 // ---- đạn ta mờ: nhân hệ số vào ctx.globalAlpha chỉ trong lúc vẽ đạn người chơi ----
 let k=1,hooked=false;
 function hook(){
  if(hooked||typeof ctx==='undefined'||typeof drawShot!=='function')return;
  try{
   const proto=Object.getPrototypeOf(ctx),d=Object.getOwnPropertyDescriptor(proto,'globalAlpha');if(!d)return;
   Object.defineProperty(ctx,'globalAlpha',{configurable:true,get(){return d.get.call(ctx)/(k||1);},set(v){d.set.call(ctx,Math.max(0,Math.min(1,v*k)));}});
   const o=drawShot;
   window.drawShot=drawShot=function(s){if(!O.ally)return o.apply(this,arguments);k=DIM;try{return o.apply(this,arguments);}finally{k=1;}};
   hooked=true;
  }catch(e){}
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
