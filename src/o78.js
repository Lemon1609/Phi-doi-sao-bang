'use strict';
// V78 · BOSS VƯỢT HẠN (Gemini OVERLIMIT_BOSS_V78, 23/10). Nội dung cuối game, mở sau ải 90.
//  Chỉnh cho đúng thang số của game:
//  • Máu boss game chỉ cỡ vài nghìn (Bosses28), không phải 2,5–45 triệu → bậc t = boss ải gốc × 2,5 × 1,38^(t−1) (bậc 10 ≈ 18 lần bậc 1, đúng tỉ lệ Gemini 2,5 tr → 45 tr).
//  • Lực chiến đề nghị 45k–120k vượt trần game (~43k) → 15.000 × 1,12^(t−1) (bậc 10 ≈ 41.600).
//  • Game tự bắn liên tục nên Áp Lực Nhiệt = bắn liền 4,5 s thì kẹt 1,2 s.
//  • Thêm giới hạn 150 giây mỗi trận để không kéo dài vô hạn.
//  • Cửa hàng: "mảnh chiến cơ" đã bỏ khỏi game → đổi sang 2 phôi Lam chiến cơ; "Phôi Đột Phá SSS +10" → 1 phôi Tím chiến cơ đang dùng; "Lõi SSS" → 3 Lõi Siêu Hợp.
const OVERLIMIT_BOSS_V78={UNLOCK_STAGE:90,FREE_DAILY:3,BUY:[100,150],MAX_TIER:10,HP_BASE_MULT:2.5,HP_GROWTH:1.38,STAGGER_RATIO:.20,STAGGER_SEC:4,STAGGER_BONUS:.5,TIME:150,
 REQ:t=>Math.round(15000*Math.pow(1.12,t-1)/100)*100,STAGE:t=>Math.min(160,70+t*10),AFFIX_N:t=>t>=8?3:t>=4?2:1,
 // BALANCE75: thưởng lần đầu (trọn đời) + thưởng tuần lặp lại
 REWARD_FIRST:t=>t<=3?{gem:150,alloy:30000,badge:300}:t<=7?{gem:250,alloy:60000,badge:600,phLam:1}:{gem:400,alloy:100000,badge:1000,core:3},
 REWARD_WEEK:t=>t<=3?{gem:10,alloy:10000,badge:70}:t<=7?{gem:12,alloy:20000,badge:100}:{gem:23,alloy:40000,badge:230},
 REWARD:t=>OVERLIMIT_BOSS_V78.REWARD_WEEK(t),
 AFFIX:{MIRROR:{n:'Đạn Gương',ic:'🪞',d:'15% đạn địch chạm mép trái/phải bật ngược lại (chậm 20%)'},ECLIPSE:{n:'Vùng Tối',ic:'🌑',d:'Sương đen phủ màn, chỉ sáng 180 px quanh tàu và 120 px quanh boss'},
  OVERHEAT:{n:'Áp Lực Nhiệt',ic:'🔥',d:'Bắn liền 4,5 s thì súng chính kẹt 1,2 s'},EMP:{n:'Nghịch Đảo Từ Trường',ic:'🧲',d:'Mỗi 12 s boss phát xung: đảo chiều điều khiển 2,5 s (báo trước 1 s)'},GRAVITY:{n:'Trọng Lực Gia Tốc',ic:'⬇',d:'Đạn địch rơi nhanh dần (+25 px/s²)'}},
 SHOP:[{id:'sssup',n:'1 phôi Tím chiến cơ đang dùng',cost:1200,lim:1,per:'m'},{id:'core',n:'3 Lõi Siêu Hợp',cost:800,lim:2,per:'m'},{id:'ship',n:'2 phôi Lam chiến cơ đang dùng',cost:500,lim:4,per:'w'},{id:'title',n:'Danh hiệu "Kẻ Chinh Phục Vực Thẳm"',cost:2000,lim:1,per:'x',need:10}]};
