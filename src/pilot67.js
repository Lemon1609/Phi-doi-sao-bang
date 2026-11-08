'use strict';
// V67 · PHI CÔNG & TIỀM NĂNG — số liệu Gemini (GEMINI_TRA_LOI_PHI_CONG_SKIN.md) + Claude thêm ĐỘI 1 CHÍNH + 3 PHỤ (học từ clip game tham khảo).
//  • Phi công CHÍNH: đủ chỉ số + nội tại. 3 phi công PHỤ: mỗi người góp 5% chỉ số cơ bản, không có nội tại.
//  • Đủ 4 người trong đội → "Cộng hưởng": +10% nạp Graze (không cộng lực chiến).
//  • Kiểm trần: Tử Dạ Lv.30 (2.976 CP) + cây tiềm năng đủ (1.920) + 3 phụ (~450) ≈ 5.350 CP ≈ 14,8% của bộ max 36.000 (< 15%).
//  • Chỉnh so với Gemini: Thiên Lam đổi "mỗi phát thứ 10 ×2" → +tỉ lệ chí mạng (+5% → +10%), vì game đã có chí mạng ngẫu nhiên 10%.
//    Tử Dạ (cần Chợ Đen để lấy mảnh): tạm mở khi có ≥ 2 món SSS và vượt ải 140.
//  • Trần chung (Gemini): mỗi lần Bạo Tẩu tối đa 12 s; đang Bạo Tẩu thì Graze chỉ nạp 30%.
const PILOT_ART=typeof PILOT_ASSETS!=='undefined'?PILOT_ASSETS:{};
const PILOTS67=[
 {id:1,name:'Lâm Phương',tag:'Át Chủ Bài',rank:'A',col:'#3fd2ff',kind:'graze',a:15,b:45,txt:v=>`+${v}% nạp Graze`},
 {id:2,name:'Hạ Vy',tag:'Chỉ Huy',rank:'A',col:'#ffd166',kind:'super',a:1,b:2.5,txt:v=>`Bạo Tẩu +${v.toFixed(1)} s · +${Math.round(8+(v-1)/1.5*12)}% sát thương khi Bạo Tẩu`},
 {id:3,name:'Kiều An',tag:'Kỹ Sư',rank:'A',col:'#ff9f43',kind:'regen',a:18,b:10.5,txt:v=>`Không trúng đạn 4 s → hồi 1 giáp mỗi ${v.toFixed(1)} s`},
 {id:4,name:'Thiên Lam',tag:'Xạ Thủ',rank:'S',col:'#8e7bff',kind:'boss',a:10,b:25,txt:v=>`+${v}% sát thương lên boss · +${Math.round(5+(v-10)/15*5)}% chí mạng`},
 {id:5,name:'Bảo Ngọc',tag:'Cựu Binh',rank:'A',col:'#59e3a0',kind:'tank',a:15,b:30,txt:v=>`Máu ≤ 2: giảm ${v}% sát thương nhận`},
 {id:6,name:'Mộc Miên',tag:'Cứu Thương',rank:'S',col:'#ff7eb6',kind:'pickup',a:20,b:45,txt:v=>`Nhặt buff: ${v}% hồi 1 giáp/máu · hút xa +80 px`},
 {id:7,name:'Hàn Sương',tag:'Băng Tiễn',rank:'S',col:'#9fe8ff',kind:'gear',a:12,b:27,txt:v=>`Tên lửa nhanh hơn ${v}% · tàu con bắn +${Math.round(10+(v-12)/15*15)}%`},
 {id:8,name:'Tử Dạ',tag:'Bóng Đêm',rank:'SS',col:'#c77dff',kind:'sss',a:3,b:6.5,txt:v=>`+${v.toFixed(1)}% sát thương mỗi món SSS (tối đa 4) · bom để lại trường bóng tối`}];
const PTREE67=[
 {k:1,n:'Đồng Bộ Hỏa Lực I',max:10,atk:3,cost:l=>({c:1500*l,e:25*l})},
 {k:2,n:'Khoang Lái Gia Cố',max:5,hp:1,cost:l=>({c:2500*l,e:40*l})},
 {k:3,n:'Lớp Đệm Từ Trường',max:5,sh:1,cost:l=>({c:2500*l,e:40*l})},
 {k:4,n:'Phản Xạ Thần Kinh',max:5,graze:3,need:[1,5],cost:l=>({c:4000*l,core:1})},
 {k:5,n:'Quá Tải Vũ Khí Phụ',max:5,gearDmg:4,need:[2,3],cost:l=>({c:4000*l,core:1})},
 {k:6,n:'Cộng Hưởng Thần Kinh',max:5,allDmg:2,need:[3,3],cost:l=>({c:5000*l,core:2})},  // Claude: Gemini ghi '+4% hiệu quả ngọc' → đổi +2% sát thương chung/cấp (dễ đo, không đụng hệ Ngọc)
 {k:7,n:'Đồng Bộ Hỏa Lực II',max:10,atk:2.5,need:[4,5],cost:l=>({c:3500*l,e:60*l})},
 {k:8,n:'Giác Quan Thứ Sáu',max:1,last:1,need:[7,10],cost:l=>({c:50000,e:500,core:10})}];
