// V87 · CHƯƠNG 10 "VỰC THẲM HƯ KHÔNG" (ải 181–200) · thiết kế Gemini REVIEW87 §4 · tranh GPT đợt V87 (src/ch10, src/boss82/thaico, đạn abyss)
//  • Mở: vượt ải 180. Lực chiến đề nghị 19.825 (ải 181) → 26.000 (ải 200), +325/ải (Endgame66.req).
//  • Quái riêng: Kẻ Săn Tinh Vân (lướt ngang, chùm 3 kim 185 px/s, máu ×1,15) · Pháo Đài Hư Không (quái nặng, vòng chắn giảm 30% ST
//    cho quái phía sau trong 110 px, cầu 155 px/s, máu ×2,4). Đạn địch chương 10 dùng bộ "abyss".
//  • Boss ải 200: 2 cánh (luật G7), 3 pha theo B75 'CH10'; pha 3 gọi 2 Kẻ Săn mỗi 18 giây. Tranh pha 3 (cánh gãy) hiện khi đã phá cả 2 cánh.
//  • Máu boss 180/200 = ST/s thật của tài khoản mẫu cuối game × số giây mục tiêu (REVIEW87 §4.1) — xem BOSSHP87.
//  Tắt: window.CH10=false
const CH10_ART=typeof CH10_ASSETS!=='undefined'?CH10_ASSETS:{};
const CH10={from:181,to:200,
 chapter:{name:'Vực Thẳm Hư Không',set:'ABYSS',hazard:'abyss',bg:'#03040c',glow:'#3a2a8a55',story:'Sau Tinh Vân Đen là vực thẳm nơi đế chế cổ xưa còn canh giữ. Phá Pháo Đài Vực Thẳm và hạ Thái Cổ Tinh Hoàng.'},
 boss200:'Thái Cổ Tinh Hoàng · Đế Chế Vĩnh Cửu',
 stalker:{name:'Kẻ Săn Tinh Vân',hp:1.15,share:.22,vx:110,burst:3,spread:.22,speed:185,cd:2.4},
 fortress:{name:'Pháo Đài Hư Không',hp:2.4,share:.10,aura:110,reduce:.30,speed:155,cd:2.8},
 summonEvery:18,
 first:n=>({credits:n===200?6000:700+35*(n-180)+(n%10===0?1000:n%5===0?450:0),exp:n===200?150:25+(n%5===0?25:0),dust:n===200?18:n%10===0?6:n%5===0?3:1}),
 again:n=>({credits:n===200?500:70+9*(n-180),dust:n===200?1:n%5===0?(Math.random()<.5?1:0):0}),
 title:'Kẻ Chinh Phục Vực Thẳm'};
