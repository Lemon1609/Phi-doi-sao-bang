// V144 · NỘI TẠI + KỸ NĂNG GIÁP MỚI (Gemini chốt 30/10, src/ky_nang_39_chot.json) · ĐỢT 1a: 6 giáp Bộ 01–06
//  Thang máu thật: máu ≈ 9,5, giáp ≈ 5,2, mỗi đòn trừ enemyScale() (0,9→1,5), bất tử 1,5 s sau mỗi đòn.
//  Chuẩn ngân sách: cấp 5 cứu 1,5–2,5 đòn ở 6 đòn/phút; 5–7 đòn ở 20 đòn/phút.
//  • aegis   Thành Trì: mỗi 32→20 s tích 1 tầng (tối đa 1) chặn hẳn 1 đòn; Bạo Tẩu 16 s.
//  • mirror  Kính Phản: 12→25% vô hiệu đòn + phản tia vào quái gần nhất (100→180% sát thương); Bạo Tẩu 35%, nảy 2 mục tiêu.
//  • orbital Quỹ Đạo:  chặn đạn bay tới từ sườn/sau (góc so với mũi tàu > 120°→70°), hồi 6→3 s; Bạo Tẩu 2,2 s.
//  • phase   Dịch Pha: 12→24% vô hiệu đòn; Bạo Tẩu 35%.
//  • reactive Long Viêm: giảm 10→24% mỗi đòn + phản 1→3 tia lửa vào quái gần; Bạo Tẩu 28%.
//  • nanite  Nano: không trúng đòn 3 s thì hồi 0,6→1,0% máu/s, trần 15→25% máu/phút; Bạo Tẩu chờ 2 s, trần 32%.
//  Kỹ năng (tự kích khi cần, không cần nút): aegis/orbital 18 s · mirror/phase 14 s: khi đạn địch sát tàu → 1 lượt chặn trong 1,5–2 s
//   · reactive 14 s: khi trúng đòn → giảm 45% trong 2,5 s · nanite 14 s: khi máu < 50% → hồi 10% + giảm 25% trong 2 s.
//  Hình ảnh: chỉ chớp ≤ 0,3 s (VisualFX.impact), không vòng tròn quanh tàu. Tắt toàn bộ: window.NT144=false
(()=>{
 const SET=new Set(['aegis','mirror','orbital','phase','reactive','nanite']);
 const COL={aegis:'#9fe4ff',mirror:'#d8f6ff',orbital:'#8fa2ff',phase:'#c9a2ff',reactive:'#ff9a66',nanite:'#7ff2b8'};
 const L=(a,b,lv)=>a+(b-a)*(lv-1)/4;
 const S={layer:0,layerT:0,skCd:0,skUntil:0,skLeft:0,orbCd:0,redUntil:0,red2:0,lastHit:-99,healWin:0,healAcc:0,id:null};
 const on=()=>window.NT144!==false;
 const E195=v=>{try{return window.CHIPARM195?window.CHIPARM195(v):1;}catch{return 1;}};/* V195: hiệu lực nội tại giáp từ chip (1–1,25) */
 const T=()=>{try{return time;}catch{return 0;}};
 function item(){if(window.SSSE_A)return null;try{const i=gear.armorItem;return i&&SET.has(i.variant)?i:null;}catch{return null;}}
 function lvOf(i){let r=0;try{r=i.spec.rank|0;}catch{}return Math.max(1,Math.min(5,r+1));}
 const bt=()=>{try{return superTime>0;}catch{return false;}};
 const flash=(x,y,c)=>{try{VisualFX.impact(x,y,c);}catch{}};
 function live(){try{return enemies.filter(e=>!e.dead&&!e.rescue28&&e.y>-20&&e.y<H);}catch{return [];}}
 function nearestE(x,y,skip){let best=null,bd=1e12;for(const e of live()){if(skip&&skip.has(e))continue;const d=(e.x-x)**2+(e.y-y)**2;if(d<bd){bd=d;best=e;}}try{if(boss&&!boss.dead&&!(skip&&skip.has(boss))){const d=(boss.x-x)**2+(boss.y-y)**2;if(d<bd)best=boss;}}catch{}return best;}
 function unit(){let a=10;try{a=Combat.stats().attack;}catch{}return Math.max(1,a)*.25;}
 function hurtE(e,amt){if(!e||e.dead||!(amt>0))return;try{if(e===boss||e.bossPart){damageBoss(amt,'gear',e);return;}e.hp-=amt;if(e.hp<=0)kill(e);}catch{}}
 function reset(){Object.assign(S,{layer:0,layerT:0,skCd:0,skUntil:0,skLeft:0,orbCd:0,redUntil:0,red2:0,lastHit:-99,healWin:0,healAcc:0});}
 // ---- viên đạn vừa trúng: tìm trong bullets viên đã bị đánh dấu dead gần tàu nhất
 function hitBullet(){let b0=null,bd=1e9;try{for(const b of bullets){if(!b.dead)continue;const d=Math.hypot(b.x-player.x,b.y-player.y);if(d<bd&&d<(b.r||6)+24){bd=d;b0=b;}}}catch{}return b0;}
 function fromSideBack(b,limitDeg){if(!b)return false;let vx=b.vx,vy=b.vy;if(vx===undefined&&b.angle!==undefined){vx=Math.cos(b.angle);vy=Math.sin(b.angle);}if(vx===undefined)return false;const sp=Math.hypot(vx,vy)||1;
  // hướng đạn bay TỚI = -(v); mũi tàu = (0,-1) → cos(góc) = vy/|v|
  const ang=Math.acos(Math.max(-1,Math.min(1,vy/sp)))*180/Math.PI;return ang>limitDeg;}
 // ---- quyết định khi trúng đòn: trả về 'block' | 'reduce' | null
 function decide(i,source){const id=i.variant,lv=lvOf(i),now=T(),B=bt();
  if(S.skLeft>0&&now<S.skUntil&&(id==='aegis'||id==='mirror'||id==='orbital'||id==='phase')){S.skLeft--;if(id==='mirror')reflect(lv,B);return 'block';}
  if(id==='aegis'&&S.layer>0){S.layer=0;S.layerT=0;if(B)push60();return 'block';}
  if(id==='mirror'&&Math.random()<(B?.35:L(.12,.25,lv))*E195('mirror')){reflect(lv,B);return 'block';}
  if(id==='phase'&&Math.random()<(B?.35:L(.12,.24,lv))*E195('phase'))return 'block';
  if(id==='orbital'&&source==='bullet'&&now>=S.orbCd){const b=hitBullet();if(fromSideBack(b,L(120,70,lv))){S.orbCd=now+(B?2.2:L(6,3,lv))/E195('orbital');return 'block';}}
  return null;}
 function reflect(lv,B){const k=L(1,1.8,lv)*unit()*E195('mirror');const seen=new Set();let x=player.x,y=player.y;for(let n=0;n<(B?3:1);n++){const e=nearestE(x,y,seen);if(!e)break;seen.add(e);hurtE(e,k*(n?0.6:1));flash(e.x,e.y,COL.mirror);x=e.x;y=e.y;}}
 function push60(){for(const e of live()){if(e.large||e.elite)continue;const dx=e.x-player.x,dy=e.y-player.y,d=Math.hypot(dx,dy);if(d<110&&d>1){e.x+=dx/d*60;e.y+=dy/d*60;}}}
 function counterFire(lv,B){const n=Math.round(L(1,3,lv));const seen=new Set();for(let k=0;k<n;k++){const e=nearestE(player.x,player.y,seen);if(!e)break;seen.add(e);hurtE(e,unit()*.5);flash(e.x,e.y,COL.reactive);if(B)e.burn=Math.max(e.burn||0,2);}}
 // ---- bọc damage()
 let ins144=false;/* V148: chỉ bọc 1 lần — lần khởi động lặp không bọc chồng khi module khác đã bọc damage sau mình */
 function install(){if(ins144||typeof damage!=='function'||damage.__nt144)return false;ins144=true;const od=damage;
  const nd=function(source='collision'){const i=on()?item():null;let blocked=false;
   try{if(i&&!(invuln>0)&&mode==='play'&&!(source==='bullet'&&bulletShieldTime>0)){const r=decide(i,source);if(r==='block'){blocked=true;flash(player.x,player.y,COL[i.variant]);invuln=Math.max(invuln,.35);}}}catch{}
   if(blocked)return;
   const h0=typeof hp==='number'?hp:0,s0=typeof shield==='number'?shield:0;let red=0;
   try{if(i){const lv=lvOf(i),now=T();if(i.variant==='reactive')red=(bt()?.28:L(.10,.24,lv))*E195('reactive');if(now<S.redUntil)red=Math.max(red,S.red2);}}catch{}
   let r;if(red>0&&typeof enemyScale==='function'){const oe=enemyScale;enemyScale=function(){return oe.apply(this,arguments)*(1-red);};try{r=od.apply(this,arguments);}finally{enemyScale=oe;}}else r=od.apply(this,arguments);
   try{if(i&&((typeof hp==='number'&&hp<h0)||(typeof shield==='number'&&shield<s0))){S.lastHit=T();if(i.variant==='reactive'){counterFire(lvOf(i),bt());if(S.skCd<=T()){S.skCd=T()+14;S.redUntil=T()+2.5;S.red2=.45;flash(player.x,player.y,COL.reactive);}}}}catch{}
   return r;};
  nd.__nt144=1;damage=nd;return true;}
 // ---- mỗi khung: tầng giáp, hồi máu, kỹ năng tự kích; tắt cơ chế giáp cũ của 6 món
 function tick(dt){const i=on()?item():null;if(!i){if(S.id)reset();S.id=null;return;}if(S.id!==i.variant){reset();S.id=i.variant;}
  if(!(mode==='play'))return;const id=i.variant,lv=lvOf(i),now=T(),B=bt();
  if(id==='aegis'&&S.layer<1){S.layerT+=dt*E195('aegis');if(S.layerT>=(B?16:L(32,20,lv))){S.layer=1;S.layerT=0;flash(player.x,player.y,COL.aegis);}}
  if(id==='nanite'){S.healWin+=dt;if(S.healWin>=60){S.healWin=0;S.healAcc=0;}const wait=B?2:3,cap=(B?.32:L(.15,.25,lv))*maxHp*E195('nanite');
   if(now-S.lastHit>=wait&&hp<maxHp&&S.healAcc<cap){const v=Math.min(maxHp-hp,L(.006,.010,lv)*maxHp*dt*E195('nanite'),cap-S.healAcc);hp+=v;S.healAcc+=v;try{if(Math.floor(now*2)!==Math.floor((now-dt)*2))hud();}catch{}}
   if(S.skCd<=now&&hp<maxHp*.5){S.skCd=now+14;hp=Math.min(maxHp,hp+maxHp*.10);S.redUntil=now+2;S.red2=.25;flash(player.x,player.y,COL.nanite);try{hud();}catch{}}}
  if((id==='aegis'||id==='orbital'||id==='mirror'||id==='phase')&&S.skCd<=now){let danger=false;try{for(const b of bullets){if(!b.dead&&Math.hypot(b.x-player.x,b.y-player.y)<70){danger=true;break;}}}catch{}
   if(danger){S.skCd=now+(id==='aegis'||id==='orbital'?18:14)/E195(id);S.skUntil=now+(id==='aegis'?1.5:2);S.skLeft=1;flash(player.x,player.y,COL[id]);}}}
 function hookEquip(){try{const E=Equipment25;if(E.__nt144)return;const ou=E.update;E.update=function(dt){const all=gear.equipment;const i=on()?item():null;if(i&&all)gear.equipment=all.filter(x=>x!==i&&!(x.kind==='armor'&&SET.has(x.variant)));try{return ou.apply(this,arguments);}finally{gear.equipment=all;try{tick(dt||0);}catch(e){}}};
   const oo=E.onDamage;E.onDamage=function(){if(on()&&item())return;return oo.apply(this,arguments);};E.__nt144=1;}catch{}}
 try{const ob=Combat.begin;Combat.begin=function(){const r=ob.apply(this,arguments);try{reset();S.id=null;}catch{}return r;};}catch{}
 function boot(){install();hookEquip();}
 boot();setTimeout(boot,0);setTimeout(boot,1500);
 window.NT144S={S,decide,lvOf,item,on};
})();
