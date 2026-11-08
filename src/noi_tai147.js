// V148 · NỘI TẠI ĐỢT 2 · 21 món Bộ 07–13 theo src/ky_nang_39_chot.json (cấp 1→5 = spec.rank+1, nội suy tuyến tính)
//  Trước bản này Bộ 07–13 mượn hiệu ứng của món khác (behavior: thunder, rail, prism, singularity…).
//  Module này: (1) gắn nhãn đạn theo MÃ THẬT của món, TƯỚC hiệu ứng mượn (cháy/đóng băng/xích/vùng/nảy/tách),
//  (2) áp nội tại riêng khi trúng (bọc Equipment25.hit), (3) nội tại 7 giáp (bọc damage/kill/collect như noi_tai144).
//  Cân bằng: đánh 1 mục tiêu (boss) giữ ≈ ngân sách cũ — phần cộng thêm được trừ trước vào sát thương viên đạn (NORM);
//  lợi thế riêng nằm ở đông quái / khống chế / phòng thủ. Khuếch đại (nứt giáp, bào tử, trường thời gian) dùng ½ số Gemini và CHỈ nhân sát thương trang bị (không thành buff toàn đội: đạn chính ≈ 99% sát thương).
//  Hình: chỉ vệt / cột / tia ngắn ≤ 0,35 s, KHÔNG vòng tròn. Tắt toàn bộ: window.NT147=false
(()=>{
 const on=()=>window.NT147!==false;
 const E195=v=>{try{return window.CHIPARM195?window.CHIPARM195(v):1;}catch{return 1;}};/* V195: hiệu lực nội tại giáp từ chip (1–1,25) */
 const T=()=>{try{return time;}catch{return 0;}};
 const L=(a,b,lv)=>a+(b-a)*(Math.max(1,Math.min(5,lv))-1)/4;
 const lvOf=i=>{let r=0;try{r=(i.spec||gearSpec(i)).rank|0;}catch{}return Math.max(1,Math.min(5,r+1));};
 const bt=()=>{try{return superTime>0;}catch{return false;}};
 const eq=k=>{try{return (gear.equipment||[]).find(x=>x.kind===k)||null;}catch{return null;}};
 const isBoss=e=>{try{return e===boss||!!e.bossPart;}catch{return false;}};
 const big=e=>isBoss(e)||e.elite||e.large;
 const flash=(x,y,c)=>{try{VisualFX.impact(x,y,c);}catch{}};
 const API=()=>window.KN146API||null;
 function live(){const o=[];try{for(const e of enemies)if(!e.dead&&!e.rescue28&&e.y>-30&&e.y<H)o.push(e);if(boss&&!boss.dead)o.push(boss);}catch{}return o;}
 function nearestE(x,y,skip,R=1e9){let b=null,bd=R*R;for(const e of live()){if(skip&&skip.has(e))continue;const d=(e.x-x)**2+(e.y-y)**2;if(d<bd){bd=d;b=e;}}return b;}
 function hurtE(e,amt){if(!e||e.dead||!(amt>0))return;try{if(isBoss(e)){damageBoss(amt,'gear',e);return;}e.hp-=amt;try{Feedback31.damage(e,amt,{gearKind:'auxiliary'});}catch{}if(e.hp<=0)kill(e);}catch{}}
 const fac=()=>{try{return allyDamageScale();}catch{try{return BALANCE.allyDamage*Combat.factor();}catch{return 1;}}};
 function shotDmg(i){try{const s=i.spec||gearSpec(i);return (s.damage||2.35)*(gear.damage||1)*fac();}catch{return 1;}}
 function dps(i){try{const s=i.spec||gearSpec(i);return shotDmg(i)*(s.count||1)/Math.max(.2,s.interval||1);}catch{return 1;}}
 const COL={comet36:'#ffd36a',lance36:'#9fe8ff',halo36:'#ffe9a8',judgement36:'#fff1b0',nova36:'#b07cff',orbit36:'#7fd8ff',swarm9:'#5fffe0',devour10_m:'#ff5a8a',devour10_s:'#9b5cff',chrono11_m:'#7fe8ff',chrono11_s:'#9ff3ff',monarch12_m:'#e9c86a',monarch12_s:'#c9a8ff',
  aurora36:'#fff3c0',void36:'#8a6cff',seraph36:'#fff8d8',aegis9:'#ffd36a',devour10_a:'#b45cff',chrono11_a:'#5fe6ff',monarch12_a:'#ffd36a'};
 // món mượn hiệu ứng → tước; swarm9/carrier9 là cơ chế riêng của GEAR81 nên giữ nguyên
 // V148b: Bộ 07–13 đánh thường bằng Skill81.fire (đòn riêng từ V83) → đi qua NT147_PRE; chỉ swarm9 / devour10_m / carrier9 bắn đạn thật (gắn nhãn).
 // Nội tại đã có sẵn trong đòn Skill81 (KHÔNG cộng lần 2): judgement36 cột sáng · orbit36 xích · chrono11_m tiếng vọng · chrono11_s trường thời gian · monarch12_m nhát chém.
 const STRIP=new Set();const HIT=new Set(['comet36','lance36','halo36','nova36','monarch12_s']);
 const PIERCE=new Set(['lance36','monarch12_m']);
 const WEAP=new Set(['swarm9','carrier9','devour10_m']);
 const ARM=new Set(['aurora36','void36','seraph36','aegis9','devour10_a','chrono11_a','monarch12_a']);
 // hệ số trừ trước để giữ đánh-1-mục-tiêu (≈ ±8%)
 function norm(v,lv){switch(v){
  case 'comet36':return 1/(1+L(.15,.60,lv)*.35);
  case 'lance36':return 1/(1+L(.10,.35,lv)*.75);
  case 'halo36':return 1/(1+L(.12,.36,lv)*.85);
  case 'swarm9':return 1/(1+L(.05,.25,lv)*.8);
  case 'devour10_m':return 1/(1+2*L(.15,.40,lv));
  case 'monarch12_s':return 1/(1+.5*L(1,1.5,lv));
  default:return 1;}}
 // ---------- trạng thái ----------
 const PILL=[],VU=new Map(),SP=[],FX=[],ECHO=[],FIELD=[],SEAL=[],RIFT=[];
 const S={halo:{e:null,st:0},swarm:new Map(),devS:0,devCd:[0,0],sealAt:0,
  graze:0,grazeCd:0,auroraCd:0,layer:0,voidCd:0,seraph:[],killWin:0,killAcc:0,chronoCd:0,defer:[],id:null};
 function vul(e,p,dur){if(!e||e.dead||!(p>0))return;const c=VU.get(e),u=T()+dur;if(!c||c.until<T()||c.p<p)VU.set(e,{p,until:u});else c.until=Math.max(c.until,u);}
 function slow(e,k,d){const a=API();if(a&&a.slow)try{a.slow(e,k,d);}catch{}}
 function stun(e,d){const a=API();if(a&&a.stun)try{a.stun(e,d);}catch{}}
 function fx(o){FX.push(Object.assign({at:T()},o));if(FX.length>40)FX.shift();}
 // ---------- tranh GPT Phần J cho món bộ 07–13 (khóa <mã>_projectile_* / _impact_* trong GEAR44_ASSETS). Tắt riêng: window.ART148=false
 const IM={};function img(k){let u=null;try{u=GEAR44_ASSETS[k];}catch{}if(!u)return null;let m=IM[k];if(!m){m=new Image();m.src=u;IM[k]=m;}return m.complete&&m.naturalWidth?m:null;}
 function drawArt(s){if(!on()||window.ART148===false||!s||!s.v147)return false;const sup=!!s.superShot,im=img(s.v147+'_projectile_'+(sup?'super':'normal'));if(!im)return false;
  const n=4,cw=im.naturalWidth/n,ch=im.naturalHeight,f=Math.floor((s.age||0)*12)%n,mis=s.gearKind==='missiles',h=({swarm9:22,carrier9:18,devour10_m:32}[s.v147]||(mis?40:26))*(sup?1.2:1),w=h*cw/ch,a=Math.atan2(s.vy||-1,s.vx||0)+Math.PI/2;
  ctx.save();ctx.translate(s.x,s.y);ctx.rotate(a);ctx.drawImage(im,f*cw,0,cw,ch,-w/2,-h/2,w,h);ctx.restore();return true;}
 function impactArt(s,e){if(window.ART148===false)return;const sup=!!s.superShot,k=s.v147+'_impact_'+(sup?'super':'normal');if(!img(k))return;FX.push({k:'anim',key:k,x:e.x,y:e.y,at:T(),life:.32,z:sup?64:48,c:'#fff'});if(FX.length>40)FX.shift();}
 // ---------- gắn nhãn đạn ----------
 function tag(){let L0=[];try{L0=shots;}catch{return;}for(const s of L0){if(!s||s.t147)continue;s.t147=1;if(!s.gearKind||s.gearKind==='armor')continue;const i=s.gearItem||eq(s.gearKind);if(!i||!WEAP.has(i.variant))continue;
  const v=i.variant,lv=lvOf(i);s.v147=v;s.lv147=lv;
  if(STRIP.has(v)){s.burn=0;s.chill=0;s.chains=0;s.field=false;s.split=0;s.bounces=0;s.ignoreGuard=v==='lance36';s.piercing=PIERCE.has(v);if(s.piercing&&!s.hit)s.hit=new Set();}
  s.damage*=norm(v,lv);}}
 // ---------- khi trúng ----------
 function onHit(s,e){const v=s.v147,lv=s.lv147||1,d=s.damage||0,t=T();if(!v||!e)return;impactArt(s,e);
  switch(v){
  case 'comet36':{let f=1;try{f=e.maxHp?e.hp/e.maxHp:(isBoss(e)&&boss.maxHp?boss.hp/boss.maxHp:1);}catch{}if(f>.7){hurtE(e,d*L(.15,.60,lv));fx({k:'col',x:e.x,y:e.y,w:10,c:COL.comet36,life:.18});}break;}
  case 'lance36':if(big(e)){hurtE(e,d*L(.10,.35,lv));if(lv>=5)vul(e,.09,2);}break;
  case 'halo36':{const H=S.halo;if(H.e===e)H.st=Math.min(L(.12,.36,lv),H.st+L(.02,.06,lv));else{H.e=e;H.st=0;}if(H.st>0)hurtE(e,d*H.st);break;}
  case 'nova36':{const R=L(55,100,lv);try{for(const b of bullets)if(!b.dead&&Math.hypot(b.x-e.x,b.y-e.y)<R)b.dead=true;}catch{}fx({k:'dot',x:e.x,y:e.y,c:COL.nova36,life:.2});break;}
  case 'swarm9':{const m=S.swarm,c=m.get(e);if(c&&t-c<.6)hurtE(e,d*L(.05,.25,lv));m.set(e,t);if(m.size>60)m.clear();break;}
  case 'devour10_m':{const f=L(.15,.40,lv);if(SP.filter(z=>z.e===e).length<6)SP.push({e,until:t+2,dps:d*f,lv});vul(e,L(.06,.15,lv)*.5,2);break;}
  case 'monarch12_s':{if(SEAL.some(z=>z.e===e))break;if(SEAL.length>=Math.round(L(2,4,lv)))break;if(!SEAL.length)S.sealAt=t+.8;SEAL.push({e,dmg:d*.5*L(1,1.5,lv)});break;}
  }}
 // ---------- mỗi khung ----------
 let last=-1;
 function tick(){let m='';try{m=mode;}catch{}if(m!=='play'){if(m!=='pause'){VU.clear();SP.length=0;PILL.length=0;ECHO.length=0;FIELD.length=0;SEAL.length=0;RIFT.length=0;S.defer.length=0;S.seraph.length=0;S.halo={e:null,st:0};last=-1;}return;}
  const t=T(),dt=last<0?0:Math.max(0,Math.min(.05,t-last));last=t;if(!on())return;tag();
  for(const [e,v] of VU)if(e.dead||v.until<t)VU.delete(e);
  for(let k=SP.length-1;k>=0;k--){const z=SP[k];if(z.e.dead){if(z.lv>=5&&!z.sp){const n=nearestE(z.e.x,z.e.y,new Set([z.e]),80);if(n)SP.push({e:n,until:t+1.2,dps:z.dps*.6,lv:1,sp:1});}SP.splice(k,1);continue;}if(t>z.until){SP.splice(k,1);continue;}hurtE(z.e,z.dps*dt);}
  for(let k=ECHO.length-1;k>=0;k--){const z=ECHO[k];if(t<z.at)continue;ECHO.splice(k,1);if(z.e&&!z.e.dead){z.x=z.e.x;z.y=z.e.y;}fx({k:'dot',x:z.x,y:z.y,c:COL.chrono11_m,life:.22});for(const n of live())if(Math.hypot(n.x-z.x,n.y-z.y)<55+(isBoss(n)?40:0)){hurtE(n,z.dmg);if(z.lv>=5)slow(n,.3,1);}}
  for(let k=FIELD.length-1;k>=0;k--){const f=FIELD[k];if(t>f.until){FIELD.splice(k,1);continue;}for(const n of live())if(Math.hypot(n.x-f.x,n.y-f.y)<f.R){slow(n,f.k,.2);if(f.lv>=5)vul(n,.075,.25);}try{for(const b of bullets)if(!b.dead&&!b.ts147&&Math.hypot(b.x-f.x,b.y-f.y)<f.R){b.ts147=1;b.vx*=1-f.k;b.vy*=1-f.k;}}catch{}}
  if(SEAL.length&&t>=S.sealAt){const L2=SEAL.splice(0);let prev=null;for(const z of L2){if(z.e.dead)continue;hurtE(z.e,z.dmg);fx({k:'dot',x:z.e.x,y:z.e.y,c:COL.monarch12_s,life:.25});if(prev)fx({k:'line',x:prev.x,y:prev.y,x2:z.e.x,y2:z.e.y,c:COL.monarch12_s,life:.25});prev=z.e;}}
  for(let k=PILL.length-1;k>=0;k--){const z=PILL[k];if(t<z.at)continue;PILL.splice(k,1);if(z.e&&!z.e.dead)z.x=z.e.x;fx({k:'col',x:z.x,y:0,w:z.w,c:COL.judgement36,life:.3,full:1});for(const n of live())if(Math.abs(n.x-z.x)<z.w/2+(isBoss(n)?50:14)){hurtE(n,z.full);if(z.lv>=5&&!big(n))stun(n,.5);}}
  for(let k=RIFT.length-1;k>=0;k--){const r=RIFT[k];if(t>r.until){RIFT.splice(k,1);continue;}for(const n of live())if(Math.abs(n.y-r.y)<18&&Math.abs(n.x-r.x)<r.w)hurtE(n,r.dps*dt);}
  S.chain=null;
  // Hạt Nhân Thôn Phệ: tàu con nuốt đạn trong 45 px (mỗi tàu con ≤ 1 viên / 0,25 s); đủ 8→4 viên → tia dọc 160→220%
  if(sd&&sd.variant==='devour10_s'){const lv=lvOf(sd);let P=[];try{P=Battle28.support();}catch{}(P||[]).forEach((p,j)=>{if(t<(S.devCd[j]||0))return;try{for(const b of bullets)if(!b.dead&&Math.hypot(b.x-p.x,b.y-p.y)<45){b.dead=true;S.devS++;S.devCd[j]=t+.25;fx({k:'dot',x:b.x,y:b.y,c:COL.devour10_s,life:.15});break;}}catch{}});
   if(S.devS>=Math.round(L(8,4,lv))&&P&&P.length&&t>=(S.devB||0)){S.devS=0;S.devB=t+3;const dmg=dps(sd)*L(.6,.9,lv);for(const p of P){fx({k:'col',x:p.x,y:p.y,w:16,c:COL.devour10_s,life:.25,up:1});for(const n of live())if(n.y<p.y&&Math.abs(n.x-p.x)<14+(isBoss(n)?50:14))hurtE(n,dmg/P.length);}}}
  armorTick(dt);}
 // ---------- giáp ----------
 function aItem(){if(window.SSSE_A)return null;const i=eq('armor');return i&&ARM.has(i.variant)?i:null;}
 function armorTick(dt){const i=on()?aItem():null;if(!i){S.id=null;return;}if(S.id!==i.variant){S.id=i.variant;S.layer=0;S.graze=0;S.defer.length=0;S.seraph.length=0;}const lv=lvOf(i),t=T();
  if(i.variant==='aurora36'&&S.layer<1&&t>=S.auroraCd){try{for(const b of bullets){if(b.dead||b.gz147)continue;const d=Math.hypot(b.x-player.x,b.y-player.y);if(d<34&&d>12){b.gz147=1;if(t>=S.grazeCd){S.graze++;S.grazeCd=t+.3;}}}}catch{}
   if(S.graze>=Math.round(L(10,6,lv))){S.graze=0;S.layer=1;S.auroraCd=t+L(25,15,lv)/E195('aurora36');flash(player.x,player.y,COL.aurora36);}}
  if(i.variant==='seraph36'){S.seraph=S.seraph.filter(z=>z.until>t);}
  if(i.variant==='monarch12_a'&&S.defer.length){let tot=0;for(const z of S.defer){const k=Math.min(z.left,z.rate*dt);z.left-=k;tot+=k;}S.defer=S.defer.filter(z=>z.left>1e-4);try{if(tot>0){hp=Math.max(.3,hp-tot);}}catch{}}}
 let insA=false,insK=false,insC=false;
 function installArmor(){if(insA||typeof damage!=='function'||damage.__nt147)return false;insA=true;const od=damage;
  const nd=function(source='collision'){const i=on()?aItem():null;if(!i||invuln>0||mode!=='play'||(source==='bullet'&&bulletShieldTime>0))return od.apply(this,arguments);const lv=lvOf(i),t=T(),v=i.variant;
   let hit=1;try{hit=enemyScale();}catch{}
   if(v==='aurora36'&&S.layer>0){S.layer=0;flash(player.x,player.y,COL.aurora36);invuln=Math.max(invuln,.35);return;}
   if(v==='chrono11_a'&&t>=S.chronoCd&&(typeof shield!=='number'||shield<=0)&&hp-hit<=0){S.chronoCd=t+L(90,60,lv)/E195('chrono11_a');hp=Math.max(hp,1);invuln=Math.max(invuln,L(1,2,lv));flash(player.x,player.y,COL.chrono11_a);if(lv>=5)try{bullets=bullets.filter(b=>Math.hypot(b.x-player.x,b.y-player.y)>90);}catch{}try{hud();}catch{}return;}
   let red=0,absorb=0;
   if(v==='aegis9'){red=L(.08,.18,lv);const c=eq('sidearm');if(c&&c.variant==='carrier9')red=Math.min(.30,red+L(.04,.12,lv));red=Math.min(.36,red*E195('aegis9'));}
   if(v==='seraph36'&&S.seraph.length){let need=hit;for(const z of S.seraph){const k=Math.min(z.left,need);z.left-=k;need-=k;absorb+=k;if(need<=0)break;}S.seraph=S.seraph.filter(z=>z.left>1e-4);red=Math.min(1,absorb/Math.max(1e-6,hit));}
   let defer=0;if(v==='monarch12_a'){defer=Math.min(.72,L(.30,.60,lv)*E195('monarch12_a'));red=Math.max(red,defer);}
   const h0=hp,s0=typeof shield==='number'?shield:0;let r;
   if(red>0&&typeof enemyScale==='function'){const oe=enemyScale;enemyScale=function(){return oe.apply(this,arguments)*(1-red);};try{r=od.apply(this,arguments);}finally{enemyScale=oe;}}else r=od.apply(this,arguments);
   try{const tookHp=hp<h0-1e-6;if(v==='monarch12_a'&&tookHp)S.defer.push({left:hit*defer,rate:hit*defer/4});
    if(v==='void36'&&tookHp&&hp<maxHp*L(.30,.35,lv)&&t>=S.voidCd){S.voidCd=t+L(26,18,lv)/E195('void36');invuln=Math.max(invuln,Math.min(2.5,L(1.2,2,lv)*Math.sqrt(E195('void36'))));flash(player.x,player.y,COL.void36);}}catch{}
   return r;};
  nd.__nt147=1;damage=nd;return true;}
 const IMPT={};
 window.NT147_PRE=(i,e,d)=>{if(on()&&i&&e&&!HIT.has(i.variant)){const t=T();if(t-(IMPT[i.variant]||0)>.12){IMPT[i.variant]=t;return {d,post:()=>impactArt({v147:i.variant,superShot:bt()},e)};}return null;}if(!on()||!i||!HIT.has(i.variant)||!e)return null;const lv=lvOf(i),s={v147:i.variant,lv147:lv,damage:d*norm(i.variant,lv),superShot:bt(),gearKind:i.kind};
  return {d:s.damage,post:()=>{try{const v=VU.get(e);if(v&&v.until>T()&&!e.dead)hurtE(e,s.damage*v.p);}catch{}onHit(s,e);}};};
 function installHooks(){try{if(!Equipment25.__nt147){const oh=Equipment25.hit;Equipment25.hit=function(s,e){try{if(on()&&s&&e&&!e.dead){const v=VU.get(e);if(v&&v.until>T()&&s.damage>0&&s.gearKind&&s.gearKind!=='armor')hurtE(e,s.damage*v.p);}}catch{}
     try{if(on()&&s&&!s.t147)tag();}catch{}const r=oh.apply(this,arguments);try{if(on()&&s&&s.v147)onHit(s,e);}catch(err){}return r;};
    const ods=Equipment25.drawShot;Equipment25.drawShot=function(s){try{if(drawArt(s))return true;}catch{}return ods.apply(this,arguments);};
    const ou=Equipment25.update;Equipment25.update=function(){const r=ou.apply(this,arguments);try{if(on())tag();}catch{}return r;};Equipment25.__nt147=1;}}catch{}
  try{if(!insK&&!kill.__nt147){insK=true;const ok=kill;kill=function(e){const was=e&&!e.dead;const r=ok.apply(this,arguments);try{S.kc=(S.kc||0)+1;const i=on()?aItem():null;if(was&&e.dead&&i&&i.variant==='devour10_a'&&mode==='play'){const lv=lvOf(i),t=T();if(t>S.killWin){S.killWin=t+10;S.killAcc=0;}const elite=e.elite||e.large||e.bossPart;
       const e195=E195('devour10_a');let h=(elite?L(.03,.05,lv):L(.003,.008,lv))*maxHp*e195;if(!elite){h=Math.min(h,L(.06,.10,lv)*maxHp*e195-S.killAcc);S.killAcc+=Math.max(0,h);}if(h>0){hp=Math.min(maxHp,hp+h);try{hud();}catch{}}}}catch{}return r;};kill.__nt147=1;}}catch{}
  try{if(!insC&&!collect.__nt147){insC=true;const oc=collect;collect=function(d){const r=oc.apply(this,arguments);try{const i=on()?aItem():null;if(i&&i.variant==='seraph36'&&mode==='play'&&d&&d.type!=='craft'){const lv=lvOf(i),t=T(),cap=Math.round(L(2,3,lv));S.seraph=S.seraph.filter(z=>z.until>t);if(S.seraph.length<cap){S.seraph.push({left:L(.025,.05,lv)*maxHp*E195('seraph36'),until:t+4});if(S.seraph.length>=cap&&lv>=5){hp=Math.min(maxHp,hp+maxHp*.01);try{hud();}catch{}}flash(player.x,player.y,COL.seraph36);}}}catch{}return r;};collect.__nt147=1;}}catch{}}
 // ---------- vẽ: cột / vệt / tia ngắn, không vòng tròn ----------
 function draw(){let m='';try{m=mode;}catch{}if(m!=='play'&&m!=='pause')return;if(!on())return;const t=T();const g=ctx;g.save();g.globalCompositeOperation='lighter';
  for(let k=FX.length-1;k>=0;k--){const f=FX[k],a=1-(t-f.at)/f.life;if(a<=0){FX.splice(k,1);continue;}if(f.k==='anim'){const im=img(f.key);if(im){const c=im.naturalHeight,fr=Math.min(7,Math.floor((t-f.at)/f.life*8));g.save();g.globalCompositeOperation='source-over';g.globalAlpha=1;g.drawImage(im,fr*c,0,c,c,f.x-f.z/2,f.y-f.z/2,f.z,f.z);g.restore();}continue;}g.globalAlpha=Math.max(0,a)*.85;g.fillStyle=f.c;g.strokeStyle=f.c;
   if(f.k==='col'){const y0=f.full?0:f.up?0:f.y-60,y1=f.full?H:f.up?f.y:f.y+20;const gr=g.createLinearGradient(f.x-f.w/2,0,f.x+f.w/2,0);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(.5,f.c);gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(f.x-f.w/2,y0,f.w,y1-y0);}
   else if(f.k==='row'){g.fillRect(f.x-f.w/2,f.y-2,f.w,4);}
   else if(f.k==='line'){g.lineWidth=2;g.beginPath();g.moveTo(f.x,f.y);g.lineTo(f.x2,f.y2);g.stroke();}
   else if(f.k==='dot'){g.fillRect(f.x-3,f.y-3,6,6);}}
  if(S.chain){const c=S.chain;g.globalAlpha=.75;g.strokeStyle=COL.orbit36;g.lineWidth=2;g.beginPath();const n=10;for(let j=0;j<=n;j++){const x=c.x1+(c.x2-c.x1)*j/n,y=c.y+(j%2?-4:4)*Math.sin(t*30+j);j?g.lineTo(x,y):g.moveTo(x,y);}g.stroke();}
  g.restore();}
 try{const vd=VisualFX.draw;VisualFX.draw=function(){const r=vd.apply(this,arguments);try{tick();draw();}catch(e){}return r;};}catch{}
 function boot(){installArmor();installHooks();}
 boot();setTimeout(boot,0);setTimeout(boot,1500);
 window.NT147S={S,VU,SP,FIELD,SEAL,norm,lvOf,onHit,count:()=>({vul:VU.size,spore:SP.length,echo:ECHO.length,field:FIELD.length,seal:SEAL.length,rift:RIFT.length,graze:S.graze,layer:S.layer,seraph:S.seraph.length,defer:S.defer.length,devS:S.devS})};
})();
