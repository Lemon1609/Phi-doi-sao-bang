'use strict';
// V77 · theo V77_SPEC (Gemini 23/10): Huy chương liên hoàn, Mid-Boss chương 4–9, Xếp hạng B/A/S/S+ cuối ải, Xu Tinh Anh, Tiệm Danh Dự.
//  • Huy chương: hạ trọn 1 đội hình (group30) trước khi có chiếc nào thoát → rơi huy chương lục giác (nảy −135 px/s 0,35 s, rơi 85 px/s,
//    nhặt trong 38 px, KHÔNG bị hút). Bậc ×1…×10 → 100…2000 điểm. Để rơi khỏi đáy → chuỗi về 0.
//  • Mid-Boss: ải thường ≥ 61, khi bắt đầu đợt 4 (sau đợt 3); máu 2,8× tinh anh; 1 pha 2 đòn (chạy bằng B75.runOn); 20 s không hạ → rút lui.
//    Hạ kịp: +1.500 điểm, xóa toàn bộ đạn, rơi 1 huy chương.
//  • Hạng: ải thường theo % diệt (mẫu số = quái đợt chính + mid-boss; không tính Tàu Vận Tải, đệ boss) / số lần trúng / Graze / bậc huy chương;
//    ải boss theo % diệt đợt mở màn / trúng / thời gian hạ boss. Thưởng: % hợp kim của trận + đá ⬢; Xu Tinh Anh lần đầu (S +1, S+ +3),
//    3 trận tự lái/ngày đạt S/S+ (+3/+4). Thử thách ngày +4/ngày, Tháp mỗi 5 tầng +10. 0 💎 (giữ BALANCE75).
//  • Tiệm Danh Dự (CỬA HÀNG › DANH DỰ): 6 món theo SHELF_6_ITEMS. Claude đổi "Đá tẩy khảm" → 1 đá khảm Lục (game tẩy bằng đá cùng bậc).
//  Tắt: window.V77=false.
const V77=(()=>{
 const SP=V77_SPEC,MV=SP.MEDAL_VISUAL_PHYSICS,RK=SP.STAGE_RANKING_RULES,SH=SP.HONOR_SHOP_AND_ECONOMY,TAU=Math.PI*2,KEY='saobang-v77r';
 let S={tok:0,best:{},day:{d:'',n:0},dc:'',shop:{},own:{},on:{},floors:0};try{Object.assign(S,JSON.parse(localStorage.getItem(KEY)||'{}'));}catch{}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const T=m=>{try{toast(m);}catch{}};const fmt=n=>Math.round(n).toLocaleString('vi-VN');
 const today=()=>new Date(Date.now()+7*3600000).toISOString().slice(0,10);
 const weekK=()=>{const d=new Date(Date.now()+7*3600000);d.setUTCDate(d.getUTCDate()-((d.getUTCDay()+6)%7));return d.toISOString().slice(0,10);};
 const on=()=>window.V77!==false;
 const playing=()=>typeof mode!=='undefined'&&mode==='play';
 function campaign(){if(window.__m78)return false;try{if(gameMode!=='campaign'||Dungeons.active()||Meta40.state().run)return false;if(O78.run&&O78.run())return false;if(Eclipse67.active())return false;}catch{}return true;}
 function addTok(n,why){if(n<=0)return;S.tok+=n;save();T('🎖 +'+n+' XU TINH ANH · '+why);}
 // ---------------- trạng thái trận ----------------
 let R=null;
 function newRun(){R={on:campaign(),stage:level|0,boss:(level|0)%5===0,spawn:0,kill:0,hits:0,graze:0,tier:0,maxTier:0,groups:new Map(),medals:[],mid:null,midDone:false,midSt:null,bossT0:null,bossT:null,last:null,texts:[]};}
 // ---------------- huy chương ----------------
 function dropMedal(x,y){if(!R)return;R.medals.push({x,y,vy:MV.INITIAL_BOUNCE_VY,t:0,tier:Math.min(10,R.tier+1)});}
 function medalTick(dt){const Hd=typeof H==='number'?H:1100;for(const m of R.medals){m.t+=dt;if(m.t<MV.BOUNCE_DURATION_SEC){m.y+=m.vy*dt;}else{m.y+=MV.TERMINAL_FALL_SPEED*dt;}m.tier=Math.min(10,R.tier+1);
   if(window.MEDAL183!==false){const dd=Math.hypot(m.x-player.x,m.y-player.y);if(dd<120&&dd>1){const a=Math.atan2(player.y-m.y,player.x-m.x),sp=Math.min(dd,520*dt);m.x+=Math.cos(a)*sp;m.y+=Math.sin(a)*sp;}}/* V183: chủ dự án chốt huy chương tự hút trong 120 px */
   if(Math.hypot(m.x-player.x,m.y-player.y)<MV.PICKUP_RADIUS_PX){m.got=1;R.tier=Math.min(10,R.tier+1);R.maxTier=Math.max(R.maxTier,R.tier);const v=MV.VALUES[R.tier-1];try{score+=v;}catch{}R.texts.push({x:m.x,y:m.y,t:0,s:'HUY CHƯƠNG ×'+R.tier+' (+'+fmt(v)+')'});}
   else if(m.y>Hd+20){m.lost=1;if(m.soft)continue;/* V209: huy chương thưởng tháp pháo lỡ rơi không làm đứt chuỗi */if(R.tier>0)R.texts.push({x:m.x,y:Hd-80,t:0,s:'CHUỖI HUY CHƯƠNG ĐỨT',bad:1});R.tier=0;}}
  R.medals=R.medals.filter(m=>!m.got&&!m.lost);for(const t of R.texts)t.t+=dt;R.texts=R.texts.filter(t=>t.t<1.2);}
 function hexPath(x,y,w,h){ctx.beginPath();ctx.moveTo(x,y-h/2);ctx.lineTo(x+w/2,y-h/4);ctx.lineTo(x+w/2,y+h/4);ctx.lineTo(x,y+h/2);ctx.lineTo(x-w/2,y+h/4);ctx.lineTo(x-w/2,y-h/4);ctx.closePath();}
 function drawMedals(){for(const m of R.medals){const c=m.tier>=10?MV.COLOR_TIERS.TIER_10:m.tier>=5?MV.COLOR_TIERS.TIER_5_9:MV.COLOR_TIERS.TIER_1_4,w=MV.WIDTH_PX,h=MV.HEIGHT_PX;ctx.save();
   if(m.t<.25){ctx.globalAlpha=1-m.t/.25;ctx.fillStyle='#ffffff';ctx.fillRect(m.x-30,m.y-1.5,60,3);ctx.globalAlpha=1;}
   ctx.fillStyle=c.bg;ctx.strokeStyle=c.border;ctx.lineWidth=2.5;if(c.pulseGlow){ctx.shadowColor=c.border;ctx.shadowBlur=10+6*Math.sin(m.t*8);}hexPath(m.x,m.y,w,h);ctx.fill();ctx.stroke();ctx.shadowBlur=0;
   ctx.beginPath();ctx.moveTo(m.x-w/2-6,m.y-3);ctx.lineTo(m.x-w/2,m.y);ctx.moveTo(m.x+w/2+6,m.y-3);ctx.lineTo(m.x+w/2,m.y);ctx.stroke();
   ctx.fillStyle=c.text;const q=w*.26,k=q*.32;ctx.beginPath();ctx.moveTo(m.x,m.y-q);ctx.lineTo(m.x+k,m.y-k);ctx.lineTo(m.x+q,m.y);ctx.lineTo(m.x+k,m.y+k);ctx.lineTo(m.x,m.y+q);ctx.lineTo(m.x-k,m.y+k);ctx.lineTo(m.x-q,m.y);ctx.lineTo(m.x-k,m.y-k);ctx.closePath();ctx.fill();ctx.restore();}
  for(const t of R.texts){ctx.save();ctx.globalAlpha=1-t.t/1.2;ctx.fillStyle=t.bad?'#ff8a9a':'#9ffff0';ctx.font="900 12px 'Neo',sans-serif";ctx.textAlign='center';ctx.fillText(t.s,t.x,t.y-30-t.t*30);ctx.restore();}
  if(R.tier>0){ctx.save();ctx.fillStyle='#00f5d4';ctx.font="800 11px 'Be Vietnam Pro',sans-serif";ctx.textAlign='left';ctx.fillText('🏅 CHUỖI ×'+R.tier,10,(typeof H==='number'?H:1100)*.16);ctx.restore();}}
 // ---------------- mid-boss ----------------
 function midSpec(){const ch=Math.min(9,Math.floor(((level|0)-1)/20)+1);return SP.MID_BOSSES_6['CH'+ch]||null;}
 function midTick(dt){if(!R.on||R.boss||R.midDone||(level|0)<61)return;let w=-1;try{w=Waves30.state().wave;}catch{}
  if(!R.mid&&w>=3&&!boss){const sp=midSpec();if(!sp){R.midDone=true;return;}R.midDone=true;
   const e=addEnemy({x:W/2,y:-60,v:0,type:4,large:true,elite:true,guard:0,hp:13*sp.hpEliteMultiplier,fire:1e9,age:0,phase:0,dead:false,mid77:1});
   if(e){e.burst30=0;e.max=e.maxHp||e.hp;e.t77=0;R.mid=e;R.midSt={sc:1};R.spawn++;try{toast('⚠ MID-BOSS · '+sp.name.toUpperCase()+' · 20 GIÂY');}catch{}}}
  const e=R.mid;if(!e)return;if(e.dead){R.mid=null;return;}e.fire=1e9;e.burst30=0;e.t77+=dt;const sp=midSpec(),Kh=(typeof H==='number'?H:1100)/1100;
  if(e.t77<sp.timeoutEscapeSec){e.y=Math.min(150*Kh,-60+e.t77*130);e.x=W/2+Math.sin(e.t77*.8)*110;if(e.y>=150*Kh-1)try{B75.runOn(R.midSt,e,sp.phases[0].moves,dt);}catch{}}
  else{e.y-=320*dt;if(e.y<-90){e.dead=true;e.esc77=1;R.mid=null;try{toast('MID-BOSS ĐÃ RÚT LUI');}catch{}}}}
 function midKill(e){R.kill++;if(e.t77<20){try{score+=1500;}catch{}for(const b of bullets)b.dead=true;try{VisualFX.explode(e.x,e.y,1.6,'enemy');toast('✦ HẠ MID-BOSS · +1.500 · XÓA ĐẠN');}catch{}dropMedal(e.x,e.y);}R.mid=null;}
 // ---------------- theo dõi trận ----------------
 function tick(dt){if(!R)newRun();if(!R.on)return;const Hd=typeof H==='number'?H:1100;
  for(const e of enemies){if(e.group30!==undefined&&!e.c77&&!e.carrier76&&!e.pod75&&!e.drone76){e.c77=1;R.spawn++;let g=R.groups.get(e.group30);if(!g){g={n:e.count30||1,k:0,esc:false};R.groups.set(e.group30,g);}}
   if(e.c77&&!e.dead&&e.y>Hd+30&&!e.esc77){e.esc77=1;const g=R.groups.get(e.group30);if(g)g.esc=true;}}
  const cur=Math.max(0,hp)+Math.max(0,shield);if(R.last!==null&&cur<R.last-1e-6)R.hits++;R.last=cur;
  if(boss&&!boss.dead){let ent=false;try{ent=C76run.entering();}catch{}if(!ent&&R.bossT0===null)R.bossT0=time;}
  medalTick(dt);midTick(dt);}
 function onKill(e){if(!R||!R.on)return;if(e.mid77){midKill(e);return;}if(!e.c77||e.k77)return;e.k77=1;R.kill++;const g=R.groups.get(e.group30);if(g){g.k++;if(g.k>=g.n&&!g.esc)dropMedal(e.x,e.y);}}
 // ---------------- chấm hạng ----------------
 const ORDER=['B','A','S','S_PLUS'],NAME={B:'B',A:'A',S:'S',S_PLUS:'S+'};
 function grade(){const kr=R.spawn?R.kill/R.spawn:1;
  if(!R.boss){const c=RK.NORMAL_STAGE_CRITERIA;if(kr>=c.S_PLUS.minKillRatio-1e-9&&R.hits<=c.S_PLUS.maxHits&&R.maxTier>=c.S_PLUS.minMedalTier)return 'S_PLUS';if(kr>=c.S.minKillRatio&&R.hits<=c.S.maxHits&&R.graze>=c.S.minGraze)return 'S';if(kr>=c.A.minKillRatio&&R.hits<=c.A.maxHits)return 'A';return 'B';}
  const c=RK.BOSS_STAGE_CRITERIA,bt=R.bossT??999,chap=R.stage%20===0;
  if(kr>=c.S_PLUS.minWaveKillRatio-1e-9&&R.hits<=c.S_PLUS.maxHits&&bt<=(chap?c.S_PLUS.maxBossClearSecChapter:c.S_PLUS.maxBossClearSecSub))return 'S_PLUS';
  if(kr>=c.S.minWaveKillRatio&&R.hits<=c.S.maxHits&&(bt<=c.S.maxBossClearSec||R.graze>=c.S.orMinGraze))return 'S';if(kr>=c.A.minWaveKillRatio&&R.hits<=c.A.maxHits)return 'A';return 'B';}
 let card=null;
 function finish(){if(!R||!R.on)return;if(R.boss&&R.bossT0!==null&&R.bossT===null)R.bossT=time-R.bossT0;const g=grade(),rw=RK.RANK_REWARDS[g],n=R.stage;let lines=[];
  let cr=0;try{cr=runCredits|0;}catch{}const al=Math.round(cr*rw.alloyBonus);if(al>0){try{Progress.grantCredits(al);}catch{}lines.push('+'+fmt(al)+' ◈ (+'+Math.round(rw.alloyBonus*100)+'%)');}
  const st=Math.round((rw.stoneBonus||0)*20);if(st>0){try{Workshop.grant({exp:st});}catch{}lines.push('+'+st+' ⬢');}
  const prev=S.best[n]||'B';let tok=0;if(ORDER.indexOf(g)>ORDER.indexOf(prev)){if(ORDER.indexOf(g)>=2&&ORDER.indexOf(prev)<2)tok+=RK.RANK_REWARDS.S.firstClearMasteryTokens;if(g==='S_PLUS')tok+=RK.RANK_REWARDS.S_PLUS.firstClearMasteryTokens;S.best[n]=g;}
  const RS=SH.RECURRING_TOKEN_SOURCES;if(S.day.d!==today())S.day={d:today(),n:0};if((g==='S'||g==='S_PLUS')&&S.day.n<RS.DAILY_MANUAL_S_RUNS_MAX){S.day.n++;tok+=g==='S'?RS.TOKENS_PER_MANUAL_S:RS.TOKENS_PER_MANUAL_S_PLUS;}
  save();if(tok)addTok(tok,'hạng '+NAME[g]+' ải '+n);
  showCard(g,lines,tok);R.on=false;}
 function showCard(g,lines,tok){if(!card){card=document.createElement('div');card.className='v77r';document.body.appendChild(card);card.addEventListener('click',()=>card.hidden=true);}
  const kr=R.spawn?Math.round(R.kill/R.spawn*100):100;card.dataset.g=g;
  card.innerHTML=`<em>${NAME[g]}</em><div><b>HẠNG ẢI ${R.stage}${g==='S_PLUS'?' · ★ BẠCH KIM':''}</b><small>Diệt ${kr}% · Trúng ${R.hits} · Graze ${R.graze}${R.boss?' · Boss '+(R.bossT!=null?Math.round(R.bossT)+' s':'—'):' · Huy chương ×'+R.maxTier}</small><small>${lines.join(' · ')||'Không thưởng thêm'}${tok?' · 🎖 +'+tok+' Xu':''}</small></div>`;card.hidden=false;clearTimeout(card._t);
  // gắn vào bảng CHIẾN THẮNG nếu tìm thấy (khỏi bị che); không thấy thì nổi giữa màn
  setTimeout(()=>{try{const host=[...document.querySelectorAll('h1,h2,h3,b,strong,div,span')].find(x=>x.children.length===0&&/CHIẾN THẮNG/.test(x.textContent)&&x.getClientRects().length);const pan=host&&host.closest('[class*="card"],[class*="panel"],[class*="c74"],section,#overlay');
   if(pan&&!pan.contains(card)){card.classList.add('in');const ref=[...pan.querySelectorAll('*')].find(x=>/ĐIỂM/.test(x.textContent)&&x.children.length===0);(ref&&ref.parentElement&&ref.parentElement!==pan?ref.parentElement:host.parentElement||pan).after?.(card);}}catch{}},120);}
 // ---------------- Tiệm Danh Dự ----------------
 const ITEMS=SH.SHELF_6_ITEMS.map(it=>it.id==='REROLL_STONE_1'?{...it,name:'Đá khảm Lục ngẫu nhiên (×1)'}:it);
 const used=it=>it.oneTimeOnly?(S.own[it.id]?1:0):(S.shop[it.id+'@'+weekK()]|0);
 const lim=it=>it.oneTimeOnly?1:it.weeklyLimit;
 function buy(id,arg){const it=ITEMS.find(x=>x.id===id);if(!it)return false;if(used(it)>=lim(it)){T(it.oneTimeOnly?'ĐÃ SỞ HỮU':'HẾT LƯỢT TUẦN NÀY');return false;}if(S.tok<it.costTokens){T('THIẾU XU TINH ANH');return false;}
  let ok=true;try{if(id==='REROLL_STONE_1'){const pos=['ship','armor','missiles','sidearm'];Stone71.give(Stone71.make(2,pos[Math.floor(Math.random()*4)],{ty:'stat'}));}
   else if(id==='PILOT_SHARD_SELECT_5'){const st=Pilot67.state();const p=st.team&&st.team[0]&&st.own[st.team[0]]?st.team[0]:Object.keys(st.own)[0];if(p==null){T('CHƯA CÓ PHI CÔNG');ok=false;}else{Pilot67._piece(+p,5);let nm='phi công';try{nm=PILOTS67.find(x=>x.id===+p).name;}catch{}window.__v77pp=' → +5 MẢNH · '+nm.toUpperCase()+' (CÓ '+(Pilot67.state().pieces[+p]|0)+')';}}
   else if(id==='BLUE_FODDER_SELECT'){if(!arg){T('CHỌN MÓN NHẬN PHÔI');ok=false;}else{const [k,m]=arg.split('|');V70.phAdd(k,k==='craft'?+m:m,2,1);}}}catch(e){ok=false;}
  if(!ok)return false;S.tok-=it.costTokens;if(it.oneTimeOnly){S.own[id]=1;S.on[id]=1;}else S.shop[id+'@'+weekK()]=used(it)+1;save();T('ĐÃ ĐỔI · '+it.name+(id==='PILOT_SHARD_SELECT_5'&&window.__v77pp?window.__v77pp:''));window.__v77pp='';return true;}
 let el=null,pick=false;
 function fodderTargets(){const out=[];try{let c=0;try{c=launchCraft|0;}catch{}out.push(['craft|'+c,'Chiến cơ đang dùng']);const eq=Progress.v70.equipped();for(const [k,id] of Object.entries(eq)){const it=Progress.v70.get(id);if(it)out.push(['gear|'+it.variant,{armor:'Giáp',missiles:'Tên lửa',sidearm:'Vũ khí phụ'}[k]+' · '+it.variant]);}}catch{}return out;}
 function open(){if(!el){el=document.createElement('div');el.className='m63 v77p';document.body.appendChild(el);el.addEventListener('click',e=>{const b=e.target.closest('[data-v77]');if(!b){if(e.target===el)el.hidden=true;return;}const a=b.dataset.v77;
   if(a==='x')el.hidden=true;else if(a==='buy'){if(b.dataset.id==='BLUE_FODDER_SELECT'){pick=!pick;render();return;}if(buy(b.dataset.id))render();}else if(a==='fod'){if(buy('BLUE_FODDER_SELECT',b.dataset.t)){pick=false;render();}}else if(a==='tg'){S.on[b.dataset.id]=!S.on[b.dataset.id];save();render();}});}
  render();el.hidden=false;}
 function render(){const wk=weekK();
  const rows=ITEMS.map(it=>{const u=used(it),L=lim(it),own=it.oneTimeOnly&&S.own[it.id];return `<div class="v77-it"><div><b>${it.name}</b><small>${it.oneTimeOnly?'1 lần':'tuần '+u+'/'+L} · ${it.costTokens} Xu${it.id==='TITLE_BULLET_DANCER'?' · +2% tốc độ bay':''}</small></div>${own?`<button data-v77="tg" data-id="${it.id}" class="${S.on[it.id]?'on':''}">${S.on[it.id]?'ĐANG BẬT':'ĐANG TẮT'}</button>`:`<button data-v77="buy" data-id="${it.id}" ${u>=L||S.tok<it.costTokens?'disabled':''}>${it.costTokens} 🎖</button>`}</div>`+(it.id==='BLUE_FODDER_SELECT'&&pick?`<div class="v77-pick">${fodderTargets().map(([t,n])=>`<button data-v77="fod" data-t="${t}">${n}</button>`).join('')}</div>`:'');}).join('');
  const best=Object.values(S.best),nS=best.filter(g=>g==='S').length,nP=best.filter(g=>g==='S_PLUS').length;
  el.innerHTML=`<div class="m63-card v75-card0"><div class="v75-top"><b>TIỆM DANH DỰ</b><button data-v77="x" class="v75-x">✕</button></div>
   <p class="v75-s">Xu Tinh Anh: <b>${fmt(S.tok)} 🎖</b> · Ải hạng S: <b>${nS}</b> · S+: <b>${nP}</b></p>
   <p class="v75-s">Kiếm Xu: lần đầu đạt S (+1) / S+ (+3) mỗi ải; 3 trận tự lái mỗi ngày đạt S/S+ (+3/+4); hoàn thành Thử thách ngày (+4); mỗi 5 tầng Tháp (+10). Đặt lại kệ tuần: thứ Hai.</p>
   <div class="v77-l">${rows}</div></div>`;}
 // hiệu ứng món mỹ phẩm & danh hiệu
 let prev=null;const trail=[];let gz=[];
 function cosmetics(dt){if(S.own.TITLE_BULLET_DANCER&&S.on.TITLE_BULLET_DANCER&&prev){player.x=Math.max(10,Math.min(W-10,prev.x+(player.x-prev.x)*1.02));player.y=Math.max(10,Math.min(H-10,prev.y+(player.y-prev.y)*1.02));}prev={x:player.x,y:player.y};
  if(S.own.TRAIL_NEON_GOLD&&S.on.TRAIL_NEON_GOLD){trail.push({x:player.x+(Math.random()-.5)*10,y:player.y+28,t:0});if(trail.length>40)trail.shift();}for(const p of trail){p.t+=dt;p.y+=60*dt;}for(const g of gz)g.t+=dt;gz=gz.filter(g=>g.t<.35);}
 function drawCos(){if(trail.length&&S.on.TRAIL_NEON_GOLD){ctx.save();ctx.globalCompositeOperation='lighter';for(const p of trail){const a=Math.max(0,1-p.t/.6);if(a<=0)continue;ctx.globalAlpha=a*.7;ctx.fillStyle='#ffd166';ctx.beginPath();ctx.arc(p.x,p.y,3.5*a+1,0,TAU);ctx.fill();}ctx.restore();}
  for(const g of gz){ctx.save();ctx.globalAlpha=1-g.t/.35;ctx.strokeStyle='#00ffaa';ctx.lineWidth=2;ctx.beginPath();ctx.arc(player.x,player.y,18+g.t*80,0,TAU);ctx.stroke();ctx.restore();}}
 // ---------------- cài đặt ----------------
 function install(){
  try{const ou=update;update=function(dt){const r=ou.apply(this,arguments);try{if(on()&&playing()){tick(dt);cosmetics(dt);}}catch(e){console.warn('V77',e);}return r;};}catch{}
  try{const ok=kill;kill=function(e){const was=e&&!e.dead;const r=ok.apply(this,arguments);try{if(on()&&was&&e.dead)onKill(e);}catch{}return r;};}catch{}
  try{const og=Combat26.graze;Combat26.graze=function(){const r=og.apply(this,arguments);try{if(r&&R){R.graze++;if(S.on.GRAZE_RING_CYBER&&S.own.GRAZE_RING_CYBER&&gz.length<4)gz.push({t:0});}}catch{}return r;};}catch{}
  try{const ors=reset;reset=function(){const r=ors.apply(this,arguments);try{newRun();if(card)card.hidden=true;}catch{}return r;};}catch{}
  try{const of=finishStage36;finishStage36=function(){const go=on()&&R&&R.on&&typeof mode!=='undefined'&&mode==='play'&&!stageFinished36;const r=of.apply(this,arguments);try{if(go&&stageFinished36)finish();}catch(e){console.warn('V77 rank',e);}return r;};}catch{}
  try{const orw=Progress.rewardStage;Progress.rewardStage=function(){const r=orw.apply(this,arguments);try{if(r&&Meta40.state().run){S.floors=(S.floors|0)+1;save();if(S.floors%5===0)addTok(SH.RECURRING_TOKEN_SOURCES.BOSS_TOWER_5FLOORS_TOKENS,'5 tầng Tháp');}}catch{}return r;};}catch{}
  try{const vd=VisualFX.draw;VisualFX.draw=function(){const r=vd.apply(this,arguments);try{if(on()&&(mode==='play'||mode==='pause')){if(R&&R.on)drawMedals();drawCos();}}catch{}return r;};}catch{}
  setInterval(()=>{try{const st=JSON.parse(localStorage.getItem('saobang-daily-v63')||'{}');if(st.done===today()&&S.dc!==today()){S.dc=today();save();addTok(SH.RECURRING_TOKEN_SOURCES.DAILY_CHALLENGE_S_TOKENS,'Thử thách ngày');}}catch{}},2000);}
 setTimeout(()=>{try{install();}catch(e){console.warn('V77 install',e);}},0);
 return {_drop:(x,y,soft)=>{if(!R)return false;dropMedal(x,y);if(soft)R.medals[R.medals.length-1].soft=1;return true;},open,buy,state:()=>JSON.parse(JSON.stringify(S)),run:()=>R&&{on:R.on,spawn:R.spawn,kill:R.kill,hits:R.hits,graze:R.graze,tier:R.tier,maxTier:R.maxTier,medals:R.medals.length,mid:!!(R.mid&&!R.mid.dead),midDone:R.midDone,bossT0:R.bossT0},
  grade:()=>R?grade():null,_set:o=>{Object.assign(S,o);save();},_drop:(x,y)=>dropMedal(x,y)};
})();
