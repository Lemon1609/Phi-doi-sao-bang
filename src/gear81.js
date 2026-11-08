// V81 · ĐỢT 1 (Gemini REVIEW81 §2, §3): BỘ 9 "KỲ HẠM" cho chiến cơ #10 Tinh Hà Thủ Vọng + đổi kiểu bắn #6 / #8
//  • aegis9 Giáp Kỳ Hạm (FLEET_AEGIS) · swarm9 Tên Lửa Bầy Đàn (SWARM_MICROMISSILES) · carrier9 Tàu Mẹ Hộ Vệ (INTERCEPTOR_SQUAD)
//  • Số liệu sát thương của Gemini được QUY về đường sát thương sẵn có của game (cùng phẩm chất ≈ +5–15% so với món cũ, chia nhiều mục tiêu),
//    phần khác (hồi chiêu, số tên lửa, số tiêm kích, bán kính) giữ nguyên theo bảng W/G/B/P.
//  • Không rơi ngẫu nhiên (GEAR81_NODROP): chỉ nhận nguyên bộ qua Lộ trình chiến cơ #10.
//  • #6 Siêu Nghiệm U Linh → Lượng Tử Khúc Xạ (tia chuyền 2–4 mục tiêu, dồn sát thương boss) · #8 Phần Thiên Chiến Chuẩn → Pháo Nhiệt Áp (8 phát trúng → sóng xung kích)
//  Tắt: window.GEAR81=false (bộ 9 vẫn còn trong kho, chỉ tắt cơ chế mới → dùng cơ chế gốc behavior)
const GEAR81_DATA={
 aegis9:{kind:'armor',name:'Giáp Kỳ Hạm',behavior:'orbital',art:'orbital',color:'#ffd36a',skill:'Lá chắn đội hình',
  desc:'Mỗi lần kích hoạt: +1 khiên, xóa đạn quanh tàu; tiêm kích và tàu con mạnh hơn khi mặc giáp này.',
  cd:[20,18,16,14],buff:[.10,.15,.22,.30],clear:[80,95,110,130]},
 swarm9:{kind:'missiles',name:'Tên Lửa Bầy Đàn',behavior:'stellar',art:'stellar',color:'#5fffe0',skill:'Phong tỏa tọa độ',
  desc:'Phóng chùm tên lửa vi mô tỏa hai bên rồi tự chia nhau khóa mọi mục tiêu trên màn.',
  n:[6,8,10,14]},
 carrier9:{kind:'sidearm',name:'Tàu Mẹ Hộ Vệ',behavior:'gravity',art:'solar',color:'#7fd8ff',skill:'Phi đội tác chiến',
  desc:'Xuất kích tiêm kích tự hành bay quanh tàu và bắn laze tầm gần.',
  max:[2,3,4,5],life:[4.5,4.5,5,5.5]}};
const GEAR81_NODROP=Object.assign(window.GEAR81_NODROP||{},{aegis9:1,swarm9:1,carrier9:1});
window.GEAR81_NODROP=GEAR81_NODROP;
// V87 · REVIEW86 H1 (GEAR_SET9_BOSS86): khi có boss, tiêm kích bám cánh/lõi (cách 110 px), tên lửa chia 50% cánh / 50% lõi
//  (có quái nhỏ: 70% boss / 30% quái), giáp phản kích theo chu kỳ hoặc khi trúng đòn. Sát thương theo bảng W/G/B/P của Gemini,
//  nhân thêm phần tăng do cấp/cường hóa/+n trong cùng khung (aux hiện tại ÷ aux đầu khung). Tắt: window.SET9B86=false
const GEAR_SET9_BOSS86={K:.82,orbit:110,split:{wing:.5,boss:.7},
 tiers:[{fc:2,fi:.65,fd:1.45,mn:6,mc:3.5,md:.95,an:4,ac:8,ad:1.2},{fc:2,fi:.60,fd:1.80,mn:8,mc:3.3,md:1.15,an:5,ac:7.5,ad:1.45},
        {fc:3,fi:.55,fd:2.15,mn:10,mc:3.0,md:1.35,an:6,ac:7,ad:1.75},{fc:4,fi:.50,fd:2.60,mn:12,mc:2.8,md:1.65,an:8,ac:6.5,ad:2.10}],
 base:{swarm9:3.2,carrier9:2.35,aegis9:2.35},tierStart:[1,1.0364,1.0727,1.4618],
 // Claude đo V87: bảng Tím của Gemini cho 246 ST/8s = 6,2× khung Trắng (bộ khác ~1,5–2×) → nén sát thương theo khung để Lục/Lam/Tím ≈ 1,15/1,4/2× Trắng (đo lại sau lần chỉnh thứ 2) (giữ số tiêm kích, nhịp bắn, số tên lửa)
 tierAdj:[1,.72,.36,.26]};   // V87 REVIEW87 Câu 1: Lục/Lam/Tím = 1,3/1,7/2,2× Trắng
