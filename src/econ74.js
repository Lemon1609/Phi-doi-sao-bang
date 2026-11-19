'use strict';
// V74 · KINH TẾ MỚI theo Gemini (GEMINI_TRA_LOI_KINH_TE_V74.md), người dùng chốt 23/10/2026:
//  • KIM CƯƠNG 💎 (tiền mới, kiếm bằng chơi — game offline không nạp).
//  • VÒNG QUAY MAY MẮN: nguồn mảnh Vũ khí tối thượng (+ linh kiện, mảnh skin, hợp kim, 💎). 2 lượt free/ngày, thêm bằng 💎.
//  • PHÓ BẢN GIỚI HẠN: boss 60 giây, 4 cấp, 1 lượt free/ngày (+2 lượt mua bằng 💎) → mảnh VKTT tự chọn + linh kiện + hợp kim.
//  • QUÀ SKIN theo mốc BỘ TRANG BỊ đang mặc (Giáp + Tên lửa + Tàu con).
//  Claude chỉnh: dùng đúng hàm có sẵn của game; ải boss của Phó bản giới hạn chọn theo lực chiến đề nghị gần nhất.
const GEM74={sources:{dailyMission:[0,0,0],weeklyMissions:0,/* V75: 💎 nhiệm vụ chuyển sang Q77 (năng động ngày/tuần) */weeklyNeed:15,checkin:{3:30,7:70},dailyChallenge:15,stageFirstClear:10,bossFirstClear:25,chapter60Stars:80,towerPer5:20},
 sinks:{wheelPaidSpin:40,wheelPaidX10:360,limitedExtra:[30,60]}};
const WHEEL74={unlock:45,free:2,freeSecondNeedStages:3,paid:40,x10:810,tiers:[40,40,40,70,70,70,120,120,120,120],/* BALANCE75 giá leo thang */dailyPaidCap:10,pityMajor:10,pityJackpot:50,
 slots:[{w:280,t:'rnd',n:1,name:'1 mảnh VKTT ngẫu nhiên',ic:'✸',c:'#ff9e5a'},{w:180,t:'rnd',n:2,name:'2 mảnh VKTT ngẫu nhiên',ic:'✸',c:'#ff9e5a'},
  {w:80,t:'sel',n:5,name:'5 mảnh VKTT tự chọn',ic:'✸',c:'#ffb703',major:1},{w:30,t:'sel',n:10,name:'10 mảnh VKTT tự chọn',ic:'✸',c:'#ffb703',major:1},
  {w:10,t:'sel',n:20,name:'★ JACKPOT 20 mảnh VKTT',ic:'★',c:'#ff2a6d',major:1,jack:1},{w:140,t:'part',n:2,name:'2 linh kiện VKTT',ic:'⚙',c:'#7fdcff'},
  {w:50,t:'part',n:5,name:'5 linh kiện VKTT',ic:'⚙',c:'#7fdcff'},{w:60,t:'skin',n:2,name:'2 mảnh skin',ic:'👕',c:'#90e0ef'},
  {w:120,t:'gold',n:3000,name:'3.000 hợp kim',ic:'◈',c:'#ffd166'},{w:50,t:'gem',n:50,name:'50 kim cương',ic:'💎',c:'#7df9ff'}]};
const LIMITED74={unlock:45,free:1,buy:[30,60],time:60,hpMult:1.3,
 tiers:[{n:'DỄ',cp:3200,s:3,c:2,k:'A',th:3,cr:1500},{n:'VỪA',cp:5800,s:5,c:4,k:'B',th:5,cr:2500},{n:'KHÓ',cp:9500,s:8,c:6,k:'C',th:7,cr:4000},{n:'ÁC MỘNG',cp:14000,s:12,c:10,k:'CD',th:10,cr:6000}]/* V307 Gemini lượt 2: cấp 1 LK A · 2 B · 3 C · 4 C+D, thêm Thẻ EXP VKTT */};
const SKINSET74=[{tier:2,lv:45,kind:'sh',n:5,title:'Chiến Binh Lam Ngọc'},{tier:5,lv:60,kind:'own',id:'evo1',title:'Hạm Trưởng Lam Ngọc'},{tier:6,lv:75,kind:'own',id:'evo2',title:'Bạch Ngân Tiên Phong'},
 {tier:9,lv:90,kind:'own',id:'evo3',title:'Hoàng Kim Hộ Vệ'},{tier:11,lv:100,kind:'own',id:'evo4',title:'Huyền Thoại Tinh Cầu'}];
