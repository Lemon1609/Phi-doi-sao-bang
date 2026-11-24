'use strict';
// V309 Lượt 9 · ĐẠI TU BỐ CỤC SẢNH + KHO ĐỒ LƯỚI + BẢNG MÀU ROYAL BLUE
//  UX9 (tắt: window.UX9=false):
//   - Sảnh: hàng trên còn 4 cụm NHIỆM VỤ · PHÚC LỢI · BỘ SƯU TẬP · HỆ THỐNG (ẩn hàng ô cot307 cũ, không xóa: các ô cũ vẫn gọi được).
//     PHÚC LỢI = 4 tab Điểm Danh · Quà · Vòng Quay · Mùa Giải; BỘ SƯU TẬP = 3 tab Bách Khoa · Trang Phục · Cốt Truyện
//     (thanh tab nổi phía trên màn đang mở; mỗi tab gọi đúng màn cũ). Chấm đỏ của các mục con gộp ra nút ngoài.
//   - Ẩn 2 cột nút hai bên sân khấu (Tuần Tra / Viễn Chinh / Bách Khoa / Cốt Truyện / Thử Thách Ngày / Tối Thượng…):
//     Tuần Tra ở góc Bản đồ, Viễn Chinh là tab CHIẾN ĐẤU, Thử Thách Ngày + Tháp Boss + Vô Tận ở trang THỬ THÁCH, Tối Thượng ở PHI ĐỘI.
//   - Kho: chiến cơ giữa, 4 ô vuông lớn quanh tàu (Chiến cơ · Giáp · Tên lửa · Tàu con) + dòng chỉ số tổng; Túi đồ dạng lưới 4 cột.
//  THEME9 (tắt: window.THEME9=false): bảng màu bảng/popup Xanh Dương Hoàng Gia + viền bạc chrome + đường cyan, 3 tông nút. Chỉ CSS giao diện,
//   không đụng canvas trận.
const L9309=(()=>{
 const $=s=>document.querySelector(s);const uOn=()=>window.UX9!==false,tOn=()=>window.THEME9!==false;
 const IC=(k,fb)=>typeof ICON74!=='undefined'&&ICON74[k]?`<img src="${ICON74[k]}" alt="">`:`<b>${fb}</b>`;
 const toastS=s=>{try{toast(s);}catch{}};
 const items=()=>{try{return Cot307.items();}catch{return [];}};
 const itm=k=>items().find(x=>x.k===k)||{lk:false,dot:false};
 // ---------- các màn con ----------
 const H={
  pl:{n:'PHÚC LỢI',t:[
   {k:'daily',n:'ĐIỂM DANH',lv:3,go:()=>{const b=$('#hgr41 [data-go="daily"]');if(b)b.click();}},
   {k:'gifts',n:'QUÀ',go:()=>{try{Nav74.page('gifts');}catch{}}},
   {k:'wheel',n:'VÒNG QUAY',lv:45,go:()=>{try{Nav74.F.wheel.go();}catch{}}},
   {k:'season',n:'MÙA GIẢI',go:()=>{try{S77.open();}catch{}}}]},
  bst:{n:'BỘ SƯU TẬP',t:[
   {k:'codex',n:'BÁCH KHOA',go:()=>{try{L7309.open();}catch{}}},
   {k:'skin',n:'TRANG PHỤC',go:()=>{/* V2.2: dùng màn Trang phục & Khung avatar mới (12–13); tắt bằng window.V22=false */try{if(window.V22!==false&&window.V22UI&&V22UI.frOpen){V22UI.frOpen();return;}}catch{}try{L8309.open();}catch{try{Skin69.open();}catch{}}}},
   {k:'story',n:'CỐT TRUYỆN',go:()=>{try{Story80.journal();}catch{}}}]}};
 const OV='#m40,#nav74p,#w74,.m63';
 // V2.2.1: màn trong thanh tab có thể nằm ngoài OV (Rương = #hub40, Túi đồ #k307, Cường hóa #nc307, Quỹ/Q10…) → coi là đang mở để thanh tab không tự đóng sau 0,7 s
 const OV2=OV+',#hub40,#k307,#nc307,#c74,#q307,#cx7,.qf10,#v22fr,#v22hs';
 function closeOv(){try{Nav74.closeAll();}catch{}try{if(window.V22UI){V22UI.frClose();V22UI.hsClose();}}catch{}document.querySelectorAll(OV).forEach(e=>{if(!e.classList.contains('g74keep'))e.hidden=true;});}
 const anyOv=()=>[...document.querySelectorAll(window.HUBFIX22===false?OV:OV2)].some(e=>!e.hidden&&getComputedStyle(e).display!=='none');
 let hub=null,hk=null,hi=0,armed=0;
 function strip(){if(!hub){hub=document.createElement('div');hub.id='hub9';hub.hidden=true;document.body.appendChild(hub);
   hub.addEventListener('click',e=>{const b=e.target.closest('[data-h9]');if(!b)return;e.stopPropagation();if(b.dataset.h9==='x'){closeOv();hub.hidden=true;hk=null;document.documentElement.classList.remove('hub9on');return;}go(hk,+b.dataset.h9);});}return hub;}
 function paintStrip(){const s=strip();if(!hk){s.hidden=true;document.documentElement.classList.remove('hub9on');return;}const h=H[hk];
   document.documentElement.classList.add('hub9on');const _h=`<b class="h9t">${h.n}</b><div class="h9tabs">${h.t.map((t,i)=>{const st=itm(t.k);return `<button type="button" data-h9="${i}" class="${i===hi?'on':''}${st.lk?' lk':''}">${t.n}${st.dot&&i!==hi?'<em></em>':''}</button>`;}).join('')}</div><button type="button" class="h9x" data-h9="x" aria-label="Đóng">✕</button>`;if(s.__h!==_h){s.innerHTML=_h;s.__h=_h;}s.hidden=false;}
 function go(k,i){const h=H[k];if(!h)return;const t=h.t[i];if(!t)return;const st=itm(t.k);if(st.lk){toastS(t.n+' MỞ Ở ẢI '+(t.lv||''));if(hk)return;}
   closeOv();hk=k;hi=i;armed=performance.now()+700;try{t.go();}catch{}paintStrip();}
 function open(k){const h=H[k];if(!h)return;let i=h.t.findIndex(t=>{const s=itm(t.k);return s.dot&&!s.lk;});if(i<0)i=h.t.findIndex(t=>!itm(t.k).lk);go(k,Math.max(0,i));}
 setInterval(()=>{try{if(hub&&!hub.hidden&&performance.now()>armed&&!anyOv()){hub.hidden=true;hk=null;document.documentElement.classList.remove('hub9on');}else if(hub&&!hub.hidden)paintStrip();}catch{}},400);
 // ---------- hàng 4 cụm ở Sảnh ----------
 let row=null,last='';
 function lobby(){const html=document.documentElement;html.classList.toggle('ux9',uOn());html.classList.toggle('theme9',tOn());if(!uOn())return;
   const r=$('#hgr41');if(!r)return;const anchor=r.querySelector('.c307')||r.querySelector('.h1-ribbon');if(!anchor)return;
   if(!row||!row.isConnected){row=document.createElement('div');row.className='c9r';row.setAttribute('role','toolbar');anchor.parentNode.insertBefore(row,anchor);last='';
     row.addEventListener('click',e=>{const b=e.target.closest('[data-c9]');if(!b)return;e.stopPropagation();e.preventDefault();const k=b.dataset.c9;
       if(k==='missions'){closeOv();try{Q77.open('d');}catch{}}else if(k==='gear'){closeOv();try{Nav74.page('gear');}catch{}}else open(k);},true);}
   const I=items(),d=k=>{const x=I.find(y=>y.k===k);return !!(x&&x.dot&&!x.lk);};
   const dots={missions:d('missions'),pl:d('daily')||d('gifts')||d('wheel')||d('season'),bst:false,gear:false};
   const key=JSON.stringify(dots);if(key===last)return;last=key;
   const B=(k,n,ic,fb,cls='')=>`<button type="button" class="c9b ${cls}" data-c9="${k}" aria-label="${n}"><i>${IC(ic,fb)}</i><small>${n}</small>${dots[k]?'<em></em>':''}</button>`;
   row.innerHTML=B('missions','NHIỆM VỤ','ic_nhiem_vu','📋')+B('pl','PHÚC LỢI','ic_qua','🎁','gold')+B('bst','BỘ SƯU TẬP','ic_thanh_tuu','🏆')+B('gear','HỆ THỐNG','ic_cai_dat','⚙');}
 setInterval(()=>{try{lobby();kho();}catch{}},500);
 // ---------- Kho: tàu trên · 4 chỉ số trái · Trang phục phải · 3 lối tắt · hàng 4 ô đang mặc · CƯỜNG HÓA / CẢI TẠO / TÚI ĐỒ ----------
 const FORM=['thuong','luc','lam','lam','lam','lam','tim','tim','tim','tim','tim','tim5'];
 const fgo=id=>{try{const f=Nav74.F[id];if(!f)return;if(f.lk&&!f.lk()){toastS(f.n+' MỞ Ở ẢI '+f.lv);return;}f.go();}catch{}};
 let lastK='';
 function kho(){if(!uOn())return;const body=document.getElementById('hb-body');if(!body||!body.classList.contains('k307'))return;const doll=body.querySelector(':scope>.hb-doll');if(!doll)return;
   doll.classList.add('d9');let lc=0;try{lc=typeof launchCraft==='number'?launchCraft:0;}catch{}
   let cs=doll.querySelector('.c9ship');if(!cs){cs=document.createElement('button');cs.type='button';cs.className='hb-slot c9ship';doll.appendChild(cs);
     cs.addEventListener('click',e=>{e.stopPropagation();const sh=doll.querySelector('.hb-ship');if(sh)sh.click();});}
   let sc=doll.querySelector('.c9sc');if(!sc){sc=document.createElement('div');sc.className='c9sc';
     sc.innerHTML=[['ult','VŨ KHÍ TỐI THƯỢNG','ic_vu_khi_tt','✸'],['sss','CHIẾN THẦN','ic_sanh_sss','◆'],['stones','ĐÁ KHẢM','ic_da_kham','◆']].map(([id,n,ic,fb])=>`<button type="button" data-c9g="${id}"><i>${IC(ic,fb)}</i><small>${n}</small></button>`).join('');
     sc.addEventListener('click',e=>{const b=e.target.closest('[data-c9g]');if(!b)return;e.stopPropagation();fgo(b.dataset.c9g);});doll.appendChild(sc);}
   let tp=doll.querySelector('.c9tp');if(!tp){tp=document.createElement('button');tp.type='button';tp.className='c9tp';tp.innerHTML=`TRANG PHỤC ›`;
     tp.addEventListener('click',e=>{e.stopPropagation();try{L8309.open();}catch{try{Skin69.open();}catch{}}});doll.appendChild(tp);}
   let st=doll.querySelector('.c9st');if(!st){st=document.createElement('div');st.className='c9st';doll.appendChild(st);}
   let n=0,nm='Chiến cơ',lv=1;try{n=V70.craftN(lc)|0;}catch{}try{nm=Fighters28.profiles[lc].name;}catch{}try{lv=Workshop.craftProgress(lc).level|0;}catch{}
   const sel=!!(doll.querySelector('.hb-ship.k307-on'));cs.classList.toggle('k307-on',sel);
   let tn='';try{tn=TIER70.name[n]||'';}catch{}let src='';try{const S=SHIP118[String(lc)];src=S[FORM[n]]||S.tim||S.thuong||'';}catch{}
   const k=lc+'|'+n+'|'+lv+'|'+sel;if(k!==lastK||!cs.firstChild){lastK=k;cs.innerHTML=`<span class="c9art">${src?`<img src="${src}" alt="">`:''}</span><b>${nm} · ${tn}</b><small>Lv ${lv}/${(()=>{try{return Workshop.cap(Workshop.craftProgress(lc));}catch{return 100;}})()}</small>`;}
   try{const s=Combat.stats();let aux={};try{for(const i of (Progress.stats().auxiliary||[]))aux[i.kind]=(aux[i.kind]||0)+i.auxDamage*i.spec.count/i.interval;}catch{}const am=(aux.missiles||0)*.81,as=(aux.sidearm||0)*.81,f=v=>v>=100?Math.round(v).toLocaleString('vi-VN'):v.toFixed(1);
     const t=`<span>CÔNG TÀU<b>${f(Math.max(0,s.attack-am-as))}</b></span><span>MÁU · GIÁP<b>${Math.round(s.hp)} · ${Math.round(s.armor)}</b></span><span>CÔNG TÊN LỬA<b>${f(am)}</b></span><span>CÔNG TÀU CON<b>${f(as)}</b></span>`;if(st.dataset.k!==t){st.dataset.k=t;st.innerHTML=t;}}catch{}
   let bar=body.querySelector(':scope>.c9bar');if(!bar){bar=document.createElement('div');bar.className='c9bar';
     bar.innerHTML=`<button type="button" data-c9b="bag" class="bag"><i>🎒</i><small>TÚI ĐỒ</small></button><button type="button" data-c9b="up" class="up">CƯỜNG HÓA<small>Nâng cấp ⇄ Tiến bậc</small></button><button type="button" data-c9b="cai" class="cai">CẢI TẠO<small>Hợp thành ⇄ Hoàn nguyên</small></button><button type="button" data-c9b="back" class="back"><i>↩</i><small>TRỞ VỀ</small></button>`;
     bar.addEventListener('click',e=>{const b=e.target.closest('[data-c9b]');if(!b)return;e.stopPropagation();const a=b.dataset.c9b;
       if(a==='back'){try{Nav74.tab('home');}catch{}}else if(a==='bag'){try{KHO307.bag();}catch{}}else if(a==='cai'){try{KHO307.bag('cai');}catch{}}else{let id=null;try{id=KHO307.sel();}catch{}try{NC307.open(id||undefined);}catch{}}});
     const ob=body.querySelector(':scope>.k307-bar');(ob||doll).after(bar);
     try{const im=(window.KHO307_IMG||{}).icon_tui_do;if(im)bar.querySelector('.bag i').innerHTML=`<img src="${im}" alt="">`;}catch{}}}
 return {open,go,lobby,kho,H};
})();
