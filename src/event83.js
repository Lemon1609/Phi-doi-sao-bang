// V83 · SỰ KIỆN TUẦN XOAY VÒNG 4 TUẦN + BOSS CUỐI TUẦN "THỰC THỂ THÔN TINH" (Gemini REVIEW80 §2–3, tranh GPT)
//  • Tuần (thứ Hai 0h giờ VN) xoay vòng: Cuộc Đua Tinh Vân → Đột Kích Lõi Thép → Mê Cung Phá Vây → Cơn Lốc Vô Tận.
//    Mỗi tuần 3 nhiệm vụ (đếm theo chế độ có sẵn) + 1 tiền tệ riêng (trần nhận 350/tuần) + tiệm đổi (giới hạn/tuần). Hết tuần: tiền tệ cũ xóa.
//  • Boss cuối tuần: Thứ Bảy & Chủ Nhật. 3 lượt miễn phí/ngày + 2 lượt mua (30 / 50 💎). Trận 90 giây, boss bất tử, đổi hình ở giây 30 và 60.
//    Cứ 25 giây Lõi Hấp Thụ mở 6 giây: bắn vỡ → choáng 5 giây, nhận ×2 sát thương, rơi 3 Đá Năng Lượng (+5 tiền tệ tuần mỗi viên).
//    Sát thương cộng dồn cả cuối tuần → 5 mốc quà (nhận ngay khi đạt). Tổng tích lũy mọi tuần dùng cho lộ trình chiến cơ #11.
//  • Chuyển theo V82 (bỏ phôi): "phôi" trong tiệm/quà → bản sao Lv1 cùng màu; mảnh phôi Tím (1/3) → đủ 3 mảnh = 1 bản sao Tím Lv1.
//  V84 (Gemini REVIEW84 §B, §D, đã đo lại trong game):
//   • V85 sửa lỗi: boss 'bất tử' vẫn chết được khi 1 khung trúng nhiều hơn lượng máu còn lại → từ đó sát thương = 0 cả trận. Đây là lý do
//     điểm không tăng theo sức mạnh. Nguyên nhân: boss tính máu ở lõi (coreHp) + cánh, còn trận chỉ khóa thanh máu hiển thị. Nay lõi được giữ nguyên sau mỗi đòn (cánh vẫn phá được như thường).
//   • Sửa lỗi V83: lớp đo sát thương bị bọc 2 lần → sát thương boss cuối tuần bị cộng gấp đôi (choáng ×4 thay vì ×2). Bỏ lỗi này thì điểm thật
//     chỉ còn một nửa, nên K nâng 1200 → 2400 để giữ đúng thang điểm Gemini đã cân (tài khoản yếu ~0,4–0,5 triệu/lượt).
//   • V85: sau khi sửa lỗi boss chết, sát thương tăng đúng theo sức mạnh (đo: Trắng ải 20 ≈ 4/s → Tím+5 ải 140 ≈ 21/s) nên bỏ nhân thẳng theo ải.
//     Điểm = sát thương × 1000 × √(lực chiến đề nghị ải boss ÷ ải 20). Ước tính 6 lượt/tuần: tân thủ ~2,3 tr · giữa game ~8 tr · Tím ~15 tr · cuối game ~30–35 tr. Đo thật: sát thương thô gần như KHÔNG đổi theo
//     sức mạnh tài khoản (~0,25–0,6 triệu/90 s ở mọi khung) vì boss lấy theo ải cao nhất đã qua → nhân theo ải để tài khoản xa hơn được điểm cao hơn.
//   • 5 mốc mới 1,2 / 3,2 / 8,5 / 22 / 50 triệu; mốc 5 tặng danh hiệu + hào quang «Kẻ Thôn Tinh» 7 ngày (title84). #11 cần 120 triệu tích lũy.
//   • Sửa lỗi: tài khoản chưa qua ải 20 bấm đánh boss → mất lượt mà không vào trận. Nay lấy ải cao nhất đã mở; không vào được thì hoàn lượt.
//   • Nhiệm vụ chốt lại: w1_t3 (3★ hoặc 25.000 điểm Hạt giống/ngày), w2_t1 (phá 8 pha máu boss bất kỳ), w3_t2 (chọn 10 Ấn Chú, Cộng Hưởng +3).
//  Tắt: window.EVENT83=false · thử: window.RAID83_ALWAYS=true (mở boss mọi ngày)
const EVENT83={
 ev:[
  {id:'EV_W1_NEBULA_RUSH',name:'Cuộc Đua Tinh Vân',cur:'Huy Hiệu Sao Băng',ic:'🌠',col:'#7fd8ff',
   tasks:[{id:'w1_t1',k:'seed',desc:'Hoàn thành 3 trận Thử thách Hạt giống',target:3,curr:60,alloy:5000},{id:'w1_t2',k:'graze',desc:'Lướt sát đạn (Graze) 120 lần',target:120,curr:90,stone:30},{id:'w1_t3',k:'star3',desc:'Đạt 3★ ở 5 lượt đánh Chiến dịch (hoặc 25.000 điểm Thử thách Hạt giống trong ngày)',target:5,curr:100,gem:20}],
   shop:[{id:'s1_blue',n:'Bản sao Lam Lv1 · món đang dùng',cost:150,lim:1,it:{copyBlue:1}},{id:'s1_pilot',n:'10 mảnh phi công',cost:80,lim:2,it:{pilot:10}},{id:'s1_alloy',n:'30.000 ◈',cost:40,lim:3,it:{alloy:30000}}]},
  {id:'EV_W2_TITAN_BREACH',name:'Đột Kích Lõi Thép',cur:'Lõi Năng Lượng',ic:'⚙',col:'#ff9a3d',
   tasks:[{id:'w2_t1',k:'bossPh',desc:'Phá 8 pha máu của boss bất kỳ (Chiến dịch, Tháp, Vượt Hạn, Boss cuối tuần)',target:8,curr:70,alloy:6000},{id:'w2_t2',k:'bossStage',desc:'Hạ hoặc càn quét 10 ải boss chiến dịch',target:10,curr:80,stone:40},{id:'w2_t3',k:'ovTier4',desc:'Vượt bậc 4 Boss Vượt Hạn trở lên',target:1,curr:100,gem:20}],
   shop:[{id:'s2_mat',n:'Bộ nguyên liệu khung Lam',cost:100,lim:2,it:{matSet:2}},{id:'s2_gem',n:'5 đá khảm Lục ngẫu nhiên',cost:60,lim:2,it:{stone71:5}},{id:'s2_stone',n:'80 đá nâng cấp ⬢',cost:50,lim:3,it:{stone:80}}]},
  {id:'EV_W3_ROGUE_MAZE',name:'Mê Cung Phá Vây',cur:'Tinh Thể Hư Không',ic:'🌀',col:'#b45cff',
   tasks:[{id:'w3_t1',k:'bk6',desc:'Vượt qua chặng 6 Phá Vây',target:1,curr:60,alloy:5000},{id:'w3_t2',k:'bkPick',desc:'Chọn 10 Ấn Chú trong Phá Vây (ghép thành Cộng Hưởng tính +3)',target:10,curr:90,perk:30},{id:'w3_t3',k:'bkClear',desc:'Phá đảo chặng 12 Phá Vây',target:1,curr:100,gem:20}],
   shop:[{id:'s3_smart',n:'Bản sao Lam Lv1 · món đang mặc',cost:160,lim:1,it:{copyBlue:1}},{id:'s3_perk',n:'60 mảnh Ấn Chú',cost:75,lim:2,it:{perk:60}},{id:'s3_pack',n:'30 mảnh Ấn Chú + 15.000 ◈',cost:120,lim:1,it:{perk:30,alloy:15000}}]},
  {id:'EV_W4_ENDLESS_STORM',name:'Cơn Lốc Vô Tận',cur:'Mảnh Sao Cổ',ic:'💠',col:'#5fe6ff',
   tasks:[{id:'w4_t1',k:'eChest',desc:'Nhận 15 rương trong Vô tận',target:15,curr:70,alloy:6000},{id:'w4_t2',k:'eElite',desc:'Hạ 30 quái tinh anh ở Vô tận',target:30,curr:80,stone:40},{id:'w4_t3',k:'eWave',desc:'Vượt qua đợt 20 Vô tận',target:1,curr:100,gem:20}],
   shop:[{id:'s4_purple',n:'Bản sao Lam Lv1 · món đang dùng',cost:180,lim:1,it:{copyBlue:1}}/* V307: bỏ mảnh bản sao Tím (chủ dự án 17/11); 1/3 Tím ≈ 1 Lam theo luật 3 Lam → 1 Tím; giá ×3 không mua được vì trần 350/tuần */,{id:'s4_pilot',n:'10 mảnh phi công',cost:90,lim:2,it:{pilot:10}},{id:'s4_alloy',n:'40.000 ◈',cost:50,lim:3,it:{alloy:40000}}]}],
 cap:350,
 raid:{days:[6,0],sec:90,free:3,paid:[30,50],weak:25,open:6,stun:5,mult:2,shard:5,K:1000,base:20,
  ms:[{dmg:1200000,alloy:15000,stone:30,curr:30},{dmg:3200000,gem:20,alloy:30000,pilot:5},{dmg:8500000,gem:30,stone:60,copyGreen:1},{dmg:18000000,gem:50,alloy:50000,copyBlue:1,curr:60},{dmg:38000000,aura:'AURA_STAR_DEVOURER',honor:10,stone71:2}]}};
