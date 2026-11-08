'use strict';
// V91 · Gemini REVIEW91 (Claude đối chiếu với game thật trước khi ghép)
//  §2 GOTO_AND_ENERGY_V91: nút ĐI TỚI ở Sự kiện tuần (event83) và Thành tựu (ach79) · bảng chọn ải hiện thể lực / càn quét THẬT của game (V75)
//  §3.1 Phá Vây: game đã là roguelite 12 chặng + 24 Ấn Chú (V78) → KHÔNG dựng lại; chỉ thêm "mua 1 lượt có thưởng/ngày · 15.000 ◈"
//  §3.2 Khế Ước Nguyệt Thực: tự bật 0–3 trong 12 luật nguy hiểm trước khi vào ải Nguyệt Thực → +15/25/40% thưởng mỗi luật
//       (luật tuần rule84 giữ nguyên 4 sự kiện; r09 "cấm tiếp tế" vô nghĩa vì Nguyệt Thực vốn không dùng tiếp tế → đổi thành "không rơi hồi máu")
//  §3.3 Bảo hiểm vòng quay: vòng quay Sảnh đã có (10 / 50 lượt) → giữ; vòng quay skin thêm bảo hiểm 50 lượt (sửa trong skin69.js)
//  Không chạy chữ thông báo trong trận. Tắt: window.V91=false · window.PACT91=false
const PACT91={key:'saobang-eclipse-pact91',max:3,
 rules:[
  {id:'r01',t:1,b:15,n:'Đạn Tinh Anh',d:'Đạn quái và boss bay nhanh hơn 15%.'},
  {id:'r02',t:1,b:15,n:'Giáp Trì Trọng',d:'Quái thường bay chậm 15% nhưng thêm 25% máu.'},
  {id:'r05',t:1,b:15,n:'Từ Trường Nhiễu',d:'Tầm hút vật phẩm giảm 40%.'},
  {id:'r06',t:1,b:15,n:'Vỏ Hợp Kim Dày',d:'Quái tinh anh và mini boss thêm 30% máu.'},
  {id:'r03',t:2,b:25,n:'Ép Xung Quá Tải',d:'Trang bị hồi chiêu nhanh 30% nhưng mỗi đòn trúng mất thêm 25% máu.'},
  {id:'r04',t:2,b:25,n:'Lõi Tự Phục Hồi',d:'Khi boss còn cánh, lõi hồi 0,5% máu mỗi giây.'},
  {id:'r07',t:2,b:25,n:'Đôi Cánh Bất Khuất',d:'2 cánh boss thêm 40% máu.'},
  {id:'r08',t:2,b:25,n:'Bạo Tẩu Ngắn Hạn',d:'Bạo Tẩu ngắn hơn 2 giây.'},
  {id:'r09',t:2,b:25,n:'Phong Tỏa Hồi Phục',d:'Không rơi vật phẩm hồi máu trong suốt màn chơi.'},
  {id:'r10',t:3,b:40,n:'Phản Kích Tử Vong',d:'Quái tinh anh khi chết bắn 3 viên đạn nhắm vào tàu.'},
  {id:'r11',t:3,b:40,n:'Trọng Pháo Hư Không',d:'Khi boss đang trên màn, mỗi đòn trúng mất thêm 40% máu.'},
  {id:'r12',t:3,b:40,n:'Tử Chiến Độc Hành',d:'Không được hồi sinh (cả hồi sinh trả phí và hồi sinh Đồ giám).'}],
 bonus80:{blueStone:1}};
