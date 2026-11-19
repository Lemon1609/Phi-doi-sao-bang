'use strict';
// V72a · VŨ KHÍ TỐI THƯỢNG — thiết kế GPT (THIET_KE_GPT_DA_AB_VKTT.md, Việc 2), Claude lập trình 22/10/2026.
//  • 4 vũ khí: Pháo Đài · Thế Giới · Săn Sao · Lưới Điện Laser. 16 nấc: Trắng → Lục → Lam → Lam+1..+3 → Tím → Tím+1..+3 → Huyền thoại → +1..+5.
//    Cấp 1–100, mỗi 10 cấp lên đời một lần (Huyền thoại trở đi chỉ thăng bậc ở cấp 100).
//  • 1 ô Chủ chiến (100% chỉ số + kỹ năng) + 2 ô Trợ chiến (25% chỉ số, mở ở ải 100/120). Chỉ số = % tấn công/máu/giáp, trần 12%.
//  • Kỹ năng cơ bản tự kích; kỹ năng tối thượng (Huyền thoại+) bằng nút trong trận, sạc theo thời gian hoặc sự kiện.
//  • Sát thương kỹ năng qua "ngân sách" chung: hồi 2%·D0/giây, chứa tối đa 60%·D0 (D0 ≈ 0,8 × tấn công × hệ số trận, Claude đo 22/10).
//  • Chip giao thức: V72b.
const ULT72={
 unlock:90,sup:[100,120],
 ids:['fortress','world','hunter','web'],
 nm:{fortress:'Pháo Đài',world:'Thế Giới',hunter:'Săn Sao',web:'Lưới Điện Laser'},
 sub:{fortress:'Mái vòm sắt',world:'Rối loạn thời gian',hunter:'Vòng sao hỗn loạn',web:'Bốn neo điện'},
 col:{fortress:'#ff5a7a',world:'#b45cff',hunter:'#3aa8ff',web:'#3ee08f'},
 rn:['Trắng','Lục','Lam','Lam +1','Lam +2','Lam +3','Tím','Tím +1','Tím +2','Tím +3','Huyền thoại','Huyền thoại +1','Huyền thoại +2','Huyền thoại +3','Huyền thoại +4','Huyền thoại +5'],
 rf:[0,1,2,2,2,2,3,3,3,3,4,4,4,4,4,4],fcol:['#d6e0ea','#3ee08f','#3aa8ff','#b45cff','#ffc44a'],
 cap:[10,20,30,40,50,60,65,70,75,80,85,88,91,94,97,100],// V307 Gemini lượt 2: Huyền thoại trở đi vẫn lên cấp tới 100
 promo:[[30,6,200],[50,10,400],[40,10,450],[50,12,500],[60,14,600],[70,14,700],[80,16,800],[90,18,900],[100,20,1100],[130,22,1500],[160,28,2000],[200,35,2500],[240,30,3000],[290,40,3800],[350,50,4500]],// [mảnh, linh kiện, ◈] V307 Gemini lượt 2
 lk:r=>r<5?'A':r<9?'B':r<12?'C':'D',lkN:{A:'Linh kiện A',B:'Linh kiện B',C:'Linh kiện C',D:'Linh kiện D'},// loại linh kiện theo bước lên đời r→r+1
 lvTh:[1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,8,8,8,9,9,9,9,9,10,10,10,10,11,11,11,11,11,12,12,12,15,16,17,17,18,19,19,20,21,21,22,25,26,28,29,30,31,32,34,35],lvCr:[44,45,46,46,47,48,48,49,49,50,51,51,52,53,53,54,54,55,56,61,62,63,63,64,65,65,66,67,68,68,69,70,70,71,72,73,73,74,75,75,76,77,78,78,79,80,80,81,82,83,83,84,85,85,86,87,88,88,89,95,96,97,98,99,100,102,103,104,105,106,107,109,110,111,112,113,114,116,116,122,123,125,126,127,128,129,130,131,132,134,139,140,140,141,142,142,143,144,145],// V307: mỗi cấp lv→lv+1: Thẻ EXP VKTT · ◈ (tổng 885 thẻ · 8.750 ◈)
 market2:{cr:150,th:3},
 lvCost:[[40,2],[50,3],[60,4],[70,5],[80,6],[90,7],[100,8],[110,9],[120,10],[130,11]],// mỗi cấp theo nấc đang ở: [◈, ⬢]
 B:[.002,.004,.007,.009,.011,.013,.016,.019,.022,.025,.03,.034,.038,.042,.046,.05],perLv:.0003,supK:.25,capAll:.12,
 activate:100,gift:100,
 budget:{regen:.02,cap:.6},ultCd:20,d0k:.8,
 // kỹ năng cơ bản theo mốc màu [Trắng, Lục, Lam, Tím, Huyền thoại] · tối thượng theo [HT, +1..+5]
 sk:{
  fortress:{n:[1,1,2,2,3],blk:[1,1,2,2,3],life:[4,4.5,5,5.5,6],dps:[.01,.012,.014,.016,.018],
   u:{ev:[3,3,3,2,2,2],T:[100,95,90,85,80,75],towers:5,blk:[2,2,2,3,3,3],life:[4,4.4,4.8,5.2,5.6,6],dps:[.08,.08,.08,.09,.09,.10]}},
  world:{cd:[40,38,36,34,32],stop:[1.5,1.75,2,2.25,2.5],bstop:[.25,.3,.35,.4,.5],rate:[.08,.1,.12,.14,.16],capD:[.08,.1,.12,.14,.16],
   u:{ev:[3,3,3,3,2,2],T:[110,105,100,95,90,85],stop:[4,4.4,4.8,5.2,5.6,6],bstop:[1,1.1,1.2,1.3,1.4,1.5],bul:2,rate:[.18,.2,.22,.24,.26,.28],capD:[.35,.38,.41,.44,.47,.5]}},
  hunter:{need:[10,10,9,9,8],life:[5,5.5,6,6.5,7],add:[.25,.3,.35,.4,.5],maxAge:[8,8.5,9,9.5,10],dps:[.01,.012,.014,.016,.018],
   u:{ev:[6,6,5,5,4,4],T:[100,95,90,85,80,75],life:[6,6.4,6.8,7.2,7.6,8],evo:[4,4,3,3,2,2],dps:[.06,.062,.064,.066,.068,.07],vul:[.02,.022,.024,.026,.028,.03],form:[1,1.06,1.12,1.18]}},
  web:{cd:[32,30,28,26,24],diag:[150,160,170,180,190],life:[3,3.25,3.5,3.75,4],dps:[.012,.014,.016,.018,.02],slow:[.10,.12,.14,.16,.18],
   u:{ev:[3,3,3,3,2,2],T:[100,95,90,85,80,75],diag:[260,270,280,290,300,310],life:[4,4.4,4.8,5.2,5.6,6],dps:[.075,.08,.085,.09,.095,.10],slow:[.25,.27,.29,.31,.33,.35],bossSlow:.15}}},
 cc:{win:12,max:3},
 // nguồn mảnh / linh kiện (mảnh tự chọn → gắn vào vũ khí khi nhận)
 daily:{boss:{s:6,c:1,th:2,cr:200,t:'Hạ 1 boss lớn trong Chiến dịch'},endless:{s:4,c:1,th:2,cr:200,t:'Vô Tận: đạt đợt 10',wave:10},task:{s:6,c:2,th:2,cr:200,t:'Vượt 3 ải Chiến dịch',need:3}},
 once:{newbie:{s:10,c:2,after:7,t:'Quà làm quen (sau 7 lần nhận thưởng ngày)'},ch9:{s:20,c:5,t:'Phá đảo Chương 9 (ải 180)'},ach120:{s:20,c:4,t:'Thành tích: vượt ải 120'}},
 weekly:{ecl:{s:12,c:4,t:'Thắng 1 ải Nguyệt Thực trong tuần'}},
 market:{cr:400,s:4}};
