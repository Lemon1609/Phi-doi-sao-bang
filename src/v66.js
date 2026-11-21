'use strict';
// V66 · (B1) TRẠM TIẾP TẾ CHIẾN THUẬT · (B2) phá cánh boss có hệ quả · trải nghiệm người mới · nhắc sao lưu.
// Thiết kế: Gemini (lộ trình V64→V67, mục 4). Số liệu Claude chỉnh để không chồng tiến hóa V64 — xem CHINH bên dưới.
const Gate66=(()=>{
 const TAU=Math.PI*2;
 // ---------- 8 lõi chiến thuật ----------
 const CORES={
  RICOCHET:{n:'ĐẠN NẢY',s:'35% NẢY',c:'#00f5d4'},
  FOCUS_BEAM:{n:'TỤ HỎA',s:'+25% SÁT THƯƠNG',c:'#ff5d73'},
  VAMP_GRAZE:{n:'HẤP HUYẾT',s:'GRAZE HỒI GIÁP',c:'#c77dff'},
  TWIN_MISSILE:{n:'TÊN LỬA ĐÔI',s:'+2 QUẢ TÊN LỬA',c:'#ffbe0b'},
  CRYO_ROUND:{n:'ĐẠN BĂNG',s:'LÀM CHẬM',c:'#4cc9f0'},
  BERSERK:{n:'CUỒNG NỘ',s:'BẠO TẨU +3,5s',c:'#ff7b00'},
  NOVA_SHIELD:{n:'GIÁP PHẢN XẠ',s:'+50% GIÁP',c:'#80ed99'},
  GREED_CORE:{n:'LÕI KHO BÁU',s:'+60% HỢP KIM',c:'#ffd166'}};
 // Chỉnh so với bản Gemini (báo cho người dùng):
 const CHINH={focusDmg:1.25/*Gemini 1.28 → trần 25% mỗi cổng*/,focusSpread:.6,ricChance:.35,ricDmg:.6,ricR:180,
  vampCD:.8,vampSh:.04,vampHp:.02,misRate:.75,misExtra:2,berserk:3.5,berserkRate:1.25,
  cryoT:1.2/*dùng hệ đóng băng sẵn có (chậm 40%), hiệu lực 1,2 s mỗi lần trúng*/,cryoBossT:1.5,cryoBossCD:4,cryoBullet:.8,
  novaHeal:.5,novaR:160,novaMul:5,novaCD:6/*Gemini: mỗi lần trúng → hồi chiêu 6 s để không chồng giáp MAX tiến hóa*/,
  greed:.6,greedBullet:1.12,speed:170/*Gemini 110 px/s → 170 để không phải chờ quá 7 giây*/,touch:52,fromLevel:3};
 let gates=[],cores=[],stageKey='',lastWave=-1,drops=0,arcs=[],pulses=[],vampAt=-9,novaAt=-9,cryoBossAt=-9,partsSeen=new Map(),flash=null;
 // V66.1: người dùng bỏ tính năng chọn buff giữa ải → TẮT (giữ code, bật lại bằng ENABLED=true)
 const ENABLED=false;
 const has=k=>cores.includes(k);
 const playing=()=>mode==='play'&&!window.HANGAR_DEMO;
 function eligible(){if(!ENABLED)return false;try{if(typeof Play63!=='undefined'&&Play63.Daily&&Play63.Daily.active&&Play63.Daily.active())return false;return gameMode==='campaign'&&!Dungeons.active()&&level>=CHINH.fromLevel;}catch{return false;}}
 function hasMissiles(){try{return (gear.equipment||[]).some(i=>i.kind==='missiles');}catch{return false;}}
 function pool(){return Object.keys(CORES).filter(k=>!has(k)&&(k!=='TWIN_MISSILE'||hasMissiles())&&(k!=='NOVA_SHIELD'||maxShield>0));}
 function spawn(){const p=pool();if(p.length<2)return;const a=p.splice(Math.floor(Math.random()*p.length),1)[0],b=p[Math.floor(Math.random()*p.length)];
  gates=[{k:a,x:W*.25,y:-60,t:0},{k:b,x:W*.75,y:-60,t:0}];drops++;try{toast('TRẠM TIẾP TẾ · BAY VÀO 1 CỔNG');}catch{}}
 function clearStage(){gates=[];cores=[];lastWave=-1;drops=0;arcs=[];pulses=[];partsSeen=new Map();flash=null;}
 function take(g){cores.push(g.k);try{Telemetry66.add('gates');}catch{}gates=[];const C=CORES[g.k];flash={x:g.x,y:g.y,c:C.c,t:0};try{ring(g.x,g.y,C.c,70);VisualFX.explode(g.x,g.y,1.1,'enemy');}catch{}
  try{toast('KÍCH HOẠT: '+C.n+'!');}catch{}
  if(g.k==='NOVA_SHIELD'){shield=Math.min(maxShield,shield+maxShield*CHINH.novaHeal);try{hud();}catch{}}}
 // ---------- vòng lặp mỗi khung ----------
 function step(dt){if(!playing())return;
  const key=gameMode+':'+level;if(key!==stageKey){stageKey=key;clearStage();}
  if(eligible()){const st=Waves30.state(),w=st.wave,total=Waves30.total(),bossy=!!Campaign36.bossKind(level);
   if(w!==lastWave){const prev=lastWave;lastWave=w;if(prev>=0&&w>prev&&drops<2&&!boss&&(w===2||w===(bossy?total:total-1))&&!(w===2&&total<4&&!bossy))spawn();}}
  if(gates.length){endlessRest=Math.max(endlessRest,.25);
   for(const g of gates){g.t+=dt;g.y+=CHINH.speed*dt;}
   const L=gates[0],R=gates[1];
   if(L&&Math.hypot(player.x-L.x,player.y-L.y)<CHINH.touch)take(L);
   else if(R&&Math.hypot(player.x-R.x,player.y-R.y)<CHINH.touch)take(R);
   else if(gates.every(g=>g.y>H+40))gates=[];}
  // đạn địch mới: Lõi Kho Báu nhanh hơn, quái bị băng bắn chậm hơn
  if(has('GREED_CORE')||has('CRYO_ROUND')){for(const b of bullets){if(b.s66)continue;b.s66=1;let f=has('GREED_CORE')?CHINH.greedBullet:1;
    if(has('CRYO_ROUND')){let cold=false;if(boss&&boss.cryo66>time&&Math.hypot(b.x-boss.x,b.y-boss.y)<140)cold=true;else for(const e of enemies)if(!e.dead&&e.cryo66>time&&Math.abs(e.x-b.x)<40&&Math.abs(e.y-b.y)<40){cold=true;break;}if(cold)f*=CHINH.cryoBullet;}
    if(f!==1){b.vx*=f;b.vy*=f;}}}
  // B2: cánh boss vừa vỡ → choáng 3 giây
  if(boss&&boss.parts){for(const p of boss.parts){const was=partsSeen.get(p);if(was===false&&p.dead&&!boss.noStun67){boss.stun66=3;boss.stunMax66=3;try{toast((p.side<0?'CÁNH TRÁI':'CÁNH PHẢI')+' ĐÃ PHÁ · BOSS CHOÁNG 3 GIÂY');}catch{}try{Telemetry66.add('bossPartsBroken');}catch{}}partsSeen.set(p,!!p.dead);}}
  for(const a of arcs)a.t+=dt;arcs=arcs.filter(a=>a.t<.18);for(const p of pulses)p.t+=dt;pulses=pulses.filter(p=>p.t<.45);if(flash){flash.t+=dt;if(flash.t>.6)flash=null;}}
 // ---------- trúng đạn ----------
 function avgMain(){let s=0,n=0;for(const x of shots)if(x.main66&&!x.dead&&x.damage>0){s+=x.damage;n++;}return n?s/n:1.5;}
 function hurt(t,d,src){if(!t||t.dead||!(d>0))return;if(t===boss||t.bossPart){try{damageBoss(d,src,t);}catch{}return;}
  try{Report392.hit(Math.min(t.hp,d),src);}catch{}t.hp-=d;try{Feedback31.damage(t,d,src);}catch{}if(t.hp<=0)kill(t);}
 function onHit(s,e){if(!playing()||!s||!s.main66||!cores.length)return;
  if(has('CRYO_ROUND')){if(e===boss||e.bossPart){if(boss&&time-cryoBossAt>CHINH.cryoBossCD){cryoBossAt=time;boss.frozen=Math.max(boss.frozen||0,CHINH.cryoBossT);boss.cryo66=time+CHINH.cryoBossT;}}
   else{e.frozen=Math.max(e.frozen||0,CHINH.cryoT);e.cryo66=time+CHINH.cryoT;}}
  if(has('RICOCHET')&&!s.ric66&&Math.random()<CHINH.ricChance){let best=null,bd=CHINH.ricR;
   const cand=boss?[...enemies,...Combat26.targets(),boss]:enemies;for(const n of cand){if(n===e||n.dead)continue;const d=Math.hypot(n.x-e.x,n.y-e.y);if(d<bd){bd=d;best=n;}}
   if(best){hurt(best,s.damage*CHINH.ricDmg,s);if(arcs.length<10)arcs.push({x1:e.x,y1:e.y,x2:best.x,y2:best.y,t:0});}}}
 // ---------- gắn vào game ----------
 const os=shot;shot=function(){const r=os.apply(this,arguments);try{const s=shots.at(-1);if(s&&mainVolley)s.main66=true;}catch{}return r;};
 const osw=shootWeapon;shootWeapon=function(){const r=osw.apply(this,arguments);try{for(const s of shots){if(!s.main66||s.f66)continue;s.f66=1;if(!has('FOCUS_BEAM'))continue;s.damage*=CHINH.focusDmg;s.vx*=CHINH.focusSpread;s.x=player.x+(s.x-player.x)*CHINH.focusSpread;}}catch{}return r;};
 const oh=Arsenal30.hit;Arsenal30.hit=function(s,e){const r=oh.apply(this,arguments);try{onHit(s,e);}catch(err){}return r;};
 const og=Combat26.graze;Combat26.graze=function(){const r=og.apply(this,arguments);try{if(r&&has('VAMP_GRAZE')&&playing()){Combat26.addCharge07(5);if(time-vampAt>=CHINH.vampCD){vampAt=time;if(shield<maxShield)shield=Math.min(maxShield,shield+maxShield*CHINH.vampSh);else hp=Math.min(maxHp,hp+maxHp*CHINH.vampHp);}}}catch{}return r;};
 const oas=activateSuper;activateSuper=function(){const r=oas.apply(this,arguments);try{if(has('BERSERK')&&playing())superTime+=CHINH.berserk;}catch{}return r;};
 const odm=damage;damage=function(){const before=hp+shield;const r=odm.apply(this,arguments);try{if(has('NOVA_SHIELD')&&playing()&&hp+shield<before&&time-novaAt>=CHINH.novaCD){novaAt=time;const R=CHINH.novaR;bullets=bullets.filter(b=>Math.hypot(b.x-player.x,b.y-player.y)>R);const d=CHINH.novaMul*avgMain();
   for(const e of [...enemies])if(!e.dead&&Math.hypot(e.x-player.x,e.y-player.y)<R)hurt(e,d,'g66');if(boss)for(const p of [...Combat26.targets(),boss])if(!p.dead&&Math.hypot(p.x-player.x,p.y-player.y)<R+40)hurt(p,d,'g66');pulses.push({x:player.x,y:player.y,t:0});}}catch{}return r;};
 const ok=kill;kill=function(e){const c0=runCredits,was=e&&e.dead;const r=ok.apply(this,arguments);try{if(has('GREED_CORE')&&playing()&&!was){const g=runCredits-c0;if(g>0)runCredits+=Math.round(g*CHINH.greed);}}catch{}return r;};
 // B2: bom / tia sét tiến hóa / xung lõi chỉ gây 50% lên cánh boss
 const odb=damageBoss;damageBoss=function(amount,source,part){try{if((source==='bomb'||source==='evo'||source==='g66')&&boss&&bossHasWings(boss)&&(!part||part.bossPart))amount*=.5;}catch{}return odb.call(this,amount,source,part);};
 // B2: choáng = không bắn, di chuyển chậm
 const obu=Bosses28.update;Bosses28.update=function(dt){const b=boss;if(b&&b.stun66>0){b.stun66=Math.max(0,b.stun66-dt);const hold=b.stun66+.4;b.fire=Math.max(b.fire||0,hold);b.laser=Math.max(b.laser||0,hold);b.skill=Math.max(b.skill||0,hold);if(b.majorPulse36!=null)b.majorPulse36=Math.max(b.majorPulse36,hold);}return obu.apply(this,arguments);};
 const orr=reset;reset=function(){clearStage();stageKey='';return orr.apply(this,arguments);};
 const ons=nextStage;nextStage=function(){clearStage();stageKey='';return ons.apply(this,arguments);};
 const oup=update;update=function(dt){const r=oup.apply(this,arguments);try{step(dt);}catch(err){try{Safety31.report(err);}catch{}}return r;};
 // ---------- vẽ ----------
 function pill(x,y,k){const C=CORES[k];ctx.font='bold 10px sans-serif';const w=ctx.measureText(C.n).width+16;ctx.fillStyle='#06111bd9';ctx.strokeStyle=C.c;ctx.lineWidth=1.4;ctx.beginPath();ctx.roundRect?ctx.roundRect(x,y,w,18,9):ctx.rect(x,y,w,18);ctx.fill();ctx.stroke();ctx.fillStyle=C.c;ctx.textAlign='left';ctx.textBaseline='middle';ctx.fillText(C.n,x+8,y+9.5);return w;}
 function drawGate(g,quiet){const C=CORES[g.k],r=50,p=quiet?0:Math.sin(g.t*6)*.5+.5;ctx.save();ctx.translate(g.x,g.y);
  ctx.globalCompositeOperation='lighter';const gr=ctx.createRadialGradient(0,0,r*.3,0,0,r*1.5);gr.addColorStop(0,C.c+'00');gr.addColorStop(.6,C.c+'55');gr.addColorStop(1,C.c+'00');ctx.fillStyle=gr;ctx.beginPath();ctx.arc(0,0,r*1.5,0,TAU);ctx.fill();
  ctx.globalCompositeOperation='source-over';ctx.fillStyle='#04101bcc';ctx.beginPath();ctx.arc(0,0,r,0,TAU);ctx.fill();
  ctx.strokeStyle=C.c;ctx.lineWidth=3;ctx.beginPath();ctx.arc(0,0,r,0,TAU);ctx.stroke();ctx.globalAlpha=.55+.45*p;ctx.lineWidth=1.5;ctx.setLineDash([7,5]);ctx.lineDashOffset=quiet?0:-g.t*30;ctx.beginPath();ctx.arc(0,0,r+7,0,TAU);ctx.stroke();ctx.setLineDash([]);ctx.globalAlpha=1;
  ctx.textAlign='center';ctx.textBaseline='middle';const fit=(t,px,max)=>{ctx.font='bold '+px+'px sans-serif';const w=ctx.measureText(t).width;if(w>max){px=Math.max(8,Math.floor(px*max/w));ctx.font='bold '+px+'px sans-serif';}};ctx.fillStyle='#ffffff';fit(C.n,15,2*r-12);ctx.fillText(C.n,0,-8);ctx.fillStyle=C.c;fit(C.s,11,2*r-14);ctx.fillText(C.s,0,11);ctx.restore();}
 function draw(){if(!(mode==='play'||mode==='pause'))return;const quiet=(()=>{try{return VisualFX.reduced();}catch{return false;}})();ctx.save();
  if(gates.length===2){const [a,b]=gates;ctx.globalAlpha=.35;ctx.strokeStyle='#bff6ff';ctx.lineWidth=2;ctx.setLineDash([4,8]);ctx.beginPath();ctx.moveTo(a.x+58,a.y);ctx.lineTo(b.x-58,b.y);ctx.stroke();ctx.setLineDash([]);ctx.globalAlpha=1;}
  for(const g of gates)drawGate(g,quiet);
  if(flash){ctx.globalCompositeOperation='lighter';ctx.globalAlpha=1-flash.t/.6;ctx.strokeStyle=flash.c;ctx.lineWidth=4;ctx.beginPath();ctx.arc(flash.x,flash.y,44+flash.t*160,0,TAU);ctx.stroke();ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;}
  ctx.globalCompositeOperation='lighter';ctx.strokeStyle=CORES.RICOCHET.c;ctx.lineWidth=2;for(const a of arcs){ctx.globalAlpha=1-a.t/.18;ctx.beginPath();ctx.moveTo(a.x1,a.y1);const mx=(a.x1+a.x2)/2+(Math.random()-.5)*14,my=(a.y1+a.y2)/2+(Math.random()-.5)*14;ctx.lineTo(mx,my);ctx.lineTo(a.x2,a.y2);ctx.stroke();}
  for(const p of pulses){ctx.globalAlpha=1-p.t/.45;ctx.strokeStyle=CORES.NOVA_SHIELD.c;ctx.lineWidth=5;ctx.beginPath();ctx.arc(p.x,p.y,30+p.t/.45*(CHINH.novaR-30),0,TAU);ctx.stroke();}
  ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;
  if(has('CRYO_ROUND')&&!quiet){ctx.strokeStyle='#bdf3ff';ctx.lineWidth=1.5;ctx.globalAlpha=.7;for(const e of enemies)if(!e.dead&&e.cryo66>time){ctx.beginPath();ctx.arc(e.x,e.y,e.large?30:20,0,TAU);ctx.stroke();}ctx.globalAlpha=1;}
  if(boss&&boss.stun66>0){const b=boss,y=b.y-70;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='bold 14px sans-serif';ctx.lineWidth=3;ctx.strokeStyle='#120a00';ctx.strokeText('CHOÁNG '+b.stun66.toFixed(1)+'s',b.x,y);ctx.fillStyle='#ffe066';ctx.fillText('CHOÁNG '+b.stun66.toFixed(1)+'s',b.x,y);
   if(!quiet)for(let k=0;k<5;k++){const a=time*3+k*TAU/5;ctx.fillStyle=k%2?'#ffe066':'#ffffff';ctx.beginPath();ctx.arc(b.x+Math.cos(a)*46,y+16+Math.sin(a)*9,3,0,TAU);ctx.fill();}}
  if(cores.length&&mode==='play'){let x=10;for(const k of cores)x+=pill(x,62,k)+6;}
  ctx.restore();}
 const ovd=VisualFX.draw;VisualFX.draw=function(){const r=ovd.apply(this,arguments);try{draw();}catch(e){}return r;};
 return {CORES,CHINH,cores:()=>[...cores],gates:()=>gates.map(g=>({...g})),has,
  rate:()=>has('BERSERK')&&superTime>0?CHINH.berserkRate:1,misRate:()=>has('TWIN_MISSILE')?CHINH.misRate:1,misExtra:()=>has('TWIN_MISSILE')?CHINH.misExtra:0,
  _spawn:spawn,_take:i=>{if(gates[i])take(gates[i]);},_give:k=>{if(!has(k))cores.push(k);},state:()=>({drops,lastWave,stageKey,stun:boss?boss.stun66||0:0})};
})();