// V75 · THANG 12 NẤC PHẨM CHẤT PHI CÔNG (Gemini PILOT74 + nguồn Tháp Boss của PLAN75, người dùng chốt 23/10).
//  • Nấc 0..11 (Trắng → Tím +5), trần cấp theo nấc (10 → 60), nâng nấc tốn MẢNH đúng phi công + ◈, cần đạt trần cấp của nấc hiện tại.
//  • Chỉ số: trần chỉ số giữ đúng mức cũ (đã kiểm ≤15% CP): A 73 ATK/4 Máu/4 Giáp · S/SS 100/6/6. f = statMult/4,1 × (0,55 + 0,45·lv/60).
//  • Nội tại: mạnh dần theo passiveTier 1..6 của nấc (thay cho mốc cấp cũ).
//  • Chiêu mộ vẫn theo ĐIỀU KIỆN cũ (game chưa có quay phi công nên không có trùng lặp) → A vào nấc 0, S nấc 2, SS nấc 6.
//  • Đổi bản cũ: tìm nấc + cấp THẤP NHẤT có lực chiến ≥ bản cũ (không mất CP), cộng mảnh + ◈ bù theo bảng Gemini.
const PILOT75={rankStart:{A:0,S:2,SS:6},
 cap:{A:{atk:73,hp:4,sh:4},S:{atk:100,hp:6,sh:6},SS:{atk:100,hp:6,sh:6}},
 tiers:[{n:'Trắng',cap:10,sh:0,c:0,m:1.00,pt:1,col:'#d9e2ec'},{n:'Lục',cap:15,sh:15,c:2000,m:1.20,pt:1,col:'#59e37a'},{n:'Lam',cap:20,sh:25,c:5000,m:1.45,pt:2,col:'#3fa9ff'},{n:'Lam +1',cap:25,sh:20,c:7000,m:1.60,pt:2,col:'#3fa9ff'},
  {n:'Lam +2',cap:30,sh:25,c:9500,m:1.75,pt:2,col:'#3fa9ff'},{n:'Lam +3',cap:35,sh:30,c:12000,m:1.95,pt:3,col:'#3fa9ff'},{n:'Tím',cap:40,sh:50,c:18000,m:2.30,pt:4,col:'#b06cff'},{n:'Tím +1',cap:45,sh:35,c:22000,m:2.55,pt:4,col:'#b06cff'},
  {n:'Tím +2',cap:50,sh:45,c:27000,m:2.85,pt:5,col:'#b06cff'},{n:'Tím +3',cap:55,sh:55,c:33000,m:3.20,pt:5,col:'#b06cff'},{n:'Tím +4',cap:58,sh:70,c:40000,m:3.60,pt:5,col:'#b06cff'},{n:'Tím +5',cap:60,sh:100,c:55000,m:4.10,pt:6,col:'#ffb52e'}],
 // bù khi đổi bản cũ (theo khoảng cấp cũ)
 refund:{A:[[10,10,3000],[20,15,5000],[30,25,10000]],S:[[15,15,8000],[30,30,15000]],SS:[[15,20,20000],[30,40,35000]]},
 src:{daily:2,weekly:5,endless:{20:[1,3],30:[1,3]},tower:{every:5,min:5,max:12,mile:{50:30,100:60}}}};
