'use strict';
// V68-B · Tách SẢNH và KHO CHIẾN CƠ (theo video game gốc, người dùng duyệt 22/10/2026).
//  Cùng một màn #hgr41, hai chế độ:
//   • SẢNH (mặc định): tài nguyên + hàng icon, chiến cơ lớn trên bệ, lực chiến, cột icon vuông bên phải, thẻ phi công,
//     2 nút PHI CÔNG / KHO CHIẾN CƠ và 2 nút lớn VÔ TẬN · XUẤT KÍCH.
//   • KHO: bố cục cũ đầy đủ (chỉ số, 4 ô trang bị, Cường hóa, Ghép…) + nút ‹ SẢNH để quay lại.
//  Không viết lại logic: mọi nút cũ giữ nguyên data-go/handler; chỉ thêm khối #lb68 và lớp CSS.
const LOBBY68={def:'lobby',key:'saobang-lobby68'};
const Lobby68=(()=>{
 const $=s=>document.querySelector(s);
 let mode=LOBBY68.def;
 const root=()=>document.getElementById('hgr41');
 const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 function lobbyMode(m){const b=document.querySelector('#lobby [data-lbmode="'+m+'"]');if(b)b.click();}
 function launch(m){lobbyMode(m);const l=root()?.querySelector('[data-go="launch"]');if(l)l.click();}
 function act(k){
  if(k==='kho')return set('kho');if(k==='lobby')return set('lobby');
  if(k==='pilot'){try{Pilot67.open();}catch{}return;}
  if(k==='endless')return launch('endless');if(k==='camp')return launch('campaign');}
 function build(){const r=root();if(!r)return false;const col=r.querySelector('.h1-col');if(!col)return false;
  if(!col.querySelector('#lb68')){
   const lb=document.createElement('div');lb.id='lb68';
   lb.innerHTML=`<div class="lb68-card"><span class="lb68-pp" id="lb68-pp">?</span><div class="lb68-pn"><b id="lb68-pnm">PHI CÔNG</b><small id="lb68-ptg">Chưa có phi công</small></div><div class="lb68-ship"><b id="lb68-ship">—</b><small>LỰC CHIẾN <em id="lb68-cp">0</em></small></div></div>
<div class="lb68-row"><button data-lb68="pilot" data-pl67="1"><i>◉</i>PHI CÔNG</button><button data-lb68="kho" class="kho"><i>⬡</i>KHO CHIẾN CƠ<span class="lb68-dot" id="lb68-dot" hidden>!</span></button></div>
<div class="lb68-cta"><button data-lb68="endless" class="cta e"><b>VÔ TẬN</b><small>KỶ LỤC ĐỢT <span id="lb68-best">0</span></small></button><button data-lb68="camp" class="cta c"><b>XUẤT KÍCH</b><small id="lb68-stage">ẢI 1</small></button></div>`;
   col.appendChild(lb);
   lb.addEventListener('click',e=>{const b=e.target.closest('[data-lb68]');if(!b)return;e.stopPropagation();act(b.dataset.lb68);});
   try{if(UNLOCK66.endless&&!UNLOCK66.endless.sel.includes('#lb68 [data-lb68="endless"]'))UNLOCK66.endless.sel.push('#lb68 [data-lb68="endless"]');}catch{}
  }
  const head=col.querySelector('.h1-head');if(head&&!head.querySelector('.bk68')){const b=document.createElement('button');b.className='bk68';b.type='button';b.textContent='‹ SẢNH';b.addEventListener('click',e=>{e.stopPropagation();set('lobby');});head.prepend(b);}
  return true;}
 function set(m){mode=m==='kho'?'kho':'lobby';const r=root();if(!r)return;build();r.classList.toggle('lob68',mode==='lobby');r.classList.toggle('kho68',mode==='kho');paint();try{window.dispatchEvent(new Event('resize'));}catch{}}
 function txt(id,v){const e=document.getElementById(id);if(e&&e.textContent!==String(v))e.textContent=String(v);}
 function paint(){const r=root();if(!r||r.hidden)return;if(!r.querySelector('#lb68'))build();
  txt('lb68-ship',(document.getElementById('h1-name')||{}).textContent||'—');
  txt('lb68-cp',(document.getElementById('h1-cp')||{}).textContent||'0');
  txt('lb68-stage',(document.getElementById('h1-stage')||{}).textContent||'ẢI 1');
  try{txt('lb68-best',Campaign36.getState().endlessBest||0);}catch{}
  const dc=document.getElementById('h1-dc'),dot=document.getElementById('lb68-dot');if(dot)dot.hidden=!(dc&&!dc.hidden);
  let pid=null,open=false;try{open=Onboard66.open('pilot');pid=open?Pilot67.main():null;}catch{}
  const p=pid?PILOTS67.find(x=>x.id===pid):null,pp=document.getElementById('lb68-pp');
  if(p){txt('lb68-pnm',p.name.toUpperCase());let lv=1;try{lv=Pilot67.state().own[pid].lv;}catch{}txt('lb68-ptg',p.tag+' · Lv.'+lv);
   if(pp){pp.style.setProperty('--pc',p.col);const img=(typeof PILOT_ASSETS!=='undefined'&&PILOT_ASSETS&&(PILOT_ASSETS['p'+pid]||PILOT_ASSETS[pid]))||'';const want=img?'img':'txt';if(pp.dataset.k!==want+pid){pp.dataset.k=want+pid;pp.innerHTML=img?`<img src="${img}" alt="">`:esc(p.name.split(' ').pop()[0]);}}}
  else{txt('lb68-pnm','PHI CÔNG');txt('lb68-ptg',open?'Chọn phi công chính':'Mở khóa ở ải '+((typeof UNLOCK66!=='undefined'&&UNLOCK66.pilot&&UNLOCK66.pilot.lv)||50));if(pp){pp.style.setProperty('--pc','#5d7894');if(pp.dataset.k!=='none'){pp.dataset.k='none';pp.textContent='?';}}}}
 function init(){if(!build()){setTimeout(init,300);return;}let saved=null;try{saved=localStorage.getItem(LOBBY68.key);}catch{}set(LOBBY68.def);setInterval(()=>{try{paint();}catch{}},500);
  // bấm tab/đổi màn rồi quay lại sảnh: giữ chế độ đang dùng
 }
 init();
 return {set,mode:()=>mode,paint,act};
})();