const Event83=(()=>{
 const C=EVENT83,R=C.raid,KEY='saobang-event83';
 const on=()=>window.EVENT83!==false;
 const VN=()=>Date.now()+7*3600000;
 const wkNo=()=>Math.floor((VN()-Date.UTC(1970,0,5))/604800000);
 const evIdx=()=>((wkNo()%4)+4)%4;
 const day=()=>new Date(VN()).toISOString().slice(0,10);
 const dow=()=>new Date(VN()).getUTCDay();
 const raidOpen=()=>window.RAID83_ALWAYS===true||R.days.includes(dow());
 let S={wk:-1,cur:0,earn:0,p:{},cl:{},shop:{},ps:0,done:0,doneWk:-1,raid:{wk:-1,total:0,att:{d:'',n:0,paid:0},ms:{}},life:0,base:{}};
 try{const v=JSON.parse(localStorage.getItem(KEY)||'null');if(v&&typeof v==='object')S=Object.assign(S,v);}catch{}
 // V307: mảnh bản sao Tím đã bỏ → mỗi mảnh đang có đổi 1 bản sao Lam Lv1 (đợi Evo82 sẵn sàng)
 setTimeout(()=>{try{const n=S.ps|0;if(n>0){S.ps=0;for(let i=0;i<n;i++)copyOf(2,'Bản sao Lam Lv1');save();try{toast('ĐỔI '+n+' MẢNH BẢN SAO TÍM → '+n+' BẢN SAO LAM LV1');}catch{}}}catch{}},4000);
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const fmt=n=>Math.round(n).toLocaleString('vi-VN'),esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const T=m=>{try{toast(m);}catch{}};
 const ev=()=>C.ev[evIdx()];
 function roll(){const w=wkNo();if(S.wk!==w){S.wk=w;S.cur=0;S.earn=0;S.p={};S.cl={};S.shop={};S.base=snapBase();save();}if(S.raid.wk!==w){S.raid={wk:w,total:0,att:{d:'',n:0,paid:0},ms:{}};save();}if(S.raid.att.d!==day()){S.raid.att={d:day(),n:0,paid:0};save();}}
 // ---------- cộng tiền tệ (trần tuần) ----------
 function addCur(n,src){n=Math.max(0,Math.min(n|0,C.cap-S.earn));if(!n){if(src)T('ĐÃ ĐẠT TRẦN '+C.cap+' '+ev().cur.toUpperCase()+' TUẦN NÀY');return 0;}S.cur+=n;S.earn+=n;save();return n;}
 // ---------- phát quà ----------
 const eqPick=()=>{const L=[];try{const eq=Progress.v70.equipped();for(const id of Object.values(eq)){const it=Progress.v70.get(id);if(it)L.push(['gear',it.variant]);}}catch{}try{L.push(['craft',selected|0]);}catch{}return L.length?L[Math.floor(Math.random()*L.length)]:['craft',0];};
 function copyOf(tier,label){const [k,m]=eqPick();try{if(window.Evo82&&Evo82.on())Evo82.addCopy(k,m,tier,1,true);else V70.phAdd(k,m,tier>=6?3:tier,1);}catch{}let nm='';try{nm=k==='craft'?Fighters28.profiles[m].name:GearCatalog[m].name;}catch{}return label+' · '+nm;}
 function pilot(n){try{const own=Object.keys(Pilot67.state().own||{});const ids=own.length?own.map(Number):PILOTS67.map(p=>p.id);const id=ids[Math.floor(Math.random()*ids.length)];Pilot67._piece(id,n);return n+' mảnh '+(PILOTS67.find(p=>p.id==id)||{}).name;}catch{return '';}}
 // V204 · EVENT_ENDGAME_V204 (Gemini 08/11): tiệm cuối game từ ải 160 + chip thưởng hoàn thành tuần. Tắt: window.EV204=false
 const E204={unl:160,shop:[{id:'ev_coder_pack',n:'2 Bộ mã hóa',cost:120,lim:1,it:{coder:2},late:1},{id:'ev_core_pack',n:'4 Lõi chip',cost:80,lim:1,it:{core:4},late:1},{id:'ev_hach_pack',n:'5 Tinh Hạch Siêu Việt',cost:100,lim:1,it:{sssCore:5},late:1}],chipWk:4,chip4:6,chipUnl:110};
 const on204=()=>window.EV204!==false;
 const maxCl204=()=>{try{const c=Progress.getState().cleared||[];return c.length?Math.max(...c):0;}catch{return 0;}};
 const shopL=e=>on204()&&maxCl204()>=E204.unl?e.shop.concat(E204.shop):e.shop;
 const Q23=q=>{try{return Chip72.mapQ(q);}catch{return q;}};/* V2.3 U4: phẩm cũ 0–6 → 4 phẩm mới */
 const QN204=q=>{try{return CHIP72.q[Q23(q)].n;}catch{return ['Chế thức','Cải lương','Nguyên mẫu','Giao ước Nguyên mẫu','Chiến lược','Giao ước Chiến lược','Tuyệt mật'][q];}};
 function grant(it){const out=[];
  try{if(it.coder||it.core){const m=Chip72.state().mat;Chip72._set({mat:{coder:(m.coder|0)+(it.coder|0),core:(m.core|0)+(it.core|0)}});if(it.coder)out.push(it.coder+' Bộ mã hóa');if(it.core)out.push(it.core+' Lõi chip');}}catch{}
  try{if(it.sssCore){V70.add('sss_core',it.sssCore);out.push(it.sssCore+' Tinh Hạch');}}catch{}
  try{if(it.chipQ!=null){const c=Chip72.gen({q:Q23(it.chipQ)});Chip72._give(c);out.push('1 chip '+QN204(it.chipQ));}}catch{}
  try{if(it.alloy){Progress.grantCredits(it.alloy);out.push(fmt(it.alloy)+' ◈');}}catch{}
  try{if(it.stone){Workshop.exp70(it.stone);out.push(it.stone+' ⬢');}}catch{}
  try{if(it.gem){Econ74.add(it.gem,'SỰ KIỆN');out.push(it.gem+' 💎');}}catch{}
  try{if(it.pilot)out.push(pilot(it.pilot));}catch{}
  try{if(it.copyBlue)out.push(copyOf(2,'Bản sao Lam Lv1'));}catch{}
  try{if(it.copyGreen)out.push(copyOf(1,'Bản sao Lục Lv1'));}catch{}
  try{if(it.matSet){for(const t of MAT69.types)V70.add(t.id+it.matSet,1);out.push('1 bộ nguyên liệu '+['','Lục','Lam','Tím'][it.matSet]);}}catch{}
  try{if(it.stone71){for(let i=0;i<it.stone71;i++){const pos=['ship','armor','missiles','sidearm'];Stone71.give(Stone71.make(2,pos[Math.floor(Math.random()*4)],{ty:'stat'}));}out.push(it.stone71+' đá khảm Lục');}}catch{}
  try{if(it.perk){const st=BK78.state();BK78._set({shards:(st.shards|0)+it.perk});out.push(it.perk+' mảnh Ấn Chú');}}catch{}
  try{if(it.honor){const st=V77.state();V77._set({tok:(st.tok|0)+it.honor});out.push(it.honor+' Xu Tinh Anh');}}catch{}
  try{if(it.purpleShard){/* giữ cho lượt mua cũ */S.ps=(S.ps|0)+it.purpleShard;out.push('mảnh bản sao Tím '+Math.min(3,S.ps)+'/3');if(S.ps>=3){S.ps-=3;out.push(copyOf(6,'GHÉP ĐỦ → Bản sao Tím Lv1'));}save();}}catch{}
  try{if(it.aura&&window.Title84)out.push(Title84.grant(it.aura,7));}catch{}
  if(it.curr){const n=addCur(it.curr);if(n)out.push(n+' '+ev().cur);}
  try{Progress.render();}catch{}return out;}
 // ---------- đo nhiệm vụ ----------
 const g=(fn,d=0)=>{try{const v=fn();return typeof v==='number'&&isFinite(v)?v:d;}catch{return d;}};
 function snapBase(){return {boss:g(()=>Ach79.state().boss),bkClear:g(()=>BK78.state().clears),ovUsed:0};}
 const inc=(k,n=1)=>{roll();S.p[k]=(S.p[k]|0)+n;save();};
 const setMax=(k,v)=>{roll();if(v>(S.p[k]|0)){S.p[k]=v;save();}};
 let lastSeed=null,lastRun=null,lastOv=null,lastBk=null;
 function poll(){if(!on())return;roll();const e=ev();
  // nhiệm vụ đếm theo trạng thái
  try{const r=BK78.run&&BK78.run();if(r&&r.stats){const id=r.stats.t0;if(r.kind==='seed'){if(lastSeed!==id&&r.stats.t0){lastSeed=id;S.__seedPending=id;}}else{if(r.k>=7||(r.k>=6&&mode==='reward'))setMax('bk6',1);if((r.perks||[]).length>=4)setMax('bkPerk',1);}}
   else if(S.__seedPending){inc('seed');S.__seedPending=null;}}catch{}
  try{const sd=BK78.state().sd||{};if(sd.d===day()&&(sd.best|0)>=25000&&S.sd25!==day()){S.sd25=day();inc('star3');}}catch{}
  try{const r=BK78.run&&BK78.run();if(r&&r.kind!=='seed'){const np=(r.perks||[]).length;let ns=0;try{const SY=FEATURES_V78.BREAKOUT_ROGUELITE.SYNERGIES_6;ns=SY.filter(x=>x.req.every(q=>r.perks.includes(q))).length;}catch{}
    let pv=lastBk||{np:0,ns:0};if(np<pv.np)pv={np:0,ns:0};const dp=np-pv.np,ds=ns-pv.ns;if(dp>0)inc('bkPick',dp+2*Math.max(0,ds));lastBk={np,ns};}else lastBk=null;}catch{}
  try{const c=BK78.state().clears|0;if(S.base.bkClear==null)S.base.bkClear=c;if(c>S.base.bkClear){setMax('bkClear',1);}}catch{}
  try{const b=Ach79.state().boss|0;if(S.base.boss==null)S.base.boss=b;setMax('bossStage',b-S.base.boss);}catch{}
  try{const o=O78.state();const used=o.used|0;if(lastOv!=null&&used>lastOv)inc('ovFight',used-lastOv);lastOv=used;if(Math.max(o.best|0,o.max|0)>=4)setMax('ovTier4',1);}catch{}
  try{if(gameMode==='endless'&&(mode==='play'||mode==='pause')&&(level|0)>20)setMax('eWave',1);}catch{}
  dot();}
 const H83={};
 function hooks(){try{if(!H83.g&&Combat26.graze){H83.g=1;const og=Combat26.graze;const f=function(){const r=og.apply(this,arguments);try{if(r&&on()&&ev().id==='EV_W1_NEBULA_RUSH')inc('graze');}catch{}return r;};f.__e83=1;Combat26.graze=f;}}catch{}
  try{if(!H83.s&&Campaign36.recordStars){H83.s=1;const o=Campaign36.recordStars;const f=function(n,v){const before=(Campaign36.getState().stars||{})[n]|0;const r=o.apply(this,arguments);try{if(on()&&(v|0)>=3&&gameMode==='campaign'&&mode!=='menu')inc('star3');}catch{}return r;};f.__e83=1;Campaign36.recordStars=f;}}catch{}
  try{if(!H83.c&&Chests.rewardBoss){H83.c=1;const o=Chests.rewardBoss;const f=function(){const r=o.apply(this,arguments);try{if(on()&&r&&r.crate&&gameMode==='endless')inc('eChest');}catch{}return r;};f.__e83=1;Chests.rewardBoss=f;}}catch{}
  try{if(!H83.k&&window.kill){H83.k=1;const o=window.kill;const f=function(e){const was=e&&!e.dead;const r=o.apply(this,arguments);try{if(on()&&was&&e.dead&&e.elite&&gameMode==='endless')inc('eElite');}catch{}return r;};f.__e83=1;window.kill=f;try{kill=f;}catch{}}}catch{}}
 const prog=t=>Math.min(t.target,S.p[t.k]|0);
 function claimTask(id){roll();const t=ev().tasks.find(x=>x.id===id);if(!t||S.cl[id]||prog(t)<t.target)return;S.cl[id]=1;const got=grant({curr:t.curr,alloy:t.alloy,stone:t.stone,gem:t.gem,perk:t.perk});
  if(ev().tasks.every(x=>S.cl[x.id])&&S.doneWk!==S.wk){S.done=(S.done|0)+1;S.doneWk=S.wk;try{Ship83._set({ev:S.done});}catch{}got.push('HOÀN THÀNH SỰ KIỆN TUẦN ('+S.done+')');if(on204()&&maxCl204()>=E204.chipUnl){S.c204=(S.c204|0)+1;got.push(...grant({chipQ:E204.chipWk}));if(S.c204%4===0)got.push('MỐC 4 TUẦN: '+grant({chipQ:E204.chip4}).join(''));}}
  save();T('🎁 '+got.join(' · '));}
 function buy(id){roll();const it=shopL(ev()).find(x=>x.id===id);if(!it)return;const n=S.shop[id]|0;if(n>=it.lim){T('HẾT LƯỢT ĐỔI TUẦN NÀY');return;}if(S.cur<it.cost){T('THIẾU '+ev().cur.toUpperCase());return;}S.cur-=it.cost;S.shop[id]=n+1;save();T('ĐÃ ĐỔI · '+grant(it.it).join(' · '));}
 // ================= BOSS CUỐI TUẦN =================
 const A=typeof RAID83_ART!=='undefined'?RAID83_ART:{};const IM={};const img=k=>{if(!(k in IM))IM[k]=A[k]?Object.assign(new Image(),{src:A[k]}):null;const m=IM[k];return m&&m.complete&&m.naturalWidth?m:null;};for(const k in A)if(k!=='meta')img(k);
 const M=A.meta||{w:563,core:[383.5,357.5]};
 let RD=null;// {t,dmg,shards,stun,openT,hits,lv}
 const attLeft=()=>{roll();return Math.max(0,R.free-S.raid.att.n);};
 // V307 · ĐUA SÁT THƯƠNG 3 TÀU × 30 s (học boss phi đội game gốc; chủ dự án chọn 17/11). Tắt: window.RACE307=false
 function team307(){let main=0;try{main=typeof launchCraft==='number'?launchCraft:selected;}catch{}const own=[];for(let i=0;i<13;i++){try{if(i!==main&&Campaign36.ownsCraft(i))own.push(i);}catch{}}
  const pw=i=>{try{const v=Workshop.craftProgress(i);return Workshop.index(v.grade)*1000+(v.level|0);}catch{return 0;}};own.sort((a,b)=>pw(b)-pw(a));return [main,...own.slice(0,2)];}
 function nm307(i){try{return craftProfile(i).name;}catch{return 'Chiến cơ '+(i+1);}}
 function race307(rd){if(!rd||!rd.team||!rd.by)return '';const k=rd.k||1,tot=rd.by.reduce((a,b)=>a+b,0)||1,mv=rd.by.indexOf(Math.max(...rd.by));
  return `<div class="rd307">${rd.team.map((id,i)=>`<div class="${i===mv&&rd.by[i]>0?'mvp':''}"><b>${i===0?'CHỦ CHIẾN':'HỖ TRỢ '+i}</b><span>${esc(nm307(id))}</span><em>${fmt(rd.by[i]*k)}</em><i style="width:${Math.round(rd.by[i]/tot*100)}%"></i>${i===mv&&rd.by[i]>0?'<u>MVP</u>':''}</div>`).join('')}</div>`;}
 (()=>{try{if(document.getElementById('rd307-css'))return;const st=document.createElement('style');st.id='rd307-css';st.textContent='.rd307{display:flex;flex-direction:column;gap:6px;margin:8px 0}.rd307>div{position:relative;display:grid;grid-template-columns:78px 1fr auto;align-items:center;gap:6px;padding:7px 10px;border-radius:8px;background:#0b1a3a;border:1px solid #2e5a9a;overflow:hidden}.rd307>div.mvp{border-color:#ffd166;box-shadow:0 0 10px #ffb70366}.rd307 b{font:800 10px/1 Neo,sans-serif;color:#9fd2ff}.rd307 span{font:700 12px/1.2 Neo,sans-serif;color:#fff}.rd307 em{font:900 13px/1 Neo,sans-serif;color:#ffd166;font-style:normal}.rd307 i{position:absolute;left:0;bottom:0;height:3px;background:linear-gradient(90deg,#36d6ff,#ffd166)}.rd307 u{position:absolute;right:6px;top:-1px;text-decoration:none;font:900 9px/1 Neo,sans-serif;color:#201000;background:#ffd166;padding:2px 5px;border-radius:0 0 5px 5px}.rd307h{display:block;font:800 11px/1.3 Neo,sans-serif;color:#7fe6ff;font-style:normal}';document.head.appendChild(st);}catch{}})();
 function canStart(){return raidOpen()&&(attLeft()>0);}
 function bestStage(){let b=1;try{const c=Progress.getState().cleared||[];const m=c.length?Math.max(...c):0;b=m>=20?Math.min(160,Math.floor(m/20)*20):Math.floor(Math.min(19,m+1)/5)*5;}catch{}return b;}
 function reqOf(n){try{return Meta40.reqCP(n)||1;}catch{return 1;}}
 function kOf(lv){const r=reqOf(lv)/reqOf(R.base);return R.K*(isFinite(r)&&r>0?Math.sqrt(r):1);}
 function start(paid){if(!on())return;roll();if(!raidOpen()){T('BOSS CUỐI TUẦN CHỈ MỞ THỨ BẢY & CHỦ NHẬT');return;}
  if(bestStage()<5){T('VƯỢT ẢI 4 ĐỂ ĐÁNH BOSS CUỐI TUẦN');return;}
  if(!paid&&attLeft()<=0){T('HẾT LƯỢT MIỄN PHÍ HÔM NAY');return;}
  if(paid){const k=S.raid.att.paid|0;if(k>=R.paid.length){T('HẾT LƯỢT MUA HÔM NAY');return;}let ok=false;try{ok=Econ74.spend(R.paid[k]);}catch{}if(!ok){T('THIẾU KIM CƯƠNG · cần '+R.paid[k]);return;}S.raid.att.paid=k+1;}else S.raid.att.n++;
  save();close();const lv=bestStage();RD={t:0,dmg:0,shards:0,stun:0,openT:-1,hits:0,lv,k:kOf(lv),started:false,ended:false};if(window.RACE307!==false){RD.team=team307();RD.seg=0;RD.by=RD.team.map(()=>0);}document.body.classList.add('raid83');
  try{Nav74.closeAll&&Nav74.closeAll();}catch{}try{mode='menu';Progress.setLocked(false);}catch{}
  let ok=false;try{document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value=String(lv);Lobby.hide();reset();ok=mode==='play';}catch(e){console.warn('raid83',e);}
  if(!ok){RD=null;document.body.classList.remove('raid83');if(paid){S.raid.att.paid=Math.max(0,(S.raid.att.paid|0)-1);try{Econ74.add(R.paid[S.raid.att.paid],'HOÀN LƯỢT BOSS');}catch{}}else S.raid.att.n=Math.max(0,S.raid.att.n-1);save();try{Lobby.show();}catch{}T('KHÔNG VÀO ĐƯỢC TRẬN · ĐÃ HOÀN LƯỢT');}}
 function tick(dt){if(!RD||RD.ended)return;let m='';try{m=mode;}catch{}
  try{const d=document.getElementById('st80');if(d&&!d.hidden)d.hidden=true;window.__st80=0;}catch{}
  if(m==='over'||m==='reward'||m==='menu'&&RD.started){finish(false);return;}
  if(m!=='play')return;
  if(!boss){try{endlessWave=9;for(const e of enemies)if(!e.dead&&!e.boss){e.dead=true;}}catch{}return;}
  if(!boss.raid83){boss.raid83=1;RD.started=true;}
  if(!boss.bossHealthReady)return;
  RD.t+=dt;if(RD.team){const sg=Math.min(RD.team.length-1,Math.floor(RD.t/30));if(sg!==RD.seg){RD.seg=sg;const id=RD.team[sg];try{selected=id;launchCraft=id;}catch{}try{VisualFX.impact(player.x,player.y,'#7fe6ff',1.4);}catch{}T('ĐỔI TÀU '+(sg+1)+'/'+RD.team.length+' · '+nm307(id));}}const f=Math.max(.05,1-RD.t/R.sec*.85);try{boss.hp=Math.max(boss.hp,boss.max*f);if(boss.hp>boss.max*f+1)boss.hp=boss.max*f;}catch{}
  // lõi hấp thụ
  const cyc=RD.t%R.weak;const open=RD.t>=R.weak-1&&cyc<R.open&&RD.stun<=0;RD.openNow=open;
  if(RD.stun>0)RD.stun=Math.max(0,RD.stun-dt);
  if(open){const s=sc(),cx=boss.x,cy=boss.y+(M.core[1]-383.5)*s;try{for(const sh of shots){if(sh.dead||sh.r83)continue;if(Math.hypot(sh.x-cx,sh.y-cy)<26){sh.r83=1;RD.hits++;}}}catch{}
   if(RD.hits>=18){RD.hits=0;RD.stun=R.stun;RD.shards+=3;addCur(3*R.shard);try{ring(cx,cy,'#b45cff',90);VisualFX.explode(cx,cy,1.6,'boss');}catch{}RD.drop=[{x:cx-30,y:cy,t:0},{x:cx,y:cy+10,t:0},{x:cx+30,y:cy,t:0}];T('💥 VỠ LÕI HẤP THỤ · CHOÁNG 5 GIÂY · ×2 SÁT THƯƠNG · +3 ĐÁ NĂNG LƯỢNG');}}
  else RD.hits=0;
  if(RD.drop)for(const d of RD.drop){d.t+=dt;d.y+=dt*120;}
  if(RD.t>=R.sec)finish(true);}
 const sc=()=>300/M.w;// thân rộng 300 px (lớn hơn boss chương)
 function draw(){if(!RD||!boss||!boss.raid83)return false;const ph=RD.t<30?1:RD.t<60?2:3,im=img('p'+ph);if(!im)return false;const s=sc(),S2=768*s;ctx.save();
  if(RD.stun>0){ctx.globalAlpha=.85+.15*Math.sin(RD.t*20);}ctx.drawImage(im,boss.x-S2/2,boss.y-S2/2,S2,S2);
  const ck=RD.stun>0?'cs':RD.openNow?'co':'cc';const ci=img(ck);if(ci){ctx.globalAlpha=1;ctx.drawImage(ci,boss.x-S2/2,boss.y-S2/2,S2,S2);}
  if(RD.drop){const sh=img('shard');for(const d of RD.drop)if(d.t<1.4&&sh){ctx.globalAlpha=1-d.t/1.4;ctx.drawImage(sh,d.x-14,d.y-14,28,28);}}
  ctx.restore();return true;}
 function hud(){if(!RD||RD.ended)return;let h=document.getElementById('rd83h');if(!h){h=document.createElement('div');h.id='rd83h';document.body.appendChild(h);}const left=Math.max(0,R.sec-RD.t);
  const tl=RD.team?`<i class="rd307h">TÀU ${(RD.seg|0)+1}/${RD.team.length} · ${esc(nm307(RD.team[RD.seg|0]))} · ${Math.max(0,Math.ceil(Math.min(30*((RD.seg|0)+1),R.sec)-RD.t))}s</i>`:'';h.innerHTML=`<b>THỰC THỂ THÔN TINH</b>${tl}<span>⏱ ${left.toFixed(0)}s · ĐIỂM ${fmt(RD.dmg*RD.k)}${RD.stun>0?' · <em>CHOÁNG ×2</em>':RD.openNow?' · <em>LÕI MỞ – BẮN VÀO NGỰC!</em>':''}</span>`;h.hidden=false;}
 function finish(full){if(!RD||RD.ended)return;RD.ended=true;if(RD.team){try{selected=RD.team[0];launchCraft=RD.team[0];}catch{}}const pts=Math.round(RD.dmg*RD.k);roll();S.raid.total+=pts;S.life=(S.life|0)+pts;try{Ship83._set({raid:S.life});}catch{}
  const got=[];R.ms.forEach((ms,i)=>{if(!S.raid.ms[i]&&S.raid.total>=ms.dmg){S.raid.ms[i]=1;got.push('Mốc '+(i+1)+': '+grant(ms).join(', '));}});save();
  document.body.classList.remove('raid83');const h=document.getElementById('rd83h');if(h)h.hidden=true;
  try{Revive393.close();}catch{}try{Combat26.cancelSkill();}catch{}try{superTime=0;bullets=[];beams=[];}catch{}try{if(typeof PlayScreen!=='undefined')PlayScreen.exit(false);}catch{}try{mode='menu';}catch{}try{Lobby.show();}catch{}
  setTimeout(()=>result(pts,got,RD),300);}
 function result(pts,got,rd){let el=document.getElementById('rd83r');if(!el){el=document.createElement('div');el.id='rd83r';el.className='m63 rd83r';document.body.appendChild(el);el.addEventListener('click',e=>{if(e.target.closest('[data-r83]')){el.hidden=true;try{Lobby.show();}catch{}document.body.classList.remove('res78');setTimeout(()=>{try{open();}catch{}},150);}});}
  el.innerHTML=`<div class="m63-card rd83c">${A.banner?`<img class="rd83b" src="${A.banner}" alt="">`:''}<div class="m63-eye">BOSS CUỐI TUẦN · KẾT QUẢ</div><h3>+${fmt(pts)} ĐIỂM</h3>${race307(rd)}
   <p>Tổng tuần: <b>${fmt(S.raid.total)}</b> · Đá Năng Lượng: <b>${rd.shards}</b> (+${rd.shards*R.shard} ${esc(ev().cur)})</p>${got.length?`<p class="ok">🎁 ${got.map(esc).join('<br>')}</p>`:''}${msHtml()}
   <div class="adv-btns"><button class="m63-go" data-r83>VỀ SỰ KIỆN</button></div></div>`;el.hidden=false;}
 function msHtml(){return `<div class="ev83ms">${R.ms.map((m,i)=>{const ok=S.raid.total>=m.dmg;return `<div class="${ok?'ok':''}"><b>${fmt(m.dmg)}</b><small>${esc(msTxt(m))}</small><i>${S.raid.ms[i]?'✓':ok?'…':'🔒'}</i></div>`;}).join('')}</div>`;}
 function msTxt(m){const o=[];if(m.gem)o.push(m.gem+'💎');if(m.alloy)o.push(fmt(m.alloy)+'◈');if(m.stone)o.push(m.stone+'⬢');if(m.pilot)o.push(m.pilot+' mảnh phi công');if(m.copyGreen)o.push('bản sao Lục');if(m.copyBlue)o.push('bản sao Lam');if(m.curr)o.push(m.curr+' tiền tệ tuần');if(m.honor)o.push(m.honor+' Xu Tinh Anh');if(m.stone71)o.push(m.stone71+' đá khảm');if(m.aura)o.push('danh hiệu + hào quang Kẻ Thôn Tinh 7 ngày');return o.join(' · ');}
 // ---------- đo sát thương boss + ×2 khi choáng ----------
 function hookDmg(){try{if(H83.d||window.damageBoss.__r83)return;H83.d=1;const o=window.damageBoss;const f=function(amount,source,part){if(RD&&!RD.ended&&boss&&boss.raid83){if(RD.stun>0)amount*=R.mult;try{if(RD.openNow&&source&&typeof source==='object'&&Number.isFinite(source.x)&&Math.abs(source.x-boss.x)<46&&!source.c83){source.c83=1;RD.hits++;}}catch{}/* V85: boss bất tử thật — nâng máu tạm thời khi nhận đòn để chiến cơ mạnh không 'giết' boss trong 1 khung (trước đây chạm 0 máu là hết điểm cả trận) */const b0=boss,kh=b0.hp,kc=b0.coreHp,BIG=1e9;if(kc!=null)b0.coreHp=BIG;let a=0;try{a=o.call(this,amount,source,part);}finally{if(kc!=null)b0.coreHp=kc;else if(b0.coreHp!=null&&a>0)b0.coreHp+=a;b0.hp=kh;}if(a>0){RD.dmg+=a;if(RD.by)RD.by[RD.seg|0]+=a;}return a;}return o.apply(this,arguments);};f.__r83=1;window.damageBoss=f;try{damageBoss=f;}catch{}}catch{}}
 let ph84=false;
 function hookPhase(){try{if(ph84||window.damageBoss.__p84)return;ph84=true;const o=window.damageBoss;const f=function(amount,source,part){const b=boss;const r=o.apply(this,arguments);
   try{if(on()&&b&&b.max>0&&(!part||part===b)){const fr=b.hp/b.max;b.__ph84=b.__ph84||{};for(const th of [.7,.5,.3])if(fr<th&&!b.__ph84[th]){b.__ph84[th]=1;inc('bossPh');}if((b.dead||b.hp<=0)&&!b.__ph84.k){b.__ph84.k=1;inc('bossPh');}}}catch{}return r;};f.__p84=1;window.damageBoss=f;try{damageBoss=f;}catch{}}catch{}}
 function hookDraw(){for(const name of ['Major36','BossBake3D']){try{const Mx=window[name]||eval(name);if(Mx.__r83)continue;const o=Mx.draw;Mx.draw=function(b){try{if(RD&&b===boss&&draw())return true;}catch{}return o.apply(this,arguments);};Mx.__r83=1;}catch{}}}
 // ================= GIAO DIỆN =================
 let el=null;
 function build(){el=document.createElement('div');el.className='m63 ev83';el.hidden=true;document.body.appendChild(el);
  el.addEventListener('click',e=>{const b=e.target.closest('[data-e83]');if(!b){if(e.target===el)close();return;}e.preventDefault();e.stopPropagation();const a=b.dataset.e83,v=b.dataset.v;
   if(a==='x')return close();if(a==='claim')claimTask(v);if(a==='buy')buy(v);if(a==='raid')return start(false);if(a==='raidp')return start(true);render();});}
 function close(){if(el)el.hidden=true;}
 function left(){const now=VN(),next=(wkNo()+1)*604800000+Date.UTC(1970,0,5);const h=Math.max(0,(next-now)/3600000);return h>=24?Math.floor(h/24)+' ngày '+Math.floor(h%24)+' giờ':Math.floor(h)+' giờ';}
 function render(){if(!el)build();roll();const e=ev();
  const tasks=e.tasks.map(t=>{const p=prog(t),ok=p>=t.target,cl=S.cl[t.id];return `<div class="ev83t ${cl?'done':''}"><div><b>${esc(t.desc)}</b><small>${p}/${t.target} · +${t.curr} ${esc(e.cur)}${t.alloy?' · '+fmt(t.alloy)+' ◈':''}${t.stone?' · '+t.stone+' ⬢':''}${t.gem?' · '+t.gem+' 💎':''}${t.perk?' · '+t.perk+' mảnh Ấn Chú':''}</small></div>${cl?'<em>✓</em>':`<button data-e83="claim" data-v="${t.id}" ${ok?'class="hot"':'disabled'}>${ok?'NHẬN':'CHƯA ĐẠT'}</button>`}</div>`;}).join('');
  const shop=shopL(e).map(it=>{const n=S.shop[it.id]|0;return `<div class="ev83t${it.late?' ev204l':''}"><div><b>${it.late?'<i class="ev204tag">CUỐI GAME</i> ':''}${esc(it.n)}</b><small>${it.cost} ${esc(e.cur)} · còn ${it.lim-n}/${it.lim}</small></div><button data-e83="buy" data-v="${it.id}" ${n>=it.lim||S.cur<it.cost?'disabled':''}>ĐỔI</button></div>`;}).join('');
  const ro=raidOpen(),al=attLeft(),pk=S.raid.att.paid|0;
  const raid=`<div class="ev83r">${A.banner?`<img class="rd83b" src="${A.banner}" alt="">`:''}<div class="ev83rt"><b>BOSS CUỐI TUẦN · THỰC THỂ THÔN TINH</b><small>${ro?'ĐANG MỞ · còn '+al+'/'+R.free+' lượt miễn phí hôm nay':'Mở Thứ Bảy & Chủ Nhật'} · tổng tuần ${fmt(S.raid.total)} điểm</small></div>
   <p class="ev83n">Trận 90 giây, boss không chết. Điểm = sát thương × hệ số theo ải cao nhất bạn đã qua (hiện: ải ${bestStage()} · ×${(kOf(bestStage())/R.K).toFixed(1)}). Cứ 25 giây Lõi Hấp Thụ ở ngực mở 6 giây — bắn trúng liên tục để vỡ lõi: boss choáng 5 giây, nhận ×2 sát thương, rơi 3 Đá Năng Lượng (+${R.shard} ${esc(e.cur)} mỗi viên).</p>${msHtml()}
   <div class="adv-btns">${ro?(al>0?'<button class="m63-go" data-e83="raid">⚔ ĐÁNH BOSS</button>':(pk<R.paid.length?`<button class="m63-go" data-e83="raidp">MUA LƯỢT · ${R.paid[pk]} 💎</button>`:'<button class="m63-go off" disabled>HẾT LƯỢT HÔM NAY</button>')):'<button class="m63-go off" disabled>CHƯA MỞ</button>'}</div></div>`;
  el.innerHTML=`<div class="m63-card ev83k" style="--ec:${e.col}"><div class="m63-eye">SỰ KIỆN TUẦN ${evIdx()+1}/4 · còn ${left()}</div><h3>${e.ic} ${esc(e.name)}</h3>${(()=>{try{const r=window.Rule84&&Rule84.info();return r?`<p class="ev83n ev84r"><b>LUẬT TUẦN · ${esc(r.title)}</b><br>${esc(r.desc)}<br><small>Áp dụng: ${esc(r.where)}</small></p>`:'';}catch{return '';}})()}
   <p class="ev83c">${esc(e.cur)}: <b>${S.cur}</b> <small>(đã nhận ${S.earn}/${C.cap} tuần này)</small>${S.ps?` · mảnh bản sao Tím ${S.ps}/3`:''}</p>
   ${on204()&&window.EV204X?EV204X.panel():''}<div class="adv-req-t">NHIỆM VỤ TUẦN</div>${tasks}${on204()&&maxCl204()>=E204.chipUnl?`<p class="ev83n ev204c">Hoàn thành đủ 3 nhiệm vụ: <b>1 chip ${QN204(E204.chipWk)}</b> · cứ đủ 4 tuần hoàn thành: <b>1 chip ${QN204(E204.chip4)}</b> (đã ${(S.c204|0)%4}/4)</p>`:''}<div class="adv-req-t">TIỆM ĐỔI</div>${shop}${raid}
   <div class="adv-btns"><button class="adv-x" data-e83="x">ĐÓNG</button></div></div>`;el.hidden=false;}
 function open(){if(!on())return;render();}
 function dot(){try{roll();const e=ev();const t=e.tasks.some(x=>!S.cl[x.id]&&prog(x)>=x.target);return t||(raidOpen()&&attLeft()>0);}catch{return false;}}
 function install(){hooks();hookDmg();hookPhase();hookDraw();}
 install();setTimeout(install,400);setTimeout(install,1800);
 let lt=performance.now();setInterval(()=>{const n=performance.now(),dt=Math.min(.2,(n-lt)/1000);lt=n;try{if(RD&&!RD.ended&&typeof mode!=='undefined'&&mode==='play')tick(dt);else if(RD&&!RD.ended)tick(0);hud();}catch(e){}},50);
 setInterval(()=>{try{poll();}catch{}},1500);
 return {open,start,dot,inRaid:()=>!!(RD&&!RD.ended),state:()=>({...JSON.parse(JSON.stringify(S)),ev:ev().id,idx:evIdx(),raidOpen:raidOpen(),RD:RD&&{t:RD.t,dmg:RD.dmg,stun:RD.stun,open:RD.openNow,shards:RD.shards}}),_set:o=>{Object.assign(S,o);save();},_finish:()=>finish(true)};
})();
window.Event83=Event83;
