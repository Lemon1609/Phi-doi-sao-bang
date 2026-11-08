'use strict';
// V209 · D7 · NỘI TẠI GIÁP THEO SỰ KIỆN (Gemini V209_ARMOR_EVENT_CONFIG.armorEventPassives). Tắt: window.ARMOR_EV209=false
//  Chạy THÊM bên cạnh nội tại giáp cũ (V144/147/SSS), không thay. Giáp SSS kế thừa nội tại sự kiện của cả 2 giáp mẹ ở Lv5.
//  Sự kiện: vào Bạo Tẩu · nhặt viên buff / huy chương · phá chướng ngại / hạ tinh anh / vỡ cánh boss · đủ 5 lần sượt đạn · vỡ giáp / tầng chặn · hạ 3 tinh anh hoặc 1 pha boss.
//  Hiệu ứng tức thì, có hồi nội bộ (icd) + trần mỗi phút; không hết hạn theo giờ; chỉ chớp ≤ 0,3 s (VisualFX.impact), không vòng tròn, không chữ bay.
//  Đồng hồ riêng (cộng dt mỗi khung) → không lệch khi đồng hồ trận 'time' về 0.
const V209EV=(()=>{
 const CF=(typeof V209_ARMOR_EVENT_CONFIG!=='undefined')?V209_ARMOR_EVENT_CONFIG:null;
 const PS=CF?CF.armorEventPassives:[],BY={};for(const p of PS)BY[p.id]=p;
 const on=()=>!!CF&&window.ARMOR_EV209!==false;
 const COL={ev_super_shield:'#9fe4ff',ev_pickup_mend:'#7ff2b8',ev_hazard_charge:'#ffb27a',ev_graze_pulse:'#c9a2ff',ev_break_nova:'#a8c4ff',ev_bounty_aegis:'#ffe08a'};
 const BUFF=new Set(['super','power','heal','shield','bomb','drone','magnet','weapon','fighter','rapid','plasma']);
 const S={clk:0,last:-1,cd:{},win:{},layer:0,pool:0,graze:0,elites:0,sup:false,supExt:0,healWin:[],tier:0,seen:new Map(),l144:0,l147:0,n:{}};
 function reset(){S.clk=0;S.last=-1;S.cd={};S.win={};S.layer=0;S.pool=0;S.graze=0;S.elites=0;S.sup=false;S.supExt=0;S.healWin=[];S.tier=0;S.seen.clear();S.l144=0;S.l147=0;S.n={};}
 const playing=()=>{try{return mode==='play';}catch{return false;}};
 const flash=(c)=>{try{VisualFX.impact(player.x,player.y,c,.8);}catch{}};
 // ---- giáp đang xuất chiến → danh sách [passive, lv]
 function armor(){if(window.__arm209)return window.__arm209;/* móc thử cho bot */try{if(window.SSSE_A&&typeof Gear44==='object'&&Gear44.activeDef){const d=Gear44.activeDef('armor');if(d&&d.parents)return {ids:d.parents.slice(),lv:5,sss:true};}}catch{}
  try{const i=gear.armorItem;if(i&&i.variant){let r=0;try{r=i.spec.rank|0;}catch{}return {ids:[i.variant],lv:Math.max(1,Math.min(5,r+1)),sss:false};}}catch{}return null;}
 // V210: số đã cân (tunedEventPassivesV210) + kế thừa SSS (mẹ 1 ×1,0 · mẹ 2 ×0,6 · trùng mã ×1,25). Tắt: window.BAL210=false
 const B10=()=>{try{const b=BAL_EV();return b?{tunedEventPassivesV210:b.tuned,sssArmorEventInheritance:b.inh}:null;}catch{return null;}}; // V211: dùng bộ BAL_EV() (V211 > V210)
 const SCALED=['shieldProcChance','healMaxHpPct','restoreMaxArmorPct','superGaugeAddPct','extendActiveSuperSec','boltGearDmgPct','refundArmorSkillCdPct','clearDelayedDebtPct','grantPermanentShieldHpPct'];
 function eff(p0,k){const b=B10();const p={...p0,lvValues:{...p0.lvValues}};if(b){const t=b.tunedEventPassivesV210[p.id];if(t)for(const key in t){if(key in p.lvValues)p.lvValues[key]=t[key];else p[key]=t[key];}}
  if(k!==1)for(const f of SCALED){const v=p.lvValues[f];if(v===undefined)continue;const sc=x=>f==='shieldProcChance'?Math.min(1,x*k):x*k;p.lvValues[f]=Array.isArray(v)?v.map(sc):sc(v);}p.k210=k;return p;}
 function listFor(ids,lv,sss){const b=B10(),inh=b?b.sssArmorEventInheritance:null;const o=[],seen={};
  ids.forEach((id,idx)=>{for(const p of PS)if(p.armors.includes(id)){if(seen[p.id]!==undefined){if(sss&&inh)o[seen[p.id]][2]=inh.primaryParentScale*inh.samePassiveIdBonus;continue;}seen[p.id]=o.length;o.push([p,lv,sss&&inh?(idx===0?inh.primaryParentScale:inh.secondaryParentScale):1]);}});
  return o.map(([p,lv,k])=>[eff(p,k),lv]);}
 function active(){if(!on())return [];const a=armor();if(!a)return [];return listFor(a.ids,a.lv,!!a.sss);}
 const has=id=>active().find(x=>x[0].id===id)||null;
 const V=(arr,lv)=>Array.isArray(arr)?arr[Math.max(0,Math.min(arr.length-1,lv-1))]:arr;
 // ---- hồi nội bộ + trần mỗi phút
 function gate(p){const t=S.clk;if((S.cd[p.id]||-1e9)>t)return false;const w=(S.win[p.id]||[]).filter(x=>t-x<60);S.win[p.id]=w;if(p.maxTriggersPerMin&&w.length>=p.maxTriggersPerMin)return false;return true;}
 function fire(p){S.cd[p.id]=S.clk+p.icdSec;(S.win[p.id]=S.win[p.id]||[]).push(S.clk);S.n[p.id]=(S.n[p.id]||0)+1;flash(COL[p.id]);}
 // ---- tiện ích
 function clearNear(r){let k=0;try{for(const b of bullets){if(b.dead)continue;if(Math.hypot(b.x-player.x,b.y-player.y)<r){b.dead=true;k++;}}}catch{}return k;}
 function addArmor(pct){try{if(typeof shield==='number'&&typeof maxShield==='number'&&maxShield>0)shield=Math.min(maxShield,shield+maxShield*pct/100);}catch{}}
 function healHp(pct,capPct){try{const t=S.clk;S.healWin=S.healWin.filter(x=>t-x[0]<60);const used=S.healWin.reduce((a,x)=>a+x[1],0);const room=Math.max(0,maxHp*capPct/100-used);const v=Math.min(maxHp-hp,maxHp*pct/100,room);if(v>0){hp+=v;S.healWin.push([t,v]);}return v;}catch{return 0;}}
 function unit(){let a=10;try{a=Combat.stats().attack;}catch{}return Math.max(1,a)*.25;}
 function targets(){const o=[];try{for(const e of enemies)if(!e.dead&&!e.rescue28&&e.y>-20&&e.y<H)o.push(e);if(boss&&!boss.dead)o.push(boss);}catch{}return o;}
 function hurt(e,amt){if(!e||e.dead||!(amt>0))return;try{if(e===boss||e.bossPart){damageBoss(amt,'gear',e);return;}try{Report392.hit(Math.min(e.hp,amt),'gear');}catch{}e.hp-=amt;e.hitFlashTimer=.08;if(e.hp<=0)kill(e);}catch{}}
 const hudX=()=>{try{hud();}catch{}};
 // ---- 6 nội tại
 const RUN={
  ev_super_shield(p,lv){if(Math.random()<V(p.lvValues.shieldProcChance,lv)){S.layer=1;}clearNear(p.lvValues.clearBulletsRadiusPx);return true;},
  ev_pickup_mend(p,lv){healHp(V(p.lvValues.healMaxHpPct,lv),p.maxHealHpPctPerMin);addArmor(V(p.lvValues.restoreMaxArmorPct,lv));hudX();return true;},
  ev_hazard_charge(p,lv){const L=p.lvValues;let sup=false;try{sup=superTime>0;}catch{}
   if(sup){const ext=Math.min(V(L.extendActiveSuperSec,lv),Math.max(0,L.maxExtendPerSuperSec-S.supExt));if(ext<=0)return false;try{superTime+=ext;}catch{}S.supExt+=ext;}else{try{Combat26.addCharge07(V(L.superGaugeAddPct,lv));}catch{}}return true;},
  ev_graze_pulse(p,lv){const L=p.lvValues;addArmor(V(L.restoreMaxArmorPct,lv));const dmg=unit()*V(L.boltGearDmgPct,lv)/100;const tg=targets().sort((a,b)=>Math.hypot(a.x-player.x,a.y-player.y)-Math.hypot(b.x-player.x,b.y-player.y));
   for(let k=0;k<L.counterBolts;k++){const e=tg[k%Math.max(1,tg.length)];if(!e)break;hurt(e,dmg);try{VisualFX.impact(e.x,e.y,COL.ev_graze_pulse,.7);}catch{}}hudX();return true;},
  ev_break_nova(p,lv){const L=p.lvValues;clearNear(V(L.clearBulletsRadiusPx,lv));const f=V(L.refundArmorSkillCdPct,lv)/100;
   try{const s=window.NT144S&&NT144S.S;if(s&&s.skCd>0)s.skCd-=16*f;}catch{}try{const s=window.NT147S&&NT147S.S;if(s){if(s.voidCd)s.voidCd-=22*f;if(s.chronoCd)s.chronoCd-=75*f;}}catch{}return true;},
  ev_bounty_aegis(p,lv){const L=p.lvValues,k=V(L.clearDelayedDebtPct,lv)/100;try{const s=window.NT147S&&NT147S.S;if(s&&s.defer)for(const z of s.defer){z.left*=(1-k);z.rate*=(1-k);}}catch{}
   try{S.pool=Math.min(maxHp*p.maxPermanentShieldCapHpPct/100,S.pool+maxHp*V(L.grantPermanentShieldHpPct,lv)/100);}catch{}return true;}
 };
 const TRIG={super:'ev_super_shield',pickup:'ev_pickup_mend',hazard:'ev_hazard_charge',elite:'ev_hazard_charge',wing:'ev_hazard_charge',graze5:'ev_graze_pulse',broken:'ev_break_nova',bounty:'ev_bounty_aegis'};
 function trig(id){const a=has(id);if(!a||!playing())return false;const [p,lv]=a;if(!gate(p))return false;let ok=false;try{ok=RUN[id](p,lv);}catch{}if(ok)fire(p);return ok;}
 function onEv(k,o){if(!on())return;if(k==='hazard'||k==='elite'||k==='wing')trig('ev_hazard_charge');
  if(k==='elite'){S.elites++;if(S.elites>=3){if(trig('ev_bounty_aegis'))S.elites=0;else S.elites=3;}}
  if(k==='wing')trig('ev_bounty_aegis');}
 // ---- khung hình
 function tick(){if(!on())return;let t=0;try{t=+time||0;}catch{}if(S.last<0||t<S.last-.25){S.last=t;return;}const dt=Math.max(0,Math.min(.1,t-S.last));S.last=t;if(!playing())return;S.clk+=dt;
  let sup=false;try{sup=superTime>0;}catch{}if(sup&&!S.sup){S.supExt=0;trig('ev_super_shield');}S.sup=sup;
  // nhặt viên buff: viên ở sát tàu biến mất / chuyển 'none' trong khung này
  try{const now=new Map();for(const d of drops){if(!d.dead&&BUFF.has(d.type))now.set(d,1);}
   for(const [d] of S.seen){if(!now.has(d)&&(d.dead||d.type==='none')){const dd=Math.hypot(d.x-player.x,d.y-player.y);if(dd<130)trig('ev_pickup_mend');}}S.seen=now;}catch{}
  try{const r=V77.run&&V77.run();const tr=r?r.tier|0:0;if(tr>S.tier)trig('ev_pickup_mend');S.tier=tr;}catch{}
  // tầng chặn của giáp cũ (V144 aegis / V147 aurora36) vừa vỡ
  try{const l=window.NT144S?NT144S.S.layer|0:0;if(S.l144>0&&l===0)trig('ev_break_nova');S.l144=l;}catch{}
  try{const l=window.NT147S?NT147S.S.layer|0:0;if(S.l147>0&&l===0)trig('ev_break_nova');S.l147=l;}catch{}}
 // ---- bọc damage: tầng Khiên chặn đòn (V209) + Khiên vĩnh viễn (pool) + phát hiện vỡ giáp
 let insD=false;
 function installDamage(){if(insD||typeof damage!=='function'||damage.__v209)return;insD=true;const od=damage;
  const nd=function(source='collision'){if(!on()||!playing())return od.apply(this,arguments);
   let inv=0;try{inv=invuln;}catch{}const shieldOn=(()=>{try{return source==='bullet'&&bulletShieldTime>0;}catch{return false;}})();
   if(S.layer>0&&!(inv>0)&&!shieldOn){S.layer=0;try{invuln=Math.max(invuln,.35);}catch{}flash(COL.ev_super_shield);trig('ev_break_nova');return;}
   const h0=typeof hp==='number'?hp:0,s0=typeof shield==='number'?shield:0;const r=od.apply(this,arguments);
   try{const lossH=Math.max(0,h0-hp),lossS=Math.max(0,s0-shield);if(S.pool>0&&lossH+lossS>0){let back=Math.min(S.pool,lossH);hp+=back;S.pool-=back;const b2=Math.min(S.pool,lossS);shield+=b2;S.pool-=b2;hudX();}
    if(s0>0&&shield<=0)trig('ev_break_nova');}catch{}
   return r;};nd.__v209=1;damage=nd;}
 function installHooks(){
  try{if(typeof kill==='function'&&!kill.__v209){const ok=kill;kill=function(e){const was=e&&!e.dead;const r=ok.apply(this,arguments);try{if(was&&e.dead&&(e.elite||e.large)&&!e.bossPart&&e!==boss)onEv('elite');}catch{}return r;};kill.__v209=1;}}catch{}
  try{if(typeof Combat26==='object'&&!Combat26.__v209){const ob=Combat26.breakWing;Combat26.breakWing=function(p){const was=p&&!p.broken26&&!p.dead;const r=ob.apply(this,arguments);try{if(was&&(p.broken26||p.dead))onEv('wing');}catch{}return r;};
   const og=Combat26.graze;Combat26.graze=function(){const r=og.apply(this,arguments);try{if(r&&on()){S.graze++;const a=has('ev_graze_pulse');if(a&&S.graze>=(a[0].grazeRequired||5)){if(trig('ev_graze_pulse'))S.graze=0;}}}catch{}return r;};Combat26.__v209=1;}}catch{}}
 try{const o=runGameFrameC;runGameFrameC=function(){const r=o.apply(this,arguments);try{tick();}catch{}return r;};}catch{}
 try{const o=Report392.reset;Report392.reset=function(){reset();return o.apply(this,arguments);};}catch{}
 try{const ob=Combat.begin;Combat.begin=function(){const r=ob.apply(this,arguments);try{reset();}catch{}return r;};}catch{}
 function boot(){installDamage();installHooks();}
 boot();setTimeout(boot,0);setTimeout(boot,1700);setTimeout(boot,4000);
 // ---- mô tả trên chi tiết giáp (ngoài trận)
 function descOf(p,lv){const L=p.lvValues,pct=x=>(Math.round(x*10)/10).toString().replace('.',',');const m={chance:pct(V(L.shieldProcChance,lv)*100),hp:pct(V(L.healMaxHpPct,lv)),arm:pct(V(L.restoreMaxArmorPct,lv)),gauge:V(L.superGaugeAddPct,lv),ext:pct(V(L.extendActiveSuperSec,lv)),dmg:V(L.boltGearDmgPct,lv),rad:V(L.clearBulletsRadiusPx,lv),cd:V(L.refundArmorSkillCdPct,lv),debt:V(L.clearDelayedDebtPct,lv),sh:pct(V(L.grantPermanentShieldHpPct,lv))};
  const f=x=>String(x).replace('.',',');let t=p.desc.replace(/\{(\w+)\}/g,(_,k)=>m[k]!==undefined?m[k]:'');
  t=t.replace(/hồi \d+(?:[.,]\d+)?s/g,'hồi '+f(p.icdSec)+'s');if(p.maxHealHpPctPerMin)t=t.replace(/trần \d+% Máu\/phút/,'trần '+f(p.maxHealHpPctPerMin)+'% Máu/phút');
  if(p.grazeRequired)t=t.replace(/Mỗi \d+ lần/,'Mỗi '+p.grazeRequired+' lần');if(p.maxPermanentShieldCapHpPct)t=t.replace(/trần cộng dồn \d+% HP/,'trần cộng dồn '+f(p.maxPermanentShieldCapHpPct)+'% HP');return t;}
 const box=(L)=>`<div class="ev209">${L.map(([p,lv])=>`<p><b>⚡ ${p.tag}</b> <small>Lv${lv}${p.k210&&p.k210!==1?' · hiệu lực '+Math.round(p.k210*100)+'%':''}</small><br>${descOf(p,lv)}</p>`).join('')}</div>`;
 function inject(){if(!on())return;
  try{document.querySelectorAll('[data-item]').forEach(sh=>{if(sh.querySelector('.ev209'))return;let it=null;try{it=Progress.v70.get(sh.dataset.item);}catch{}if(!it||it.kind!=='armor')return;let r=0;try{r=it.spec.rank|0;}catch{}const lv=Math.max(1,Math.min(5,r+1));
   const L=listFor([it.variant],lv,false);if(!L.length)return;const d=sh.querySelector('p.hb-desc');if(d)d.insertAdjacentHTML('afterend',box(L));});}catch{}
  try{const det=document.querySelector('#g44-det .g44-txt');if(det&&!det.querySelector('.ev209')){const sel=document.querySelector('.g44-r.sel[data-pick]');const d=sel&&Gear44.defs().find(x=>x.id===sel.dataset.pick);if(d&&d.kind==='armor'&&d.parents){const L=listFor(d.parents,5,true);if(L.length){const h=det.querySelector('.kw208')||det.querySelector('h3');if(h)h.insertAdjacentHTML('afterend',box(L));}}}}catch{}}
 try{new MutationObserver(()=>inject()).observe(document.body,{childList:true,subtree:true});}catch{}
 return {on:onEv,trig,state:()=>({layer:S.layer,pool:S.pool,graze:S.graze,elites:S.elites,clk:S.clk,n:{...S.n},active:active().map(x=>x[0].id+'@'+x[1])}),_S:S,armor,active,descOf};
})();
window.V209EV=V209EV;