const Ult72=(()=>{
 const C=ULT72,KEY='saobang-ult72-v1',ART=(typeof ULT72_ART!=='undefined'&&ULT72_ART)||{};
 const rd=()=>{try{const v=JSON.parse(localStorage.getItem(KEY)||'null');return v&&typeof v==='object'?v:{};}catch{return {};}};
 const S=Object.assign({v:1,w:{},comp:0,pool:0,main:null,sup:[null,null],gift:0,day:'',dl:{},wk:'',wl:{},claims:0,once:{},seen:0},rd());
 for(const id of C.ids)S.w[id]=Object.assign({own:0,r:0,lv:1,sh:0},S.w[id]||{});
 // V307 (chủ dự án 19/11): linh kiện tách A/B/C/D + Thẻ EXP VKTT. Linh kiện cũ chia theo nấc VKTT đang có (bước lên đời kế tiếp).
 S.lk=Object.assign({A:0,B:0,C:0,D:0},S.lk||{});S.th=S.th|0;
 if(!S.m307){const old=S.comp|0;const ks=C.ids.filter(id=>S.w[id].own&&S.w[id].r<15).map(id=>C.lk(S.w[id].r));if(old>0){if(!ks.length)S.lk.A+=old;else{let left=old;ks.forEach((k,i)=>{const n=i===ks.length-1?left:Math.floor(old/ks.length);S.lk[k]+=n;left-=n;});}}S.m307=1;S.m307from=old;}
 const lkSum=()=>S.lk.A+S.lk.B+S.lk.C+S.lk.D;S.comp=lkSum();
 try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}
 const save=()=>{S.comp=S.lk.A+S.lk.B+S.lk.C+S.lk.D;try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const fmt=n=>Math.round(n).toLocaleString('vi-VN');
 const pct=v=>(Math.round(v*1000)/10).toLocaleString('vi-VN')+'%';
 const cleared=()=>{try{return Progress.v70.cleared();}catch{return [];}};
 const maxStage=()=>{const c=cleared();return c.length?Math.max(...c):0;};
 const unlocked=()=>maxStage()>=C.unlock||Object.values(S.w).some(w=>w.own);
 const supOpen=k=>maxStage()>=C.sup[k];
 const today=()=>{const d=new Date(Date.now()+7*3600000);return d.toISOString().slice(0,10);};
 const week=()=>{const d=new Date(Date.now()+7*3600000);const j=new Date(Date.UTC(d.getUTCFullYear(),0,1));return d.getUTCFullYear()+'-'+Math.floor(((d-j)/864e5+j.getUTCDay())/7);};
 function roll(){if(S.day!==today()){S.day=today();S.dl={boss:0,endless:0,task:0,taskN:0,mk:0,mk2:0};save();}if(S.wk!==week()){S.wk=week();S.wl={ecl:0};save();}}
 roll();
 const WP=id=>S.w[id];
 const fi=r=>C.rf[r];
 const skIdx=r=>r<1?0:r<2?1:r<6?2:r<10?3:4;
 const uIdx=r=>Math.max(0,Math.min(5,r-10));
 const isLegend=r=>r>=10;

 const needK=()=>{const L=[];const m=S.main&&WP(S.main).own?S.main:null;if(m&&WP(m).r<15)return C.lk(WP(m).r);for(const id of C.ids){const w=WP(id);if(w.own&&w.r<15)L.push(w.r);}return L.length?C.lk(Math.min(...L)):'A';};
 const addLK=(n,k)=>{n=n|0;if(n<=0)return;if(k&&k.length>1){const a=k.split('');a.forEach((x,i)=>{S.lk[x]+=i===a.length-1?n-Math.floor(n/a.length)*(a.length-1):Math.floor(n/a.length);});return;}S.lk[k&&S.lk[k]!=null?k:needK()]+=n;};
 const P=id=>{const w=WP(id);if(!w||!w.own)return 0;return C.B[w.r]+w.lv*C.perLv;};
 // móc cho chip (V72b) — chip72.js ghi đè các hàm này
 const X={stat:()=>0,has:()=>false,mod:()=>0,crystal:()=>{}};
 function wBonus(){let p=0;if(S.main&&WP(S.main).own)p+=P(S.main);S.sup.forEach((id,k)=>{if(id&&id!==S.main&&WP(id).own&&supOpen(k))p+=P(id)*C.supK;});return Math.min(C.capAll,p);}
 const bonusOf=st=>Math.min(.18,wBonus()+Math.min(.06,X.stat(st)||0));const bonus=()=>bonusOf('atk');
 // ---------- tài nguyên ----------
 const stones=()=>{try{return Workshop.getState().exp|0;}catch{return 0;}};
 function grant(o,why){if(o.s)S.pool+=o.s;if(o.c)addLK(o.c,o.k);if(o.th)S.th+=o.th|0;if(o.cr)try{Progress.grantCredits(o.cr);}catch{}if(o.ex)try{Workshop.exp70(o.ex);}catch{}save();}
 const gtxt=o=>[o.s?'+'+o.s+' mảnh tự chọn':'',o.c?'+'+o.c+' linh kiện':'',o.th?'+'+o.th+' Thẻ EXP VKTT':'',o.ex?'+'+o.ex+' ⬢':'',o.cr?'+'+fmt(o.cr)+' ◈':''].filter(Boolean).join(' · ');
 function assign(id,n){n=Math.min(n|0,S.pool);if(n<=0)return false;S.pool-=n;WP(id).sh+=n;save();return true;}
 function activate(id){const w=WP(id);if(w.own)return false;if(w.sh<C.activate){toast('CẦN '+C.activate+' MẢNH '+C.nm[id].toUpperCase());return false;}w.sh-=C.activate;w.own=1;w.r=0;w.lv=1;if(!S.main)S.main=id;save();bump();return true;}
 function lvCost(w){if(w.lv>=C.cap[w.r]||w.lv>=100)return null;const i=Math.max(0,w.lv-1);return {cr:C.lvCr[i],th:C.lvTh[i]};}
 function levelUp(id){const w=WP(id);if(!w.own)return false;const c=lvCost(w);if(!c)return false;if(Progress.balance()<c.cr||S.th<c.th)return false;if(!Progress.spendCredits(c.cr))return false;S.th-=c.th;w.lv++;save();bump();return true;}
 function promoReq(w){if(w.r>=15)return null;const p=C.promo[w.r];return {s:p[0],c:p[1],k:C.lk(w.r),cr:p[2],atCap:w.lv>=C.cap[w.r]};}
 function promote(id){const w=WP(id);const q=promoReq(w);if(!w.own||!q)return false;if(!q.atCap){toast('CẦN ĐẠT CẤP '+C.cap[w.r]);return false;}if(w.sh<q.s){toast('THIẾU MẢNH · '+w.sh+'/'+q.s);return false;}if(S.lk[q.k]<q.c){toast('THIẾU LINH KIỆN '+q.k+' · '+S.lk[q.k]+'/'+q.c);return false;}if(Progress.balance()<q.cr){toast('THIẾU HỢP KIM');return false;}
  if(!Progress.spendCredits(q.cr))return false;w.sh-=q.s;S.lk[q.k]-=q.c;w.r++;save();bump();return true;}
 function setMain(id){if(!WP(id).own)return false;S.sup=S.sup.map(x=>x===id?null:x);S.main=id;save();bump();return true;}
 function setSup(k,id){if(!supOpen(k)||(id&&!WP(id).own))return false;if(id===S.main)return false;S.sup=S.sup.map((x,j)=>j===k?id:(x===id?null:x));save();bump();return true;}
 // ---------- chỉ số → lõi game (cộng cùng gốc với các hệ khác) ----------
 let ver=0;const bump=()=>{ver++;try{Combat.render&&Combat.render();}catch{}};
 try{const of=Combat.factor;Combat.factor=function(){const v=of.apply(this,arguments);try{return v*(1+bonus());}catch{return v;}};}catch{}
 try{const ost=Combat.stats;Combat.stats=function(){const r=ost.apply(this,arguments);try{const b=bonus();if(r&&b>0){const a0=r.attack;r.attack*=1+b;r.cp=Math.round(r.cp+(r.attack-a0)*24);}}catch{}return r;};}catch{}
 try{const ocp=craftProfile;craftProfile=function(){const r=ocp.apply(this,arguments);try{const bh=bonusOf('hp'),ba=bonusOf('armor');if(r&&(bh>0||ba>0)){r.hp=Math.round(r.hp*(1+bh)*100)/100;r.shield=Math.round(r.shield*(1+ba)*100)/100;}}catch{}return r;};}catch{}
 try{const ops=Progress.stats;Progress.stats=function(){const r=ops.apply(this,arguments);try{const bh=bonusOf('hp'),ba=bonusOf('armor');if(r&&(bh>0||ba>0)){r.hp*=1+bh;r.maxShield*=1+ba;r.startShield*=1+ba;}}catch{}return r;};}catch{}
 // ---------- nguồn ngày / tuần / một lần ----------
 try{const orw=Progress.rewardStage;Progress.rewardStage=function(stage){const r=orw.apply(this,arguments);try{if(r){roll();let ecl=false;try{ecl=Eclipse67.active();}catch{}
   if(ecl){if(!S.wl.ecl)S.wl.ecl=1;}else{if(stage%10===0&&!S.dl.boss)S.dl.boss=1;S.dl.taskN=(S.dl.taskN|0)+1;if(S.dl.taskN>=C.daily.task.need&&!S.dl.task)S.dl.task=1;}save();}}catch{}return r;};}catch{}
 try{const ore=Progress.rewardEndless;Progress.rewardEndless=function(stage){const r=ore.apply(this,arguments);try{roll();if((stage|0)>=C.daily.endless.wave&&!S.dl.endless){S.dl.endless=1;save();}}catch{}return r;};}catch{}
 function onceReady(k){if(S.once[k])return 0;const cl=cleared();if(k==='ch9')return cl.includes(180)?1:0;if(k==='ach120')return cl.includes(120)?1:0;if(k==='newbie')return S.claims>=C.once.newbie.after?1:0;return 0;}
 function claim(kind,k){roll();let o=null;if(kind==='d'&&S.dl[k]===1){o=C.daily[k];S.dl[k]=2;S.claims++;}else if(kind==='w'&&S.wl[k]===1){o=C.weekly[k];S.wl[k]=2;}else if(kind==='o'&&onceReady(k)){o=C.once[k];S.once[k]=1;}
  if(!o)return null;grant(o);try{X.onClaim&&X.onClaim(kind,k);}catch{}return o;}
 function buyMarket(){roll();if(S.dl.mk){toast('HÔM NAY ĐÃ ĐỔI');return false;}if(Progress.balance()<C.market.cr){toast('THIẾU HỢP KIM');return false;}if(!Progress.spendCredits(C.market.cr))return false;S.dl.mk=1;S.pool+=C.market.s;save();return true;}
 function buyMarket2(){roll();if(S.dl.mk2){toast('HÔM NAY ĐÃ ĐỔI');return false;}if(Progress.balance()<C.market2.cr){toast('THIẾU HỢP KIM');return false;}if(!Progress.spendCredits(C.market2.cr))return false;S.dl.mk2=1;S.th+=C.market2.th;save();return true;}
 function giftPick(id){if(S.gift||maxStage()<C.unlock)return false;S.gift=1;const w=WP(id);w.sh+=C.gift;activate(id);S.main=id;save();bump();return true;}
 // ================= TRẬN ĐẤU =================
 const B={on:false,d0:0,tok:0,last:-1,ev:0,t:0,cd:0,ready:0,useAt:-99,ents:[],cc:[],basicT:0,picks:0,lastPick:-9,lastBomb:-99,stopE:new Map(),slowE:new Map(),frozenB:null,frozenUntil:0,graceUntil:0};
 const mainW=()=>S.main&&WP(S.main).own?S.main:null;
 const playing=()=>typeof mode!=='undefined'&&mode==='play';
 const sc=()=>(typeof W==='number'?W/400:1.2);
 function begin(){const id=mainW();B.on=!!id;B.tok=0;B.ev=0;B.t=0;B.ready=0;B.useAt=-99;B.ents=[];B.cc=[];B.picks=0;B.basicT=0;B.credit=(()=>{try{return typeof Stone71!=='undefined'?Math.min(.2,Stone71.ef('s1')+Stone71.ef('w1')):0;}catch{return 0;}})();B.ultN=0;B.tl6=0;B.hc=0;B.hcT=0;B.hc6=0;B.tvAt=-99;B.stopE.clear();B.slowE.clear();B.frozenB=null;B.last=-1;
  try{B.d0=C.d0k*Combat.stats().attack/(1+bonus());}catch{B.d0=10;}
  if(id){const r=WP(id).r;if(id==='world')B.basicT=cdOf('world',skIdx(r))*.5;if(id==='web')B.basicT=cdOf('web',skIdx(r))*.5;}}
 try{const ob=Combat.begin;Combat.begin=function(){const r=ob.apply(this,arguments);try{begin();}catch{}return r;};}catch{}
 const D0=()=>{let f=1;try{f=Combat.factor()/(1+bonus());}catch{}return B.d0*f;};
 function spend(a){if(!(a>0))return 0;a*=1+(X.mod('skill')||0);const t=Math.min(a,B.tok);B.tok-=t;return t;}
 function hitE(e,amt){if(!e||e.dead||!(amt>0))return 0;if(e.vul72>time)amt*=1+(e.vulV||0);if(e===boss||e.bossPart){amt*=1+(X.mod('boss')||0);try{return damageBoss(amt,'ult72',e)||0;}catch{return 0;}}
  e.hp-=amt;try{Report392.hit(amt,'ult72');}catch{}try{Feedback31.damage(e,amt,'ult72');}catch{}if(e.hp<=0)try{kill(e);}catch{}return amt;}
 const live=()=>{const L=enemies.filter(e=>!e.dead);try{if(boss&&!boss.dead)L.push(...bossDamageTargets());}catch{}return L;};
 const dist2=(a,x,y)=>{const dx=a.x-x,dy=a.y-y;return dx*dx+dy*dy;};
 // khóa cứng boss: ≤3 giây trong mỗi 12 giây
 function ccAllow(want){const now=time;B.cc=B.cc.filter(c=>c.e>now-C.cc.win);let used=0;for(const c of B.cc)used+=Math.min(c.e,now)-Math.max(c.s,now-C.cc.win);const ok=Math.max(0,Math.min(want,C.cc.max-used));if(ok>0)B.cc.push({s:now,e:now+ok});return ok;}
 function stop(e,dur,slow=1){if(!e||e.dead)return;const isB=e===boss||e.bossPart;if(isB&&slow>=1){dur=ccAllow(dur);if(dur<=0){slow=.3;dur=2;}}const cur=B.stopE.get(e);const until=time+dur;if(!cur||cur.until<until||cur.slow<slow)B.stopE.set(e,{until:Math.max(until,cur?cur.until:0),slow:Math.max(slow,cur?cur.slow:0),x:e.x,y:e.y});}
 function applyStops(){for(const [e,s] of B.stopE){if(e.dead||time>s.until){B.stopE.delete(e);continue;}const k=s.slow;e.x=s.x+(e.x-s.x)*(1-k);e.y=s.y+(e.y-s.y)*(1-k);s.x=e.x;s.y=e.y;if(k>=1)e.frozen=Math.max(e.frozen||0,.1);}}
 function freezeBullets(dur){B.frozenUntil=Math.max(B.frozenUntil,time+dur);}
 function applyBullets(){if(time<B.frozenUntil){for(const b of bullets){if(b.dead)continue;if(!b.__v72){b.__v72=[b.vx||0,b.vy||0];}b.vx=0;b.vy=0;}}else{let rel=false;for(const b of bullets){if(b.__v72){b.vx=b.__v72[0];b.vy=b.__v72[1];delete b.__v72;rel=true;}}if(rel){B.graceUntil=time+.5;invuln=Math.max(invuln,.5);}}}
 // ---------- sạc tối thượng ----------
 const U=()=>{const id=mainW();return id?C.sk[id].u:null;};
 function charge(){const id=mainW();if(!id||!isLegend(WP(id).r))return 0;if(B.ready)return 1;const u=U(),i=uIdx(WP(id).r);return Math.min(1,B.t/u.T[i]+B.ev/evReq(id,i)+(B.credit||0));}
 function evReq(id,i){let n=C.sk[id].u.ev[i];if(id==='fortress'&&X.has('fortress_1',6))n=Math.max(1,n-1);if(id==='hunter'&&X.has('hunter_1',6))n=Math.max(2,n-2);return n;}
 function addEv(n=1){const id=mainW();if(!id||!isLegend(WP(id).r)||B.ready)return;B.ev+=n;}
 function useUlt(){const id=mainW();if(!playing()||!id||!isLegend(WP(id).r))return false;if(charge()<1){toast('TỐI THƯỢNG CHƯA SẠC ĐỦ');return false;}if(time-B.useAt<C.ultCd){toast('HỒI '+Math.ceil(C.ultCd-(time-B.useAt))+' GIÂY');return false;}
  B.useAt=time;B.t=0;B.ev=0;B.ready=0;B.credit=0;B.ultN=(B.ultN|0)+1;const i=uIdx(WP(id).r);ULT[id](i);try{if(typeof Stone71!=='undefined')Stone71.onUlt();}catch{}try{tone(660,.25,'sawtooth',.05);}catch{}return true;}
 // ---------- 4 vũ khí ----------
 const img={};function I(k){if(!ART[k])return null;let im=img[k];if(!im){im=new Image();im.src=ART[k];img[k]=im;}return im.complete&&im.naturalWidth?im:null;}
 const near=(x,y,pred)=>{let best=null,bd=1e12;for(const e of live()){if(pred&&!pred(e))continue;const d=dist2(e,x,y);if(d<bd){bd=d;best=e;}}return best;};
 // Pháo Đài
 function turrets(n,blk,life,dps,big){const list=[];const ys=big?H*.8:player.y+10;for(let k=0;k<n;k++){const x=big?W*(k+1)/(n+1):clamp(player.x+(k-(n-1)/2)*58,30,W-30),y=big?ys:clamp(player.y-48-(k%2)*16,60,H-40);list.push({ty:big?'tower':'turret',x,y,blk:blk+(X.has('fortress_1',3)?1:0),life:Math.min(7,life+(X.has('fortress_2',3)?1:0)),t:0,dps:dps/n,fl:0,tk:0,tgt:null});}B.ents=B.ents.filter(e=>e.ty!=='turret'&&e.ty!=='tower').concat(list);}
 function onBomb(){const id=mainW();if(id==='fortress'){const k=skIdx(WP(id).r),s=C.sk.fortress;turrets(s.n[k],s.blk[k],s.life[k],s.dps[k],false);if(X.has('fortress_2',6)){const t0=B.ents.find(e=>e.ty==='turret');if(t0){t0.ty='tower';t0.life=Math.min(3,t0.life);}}}
  if(id==='web'&&X.has('web_2',3)&&B.basicT<=0&&time-(B.tvAt||-99)>=60){B.tvAt=time;net(false);B.basicT=cdOf('web',skIdx(WP('web').r));}if(time-B.lastBomb>=8){B.lastBomb=time;if(id==='fortress')addEv();}}
 // Thế Giới
 function timeBomb(){const k=skIdx(WP('world').r),s=C.sk.world;const t=near(player.x,player.y-200,e=>e.elite||e.large)||near(player.x,player.y-200,e=>!(e===boss||e.bossPart))||near(player.x,player.y);if(!t)return false;
  const ex=X.has('world_2',6)?.5:0;const R=90*sc(),f={ty:'tfield',x:t.x,y:t.y,R,life:s.stop[k]+ex,t:0,rate:s.rate[k]+(X.has('world_1',3)?.04:0),cap:s.capD[k],rec:new Map(),small:true};for(const e of live()){if(dist2(e,t.x,t.y)<R*R){const isB=e===boss||e.bossPart;stop(e,isB?s.bstop[k]:s.stop[k]+ex);f.rec.set(e,e.hp);}}B.ents.push(f);addEv();return true;}
 function cdOf(id,k){let c=C.sk[id].cd[k];if(id==='world'&&X.has('world_2',3))c=Math.max(20,c-4);return c;}
 // Săn Sao
 function saw(ult,i,mul=1,keep=false){const s=C.sk.hunter,k=skIdx(WP('hunter').r);const a=Math.random()*Math.PI*2,sp=240*sc();const o=ult?{ty:'saw',ult:1,form:0,evoN:0,life:s.u.life[i],maxAge:s.u.life[i]+6,dps:s.u.dps[i],vul:s.u.vul[i],R:44*sc()}:{ty:'saw',ult:0,form:0,life:s.life[k],maxAge:X.has('hunter_2',3)?12:s.maxAge[k],add:s.add[k]+(X.has('hunter_2',3)?.25:0),dps:s.dps[k]*mul,R:32*sc()};if(ult)o.vul=Math.min(.05,o.vul+(X.has('hunter_2',6)?.02:0));
  Object.assign(o,{x:player.x,y:player.y-30,vx:Math.cos(a)*sp,vy:-Math.abs(Math.sin(a))*sp,t:0,tk:0,rot:0});if(!keep)B.ents=B.ents.filter(e=>!(e.ty==='saw'&&(ult||!e.ult)));B.ents.push(o);return o;}
 function sawBasic(){if(X.has('hunter_1',3)){saw(false,0,.6);saw(false,0,.6,true);}else saw(false);}
 // Lưới Điện
 function net(ult,i){const s=C.sk.web,k=skIdx(WP('web').r);const d=(ult?s.u.diag[i]:s.diag[k])*sc();const o={ty:'net',x:clamp(player.x,d/2,W-d/2),y:clamp(player.y-d*.45,d/2,H-d/2),d,life:ult?s.u.life[i]:s.life[k],dps:ult?s.u.dps[i]:s.dps[k],slow:ult?s.u.slow[i]:s.slow[k],ult:!!ult,t:0,tk:0};B.ents=B.ents.filter(e=>e.ty!=='net');B.ents.push(o);if(!ult)addEv();return o;}
 const ULT={
  fortress(i){const u=C.sk.fortress.u;turrets(u.towers,u.blk[i],u.life[i],u.dps[i],true);flashText('MÁI VÒM SẮT');},
  world(i){const u=C.sk.world.u;const ex=X.has('world_2',6)?1:0;if(X.has('world_1',6)&&!B.tl6){B.tl6=1;try{activateSuper();}catch{}invuln=Math.max(invuln,boss&&!boss.dead?1:2);}const f={ty:'tfield',x:W/2,y:H/2,R:Math.max(W,H),life:u.stop[i]+ex,t:0,rate:u.rate[i]+(X.has('world_1',3)?.06:0),cap:u.capD[i],rec:new Map(),big:true};
   for(const e of live()){const isB=e===boss||e.bossPart;stop(e,isB?u.bstop[i]:u.stop[i]+ex);f.rec.set(e,e.hp);}freezeBullets(u.bul);B.ents=B.ents.filter(e=>e.ty!=='tfield'||!e.big);B.ents.push(f);flashText('RỐI LOẠN THỜI GIAN');},
  hunter(i){saw(true,i);flashText('VÒNG SAO HỖN LOẠN');},
  web(i){net(true,i);flashText('BỐN NEO ĐIỆN');if(X.has('web_1',6)&&!B.hc6){B.hc6=1;B.credit=.2;}}};
 let ftxt=null;function flashText(t){ftxt={t,at:time};try{act146();}catch{}}
 // V146 · GPT L3: dải kích hoạt 8 khung (khởi phát → bùng sáng → tắt) khi bấm tối thượng. Tắt: window.L3_146=false
 let A146=null;const A146T=.07;
 function act146(){if(window.L3_146===false)return;const id=mainW();if(!id)return;A146={id,at:time};}
 function drawAct146(){if(!A146||window.L3_146===false)return;const f=Math.floor((time-A146.at)/A146T);if(f<0||f>7){if(f>7)A146=null;return;}
  const im=I('ult_act_'+A146.id);if(!im)return;const c=im.naturalHeight,id=A146.id;let x=player.x,y=player.y-40,z=230;
  if(id==='world'){x=W/2;y=H*.42;z=Math.min(W,H)*.8;}
  else if(id==='web'){const n=B.ents.find(o=>o.ty==='net');if(n){x=n.x;y=n.y;z=Math.min(340,n.d*1.1);}}
  else if(id==='hunter'){y=player.y-30;z=250;}
  ctx.save();ctx.globalAlpha=1;ctx.drawImage(im,f*c,0,c,c,x-z/2,y-z/2,z,z);ctx.restore();}
 // ---------- cập nhật & vẽ mỗi khung ----------
 function inDiamond(e,o){return Math.abs(e.x-o.x)+Math.abs(e.y-o.y)<=o.d/2;}
 function step(dt){const id=mainW();if(!id)return;if(window.L3_146!==false)I('ult_act_'+id);const d0=D0();B.tok=Math.min(C.budget.cap*d0,B.tok+C.budget.regen*d0*dt);
  if(isLegend(WP(id).r)&&!B.ready){B.t+=dt*(1+Math.min(.12,X.mod('charge')||0));if(charge()>=1)B.ready=1;}
  const k=skIdx(WP(id).r);
  if(id==='world'||id==='web'){B.basicT-=dt;if(B.basicT<=0){const s=C.sk[id];if(id==='world'?timeBomb():(net(false),true))B.basicT=cdOf(id,k);else B.basicT=1;}}
  for(const o of B.ents){o.t+=dt;
   if(o.ty==='turret'||o.ty==='tower'){o.tk-=dt;o.fl=Math.max(0,o.fl-dt);
     if(o.blk>0)for(const b of bullets){if(b.dead)continue;const R=o.ty==='tower'?26:22;if(dist2(b,o.x,o.y)<R*R){b.dead=true;o.blk--;o.fl=.35;if(o.blk<=0)break;}}
     if(o.tk<=0){o.tk=.2;if(o.ty==='tower'){const hit=live().filter(e=>Math.abs(e.x-o.x)<20*sc()&&e.y<o.y);o.tgt=hit.length?{x:o.x,y:Math.min(...hit.map(e=>e.y))}:null;const amt=spend(o.dps*d0*.2);if(hit.length)for(const e of hit)hitE(e,amt/hit.length);}
      else{const e=near(o.x,o.y);o.tgt=e;if(e)hitE(e,spend(o.dps*d0*.2));}}}
   else if(o.ty==='tfield'){if(o.t>=o.life&&!o.done){o.done=true;let rec=0;for(const [e,h0] of o.rec)rec+=Math.max(0,h0-Math.max(0,e.dead?0:e.hp));let dmg=Math.min(rec*o.rate,o.cap*d0);dmg=spend(dmg);const tg=[...o.rec.keys()].filter(e=>!e.dead);if(tg.length&&dmg>0)for(const e of tg)hitE(e,dmg/tg.length);o.boom=time;}}
   else if(o.ty==='saw'){o.x+=o.vx*dt;o.y+=o.vy*dt;o.rot+=dt*(8+o.form*2);if(o.x<o.R||o.x>W-o.R)o.vx*=-1;if(o.y<o.R||o.y>H*.85)o.vy*=-1;o.x=clamp(o.x,o.R,W-o.R);o.y=clamp(o.y,o.R,H*.85);
     o.tk-=dt;if(o.tk<=0){o.tk=.25;const hit=live().filter(e=>dist2(e,o.x,o.y)<(o.R+18)*(o.R+18));const amt=spend(o.dps*(o.ult?C.sk.hunter.u.form[o.form]:1)*d0*.25);for(const e of hit){hitE(e,amt/hit.length);if(o.ult&&(!e.vulAt||time-e.vulAt>=2)){e.vul72=time+2;e.vulV=o.vul;e.vulAt=time;}}}}
   else if(o.ty==='net'){o.tk-=dt;const inside=live().filter(e=>inDiamond(e,o));for(const e of inside){const isB=e===boss||e.bossPart;stop(e,.3,isB?(o.ult?Math.min(C.sk.web.u.bossSlow,o.slow/2):o.slow/2):o.slow);}
     if(o.tk<=0){o.tk=.25;const amt=spend(o.dps*d0*.25);const tv=X.has('web_2',6);if(inside.length)for(const e of inside){let m=1;if(tv){const dd=Math.hypot(e.x-o.x,e.y-o.y)/sc();m+=.2*Math.max(0,Math.min(1,(dd-140)/60));}hitE(e,amt/inside.length*m);}
      if(inside.length&&X.has('web_1',3)&&(B.hc|0)<3){B.hcT=(B.hcT||0)+.25;if(B.hcT>=2){B.hcT=0;B.hc=(B.hc|0)+1;try{X.crystal(1);}catch{}}}}}}
  B.ents=B.ents.filter(o=>o.t<(o.ty==='tfield'?o.life+.6:o.life));
  applyStops();applyBullets();}
 function drawImg(k,x,y,w,h,rot=0,a=1){const im=I(k);if(!im)return false;ctx.save();ctx.globalAlpha*=a;ctx.translate(x,y);if(rot)ctx.rotate(rot);ctx.drawImage(im,-w/2,-h/2,w,h);ctx.restore();return true;}
 // ---------- GPT 16.3: lớp hiệu ứng thêm cho 4 VKTT (chỉ vẽ, không đổi cơ chế) ----------
 const FA=k=>{try{const i=FX16Run.art(k);return i&&i.complete&&i.naturalWidth?i:null;}catch{return null;}};
 const FXR=()=>{try{return FX16Run;}catch{return null;}};
 function fdraw(k,x,y,w,h,rot,a,comp){const im=FA(k);if(!im||a<=0)return;ctx.save();ctx.globalCompositeOperation=comp||'lighter';ctx.globalAlpha=Math.min(1,a);ctx.translate(x,y);if(rot)ctx.rotate(rot);ctx.drawImage(im,-w/2,-h/2,w,h);ctx.restore();}
 function strip(k,x1,y1,x2,y2,th,a,scroll){const im=FA(k);if(!im||a<=0)return;const L=Math.hypot(x2-x1,y2-y1);if(L<2)return;const tw=th*4;ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=Math.min(1,a);ctx.translate(x1,y1);ctx.rotate(Math.atan2(y2-y1,x2-x1));
  const off=((scroll||0)%tw+tw)%tw;for(let x=-off;x<L;x+=tw){const x0=Math.max(0,x),x1b=Math.min(L,x+tw);if(x1b<=x0)continue;const sx=(x0-x)/tw*im.naturalWidth,sw=(x1b-x0)/tw*im.naturalWidth;ctx.drawImage(im,sx,0,sw,im.naturalHeight,x0,-th/2,x1b-x0,th);}ctx.restore();}
 function fx163(){const k=sc(),F=FXR();
  // Pháo Đài: vách chắn nối các trụ + quầng đầu nòng
  for(const ty of ['tower','turret']){const L=B.ents.filter(o=>o.ty===ty).sort((a,b)=>a.x-b.x);for(let i=1;i<L.length;i++){const a=L[i-1],b=L[i],fa=Math.min(1,(a.life-a.t)/.4,a.t/.25),fb=Math.min(1,(b.life-b.t)/.4,b.t/.25);if(ty==='turret'&&Math.hypot(b.x-a.x,b.y-a.y)>150*k)continue;const yo=ty==='tower'?-18:0;strip('vktt_fortress_barrier',a.x,a.y+yo,b.x,b.y+yo,(ty==='tower'?30:22)*k,.8*Math.min(fa,fb),time*40);}
   for(const o of L){const f=Math.min(1,(o.life-o.t)/.4,o.t/.15);if(o.tgt&&!o.tgt.dead){const z=(ty==='tower'?40:28)*k*(1+.12*Math.sin(time*30+o.x));fdraw('vktt_fortress_muzzle',o.x,o.y-(ty==='tower'?40:16),z,z,time*2,.9*f);}if(o.fl>0)fdraw('vktt_fortress_muzzle',o.x,o.y,60*k,60*k,0,.6*f);}}
  for(const o of B.ents){
   if(o.ty==='tfield'){if(o.cx===undefined){o.cx=o.big?player.x:o.x;o.cy=o.big?player.y:o.y;}const live=o.t<o.life;const a=live?Math.min(1,o.t*5):Math.max(0,1-(o.t-o.life)*4);const S=(o.big?250:o.R*1.7)*(o.big?k:1);
     if(live||a>0){if(window.L2_145===false)fdraw('vktt_world_clock',o.cx,o.cy,S,S,o.t*.25,(o.big?.85:.55)*a);const spin=o.t<.26?o.t/.26*Math.PI*2:Math.PI*2+Math.sin(time*40)*.02*(live?1:0);if(window.L2_145===false){fdraw('vktt_world_hand',o.cx,o.cy,S*.125,S*.5,spin-.35,.95*a);fdraw('vktt_world_hand',o.cx,o.cy,S*.1,S*.36,spin*12-.35,.6*a);}}
     if(!live&&!o.sh163){o.sh163=1;if(F){F.addShards(o.cx,o.cy,o.big?12:6,['vktt_world_shatter_01','vktt_world_shatter_02'],o.big?1.5:1);F.addFx('vktt_world_shatter_02',o.cx,o.cy,S*.4,S*1.25,360,{alpha:.95});}}}
   else if(o.ty==='saw'){const f=Math.min(1,(o.life-o.t)/.4,o.t/.15);if(o.ult||o.form>0)fdraw('vktt_saw_slash',o.x,o.y,o.R*3,o.R*3,-o.rot*.6,(.35+.12*o.form)*f);
     if(o.life-o.t<.07&&!o.sl163){o.sl163=1;if(F)F.addFx('vktt_saw_slash',o.x,o.y,o.R*2,o.R*5,320,{vr:5});}}
   else if(o.ty==='net'){const f=Math.min(1,(o.life-o.t)/.4,o.t/.2),h=o.d/2,P=[[o.x,o.y-h],[o.x+h,o.y],[o.x,o.y+h],[o.x-h,o.y]];
     for(let i=0;i<4;i++){const [x1,y1]=P[i],[x2,y2]=P[(i+1)%4];strip('vktt_grid_beam',x1,y1,x2,y2,18*k,.75*f,time*120);}
     strip('vktt_grid_beam',P[0][0],P[0][1],P[2][0],P[2][1],12*k,.45*f,-time*90);strip('vktt_grid_beam',P[3][0],P[3][1],P[1][0],P[1][1],12*k,.45*f,time*90);
     for(const [x,y] of P.concat([[o.x,o.y]])){const z=30*k*(1+.15*Math.sin(time*9+x));fdraw('vktt_grid_node',x,y,z,z,time,.95*f);}
     if(F&&(!o.sp163||time-o.sp163>.22)){o.sp163=time;const q=P.concat([[o.x,o.y]])[Math.random()*5|0];F.addFx('vktt_grid_spark',q[0],q[1],20*k,70*k,260,{rot:Math.random()*6});}}}}
  // V145 · GPT L2: ụ pháo theo bậc · cụm mảnh thời gian thưa (thay vòng đồng hồ) · neo lưới điện · dấu ngưng thời gian. Tắt: window.L2_145=false
  const L2=k=>k;const tq=()=>{try{const f=fi(WP('fortress').r);return f>=4?3:f>=3?2:1;}catch{return 1;}};
  function shards(o,cx,cy,rx,ry,n,z,a){if(!o.sd145){o.sd145=[];let sd=(o.x*13+o.y*7+n*31)|0;const rnd=()=>{sd=(sd*1103515245+12345)&0x7fffffff;return sd/0x7fffffff;};for(let i=0;i<n;i++){const ang=i/n*Math.PI*2+rnd()*.6,rr=.35+.65*Math.sqrt(rnd());o.sd145.push([Math.cos(ang)*rr,Math.sin(ang)*rr,rnd()*6.28,.8+.4*rnd()]);}}
   for(const [dx,dy,r0,sz] of o.sd145)drawImg('ult_time_shard',cx+dx*rx,cy+dy*ry,z*sz,z*sz*.95,r0+o.t*.25*(sz-1),a*.9);}
  function webAnchors(o,fade){const h=o.d/2,P=[[o.x,o.y-h],[o.x+h,o.y],[o.x,o.y+h],[o.x-h,o.y]],z=o.ult?30:24;let ok=false;
   for(const [x,y] of P)ok=drawImg('ult_web_anchor',x,y,z*.55,z*1.2,0,fade)||ok;
   for(let i=0;i<4;i++){const [x1,y1]=P[i],[x2,y2]=P[(i+1)%4];drawImg('ult_web_node',(x1+x2)/2,(y1+y2)/2,14,14,time*2,.9*fade);}
   drawImg('ult_web_node',o.x,o.y,o.ult?26:20,o.ult?26:20,-time*2,fade);return ok;}
 function draw(){const id=mainW();if(!id)return;ctx.save();
  for(const o of B.ents){const fade=Math.min(1,(o.life-o.t)/.4,o.t/.15);
   if(o.ty==='turret'){if(o.tgt&&!o.tgt.dead){ctx.strokeStyle=C.col.fortress;ctx.globalAlpha=.7*fade;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(o.x,o.y-14);ctx.lineTo(o.tgt.x,o.tgt.y);ctx.stroke();ctx.globalAlpha=1;}
     drawImg(L2('ult_turret_'+tq()),o.x,o.y,44,44*1.36,0,fade)||drawImg('ult_turret',o.x,o.y,44,44,0,fade)||(()=>{ctx.fillStyle=C.col.fortress;ctx.fillRect(o.x-10,o.y-10,20,20);})();if(window.L2_145===false){if(o.fl>0||o.blk>0)drawImg('ult_turret_shield',o.x,o.y,62,62,0,(o.fl>0?.95:.35)*fade);}else if(o.fl>0)drawImg('ult_block_flash',o.x,o.y,58,58,0,.95*fade);}
   else if(o.ty==='tower'){if(o.tgt){ctx.save();ctx.globalCompositeOperation='lighter';const g=ctx.createLinearGradient(o.x-10,0,o.x+10,0);g.addColorStop(0,'rgba(255,90,122,0)');g.addColorStop(.5,'rgba(255,200,215,.95)');g.addColorStop(1,'rgba(255,90,122,0)');ctx.fillStyle=g;ctx.globalAlpha=fade;ctx.fillRect(o.x-10,o.tgt.y,20,o.y-44-o.tgt.y);ctx.restore();}
     drawImg('ult_laser_tower',o.x,o.y,48,72,0,fade);if(o.fl>0)drawImg(window.L2_145===false?'ult_turret_shield':'ult_block_flash',o.x,o.y,64,64,0,.9*fade);}
   else if(o.ty==='tfield'){if(o.big){const a=o.t<o.life?Math.min(.75,o.t*3):Math.max(0,.75-(o.t-o.life)*1.5);if(window.L2_145===false)drawImg('ult_time_field',W/2,H/2,Math.min(W,H)*1.15,Math.min(W,H)*1.15,o.t*.15,a);else shards(o,W/2,H*.42,W*.46,H*.38,10,64,a);}
     else{const a=o.t<o.life?.9:Math.max(0,.9-(o.t-o.life)*1.6);if(window.L2_145===false)drawImg('ult_time_field',o.x,o.y,o.R*2.2,o.R*2.2,o.t*.4,a*.8);else shards(o,o.x,o.y,o.R,o.R,6,44,a);if(o.t<o.life)drawImg('ult_time_bomb',o.x,o.y,34,34,Math.sin(o.t*6)*.2,a);}
     if(window.RING142===true&&o.boom&&time-o.boom<.4){/* V142: bỏ vòng nổ loang (không vòng tròn quanh tàu/quái) */ctx.strokeStyle='#e9d6ff';ctx.lineWidth=3;ctx.globalAlpha=1-(time-o.boom)/.4;ctx.beginPath();ctx.arc(o.big?W/2:o.x,o.big?H/2:o.y,(o.big?160:o.R)*(1+(time-o.boom)*2),0,Math.PI*2);ctx.stroke();ctx.globalAlpha=1;}}
   else if(o.ty==='saw'){const k='ult_saw_'+(o.form+1);drawImg(k,o.x,o.y,o.R*2.1,o.R*2.1,o.rot,fade)||(()=>{ctx.fillStyle=C.col.hunter;ctx.beginPath();ctx.arc(o.x,o.y,o.R,0,7);ctx.fill();})();}
   else if(o.ty==='net'){(window.L2_145!==false&&webAnchors(o,fade))||drawImg('ult_web_field',o.x,o.y,o.d,o.d,0,(o.ult?.95:.75)*fade)||(()=>{ctx.strokeStyle=C.col.web;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(o.x,o.y-o.d/2);ctx.lineTo(o.x+o.d/2,o.y);ctx.lineTo(o.x,o.y+o.d/2);ctx.lineTo(o.x-o.d/2,o.y);ctx.closePath();ctx.stroke();})();}}
  try{if(window.FX163!==false)fx163();}catch(e){}
  try{drawAct146();}catch(e){}
  // dấu dễ tổn thương
  if(window.L2_145!==false)for(const e of live()){const z=B.stopE.get(e);if(z&&z.until>time)drawImg('ult_frozen',e.x,e.y-(e===boss?78:34),16,22,Math.sin(time*3+e.x)*.15,.95);}
  if(B.ents.some(o=>o.ty==='saw'&&o.ult))for(const e of live())if(e.vul72>time)drawImg('ult_vulnerable',e.x,e.y-(e===boss?70:30),20,23,0,.9);
  if(window.FTXT142===true&&ftxt&&time-ftxt.at<1.4){/* V142: không chữ nổi trong trận (quyết định đã chốt) */ctx.globalAlpha=Math.min(1,(1.4-(time-ftxt.at))*2);ctx.font="900 26px 'Neo',sans-serif";ctx.textAlign='center';ctx.fillStyle=C.col[id];ctx.strokeStyle='#06101c';ctx.lineWidth=5;ctx.strokeText(ftxt.t,W/2,H*.32);ctx.fillText(ftxt.t,W/2,H*.32);ctx.globalAlpha=1;}
  ctx.restore();}
 try{const vd=VisualFX.draw;VisualFX.draw=function(){const r=vd.apply(this,arguments);try{if(mode==='play'||mode==='pause'){if(mode==='play'){const dt=B.last<0?0:Math.max(0,Math.min(.05,time-B.last));B.last=time;if(dt>0)step(dt);}draw();}else B.last=-1;btn();}catch(e){}return r;};}catch{}
 // sự kiện: nhặt vật phẩm, bom, Bạo Tẩu tự nhiên
 try{const oc=collect;collect=function(d){const r=oc.apply(this,arguments);try{if(playing()&&d&&!d.ult72&&d.type!=='craft'&&time-B.lastPick>=1){B.lastPick=time;const id=mainW();if(id==='hunter'){const s=C.sk.hunter,k=skIdx(WP(id).r);const cur=B.ents.find(o=>o.ty==='saw'&&!o.ult);const us=B.ents.find(o=>o.ty==='saw'&&o.ult);
     if(us){us.evoN++;const need=s.u.evo[uIdx(WP(id).r)];if(us.evoN>=need&&us.form<3){us.evoN=0;us.form++;us.R*=1.08;}}
     if(cur){for(const c2 of B.ents)if(c2.ty==='saw'&&!c2.ult)c2.life=Math.min(c2.maxAge,c2.life+c2.add);addEv();}else{B.picks++;if(B.picks>=s.need[k]){B.picks=0;sawBasic();}}}}}catch{}return r;};}catch{}
 try{const ob=bomb;bomb=function(){const b0=typeof bombs!=='undefined'?bombs:0;const r=ob.apply(this,arguments);try{if(playing()&&bombs<b0)onBomb();}catch{}return r;};}catch{}
 try{const oa=activateSuper;activateSuper=function(){const r=oa.apply(this,arguments);try{if(playing()&&mainW()==='web'&&B.basicT<=0){net(false);B.basicT=cdOf('web',skIdx(WP('web').r));}}catch{}return r;};}catch{}
 // ---------- nút trong trận ----------
 let bt=null;
 function btn(){const id=mainW();const show=playing()||(typeof mode!=='undefined'&&mode==='pause');if(!bt){bt=document.createElement('button');bt.id='ult72-btn';bt.type='button';bt.innerHTML='<i></i><b></b><small></small>';bt.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();useUlt();});document.body.appendChild(bt);}{const host=document.getElementById('bomb')?.parentElement;if(host&&bt.parentNode!==host)host.appendChild(bt);}
  const vis=show&&id&&isLegend(WP(id).r);bt.hidden=!vis;if(!vis)return;const q=charge(),cd=Math.max(0,C.ultCd-(time-B.useAt));const k=id+'|'+Math.round(q*40)+'|'+Math.ceil(cd);if(bt.dataset.k===k)return;bt.dataset.k=k;
  bt.style.setProperty('--q',(q*100).toFixed(1)+'%');bt.style.setProperty('--uc',C.col[id]);bt.classList.toggle('rdy',q>=1&&cd<=0);const ic=ART['ult_icon_'+id];const ii=bt.querySelector('i');if(ii.dataset.id!==id){ii.dataset.id=id;ii.innerHTML=ic?`<img src="${ic}" alt="">`:'✦';}
  bt.querySelector('b').textContent=q>=1?(cd>0?Math.ceil(cd)+'s':'SẴN SÀNG'):Math.floor(q*100)+'%';bt.querySelector('small').textContent=C.nm[id].toUpperCase();}
 // ================= GIAO DIỆN =================
 let el=null,cur=null;
 function build(){el=document.createElement('div');el.className='m63 adv69 u72';el.hidden=true;document.body.appendChild(el);
  el.addEventListener('click',e=>{const t=e.target.closest('[data-a]');if(!t){if(e.target===el)close();return;}const a=t.dataset.a,v=t.dataset.v;
   if(a==='close')close();else if(a==='sel'){cur=v;render();}else if(a==='gift'){if(giftPick(v)){cur=v;band('NHẬN '+C.nm[v].toUpperCase());}render();}
   else if(a==='act'){if(activate(v))band('KÍCH HOẠT '+C.nm[v].toUpperCase());render();}
   else if(a==='lv'){if(levelUp(cur))render();else toast('THIẾU HỢP KIM / THẺ EXP VKTT');}
   else if(a==='lv10'){let n=0;while(n<10&&levelUp(cur))n++;if(!n)toast('THIẾU HỢP KIM / ĐÁ NÂNG CẤP');render();}
   else if(a==='pro'){if(promote(cur))band('LÊN ĐỜI · '+C.rn[WP(cur).r].toUpperCase());render();}
   else if(a==='main'){setMain(cur);render();}else if(a==='sup'){if(!setSup(+v,cur))toast(supOpen(+v)?'KHÔNG ĐẶT ĐƯỢC':'Ô TRỢ CHIẾN MỞ Ở ẢI '+C.sup[+v]);render();}
   else if(a==='asg'){if(assign(cur,v==='all'?S.pool:+v))render();}
   else if(a==='chip'){try{Chip72.open(cur);}catch(e){}}else if(a==='tasks')tasks();else if(a==='back')render();
   else if(a==='nav'){const L=C.ids,i=L.indexOf(cur);cur=L[(i+(+v)+L.length)%L.length];render();}else if(a==='det'){srDet=!srDet;render();}
   else if(a==='cl'){const [kd,k]=v.split('|');const o=claim(kd,k);if(o)band('NHẬN · '+gtxt(o));tasks();}
   else if(a==='mk'){if(buyMarket())band('+'+C.market.s+' MẢNH TỰ CHỌN');tasks();}else if(a==='mk2'){if(buyMarket2())band('+'+C.market2.th+' THẺ EXP VKTT');tasks();}});}
 function close(){if(el)el.hidden=true;}
 function band(t){const b=document.createElement('div');b.className='adv-band';b.textContent=t;document.body.appendChild(b);setTimeout(()=>b.remove(),1600);try{tone(880,.18,'triangle',.06);}catch{}}
 const tag=r=>`<span class="fr70" style="--fc:${C.fcol[fi(r)]}">${C.rn[r]}</span>`;
 const model=(id,r)=>{let k='ult_'+id+'_f'+(fi(r)+1);/* V144: 5 dạng theo mốc màu (GPT L1) */if(window.FORM144===false||!ART[k])k='ult_'+id+(isLegend(r)?'_legend':'_base');return ART[k]?`<img src="${ART[k]}" alt="">`:`<i style="background:${C.col[id]}"></i>`;};
 function skillText(id,w){const s=C.sk[id],k=skIdx(w.r);
  const base={fortress:`Dùng bom: gọi ${s.n?s.n[k]:0} pháo nhỏ ${s.life?s.life[k]:0} giây, mỗi pháo chặn ${s.blk?s.blk[k]:0} viên đạn và tự bắn địch gần nhất.`,
   world:`Mỗi ${s.cd?s.cd[k]:0} giây ném bom thời gian: dừng quái quanh mục tiêu ${s.stop?String(s.stop[k]).replace('.',','):0} giây (boss ${s.bstop?String(s.bstop[k]).replace('.',','):0} giây), hết giờ nổ ${s.rate?pct(s.rate[k]):0} sát thương đã gây lên chúng.`,
   hunter:`Nhặt ${s.need?s.need[k]:0} vật phẩm: gọi lưỡi cưa nảy quanh màn hình ${s.life?String(s.life[k]).replace('.',','):0} giây; mỗi vật phẩm nhặt thêm kéo dài cưa.`,
   web:`Mỗi ${s.cd?s.cd[k]:0} giây (hoặc khi Bạo Tẩu): giăng lưới laser hình thoi ${s.life?String(s.life[k]).replace('.',','):0} giây, gây sát thương và làm chậm ${s.slow?pct(s.slow[k]):0} quái trong lưới.`}[id];
  const u=s.u,i=uIdx(w.r),f=v=>String(v).replace('.',',');const ult=({fortress:()=>`5 trụ laser ${f(u.life[i])} giây bắn thẳng lên, mỗi trụ chặn ${u.blk[i]} đạn.`,world:()=>`Trường thời gian toàn màn ${f(u.stop[i])} giây: dừng quái, dừng đạn 2 giây, boss ${f(u.bstop[i])} giây; hết giờ nổ ${pct(u.rate[i])} sát thương đã tích.`,hunter:()=>`Lưỡi cưa tiến hóa ${f(u.life[i])} giây, nhặt ${u.evo[i]} vật phẩm thì tiến hóa (tối đa 4 dạng), đánh dấu "dễ tổn thương".`,web:()=>`Lưới lớn ${f(u.life[i])} giây, làm chậm ${pct(u.slow[i])} quái thường (boss tối đa 15%).`})[id]();
  const ch=`Sạc: ${u.T[i]} giây hoặc ${u.ev[i]} lần ${({fortress:'dùng bom',world:'kích kỹ năng cơ bản',hunter:'nhặt vật phẩm khi cưa đang chạy',web:'kích lưới cơ bản'})[id]}.`;
  return {base,ult,ch};}
 function giftPanel(){if(!el)build();el.classList.remove('srm');el.innerHTML=`<div class="m63-card adv-card u72-card"><div class="m63-eye">VŨ KHÍ TỐI THƯỢNG · MỞ KHÓA</div><h3>Chọn vũ khí đầu tiên</h3><p class="adv-max">Bạn được tặng ${C.gift} mảnh để kích hoạt 1 vũ khí. Các vũ khí còn lại kích hoạt bằng mảnh tích lũy.</p>
   <div class="u72-pick">${C.ids.map(id=>`<button data-a="gift" data-v="${id}" style="--uc:${C.col[id]}">${model(id,0)}<b>${C.nm[id]}</b><small>${C.sub[id]}</small></button>`).join('')}</div><div class="adv-btns"><button class="adv-x" data-a="close">ĐỂ SAU</button></div></div>`;el.hidden=false;}
 let srDet=false;
 function showroom(w,b,T,nTask){const own=w.own,r=own?w.r:0,col=C.col[cur],fc=C.fcol[fi(r)];
  const same=C.rn.map((_,i)=>i).filter(i=>fi(i)===fi(r)),pip=same.map(i=>`<i class="${i<=r&&own?'on':''}"></i>`).join('');
  const sl=(k)=>{const id=k?S.sup[k-1]:S.main,op=k?supOpen(k-1):true;return `<button class="sr-slot ${k?'sup':'main'} ${id===cur?'cur':''} ${op?'':'lock'}" ${id?`data-a="sel" data-v="${id}"`:''} style="--uc:${id?C.col[id]:'#5fc8ff'}">${id&&ART['ult_icon_'+id]?`<img src="${ART['ult_icon_'+id]}" alt="">`:'<em>'+(op?'+':'🔒')+'</em>'}<small>${k?(op?'TRỢ CHIẾN '+k:'ẢI '+C.sup[k-1]):'CHỦ CHIẾN'}</small></button>`;};
  const lc=own?lvCost(w):null,pr=own?promoReq(w):null;
  const stat=own?`<div class="sr-st"><div><i>Cấp</i><b>${w.lv}/${C.cap[r]}</b></div><div><i>Chỉ số chủ chiến</i><b class="up">+${pct(P(cur))}</b></div><div><i>Cộng cho đội</i><b>+${pct(b)}</b><small>trần ${pct(C.capAll)}</small></div><div><i>Mảnh</i><b>${w.sh}</b></div><div><i>Thẻ EXP VKTT</i><b>${S.th}</b></div><div><i>Linh kiện ${pr?pr.k:'D'}</i><b>${S.lk[pr?pr.k:'D']}</b></div></div>`:`<div class="sr-st"><div><i>Mảnh</i><b>${w.sh}/${C.activate}</b></div><div><i>Kỹ năng</i><b>${esc(C.sub[cur])}</b></div></div>`;
  const sk=`<button class="sr-sk" data-a="det" style="--uc:${col}">${ART['ult_icon_'+cur]?`<img src="${ART['ult_icon_'+cur]}" alt="">`:''}<small>${srDet?'THU GỌN':'KỸ NĂNG'}</small></button>`;
  const det=srDet?`<div class="sr-det"><p class="u72-sk"><b>Kỹ năng cơ bản</b>${esc(T.base)}</p><p class="u72-sk ${isLegend(r)?'':'lk'}"><b>Tối thượng ${isLegend(r)?'':'· mở ở Huyền thoại'}</b>${esc(T.ult)}<br><small>${esc(T.ch)}</small></p>${own?`<div class="u72-res"><span>Linh kiện <b>A ${S.lk.A} · B ${S.lk.B} · C ${S.lk.C} · D ${S.lk.D}</b></span><span>Thẻ EXP VKTT <b>${S.th}</b></span><span>Mảnh tự chọn <b>${S.pool}</b></span>${S.pool?`<button data-a="asg" data-v="all">GẮN HẾT VÀO ${C.nm[cur].toUpperCase()}</button>`:''}</div><div class="u72-acts"><button class="hb-btn" data-a="lv10" ${lc?'':'disabled'}>NÂNG 10 CẤP<small>${lc?'tối đa 10 lần':'—'}</small></button><button class="hb-btn ${S.main===cur?'':'gold'}" data-a="main" ${S.main===cur?'disabled':''}>${S.main===cur?'✓ CHỦ CHIẾN':'ĐẶT CHỦ CHIẾN'}<small>kỹ năng + 100% chỉ số</small></button><button class="hb-btn" data-a="sup" data-v="0" ${S.main===cur?'disabled':''}>TRỢ CHIẾN 1<small>${supOpen(0)?'25% chỉ số':'mở ở ải '+C.sup[0]}</small></button><button class="hb-btn" data-a="sup" data-v="1" ${S.main===cur?'disabled':''}>TRỢ CHIẾN 2<small>${supOpen(1)?'25% chỉ số':'mở ở ải '+C.sup[1]}</small></button></div>`:''}</div>`:'';
  const main=own?`<button class="sr-go" data-a="lv" ${lc?'':'disabled'}>NÂNG CẤP<small>${lc?lc.th+' Thẻ EXP · '+lc.cr+' ◈':'Đạt trần cấp'}</small></button>`:`<button class="sr-go ${w.sh>=C.activate?'':'off'}" data-a="act" data-v="${cur}">KÍCH HOẠT<small>${w.sh}/${C.activate} mảnh</small></button>`;
  return `<div class="sr" style="--uc:${col};--fc:${fc}"><div class="sr-top"><b class="sr-title">VŨ KHÍ TỐI THƯỢNG</b><button class="sr-tk ${nTask?'hot':''}" data-a="tasks">NHIỆM VỤ${nTask?'<i>'+nTask+'</i>':''}</button></div>
   <div class="sr-slots">${sl(1)}${sl(0)}${sl(2)}</div>
   <div class="sr-stage ${own?'':'dim'}" data-w="${cur}"><div class="sr-dome"></div><div class="sr-ring"></div><div class="sr-pt">${'<i></i>'.repeat(14)}</div><div class="sr-wpn"><div class="sr-spin">${model(cur,r)}</div></div><div class="sr-plat"><div class="sr-pips">${pip}</div></div>
    <button class="sr-nav l" data-a="nav" data-v="-1">‹</button><button class="sr-nav r" data-a="nav" data-v="1">›</button>${sk}${typeof Chip72!=='undefined'&&own?`<button class="sr-chip" data-a="chip"><b>CHIP</b><small>${Chip72.summary(cur)}</small></button>`:''}</div>
   <div class="sr-name"><b>${C.nm[cur]}</b><span class="sr-rk">${own?C.rn[r]:'CHƯA KÍCH HOẠT'}</span></div>${stat}${det}
   <div class="sr-bot"><button class="sr-sd" data-a="${own&&pr?'pro':'det'}" ${own&&!pr?'disabled':''}>${own?(pr?'LÊN '+C.rn[r+1].toUpperCase():'TỐI ĐA'):'CHI TIẾT'}<small>${own&&pr?pr.s+' mảnh · '+pr.c+' LK '+pr.k:''}</small></button>${main}<button class="sr-sd" data-a="close">QUAY LẠI</button></div></div>`;}
 function render(){if(!el)build();el.classList.remove('srm');if(!unlocked()){el.innerHTML=`<div class="m63-card adv-card u72-card"><div class="m63-eye">VŨ KHÍ TỐI THƯỢNG</div><h3>Mở khóa ở ải ${C.unlock}</h3><p class="adv-max">Vượt ải ${C.unlock} để nhận vũ khí tối thượng đầu tiên.</p><div class="adv-btns"><button class="adv-x" data-a="close">ĐÓNG</button></div></div>`;el.hidden=false;return;}
  if(!S.gift&&maxStage()>=C.unlock&&!Object.values(S.w).some(w=>w.own))return giftPanel();
  roll();if(!cur)cur=S.main||C.ids[0];const w=WP(cur),b=bonus();
  const slots=[['CHỦ CHIẾN',S.main,true],['TRỢ CHIẾN 1',S.sup[0],supOpen(0)],['TRỢ CHIẾN 2',S.sup[1],supOpen(1)]].map(([n,id,op],k)=>`<button class="u72-slot ${k?'':'main'} ${op?'':'lock'}" ${id?`data-a="sel" data-v="${id}"`:''} style="--uc:${id?C.col[id]:'#5fc8ff'}"><small>${n}</small>${id?model(id,WP(id).r):'<em>'+(op?'Trống':'Ải '+C.sup[k-1])+'</em>'}${id?`<b>${C.nm[id]}</b>${tag(WP(id).r)}`:''}</button>`).join('');
  const list=C.ids.map(id=>{const x=WP(id);return `<button class="u72-w ${id===cur?'on':''} ${x.own?'':'off'}" data-a="sel" data-v="${id}" style="--uc:${C.col[id]}">${ART['ult_icon_'+id]?`<img src="${ART['ult_icon_'+id]}" alt="">`:''}<b>${C.nm[id]}</b><small>${x.own?C.rn[x.r]+' · Lv'+x.lv:x.sh+'/'+C.activate+' mảnh'}</small></button>`;}).join('');
  let det='';const T=skillText(cur,w);
  if(!w.own){det=`<div class="u72-det"><div class="u72-big">${model(cur,0)}</div><h4>${C.nm[cur]} <small>${C.sub[cur]}</small></h4><p class="u72-sk"><b>Kỹ năng cơ bản</b>${esc(T.base)}</p><p class="adv-cost">Mảnh: <b>${w.sh}/${C.activate}</b></p>
    <div class="adv-btns"><button class="m63-go ${w.sh>=C.activate?'':'off'}" data-a="act" data-v="${cur}">KÍCH HOẠT</button></div></div>`;}
  else{const lc=lvCost(w),pr=promoReq(w);
   det=`<div class="u72-det"><div class="u72-big">${model(cur,w.r)}</div><h4>${C.nm[cur]} ${tag(w.r)} <small>Cấp ${w.lv}/${C.cap[w.r]}</small></h4>
    <div class="adv-cmp"><div><i>CHỈ SỐ (Ô CHỦ CHIẾN)</i>+${pct(P(cur))} tấn công · máu · giáp</div><div><i>ĐANG CỘNG CHO ĐỘI</i><span class="up">+${pct(b)}</span> (trần ${pct(C.capAll)})</div></div>
    <p class="u72-sk"><b>Kỹ năng cơ bản</b>${esc(T.base)}</p><p class="u72-sk ${isLegend(w.r)?'':'lk'}"><b>Tối thượng ${isLegend(w.r)?'':'· mở ở Huyền thoại'}</b>${esc(T.ult)}<br><small>${esc(T.ch)}</small></p>
    <div class="u72-res"><span>Mảnh <b>${w.sh}</b></span><span>Linh kiện <b>A ${S.lk.A} · B ${S.lk.B} · C ${S.lk.C} · D ${S.lk.D}</b></span><span>Thẻ EXP VKTT <b>${S.th}</b></span><span>Mảnh tự chọn <b>${S.pool}</b></span>${S.pool?`<button data-a="asg" data-v="all">GẮN HẾT VÀO ${C.nm[cur].toUpperCase()}</button>`:''}</div>
    <div class="u72-acts"><button class="hb-btn cyan" data-a="lv" ${lc?'':'disabled'}>NÂNG CẤP<small>${lc?lc.th+' Thẻ EXP · '+lc.cr+' ◈':'Đạt trần cấp'}</small></button><button class="hb-btn cyan" data-a="lv10" ${lc?'':'disabled'}>NÂNG 10 CẤP<small>${lc?'tối đa 10 lần':'—'}</small></button>
     <button class="hb-btn gold" data-a="pro" ${pr?'':'disabled'}>${pr?'LÊN '+C.rn[w.r+1].toUpperCase():'TỐI ĐA'}<small>${pr?(pr.atCap?'':'cần cấp '+C.cap[w.r]+' · ')+pr.s+' mảnh · '+pr.c+' linh kiện '+pr.k+' · '+fmt(pr.cr)+' ◈':'Huyền thoại +5'}</small></button>
     <button class="hb-btn ${S.main===cur?'':'gold'}" data-a="main" ${S.main===cur?'disabled':''}>${S.main===cur?'✓ CHỦ CHIẾN':'ĐẶT CHỦ CHIẾN'}<small>kỹ năng + 100% chỉ số</small></button>
     <button class="hb-btn" data-a="sup" data-v="0" ${S.main===cur?'disabled':''}>TRỢ CHIẾN 1<small>${supOpen(0)?'25% chỉ số':'mở ở ải '+C.sup[0]}</small></button>${typeof Chip72!=='undefined'?`<button class="hb-btn wide u72-chipb" data-a="chip">CHIP GIAO THỨC<small>${Chip72.summary(cur)}</small></button>`:''}<button class="hb-btn" data-a="sup" data-v="1" ${S.main===cur?'disabled':''}>TRỢ CHIẾN 2<small>${supOpen(1)?'25% chỉ số':'mở ở ải '+C.sup[1]}</small></button></div></div>`;}
  const nTask=countReady();
  if(window.U72SR!==false){el.classList.add('srm');el.innerHTML=showroom(w,b,T,nTask);el.hidden=false;return;}
  el.innerHTML=`<div class="m63-card adv-card u72-card"><div class="m63-eye">VŨ KHÍ TỐI THƯỢNG</div><h3>Phi đội · +${pct(b)} chỉ số <button class="u72-tk ${nTask?'hot':''}" data-a="tasks">NHIỆM VỤ & MẢNH${nTask?' · '+nTask:''}</button></h3>
   <div class="u72-slots">${slots}</div><div class="u72-list">${list}</div>${det}<div class="adv-btns"><button class="adv-x" data-a="close">ĐÓNG</button></div></div>`;el.hidden=false;}
 function countReady(){roll();let n=0;for(const k in C.daily)if(S.dl[k]===1)n++;for(const k in C.weekly)if(S.wl[k]===1)n++;for(const k in C.once)if(onceReady(k))n++;return n;}
 function tasks(){if(!el)build();el.classList.remove('srm');roll();const st=(v)=>v===2?'<em>ĐÃ NHẬN</em>':v===1?'':'<em class="no">CHƯA XONG</em>';
  const row=(kd,k,o,v,extra='')=>`<div class="adv-s"><div><b>${esc(o.t)}${extra}</b><small>${esc(gtxt(o))}</small></div>${v===1?`<button data-a="cl" data-v="${kd}|${k}">NHẬN</button>`:st(v)}</div>`;
  el.innerHTML=`<div class="m63-card adv-card u72-card"><div class="m63-eye">NHIỆM VỤ VŨ KHÍ TỐI THƯỢNG</div><h3>Mảnh tự chọn: <span style="color:#ffd56a">${S.pool}</span></h3><p class="adv-sub" style="margin:2px 0 8px;font-size:12px;opacity:.9">Linh kiện A <b>${S.lk.A}</b> · B <b>${S.lk.B}</b> · C <b>${S.lk.C}</b> · D <b>${S.lk.D}</b> · Thẻ EXP VKTT <b>${S.th}</b></p><h3 hidden></h3>
   <div class="adv-req-t">HẰNG NGÀY</div><div class="adv-src">${Object.entries(C.daily).map(([k,o])=>row('d',k,o,S.dl[k]|0,k==='task'?' ('+Math.min(o.need,S.dl.taskN|0)+'/'+o.need+')':'')).join('')}
    <div class="adv-s"><div><b>Chợ mảnh</b><small>${fmt(C.market.cr)} ◈ → ${C.market.s} mảnh tự chọn · 1 lần/ngày</small></div>${S.dl.mk?'<em>ĐÃ ĐỔI</em>':'<button data-a="mk">ĐỔI</button>'}</div>
    <div class="adv-s"><div><b>Chợ thẻ EXP</b><small>${fmt(C.market2.cr)} ◈ → ${C.market2.th} Thẻ EXP VKTT · 1 lần/ngày</small></div>${S.dl.mk2?'<em>ĐÃ ĐỔI</em>':'<button data-a="mk2">ĐỔI</button>'}</div></div>
   <div class="adv-req-t">HẰNG TUẦN</div><div class="adv-src">${Object.entries(C.weekly).map(([k,o])=>row('w',k,o,S.wl[k]|0)).join('')}</div>
   <div class="adv-req-t">MỘT LẦN</div><div class="adv-src">${Object.entries(C.once).map(([k,o])=>row('o',k,o,S.once[k]?2:onceReady(k))).join('')}</div>
   <p class="adv-cost">Mảnh tự chọn gắn vào vũ khí nào cũng được (nút GẮN ở màn vũ khí).</p><div class="adv-btns"><button class="adv-x" data-a="back">‹ QUAY LẠI</button><button class="adv-x" data-a="close">ĐÓNG</button></div></div>`;el.hidden=false;}
 function open(){if(!el)build();render();}
 // nút ở sảnh/kho
 setInterval(()=>{try{const fx=document.querySelector('#hgr41 .h1-fx');if(fx&&!fx.querySelector('[data-u72]')){const b=document.createElement('button');b.dataset.u72=1;b.className='adv69b';b.textContent='VŨ KHÍ TT';b.addEventListener('click',e=>{e.stopPropagation();open();});fx.appendChild(b);}
   const b=document.querySelector('#hgr41 [data-u72]');if(b){const hot=(!S.gift&&maxStage()>=C.unlock)||countReady()>0;b.classList.toggle('hot',hot);}}catch{}},1000);
 return {X,bonusOf,mainW,cur:()=>cur,render:()=>render(),C,state:()=>JSON.parse(JSON.stringify(S)),open,tasks,giftPick,activate,assign,levelUp,promote,setMain,setSup,bonus,P,claim,buyMarket,useUlt,charge,
  buyMarket2,give:o=>{if(!o)return;if(o.s)S.pool+=o.s|0;if(o.c)addLK(o.c,o.k);if(o.lk)for(const k in o.lk)if(S.lk[k]!=null)S.lk[k]+=o.lk[k]|0;if(o.th)S.th+=o.th|0;if(o.w)for(const id in o.w){try{WP(id).sh+=o.w[id]|0;}catch{}}save();bump();},_B:B,_set:o=>{for(const k in o){if(k==='w'){for(const id in o.w)Object.assign(S.w[id],o.w[id]);}else S[k]=o[k];}save();bump();},_D0:D0,_spend:spend};
})();
