'use strict';
// V2.3 · Đợt U1 (nhánh v23-ui-meta): bảng màu tươi kiểu CCHT ngoài trận · sân khấu Sảnh / Kho sống (bắn liên tục, dừng khi có bảng / vào trận / ẩn app)
//  · bố cục Kho cổ điển (4 chỉ số góc trên trái, hàng lối tắt VKTT · CHIẾN THẦN · TRANG PHỤC · XƯỞNG SSS · ĐÁ KHẢM, ô trang bị có khóa + MAX, nút VỀ)
//  · KHÓA TRANG BỊ (lưu `saobang-lock23-v1`): món khóa không bị bán / phân giải, không làm vật liệu Cường hóa, Tiến bậc (nhanh), Hợp thành, Ép xung.
//  KHÔNG đụng kinh tế / cân bằng trận. Tắt cả: window.U1V23=false; từng phần U1PAL / U1STAGE / U1KHO / LOCK23 = false.
const Lock23=(()=>{
 const KEY='saobang-lock23-v1';let S={g:{},c:{}};
 try{const o=JSON.parse(localStorage.getItem(KEY)||'null');if(o&&typeof o==='object')S={g:o.g||{},c:o.c||{}};}catch{}
 const on=()=>window.U1V23!==false&&window.LOCK23!==false;
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const has=id=>on()&&id!=null&&!!S.g[String(id)];
 const hasC=i=>on()&&i!=null&&!!S.c[String(i)];
 function toggle(kind,id){const T=kind==='c'?S.c:S.g,k=String(id);if(T[k])delete T[k];else T[k]=1;save();try{window.dispatchEvent(new CustomEvent('lock23',{detail:{kind,id:k,on:!!T[k]}}));}catch{}return !!T[k];}
 let lastT=0;function warn(n){const t=performance.now();if(t-lastT<900)return;lastT=t;try{toast(n>1?('Bỏ qua '+n+' món đang KHÓA — mở khóa trong Túi đồ nếu muốn dùng.'):'Món này đang KHÓA — mở khóa trong Túi đồ nếu muốn dùng.');}catch{}}
 // lưới an toàn cuối: không xóa món đang khóa dù đường gọi nào lọt bộ lọc (ghi lại để chẩn đoán)
 const blk=[];function guardRemove(){try{const V=Progress.v70;if(!V||V.remove.__l23)return!!V;const o=V.remove;const f=function(id){if(has(id)){blk.push({id:String(id),s:(new Error().stack||'').split('\n').slice(2,4).join(' | ').slice(0,200)});if(blk.length>20)blk.shift();warn(1);return false;}return o.apply(this,arguments);};f.__l23=1;V.remove=f;return true;}catch{return false;}}
 let n=0;const iv=setInterval(()=>{if(guardRemove()||++n>60)clearInterval(iv);},250);
 return {has,hasC,toggle,warn,state:()=>JSON.parse(JSON.stringify(S)),blocked:()=>blk.slice(),KEY};
})();
window.Lock23=Lock23;
const U1V23=(()=>{
 const on=k=>window.U1V23!==false&&(!k||window[k]!==false);
 const md=()=>{try{return mode;}catch{return '';}};
 const inBattle=()=>{const m=md();return m==='play'||m==='pause';};
 document.documentElement.classList.add('u1v23');
 // ---------------- 1. nút 4 màu theo vai trò (đọc chữ nút; ghi nhớ theo chữ để khỏi quét lại) ----------------
 const RULES=[['e',/^(TIẾN BẬC NHANH|TIẾN KHUNG NHANH|GỘP KINH NGHIỆM|BÁN|BÁN \/ PHÂN GIẢI|PHÂN GIẢI|PHÂN GIẢI NHANH|TỰ ĐỘNG HỢP THÀNH|TỰ ĐỘNG CHỌN|CÀN QUÉT|CÀN QUÉT NHANH)$/],
  ['o',/^(VÔ TẬN|KHIÊU CHIẾN|XUẤT KÍCH NHANH)/],
  ['g',/^(CHIẾN ĐẤU|CHIẾN DỊCH|XUẤT KÍCH|NHẬN|NHẬN HẾT|NHẬN THƯỞNG|CƯỜNG HÓA|NÂNG CẤP|TIẾN BẬC|ÉP XUNG|HỢP THÀNH|HỢP THỂ|MỞ|MỞ TẤT CẢ|MỞ HẾT|QUAY|ĐỘT PHÁ)\b/],
  ['s',/^(MẶC TỐT NHẤT|ĐỔI MÓN|CỬA HÀNG|CHI TIẾT|CÂY TIỀM NĂNG|THÔNG TIN)/],
  ['c',/^(PHI CÔNG|KHO ĐỒ|TRANG BỊ|CẢI TẠO|TÚI ĐỒ|VKTT|VŨ KHÍ TỐI THƯỢNG|VỀ|TRỞ LẠI|← TRỞ LẠI)/]];
 const SKIP='#hub40 .c9tp,#k307 .k307-foot button,#k307 .k9foot button,.nc307-tabs button,.oc17t button,#k307 .k307-tabs button,#k307 .k9tabs button,#robot-control *,#pause,#tele07 *,.k307-row,.nc307-row,[role=tab],.tb22 button,.m63-x,.nc307-x,[data-k="x"],.h9x,.l22dock,.l22rail *,.hb-slot,.c9sc button,.ar9,.cm-node,#hdr9 .ch9 button,.ck9 .bv9.r,.b11,.u1lk';
 function classify(){if(!on('U1PAL')||inBattle())return;for(const b of document.querySelectorAll('button,#lob22 [role=button]')){const raw=(b.innerText||'').replace(/\s+/g,' ').trim();if(b.dataset.u1t===raw)continue;b.dataset.u1t=raw;
   b.classList.remove('u1o','u1g','u1c','u1e','u1b','u1s');if(!raw||raw.length>26||b.matches(SKIP))continue;const T=raw.toUpperCase().replace(/[›‹⇄✦◈⬢»«]/g,'').trim();
   for(const [k,re] of RULES)if(re.test(T)){b.classList.add(k==='s'?'u1s':'u1b','u1'+(k==='s'?'s':k));break;}}}
 // ---------------- 2. sân khấu sống: dừng khi vào trận; bể đạn Sảnh ≤ 36; DPR NHẸ = 1 (canvas Sảnh qua DPRU1) ----------------
 const lite=()=>{try{return VisualFX.counts().quality==='light';}catch{return false;}};
 window.DPRU1=()=>(on('U1STAGE')&&lite())?1:Math.min(2,devicePixelRatio||1);
 const L={t0:0,fr:0};
 setInterval(()=>{window.__u1pause=on('U1STAGE')&&inBattle();
  try{if(on('U1STAGE')&&window.HANGAR_DEMO&&typeof shots!=='undefined'&&shots.length>36)shots.splice(0,shots.length-36);}catch{}},120);
 // ---------------- 3. Kho cổ điển ----------------
 const f=v=>v>=100?Math.round(v).toLocaleString('vi-VN'):(+v).toFixed(1);
 function stats(){const s=Combat.stats();let aux={};try{for(const i of (Progress.stats().auxiliary||[]))aux[i.kind]=(aux[i.kind]||0)+i.auxDamage*i.spec.count/i.interval;}catch{}const am=(aux.missiles||0)*.81,as=(aux.sidearm||0)*.81;
  let oc=0;try{oc=Q10309.ocHits()*10;}catch{}let dmg=0;try{const m=/([+−-]?\d+)\s*%/.exec((document.querySelector('#lb68 .nm9')||{}).textContent||'');if(m)dmg=+m[1].replace('−','-');}catch{}
  return {cp:s.cp,atk:Math.max(0,s.attack-am-as),hp:s.hp,ar:s.armor,am,as,oc,dmg};}
 const ICO={atk:'<svg viewBox="0 0 16 16"><path d="M8 1l2 5h5l-4 3 2 6-5-4-5 4 2-6-4-3h5z" fill="#ffd54f"/></svg>',hp:'<svg viewBox="0 0 16 16"><path d="M8 14S1 9.5 1 5.3A3.3 3.3 0 0 1 8 3.6a3.3 3.3 0 0 1 7 1.7C15 9.5 8 14 8 14z" fill="#ff5a6e"/></svg>',
  am:'<svg viewBox="0 0 16 16"><path d="M8 1c2 2 3 5 3 8l-1 3H6L5 9c0-3 1-6 3-8z" fill="#ffb347"/><path d="M6 12l2 3 2-3z" fill="#ff7a1a"/></svg>',as:'<svg viewBox="0 0 16 16"><path d="M8 2l2 6h4l-6 6-6-6h4z" fill="#5ee4ff"/></svg>'};
 let kLast='',kT=0;
 function kho(){const doll=document.querySelector('#hub40 .hb-doll.d9');document.documentElement.classList.toggle('u1kho',on('U1KHO')&&!!doll);if(!on('U1KHO')||!doll)return;
  const stg=doll.querySelector('.stg9');if(!stg)return;
  let p=stg.querySelector(':scope>.u1st');if(!p){p=document.createElement('div');p.className='u1st';stg.appendChild(p);}
  const now=performance.now();if(now-kT>600){kT=now;try{const s=stats();const h=`<p class="u1cp"><small>TỔNG LỰC CHIẾN</small><b>${Math.round(s.cp).toLocaleString('vi-VN')}</b></p><p class="u1oc"><small>Cộng điểm (Siêu Tần Tuần)</small><b>+${s.oc}%</b></p>`+
     `<ul><li>${ICO.atk}<small>Công Chiến cơ</small><b>${f(s.atk)}</b></li><li>${ICO.hp}<small>Máu · Giáp</small><b>${Math.round(s.hp)} · ${Math.round(s.ar)}</b></li><li>${ICO.am}<small>Công Tên lửa</small><b>${f(s.am)}</b></li><li>${ICO.as}<small>Công Tàu con</small><b>${f(s.as)}</b></li></ul>`;if(h!==kLast){kLast=h;p.innerHTML=h;}}catch{}}
  // hàng lối tắt: VKTT hiện lại + TRANG PHỤC
  const sc=doll.querySelector('.c9sc');if(sc){sc.classList.add('u1sc');for(const o of sc.querySelectorAll('[data-c9g=tp23]'))o.remove();
   if(!sc.querySelector('[data-c9g=pc23]')){const b=document.createElement('button');b.type='button';b.dataset.c9g='pc23';b.innerHTML='<i class="u1ic"><svg viewBox="0 0 16 16" width="15" height="15"><circle cx="8" cy="5" r="3" fill="#fff"/><path d="M2 15c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5z" fill="#fff"/></svg></i><small>PHI CÔNG</small>';
     b.addEventListener('click',e=>{e.stopPropagation();try{Pilot67.open();}catch{try{Nav74.F.pilot&&Nav74.F.pilot();}catch{}}});sc.insertBefore(b,sc.firstChild);}
   const u=sc.querySelector('[data-c9g=ult]');if(u){u.style.setProperty('display','flex','important');const sm=u.querySelector('small');if(sm&&sm.textContent!=='VKTT')sm.textContent='VKTT';}
   const ord=['pc23','ult','sss','ssss','stones'];for(const id of ord){const b=sc.querySelector('[data-c9g='+id+']');if(b)sc.appendChild(b);}}
  // nút VỀ ở thanh đáy
  const bar=document.querySelector('#hb-body .c9bar');if(bar&&!bar.querySelector('.u1ve')){const b=document.createElement('button');b.type='button';b.className='u1ve u1b u1c';b.innerHTML='<small>VỀ</small>';b.addEventListener('click',e=>{e.stopPropagation();const k=document.querySelector('#hub40 .bk22');if(k)k.click();else try{Nav74.tab('home');}catch{}});bar.appendChild(b);}
  // ô trang bị: khóa + MAX
  if(on('LOCK23'))for(const sl of doll.querySelectorAll('.hb-slot')){const ref=slotRef(sl);if(!ref)continue;let lk=sl.querySelector(':scope>.u1lk');if(!lk){lk=document.createElement('i');lk.className='u1lk';lk.setAttribute('role','button');sl.appendChild(lk);}
    const L=ref.k==='c'?Lock23.hasC(ref.id):Lock23.has(ref.id);lk.classList.toggle('on',L);lk.dataset.k=ref.k;lk.dataset.id=ref.id;lk.setAttribute('aria-label',L?'Mở khóa':'Khóa');
    const sm=sl.querySelector(':scope>small');const m=sm&&/(\d+)\s*\/\s*(\d+)/.exec(sm.textContent||'');sl.classList.toggle('u1max',!!m&&+m[1]>=+m[2]);}}
 function slotRef(sl){try{if(sl.classList.contains('c9ship')){const lc=(typeof launchCraft==='number'?launchCraft:selected);return {k:'c',id:lc};}
   const kind=sl.querySelector('.gear25-armor')?'armor':sl.querySelector('.gear25-missiles')?'missiles':sl.querySelector('.gear25-sidearm')?'sidearm':null;if(!kind)return null;const id=(Progress.v70.equipped()||{})[kind];return id?{k:'g',id}:null;}catch{return null;}}
 // ---------------- 4. khóa ở Túi đồ: ổ khóa trên từng hàng trang bị / chiến cơ ----------------
 function bag(){if(!on('LOCK23'))return;for(const r of document.querySelectorAll('#k307 .k307-row[data-k="item"],#k307 .k307-row[data-k="ship"]')){const k=r.dataset.k==='ship'?'c':'g',id=r.dataset.id;const ic=r.querySelector('.k307-ic');if(!ic)continue;
   let lk=ic.querySelector(':scope>.u1lk');if(!lk){lk=document.createElement('i');lk.className='u1lk';lk.setAttribute('role','button');ic.appendChild(lk);}const L=k==='c'?Lock23.hasC(id):Lock23.has(id);lk.classList.toggle('on',L);lk.dataset.k=k;lk.dataset.id=id;r.classList.toggle('u1locked',L);}}
 const lkTap=e=>{const t=e.target&&e.target.closest&&e.target.closest('.u1lk');if(!t||!on('LOCK23'))return;e.stopImmediatePropagation();e.preventDefault();
  if(e.type!=='click')return;const L=Lock23.toggle(t.dataset.k,t.dataset.id);t.classList.toggle('on',L);try{toast(L?'Đã KHÓA — không bị bán, phân giải hay dùng làm vật liệu.':'Đã MỞ KHÓA.');}catch{}try{bag();kho();}catch{}};
 for(const ty of ['pointerdown','pointerup','mousedown','mouseup','touchend','click'])window.addEventListener(ty,lkTap,{capture:true});/* window: chạy trước bộ bắt chạm ô (v2142 PICK42 ở document) */
 let busy=false;const mo=new MutationObserver(()=>{if(busy||inBattle())return;busy=true;requestAnimationFrame(()=>{busy=false;try{bag();}catch{}});});
 setInterval(()=>{if(!on()||inBattle())return;try{classify();}catch{}try{kho();}catch{}try{const k=document.getElementById('k307');if(k&&!k.__u1){k.__u1=1;mo.observe(k,{childList:true,subtree:true});}bag();}catch{}},400);
 return {classify,kho,bag,stats,slotRef};
})();
window.U1V23S=U1V23;
