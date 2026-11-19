'use strict';
// V75 · THỂ LỰC + THẺ THÁNG + QUÀ 7 NGÀY + VÉ CÀN QUÉT (Gemini PLAN75, người dùng chốt 23/10: THÊM hệ Thể lực, GIỮ 3.400 💎 quà 7 ngày).
//  • Thể lực 🔋: tối đa 120, hồi +1 mỗi 6 phút (tính cả khi tắt game). Chỉ tốn khi CHƠI LẠI ải chiến dịch đã qua (5) và khi càn quét (5).
//    Lần đầu qua ải luôn miễn phí → không chặn cốt truyện. Tháp, Vô tận, Thử thách ngày, Phó bản, Viễn chinh, Nguyệt Thực không tốn.
//    Quà/thẻ tháng có thể vượt trần (tối đa 999). Mua thêm: +100 🔋, giá 60/90/120 💎, 3 lần/ngày.
//  • Vé càn quét 🎫: khi hết 10 lượt miễn phí/ngày thì dùng vé.
//  • Thẻ tháng (1.200 💎, 30 ngày): nhận ngay 300 💎; mỗi ngày 70 💎 + 50 🔋 + 3 vé càn quét; +10% hợp kim & đá nâng cấp từ ải.
//  • Quà 7 ngày đầu: mỗi ngày đăng nhập nhận 1 mốc (không cần liên tiếp).
const PLAN75=Object.assign({
 ENERGY:{MAX:120,REGEN_MIN:5,HARD_CAP:999,REPLAY_COST:6,BOSS_COST:10,DUNGEON_COST:15,SWEEP_COST:6,/* BALANCE75 */BUY:{AMOUNT:100,DAILY_LIMIT:3,COSTS:[60,90,120]}},
 MONTHLY_PASS:{PRICE_GEM:1200,DURATION_DAYS:30,INSTANT_GEM:300,DAILY_GEM:70,DAILY_SWEEP_TICKETS:3,DAILY_ENERGY:50,DROP_BONUS_PERCENT:10},
 NEWBIE_LOGIN_7DAYS:[
  {day:1,gem:500,alloy:10000,r:null,t:''},
  {day:2,gem:300,alloy:15000,r:'ship_lam',t:'1 phôi Lam chiến cơ'},
  {day:3,gem:300,alloy:20000,r:'vktt_hunter',t:'20 mảnh VKTT Săn Sao'},
  {day:4,gem:400,alloy:25000,r:'gear_lam3',t:'3 phôi Lam trang bị'},
  {day:5,gem:400,alloy:30000,r:'pilot30',t:'30 mảnh phi công (phi công chính)'},
  {day:6,gem:500,alloy:40000,r:'stone_lam3',t:'3 đá khảm Lam'},
  {day:7,gem:1000,alloy:80000,r:'skin',t:'1 skin chưa có'}]},window.PLAN75||{});
