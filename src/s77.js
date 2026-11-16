'use strict';
// V75 · MÙA GIẢI OFFLINE 14 NGÀY "CHIẾN DỊCH SAO BĂNG" (Gemini SEASON_CONFIG_V77, 23/10).
//  • 20 cấp × 500 XP. Làn Miễn phí + Làn Tinh Anh (1.500 💎, tặng ngay 1.000 XP).
//  • XP: 1/1 thể lực tiêu (tối đa 250/ngày) · mốc năng động 60: +100, 100: +150 · tầng Tháp Boss MỚI: +30 · Vô tận sống > 90 s: +40 (3 trận/ngày) · Thử thách ngày: +80.
//  • Sang mùa mới: thưởng đã đạt mà chưa nhận được tự gửi vào túi, rồi đặt lại cấp 0.
//  • Lùi giờ máy quá 5 phút: tạm khóa nhận XP/thưởng cho tới khi đồng hồ vượt mốc đã lưu.
//  Quy đổi vật phẩm chưa có trong game: Đá tẩy → 2.500 ◈/viên · Rương phôi Lục/Lam tự chọn → phôi Lục/Lam chiến cơ đang dùng ·
//  Hộp đá khảm cấp 1/2 → 2 đá Lục / 2 đá Lam · Rương trang bị Tím bậc S → 1 phôi Tím trang bị · Lõi SSS tự chọn → 3 Lõi Siêu Hợp ·
//  Skin độc quyền "Ảo Ảnh Thần Cơ" (chưa có tranh) → 1 skin chưa sở hữu, đủ hết thì 500 💎.
// V307: bảng thưởng mùa 14 ngày/20 cấp cũ — chỉ dùng để gửi bù khi chuyển sang mùa 21 ngày/25 cấp
const REWARDS_V20=[
  {level:1,free:{alloy:5000},elite:{gem:100,alloy:10000}},{level:2,free:{upgradeStone:5},elite:{sweepTicket:3}},
  {level:3,free:{gem:50},elite:{fodderGreenBox:1}},{level:4,free:{alloy:10000},elite:{rerollStone:5}},
  {level:5,free:{luckyTicket:1},elite:{pilotShardSelect:10}},{level:6,free:{energy:50},elite:{gem:150}},
  {level:7,free:{upgradeStone:10},elite:{alloy:20000}},{level:8,free:{socketBoxLv1:1},elite:{ultBossTicket:1}},
  {level:9,free:{gem:100},elite:{pilotShardRandom:25}},{level:10,free:{fodderBlueBox:1},elite:{skinId:'SKIN_AO_ANH_THAN_CO'}},
  {level:11,free:{alloy:15000},elite:{gem:200}},{level:12,free:{sweepTicket:5},elite:{socketBoxLv2:1}},
  {level:13,free:{upgradeStone:15},elite:{energy:50}},{level:14,free:{gem:150},elite:{alloy:30000}},
  {level:15,free:{pilotShardSelect:10},elite:{luckyTicket:2}},{level:16,free:{alloy:20000},elite:{rerollStone:10}},
  {level:17,free:{socketBoxLv2:1},elite:{gem:250}},{level:18,free:{upgradeStone:20},elite:{fodderBlueBox:1}},
  {level:19,free:{gem:200},elite:{ultBossTicket:2}},{level:20,free:{purpleEquipChest:1},elite:{sssCoreSelect:1,titleId:'TITLE_SEASON_CHAMPION'}}];