// ---------- chỉ số ghi nhận offline (đề xuất telemetry của Gemini, lưu gọn) ----------
const Telemetry66=(()=>{const KEY='saobang-telemetry-v66';let d={sessions:0,stagesPlayed:0,bossPartsBroken:0,gates:0};
 try{Object.assign(d,JSON.parse(localStorage.getItem(KEY)||'{}'));}catch{}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(d));}catch{}};d.sessions++;save();
 return {add:(k,n=1)=>{d[k]=(d[k]||0)+n;save();},get:()=>({...d})};})();

// Phí hợp thể trang bị SSS (Claude, thay cho việc Gemini đề nghị tăng giá cấp/mảnh toàn game): ~3–4 ngày càn quét ở chương 2–3.
const FEE66={c:8000,e:400};
// ---------- MỞ KHÓA DẦN tính năng (bảng UNLOCK66 — Gemini chốt 2026-10-21, Claude giữ nguyên số) ----------
//  lv: số ải đã vượt để mở. stall: mở sớm khi kẹt boss: đã vượt ≥ min ải và thua ≥ fails lần ở cùng 1 ải boss
//  (stages: chỉ các ải này; không ghi = mọi ải chia hết cho 5). Chỉ tính lần thua khi boss ĐÃ xuất hiện và trận ≥ 20 giây.
//  sel: các nút dẫn vào tính năng. Người đã có tiến trình ≥ mốc / đã có SSS: mở ngay, không bao giờ khóa lại.
const UNLOCK66={
 daily:{lv:3,name:'Điểm danh',sel:['#hgr41 [data-go="daily"]','[data-cc="daily"]']},
 chest:{lv:5,name:'Kho báu',sel:['#hgr41 [data-go="chest"]','[data-cc="chest"]']},
 dungeon_gold:{lv:8,name:'Phó bản Vàng',sel:['[data-seg="dungeon"]','[data-cc="farm"]','#hgr41 [data-go="farm"]','[data-dungeon="gold"]'],gift:{credits:300}},
 challenge:{lv:10,name:'Thử thách ngày',sel:['[data-m63="daily"]']},
 dungeon_mat:{lv:15,stall:{min:12,fails:2,stages:[15]},name:'Phó bản Vật liệu',sel:['[data-dungeon="materials"]']},
 tower:{lv:15,name:'Tháp Boss',sel:['#hgr41 [data-go="tower"]','[data-cc="tower"]']},
 endless:{lv:25,name:'Vô tận',sel:['#hgr41 [data-go="endless"]']},
 dungeon_boss:{lv:12,name:'Phó bản Trang bị',sel:['[data-dungeon="bossdungeon"]','#buy-boss-ticket']},
 dungeon_gems:{lv:20,name:'Phó bản Ngọc',sel:['[data-dungeon="gems"]']},   // V79D Gemini: tách phó bản Ngọc ra mở ở ải 20 (hệ Ngọc & Ghép vẫn ải 35)
 gems:{lv:35,stall:{min:20,fails:3},name:'Ngọc & Ghép',sel:['#hgr41 [data-go="gems"]','#hgr41 [data-go="fusion"]','#tabbar [data-tb="gems"]'],gift:{exp:50,gemFrag:30}},
 sss:{lv:40,stall:{min:35,fails:4,stages:[40]},name:'Trang bị SSS & Hợp thể',sel:['[data-g44]','[data-cc-open]','[data-cc="fuse"]']}};
