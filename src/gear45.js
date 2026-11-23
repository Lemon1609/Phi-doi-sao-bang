'use strict';
// V45 · (giáp SSS ×1,35 máu + khiên) · V44 · HỆ TRANG BỊ SSS (tranh + GEAR_FX của GPT V3/V4, duyệt ở bản giám định V6)
//  • Tên lửa / Vũ khí phụ: bắn bằng GEAR_FX (đường đạn, đuôi, nổ 8 khung, kỹ năng, siêu cấp, Tuyệt kỹ SSS).
//    Sát thương được QUY ĐỔI về đúng mức sát thương phụ trợ cũ của game (auxDamage) → không lệch cân bằng; SSS ×1,35.
//  • Giáp: giữ nguyên cơ chế Equipment25 (đã cân bằng), thay hình: vòm giáp vẽ tay phía sau tàu + hoạt ảnh kích hoạt 8 khung.
//    Giáp SSS chạy cả 2 đặc kỹ của 2 giáp gốc.
//  • Hợp thể: 2 món CÙNG LOẠI, cả hai ≥ +1, theo vòng dây chuyền (18 công thức) → 1 trang bị SSS; món gốc được giữ lại.
//    Cường hóa SSS = 2 × min(cường hóa 2 món gốc), tối đa +10 (giống quy tắc chiến cơ SSS).
//  • Lưu riêng ở 'saobang-gear-sss-v1' → save cũ không đổi.
const Gear44=(()=>{
 const KEY='saobang-gear-sss-v1',TAU=Math.PI*2,KINDS=['armor','missiles','sidearm'],KN={armor:'Giáp',missiles:'Tên lửa',sidearm:'Vũ khí phụ'};
 const D=GEAR_FX.data,BY=GEAR_FX.byId,SSS=D.filter(d=>d.tier==='sss');
 const quiet=()=>{try{return VisualFX.reduced();}catch{return false;}};
 // ================= tranh (giải mã lười, chỉ khi cần) =================
 const IMG={};const assets=new Proxy({},{get:(_,k)=>{if(typeof k!=='string')return undefined;if(IMG[k])return IMG[k].complete&&IMG[k].naturalWidth?IMG[k]:undefined;const src=GEAR44_ASSETS[k];if(!src)return undefined;const im=new Image();im.decoding='async';im.src=src;IMG[k]=im;return undefined;}});
 const glows={};for(const d of D)for(const col of [d.color,d.second])if(col&&!glows[col]){const c=document.createElement('canvas');c.width=c.height=96;const g=c.getContext('2d'),r=g.createRadialGradient(48,48,0,48,48,47);r.addColorStop(0,col+'cc');r.addColorStop(.4,col+'66');r.addColorStop(1,col+'00');g.fillStyle=r;g.fillRect(0,0,96,96);glows[col]=c;}
 function warm(id){const d=BY[id];if(!d)return;const ids=d.parents||[id];const keys=[];for(const b of ids)for(const s of ['_projectile_normal','_projectile_super','_impact_normal','_impact_super','_muzzle','_trail','_beam_normal','_beam_super','_pod_normal','_pod_super','_shell_idle','_shell_proc'])keys.push(b+s);if(d.tier==='sss')for(const s of ['_pod_normal','_pod_super','_shell_idle','_shell_max','_shell_proc','_ult_a','_ult_b'])keys.push(id+s);keys.push('orbital_satellite');for(const k of keys)void assets[k];}
 // ================= V156 · PHẦN E (Gemini GEMINI_HOP_THE_E_CHOT_JSON) =================
 //  24 công thức phủ 13 bộ · điều kiện 2 món mẹ ≥ Tím +1 · món mẹ giữ lại · mở Lv1 + nâng Lv2–5 bằng nguyên liệu Tím / Tinh Hạch / hợp kim
 //  Cường hóa SSS = 2 × min(n của "Tím +n" hai món mẹ), tối đa +10 · chọn SSS xuất chiến cho từng món mẹ (bind)
 //  Lưu ở khóa MỚI saobang-gear-sss-v2; khóa v1 giữ nguyên, chỉ đọc 1 lần để chuyển.
 const EJ=(typeof SSS_E!=='undefined'&&SSS_E)||{sss_equipment:[]},KEY2='saobang-gear-sss-v2';
 const DEF2={};EJ.sss_equipment.forEach((x,i)=>{const fx=BY[x.id];DEF2[x.id]={id:x.id,kind:x.kind,tier:'sss',group:x.group|0,ord:i,parents:x.parents.slice(),name:x.name,color:(x.art&&x.art.color)||(fx&&fx.color)||'#ffd56a',second:fx&&fx.second,ring:fx?fx.ring:undefined,fx:!!fx,steps:x.cost.lvSteps,trait:x.trait,skill:x.skill,super:x.super,ult:x.ult,traits:[{name:x.trait.name}],flavor:''};});
 // V309 Lượt 4 (chủ dự án 21/11): 21 món SSS = 6 cặp 1–1 (món 1+2 … 11+12) + 1 món Độc Tôn tự thức tỉnh từ món 13 mỗi loại. Tắt: window.SSS4309=false (đặt trước khi tải)
 const L4REM=['sss_chrono_monarch_a','sss_chrono_monarch_m','sss_chrono_monarch_s','sss_monarch_aegis','sss_monarch_inferno','sss_monarch_rail'];
 const L4COST={};for(const id of L4REM)if(DEF2[id])L4COST[id]=DEF2[id].steps;
 if(window.SSS4309!==false){for(const id of ['sss_chrono_monarch_a','sss_chrono_monarch_m','sss_chrono_monarch_s'])delete DEF2[id];
  const SOLO={sss_monarch_aegis:['monarch12_a','Hoàng Đế Bất Hoại'],sss_monarch_inferno:['monarch12_m','Trảm Không Đế Vương'],sss_monarch_rail:['monarch12_s','Ấn Triện Đế Vương']};
  for(const k in SOLO)if(DEF2[k]){DEF2[k].parents=[SOLO[k][0],SOLO[k][0]];DEF2[k].name=SOLO[k][1];DEF2[k].solo=1;try{if(BY[k])BY[k].name=SOLO[k][1];}catch{}}}
 const SSS2=Object.values(DEF2),def=id=>DEF2[id]||BY[id]||null;
 const MATN=id=>{try{return V70.matName(id);}catch{return id;}};
 const nameOf=v=>{try{return (BY[v]&&BY[v].name)||GearCatalog[v].name;}catch{return v;}};
 let S=load();
 function load(){try{const o=JSON.parse(localStorage.getItem(KEY2)||'null');if(o&&o.v===2)return l4mig({v:2,owned:o.owned||{},bind:o.bind||{},wk:o.wk||{w:0,n:0},pay:o.pay||null,l4:o.l4||0});}catch{}
  // chuyển từ v1: 9 món còn trong danh sách → giữ (Lv1); 9 món bị bỏ → tặng 1 SSS chung món mẹ chưa có; hết chỗ thì hoàn chi phí mở
  const n={v:2,owned:{},bind:{},wk:{w:0,n:0},pay:null};let o=null;try{o=JSON.parse(localStorage.getItem(KEY)||'null');}catch{}
  if(o&&o.owned){const old=Object.keys(o.owned),pay={cr:0,m:{}};for(const id of old)if(DEF2[id])n.owned[id]={lv:1,at:Date.now(),from:'v1'};
   for(const id of old){if(DEF2[id])continue;const ps=(BY[id]&&BY[id].parents)||[];const c=SSS2.filter(d=>!n.owned[d.id]&&d.parents.some(p=>ps.includes(p))).sort((a,b)=>a.group-b.group)[0];
    if(c)n.owned[c.id]={lv:1,at:Date.now(),from:id};else{const st=SSS2.find(d=>d.parents.some(p=>ps.includes(p)))||SSS2[0];if(st){const c0=st.steps[0];pay.cr+=c0.credits|0;for(const [k,v] of Object.entries(c0.mats||{}))pay.m[k]=(pay.m[k]|0)+v;}}}
   for(const k of KINDS){const e=o.equip&&o.equip[k];if(!e)continue;const id=DEF2[e]?e:Object.keys(n.owned).find(x=>n.owned[x].from===e);if(id)for(const p of DEF2[id].parents)n.bind[p]=id;}
   if(pay.cr||Object.keys(pay.m).length)n.pay=pay;}
  n.l4=1;try{localStorage.setItem(KEY2,JSON.stringify(n));}catch{}return n;}
 // V309 Lượt 4: 6 món SSS bị bỏ / đổi công thức → hoàn chi phí mở + nâng cấp đã tốn (qua S.pay → payBack), gỡ món (chủ dự án chọn "hoàn nguyên liệu, bỏ món")
 function l4mig(n){if(n.l4||window.SSS4309===false)return n;const pay=n.pay||{cr:0,m:{}};let any=false;
  for(const id of L4REM){const o=n.owned[id];if(!o)continue;const st=L4COST[id]||[];const lv=Math.max(1,o.lv|0);for(let k=0;k<lv&&k<st.length;k++){const c=st[k]||{};pay.cr+=c.credits|0;for(const [m,v] of Object.entries(c.mats||{}))pay.m[m]=(pay.m[m]|0)+v;if(c.sss_core)pay.m.sss_core=(pay.m.sss_core|0)+c.sss_core;}delete n.owned[id];any=true;}
  for(const b of Object.keys(n.bind))if(L4REM.includes(n.bind[b]))delete n.bind[b];
  if(any)n.pay=pay;n.l4=1;try{localStorage.setItem(KEY2,JSON.stringify(n));}catch{}return n;}
 function save(){try{localStorage.setItem(KEY2,JSON.stringify(S));}catch{}}
 function payBack(){if(!S.pay)return;try{if(typeof V70==='undefined'||!Progress.grantCredits)return;for(const [k,v] of Object.entries(S.pay.m))V70.add(k,v);if(S.pay.cr)Progress.grantCredits(S.pay.cr);S.pay=null;save();}catch{}}
 const items=()=>{try{return Progress.getState().items||[];}catch{return [];}};
 const equippedItem=k=>{try{const P=Progress.getState();return P.items.find(x=>x.id===P.equipped[k])||null;}catch{return null;}};
 const nOf=i=>{try{return V70.nOf(i)|0;}catch{return Math.round(2.2*(i.enhance|0));}};
 const bestOf=base=>items().filter(i=>i.variant===base).sort((a,b)=>nOf(b)-nOf(a)||b.level-a.level)[0]||null;
 const tierN=base=>{const i=bestOf(base);return i?nOf(i):-1;};          // nấc 0–11 (Tím +1 = 7)
 const plusOf=base=>Math.max(0,tierN(base)-6);                          // n của "Tím +n"
 const enhOf=base=>{const i=bestOf(base);return i?(i.enhance||0):-1;};
 const owns=id=>!!S.owned[id];
 const lvOf=id=>S.owned[id]?Math.max(1,Math.min(5,S.owned[id].lv|0)):0;
 const TNAME=n=>{try{return TIER70.name[n]||'';}catch{return '';}};
 const haveM=k=>{try{return V70.have(k)|0;}catch{return 0;}};
 function costOk(st){const L=[];if(!st)return ['max'];for(const [k,v] of Object.entries(st.mats||{}))if(haveM(k)<v)L.push(MATN(k)+' '+haveM(k)+'/'+v);if(st.sss_core&&haveM('sss_core')<st.sss_core)L.push('Tinh Hạch '+haveM('sss_core')+'/'+st.sss_core);try{if(Progress.balance()<st.credits)L.push('hợp kim');}catch{}return L;}
 function pay(st){if(costOk(st).length)return false;if(st.credits&&!Progress.spendCredits(st.credits))return false;for(const [k,v] of Object.entries(st.mats||{}))V70.add(k,-v);if(st.sss_core)V70.add('sss_core',-st.sss_core);return true;}
 function canFuse(id){const d=DEF2[id];if(!d)return {ok:false,why:'Không phải công thức'};const [a,b]=d.parents,ta=tierN(a),tb=tierN(b);if(ta<0||tb<0)return {ok:false,why:'Thiếu '+nameOf(ta<0?a:b)};if(ta<7||tb<7)return {ok:false,why:d.solo?'Cần món ≥ Tím +1':'Cần cả hai món ≥ Tím +1'};const L=costOk(d.steps[0]);if(L.length)return {ok:false,why:'Thiếu '+L.slice(0,2).join(', ')};return {ok:true,why:''};}
 const sssEnh=id=>{const d=DEF2[id];if(!d)return 0;return Math.min(10,2*Math.min(...d.parents.map(plusOf)));};
 // SSS hoạt động khi đang lắp 1 trong 2 món mẹ; món mẹ dùng chung → theo lựa chọn (bind), mặc định Lv cao hơn rồi Nhóm cao hơn
 function sssFor(v,kind){const b=S.bind[v];if(b==='-')return null;if(b&&owns(b)&&DEF2[b]&&DEF2[b].kind===kind&&DEF2[b].parents.includes(v))return b;const L=SSS2.filter(d=>d.kind===kind&&owns(d.id)&&d.parents.includes(v)).sort((x,y)=>lvOf(y.id)-lvOf(x.id)||y.group-x.group);return L.length?L[0].id:null;}
 function activeId(kind){const it=equippedItem(kind);if(!it)return null;return sssFor(it.variant,kind)||it.variant;}
 const activeDef=kind=>{const id=activeId(kind);return id?def(id):null;};
 const sssM=kind=>{const d=activeDef(kind);return d&&d.tier==='sss'?1.35*(1+.03*sssEnh(d.id))*(typeof OC75!=='undefined'?OC75.mult(d.id):1)*(DEF2[d.id]&&window.SSSE_RED?SSSE_RED(kind,d.id):1):1;};/* V157: phần nội tại SSS (sss_e3.js) trừ khỏi đạn thường */
 const dmgMult=kind=>sssM(kind)*(typeof Evo53!=='undefined'&&Evo53.gearBonus?Evo53.gearBonus(kind):1);
 const busy=()=>['play','pause','reward'].includes(mode);
 function fuse(id){if(owns(id)||busy())return false;const c=canFuse(id);if(!c.ok){toastG(c.why);return false;}if(!pay(DEF2[id].steps[0]))return false;S.owned[id]={lv:1,at:Date.now()};save();try{Audio393.sfx('pickup');}catch{}rite(id);return true;}
 function upgrade(id){if(!owns(id)||busy())return false;const lv=lvOf(id);if(lv>=5)return false;const st=DEF2[id].steps[lv];const L=costOk(st);if(L.length){toastG('THIẾU: '+L.slice(0,3).join(', '));return false;}if(!pay(st))return false;S.owned[id].lv=lv+1;save();try{Audio393.sfx('pickup');}catch{}toastG(DEF2[id].name+' · Lv'+(lv+1));return true;}
 function equipSSS(kind,id){if(busy())return false;const it=equippedItem(kind);if(id===null){if(it)S.bind[it.variant]='-';save();try{gear=Progress.stats();}catch{}return true;}const d=DEF2[id];if(!d||d.kind!==kind||!owns(id))return false;for(const p of d.parents)S.bind[p]=id;if(!it||!d.parents.includes(it.variant)){const best=d.parents.map(bestOf).filter(Boolean).sort((a,b)=>nOf(b)-nOf(a)||b.level-a.level)[0];if(best)try{Progress.equip(best.id);}catch{}}save();try{gear=Progress.stats();}catch{}return true;}
 // Tinh Hạch Siêu Việt ↔ nguyên liệu Tím (items_fusion.sss_core_exchange)
 const XC=(EJ.items_fusion&&EJ.items_fusion.sss_core_exchange)||{purpleMatsToCore:{anyPurpleMatLv3Count:3,credits:2000,outputSssCore:1,weeklyLimit:15},coreToPurpleMat:{sssCoreCount:1,credits:500}};if(window.ECON203!==false)try{XC.purpleMatsToCore.weeklyLimit=25;}catch{}/* V203 · Gemini: 15 → 25 lượt/tuần */
 const week=()=>Math.floor((Date.now()/864e5+3)/7);
 const wkLeft=()=>{if(S.wk.w!==week())S.wk={w:week(),n:0};return Math.max(0,XC.purpleMatsToCore.weeklyLimit-S.wk.n);};
 const P3=()=>['alloy3','crystal3','circuit3','plasma3'];
 function toCore(){const R_=XC.purpleMatsToCore;if(wkLeft()<=0){toastG('HẾT LƯỢT ĐỔI TUẦN NÀY');return false;}const tot=P3().reduce((a,k)=>a+haveM(k),0);if(tot<R_.anyPurpleMatLv3Count){toastG('CẦN '+R_.anyPurpleMatLv3Count+' NGUYÊN LIỆU TÍM');return false;}if(Progress.balance()<R_.credits||!Progress.spendCredits(R_.credits)){toastG('THIẾU HỢP KIM');return false;}
  let k=R_.anyPurpleMatLv3Count;while(k>0){const m=P3().sort((a,b)=>haveM(b)-haveM(a))[0];V70.add(m,-1);k--;}V70.add('sss_core',R_.outputSssCore);S.wk.n++;save();return true;}
 function fromCore(m){const R_=XC.coreToPurpleMat;if(!P3().includes(m))return false;if(haveM('sss_core')<R_.sssCoreCount){toastG('THIẾU TINH HẠCH');return false;}if(Progress.balance()<R_.credits||!Progress.spendCredits(R_.credits)){toastG('THIẾU HỢP KIM');return false;}V70.add('sss_core',-R_.sssCoreCount);V70.add(m,1);return true;}
 // ================= trận đấu =================
 const R={};let loadKey='',demoTargets=null;
 // V158 · SSS có tranh GPT (GEAR44_ASSETS[<sss>_g_<tệp>]) → thay tranh đạn / nổ / chớp nòng / đuôi của MÓN MẸ đang chạy GEAR_FX
 const GSUF=['projectile_normal','projectile_super','impact_normal','impact_super','muzzle','trail','beam_normal','beam_super'];
 function sssArt(k,pid,base){const sid=activeId(k);if(!sid||!DEF2[sid]||window.SSSART===false)return base;if(!GSUF.some(x=>GEAR44_ASSETS[sid+'_g_'+x]))return base;
  return new Proxy({},{get:(_,key)=>{if(typeof key==='string'&&key.startsWith(pid+'_')){const suf=key.slice(pid.length+1);if(GSUF.includes(suf)&&GEAR44_ASSETS[sid+'_g_'+suf]){const v=assets[sid+'_g_'+suf];if(v)return v;}}return base[key];}});}
 function mkMirror(){return {slots:[],map:new Map()};}
 function build(){payBack();const key=KINDS.map(k=>activeId(k)+':'+(equippedItem(k)?.id||'')).join('|')+(window.SSSE_A?'A':'');if(key===loadKey)return;loadKey=key;for(const k of KINDS){let id=activeId(k);if(id&&(!BY[id]||(DEF2[id]&&window.SSSE3!==false))){const it=equippedItem(k);id=it&&BY[it.variant]?it.variant:null;}if(k==='armor'&&window.SSSE_A){delete R[k];continue;}/* V157: SSS chạy hiệu ứng món mẹ + sss_e3 *//* V156: SSS chưa có GEAR_FX riêng → chạy hiệu ứng món mẹ đang lắp (×1,35 nằm ở auxDamage) */if(!id||!BY[id]){delete R[k];continue;}const sid156=activeId(k);if(R[k]&&R[k].id===id&&R[k].sid===sid156)continue;warm(id);const st=GEAR_FX.create(id,{assets,glows,targets:[],player:{x:240,y:560,hp:1,maxHp:1},enhance:BY[id].tier==='sss'?sssEnh(id):5,demo:false,numbers:false,light:true,reduced:quiet(),shake:false});R[k]={id,sid:sid156,st,mir:mkMirror(),armorT:0,lastTimer:null,secondT:.5};}}
 const bridged=k=>!!R[k]&&(k!=='armor');
 function radius(e){return e===boss?70:e.large?40:e.elite?32:22;}
 function syncTargets(r){const st=r.st,m=r.mir;for(const s of m.slots){s.seen=false;}
  let list=[];if(window.HANGAR_DEMO||mode!=='play'){if(!demoTargets)demoTargets=[70,170,310,410].map(x=>({obj:null,x,y:-60}));list=demoTargets;}
  else{for(const e of enemies)if(!e.dead&&!e.rescue28&&e.y>-30&&e.y<H)list.push({obj:e});if(boss&&!boss.dead)list.push({obj:boss});}
  for(const it of list){let s=it.obj?m.map.get(it.obj):m.map.get(it);if(!s){s=m.slots.find(z=>!z.obj&&!z.key&&z.hp<=0)||null;if(!s){if(m.slots.length>=40)continue;s={};m.slots.push(s);}s.obj=it.obj;s.key=it.obj?null:it;m.map.set(it.obj||it,s);}
   const src=it.obj||it;s.x=src.x;s.y=src.y;s.r=it.obj?radius(it.obj):24;s.boss=it.obj===boss;s.vx=0;s.hp=1e9;s.maxHp=1e9;s.seen=true;}
  for(const s of m.slots)if(!s.seen){if(s.obj||s.key)m.map.delete(s.obj||s.key);s.obj=null;s.key=null;s.hp=0;s.dead=1;}
  st.targets=m.slots;return list.length>0;}
 function refDPS(k){const i=(gear.equipment||[]).find(x=>x.kind===k);if(!i||!i.interval)return 0;const pu=powerUpgrades||0,dmg=1+pu*.12,rate=1+pu*.1,extra=Math.floor(pu/2);return i.auxDamage*(((i.spec&&i.spec.count)||1)+extra)*dmg*rate*(gear.damage||1)*BALANCE.allyStats/i.interval*dmgMult(k)/sssM(k);}/* V156: phần ×SSS đã nằm sẵn trong auxDamage */
 function nominal(r){const d=r.st.def,st=GEAR_FX.stats(d,r.st.enhance);return Math.max(1e-6,st.main*(d.combat?.damageScale||0));}
 function hurt(e,d){if(!e||e.dead||!(d>0))return;let amount=d*BALANCE.allyDamage*Combat.factor();try{if(window.KN146API)amount*=KN146API.vul(e);}catch{}if(e===boss||e.bossPart){damageBoss(amount,'gear',e);return;}e.hp-=amount;try{Feedback31.damage(e,amount,{gearKind:'auxiliary'});}catch{}if(e.hp<=0)kill(e);}
 function setMode(r,m){const st=r.st;if(st.mode===m)return;GEAR_FX.setMode(st,m,m==='normal'||m==='super');}
 function modeTick(r){const st=r.st,d=st.def,sup=superTime>0;if(st.mode==='ult'){if(st.age>=(d.ult?.duration||3)){setMode(r,sup?'super':'normal');}else if(st.age>=.55&&!r.cleared){r.cleared=true;if(mode==='play'){bullets=[];beams=[];invuln=Math.max(invuln,.6);}}return;}
  if(st.mode==='skill'){if(st.age>=(d.skill?.duration||2))setMode(r,sup?'super':'normal');return;}setMode(r,sup?'super':'normal');}
 function shellProc(r){const st=r.st;for(const p of st.pool){if(p.on)continue;Object.assign(p,{on:true,type:'shellproc',id:st.id,x:st.player.x,y:st.player.y,life:.75,full:.75,age:0,variant:st.mode==='normal'?'normal':'super'});break;}}
 function tick(dt){if(mode!=='play'&&!window.HANGAR_DEMO)return;build();
  for(const k of KINDS){const r=R[k];if(!r)continue;const st=r.st;st.player.x=player.x;st.player.y=player.y;st.reduced=quiet();modeTick(r);
   if(k==='armor'){// đặc kỹ giáp: phát hiện lúc Equipment25 kích hoạt → hoạt ảnh vòm; giáp SSS chạy thêm đặc kỹ thứ hai
    const ai=gear.armorItem;try{const t=Equipment25.getState().timers[ai?.id];if(r.lastTimer!==null&&t>r.lastTimer+.05)shellProc(r);r.lastTimer=t??null;}catch{}
    if(st.def.parents&&ai&&mode==='play'){const other=st.def.parents.find(p=>p!==ai.variant);if(other&&other!=='reactive'){r.secondT-=dt;if(r.secondT<=0){r.secondT=(ai.spec?.cd||6)/BALANCE.allyStats;try{Equipment25.armorSkill({...ai,variant:other});shellProc(r);}catch{}}}}
    GEAR_FX.update(st,dt,st.mode);continue;}
   {const it=(gear.equipment||[]).find(x=>x.kind===k);let rk=0;try{rk=it.spec.rank|0;}catch{}st.lv146=Math.max(1,Math.min(5,rk+1));}/* V147: cấp nội tại theo bậc món */const alive=syncTargets(r);if(!alive){st.fire=0;for(const p of st.pool)if(p.on&&(p.type==='shot'||p.type==='beamShot'))p.on=false;}
   GEAR_FX.update(st,dt,st.mode);
   if(mode==='play'){const kk=refDPS(k)/nominal(r);st.kk146=kk;for(const s of r.mir.slots){if(!s.obj)continue;const d=1e9-s.hp;if(d>0&&s.hp>0)hurt(s.obj,d*kk);s.hp=1e9;}}}}
 // ================= gắn vào game =================
 function install(){
  const ou=Equipment25.update;Equipment25.update=function(dt){const all=gear.equipment;if(all)gear.equipment=all.filter(i=>!bridged(i.kind));try{return ou.apply(this,arguments);}finally{gear.equipment=all;try{tick(dt);}catch(e){}}};
  const od=Equipment25.draw;Equipment25.draw=function(){const all=gear.equipment;if(all)gear.equipment=all.filter(i=>!R[i.kind]);try{od.apply(this,arguments);}finally{gear.equipment=all;}if(mode==='over')return;try{if(R.armor&&!(window.TB309&&TB309.on()&&window.TB309SH!==false))GEAR_FX.draw(ctx,R.armor.st,'armor');if(R.missiles&&window.MIS139===false)GEAR_FX.draw(ctx,R.missiles.st,'hardware');/* V139: ẩn bệ tên lửa trong trận */if(R.sidearm&&window.SIDE138!==false)side138();for(const k of ['missiles','sidearm'])if(R[k]){GEAR_FX.draw(ctx,R[k].st,'projectiles');GEAR_FX.draw(ctx,R[k].st,'hits');}if(R.armor)GEAR_FX.draw(ctx,R.armor.st,'hits');}catch(e){}};
  const os=Equipment25.supportSprite;Equipment25.supportSprite=function(g,x,y,size){const r=R.sidearm;if(!r)return os.apply(this,arguments);const st=r.st,sup=st.mode!=='normal',key=(st.def.tier==='sss'?st.id:st.id)+'_pod_'+(sup?'super':'normal'),im=assets[key];if(!im)return os.apply(this,arguments);const w=sup?Math.max(size,64):Math.max(size,40);g.save();if(sup&&glows[st.def.color]){g.globalCompositeOperation='lighter';g.globalAlpha=.45;g.drawImage(glows[st.def.color],x-w,y-w,w*2,w*2);g.globalCompositeOperation='source-over';g.globalAlpha=1;}g.drawImage(im,x-w/2,y-w/2,w,w);g.restore();};
  // V74 · GPT 15c: bệ tên lửa / tàu con riêng cho bộ 7–9 (…36). Chỉ thay phần VẼ; chiến đấu của bộ 36 vẫn theo đường cũ (Equipment25).
  const is36=i=>i&&i.kind!=='armor'&&/(36|9|1[0-2]_[ms])$/.test(i.variant||'');
  const sup36=()=>{try{return superTime>0;}catch{return false;}};
  // V75 · GPT 15d-2: bệ tiến hóa cho bộ 36 (+3 → evo1, +5 → evo2; chỉ dạng thường, dạng siêu cấp giữ tranh super)
  const EI36={};const evoIm=k=>{if(!(k in EI36)){let u=null;try{u=EVO53_ART[k];}catch{}EI36[k]=u?Object.assign(new Image(),{src:u}):null;}const m=EI36[k];return m&&m.complete&&m.naturalWidth?m:null;};
  const ev36=i=>{let e=0;try{e=typeof V70EF==='function'?V70EF(i):(i.enhance|0);}catch{e=i.enhance|0;}return e>=5?2:e>=3?1:0;};
  const pod36=i=>{const sp=sup36();try{const sid=activeId('sidearm');if(i.kind==='sidearm'&&DEF2[sid]&&GEAR44_ASSETS[sid+'_g_pod1']&&window.SSSART!==false){const lv=lvOf(sid),f=sp?4:lv>=5?3:lv>=3?2:1;const m=assets[sid+'_g_pod'+f];if(m)return m;}}catch{}/* V159: tàu con SSS theo Lv (dạng 1: Lv1–2 · 2: Lv3–4 · 3: Lv5 · Bạo Tẩu) */if(!sp&&window.EVO36!==false){for(let s=ev36(i);s>=1;s--){const m=evoIm('g:'+i.variant+'_pod_normal_evo'+s);if(m)return m;}}return assets[i.variant+'_pod_'+(sp?'super':'normal')]||assets[i.variant+'_pod_normal'];};
  window._pod36=pod36;
  // V138 · vẽ thân vũ khí phụ (tàu con) tại 2 vị trí Battle28.support() — nơi đạn vũ khí phụ bắn ra.
  //  Trước V138: món đã chuyển sang GEAR_FX bị lọc khỏi Equipment25.draw, mà GEAR_FX chỉ vẽ 'hardware' cho tên lửa → thân vũ khí phụ không hiện. Tắt: window.SIDE138=false
  function side138(){const i=(gear.equipment||[]).find(x=>x.kind==='sidearm');if(!i)return;const im=pod36(i);if(!im)return;const sp=sup36(),w=sp?56:40;let P=[];try{P=Battle28.support();}catch{}if(!P||!P.length)return;
   for(const p of P){try{window.EqGlow264&&EqGlow264.under(ctx,i,p,w)}catch{}try{if(window.TB309&&TB309.on()&&TB309.pod(ctx,i,p,sp))continue;}catch{}/* V264 trang bị tỏa màu riêng lúc Bạo Tẩu */ctx.save();if(sp&&glows[i.spec?.color]){ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.42;ctx.drawImage(glows[i.spec.color],p.x-w,p.y-w,w*2,w*2);ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;}ctx.drawImage(im,p.x-w/2,p.y-w/2,w,w);ctx.restore();}}
  function draw36(i){const im=pod36(i);if(!im)return;const sp=sup36();
   if(i.kind==='missiles'){if(window.MIS139!==false)return;for(const side of [-1,1]){const x=player.x+side*58,y=player.y+16;if(sp&&glows[i.spec?.color]){ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.42;ctx.drawImage(glows[i.spec.color],x-40,y-40,80,80);ctx.restore();}ctx.drawImage(im,x-20,y-28,40,56);}}
   else{const tt=typeof time==='number'?time:0,P=[-1,1].map(sd=>({x:player.x+sd*78,y:player.y+Math.sin(tt*2+sd)*4})),w=sp?64:40;for(const p of P){try{window.EqGlow264&&EqGlow264.under(ctx,i,p,w)}catch{}try{if(window.TB309&&TB309.on()&&TB309.pod(ctx,i,p,sp))continue;}catch{}ctx.save();if(sp&&glows[i.spec?.color]){ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.45;ctx.drawImage(glows[i.spec.color],p.x-w,p.y-w,w*2,w*2);ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;}ctx.drawImage(im,p.x-w/2,p.y-w/2,w,w);ctx.restore();}}}
  const od36=Equipment25.draw;Equipment25.draw=function(){const all=gear.equipment;let L=[];if(all&&window.POD36!==false){L=all.filter(i=>!R[i.kind]&&is36(i)&&pod36(i));if(L.length)gear.equipment=all.filter(i=>!L.includes(i));}try{return od36.apply(this,arguments);}finally{gear.equipment=all;if(mode!=='over')for(const i of L){try{draw36(i);}catch(e){}}}};
  const ob=Equipment25.barrage;Equipment25.barrage=function(){const r=R.missiles;if(!r)return ob.apply(this,arguments);if(mode!=='play'||r.st.cooldowns.skill>0)return false;setMode(r,'skill');try{Rank36.shock();}catch{}return true;};
  const oc=Equipment25.cooldown;Equipment25.cooldown=function(){const r=R.missiles;return r?r.st.cooldowns.skill:oc.apply(this,arguments);};
  const oo=Equipment25.onDamage;Equipment25.onDamage=function(){const r=R.armor;if(r)shellProc(r);if(r&&r.st.def.parents&&r.st.def.parents.includes('reactive')&&gear.armorItem&&gear.armorItem.variant!=='reactive'){const a=gear.armorItem;gear.armorItem={...a,variant:'reactive'};try{return oo.apply(this,arguments);}finally{gear.armorItem=a;}}return oo.apply(this,arguments);};
  const or=Equipment25.reset;Equipment25.reset=function(){loadKey='';for(const k in R)delete R[k];return or.apply(this,arguments);};
  const oa=Rank36.activate;Rank36.activate=function(){const ok=oa.apply(this,arguments);if(ok)for(const k of ['missiles','sidearm']){const r=R[k];if(r&&r.st.cooldowns.skill<=0)setMode(r,'skill');}return ok;};
  const ow=window.activateSuper;if(typeof activateSuper==='function'){activateSuper=function(){const v=ow.apply(this,arguments);for(const k of ['missiles','sidearm','armor']){const r=R[k];if(r&&r.st.def.tier==='sss'&&r.st.def.ult&&r.st.cooldowns.ult<=0){r.cleared=false;GEAR_FX.setMode(r.st,'ult');break;}}return v;};}
  const ov=VisualFX.draw;VisualFX.draw=function(){const v=ov.apply(this,arguments);try{for(const k of KINDS){const r=R[k];if(r&&r.st.mode==='ult')GEAR_FX.draw(ctx,r.st,'ult');}}catch{}return v;};
  // V45 · giáp SSS: phần máu + khiên do giáp gốc mang lại ×1,35×(1+3%/cấp cường hóa SSS) — giống game gốc ("gốc + 35%")
  const ops=Progress.stats;Progress.stats=function(){const o=ops.apply(this,arguments);try{for(const e of (o&&o.equipment)||[]){if(e.kind==='armor')continue;const m=sssM(e.kind);if(m>1&&e.auxDamage){e.auxDamage*=m;e.sss156=m;}}}catch{}try{const a=o&&o.armorItem,m=dmgMult('armor');if(a&&m>1){const dh=(+a.hp||0)*(m-1),da=(+a.armor||0)*(m-1);o.hp+=dh;o.maxShield+=da;o.startShield+=da;o.armorSSS=m;}}catch{}return o;};
  // icon riêng cho từng mẫu trang bị
  const oart=Progress.art;Progress.art=function(i,extra=''){const h=oart.apply(this,arguments);return i&&BY[i.variant]?h.replace('class="gear25-art','class="gear25-art g44-ic g44-'+i.variant):h;};
  const css=document.createElement('style');css.id='g44-icons';css.textContent=D.filter(d=>d.tier==='base').map(d=>`.gear25-art.g44-${d.id}{background-image:url(${GEAR44_ASSETS[d.id+'_icon']})!important;background-size:82% auto!important;background-position:50% 42%!important;background-repeat:no-repeat!important}`).join('');document.head.appendChild(css);
 }
 // ================= XƯỞNG TRANG BỊ SSS (giao diện) · V156 Phần E =================
 let root=null,tabK='armor',sel=null,rv=null,fpos='armor';
 const GN=['','I','II','III'],TABS=[...KINDS,'items'],TN={...KN,items:'Vật phẩm'};
 const esc=t=>String(t==null?'':t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const fmtN=n=>{try{return Math.round(n).toLocaleString('vi-VN');}catch{return String(n);}};
 function atlasCell(d,row,size){const k='atlas_'+d.kind,src=GEAR44_ASSETS[k];return `<span class="g44-cell" style="--sz:${size}px;background-image:url(${src});background-position:${d.ring*20}% ${row*100}%"></span>`;}
 const iconOf=id=>{const u=GEAR44_ASSETS[id+'_icon'];return u?`<img class="g44-ico" alt="" src="${u}">`:`<span class="g44-ico g44-no"></span>`;};
 // tranh SSS: tranh GPT (khi có) → ô atlas cũ → tạm ghép 2 icon món mẹ
 function pic(d,size,row=0){{const e=d&&/^sss_/.test(d.id||'')&&window.Evo21&&Evo21.sssIcon?Evo21.sssIcon(d.id):null;if(e)return `<img class="g44-ico e21i" style="width:${size}px;height:${size}px;object-fit:contain" alt="" src="${e}">`;}/* V2.1 Đợt 3b: icon SSS theo mốc +0/+3/+10 */const u=GEAR44_ASSETS[d.id+'_icon'+(row?3:1)];if(u)return `<img class="g44-ico" style="width:${size}px;height:${size}px" alt="" src="${u}">`;if(d.ring!=null&&GEAR44_ASSETS['atlas_'+d.kind])return atlasCell(d,row,size);
  const a=GEAR44_ASSETS[d.parents[0]+'_icon'],b=GEAR44_ASSETS[d.parents[1]+'_icon'];return `<span class="g44-pair" style="--sz:${size}px;--c:${d.color}">${a?`<img alt="" src="${a}">`:''}${b?`<img alt="" src="${b}">`:''}</span>`;}
 function buildUI(){root=document.createElement('section');root.id='g44';root.hidden=true;root.setAttribute('role','dialog');root.setAttribute('aria-label','Xưởng trang bị SSS');
  root.innerHTML=`<div class="g44-box"><header><h2>XƯỞNG TRANG BỊ SSS</h2><small>2 món mẹ cùng loại đạt Tím +1 · món mẹ được giữ lại</small><button class="g44-x" data-g="close" aria-label="Đóng">✕</button></header>
  <nav class="g44-nav4">${TABS.map(k=>`<button data-tab="${k}">${TN[k]}</button>`).join('')}</nav><div class="g44-list" id="g44-list"></div><div class="g44-det" id="g44-det"></div></div><canvas class="g44-rite" hidden></canvas>`;
  document.body.appendChild(root);rv=root.querySelector('.g44-rite');
  root.addEventListener('click',e=>{const t=e.target.closest('[data-tab]');if(t){tabK=t.dataset.tab;sel=null;render();return;}const c=e.target.closest('[data-pick]');if(c){sel=c.dataset.pick;render();return;}const b=e.target.closest('[data-g]');if(!b)return;const g=b.dataset.g,id=b.dataset.id;
   if(g==='close')close();else if(g==='fuse'){if(fuse(id))render();}else if(g==='up'){if(upgrade(id))render();}else if(g==='equip'){if(equipSSS(DEF2[id].kind,id))toastG('Xuất chiến: '+DEF2[id].name);render();}else if(g==='unequip'){equipSSS(DEF2[id].kind,null);render();}
   else if(g==='core'){if(toCore())toastG('+1 Tinh Hạch Siêu Việt');render();}else if(g==='mat'){if(fromCore(id))toastG('+1 '+MATN(id));render();}
   else if(g==='smerge'){let n=0;try{n=Stone71.mergeAll(null);}catch{}toastG(n?'Ghép đá · '+n+' lượt':'Chưa đủ đá hoặc hợp kim');render();}
   else if(g==='fpos'){fpos=id;render();}else if(g==='forge'){const [ty,m]=id.split('|');let s=null;try{s=Stone71.forgeX(fpos,ty,m);}catch{}if(s)toastG('Rèn xong · '+Stone71.label(s));render();}
   else if(g==='upx'){let s=null;try{s=Stone71.upX(id);}catch{}if(s)toastG('Nâng Cam · '+Stone71.label(s));render();}});
  root.addEventListener('keydown',e=>{if(e.key==='Escape')close();});}
 function toastG(t){try{toast(t);}catch{}}
 const costTxt=st=>st?[...Object.entries(st.mats||{}).map(([k,v])=>`${MATN(k)} ${haveM(k)}/${v}`),st.sss_core?`Tinh Hạch ${haveM('sss_core')}/${st.sss_core}`:'',fmtN(st.credits)+' ◈'].filter(Boolean).join(' · '):'';
 const pTag=p=>{const n=tierN(p);return n<0?'<u>chưa có</u>':`<span style="color:${n>=7?'#46ffb2':'#fca5a5'}">${TNAME(n)}</span>`;};
 function render(){if(!root)return;for(const b of root.querySelectorAll('[data-tab]'))b.setAttribute('aria-pressed',String(b.dataset.tab===tabK));
  if(tabK==='items')return renderItems();
  const list=SSS2.filter(d=>d.kind===tabK).sort((a,b)=>a.group-b.group||a.ord-b.ord),it=equippedItem(tabK),cur=activeId(tabK);
  if(!sel||!DEF2[sel]||DEF2[sel].kind!==tabK)sel=(list.find(d=>d.id===cur)||list[0]).id;
  root.querySelector('#g44-list').innerHTML=list.map(d=>{const c=canFuse(d.id),own=owns(d.id),on=cur===d.id;return `<button class="g44-r ${own?'own':''} ${on?'on':''} ${d.id===sel?'sel':''}" data-pick="${d.id}">${iconOf(d.parents[0])}${d.solo?'<i>✦</i><small class="g44-solo">TỰ THỨC TỈNH</small>':'<i>+</i>'+iconOf(d.parents[1])}<i>→</i>${pic(d,46)}<span><b>${esc(d.name)}</b><small>Nhóm ${GN[d.group]} · ${own?(on?'ĐANG XUẤT CHIẾN · ':'')+'Lv'+lvOf(d.id)+'/5 · +'+sssEnh(d.id):c.ok?'Sẵn sàng hợp thể':esc(c.why)}</small></span></button>`;}).join('');
  const d=DEF2[sel],c=canFuse(d.id),own=owns(d.id),lv=lvOf(d.id),on=cur===d.id,tl=d.trait.lv,shown=tl[Math.max(0,lv-1)],nx=lv&&lv<5?tl[lv]:null;
  const shared=d.parents.filter(p=>SSS2.some(x=>x!==d&&x.parents.includes(p)));
  let act='';if(!own)act=`<button class="main" data-g="fuse" data-id="${d.id}" ${c.ok?'':'disabled'}>${c.ok?'HỢP THỂ · '+esc(costTxt(d.steps[0])):esc(c.why)}</button>`;
  else{act=(lv<5?`<button class="main" data-g="up" data-id="${d.id}" ${costOk(d.steps[lv]).length?'disabled':''}>NÂNG Lv${lv+1} · ${esc(costTxt(d.steps[lv]))}</button>`:'<p class="g44-st">Đã đạt Lv5</p>')+(on?`<button data-g="unequip" data-id="${d.id}">GỠ SSS (dùng món mẹ thường)</button>`:`<button data-g="equip" data-id="${d.id}">CHỌN XUẤT CHIẾN</button>`);}
  root.querySelector('#g44-det').innerHTML=`${(()=>{const e=window.Evo21&&Evo21.sssIcon&&Evo21.sssIcon(d.id,0);if(!e)return `<div class="g44-art">${pic(d,96,0)}${pic(d,96,1)}</div>`;const ct=Evo21.sssT(d.id);return `<div class="g44-art e21a"><canvas class="e21pv" data-id="${d.id}" data-c="${d.color}"></canvas><div class="e21t">${[0,1,2].map(t=>`<span class="${t===ct?'on':''}"><img alt="" src="${Evo21.sssIcon(d.id,t)}"><b>${['+0','+3','+10'][t]}</b></span>`).join('')}</div></div>`;})()}<div class="g44-txt"><h3 style="color:${d.color}">${esc(d.name)} <em>SSS · Nhóm ${GN[d.group]}</em></h3>
   <p>Món mẹ: <b>${esc(nameOf(d.parents[0]))}</b> ${pTag(d.parents[0])}${d.solo?' · <b>tự thức tỉnh</b> (chỉ cần 1 món ≥ Tím +1)':` + <b>${esc(nameOf(d.parents[1]))}</b> ${pTag(d.parents[1])}`}</p>
   ${window.DET197!==false?`<div class="g44-act">${act}</div><div class="k197"><div><i>Nội tại</i><b>${esc(d.trait.name)}</b><small>Lv${lv||1}/5</small></div><div><i>Kỹ năng</i><b>${esc(d.skill.name)}</b><small>${d.skill.cooldown}s</small></div><div><i>Bạo Tẩu</i><b>${esc(d.super.name)}</b></div><div><i>Tuyệt kỹ</i><b>${esc(d.ult.name)}</b></div></div>${typeof TapBan200!=='undefined'&&TapBan200.on()?TapBan200.btn:''}<details class="d197"><summary>Chi tiết</summary>`:''}
   <p class="g44-tr">Nội tại · <b>${esc(d.trait.name)}</b>${lv?' (Lv'+lv+')':' (Lv1)'}: ${esc(shown.desc)}</p>${nx?`<p class="g44-fl">Lv${lv+1}: ${esc(nx.desc)}</p>`:''}
   <p>Kỹ năng · <b>${esc(d.skill.name)}</b> (${d.skill.cooldown}s): ${esc(d.skill.effect)}</p><p>Bạo Tẩu · <b>${esc(d.super.name)}</b>: ${esc(d.super.effect)}</p><p>Tuyệt kỹ · <b>${esc(d.ult.name)}</b>: ${esc(d.ult.effect)}</p>
   <p class="g44-st">${tabK==='armor'?'Máu + khiên của giáp':'Hỏa lực'} ×1,35 · thêm 3%/cấp cường hóa · Cường hóa = 2 × min(Tím +n hai món mẹ) = <b>+${sssEnh(d.id)}</b></p>
   ${shared.length?`<p class="g44-fl">${esc(shared.map(nameOf).join(', '))} còn ghép được SSS khác — chọn SSS nào xuất chiến cho món mẹ này.</p>`:''}
   ${it&&!d.parents.includes(it.variant)&&own?`<p class="g44-fl">Đang lắp ${esc(nameOf(it.variant))} — chọn xuất chiến sẽ tự lắp món mẹ tốt nhất.</p>`:''}
   <p class="g44-fl">${tabK==='armor'?'Nội tại hợp nhất thay nội tại 2 giáp mẹ. Kỹ năng tự kích khi bị dồn ép, Tuyệt kỹ mở đầu mỗi lần Bạo Tẩu.':'Đạn thường của món mẹ đang lắp + nội tại hợp nhất. Kỹ năng tự kích khi hồi xong, Tuyệt kỹ mở đầu mỗi lần Bạo Tẩu.'}</p>
   ${window.DET197!==false?'</details>':`<div class="g44-act">${act}</div>`}</div>`;}
 function renderItems(){const X=XC,wl=wkLeft(),core=haveM('sss_core'),P=P3();let stoneH='';
  let ok=false;try{ok=Stone71.unlocked();}catch{}
  if(!ok)stoneH='<p class="g44-fl">Đá khảm mở từ ải 70.</p>';else{const st=Stone71.state().st||[];const fr=t=>st.filter(s=>!s.on&&s.t===t).length;const C=Stone71.C;
   const need=Stone71.forgeNeed(),opts=Stone71.forgeOpts(fpos),ups=Stone71.upList();
   stoneH=`<p>Đá chưa khảm: ${C.tn.map((n,t)=>`<b style="color:${C.tc[t]}">${n} ${fr(t)}</b>`).join(' · ')}</p>
   <div class="g44-act"><button data-g="smerge">GHÉP TẤT CẢ ĐÁ (${C.merge.k} → 1 · ${C.merge.cr.map(fmtN).join(' / ')} ◈)</button></div>
   <h4>Rèn đá đặc biệt Tím</h4><p class="g44-fl">${C.forgeX.lam} đá Lam + ${C.forgeX.luc} đá Lục (thường, chưa khảm) + ${C.forgeX.core} Tinh Hạch + ${fmtN(C.forgeX.cr)} ◈ · có: Lam ${need.lam[0]} · Lục ${need.luc[0]} · Tinh Hạch ${need.core[0]}</p>
   <div class="g44-chips">${C.pos.map(p=>`<button data-g="fpos" data-id="${p}" aria-pressed="${p===fpos}">${C.pn[p]}</button>`).join('')}</div>
   <div class="g44-chips">${opts.map(o=>`<button data-g="forge" data-id="${o.ty}|${o.m}">${esc(o.label)}</button>`).join('')||'<small>Chưa có mẫu phù hợp ở vị trí này.</small>'}</div>
   <h4>Nâng đá đặc biệt Tím → Cam</h4><p class="g44-fl">1 đá đặc biệt Tím + ${C.upX.tim} đá Tím thường + ${C.upX.core} Tinh Hạch + ${fmtN(C.upX.cr)} ◈ (giữ nguyên hệ)</p>
   <div class="g44-chips">${ups.map(s=>`<button data-g="upx" data-id="${s.id}">${esc(Stone71.label(s))}</button>`).join('')||'<small>Chưa có đá đặc biệt Tím chưa khảm.</small>'}</div>`;}
  root.querySelector('#g44-list').innerHTML=`<div class="g44-it"><h4>Tinh Hạch Siêu Việt: <b>${core}</b></h4><p class="g44-fl">Đổi Tinh Hạch giới hạn ${X.purpleMatsToCore.weeklyLimit} lượt mỗi tuần · không tạo kim cương.</p>
   <div class="g44-act"><button class="main" data-g="core" ${wl>0?'':'disabled'}>${X.purpleMatsToCore.anyPurpleMatLv3Count} nguyên liệu Tím + ${fmtN(X.purpleMatsToCore.credits)} ◈ → 1 Tinh Hạch · còn ${wl}/${X.purpleMatsToCore.weeklyLimit} lượt tuần này</button></div>
   <p class="g44-fl">Nguyên liệu Tím đang có: ${P.map(k=>MATN(k)+' '+haveM(k)).join(' · ')} (lấy loại nhiều nhất trước)</p>
   <h4>Đổi 1 Tinh Hạch + ${fmtN(X.coreToPurpleMat.credits)} ◈ → 1 nguyên liệu Tím tự chọn</h4><div class="g44-chips">${P.map(k=>`<button data-g="mat" data-id="${k}">${esc(MATN(k))}</button>`).join('')}</div>
   ${stoneH}</div>`;
  root.querySelector('#g44-det').innerHTML='';}
 function open(kind){if(busy())return false;if(!root)buildUI();if(kind&&TABS.includes(kind))tabK=kind;sel=null;payBack();render();root.hidden=false;document.body.classList.add('g44-on');return true;}
 function close(){if(root){root.hidden=true;document.body.classList.remove('g44-on');}try{CCHT_LOBBY_API.refresh();}catch{}try{Hangar41.paint(true);}catch{}}
 // nghi thức hợp thể: 2 món gốc lao vào nhau → chớp → SSS
 function rite(id){if(!root)buildUI();const d=DEF2[id];const ld=u=>{const m=new Image();if(u)m.src=u;return m;};const pa=ld(GEAR44_ASSETS[d.parents[0]+'_icon']),pb=ld(GEAR44_ASSETS[d.parents[1]+'_icon']),ic=ld(GEAR44_ASSETS[d.id+'_icon1']),at=d.ring!=null?ld(GEAR44_ASSETS['atlas_'+d.kind]):null;rv.hidden=false;const t0=performance.now(),g=rv.getContext('2d');
  const okI=m=>m&&m.complete&&m.naturalWidth;
  const step=()=>{const t=(performance.now()-t0)/1000,r=rv.getBoundingClientRect(),dp=Math.min(2,devicePixelRatio||1);if(rv.width!==Math.round(r.width*dp)){rv.width=Math.round(r.width*dp);rv.height=Math.round(r.height*dp);}g.setTransform(dp,0,0,dp,0,0);const W2=r.width,H2=r.height,cx=W2/2,cy=H2*.42;g.clearRect(0,0,W2,H2);g.fillStyle='rgba(2,4,12,.92)';g.fillRect(0,0,W2,H2);
   const e=u=>u<0?0:u>1?1:1-Math.pow(1-u,3),u=e(t/1);if(t<1.05)[pa,pb].forEach((im,k)=>{const s=Math.min(130,W2*.3),x=cx+(k?1:-1)*(1-u)*W2*.3;g.save();g.translate(x,cy);g.rotate((k?-1:1)*(1-u)*.5);if(okI(im))g.drawImage(im,-s/2,-s/2,s,s);g.restore();});
   const fl=t>.95&&t<1.5?1-(t-.95)/.55:0;if(fl>0&&!quiet()){g.save();g.globalCompositeOperation='lighter';const gr=g.createRadialGradient(cx,cy,0,cx,cy,60+(1-fl)*W2);gr.addColorStop(0,'rgba(255,255,255,'+Math.min(.5,fl)+')');gr.addColorStop(.4,d.color+'88');gr.addColorStop(1,d.color+'00');g.fillStyle=gr;g.fillRect(0,0,W2,H2);g.restore();}
   if(t>1){const v=e((t-1)/.6),s=Math.min(260,W2*.7)*(.7+.3*v);g.globalAlpha=v;if(okI(ic))g.drawImage(ic,cx-s/2,cy-s/2,s,s);else if(okI(at)){const cw=at.naturalWidth/6,ch=at.naturalHeight/2;g.drawImage(at,d.ring*cw,0,cw,ch,cx-s/2,cy-s/2,s,s);}else{const h=s*.62;if(okI(pa))g.drawImage(pa,cx-h*.8,cy-h/2,h,h);if(okI(pb))g.drawImage(pb,cx-h*.2,cy-h/2,h,h);}g.globalAlpha=1;}
   if(t>1.2){g.fillStyle='#ffd56a';g.textAlign='center';g.font="900 22px 'Be Vietnam Pro',sans-serif";g.fillText(d.name.toUpperCase(),cx,H2*.78);g.fillStyle='#bfe9ff';g.font="600 13px 'Be Vietnam Pro',sans-serif";g.fillText(d.parents.map(nameOf).join('  ✚  '),cx,H2*.78+24);g.fillText('Chạm để tiếp tục',cx,H2*.78+50);}
   if(t<4&&!rv.hidden)requestAnimationFrame(step);else rv.hidden=true;};
  rv.onclick=()=>{if(performance.now()-t0>600)rv.hidden=true;};requestAnimationFrame(step);}
 // ảnh SSS cho ô trang bị (sảnh, kho chiến cơ)
 function slotPic(kind){const d=activeDef(kind);if(!d||d.tier!=='sss')return '';return pic(d,52);}
 function hangarSync(){const hg=document.getElementById('hgr41');if(!hg||hg.hidden)return;
  const side=hg.querySelector('.h1-side');if(side&&!side.querySelector('[data-g44]')){const b=document.createElement('button');b.dataset.g44='1';b.textContent='TRANG BỊ SSS';b.addEventListener('click',e=>{e.stopPropagation();open('armor');});side.appendChild(b);}}
 install();setInterval(hangarSync,700);
 return {refDPS,upgrade,lvOf,toCore,fromCore,wkLeft,sssFor,defs:()=>SSS2,sssM,plusOf,open,close,fuse,equipSSS,activeId,activeDef,dmgMult,slotPic,canFuse,owns,sssEnh,state:()=>JSON.parse(JSON.stringify(S)),runtime:()=>Object.fromEntries(Object.entries(R).map(([k,r])=>[k,{id:r.id,mode:r.st.mode,live:r.st.live,slots:r.mir.slots.length,skillCd:r.st.cooldowns.skill,ultCd:r.st.cooldowns.ult,dmg:r.st.metrics.damage}]))};
})();
