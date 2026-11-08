'use strict';
// V75 · NHIỆM VỤ NGÀY / TUẦN theo ĐIỂM NĂNG ĐỘNG (Gemini QUEST_CONFIG_V77, 23/10).
//  • Ngày: 8 nhiệm vụ = 140 điểm, mốc 20/40/60/80/100 (tổng 50 💎 — BALANCE75). Tuần: 7 nhiệm vụ = 600 điểm, mốc 100…500 (tổng 150 💎).
//  • Ngày tính theo giờ VN (UTC+7), tuần bắt đầu thứ Hai. Lùi giờ máy không làm mất tiến độ (chỉ reset khi sang ngày/tuần MỚI hơn).
//  • Thay thưởng 💎 của 3 nhiệm vụ ngày cũ (Missions393 vẫn tự trả hợp kim như trước).
//  Chỉnh cho đúng game: "Hộp nguyên liệu" → 15 ⬢ + 1 phôi Trắng; "Rương đá khảm cấp 1" → 2 đá khảm Lục; "5 Đá tẩy" → 12.500 ◈ (= 5 lần phí tẩy lẻ Tím);
//  "Rương phôi Lam tự chọn" → 1 phôi Lam chiến cơ đang dùng; "Lõi SSS" → 1 Lõi Siêu Hợp; "mảnh phi công tự chọn" → phi công CHÍNH.
const QUEST_CONFIG_V77={
 // BALANCE75 (Gemini 23/10): ngày 100 → 50 💎, tuần 300 → 150 💎
 // V79B (Gemini REVIEW79B DAILY79, chủ dự án đồng ý): vẫn 50 💎/ngày · mốc 100 tặng phôi Lam đúng món đang dùng
 //  thay thế đồ chưa có trong game: "Vé phó bản vạn năng" → 2 đá khảm Lục · "2 Đá tẩy" → 5.000 ◈ (= 2 lần phí tẩy lẻ)
 DAILY_MILESTONES:[{points:20,gem:5,alloy:5000,energy:20},{points:40,gem:10,exp:30,extra:{type:'SWEEP_TICKET',amount:3}},{points:60,gem:10,alloy:5000,extra:[{type:'PH_LUC_RANDOM',amount:1},{type:'SEASON_XP',amount:100}]},{points:80,gem:10,alloy:5000,extra:{type:'SOCKET_BOX_LV1',amount:1}},{points:100,gem:15,extra:[{type:'BLUE_FODDER_SMART',amount:1},{type:'PILOT_BOX_RANDOM',amount:1},{type:'SEASON_XP',amount:150}]}],
 WEEKLY_MILESTONES:[{points:100,gem:25,alloy:10000},{points:200,gem:25,extra:{type:'SWEEP_TICKET',amount:5}},{points:300,gem:25,extra:{type:'ULT_BOSS_TICKET',amount:1}},{points:400,gem:25,extra:{type:'PILOT_SHARDS_SELECT',amount:15}},{points:500,gem:50,extra:{type:'BLUE_FODDER_BOX',amount:1},core:1}],
 DAILY_TASKS:{
  D_LOGIN:{target:1,points:20,title:'Đăng nhập game',ev:'login',rw:{alloy:2000}},
  D_STAGES:{target:3,points:20,title:'Vượt 3 ải chiến dịch (tính cả càn quét)',ev:'stage',rw:{alloy:3000}},
  D_SWEEP:{target:2,points:15,title:'Càn quét ải 2 lần',ev:'sweep',rw:{tk:1}},
  D_ENERGY:{target:50,points:20,title:'Tiêu hao 50 thể lực',ev:'energy',rw:{energy:20}},
  D_TOWER_CHALLENGE:{target:2,points:20,title:'Vượt 2 tầng Tháp Boss hoặc 1 Thử thách ngày',ev:'tower',rw:{exp:5}},
  D_UPGRADE:{target:1,points:15,title:'Đột phá, khảm hoặc tẩy đá 1 lần',ev:'upgrade',rw:{alloy:2000}},
  D_ENDLESS:{target:1,points:15,title:'Tham gia 1 trận Vô Tận',ev:'endless',rw:{exp:15,ph:1}},
  D_MARKET:{target:1,points:15,title:'Mua 1 món tại Chợ Đen',ev:'market',rw:{alloy:100}}},
 WEEKLY_TASKS:{
  W_DAILY_POINTS:{target:350,points:150,title:'Tích 350 năng động ngày',ev:'dpts',rw:{alloy:10000}},
  W_CLEAR_STAGES:{target:25,points:80,title:'Vượt hoặc càn quét 25 ải',ev:'stage',rw:{tk:10}},
  W_TOWER_CLIMB:{target:10,points:80,title:'Vượt 10 tầng Tháp Boss',ev:'towerf',rw:{exp:20}},
  W_ENERGY_SPEND:{target:350,points:100,title:'Tiêu hao 350 thể lực',ev:'energy',rw:{energy:50}},
  W_BOSS_KILL:{target:25,points:70,title:'Tiêu diệt 25 Boss bất kỳ',ev:'boss',rw:{phLuc:1}},
  W_BLACK_MARKET:{target:6,points:60,title:'Mua 6 lượt tại Chợ Đen',ev:'market',rw:{alloy:5000}},
  W_SOCKET_REROLL:{target:10,points:60,title:'Tẩy hoặc khảm đá 10 lần',ev:'stone',rw:{alloy:12500}}}};