const DUNGEON66={gold:'dungeon_gold',materials:'dungeon_mat',bossdungeon:'dungeon_boss',gems:'dungeon_gems',endless:'endless'};
const Onboard66=(()=>{
 const KEY='saobang-unlock-v66',RKEY='saobang-backup-remind-v66';
 let S=null;try{S=JSON.parse(localStorage.getItem(KEY)||'null');}catch{}
 const first=!S;S=S||{};S.early=S.early||{};S.seen=S.seen||[];S.fails=S.fails||{};S.gift=S.gift||[];
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 let cleared=null,cAt=0;
 function clearedN(){if(cleared!==null&&Date.now()-cAt<1500)return cleared;let n=1;try{while(n<160&&Progress.canStart(n+1))n++;}catch{}cleared=n-1;try{if(n===160&&Progress.getState().cleared.includes(160))cleared=160;}catch{}cAt=Date.now();return cleared;}
 function stallCheck(){const c=clearedN();for(const k in UNLOCK66){const u=UNLOCK66[k];if(!u.stall||S.early[k]||c<u.stall.min)continue;for(const st in S.fails){const n=+st;if((u.stall.stages?u.stall.stages.includes(n):n%5===0)&&S.fails[st]>=u.stall.fails){S.early[k]=n;save();break;}}}}
 function open(k){const u=UNLOCK66[k];if(!u)return true;if(S.seen.includes(k))return true;if(k==='sss'){try{if(Object.keys(Gear44.state().owned||{}).length)return true;}catch{}}return clearedN()>=u.lv||!!S.early[k];}
 function why(k){const u=UNLOCK66[k];return 'MỞ KHÓA SAU KHI VƯỢT ẢI '+u.lv+' · '+u.name.toUpperCase()+(u.stall?' (mở sớm nếu kẹt boss)':'');}
 function block(k){if(open(k))return false;try{toast(why(k));}catch{}return true;}
 function gift(k){const g=UNLOCK66[k].gift;if(!g||S.gift.includes(k))return '';S.gift.push(k);save();const out=[];
  try{if(g.credits){Progress.grantCredits(g.credits);out.push('+'+g.credits+' hợp kim');}}catch{}
  try{if(g.exp){Workshop.grant({exp:g.exp});out.push('+'+g.exp+' đá nâng cấp');}}catch{}
  try{if(g.gemFrag){Gems.rewardStage(1,0,Math.random(),g.gemFrag);out.push('+'+g.gemFrag+' mảnh ngọc');}}catch{}
  return out.length?' · QUÀ: '+out.join(', '):'';}
 function nextGoal(){const c=clearedN();let best=null;for(const k in UNLOCK66){if(open(k))continue;const u=UNLOCK66[k];if(!best||u.lv<best.lv)best={k,lv:u.lv,name:u.name};}return best?{...best,left:best.lv-c}:null;}
 function apply(){stallCheck();
  for(const k in UNLOCK66){const u=UNLOCK66[k],locked=!open(k);for(const q of u.sel)document.querySelectorAll(q).forEach(b=>{if(locked){if(!b.classList.contains('lk66')){b.classList.add('lk66');b.dataset.lk66=k;const t=document.createElement('span');t.className='lk66b';t.textContent='ẢI '+u.lv;b.appendChild(t);}}else if(b.classList.contains('lk66')){b.classList.remove('lk66');delete b.dataset.lk66;b.querySelectorAll('.lk66b').forEach(x=>x.remove());}});
   if(!locked&&!S.seen.includes(k)){S.seen.push(k);save();if(!first){const gi=gift(k);try{toast('★ MỞ KHÓA MỚI: '+u.name.toUpperCase()+gi);}catch{}}}}
  document.body.classList.toggle('lksss66',!open('sss'));
  const st=document.querySelector('#hgr41 .h1-stage');if(st){let el=st.querySelector('.nx66');const g=nextGoal();if(!g){if(el)el.remove();}else{if(!el){el=document.createElement('div');el.className='nx66';st.appendChild(el);}const txt='▶ Vượt ải '+g.lv+': mở '+g.name+(g.left>0?' (còn '+g.left+' ải)':'');if(el.textContent!==txt)el.textContent=txt;}}
  const sv=document.querySelector('#hgr41 [data-m63="save"]');if(sv){const on=remind();if(on&&!sv.querySelector('.rm66')){const i=document.createElement('i');i.className='rm66';i.textContent='!';sv.appendChild(i);}else if(!on)sv.querySelectorAll('.rm66').forEach(x=>x.remove());}}
 if(first){for(const k in UNLOCK66)if(open(k))S.seen.push(k);save();}
 document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('.lk66');if(!b)return;e.preventDefault();e.stopImmediatePropagation();block(b.dataset.lk66);},true);
 const wrap=(obj,fn,key)=>{try{const o=obj[fn];if(typeof o!=='function')return;obj[fn]=function(){const k=typeof key==='function'?key.apply(this,arguments):key;if(k&&block(k))return false;return o.apply(this,arguments);};}catch{}};
 const modeKey=()=>{try{return DUNGEON66[document.getElementById('gamemode').value]||null;}catch{return null;}};
 wrap(Meta40,'towerPanel','tower');
 wrap(Hub40,'openSeg',s=>s==='dungeon'?'dungeon_gold':s==='chest'?null:null);
 wrap(UI392,'showTab',t=>t==='gems'?'gems':null);
 wrap(Gear44,'open','sss');wrap(Gear44,'fuse','sss');
 try{wrap(Play63.Daily,'open','challenge');}catch{}
 wrap(Dungeons,'choose',t=>DUNGEON66[t]||null);
 wrap(Dungeons,'begin',modeKey);
 // đếm lần thua boss thật (boss đã xuất hiện, trận ≥ 20 giây) cho điều kiện mở sớm
 const oend=end;end=function(win){try{if(!win&&gameMode==='campaign'&&!Dungeons.active()&&boss&&boss.bossHealthReady&&stageTime>=20&&level%5===0){S.fails[level]=(S.fails[level]||0)+1;save();var hint=stallHint(level);}}catch{}const r=oend.apply(this,arguments);try{if(hint)setTimeout(()=>{try{toast(hint);}catch{}},900);}catch{}return r;};
 function stallHint(lv){const c=clearedN(),n=S.fails[lv]||0;for(const k in UNLOCK66){const u=UNLOCK66[k];if(!u.stall||open(k)||S.early[k]||c<u.stall.min)continue;if(u.stall.stages?!u.stall.stages.includes(lv):lv%5!==0)continue;const left=u.stall.fails-n;
   return left>0?'KẸT BOSS? Thua thêm '+left+' lần ở ải này sẽ mở sớm '+u.name.toUpperCase()+' để tăng lực chiến':'';}return '';}
 function remind(){try{return localStorage.getItem(RKEY)==='1';}catch{return false;}}
 document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('[data-m63="save"]')){try{localStorage.setItem(RKEY,'0');}catch{}setTimeout(apply,50);}},true);
 const ofs=finishStage36;finishStage36=function(hadBoss){const lv=level,gm=gameMode,was=stageFinished36;const r=ofs.apply(this,arguments);
  try{if(!was&&stageFinished36){Telemetry66.add('stagesPlayed');if(gm==='campaign'&&hadBoss&&!Dungeons.active()&&Campaign36.bossKind(lv)==='major')localStorage.setItem(RKEY,'1');}}catch{}cleared=null;return r;};
 setInterval(()=>{try{if(!['play','pause'].includes(mode))apply();}catch{}},700);
 return {apply,cleared:clearedN,open,remind,nextGoal,state:()=>JSON.parse(JSON.stringify(S)),_fail:(lv,n)=>{S.fails[lv]=n;save();}};
})();