try{UNLOCK66.pilot={lv:50,stall:{min:42,fails:3},name:'Phi công',sel:['[data-pl67]']};}catch{}
const Pilot67=(()=>{
 const KEY='saobang-pilot-v67';
 let S={own:{},pieces:{},team:[null,null,null,null],tree:{},seen:false};try{Object.assign(S,JSON.parse(localStorage.getItem(KEY)||'{}'));}catch{}
 S.own=S.own||{};S.pieces=S.pieces||{};S.team=Array.isArray(S.team)?S.team.slice(0,4):[null,null,null,null];while(S.team.length<4)S.team.push(null);S.tree=S.tree||{};S.tier=S.tier||{};S.got=S.got||{};
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const P=id=>PILOTS67.find(p=>p.id===id);
 const lvOf=id=>S.own[id]?S.own[id].lv:0;
 // ---------- chỉ số ----------
 const rk=p=>p.rank==='SS'?'SS':p.rank==='S'?'S':'A';
 function oldBase(p,lv){const A=p.rank==='A';return {atk:A?8+2*(lv-1):12+3*(lv-1),hp:(A?1:2)+Math.floor(lv/10)+(p.kind==='tank'?(lv>=26?4:2+Math.floor((lv-1)/12)):0),sh:(A?1:2)+Math.floor(lv/10)};}
 const tierOf=id=>S.tier[id]??PILOT75.rankStart[rk(P(id))];
 const capOf=id=>PILOT75.tiers[tierOf(id)].cap;
 function statAt(p,lv,t){const C=PILOT75.cap[rk(p)],f=PILOT75.tiers[t].m/4.1*(.55+.45*lv/60);return {atk:Math.round(C.atk*f*10)/10,hp:Math.round((C.hp*f+(p.kind==='tank'?4*Math.min(1,f*1.15):0))*10)/10,sh:Math.round(C.sh*f*10)/10};}
 const cpOf=b=>b.atk*24+b.hp*55+b.sh*65;
 function base(id){const p=P(id),lv=lvOf(id);if(!p||!lv)return {atk:0,hp:0,sh:0};return statAt(p,lv,tierOf(id));}
 function passive(id){const p=P(id),lv=lvOf(id);if(!p||!lv)return 0;const pt=PILOT75.tiers[tierOf(id)].pt;return p.a+(p.b-p.a)*Math.min(1,(pt-1)/5);}
 // đổi bản cũ (1 lần): nấc + cấp thấp nhất có CP ≥ bản cũ, cộng bù
 (function migrate(){if(S.mig75)return;const R=PILOT75.refund;for(const k in S.own){const id=+k,p=P(id);if(!p)continue;const L=S.own[k].lv|0,r=rk(p),old=cpOf(oldBase(p,L));let t0=PILOT75.rankStart[r],T=t0,LV=1;
   outer:for(let t=t0;t<12;t++){const lo=t>t0?PILOT75.tiers[t-1].cap:1;for(let lv=Math.max(1,lo);lv<=PILOT75.tiers[t].cap;lv++){if(cpOf(statAt(p,lv,t))>=old){T=t;LV=lv;break outer;}if(t===11&&lv===60){T=11;LV=60;}}}
   S.tier[id]=T;S.own[k].lv=LV;const row=(R[r]||[]).find(x=>L<=x[0])||(R[r]||[]).slice(-1)[0];if(row){S.pieces[id]=(S.pieces[id]||0)+row[1];try{Progress.grantCredits(row[2]);}catch{}}}
  S.mig75=1;save();})();
 const tl=k=>S.tree[k]||0;
 function treeStats(){let atk=0,hp=0,sh=0;for(const n of PTREE67){const l=tl(n.k);if(n.atk)atk+=n.atk*l;if(n.hp)hp+=n.hp*l;if(n.sh)sh+=n.sh*l;}return {atk,hp,sh};}
 function teamStats(){const main=S.team[0];const o={atk:0,hp:0,sh:0};if(main){const b=base(main);o.atk+=b.atk;o.hp+=b.hp;o.sh+=b.sh;}for(let i=1;i<4;i++){const id=S.team[i];if(!id)continue;const b=base(id);o.atk+=b.atk*.05;o.hp+=b.hp*.05;o.sh+=b.sh*.05;}const t=treeStats();o.atk+=t.atk;o.hp+=t.hp;o.sh+=t.sh;return o;}
 const unlockedSys=()=>{try{return Onboard66.open('pilot');}catch{return false;}};
 const main=()=>unlockedSys()&&S.team[0]&&S.own[S.team[0]]?S.team[0]:null;
 const has=kind=>{const m=main();return m&&P(m).kind===kind;};
 const pv=kind=>{const m=main();return m&&P(m).kind===kind?passive(m):0;};
 const resonance=()=>unlockedSys()&&S.team.every(id=>id&&S.own[id]);
 // lực chiến hiển thị
 try{const ost=Combat.stats;Combat.stats=function(){const r=ost.apply(this,arguments);try{if(unlockedSys()&&r){const t=teamStats();const o={...r,attack:r.attack+t.atk,hp:r.hp+t.hp,armor:r.armor+t.sh};o.cp=Math.round(o.attack*24+o.hp*55+o.armor*65);return o;}}catch{}return r;};}catch{}
 // ---------- trong trận ----------
 let baseAtk=0;
 function atkMult(){try{if(!unlockedSys())return 1;const t=teamStats();if(!t.atk)return 1;if(!baseAtk){baseAtk=1;}let m=1+(t.atk?t.atk/Math.max(200,baseAtk):0);if(has('sss')){let n=0;try{for(const k of ['armor','missiles','sidearm']){const d=Gear44.activeDef(k);if(d&&d.tier==='sss')n++;}if(activeRobot&&activeRobot.super)n++;}catch{}m*=1+Math.min(4,n)*pv('sss')/100;}if(has('super')&&superTime>0)m*=1+(8+(pv('super')-1)/1.5*12)/100;m*=1+tl(6)*.02;return m;}catch{return 1;}}
 const ods=allyDamageScale;allyDamageScale=function(){return ods.apply(this,arguments)*atkMult();};
 const ors=reset;reset=function(){const r=ors.apply(this,arguments);try{if(mode==='play'&&unlockedSys()){try{const s0=Combat.stats.call(Combat);baseAtk=Math.max(200,(s0.attack||0)-teamStats().atk);}catch{}const t=teamStats();maxHp=Math.round((maxHp+t.hp)*10)/10;hp=maxHp;maxShield=Math.round((maxShield+t.sh)*10)/10;shield=Math.min(maxShield,Math.round((shield+t.sh)*10)/10);if(tl(8)>=1){try{Combat26.addCharge07(50);}catch{}}last8=false;hud();}}catch{}return r;};
 const ons=nextStage;nextStage=function(){const r=ons.apply(this,arguments);try{if(mode==='play'&&unlockedSys()){if(tl(8)>=1){try{Combat26.addCharge07(50);}catch{}}last8=false;}}catch{}return r;};
 // Graze: Lâm Phong + nút 4 + cộng hưởng; trần chung khi Bạo Tẩu ×0,3
 const og=Combat26.graze;Combat26.graze=function(){const sup=superTime>0;const r=og.apply(this,arguments);try{if(r){let bonus=0;if(unlockedSys()){bonus+=pv('graze')/100+tl(4)*.03+(resonance()?.1:0);}if(sup)Combat26.addCharge07(5*(1+bonus)*.3-5);else if(bonus>0)Combat26.addCharge07(5*bonus);}}catch{}return r;};
 // Bạo Tẩu: Hạ Vy + trần 12 s
 const oas=activateSuper;activateSuper=function(){const r=oas.apply(this,arguments);try{if(has('super'))superTime+=pv('super');superTime=Math.min(12,superTime);}catch{}return r;};
 // Kiều An hồi giáp, Bảo Long giảm sát thương khi nguy kịch, Giác Quan Thứ Sáu
 let lastHit=-99,regenT=0,last8=false;
 const odm=damage;damage=function(){const h0=hp,s0=shield;
  if(unlockedSys()&&tl(8)>=1&&!last8&&hp<=1&&shield<=0&&invuln<=0&&mode==='play'){last8=true;invuln=1;try{ring(player.x,player.y,'#ffe08a',70);toast('✦ GIÁC QUAN THỨ SÁU · ĐỠ ĐÒN CHÍ TỬ');}catch{}return;}
  const r=odm.apply(this,arguments);try{const loss=(h0-hp)+(s0-shield);if(loss>0){lastHit=time;if(has('tank')&&h0<=2&&hp>0){const back=Math.min(h0-hp,(h0-hp)*pv('tank')/100);hp+=back;}}}catch{}return r;};
 // Mộc Miên: hút xa + hồi khi nhặt; Thiên Lam chí mạng
 let pickCd=-9;
 const oup=update;update=function(dt){const r=oup.apply(this,arguments);try{if(mode!=='play'||!unlockedSys())return r;
   if(has('regen')&&time-lastHit>4){regenT+=dt;if(regenT>=pv('regen')){regenT=0;if(shield<maxShield){shield=Math.min(maxShield,shield+1);try{ring(player.x,player.y,'#ff9f43',40);}catch{}}}}else regenT=0;
   if(has('pickup'))for(const d of drops){if(d.dead||d.type==='star'||d.type==='none')continue;const D=Math.hypot(d.x-player.x,d.y-player.y);if(D<150&&D>30){const a=Math.atan2(player.y-d.y,player.x-d.x);d.x+=Math.cos(a)*260*dt;d.y+=Math.sin(a)*260*dt;}}
  }catch{}return r;};
 try{const ocl=collect;collect=function(d){const r=ocl.apply(this,arguments);try{if(mode==='play'&&has('pickup')&&d&&d.type!=='star'&&time-pickCd>5&&Math.random()*100<pv('pickup')){pickCd=time;if(shield<maxShield)shield=Math.min(maxShield,shield+1);else hp=Math.min(maxHp,hp+1);}}catch{}return r;};}catch{}
 try{if(typeof CRIT66!=='undefined'){const base=CRIT66.chance,bm=CRIT66.mult;setInterval(()=>{try{CRIT66.chance=base+(has('boss')?(5+(pv('boss')-10)/15*5)/100:0)+(typeof CRIT77!=='undefined'&&CRIT77?CRIT77.crit:0);CRIT66.mult=bm+(typeof CRIT77!=='undefined'&&CRIT77?CRIT77.critMult:0);}catch{}},1000);}}catch{}
 const odb=damageBoss;damageBoss=function(amount,source,part){try{if(has('boss')&&amount>0)amount*=1+pv('boss')/100;}catch{}return odb.call(this,amount,source,part);};
 // Tử Dạ: bom để lại trường bóng tối 3 s (150% ATK/giây trong 140 px)
 let fields=[];
 const obo=bomb;bomb=function(){const b0=bombs;const r=obo.apply(this,arguments);try{if(has('sss')&&bombs<b0)fields.push({x:player.x,y:player.y-60,t:0});}catch{}return r;};
 const oup2=update;update=function(dt){const r=oup2.apply(this,arguments);try{if(mode==='play'&&fields.length){let avg=0,n=0;for(const s of shots)if(s.main66&&!s.dead){avg+=s.damage;n++;}avg=n?avg/n:2;for(const f of fields){f.t+=dt;for(const e of enemies)if(!e.dead&&Math.hypot(e.x-f.x,e.y-f.y)<140){e.hp-=avg*1.5*dt;if(e.hp<=0)kill(e);}}fields=fields.filter(f=>f.t<3);}}catch{}return r;};
 // Hàn Sương + nút 5: tên lửa/tàu con
 const gearRate=k=>{let m=1;try{if(!unlockedSys())return 1;if(has('gear')){const v=pv('gear');m*=k==='missiles'?1-v/100:1/(1+(10+(v-12)/15*15)/100);}}catch{}return m;};
 const gearDmg=()=>unlockedSys()?1+tl(5)*.04:1;
 const oh=Arsenal30.hit;Arsenal30.hit=function(s,e){const r=oh.apply(this,arguments);try{const g=gearDmg();if(g>1&&s&&(s.gearKind==='missiles'||s.gearKind==='sidearm')&&e&&!e.dead){const x=s.damage*(g-1);if(e===boss||e.bossPart)damageBoss(x,'gear',e);else{e.hp-=x;if(e.hp<=0)kill(e);}}}catch{}return r;};
 // ---------- mảnh & mở người ----------
 const COND={2:()=>{try{return Object.values(Campaign36.getState().stars||{}).reduce((a,b)=>a+b,0)>=150;}catch{return false;}},
  3:()=>{try{return (Meta40.state().tower.best||0)>=10;}catch{return false;}},4:()=>{try{return Progress.getState().cleared.includes(80);}catch{return false;}},
  5:()=>{try{return (JSON.parse(localStorage.getItem('saobang-daily-v63')||'{}').count||JSON.parse(localStorage.getItem('saobang-daily-v63')||'{}').streak||0)>=7||Progress.getState().cleared.includes(70);}catch{return false;}},
  6:()=>{try{return (Campaign36.getState().endlessBest||0)>=30||Progress.getState().cleared.includes(90);}catch{return false;}},
  7:()=>{try{return Progress.getState().cleared.includes(110);}catch{return false;}},
  8:()=>{try{let n=Object.keys(Gear44.state().owned||{}).length+((Fusion.getState().supers||[]).length?1:0);return n>=2&&Progress.getState().cleared.includes(140);}catch{return false;}}};
 const CONDTXT={1:'Tặng khi mở hệ thống',2:'Đạt 150★ Chiến dịch',3:'Vượt tầng 10 Tháp Boss',4:'Vượt ải 80',5:'7 lần Thử thách ngày (hoặc vượt ải 70)',6:'Sóng 30 Vô tận (hoặc vượt ải 90)',7:'Vượt ải 110',8:'Có ≥ 2 món SSS và vượt ải 140'};
 function canRecruit(id){return !S.own[id]&&(id===1||(COND[id]&&COND[id]()));}
 function recruit(id){if(!canRecruit(id))return false;S.own[id]={lv:1};S.tier[id]=PILOT75.rankStart[rk(P(id))];if(!S.team.includes(id)){const i=S.team.indexOf(null);if(i>=0)S.team[i]=id;}save();try{toast('★ CHIÊU MỘ PHI CÔNG · '+P(id).name.toUpperCase());}catch{}return true;}
 function addPiece(id,n=1){S.pieces[id]=(S.pieces[id]||0)+n;save();}
 // mảnh rơi khi qua ải/càn quét: 25% (ải boss 100%) 1 mảnh của phi công đã có
 const orw=Progress.rewardStage;Progress.rewardStage=function(stage){const r=orw.apply(this,arguments);try{if(r&&unlockedSys()){const ids=Object.keys(S.own).map(Number);if(ids.length&&(stage%5===0||Math.random()<.25)){const id=ids[Math.floor(Math.random()*ids.length)];addPiece(id,1);(r.materials=r.materials||[]).push('1 mảnh phi công '+P(id).name);}}}catch{}return r;};
 // ---------- nâng cấp ----------
 function lvCost(lv){// từ lv lên lv+1 (trần 60): giá theo cấp tương đương bản cũ (lv/2), nhân 0,6; lõi ở mốc 40 và 60
  const n=Math.ceil((lv+1)/2);let c,e,core=0;if(n<=10){c=300+80*n;e=8+2*n;}else if(n<=20){c=1200+150*(n-10);e=30+4*(n-10);}else{c=3000+300*(n-20);e=75+6*(n-20);}
  if(lv+1===40)core=2;if(lv+1===60)core=5;return {c:Math.round(c*.6/10)*10,e:Math.round(e*.6),pieces:0,core};}
 function tierCost(id){const t=tierOf(id);if(t>=11)return null;const T=PILOT75.tiers[t+1];return {c:T.c,pieces:T.sh};}
 function coresHave(){try{return Meta407.cores();}catch{return 0;}}
 function pay(c){if(c.c&&Progress.balance()<c.c)return 'Thiếu hợp kim';if(c.e&&Workshop.expBalance()<c.e)return 'Thiếu đá';if(c.core&&coresHave()<c.core)return 'Thiếu Lõi Siêu Hợp';return '';}
 function spend(c){if(c.c&&!Progress.spendCredits(c.c))return false;if(c.e&&!Workshop.spendExp(c.e)){Progress.grantCredits(c.c||0);return false;}if(c.core&&!(Meta407.spendCores&&Meta407.spendCores(c.core))){Progress.grantCredits(c.c||0);Workshop.grant({exp:c.e||0});return false;}return true;}
 function levelUp(id){const o=S.own[id];if(!o)return 'Chưa có';if(o.lv>=60)return 'Đã tối đa';if(o.lv>=capOf(id))return 'Đạt trần cấp '+capOf(id)+' · cần NÂNG NẤC';const c=lvCost(o.lv);const why=pay(c);if(why)return why;if(!spend(c))return 'Không đủ tài nguyên';o.lv++;save();return '';}
 function tierUp(id){const o=S.own[id];if(!o)return 'Chưa có';const c=tierCost(id);if(!c)return 'Đã tối đa';if(o.lv<capOf(id))return 'Cần đạt cấp '+capOf(id);if((S.pieces[id]||0)<c.pieces)return 'Cần '+c.pieces+' mảnh '+P(id).name+' (có '+(S.pieces[id]||0)+')';if(Progress.balance()<c.c)return 'Thiếu hợp kim';if(!Progress.spendCredits(c.c))return 'Thiếu hợp kim';S.pieces[id]-=c.pieces;S.tier[id]=tierOf(id)+1;save();try{toast('★ '+P(id).name.toUpperCase()+' LÊN NẤC '+PILOT75.tiers[S.tier[id]].n.toUpperCase());}catch{}return '';}
 function nodeOk(n){if(!n.need)return true;return tl(n.need[0])>=n.need[1];}
 function treeUp(k){const n=PTREE67.find(x=>x.k===k);if(!n)return 'Không có';const l=tl(k);if(l>=n.max)return 'Đã tối đa';if(!nodeOk(n))return 'Cần nút '+n.need[0]+' đạt Lv.'+n.need[1];const c=n.cost(l+1);const why=pay(c);if(why)return why;if(!spend(c))return 'Không đủ tài nguyên';S.tree[k]=l+1;save();return '';}
 function setSlot(i,id){if(id&&!S.own[id])return;const j=S.team.indexOf(id);if(j>=0)S.team[j]=S.team[i];S.team[i]=id;save();}
 // ---------- vẽ chân dung (tranh GPT nếu có, không thì huy hiệu chữ) ----------
 const IMG={};for(const p of PILOTS67)if(PILOT_ART['p'+p.id]){const im=new Image();im.src=PILOT_ART['p'+p.id];IMG[p.id]=im;}
 function portrait(id,size){const p=P(id);if(!p)return '';if(PILOT_ART['p'+id])return `<img class="pl67-img" src="${PILOT_ART['p'+id]}" alt="" style="width:${size}px;height:${size}px">`;const ini=p.name.split(' ').map(w=>w[0]).join('');return `<span class="pl67-ph" style="width:${size}px;height:${size}px;--c:${p.col}">${ini}</span>`;}
 function drawHud(){if(window.HUD116!==false&&window.HUDF116)return;/* V116: chủ dự án bỏ ảnh phi công trong trận */const id=main();if(!id||!(mode==='play'||mode==='pause'))return;const p=P(id),F116=window.HUD116!==false&&window.HUDF116||0,x=F116?W*.29:30,y=F116?H-39*F116:H-150,r=F116?22*F116:19;ctx.save();ctx.globalCompositeOperation='source-over';ctx.globalAlpha=.95;ctx.fillStyle='#06111bd0';ctx.beginPath();ctx.arc(x,y,r+3,0,TAU);ctx.fill();ctx.strokeStyle=p.col;ctx.lineWidth=2;ctx.stroke();
  const im=IMG[id];if(im&&im.complete&&im.naturalWidth){ctx.save();ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.clip();ctx.drawImage(im,x-r,y-r,r*2,r*2);ctx.restore();}else{ctx.fillStyle=p.col;ctx.font='800 13px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(p.name.split(' ').map(w=>w[0]).join(''),x,y+1);}
  if(fields.length){ctx.globalCompositeOperation='lighter';for(const f of fields){ctx.globalAlpha=.25*(1-f.t/3);const g=ctx.createRadialGradient(f.x,f.y,10,f.x,f.y,140);g.addColorStop(0,'#c77dff');g.addColorStop(1,'#2a0a3a00');ctx.fillStyle=g;ctx.beginPath();ctx.arc(f.x,f.y,140,0,TAU);ctx.fill();}}
  ctx.restore();}
 const ovd=VisualFX.draw;VisualFX.draw=function(){const r=ovd.apply(this,arguments);try{drawHud();}catch{}return r;};
 // ---------- bảng PHI CÔNG ----------
 let el=null,sel=1,tab='list',msg='';
 function build(){el=document.createElement('div');el.className='m63 pl67';el.hidden=true;document.body.appendChild(el);
  el.addEventListener('click',e=>{const t=e.target.closest('[data-x]');if(!t){if(e.target===el)close();return;}const a=t.dataset.x,v=+t.dataset.v;msg='';
   if(a==='close')return close();if(a==='tab')tab=t.dataset.v;if(a==='pick')sel=v;if(a==='rec'){if(!recruit(v))msg='Chưa đủ điều kiện';}if(a==='lv')msg=levelUp(v)||'Lên cấp!';if(a==='tier')msg=tierUp(v)||'Lên nấc!';if(a==='slot')setSlot(v,sel);if(a==='node')msg=treeUp(v)||'Đã nâng!';render();});}
 const fmt=n=>Math.round(n).toLocaleString('vi-VN');
 function costTxt(c){return [c.c?fmt(c.c)+' ◈':'',c.e?fmt(c.e)+' ⬢':'',c.core?c.core+' lõi':'',c.pieces?c.pieces+' mảnh':''].filter(Boolean).join(' · ');}
 function render(){if(!el)return;const t=teamStats(),cpAdd=Math.round(t.atk*24+t.hp*55+t.sh*65);let body='';
  if(tab==='list'){const p=P(sel),o=S.own[sel];
   body=`<div class="pl67-team">${S.team.map((id,i)=>`<button data-x="slot" data-v="${i}" class="${i?'sup':'main'}">${id?portrait(id,40):'<span class="pl67-ph empty">+</span>'}<small>${i?'PHỤ':'CHÍNH'}</small></button>`).join('')}</div>
   <p class="pl67-note">Chạm 1 phi công bên dưới rồi chạm ô đội để xếp. Chính: đủ chỉ số + nội tại · Phụ: 5% chỉ số${resonance()?' · <b>CỘNG HƯỞNG: +10% nạp Graze</b>':' · đủ 4 người: cộng hưởng'}</p>
   <div class="pl67-list">${PILOTS67.map(q=>`<button data-x="pick" data-v="${q.id}" aria-pressed="${q.id===sel}" class="${S.own[q.id]?'own':''}" style="--c:${q.col}">${portrait(q.id,42)}<b>${q.name}</b><small>${q.rank} · ${S.own[q.id]?PILOT75.tiers[tierOf(q.id)].n+' Lv.'+S.own[q.id].lv:'chưa có'}</small></button>`).join('')}</div>
   <div class="pl67-card" style="--c:${p.col}">${portrait(p.id,72)}<div><h4>${p.name} · ${p.tag} <em>${p.rank}</em></h4><p>${p.txt(o?passive(p.id):p.a)}${o?'':` → tối đa: ${p.txt(p.b)}`}</p>
    ${o?(()=>{const T=PILOT75.tiers[tierOf(p.id)],cap=capOf(p.id),tc=tierCost(p.id);return `<p class="pl67-st"><span class="pl75-t" style="--tc:${T.col}">${T.n}</span> Lv.${o.lv}/${cap} · ATK +${base(p.id).atk} · Máu +${base(p.id).hp} · Giáp +${base(p.id).sh} · Mảnh: ${S.pieces[p.id]||0}</p><div class="pl75-pips">${PILOT75.tiers.map((x,i)=>`<i class="${i<=tierOf(p.id)?'on':''}" style="--tc:${x.col}"></i>`).join('')}</div>${o.lv<cap?`<button data-x="lv" data-v="${p.id}" class="pl67-act">LÊN CẤP · ${costTxt(lvCost(o.lv))}</button>`:tc?`<button data-x="tier" data-v="${p.id}" class="pl67-act pl75-up">NÂNG NẤC → ${PILOT75.tiers[tierOf(p.id)+1].n} · ${fmt(tc.c)} ◈ · ${tc.pieces} mảnh</button>`:'<p class="pl67-st">ĐÃ TỐI ĐA · THẦN THOẠI</p>'}`;})()
     :`<p class="pl67-st">Điều kiện: ${CONDTXT[p.id]}</p><button data-x="rec" data-v="${p.id}" class="pl67-act" ${canRecruit(p.id)?'':'disabled'}>CHIÊU MỘ</button>`}</div></div>`;}
  else{body=`<div class="pl67-tree">${PTREE67.map(n=>{const l=tl(n.k),okk=nodeOk(n),c=l<n.max?n.cost(l+1):null;const eff=n.atk?`+${n.atk} ATK/cấp`:n.hp?'+1 Máu/cấp':n.sh?'+1 Giáp/cấp':n.graze?'+3% nạp Graze/cấp':n.gearDmg?'+4% sát thương tên lửa & tàu con/cấp':n.allDmg?'+2% sát thương chung/cấp':'Vào ải sẵn 50% Graze · đỡ 1 đòn chí tử mỗi ải';
    return `<div class="pl67-node ${okk?'':'lk'}"><b>${n.k}. ${n.n}</b><small>${eff} · Lv.${l}/${n.max}${n.need&&!okk?` · cần nút ${n.need[0]} Lv.${n.need[1]}`:''}</small>${c?`<button data-x="node" data-v="${n.k}" ${okk?'':'disabled'}>${costTxt(c)}</button>`:'<i>MAX</i>'}</div>`;}).join('')}</div>`;}
  el.innerHTML=`<div class="m63-card pl67-wrap"><div class="m63-eye">PHI CÔNG & TIỀM NĂNG</div><h3>ĐỘI PHI CÔNG</h3>
   <div class="ex67-tabs pl67-tabs"><button data-x="tab" data-v="list" aria-pressed="${tab==='list'}">PHI CÔNG</button><button data-x="tab" data-v="tree" aria-pressed="${tab==='tree'}">CÂY TIỀM NĂNG</button></div>
   <p class="pl67-sum">Đội cộng: <b>+${fmt(cpAdd)} lực chiến</b> · ATK +${Math.round(t.atk)} · Máu +${t.hp.toFixed(1)} · Giáp +${t.sh.toFixed(1)} · Lõi: ${fmt(coresHave())}</p>
   ${msg?`<p class="pl67-msg">${msg}</p>`:''}${body}
   <div class="m63-btns" style="display:flex;margin-top:12px"><button class="m63-go" data-x="close">ĐÓNG</button></div></div>`;}
 function open(){if(!unlockedSys()){try{Onboard66.open('pilot')||toast('MỞ KHÓA SAU KHI VƯỢT ẢI 50 · PHI CÔNG');}catch{}return;}if(!S.own[1]){recruit(1);}if(!el)build();el.hidden=false;render();}
 function close(){if(el)el.hidden=true;}
 // V75 · nguồn mảnh thêm: Tháp Boss (mỗi 5 tầng 1 hộp 5–12 mảnh, tầng 50: +30, tầng 100: +60), Vô tận (đợt 20 và 30: 1–3 mảnh mỗi mốc)
 function giveRand(n,why){const ids=Object.keys(S.own).map(Number);if(!ids.length||!(n>0))return;const id=S.team[0]&&S.own[S.team[0]]&&Math.random()<.5?S.team[0]:ids[Math.floor(Math.random()*ids.length)];addPiece(id,n);try{toast('🧑‍✈️ +'+n+' mảnh '+P(id).name+(why?' · '+why:''));}catch{}}
 function pollSrc(){if(!unlockedSys())return;const Tw=PILOT75.src.tower;let best=0;try{best=Meta40.state().S.tower.best|0;}catch{}
  for(let f=Tw.every;f<=best;f+=Tw.every){const k='tw'+f;if(S.got[k])continue;S.got[k]=1;giveRand(Tw.min+Math.floor(Math.random()*(Tw.max-Tw.min+1))+(Tw.mile[f]||0),'tháp tầng '+f);}save();}
 try{const oe=end;end=function(){let w=0,gm='';try{w=endlessWave|0;gm=gameMode;}catch{}const r=oe.apply(this,arguments);try{if(unlockedSys()&&gm==='endless'){for(const m of [20,30])if(w>=m){const [a,b]=PILOT75.src.endless[m];giveRand(a+Math.floor(Math.random()*(b-a+1)),'vô tận đợt '+m);}}}catch{}return r;};}catch{}
 // tặng Lâm Phong khi hệ thống mở
 setInterval(()=>{try{pollSrc();}catch{}try{if(unlockedSys()&&!S.own[1]){recruit(1);}
  dock67btn('pl67','PHI CÔNG',()=>open());}catch{}},800);
 return {open,close,state:()=>JSON.parse(JSON.stringify(S)),teamStats,atkMult,passive,main,recruit,levelUp,tierUp,tierOf,capOf,tierCost,base,treeUp,setSlot,gearRate,gearDmg,lvCost,_piece:(id,n)=>addPiece(id,n),_tier:(id,t)=>{S.tier[id]=t;save();},_give:(id,lv)=>{S.own[id]={lv};save();}};
})();
