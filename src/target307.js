'use strict';
// V307 · THẺ "MỤC TIÊU KẾ TIẾP" trong chế độ Vô tận (học cách làm của game gốc: thẻ nhỏ ở góc trên phải).
// KHÔNG dùng tên/điểm giả: mục tiêu chỉ lấy từ số liệu THẬT của chính người chơi — lần chơi trước, kỷ lục mùa, các mốc hạng Vô tận (V92CFG).
// Chỉ đọc biến score; không đổi logic trận. Tắt: window.TARGET307=false
(()=>{try{
 const f=document.getElementById('game-field');if(!f)return;
 const LK='saobang-last307';
 const ld=()=>{try{return JSON.parse(localStorage.getItem(LK)||'{}')||{};}catch{return {};}};
 const fmt=n=>Math.round(n).toLocaleString('vi-VN');
 let el=null,cur=null,flashT=0;
 // V2.4-C: avatar phi công chính + chữ VƯỢT MỐC! lóe khi qua mốc rồi trượt sang mốc kế (tắt window.TG24=false)
 const V24T=()=>window.TG24!==false&&window.V24!==false&&window.V24C!==false;
 function ava(){try{const A=typeof PILOT_ASSETS!=='undefined'?PILOT_ASSETS:{};let id=0;try{id=(Pilot67.state().team||[])[0]||0;}catch{}return A['p'+id]||A['p'+(id-1)]||A.p1||'';}catch{return '';}}
 function targets(){
  const out=[];const L=ld();
  if((L.last|0)>0)out.push({v:L.last|0,n:'LẦN TRƯỚC'});
  try{const r=V92.rank();if((r.best|0)>0)out.push({v:r.best|0,n:'KỶ LỤC MÙA'});}catch{}
  try{for(const t of V92.CFG.rank.tiers)if(t.min>0)out.push({v:t.min,n:(V24T()&&t.min===60000?'MỐC TUẦN · ':'HẠNG ')+t.n.toUpperCase()});}catch{}
  return out.sort((a,b)=>a.v-b.v);
 }
 function mount(){if(el&&el.isConnected)return el;el=document.createElement('div');el.className='tg307';el.setAttribute('aria-hidden','true');
  el.innerHTML='<small></small><b></b><i><u></u></i>';if(V24T()){el.classList.add('tg24');const a=document.createElement('img');a.className='tg24a';a.alt='';const s=ava();if(s)a.src=s;el.prepend(a);const p=document.createElement('em');p.className='tg24p';p.textContent='VƯỢT MỐC!';el.appendChild(p);}f.appendChild(el);return el;}
 function tick(){
  let on=false,sc=0;
  try{on=window.TARGET307!==false&&mode==='play'&&gameMode==='endless';sc=score|0;}catch{}
  if(!on){if(el)el.hidden=true;cur=null;return;}
  const e=mount();const T=targets().find(t=>t.v>sc);
  if(!T){e.hidden=false;e.querySelector('small').textContent='VƯỢT MỌI MỐC';e.querySelector('b').textContent=fmt(sc);e.querySelector('u').style.width='100%';return;}
  e.hidden=false;
  if(cur&&cur.v!==T.v&&sc>0){e.classList.remove('pass','slide24');void e.offsetWidth;e.classList.add('pass');if(V24T())e.classList.add('slide24');clearTimeout(flashT);flashT=setTimeout(()=>e.classList.remove('pass','slide24'),1300);}
  cur=T;
  e.querySelector('small').textContent=T.n;e.querySelector('b').textContent=fmt(T.v);
  e.querySelector('u').style.width=Math.max(2,Math.min(100,sc/T.v*100)).toFixed(1)+'%';
 }
 setInterval(tick,250);
 // nhớ điểm lần Vô tận gần nhất (để làm mục tiêu "LẦN TRƯỚC" cho lần sau)
 let hk=false;function hook(){if(hk||typeof end!=='function')return;hk=true;const o=end;
  end=function(){let gm='',sc=0;try{gm=gameMode;sc=score|0;}catch{}const r=o.apply(this,arguments);try{if(gm==='endless'&&sc>0)localStorage.setItem(LK,JSON.stringify({last:sc}));}catch{}return r;};}
 setTimeout(hook,0);setTimeout(hook,3000);
}catch(e){console.warn('TARGET307',e);}})();