// ---------- CÀI ĐẶT · chế độ hình ảnh TỰ ĐỘNG / ĐẸP / NHẸ (V66.1) ----------
//  ĐẸP: độ nét ×2, ánh sáng lan (bloom) bật cả trên máy DPR 3, hạt đầy đủ; KHÔNG tự hạ.
//  NHẸ: độ nét ×1,25 (ít điểm ảnh hơn ~60%), tắt ánh sáng lan, hạt giảm, hiệu ứng tiến hóa làm mới chậm hơn.
//  TỰ ĐỘNG (mặc định người mới): vào trận ở ĐẸP, máy chậm ≥ 2 giây thì tự chuyển NHẸ cho đến hết lượt mở game.
const Gfx66=(()=>{
 const KEY='saobang-gfx-v66';let pref=null;
 try{pref=localStorage.getItem(KEY);}catch{}
 if(!['auto','high','light'].includes(pref))pref='auto';  // bản cũ tự đặt NHẸ cho mọi điện thoại (không phải người chơi chọn) → chuyển sang TỰ ĐỘNG
 const cur=()=>{try{return VisualFX.counts().quality;}catch{return 'high';}};
 function set(p){pref=p;try{localStorage.setItem(KEY,p);}catch{}VisualFX.setQuality(p==='light'?'light':'high');window.GFX66=cur();paint();}
 const osq=VisualFX.setQuality;VisualFX.setQuality=function(v){if(v==='auto-light'&&pref==='high')return;const r=osq.apply(this,arguments);window.GFX66=cur();try{paint();}catch{}return r;};
 // nút cũ ở đầu trang / sảnh (✧): xoay vòng 3 chế độ
 document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('#effects-quality');if(!b)return;e.preventDefault();e.stopImmediatePropagation();set(pref==='auto'?'high':pref==='high'?'light':'auto');try{toast('HÌNH ẢNH: '+NAME[pref]);}catch{}},true);
 const NAME={auto:'TỰ ĐỘNG',high:'ĐẸP',light:'NHẸ'};
 const DESC={auto:'Vào trận ở chế độ Đẹp. Nếu máy giật quá 2 giây sẽ tự chuyển sang Nhẹ.',high:'Nét nhất, ánh sáng lan, hạt sáng và hiệu ứng tiến hóa đầy đủ. Hiệu ứng không tự tắt; chỉ tự giảm độ nét khi máy giật để giữ mượt.',light:'Nét vừa, tắt ánh sáng lan, ít hạt sáng. Mượt hơn, đỡ nóng máy và tốn pin.'};
 let el=null;
 function txt(id){const b=document.getElementById(id);return b?b.textContent.split(':').pop().trim():'—';}
 function build(){el=document.createElement('div');el.className='m63 st66';el.hidden=true;el.innerHTML=`<div class="m63-card"><div class="m63-eye">CÀI ĐẶT</div><h3>HÌNH ẢNH & ÂM THANH</h3>
  <div class="st66-l">CHẾ ĐỘ HÌNH ẢNH</div><div class="st66-seg">${['auto','high','light'].map(k=>`<button data-gfx="${k}">${NAME[k]}</button>`).join('')}</div><p class="st66-d" id="st66-d"></p><p class="st66-now" id="st66-now"></p>
  <div class="st66-l">ÂM THANH</div><div class="st66-row"><button data-px="sound"></button><button data-px="music393"></button><button data-px="vibration393"></button></div>
  <div class="st66-l">MÃ QUÀ TẶNG / QUẢN TRỊ</div><div class="st66-row"><input id="st66-code" type="text" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="Nhập mã…"><button data-adm="go">KÍCH HOẠT</button></div><p class="st66-now" id="st66-adm"></p>
  <div class="m63-btns" style="display:flex;margin-top:16px"><button class="m63-go" data-x="close">ĐÓNG</button></div></div>`;
  document.body.appendChild(el);
  el.addEventListener('click',e=>{const g=e.target.closest('[data-gfx]'),p=e.target.closest('[data-px]'),a=e.target.closest('[data-adm]');if(a){const r=Admin66.tryCode(el.querySelector('#st66-code').value,a.dataset.adm);const m=el.querySelector('#st66-adm');if(m)m.textContent=r;}else if(g){set(g.dataset.gfx);}else if(p){const b=document.getElementById(p.dataset.px);if(b)b.click();setTimeout(paint,30);}else if(e.target.closest('[data-x="close"]')||e.target===el)close();});}
 function paint(){if(!el)return;el.querySelectorAll('[data-gfx]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.gfx===pref)));const d=el.querySelector('#st66-d');if(d)d.textContent=DESC[pref];
  let fps='';try{const s=BloomQualityC.state();if(s.fps)fps=' · FPS đo được: '+Math.round(s.fps);}catch{}const n=el.querySelector('#st66-now');if(n)n.textContent='Đang chạy: '+(cur()==='light'?'NHẸ':'ĐẸP')+(pref==='auto'&&cur()==='light'?' (đã tự hạ)':'')+fps;
  el.querySelectorAll('[data-px]').forEach(b=>{const lab={sound:'ÂM THANH',music393:'NHẠC',vibration393:'RUNG'}[b.dataset.px];const v=txt(b.dataset.px);b.textContent=lab+': '+v;b.setAttribute('aria-pressed',String(/BẬT/.test(v)));});}
 function open(){if(!el)build();el.hidden=false;paint();}
 function close(){if(el)el.hidden=true;}
 // nút CÀI ĐẶT ở Kho chiến cơ + nút HÌNH ẢNH trong bảng tạm dừng
 setInterval(()=>{try{const side=document.querySelector('#hgr41 .h1-side');if(side&&!side.querySelector('[data-st66]')){const b=document.createElement('button');b.dataset.st66='1';b.textContent='CÀI ĐẶT';b.addEventListener('click',e=>{e.stopPropagation();open();});side.appendChild(b);}
  const ov=document.getElementById('overlay');if(ov){let b=document.getElementById('pz66');if(mode==='pause'){if(!b){b=document.createElement('button');b.id='pz66';b.className='pz66';b.addEventListener('click',e=>{e.stopPropagation();set(pref==='auto'?'high':pref==='high'?'light':'auto');b.textContent='HÌNH ẢNH: '+NAME[pref];});ov.appendChild(b);}b.textContent='HÌNH ẢNH: '+NAME[pref];b.hidden=false;}else if(b)b.hidden=true;}}catch{}},400);
 set(pref);
 return {open,close,set,pref:()=>pref,now:cur};
})();