const Q77=(()=>{
 const KEY='PLAYER_QUESTS_V77',C=QUEST_CONFIG_V77;
 const dayK=()=>new Date(Date.now()+7*3600000).toISOString().slice(0,10);
 const weekK=()=>{const d=new Date(Date.now()+7*3600000);const dn=(d.getUTCDay()+6)%7;const m=new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate()-dn));return m.toISOString().slice(0,10);};
 let S={d:'',w:'',dp:0,wp:0,dc:[],wc:[],dpr:{},wpr:{}};try{Object.assign(S,JSON.parse(localStorage.getItem(KEY)||'{}'));}catch{}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const fmt=n=>Math.round(n).toLocaleString('vi-VN');const T=t=>{try{toast(t);}catch{}};
 function roll(){const d=dayK(),w=weekK();let ch=false;if(d>S.d){S.d=d;S.dp=0;S.dc=[];S.dpr={};ch=true;}if(w>S.w){S.w=w;S.wp=0;S.wc=[];S.wpr={};ch=true;}if(ch){save();setTimeout(()=>track('login',1),0);}}
 const unlocked=()=>{try{return Onboard66.cleared()>=2;}catch{return true;}};
 function give(rw,why){if(!rw)return;try{if(rw.alloy)Progress.grantCredits(rw.alloy);if(rw.exp)Workshop.grant({exp:rw.exp});if(rw.tk)V75.addTk(rw.tk);if(rw.energy)V75.addEn(rw.energy,why);
  if(rw.ph||rw.phLuc){const ks=Object.keys(GearCatalog).filter(k=>!/36$/.test(k));V70.phAdd('gear',ks[Math.floor(Math.random()*ks.length)],rw.phLuc?1:0,1);}}catch(e){console.warn('Q77',e);}}
 function extra(x){if(!x)return;if(Array.isArray(x)){for(const y of x)extra(y);return;}try{const st=Pilot67.state();const owned=Object.keys(st.own).map(Number);const mainP=st.team[0]&&st.own[st.team[0]]?st.team[0]:owned[0];
  if(x.type==='SWEEP_TICKET')V75.addTk(x.amount);
  else if(x.type==='SOCKET_BOX_LV1'){const pos=['ship','armor','missiles','sidearm'];for(let i=0;i<2;i++)Stone71.give(Stone71.make(1,pos[Math.floor(Math.random()*4)],{ty:'stat'}));}
  else if(x.type==='PILOT_BOX_RANDOM'){if(owned.length)Pilot67._piece(owned[Math.floor(Math.random()*owned.length)],5);else Progress.grantCredits(3000);}
  else if(x.type==='PILOT_SHARDS_SELECT'){if(mainP)Pilot67._piece(mainP,x.amount);else Progress.grantCredits(9000);}
  else if(x.type==='ULT_BOSS_TICKET')Econ74.addTry();
  else if(x.type==='PH_LUC_RANDOM'){V70.dropPhoi({p:1,w:[0,1,0,0]},null);}
  else if(x.type==='SEASON_XP'){S77.addXP(x.amount,'năng động');}
  else if(x.type==='BLUE_FODDER_SMART'){let done=false;try{if(Math.random()<.5){const eq=Progress.v70.equipped(),its=Object.values(eq).map(id=>Progress.v70.get(id)).filter(Boolean);if(its.length){V70.phAdd('gear',its[Math.floor(Math.random()*its.length)].variant,2,1);done=true;}}}catch{}if(!done){let c=0;try{c=launchCraft|0;}catch{}V70.phAdd('craft',c,2,1);}}
  else if(x.type==='BLUE_FODDER_BOX'){let c=0;try{c=launchCraft|0;}catch{}V70.phAdd('craft',c,2,1);}}catch(e){console.warn('Q77 extra',e);}}
 const exTxt=x=>!x?'':Array.isArray(x)?x.map(y=>exTxt(y)).filter(Boolean).join(' · '):x.type==='PH_LUC_RANDOM'?'1 phôi Lục':x.type==='SEASON_XP'?x.amount+' XP mùa giải':x.type==='BLUE_FODDER_SMART'?'1 phôi Lam món đang dùng':x.type==='SWEEP_TICKET'?x.amount+' vé càn quét':x.type==='SOCKET_BOX_LV1'?'2 đá khảm Lục':x.type==='PILOT_BOX_RANDOM'?'5 mảnh phi công':x.type==='PILOT_SHARDS_SELECT'?x.amount+' mảnh phi công chính':x.type==='ULT_BOSS_TICKET'?'1 vé Phó bản giới hạn':x.type==='BLUE_FODDER_BOX'?'1 phôi Lam chiến cơ':'';
 const rwTxt=r=>[r.alloy?fmt(r.alloy)+' ◈':'',r.exp?r.exp+' ⬢':'',r.tk?r.tk+' 🎫':'',r.energy?r.energy+' 🔋':'',r.ph?'1 phôi Trắng':'',r.phLuc?'1 phôi Lục':''].filter(Boolean).join(' + ');
 function track(ev,n=1){roll();let changed=false;
  for(const [k,t] of Object.entries(C.DAILY_TASKS))if(t.ev===ev){const c=S.dpr[k]|0;if(c<t.target){S.dpr[k]=Math.min(t.target,c+n);changed=true;if(S.dpr[k]>=t.target){S.dp=Math.min(140,S.dp+t.points);give(t.rw,t.title);T('✔ NHIỆM VỤ NGÀY · '+t.title+' · +'+t.points+' năng động');setTimeout(()=>track('dpts',t.points),0);}}}
  for(const [k,t] of Object.entries(C.WEEKLY_TASKS))if(t.ev===ev){const c=S.wpr[k]|0;if(c<t.target){S.wpr[k]=Math.min(t.target,c+n);changed=true;if(S.wpr[k]>=t.target){S.wp=Math.min(600,S.wp+t.points);give(t.rw,t.title);T('✔ NHIỆM VỤ TUẦN · '+t.title+' · +'+t.points+' điểm tuần');}}}
  if(changed){save();paintDot();if(el&&!el.hidden)render();}}
 function claim(kind,pts){roll();const L=kind==='d'?C.DAILY_MILESTONES:C.WEEKLY_MILESTONES,m=L.find(x=>x.points===pts),have=kind==='d'?S.dp:S.wp,got=kind==='d'?S.dc:S.wc;
  if(!m||got.includes(pts)||have<pts)return false;got.push(pts);save();try{if(m.gem)Econ74.add(m.gem,(kind==='d'?'năng động ngày ':'năng động tuần ')+pts);}catch{}try{if(m.alloy)Progress.grantCredits(m.alloy);if(m.energy)V75.addEn(m.energy,'mốc năng động');if(m.exp)Workshop.grant({exp:m.exp});if(m.core)Meta407.addCores(m.core,'NHIỆM VỤ TUẦN');}catch{}extra(m.extra);render();paintDot();return true;}
 // REVIEW75: Nhận tất cả mốc ngày + tuần đã đạt bằng 1 chạm
 function claimAll(){let n=0;for(const [k,L] of [['d',C.DAILY_MILESTONES],['w',C.WEEKLY_MILESTONES]])for(const m of L)if(claim(k,m.points))n++;if(!n)T('Chưa có mốc nào để nhận');else T('✔ ĐÃ NHẬN '+n+' MỐC THƯỞNG');return n;}
 const ready=()=>{roll();return C.DAILY_MILESTONES.some(m=>S.dp>=m.points&&!S.dc.includes(m.points))||C.WEEKLY_MILESTONES.some(m=>S.wp>=m.points&&!S.wc.includes(m.points));};
 function paintDot(){const b=document.querySelector('#hgr41 [data-n74=gifts] .n74d');if(b&&ready())b.hidden=false;}
 // ---------- hook sự kiện ----------
 let lastTower=-1,bossSeen=null;
 function hooks(){
  try{const orw=Progress.rewardStage;Progress.rewardStage=function(stage){const r=orw.apply(this,arguments);try{let tw=false;try{tw=!!Meta40.state().run;}catch{}let ec=false;try{ec=Eclipse67.active();}catch{}let dg=false;try{dg=Dungeons.active();}catch{}
    if(r){if(tw){track('tower',1);track('towerf',1);}else if(!ec&&!dg&&document.getElementById('gamemode')?.value==='campaign')track('stage',1);}}catch{}return r;};}catch{}
  try{const oe=end;end=function(){let gm='';try{gm=gameMode;}catch{}const r=oe.apply(this,arguments);try{if(gm==='endless')track('endless',1);}catch{}return r;};}catch{}
  try{const op=V70.promote;V70.promote=function(){const r=op.apply(this,arguments);try{if(r)track('upgrade',1);}catch{}return r;};}catch{}
  try{const ou=Stone71.put;Stone71.put=function(){const r=ou.apply(this,arguments);try{if(r){track('stone',1);track('upgrade',1);}}catch{}return r;};}catch{}}
 setTimeout(()=>{try{hooks();}catch{}},0);
 setInterval(()=>{try{roll();if(typeof boss!=='undefined'&&boss&&boss.defeatStarted&&bossSeen!==boss){bossSeen=boss;track('boss',1);}
   const st=JSON.parse(localStorage.getItem('saobang-daily-v63')||'{}');if(st.done===dayK()&&!S.dch){S.dch=dayK();save();track('tower',2);}else if(S.dch&&S.dch!==dayK()){S.dch='';}
   paintDot();}catch{}},1000);
 // ---------- giao diện ----------
 let el=null,tab='d';
 function open(t){if(t)tab=t;if(!el){el=document.createElement('div');el.className='m63 q77p';document.body.appendChild(el);el.addEventListener('click',e=>{const b=e.target.closest('[data-q77]');if(!b){if(e.target===el)el.hidden=true;return;}const a=b.dataset.q77;
   if(a==='x')el.hidden=true;else if(a==='tab'){tab=b.dataset.t;render();}else if(a==='cl')claim(b.dataset.k,+b.dataset.p);else if(a==='all'){claimAll();render();}});}roll();render();el.hidden=false;}
 function render(){if(!el)return;const D=tab==='d',L=D?C.DAILY_MILESTONES:C.WEEKLY_MILESTONES,tasks=D?C.DAILY_TASKS:C.WEEKLY_TASKS,pr=D?S.dpr:S.wpr,have=D?S.dp:S.wp,got=D?S.dc:S.wc,max=L[L.length-1].points;
  const bar=`<div class="q77-bar"><div class="q77-fill" style="width:${Math.min(100,have/max*100)}%"></div>${L.map(m=>{const ok=have>=m.points,g=got.includes(m.points);return `<button class="q77-ms ${ok?'ok':''} ${g?'got':''}" style="left:${m.points/max*100}%" data-q77="cl" data-k="${tab}" data-p="${m.points}" title="${m.gem} 💎"><i>${g?'✓':'🎁'}</i><small>${m.points}</small></button>`;}).join('')}</div>
   <div class="q77-mrw">${L.map(m=>`<span class="${got.includes(m.points)?'got':have>=m.points?'ok':''}"><b>${m.points}</b> ${m.gem} 💎${m.alloy?' · '+fmt(m.alloy)+' ◈':''}${m.energy?' · '+m.energy+' 🔋':''}${m.exp?' · '+m.exp+' ⬢':''}${m.core?' · 1 lõi':''}${m.extra?' · '+exTxt(m.extra):''}</span>`).join('')}</div>`;
  const rows=Object.entries(tasks).map(([k,t])=>{const c=pr[k]|0,done=c>=t.target;return `<div class="q77-t ${done?'done':''}"><div><b>${t.title}</b><small>${rwTxt(t.rw)} · +${t.points} ${D?'năng động':'điểm tuần'}</small><div class="q77-pb"><i style="width:${Math.min(100,c/t.target*100)}%"></i></div></div><em>${done?'✓':fmt(c)+'/'+fmt(t.target)}</em></div>`;}).join('');
  el.innerHTML=`<div class="m63-card q77-card"><div class="q77-top"><b>NHIỆM VỤ</b><button data-q77="x" class="q77-x">✕</button></div>
   <div class="q77-tabs"><button data-q77="tab" data-t="d" aria-pressed="${D}">NGÀY · ${S.dp}/140</button><button data-q77="tab" data-t="w" aria-pressed="${!D}">TUẦN · ${S.wp}/600</button></div>
   <p class="q77-s">${D?'Đủ 100 năng động là nhận hết mốc ngày. Làm mới lúc 0 giờ (giờ VN).':'Đủ 500 điểm là nhận hết mốc tuần. Làm mới sáng thứ Hai.'}</p>${bar}<button class="m63-go q77-all ${ready()?'':'off'}" data-q77="all">NHẬN TẤT CẢ${ready()?' ✦':''}</button><div class="q77-list">${rows}</div></div>`;}
 roll();
 return {track,claim,claimAll,open,ready,state:()=>JSON.parse(JSON.stringify(S)),_set:o=>{Object.assign(S,o);save();}};
})();
