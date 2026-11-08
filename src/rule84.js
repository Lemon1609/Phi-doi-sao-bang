// V84 · LUẬT ĐẶC BIỆT 4 SỰ KIỆN TUẦN (Gemini REVIEW84 §A) — chỉ bọc hàm, không thêm vật thể trên màn.
//  W1 Cuộc Đua Tinh Vân (Chiến dịch thường + Thử thách Hạt giống): bay nhanh +20% · vùng sượt đạn rộng +40% · điểm sượt đạn ×2 · Nộ từ sượt đạn ×1,5
//  W2 Đột Kích Lõi Thép (Boss Vượt Hạn + ải boss chiến dịch ÷5): quái tiến xuống chậm 15% (boss giữ nguyên: chuyển động boss nằm trong engine) · máu boss +20% · Bạo Tẩu lên boss ×1,6 · VK Tối Thượng lên boss ×1,4
//  W3 Mê Cung Phá Vây (Phá Vây + Tháp): đạn địch chậm 12% · trang bị vận hành nhanh hơn (hồi chiêu ×0,7) · qua chặng/tầng hồi thêm 10% máu · Ấn Chú Tím/Cam ×1,5
//  W4 Cơn Lốc Vô Tận (Vô tận): số tinh anh cùng lúc ×2 · thanh rơi buff nạp nhanh +35% (buff vẫn không hết hạn) · điểm Vô tận +25% · KHÔNG rơi đá
//  Không áp dụng cho Boss cuối tuần, Nguyệt Thực, Phó bản. Tắt: window.RULE84=false
const RULE84={
 W:[{id:'EV_W1_NEBULA_RUSH',ic:'🌠',title:'Luồng Gió Tinh Vân',where:'Chiến dịch & Thử thách Hạt giống',
     desc:'Tốc độ bay +20%, vùng sượt đạn rộng hơn 40%, điểm sượt đạn ×2 và Nộ từ sượt đạn ×1,5.',
     m:{speed:1.2,grazeR:1.4,grazeScore:2,grazeCharge:1.5}},
    {id:'EV_W2_TITAN_BREACH',ic:'⚙',title:'Phá Giáp Hạng Nặng',where:'Boss Vượt Hạn & ải boss Chiến dịch (ải chia hết cho 5)',
     desc:'Quái và boss di chuyển chậm 15%, máu boss +20%, sát thương Bạo Tẩu lên boss +60% và Vũ Khí Tối Thượng lên boss +40%.',
     m:{enemyMove:.85,bossHp:1.2,superBoss:1.6,ultBoss:1.4}},
    {id:'EV_W3_ROGUE_MAZE',ic:'🌀',title:'Trường Lực Dị Không',where:'Phá Vây & Tháp',
     desc:'Đạn địch bay chậm 12%, trang bị hồi chiêu nhanh hơn 30%, qua mỗi chặng/tầng hồi thêm 10% máu, Ấn Chú Tím/Cam xuất hiện nhiều hơn 50%.',
     m:{bulletMove:.88,gearCd:.7,stageHeal:.1,rare:1.5}},
    {id:'EV_W4_ENDLESS_STORM',ic:'💠',title:'Bão Tinh Anh Vô Tận',where:'Vô tận',
     desc:'Quái tinh anh xuất hiện gấp đôi, thanh rơi buff nạp nhanh hơn 35% (buff vẫn không hết hạn), điểm Vô tận +25%. Vô tận vẫn không rơi đá.',
     m:{elite:2,buffGain:1.35,endlessScore:1.25}}]};