// ---------- V66.6 · MẬT ĐỘ ĐẠN QUÁI theo ải — BẢNG CHỐT CỦA GEMINI (21/10) ----------
//  Ải 161–180 (Chương 9) đã có số, dùng khi mở Chương 9. Từ ải 61, máu và sát thương còn nhân thêm Endgame66 (cân đối cuối game).
const BULLET66={
 // ROADMAP76 (Gemini 23/10, tự phản biện REVIEW75): đạn CHẬM 135→225 px/s (speed = px/s ÷ 408), trần ≤ 180 (chặn cứng engine), nghỉ loạt dài hơn.
 // Máu/sát thương: pha trộn bảng cũ → bảng này theo DIFF động: 0,5 ở ải 1 → 1,0 ở ải 120; lực chiến < 85% đề nghị thì ≤ 0,75 (ghi đè: window.DIFF75).
 at:        [1,    10,   20,   40,   60,   100,  140,  180 ],
 burst:     [1,    1,    1,    2,    2,    3,    3,    3   ],   // V78.7 (Gemini REVIEW78_6)
 eliteExtra:[1,    1,    2,    2,    3,    3,    4,    4   ],
 fan:       [2,    2,    3,    3,    4,    4,    5,    5   ],
 cd:        [2.30, 2.05, 1.85, 1.60, 1.40, 1.25, 1.15, 1.05],
 gap:       [.20,  .18,  .17,  .15,  .14,  .12,  .11,  .10 ],
 speed:     [.306, .331, .355, .387, .417, .446, .478, .502],   // 125→205 px/s
 cap:       [24,   34,   45,   60,   75,   90,   102,  115 ],
 bossCap:   [38,   48,   58,   72,   85,   98,   110,  120 ],
 hp:        [1.00, 1.20, 1.45, 1.85, 2.30, 3.00, 3.80, 4.80],
 hpElite:   [1.20, 1.45, 1.80, 2.35, 3.00, 4.00, 5.20, 6.60],
 dmg:       [.80,  .95,  1.15, 1.40, 1.75, 2.25, 2.90, 3.60],
 bossCd:    [1.15, 1.05, .98,  .90,  .84,  .78,  .72,  .68 ],
 // mức cũ (trước REVIEW75) để pha trộn máu/sát thương theo DIFF75
 _old:{hp:[1.00,1.10,1.20,1.35,1.50,1.75,2.00,2.70],hpElite:[1.00,1.15,1.32,1.60,1.90,2.30,2.80,3.90],dmg:[.75,.85,1.00,1.18,1.35,1.60,1.95,2.50]}};//  Claude: từ ải 61 Endgame66 đã nhân máu ×(đề nghị mới/đề nghị ải 60) và sát thương ×dmgMul → để không nhân chồng,
