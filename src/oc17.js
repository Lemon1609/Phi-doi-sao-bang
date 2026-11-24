'use strict';
// V309 · LƯỢT 17 · HỆ ÉP XUNG (V2.0, đặc tả Gemini, chủ dự án chốt 22/11/2026). Tắt: window.OC17=false
//  • Tab thứ 3 trong CƯỜNG HÓA: NÂNG CẤP | TIẾN BẬC | ÉP XUNG.
//  • Áp cho Chiến cơ / Giáp / Tên lửa / Tàu con đã đạt Tím +3 trở lên và đầy cấp của khung hiện tại. Không áp lên Chiến Thần (robot hợp thể, món key/super).
//  • OC+1..+5: chỉ số chính +3 %/nấc (nhân vào hệ số V70LF dùng chung cho mọi chỉ số món).
//  • Dòng phụ mở ở OC+3, nhân đôi ở OC+5: Chiến cơ chí mạng 3→6 % · Giáp máu 4→8 % · Tên lửa sát thương boss 4→8 % · Tàu con nạp Bạo Tẩu 5→10 %.
//  • Chi phí từng nấc: hợp kim / bản sao cùng mẫu / VL Tím. Tự chọn phôi ưu tiên Trắng Lv1, hiện danh sách trước khi xác nhận.
//  • Hoàn nguyên: 100 % bản sao (trả về dạng Trắng Lv1) + 85 % hợp kim + 85 % VL Tím (làm tròn xuống, từng loại) + 100 % XP (trả bằng Đá XP).
//  Lưu: saobang-oc17-v1 = {v:1,g:{khóa:{oc,sp:{hk,cp,vl:{},xp}}}} · khóa 'c<idx>' cho chiến cơ, 'g:<id>' cho trang bị.
const OC17=(()=>{
 const KEY='saobang-oc17-v1';
 const COST=[null,{hk:15000,cp:1,vl:3},{hk:25000,cp:1,vl:5},{hk:40000,cp:2,vl:8},{hk:60000,cp:2,vl:12},{hk:85000,cp:3,vl:16}];
 const MAIN=.03,REF={hk:.85,vl:.85};
 const SUB={craft:{n:'Tỉ lệ chí mạng',v:.03,u:'%'},armor:{n:'Máu tối đa',v:.04,u:'%'},missiles:{n:'Sát thương lên boss',v:.04,u:'%'},sidearm:{n:'Tốc độ nạp Bạo Tẩu',v:.05,u:'%'}};
 const KN={craft:'Chiến cơ',armor:'Giáp',missiles:'Tên lửa',sidearm:'Tàu con'};
 let S={v:1,g:{}};try{const v=JSON.parse(localStorage.getItem(KEY)||'null');if(v&&v.g)S=v;}catch{}S.g=S.g||{};
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const on=()=>window.OC17!==false&&typeof Progress!=='undefined'&&typeof TIER70!=='undefined';
 const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const fmt=n=>Math.round(n).toLocaleString('vi-VN');
 const T=m=>{try{toast(m);}catch{}};
 const pct=v=>(Math.round(v*1000)/10).toString().replace('.',',')+' %';
 // ---------- khóa / tra món ----------
 const isCraft=it=>it&&it.kind==='craft';
 const keyOf=it=>!it?null:isCraft(it)?'c'+(it.idx|0):(typeof it.id==='string'&&!it.id.startsWith('copy:')?'g:'+it.id:null);
 const rec=k=>S.g[k]||null;
 const oc=it=>{const k=keyOf(it);return k&&S.g[k]?S.g[k].oc|0:0;};
 const ocKey=k=>S.g[k]?S.g[k].oc|0:0;
 // đối tượng V70LF nhận: craftProgress (có idx) hoặc trang bị (có id + kind)
 const isCraftObj=o=>!!o&&(typeof o.id==='string'?o.id.startsWith('craft:'):Number.isInteger(o.idx)&&o.idx>=0&&o.idx<13&&!o.kind||o.kind==='craft');
 function ocObj(o){if(!o||typeof o!=='object')return 0;try{if(typeof o.id==='string'){if(o.id.startsWith('copy:'))return 0;if(o.id.startsWith('craft:'))return ocKey('c'+(+o.id.slice(6)));return ocKey('g:'+o.id);}if(Number.isInteger(o.idx)&&o.idx>=0&&o.idx<13)return ocKey('c'+o.idx);}catch{}return 0;}
 const nOf=it=>{try{return isCraft(it)?V70.craftN(it.idx|0):(V70.nOf(it)|0);}catch{return 0;}};
 const capOf=it=>{try{return TIER70.cap[nOf(it)];}catch{return 100;}};
 const tierName=n=>{try{return TIER70.name[n];}catch{return '';}};
 const nameOf=it=>{try{if(isCraft(it))return Fighters28.profiles[it.idx].name;return String(Progress.title(it)).split(' · ')[0];}catch{return isCraft(it)?'Chiến cơ':'Trang bị';}};
 const subVal=(kind,o)=>o>=5?SUB[kind].v*2:o>=3?SUB[kind].v:0;
 function elig(it){const r={ok:false,why:[],max:false};if(!it){r.why.push('Chưa chọn món');return r;}
  if(it.copy||it.key||it.super||it.fusion||it.directFusion||!KN[it.kind]){r.why.push('Chiến Thần / bản sao không ép xung được');return r;}
  const n=nOf(it),cap=capOf(it),lv=it.level|0;
  r.cond=[['Khung Tím +3 trở lên',n>=9,tierName(n)],['Đầy cấp khung hiện tại',lv>=cap,'Lv'+lv+'/'+cap]];
  for(const c of r.cond)if(!c[1])r.why.push(c[0]+' ('+c[2]+')');
  if(oc(it)>=5){r.max=true;r.why.push('Đã đạt OC+5');}
  r.ok=!r.why.length;return r;}
 // ---------- phôi (bản sao cùng mẫu) ----------
 const xpLv=lv=>{let s=0;try{for(let L=1;L<(lv|0);L++)s+=NC307CFG.need(L);}catch{}return s;};
 function cands(it){const L=[];if(!it)return L;const cr=isCraft(it),m=cr?(it.idx|0):it.variant;
  try{for(const c of Evo82.list())if(!c.lk&&c.k===(cr?'craft':'gear')&&c.m==m)L.push({src:'cp',u:c.u,t:c.t|0,lv:c.lv|0,xp:xpLv(c.lv)});}catch{}
  if(!cr){let eq=[];try{eq=Object.values(Progress.v70.equipped()||{});}catch{}
   try{for(const i of Progress.v70.items())if(i.id!==it.id&&!eq.includes(i.id)&&!i.super&&!i.key&&!i.fusion&&!i.directFusion&&i.kind===it.kind&&i.variant===it.variant&&!oc(i)){let x=0;try{x=NC307.invested(i);}catch{}L.push({src:'it',id:i.id,t:nOf(i),lv:i.level|0||1,xp:x});}}catch{}}
  return L.sort((a,b)=>a.t-b.t||a.lv-b.lv||(a.src==='cp'?0:1)-(b.src==='cp'?0:1));}
 const VL=()=>{try{return MAT69.types.map(t=>t.id+'3');}catch{return ['alloy3','crystal3','circuit3','plasma3'];}};
 const vlHave=id=>{try{return V70.have(id)|0;}catch{return 0;}};
 function vlPick(n){const h={};for(const id of VL())h[id]=vlHave(id);const use={};let left=n;
  while(left>0){let best=null;for(const id in h)if(h[id]>0&&(best==null||h[id]>h[best]))best=id;if(!best)break;h[best]--;use[best]=(use[best]|0)+1;left--;}
  return {use,miss:left};}
 // V2.2.1 (bỏ bản sao): mỗi bản sao cùng mẫu trước đây → +2 VL Tím (OC+1..+5 = 5/7/12/16/22 VL Tím). Tắt: window.NOBS22=false
 function cost22(c){return window.NOBS22!==false?Object.assign({},c,{cp:0,vl:c.vl+2*(c.cp|0)}):c;}
 function plan(it){const e=elig(it);if(!e.ok)return {e,ok:false};const nx=oc(it)+1,c=cost22(COST[nx]),cs=window.NOBS22!==false?[]:cands(it),pick=cs.slice(0,c.cp),v=vlPick(c.vl);let b=0;try{b=Progress.balance();}catch{}
  const lacks=[];if(b<c.hk)lacks.push('Thiếu '+fmt(c.hk-b)+' hợp kim');if(pick.length<c.cp)lacks.push('Thiếu '+(c.cp-pick.length)+' bản sao cùng mẫu');if(v.miss>0)lacks.push('Thiếu '+v.miss+' VL Tím');
  return {e,nx,c,pick,vl:v.use,have:{hk:b,cp:cs.length,vl:VL().reduce((a,id)=>a+vlHave(id),0)},lacks,ok:!lacks.length};}
 function doOC(it){if(!on())return false;const p=plan(it);if(!p.ok){T((p.lacks&&p.lacks[0]||p.e.why[0]||'Chưa đủ điều kiện').toUpperCase());return false;}
  if(!Progress.spendCredits(p.c.hk)){T('KHÔNG TRỪ ĐƯỢC HỢP KIM');return false;}const k=keyOf(it);const r=S.g[k]||(S.g[k]={oc:0,sp:{hk:0,cp:0,vl:{},xp:0}});
  for(const q of p.pick){if(q.src==='cp'){try{Evo82.take(q.u);}catch{}}else{try{Progress.v70.remove(q.id);}catch{}try{NC307.clearX(q.id);}catch{}}r.sp.xp+=q.xp|0;r.sp.cp++;}
  for(const id in p.vl){try{V70.add(id,-p.vl[id]);}catch{}r.sp.vl[id]=(r.sp.vl[id]|0)+p.vl[id];}
  r.sp.hk+=p.c.hk;r.oc=p.nx;save();
  try{Progress.render();}catch{}try{Audio393.sfx('pickup');}catch{}try{window.dispatchEvent(new CustomEvent('nc10',{detail:'oc'}));}catch{}
  if(r.oc>=5)banner(it);else T('ÉP XUNG THÀNH CÔNG · '+nameOf(it).toUpperCase()+' · OC+'+r.oc);return true;}
 // Đá XP trả lại: tham lam IV 1000 · III 240 · II 60 · I 15 (lẻ làm tròn lên 1 viên I)
 function xpStones(x){const out={};x=Math.max(0,Math.round(x));for(const [t,v] of [[4,1000],[3,240],[2,60],[1,15]]){const n=Math.floor(x/v);if(n){out[t]=n;x-=n*v;}}if(x>0)out[1]=(out[1]|0)+1;return out;}
 function refundOf(it){const r=rec(keyOf(it));if(!r)return null;const vl={};for(const id in r.sp.vl)vl[id]=Math.floor(r.sp.vl[id]*REF.vl);return {cp:r.sp.cp|0,hk:Math.floor(r.sp.hk*REF.hk),vl,xp:r.sp.xp|0,st:xpStones(r.sp.xp|0)};}
 function restore(it){if(!on())return false;const k=keyOf(it),r=rec(k);if(!r||!(r.oc>0))return false;const f=refundOf(it);const cr=isCraft(it),m=cr?(it.idx|0):it.variant;
  if(window.NOBS22!==false){const v=vlPick(0);const ids=VL();for(let i=0;i<2*f.cp;i++){try{V70.add(ids[i%ids.length],1);}catch{}}}else for(let i=0;i<f.cp;i++){try{Evo82.addCopy(cr?'craft':'gear',m,0,1,true);}catch{}}
  try{Progress.grantCredits(f.hk);}catch{}for(const id in f.vl)if(f.vl[id]>0){try{V70.add(id,f.vl[id]);}catch{}}
  for(const t in f.st){try{XPDA307.add(+t,f.st[t]);}catch{}}
  delete S.g[k];save();try{Progress.render();}catch{}T('HOÀN NGUYÊN · '+(window.NOBS22!==false?(f.cp?'+'+2*f.cp+' VL TÍM · ':''):'+'+f.cp+' BẢN SAO · ')+'+'+fmt(f.hk)+' HỢP KIM');return f;}
 // ---------- hiệu ứng trong trận ----------
 const eqItem=kind=>{try{const id=(Progress.v70.equipped()||{})[kind];return id?Progress.v70.get(id):null;}catch{return null;}};
 const launchIdx=()=>{try{return typeof launchCraft!=='undefined'&&launchCraft!=null?launchCraft:selected;}catch{try{return selected;}catch{return 0;}}};
 const md=()=>{try{return mode;}catch{return '';}};
 const st={crit:{set:null,add:0},pw:{last:null,acc:0},hp:{was:'',t0:0,done:0,k:1},stat:{crit:0,boss:0,pw:0,hp:0}};
 function tick(){if(!on())return;
  // chí mạng chiến cơ (CRIT66.chance bị mô-đun khác đặt lại theo chu kỳ → cộng phần OC lên giá trị nền mới nhất)
  try{if(typeof CRIT66!=='undefined'){st.crit.add=(md()==='play'||md()==='pause')?subVal('craft',ocKey('c'+(launchIdx()|0))):0;st.stat.crit=st.crit.add;
   if(!st.crit.prop){const d=Object.getOwnPropertyDescriptor(CRIT66,'chance');if(d&&!d.get&&d.configurable!==false){let base=+CRIT66.chance||0;Object.defineProperty(CRIT66,'chance',{configurable:true,enumerable:true,get(){return base+(window.OC17!==false?st.crit.add:0);},set(v){base=+v||0;}});st.crit.prop=1;}}}}catch{}
  // giáp: máu tối đa +4/8 % — áp 1 lần mỗi trận, 0,6 s sau khi vào (sau khi game tính xong máu gốc)
  try{const m=md();if(m==='play'&&st.hp.was!=='play'&&st.hp.was!=='pause'){st.hp.t0=performance.now();st.hp.done=0;}st.hp.was=m;
   if(m==='play'&&!st.hp.done&&performance.now()-st.hp.t0>600){st.hp.done=1;const it=eqItem('armor');const v=it?subVal('armor',oc(it)):0;st.hp.k=1+v;if(v>0&&typeof maxHp==='number'){const r=hp/maxHp;st.hp.pre=maxHp;maxHp=maxHp*(1+v);st.hp.post=maxHp;hp=Math.min(maxHp,hp+maxHp*v/(1+v)*Math.min(1,r));st.stat.hp++;try{hud();}catch{}}}}catch{}
  // tàu con: tốc độ nạp Bạo Tẩu — cộng dồn v mỗi lần tăng nấc đạn, đủ 1 thì thêm 1 nấc (đến W5 thì kích Bạo Tẩu như nhặt P)
  try{if(md()!=='play'){st.pw.last=null;st.pw.acc=0;}else{const p=power|0;const it=eqItem('sidearm');const v=it?subVal('sidearm',oc(it)):0;
   if(st.pw.last!=null&&p>st.pw.last&&v>0){st.pw.acc+=v*(p-st.pw.last);if(st.pw.acc>=1-1e-9){st.pw.acc-=1;st.pw.extra=(st.pw.extra|0)+1;if(power<5){power++;powerUpgrades=power-1;}else if(!(superTime>0)){try{activateSuper();}catch{}}st.stat.pw++;}}
   st.pw.last=power|0;}}catch{}}
 const hk={};
 function hooks(){if(!on())return;
  try{if(typeof Safety31!=='undefined'&&!hk.fr){hk.fr=1;const o=Safety31.frame;Safety31.frame=function(){const r=o.apply(this,arguments);try{tick();}catch(e){}return r;};}}catch{}
  // chỉ số chính +3 %/nấc
  try{if(typeof window.V70LF==='function'&&!window.V70LF.__oc17){const o=window.V70LF;const f=function(i){const v=o.apply(this,arguments);if(v==null||!on())return v;const n=isCraftObj(i)?ocObj(i):0;return n?v*(1+MAIN*n):v;};f.__oc17=1;window.V70LF=f;}}catch{}
  // trang bị (giáp / tên lửa / tàu con): chỉ số chính +3 %/nấc qua gearSpec (cả bảng chỉ số lẫn trong trận đều đọc hàm này)
  try{if(typeof gearSpec==='function'&&!gearSpec.__oc17){const o=gearSpec;const f=function(i){const r=o.apply(this,arguments);try{if(on()&&r&&i&&i.kind!=='craft'){const n=ocObj(i);if(n){const k=1+MAIN*n;return {...r,damage:r.damage*k,armor:r.armor*k,hp:r.hp*k};}}}catch{}return r;};f.__oc17=1;gearSpec=f;}}catch{}
  // tên lửa: sát thương lên boss (đạn tên lửa mang gearKind 'missiles')
  try{if(typeof damageBoss==='function'&&!hk.db){hk.db=1;const o=damageBoss;const f=function(a,src,part){try{if(on()&&src&&typeof src==='object'&&src.gearKind==='missiles'&&Number.isFinite(a)){const it=eqItem('missiles');const v=it?subVal('missiles',oc(it)):0;if(v){a*=1+v;st.stat.boss++;}}}catch{}return o.call(this,a,src,part);};damageBoss=f;}}catch{}}
 setInterval(()=>{try{hooks();badges();}catch{}},400);
 setInterval(()=>{try{tick();}catch{}},250);/* chạy cả khi trận tạm dừng (hội thoại cốt truyện) để CRIT66 không bị đặt lại mất phần OC */
 // ---------- giao diện: tab ÉP XUNG trong màn CƯỜNG HÓA (nc307) ----------
 const BO=':not(#_oc17)'.repeat(24);/* neo-theme dùng 16 id */
 const css=`#nc307 .oc17t{display:flex;gap:4px;margin:2px 0 8px}#nc307 .oc17t button{flex:1;min-height:34px;font:900 11.5px/1 inherit;letter-spacing:1px;color:#cfe3f5;background:linear-gradient(#123a6e,#0b2448);border:1px solid #2f6bb3;clip-path:polygon(7px 0,100% 0,100% calc(100% - 7px),calc(100% - 7px) 100%,0 100%,0 7px)}
#nc307 .oc17t button.on{color:#2a1700;text-shadow:0 1px 0 #fff4c0;background:linear-gradient(#fff6c4 0,#ffdc63 42%,#f2a91d 56%,#ffcc45 100%);border-color:#fff0b0;box-shadow:inset 0 1px 0 #fffbe6,inset 0 -3px 0 #b9730a}
#nc307.oc17on .nc307-in>*:not(.nc307-top):not(.oc17t):not(.oc17):not(.nc307-sh){display:none!important}
.oc17{color:#dbeeff;font-size:12px}.oc17 .hd{display:flex;gap:10px;align-items:center;padding:8px;background:linear-gradient(#0d2c58,#081d3d);border:1px solid #2a64a8;clip-path:polygon(10px 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%,0 10px)}
.oc17 .hd .art{position:relative;width:64px;height:64px;flex:none;display:grid;place-items:center;background:#06152b;border:1px solid var(--c,#b45cff)}.oc17 .hd .art img{max-width:58px;max-height:58px;object-fit:contain}
.oc17 .hd b{display:block;font-size:14px;color:#fff}.oc17 .hd small{color:#9fc2e4}.oc17 .hd .lv{margin-left:auto;text-align:right;font-weight:900;color:#ffd56a;font-size:20px;line-height:1}
.oc17 .pips{display:flex;gap:3px;margin-top:4px}.oc17 .pips i{width:14px;height:6px;background:#173a66;border:1px solid #2f6bb3;transform:skewX(-20deg)}.oc17 .pips i.f{background:linear-gradient(90deg,#ffd56a,#5fe0ff);border-color:#fff0b0}
.oc17 table{width:100%;border-collapse:collapse;margin:8px 0}.oc17 td{padding:5px 6px;border-bottom:1px solid #1d4677}.oc17 td:nth-child(2){color:#cfe3f5;text-align:right}.oc17 td:nth-child(3){width:16px;color:#5f8fbf;text-align:center}.oc17 td:nth-child(4){color:#46ffb2;font-weight:800}.oc17 td.lk{color:#7f9bb8;font-weight:600}
.oc17 .cond{margin:8px 0;padding:8px;background:#06152b;border:1px solid #2a64a8}.oc17 .cond div{display:flex;justify-content:space-between;padding:3px 0}.oc17 .cond .y{color:#46ffb2}.oc17 .cond .n{color:#ff7a7a}
.oc17 .cost{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:8px 0}.oc17 .cost div{padding:6px 4px;text-align:center;background:#0a2347;border:1px solid #23558f}.oc17 .cost small{display:block;color:#9fc2e4;font-size:10px}.oc17 .cost b{font-size:12.5px}.oc17 .cost .no b{color:#ff7a7a}
#nc307 .oc17 .bt,.oc17 .bt{display:flex;gap:6px;margin-top:6px}#nc307 .oc17 .bt button${BO},.oc17 .bt button${BO}{flex:1!important;min-height:42px!important;font:900 12px/1 inherit!important;letter-spacing:1px!important;color:#2a1700!important;text-shadow:0 1px 0 #fff4c0!important;background:linear-gradient(#fff6c4 0,#ffdc63 42%,#f2a91d 56%,#ffcc45 100%)!important;border:1px solid #fff0b0!important;box-shadow:inset 0 1px 0 #fffbe6,inset 0 -3px 0 #b9730a,0 2px 0 #4a2c00!important}
#nc307 .oc17 .bt button.alt${BO},.oc17 .bt button.alt${BO}{color:#eaf5ff!important;text-shadow:0 1px 0 #000a!important;background:linear-gradient(#1f5799 0,#163f73 48%,#0d2a52 52%,#123a6b 100%)!important;border-color:#9cc4ea!important;box-shadow:inset 0 1px 0 #d6ebff88,inset 0 -2px 0 #061a33!important}#nc307 .oc17 .bt button:disabled${BO},.oc17 .bt button:disabled${BO}{filter:grayscale(.85) brightness(.7)}
.oc17 .note{margin:8px 0 0;color:#9fc2e4;font-size:10.5px;line-height:1.45}.oc17 .msg{color:#ffd56a;text-align:center;margin:6px 0}
.oc17 .ask{position:absolute;inset:0;z-index:5;display:grid;place-items:center;background:#020a16cc}.oc17 .ask>div{width:min(92%,360px);padding:12px;background:linear-gradient(#0f3264,#081d3d);border:1px solid #6fa8e0}
.oc17 .ask h5{margin:0 0 8px;font:900 13px/1.2 inherit;color:#ffd56a;letter-spacing:1px}.oc17 .ask ul{margin:0 0 8px;padding:0;list-style:none;max-height:180px;overflow:auto}.oc17 .ask li{display:flex;justify-content:space-between;padding:4px 6px;border-bottom:1px solid #1d4677}.oc17 .ask li small{color:#9fc2e4}
.oc17b{display:inline-block;margin-left:4px;padding:1px 4px;font:900 9.5px/1.2 inherit;font-style:normal;color:#06213d;background:linear-gradient(90deg,#ffe48a,#7fe7ff);border:1px solid #fff3c4;vertical-align:1px;letter-spacing:.3px}
#hb-body .hb-slot > i.oc17s{position:absolute!important;left:4px!important;top:4px!important;right:auto!important;bottom:auto!important;width:auto!important;height:auto!important;margin:0!important;z-index:8!important;display:block!important;font-size:9px!important;background:linear-gradient(90deg,#ffe48a,#7fe7ff)!important;border:1px solid #fff3c4!important;border-radius:0!important;transform:none!important}
.oc17x5{box-shadow:0 0 0 2px #ffd56a,0 0 0 4px #5fe0ff,0 0 14px #5fe0ff88!important}
.oc17 .hd .art.oc17x5{border-color:#ffd56a}
.oc17 .hd .art.fr{border:0;background:radial-gradient(circle at 50% 42%,#14335f,#06142b 75%)}.oc17 .hd .art.fr img{transform:scale(.8)}.oc17 .hd .art i.ocfr{position:absolute;inset:-2px;background:center/100% 100% no-repeat;pointer-events:none}
.oc17 .hd .lv{display:flex;align-items:center;gap:6px}.oc17 .hd .lv img.occ{width:40px;height:40px;object-fit:contain;filter:drop-shadow(0 2px 3px #000b)}
.oc17ban{position:fixed;left:50%;top:38%;z-index:2147483647;transform:translate(-50%,-50%);min-width:280px;padding:16px 22px;text-align:center;pointer-events:none;color:#fff;background:linear-gradient(#123a6e,#071a33);border:2px solid #ffd56a;box-shadow:0 0 0 2px #5fe0ff,0 0 30px #5fe0ffaa;animation:oc17b 2.8s ease forwards}
.oc17ban small{display:block;color:#7fe7ff;font:900 11px/1.2 inherit;letter-spacing:3px}.oc17ban b{display:block;margin:6px 0 2px;font:900 24px/1 inherit;letter-spacing:2px;background:linear-gradient(#fff6c4,#ffcc45);-webkit-background-clip:text;background-clip:text;color:transparent}.oc17ban span{font-size:12px;color:#dbeeff}
.oc17dim{position:fixed;inset:0;z-index:2147483646;background:rgba(2,8,22,.68);pointer-events:none;animation:oc17d 2.8s ease forwards}
@keyframes oc17d{0%{opacity:0}10%{opacity:1}82%{opacity:1}100%{opacity:0}}
.oc17ban.b17{min-width:0;width:min(86vw,330px);padding:18px 18px 16px;background:linear-gradient(#123f7a 0,#0b2a57 52%,#081f44 100%);border:2px solid #ffd56a;border-radius:0;box-shadow:inset 0 0 0 2px #071a33,inset 0 0 0 4px #5fe0ff,inset 0 0 18px #5fe0ff55;clip-path:polygon(14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%,0 14px)}
.oc17ban.b17::before{content:'';position:absolute;left:10px;right:10px;top:6px;height:1px;background:linear-gradient(90deg,transparent,#fff3b0,transparent)}
.oc17ban.b17 small{font-size:12px;letter-spacing:4px;color:#9fefff;text-shadow:0 1px 0 #000}
.oc17ban.b17 b{font-size:40px;margin:8px 0 6px;letter-spacing:3px;background:linear-gradient(#fffbe0,#ffd84a 55%,#f0a020);-webkit-background-clip:text;background-clip:text;color:transparent;filter:none}
.oc17ban.b17 span{display:block;font-size:13px;line-height:1.45;font-weight:700;color:#ffffff;text-shadow:0 1px 2px #000}
.oc17ban.b17 i.st{display:block;margin-top:8px;font-style:normal;font:900 14px/1.2 inherit;color:#46ffb2;text-shadow:0 1px 2px #000}
@keyframes oc17b{0%{opacity:0;transform:translate(-50%,-50%) scale(.7)}12%{opacity:1;transform:translate(-50%,-50%) scale(1.06)}20%{transform:translate(-50%,-50%) scale(1)}82%{opacity:1}100%{opacity:0;transform:translate(-50%,-58%)}}`;
 function ensureCss(){if(document.getElementById('oc17css'))return;const s=document.createElement('style');s.id='oc17css';s.textContent=css;document.head.appendChild(s);}
 let ocMode=false,ask=null,msg='';
 const root=()=>document.getElementById('nc307');
 const curItem=()=>{try{const id=NC307.cur();return id?NC307.get(id):null;}catch{return null;}};
 function tabsHtml(){let m='up';try{m=NC307.mode();}catch{}if(ocMode)m='oc';return `<div class="oc17t"><button type="button" data-oc="up" class="${m==='up'?'on':''}">NÂNG CẤP</button><button type="button" data-oc="adv" class="${m==='adv'?'on':''}">TIẾN BẬC</button><button type="button" data-oc="oc" class="${m==='oc'?'on':''}">ÉP XUNG</button></div>`;}
 function artOf(it){try{if(isCraft(it)){const S=SHIP118[it.idx];const src=S.tim5||S.tim||S.lam||S.thuong;return src?`<img src="${src}" alt="">`:'';}return String(Progress.art(it)).replace(/<b>[\s\S]*?<\/b>/g,'');}catch{return '';}}
 function mainVal(it){try{if(isCraft(it)){const v=Workshop.levelFactor(Workshop.craftProgress(it.idx|0));return {n:'Hệ số sức mạnh',v,f:x=>'×'+x.toFixed(3)};}const s=Progress.stat(it);const k=it.kind==='armor'?'armor':'auxDamage';return {n:it.kind==='armor'?'Giáp':'Sát thương/viên',v:s[k],f:x=>x.toFixed(k==='armor'?1:2)};}catch{return null;}}
 function panelHtml(){const it=curItem();
  if(!it)return `<div class="oc17"><p class="msg">Chọn món cần ép xung bằng nút <b>⇅ Đổi món</b> phía trên.</p></div>`;
  const o=oc(it),e=elig(it),p=e.ok?plan(it):null,kind=it.kind,col=(()=>{try{return TIER70.fcol[TIER70.frame[nOf(it)]];}catch{return '#b45cff';}})();
  const pips=Array.from({length:5},(_,i)=>`<i class="${i<o?'f':''}"></i>`).join('');
  const U=window.UI17!==false?(window.UI17_IMG||{}):{};const fk=o>=5?'f_oc5':['f_trang','f_luc','f_lam','f_tim'][(()=>{try{return TIER70.frame[nOf(it)]|0;}catch{return 3;}})()];const fr=U[fk]?`<i class="ocfr" style="background-image:url('${U[fk]}')"></i>`:'';
  const hd=`<div class="hd"><div class="art ${fr?'fr':''} ${o>=5&&!fr?'oc17x5':''}" style="--c:${col}">${artOf(it)}${fr}</div><div><b>${esc(nameOf(it))}</b><small>${esc(KN[kind]||'')} · ${esc(tierName(nOf(it)))} · Lv${it.level|0}/${capOf(it)}</small><div class="pips">${pips}</div></div><div class="lv">${U.oc_core?`<img class="occ" src="${U.oc_core}" alt="Lõi Ép Xung">`:''}<span>OC+${o}<br><small style="font-size:10px;color:#9fc2e4">/ +5</small></span></div></div>`;
  const mv=mainVal(it),nx=Math.min(5,o+1),kk=(1+MAIN*nx)/(1+MAIN*o),sv=subVal(kind,o),sn=subVal(kind,nx);
  const rows=[['Nấc','OC+'+o,o<5?'OC+'+nx:'—'],['Chỉ số chính','+'+pct(MAIN*o),o<5?'+'+pct(MAIN*nx):'—']];
  if(mv)rows.push([mv.n,mv.f(mv.v),o<5?mv.f(mv.v*kk):'—']);
  rows.push([SUB[kind].n+(o<3?' (mở ở OC+3)':''),sv?'+'+pct(sv):'—',o<5?(sn?'+'+pct(sn):'—'):'—',!sn]);
  const tbl=`<table>${rows.map(r=>`<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td><td>›</td><td class="${r[3]?'lk':''}">${esc(r[2])}</td></tr>`).join('')}</table>`;
  let body='';
  if(!e.ok&&!e.max){body=`<div class="cond">${(e.cond||[]).map(c=>`<div><span>${esc(c[0])}</span><span class="${c[1]?'y':'n'}">${c[1]?'Đạt':'Chưa'} · ${esc(c[2])}</span></div>`).join('')||`<div><span>${esc(e.why[0]||'')}</span></div>`}</div>`;}
  else if(e.max){body=`<p class="msg">Đã đạt OC+5 — tối đa. Chỉ số chính +15 % · ${esc(SUB[kind].n)} +${pct(SUB[kind].v*2)}.</p>`;}
  else{const c=p.c,cpH=p.have.cp,vlH=p.have.vl;body=`<div class="cost"><div class="${p.have.hk<c.hk?'no':''}"><small>Hợp kim</small><b>${fmt(c.hk)} ◈</b></div>${c.cp?`<div class="${cpH<c.cp?'no':''}"><small>Bản sao cùng mẫu</small><b>${Math.min(cpH,99)}/${c.cp}</b></div>`:''}<div class="${vlH<c.vl?'no':''}"><small>VL Tím</small><b>${Math.min(vlH,999)}/${c.vl}</b></div></div>${p.lacks.length?`<p class="msg">${esc(p.lacks.join(' · '))}</p>`:''}`;}
  const btn=`<div class="bt"><button type="button" class="alt" data-oc="rs" ${o>0?'':'disabled'}>HOÀN NGUYÊN</button><button type="button" data-oc="go" ${p&&p.ok?'':'disabled'}>${e.max?'TỐI ĐA':'ÉP XUNG +'+nx}</button></div>`;
  const note=`<p class="note">Chi phí nấc +1→+5: 15k/1/3 · 25k/1/5 · 40k/2/8 · 60k/2/12 · 85k/3/16 (hợp kim / bản sao / VL Tím). Phôi tự chọn ưu tiên bản Trắng Lv1. Hoàn nguyên trả 100 % bản sao (Trắng Lv1), 85 % hợp kim và VL Tím, 100 % XP (bằng Đá XP).</p>`;
  return `<div class="oc17">${hd}${tbl}${body}${msg?`<p class="msg">${esc(msg)}</p>`:''}${btn}${note}${ask?askHtml(it,p):''}</div>`;}
 function askHtml(it,p){
  if(ask==='go'&&p){const nm=nameOf(it);const L=p.pick.map(q=>`<li><span>${esc(nm)} · ${esc(tierName(q.t))} · Lv${q.lv}</span><small>${q.src==='cp'?'bản sao':'trong túi'}</small></li>`);
   for(const id in p.vl){let n=id;try{n=V70.matName(id);}catch{}L.push(`<li><span>${esc(n)}</span><small>×${p.vl[id]}</small></li>`);}L.push(`<li><span>Hợp kim</span><small>${fmt(p.c.hk)} ◈</small></li>`);
   return `<div class="ask"><div><h5>ÉP XUNG OC+${p.nx} · TIÊU HAO</h5><ul>${L.join('')}</ul><div class="bt"><button type="button" class="alt" data-oc="no">THÔI</button><button type="button" data-oc="ok">XÁC NHẬN</button></div></div></div>`;}
  if(ask==='rs'){const f=refundOf(it);if(!f)return '';const L=[`<li><span>Bản sao Trắng Lv1</span><small>×${f.cp}</small></li>`,`<li><span>Hợp kim (85 %)</span><small>${fmt(f.hk)} ◈</small></li>`];
   for(const id in f.vl){let n=id;try{n=V70.matName(id);}catch{}L.push(`<li><span>${esc(n)} (85 %)</span><small>×${f.vl[id]}</small></li>`);}
   if(f.xp)L.push(`<li><span>XP (100 %)</span><small>${fmt(f.xp)} XP</small></li>`);
   return `<div class="ask"><div><h5>HOÀN NGUYÊN VỀ OC+0 · NHẬN LẠI</h5><ul>${L.join('')}</ul><div class="bt"><button type="button" class="alt" data-oc="no">THÔI</button><button type="button" data-oc="rsok">HOÀN NGUYÊN</button></div></div></div>`;}
  return '';}
 let painting=false;
 function paint(force){const el=root();if(!el||!on())return;const inn=el.querySelector('.nc307-in');if(!inn)return;if(!el.classList.contains('open')){if(ocMode){ocMode=false;ask=null;el.classList.remove('oc17on');}return;}
  painting=true;try{ensureCss();
   let t=inn.querySelector('.oc17t');const html=tabsHtml();if(!t){const w=document.createElement('div');w.innerHTML=html;t=w.firstChild;const top=inn.querySelector('.nc307-top');top?top.after(t):inn.prepend(t);}else if(force)t.outerHTML=html;
   el.classList.toggle('oc17on',ocMode);
   let pn=inn.querySelector('.oc17');if(ocMode){if(!pn||force){if(pn)pn.remove();const w=document.createElement('div');w.innerHTML=panelHtml();pn=w.firstChild;const tt=inn.querySelector('.oc17t');tt.after(pn);}const top=inn.querySelector('.nc307-top b');if(top&&top.textContent!=='CƯỜNG HÓA · ÉP XUNG')top.textContent='CƯỜNG HÓA · ÉP XUNG';const vl=inn.querySelector('.nc307-top .nc307-vl');if(vl)vl.style.display='none';}
   else if(pn)pn.remove();
  }finally{painting=false;}}
 let mo=null;
 setInterval(()=>{try{const el=root();if(!el||!on())return;if(!mo){mo=new MutationObserver(()=>{if(!painting)paint(false);});mo.observe(el.querySelector('.nc307-in')||el,{childList:true});}if(el.classList.contains('open'))paint(false);else if(ocMode)paint(false);}catch{}},300);
 document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-oc]');if(!b||!on())return;const el=root();if(!el||!el.contains(b))return;e.stopPropagation();e.preventDefault();const a=b.dataset.oc;msg='';
  if(a==='up'||a==='adv'){ocMode=false;ask=null;el.classList.remove('oc17on');try{NC307.open(undefined,a);}catch{}paint(true);return;}
  if(a==='oc'){ocMode=true;ask=null;}
  else if(a==='go')ask='go';else if(a==='rs')ask='rs';else if(a==='no')ask=null;
  else if(a==='ok'){ask=null;const it=curItem();if(it&&!doOC(it)){const p=plan(it);msg=(p.lacks&&p.lacks[0])||'';}}
  else if(a==='rsok'){ask=null;const it=curItem();if(it)restore(it);}
  paint(true);},true);
 // ---------- huy hiệu OC+N trên thẻ (kho, màn cường hóa) ----------
 function badgeOn(host,n){if(!host)return;let b=host.querySelector(':scope .oc17b');if(n>0){if(!b){b=document.createElement('i');b.className='oc17b';const t=host.querySelector('b')||host;t.appendChild(b);}if(b.textContent!=='OC+'+n)b.textContent='OC+'+n;}else if(b)b.remove();host.classList.toggle('oc17x5',n>=5);}
 function badges(){if(!on())return;if(!Object.keys(S.g).length){for(const b of document.querySelectorAll('.oc17b'))b.remove();for(const e of document.querySelectorAll('.oc17x5'))e.classList.remove('oc17x5');return;}ensureCss();
  try{for(const r of document.querySelectorAll('.k307-row[data-id]')){if(!r.getClientRects().length)continue;const id=r.dataset.id;const n=r.dataset.k==='ship'?ocKey('c'+(+id)):ocKey('g:'+id);badgeOn(r.querySelector('.k307-ri')||r,n);r.classList.toggle('oc17x5',n>=5);}}catch{}
  // Kho đồ: 4 ô (3 trang bị + chiến cơ đang xem)
  try{for(const sl of document.querySelectorAll('#hb-body .hb-slot')){if(!sl.getClientRects().length)continue;let n=0;if(sl.classList.contains('c9ship')){let i=0;try{const t=(document.querySelector('.np9')||{}).textContent||'';i=[...Array(13).keys()].find(k=>{try{return t.startsWith(Fighters28.profiles[k].name);}catch{return false;}});if(i==null)i=launchCraft;}catch{}n=ocKey('c'+i);}else if(sl.dataset.it)n=ocKey('g:'+sl.dataset.it);
   let b=sl.querySelector(':scope > i.oc17s');if(n>0){if(!b){b=document.createElement('i');b.className='oc17b oc17s';sl.appendChild(b);}if(b.textContent!=='OC+'+n)b.textContent='OC+'+n;}else if(b)b.remove();}}catch{}
  try{const el=root();if(el&&el.classList.contains('open')){for(const r of el.querySelectorAll('.nc307-row[data-id]')){const id=r.dataset.id;const n=id.startsWith('craft:')?ocKey('c'+(+id.slice(6))):id.startsWith('copy:')?0:ocKey('g:'+id);badgeOn(r.querySelector('.nc307-ri')||r,n);r.classList.toggle('oc17x5',n>=5);}
   const it=curItem();if(it){const n=oc(it);for(const c of el.querySelectorAll('.nc307-pc,.nc307-ac')){if(c.classList.contains('nc307-pick'))continue;badgeOn(c,n);}}}}catch{}}
 function banner(it){try{ensureCss();if(window.FX17B!==false){const dm=document.createElement('div');dm.className='oc17dim';document.body.appendChild(dm);setTimeout(()=>dm.remove(),2900);}const d=document.createElement('div');d.className='oc17ban'+(window.FX17B!==false?' b17':'');d.innerHTML=window.FX17B!==false?`<small>ÉP XUNG TỐI ĐA</small><b>OC+5</b><span>${esc(nameOf(it))}</span><i class="st">Chỉ số chính +15 % · ${esc(SUB[it.kind].n)} +${pct(SUB[it.kind].v*2)}</i>`:`<small>ÉP XUNG TỐI ĐA</small><b>OC+5</b><span>${esc(nameOf(it))} · chỉ số chính +15 % · ${esc(SUB[it.kind].n)} +${pct(SUB[it.kind].v*2)}</span>`;document.body.appendChild(d);setTimeout(()=>d.remove(),2900);}catch{}try{Audio393.sfx('levelup');}catch{}}
 return {COST,SUB,MAIN,oc,ocObj,keyOf,elig,plan,doOC,restore,refundOf,cands,xpStones,subVal,banner,st,open:()=>{ocMode=true;paint(true);},mode:()=>ocMode,state:()=>JSON.parse(JSON.stringify(S)),_set:o=>{S=Object.assign({v:1,g:{}},o);save();}};
})();window.OC17API=OC17;