const O78=(()=>{
 const C=OVERLIMIT_BOSS_V78,KEY='PLAYER_OVERLIMIT_V78',TAU=Math.PI*2;
 const dayK=()=>new Date(Date.now()+7*3600000).toISOString().slice(0,10);
 const weekK=()=>{const d=new Date(Date.now()+7*3600000);const dn=(d.getUTCDay()+6)%7;return new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate()-dn)).toISOString().slice(0,10);};
 const monK=()=>dayK().slice(0,7);
 let S={w:'',aff:[],max:0,claimed:[],d:'',used:0,bought:0,badge:0,shop:{},title:false,best:0};try{Object.assign(S,JSON.parse(localStorage.getItem(KEY)||'{}'));}catch{}
 if(!Array.isArray(S.life)){S.life=[];for(let t=1;t<=(S.best|0);t++)S.life.push(t);} // đã nhận thưởng lớn ở bản cũ
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const fmt=n=>Math.round(n).toLocaleString('vi-VN');const T=t=>{try{toast(t);}catch{}};
 function roll(){const w=weekK(),d=dayK();if(w>S.w){S.w=w;S.max=0;S.claimed=[];const P=Object.keys(C.AFFIX).sort(()=>Math.random()-.5);S.aff=P.slice(0,3);}if(d!==S.d){S.d=d;S.used=0;S.bought=0;}save();}
 const unlocked=()=>{try{return Progress.getState().cleared.includes(C.UNLOCK_STAGE);}catch{return false;}};
 const left=()=>{roll();return C.FREE_DAILY+S.bought-S.used;};
 const affOf=t=>S.aff.slice(0,C.AFFIX_N(t));
 // ---------- trận ----------
 let run=null,hudT=0;
 function start(t){roll();if(!unlocked()){T('MỞ SAU KHI VƯỢT ẢI '+C.UNLOCK_STAGE);return;}if(t>S.max+1){T('VƯỢT BẬC '+(t-1)+' TRƯỚC');return;}if(left()<=0){T('HẾT LƯỢT HÔM NAY · MUA THÊM BẰNG 💎');return;}
  S.used++;save();if(el)el.hidden=true;run={t,aff:affOf(t),boosted:false,t0:0,st:0,stMax:0,stun:0,done:false,heat:0,jam:0,emp:12,empOn:0,empWarn:0,prev:null};
  try{Nav74.closeAll();}catch{}try{Lobby.hide();ChapterMap.close();Hub40.close();}catch{}
  document.getElementById('gamemode').value='campaign';try{syncModeSetup();}catch{}document.getElementById('mission-select').value=String(C.STAGE(t));try{Lobby.hide();}catch{}try{reset();}catch(e){console.warn('O78 start',e);}
  if(mode!=='play'){run=null;S.used--;save();return;}
  T('☠ BOSS VƯỢT HẠN · BẬC '+t+' · '+run.aff.map(a=>C.AFFIX[a].ic+' '+C.AFFIX[a].n).join(' + '));
  setTimeout(()=>{if(!run||mode!=='play'||boss)return;enemies=[];try{startBoss();}catch{}},1200);}
 const has=a=>run&&run.aff.includes(a);
 function tick(dt){if(!run)return;if(mode!=='play'&&mode!=='pause'){if(!run.done){run.done=true;finish(false);}return;}if(mode==='pause')return;
  const b=boss;if(b&&!run.boosted&&b.max){const m=C.HP_BASE_MULT*Math.pow(C.HP_GROWTH,run.t-1);b.hp*=m;b.max*=m;if(b.maxHp)b.maxHp*=m;run.stMax=b.max*C.STAGGER_RATIO;run.st=run.stMax;run.boosted=true;run.t0=performance.now();b.o78=1;}
  if(!run.t0)return;const K=(typeof W!=='undefined'?W:480)/412;
  if(run.stun>0){run.stun-=dt;if(b){b.fire=Math.max(b.fire,.5);b.laser=Math.max(b.laser,.5);b.skill=Math.max(b.skill,.5);}if(run.stun<=0){run.st=run.stMax;T('BOSS HỒI GIÁP HỘ THỂ');}}
  // từ tố
  if(has('MIRROR'))for(const x of bullets){if(x.dead||x.mir78)continue;if((x.x<=10*K&&x.vx<0)||(x.x>=W-10*K&&x.vx>0)){x.mir78=1;if(Math.random()<.15){x.vx=-x.vx*.8;x.vy*=.8;}}}
  if(has('GRAVITY'))for(const x of bullets)if(!x.dead)x.vy+=25*K*dt;
  if(has('OVERHEAT')){if(run.jam>0)run.jam-=dt;else{run.heat+=dt;if(run.heat>=4.5){run.heat=0;run.jam=1.2;T('🔥 QUÁ NHIỆT · SÚNG KẸT 1,2 s');}}}
  if(has('EMP')&&b){run.emp-=dt;if(run.emp<=1&&!run.empWarn){run.empWarn=1;}if(run.emp<=0){run.emp=12;run.empWarn=0;run.empOn=2.5;try{ring(b.x,b.y,'#7df9ff',200);T('🧲 NGHỊCH ĐẢO TỪ TRƯỜNG · 2,5 s');}catch{}}
   if(run.empOn>0){run.empOn-=dt;if(run.prev){const dx=player.x-run.prev.x,dy=player.y-run.prev.y;player.x=Math.max(10,Math.min(W-10,run.prev.x-dx));player.y=Math.max(10,Math.min(H-10,run.prev.y-dy));}}}
  run.prev={x:player.x,y:player.y};
  const sec=Math.max(0,C.TIME-(performance.now()-run.t0)/1000);run.left=sec;
  if(b&&b.defeatStarted&&!run.done){run.done=true;const r=run;setTimeout(()=>{try{end(false);}catch{}setTimeout(()=>finish(true,r),500);},900);return;}
  if(sec<=0&&!run.done){run.done=true;const r=run;try{end(false);}catch{}setTimeout(()=>finish(false,r),500);}}
 function finish(win,r){r=r||run;run=null;if(!r)return;let rw=null;
  if(win){S.best=Math.max(S.best,r.t);if(r.t>S.max)S.max=r.t;if(!S.claimed.includes(r.t)){S.claimed.push(r.t);const fst=!S.life.includes(r.t);if(fst)S.life.push(r.t);rw=fst?C.REWARD_FIRST(r.t):C.REWARD_WEEK(r.t);rw.first=fst;try{Econ74.add(rw.gem,'Vượt Hạn bậc '+r.t);Progress.grantCredits(rw.alloy);if(rw.phLam){let c=0;try{c=launchCraft|0;}catch{}V70.phAdd('craft',c,2,rw.phLam);}if(rw.core)Meta407.addCores(rw.core,'VƯỢT HẠN');}catch{}S.badge+=rw.badge;}save();}
  result(win,r.t,rw);}
 // chặn bắn khi quá nhiệt
 function jammed(){return run&&has('OVERHEAT')&&run.jam>0;}
 // phá giáp hộ thể
 function hit(amount){if(!run||!run.stMax||!(amount>0))return amount;if(run.stun>0)return amount*(1+C.STAGGER_BONUS);run.st-=amount;if(run.st<=0){run.st=0;run.stun=C.STAGGER_SEC;for(const x of bullets)x.dead=true;try{beams.length=0;}catch{}try{ring(boss.x,boss.y,'#00f5d4',150);FX16Run.addShake({amp:7,ms:400});}catch{}T('💥 PHÁ GIÁP · BOSS CHOÁNG 4 s · +50% SÁT THƯƠNG');}return amount;}
 // ---------- vẽ ----------
 let fog=null;
 function draw(){if(!run||!run.t0||!(mode==='play'||mode==='pause'))return;const b=boss,K=(typeof W!=='undefined'?W:480)/412;
  if(has('ECLIPSE')){if(!fog)fog=document.createElement('canvas');if(fog.width!==ctx.canvas.width||fog.height!==ctx.canvas.height){fog.width=ctx.canvas.width;fog.height=ctx.canvas.height;}const g=fog.getContext('2d');const sx=fog.width/W,sy=fog.height/H;
   g.setTransform(1,0,0,1,0,0);g.globalCompositeOperation='source-over';g.clearRect(0,0,fog.width,fog.height);g.fillStyle='rgba(5,5,12,.94)';g.fillRect(0,0,fog.width,fog.height);g.setTransform(sx,0,0,sy,0,0);g.globalCompositeOperation='destination-out';
   const hole=(x,y,r0,r)=>{const gr=g.createRadialGradient(x,y,r0,x,y,r);gr.addColorStop(0,'rgba(0,0,0,1)');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.beginPath();g.arc(x,y,r,0,TAU);g.fill();};
   hole(player.x,player.y,40*K,180*K);if(b)hole(b.x,b.y,30*K,120*K);ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;ctx.filter='none';ctx.drawImage(fog,0,0);ctx.restore();}
  ctx.save();ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;const bw=W-24*K,y0=86*K;
  if(b&&b.max){ctx.fillStyle='#0a0408d0';ctx.fillRect(12*K,y0,bw,14*K);ctx.fillStyle=run.stun>0?'#ffb3a0':'#ff2a3a';ctx.fillRect(12*K,y0,bw*Math.max(0,b.hp/b.max),8*K);ctx.fillStyle=run.stun>0?'#ffe28a':'#00f5d4';ctx.fillRect(12*K,y0+9*K,bw*(run.stun>0?run.stun/C.STAGGER_SEC:run.st/run.stMax),4*K);}
  ctx.font=`900 ${Math.round(11*K)}px 'Neo',sans-serif`;ctx.textAlign='center';ctx.lineWidth=3;ctx.strokeStyle='#05070c';ctx.fillStyle='#ffd166';const ttl='☠ VƯỢT HẠN BẬC '+run.t+' · '+Math.ceil(run.left||0)+'s'+(run.stun>0?' · CHOÁNG':'')+(jammed()?' · QUÁ NHIỆT':'')+(run.empOn>0?' · ĐẢO CHIỀU':'');ctx.strokeText(ttl,W/2,y0+28*K);ctx.fillText(ttl,W/2,y0+28*K);
  if(has('EMP')&&b&&run.emp<1&&run.empOn<=0){ctx.strokeStyle='#7df9ff';ctx.globalAlpha=.8;ctx.lineWidth=3;ctx.beginPath();ctx.arc(b.x,b.y,40+run.emp*160,0,TAU);ctx.stroke();}
  ctx.restore();}
 // ---------- cài đặt ----------
 function install(){
  try{const af=Arsenal30.fire;Arsenal30.fire=function(){if(jammed())return;return af.apply(this,arguments);};}catch{}
  try{const odb=damageBoss;damageBoss=function(amount,src,part){try{if(run&&boss&&boss.o78)amount=hit(amount);}catch{}return odb.call(this,amount,src,part);};}catch{}
  try{const ou=window.update;window.update=function(dt){const r=ou.apply(this,arguments);try{tick(dt);}catch(e){console.warn('O78',e);}return r;};}catch{}
  try{const vd=VisualFX.draw;VisualFX.draw=function(){const r=vd.apply(this,arguments);try{draw();}catch(e){if(!window.__o78e){window.__o78e=String(e);console.warn('O78 draw',e);}}return r;};}catch{}}
 setTimeout(()=>{try{install();}catch(e){console.warn('O78 install',e);}},0);
 // ---------- giao diện ----------
 let el=null,tab='tier';
 function buy(){roll();if(S.bought>=C.BUY.length){T('ĐÃ MUA TỐI ĐA');return;}if(!Econ74.spend(C.BUY[S.bought]))return;S.bought++;save();render();}
 function shopBuy(id){const it=C.SHOP.find(x=>x.id===id);if(!it)return;const pk=it.per==='m'?monK():it.per==='w'?weekK():'x';const k=id+'@'+pk;const n=S.shop[k]|0;if(n>=it.lim){T('ĐÃ ĐỔI ĐỦ');return;}if(it.need&&S.best<it.need){T('CẦN VƯỢT BẬC '+it.need);return;}if(S.badge<it.cost){T('THIẾU HUY HIỆU');return;}
  S.badge-=it.cost;S.shop[k]=n+1;let c=0;try{c=launchCraft|0;}catch{}try{if(id==='sssup')V70.phAdd('craft',c,3,1);else if(id==='core')Meta407.addCores(3,'VƯỢT HẠN');else if(id==='ship')V70.phAdd('craft',c,2,2);else if(id==='title')S.title=true;}catch{}save();T('ĐÃ ĐỔI · '+it.n);render();}
 function open(){roll();if(!el){el=document.createElement('div');el.className='m63 o78p';document.body.appendChild(el);el.addEventListener('click',e=>{const b=e.target.closest('[data-o78]');if(!b){if(e.target===el)el.hidden=true;return;}const a=b.dataset.o78;
   if(a==='x')el.hidden=true;else if(a==='tab'){tab=b.dataset.t;render();}else if(a==='go')start(+b.dataset.v);else if(a==='buy')buy();else if(a==='shop')shopBuy(b.dataset.v);});}render();el.hidden=false;}
 function render(){if(!el)return;let cp=0;try{cp=Math.round(Combat.stats().cp);}catch{}let body='';
  if(tab==='tier'){body=`<div class="o78-aff">${S.aff.map((a,i)=>`<span><b>${C.AFFIX[a].ic} ${C.AFFIX[a].n}</b><small>${C.AFFIX[a].d} · từ bậc ${[1,4,8][i]}</small></span>`).join('')}</div>
   <p class="o78-s">Lượt còn <b>${left()}</b> · Huy hiệu <b>${fmt(S.badge)}</b> · Lực chiến <b>${fmt(cp)}</b> · Đặt lại 0 giờ thứ Hai</p>
   <div class="o78-list">${Array.from({length:C.MAX_TIER},(_,i)=>{const t=i+1,ok=t<=S.max+1,done=S.claimed.includes(t),fst=!S.life.includes(t),rw=fst?C.REWARD_FIRST(t):C.REWARD_WEEK(t),rq=C.REQ(t);return `<button type="button" class="o78-t ${done?'done':''} ${ok?'':'lk'} ${cp>=rq*.9?'':'weak'}" data-o78="go" data-v="${t}" ${ok?'':'disabled'}><em>${t}</em><div><b>BẬC ${t} · ${affOf(t).map(a=>C.AFFIX[a].ic).join(' ')}</b><small>⚡ đề nghị ${fmt(rq)} · ${done?'✓ đã nhận thưởng tuần':`${fst?'LẦN ĐẦU: ':'Tuần: '}${rw.gem} 💎 + ${fmt(rw.alloy)} ◈ + ${rw.badge} huy hiệu${rw.phLam?' + phôi Lam':''}${rw.core?' + 3 lõi':''}`}</small></div><span>${ok?(done?'ĐÁNH LẠI':'VÀO ›'):'🔒'}</span></button>`;}).join('')}</div>
   ${S.bought<C.BUY.length?`<button class="m63-go o78-buy" data-o78="buy">MUA THÊM 1 LƯỢT · ${C.BUY[S.bought]} 💎</button>`:''}
   <p class="o78-s">Thanh xanh ngọc dưới máu boss là <b>Giáp Hộ Thể</b> (20% máu). Phá hết: boss choáng 4 s, xóa đạn, nhận +50% sát thương. Mỗi trận tối đa ${C.TIME} giây.</p>`;}
  else body=`<p class="o78-s">Huy hiệu Vượt Hạn: <b>${fmt(S.badge)}</b></p>`+C.SHOP.map(it=>{const pk=it.per==='m'?monK():it.per==='w'?weekK():'x';const n=S.shop[it.id+'@'+pk]|0;return `<div class="o78-sh"><div><b>${it.n}</b><small>${it.per==='m'?'tháng':it.per==='w'?'tuần':'1 lần'} · ${n}/${it.lim}${it.need?' · cần vượt bậc '+it.need:''}</small></div><button data-o78="shop" data-v="${it.id}" ${n>=it.lim||S.badge<it.cost||(it.need&&S.best<it.need)?'disabled':''}>${fmt(it.cost)} 🎖</button></div>`;}).join('')+(S.title?'<p class="o78-s">🏆 Danh hiệu: <b>Kẻ Chinh Phục Vực Thẳm</b></p>':'');
  el.innerHTML=`<div class="m63-card o78-card"><div class="o78-top"><b>☠ BOSS VƯỢT HẠN</b><button data-o78="x" class="o78-x">✕</button></div>
   <div class="o78-tabs"><button data-o78="tab" data-t="tier" aria-pressed="${tab==='tier'}">10 BẬC</button><button data-o78="tab" data-t="shop" aria-pressed="${tab==='shop'}">CỬA HÀNG</button></div>${body}</div>`;}
 function result(win,t,rw){let e=document.getElementById('c74');if(!e){e=document.createElement('div');e.id='c74';document.body.appendChild(e);e.addEventListener('click',ev=>{if(ev.target.closest('[data-c74x]'))e.hidden=true;});}
  e.innerHTML=`<div class="c74c"><div class="c74h"><small>BOSS VƯỢT HẠN · BẬC ${t}${rw&&rw.first?' · THƯỞNG LẦN ĐẦU':''}</small><b>${win?'CHIẾN THẮNG':'THẤT BẠI'}</b></div>${win&&rw?`<div class="c74grid"><div class="c74t" style="--tc:#7df9ff"><span class="c74i">💎</span><b>+${rw.gem}</b><small>Kim cương</small></div><div class="c74t" style="--tc:#ffd166"><span class="c74i">◈</span><b>+${fmt(rw.alloy)}</b><small>Hợp kim</small></div><div class="c74t" style="--tc:#ff2a6d"><span class="c74i">🎖</span><b>+${rw.badge}</b><small>Huy hiệu</small></div></div>`:win?'<p class="c74note">Đã nhận thưởng bậc này trong tuần.</p>':`<p class="c74note">Chưa hạ được boss trong ${C.TIME} giây. Phá giáp hộ thể để boss choáng và nhận thêm sát thương.</p>`}<button type="button" class="c74ok" data-c74x>${win?'NHẬN':'ĐÓNG'}</button></div>`;e.hidden=false;}
 roll();
 return {open,start,unlocked,left,state:()=>JSON.parse(JSON.stringify(S)),run:()=>run,_set:o=>{Object.assign(S,o);save();}};
})();