//  máu và sát thương của bảng trên được GIỮ ở mức ải 60 cho ải > 60 (hpKeep), phần tăng sau đó do Endgame66 lo.
const Bullet66=(()=>{
 const DF=lv=>{const d=Number(window.DIFF75);if(Number.isFinite(d))return Math.max(0,Math.min(1.5,d));const base=Math.min(1,Math.max(.5,.5+.5*((lv||1)/120)));const r=Number(window.__cp76);return Number.isFinite(r)&&r>0&&r<.85?Math.min(.75,base):base;};
 const lerp=(k,lv)=>{const A=BULLET66.at,V0=BULLET66[k],O=BULLET66._old&&BULLET66._old[k],V=O?V0.map((v,i)=>O[i]+(v-O[i])*DF(lv)):V0;if(lv<=A[0])return V[0];for(let i=1;i<A.length;i++)if(lv<=A[i]){const t=(lv-A[i-1])/(A[i]-A[i-1]);return V[i-1]+(V[i]-V[i-1])*t;}return V[V.length-1];};
 const step=new Set(['burst','eliteExtra','fan','cap']),KEEP=new Set(['hp','hpElite','dmg']);
 let memo=null,memoLv=-1;
 function at(lv){lv=Math.max(1,Math.min(200,Math.floor(lv)||1));const mk=lv+'|'+DF(lv);if(mk===memoLv)return memo;const o={};for(const k in BULLET66){if(k==='at'||k==='_old')continue;const v=lerp(k,KEEP.has(k)&&lv>60?60:lv);o[k]=step.has(k)?Math.round(v):v;}o.graze=Math.min(2,Math.max(1,120/o.cap));memo=o;memoLv=mk;return o;}
 function cur(){try{if(Dungeons.active())return at(Math.max(20,level));if(gameMode==='endless')return at(Math.min(160,20+endlessWave*4));}catch{}return at(level);}
 // máu quái
 const oae=addEnemy;addEnemy=function(e){const r=oae.apply(this,arguments);try{if(e&&!e.rescue28&&!e.bossPart){const B=cur(),m=(e.elite||e.large)?B.hpElite:B.hp;if(m!==1){e.hp*=m;e.maxHp=e.hp;if(e.guard)e.guard*=m;}}}catch{}return r;};
 // nạp Graze bù khi ít đạn
 const og=Combat26.graze;Combat26.graze=function(){const r=og.apply(this,arguments);try{if(r){const m=cur().graze;if(m>1)Combat26.addCharge07(5*(m-1));}}catch{}return r;};
 // nhịp chiêu boss: mỗi khi đồng hồ chiêu được đặt lại (bắn xong) thì nhân hệ số
 const obu=Bosses28.update;Bosses28.update=function(dt){const b=boss,f0=b&&b.fire,l0=b&&b.laser,k0=b&&b.skill;const r=obu.apply(this,arguments);try{if(b&&b===boss){const m=cur().bossCd;if(m!==1){if(b.fire>f0+.05)b.fire*=m;if(b.laser>l0+.05)b.laser*=m;if(b.skill>k0+.05)b.skill*=m;}}}catch{}return r;};
 // tinh anh khiên trước (từ ải 21): chiến cơ lệch ngang > 90 px thì tinh anh giảm 35% sát thương
 const oh=Arsenal30.hit;Arsenal30.hit=function(s,e){const r=oh.apply(this,arguments);try{if(e&&e.elite&&!e.dead&&level>=21&&gameMode==='campaign'&&Math.abs(player.x-e.x)>90&&s&&s.damage>0){e.hp+=s.damage*.35;e.sh66=time;}}catch{}return r;};
 // quái thường sống quá 9 s: viền cam 0,8 s rồi lao thẳng xuống 340 px/s
 const oup=update;update=function(dt){const r=oup.apply(this,arguments);try{if(mode==='play'&&!boss)for(const e of enemies){if(e.dead||e.elite||e.large||e.rescue28||e.meteor)continue;if(e.age>9&&e.y>0&&e.y<H*.6&&!e.dv66){e.dv66=time;}if(e.dv66&&time-e.dv66>.8){e.dy66=(e.dy66||0)+340*dt;if(e.form30!==undefined)e.y+=e.dy66;else e.y+=340*dt;}}}catch{}return r;};
 function draw(){ctx.save();ctx.globalCompositeOperation='source-over';for(const e of enemies){if(e.dead)continue;
   if(e.dv66&&time-e.dv66<.8){ctx.strokeStyle='#ff9a3c';ctx.lineWidth=2.5;ctx.globalAlpha=.5+.5*Math.sin((time-e.dv66)*40);ctx.beginPath();ctx.arc(e.x,e.y,22,0,Math.PI*2);ctx.stroke();}
   if(e.sh66&&time-e.sh66<.25){ctx.strokeStyle='#9fd8ff';ctx.lineWidth=3;ctx.globalAlpha=.8;ctx.beginPath();ctx.arc(e.x,e.y,32,Math.PI*.15,Math.PI*.85);ctx.stroke();}}
  ctx.restore();}
 const ovd=VisualFX.draw;VisualFX.draw=function(){const r=ovd.apply(this,arguments);try{if(mode==='play'||mode==='pause')draw();}catch{}return r;};
 return {at,cur,table:BULLET66};
})();

// ---------- V66.2 · MÃ QUẢN TRỊ (tài khoản admin để thử game) ----------
//  Nhập mã ở Kho chiến cơ → CÀI ĐẶT → MÃ QUẢN TRỊ. Mã chỉ lưu dạng băm (FNV-1a) trong code.
//  Bấm KÍCH HOẠT 2 lần (lần 1 cảnh báo ghi đè tiến trình). Kết quả:
//   • vượt đủ 160 ải, 3★ mọi ải, mở mọi tính năng; • 10 chiến cơ SS +5 Lv.120, đủ 7 siêu chiến cơ hợp thể SSS;
//   • đủ 27 mẫu trang bị SS +5 Lv.120, đủ 18 trang bị SSS (+10), lắp sẵn bộ mạnh nhất; • mảnh ngọc cấp S cho mọi loại;
//   • tài nguyên VÔ HẠN: hợp kim, đá nâng cấp, lõi siêu hợp tự nạp lại khi dưới mức.
//  Nhập mã lần nữa khi đang bật → TẮT chế độ vô hạn (giữ nguyên đồ đã có).
const Admin66=(()=>{
 const KEY='saobang-admin-v66',HASH=0xa5b325f7,BIG=99999999;
 const h=s=>{let x=0x811c9dc5;for(const c of new TextEncoder().encode(s)){x^=c;x=Math.imul(x,0x01000193)>>>0;}return x>>>0;};
 let S=null;try{S=JSON.parse(localStorage.getItem(KEY)||'null');}catch{}
 const on=()=>!!(S&&S.on);
 const SSS=['sss_rail_disc','sss_disc_solar','sss_solar_gravity','sss_gravity_ricochet','sss_ricochet_prism','sss_prism_rail','sss_inferno_cryo','sss_cryo_thunder','sss_thunder_singularity','sss_singularity_spiral','sss_spiral_stellar','sss_stellar_inferno','sss_aegis_mirror','sss_mirror_orbital','sss_orbital_phase','sss_phase_reactive','sss_reactive_nanite','sss_nanite_aegis'];
 let armed=0;
 function tryCode(code,act){code=String(code||'').trim().toUpperCase();if(h(code)!==HASH){armed=0;return 'Mã không đúng.';}
  if(on()){S.on=false;save();return 'Đã TẮT tài nguyên vô hạn (đồ và tiến trình giữ nguyên).';}
  if(Date.now()-armed>8000){armed=Date.now();return '⚠ Tiến trình hiện tại sẽ bị GHI ĐÈ thành tài khoản quản trị. Nên SAO LƯU trước. Bấm KÍCH HOẠT lần nữa trong 8 giây để xác nhận.';}
  armed=0;activate();return 'Đang kích hoạt… trò chơi sẽ tải lại.';}
 function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}}
 function activate(){
  const L=n=>Array.from({length:n},(_,i)=>i+1),models=Object.keys(GearCatalog),stars={};for(const i of L(160))stars[i]=3;
  const read=k=>{try{return JSON.parse(localStorage.getItem(k)||'null')||{};}catch{return {};}};
  const c=read('saobang-campaign-v36');Object.assign(c,{version:36,tutorial:true,stars,crafts:[0,1,2,3,4,5,6,7,8,9],models,claims:L(32).map(i=>i*5),endlessBest:Math.max(c.endlessBest||0,100)});
  const items=models.map(v=>({id:'adm-'+v,kind:GearCatalog[v].kind,rarity:'legendary',level:120,variant:v,enhance:5,grade:'SS',rank:'SS'}));
  const best=k=>({armor:'adm-aegis',missiles:'adm-inferno',sidearm:'adm-rail'})[k];
  const hg=read('saobang-hangar-v1');Object.assign(hg,{version:2,catalogVersion:36,cleared:L(160),credits:BIG,items,equipped:{armor:best('armor'),missiles:best('missiles'),sidearm:best('sidearm')},totalKills:Math.max(hg.totalKills||0,99999),bosses:Math.max(hg.bosses||0,32)});
  const ws=read('saobang-workshop-v1');const gf={};for(const v of models)gf[v]=999;Object.assign(ws,{version:1,schema:25,crafts:Array(10).fill('SS'),craftEnhancements:Array(10).fill(5),craftLevels:Array(10).fill(120),craftFragments:Array(10).fill(999),gearFragments:gf,exp:BIG,aux:0});
  const owned={};for(const id of SSS)owned[id]={at:Date.now()};
  const gs={v:1,owned,equip:{armor:'sss_aegis_mirror',missiles:'sss_inferno_cryo',sidearm:'sss_rail_disc'}};
  const m7=read('saobang-meta-v407');m7.v=1;m7.cores=BIG;
  const un=read('saobang-unlock-v66');un.seen=Object.keys(UNLOCK66);un.early=un.early||{};un.fails=un.fails||{};un.gift=Object.keys(UNLOCK66);
  const put=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
  try{put('saobang-campaign-v36',c);put('saobang-hangar-v1',hg);put('saobang-workshop-v1',ws);put('saobang-gear-sss-v1',gs);try{const o2={};const RM4=window.SSS4309!==false?['sss_chrono_monarch_a','sss_chrono_monarch_m','sss_chrono_monarch_s']:[];for(const x of SSS_E.sss_equipment)if(!RM4.includes(x.id))o2[x.id]={lv:5,at:Date.now()};put('saobang-gear-sss-v2',{v:2,owned:o2,bind:{},wk:{w:0,n:0},pay:null,l4:RM4.length?1:0});/* V309 Lượt 4: 21 món */}catch{}/* V156 */put('saobang-meta-v407',m7);put('saobang-unlock-v66',un);
   S={on:true,phase:2,at:Date.now()};save();}catch(e){return;}
  window.__adm66=true;setTimeout(()=>location.reload(),300);}
 // các module của game lưu khi rời trang → chặn ghi đè trong lúc tải lại
 const osi=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(window.__adm66&&k!==KEY)return;return osi.call(this,k,v);};
 // giai đoạn 2 (sau khi tải lại): hợp thể siêu chiến cơ + mảnh ngọc
 function phase2(){if(!S||S.phase!==2)return;S.phase=3;save();
  try{for(const [a,b] of FusionBlueprints.pairs){try{Fusion.mergeSSS(a,b);}catch{}}}catch{}
  try{for(let k=0;k<12;k++)Gems.rewardStage(160,1,(k+.5)/12,300);}catch{}
  try{toast('★ TÀI KHOẢN QUẢN TRỊ ĐÃ KÍCH HOẠT · TÀI NGUYÊN VÔ HẠN');}catch{}}
 // tài nguyên vô hạn
 function topUp(){if(!on()||['play','pause'].includes(mode))return;try{const c=Progress.balance();if(c<BIG/2)Progress.grantCredits(BIG-c);}catch{}try{const e=Workshop.expBalance();if(e<BIG/2)Workshop.grant({exp:BIG-e});}catch{}
  try{const m=JSON.parse(localStorage.getItem('saobang-meta-v407')||'null');if(m&&(m.cores||0)<BIG/2){m.cores=BIG;localStorage.setItem('saobang-meta-v407',JSON.stringify(m));}}catch{}
  try{const hd=document.querySelector('#hgr41 .h1-head');if(hd&&!hd.querySelector('.adm66')){const b=document.createElement('span');b.className='adm66';b.textContent='ADMIN';hd.appendChild(b);}}catch{}}
 setTimeout(()=>{try{phase2();}catch{}},1500);setInterval(()=>{try{topUp();}catch{}},2000);
 return {tryCode,on,state:()=>S?{...S}:null};
})();

