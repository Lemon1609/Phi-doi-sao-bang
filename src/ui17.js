'use strict';
// V309 · LƯỢT 17 (chốt V2.0) · PHẦN A: ĐỒNG BỘ UI — bộ ảnh 3D GPT (12 icon + 6 khung), sửa ảnh cũ, dọn nút tím / lệch tông, emoji → icon.
//  Ảnh: window.UI17_IMG (src/ui17img/*.webp, tách nền bằng claude_tools/ui17_assets.py). Tắt: window.UI17=false
//  • Emoji ở lớp hiển thị: bọc trong <span class="e17"> và vẽ icon bằng nền, CHỮ GỐC VẪN NẰM TRONG textContent (◈ ⬢ 💎 🎫 ⚡ không gãy logic đọc chữ).
//  • Khung 3D theo bậc: Trắng/Lục/Lam/Tím (TIER70.frame), OC+5 (Vàng–Lam), SSS (Đỏ–Vàng) — gắn bằng <i class="f17x"> (không đụng ::before/::after sẵn có).
//  • Không chạy trong trận (mode==='play'); không dùng filter/shadowBlur trên canvas.
const UI17=(()=>{
 const on=()=>window.UI17!==false;
 const IMG=()=>window.UI17_IMG||{};
 const play=()=>{try{return mode==='play';}catch{return false;}};
 const ic74=k=>{try{return ICON74[k]||'';}catch{return '';}};
 const tn=k=>{try{return (window.TN307_IMG||{})[k]||'';}catch{return '';}};
 const uic=k=>{try{return UI_ICONS.svg(k)||UI_ICONS.src(k)||'';}catch{return '';}};
 // icon chrome nhỏ tự vẽ (tick, đèn thông tin) cùng chất liệu UI_ICONS
 const svg=(b,a)=>'data:image/svg+xml;utf8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><defs><linearGradient id="c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".45" stop-color="#b9cde0"/><stop offset=".55" stop-color="#7f97ad"/><stop offset="1" stop-color="#dfeaf5"/></linearGradient><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff3b0"/><stop offset=".5" stop-color="#ffc53d"/><stop offset="1" stop-color="#c47a00"/></linearGradient></defs><g fill="url(#c)" stroke="#0b1a2c" stroke-width="1.4" stroke-linejoin="round">${b}</g><g fill="url(#g)" stroke="#3a2200" stroke-width="1">${a}</g></svg>`);
 const TICK=svg('<path d="M16 2l12 7v14l-12 7-12-7V9z"/>','<path d="M9 16.5l4.5 4.5L23.5 11l2.5 2.5L13.5 26 6.5 19z"/>');
 const INFO=svg('<path d="M16 2a10 10 0 0 1 6 18v4H10v-4A10 10 0 0 1 16 2z"/><rect x="11" y="25" width="10" height="4" rx="1.5"/>','<path d="M14.5 8h3v3h-3zM14.5 12.5h3V20h-3z"/>');
 // ---------- 1. icon: Đá Nội Tại, Tinh Thể, Hợp kim ----------
 const STONE=['pha_giap','phan_cong','xung_kich','hap_thu','xung_chan','vo_nl','duy_tri','tu_truong','nap_nhanh','crystal'];
 let hkOrig=null;
 function icons(){try{if(typeof UI_ICONS!=='undefined'&&!UI_ICONS.__u17){const o=UI_ICONS.src;UI_ICONS.src=function(k){if(on()&&STONE.includes(k)&&IMG()[k])return IMG()[k];return o.apply(this,arguments);};UI_ICONS.__u17=1;}}catch{}
  try{const T=window.TN307_IMG;if(T){if(hkOrig==null)hkOrig=T.hop_kim;const want=on()&&ic74('res_hop_kim')?ic74('res_hop_kim'):hkOrig;if(T.hop_kim!==want)T.hop_kim=want;}}catch{}}
 // ảnh chiến cơ chuẩn (SHIP118) theo khung, dùng cho Kho bản sao / quà bộ
 const FORM=['thuong','luc','lam','lam','lam','lam','tim','tim','tim','tim','tim','tim5'];
 window.SHIPCUR17=i=>{try{return SHIPART17(i|0,V70.craftN(i|0)|0);}catch{return SHIPART17(i|0,0);}};/* V309 L17B: ảnh chiến cơ chuẩn theo khung hiện tại */
 window.SHIPART17=(i,t)=>{try{const S=SHIP118[i|0];if(!S)return '';const f=FORM[Math.max(0,Math.min(11,t|0))];return S[f]||S.tim||S.lam||S.thuong||'';}catch{return '';}};
 const gearIcon=m=>{try{const al=(typeof GEAR81_DATA!=='undefined'&&GEAR81_DATA[m])?GEAR81_DATA[m].art:m;const A=typeof GEAR44_ASSETS!=='undefined'?GEAR44_ASSETS:{},E=typeof EVO53_ART!=='undefined'?EVO53_ART:{};return A[m+'_icon']||A[al+'_icon']||E['g:'+al+'_icon_evo1']||'';}catch{return '';}};
 function pieceArt(){try{if(window.Ui19&&!Ui19.__u17){const o=Ui19.pieceArt;Ui19.pieceArt=function(kind,model){if(!on())return o.apply(this,arguments);if(kind==='craft'){const s=SHIPART17(model,0);if(s)return `<img class="u17a" src="${s}" alt="">`;}else{const s=gearIcon(model);if(s)return `<img class="u17a" src="${s}" alt="">`;}return o.apply(this,arguments);};Ui19.__u17=1;}}catch{}}
 // ---------- 2. emoji → icon (giữ chữ gốc) ----------
 const EMO={'💎':()=>ic74('res_kim_cuong'),'🎫':()=>tn('ve'),'🗼':()=>ic74('ic_thap_boss'),'🎖':()=>ic74('ic_thanh_tuu'),'🥉':()=>ic74('ic_thanh_tuu'),'🔓':()=>uic('lock'),'✅':()=>TICK,'💡':()=>INFO,'🎪':()=>IMG().event_week||ic74('ic_lich_tuan')};
 const RX=new RegExp('('+Object.keys(EMO).join('|')+')\\uFE0F?','gu'),RXT=new RegExp(RX.source,'u');
 const SKIP='script,style,textarea,input,select,option,[contenteditable],#perf15,.e17,svg,canvas,#tutorial392';
 function swap(n){const t=n.nodeValue;if(!t||!RXT.test(t))return;const p=n.parentElement;if(!p||p.closest(SKIP))return;RX.lastIndex=0;const fr=document.createDocumentFragment();let last=0,m;
  while((m=RX.exec(t))){if(m.index>last)fr.appendChild(document.createTextNode(t.slice(last,m.index)));const u=EMO[m[1]]();if(u){const s=document.createElement('span');s.className='e17';s.style.setProperty('--e17','url("'+u+'")');s.textContent=m[0];fr.appendChild(s);}else fr.appendChild(document.createTextNode(m[0]));last=m.index+m[0].length;}
  if(last<t.length)fr.appendChild(document.createTextNode(t.slice(last)));p.replaceChild(fr,n);}
 function walk(root){if(!root)return;if(root.nodeType===3){swap(root);return;}if(root.nodeType!==1||(root.closest&&root.closest(SKIP)))return;const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const L=[];let n;while((n=w.nextNode()))if(RXT.test(n.nodeValue))L.push(n);for(const x of L)swap(x);}
 // ---------- 3. khung 3D theo bậc ----------
 const FK=['f_trang','f_luc','f_lam','f_tim','f_oc5','f_sss'];
 const COLF={'#d6e0ea':0,'#9fb6cf':0,'#3ee08f':1,'#3aa8ff':2,'#b45cff':3,'#9333ea':3};
 const frameN=n=>{try{return TIER70.frame[Math.max(0,Math.min(11,n|0))]|0;}catch{return 0;}};
 const ocOf=k=>{try{return typeof OC17API!=='undefined'&&window.OC17!==false?(OC17API.state().g[k]||{}).oc|0:0;}catch{return 0;}};
 function pickF(base,ock,sss){if(sss)return 5;if(ock&&ocOf(ock)>=5)return 4;return base;}
 function frameOn(host,f,cls){if(!host)return;const u=IMG()[FK[f]];if(!u)return;let x=host.querySelector(':scope > i.f17x');if(!x){x=document.createElement('i');x.className='f17x';host.appendChild(x);}if(x.dataset.f!==String(f)){x.dataset.f=f;x.style.backgroundImage='url("'+u+'")';}/* V2.2.1: chỉ ghi khi đổi (add/ghi dataset luôn sinh mutation → tính lại style mỗi 700 ms) */const cl=host.classList;if(!cl.contains('f17h'))cl.add('f17h');if(cls&&!cl.contains(cls))cl.add(cls);if(host.dataset.f17!==String(f))host.dataset.f17=f;}
 const itemOf=id=>{try{return Progress.v70.get(id);}catch{return null;}};
 const isSSS=it=>!!(it&&(it.super||it.sss||it.grade==='SSS'));
 function curShip(){try{const t=(document.querySelector('.np9')||{}).textContent||'';for(let i=0;i<13;i++){try{if(t.startsWith(Fighters28.profiles[i].name))return i;}catch{}}}catch{}try{return Hub40.cur307();}catch{}try{return launchCraft;}catch{return 0;}}
 function frames(){
  // Kho đồ: 4 ô (3 trang bị + chiến cơ)
  for(const s of document.querySelectorAll('#hb-body .hb-slot')){if(!s.getClientRects().length)continue;let f=0,k=null,sss=false;
   if(s.classList.contains('c9ship')){const i=curShip();try{f=frameN(V70.craftN(i));}catch{}k='c'+i;}
   else{const it=itemOf(s.dataset.it);if(it){try{f=frameN(V70.nOf(it));}catch{}k='g:'+it.id;sss=isSSS(it);}}
   frameOn(s,pickF(f,k,sss),'f17slot');
   const st=s.querySelector('.gear25-art .c9s');let u=s.querySelector(':scope > i.u17s');const t=st?st.textContent:'';if(t){if(!u){u=document.createElement('i');u.className='u17s';s.appendChild(u);}if(u.textContent!==t)u.textContent=t;}else if(u)u.remove();}
  // Túi đồ / Cải tạo: dòng có data-f
  for(const r of document.querySelectorAll('.k307-row')){const ic=r.querySelector('.k307-ic');if(!ic||!r.getClientRects().length)continue;const k=r.dataset.k==='ship'?'c'+r.dataset.id:(r.dataset.id?'g:'+r.dataset.id:null);
   const it=r.dataset.k==='ship'?null:itemOf(r.dataset.id);frameOn(ic,pickF(+r.dataset.f||0,k,isSSS(it)),'f17ic');}
  // Cường hóa
  try{const el=document.getElementById('nc307');if(el&&el.classList.contains('open')){let cur=null;try{cur=NC307.get(NC307.cur());}catch{}
   const ck=cur?(cur.kind==='craft'?'c'+cur.idx:'g:'+cur.id):null;let cf=0;try{cf=cur?frameN(cur.kind==='craft'?V70.craftN(cur.idx):V70.nOf(cur)):0;}catch{}
   for(const c of el.querySelectorAll('.nc307-pc:not(.nc307-pick) .nc307-art')){frameOn(c,pickF(cf,ck,isSSS(cur)),'f17ic');}
   let cn=0;try{cn=cur.kind==='craft'?V70.craftN(cur.idx):V70.nOf(cur);}catch{}
   el.querySelectorAll('.nc307-ac .nc307-art').forEach((c,i)=>frameOn(c,i===0?pickF(cf,ck,isSSS(cur)):frameN(Math.min(11,cn+1)),'f17ic'));
   for(const r of el.querySelectorAll('.nc307-row')){const m=r.querySelector('.nc307-mini');if(m){const id=r.dataset.id||'';const k=id.startsWith('craft:')?'c'+id.slice(6):id.startsWith('copy:')?null:'g:'+id;frameOn(m,pickF(+r.dataset.f||0,k,false),'f17ic');}}
   for(const m of el.querySelectorAll('.nc307-mats .nc307-mini')){const c=(m.getAttribute('style')||'').match(/--c:\s*(#[0-9a-f]{6})/i);frameOn(m,c?COLF[c[1].toLowerCase()]??0:0,'f17ic');}}}catch{}
  // Kho bản sao
  for(const c of document.querySelectorAll('.ev82c .ev82a')){const st=(c.parentElement.getAttribute('style')||'').match(/--fc:\s*(#[0-9a-f]{6})/i);frameOn(c,st?COLF[st[1].toLowerCase()]??0:0,'f17ic');}
  // Thành tựu · quà bộ
  for(const p of document.querySelectorAll('.s79p')){const m=(p.className.match(/\bf(\d)\b/)||[])[1];for(const a of p.querySelectorAll('.u19c .u19a'))frameOn(a,Math.min(3,+m||0),'f17ic');}
 }
 // ---------- 4. chỗ riêng ----------
 function misc(){
  // màn kết quả: 3 icon vòng mảnh → icon 3D
  const R={vang:ic74('res_hop_kim'),trang_bi:tn('ban_sao_tb')||ic74('ic_trang_bi_sss'),qua:uic('chest_tb')||ic74('ic_kho_bau')};
  for(const s of document.querySelectorAll('.rw306-s')){if(s.querySelector('img.u17r'))continue;const i=s.querySelector('i');const k=i&&['vang','trang_bi','qua'].find(c=>i.classList.contains(c));if(k&&R[k]){s.insertAdjacentHTML('beforeend',`<img class="u17r" src="${R[k]}" alt="">`);s.classList.add('u17rs');}}
  for(const b of document.querySelectorAll('.fx68 .fx68-bar')){if(b.querySelector('b.u17p'))continue;const p=(b.getAttribute('style')||'').match(/--p:\s*([\d.]+)%/);b.insertAdjacentHTML('beforeend',`<b class="u17p">TIẾN ĐỘ LỰC CHIẾN ${p?Math.round(+p[1]):0}%</b>`);}
  // nút ✕ thừa trong khung Chiến Lệnh (đã có ✕ ở thanh tab trên cùng)
  {const h=document.getElementById('hub9');const hv=!!(h&&!h.hidden&&h.getClientRects().length);for(const x of document.querySelectorAll('.s77-card .s77-x'))x.classList.toggle('u17hide',hv);}
  // nút phụ: bỏ skin tím hop307 → kiểu Chrome/Royal Blue
  for(const b of document.querySelectorAll('.h307s')){b.classList.remove('h307s');b.dataset.h7='1';b.classList.add('u17sec');}
  for(const b of document.querySelectorAll('.m63 .adv-x:not(.u17sec),.m63-btns > button:not(.m63-go)')){b.dataset.h7='1';b.classList.add('u17sec');}
  // Ép Xung: icon Lõi Ép Xung trên tab
  const oc=IMG().oc_core;if(oc)for(const b of document.querySelectorAll('#nc307 .oc17t [data-oc=oc]:not(.u17i)')){b.classList.add('u17i');b.insertAdjacentHTML('afterbegin',`<img class="u17t" src="${oc}" alt="">`);}
 }
 const B=':not(#_u17)'.repeat(64);/* l12309 dùng tới 48 id */
 const SB=(list,suf='')=>list.split(',').map(x=>x.trim()+B+suf).join(',');
 const SEC='html.ui17 .u17sec,html.ui17 .ch10[data-mb=chal],html.ui17 .k307-acts button:not(.go),html.ui17 .wr8.use,html.ui17 .old8,html.ui17 .r307-card .adv-s button[data-r],html.ui17 .m63-go.off';
 const GOLD='html.ui17 .s77-btns button,html.ui17 .k307-acts button.go:not(:disabled),html.ui17 #chest-open-all.gold-btn,html.ui17 .qf10r button[data-qf=get],html.ui17 .qf10all';
 const XB='html.ui17 .h9x,html.ui17 .n74x,html.ui17 .v75-x,html.ui17 .s77-x';
 const css=`
html.ui17 .e17{display:inline-block;width:1.25em;height:1.25em;vertical-align:-.28em;margin:0 .06em;color:transparent!important;-webkit-text-fill-color:transparent;text-shadow:none!important;overflow:hidden;font-size:inherit;background:var(--e17) center/contain no-repeat;line-height:1;white-space:nowrap;letter-spacing:-1em;text-indent:0}
html.ui17 .n74card > i .e17{width:30px;height:30px;vertical-align:middle}
html.ui17 .cm-ic .e17{width:34px;height:34px;vertical-align:middle}
/* Đá Nội Tại: icon 3D (đã có khung lục giác) cỡ 40 px */
html.ui17 .nt16 .nt16g button .hx{background:none!important;clip-path:none!important;width:42px;height:42px}html.ui17 .nt16 .nt16g button .hx::before{display:none}
html.ui17 .nt16 .nt16g button .hx img.nt16i{width:40px;height:40px;filter:drop-shadow(0 2px 3px #000b)}
html.ui17 .nt16 .nt16r img.nt16i,html.ui17 .nt16 .cost img.nt16i{width:22px;height:22px}
html.ui17 .nt16 .nt16g button{min-height:84px}
/* khung 3D theo bậc */
html.ui17 .f17h{position:relative}
html.ui17 .f17h > i.f17x{position:absolute;inset:-3px;background:center/100% 100% no-repeat;pointer-events:none;z-index:2;display:block}
html.ui17 .m63 .adv-btns,html.ui17 #k307 .k307-acts,html.ui17 #k307 .k307-foot{z-index:6!important}
html.ui17 .f17ic{border-color:transparent!important;box-shadow:none!important;outline:0!important;background:radial-gradient(circle at 50% 42%,#14335f,#06142b 75%)!important;border-radius:0!important}
html.ui17 .f17ic > img,html.ui17 .f17ic .nc307-ship img,html.ui17 .f17ic > .u17a{position:relative;z-index:2;transform:scale(.86);z-index:1}
html.ui17 .k307-ic.f17ic .gl10,html.ui17 .f17ic .gl10{display:none!important}
html.ui17 .ev82c .ev82a.f17ic{width:44px!important;height:44px!important;flex:none;margin-right:10px!important}
html.ui17 .ev82c .ev82a.f17ic > i.f17x{inset:0}
html.ui17 .ev82c .ev82a.f17ic img{width:100%!important;height:100%!important;object-fit:contain}
html.ui17 .s79p .u19c .u19a.f17ic{display:grid!important;place-items:center;aspect-ratio:1;width:100%!important;max-width:64px;margin:0 auto 4px}
html.ui17 .s79p .u19c .u19a.f17ic img.u17a{width:86%;height:86%;object-fit:contain}
html.ui17 .s79p .u19c .u19k{position:static!important;display:block!important;margin:0 0 3px!important;transform:none!important;inset:auto!important}
html.ui17 .s79p .u19c{display:flex!important;flex-direction:column;align-items:center}
/* Kho đồ: 4 ô cùng 1 khung, ảnh to, sao mép trên, dải tối mép đáy */
${SB('html.ui17 #hb-body .hb-slot.f17slot')}{background:radial-gradient(circle at 50% 40%,#14335f,#06142b 78%)!important;background-image:radial-gradient(circle at 50% 40%,#14335f,#06142b 78%)!important;border:0!important;outline:0!important;box-shadow:none!important;border-radius:0!important;overflow:visible!important}
${SB('html.ui17 #hb-body .hb-slot.f17slot .c9art')}{background:none!important;border:0!important;outline:0!important;box-shadow:none!important}
html.ui17 #hb-body .hb-slot.f17slot::before,html.ui17 #hb-body .hb-slot.f17slot::after{display:none!important}
html.ui17 #hb-body .hb-slot.f17slot > i.f17x{position:absolute!important;inset:0!important;left:0!important;top:0!important;width:100%!important;height:100%!important;display:block!important;background-size:100% 100%!important;background-position:center!important;background-repeat:no-repeat!important;background-color:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important;transform:none!important;margin:0!important;opacity:1!important;z-index:4!important;pointer-events:none}
html.ui17 #hb-body .hb-slot.f17slot .gear25-art{border:0!important;box-shadow:none!important;outline:0!important;border-radius:0!important;background-color:transparent!important;transform:scale(1.18);transform-origin:50% 45%}
html.ui17 #hb-body .hb-slot.f17slot .gear25-art::before,html.ui17 #hb-body .hb-slot.f17slot .gear25-art::after{display:none!important}
html.ui17 #hb-body .hb-slot.f17slot .gear25-art .c9s{visibility:hidden!important}
html.ui17 #hb-body .hb-slot.f17slot > i.u17s{position:absolute!important;top:7%!important;bottom:auto!important;left:0!important;right:0!important;width:auto!important;height:auto!important;margin:0!important;padding:0!important;background:none!important;border:0!important;box-shadow:none!important;transform:none!important;display:block!important;z-index:5!important;text-align:center!important;font:900 10px/1 sans-serif!important;font-style:normal!important;letter-spacing:-.5px!important;color:#ffd84a!important;text-shadow:0 1px 1px #000,0 0 3px #000!important;pointer-events:none;opacity:1!important}
html.ui17 #hb-body .hb-slot.f17slot .gear25-art .gl10,html.ui17 #hb-body .hb-slot.f17slot .c9art .gl10{display:none!important}
html.ui17 #hb-body .hb-slot.f17slot .c9art{border:0!important;box-shadow:none!important;background:none!important}
html.ui17 #hb-body .hb-slot.f17slot .c9art img{transform:scale(1.12)}
html.ui17 #hb-body .hb-slot.f17slot > small{position:absolute!important;left:9%;right:9%;bottom:7%;z-index:5;margin:0!important;padding:2px 0!important;text-align:center;background:linear-gradient(transparent,#020a18cc 35%,#020a18ee)!important;border-radius:0!important}
html.ui17 #hb-body .hb-slot.f17slot .hb-dot{z-index:7}
/* ⇄ ở Cường hóa: lên góc phải, không đè tên */
html.ui17 #nc307 .nc307-pc .sw9,html.ui17 #nc307 .nc307-ac .sw9{position:absolute!important;top:4px!important;right:4px!important;left:auto!important;width:24px!important;height:24px!important;font-size:12px!important;line-height:22px!important;z-index:6}
html.ui17 #nc307 .nc307-pc > b,html.ui17 #nc307 .nc307-ac > b.t{padding-right:26px;padding-left:26px}
/* Kho bản sao: đủ chữ ĐỘT PHÁ */
html.ui17 .ev82c .ev82b{display:grid!important;grid-template-columns:1.25fr .8fr 1.15fr .55fr 1fr;gap:3px}
html.ui17 .ev82c .ev82b button{min-width:0!important;padding:3px 2px!important;font-size:10px!important;letter-spacing:0!important;white-space:nowrap;overflow:visible}
html.ui17 .ev82c .ev82b button[data-e=cbrk]{font-size:9.5px!important}
/* ===== hệ nút thống nhất (độ ưu tiên được nâng bằng ${B} để thắng skin hop307) ===== */
${SB(SEC)}{
 background:linear-gradient(#1f5799 0,#163f73 48%,#0d2a52 52%,#123a6b 100%)!important;background-image:linear-gradient(#1f5799 0,#163f73 48%,#0d2a52 52%,#123a6b 100%)!important;border:1px solid #9cc4ea!important;border-radius:0!important;color:#eaf5ff!important;text-shadow:0 1px 0 #000a!important;
 box-shadow:inset 0 1px 0 #d6ebff88,inset 0 -2px 0 #061a33,0 0 0 1px #0a2140!important;clip-path:polygon(9px 0,100% 0,100% calc(100% - 9px),calc(100% - 9px) 100%,0 100%,0 9px)!important;filter:none!important;animation:none!important;-webkit-text-fill-color:#eaf5ff!important;border-image:none!important}
${SB(SEC,'::before')},${SB(SEC,'::after')}{display:none!important}
${SB('html.ui17 .m63-go.off')}{opacity:.85!important;color:#a9bfd6!important;-webkit-text-fill-color:#a9bfd6!important}
${SB('html.ui17 .wr8.use')}{color:#9fe9ff!important;-webkit-text-fill-color:#9fe9ff!important}
${SB(GOLD)}{
 color:#2a1700!important;-webkit-text-fill-color:#2a1700!important;text-shadow:0 1px 0 #fff4c0!important;background:linear-gradient(#fff6c4 0,#ffdc63 42%,#f2a91d 56%,#ffcc45 100%)!important;background-image:linear-gradient(#fff6c4 0,#ffdc63 42%,#f2a91d 56%,#ffcc45 100%)!important;border:1px solid #fff0b0!important;border-radius:0!important;border-image:none!important;
 box-shadow:inset 0 1px 0 #fffbe6,inset 0 -3px 0 #b9730a,0 2px 0 #4a2c00!important;clip-path:polygon(9px 0,100% 0,100% calc(100% - 9px),calc(100% - 9px) 100%,0 100%,0 9px)!important;filter:none!important}
${SB(GOLD,'::before')},${SB(GOLD,'::after')}{display:none!important}
${SB('html.ui17 .k307-acts button.go:disabled')}{background:linear-gradient(#3a4a5e,#263445)!important;background-image:linear-gradient(#3a4a5e,#263445)!important;color:#8fa3b8!important;-webkit-text-fill-color:#8fa3b8!important;border:1px solid #5a6e85!important;border-radius:0!important;clip-path:polygon(9px 0,100% 0,100% calc(100% - 9px),calc(100% - 9px) 100%,0 100%,0 9px)!important;box-shadow:none!important}
/* nút ✕ thống nhất: ô vuông Chrome vát góc */
${SB(XB)}{background:linear-gradient(#2a6bb5,#163f73 50%,#0d2a52 51%,#1a4f8f)!important;background-image:linear-gradient(#2a6bb5,#163f73 50%,#0d2a52 51%,#1a4f8f)!important;border:1px solid #cfe4f8!important;border-radius:0!important;border-image:none!important;color:#fff!important;-webkit-text-fill-color:#fff!important;font-size:16px!important;font-weight:900!important;text-indent:0!important;line-height:1!important;box-shadow:inset 0 1px 0 #ffffff88,0 0 0 1px #0a2140,0 2px 4px #0008!important;clip-path:polygon(6px 0,100% 0,100% calc(100% - 6px),calc(100% - 6px) 100%,0 100%,0 6px)!important;filter:none!important;opacity:1!important}
${SB(XB,'::before')},${SB(XB,'::after')}{display:none!important}
html.ui17 .u17hide{display:none!important}
/* Cửa hàng: thanh tab gọn, chừa chỗ cho ✕ */
html.ui17 #hub9 .h9tabs{padding-right:44px!important;gap:2px!important}
html.ui17 #hub9 .h9tabs button{padding-left:5px!important;padding-right:5px!important;letter-spacing:0!important;font-size:10.5px!important;min-width:0!important}
html.ui17 #hub9 .h9t{padding-right:4px!important;letter-spacing:0!important}
html.ui17 #hub9 .h9x{z-index:5}
/* nền tím lẻ → Royal Blue */
html.ui17 .sl11{background:linear-gradient(#123a6e,#0b2448)!important;border-color:#2f6bb3!important}
${SB('html.ui17 .tr67-slot.gem')}{background:linear-gradient(#123a6e,#0b2448)!important;background-image:linear-gradient(#123a6e,#0b2448)!important;border-color:#4f8fd8!important}
${SB('html.ui17 .tr67-slot.gem','::before')},${SB('html.ui17 .tr67-slot.gem','::after')}{display:none!important}
${SB('html.ui17 .tr67-slot.gem')}{border-image:none!important;box-shadow:inset 0 1px 0 #d6ebff44,0 0 0 1px #0a2140!important}
${SB('html.ui17 .sl11')}{background:linear-gradient(#123a6e,#0b2448)!important;background-image:linear-gradient(#123a6e,#0b2448)!important;border-color:#2f6bb3!important}
/* Kho đồ: hạ chói CHIẾN THẦN / TRANG PHỤC */
html.ui17 .c9sc button[data-c9g]{filter:saturate(.8) brightness(.82)}html.ui17 .c9sc button[data-c9g] small{color:#fff!important;text-shadow:0 1px 2px #000!important}
html.ui17 .c9tp{filter:brightness(.86) saturate(.85);text-shadow:0 1px 0 #fff4c066!important}
/* màn kết quả */
html.ui17 .rw306-s.u17rs{background:radial-gradient(circle at 50% 40%,#173c6e,#06142b 75%)!important;border:1px solid #6fa8e0!important;position:relative}
html.ui17 .rw306-s.u17rs > i{opacity:0!important}
html.ui17 .rw306-s.u17rs img.u17r{position:absolute;inset:10%;width:80%;height:80%;object-fit:contain;filter:drop-shadow(0 2px 3px #000a)}
html.ui17 .fx68 .fx68-bar{position:relative;background:linear-gradient(#06142b,#0b2448)!important;border:1px solid #6fa8e0!important;border-radius:0!important;border-image:none!important;box-shadow:inset 0 1px 0 #d6ebff55,0 0 0 1px #0a2140!important;clip-path:polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px);height:22px!important;overflow:hidden}
html.ui17 .fx68 .fx68-bar::before,html.ui17 .fx68 .fx68-bar::after{display:none!important}
html.ui17 .fx68 .fx68-bar > i{display:block;height:100%!important;background:linear-gradient(#5fb0ff,#1f5799 55%,#123a6b),linear-gradient(90deg,#1f5799,#ffd56a)!important;background-image:linear-gradient(90deg,#1f6fc0 0,#3aa8ff 60%,#ffd56a 100%)!important;box-shadow:inset 0 1px 0 #ffffff88,inset 0 -3px 0 #0006!important;border-radius:0!important;filter:none!important;animation:none!important}
html.ui17 .fx68 .fx68-bar b.u17p{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:900 11px/1 inherit;letter-spacing:1px;color:#fff;text-shadow:0 1px 2px #000,0 0 3px #000;z-index:2}
html.ui17 #nc307 .oc17t img.u17t{width:18px;height:18px;object-fit:contain;vertical-align:-4px;margin-right:4px}
`;
 let pend=new Set(),timer=0;
 function flush(){timer=0;if(!on()||play()){pend.clear();return;}const a=[...pend];pend.clear();for(const n of a){try{if(n.isConnected)walk(n);}catch{}}try{frames();misc();}catch{}}
 const mo=new MutationObserver(rs=>{if(!on()||play())return;for(const r of rs){if(r.type==='characterData')pend.add(r.target);else for(const n of r.addedNodes)pend.add(n);}if(!timer)timer=setTimeout(flush,120);});
 function init(){const s=document.createElement('style');s.id='ui17css';s.textContent=css;document.head.appendChild(s);
  const tick=()=>{document.documentElement.classList.toggle('ui17',on());icons();pieceArt();};tick();setInterval(tick,1000);
  mo.observe(document.body,{childList:true,subtree:true,characterData:true});
  setTimeout(()=>{if(on()){walk(document.body);frames();misc();}},700);setInterval(()=>{if(on()&&!play()){try{frames();misc();}catch{}}},700);}
 if(document.body)init();else window.addEventListener('DOMContentLoaded',init,{once:true});
 return {walk,frames,misc,FK,TICK,INFO,on};
})();window.UI17API=UI17;
