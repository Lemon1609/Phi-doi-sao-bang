// V79 · CHẶN LỐI VÀO GIAO DIỆN CŨ (trang cuộn dọc có thanh "Bản đồ · Phó bản / Kho trang bị / …")
//  Mọi lời gọi UI392.showTab ngoài trận → chuyển sang đúng màn mới của Nav74:
//   map → CHIẾN ĐẤU › PHÓ BẢN · arsenal → TRANG BỊ › KHO ĐỒ · hangar → PHI ĐỘI › CHIẾN CƠ · gems → PHI ĐỘI › HỢP THỂ · chests → SẢNH
//  Có thêm "lưới an toàn": nếu thanh #nav392 cũ lộ ra khi không chơi → tự về màn mới.
//  Tắt: window.NAV79=false
const Nav79=(()=>{
 const on=()=>window.NAV79!==false&&window.NAV74ON;
 const playing=()=>{try{return ['play','pause','reward','over'].includes(mode);}catch{return false;}};
 const DEST={map:['combat','dungeon'],arsenal:['equip','armory'],hangar:['fleet','ships'],gems:['fleet','sss'],chests:['home',null]};
 let last=0;
 function go(k){const d=DEST[k]||DEST.map;last=Date.now();
  try{document.getElementById('cmap')&&(document.getElementById('cmap').hidden=true);}catch{}
  try{Nav74.tab(d[0]);if(d[1])setTimeout(()=>{try{Nav74.sub(d[1]);}catch{}setTimeout(()=>{try{if(Nav74.state().sub!==d[1]){const f=Nav74.F[d[1]];toast(f&&f.lv?'🔒 '+f.n+' MỞ Ở ẢI '+f.lv:'Chưa mở tính năng này');}}catch{}},250);},90);}catch{}
  try{window.scrollTo(0,0);}catch{}}
 function install(){
  try{const o=UI392.showTab;UI392.showTab=function(name){let pl=false;try{pl=mode==='play';}catch{}if(on()&&!pl){go(name);return;}return o.apply(this,arguments);};}catch{}
  // nút "Phó bản · Nhiệm vụ ›" trên bản đồ chương
  document.addEventListener('click',e=>{if(!on())return;const b=e.target.closest&&e.target.closest('#cm-more');if(!b)return;e.preventDefault();e.stopImmediatePropagation();go('map');},true);
  setInterval(()=>{try{if(!on()||playing()||Date.now()-last<1500)return;const n=document.getElementById('nav392');if(!n)return;
    const e=document.elementFromPoint(innerWidth/2,innerHeight*.45);if(!e||!e.closest('main')||e.closest('#hub40,#cmap,#hgr41,.m63,#nav74p,#m40'))return;if(document.querySelector('#hub40:not([hidden]),#cmap:not([hidden]),#hgr41:not([hidden])'))return;
    const e2=document.elementFromPoint(innerWidth/2,innerHeight*.7);if(!e2||!e2.closest('main'))return;
    const p=n.querySelector('[aria-pressed="true"]');go(p?p.dataset.tab392:'map');}catch{}},800);
 }
 setTimeout(install,120);
 return {go};
})();
window.Nav79=Nav79;