// ---------- V66.4 · CHỐNG LÓA: hiệu ứng phía người chơi dịu đi để luôn thấy rõ đạn địch ----------
//  Chỉ áp trong lúc vẽ các lớp của NGƯỜI CHƠI (đạn, laser, vệt, trang bị, siêu chiến cơ, hào quang Bạo Tẩu).
//  Đạn địch, boss, giao diện không bị ảnh hưởng. Lớp cộng sáng ('lighter'/'screen') giảm mạnh hơn lớp thường.
const GLOW66={add:.8,addSuper:.66,shot:.94,shotSuper:.84,beam:.8};
const Glow66=(()=>{
 const P=CanvasRenderingContext2D.prototype,dA=Object.getOwnPropertyDescriptor(P,'globalAlpha'),dC=Object.getOwnPropertyDescriptor(P,'globalCompositeOperation');
 const c=ctx;let req=1,base=1,add=1;const st=[];const scope=[];
 const isAdd=op=>op==='lighter'||op==='screen'||op==='plus-lighter'||op==='color-dodge';
 let op='source-over',ad=false,la=-1;const apply=()=>{const a=Math.max(0,Math.min(1,req*base*(ad?add:1)));if(a!==la){la=a;dA.set.call(c,a);}};  // V107: nhớ phép trộn + bỏ gán lặp
 try{
  Object.defineProperty(c,'globalAlpha',{configurable:true,get(){return req;},set(v){v=+v;if(Number.isFinite(v))req=v;apply();}});
  Object.defineProperty(c,'globalCompositeOperation',{configurable:true,get(){return op;},set(v){if(v===op)return;dC.set.call(c,v);op=dC.get.call(c);ad=isAdd(op);apply();}});
  const sv=c.save,rs=c.restore;c.save=function(){st.push(req,op,la);return sv.apply(this,arguments);};c.restore=function(){const r=rs.apply(this,arguments);if(st.length>=3){la=st.pop();op=st.pop();ad=isAdd(op);req=st.pop();}else{op=dC.get.call(c);ad=isAdd(op);la=-1;}apply();return r;};
 }catch(e){}
 function enter(kind){const sup=superTime>0;let b=1,a=1;if(mode==='play'||mode==='pause'){if(kind==='shot'){b=sup?GLOW66.shotSuper:GLOW66.shot;a=sup?GLOW66.addSuper:GLOW66.add;}else{a=sup?GLOW66.addSuper:GLOW66.add;}}
  scope.push([base,add]);base*=b;add*=a;apply();}
 function leave(){const p=scope.pop();if(p){base=p[0];add=p[1];}else{base=1;add=1;}apply();}
 function wrap(obj,fn,kind){try{const o=obj&&obj[fn];if(typeof o!=='function')return;obj[fn]=function(g){if(g&&g!==c&&fn!=='drawShot'&&fn!=='tail'&&fn!=='laser'&&fn!=='beams'&&fn!=='ultimate'&&fn!=='draw'){return o.apply(this,arguments);}enter(kind);try{return o.apply(this,arguments);}finally{leave();}};}catch{}}
 wrap(Fighters28,'draw','shot');wrap(Equipment25,'drawShot','shot');wrap(VisualFX,'drawShot','shot');wrap(PlayerFXB,'tail','shot');wrap(PlayerFXB,'laser','shot');
 try{wrap(GEAR_FX,'draw','shot');}catch{}
 try{wrap(SSSGame,'draw','fx');}catch{}try{if(typeof SuperGame!=='undefined')wrap(SuperGame,'drawShip','fx');}catch{}
 wrap(VisualFX,'drawSuperAura','fx');wrap(Rank36,'draw','fx');
 try{const orz=resize;const nrz=function(){const w=c.canvas.width,h=c.canvas.height;const r=orz.apply(this,arguments);if(c.canvas.width!==w||c.canvas.height!==h){op=dC.get.call(c);ad=isAdd(op);la=-1;st.length=0;apply();}return r;};window.resize=nrz;try{resize=nrz;}catch{}}catch{}
 return {enter,leave,state:()=>({req,base,add,depth:scope.length,op,la})};
})();