// V307 (Gemini cân bằng, chủ dự án chốt 16/11): mùa 21 ngày · 25 cấp · rương vượt cấp 3 cái. Kim cương giữ 500 (miễn phí) + 700 (Tinh Anh).
const SEASON_CONFIG_V77={CYCLE_DAYS:21,CYCLE_MS:21*864e5,ELITE_PASS_PRICE_GEM:1500,ELITE_INSTANT_XP:1000,XP_PER_LEVEL:500,MAX_LEVEL:25,
 XP:{energyCap:250,ms60:100,ms100:150,towerFloor:30,endless:40,endlessDaily:3,endlessSec:90,daily:80},
 OVER:{xp:1000,max:3,rw:{alloy:6000,upgradeStone:4,sweepTicket:1}},
 REWARDS_TRACK:[
  {level:1,free:{alloy:5000},elite:{gem:100,alloy:10000}},{level:2,free:{upgradeStone:5},elite:{sweepTicket:3}},
  {level:3,free:{alloy:10000},elite:{fodderGreenBox:1}},{level:4,free:{gem:50},elite:{rerollStone:5}},
  {level:5,free:{luckyTicket:1},elite:{pilotShardSelect:10}},{level:6,free:{energy:50},elite:{alloy:10000}},
  {level:7,free:{upgradeStone:10},elite:{gem:150}},{level:8,free:{socketBoxLv1:1},elite:{ultBossTicket:1}},
  {level:9,free:{alloy:15000},elite:{pilotShardRandom:15}},{level:10,free:{gem:100},elite:{fodderBlueBox:1}},
  {level:11,free:{fodderBlueBox:1},elite:{alloy:20000}},{level:12,free:{sweepTicket:5},elite:{socketBoxLv2:1}},
  {level:13,free:{upgradeStone:15},elite:{skinId:'SKIN_AO_ANH_THAN_CO'}},{level:14,free:{alloy:15000},elite:{gem:200}},
  {level:15,free:{pilotShardSelect:10},elite:{energy:50}},{level:16,free:{gem:150},elite:{rerollStone:10}},
  {level:17,free:{socketBoxLv2:1},elite:{luckyTicket:2}},{level:18,free:{alloy:20000},elite:{alloy:20000}},
  {level:19,free:{upgradeStone:20},elite:{ultBossTicket:2}},{level:20,free:{socketBoxLv1:1},elite:{gem:250}},
  {level:21,free:{upgradeStone:5},elite:{pilotShardRandom:10}},{level:22,free:{gem:200},elite:{fodderBlueBox:1}},
  {level:23,free:{upgradeStone:10},elite:{alloy:15000}},{level:24,free:{sweepTicket:2},elite:{rerollStone:5,luckyTicket:1,ultBossTicket:1}},
  {level:25,free:{purpleEquipChest:1},elite:{sssCoreSelect:1,titleId:'TITLE_SEASON_CHAMPION'}}]};
