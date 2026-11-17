'use strict';
// V307 · SẢNH: thay 3 nút dài QUÀ / VÒNG QUAY / HỆ THỐNG bằng HÀNG Ô VUÔNG (học bố cục game gốc:
// hàng icon vuông + 1 nút nổi bật bên phải). Thêm lối vào thẳng NHIỆM VỤ · MÙA GIẢI · ĐIỂM DANH.
// Không viết lại màn chức năng: mỗi ô gọi đúng hàm cũ (Q77 / S77 / Nav74 / nút gốc đã ẩn).
// Tắt: window.COT307=false (hiện lại hàng nút cũ).
(()=>{try{
 if(window.COT307===false)return;
 const $=s=>document.querySelector(s);
 const ob=k=>{try{return Onboard66.open(k);}catch{return true;}};
 const NV=()=>typeof Nav74!=='undefined'?Nav74:null;
 const fdot=id=>{try{const f=NV().F[id];return !!(f&&f.dot&&f.dot());}catch{return false;}};
 const IC=(k,fb)=>typeof ICON74!=='undefined'&&ICON74[k]?`<img src="${ICON74[k]}" alt="">`:`<b>${fb}</b>`;
 const IT=[
  {k:'missions',n:'NHIỆM VỤ',ic:'ic_nhiem_vu',fb:'📋',go:()=>{try{Q77.open('d');}catch{}},dot:()=>{try{return !!Q77.ready();}catch{return false;}}},
  {k:'season',n:'MÙA GIẢI',ic:'ic_thanh_tuu',fb:'🏁',go:()=>{try{S77.open();}catch{}},dot:()=>{try{return !!S77.ready();}catch{return false;}}},
  {k:'daily',n:'ĐIỂM DANH',ic:'ic_diem_danh',fb:'📅',lv:3,lk:()=>!ob('daily'),go:()=>{const b=$('#hgr41 [data-go="daily"]');if(b)b.click();},dot:()=>{const d=$('#hgr41 [data-go="daily"] .h1-dot');return !!(d&&!d.hidden);}},
  {k:'wheel',n:'VÒNG QUAY',ic:'ic_vong_quay',fb:'🎡',lv:45,lk:()=>{try{return !Econ74.wOpen();}catch{return false;}},go:()=>{try{NV().F.wheel.go();}catch{}},dot:()=>fdot('wheel')},
  {k:'gear',n:'HỆ THỐNG',ic:'ic_cai_dat',fb:'⚙',go:()=>{try{NV().page('gear');}catch{}}},
  {k:'gifts',n:'QUÀ',ic:'ic_qua',fb:'🎁',big:1,go:()=>{try{NV().page('gifts');}catch{}},dot:()=>fdot('gifts')}];
 const st=it=>{let lk=false,dot=false;try{lk=!!(it.lk&&it.lk());}catch{}try{dot=!lk&&!!(it.dot&&it.dot());}catch{}return {lk,dot};};
 let row=null,last='';
 function paint(){const r=$('#hgr41');if(!r)return;const rib=r.querySelector('.h1-ribbon');if(!rib)return;
  if(!row||!row.isConnected){row=document.createElement('div');row.className='c307';row.setAttribute('role','toolbar');rib.parentNode.insertBefore(row,rib);r.classList.add('c307on');
   row.addEventListener('click',e=>{const b=e.target.closest('[data-c307]');if(!b)return;e.stopPropagation();e.preventDefault();const it=IT.find(x=>x.k===b.dataset.c307);if(!it)return;
    if(st(it).lk){try{toast(it.n+' MỞ Ở ẢI '+it.lv);}catch{}return;}try{NV().closeAll();}catch{}it.go();},true);}
  const S=IT.map(st),key=S.map(s=>(s.lk?1:0)+''+(s.dot?1:0)).join();if(key===last)return;last=key;
  row.innerHTML=IT.map((it,i)=>`<button type="button" class="c307b${it.big?' big':''}${S[i].lk?' lk':''}" data-c307="${it.k}" aria-label="${it.n}"><i>${IC(it.ic,it.fb)}</i><small>${it.n}</small>${S[i].lk?`<u>Ải ${it.lv}</u>`:''}${S[i].dot?'<em></em>':''}</button>`).join('');}
 // Lobby74 đôi khi kịp dựng cột cũ (VIỄN CHINH / TIỆN ÍCH) trước khi Nav74 bật → dọn để sảnh không nhấp nháy
 function tidy(){if(!window.NAV74ON)return;document.querySelectorAll('#hgr41 .h1-stage .l74:not(.n74-l):not(.n74-r)').forEach(e=>e.remove());}
 setInterval(()=>{try{paint();tidy();}catch(e){}},600);
 window.Cot307={paint:()=>{last='';paint();},items:()=>IT.map(it=>({k:it.k,...st(it)}))};
}catch(e){console.warn('COT307',e);}})();