const V75=(()=>{
 const KEY='saobang-v75';const E=PLAN75.ENERGY,MP=PLAN75.MONTHLY_PASS;
 let S={en:E.MAX,ts:Date.now(),tk:0,buy:{d:'',n:0},pass:{until:0,last:''},nb:{got:[],last:''},used:{}};
 try{Object.assign(S,JSON.parse(localStorage.getItem(KEY)||'{}'));}catch{}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const day=()=>{const d=new Date(Date.now()+7*3600000);return d.toISOString().slice(0,10);};
 const fmt=n=>Math.round(n).toLocaleString('vi-VN');
 const T=t=>{try{toast(t);}catch{}};
 const gems=()=>{try{return Econ74.gems();}catch{return 0;}};
 // ---------- thể lực ----------
 function tick(){const now=Date.now(),per=E.REGEN_MIN*60000;if(now<S.ts){S.ts=now;return;} // lùi giờ: không cộng
  if(S.en>=E.MAX){S.ts=now;return;}const n=Math.floor((now-S.ts)/per);if(n>0){S.en=Math.min(E.MAX,S.en+n);S.ts+=n*per;if(S.en>=E.MAX)S.ts=now;save();}}
 function addEn(n,why){tick();S.en=Math.min(E.HARD_CAP,S.en+n);save();paint();if(why)T('🔋 +'+n+' thể lực · '+why);}
 function useEn(n){tick();if(S.en<n)return false;const full=S.en>=E.MAX;S.en-=n;if(full)S.ts=Date.now();save();paint();try{Q77.track('energy',n);}catch{}return true;}
 const nextIn=()=>{tick();if(S.en>=E.MAX)return 0;return Math.max(0,E.REGEN_MIN*60000-(Date.now()-S.ts));};
 function buyEn(){const d=day();if(S.buy.d!==d)S.buy={d,n:0};if(S.buy.n>=E.BUY.DAILY_LIMIT){T('ĐÃ MUA ĐỦ '+E.BUY.DAILY_LIMIT+' LẦN HÔM NAY');return false;}const c=E.BUY.COSTS[S.buy.n];if(!Econ74.spend(c))return false;S.buy.n++;addEn(E.BUY.AMOUNT,'mua bằng '+c+' 💎');return true;}
 // ải chiến dịch nào đang được chơi lại?
 function replayStage(){if(window.__m78)return 0;try{if(document.getElementById('gamemode')?.value!=='campaign')return 0;if(Meta40.state().run)return 0;if(Dungeons.active())return -1;}catch{}
  try{if(Econ74._run())return 0;}catch{}try{if(typeof Rift307!=='undefined'&&Rift307._run())return 0;}catch{}/* V307 Khe Nứt: 0 thể lực */try{if(O78.run())return 0;}catch{}try{if(Eclipse67.active())return 0;}catch{}try{if(Play63.active())return 0;}catch{}try{if(Expedition67.active&&Expedition67.active())return 0;}catch{}
  const n=+document.getElementById('mission-select')?.value||0;try{return Progress.getState().cleared.includes(n)?n:0;}catch{return 0;}}
 let stN=0;const baseCost=()=>stN===-1?E.DUNGEON_COST:(stN%5===0?E.BOSS_COST:E.REPLAY_COST);
 const rc=()=>Math.round(baseCost()*(typeof window.ENERGY77==='function'?window.ENERGY77():1)*10)/10;
 let charged=false;
 const ors=window.reset;window.reset=function(){charged=false;const st=mode!=='play'?replayStage():0;stN=st;
  if(st){tick();if(S.en<rc()){T('THIẾU THỂ LỰC · cần '+rc()+' 🔋 (đang '+S.en+')');openPanel('energy');try{Lobby68.set('lobby');}catch{try{Lobby.show();}catch{}}return;}}
  const r=ors.apply(this,arguments);try{if(st&&mode==='play'){useEn(rc());charged=true;}}catch{}return r;};
 // càn quét: tốn thể lực, hết lượt miễn phí thì dùng vé
 try{const osw=Campaign36.sweep;Campaign36.sweep=function(n){tick();if(S.en<E.SWEEP_COST){T('THIẾU THỂ LỰC · càn quét cần '+E.SWEEP_COST+' 🔋');openPanel('energy');return false;}
   const r=osw.apply(this,arguments);
   if(r){useEn(E.SWEEP_COST);try{Q77.track('sweep',1);Q77.track('stage',1);}catch{}}return r;};}catch{}
 // ---------- thẻ tháng ----------
 const passOn=()=>Date.now()<(S.pass.until||0);
 const passDays=()=>Math.max(0,Math.ceil(((S.pass.until||0)-Date.now())/864e5));
 function buyPass(){if(passOn()){T('THẺ THÁNG ĐANG CÒN '+passDays()+' NGÀY');return false;}if(!Econ74.spend(MP.PRICE_GEM))return false;S.pass.until=Date.now()+MP.DURATION_DAYS*864e5;S.pass.last='';save();Econ74.add(MP.INSTANT_GEM,'thẻ tháng');passDaily();render();return true;}
 function passDaily(){if(!passOn())return;const d=day();if(S.pass.last===d)return;S.pass.last=d;save();Econ74.add(MP.DAILY_GEM,'thẻ tháng · ngày');addEn(MP.DAILY_ENERGY,'thẻ tháng');S.tk+=MP.DAILY_SWEEP_TICKETS;save();T('🎫 +'+MP.DAILY_SWEEP_TICKETS+' vé càn quét · thẻ tháng');}
 // +10% hợp kim & đá từ ải khi có thẻ tháng
 try{const orw=Progress.rewardStage;Progress.rewardStage=function(stage){const b0=Progress.balance();let e0=0;try{e0=Workshop.expBalance();}catch{}const r=orw.apply(this,arguments);try{if(passOn()){const dc=Progress.balance()-b0,de=Workshop.expBalance()-e0,k=MP.DROP_BONUS_PERCENT/100;if(dc>0)Progress.grantCredits(Math.round(dc*k));if(de>0)Workshop.grant({exp:Math.round(de*k)});}}catch{}return r;};}catch{}
 // ---------- quà 7 ngày đầu ----------
 const nbNext=()=>S.nb.got.length<7?PLAN75.NEWBIE_LOGIN_7DAYS[S.nb.got.length]:null;
 const nbReady=()=>{const n=nbNext();return !!n&&S.nb.last!==day();};
 function giveItem(r){try{
  if(r==='ship_lam'){const own=(Progress.getState().crafts||[0]);const all=[0,1,2,3,4,5,6,7,8,9];const pool=all.filter(i=>!own.includes(i));const i=(pool.length?pool:all)[Math.floor(Math.random()*(pool.length?pool:all).length)];V70.phAdd('craft',i,2,1);return;}
  if(r==='vktt_hunter'){Ult72.give({w:{hunter:20}});return;}
  if(r==='gear_lam3'){const ks=Object.keys(GearCatalog).filter(k=>!/36$/.test(k));for(let i=0;i<3;i++)V70.phAdd('gear',ks[Math.floor(Math.random()*ks.length)],2,1);return;}
  if(r==='pilot30'){const st=Pilot67.state();const id=st.team[0]&&st.own[st.team[0]]?st.team[0]:+(Object.keys(st.own)[0]||1);Pilot67._piece(id,30);return;}
  if(r==='stone_lam3'){const pos=['ship','armor','missiles','sidearm'];for(let i=0;i<3;i++)Stone71.give(Stone71.make(2,pos[i%4],{ty:'stat'}));return;}
  if(r==='skin'){const own=Trade67.state().owned||[];const L=(typeof SKINS67!=='undefined'?SKINS67:[]).filter(s=>!own.includes(s.id)&&!s.soon);if(L.length)Trade67._own(L[Math.floor(Math.random()*L.length)].id);else Econ74.add(300,'skin đã đủ → quy đổi');return;}
 }catch(e){console.warn('V75 qua',r,e);}}
 function claimNb(){if(!nbReady())return false;const n=nbNext();S.nb.got.push(n.day);S.nb.last=day();save();Econ74.add(n.gem,'quà ngày '+n.day);try{Progress.grantCredits(n.alloy);}catch{}if(n.r)giveItem(n.r);T('🎁 QUÀ NGÀY '+n.day+' · '+n.gem+' 💎 · '+fmt(n.alloy)+' ◈'+(n.t?' · '+n.t:''));render();return true;}
 // ---------- giao diện ----------
 function paint(){tick();const p=document.querySelector('#hgr41 .h1-power .gem74');if(p&&!p.querySelector('.en75')){const b=document.createElement('button');b.type='button';b.className='en75';b.innerHTML='🔋 <b data-en75>0</b><small>/'+E.MAX+'</small>';b.onclick=e=>{e.stopPropagation();openPanel('energy');};p.appendChild(b);}
  document.querySelectorAll('[data-en75]').forEach(e=>e.textContent=fmt(S.en));
  const rb=document.querySelector('#hgr41 [data-n74=gifts] .n74d');if(rb&&nbReady())rb.hidden=false;}
 let el=null,tab='energy';
 function openPanel(t){tab=t||tab;if(!el){el=document.createElement('div');el.className='m63 v75p';document.body.appendChild(el);el.addEventListener('click',e=>{const b=e.target.closest('[data-v75]');if(!b){if(e.target===el)el.hidden=true;return;}const a=b.dataset.v75;
   if(a==='x')el.hidden=true;else if(a==='tab'){tab=b.dataset.t;render();}else if(a==='buyen'){buyEn();render();}else if(a==='pass')buyPass();else if(a==='nb')claimNb();});}
  render();el.hidden=false;}
 function render(){if(!el||el.hidden&&!el.isConnected)return;tick();const ms=nextIn(),mm=Math.floor(ms/60000),ss=Math.floor(ms/1000)%60;const d=day();const bn=S.buy.d===d?S.buy.n:0;let body='';
  if(tab==='energy')body=`<div class="v75-big">🔋 <b>${fmt(S.en)}</b><small>/ ${E.MAX}</small></div><p class="v75-s">${S.en>=E.MAX?'Đầy':'+1 sau '+mm+':'+String(ss).padStart(2,'0')+' · hồi 1 mỗi '+E.REGEN_MIN+' phút'}</p>
   <p class="v75-s">Chơi lại ải thường: <b>${E.REPLAY_COST} 🔋</b> · ải Boss: <b>${E.BOSS_COST} 🔋</b> · Phó bản tài nguyên: <b>${E.DUNGEON_COST} 🔋</b> · Càn quét: <b>${E.SWEEP_COST} 🔋</b>/ải · Lần đầu qua ải: miễn phí.<br>Tháp, Vô tận, Thử thách ngày, Sự kiện giới hạn, Viễn chinh, Vượt Hạn: không tốn.</p>
   <p class="v75-s">🎫 Vé càn quét: <b>${S.tk}</b> (dùng khi hết ${window.SWEEP92?SWEEP92():10} lượt miễn phí)</p>
   <button class="m63-go ${bn<E.BUY.DAILY_LIMIT?'':'off'}" data-v75="buyen">MUA +${E.BUY.AMOUNT} 🔋 · ${bn<E.BUY.DAILY_LIMIT?E.BUY.COSTS[bn]+' 💎':'hết lượt'} (${bn}/${E.BUY.DAILY_LIMIT})</button>`;
  else if(tab==='pass')body=`<div class="v75-card"><b>THẺ THÁNG</b><small>${passOn()?'Còn '+passDays()+' ngày':'30 ngày'}</small><ul><li>Nhận ngay <b>${MP.INSTANT_GEM} 💎</b></li><li>Mỗi ngày: <b>${MP.DAILY_GEM} 💎</b> + <b>${MP.DAILY_ENERGY} 🔋</b> + <b>${MP.DAILY_SWEEP_TICKETS} 🎫</b></li><li><b>+${MP.DROP_BONUS_PERCENT}%</b> hợp kim và đá nâng cấp từ ải</li><li>Tổng 30 ngày: ${fmt(MP.INSTANT_GEM+MP.DAILY_GEM*MP.DURATION_DAYS)} 💎</li></ul>
   <button class="m63-go ${passOn()?'off':''}" data-v75="pass">${passOn()?'ĐANG HOẠT ĐỘNG':'MUA · '+fmt(MP.PRICE_GEM)+' 💎'}</button></div><p class="v75-s">Bạn đang có ${fmt(gems())} 💎</p>`;
  else body=`<div class="v75-nb">${PLAN75.NEWBIE_LOGIN_7DAYS.map(n=>{const got=S.nb.got.includes(n.day),cur=!got&&nbNext()&&nbNext().day===n.day;return `<div class="v75-d ${got?'got':''} ${cur?'cur':''}"><i>Ngày ${n.day}</i><b>${fmt(n.gem)} 💎</b><small>${fmt(n.alloy)} ◈${n.t?'<br>'+String(n.t).replace(/ \(phi công chính\)/,'').replace(/ Lv1/g,'').replace(/ chiến cơ$/,' (tàu)').replace(/ trang bị$/,' (TB)').replace(/^1 skin chưa có$/,'1 skin mới'):''}</small>${got?'<em>✓</em>':''}</div>`;}).join('')}</div>
   ${nbNext()?`<button class="m63-go ${nbReady()?'':'off'}" data-v75="nb">${nbReady()?'NHẬN QUÀ NGÀY '+nbNext().day:'Mai quay lại nhận ngày '+nbNext().day}</button>`:'<p class="v75-s">Đã nhận đủ 7 ngày.</p>'}`;
  el.innerHTML=`<div class="m63-card v75-card0"><div class="v75-top"><b>${tab==='energy'?'THỂ LỰC':tab==='pass'?'THẺ THÁNG':'QUÀ 7 NGÀY ĐẦU'}</b><button data-v75="x" class="v75-x">✕</button></div>
   <div class="v75-tabs">${[['energy','🔋 Thể lực'],['pass','💳 Thẻ tháng'],['nb','🎁 7 ngày']].map(([k,n])=>`<button data-v75="tab" data-t="${k}" aria-pressed="${k===tab}">${n}${k==='nb'&&nbReady()?' <em>!</em>':''}</button>`).join('')}</div>${body}</div>`;}
 setInterval(()=>{try{tick();passDaily();paint();if(el&&!el.hidden&&tab==='energy')render();}catch{}},1000);
 return {takeTk:()=>{if(S.tk>0){S.tk--;save();T('🎫 dùng 1 vé càn quét · còn '+S.tk);return true;}return false;},energy:()=>{tick();return S.en;},addEn,useEn,buyEn,tickets:()=>S.tk,addTk:n=>{S.tk+=n;save();},passOn,buyPass,claimNb,nbReady,open:openPanel,state:()=>JSON.parse(JSON.stringify(S)),_set:o=>{Object.assign(S,o);save();}};
})();