window.GEAR_SET9_BOSS86=GEAR_SET9_BOSS86;
const Gear81=(()=>{
 const on=()=>window.GEAR81!==false;
 const FR=n=>n>=6?3:n>=2?2:n>=1?1:0;
 // ---------- 1. đăng ký món + bộ 9 ----------
 try{const sk={orbital:2,stellar:5,solar:2};for(const [id,d] of Object.entries(GEAR81_DATA)){if(!GearCatalog[id])GearCatalog[id]={...GearCatalog[d.behavior],kind:d.kind,name:d.name,skin:sk[d.art]??0,color:d.color,skill:d.skill,behavior:d.behavior,desc81:d.desc};
   if(typeof ACTIVE_GEAR_MODELS!=='undefined'&&!ACTIVE_GEAR_MODELS.includes(id))ACTIVE_GEAR_MODELS.push(id);}}catch(e){console.warn('gear81 catalog',e);}
 try{const S=Campaign36.sets;if(S&&!S[9])S[9]=['aegis9','swarm9','carrier9'];}catch{}
 // đá α/β cho 3 món mới (cùng khuôn với các món cũ)
 try{if(typeof STONE71!=='undefined'&&STONE71.ab){const ab=STONE71.ab;
  ab.aegis9=ab.aegis9||{pos:'armor',pa:'alpha',a:{n:'Kỳ Hạm α',e:[['u','shieldPlus',2]],d:'Khiên chắn đạn nhặt được kéo dài thêm {v} giây'},b:{n:'Kỳ Hạm β',e:[['dmg',.25,'super']],d:'Bạo Tẩu: +{p} sát thương giáp'}};
  ab.swarm9=ab.swarm9||{pos:'missiles',pa:'alpha',a:{n:'Bầy Đàn α',e:[['dmg',.30]],d:'Thêm tên lửa vi mô: +{p} sát thương tên lửa'},b:{n:'Bầy Đàn β',e:[['dmg',.30,'boss']],d:'Khóa boss: +{p} sát thương tên lửa khi đánh boss'}};
  ab.carrier9=ab.carrier9||{pos:'sidearm',pa:'alpha',a:{n:'Hộ Vệ α',e:[['dmg',.30]],d:'Tiêm kích bắn nhanh hơn: +{p} sát thương tàu con'},b:{n:'Hộ Vệ β',e:[['dmg',.30,'super']],d:'Bạo Tẩu: +{p} sát thương tàu con'}};}}catch{}
 // ---------- 2. hình: tạm mượn tranh món cùng loại, phủ tông vàng sao (tới khi GPT vẽ bộ 9) ----------
 function hookArt(){try{if(Progress.art.__g81)return;const o=Progress.art;const f=function(i,extra){const d=i&&GEAR81_DATA[i.variant];if(!d)return o.apply(this,arguments);
   const h=o.call(this,{...i,variant:d.art},extra);return String(h).replace('class="gear25-art','class="gear25-art g81 g81-'+i.variant);};f.__g81=1;Progress.art=f;}catch{}}
 // ---------- 3. phẩm chất món (Trắng/Lục/Lam/Tím) ----------
 const tcache={};
 function tierOf(i){if(tcache[i.id]!=null)return tcache[i.id];let t=0;try{const it=(Progress.getState().items||[]).find(x=>x.id===i.id)||i;t=FR(V70.nOf(it)|0);}catch{}tcache[i.id]=t;return t;}
 const X=()=>window.__eq81||null;
 const eqHas=v=>{try{return (gear.equipment||[]).some(i=>i.variant===v);}catch{return false;}};
 const fullSet=()=>eqHas('aegis9')&&eqHas('swarm9')&&eqHas('carrier9');
 let F=[],prevShield=0,kamiCd=0,aegisT=-1;
 function droneBuff(){try{const a=(gear.equipment||[]).find(i=>i.variant==='aegis9');return a?GEAR81_DATA.aegis9.buff[tierOf(a)]:0;}catch{return 0;}}
 // giáp
 function armor(i){if(!on()||i.variant!=='aegis9')return false;const x=X();if(!x)return false;const d=GEAR81_DATA.aegis9,t=tierOf(i),rad=d.clear[t];aegisT=t;
  try{i.spec.cd=d.cd[t];}catch{}
  try{shield=Math.min(maxShield,shield+1);}catch{}
  try{x.clear(rad,t>=2);x.ring(player.x,player.y,d.color,rad);x.ring(player.x,player.y,'#ffffff',rad*.6);}catch{}
  return true;}
 // tên lửa + tàu con
 function fire(i){if(!on())return false;const x=X();if(!x)return false;
  if(bossOn()&&(i.variant==='swarm9'||i.variant==='carrier9'))return true;
  if(i.variant==='swarm9'){const t=tierOf(i),n=GEAR81_DATA.swarm9.n[t],s=i.spec||{};let extra=0;try{extra=gearBattleBoost().extra|0;}catch{}
   const base=Math.max(1,(s.count||1)+extra),each=i.auxDamage*base*1.15/n;const o=x.origin(i);
   for(let k=0;k<n;k++){const side=k%2?1:-1,j=Math.floor(k/2),a=-Math.PI/2+side*(0.55+j*0.16);
    try{const b=x.emitGear(i,o.x+side*6,o.y-12,Math.cos(a)*300,Math.sin(a)*300,'missile',each,{homingSpeed:430*(typeof BALANCE!=='undefined'?BALANCE.allyStats:1),launchSide28:side,phase:k,gearItem:i,blast:t>=2,blastRadius:34+t*6});if(b){b.r=Math.max(3,(b.r||5)*.62);b.swarm81=1;}}catch{}}
   return true;}
  if(i.variant==='carrier9'){const t=tierOf(i),d=GEAR81_DATA.carrier9,max=d.max[t],s=i.spec||{};let extra=0;try{extra=gearBattleBoost().extra|0;}catch{}
   const iv=Math.max(.3,i.interval||1),base=Math.max(1,(s.count||1)+extra);
   const per=i.auxDamage*base/(iv*max*2.5)*1.05;let pods=[];try{pods=Battle28.support();}catch{}if(!pods.length)pods=[{x:player.x-40,y:player.y},{x:player.x+40,y:player.y}];
   for(let k=0;k<2&&F.length<max;k++){const p=pods[k%pods.length];F.push({x:p.x,y:p.y,life:d.life[t],cd:.15+k*.2,ph:Math.random()*6.28,slot:F.length,i,per,col:d.color});}
   return true;}
  return false;}
 function nearest(f){let best=null,bd=1e9;try{const list=[...(enemies||[])];if(boss&&!boss.dead)list.push(boss);for(const e of list){if(!e||e.dead||e.y>f.y+20)continue;const dd=Math.hypot(e.x-f.x,e.y-f.y);if(dd<bd&&dd<300){bd=dd;best=e;}}}catch{}return best;}
 // ---- H1: chế độ đánh boss ----
 const G9=GEAR_SET9_BOSS86;let bm={mt:.6,at:2,hitCd:0,on:0,prevHp:-1,nM:0,nF:0,nA:0};
 function bossOn(){try{return on()&&window.SET9B86!==false&&!!boss&&!boss.dead&&(boss.y||0)>40;}catch{return false;}}
 const itemOf=v=>{try{return (gear.equipment||[]).find(i=>i.variant===v)||null;}catch{return null;}};
 function sc(i){const t=tierOf(i),b=G9.base[i.variant]||1,a=i.variant==='aegis9'?((i.spec&&i.spec.damage)||b):(i.auxDamage||b);return Math.max(.5,a/b/G9.tierStart[t])*G9.K*(G9.tierAdj[t]||1);}
 const alive=p=>p&&!p.dead&&!(p.hp<=0);
 function wings(){try{return (boss.parts||[]).filter(alive);}catch{return [];}}
 function minions(){try{return (enemies||[]).filter(e=>!e.dead&&!e.boss&&!e.bossPart&&!e.rescue28&&e.y>0&&e.y<H-60);}catch{return [];}}
 function bossUpdate(dt,x){const sup=(typeof superTime!=='undefined'&&superTime>0);
  // tiêm kích bám cánh / lõi
  const ci=itemOf('carrier9');
  if(ci){const t=tierOf(ci),T=G9.tiers[t];const W=wings(),tg=W.length?W:[boss];
   while(F.length<T.fc)F.push({x:player.x+(F.length%2?40:-40),y:player.y,life:9,cd:.2+F.length*.15,ph:Math.random()*6.28,slot:F.length,i:ci,per:0,col:GEAR81_DATA.carrier9.color,b86:1});
   if(F.length>T.fc)F.length=T.fc;
   const mul=(1+droneBuff())*(sup&&fullSet()&&(typeof launchCraft!=='undefined'&&(launchCraft|0)===9)?1.35:1);const dmg=T.fd*sc(ci)*mul;
   const per=Math.ceil(F.length/tg.length);
   F.forEach((f,k)=>{const e=tg[k%tg.length],j=Math.floor(k/tg.length),m=Math.min(per,Math.ceil((F.length-(k%tg.length))/tg.length));f.life=Math.max(f.life,1.5);f.b86=1;f.ph+=dt*1.6;
    const ang=Math.PI/2+(m>1?(j-(m-1)/2)*.55:0)+Math.sin(f.ph)*.12;const tx=Math.max(20,Math.min(W0()-20,e.x+Math.cos(ang)*G9.orbit)),ty=Math.min(H-40,e.y+Math.sin(ang)*G9.orbit);
    f.x+=(tx-f.x)*Math.min(1,dt*5);f.y+=(ty-f.y)*Math.min(1,dt*5);f.cd-=dt;
    if(f.cd<=0){f.cd=T.fi;const a=Math.atan2(e.y-f.y,e.x-f.x);try{const b=x.emitGear(ci,f.x,f.y-6,Math.cos(a)*700,Math.sin(a)*700,'laser',dmg,{gearItem:ci});if(b){b.r=Math.max(2.5,(b.r||4)*.6);b.__t86=e;if(sup)b.superShot=true;bm.nF++;}}catch{}}});}
  // tên lửa chia cánh / lõi / quái nhỏ
  const si=itemOf('swarm9');
  if(si){const t=tierOf(si),T=G9.tiers[t];bm.mt-=dt;if(bm.mt<=0){bm.mt=T.mc*(sup?.8:1);const W=wings(),Mi=minions(),n=T.mn,nb=Mi.length?Math.round(n*G9.split.boss):n,dmg=T.md*sc(si);const o=x.origin(si);
    for(let k=0;k<n;k++){let tg;if(k<nb){tg=(W.length&&k%2===0)?W[(k>>1)%W.length]:boss;}else tg=Mi[k%Mi.length];
     const side=k%2?1:-1,jj=Math.floor(k/2),a=-Math.PI/2+side*(0.55+jj*0.14);
     try{const b=x.emitGear(si,o.x+side*6,o.y-12,Math.cos(a)*300,Math.sin(a)*300,'missile',dmg,{homingSpeed:460*(typeof BALANCE!=='undefined'?BALANCE.allyStats:1),launchSide28:side,phase:k,gearItem:si,blast:t>=2,blastRadius:30+t*6});if(b){b.r=Math.max(3,(b.r||5)*.62);b.swarm81=1;b.__t86=tg;bm.nM++;}}catch{}}}}
  // giáp phản kích
  const ai=itemOf('aegis9');
  if(ai){const t=tierOf(ai),T=G9.tiers[t];bm.at-=dt;bm.hitCd=Math.max(0,bm.hitCd-dt);let hurt=false;try{const h=hp;if(bm.prevHp>=0&&h<bm.prevHp)hurt=true;bm.prevHp=h;}catch{}
   if(bm.at<=0||(hurt&&bm.hitCd<=0)){const timed=bm.at<=0;bm.at=T.ac;bm.hitCd=2;const W=wings();let tg=boss,bd=1e9;for(const p of (W.length?W:[boss])){const d=Math.hypot(p.x-player.x,p.y-player.y);if(d<bd){bd=d;tg=p;}}
    const dmg=T.ad*sc(ai);for(let k=0;k<T.an;k++){const a=Math.atan2(tg.y-player.y,tg.x-player.x)+(k-(T.an-1)/2)*.07;try{const b=x.emitGear(ai,player.x,player.y-14,Math.cos(a)*640,Math.sin(a)*640,'laser',dmg,{gearItem:ai,piercing:false});if(b){b.__t86=tg;b.homing=true;b.homingSpeed=640;bm.nA++;}}catch{}}
    if(timed){try{shield=Math.min(maxShield,shield+1);}catch{}}try{x.ring(player.x,player.y,'#ffd36a',60);}catch{}}}}
 const W0=()=>{try{return W;}catch{return 480;}};
 function hookNearest(){try{if(window.nearest&&!window.nearest.__n86){const o=window.nearest;const f=function(s){try{const t=s&&s.__t86;if(t&&on()&&(t===boss?(!!boss&&!boss.dead):(alive(t)&&(!t.bossPart||(!!boss&&!boss.dead)))))return t;}catch{}return o.apply(this,arguments);};f.__n86=1;window.nearest=f;try{nearest=f;}catch{}}}catch{}}
 function update(dt){if(!on())return;const x=X();if(!x){F=[];return;}
  if(bossOn()){bm.on=1;bossUpdate(dt,x);}else if(bm.on){bm.on=0;F=F.filter(f=>!f.b86);bm.mt=.6;bm.at=2;bm.prevHp=-1;}
  // tiêm kích
  if(F.length){const sup=(typeof superTime!=='undefined'&&superTime>0),reso=sup&&fullSet()&&(typeof launchCraft!=='undefined'&&(launchCraft|0)===9);const mul=(1+droneBuff())*(reso?1.35:1);
   for(const f of F){if(f.b86&&bm.on)continue;f.life-=dt;f.ph+=dt*2.4;const n=Math.max(1,F.length),ang=f.ph+f.slot*6.283/n;const tx=player.x+Math.cos(ang)*58,ty=player.y-70+Math.sin(ang)*18;f.x+=(tx-f.x)*Math.min(1,dt*6);f.y+=(ty-f.y)*Math.min(1,dt*6);
    f.cd-=dt;if(f.cd<=0){f.cd=.4;const e=nearest(f);if(e){const a=Math.atan2(e.y-f.y,e.x-f.x);try{const b=x.emitGear(f.i,f.x,f.y-6,Math.cos(a)*620,Math.sin(a)*620,'laser',f.per*mul,{gearItem:f.i});if(b){b.r=Math.max(2.5,(b.r||4)*.6);if(reso)b.superShot=true;}}catch{}}}}
   F=F.filter(f=>f.life>0);}
  // giáp Kỳ Hạm Tím: khiên vỡ → 2 drone cảm tử
  kamiCd=Math.max(0,kamiCd-dt);let sh=0;try{sh=shield;}catch{}
  if(sh<prevShield&&kamiCd<=0){const a=(gear.equipment||[]).find(i=>i.variant==='aegis9');if(a&&tierOf(a)>=3){kamiCd=3;const dmg=(a.auxDamage||a.spec&&a.spec.damage||2)*2.2;for(const s of [-1,1]){try{x.emitGear(a,player.x+s*18,player.y-10,s*140,-360,'missile',dmg,{homingSpeed:460,blast:true,blastRadius:70,gearItem:a});}catch{}}try{x.ring(player.x,player.y,'#ffd36a',70);}catch{}}}
  prevShield=sh;}
 function draw(){if(!F.length)return;try{const g=ctx;g.save();g.globalCompositeOperation='lighter';for(const f0 of F){const a=Math.min(1,f0.life*2);g.save();g.translate(f0.x,f0.y);g.scale(1.4,1.4);const f={x:0,y:0,col:f0.col};g.globalAlpha=.9*a;g.fillStyle=f.col;g.strokeStyle='#ffffff';g.lineWidth=1;g.beginPath();g.moveTo(f.x,f.y-9);g.lineTo(f.x+8,f.y+6);g.lineTo(f.x+2,f.y+3);g.lineTo(f.x,f.y+7);g.lineTo(f.x-2,f.y+3);g.lineTo(f.x-8,f.y+6);g.closePath();g.fill();g.stroke();g.globalAlpha=.35*a;g.beginPath();g.arc(f.x,f.y+8,3,0,6.283);g.fill();g.restore();}g.restore();}catch{}}
 function reset(){F=[];kamiCd=0;prevShield=0;bm.mt=.6;bm.at=2;bm.on=0;bm.prevHp=-1;for(const k in tcache)delete tcache[k];}
 // ---------- 4. #6 Lượng Tử Khúc Xạ · #8 Pháo Nhiệt Áp ----------
 let ramp=0,rampT=0,heat=0,links=[],nChain=0,nWave=0;
 function hurtE(n,amt){try{if(n===boss||n.bossPart){damageBoss(amt,'gear',n);return;}n.hp-=amt;try{Feedback31.damage(n,amt,{});}catch{}if(n.hp<=0)kill(n);}catch{}}
 function onHit(s,e){if(!on()||!s||s.art28==null||!e)return;
  if(s.art28===5&&s.ray28){const l=s.level30|0,sup=(typeof superTime!=='undefined'&&superTime>0);const cnt=2+(l>=2?1:0)+(l>=4?1:0)+(sup?1:0);
   const ts=(enemies||[]).filter(n=>n!==e&&!n.dead&&Math.hypot(n.x-e.x,n.y-e.y)<120).sort((a,b)=>Math.hypot(a.x-e.x,a.y-e.y)-Math.hypot(b.x-e.x,b.y-e.y)).slice(0,cnt);
   nChain+=ts.length;let prev=e;for(const n of ts){hurtE(n,s.damage*.35);links.push({a:{x:prev.x,y:prev.y},b:{x:n.x,y:n.y},life:.16,c:s.color});prev=n;}if(links.length>14)links.splice(0,links.length-14);
   if(e===boss||e.bossPart){rampT=.35;ramp=Math.min(.4,ramp+.08*.22);if(ramp>0)hurtE(e,s.damage*ramp);}}
  if(s.art28===7&&s.type==='rocket28'){heat++;const sup=(typeof superTime!=='undefined'&&superTime>0);if(heat>=(sup?5:8)){heat=0;nWave++;const R=sup?95:70;
   try{for(const n of enemies||[]){if(n.dead)continue;const d=Math.hypot(n.x-s.x,n.y-s.y);if(d<R){hurtE(n,s.damage*.6);if(!n.large)n.y-=18;}}}catch{}
   try{const bs=(bullets||[]).filter(b=>!b.dead).sort((a,b)=>Math.hypot(a.x-s.x,a.y-s.y)-Math.hypot(b.x-s.x,b.y-s.y)).slice(0,2);for(const b of bs)b.dead=true;}catch{}
   try{const x=X();x&&x.ring(s.x,s.y,'#ff9a5a',R);x&&x.ring(s.x,s.y,'#ffe0b0',R*.55);}catch{}}}}
 function upd2(dt){ramp=rampT>0?ramp:Math.max(0,ramp-dt*.5);rampT=Math.max(0,rampT-dt);for(const k of links)k.life-=dt;links=links.filter(k=>k.life>0);}
 function draw2(){if(!links.length)return;try{const g=ctx;g.save();g.globalCompositeOperation='lighter';g.lineWidth=2;for(const k of links){g.globalAlpha=k.life/.16;g.strokeStyle=k.c||'#b98cff';g.beginPath();g.moveTo(k.a.x,k.a.y);const mx=(k.a.x+k.b.x)/2+(Math.random()-.5)*14,my=(k.a.y+k.b.y)/2+(Math.random()-.5)*14;g.lineTo(mx,my);g.lineTo(k.b.x,k.b.y);g.stroke();}g.restore();}catch{}}
 function labels(){try{const P=Fighters28.profiles;if(P[5])P[5].weapon='Lượng Tử Khúc Xạ';if(P[7])P[7].weapon='Pháo Nhiệt Áp';}catch{}
  try{if(crafts[5]&&crafts[5].desc)crafts[5].desc=crafts[5].desc.replace(/·\s*Laser\./,'· Lượng Tử Khúc Xạ.');if(crafts[7]&&crafts[7].desc)crafts[7].desc=crafts[7].desc.replace(/·\s*Thiêu Đốt\./,'· Pháo Nhiệt Áp.');}catch{}}
 // ---------- 5. móc vào vòng trận ----------
 function install(){hookArt();labels();hookNearest();
  try{if(!Equipment25.__g81){const u=Equipment25.update,d=Equipment25.draw,r=Equipment25.reset;
   Equipment25.update=function(dt){const v=u.apply(this,arguments);try{update(dt);upd2(dt);}catch{}return v;};
   Equipment25.draw=function(){const v=d.apply(this,arguments);try{draw();draw2();}catch{}return v;};
   Equipment25.reset=function(){const v=r.apply(this,arguments);try{reset();ramp=0;heat=0;links=[];}catch{}return v;};Equipment25.__g81=1;}}catch{}
  try{if(!Arsenal30.__g81){const h=Arsenal30.hit;Arsenal30.hit=function(s,e){const v=h.apply(this,arguments);try{onHit(s,e);}catch{}return v;};Arsenal30.__g81=1;}}catch{}}
 install();setTimeout(install,200);setTimeout(install,1500);
 // ---------- 6. ai đã nhận chiến cơ #10 qua lộ trình trước bản này → bù nguyên bộ 9 ở khung Tím ----------
 const KEY='saobang-gear81';
 function backfill(){try{if(localStorage.getItem(KEY))return;const st=window.Ship79&&Ship79.state();if(!st)return;if(!st.got||!st.got[9]){localStorage.setItem(KEY,'skip');return;}
   const names=[];for(const m of Campaign36.sets[9]){let it=(Progress.getState().items||[]).find(x=>x.variant===m);if(!it){const a=Campaign36.acquire('gear',m,'SS','endless');it=a&&a.item;}if(it){try{V70.setTier('gear',it.id,(window.Evo82&&Evo82.on())?2:6);}catch{}names.push(GearCatalog[m].name);}}
   localStorage.setItem(KEY,'done');try{V70.sync&&V70.sync();}catch{}try{toast('🛡 BÙ NGUYÊN BỘ KỲ HẠM cho Tinh Hà Thủ Vọng · '+names.join(' · '));}catch{}}catch(e){console.warn('gear81 backfill',e);}}
 setTimeout(backfill,2500);
 return {armor,fire,state:()=>({on:on(),boss86:{...bm},fighters:F.length,ramp,heat,links:links.length,nChain,nWave,set9:(()=>{try{return Campaign36.sets[9];}catch{return null;}})()}),tierOf,_F:()=>F,DATA:GEAR81_DATA};
})();
window.Gear81=Gear81;
