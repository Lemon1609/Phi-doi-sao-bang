'use strict';
// BK78 · V78 theo FEATURES_V78 (Gemini 24/10) — 2 tính năng Gemini chọn cho V78:
//  A) PHÁ VÂY (roguelite 12 chặng, 0 thể lực, không thưởng 💎):
//     • Chặng lấy ải ngẫu nhiên quanh tiến độ người chơi (B = số ải đã qua, kẹp 10–160): chặng k ≈ B×(0,5+0,045k) ±6;
//       chặng 4/8 = ải boss phụ (÷5), chặng 12 = boss cuối chương (÷20, ≤160). Chặng thường 3 đợt, chặng boss 1 đợt rồi boss.
//     • Chọn 1/3 Ấn Chú trước chặng 1 và sau chặng 2, 4, 6, 8, 10 (tối đa 6). Ráp đúng cặp → Cộng Hưởng.
//     • Máu/giáp mang sang chặng sau: hồi +10% máu, +15% giáp; sau chặng 4 & 8 chọn Sửa chữa (+60% máu, đầy giáp) hoặc Khai thác (+40 Mảnh).
//     • Quái thêm máu theo chặng (Claude: 1,0→1,6 vì độ khó ải đã tăng theo tiến độ; không dùng chuẩn hóa chỉ số cố định của Gemini).
//     • Thưởng 2 lượt/ngày tốt nhất: chặng 4 / 8 / 12 → Mảnh Ấn Chú 25/55/100, Xu Tinh Anh 2/5/10, ◈ 5K/12K/25K. Mảnh mở khóa Ấn Chú Cam (100/150).
//     • V84: luật tuần Mê Cung Phá Vây nhân trọng số Ấn Chú Tím/Cam qua window.__rare84 (rule84.js).
//     • Ấn Chú khó làm đúng trong engine được Claude quy đổi tương đương (ghi trong ALT bên dưới).
//  B) THỬ THÁCH HẠT GIỐNG (mỗi ngày 1 ải + 2 Ấn Chú theo hạt giống YYYYMMDD, giống nhau mọi máy):
//     • Điểm theo calcScore của Gemini; bảng 50 phi công mô phỏng (generateNpcBoard, rào cản tân thủ giảm theo số ngày tham gia);
//       mã khoe SB-MMDD-XXXX-HH (FNV-1a) — nhập mã bạn bè để chèn vào bảng (nhãn ĐỐI THỦ MỜI).
//     • Thưởng theo hạng 1 lần/ngày (lượt đầu tiên hoàn thành), cập nhật nếu lượt sau hạng cao hơn thì bù phần chênh.
//  Tắt: window.BK78=false.
const BK78=(()=>{
 const F=FEATURES_V78,BR=F.BREAKOUT_ROGUELITE,SD=F.SEEDED_DAILY_LEADERBOARD,TAU=Math.PI*2,KEY='saobang-bk78';
 let S={shards:0,unl:{},day:{d:'',n:0},clears:0,best:0,sd:{d:'',best:0,paid:0,tier:0,days:[]},friends:{},title:false};try{Object.assign(S,JSON.parse(localStorage.getItem(KEY)||'{}'));}catch{}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const T=m=>{try{toast(m);}catch{}};const fmt=n=>Math.round(n).toLocaleString('vi-VN');
 const today=()=>new Date(Date.now()+7*3600000).toISOString().slice(0,10);
 const ALT={P_F1:'Sát thương +18%',P_F4:'25% đòn trúng lan sang 1 quái gần (65%)',P_V3:'+20% sát thương · 20% đòn lan sang quái phía sau',P_V5:'+30% sát thương · bóng mờ bay theo',P_I1:'Giáp tối đa +45%',P_I6:'Đứng yên 0,8 s: +45% sát thương',P_T5:'Bạo Tẩu: +40% sát thương, đạn ta phá đạn địch sát nòng',P_T6:'+1 bom mỗi chặng'};
 const perk=id=>BR.PERKS_24.find(p=>p.id===id);
 const RAR={BLUE:{n:'Lam',c:'#5ab8ff',w:60},PURPLE:{n:'Tím',c:'#b06cff',w:30},ORANGE:{n:'Cam',c:'#ff9e2c',w:10}};
 const GRP={FIRE:'🔥',ICE:'❄',THUNDER:'⚡',VOID:'🌀'};
 const unlocked=p=>!p.unlockCost||S.unl[p.id];
 function desc(p){if(ALT[p.id])return ALT[p.id];const e=p.effect;const m={P_F2:'Đạn gây Thiêu Đốt 20% công/giây trong 2,5 s',P_F3:'Sát thương +35%',P_F5:'Mỗi 3,5 s bắn 4 tên lửa (110% công)',P_F6:'Sát thương ×2, máu tối đa còn 1',P_I2:'Đạn địch trong 110 px chậm 25%',P_I3:'18 s không trúng: tạo khiên chặn 1 đòn',P_I4:'Bị trúng: đóng băng quái & làm chậm đạn 2 s',P_I5:'+20% hồi máu mỗi chặng, +1 hồi sinh 50%',P_T1:'Hút sao 420 px, tốc độ bay +15%',P_T2:'Graze nạp Nộ ×2',P_T3:'Graze giáng sét vào quái gần (90%)',P_T4:'Bạo Tẩu +3 giây',P_V1:'Tâm nhận đạn nhỏ hơn 1,5 px',P_V2:'+45% sát thương lên boss',P_V4:'Hạ tinh anh/quái lớn: xóa đạn 160 px quanh nó',P_V6:'Bỏ giáp, máu tối đa ×1,5; 20 hạ hồi 3% máu'};return m[p.id]||'';}
 // ---------------- trạng thái lượt ----------------
 let R=null; // {kind:'run'|'seed', k, perks:[], lv, hpR, shR, revive, shardsRun, seed}
 const has=id=>R&&R.perks.includes(id);
 const syn=id=>{const s=BR.SYNERGIES_6.find(x=>x.id===id);return s&&R&&s.req.every(has);};
 function rng(seed){return SD.createSeededRNG(seed);}
 function cleared(){try{return Progress.getState().cleared.length|0;}catch{return 10;}}
 function pickLevel(k,rand){const B=Math.max(10,Math.min(160,cleared()));let L=Math.round(B*(.5+.045*k)+(rand()-.5)*12);L=Math.max(3,Math.min(160,L));
  if(k===4||k===8){L=Math.max(5,Math.round(L/5)*5);if(L%20===0)L+=L+5<=160?5:-5;}
  if(k===12){L=Math.max(20,Math.min(160,Math.round(L/20)*20));}else if(L%5===0&&k!==4&&k!==8)L+=1;return Math.min(160,L);}
 function draft(rand,n=3){const pool=BR.PERKS_24.filter(p=>unlocked(p)&&!has(p.id));const out=[];for(let i=0;i<n&&pool.length;i++){const wOf=p=>RAR[p.rarity].w*(p.rarity!=='BLUE'&&window.__rare84>0?window.__rare84:1);let tot=pool.reduce((a,p)=>a+wOf(p),0),r=rand()*tot,j=0;for(;j<pool.length;j++){r-=wOf(pool[j]);if(r<0)break;}out.push(pool.splice(Math.min(j,pool.length-1),1)[0]);}return out;}
 // ---------------- bắt đầu / chặng ----------------
 function start(kind){if(window.BK78===false)return;if(typeof mode!=='undefined'&&['play','pause','reward'].includes(mode)){T('ĐANG TRONG TRẬN');return;}
  if(kind==='seed'){const d=today(),seed=+d.replace(/-/g,''),rr=rng(seed);R={kind,k:1,perks:[],hpR:1,shR:1,revive:0,shardsRun:0,seed,rand:rr};const lv=Math.max(25,Math.min(140,20+Math.floor(rr()*120)));R.lv=lv%5===0?lv+1:lv;
   for(const p of draft(rr,2))R.perks.push(p.id);openPanel('seedintro');return;}
  R={kind:'run',k:1,perks:[],hpR:1,shR:1,revive:0,shardsRun:0,rand:Math.random};openDraft();}
 function launch(){const lv=R.kind==='seed'?R.lv:pickLevel(R.k,R.rand);R.lv=lv;R.boss=lv%5===0;window.__m78=1;window.__bk78w=R.kind==='seed'?4:(R.boss?1:3);
  try{document.querySelectorAll('.bk78p').forEach(e=>e.hidden=true);document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value=String(lv);Lobby.hide();}catch{}
  R.stats={kills:0,graze:0,hits:0,t0:performance.now(),lastHp:null};R.starting=true;try{reset();}catch(e){console.warn('BK78 reset',e);}R.starting=false;applyStart();
  try{toast(R.kind==='seed'?'🌱 THỬ THÁCH HẠT GIỐNG · ẢI '+lv:'⛓ PHÁ VÂY · CHẶNG '+R.k+'/12 · ẢI '+lv+(R.boss?' · BOSS':''));}catch{}}
 function applyStart(){try{if(has('P_I1'))maxShield=Math.round(maxShield*1.45*10)/10;if(has('P_V6')){maxHp=Math.round(maxHp*1.5*10)/10;maxShield=0;}if(has('P_F6'))maxHp=1;
   hp=Math.max(.1,Math.min(maxHp,maxHp*R.hpR));shield=Math.min(maxShield,maxShield*R.shR);if(has('P_T6'))bombs=Math.min(9,bombs+1);hud&&hud();}catch{}
  window.HURT77_78=has('P_V1')?1.5:0;R.shieldT=0;R.block=false;R.still=0;R.mT=0;R.kills20=0;R.supExt=0;R.syn6=0;}
 function stageClear(){// gọi thay finishStage36 khi đang trong lượt
  try{stageFinished36=true;boss=null;bullets=[];beams=[];enemies=[];shots=[];drops=[];}catch{}try{mode='reward';}catch{}
  R.hpR=Math.min(1,(hp/(maxHp||1))+.10+(has('P_I5')?.20:0));R.shR=Math.min(1,(shield/(maxShield||1))+.15);
  if(R.kind==='seed'){finishSeed(true);return;}
  if(R.k>=12){finishRun(true);return;}
  const k=R.k;R.k++;if(k===4||k===8){openPanel('supply');return;}if([2,4,6,8,10].includes(k)){openDraft();return;}launch();}
 function openDraft(){R.offer=draft(R.rand,3);if(!R.offer.length){launch();return;}openPanel('draft');}
 // ---------------- kết thúc ----------------
 function backToLobby(){window.__m78=0;window.__bk78w=0;window.HURT77_78=0;try{mode='menu';}catch{}try{PlayScreen.exit(false);}catch{}try{Lobby68.set('lobby');}catch{try{Lobby.show();}catch{}}}
 function tok(n){try{const st=V77.state();V77._set({tok:(st.tok|0)+n});}catch{}}
 function finishRun(win){const reached=win?12:R.k-1;let rw=null;for(const m of BR.MILESTONE_REWARDS)if(reached>=m.stageReached)rw=m;
  if(S.day.d!==today())S.day={d:today(),n:0};const paid=rw&&S.day.n<BR.DAILY_REWARDED_RUNS_MAX;let lines=[];
  if(paid){S.day.n++;S.shards+=rw.perkShards+R.shardsRun;tok(rw.masteryTokens);try{Progress.grantCredits(rw.alloy);}catch{}lines.push('+'+rw.perkShards+' Mảnh Ấn Chú','+'+rw.masteryTokens+' Xu Tinh Anh','+'+fmt(rw.alloy)+' ◈');}
  else if(R.shardsRun){S.shards+=R.shardsRun;}
  try{if(window.BKR92)lines=lines.concat(window.BKR92(reached,!!win,!!paid)||[]);}catch{}
  if(R.shardsRun)lines.push('+'+R.shardsRun+' Mảnh (trạm tiếp tế)');if(win){S.clears++;if(S.clears>=10&&!S.title){S.title=true;lines.push('Danh hiệu «Kẻ Phá Vây Thiên Hà»');}}S.best=Math.max(S.best,reached);save();
  R.result={win,reached,lines,paid:!!paid};openPanel('result');}
 function seedScore(win){const st=R.stats,t=(performance.now()-st.t0)/1000;let tier=0;try{tier=V77.run()?.maxTier||0;}catch{}return SD.calcScore({kills:st.kills,graze:st.graze,maxMedalTier:tier,hpLeftRatio:Math.max(0,hp)/(maxHp||1),clearTimeSec:t,hitsTaken:st.hits,isVictory:win});}
 function board(){const d=today(),seed=+d.replace(/-/g,'');if(S.sd.days.indexOf(d)<0){}const days=Math.max(1,S.sd.days.length);const b=SD.generateNpcBoard(seed,days).map((r,i)=>({n:NPC[i%NPC.length],score:r.score,npc:1}));
  const mm=d.slice(5).replace('-','');for(const [code,f] of Object.entries(S.friends)){if(f.mmdd===mm)b.push({n:'ĐỐI THỦ MỜI · '+code.slice(-7),score:f.score,friend:1});}
  if(S.sd.d===d&&S.sd.best)b.push({n:'BẠN',score:S.sd.best,me:1});return b.sort((a,b)=>b.score-a.score);}
 const NPC=['Lâm Phong','Hắc Ưng','Sao Đêm','Kẻ Săn Bão','Vân Anh','Thiên Lang','Bạch Hổ','Lôi Vũ','Hàn Tuyết','Xích Diễm','Mộc Lan','Phi Long','Tử Kinh','Ngân Hà','Hải Âu','Tinh Vân','Bão Táp','Ảnh Dạ','Cửu Vĩ','Lam Ngọc','Kim Ưng','Hỏa Phụng','Băng Tâm','Tử Vi','Dạ Lang','Thanh Long','Huyết Ưng','Bích Thủy','Kiếm Vũ','Liệt Hỏa','Sơn Ca','Thần Phong','Lục Bảo','Hư Không','Mặc Ảnh','Thiên Vũ','Phong Lôi','Tuyết Lang','Hắc Báo','Lưu Tinh','Diệp Phong','Bạch Long','Nguyệt Ảnh','Thái Dương','Sấm Sét','Hoàng Kim','Trường Không','Vũ Điệp','Hồng Liên','Bắc Đẩu'];
 function finishSeed(win){const sc=seedScore(win),d=today();if(S.sd.d!==d)S.sd={d,best:0,paid:0,tier:0,days:S.sd.days||[]};if(!S.sd.days.includes(d)){S.sd.days.push(d);if(S.sd.days.length>40)S.sd.days.shift();}
  const prev=S.sd.best;S.sd.best=Math.max(S.sd.best,sc);const b=board(),rank=b.findIndex(x=>x.me)+1;const tierOf=r=>SD.DAILY_RANK_REWARDS.findIndex(t=>r<=t.maxRank);const ti=tierOf(rank);let lines=[];
  if(ti>=0&&(!S.sd.paid||ti<S.sd.tier)){const t=SD.DAILY_RANK_REWARDS[ti],o=S.sd.paid?SD.DAILY_RANK_REWARDS[S.sd.tier]:{masteryTokens:0,alloy:0,upgradeStone:0};const dT=t.masteryTokens-o.masteryTokens,dA=t.alloy-o.alloy,dS=t.upgradeStone-o.upgradeStone;
   if(dT>0){tok(dT);lines.push('+'+dT+' Xu Tinh Anh');}if(dA>0){try{Progress.grantCredits(dA);}catch{}lines.push('+'+fmt(dA)+' ◈');}if(dS>0){try{Workshop.grant({exp:dS});}catch{}lines.push('+'+dS+' ⬢');}S.sd.paid=1;S.sd.tier=ti;}
  save();R.result={win,score:sc,prev,rank,lines,code:SD.encodeShareCode(d.slice(5).replace('-',''),S.sd.best)};openPanel('seedresult');}
 // ---------------- hiệu ứng Ấn Chú trong trận ----------------
 let avgDmg=20;
 function dmgMult(){if(!R)return 1;let m=1;if(has('P_F1'))m*=1.18;if(has('P_F3'))m*=1.35;if(has('P_F6'))m*=2;if(has('P_V3'))m*=1.2;if(has('P_V5'))m*=1.3;if(syn('SYN_5'))m*=1.3;
  if(has('P_I6')&&R.still>=.8)m*=1.45;if(has('P_T5')&&superTime>0)m*=1.4;if(syn('SYN_2')&&R.block)m*=1.5;return m;}
 function hitE(e,amt){if(!e||e.dead)return;try{if(e===boss||e.bossPart){damageBoss(amt,'perk78',e);return;}e.hp-=amt;if(e.hp<=0)kill(e);}catch{}}
 const near=(x,y,ex,r=170)=>enemies.filter(n=>!n.dead&&n!==ex&&Math.hypot(n.x-x,n.y-y)<r).sort((a,b)=>Math.hypot(a.x-x,a.y-y)-Math.hypot(b.x-x,b.y-y));
 const arcs=[];const arc=(a,b,c)=>{if(arcs.length<20)arcs.push({x:a.x,y:a.y,tx:b.x,ty:b.y,t:.18,c});};
 function onHit(s,e){if(!R||!e)return;const d=s&&s.damage||avgDmg;avgDmg=avgDmg*.95+d*.05;
  if(has('P_F2')||syn('SYN_4')){e.burn78={t:2.5,d:d*.2};}
  const chainP=syn('SYN_1')?1:(has('P_F4')?.25:0)+(has('P_V3')?.2:0);if(chainP&&Math.random()<chainP){const n=near(e.x,e.y,e)[0];if(n){hitE(n,d*(syn('SYN_1')?1:.65));arc(e,n,'#ffb347');}}}
 function tick(dt){if(!R||typeof mode==='undefined'||mode!=='play')return;const st=R.stats;
  const cur=Math.max(0,hp)+Math.max(0,shield);if(st.lastHp!==null&&cur<st.lastHp-1e-6){st.hits++;R.shieldT=0;if(has('P_I4')){for(const e of enemies)e.frozen=2;try{slowTime=Math.max(slowTime,2);}catch{}}}st.lastHp=cur;
  // đốt
  for(const e of enemies){if(e.burn78&&!e.dead){e.burn78.t-=dt;hitE(e,e.burn78.d*dt);if(e.burn78.t<=0)e.burn78=null;}}
  // khiên tự hồi
  if(has('P_I3')&&!R.block){R.shieldT+=dt;if(R.shieldT>=(syn('SYN_2')?10:18)){R.block=true;R.shieldT=0;try{toast('🛡 KHIÊN ẤN CHÚ SẴN SÀNG');}catch{}}}
  // đứng yên
  const p=R.pp;R.still=p&&Math.hypot(player.x-p.x,player.y-p.y)<1.5?R.still+dt:0;
  // tốc độ bay +15%
  if(has('P_T1')&&p){player.x=Math.max(10,Math.min(W-10,p.x+(player.x-p.x)*1.15));player.y=Math.max(10,Math.min(H-10,p.y+(player.y-p.y)*1.15));}R.pp={x:player.x,y:player.y};
  // hút sao xa
  if(has('P_T1'))for(const d of drops){if(d.dead||d.type==='craft')continue;const dd=Math.hypot(player.x-d.x,player.y-d.y);if(dd<420&&dd>6){const a=Math.atan2(player.y-d.y,player.x-d.x),s=Math.min(dd,600*dt);d.x+=Math.cos(a)*s;d.y+=Math.sin(a)*s;}}
  // làm chậm đạn
  if(has('P_I2'))for(const b of bullets){if(b.dead||b.sl78)continue;if(Math.hypot(b.x-player.x,b.y-player.y)<110){b.sl78=1;if(b.aimed30)b.sp66=(b.sp66||1)*.75;else{b.vx*=.75;b.vy*=.75;}}}
  // mưa tên lửa
  if(has('P_F5')){R.mT+=dt;if(R.mT>=3.5){R.mT=0;const L=enemies.filter(e=>!e.dead&&e.y>0&&e.y<H).slice(0,4);for(const e of L){hitE(e,avgDmg*1.1*4);arc(player,e,'#ff6a3d');}if(boss&&!boss.dead&&L.length<4)hitE(boss,avgDmg*1.1*4*(4-L.length));}}
  // động cơ quá tải: đạn ta phá đạn địch sát nòng
  if(has('P_T5')&&superTime>0)for(const b of bullets)if(!b.dead&&Math.abs(b.x-player.x)<40&&b.y<player.y&&b.y>player.y-160)b.dead=true;
  for(const a of arcs)a.t-=dt;while(arcs.length&&arcs[0].t<=0)arcs.shift();}
 function onGraze(){if(!R)return;R.stats.graze++;try{if(has('P_T2'))Combat26.addCharge07(5);}catch{}
  if(has('P_T3')){const n=near(player.x,player.y,null,260)[0];if(n){hitE(n,avgDmg*.9*3);arc(player,n,'#7df9ff');if(syn('SYN_3')){let from=n;for(const m of near(n.x,n.y,n).slice(0,2)){hitE(m,avgDmg*.9*2);arc(from,m,'#7df9ff');from=m;}}}}
  if(syn('SYN_3')){R.gz=(R.gz||0)+1;if(R.gz%15===0)for(const b of bullets)if(!b.dead&&Math.hypot(b.x-player.x,b.y-player.y)<80)b.dead=true;}}
 function onKill(e){if(!R)return;R.stats.kills++;if(has('P_V6')){R.kills20=(R.kills20||0)+1;if(R.kills20>=20){R.kills20=0;hp=Math.min(maxHp,hp+maxHp*.03);}}
  if(has('P_V4')&&(e.elite||e.large))for(const b of bullets)if(!b.dead&&Math.hypot(b.x-e.x,b.y-e.y)<160)b.dead=true;
  if(syn('SYN_6')&&superTime>0){R.syn6k=(R.syn6k||0)+1;if(R.syn6k%12===0&&R.supExt<5){superTime+=1;R.supExt++;}}}
 function draw(){if(!R||!arcs.length)return;ctx.save();ctx.globalCompositeOperation='lighter';ctx.lineWidth=2;for(const a of arcs){ctx.globalAlpha=Math.max(0,a.t/.18);ctx.strokeStyle=a.c;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo((a.x+a.tx)/2+(Math.random()-.5)*14,(a.y+a.ty)/2);ctx.lineTo(a.tx,a.ty);ctx.stroke();}ctx.restore();
  if(has('P_V5')&&R.pp){ctx.save();ctx.globalAlpha=.25;ctx.fillStyle='#c77dff';ctx.beginPath();ctx.arc(R.pp.x-26,R.pp.y+18,10,0,TAU);ctx.arc(R.pp.x+26,R.pp.y+18,10,0,TAU);ctx.fill();ctx.restore();}}
 function drawHud(){if(!R)return;ctx.save();ctx.font="800 11px 'Be Vietnam Pro',sans-serif";ctx.textAlign='right';ctx.fillStyle='#ffd166';const y=(typeof H==='number'?H:1100)*.16;
  ctx.fillText(R.kind==='seed'?'🌱 HẠT GIỐNG · ĐIỂM '+fmt(seedScore(true)):'⛓ CHẶNG '+R.k+'/12',W-10,y);ctx.fillStyle='#bfe9ff';ctx.fillText(R.perks.map(id=>GRP[perk(id).group]).join(' '),W-10,y+15);if(R.block){ctx.fillStyle='#7df9ff';ctx.fillText('🛡',W-10,y+30);}ctx.restore();}
 // ---------------- giao diện ----------------
 let el=null,view='';
 function ensure(){if(el)return;el=document.createElement('div');el.className='m63 bk78p';document.body.appendChild(el);el.addEventListener('click',onClick);}
 function openPanel(v){ensure();view=v;render();
  // khi đang ở màn chơi (body.play-screen ẩn mọi con của body trừ main) → gắn bảng vào khung trận
  try{const gw=document.querySelector('.game-wrap');const host=document.body.classList.contains('play-screen')&&gw?gw:document.body;if(el.parentElement!==host)host.appendChild(el);}catch{}
  el.hidden=false;}
 function onClick(e){const b=e.target.closest('[data-bk]');if(!b){return;}const a=b.dataset.bk;
  if(a==='x'){el.hidden=true;return;}
  if(a==='go'){start('run');return;}if(a==='seed'){start('seed');return;}
  if(a==='pick'){R.perks.push(b.dataset.id);el.hidden=true;launch();return;}
  if(a==='heal'){R.hpR=Math.min(1,R.hpR+.6);R.shR=1;el.hidden=true;openDraft();return;}
  if(a==='greed'){R.shardsRun+=BR.RECOVERY_RULES.BOSS_STAGE_CHOICE.OPTION_GREED.bonusPerkShards;el.hidden=true;openDraft();return;}
  if(a==='seedgo'){el.hidden=true;launch();return;}
  if(a==='quit'){el.hidden=true;if(R&&R.kind==='run'&&R.k>1)finishRunSilent(R);R=null;backToLobby();return;}
  if(a==='done'){el.hidden=true;R=null;backToLobby();return;}
  if(a==='unl'){const p=perk(b.dataset.id);if(p&&!S.unl[p.id]&&S.shards>=p.unlockCost){S.shards-=p.unlockCost;S.unl[p.id]=1;save();render();}else T('THIẾU MẢNH ẤN CHÚ');return;}
  if(a==='code'){const inp=el.querySelector('#bk78code');const v=(inp&&inp.value||'').trim().toUpperCase();const r=SD.decodeAndVerifyShareCode(v);if(!r.valid){T('MÃ KHÔNG HỢP LỆ');return;}S.friends[v]={mmdd:r.mmdd,score:r.score};save();T('ĐÃ THÊM ĐỐI THỦ · '+fmt(r.score));render();return;}
  if(a==='copy'){try{navigator.clipboard.writeText(b.dataset.c);T('ĐÃ CHÉP MÃ '+b.dataset.c);}catch{T(b.dataset.c);}return;}
  if(a==='tab'){view=b.dataset.v;render();return;}}
 function finishRunSilent(r){const reached=r.k-1;let rw=null;for(const m of BR.MILESTONE_REWARDS)if(reached>=m.stageReached)rw=m;if(S.day.d!==today())S.day={d:today(),n:0};
  try{if(window.BKR92)window.BKR92(reached,reached>=12,!!(rw&&S.day.n<BR.DAILY_REWARDED_RUNS_MAX));}catch{}if(rw&&S.day.n<BR.DAILY_REWARDED_RUNS_MAX){S.day.n++;S.shards+=rw.perkShards+r.shardsRun;tok(rw.masteryTokens);try{Progress.grantCredits(rw.alloy);}catch{}T('PHÁ VÂY · chặng '+reached+' · +'+rw.perkShards+' Mảnh');}else S.shards+=r.shardsRun;S.best=Math.max(S.best,reached);save();}
 const card=p=>{const r=RAR[p.rarity];return `<button class="bk78-c" data-bk="pick" data-id="${p.id}" style="--rc:${r.c}"><i>${GRP[p.group]}</i><b>${p.name}</b><em>${r.n}</em><small>${desc(p)}</small>${BR.SYNERGIES_6.filter(s=>s.req.includes(p.id)).map(s=>`<u>Ghép ${perk(s.req.find(x=>x!==p.id)).name} → ${s.name}${s.req.every(x=>x===p.id||has(x))?' ✦':''}</u>`).join('')}</button>`;};
 function render(){if(!el)return;let h='';
  if(view==='home'||view==='perks'){const dn=S.day.d===today()?S.day.n:0;
   h=`<div class="v75-top"><b>⛓ PHÁ VÂY</b><button data-bk="x" class="v75-x">✕</button></div><div class="v75-tabs"><button data-bk="tab" data-v="home" aria-pressed="${view==='home'}">Chơi</button><button data-bk="tab" data-v="perks" aria-pressed="${view==='perks'}">Ấn Chú (${BR.PERKS_24.filter(unlocked).length}/24)</button></div>`;
   if(view==='home')h+=`<p class="v75-s">12 chặng ngẫu nhiên quanh tiến độ của bạn · chọn Ấn Chú sau mỗi 2 chặng · ráp cặp ra Cộng Hưởng · chết là hết lượt. <b>Không tốn thể lực.</b></p>
    <p class="v75-s">Mảnh Ấn Chú: <b>${fmt(S.shards)}</b> · Kỷ lục: <b>chặng ${S.best}</b> · Phá đảo: <b>${S.clears}</b>${S.title?' · 🏆 Kẻ Phá Vây Thiên Hà':''}<br>Lượt có thưởng hôm nay: <b>${dn}/${BR.DAILY_REWARDED_RUNS_MAX}</b> (chặng 4 / 8 / 12)</p>
    <button class="m63-go" data-bk="go">BẮT ĐẦU LƯỢT MỚI</button>`;
   else h+=`<p class="v75-s">Mảnh: <b>${fmt(S.shards)}</b>. Ấn Chú Cam cần mở bằng Mảnh.</p><div class="bk78-l">${BR.PERKS_24.map(p=>`<div class="bk78-r" style="--rc:${RAR[p.rarity].c}"><i>${GRP[p.group]}</i><div><b>${p.name} <em>${RAR[p.rarity].n}</em></b><small>${desc(p)}</small></div>${unlocked(p)?'<span>✓</span>':`<button data-bk="unl" data-id="${p.id}" ${S.shards<p.unlockCost?'disabled':''}>${p.unlockCost} ✦</button>`}</div>`).join('')}</div>`;}
  else if(view==='draft'){h=`<div class="v75-top"><b>CHỌN 1 ẤN CHÚ · ${R.k===1?'KHỞI ĐẦU':'SAU CHẶNG '+(R.k-1)}</b></div><p class="v75-s">Đang có: ${R.perks.map(id=>perk(id).name).join(', ')||'—'}</p><div class="bk78-cards">${R.offer.map(card).join('')}</div><button class="m63-go off" data-bk="quit">BỎ LƯỢT</button>`;}
  else if(view==='supply'){h=`<div class="v75-top"><b>🛰 TRẠM TIẾP TẾ · SAU CHẶNG ${R.k-1}</b></div><p class="v75-s">Máu mang sang: ${Math.round(R.hpR*100)}% · Giáp ${Math.round(R.shR*100)}%</p>
    <button class="m63-go" data-bk="heal">SỬA CHỮA KHẨN CẤP · +60% máu, đầy giáp</button><button class="m63-go b" data-bk="greed" style="margin-top:8px">KHAI THÁC LÕI · +40 Mảnh Ấn Chú</button>`;}
  else if(view==='result'){const r=R.result;h=`<div class="v75-top"><b>${r.win?'🏆 PHÁ VÂY THÀNH CÔNG':'⛓ LƯỢT KẾT THÚC'}</b></div><p class="v75-s">Đạt chặng <b>${r.reached}/12</b> · Ấn Chú: ${R.perks.map(id=>perk(id).name).join(', ')}</p><p class="v75-s">${r.lines.join(' · ')||(r.paid?'':'Hết 2 lượt có thưởng hôm nay / chưa tới chặng 4')}</p><button class="m63-go" data-bk="done">VỀ SẢNH</button>`;}
  else if(view==='seedhome'||view==='seedboard'){const d=today(),b=board();
   h=`<div class="v75-top"><b>🌱 THỬ THÁCH HẠT GIỐNG</b><button data-bk="x" class="v75-x">✕</button></div><div class="v75-tabs"><button data-bk="tab" data-v="seedhome" aria-pressed="${view==='seedhome'}">Hôm nay</button><button data-bk="tab" data-v="seedboard" aria-pressed="${view==='seedboard'}">Xếp hạng</button></div>`;
   if(view==='seedhome'){const sr=rng(+d.replace(/-/g,''));const lv0=Math.max(25,Math.min(140,20+Math.floor(sr()*120)));const pk=(()=>{const save0=R;R={perks:[]};const o=draft(sr,2);R=save0;return o;})();
    h+=`<p class="v75-s">Mọi máy cùng 1 ải và 2 Ấn Chú trong ngày. Điểm = hạ quái, Graze, chuỗi huy chương, máu còn, tốc độ, trừ số lần trúng.</p><p class="v75-s">Hôm nay: <b>Ải ${lv0%5===0?lv0+1:lv0}</b> · ${pk.map(p=>p.name).join(' + ')}</p>
    <p class="v75-s">Điểm cao nhất hôm nay: <b>${S.sd.d===d?fmt(S.sd.best):'—'}</b></p><button class="m63-go" data-bk="seed">BẮT ĐẦU THỬ THÁCH</button>
    <div class="bk78-code"><input id="bk78code" placeholder="Nhập mã bạn bè SB-MMDD-XXXX-HH" maxlength="16"><button data-bk="code">THÊM</button></div>`;}
   else h+=`<p class="v75-s">50 phi công mô phỏng (không phải bảng trực tuyến) · đối thủ mời từ mã khoe.</p><ol class="bk78-b">${b.slice(0,60).map((r,i)=>`<li class="${r.me?'me':r.friend?'fr':''}"><em>${i+1}</em><span>${r.n}</span><b>${fmt(r.score)}</b></li>`).join('')}</ol>`;}
  else if(view==='seedintro'){h=`<div class="v75-top"><b>🌱 THỬ THÁCH HẠT GIỐNG · ẢI ${R.lv}</b></div><p class="v75-s">Ấn Chú hôm nay: ${R.perks.map(id=>'<b>'+perk(id).name+'</b>').join(' + ')}</p><button class="m63-go" data-bk="seedgo">XUẤT KÍCH</button><button class="m63-go off" data-bk="quit" style="margin-top:8px">ĐỂ SAU</button>`;}
  else if(view==='seedresult'){const r=R.result;h=`<div class="v75-top"><b>🌱 KẾT QUẢ HẠT GIỐNG</b></div><p class="v75-s">Điểm: <b>${fmt(r.score)}</b>${r.score>r.prev?' · KỶ LỤC MỚI':''} · Hạng <b>${r.rank}</b>/${board().length}</p><p class="v75-s">${r.lines.join(' · ')||'Đã nhận thưởng hạng hôm nay'}</p>
    <p class="v75-s">Mã khoe điểm cao nhất: <b>${r.code}</b></p><button class="m63-go b" data-bk="copy" data-c="${r.code}">CHÉP MÃ KHOE</button><button class="m63-go" data-bk="done" style="margin-top:8px">VỀ SẢNH</button>`;}
  el.innerHTML=`<div class="m63-card v75-card0">${h}</div>`;}
 // ---------------- cài đặt ----------------
 function install(){
  try{const of=finishStage36;finishStage36=function(){if(R&&window.__m78&&typeof mode!=='undefined'&&mode==='play'&&!stageFinished36){stageClear();return;}return of.apply(this,arguments);};}catch{}
  try{const oe=end;end=function(win){if(R&&window.__m78&&!win){if(has('P_I5')&&!R.revive){R.revive=1;hp=maxHp*.5;invuln=2.5;for(const b of bullets)b.dead=true;try{mode='play';toast('✦ LÕI SINH MỆNH · HỒI SINH');}catch{}return;}
     const r=oe.apply(this,arguments);try{if(R.kind==='seed')finishSeed(false);else finishRun(false);}catch(e){console.warn('BK78 end',e);}return r;}return oe.apply(this,arguments);};}catch{}
  try{const od=damage;damage=function(source){if(R&&window.__m78&&R.block&&source==='bullet'){let inv=0;try{inv=invuln;}catch{}if(!(inv>0)){R.block=false;R.shieldT=0;try{invuln=1;VisualFX.impact(player.x,player.y,'#7df9ff',1.2);}catch{}return;}}return od.apply(this,arguments);};}catch{}
  try{const ofc=Combat.factor;Combat.factor=function(){const r=ofc.apply(this,arguments);return R&&window.__m78?r*dmgMult():r;};}catch{}
  try{const odb=damageBoss;damageBoss=function(amount,src,e){if(R&&window.__m78&&has('P_V2')&&src!=='perk78')amount*=1.45;return odb.call(this,amount,src,e);};}catch{}
  try{const oh=Arsenal30.hit;Arsenal30.hit=function(s,e){const r=oh.apply(this,arguments);try{if(R&&window.__m78)onHit(s,e);}catch{}return r;};}catch{}
  try{const og=Combat26.graze;Combat26.graze=function(){const r=og.apply(this,arguments);try{if(r&&R&&window.__m78)onGraze();}catch{}return r;};}catch{}
  try{const ok=kill;kill=function(e){const was=e&&!e.dead;const r=ok.apply(this,arguments);try{if(was&&e.dead&&R&&window.__m78)onKill(e);}catch{}return r;};}catch{}
  try{const oa=activateSuper;activateSuper=function(){const r=oa.apply(this,arguments);try{if(R&&window.__m78&&has('P_T4'))superTime+=3;}catch{}return r;};}catch{}
  try{const oa=addEnemy;addEnemy=function(e){const r=oa.apply(this,arguments);try{if(R&&window.__m78&&R.kind==='run'){const x=r||e;if(x&&!x.rescue28){const m=1+.6*(R.k-1)/11;x.hp*=m;x.maxHp=x.hp;}}}catch{}return r;};}catch{}
  try{const ou=update;update=function(dt){const r=ou.apply(this,arguments);try{tick(dt);}catch(e){console.warn('BK78',e);}return r;};}catch{}
  try{const vd=VisualFX.draw;VisualFX.draw=function(){const r=vd.apply(this,arguments);try{if(R&&window.__m78&&(mode==='play'||mode==='pause')){draw();drawHud();}}catch{}return r;};}catch{}
  try{const ors=reset;reset=function(){if(R&&!R.starting){R=null;window.__m78=0;window.__bk78w=0;window.HURT77_78=0;}return ors.apply(this,arguments);};}catch{}}
 setTimeout(()=>{try{install();}catch(e){console.warn('BK78 install',e);}},0);
 return {open:()=>openPanel('home'),openSeed:()=>openPanel('seedhome'),start,state:()=>JSON.parse(JSON.stringify(S)),run:()=>R&&{kind:R.kind,k:R.k,lv:R.lv,perks:[...R.perks],hpR:R.hpR,stats:R.stats,offer:(R.offer||[]).map(p=>p.id)},
  _pick:id=>{R.perks.push(id);el&&(el.hidden=true);launch();},_set:o=>{Object.assign(S,o);save();},_clear:()=>stageClear(),board,code:(mm,sc)=>SD.encodeShareCode(mm,sc)};
})();
