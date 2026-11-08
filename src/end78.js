// V78 · KẾT THÚC ẢI → BẮT BUỘC VỀ SẢNH: bỏ "Sang ải tiếp / Chơi lại / Thử lại", chỉ còn nút về sảnh chọn ải (để nâng cấp, dùng tính năng khác)
const End78=(()=>{
 const st=()=>document.getElementById('overlay')?.dataset.state||'';
 const isEnd=()=>typeof mode!=='undefined'&&['reward','over'].includes(mode);
 let shown=false;
 function goLobby(){
  try{if(typeof mode!=='undefined'&&(mode==='pause'||mode==='reward'))document.getElementById('dock-return')?.click();}catch{}
  try{Lobby.show();}catch{}
  try{const g=document.getElementById('gamemode');if(g&&g.value!=='campaign'){g.value='campaign';g.dispatchEvent(new Event('change'));}}catch{}
  setTimeout(()=>{try{Nav74.tab('combat');setTimeout(()=>{try{Nav74.sub('map');}catch{}},80);}catch{}},120);
  document.body.classList.remove('res78');}
 function apply(){
  if(window.END78===false)return;
  const on=isEnd()&&!window.__m78;
  document.body.classList.toggle('res78',on);
  if(!on){try{document.getElementById('next79')?.remove();}catch{}if(shown)for(const b of document.querySelectorAll('.e78h')){b.classList.remove('e78h');b.style.removeProperty('display');}shown=false;return;}
  const ov=document.getElementById('overlay');if(!ov)return;
  const hide=b=>{b.classList.add('e78h');b.style.setProperty('display','none','important');};for(const b of ov.querySelectorAll('#start,#dock-return,[data-f68="retry"]'))hide(b);
  for(const b of ov.querySelectorAll('#rs button'))if(/THỬ LẠI|CHƠI LẠI|ẢI TIẾP|thử lại|chơi lại|ải tiếp/.test(b.textContent))hide(b);
  let lb=document.getElementById('lobby-back');
  if(lb&&!lb.dataset.e78){lb.dataset.e78='1';lb.textContent='🏠 VỀ SẢNH · CHỌN ẢI';lb.onclick=e=>{e.preventDefault();e.stopPropagation();goLobby();};}
  const rs=ov.querySelector('#rs');if(lb&&rs&&lb.previousElementSibling!==rs)rs.after(lb);else if(lb&&lb.parentElement!==ov)ov.appendChild(lb);
  // V79B (Gemini, chủ dự án đồng ý): ải 1, 2, 4 thắng xong được bay tiếp ngay ải sau — các ải khác vẫn bắt buộc về sảnh
  try{let nx=document.getElementById('next79');const camp=gameMode==='campaign'&&mode==='reward'&&!(typeof lastReward!=='undefined'&&lastReward&&lastReward.dungeon)&&!(typeof Dungeons!=='undefined'&&Dungeons.active());
   const okLv=camp&&(window.NEXT79||[1,2,4]).includes(level|0);
   if(okLv&&lb){if(!nx){nx=document.createElement('button');nx.type='button';nx.id='next79';nx.textContent='▶ ẢI TIẾP THEO · ẢI '+((level|0)+1);nx.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();const s0=document.getElementById('start');if(s0)s0.click();});}
    nx.textContent='▶ ẢI TIẾP THEO · ẢI '+((level|0)+1);if(nx.previousElementSibling!==lb)lb.after(nx);}
   else if(nx)nx.remove();}catch{}
  shown=true;}
 setTimeout(()=>{setInterval(()=>{try{apply();}catch{}},250);},0);
 // ---------- màn kết quả gọn: bỏ thống kê, phần thưởng thành ô icon + số ở góc ----------
 let MATN=null;
 function matMap(){if(MATN)return MATN;MATN=[];try{for(const ty of MAT69.types)for(let t=1;t<=3;t++){const id=ty.id+t;MATN.push([V70.matName(id),id]);}MATN.push([MAT69.sss.n,MAT69.sss.id]);}catch{}MATN.sort((a,b)=>b[0].length-a[0].length);return MATN;}
 const IC=k=>{try{return ICON74[k]||'';}catch{return '';}};
 function iconOf(t){const s=t.toLowerCase();
  for(const [n,id] of matMap())if(t.includes(n)){let src='';try{src=V70.icon(id);}catch{}return [src,n];}
  if(s.includes('hợp kim')||s.includes('◈'))return [IC('res_hop_kim'),'Hợp kim'];
  if(s.includes('đá nâng cấp')||s.includes('⬢'))return [IC('res_da_nang_cap'),'Đá nâng cấp'];
  if(s.includes('kim cương')||s.includes('💎'))return [IC('res_kim_cuong'),'Kim cương'];
  if(s.includes('tinh hạch'))return [IC('res_tinh_hach'),'Tinh Hạch'];
  if(s.includes('xu'))return [IC('res_xu'),'Xu'];
  if(s.includes('mảnh'))return [IC('res_manh'),t.replace(/[+\d.,×x]/g,'').trim()];
  if(s.includes('lõi'))return [IC('res_loi'),'Lõi'];
  return null;}
 const numOf=t=>{t=String(t);const p=t.match(/\+\s*(\d[\d.,]*)/);if(p)return p[1];const m=t.match(/(\d[\d.,]*)/);return m?m[1]:'';};
 function slim(){const rs=document.querySelector('#overlay #rs');if(!rs)return;
  const loot=rs.querySelector('.rs-loot');if(!loot)return;
  for(const c of [...loot.querySelectorAll('.rs-chip')]){const t=c.textContent.trim();let ic=iconOf(t);if(!ic||!ic[0])ic=[IC(/phôi/i.test(t)?'ic_nguyen_lieu':'ic_qua'),t.replace(/^[^:]*:\s*/,'').replace(/^[+\d.,\s]+/,'')];if(!ic[0])continue;
   const d=document.createElement('div');d.className='rw78';d.title=t;d.setAttribute('aria-label',t);d.style.animationDelay=c.style.animationDelay;
   const img=document.createElement('img');img.src=ic[0];img.alt='';const n=document.createElement('span');n.className='n';n.textContent=numOf(t)||'';
   const l=document.createElement('small');l.textContent=ic[1];d.append(img,n,l);c.replaceWith(d);}
  loot.classList.add('rw78g');}
 setInterval(()=>{try{if(window.RS78!==false)slim();}catch{}},200);

 // phím Enter/Space trên máy tính ở màn kết quả cũng về sảnh thay vì vào ải tiếp
 document.addEventListener('keydown',e=>{if(!shown||window.END78===false)return;if(e.key==='Enter'||e.key===' '){e.preventDefault();e.stopPropagation();goLobby();}},true);
 return {goLobby,on:()=>shown};
})();
