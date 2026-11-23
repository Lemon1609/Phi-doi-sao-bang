// V2.2 · MÀN KẾT QUẢ GỌN (máy thật 24/11): chỉ sao + tên ải + điểm/hạng + VẬT PHẨM ĐẠT ĐƯỢC (bỏ ô 0) + 2 nút vát góc.
//  Thắng: VỀ SẢNH (thép) + ẢI TIẾP (vàng, chỉ ải chiến dịch thường mở được ải sau).
//  Thua : THẤT BẠI + tên ải + 1 dòng lực chiến (chỉ khi thiếu) + vật phẩm nhặt được (>0) + VỀ SẢNH + CHƠI LẠI (chiến dịch thường).
//  Bỏ: "So với lần trước", 4 ô so sánh, 2 thanh tỉ lệ sát thương, dòng "Loạt đạn chính…", chi tiết sát thương, lưới thống kê, gợi ý 3★.
//  Tắt: window.END22=false (quay lại màn cũ + End78 cũ).
const End22=(()=>{
 const on=()=>window.END22!==false;
 const NOT=':not(#_e22)'.repeat(80),P='html.end22 body'+NOT+' ';
 const css=`
${P}#overlay.e22 :is(.rs-grid,.rs-hint,.s206,details,.dps98,.q7tem,.v77r small,.rw306-c.zero,.rw78.e22h,#lobby-back,#next79){display:none!important}
${P}#overlay.e22.e22l :is(.rs-score,.v77r){display:none!important}
${P}#overlay.e22 .rw306.e22z{display:none!important}
${P}#overlay.e22 .e22h3{margin:12px 0 6px;font:800 12px/1 inherit;letter-spacing:.2em;color:#9fd2ff;text-align:center}
${P}#overlay.e22 .rs-loot.e22e{display:none!important}
${P}#overlay.e22 .fx68.e22f{padding:10px 12px!important;margin:10px 0 0!important}
${P}#overlay.e22 .fx68.e22f :is(p,.fx68-b){display:none!important}
${P}#overlay.e22 .fx68.e22ok{display:none!important}
${P}#e22a{display:flex;gap:10px;width:min(92%,420px);margin:14px auto calc(var(--sab42,0px) + 10px);position:relative;z-index:3}
${P}#e22a button{flex:1;min-height:50px;padding:0 10px;border:0!important;border-radius:0!important;
 clip-path:polygon(10px 0,calc(100% - 10px) 0,100% 10px,100% calc(100% - 10px),calc(100% - 10px) 100%,10px 100%,0 calc(100% - 10px),0 10px);
 font:900 15px/1 inherit;letter-spacing:.06em;cursor:pointer;
 box-shadow:inset 0 1px 0 rgba(255,255,255,.55),inset 0 -2px 0 rgba(0,0,0,.35),inset 0 0 0 1px rgba(255,255,255,.22)!important}
${P}#e22a .e22s{background:linear-gradient(180deg,#6f97d2 0%,#3561a8 42%,#1f437f 58%,#152f5c 100%)!important;color:#eaf4ff!important;text-shadow:0 1px 0 #0a1a33}
${P}#e22a .e22g{background:linear-gradient(180deg,#fff3c4 0%,#f8c95a 34%,#dc951c 60%,#a35c09 100%)!important;color:#2b1300!important;text-shadow:0 1px 0 #ffe9a8}
${P}#e22a button:active{filter:brightness(.86)}`;
 // ---- ghi nhận lượt chơi "chiến dịch thường" (để quyết hiện ẢI TIẾP / CHƠI LẠI) ----
 function plainNow(){try{
  if(document.getElementById('gamemode')?.value!=='campaign'||(typeof gameMode!=='undefined'&&gameMode!=='campaign'))return false;
  if(window.__m78||window.__prac206)return false;
  const t=[()=>Dungeons.active(),()=>Meta40.state().run,()=>Econ74._run(),()=>Rift307._run(),()=>Hop309._run(),()=>O78.run(),()=>Eclipse67.active(),()=>Play63.active(),()=>Expedition67.active&&Expedition67.active(),()=>L11309.state().hRun||L11309.state().hPend];
  for(const f of t){try{if(f())return false;}catch{}}
  try{if(typeof lastReward!=='undefined'&&lastReward&&lastReward.dungeon)return false;}catch{}
  return true;}catch{return false;}}
 let run={plain:false,lv:0},prev='';
 setInterval(()=>{try{if(!on())return;const m=typeof mode!=='undefined'?mode:'';
  if(m==='play'){if(prev!=='play'&&prev!=='pause')run={plain:plainNow(),lv:level|0};else run.plain=run.plain&&plainNow();}
  prev=m;}catch{}},200);
 function launch(s){
  try{End78.clean(true);}catch{}
  try{document.querySelectorAll('#hub40,.c72,#g44').forEach(e=>e.hidden=true);}catch{}
  try{Hangar41.stop&&Hangar41.stop();}catch{}try{Hangar41.close();}catch{}try{Lobby.hide();}catch{}
  const gm=document.getElementById('gamemode');gm.value='campaign';try{syncModeSetup();}catch{}
  try{if(s>160&&typeof Ch9!=='undefined')Ch9.ensureOptions();}catch{}
  const sel=document.getElementById('mission-select');
  if(![...sel.options].some(o=>o.value==String(s))){const o=document.createElement('option');o.value=String(s);o.textContent='Ải '+s;sel.appendChild(o);}
  sel.value=String(s);document.getElementById('start').click();}
 const canGo=s=>{try{return Progress.canStart(s);}catch{return false;}};
 function paint(){
  const ov=document.getElementById('overlay');if(!ov)return;
  const m=typeof mode!=='undefined'?mode:'';const end=(m==='reward'||m==='over'||m==='win')&&!ov.hidden&&document.body.classList.contains('res78');
  if(!on()||!end){if(ov.classList.contains('e22')){ov.classList.remove('e22','e22w','e22l');ov.querySelector('#e22a')?.remove();}return;}
  const rs=ov.querySelector('#rs');if(!rs)return;
  const win=m!=='over';ov.classList.add('e22');ov.classList.toggle('e22w',win);ov.classList.toggle('e22l',!win);
  // vật phẩm: bỏ ô 0; hợp kim trùng (rw306 đã có tổng) ẩn ở lưới chi tiết
  const rw=rs.querySelector('.rw306');let nz=0,hasAlloy=false;
  if(rw)for(const c of rw.querySelectorAll('.rw306-c')){const v=parseInt((c.querySelector('b')?.textContent||'0').replace(/\D/g,''))||0;c.classList.toggle('zero',v<=0);if(v>0){nz++;if(/HỢP KIM/i.test(c.textContent))hasAlloy=true;}}
  const loot=rs.querySelector('.rs-loot');let lz=0;
  if(loot)for(const d of loot.querySelectorAll('.rw78')){const n=(d.querySelector('.n')?.textContent||'').trim();const z=!n||/^0+$/.test(n.replace(/\D/g,''))||(hasAlloy&&/hợp kim/i.test(d.textContent));d.classList.toggle('e22h',z);if(!z)lz++;}
  if(rw)rw.classList.toggle('e22z',nz===0);
  // thua: lực chiến chỉ hiện khi thiếu
  const fx=rs.querySelector('.fx68');let fxShow=false;
  if(fx){const p=((fx.querySelector('.fx68-bar')?.getAttribute('style')||'').match(/--p:\s*([\d.]+)%/)||[])[1];const pv=p==null?100:+p;
   fx.classList.toggle('e22ok',pv>=100);fx.classList.toggle('e22f',pv<100);fxShow=pv<100;
   if(pv<100){const t=fx.querySelector('.fx68-t');if(t&&t.textContent!=='LỰC CHIẾN CHƯA ĐỦ')t.textContent='LỰC CHIẾN CHƯA ĐỦ';const b=fx.querySelector('.u17p');if(b){const s='LỰC CHIẾN '+Math.round(pv)+'% ĐỀ NGHỊ';if(b.textContent!==s)b.textContent=s;}}}
  if(loot)loot.classList.toggle('e22e',lz===0&&!fxShow);
  // tiêu đề lưới vật phẩm
  let h=rs.querySelector('.e22h3');const any=nz+lz>0;
  if(any&&!h){h=document.createElement('div');h.className='e22h3';h.textContent='VẬT PHẨM ĐẠT ĐƯỢC';(rw||loot).before(h);}else if(!any&&h)h.remove();
  // 2 nút
  const lv=level|0,plain=run.plain&&run.lv>0;
  let second=null;
  if(win&&m==='reward'&&plain&&canGo(lv+1))second=['e22g','ẢI TIẾP ▶',()=>launch(lv+1)];
  else if(!win&&plain&&canGo(lv))second=['e22g','↻ CHƠI LẠI',()=>launch(lv)];
  const key=m+':'+lv+':'+(second?second[1]:'');
  let row=ov.querySelector('#e22a');
  if(!row||row.dataset.k!==key){row?.remove();row=document.createElement('div');row.id='e22a';row.dataset.k=key;
   const mk=(c,t,f)=>{const b=document.createElement('button');b.type='button';b.className=c;b.textContent=t;b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();if(b.disabled)return;b.disabled=true;try{f();}catch{}},true);return b;};
   row.append(mk('e22s','🏠 VỀ SẢNH',()=>End78.goLobby()));if(second)row.append(mk(...second));
   row.style.setProperty('display','flex','important');rs.after(row);}
  else if(row.previousElementSibling!==rs)rs.after(row);}
 function init(){if(!on())return;document.documentElement.classList.add('end22');
  const st=document.createElement('style');st.id='end22-css';st.textContent=css;document.head.appendChild(st);
  setInterval(()=>{try{paint();}catch{}},150);}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
 return {paint,launch,run:()=>run,plainNow};
})();
window.End22=End22;