const Rule84=(()=>{
 const on=()=>window.RULE84!==false&&window.EVENT83!==false;
 let idx=-1,idxAt=-1e9;
 function week(){if(Number.isInteger(window.RULE84_WEEK))return window.RULE84_WEEK;const n=performance.now();if(n-idxAt>3000){idxAt=n;try{idx=Event83.state().idx;}catch{idx=-1;}}return idx;}
 const cur=()=>{const i=week();return i>=0?RULE84.W[i]:null;};
 const g=fn=>{try{return fn();}catch{return null;}};
 // ---------- đang ở chế độ nào ----------
 function where(){let gm='';try{gm=gameMode;}catch{}
  if(g(()=>Event83.inRaid()))return 'raid';
  if(g(()=>typeof Eclipse67!=='undefined'&&Eclipse67.active()))return 'eclipse';
  if(g(()=>typeof Dungeons!=='undefined'&&Dungeons.active()))return 'dungeon';
  if(gm==='endless')return 'endless';
  const bk=g(()=>BK78.run());if(bk)return bk.kind==='seed'?'seed':'bk';
  if(g(()=>O78.run()))return 'o78';
  if(g(()=>Meta40.state().run))return 'tower';
  if(gm==='campaign')return 'campaign';
  return gm||'';}
 function active(){if(!on())return null;const r=cur();if(!r)return null;const w=where();let lv=0;try{lv=level|0;}catch{}
  const ok=r.id==='EV_W1_NEBULA_RUSH'?(w==='campaign'||w==='seed'):r.id==='EV_W2_TITAN_BREACH'?(w==='o78'||(w==='campaign'&&lv%5===0)):r.id==='EV_W3_ROGUE_MAZE'?(w==='bk'||w==='tower'):(w==='endless');
  return ok?r:null;}
 const M=k=>{const r=active();return r&&r.m[k]!=null?r.m[k]:null;};
 // ---------- bọc hàm ----------
 let lastScore=null,stageKey=null;const done={};
 function install(){if(!on())return;
  // W1: tốc độ bay (chạm & bàn phím đi qua Focus393.speed)
  try{if(!done.speed&&Focus393.speed){done.speed=1;const o=Focus393.speed;const f=function(){const v=o.apply(this,arguments);let k=null;try{if(mode==='play')k=M('speed');}catch{}return k?v*k:v;};f.__r84=1;Focus393.speed=f;}}catch{}
  // W1: sượt đạn
  try{if(!done.graze&&Combat26.graze){done.graze=1;const o=Combat26.graze;const f=function(b,d){let rr=null;try{rr=M('grazeR');}catch{}if(rr&&b&&!b.dead&&!b.grazed&&d>24&&d<=24*rr)d=24;const r=o.call(this,b,d);
     if(r&&rr){try{score+=50*(M('grazeScore')-1);}catch{}try{Combat26.addCharge07(5*(M('grazeCharge')-1));}catch{}}return r;};f.__r84=1;Combat26.graze=f;}}catch{}
  // W2: máu boss
  try{if(!done.boss&&Combat26.setupBoss){done.boss=1;const o=Combat26.setupBoss;const f=function(b){try{const k=M('bossHp');if(k&&b&&!b.bossHealthReady&&!b.__r84){b.__r84=1;b.max*=k;b.hp=b.max;}}catch{}return o.apply(this,arguments);};f.__r84=1;Combat26.setupBoss=f;}}catch{}
  // W2: Bạo Tẩu / VK Tối Thượng lên boss
  try{if(!done.dmg&&window.damageBoss){done.dmg=1;const o=window.damageBoss;const f=function(amount,source,part){try{if(active()){const u=M('ultBoss'),s=M('superBoss');if(u&&source==='ult72')amount*=u;else if(s&&superTime>0)amount*=s;}}catch{}return o.call(this,amount,source,part);};f.__r84=1;window.damageBoss=f;try{damageBoss=f;}catch{}}}catch{}
  // W3: trang bị vận hành nhanh hơn (mọi hồi chiêu trang bị chạy theo dt của Equipment25.update)
  try{if(!done.gear&&Equipment25.update){done.gear=1;const o=Equipment25.update;const f=function(dt){let k=null;try{k=M('gearCd');}catch{}return o.call(this,k&&dt>0?dt/k:dt);};f.__r84=1;Equipment25.update=f;}}catch{}
  // W4: số tinh anh
  try{if(!done.elite&&C76.ELITE_COUNT){done.elite=1;const o=C76.ELITE_COUNT;const f=function(st){const v=o.apply(this,arguments);let k=null;try{k=M('elite');}catch{}return k?Math.max(1,Math.round(v*k)):v;};f.__r84=1;C76.ELITE_COUNT=f;}}catch{}
  // W4: thanh rơi buff
  try{if(!done.buff&&Bal787.buffNeed){done.buff=1;const o=Bal787.buffNeed;const f=function(){const v=o.apply(this,arguments);let k=null;try{k=M('buffGain');}catch{}return k?Math.max(1,Math.round(v/k)):v;};f.__r84=1;Bal787.buffNeed=f;}}catch{}
  // vòng cập nhật: di chuyển quái/đạn, điểm Vô tận, hồi máu qua chặng
  // quái/đạn mới sinh ra: giảm vận tốc 1 lần (đánh dấu __m84) — chạy mỗi khung qua window.update
  try{if(!done.upd&&window.update){done.upd=1;const o=window.update;const f=function(dt){const r=o.apply(this,arguments);let a=null;try{if(mode==='play')a=active();}catch{}
     try{const em=a&&a.m.enemyMove,bm=a&&a.m.bulletMove;if(em)for(const e of enemies)if(!e.__m84&&!e.dead){e.__m84=1;if(e.v>0)e.v*=em;}
      if(bm)for(const b of bullets)if(!b.__m84&&!b.dead){b.__m84=1;if(Number.isFinite(b.vx))b.vx*=bm;if(Number.isFinite(b.vy))b.vy*=bm;if(Number.isFinite(b.speed))b.speed*=bm;}}catch{}
     try{post(a);}catch{}return r;};window.update=f;try{update=f;}catch{}}}catch{}
  // báo luật khi vào trận
  try{if(!done.reset&&window.reset){done.reset=1;const o=window.reset;const f=function(){const r=o.apply(this,arguments);lastScore=null;stageKey=null;try{setTimeout(()=>{try{const a=active();if(a&&mode==='play')toast(a.ic+' LUẬT TUẦN · '+a.title.toUpperCase());}catch{}},1800);}catch{}return r;};f.__r84=1;window.reset=f;try{reset=f;}catch{}}}catch{}}
 function post(a){let m='';try{m=mode;}catch{}if(m!=='play'){return;}
  // điểm Vô tận +25%
  if(a&&a.m.endlessScore){try{if(lastScore!=null&&score>lastScore)score+=Math.round((score-lastScore)*(a.m.endlessScore-1));lastScore=score;}catch{}}else lastScore=null;
  // hồi máu khi sang chặng Phá Vây / tầng Tháp
  if(a&&a.m.stageHeal){let k=null;try{const bk=BK78.run();if(bk)k='bk'+bk.k;else{const t=Meta40.state().run;if(t)k='t'+(t.floor|0);}}catch{}
   if(k&&stageKey&&k!==stageKey){try{hp=Math.min(maxHp,hp+maxHp*a.m.stageHeal);toast('🌀 TRƯỜNG LỰC DỊ KHÔNG · +10% MÁU');}catch{}}if(k)stageKey=k;}}
 // Ấn Chú hiếm (đọc trong bk78.draft)
 setInterval(()=>{try{const r=cur();window.__rare84=(on()&&r&&r.m.rare&&g(()=>BK78.run()&&BK78.run().kind!=='seed'))?r.m.rare:0;}catch{}},500);
 install();setTimeout(install,300);setTimeout(install,2000);setTimeout(install,4000);
 function info(){const r=cur();return r&&on()?{id:r.id,title:r.title,desc:r.desc,where:r.where,ic:r.ic}:null;}
 return {on,info,active:()=>{const a=active();return a&&a.id;},where,M};
})();
window.Rule84=Rule84;