const V91=(()=>{
 const on=()=>window.V91!==false;const pOn=()=>on()&&window.PACT91!==false;
 const g=f=>{try{return f();}catch{return null;}};
 const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const fmt=n=>Math.round(n).toLocaleString('vi-VN');
 const day=()=>new Date(Date.now()+7*3600000).toISOString().slice(0,10);
 let S={bk:{d:'',n:0}};try{Object.assign(S,JSON.parse(localStorage.getItem('saobang-v91')||'{}'));}catch{}
 const save=()=>{try{localStorage.setItem('saobang-v91',JSON.stringify(S));}catch{}};
 let P={on:[]};try{Object.assign(P,JSON.parse(localStorage.getItem(PACT91.key)||'{}'));}catch{}
 if(!Array.isArray(P.on))P.on=[];
 const saveP=()=>{try{localStorage.setItem(PACT91.key,JSON.stringify(P));}catch{}};
 const btnCss='margin-left:6px;padding:4px 8px;font-size:10px;font-weight:800;border:1px solid #ffd36a;background:#3a2a08;color:#ffd36a;border-radius:6px';
 // =================== §2 · ĐI TỚI ===================
 const nav=s=>{try{Nav74.sub(s);return true;}catch{return false;}};
 const EVR={seed:()=>{try{BK78.openSeed();}catch{nav('seed78');}},graze:'map',star3:'map',bossPh:'map',bossStage:'map',ovTier4:()=>{try{O78.open();}catch{}},
  bk6:'breakout',bkPick:'breakout',bkClear:'breakout',eChest:'endless',eElite:'endless',eWave:'endless'};
 const ACR={clear:'map',boss:'map',kill:'map',star:'map',star3:'map',bossrun:'map',ss:'ships',tim5:'ships',robot:'sss',sss:'sss',tower:'tower',endless:'endless'};
 function go(r){document.querySelectorAll('.ev83,#m40').forEach(e=>{e.hidden=true;});if(typeof r==='function'){r();return;}
  if(r==='map'){try{ChapterMap.open();return;}catch{}}if(!nav(r)&&r==='tower'){try{Meta40.towerPanel();}catch{}}}
 function mk(r){const b=document.createElement('button');b.className='go91';b.textContent='ĐI TỚI';b.style.cssText=btnCss;b.addEventListener('click',e=>{e.stopPropagation();e.preventDefault();go(r);});return b;}
 function evBtns(){const el=document.querySelector('.ev83:not([hidden])');if(!el)return;let T=[];try{for(const e of EVENT83.ev)T=T.concat(e.tasks||[]);}catch{return;}
  for(const row of el.querySelectorAll('.ev83t')){if(row.classList.contains('done')||row.querySelector('.go91'))continue;const b=row.querySelector('b');if(!b)continue;const t=T.find(x=>x.desc===b.textContent);if(!t||!EVR[t.k])continue;
   const btn=row.querySelector('button');if(btn&&!btn.disabled)continue;(btn||row).after?((btn||b).after(mk(EVR[t.k]))):row.appendChild(mk(EVR[t.k]));}}
 function achBtns(){for(const row of document.querySelectorAll('.ach:not(.done):not(.ok)')){if(row.querySelector('.go91'))continue;const a=row.querySelector('button[data-a]');if(!a)continue;const r=ACR[a.dataset.a];if(!r)continue;a.after(mk(r));}}
 // =================== §2 · A6 thể lực ở bảng chọn ải ===================
 function enRow(){const sh=document.getElementById('cm-sheet');if(!sh||!sh.classList.contains('open')||sh.querySelector('.en91'))return;const go=sh.querySelector('.cm-go');if(!go)return;
  const n=+((sh.querySelector('h4')||{}).textContent||'').replace(/\D+/g,' ').trim().split(' ')[0]||0;if(!n)return;
  let cleared=false,stars=0,en=0,tk=0,used=0;try{cleared=Progress.getState().cleared.includes(n);}catch{}try{stars=Campaign36.getState().stars[n]|0;}catch{}
  try{en=V75.energy();tk=V75.tickets();}catch{return;}try{const sw=Campaign36.getState().sweep;used=sw&&sw.day===ChestsDay392()?sw.used|0:0;}catch{}
  const E=PLAN75.ENERGY,k=typeof window.ENERGY77==='function'?window.ENERGY77():1,cost=Math.round((n%5===0?E.BOSS_COST:E.REPLAY_COST)*k*10)/10;
  const p=document.createElement('p');p.className='en91';p.style.cssText='grid-column:1/-1;margin:2px 0;font-size:11px;color:#bfe3ff';
  p.innerHTML=`🔋 Thể lực: <b>${cleared?cost+' 🔋 (chơi lại)':'miễn phí (lần đầu)'}</b> · hiện có <b>${fmt(en)}/${E.MAX}</b>`+(cleared&&stars>=3?`<br>Càn quét: còn <b>${Math.max(0,(window.SWEEP92?SWEEP92():10)-used)}/${window.SWEEP92?SWEEP92():10}</b> lượt miễn phí hôm nay · 🎫 ${tk} vé · ${E.SWEEP_COST} 🔋/lượt`:'');
  const box=sh.querySelector('.su90');sh.insertBefore(p,box||sh.querySelector('.cm-act')||null);}
 // =================== §3.1 · Phá Vây: mua thêm 1 lượt có thưởng ===================
 const BKX={cost:15000,max:1};
 function bkBought(){return S.bk.d===day()?S.bk.n|0:0;}
 function bkInstall(){try{const BR=FEATURES_V78.BREAKOUT_ROGUELITE;if(BR.__v91)return;const base=BR.DAILY_REWARDED_RUNS_MAX|0;BR.__v91=1;
   Object.defineProperty(BR,'DAILY_REWARDED_RUNS_MAX',{get:()=>base+(on()?bkBought():0),configurable:true});}catch{}}
 function bkBtn(){if(!on())return;let st=null;try{st=BK78.state();}catch{return;}let max=0;try{max=FEATURES_V78.BREAKOUT_ROGUELITE.DAILY_REWARDED_RUNS_MAX;}catch{}
  const dn=st.day&&st.day.d===day()?st.day.n|0:0;
  for(const p of document.querySelectorAll('.m63:not([hidden]) p.v75-s')){if(!/Lượt có thưởng hôm nay/.test(p.textContent)||p.querySelector('.bk91'))continue;
   if(dn<max||bkBought()>=BKX.max)continue;const b=document.createElement('button');b.className='bk91';b.textContent='MUA THÊM 1 LƯỢT CÓ THƯỞNG · '+fmt(BKX.cost)+' ◈';b.style.cssText=btnCss+';margin:6px 0 0;display:block';
   b.addEventListener('click',e=>{e.stopPropagation();if(bkBought()>=BKX.max)return;let ok=false;try{ok=Progress.spendCredits(BKX.cost);}catch{}if(!ok){try{toast('KHÔNG ĐỦ ◈ HỢP KIM');}catch{}return;}
    if(S.bk.d!==day())S.bk={d:day(),n:0};S.bk.n++;save();try{toast('PHÁ VÂY · +1 LƯỢT CÓ THƯỞNG HÔM NAY');}catch{}try{BK78.open();}catch{}});p.appendChild(b);}}
 // =================== §3.2 · Khế Ước Nguyệt Thực ===================
 const R=id=>PACT91.rules.find(r=>r.id===id);
 const pick=()=>P.on.filter(id=>R(id)).slice(0,PACT91.max);
 const sumB=ids=>ids.reduce((a,id)=>a+R(id).b,0);
 let run=null; // {ids:Set, pct} chốt khi vào trận Nguyệt Thực
 const ecl=()=>g(()=>typeof Eclipse67!=='undefined'&&Eclipse67.active());
 const has=id=>!!(run&&run.ids.has(id)&&pOn()&&ecl());
 const wings=b=>{try{return (b.parts||[]).filter(p=>!p.dead&&p.hp>0).length;}catch{return 0;}};
 const bossOn=()=>{try{return !!(boss&&!boss.dead&&boss.hp>0);}catch{return false;}};
 let inst={},lastSuper=0,lastHp=null;
 function install(){
  if(!inst.reset&&window.reset){inst.reset=1;const o=window.reset;const f=function(){const r=o.apply(this,arguments);try{setTimeout(()=>{run=null;if(pOn()&&ecl()){const ids=pick();if(ids.length)run={ids:new Set(ids),pct:sumB(ids)};}},0);}catch{}return r;};window.reset=f;try{reset=f;}catch{}}
  if(!inst.upd&&window.update){inst.upd=1;const o=window.update;const f=function(dt){const r=o.apply(this,arguments);try{tick(dt);}catch{}return r;};window.update=f;try{update=f;}catch{}}
  if(!inst.add&&typeof addEnemy==='function'){inst.add=1;const o=addEnemy;const f=function(e){const r=o.apply(this,arguments);try{if(run&&e&&!e.bossPart&&!e.rescue28&&!e.vortex67&&e!==boss){
     let m=1;if(e.elite||e.large){if(has('r06'))m*=1.3;}else if(has('r02')){m*=1.25;if(e.v>0)e.v*=.85;}if(m!==1){e.hp*=m;e.maxHp=e.hp;if(e.guard)e.guard*=m;}}}catch{}return r;};window.addEnemy=f;try{addEnemy=f;}catch{}}
  if(!inst.boss&&g(()=>Combat26.setupBoss)){inst.boss=1;const o=Combat26.setupBoss;Combat26.setupBoss=function(b){try{if(run&&b&&!b.bossHealthReady&&!b.__p91&&has('r06')&&(level%10)!==0){b.__p91=1;b.max*=1.3;b.hp=b.max;}}catch{}return o.apply(this,arguments);};}
  if(!inst.gear&&g(()=>Equipment25.update)){inst.gear=1;const o=Equipment25.update;Equipment25.update=function(dt){return o.call(this,has('r03')&&dt>0?dt/.7:dt);};}
  if(!inst.kill&&typeof kill==='function'){inst.kill=1;const o=kill;const f=function(e){const was=e&&e.dead;const r=o.apply(this,arguments);try{if(has('r10')&&e&&e.elite&&!was&&mode==='play'){const a=Math.atan2(player.y-e.y,player.x-e.x);for(const d of [-.22,0,.22])emit(e.x,e.y,a+d,165/enemyScale(),'orb',{tint30:'#ff5d8f'});}}catch{}return r;};window.kill=f;try{kill=f;}catch{}}
  if(!inst.rv&&g(()=>Revive393.offer)){inst.rv=1;const o=Revive393.offer;Revive393.offer=function(){if(has('r12'))return false;return o.apply(this,arguments);};}}
 function tick(dt){let m='';try{m=mode;}catch{}const act=!!run&&m==='play'&&pOn()&&ecl();
  window.__mag91=act&&has('r05')?.6:1;window.__norv91=act&&has('r12');if(!act){lastSuper=0;lastHp=null;return;}
  // r03 / r11: đòn trúng làm mất máu (fair76 trừ máu trễ 180 ms nên đo theo khung hình) → mất thêm 25% / 40%
  try{if(lastHp!=null&&hp<lastHp&&hp>0){let x=0;if(has('r03'))x+=.25;if(has('r11')&&bossOn())x+=.4;if(x)hp=Math.max(0,hp-(lastHp-hp)*x);}lastHp=hp;}catch{}
  if(has('r01'))for(const b of bullets)if(!b.__p91&&!b.dead){b.__p91=1;if(Number.isFinite(b.vx))b.vx*=1.15;if(Number.isFinite(b.vy))b.vy*=1.15;if(Number.isFinite(b.speed))b.speed*=1.15;}
  if(has('r09'))for(const d of drops)if(!d.dead&&d.type==='heal')d.dead=true;
  try{const b=boss;if(b&&!b.dead&&b.hp>0){if(has('r07')&&!b.__p91w&&(b.parts||[]).length){b.__p91w=1;for(const p of b.parts){p.hp*=1.4;if(p.max)p.max*=1.4;if(p.maxHp)p.maxHp*=1.4;}}
    if(has('r04')&&wings(b)>0&&b.max&&b.hp<b.max)b.hp=Math.min(b.max,b.hp+b.max*.005*dt);}}catch{}
  if(has('r08')){try{if(superTime>lastSuper+1)superTime=Math.max(0,superTime-2);lastSuper=superTime;}catch{}}}
 // thưởng: cộng % theo luật đã chốt lúc vào trận (càn quét không có)
 function hookReward(){try{if(Eclipse67.__p91)return;const o=Eclipse67.reward;Eclipse67.__p91=1;Eclipse67.reward=function(s){const r=o.apply(this,arguments);try{if(r&&run&&run.pct>0&&pOn()){const k=run.pct/100,add=Math.round((r.credits||0)*k);
     if(add>0){Progress.grantCredits(add);r.credits=(r.credits||0)+add;}const c=Math.floor((s-1)/20),exp=Math.round((12+4*(c+1))*k);if(exp>0)try{Workshop.grant({exp});}catch{}
     const extra=['Khế Ước +'+run.pct+'%: +'+fmt(add)+' ◈ · +'+exp+' đá nâng cấp'];
     if(run.pct>=80){try{if(Stone71.unlocked()){Stone71.give(Stone71.make(2));extra.push('+1 đá khảm Lam (Khế Ước ≥ 80%)');}}catch{}}
     if(Array.isArray(r.materials))r.materials=r.materials.concat(extra);}}catch{}return r;};}catch{}}
 // bảng chọn luật trong khung Nguyệt Thực
 const TC=['','#7fd8ff','#ffb347','#ff5d8f'];let openP=false;
 function pactRow(){if(!pOn())return;const chs=document.querySelector('.ex67-chs');if(!chs||chs.parentElement.querySelector('.pact91'))return;if(!chs.offsetParent)return;
  const box=document.createElement('div');box.className='pact91';box.style.cssText='margin:6px 0;padding:6px;border:1px solid #5a3a86;border-radius:8px;background:rgba(30,12,50,.7);font-size:11px;color:#e8dcff';
  const paint=()=>{const ids=pick();box.innerHTML=`<div style="display:flex;justify-content:space-between;align-items:center"><b>🌑 KHẾ ƯỚC NGUYỆT THỰC</b><span>${ids.length}/${PACT91.max} luật · thưởng <b style="color:#ffd36a">+${sumB(ids)}%</b> <button data-p91x style="${btnCss}">${openP?'THU GỌN ▴':'TÙY CHỈNH ▾'}</button></span></div><div style="display:flex;gap:4px;margin-top:5px">${[['none','Tắt (0%)',[]],['std','Chuẩn (+55%)',['r01','r05','r07']],['max','Tối đa (+90% · đá Lam)',['r04','r07','r11']]].map(([k,n,L])=>{const on=L.length===ids.length&&L.every(x=>ids.includes(x));return `<button data-p91q="${L.join(',')}" style="flex:1;padding:5px 2px;font-size:10px;font-weight:800;border-radius:6px;border:1px solid ${on?'#ffd36a':'#5a3a86'};background:${on?'rgba(90,60,10,.9)':'rgba(16,10,30,.85)'};color:#efe6ff">${n}</button>`;}).join('')}</div>${openP?'':(ids.length?`<p style="margin:3px 0 0;font-size:10px;color:#cdb8ff">Đang bật: ${ids.map(id=>esc(R(id).n)).join(' · ')}</p>`:'')}${!openP?'':`
   <p style="margin:3px 0;color:#b9a6d9;font-size:10px">Tự bật tối đa 3 luật trước khi vào ải. Thưởng ◈ và đá nâng cấp tăng theo tổng %. Từ +80%: thêm 1 đá khảm Lam. Càn quét không có thưởng Khế Ước.</p>
   <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px">${PACT91.rules.map(r=>{const sel=ids.includes(r.id);return `<button data-p91="${r.id}" style="text-align:left;padding:4px 5px;font-size:10px;line-height:1.25;border:1px solid ${sel?TC[r.t]:'#3a2c55'};background:${sel?'rgba(80,30,90,.9)':'rgba(16,10,30,.85)'};color:#efe6ff;border-radius:6px"><b style="color:${TC[r.t]}">${sel?'✓ ':''}${esc(r.n)} +${r.b}%</b><br><small style="opacity:.8">${esc(r.d)}</small></button>`;}).join('')}</div>`}`;};
  paint();box.addEventListener('click',e=>{if(e.target.closest('[data-p91x]')){e.stopPropagation();openP=!openP;paint();return;}const q=e.target.closest('[data-p91q]');if(q){e.stopPropagation();P.on=q.dataset.p91q?q.dataset.p91q.split(','):[];saveP();paint();return;}const b=e.target.closest('[data-p91]');if(!b)return;e.stopPropagation();const id=b.dataset.p91;const ids=pick();
   if(ids.includes(id))P.on=ids.filter(x=>x!==id);else{if(ids.length>=PACT91.max){try{toast('TỐI ĐA '+PACT91.max+' LUẬT');}catch{}return;}P.on=ids.concat(id);}saveP();paint();});
  chs.after(box);}
 // =================== vòng lặp giao diện ===================
 function ui(){if(!on())return;try{evBtns();}catch{}try{achBtns();}catch{}try{enRow();}catch{}try{bkBtn();}catch{}try{pactRow();}catch{}}
 function boot(){install();hookReward();bkInstall();}
 boot();setTimeout(boot,600);setTimeout(boot,2500);setInterval(ui,600);
 return {state:()=>({S:JSON.parse(JSON.stringify(S)),pact:pick(),run:run&&{ids:[...run.ids],pct:run.pct}}),setPact:ids=>{P.on=ids.slice(0,PACT91.max);saveP();},go,PACT91,_bk:()=>bkBought()};
})();
window.V91=V91;