const S77=(()=>{
 const KEY='PLAYER_SEASON_PASS_V77',C=SEASON_CONFIG_V77,X=C.XP;
 const sid=()=>Math.floor(Date.now()/C.CYCLE_MS);
 const dayK=()=>new Date(Date.now()+7*3600000).toISOString().slice(0,10);
 let S={id:sid(),xp:0,elite:false,cf:[],ce:[],oc:0,cyc:C.CYCLE_DAYS,last:Date.now(),day:{d:'',en:0,end:0,dc:0},tw:-1,titles:[]};
 let OLD=null;try{OLD=JSON.parse(localStorage.getItem(KEY)||'null');}catch{}
 if(OLD){Object.assign(S,OLD);if(OLD.cyc!==C.CYCLE_DAYS)S.cyc=OLD.cyc||14;}// dữ liệu mùa cũ không có cyc = mùa 14 ngày
 const OV=C.OVER,capXP=()=>C.MAX_LEVEL*C.XP_PER_LEVEL+OV.max*OV.xp;
 const overAvail=()=>Math.max(0,Math.min(OV.max,Math.floor((S.xp-C.MAX_LEVEL*C.XP_PER_LEVEL)/OV.xp))-(S.oc|0));
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const fmt=n=>Math.round(n).toLocaleString('vi-VN');const T=t=>{try{toast(t);}catch{}};
 const lvl=()=>Math.min(C.MAX_LEVEL,Math.floor(S.xp/C.XP_PER_LEVEL));
 let susp=false;
 function roll(){const now=Date.now();if(now<(S.last||0)-300000){susp=true;return false;}susp=false;S.last=Math.max(S.last||0,now);
  if(S.cyc!==C.CYCLE_DAYS){// V307: mùa cũ 14 ngày/20 cấp → gửi bù thưởng chưa nhận theo bảng cũ rồi mở mùa 21 ngày/25 cấp
   const L=Math.min(20,Math.floor(S.xp/500));let n=0;for(let l=1;l<=L;l++){const r=REWARDS_V20[l-1];if(!S.cf.includes(l)){grant(r.free);n++;}if(S.elite&&!S.ce.includes(l)){grant(r.elite);n++;}}
   if(n)T('🏁 MÙA MỚI 21 NGÀY · tự gửi '+n+' phần thưởng mùa cũ chưa nhận');S.cyc=C.CYCLE_DAYS;S.id=sid();S.xp=0;S.elite=false;S.cf=[];S.ce=[];S.oc=0;S.tw=-1;}
  const id=sid();if(id>S.id){// gửi bù thưởng chưa nhận của mùa cũ
   const L=lvl();let n=0;for(let l=1;l<=L;l++){const r=C.REWARDS_TRACK[l-1];if(!S.cf.includes(l)){grant(r.free);n++;}if(S.elite&&!S.ce.includes(l)){grant(r.elite);n++;}}
   for(let i=overAvail();i>0;i--){grant(OV.rw);n++;}
   if(n)T('🏁 HẾT MÙA · tự gửi '+n+' phần thưởng chưa nhận');S.id=id;S.xp=0;S.elite=false;S.cf=[];S.ce=[];S.oc=0;S.tw=-1;}
  const d=dayK();if(S.day.d!==d)S.day={d,en:0,end:0,dc:0};save();return true;}
 function addXP(n,why){if(!roll()||!(n>0))return;const l0=lvl();const o0=overAvail()+(S.oc|0);S.xp=Math.min(capXP(),S.xp+n);save();const l1=lvl();if(l1>l0)T('🏁 MÙA GIẢI · LÊN CẤP '+l1+(why?' · '+why:''));else if(overAvail()+(S.oc|0)>o0)T('🏁 MÙA GIẢI · RƯƠNG VƯỢT CẤP'+(why?' · '+why:''));if(el&&!el.hidden)render();}
 const daysLeft=()=>Math.max(0,Math.ceil(((S.id+1)*C.CYCLE_MS-Date.now())/864e5));
 // ---------- cấp phát ----------
 function grant(r){if(!r)return;try{
  if(r.gem)Econ74.add(r.gem,'mùa giải');if(r.alloy)Progress.grantCredits(r.alloy);if(r.upgradeStone)Workshop.grant({exp:r.upgradeStone});
  if(r.sweepTicket)V75.addTk(r.sweepTicket);if(r.energy)V75.addEn(r.energy,'mùa giải');if(r.rerollStone)Progress.grantCredits(r.rerollStone*2500);
  if(r.luckyTicket)Econ74.addSpin(r.luckyTicket);if(r.ultBossTicket)for(let i=0;i<r.ultBossTicket;i++)Econ74.addTry();
  let c=0;try{c=launchCraft|0;}catch{}if(r.fodderGreenBox)V70.phAdd('craft',c,1,r.fodderGreenBox);if(r.fodderBlueBox)V70.phAdd('craft',c,2,r.fodderBlueBox);
  if(r.socketBoxLv1||r.socketBoxLv2){const pos=['ship','armor','missiles','sidearm'];const t=r.socketBoxLv2?2:1;for(let i=0;i<2;i++)Stone71.give(Stone71.make(t,pos[Math.floor(Math.random()*4)],{ty:'stat'}));}
  if(r.pilotShardSelect||r.pilotShardRandom){const st=Pilot67.state();const own=Object.keys(st.own).map(Number);if(own.length){if(r.pilotShardSelect){const m=st.team[0]&&st.own[st.team[0]]?st.team[0]:own[0];Pilot67._piece(m,r.pilotShardSelect);}if(r.pilotShardRandom)for(let i=0;i<r.pilotShardRandom;i++)Pilot67._piece(own[Math.floor(Math.random()*own.length)],1);}else Progress.grantCredits(600*((r.pilotShardSelect|0)+(r.pilotShardRandom|0)));}
  if(r.purpleEquipChest){const ks=Object.keys(GearCatalog).filter(k=>!/36$/.test(k)&&!(window.GEAR81_NODROP||{})[k]);V70.phAdd('gear',ks[Math.floor(Math.random()*ks.length)],3,1);}
  if(r.sssCoreSelect)Meta407.addCores(3*r.sssCoreSelect,'MÙA GIẢI');
  if(r.skinId){const own=Trade67.state().owned||[];const L=(typeof SKINS67!=='undefined'?SKINS67:[]).filter(s=>!own.includes(s.id)&&s.src!=='soon');if(L.length)Trade67._own(L[Math.floor(Math.random()*L.length)].id);else Econ74.add(500,'mùa giải · skin đã đủ');}
  if(r.titleId&&!S.titles.includes(r.titleId)){S.titles.push(r.titleId);save();}
 }catch(e){console.warn('S77',e);}}
 const rTxt=r=>{const o=[];if(r.gem)o.push(r.gem+' 💎');if(r.alloy)o.push(fmt(r.alloy)+' ◈');if(r.upgradeStone)o.push(r.upgradeStone+' ⬢');if(r.sweepTicket)o.push(r.sweepTicket+' 🎫');if(r.energy)o.push(r.energy+' 🔋');
  if(r.rerollStone)o.push(fmt(r.rerollStone*2500)+' ◈ (đá tẩy)');if(r.luckyTicket)o.push(r.luckyTicket+' vé vòng quay');if(r.ultBossTicket)o.push(r.ultBossTicket+' vé phó bản GH');if(r.fodderGreenBox)o.push('phôi Lục chiến cơ');if(r.fodderBlueBox)o.push('phôi Lam chiến cơ');
  if(r.socketBoxLv1)o.push('2 đá Lục');if(r.socketBoxLv2)o.push('2 đá Lam');if(r.pilotShardSelect)o.push(r.pilotShardSelect+' mảnh PC chính');if(r.pilotShardRandom)o.push(r.pilotShardRandom+' mảnh PC');if(r.purpleEquipChest)o.push('phôi Tím trang bị');
  if(r.sssCoreSelect)o.push('3 Lõi Siêu Hợp');if(r.skinId)o.push('1 skin');if(r.titleId)o.push('danh hiệu Quán Quân Mùa');return o.join(' + ');};
 function claim(l,tr){if(!roll()){T('ĐỒNG HỒ MÁY BỊ LÙI · tạm khóa mùa giải');return false;}if(l>lvl())return false;if(tr==='e'&&!S.elite)return false;const L=tr==='e'?S.ce:S.cf;if(L.includes(l))return false;
  const r=C.REWARDS_TRACK[l-1];grant(tr==='e'?r.elite:r.free);L.push(l);save();T('🏁 MÙA GIẢI · CẤP '+l+' · '+rTxt(tr==='e'?r.elite:r.free));render();return true;}
 function claimOver(){if(!roll()){T('ĐỒNG HỒ MÁY BỊ LÙI · tạm khóa mùa giải');return false;}if(overAvail()<1)return false;grant(OV.rw);S.oc=(S.oc|0)+1;save();T('🏁 MÙA GIẢI · RƯƠNG VƯỢT CẤP · '+rTxt(OV.rw));render();return true;}
 function claimAll(){let n=0;for(let l=1;l<=lvl();l++){if(!S.cf.includes(l)&&claim(l,'f'))n++;if(S.elite&&!S.ce.includes(l)&&claim(l,'e'))n++;}while(overAvail()>0&&claimOver())n++;return n;}
 function buyElite(){if(!roll())return false;if(S.elite){T('ĐÃ MỞ LÀN TINH ANH');return false;}if(!Econ74.spend(C.ELITE_PASS_PRICE_GEM))return false;S.elite=true;save();addXP(C.ELITE_INSTANT_XP,'Làn Tinh Anh');render();return true;}
 const ready=()=>{const L=lvl();if(overAvail()>0)return true;for(let l=1;l<=L;l++){if(!S.cf.includes(l))return true;if(S.elite&&!S.ce.includes(l))return true;}return false;};
 // ---------- nguồn XP ----------
 function onEnergy(n){roll();const room=X.energyCap-S.day.en;const g=Math.max(0,Math.min(room,n));if(g){S.day.en+=g;save();addXP(g);}}
 setTimeout(()=>{
  try{const ot=Q77.track;Q77.track=function(ev,n){try{if(ev==='energy')onEnergy(n|0);}catch{}return ot.apply(this,arguments);};}catch{}
  try{const oc=Q77.claim;Q77.claim=function(k,p){const r=oc.apply(this,arguments);try{if(r&&k==='d'){if(p===60)addXP(X.ms60,'năng động 60');if(p===100)addXP(X.ms100,'năng động 100');}}catch{}return r;};}catch{}
  try{const oe=end;end=function(){let gm='',t=0;try{gm=gameMode;t=Math.max(stageTime||0,time||0);}catch{}const r=oe.apply(this,arguments);try{if(gm==='endless'&&t>X.endlessSec){roll();if(S.day.end<X.endlessDaily){S.day.end++;save();addXP(X.endless,'Vô tận');}}}catch{}return r;};}catch{}
 },0);
 setInterval(()=>{try{if(!roll())return;let best=0;try{best=Meta40.state().S.tower.best|0;}catch{}if(S.tw<0){S.tw=best;save();}else if(best>S.tw){const n=best-S.tw;S.tw=best;save();addXP(n*X.towerFloor,'Tháp Boss');}
   const st=JSON.parse(localStorage.getItem('saobang-daily-v63')||'{}');if(st.done===dayK()&&!S.day.dc){S.day.dc=1;save();addXP(X.daily,'Thử thách ngày');}}catch{}},1500);
 // ---------- giao diện ----------
 let el=null;
 function open(){if(!el){el=document.createElement('div');el.className='m63 s77p';document.body.appendChild(el);el.addEventListener('click',e=>{const b=e.target.closest('[data-s77]');if(!b){if(e.target===el)el.hidden=true;return;}const a=b.dataset.s77;
   if(a==='x')el.hidden=true;else if(a==='cl')claim(+b.dataset.l,b.dataset.t);else if(a==='over')claimOver();else if(a==='all'){const n=claimAll();if(!n)T('Không có thưởng để nhận');}else if(a==='elite')buyElite();});}roll();render();el.hidden=false;
  setTimeout(()=>{const c=el.querySelector('.s77-row.cur');if(c)c.scrollIntoView({block:'center'});},30);}
 function render(){if(!el)return;const L=lvl(),inLv=S.xp-L*C.XP_PER_LEVEL,pct=L>=C.MAX_LEVEL?100:inLv/C.XP_PER_LEVEL*100;
  const rows=C.REWARDS_TRACK.map(r=>{const l=r.level,ok=L>=l,gf=S.cf.includes(l),ge=S.ce.includes(l);
   return `<div class="s77-row ${ok?'ok':''} ${l===L+1?'cur':''}"><em>${l}</em><button class="s77-c f ${gf?'got':''}" data-s77="cl" data-l="${l}" data-t="f" ${ok&&!gf?'':'disabled'}>${gf?'✓ ':''}${rTxt(r.free)}</button><button class="s77-c e ${ge?'got':''} ${S.elite?'':'lk'}" data-s77="cl" data-l="${l}" data-t="e" ${ok&&S.elite&&!ge?'':'disabled'}>${S.elite?'':'🔒 '}${ge?'✓ ':''}${rTxt(r.elite)}</button></div>`;}).join('');
  const oN=S.oc|0,oA=overAvail(),oNext=Math.min(OV.max,oN+oA),oHave=Math.max(0,S.xp-C.MAX_LEVEL*C.XP_PER_LEVEL),
   overRow=`<div class="s77-row ${L>=C.MAX_LEVEL?'ok':''}"><em>＋</em><button class="s77-c f ${oN>=OV.max?'got':''}" data-s77="over" ${oA>0?'':'disabled'}>RƯƠNG VƯỢT CẤP ${oN}/${OV.max} · ${rTxt(OV.rw)}${oN>=OV.max?' ✓':oA>0?' · NHẬN ('+oA+')':' · cần '+fmt(Math.max(0,(oN+oA+1)*OV.xp-oHave))+' XP nữa'}</button></div>`;
  el.innerHTML=`<div class="m63-card s77-card"><div class="s77-top"><b>MÙA GIẢI · CHIẾN DỊCH SAO BĂNG</b><button data-s77="x" class="s77-x">✕</button></div>
   ${susp?'<p class="s77-warn">Đồng hồ máy bị lùi · tạm khóa cho tới khi giờ máy vượt mốc đã lưu.</p>':''}
   <div class="s77-head"><div class="s77-lv"><b>${L}</b><small>/ ${C.MAX_LEVEL}</small></div><div class="s77-xp"><div><i style="width:${pct}%"></i></div><small>${fmt(Math.min(S.xp,C.MAX_LEVEL*C.XP_PER_LEVEL))} / ${fmt(C.MAX_LEVEL*C.XP_PER_LEVEL)} XP · còn ${daysLeft()} ngày${S.titles.length?' · 🏆 Quán Quân Mùa':''}</small></div></div>
   <p class="s77-s">XP: 1/thể lực (≤${X.energyCap}/ngày) · năng động 60: +${X.ms60}, 100: +${X.ms100} · tầng Tháp mới +${X.towerFloor} · Vô tận >${X.endlessSec}s +${X.endless} (${X.endlessDaily}/ngày) · Thử thách ngày +${X.daily}</p>
   <div class="s77-btns">${S.elite?'<span class="s77-on">✦ LÀN TINH ANH ĐÃ MỞ</span>':`<button class="m63-go" data-s77="elite">MỞ LÀN TINH ANH · ${fmt(C.ELITE_PASS_PRICE_GEM)} 💎 (+${fmt(C.ELITE_INSTANT_XP)} XP)</button>`}<button class="m63-go s77-all" data-s77="all">NHẬN TẤT CẢ</button></div>
   <div class="s77-hd"><em>Cấp</em><b>MIỄN PHÍ</b><b class="e">TINH ANH</b></div><div class="s77-list">${rows}${overRow}</div></div>`;}
 setInterval(()=>{try{const b=document.querySelector('#hgr41 [data-n74=gifts] .n74d');if(b&&ready())b.hidden=false;}catch{}},2000);
 roll();
 return {addXP,claim,claimOver,claimAll,over:()=>({avail:overAvail(),claimed:S.oc|0}),buyElite,open,ready,level:lvl,state:()=>JSON.parse(JSON.stringify(S)),_set:o=>{Object.assign(S,o);save();}};
})();