const Econ74=(()=>{
 const KEY='saobang-econ74-v1';let S={};try{S=JSON.parse(localStorage.getItem(KEY)||'{}')||{};}catch{}
 S.g=S.g|0;S.got=S.got||{};S.w=S.w||{d:'',free:0,paid:0,p10:0,p50:0,total:0};S.l=S.l||{d:'',used:0,bought:0,best:0};S.ss=S.ss||{};S.title=S.title||'';
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}try{DeviceSave.flush();}catch{}};
 const day=()=>new Date(Date.now()+7*3600000).toISOString().slice(0,10);
 const week=()=>{const d=new Date(Date.now()+7*3600000);const t=new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate()));const dn=(t.getUTCDay()+6)%7;t.setUTCDate(t.getUTCDate()-dn+3);const f=new Date(Date.UTC(t.getUTCFullYear(),0,4));return t.getUTCFullYear()+'-W'+(1+Math.round(((t-f)/864e5-3+((f.getUTCDay()+6)%7))/7));};
 const fmt=n=>Number(n).toLocaleString('vi-VN');
 const cleared=()=>{try{return Onboard66.cleared();}catch{return 0;}};
 const T=t=>{try{toast(t);}catch{}};
 // ================= KIM CƯƠNG =================
 function add(n,why){n=Math.floor(n);if(!(n>0))return;S.g+=n;save();T('💎 +'+n+(why?' · '+why:''));paintGem();}
 function spend(n){if(S.g<n){T('THIẾU KIM CƯƠNG · cần '+n+' 💎');return false;}S.g-=n;save();paintGem();return true;}
 const once=(k,n,why)=>{if(S.got[k])return;S.got[k]=1;add(n,why);};
 function poll(){const G=GEM74.sources,d=day(),wk=week();
  try{const m=Missions393.getState();if(m.day===d){const paid=Object.values(m.paid).filter(Boolean).length;const k='m:'+d;const had=S.got[k]|0;for(let i=had;i<paid&&i<3;i++)add(G.dailyMission[i],'nhiệm vụ ngày');if(paid>had){S.got[k]=paid;const wkK='mw:'+wk;S.got[wkK]=(S.got[wkK]|0)+(paid-had);save();if(S.got[wkK]>=G.weeklyNeed)once('mwd:'+wk,G.weeklyMissions,'nhiệm vụ tuần');}}}catch{}
  try{const st=JSON.parse(localStorage.getItem('saobang-daily-v63')||'{}');if(st.done===d||(st.done&&st.done===new Date().toISOString().slice(0,10)))once('dc:'+d,G.dailyChallenge,'thử thách ngày');}catch{}
  try{const stars=Campaign36.getState().stars||{};for(let c=1;c<=9;c++){let s=0;for(let i=20*(c-1)+1;i<=20*c;i++)s+=stars[i]|0;if(s>=50)once('ch'+c,G.chapter60Stars,'50★ chương '+c);/* V79 (Gemini): 60★ → 50★ */}}catch{}
  try{const best=Meta40.state().S.tower.best|0;for(let f=5;f<=best;f+=5)once('tw'+f,G.towerPer5,'tháp tầng '+f);}catch{}
  wheelDot();}
 function hooks(){
  try{const rw=Progress.rewardStage;Progress.rewardStage=function(stage){let first=false;try{first=!Progress.v70.cleared().includes(stage);}catch{}const r=rw.apply(this,arguments);try{if(first&&stage>=1&&stage<=180&&!(typeof Eclipse67!=='undefined'&&Eclipse67.active()))once('st'+stage,stage%10===0?GEM74.sources.bossFirstClear:GEM74.sources.stageFirstClear,'qua ải '+stage+' lần đầu');}catch{}return r;};}catch{}
  try{const cd=Meta40.claimDaily;Meta40.claimDaily=function(){const r=cd.apply(this,arguments);try{if(r){const k=(Meta40.state().S.daily.streak|0)%7||7;const g=GEM74.sources.checkin[k];if(g)add(g,'điểm danh ngày '+k);}}catch{}return r;};}catch{}}
 // ---------- hiện 💎 ----------
 function paintGem(){document.querySelectorAll('[data-gem74]').forEach(e=>e.textContent=fmt(S.g));
  const p=document.querySelector('#hgr41 .h1-power');if(p&&!p.querySelector('.gem74')){const b=document.createElement('div');b.className='gem74';b.innerHTML='💎 <b data-gem74>0</b>';p.appendChild(b);}
  document.querySelectorAll('[data-gem74]').forEach(e=>e.textContent=fmt(S.g));}
 // ================= VÒNG QUAY =================
 const W=WHEEL74;
 function wRoll(){if(S.w.d!==day()){S.w.d=day();S.w.free=0;S.w.paid=0;save();}}
 function freeLeft(){wRoll();let n=1;try{if((Missions393.getState().stages|0)>=W.freeSecondNeedStages)n=2;}catch{}return Math.max(0,Math.min(W.free,n)-S.w.free)+(S.wtk|0);}
 const wOpen=()=>cleared()>=W.unlock;
 function pick(){S.w.p10++;S.w.p50++;let sl=null;
  if(S.w.p50>=W.pityJackpot)sl=W.slots.find(x=>x.jack);
  else if(S.w.p10>=W.pityMajor){const M=W.slots.filter(x=>x.major&&!x.jack);sl=M[Math.floor(Math.random()*M.length)];}
  if(!sl){const tot=W.slots.reduce((a,b)=>a+b.w,0);let r=Math.random()*tot;for(const x of W.slots){if(r<x.w){sl=x;break;}r-=x.w;}sl=sl||W.slots[0];}
  if(sl.major)S.w.p10=0;if(sl.jack)S.w.p50=0;S.w.total++;return sl;}
 function give(sl){let txt=sl.name;
  if(sl.t==='rnd'){try{const ids=Ult72.C.ids;const id=ids[Math.floor(Math.random()*ids.length)];Ult72.give({w:{[id]:sl.n}});txt=sl.n+' mảnh '+Ult72.C.nm[id];}catch{}}
  else if(sl.t==='sel'){try{Ult72.give({s:sl.n});}catch{}}
  else if(sl.t==='part'){try{Ult72.give({c:sl.n});}catch{}}
  else if(sl.t==='skin'){const n=sl.n*(new Date().getDay()===0?2:1);try{const st=Skin69.state();const L=SKIN69.list.filter(k=>k.shards&&!st.own[k.id]);const k=L[Math.floor(Math.random()*L.length)];if(k){Skin69.giveShard(k.id,n);txt=n+' mảnh skin '+k.n;}else{Progress.grantCredits(1500);txt='1.500 hợp kim (đủ skin)';}}catch{}}
  else if(sl.t==='gold'){try{Progress.grantCredits(sl.n);Progress.render();}catch{}}
  else if(sl.t==='gem'){S.g+=sl.n;}
  return txt;}
 const pPrice=k=>W.tiers[Math.min(W.tiers.length-1,k)];const x10Price=()=>{let t=0;for(let k=0;k<10;k++)t+=pPrice(S.w.paid+k);return t;};
 function spin(n){if(!wOpen()){T('MỞ Ở ẢI '+W.unlock);return null;}wRoll();const fl=freeLeft();let useFree=0,pay=0;
  if(n===1){if(fl>0)useFree=1;else{if(S.w.paid>=W.dailyPaidCap){T('HẾT LƯỢT QUAY HÔM NAY');return null;}pay=pPrice(S.w.paid);}}
  else{if(S.w.paid+10>W.dailyPaidCap){T('QUAY ×10 CẦN CÒN 10 LƯỢT TRẢ PHÍ TRONG NGÀY');return null;}pay=x10Price();}
  if(pay&&!spend(pay))return null;if(useFree){if((fl-(S.wtk|0))>0)S.w.free++;else S.wtk=Math.max(0,(S.wtk|0)-1);}else S.w.paid+=n;
  const out=[];for(let i=0;i<n;i++){const sl=pick();out.push({sl,txt:give(sl)});}save();paintGem();return out;}
 function wheelDot(){const on=wOpen()&&freeLeft()>0;document.querySelectorAll('[data-n74="wheel"] .n74d').forEach(d=>d.hidden=!on);return on;}
 let wEl=null,rot=0,busy=false;
 function wheel(){if(!wEl){wEl=document.createElement('div');wEl.id='w74';wEl.className='e74p';document.body.appendChild(wEl);
   wEl.addEventListener('click',e=>{const t=e.target.closest('[data-w]');if(!t){if(e.target===wEl&&!busy)wEl.hidden=true;return;}const a=t.dataset.w;if(a==='x'){if(!busy)wEl.hidden=true;return;}if(busy)return;
    if(a==='1'||a==='10'){const n=+a;const r=spin(n);if(!r)return;animate(r);}});}
  drawWheel();wEl.hidden=false;}
 function drawWheel(){wRoll();const N=W.slots.length,fl=freeLeft(),seg=360/N;
  const grad=W.slots.map((s,i)=>`${s.c}${i%2?'cc':'99'} ${i*seg}deg ${(i+1)*seg}deg`).join(',');
  wEl.innerHTML=`<div class="e74c"><div class="e74h"><small>SỰ KIỆN</small><b>VÒNG QUAY MAY MẮN</b><button type="button" class="e74x" data-w="x">✕</button></div>
   <div class="e74gem">💎 <b data-gem74>${fmt(S.g)}</b> · Lượt free còn <b>${fl}</b> · Trả phí ${S.w.paid}/${W.dailyPaidCap}</div>
   <div class="w74wrap"><div class="w74ptr">▼</div><div class="w74wheel" style="background:conic-gradient(${grad});transform:rotate(${rot}deg)">${W.slots.map((s,i)=>`<span style="transform:rotate(${i*seg+seg/2}deg) translateY(-112px) rotate(${-(i*seg+seg/2)-rot}deg)"><i>${s.ic}</i><small>${s.t==='gold'?'3K':s.t==='gem'?'50':s.n}</small></span>`).join('')}<b class="w74hub">QUAY</b></div></div>
   <div class="w74pity">Bảo hiểm: còn <b>${W.pityMajor-S.w.p10}</b> lượt chắc trúng ≥5 mảnh tự chọn · <b>${W.pityJackpot-S.w.p50}</b> lượt chắc trúng JACKPOT</div>
   <div class="w74res" id="w74res"></div>
   <div class="w74btns"><button type="button" class="e74go" data-w="1">${fl>0?'QUAY FREE':S.w.paid>=W.dailyPaidCap?'HẾT LƯỢT':'QUAY · '+pPrice(S.w.paid)+' 💎'}</button><button type="button" class="e74go b" data-w="10"${S.w.paid>0?' disabled':''}>QUAY ×10 · ${x10Price()} 💎</button></div>
   <p class="e74note">Lượt free thứ 2 mở khi qua ${W.freeSecondNeedStages} ải trong ngày. Chủ Nhật: ô mảnh skin ×2. Mảnh VKTT tự chọn gắn vào vũ khí nào cũng được (màn Vũ khí tối thượng).${cleared()<90?' Vũ khí tối thượng mở ở ải 90 — mảnh được giữ lại.':''}</p></div>`;}
 function animate(r){busy=true;const N=W.slots.length,seg=360/N,last=r[r.length-1].sl,i=W.slots.indexOf(last);const target=360*5+(360-(i*seg+seg/2));rot=(rot-rot%360)+target;
  const wh=wEl.querySelector('.w74wheel');wh.style.transition='transform 2.6s cubic-bezier(.17,.67,.2,1)';wh.style.transform=`rotate(${rot}deg)`;try{tone(520,.08,'square',.03);}catch{}
  setTimeout(()=>{busy=false;drawWheel();const box=wEl.querySelector('#w74res');const g={};for(const x of r)g[x.txt]=(g[x.txt]|0)+1;box.innerHTML=Object.entries(g).map(([t,n])=>`<span>${n>1?n+'× ':''}${t}</span>`).join('');box.classList.add('on');try{tone(990,.15,'triangle',.05);}catch{}if(r.some(x=>x.sl.jack))T('★ JACKPOT · 20 MẢNH VKTT TỰ CHỌN');},2700);}
 // ================= PHÓ BẢN GIỚI HẠN =================
 const L=LIMITED74;let run=null,tEl=null;
 function lRoll(){if(S.l.d!==day()){S.l.d=day();S.l.used=0;S.l.bought=0;save();}}
 const lOpen=()=>cleared()>=L.unlock;
 const triesLeft=()=>{lRoll();return L.free+S.l.bought-S.l.used;};
 function stageFor(cp){let best=5,bd=1e18;for(let s=5;s<=160;s+=5){let rq=0;try{rq=Combat.stageRequirement(s);}catch{}const d=Math.abs(rq-cp);if(d<bd){bd=d;best=s;}}return best;}
 let lEl=null;
 function limited(){if(!lEl){lEl=document.createElement('div');lEl.id='l74x';lEl.className='e74p';document.body.appendChild(lEl);
   lEl.addEventListener('click',e=>{const t=e.target.closest('[data-l]');if(!t){if(e.target===lEl)lEl.hidden=true;return;}const a=t.dataset.l;if(a==='x'){lEl.hidden=true;return;}
    if(a==='buy'){lRoll();if(S.l.bought>=L.buy.length){T('ĐÃ MUA TỐI ĐA');return;}if(spend(L.buy[S.l.bought])){S.l.bought++;save();}drawL();return;}
    if(a.startsWith('go')){start(+a.slice(2));}});}
  drawL();lEl.hidden=false;}
 function drawL(){lRoll();let cp=0;try{cp=Combat.stats().cp;}catch{}const left=triesLeft(),can=S.l.bought<L.buy.length;
  lEl.innerHTML=`<div class="e74c"><div class="e74h"><small>VŨ KHÍ TỐI THƯỢNG</small><b>PHÓ BẢN GIỚI HẠN</b><button type="button" class="e74x" data-l="x">✕</button></div>
   <div class="e74gem">Lượt còn <b>${left}</b> · 💎 <b data-gem74>${fmt(S.g)}</b> · Lực chiến <b>${fmt(cp)}</b></div>
   <p class="e74note">Vào thẳng trận boss, hạ boss trong <b>${L.time} giây</b>. Thắng nhận mảnh VKTT tự chọn, linh kiện và hợp kim. Thua hay hết giờ vẫn mất lượt.</p>
   ${L.tiers.map((t,i)=>`<button type="button" class="n74card l74t ${cp>=t.cp*.85?'':'weak'}" data-l="go${i}" style="--lc:${['#3ee08f','#3aa8ff','#b45cff','#ff2a6d'][i]}"><i>${i+1}</i><div><b>CẤP ${i+1} · ${t.n}</b><small>⚡ đề nghị ${fmt(t.cp)} · +${t.s} mảnh tự chọn · +${t.c} linh kiện · +${fmt(t.cr)} ◈</small></div><span>${left>0?'VÀO ›':'HẾT LƯỢT'}</span></button>`).join('')}
   <div class="w74btns">${can?`<button type="button" class="e74go b" data-l="buy">MUA THÊM 1 LƯỢT · ${L.buy[S.l.bought]} 💎</button>`:'<p class="e74note">Đã mua tối đa lượt hôm nay.</p>'}</div></div>`;}
 function start(i){if(!lOpen()){T('MỞ Ở ẢI '+L.unlock);return;}if(triesLeft()<=0){T('HẾT LƯỢT · MUA THÊM BẰNG 💎');return;}const t=L.tiers[i];S.l.used++;save();lEl.hidden=true;
  const st=stageFor(t.cp);run={i,t0:0,st,done:false,boosted:false};try{Nav74.closeAll();}catch{}try{Lobby.hide();ChapterMap.close();Hub40.close();}catch{}
  $('gamemode').value='campaign';try{syncModeSetup();}catch{}$('mission-select').value=String(st);$('start').click();
  if(mode!=='play'){run=null;S.l.used--;save();return;}
  T('⏱ PHÓ BẢN GIỚI HẠN · CẤP '+(i+1)+' · '+L.time+' GIÂY');setTimeout(()=>{if(!run||mode!=='play'||boss)return;enemies=[];try{startBoss();}catch{}},1200);}
 function lTick(){if(!run)return;if(typeof mode==='undefined')return;
  if(mode!=='play'&&mode!=='pause'){if(!run.done){run.done=true;timer(null);}run=null;return;}
  if(mode==='pause')return;if(boss&&!run.boosted&&(boss.max||boss.maxHp)){boss.hp*=L.hpMult;if(boss.max)boss.max*=L.hpMult;if(boss.maxHp)boss.maxHp*=L.hpMult;run.boosted=true;run.t0=performance.now();}
  if(!run.t0)return;const left=Math.max(0,L.time-(performance.now()-run.t0)/1000);timer(left);
  if(boss&&boss.defeatStarted&&!run.done){run.done=true;const t=L.tiers[run.i];try{Ult72.give({s:t.s,c:t.c,k:t.k,th:t.th});}catch{}try{Progress.grantCredits(t.cr);}catch{}S.l.best=Math.max(S.l.best,run.i+1);save();timer(null);const r=run;run=null;
   setTimeout(()=>{try{end(false);}catch{}setTimeout(()=>result(true,r.i),500);},900);return;}
  if(left<=0&&!run.done){run.done=true;timer(null);const r=run;run=null;try{end(false);}catch{}setTimeout(()=>result(false,r.i),500);}}
 function timer(left){if(left==null){if(tEl)tEl.hidden=true;return;}if(!tEl){tEl=document.createElement('div');tEl.id='l74timer';document.body.appendChild(tEl);}tEl.hidden=false;tEl.textContent='⏱ '+Math.ceil(left)+'s';tEl.classList.toggle('hot',left<10);}
 function result(win,i){const t=L.tiers[i];let el=document.getElementById('c74');if(!el){el=document.createElement('div');el.id='c74';document.body.appendChild(el);el.addEventListener('click',e=>{if(e.target.closest('[data-c74x]'))el.hidden=true;});}
  el.innerHTML=`<div class="c74c"><div class="c74h"><small>PHÓ BẢN GIỚI HẠN · CẤP ${i+1}</small><b>${win?'CHIẾN THẮNG':'THẤT BẠI'}</b></div>${win?`<div class="c74grid"><div class="c74t" style="--tc:#ffb703"><span class="c74i">✸</span><b>+${t.s}</b><small>Mảnh VKTT tự chọn</small></div><div class="c74t" style="--tc:#7fdcff"><span class="c74i">⚙</span><b>+${t.c}</b><small>Linh kiện VKTT</small></div><div class="c74t" style="--tc:#ffd166"><span class="c74i">◈</span><b>+${fmt(t.cr)}</b><small>Hợp kim</small></div></div>`:`<p class="c74note">Chưa hạ được boss trong ${L.time} giây. Nâng lực chiến hoặc chọn cấp thấp hơn.</p>`}<button type="button" class="c74ok" data-c74x>${win?'NHẬN':'ĐÓNG'}</button></div>`;el.hidden=false;}
 // ================= QUÀ SKIN THEO BỘ TRANG BỊ =================
 function skinSet(){try{const eq=Progress.v70.equipped();const its=['armor','missiles','sidearm'].map(k=>Progress.v70.get(eq[k])).filter(Boolean);if(its.length<3)return;
  const n=Math.min(...its.map(it=>V70.nOf(it)|0)),lv=Math.min(...its.map(it=>it.level|0));
  SKINSET74.forEach((m,k)=>{if(S.ss[k]||n<m.tier||lv<m.lv)return;S.ss[k]=1;S.title=m.title;save();
   if(m.kind==='own'){try{Skin69.giveOwn(m.id);}catch{}}else{try{const st=Skin69.state();const L2=SKIN69.list.filter(x=>x.shards&&!st.own[x.id]);if(L2[0])Skin69.giveShard(L2[0].id,m.n);}catch{}}
   T('🏅 BỘ TRANG BỊ ĐẠT MỐC · '+(m.kind==='own'?'NHẬN SKIN':'NHẬN '+m.n+' MẢNH SKIN')+' · DANH HIỆU "'+m.title.toUpperCase()+'"');});}catch{}}
 // ================= vòng lặp =================
 setTimeout(()=>{hooks();poll();paintGem();},60);
 setInterval(()=>{try{poll();paintGem();skinSet();}catch{}},2500);
 setInterval(()=>{try{lTick();}catch{}},200);
 return {addTry:()=>{lRoll();S.l.used--;save();},addSpin:n=>{S.wtk=(S.wtk|0)+n;save();wheelDot();},gems:()=>S.g,add,spend,wheel,limited,spin,freeLeft,wheelDot,wOpen,lOpen,triesLeft,state:()=>JSON.parse(JSON.stringify(S)),_run:()=>run};
})();