// máu boss tổng (thân + lõi + 2 cánh, giữ tỉ lệ 50/28/11/11 sẵn có) — Claude đo, xem PROMPT_GEMINI_V88
// Đo V87 (tài khoản mẫu ENDGAME_SAMPLE_V87: #13 SS Lv100 Tím+5 + hợp thể Chân Thần + đồng đội #10, trang bị SS Tím+5):
//  19.500 CP ở boss 180: 2.053 / 1.857 ST/s → TB 1.955 × 120 s = 234.600 (trước 159.107)
//  ST/s gần như chỉ đổi theo hệ số lực chiến/đề nghị (22.785 CP: 2.646 ST/s ở hệ số 1,29 → 2.055 ở hệ số 1) → ải 200 với 26.000 CP ≈ 2.050 × 150 s = 307.500
// V90 · Gemini REVIEW90 §2: máu boss x20 / mini x10 ải 90–200 = ST/s đo (tàu trung vị sau cân bằng bậc SS) × thời gian bot lý tưởng
//  (= thời gian người thật × 0,55). Bảng điền sau khi đo (xem PROMPT_GEMINI_V91). 0 = giữ máu gốc.
// Đo 2 lượt (26/10): tài khoản mẫu từng mốc (bậc chọn gần lực chiến đề nghị nhất), tàu #1 và #7 sau cân bằng bậc SS, bot nhắm cánh, không đồng đội.
//  Máu theo công thức Gemini = ST/s trung bình × giây bot lý tưởng, làm đơn điệu (gộp mốc ngược chiều), RỒI GIỚI HẠN ×4 so với máu cũ
//  (Claude thêm giới hạn: công thức cho ×17 ở ải 120 vì tài khoản đúng lực chiến đề nghị phải là bậc SS — chờ Gemini quyết, xem PROMPT_GEMINI_V91).
//  Công thức (chưa giới hạn): boss 100/120/140/160/180/200 = 28,2k/184,5k/184,5k/285,9k/285,9k/314,6k · mini 90…190 = 21,9k/96,9k/96,9k/137,9k ×3
const BOSSHP87={90:12500,100:38000,110:30900,120:71400,130:102000,140:193400,150:227900,160:440700,170:239800,180:429300,190:278600,200:509600};// REVIEW115 BOSS_HP_FINAL_V115 (V114: 100:33900 110:27600 120:62100 130:81600 140:148800 150:168800 160:293800 170:177600 180:318000 190:206400 200:377500) (V92 cũ: 100:29500 110:24000 120:54000 130:68000 140:124000 150:135000 160:235000 170:148000 180:265000 190:172000 200:314600)
window.BOSSHP87=BOSSHP87;
const Ch10=(()=>{
 const on=()=>window.CH10!==false;
 try{if(CHAPTERS36.length<10)CHAPTERS36.push(CH10.chapter);}catch{}
 try{if(MISSIONS.length<200){const c=CH10.chapter;for(let id=181;id<=200;id++)MISSIONS.push({id,name:c.name+' · Ải '+id,short:'ẢI '+id,duration:30,bg:c.bg,glow:c.glow,hazard:c.hazard,icon:id%10===0?'♛':id%5===0?'◆':'✧',desc:c.story,boss:id===200?CH10.boss200:id%10===0?'MAJOR DREADNOUGHT':'PHÁO HẠM TINH ANH',kind:2,credits:50+id*3,rates:[100,0,0,0]});}}catch{}
 let oAt=0,oVal=false;
 function open(){if(!on())return false;const now=Date.now();if(now-oAt<1500)return oVal;oAt=now;let v=false;try{v=Progress.getState().cleared.includes(180);}catch{}oVal=v;return v;}
 const is=lv=>lv>=CH10.from&&lv<=CH10.to;
 const inCh=()=>{try{return on()&&gameMode==='campaign'&&!Dungeons.active()&&is(level)&&!Eclipse67.active();}catch{return false;}};
 const IM={};for(const k in CH10_ART){const im=new Image();im.src=CH10_ART[k];IM[k]=im;}
 const ok=k=>IM[k]&&IM[k].complete&&IM[k].naturalWidth>0;
 function bgFor(lv){try{if(on()&&gameMode==='campaign'&&is(lv)&&ok('bg'))return IM.bg;}catch{}return null;}
 try{const och=Campaign36.chapter;Campaign36.chapter=function(n){return n>180&&on()?9:och.apply(this,arguments);};}catch{}
 function ensureOptions(){const sel=document.getElementById('mission-select');if(!sel)return;for(let id=181;id<=200;id++){let o=sel.querySelector(`option[value="${id}"]`);if(!o){o=document.createElement('option');o.value=String(id);o.textContent='Ch.10 · Ải '+id;sel.appendChild(o);}o.disabled=!Progress.canStart(id);}}
 // ---------- thưởng thêm ----------
 const orw=Progress.rewardStage;Progress.rewardStage=function(stage){const first=is(stage)&&!Progress.getState().cleared.includes(stage);const r=orw.apply(this,arguments);
  try{if(r&&is(stage)&&on()&&!(typeof Eclipse67!=='undefined'&&Eclipse67.active())){const x=first?CH10.first(stage):CH10.again(stage);if(x.credits){Progress.grantCredits(x.credits);r.credits+=x.credits;}if(x.exp){Workshop.grant({exp:x.exp});}if(x.dust){Dust67.add(x.dust);(r.materials=r.materials||[]).push(x.dust+' Bụi Tinh Vân');}
   if(first&&stage===200){try{Dust67.title(CH10.title);toast('★ DANH HIỆU: '+CH10.title.toUpperCase());}catch{}}}}catch{}return r;};
 // ---------- quái chương 10 ----------
 const oae=addEnemy;addEnemy=function(e){const r=oae.apply(this,arguments);try{if(inCh()&&e&&!e.boss&&!e.bossPart&&!e.rescue28&&!e.vortex67&&!e.ab10&&!boss){const q=Math.random();
   if(e.large&&q<CH10.fortress.share*3){e.ab10='fortress';e.hp*=CH10.fortress.hp;e.maxHp=e.hp;e.cd10=1.2+Math.random();}
   else if(!e.large&&q<CH10.stalker.share){e.ab10='stalker';e.hp*=CH10.stalker.hp;e.maxHp=e.hp;e.cd10=.8+Math.random();e.vx10=(Math.random()<.5?-1:1)*CH10.stalker.vx;}}}catch{}return r;};
 function fireAt(x,y,a,sp,kind){try{emit(x,y,a,sp/Math.max(.01,enemyScale()),kind);const b=bullets[bullets.length-1];if(b)b.__ab10=1;}catch{}}
 function summon(n){for(let k=0;k<n;k++){try{const e=addEnemy({x:k%2?W-60:60,y:-20,v:70,type:1,large:false,elite:true,guard:0,hp:12*(typeof Endgame66!=='undefined'?Endgame66.hpMul(level):1),fire:1e9,age:0,phase:Math.random()*6,dead:false});if(e){e.ab10='stalker';e.vx10=(k%2?-1:1)*CH10.stalker.vx;e.cd10=1.5;}}catch{}}}
 let sumT=CH10.summonEvery;
 function tick10(dt){if(!inCh())return;const S=CH10.stalker,F=CH10.fortress;
  for(const e of enemies){if(e.dead||!e.ab10)continue;e.cd10-=dt;
   if(e.ab10==='stalker'){e.x+=e.vx10*dt;if(e.x<40||e.x>W-40){e.vx10=-e.vx10;e.x=Math.max(40,Math.min(W-40,e.x));}
    if(e.cd10<=0&&e.y>20&&e.y<H*.6){e.cd10=S.cd;const a=Math.atan2(player.y-e.y,player.x-e.x);for(let k=-1;k<=1;k++)fireAt(e.x,e.y+16,a+k*S.spread,S.speed,'needle');}}
   else if(e.ab10==='fortress'){if(e.cd10<=0&&e.y>20){e.cd10=F.cd;fireAt(e.x,e.y+24,Math.atan2(player.y-e.y,player.x-e.x),F.speed,'orb');}}}
  // boss 200 pha 3: gọi 2 Kẻ Săn mỗi 18 giây
  try{if(boss&&level===200&&!boss.dead&&boss.bossHealthReady){const ph=B75.state()?B75.state().ph|0:0;if(ph>=2){sumT-=dt;if(sumT<=0){sumT=CH10.summonEvery;summon(2);try{toast('⚠ KẺ SĂN TINH VÂN XUẤT KÍCH');}catch{}}}}}catch{}}
 // vòng chắn Pháo Đài: quái phía sau (trên) trong 110 px nhận ít hơn 30% sát thương
 function shielded(e){if(!inCh()||!e||e.ab10==='fortress'||e===boss||e.bossPart)return false;for(const f of enemies){if(f.dead||f.ab10!=='fortress')continue;if(e.y<f.y&&Math.hypot(e.x-f.x,e.y-f.y)<CH10.fortress.aura)return true;}return false;}
 try{const ofd=Feedback31.damage;Feedback31.damage=function(e,amount,src){const r=ofd.apply(this,arguments);try{if(amount>0&&e&&!e.dead&&!(src&&src.__ab10)&&shielded(e)){e.hp+=amount*CH10.fortress.reduce;}}catch{}return r;};}catch{}
 // vẽ quái
 try{const od=EnemyBake3D.draw;EnemyBake3D.draw=function(e){try{if(e&&e.ab10&&on()){const k=e.ab10==='fortress'?'weaver':'frigate';if(ok(k)){const z=e.ab10==='fortress'?124:84;
    if(e.ab10==='fortress'){ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.18+.06*Math.sin(time*4);ctx.strokeStyle='#c07bff';ctx.lineWidth=2;ctx.setLineDash([6,6]);ctx.beginPath();ctx.arc(e.x,e.y,CH10.fortress.aura,Math.PI,TAU);ctx.stroke();ctx.setLineDash([]);ctx.restore();}
    ctx.drawImage(IM[k],e.x-z/2,e.y-z/2,z,z);return true;}}}catch{}return od.apply(this,arguments);};}catch{}
 // máu boss 180/200 theo số đo
 function hpFix(){try{const b=boss;const ecl=typeof Eclipse67!=='undefined'&&Eclipse67.active();if(!b||b.__hp87||!b.bossHealthReady||gameMode!=='campaign'||(ecl&&!((level|0)>=161&&window.V95!==false)))return;const tgt=BOSSHP87[level]&&(ecl?Math.round(BOSSHP87[level]*1.3):BOSSHP87[level]);b.__hp87=1;if(!tgt||!on())return;
   const parts=(b.parts||[]),tot=(b.max||0)+(b.coreMax||0)+parts.reduce((a,p)=>a+(p.max||0),0);if(!(tot>0))return;const k=tgt/tot;
   b.max*=k;b.hp=b.max;if(b.coreMax){b.coreMax*=k;b.coreHp=b.coreMax;}for(const p of parts){p.max*=k;p.hp=p.max;}try{syncBossHealth&&syncBossHealth();}catch{}}catch{}}
 // V90 · REVIEW90 §2: quái thường từ ải 100 sống/lượn quá 22 giây thì tự rút khỏi màn (không thưởng) — tránh ải kẹt vì quái bay khuất
 function waveCap(){try{if(gameMode!=='campaign'||(level|0)<100||boss)return;for(const e of enemies){if(e.dead||e.boss||e.bossPart||e.rescue28||e.vortex67)continue;if((e.age||0)>22){e.dead=true;e.cap90=1;}}}catch{}}
 let H10=false;function hookUpd(){if(H10)return;H10=true;const oup=window.update;const f=function(dt){const r=oup.apply(this,arguments);try{if(mode==='play'){tick10(dt);hpFix();waveCap();}}catch(e){}return r;};window.update=f;try{update=f;}catch{}}
 hookUpd();
 const orr=reset;reset=function(){sumT=CH10.summonEvery;return orr.apply(this,arguments);};
 setInterval(()=>{try{if(!['play','pause'].includes(mode))ensureOptions();}catch{}},1500);
 return {open,is,inCh,bgFor,ok,IM,ensureOptions,summon,state:()=>({open:open(),ab:(()=>{try{return enemies.filter(e=>!e.dead&&e.ab10).map(e=>e.ab10);}catch{return [];}})(),sumT})};
})();
window.Ch10=Ch10;
