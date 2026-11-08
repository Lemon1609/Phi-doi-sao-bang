 // ================= V156 · PHẦN E (Gemini GEMINI_HOP_THE_E_CHOT_JSON) =================
 //  24 công thức phủ 13 bộ · điều kiện 2 món mẹ ≥ Tím +1 · món mẹ giữ lại · mở Lv1 + nâng Lv2–5 bằng nguyên liệu Tím / Tinh Hạch / hợp kim
 //  Cường hóa SSS = 2 × min(n của "Tím +n" hai món mẹ), tối đa +10 · chọn SSS xuất chiến cho từng món mẹ (bind)
 //  Lưu ở khóa MỚI saobang-gear-sss-v2; khóa v1 giữ nguyên, chỉ đọc 1 lần để chuyển.
 const EJ=(typeof SSS_E!=='undefined'&&SSS_E)||{sss_equipment:[]},KEY2='saobang-gear-sss-v2';
 const DEF2={};EJ.sss_equipment.forEach((x,i)=>{const fx=BY[x.id];DEF2[x.id]={id:x.id,kind:x.kind,tier:'sss',group:x.group|0,ord:i,parents:x.parents.slice(),name:x.name,color:(x.art&&x.art.color)||(fx&&fx.color)||'#ffd56a',second:fx&&fx.second,ring:fx?fx.ring:undefined,fx:!!fx,steps:x.cost.lvSteps,trait:x.trait,skill:x.skill,super:x.super,ult:x.ult,traits:[{name:x.trait.name}],flavor:''};});
 const SSS2=Object.values(DEF2),def=id=>DEF2[id]||BY[id]||null;
 const MATN=id=>{try{return V70.matName(id);}catch{return id;}};
 const nameOf=v=>{try{return (BY[v]&&BY[v].name)||GearCatalog[v].name;}catch{return v;}};
 let S=load();
 function load(){try{const o=JSON.parse(localStorage.getItem(KEY2)||'null');if(o&&o.v===2)return {v:2,owned:o.owned||{},bind:o.bind||{},wk:o.wk||{w:0,n:0},pay:o.pay||null};}catch{}
  // chuyển từ v1: 9 món còn trong danh sách → giữ (Lv1); 9 món bị bỏ → tặng 1 SSS chung món mẹ chưa có; hết chỗ thì hoàn chi phí mở
  const n={v:2,owned:{},bind:{},wk:{w:0,n:0},pay:null};let o=null;try{o=JSON.parse(localStorage.getItem(KEY)||'null');}catch{}
  if(o&&o.owned){const old=Object.keys(o.owned),pay={cr:0,m:{}};for(const id of old)if(DEF2[id])n.owned[id]={lv:1,at:Date.now(),from:'v1'};
   for(const id of old){if(DEF2[id])continue;const ps=(BY[id]&&BY[id].parents)||[];const c=SSS2.filter(d=>!n.owned[d.id]&&d.parents.some(p=>ps.includes(p))).sort((a,b)=>a.group-b.group)[0];
    if(c)n.owned[c.id]={lv:1,at:Date.now(),from:id};else{const st=SSS2.find(d=>d.parents.some(p=>ps.includes(p)))||SSS2[0];if(st){const c0=st.steps[0];pay.cr+=c0.credits|0;for(const [k,v] of Object.entries(c0.mats||{}))pay.m[k]=(pay.m[k]|0)+v;}}}
   for(const k of KINDS){const e=o.equip&&o.equip[k];if(!e)continue;const id=DEF2[e]?e:Object.keys(n.owned).find(x=>n.owned[x].from===e);if(id)for(const p of DEF2[id].parents)n.bind[p]=id;}
   if(pay.cr||Object.keys(pay.m).length)n.pay=pay;}
  try{localStorage.setItem(KEY2,JSON.stringify(n));}catch{}return n;}
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
 function canFuse(id){const d=DEF2[id];if(!d)return {ok:false,why:'Không phải công thức'};const [a,b]=d.parents,ta=tierN(a),tb=tierN(b);if(ta<0||tb<0)return {ok:false,why:'Thiếu '+nameOf(ta<0?a:b)};if(ta<7||tb<7)return {ok:false,why:'Cần cả hai món ≥ Tím +1'};const L=costOk(d.steps[0]);if(L.length)return {ok:false,why:'Thiếu '+L.slice(0,2).join(', ')};return {ok:true,why:''};}
 const sssEnh=id=>{const d=DEF2[id];if(!d)return 0;return Math.min(10,2*Math.min(...d.parents.map(plusOf)));};
 // SSS hoạt động khi đang lắp 1 trong 2 món mẹ; món mẹ dùng chung → theo lựa chọn (bind), mặc định Lv cao hơn rồi Nhóm cao hơn
 function sssFor(v,kind){const b=S.bind[v];if(b==='-')return null;if(b&&owns(b)&&DEF2[b]&&DEF2[b].kind===kind&&DEF2[b].parents.includes(v))return b;const L=SSS2.filter(d=>d.kind===kind&&owns(d.id)&&d.parents.includes(v)).sort((x,y)=>lvOf(y.id)-lvOf(x.id)||y.group-x.group);return L.length?L[0].id:null;}
 function activeId(kind){const it=equippedItem(kind);if(!it)return null;return sssFor(it.variant,kind)||it.variant;}
 const activeDef=kind=>{const id=activeId(kind);return id?def(id):null;};
 const sssM=kind=>{const d=activeDef(kind);return d&&d.tier==='sss'?1.35*(1+.03*sssEnh(d.id))*(typeof OC75!=='undefined'?OC75.mult(d.id):1):1;};
 const dmgMult=kind=>sssM(kind)*(typeof Evo53!=='undefined'&&Evo53.gearBonus?Evo53.gearBonus(kind):1);
 const busy=()=>['play','pause','reward'].includes(mode);
 function fuse(id){if(owns(id)||busy())return false;const c=canFuse(id);if(!c.ok){toastG(c.why);return false;}if(!pay(DEF2[id].steps[0]))return false;S.owned[id]={lv:1,at:Date.now()};save();try{Audio393.sfx('pickup');}catch{}rite(id);return true;}
 function upgrade(id){if(!owns(id)||busy())return false;const lv=lvOf(id);if(lv>=5)return false;const st=DEF2[id].steps[lv];const L=costOk(st);if(L.length){toastG('THIẾU: '+L.slice(0,3).join(', '));return false;}if(!pay(st))return false;S.owned[id].lv=lv+1;save();try{Audio393.sfx('pickup');}catch{}toastG(DEF2[id].name+' · Lv'+(lv+1));return true;}
 function equipSSS(kind,id){if(busy())return false;const it=equippedItem(kind);if(id===null){if(it)S.bind[it.variant]='-';save();try{gear=Progress.stats();}catch{}return true;}const d=DEF2[id];if(!d||d.kind!==kind||!owns(id))return false;for(const p of d.parents)S.bind[p]=id;if(!it||!d.parents.includes(it.variant)){const best=d.parents.map(bestOf).filter(Boolean).sort((a,b)=>nOf(b)-nOf(a)||b.level-a.level)[0];if(best)try{Progress.equip(best.id);}catch{}}save();try{gear=Progress.stats();}catch{}return true;}
 // Tinh Hạch Siêu Việt ↔ nguyên liệu Tím (items_fusion.sss_core_exchange)
 const XC=(EJ.items_fusion&&EJ.items_fusion.sss_core_exchange)||{purpleMatsToCore:{anyPurpleMatLv3Count:3,credits:2000,outputSssCore:1,weeklyLimit:15},coreToPurpleMat:{sssCoreCount:1,credits:500}};
 const week=()=>Math.floor((Date.now()/864e5+3)/7);
 const wkLeft=()=>{if(S.wk.w!==week())S.wk={w:week(),n:0};return Math.max(0,XC.purpleMatsToCore.weeklyLimit-S.wk.n);};
 const P3=()=>['alloy3','crystal3','circuit3','plasma3'];
 function toCore(){const R_=XC.purpleMatsToCore;if(wkLeft()<=0){toastG('HẾT LƯỢT ĐỔI TUẦN NÀY');return false;}const tot=P3().reduce((a,k)=>a+haveM(k),0);if(tot<R_.anyPurpleMatLv3Count){toastG('CẦN '+R_.anyPurpleMatLv3Count+' NGUYÊN LIỆU TÍM');return false;}if(Progress.balance()<R_.credits||!Progress.spendCredits(R_.credits)){toastG('THIẾU HỢP KIM');return false;}
  let k=R_.anyPurpleMatLv3Count;while(k>0){const m=P3().sort((a,b)=>haveM(b)-haveM(a))[0];V70.add(m,-1);k--;}V70.add('sss_core',R_.outputSssCore);S.wk.n++;save();return true;}
 function fromCore(m){const R_=XC.coreToPurpleMat;if(!P3().includes(m))return false;if(haveM('sss_core')<R_.sssCoreCount){toastG('THIẾU TINH HẠCH');return false;}if(Progress.balance()<R_.credits||!Progress.spendCredits(R_.credits)){toastG('THIẾU HỢP KIM');return false;}V70.add('sss_core',-R_.sssCoreCount);V70.add(m,1);return true;}