// ---------- V66.4 · CÂN ĐỐI CUỐI GAME (người dùng: "trang bị max quá mạnh, ải 160 không có độ khó") ----------
//  1) Lực chiến đề nghị: ải 1–60 giữ nguyên (1100 + 12·(ải−1)); từ ải 60 tăng dần theo cấp số nhân tới 14.000 ở ải 160
//     (trước: 3.008 ở ải 160, trong khi bộ max đạt ~36.000 → mạnh gấp 12 lần).
//  2) Lợi thế lực chiến giảm dần: vượt đề nghị tới 1,5 lần → giữ nguyên; vượt hơn nữa → sát thương ×(tỉ lệ/1,5)^−0,6
//     (mạnh gấp 3 chỉ còn ~2,2 lần, gấp 12 → ~3,5 lần thay vì 12 lần). Thiếu lực chiến: phạt như cũ.
//     Chỉ áp ở Chiến dịch (không áp Vô tận, Phó bản, Tháp).
//  3) Sát thương địch: bảng Gemini (×0,75 ở ải 1 → ×1,35 ở ải 60) rồi từ ải 61 nhân thêm tới ×2,6 → tổng ×3,5 ở ải 160 (giáp/máu dày của bộ max không còn "miễn nhiễm").
const ENDGAME66={keep:60,req160:14000,comp:.6,free:1.5,dmg160:2.6};  // dmg160: × thêm trên mức ải 60 của bảng Gemini (1,35) → tổng ≈ ×3,5 ở ải 160
const Endgame66=(()=>{
 const reqOld=n=>1100+(n-1)*12;
 // V87 REVIEW87 Câu 4: sau ải 160 đi thẳng: 160 → 14.000 · 180 → 19.500 · 200 → 26.000 (+325/ải từ 181). Trước đây kéo dài đường mũ tới ~21.090 ở ải 180.
 // máu quái/boss vẫn theo đường cũ (V87) — tách khỏi lực chiến đề nghị để V90 hạ đề nghị không làm quái yếu đi
 function reqHp(n){n=Math.max(1,Math.min(200,n|0));const k=ENDGAME66.keep;if(n<=k)return reqOld(n);if(n<=160)return Math.round(reqOld(k)*Math.pow(ENDGAME66.req160/reqOld(k),(n-k)/(160-k)));if(n<=180)return Math.round(14000+(n-160)*275);return 19500+(n-180)*325;}
 // V90 · Gemini REVIEW90 §3: lực chiến đề nghị mới 100 → 3.600 · 120 → 6.200 · 140 → 8.200 · 160 → 10.200 · 180 → 13.800 · 200 → 17.500 (tuyến tính giữa mốc; 60→100 nối hình mũ từ 1.808)
 const REQ90=[[100,3600],[120,5100],[140,8200],[160,9600],[180,12800],[200,14800]];// REVIEW92
 function req(n){n=Math.max(1,Math.min(200,n|0));const k=ENDGAME66.keep;if(n<=k)return reqOld(n);if(window.REQ90===false)return reqHp(n);if(n<=100)return Math.round(reqOld(k)*Math.pow(3600/reqOld(k),(n-k)/(100-k)));for(let i=1;i<REQ90.length;i++){const [a,va]=REQ90[i-1],[b,vb]=REQ90[i];if(n<=b)return Math.round(va+(vb-va)*(n-a)/(b-a));}return 14800;}
 function dmgMul(n){const k=ENDGAME66.keep;if(n<=k)return 1;return Math.pow(ENDGAME66.dmg160,(Math.min(200,n)-k)/(160-k));}
 const camp=()=>{try{return gameMode==='campaign'&&!Dungeons.active()&&!(typeof Meta40!=='undefined'&&Meta40.state&&Meta40.state().run);}catch{return false;}};
 let ratio=1;
 function comp(){if(!camp())return 1;try{const cp=Combat.stats().cp,r=Combat.stageRequirement(level);ratio=cp/r;const q=ratio/ENDGAME66.free;return q>1?Math.pow(q,-ENDGAME66.comp):1;}catch{return 1;}}
 let cComp=1,cAt=-9;
 const of=Combat.factor;Combat.factor=function(){const v=of.apply(this,arguments);if(Math.abs(time-cAt)>.5){cAt=time;cComp=comp();}return v*cComp;};
 const ob=Combat.begin;Combat.begin=function(){const r=ob.apply(this,arguments);try{cComp=comp();}catch{}return r;};
 const od=damage;damage=function(){const h0=hp,s0=shield;const r=od.apply(this,arguments);try{{let m=1;try{m=Bullet66.cur().dmg;}catch{}if(camp())m*=dmgMul(level);const loss=(h0-hp)+(s0-shield);if(m!==1&&loss>0&&(mode==='play'||mode==='over')){let extra=loss*(m-1);if(extra>0){const fromS=Math.min(shield,extra);shield-=fromS;extra-=fromS;if(extra>0){hp=Math.max(0,hp-extra);if(hp<=0&&mode==='play'&&!Revive393.offer())end(false);}}else if(hp>0){let back=-extra;const toH=Math.min(back,h0-hp);hp+=toH;back-=toH;shield+=Math.min(back,s0-shield);}try{hud();}catch{}}}}catch{}return r;};
 //  4) Máu quái & boss từ ải 61 tăng theo đúng đường lực chiến đề nghị (ải 160: ×6,6 so với ải 60).
 function hpMul(n){const k=ENDGAME66.keep;if(n<=k)return 1;return reqHp(n)/reqHp(k);}
 const oae=addEnemy;addEnemy=function(e){const r=oae.apply(this,arguments);try{if(camp()&&e&&!e.rescue28&&!e.bossPart){const m=hpMul(level);if(m>1){e.hp*=m;e.maxHp=e.hp;if(e.guard)e.guard*=m;}}}catch{}return r;};
 const osb=Combat26.setupBoss;Combat26.setupBoss=function(b){try{if(b&&!b.bossHealthReady&&!b.eg66&&camp()){const m=hpMul(level);if(m>1){b.eg66=1;b.max*=m;b.hp=b.max;}}}catch{}return osb.apply(this,arguments);};
 return {req,reqHp,dmgMul,hpMul,comp,ratio:()=>ratio,table:()=>[1,20,40,60,80,100,120,140,160].map(n=>[n,req(n),+dmgMul(n).toFixed(2),+hpMul(n).toFixed(2)])};
})();

// ---------- V66.6 · ĐẠN ĐỊCH TÔNG NÓNG (học từ clip game cùng thể loại): ta lạnh–trong, địch nóng–đặc ----------
//  Màu đạn địch thuộc vùng lạnh (lam/ngọc/tím) được đổi sang đỏ/cam/vàng/hồng nóng; lõi vẽ thường (không cộng sáng) + viền tối.
const WARM66=['#ff3b4f','#ff8a1f','#ffd23a','#ff4fa3','#ff6a3d','#ffb02e'];
const Warm66=(()=>{const cache=new Map();
 function hue(hex){const m=/^#?([0-9a-f]{6})/i.exec(hex||'');if(!m)return null;const n=parseInt(m[1],16),r=(n>>16&255)/255,g=(n>>8&255)/255,b=(n&255)/255,mx=Math.max(r,g,b),mn=Math.min(r,g,b),d=mx-mn;if(d<.08)return -1;let h;if(mx===r)h=((g-b)/d)%6;else if(mx===g)h=(b-r)/d+2;else h=(r-g)/d+4;h*=60;if(h<0)h+=360;return h;}
 function map(c,k){const key=c+'|'+(k%6);if(cache.has(key))return cache.get(key);const h=hue(c);let out=c;if(h!==null&&(h===-1||h>=150&&h<=330)){out=WARM66[(k||0)%WARM66.length];}else if(h!==null)out=c.slice(0,7);cache.set(key,out);return out;}
 return {map,hue};})();

// ---------- V66.6 · CHÍ MẠNG: 10% đòn ×2 (tổng sát thương trung bình giữ nguyên: mọi đòn ×1/1,1) + chữ "X2" bật lên ----------
const CRIT66={chance:.1,mult:2};
const Crit66=(()=>{
 const pops=[];let lastPop=-9;
 const os=shot;shot=function(){const r=os.apply(this,arguments);try{const s=shots.at(-1);if(s&&!s.c66){s.c66=1;const avg=1+CRIT66.chance*(CRIT66.mult-1);if(Math.random()<CRIT66.chance){s.crit66=true;s.damage*=CRIT66.mult/avg;}else s.damage/=avg;}}catch{}return r;};
 const oh=Arsenal30.hit;Arsenal30.hit=function(s,e){const r=oh.apply(this,arguments);try{if(s&&s.crit66&&e&&(mode==='play')&&time-lastPop>.12&&pops.length<10){lastPop=time;pops.push({x:e.x+(Math.random()-.5)*30,y:e.y-10,t:0,big:!!(e===boss||e.bossPart)});}}catch{}return r;};
 function draw(){if(!pops.length)return;const dt=1/60;ctx.save();ctx.textAlign='center';ctx.textBaseline='middle';ctx.globalCompositeOperation='source-over';
  for(const p of pops){p.t+=dt;const u=p.t/.75,s=(p.big?17:14)*(u<.15?.7+u*2:1);ctx.globalAlpha=Math.max(0,1-Math.max(0,u-.55)/.45);ctx.font=`italic 900 ${s}px sans-serif`;ctx.lineWidth=3.5;ctx.strokeStyle='#3a1400';const y=p.y-u*26;ctx.strokeText('X'+CRIT66.mult,p.x,y);const g=ctx.createLinearGradient(0,y-s/2,0,y+s/2);g.addColorStop(0,'#fff6b0');g.addColorStop(1,'#ffae1f');ctx.fillStyle=g;ctx.fillText('X'+CRIT66.mult,p.x,y);}
  ctx.restore();for(let i=pops.length-1;i>=0;i--)if(pops[i].t>.75)pops.splice(i,1);}
 const ovd=VisualFX.draw;VisualFX.draw=function(){const r=ovd.apply(this,arguments);try{if(mode==='play'||mode==='pause')draw();}catch{}return r;};
 return {pops:()=>pops.length};
})();
