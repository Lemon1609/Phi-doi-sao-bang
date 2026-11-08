// OC75 · Khế Ước Tinh Luyện SSS (BALANCE75, Gemini 23/10)
// Trang bị SSS đã đạt +5: 1 Đá Tinh Luyện (hoặc 150 💎) + 20.000 ◈ → +0,5–1,5% sát thương nguyên tố của món đó, trần +15%.
// Áp vào Gear44.dmgMult (bản build nhân thêm OC75.mult(id)). Đá bán ở quầy kim cương Chợ Đen (150 💎).
const OC75=(()=>{
 const C={GEM:150,ALLOY:20000,MIN:.005,MAX:.015,CAP:.15,NEED:5,KEY:'saobang-oc75-v1'};
 let S={b:{},st:0,n:0};try{Object.assign(S,JSON.parse(localStorage.getItem(C.KEY)||'{}'));}catch{}
 const save=()=>{try{localStorage.setItem(C.KEY,JSON.stringify(S));}catch{}};
 const T=m=>{try{toast(m);}catch{}};
 const fmt=n=>Math.round(n).toLocaleString('vi-VN');
 const pct=v=>(Math.round(v*1000)/10).toLocaleString('vi-VN')+'%';
 const def=id=>{try{return GEAR_FX.byId[id]||(Gear44.defs().find(d=>d.id===id))||null;}catch{return null;}};/* V156: thêm 15 SSS mới (không thuộc GEAR_FX) */
 const elem=id=>{try{for(const [k,s] of Object.entries(CODEX77.SETS))if(s.items.includes(id))return s;}catch{}return {n:'Nguyên tố',ic:'✦',col:'#7df9ff'};};
 const enh=id=>{try{return Gear44.sssEnh(id)|0;}catch{return 0;}};
 function list(){let o={};try{o=Gear44.state().owned||{};}catch{}return Object.keys(o).filter(id=>{const d=def(id);return d&&(d.tier==='sss'||/^sss_/.test(id));});}
 const mult=id=>1+Math.min(C.CAP,S.b[id]||0);
 function refine(id){try{if(['play','pause','reward'].includes(mode)){T('VỀ SẢNH ĐỂ TINH LUYỆN');return false;}}catch{}if(enh(id)<C.NEED){T('CẦN ĐẠT +'+C.NEED);return false;}const cur=S.b[id]||0;if(cur>=C.CAP-1e-9){T('ĐÃ ĐẠT TRẦN +15%');return false;}
  let bal=0;try{bal=Progress.balance();}catch{}if(bal<C.ALLOY){T('THIẾU HỢP KIM · cần '+fmt(C.ALLOY));return false;}
  let useStone=S.st>0;if(!useStone){try{if(!Econ74.spend(C.GEM)){T('THIẾU KIM CƯƠNG · cần '+C.GEM);return false;}}catch{T('THIẾU KIM CƯƠNG');return false;}}
  if(!Progress.spendCredits(C.ALLOY)){if(!useStone)try{Econ74.add(C.GEM,'hoàn tinh luyện');}catch{}return false;}
  if(useStone)S.st--;const g=Math.round((C.MIN+Math.random()*(C.MAX-C.MIN))*1000)/1000;S.b[id]=Math.min(C.CAP,cur+g);S.n++;save();
  try{Q77.track('upgrade',1);}catch{}try{Progress.render();}catch{}T('TINH LUYỆN +'+pct(S.b[id]-cur)+' · tổng +'+pct(S.b[id]));return true;}
 let el=null;
 function open(){if(!el){el=document.createElement('div');el.className='m63 v75p oc75p';document.body.appendChild(el);
   el.addEventListener('click',e=>{const b=e.target.closest('[data-oc]');if(!b){if(e.target===el)el.hidden=true;return;}if(b.dataset.oc==='x'){el.hidden=true;return;}if(refine(b.dataset.oc))render();});}
  render();el.hidden=false;}
 function render(){const L=list();let gems=0,bal=0;try{gems=Econ74.gems();bal=Progress.balance();}catch{}
  const rows=L.length?L.map(id=>{const d=def(id),e=elem(id),lv=enh(id),v=S.b[id]||0,ok=lv>=C.NEED&&v<C.CAP-1e-9;
   return `<div class="oc75-r" style="--oc:${e.col}"><i>${e.ic}</i><div><b>${(d&&d.name)||id} <em>+${lv}</em></b><small>${e.n} · tinh luyện <b>+${pct(v)}</b> / 15%</small><span class="oc75-bar"><s style="width:${Math.min(100,v/C.CAP*100)}%"></s></span></div><button data-oc="${id}" ${ok?'':'disabled'}>${lv<C.NEED?'CẦN +5':v>=C.CAP-1e-9?'TRẦN':S.st>0?'1 ĐÁ + 20K ◈':C.GEM+' 💎 + 20K ◈'}</button></div>`;}).join('')
   :'<p class="v75-s">Chưa có trang bị SSS. Hợp thể ở mục HỢP THỂ → TRANG BỊ SSS.</p>';
  el.innerHTML=`<div class="m63-card v75-card0"><div class="v75-top"><b>KHẾ ƯỚC TINH LUYỆN SSS</b><button data-oc="x" class="v75-x">✕</button></div>
   <p class="v75-s">Món SSS đạt <b>+5</b>: mỗi lần tinh luyện tăng ngẫu nhiên <b>0,5–1,5%</b> sát thương của món đó, tối đa <b>+15%</b>.<br>Giá: <b>1 Đá Tinh Luyện</b> (Chợ Đen) hoặc <b>${C.GEM} 💎</b>, kèm <b>${fmt(C.ALLOY)} ◈</b>.</p>
   <p class="v75-s">Đá Tinh Luyện: <b>${S.st}</b> · 💎 ${fmt(gems)} · ◈ ${fmt(bal)}</p><div class="oc75-l">${rows}</div></div>`;}
 return {mult,refine,open,addStone:n=>{S.st=(S.st|0)+(n|0);save();},state:()=>JSON.parse(JSON.stringify(S)),C};
})();
