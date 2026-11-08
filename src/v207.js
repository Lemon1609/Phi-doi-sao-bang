'use strict';
// V207 · Gemini chốt 08/11 (V207_DAILY_AND_BOSSRUSH_CONFIG) + bố cục GPT. Tắt: window.V207=false · riêng: DAILY207=false / RUSH207=false
//  • THỬ THÁCH NGÀY (mở ải 30): mỗi ngày (giờ VN) 1 ải boss đã vượt + 1 trong 5 biến thể (xoay theo ngày). 0 năng lượng.
//    Thưởng lần thắng đầu mỗi ngày: 40 Tinh thể chip + 1 Lõi chip + 8.000 ◈ (+2 Tinh Hạch nếu đã qua ải 160). Không 💎.
//    Biến thể giữ đủ 6 viên buff và màu đạn địch đã khóa ("Khắc Nghiệt" chỉ giảm 50% số viên Máu/Khiên rơi ra).
//  • BOSS RUSH (mở ải 80): 4 boss liên tiếp (boss cao nhất đã vượt −60/−40/−20/0, sàn ải 20), giữ máu; hạ mỗi boss: hồi 20% máu,
//    rơi 1 viên Nâng đạn, xóa đạn, nghỉ 2,5 s. 0 năng lượng, đánh kỷ lục không giới hạn; thưởng tối đa 3 lượt thắng/tuần:
//    1 Bộ mã hóa + 1 Lõi chip + 2 Tinh Hạch + 10.000 ◈. Phản chấn vỡ cánh V206 giữ nguyên.
//  Không thưởng ải thường, không tính nhiệm vụ trong 2 chế độ này. Khóa mới: saobang-v207.
const V207_CFG={
 key:'saobang-v207',
 daily:{unlock:30,reward:{cry:40,core:1,credits:8000,sssIf160:2},
  mods:[
   {id:'supersonic',name:'Siêu Thanh',desc:'Đạn địch và boss nhanh hơn 25%; nạp kỹ năng & VKTT nhanh hơn 30%.',bullet:1.25,tempo:1.25,charge:1.30},
   {id:'harsh_supply',name:'Khắc Nghiệt',desc:'Viên Máu và Khiên rơi ít hơn 50% (vẫn đủ 6 loại viên); đạn chính chiến cơ +20%.',dropCut:{heal:.5,shield:.5},main:1.20},
   {id:'one_hp_glass',name:'Sinh Tử',desc:'Máu khóa ở 1, Giáp bằng 0; toàn bộ sát thương ×2, máu boss ×0,65.',hp1:true,all:2.0,bossHp:.65},
   {id:'overdrive',name:'Quá Tải',desc:'Vào trận đạn cấp 4, cứ 12 giây tự bật Siêu cấp 4 giây; boss hoạt động nhanh hơn 20%.',power:4,superEvery:12,superDur:4,tempo:1.20},
   {id:'armored_foes',name:'Thiết Giáp',desc:'Địch giảm 35% sát thương từ đạn chính, nhưng nhận ×2,5 từ Trang bị, SSS & Kỹ năng.',main:.65,other:2.5}]},
 rush:{unlock:80,count:4,offsets:[-60,-40,-20,0],floor:20,heal:.20,pause:2.5,perWeek:3,reward:{coder:1,core:1,sss:2,credits:10000}}
};
const V207=(()=>{
 const C=V207_CFG,on=()=>window.V207!==false,onD=()=>on()&&window.DAILY207!==false,onR=()=>on()&&window.RUSH207!==false;
 let S={dDone:'',rWk:-1,rN:0,best:{},dBest:{}};try{Object.assign(S,JSON.parse(localStorage.getItem(C.key)||'{}'));}catch{}
 const save=()=>{try{localStorage.setItem(C.key,JSON.stringify(S));}catch{}};
 const host=()=>document.fullscreenElement||document.webkitFullscreenElement||document.body;
 const T=m=>{try{toast(m);}catch{}};
 const VN=()=>Date.now()+7*3600000,day=()=>new Date(VN()).toISOString().slice(0,10),dayIdx=()=>Math.floor(VN()/86400000);
 const wkNo=()=>Math.floor((VN()-Date.UTC(1970,0,5))/604800000);
 const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]);
 const cleared=()=>{try{const c=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}').cleared||[];return c.length?Math.max(...c):0;}catch{return 0;}};
 const isBoss=s=>{try{return !!Campaign36.bossKind(s);}catch{return false;}};
 const bossList=()=>{const L=[];for(let s=1;s<=Math.min(200,cleared());s++)if(isBoss(s))L.push(s);return L;};
 const sec=x=>x==null?'—':x.toFixed(1).replace('.',',')+' giây';
 // ---- dữ liệu hôm nay / Boss Rush ----
 function today(){const L=bossList();if(!L.length)return null;const di=dayIdx();return {date:day(),stage:L[di%L.length],mod:C.daily.mods[((di%5)+5)%5]};}
 function rushStages(){const L=bossList();if(!L.length)return [];const top=L[L.length-1];return C.rush.offsets.map(o=>{let s=Math.max(C.rush.floor,top+o);while(s>1&&!isBoss(s))s--;return Math.max(s,L[0]);});}
 const rushLeft=()=>{if(S.rWk!==wkNo()){S.rWk=wkNo();S.rN=0;save();}return Math.max(0,C.rush.perWeek-S.rN);};
 // ---- trận đặc biệt ----
 let X=null,iv=null;
 const M=()=>X&&X.mod||{};
 function grant(r){const out=[];try{if(r.credits){Progress.grantCredits(r.credits);out.push(r.credits.toLocaleString('vi-VN')+' ◈');}}catch{}
  try{if(r.cry||r.core||r.coder){const m=Chip72.state().mat;Chip72._set({mat:{cry:(m.cry|0)+(r.cry|0),core:(m.core|0)+(r.core|0),coder:(m.coder|0)+(r.coder|0)}});if(r.cry)out.push(r.cry+' Tinh thể chip');if(r.coder)out.push(r.coder+' Bộ mã hóa');if(r.core)out.push(r.core+' Lõi chip');}}catch{}
  try{if(r.sss){V70.add('sss_core',r.sss);out.push(r.sss+' Tinh Hạch');}}catch{}try{Progress.render&&Progress.render();}catch{}return out;}
 function enterStage(stage){const sel=document.getElementById('mission-select');if(![...sel.options].some(o=>o.value==String(stage))){const o=document.createElement('option');o.value=String(stage);o.textContent='Đặc biệt';sel.appendChild(o);}document.getElementById('gamemode').value='campaign';sel.value=String(stage);}
 function start(kind,mi){if(X||!on())return;let en0=0,cr0=0;try{en0=V75.energy();}catch{}try{cr0=Progress.balance();}catch{}
  let stages,mod=null;if(kind==='daily'){const t=today();if(!t)return;stages=[t.stage];mod=mi!=null?C.daily.mods[mi]:t.mod;}else{stages=rushStages();if(stages.length<C.rush.count)return;}
  try{document.querySelectorAll('#hub40,.c72,#g44').forEach(e=>e.hidden=true);mode='menu';Lobby.show();enterStage(stages[0]);Lobby.hide();reset();if(mode==='pause')mode='play';}catch(e){T('CHƯA VÀO ĐƯỢC CHẾ ĐỘ NÀY');return;}
  X={kind,stages,idx:0,mod,en0,cr0,times:[],bS:null,el:0,done:false,pauseT:0,supT:0};window.__sr207=kind;
  if(mod&&mod.hp1){try{hp=1;shield=0;}catch{}}if(mod&&mod.power){try{power=Math.max(power,mod.power);}catch{}}
  setTimeout(()=>{try{enemies=[];startBoss();}catch{}},700);
  iv=setInterval(tick,100);T(kind==='daily'?'THỬ THÁCH NGÀY · '+mod.name.toUpperCase():'BOSS RUSH · 1/'+C.rush.count);}
 function tick(){if(!X||X.done)return;try{
   const ov=document.getElementById('overlay');let rev=false;try{rev=Revive393.active();}catch{}
   if(mode==='over'||rev||(ov&&!ov.hidden&&ov.dataset.state==='over')){end(false);return;}
   if(mode!=='play')return;for(const e of enemies)if(!e.boss&&!e.bossPart)e.dead=true;
   const m=M();if(m.hp1){if(hp>1)hp=1;shield=0;}
   if(boss&&boss.bossHealthReady&&!boss.__s207){boss.__s207=1;X.bS=X.el;if(m.bossHp){const k=m.bossHp;boss.max*=k;boss.hp*=k;if(boss.coreMax){boss.coreMax*=k;boss.coreHp*=k;}for(const p of (boss.parts||[]))if(p.max){p.max*=k;p.hp*=k;}}}
  }catch{}}
 // đồng hồ + biến thể theo khung hình
 try{const o=runGameFrameC;runGameFrameC=function(){const r=o.apply(this,arguments);try{if(X&&!X.done&&mode==='play'){const dt=Math.max(0,Math.min(.1,+frameDtC||0));X.el+=dt;const m=M();
   if(m.superEvery){X.supT+=dt;if(X.supT>=m.superEvery){X.supT=0;superTime=Math.max(superTime,m.superDur);}}
   if(m.dropCut){for(const d of drops){if(d.__c207)continue;d.__c207=1;const c=m.dropCut[d.type];if(c&&Math.random()>=c)d.dead=true,d.t=999;}try{drops=drops.filter(d=>!d.dead);}catch{}}}}catch{}return r;};}catch{}
 try{const o=Combat26.bulletFactor;Combat26.bulletFactor=function(){const r=o.apply(this,arguments);return X&&M().bullet?r*M().bullet:r;};}catch{}
 try{const o=Combat26.addCharge07;Combat26.addCharge07=function(n){return o.call(this,X&&M().charge?n*M().charge:n);};}catch{}
 try{const o=updateBoss;updateBoss=function(dt){return o.call(this,X&&M().tempo?dt*M().tempo:dt);};}catch{}
 try{const od=window.damageBoss||damageBoss;const nb=function(a,s,part){const m=X&&M();if(m&&(m.main||m.other||m.all)&&+a>0){const main=s&&typeof s==='object'&&!s.gearKind;let k=m.all||1;if(main&&m.main)k*=m.main;if(!main&&m.other)k*=m.other;a=a*k;}return od.call(this,a,s,part);};window.damageBoss=nb;try{damageBoss=nb;}catch{}}catch{}
 // hạ boss → boss kế (Boss Rush) hoặc kết thúc
 try{const o=finishStage36;const f=function(){if(X&&!X.done){next();return;}return o.apply(this,arguments);};finishStage36=f;}catch{}
 try{const o=Missions393.add;Missions393.add=function(){if(X)return;return o.apply(this,arguments);};}catch{}
 function next(){if(!X||X.done||X.busy)return;X.times.push(X.bS!=null?X.el-X.bS:null);X.idx++;
  if(X.kind!=='rush'||X.idx>=X.stages.length){end(true);return;}
  X.busy=true;try{boss=null;enemies=[];bullets=[];beams=[];hp=Math.min(maxHp,hp+maxHp*C.rush.heal);Safety31.push(drops,100,{x:player.x,y:player.y-60,type:'power',t:0});}catch{}
  T('BOSS RUSH · '+(X.idx+1)+'/'+X.stages.length+' · HỒI 20% MÁU');
  setTimeout(()=>{if(!X||X.done)return;try{level=X.stages[X.idx];try{Bosses28.reset();}catch{}enemies=[];bullets=[];startBoss();}catch{}X.bS=null;X.busy=false;},C.rush.pause*1000);}
 function end(won){if(!X||X.done)return;X.done=true;clearInterval(iv);iv=null;const x=X;let snap=null;try{snap=V206X.snap();}catch{}
  try{Revive393.close();}catch{}try{Combat26.cancelSkill();}catch{}try{superTime=0;bullets=[];beams=[];enemies=[];boss=null;}catch{}try{if(typeof PlayScreen!=='undefined')PlayScreen.exit(false);}catch{}try{mode='menu';}catch{}try{document.getElementById('overlay').hidden=true;}catch{}try{Lobby.show();}catch{}
  try{const d=V75.energy()-x.en0;if(d<0)V75.addEn(-d);}catch{}try{const g=Progress.balance()-x.cr0;if(g>0){try{if(mode!=='play')Progress.setLocked(false);}catch{}Progress.spendCredits(Math.floor(g));}}catch{}
  X=null;window.__sr207=false;let got=[],note='';const total=x.times.reduce((a,b)=>a+(b||0),0);
  if(x.kind==='daily'){if(won){const k=x.mod.id+':'+x.stages[0];const old=S.dBest[k];if(x.times[0]!=null&&(old==null||x.times[0]<old))S.dBest[k]=x.times[0];
    if(S.dDone!==day()){S.dDone=day();const r=C.daily.reward;got=grant({cry:r.cry,core:r.core,credits:r.credits,sss:cleared()>=160?r.sssIf160:0});}else note='Đã nhận thưởng hôm nay · lần này chỉ tính thành tích.';}save();}
  else{const k=x.stages.join('-');if(won){rushLeft();const old=S.best[k];if(old==null||total<old){S.best[k]=total;note='KỶ LỤC MỚI';}if(S.rN<C.rush.perWeek){S.rN++;const r=C.rush.reward;got=grant({coder:r.coder,core:r.core,sss:r.sss,credits:r.credits});}else note=(note?note+' · ':'')+'Đã hết 3 lượt thưởng tuần này.';}save();}
  const gc=(x.kind==='daily'?(got.length?C.daily.reward.credits:0):(got.length?C.rush.reward.credits:0)),exp=x.cr0+gc;
  const claw=()=>{try{const g=Progress.balance()-exp;if(g>0){try{if(mode!=='play')Progress.setLocked(false);}catch{}Progress.spendCredits(Math.floor(g));}}catch{}};setTimeout(claw,300);setTimeout(claw,1500);/* hợp kim nhặt trong trận được cộng trễ khi về sảnh → thu lại */
  setTimeout(()=>panelResult(x,won,got,note,snap,total),350);}
 // ---- giao diện ----
 function card(inner){const el=document.createElement('div');el.className='p206 v207';el.innerHTML=`<div class="p206-b">${inner}</div>`;host().appendChild(el);el.addEventListener('click',e=>{const b=e.target.closest('[data-v207]');if(!b){if(e.target===el)el.remove();return;}const k=b.dataset.v207;el.remove();if(k==='daily'||k==='rush')start(k);else if(k==='od')openDaily();else if(k==='or')openRush();});return el;}
 function openDaily(){if(!onD())return;if(cleared()<C.daily.unlock){T('VƯỢT ẢI '+C.daily.unlock+' ĐỂ MỞ THỬ THÁCH NGÀY');return;}const t=today();if(!t){T('CHƯA CÓ BOSS ĐÃ VƯỢT');return;}const done=S.dDone===day();const r=C.daily.reward;const best=S.dBest[t.mod.id+':'+t.stage];
  card(`<h3>📅 THỬ THÁCH NGÀY · ${t.date.split('-').reverse().join('/')}</h3><div class="v207-mod"><b>${esc(t.mod.name)}</b><span>${esc(t.mod.desc)}</span></div>
   <p>Boss ải <b>${t.stage}</b> · không tốn năng lượng · giữ đủ 6 loại viên buff.</p>
   <p class="v207-rw">${done?'✓ Đã nhận thưởng hôm nay — vẫn chơi được để lập thành tích.':`Thưởng lần thắng đầu hôm nay: ${r.cry} Tinh thể chip · ${r.core} Lõi chip · ${r.credits.toLocaleString('vi-VN')} ◈${cleared()>=160?' · '+r.sssIf160+' Tinh Hạch':''}`}</p>
   ${best!=null?`<p>Thành tích tốt nhất với luật này: <b>${sec(best)}</b></p>`:''}<p class="nt">Ngày theo đồng hồ máy · thành tích chưa xác thực.</p>
   <div class="p206-a"><button type="button" data-v207="daily" class="go">BẮT ĐẦU</button><button type="button" data-v207="x">Đóng</button></div>`);}
 function openRush(){if(!onR())return;if(cleared()<C.rush.unlock){T('VƯỢT ẢI '+C.rush.unlock+' ĐỂ MỞ BOSS RUSH');return;}const L=rushStages();if(L.length<C.rush.count){T('CHƯA ĐỦ BOSS ĐÃ VƯỢT');return;}const left=rushLeft(),best=S.best[L.join('-')];const r=C.rush.reward;
  card(`<h3>⚔ BOSS RUSH · ĐỘT KÍCH LIÊN HOÀN</h3><p>Đánh liên tiếp · <b>giữ nguyên máu giữa các boss</b> · hạ mỗi boss: hồi 20% máu + 1 viên Nâng đạn, nghỉ 2,5 giây.</p>
   <div class="v207-row">${L.map((s,i)=>`<span>${i+1}<b>Ải ${s}</b></span>`).join('')}</div>
   <p>Kỷ lục: <b>${best!=null?sec(best):'chưa có'}</b> · không tốn năng lượng, đánh không giới hạn.</p>
   <p class="v207-rw">Thưởng mỗi lượt thắng (còn <b>${left}/${C.rush.perWeek}</b> tuần này): ${r.coder} Bộ mã hóa · ${r.core} Lõi chip · ${r.sss} Tinh Hạch · ${r.credits.toLocaleString('vi-VN')} ◈</p>
   <div class="p206-a"><button type="button" data-v207="rush" class="go">VÀO THỬ THÁCH</button><button type="button" data-v207="x">Đóng</button></div>`);}
 function panelResult(x,won,got,note,snap,total){let body='';try{body=V206X.html(snap);}catch{}
  const head=x.kind==='daily'?`<h3>${won?'✅ HOÀN THÀNH':'⏹ CHƯA VƯỢT QUA'} · THỬ THÁCH NGÀY</h3><p>${esc(x.mod.name)} · boss ải ${x.stages[0]}${x.times[0]!=null?' · '+sec(x.times[0]):''}</p>`
   :`<h3>${won?'✅ ĐÃ HẠ '+x.stages.length+'/'+x.stages.length+' BOSS':'⏹ ĐÃ HẠ '+x.times.length+'/'+x.stages.length+' BOSS'}</h3><p>Tổng thời gian hạ boss: <b>${sec(total)}</b></p><details><summary>Từng boss</summary>${x.stages.map((s,i)=>`<p>Boss ${i+1} · ải ${s}: ${i<x.times.length?sec(x.times[i]):'chưa hạ'}</p>`).join('')}</details>`;
  card(`${head}${note?`<p class="v207-rw">${esc(note)}</p>`:''}${got.length?`<p class="v207-rw">🎁 ${esc(got.join(' · '))}</p>`:''}${body}<p class="nt">Không tính nhiệm vụ · không tốn năng lượng.</p>
   <div class="p206-a"><button type="button" data-v207="${x.kind==='daily'?'od':'or'}" class="go">Chơi lại</button><button type="button" data-v207="x">Đóng</button></div>`);}
 // nút trong màn Chiến dịch (cạnh Luyện tập boss)
 setInterval(()=>{try{if(!on())return;const c=document.getElementById('campaign');if(!c||c.querySelector('.pb207'))return;const w=document.createElement('div');w.className='pb207';w.innerHTML=`<button type="button" data-v207="od">📅 THỬ THÁCH NGÀY</button><button type="button" data-v207="or">⚔ BOSS RUSH</button>`;c.appendChild(w);}catch{}},1500);
 document.addEventListener('click',e=>{const b=e.target.closest('.pb207 [data-v207]');if(!b)return;e.preventDefault();e.stopPropagation();b.dataset.v207==='od'?openDaily():openRush();},true);
 return {C,today,rushStages,start,end,openDaily,openRush,active:()=>X&&{kind:X.kind,idx:X.idx,stages:X.stages,times:X.times,mod:X.mod&&X.mod.id},state:()=>({...S}),_set:o=>{Object.assign(S,o);save();}};
})();
window.V207X=V207;
