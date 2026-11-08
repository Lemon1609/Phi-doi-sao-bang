'use strict';
// V63 · Lối chơi: (1) dải thông báo lớn trong trận · (2) Sao theo mục tiêu · (3) gợi ý Graze/Bạo Tẩu · (4) Sao lưu nhanh ở Kho · (5) Thử thách ngày.
const Play63=(()=>{
 const TAU=Math.PI*2,$=id=>document.getElementById(id);
 const LS={get(k,d){try{const v=JSON.parse(localStorage.getItem(k)||'null');return v==null?d:v;}catch{return d;}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch{}}};
 // ================= (1) DẢI THÔNG BÁO =================
 let BN=null;
 function banner(lines,dur=3.2,col='#7fe8ff'){try{if(window.Row79&&Row79.banner(lines,dur,col)){BN=null;return;}}catch{}BN={lines,t:0,dur,col};}  // V79: khung banner UI18b (DOM)
 function drawBanner(dt){if(!BN)return;BN.t+=dt;if(BN.t>BN.dur){BN=null;return;}const u=BN.t/BN.dur,a=u<.1?u/.1:u>.85?(1-u)/.15:1,h=24+BN.lines.length*20,y=Math.round(H*.2);
  ctx.save();ctx.globalAlpha=a;ctx.fillStyle='rgba(4,10,24,.82)';ctx.fillRect(18,y,W-36,h);ctx.fillStyle=BN.col;ctx.fillRect(18,y,W-36,2);ctx.fillRect(18,y+h-2,W-36,2);
  ctx.textAlign='center';ctx.textBaseline='middle';BN.lines.forEach((l,i)=>{ctx.font=(i?'600 13px':'800 15px')+" 'Be Vietnam Pro',Neo,sans-serif";ctx.fillStyle=i?'#e8f6ff':BN.col;ctx.fillText(l,W/2,y+16+i*20);});ctx.restore();}
 // ================= (2) SAO THEO MỤC TIÊU (V64 theo Gemini) =================
 //  ★1 Qua ải · ★2 Không mất máu VÀ giáp không tụt dưới 50% giáp đầu ải · ★3 mục tiêu riêng (ch = ceil(ải/20)):
 //   ải boss: hạ boss ≤ 45+4·ch s (mini) / ≤ 75+6·ch s (major);
 //   ải thường, idx=(ải − floor(ải/5)) % 4: 1 không dùng bom · 2 lách sát đạn ≥ 6+2·ch · 3 hạ hết tinh anh xuất hiện · 0 kích Bạo Tẩu ≥ 2 lần.
 //   Lượt có Van hỗ trợ (khởi đầu W2/W3) tối đa 2★. Thử thách ngày không tính sao.
 const S={on:false,lv:0,hpLost:false,shLow:false,sh0:0,bombs:0,g0:0,bossT0:null,bossTime:null,eSpawn:0,eKill:0,od:0,prevSup:0,assisted:false};
 const chOf=lv=>Math.max(1,Math.ceil(lv/20));
 // V79 · nới điều kiện 3★ (chủ dự án: quá khó) — số chốt Gemini REVIEW79: máu ★2 giảm dần theo chương vì đạn chương sau đau hơn
 const ST79=Object.assign({hp:[.6,.6,.55,.5,.45,.45,.4,.4],mini:[65,6],major:[95,10],graze:[3,1],elite:.65,od:1,odMaxPass:true},window.STAR79||{});
 const hpNeed=lv=>ST79.hp[Math.min(7,chOf(lv)-1)];
 const hpTxt=lv=>'Còn ≥ '+Math.round(hpNeed(lv)*100)+'% máu';
 window.STAR79TXT=lv=>({hp:hpTxt(lv),o3:obj3(lv).txt});
 function obj3(lv){const ch=chOf(lv);let k=null;try{k=Campaign36.bossKind(lv);}catch{}
  if(k){const lim=k==='major'?ST79.major[0]+ch*ST79.major[1]:ST79.mini[0]+ch*ST79.mini[1];return {id:'boss',lim,txt:'Hạ boss trong '+lim+' giây'};}
  const idx=(lv-Math.floor(lv/5))%4;
  if(idx===1)return {id:'nobomb',txt:'Không dùng bom'};
  if(idx===2){const n=ST79.graze[0]+ch*ST79.graze[1];return {id:'graze',n,txt:'Lách sát đạn ≥ '+n+' lần'};}
  if(idx===3)return {id:'elite',txt:'Hạ ≥ '+Math.round(ST79.elite*100)+'% quái tinh anh'};
  return {id:'od',n:ST79.od,txt:'Kích Bạo Tẩu ≥ '+ST79.od+' lần (hoặc hỏa lực tối đa)'};}
 const grazes=()=>{try{return Combat26.state().grazes||0;}catch{return 0;}};
 function begin(){if(gameMode!=='campaign'||Daily.active()){S.on=false;return;}
  Object.assign(S,{on:true,lv:level,hpLost:false,shLow:false,sh0:shield,bombs:0,g0:grazes(),bossT0:null,bossTime:null,eSpawn:0,eKill:0,od:0,prevSup:superTime});
  try{S.assisted=Balance48.assisted()===level;}catch{S.assisted=false;}try{Evo53.resetStage();}catch{}
  const o=obj3(level);setTimeout(()=>{if(mode==='play'&&S.on)banner(['MỤC TIÊU ★ · ẢI '+level,'★ Qua ải   ★ '+hpTxt(level),'★ '+o.txt].concat(S.assisted?['(Đang nhận hỗ trợ vượt ải: tối đa 2★)']:[]),3.6,'#ffd54a');},700);}
 function track(){if(!S.on||mode!=='play')return;if(S.sh0>0&&shield<S.sh0*.5-1e-6)S.shLow=true;
  for(const e of enemies){if(e.elite&&!e.c64){e.c64=1;S.eSpawn++;}}
  if(superTime>0&&S.prevSup<=0)S.od++;S.prevSup=superTime;
  if(boss&&S.bossT0==null)S.bossT0=time;if(S.bossT0!=null&&S.bossTime==null&&!boss)S.bossTime=time-S.bossT0;}
 function result(){if(S.bossT0!=null&&S.bossTime==null&&!boss)S.bossTime=time-S.bossT0;const o=obj3(S.lv),g=grazes()-S.g0;let m3=false;
  if(o.id==='boss')m3=S.bossTime!=null&&S.bossTime<=o.lim;else if(o.id==='nobomb')m3=S.bombs===0;else if(o.id==='graze')m3=g>=o.n;else if(o.id==='elite')m3=S.eSpawn===0||S.eKill>=Math.ceil(S.eSpawn*ST79.elite);else m3=S.od>=o.n||(ST79.odMaxPass&&typeof power==='number'&&power>=5);
  let hpR=1;try{hpR=maxHp>0?hp/maxHp:1;}catch{}const hpOk=window.SHIELD78===false?(!S.hpLost&&!S.shLow):hpR>=hpNeed(S.lv)-1e-6;let stars=1+(hpOk?1:0)+(m3?1:0);if(S.assisted)stars=Math.min(2,stars);
  return {stars,hp:hpOk,m3,o,g,bossTime:S.bossTime,bombs:S.bombs,elites:[S.eKill,S.eSpawn],od:S.od,assisted:S.assisted};}
 const oldStar=Report392.starScore;Report392.starScore=function(){try{if(Daily.recent())return 1;if(S.on&&S.lv===level){const r=result();setTimeout(()=>{try{toast('★'.repeat(r.stars)+'☆'.repeat(3-r.stars)+' · '+hpTxt(S.lv)+' '+(r.hp?'✓':'✗')+' · '+r.o.txt+' '+(r.m3?'✓':'✗')+(r.assisted?' · có hỗ trợ (tối đa 2★)':''));}catch{}},400);return r.stars;}}catch{}return oldStar.apply(this,arguments);};
 const oldHtml=Report392.html;Report392.html=function(){let x=oldHtml.apply(this,arguments);try{if(S.on){const r=result();x+=`<div class="summary392"><b>SAO ẢI ${S.lv}: ${'★'.repeat(r.stars)}${'☆'.repeat(3-r.stars)}</b><p>✓ Qua ải · ${r.hp?'✓':'✗'} ${hpTxt(S.lv)} · ${r.m3?'✓':'✗'} ${r.o.txt}${r.assisted?' · (có hỗ trợ: tối đa 2★)':''}</p></div>`;}}catch{}return x;};
 // ================= (3) GỢI Ý GRAZE =================
 const HK='saobang-hint-v63';const hint=LS.get(HK,{});
 try{const og=Combat26.graze;Combat26.graze=function(){const r=og.apply(this,arguments);try{if(r&&mode==='play'){if(!hint.graze){hint.graze=1;LS.set(HK,hint);banner(['LÁCH SÁT ĐẠN!','Bay sát đạn địch (không chạm) để nạp thanh GRAZE','Đầy thanh → TĂNG CẤP ĐẠN, cấp tối đa → BẠO TẨU'],4.2,'#63e9ff');}
   else if(!hint.half&&(Combat26.state().charge||0)>=50){hint.half=1;LS.set(HK,hint);banner(['THANH GRAZE 50%','Lách thêm đạn để kích hoạt sức mạnh!'],2.8,'#63e9ff');}}}catch{}return r;};}catch{}
 // ================= (5) THỬ THÁCH NGÀY (V64 theo Gemini) =================
 //  Chế độ riêng: không tính sao chiến dịch, không bật Van hỗ trợ, không đếm lần thua. 10 luật xoay vòng theo ngày.
 //  Thưởng: 200 + 18·ải + 50·chương hợp kim + vật liệu ×2; chuỗi ngày +10%/ngày (tối đa +40%).
 const Daily=(()=>{
  const KEY='saobang-daily-v63';let st=LS.get(KEY,{done:'',streak:0,last:''});let act=null,endedAt=0;
  const RULES=[
   {id:'fast',name:'ĐẠN CUỒNG PHONG',txt:'Đạn địch bay nhanh hơn 30%',bk:1.3},
   {id:'one',name:'MỘT MẠNG',txt:'Chỉ 1 máu, giáp còn một nửa'},
   {id:'nobomb',name:'TAY KHÔNG',txt:'Không có bom, Bạo Tẩu ngắn hơn 25%'},
   {id:'steel',name:'QUÁI THÉP',txt:'Quái thường và tinh anh trâu hơn 75%',hk:1.75},
   {id:'storm',name:'BÃO ĐẠN',txt:'Đạn nhanh hơn 20%, quái trâu hơn 35%',bk:1.2,hk:1.35},
   {id:'magnet',name:'BÃO TỪ TRƯỜNG',txt:'Nam châm tắt: phải bay tới chạm buff mới nhặt được'},
   {id:'heat',name:'QUÁ TẢI NHIỆT',txt:'Đạn tối đa cấp W3, lách đạn nạp Graze nhanh gấp 1,8'},
   {id:'close',name:'TỬ CHIẾN TẦM GẦN',txt:'Ở nửa trên màn hình: sát thương ×1,5 · nửa dưới: ×0,6'},
   {id:'kami',name:'ĐỘI HÌNH CẢM TỬ',txt:'Quái bị hạ ở nửa dưới màn hình bắn trả 1 viên đạn'},
   {id:'scarce',name:'KHAN HIẾM TIẾP TẾ',txt:'Không rơi SIÊU CẤP, boss trâu hơn 30%'}];
  const rule=()=>act&&mode==='play'&&level===act.lv?act.rule.id:'';
  function today(){const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
  function seed(s){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;}
  function plan(){const day=today(),h=seed(day);let cl=[1];try{cl=Progress.getState().cleared;}catch{}const mx=Math.max(1,...cl);let lv=Math.max(1,mx-(h%6));try{while(lv>1&&!Progress.canStart(lv))lv--;}catch{}
   const r=RULES[(h>>>3)%RULES.length],credits=200+18*lv+50*chOf(lv);return {day,lv,rule:r,credits};}
  const doneToday=()=>st.done===today();
  function start(){const p=plan();if(doneToday()||['play','pause','reward'].includes(mode))return false;
   try{$('gamemode').value='campaign';syncModeSetup();}catch{}$('mission-select').value=String(p.lv);try{Campaign36.render(p.lv);}catch{}
   try{Hangar41.close();}catch{}try{Lobby.hide();}catch{}act={...p,applied:false,mag:null,prevSup:0};close();reset();return true;}
  function end(){if(act&&act.mag!=null){try{gear.magnet=act.mag;}catch{}}act=null;endedAt=Date.now();}
  function frame(){if(!act)return;if(mode==='over'||(mode!=='play'&&mode!=='pause'&&mode!=='reward')){end();return;}
   if(mode==='reward'){if(level===act.lv&&!doneToday())win();end();return;}
   if(mode!=='play'||level!==act.lv)return;const r=act.rule;
   if(!act.applied){act.applied=true;banner(['THỬ THÁCH NGÀY · ẢI '+act.lv,r.name,r.txt],3.6,'#ff8a5c');if(r.id==='one')shield=shield*.5;if(r.id==='magnet'){act.mag=gear.magnet||0;}}
   if(r.id==='one'&&hp>1)hp=1;if(r.id==='nobomb'&&bombs>0)bombs=0;
   if(r.id==='nobomb'){if(superTime>0&&act.prevSup<=0)superTime*=.75;act.prevSup=superTime;}
   if(r.id==='magnet')gear.magnet=-70;
   if(r.id==='heat'&&power>3){power=3;powerUpgrades=2;}
   if(r.id==='close'){const f=player.y<H*.5?1.5:.6;for(const s of shots){if(s.d64)continue;s.d64=1;if(Number.isFinite(s.damage))s.damage*=f;}}
   if(r.id==='scarce')for(const d of drops)if(!d.dead&&d.type==='super')d.dead=true;
   if(r.bk)for(const b of bullets){if(b.d63)continue;b.d63=1;if(Number.isFinite(b.vx)){b.vx*=r.bk;b.vy*=r.bk;}if(Number.isFinite(b.speed))b.speed*=r.bk;}
   if(r.hk)for(const e of enemies){if(e.d63||e===boss||e.bossPart)continue;e.d63=1;e.hp*=r.hk;if(Number.isFinite(e.max))e.max*=r.hk;if(Number.isFinite(e.maxHp))e.maxHp*=r.hk;}}
  function win(){const p=plan(),y=new Date(Date.now()-864e5),yd=y.getFullYear()+'-'+String(y.getMonth()+1).padStart(2,'0')+'-'+String(y.getDate()).padStart(2,'0');
   st.streak=st.last===yd?(st.streak||0)+1:1;st.last=p.day;st.done=p.day;LS.set(KEY,st);
   const bonus=Math.min(5,st.streak),credits=Math.round(act.credits*(1+.1*(bonus-1)));try{Progress.grantCredits(credits);}catch{}try{Workshop.rollStage(act.lv,selected);Workshop.rollStage(act.lv,selected);Progress.render();}catch{}
   setTimeout(()=>{try{toast('★ THỬ THÁCH NGÀY HOÀN THÀNH · +'+credits+' hợp kim · chuỗi '+st.streak+' ngày');}catch{}},900);}
  // ---- móc luật vào game ----
  try{const og=Combat26.graze;Combat26.graze=function(){const r=og.apply(this,arguments);try{if(r&&rule()==='heat')Combat26.addCharge07(4);}catch{}return r;};}catch{}
  try{const of=Combat.factor;Combat.factor=function(){const v=of.apply(this,arguments);const r=rule();return r==='close'?v*(player.y<H*.5?1.5:.6):v;};}catch{}
  try{const ok=window.kill;kill=function(e){const was=e&&!e.dead;const rv=ok.apply(this,arguments);try{if(was&&e.dead&&rule()==='kami'&&e!==boss&&!e.bossPart&&!e.meteor&&e.y>H*.45){const a=Math.atan2(player.y-e.y,player.x-e.x),sp=170*enemyScale();Safety31.push(bullets,180,{x:e.x,y:e.y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,r:5,type:'orb',age:0,d63:1});}}catch{}return rv;};}catch{}
  try{const osb=Combat26.setupBoss;Combat26.setupBoss=function(b){try{if(b&&!b.bossHealthReady&&act&&act.rule.id==='scarce'&&level===act.lv)b.max*=1.3;}catch{}return osb.apply(this,arguments);};}catch{}
  // ---- bảng ----
  function close(){const m=$('m63-daily');if(m)m.remove();}
  function open(){close();const p=plan(),d=doneToday();const el=document.createElement('div');el.id='m63-daily';el.className='m63';
   el.innerHTML=`<div class="m63-card"><div class="m63-eye">THỬ THÁCH NGÀY · ${p.day.split('-').reverse().join('/')}</div><h3>${p.rule.name}</h3><p class="m63-rule">${p.rule.txt}</p>
    <div class="m63-row"><span>Ải</span><b>${p.lv}</b></div><div class="m63-row"><span>Thưởng</span><b>${p.credits} hợp kim + vật liệu ×2</b></div><div class="m63-row"><span>Chuỗi ngày</span><b>${st.streak||0} (thưởng +10%/ngày, tối đa +40%)</b></div>
    <p class="m63-note">${d?'✓ Đã hoàn thành hôm nay. Quay lại ngày mai!':'Mỗi ngày 1 lần nhận thưởng. Luật và ải đổi theo ngày. Không tính sao chiến dịch, không có hỗ trợ vượt ải.'}</p>
    <div class="m63-btns"><button class="m63-go" ${d?'disabled':''}>BẮT ĐẦU</button><button class="m63-x">ĐÓNG</button></div></div>`;
   document.body.appendChild(el);el.querySelector('.m63-go').onclick=start;el.querySelector('.m63-x').onclick=close;el.onclick=e=>{if(e.target===el)close();};}
  return {open,close,frame,plan,rules:RULES,active:()=>!!act,recent:()=>!!act||Date.now()-endedAt<4000,state:()=>({...st,act:act&&{lv:act.lv,rule:act.rule.id}}),_force:(p)=>{act=p;}};
 })();
 // ================= (4) SAO LƯU NHANH =================
 function openBackup(){closeBackup();const el=document.createElement('div');el.id='m63-save';el.className='m63';
  el.innerHTML=`<div class="m63-card"><div class="m63-eye">LƯU & SAO LƯU TIẾN TRÌNH</div><h3>MÃ SAO LƯU</h3><p class="m63-note">Tiến trình lưu trong trình duyệt. Xóa dữ liệu trình duyệt hoặc đổi máy sẽ mất. Hãy sao chép mã hoặc tải file để giữ an toàn.</p>
   <textarea class="m63-code" rows="5" placeholder="Dán mã sao lưu vào đây để khôi phục…"></textarea><p class="m63-st" role="status"></p>
   <div class="m63-btns"><button class="m63-copy">SAO CHÉP MÃ</button><button class="m63-file">TẢI FILE</button></div>
   <div class="m63-btns"><button class="m63-check">KIỂM TRA MÃ</button><button class="m63-restore" disabled>KHÔI PHỤC</button></div>
   <div class="m63-btns"><button class="m63-x">ĐÓNG</button></div></div>`;
  document.body.appendChild(el);const ta=el.querySelector('.m63-code'),stt=el.querySelector('.m63-st'),rb=el.querySelector('.m63-restore');
  el.querySelector('.m63-copy').onclick=async()=>{try{DeviceSave.flush();}catch{}ta.value=DeviceSave.encode();try{await navigator.clipboard.writeText(ta.value);stt.textContent='✓ Đã sao chép mã ('+Math.round(ta.value.length/1024)+' KB). Dán vào ghi chú / Zalo để giữ.';}catch{ta.select();stt.textContent='Mã đã hiện bên trên, nhấn giữ để sao chép.';}};
  el.querySelector('.m63-file').onclick=()=>{try{document.getElementById('device-backup').click();stt.textContent='✓ Đã tạo file sao lưu (.json).';}catch{stt.textContent='Không tạo được file.';}};
  el.querySelector('.m63-check').onclick=()=>{const inp=$('save-code-input');if(!inp){stt.textContent='Không tìm thấy bộ khôi phục.';return;}inp.value=ta.value;const ok=DeviceSave.readCode();const pv=$('device-restore-preview'),ss=$('save-code-status');stt.textContent=(ok?'✓ ':'')+((ok&&pv&&pv.textContent)||(ss&&ss.textContent)||'');rb.disabled=!ok;};
  rb.onclick=()=>{if(!confirmRestore())return;stt.textContent='Đang khôi phục…';DeviceSave.restore();};
  el.querySelector('.m63-x').onclick=closeBackup;el.onclick=e=>{if(e.target===el)closeBackup();};}
 let confirmT=0;function confirmRestore(){const now=Date.now();if(now-confirmT<4000)return true;confirmT=now;const s=document.querySelector('#m63-save .m63-st');if(s)s.textContent='Bấm KHÔI PHỤC lần nữa để xác nhận: tiến trình hiện tại sẽ bị thay.';return false;}
 function closeBackup(){const m=$('m63-save');if(m)m.remove();}
 // nút ở cột bên của Kho
 function hangarButtons(){const hg=$('hgr41');if(!hg||hg.hidden)return;const side=hg.querySelector('.h1-side');if(!side)return;
  if(!side.querySelector('[data-m63="daily"]')){const b=document.createElement('button');b.dataset.m63='daily';b.textContent='THỬ THÁCH NGÀY';b.addEventListener('click',e=>{e.stopPropagation();Daily.open();});side.appendChild(b);}
  if(!side.querySelector('[data-m63="save"]')){const b=document.createElement('button');b.dataset.m63='save';b.textContent='SAO LƯU';b.addEventListener('click',e=>{e.stopPropagation();openBackup();});side.appendChild(b);}
  const db=side.querySelector('[data-m63="daily"]');if(db)db.classList.toggle('m63-dot',Daily.plan&&LS.get('saobang-daily-v63',{}).done!==Daily.plan().day);}
 setInterval(()=>{try{hangarButtons();}catch{}},700);
 // chú thích sao trong bảng chọn ải cũ
 setTimeout(()=>{try{const p=document.querySelector('.sweep392 p');if(p)p.textContent='Sao: qua ải = 1★; không mất máu và giáp không tụt dưới 50% = +1★; mục tiêu riêng (hạ boss nhanh / không bom / lách đạn / hạ hết tinh anh / Bạo Tẩu 2 lần) = +1★. Lượt có hỗ trợ vượt ải tối đa 2★. Đủ 3★ mở Càn quét.';}catch{}},1500);
 // ================= gắn vào game =================
 const ors=window.reset;reset=function(){const r=ors.apply(this,arguments);try{if(mode==='play')begin();}catch{}return r;};
 const ons=window.nextStage;nextStage=function(){const r=ons.apply(this,arguments);try{if(mode==='play')begin();}catch{}return r;};
 const odm=window.damage;damage=function(){const h0=hp;const r=odm.apply(this,arguments);try{if(hp<h0)S.hpLost=true;}catch{}return r;};
 const obm=window.bomb;bomb=function(){const b0=bombs;const r=obm.apply(this,arguments);try{if(bombs<b0)S.bombs++;}catch{}return r;};
 const oup=Waves30.update;Waves30.update=function(dt){const r=oup.apply(this,arguments);try{track();Daily.frame();}catch{}return r;};
 const okl=window.kill;kill=function(e){const was=e&&!e.dead;const rv=okl.apply(this,arguments);try{if(was&&e.dead&&e.elite&&S.on)S.eKill++;}catch{}return rv;};
 setInterval(()=>{try{if(mode!=='play')Daily.frame();}catch{}},500);
 let lastT=-1;const ov=VisualFX.draw;VisualFX.draw=function(){const v=ov.apply(this,arguments);try{const dt=lastT<0||time<lastT?0:Math.min(.1,time-lastT);lastT=time;if(mode==='play'||mode==='pause')drawBanner(dt);}catch{}return v;};
 return {banner,stars:()=>({...S,res:S.on?result():null}),Daily,openBackup,obj3};
})();
