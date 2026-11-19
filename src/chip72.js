'use strict';
// V72b · CHIP GIAO THỨC cho Vũ khí tối thượng — thiết kế GPT (THIET_KE_GPT_DA_AB_VKTT.md, Câu 7), Claude lập trình 22/10/2026.
//  • Mỗi vũ khí 6 ô: Hỏa lực (vuông) ×2 · Cấu trúc (lục giác) ×2 · Mạch liên kết (tròn) ×2. Chỉ chip trên vũ khí CHỦ CHIẾN có tác dụng.
//  • 7 phẩm: Chế thức · Cải lương · Nguyên mẫu · Giao ước Nguyên mẫu · Chiến lược · Giao ước Chiến lược · Tuyệt mật. Chỉ bản Giao ước / Tuyệt mật tính bộ.
//  • Tham số chủ theo hình ô × hệ số phẩm × (cấp/50) + 1–3 dòng khuếch đại ngẫu nhiên. Trần chip +6% mỗi chỉ số; cả module trần +18%.
//  • 8 bộ (mỗi vũ khí 2 bộ), thưởng khi đủ 3 và 6 chip. Sản xuất (bảo hiểm 10 lần), Luyện 20×, Tái tạo 30× (khóa 1 dòng), Ghép 5→1, Nâng cấp, Phân giải.
//  • Mở ở ải 110. Cấp rơi 1–5 theo XP chip (nhiệm vụ ngày/tuần) và tiến độ ải (thay Tháp Boss).
const CHIP72={unlock:110,cap:500,
 q:[{n:'Chế thức',c:'#3ee08f',k:.25,l:1,set:0},{n:'Cải lương',c:'#3aa8ff',k:.4,l:1,set:0},{n:'Nguyên mẫu',c:'#b45cff',k:.6,l:2,set:0},{n:'Giao ước Nguyên mẫu',c:'#b45cff',k:.6,l:2,set:1},{n:'Chiến lược',c:'#ff9a2e',k:.85,l:3,set:0},{n:'Giao ước Chiến lược',c:'#ff9a2e',k:.85,l:3,set:1},{n:'Tuyệt mật',c:'#ffd23a',k:1,l:3,set:1}],
 sh:{fire:{n:'Hỏa lực',slot:'square',main:{atk:.006}},frame:{n:'Cấu trúc',slot:'hex',main:{hp:.006,armor:.006}},link:{n:'Mạch liên kết',slot:'round',main:{atk:.004,hp:.004,armor:.004}}},
 slots:['fire','fire','frame','frame','link','link'],
 aff:[{id:'atk',n:'Tấn công',min:.002,max:.006667,w:20},{id:'hp',n:'Máu',min:.002,max:.006667,w:15},{id:'armor',n:'Giáp',min:.002,max:.006667,w:15},
  {id:'skill',n:'Sát thương kỹ năng VKTT',min:.01,max:.04,w:15,cap:.15},{id:'charge',n:'Tốc sạc tối thượng (theo thời gian)',min:.005,max:.02,w:15,cap:.12},{id:'boss',n:'Sát thương kỹ năng lên boss',min:.01,max:.04,w:10,cap:.15},
  /* V307 Gemini lượt 2: dòng 7 chí mạng · dòng 8 quái tinh anh (khoảng theo phẩm, không nhân hệ số phẩm) */
  {id:'crit',n:'Sát thương chí mạng',qr:[[.012,.018],[.012,.018],[.02,.028],[.02,.028],[.032,.042],[.032,.042],[.05,.05]],w:12,cap:.20},
  {id:'elite',n:'Sát thương lên quái tinh anh',qr:[[.01,.015],[.01,.015],[.018,.024],[.018,.024],[.028,.035],[.028,.035],[.04,.04]],w:12,cap:.15}],
 tm307:{v:.015,lv:50,cap:.09},/* V307: chip Tuyệt mật cấp 50 trên vũ khí chủ chiến: +1,5% sát thương chuẩn toàn đội mỗi chip (tối đa 9%) */
 band:[[.6,0,.25],[.3,.25,.5],[.09,.5,.75],[.01,.75,1]],statCap:.06,
 sets:{fortress_1:{w:'fortress',n:'Thiên Tiệm',s3:'Mỗi pháo chặn thêm 1 đòn (trụ tối thượng +2)',s6:'Sạc tối thượng cần ít hơn 1 lần dùng bom'},
  fortress_2:{w:'fortress',n:'Trấn Áp',s3:'Pháo/trụ tồn tại +1 giây (tối đa 7)',s6:'Dùng bom: 1 pháo nhỏ thành trụ laser (3 giây)'},
  world_1:{w:'world',n:'Thời Luật',s3:'Tiếng nổ +8% (tối thượng +12%)',s6:'Tối thượng đầu trận: Bạo Tẩu + bất tử 2,5 giây (có boss: 1,5 giây)'},
  world_2:{w:'world',n:'Vĩnh Kiếp',s3:'Hồi bom thời gian −4 giây (tối thiểu 20)',s6:'Dừng quái thường +0,6 giây (tối thượng +1,2)'},
  hunter_1:{w:'hunter',n:'Cuồng Liệp',s3:'Gọi 2 lưỡi cưa, mỗi lưỡi 65% sát thương',s6:'Sạc tối thượng cần ít hơn 3 vật phẩm'},
  hunter_2:{w:'hunter',n:'Tài Quyết',s3:'Mỗi vật phẩm kéo cưa thêm 0,25 giây (tối đa 12)',s6:'Trọng thương +3% (tối đa 9%)'},
  web_1:{w:'web',n:'Huyền Ca',s3:'Lưới đang gây sát thương: mỗi 2 giây +1 Tinh thể (tối đa 3/trận)',s6:'Sau tối thượng đầu trận: sạc sẵn 20% lượt kế'},
  web_2:{w:'web',n:'Thiên Võng',s3:'Dùng bom gọi lưới cơ bản (hồi 45 giây)',s6:'Địch càng xa tâm lưới càng nhận thêm sát thương (tối đa +24%)'}},
 prod:{cry:100,cr:150,daily:50,pity:10},
 drop:[{xp:0,st:0,q:[.55,.30,.13,.02],mut:[.05,.10,0],lv:[.9,.1,0,0,0]},{xp:100,st:110,q:[.45,.33,.18,.04],mut:[.10,.15,0],lv:[.65,.30,.05,0,0]},{xp:300,st:130,q:[.35,.35,.23,.07],mut:[.20,.25,.01],lv:[.35,.40,.20,.05,0]},
  {xp:600,st:150,q:[.25,.35,.28,.12],mut:[.30,.40,.03],lv:[.15,.30,.35,.18,.02]},{xp:1000,st:170,q:[.15,.32,.33,.20],mut:[.40,.55,.05],lv:[.05,.15,.35,.30,.15]}],
 refine:{cry:20,cr:120,max:20,every:5,u:.75},rebuild:{coder:2,core:2,cr:250,max:30,every:10,u:.9},merge:{k:5,cr:200,up:{0:1,1:2,2:4}},
 salvage:[[15,0,0],[30,0,0],[50,1,1],[65,1,1],[85,2,2],[100,2,2],[130,3,3]],up:[[2,100],[4,150],[6,200],[8,250]],
 daily:{d:{boss:{cry:30},endless:{cry:30},task:{cry:30,coder:1,core:2,xp:20}},w:{ecl:{cry:100,coder:2,core:5,xp:30}}},
 gift:{cry:300,coder:2,core:4}};
const Chip72=(()=>{
 const C=CHIP72,U=ULT72,KEY='saobang-chip72-v1',ART=(typeof ULT72_ART!=='undefined'&&ULT72_ART)||{};
 const rd=()=>{try{const v=JSON.parse(localStorage.getItem(KEY)||'null');return v&&typeof v==='object'?v:{};}catch{return {};}};
 const S=Object.assign({v:1,ch:[],mat:{cry:0,coder:0,core:0},xp:0,pity:0,dday:'',gift:0,ser:0,last:[]},rd());if(!Array.isArray(S.ch))S.ch=[];S.mat=Object.assign({cry:0,coder:0,core:0},S.mat||{});
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const fmt=n=>Math.round(n).toLocaleString('vi-VN');
 const pc=v=>(Math.round(v*10000)/100).toLocaleString('vi-VN')+'%';
 const maxStage=()=>{try{const c=Progress.v70.cleared();return c.length?Math.max(...c):0;}catch{return 0;}};
 const unlocked=()=>maxStage()>=C.unlock||S.ch.length>0;
 const today=()=>new Date(Date.now()+7*3600000).toISOString().slice(0,10);
 const rnd=w=>{const s=w.reduce((a,b)=>a+b,0);let r=Math.random()*s;for(let i=0;i<w.length;i++){if(r<w[i])return i;r-=w[i];}return w.length-1;};
 const pick=a=>a[Math.floor(Math.random()*a.length)];
 const SETS=Object.keys(C.sets),SHAPES=Object.keys(C.sh);
 const dropLv=()=>{let k=0;C.drop.forEach((d,i)=>{if(S.xp>=d.xp&&maxStage()>=d.st)k=i;});return k;};
 // ---------- V193 · Phần II-B (Gemini 06/11): DÒNG KHUẾCH ĐẠI GẮN TÊN MÓN. Tắt: window.CHIP193=false ----------
 //  5 họ: ST thường / ST Bạo Tẩu (rổ cơ bản, cộng) · ST cuối / ST cuối Bạo Tẩu / TỔNG (rổ cuối, nhân riêng). (1+cơ bản)×(1+cuối) ≤ 1,14 chiến cơ · ≤ 1,35 tên lửa/vũ khí phụ.
 //  Một dòng mới có 50% là dòng gắn tên (Claude chọn; Gemini chưa nêu tỉ lệ trộn với 6 dòng cũ). Dòng giáp (hiệu lực nội tại) để V194.
 const V193=()=>window.CHIP193!==false;
 const NL={rs:[.30,.38,.48,.60,.74,.86,1],cap:{ship:1.14,weapon:1.35},share:.5,
  rsA:[.30,.42,.55,.68,.80,.90,1],capA:.25,capV:1.35,/* V195 (Gemini 06/11): giáp có thang phẩm riêng, trần +25% hiệu lực; TỔNG VKTT trần ×1,35 */
  f:{nd:{n:'ST thường',an:'Hiệu lực nội tại',b:0,sup:0,minQ:0,w:36,ship:[1.0,1.4],weapon:[4.0,5.5],armor:[2.5,4.0]},sd:{n:'ST Bạo Tẩu',an:'Hiệu lực Bạo Tẩu',b:0,sup:1,minQ:0,w:28,ship:[1.4,2.0],weapon:[5.0,7.0],armor:[3.5,5.5]},
   fd:{n:'ST cuối',an:'Hiệu lực nội tại (cuối)',b:1,sup:0,minQ:2,w:20,ship:[.9,1.3],weapon:[3.2,4.5],armor:[2.8,4.2]},fs:{n:'ST cuối Bạo Tẩu',an:'Hiệu lực Bạo Tẩu (cuối)',b:1,sup:1,minQ:3,w:12,ship:[1.3,1.8],weapon:[4.5,6.0],armor:[4.0,6.0]},
   all:{n:'TỔNG',b:1,sup:0,minQ:6,w:4,cat:{ships:[.8,1.4],missiles:[2.5,4.0],sidearms:[2.5,4.0],armors:[2.5,4.0],vktt:[3.5,5.5]}}}};
 const CATN={ships:'mọi chiến cơ',missiles:'mọi tên lửa',sidearms:'mọi vũ khí phụ',armors:'mọi giáp (hiệu lực nội tại)',vktt:'mọi vũ khí tối thượng'};
 const SETS36=()=>{try{return Campaign36.sets||[];}catch{return [];}};
 const tgts=()=>{const T=[];for(let i=0;i<13;i++)T.push('s'+i);for(const s of SETS36()){T.push('m:'+s[1]);T.push('d:'+s[2]);if(V195())T.push('a:'+s[0]);}return T;};
 const V195=()=>window.CHIP195!==false;
 const pickT=()=>{const g=pick(V195()?['s','m:','d:','a:']:['s','m:','d:']),L=tgts().filter(t=>g==='s'?t[1]!==':':t.startsWith(g));return pick(L);};
 const vKey=v=>{for(const s of SETS36()){if(s[0]===v)return 'a:'+v;if(s[1]===v)return 'm:'+v;if(s[2]===v)return 'd:'+v;}return null;};
 const tName=t=>{try{if(t[1]!==':')return Fighters28.profiles[+t.slice(1)].name;return GearCatalog[t.slice(2)].name;}catch{return t;}};
 const isNL=l=>!!(l&&NL.f[l.a]);
 const K=l=>l.t?l.a+':'+l.t:l.a;
 const curShip=()=>{try{return 's'+launchCraft;}catch{return null;}};
 const curGear=()=>{const o=[];try{const eq=Progress.v70.equipped();for(const k in eq){const it=Progress.v70.get(eq[k]);const vk=it&&vKey(it.variant);if(vk)o.push(vk);}}catch{}return o;};
 const isA=l=>String(l.t).startsWith('a:')||l.t==='armors';
 const LN=(l,star)=>{if(!isNL(l))return A(l.a).n;const f=NL.f[l.a];const s=f.cat?(l.t==='armors'?'Hiệu lực nội tại':f.n)+' '+CATN[l.t]:(isA(l)?f.an:f.n)+' '+tName(l.t);const on=star&&!f.cat&&(l.t===curShip()||curGear().includes(l.t));return s+(on?' ★ ĐANG DÙNG':'');};
 // ---------- tạo chip ----------
 function uRoll(minU){if(minU)return minU+Math.random()*(1-minU);const b=C.band[rnd(C.band.map(x=>x[0]))];return b[1]+Math.random()*(b[2]-b[1]);}
 function rollLine(ex,minU,q){if(V193()&&q!=null&&Math.random()<NL.share){const fs=Object.keys(NL.f).filter(k=>q>=NL.f[k].minQ);
   for(let g=0;g<30;g++){const k=fs[rnd(fs.map(x=>NL.f[x].w))],f=NL.f[k],t=f.cat?pick(Object.keys(f.cat).filter(c=>c!=='armors'||V195())):pickT();if(!t)break;if(k==='all'&&ex.some(e=>String(e).startsWith('all:')))continue;if(!ex.includes(k+':'+t))return {a:k,t,u:uRoll(minU)};}}
  const pool=C.aff.filter(a=>!ex.includes(a.id));const a=pool[rnd(pool.map(x=>x.w))];return {a:a.id,u:uRoll(minU)};}
 // V203 · ECON203 (Gemini 08/11): tẩy dòng khóa nhóm + ưu tiên món đang dùng + bảo hiểm 10 lần. Tắt: window.ECON203=false
 const E203={grp:['all','s','m:','d:','a:'],gn:{all:'Ngẫu nhiên','s':'Chiến cơ','m:':'Tên lửa','d:':'Vũ khí phụ','a:':'Giáp'},extra:1,named:.5,biasLock:.5,biasAll:.25,pity:10};
 const ON203=()=>window.ECON203!==false&&V193();
 let grp203='all';
 const inG=(t,g)=>g==='all'?true:g==='s'?String(t)[1]!==':':String(t).startsWith(g);
 const eqT203=g=>[curShip()].concat(curGear()).filter(t=>t&&inG(t,g)&&(V195()||!String(t).startsWith('a:')));
 const hit203=(l,g)=>!!(l&&isNL(l)&&!NL.f[l.a].cat&&eqT203(g).includes(l.t));
 function roll203(ex,q,g){const eq=eqT203(g),force=eq.length&&(S.pity203|0)>=E203.pity;
  if(force||Math.random()<E203.named){const fs=Object.keys(NL.f).filter(k=>q>=NL.f[k].minQ&&(!NL.f[k].cat||(g==='all'&&!force)));
   for(let n=0;n<40;n++){const k=fs[rnd(fs.map(x=>NL.f[x].w))],f=NL.f[k];let t;
    if(f.cat){if(ex.some(e=>String(e).startsWith('all:')))continue;t=pick(Object.keys(f.cat).filter(c=>c!=='armors'||V195()));}
    else{const b=g==='all'?E203.biasAll:E203.biasLock;if(eq.length&&(force||Math.random()<b))t=pick(eq);else{const L=tgts().filter(x=>inG(x,g));t=pick(L);}}
    if(t&&!ex.includes(k+':'+t))return {a:k,t,u:0};}}
  return rollLine(ex,0,null);}/* q=null → chỉ dòng chung */
 function lines(q,keep=[]){const L=keep.slice();while(L.length<C.q[q].l)L.push(rollLine(L.map(K),0,q));return L;}
 function gen(o={}){const D=C.drop[o.dl!=null?o.dl:dropLv()];let q=o.q;
  if(q==null){const b=rnd(D.q);q=b===0?0:b===1?1:b===2?(Math.random()<D.mut[0]?3:2):(Math.random()<D.mut[1]?(Math.random()<D.mut[2]?6:5):4);}
  if(V191()&&q===6&&o.q==null&&maxStage()<UNL191.top)q=5;/* V191: Tuyệt mật mở ở ải 145 */
  const c={id:'c'+Date.now().toString(36)+(++S.ser).toString(36),q,sh:o.sh||pick(SHAPES),set:null,lv:o.lv||10*(1+rnd(D.lv)),ln:[],eq:null,lock:0,ref:0,reb:0,rbi:null,spent:0,mod:0};
  if(C.q[q].set)c.set=o.set||pick(SETS);c.ln=lines(q);return c;}
 const A=id=>C.aff.find(a=>a.id===id);
 const lval=(c,l)=>{if(isNL(l)){const f=NL.f[l.a],A_=isA(l),r=f.cat?f.cat[l.t]:(A_?f.armor:String(l.t)[1]===':'?f.weapon:f.ship);return r?(r[0]+(r[1]-r[0])*l.u)/100*(A_?NL.rsA:NL.rs)[c.q]:0;}const a=A(l.a);if(a.qr){const r=a.qr[c.q];return r[0]+(r[1]-r[0])*l.u;}return (a.min+(a.max-a.min)*l.u)*C.q[c.q].k;};
 const mval=(c,st)=>(C.sh[c.sh].main[st]||0)*C.q[c.q].k*(c.lv/50);
 const room=()=>S.ch.length<C.cap;
 // ---------- tổng hợp trên vũ khí ----------
 const onW=w=>S.ch.filter(c=>c.eq&&c.eq.w===w);
 function agg(w){const T={atk:0,hp:0,armor:0,skill:0,charge:0,boss:0,crit:0,elite:0,tm:0,set:{},nl:[]};for(const c of onW(w)){if(c.q===6&&c.lv>=C.tm307.lv)T.tm+=C.tm307.v;for(const st of ['atk','hp','armor'])T[st]+=mval(c,st);for(const l of c.ln){if(isNL(l))T.nl.push([l.a,l.t,lval(c,l)]);else T[l.a]+=lval(c,l);}if(C.q[c.q].set&&c.set&&C.sets[c.set].w===w)T.set[c.set]=(T.set[c.set]|0)+1;}
  for(const st of ['atk','hp','armor'])T[st]=Math.min(C.statCap,T[st]);for(const a of C.aff)if(a.cap)T[a.id]=Math.min(a.cap,T[a.id]);T.tm=Math.min(C.tm307.cap,T.tm);return T;}
 let cache=null,cAt=0;const mainAgg=()=>{const now=performance.now();if(cache&&now-cAt<500)return cache;const m=Ult72.mainW();cache=m?agg(m):{atk:0,hp:0,armor:0,skill:0,charge:0,boss:0,crit:0,elite:0,tm:0,set:{},nl:[]};cAt=now;return cache;};
 const bump=()=>{cache=null;try{Combat.render&&Combat.render();}catch{}};
 // ---- V193 · hệ số trong trận (chỉ chip của vũ khí CHỦ CHIẾN) ----
 const sup193=()=>{try{return superTime>0;}catch{return false;}};
 function nlMult(ids,cat,cap){const T=mainAgg();if(!V193()||!T.nl||!T.nl.length)return 1;const sp=sup193();let best=null;
  for(const id of ids){let b=0,f=0;for(const [a,t,v] of T.nl){const F=NL.f[a];if(F.cat||t!==id||(F.sup&&!sp))continue;if(F.b)f+=v;else b+=v;}if(!best||(1+b)*(1+f)>(1+best.b)*(1+best.f))best={b,f};}
  let all=0;for(const [a,t,v] of T.nl)if(NL.f[a].cat&&t===cat)all+=v;const m=(1+(best?best.b:0))*(1+(best?best.f:0)+all);return cap?Math.min(cap,m):m;}
 let sc193={t:0,k:'',v:1};
 function shipM(){const now=performance.now(),k=curShip()+'|'+sup193();if(now-sc193.t<250&&sc193.k===k)return sc193.v;sc193={t:now,k,v:nlMult([curShip()],'ships',NL.cap.ship)};return sc193.v;}
 const gc193={};
 function gearM(it){if(!it||it.kind==='armor')return 1;const now=performance.now(),k=it.variant+'|'+sup193(),o=gc193[k];if(o&&now-o.t<250)return o.v;
  const vk=vKey(it.variant);let v=1;if(vk){const pre=vk.slice(0,2),cat=pre==='m:'?'missiles':'sidearms';let ids=[vk];
   try{const kind=pre==='m:'?'missiles':'sidearm',sid=Gear44.activeId(kind),d=sid&&Gear44.defs().find(x=>x.id===sid);if(d&&d.parents&&d.parents.includes(it.variant))ids=d.parents.map(p=>vKey(p)).filter(Boolean);}catch{}
   v=nlMult(ids,cat,NL.cap.weapon);}gc193[k]={t:now,v};return v;}
 // V195 · hiệu lực nội tại giáp: x = Σ mọi dòng của giáp (Bạo Tẩu chỉ khi đang Bạo Tẩu) + TỔNG mọi giáp; SSS lấy max 2 giáp mẹ; trần +25%
 const ac195={};
 function armorEff(variant){if(!V195())return 1;const sp=sup193(),k=variant+'|'+sp,now=performance.now(),o=ac195[k];if(o&&now-o.t<250)return o.v;
  const T=mainAgg();let v=1;if(T.nl&&T.nl.length){let ids=['a:'+variant];try{const sid=Gear44.activeId('armor'),d=sid&&Gear44.defs().find(x=>x.id===sid);if(d&&d.parents&&(sid===variant||d.parents.includes(variant)))ids=d.parents.map(p=>'a:'+p);}catch{}
   let best=0;for(const id of ids){let x=0;for(const [a,t,val] of T.nl){const F=NL.f[a];if(F.cat||t!==id||(F.sup&&!sp))continue;x+=val;}best=Math.max(best,x);}
   let all=0;for(const [a,t,val] of T.nl)if(NL.f[a].cat&&t==='armors')all+=val;v=1+Math.min(NL.capA,best+all);}
  ac195[k]={t:now,v};return v;}
 window.CHIPARM195=v=>{try{return armorEff(v);}catch{return 1;}};
 const inBattle=()=>{try{return mode==='play'||mode==='pause';}catch{return false;}};
 function inst193(it){if(!it||typeof it!=='object'||it.__c193||it.kind==='armor'||typeof it.auxDamage!=='number')return;let base=it.auxDamage;
  try{Object.defineProperty(it,'__c193',{value:1});Object.defineProperty(it,'auxDamage',{configurable:true,enumerable:true,get(){return inBattle()?base*gearM(it):base;},set(v){const m=inBattle()?gearM(it):1;base=m?v/m:v;}});}catch{}}
 try{const ost=Progress.stats;Progress.stats=function(){const r=ost.apply(this,arguments);try{if(V193()&&r){for(const it of (r.auxiliary||[]))inst193(it);for(const it of (r.equipment||[]))inst193(it);}}catch{}return r;};}catch{}
 // móc vào Ult72
 const X=Ult72.X;X.stat=st=>mainAgg()[st]||0;X.mod=k=>{let v=mainAgg()[k]||0;if(k==='skill'&&ON307())v=(1+v)*(1+critEV())-1;if(k==='skill'&&V193()){const a=nlMult([],'vktt',V195()?NL.capV:0);if(a!==1)return (1+v)*a-1;}return v;};X.has=(set,n)=>(mainAgg().set[set]|0)>=n;X.crystal=n=>{S.mat.cry+=n|0;save();};
 X.onClaim=(kind,k)=>{if(!unlocked())return;const o=C.daily[kind]&&C.daily[kind][k];if(!o)return;for(const m of ['cry','coder','core'])if(o[m])S.mat[m]+=o[m];if(o.xp)S.xp+=o.xp;save();};
 // ---- V307 · dòng chí mạng / tinh anh / Tuyệt mật (tắt: window.CHIP307=false) ----
 const ON307=()=>window.CHIP307!==false;
 // Chí mạng gốc (CRIT66) chuẩn hóa trung bình → dòng chip nhân riêng lên đòn chí mạng sau khi đã chuẩn hóa (tăng thật = tỉ lệ chí mạng × dòng)
 try{const os=shot;shot=function(){const r=os.apply(this,arguments);try{const sh=shots.at(-1);if(ON307()&&sh&&sh.crit66&&!sh.c307){sh.c307=1;const v=mainAgg().crit||0;if(v>0)sh.damage*=1+v;}}catch{}return r;};}catch{}
 const critEV=()=>{try{return (CRIT66.chance||0)*(mainAgg().crit||0);}catch{return 0;}};
 // Tinh anh: giảm máu quái tinh anh lúc xuất hiện = +x% sát thương lên chúng (mọi nguồn)
 try{const oa=addEnemy;const f=function(e){const r=oa.apply(this,arguments);try{if(ON307()&&e&&e.elite&&!e.bossPart&&e!==boss&&!e.__c307){e.__c307=1;const v=mainAgg().elite||0;if(v>0){e.hp/=1+v;e.maxHp=e.hp;if(e.guard)e.guard/=1+v;}}}catch{}return r;};window.addEnemy=f;try{addEnemy=f;}catch{}}catch{}
 // Tuyệt mật: nhân sát thương toàn đội (ngoài trần khuếch đại)
 const tm=()=>ON307()?(mainAgg().tm||0):0;
 try{const of=Combat.factor;Combat.factor=function(){const v=of.apply(this,arguments);try{return v*(1+tm());}catch{return v;}};}catch{}
 try{const ost=Combat.stats;Combat.stats=function(){const r=ost.apply(this,arguments);try{const b=tm();if(r&&b>0){const a0=r.attack;r.attack*=1+b;r.cp=Math.round(r.cp+(r.attack-a0)*24);}}catch{}return r;};}catch{}
 // ---------- thao tác ----------
 function equip(id,w,slot){const c=S.ch.find(x=>x.id===id);if(!c||C.slots[slot]!==c.sh)return false;for(const x of S.ch)if(x.eq&&x.eq.w===w&&x.eq.s===slot)x.eq=null;c.eq={w,s:slot};save();bump();return true;}
 function unequip(id){const c=S.ch.find(x=>x.id===id);if(!c||!c.eq)return false;c.eq=null;save();bump();return true;}
 function produce(n=1){const out=[];for(let i=0;i<n;i++){if(!room()){toast('KHO CHIP ĐẦY ('+C.cap+')');break;}const disc=S.dday!==today(),cry=disc?C.prod.daily:C.prod.cry;
   if(S.mat.cry<cry){if(!out.length)toast('THIẾU TINH THỂ · cần '+cry);break;}if(Progress.balance()<C.prod.cr){if(!out.length)toast('THIẾU HỢP KIM');break;}if(!Progress.spendCredits(C.prod.cr))break;
   S.mat.cry-=cry;if(disc)S.dday=today();S.pity++;let c;if(S.pity>=C.prod.pity){S.pity=0;const dl=dropLv();const m=Ult72.mainW();const set=m?pick(SETS.filter(s=>C.sets[s].w===m)):pick(SETS);c=gen({q:dl<=1?3:5,set});}else c=gen();
   S.ch.push(c);out.push(c);}S.last=out.map(c=>c.id);save();return out;}
 const canUse=c=>!c.eq&&!c.lock;
 function salvage(ids){let g={cry:0,coder:0,core:0},n=0;for(const id of ids){const c=S.ch.find(x=>x.id===id);if(!c||!canUse(c))continue;const r=C.salvage[c.q];g.cry+=r[0];g.coder+=r[1];g.core+=r[2]+Math.floor((c.spent|0)/2);S.ch=S.ch.filter(x=>x!==c);n++;}
  for(const k in g)S.mat[k]+=g[k];save();bump();return Object.assign(g,{n});}
 function upgrade(id){const c=S.ch.find(x=>x.id===id);if(!c||c.lv>=50)return false;const u=C.up[c.lv/10-1];if(S.mat.core<u[0]){toast('THIẾU LÕI CHIP · cần '+u[0]);return false;}if(Progress.balance()<u[1]){toast('THIẾU HỢP KIM');return false;}if(!Progress.spendCredits(u[1]))return false;S.mat.core-=u[0];c.spent=(c.spent|0)+u[0];c.lv+=10;save();bump();return true;}
 let cand=null;// {id,idx,line,kind}
 // ---- V191 · Gemini 06/11: TẨY THÔNG SỐ (giữ loại dòng, quay lại giá trị · tinh thể) và TẨY DÒNG (đổi loại dòng, giữ phẩm chất · bộ mã hóa + lõi chip).
 //  Chi phí 3 nấc theo số lượt (không khóa cứng, quá nấc cuối giữ giá trần). Số Gemini (3.000 hợp kim, 2 tinh thể…) không cùng thang → quy về giá cũ ×1 / ×2 / ×4.
 //  Mở khóa: ải 110 lắp chip + tẩy thông số · ải 125 tẩy dòng · ải 145 chip Tuyệt mật. Tắt cả: window.CHIP191=false
 const V191=()=>window.CHIP191!==false;
 const CAL191=[{to:10,cry:20,cr:120,core:0,gem:0,floor:0},{to:20,cry:40,cr:300,core:1,gem:0,floor:.45},{to:1e9,cry:80,cr:600,core:1,gem:25,floor:.70}];
 const RRT191=[{to:10,coder:2,core:2,cr:250,gem:0},{to:20,coder:3,core:3,cr:500,gem:15},{to:1e9,coder:4,core:4,cr:1000,gem:30}];
 const UNL191={cal:110,type:125,top:145};
 const tier191=(T,n)=>T.find(t=>n<=t.to);
 const gemOK=n=>{if(!n)return true;try{return Econ74.spend(n);}catch{toast('KHÔNG TIÊU ĐƯỢC KIM CƯƠNG');return false;}};
 function calib(id,idx){const c=S.ch.find(x=>x.id===id);if(!c||c.q<2){toast('CHỈ CHIP TỪ NGUYÊN MẪU TRỞ LÊN');return null;}if(c.lock){toast('CHIP ĐANG KHÓA BẢO VỆ');return null;}
  c.cal=c.cal||[];const n=(c.cal[idx]||0)+1,T=tier191(CAL191,n);
  if(S.mat.cry<T.cry){toast('THIẾU TINH THỂ · cần '+T.cry);return null;}if(S.mat.core<T.core){toast('THIẾU LÕI CHIP · cần '+T.core);return null;}if(Progress.balance()<T.cr){toast('THIẾU HỢP KIM');return null;}
  if(T.gem){let g=0;try{g=Econ74.gems();}catch{g=0;}if(g<T.gem){toast('THIẾU KIM CƯƠNG · cần '+T.gem+' 💎');return null;}}
  if(!Progress.spendCredits(T.cr))return null;if(!gemOK(T.gem))return null;S.mat.cry-=T.cry;S.mat.core-=T.core;c.cal[idx]=n;c.mod=1;
  const old=c.ln[idx];cand={id,idx,line:Object.assign({},old,{u:uRoll(T.floor||0)}),kind:'cal'};save();return cand;}
 function retype(id,idx){const g=ON203()?grp203:'all',xc=g==='all'?0:E203.extra;const c=S.ch.find(x=>x.id===id);if(!c||c.q<2){toast('CHỈ CHIP TỪ NGUYÊN MẪU TRỞ LÊN');return null;}if(c.lock){toast('CHIP ĐANG KHÓA BẢO VỆ');return null;}
  if(maxStage()<UNL191.type){toast('TẨY DÒNG MỞ Ở ẢI '+UNL191.type);return null;}
  const n=(c.reb||0)+1,T=tier191(RRT191,n);if(S.mat.coder<T.coder+xc||S.mat.core<T.core){toast('THIẾU BỘ MÃ HÓA / LÕI CHIP · cần '+(T.coder+xc)+' / '+T.core);return null;}if(Progress.balance()<T.cr){toast('THIẾU HỢP KIM');return null;}
  if(T.gem){let g=0;try{g=Econ74.gems();}catch{g=0;}if(g<T.gem){toast('THIẾU KIM CƯƠNG · cần '+T.gem+' 💎');return null;}}
  if(!Progress.spendCredits(T.cr))return null;if(!gemOK(T.gem))return null;S.mat.coder-=T.coder+xc;S.mat.core-=T.core;c.reb=n;c.mod=1;
  const old=c.ln[idx],ex=c.ln.filter((_,j)=>j!==idx).map(K);const nl=ON203()?roll203(ex.concat([K(old)]),c.q,g):rollLine(ex.concat([K(old)]),0,c.q);nl.u=old.u;if(ON203()){if(hit203(nl,g))S.pity203=0;else if(eqT203(g).length)S.pity203=(S.pity203|0)+1;}/* giữ phẩm chất (u) */cand={id,idx,line:nl,kind:'type'};save();return cand;}
 function costTxt191(c,idx,k){if(k==='cal'){const n=((c.cal||[])[idx]||0)+1,T=tier191(CAL191,n);return 'lượt '+n+' · '+T.cry+' tinh thể'+(T.core?' + '+T.core+' lõi':'')+' + '+T.cr+' ◈'+(T.gem?' + '+T.gem+' 💎':'')+(T.floor?' · đảm bảo ≥'+Math.round(T.floor*100)+'%':'');}
  const n=(c.reb||0)+1,T=tier191(RRT191,n),xc=ON203()&&grp203!=='all'?E203.extra:0;return 'lượt '+n+' · '+(T.coder+xc)+' mã hóa + '+T.core+' lõi + '+T.cr+' ◈'+(T.gem?' + '+T.gem+' 💎':'');}
 function refine(id,idx){const c=S.ch.find(x=>x.id===id);if(!c||c.q<2){toast('CHỈ CHIP TỪ NGUYÊN MẪU TRỞ LÊN');return null;}if(c.ref>=C.refine.max){toast('ĐÃ HẾT '+C.refine.max+' LẦN LUYỆN');return null;}if(c.lock){toast('CHIP ĐANG KHÓA BẢO VỆ');return null;}
  if(S.mat.cry<C.refine.cry){toast('THIẾU TINH THỂ · cần '+C.refine.cry);return null;}if(Progress.balance()<C.refine.cr){toast('THIẾU HỢP KIM');return null;}if(!Progress.spendCredits(C.refine.cr))return null;S.mat.cry-=C.refine.cry;c.ref++;c.mod=1;
  const ex=c.ln.filter((_,j)=>j!==idx).map(K);const ln=rollLine(ex,c.ref%C.refine.every===0?C.refine.u:0,c.q);cand={id,idx,line:ln,kind:'ref'};save();return cand;}
 function rebuild(id,idx){const c=S.ch.find(x=>x.id===id);if(!c||c.q<2){toast('CHỈ CHIP TỪ NGUYÊN MẪU TRỞ LÊN');return null;}if(c.reb>=C.rebuild.max){toast('ĐÃ HẾT '+C.rebuild.max+' LẦN TÁI TẠO');return null;}if(c.lock){toast('CHIP ĐANG KHÓA BẢO VỆ');return null;}
  if(c.rbi!=null)idx=c.rbi;const R=C.rebuild;if(S.mat.coder<R.coder||S.mat.core<R.core){toast('THIẾU BỘ MÃ HÓA / LÕI CHIP');return null;}if(Progress.balance()<R.cr){toast('THIẾU HỢP KIM');return null;}if(!Progress.spendCredits(R.cr))return null;
  S.mat.coder-=R.coder;S.mat.core-=R.core;c.reb++;c.mod=1;if(c.rbi==null)c.rbi=idx;c.ref=0;const ex=c.ln.filter((_,j)=>j!==idx).map(K);const ln=rollLine(ex,c.reb%R.every===0?R.u:0,c.q);cand={id,idx,line:ln,kind:'reb'};save();return cand;}
 function accept(take){if(!cand)return;const c=S.ch.find(x=>x.id===cand.id);if(c&&take)c.ln[cand.idx]=cand.line;cand=null;save();bump();}
 function mergeable(q,sh){return S.ch.filter(c=>c.q===q&&c.sh===sh&&canUse(c)&&!c.mod);}
 function merge(q,sh){const up=C.merge.up[q];if(up==null){toast('PHẨM NÀY KHÔNG GHÉP ĐƯỢC');return null;}const L=mergeable(q,sh).sort((a,b)=>a.lv-b.lv);if(L.length<C.merge.k){toast('CẦN '+C.merge.k+' CHIP CÙNG PHẨM, CÙNG HÌNH');return null;}
  if(Progress.balance()<C.merge.cr){toast('THIẾU HỢP KIM');return null;}if(!Progress.spendCredits(C.merge.cr))return null;const use=L.slice(0,C.merge.k),lv=Math.min(...use.map(c=>c.lv));const ids=new Set(use.map(c=>c.id));S.ch=S.ch.filter(c=>!ids.has(c.id));
  const c=gen({q:up,sh,lv});S.ch.push(c);save();return c;}
 function toggleLock(id){const c=S.ch.find(x=>x.id===id);if(!c)return;c.lock=c.lock?0:1;save();}
 function giftCheck(){if(S.gift||maxStage()<C.unlock)return;S.gift=1;for(const k in C.gift)S.mat[k]+=C.gift[k];save();}
 setInterval(()=>{try{giftCheck();}catch{}},3000);
 // ---------- giao diện ----------
 let el=null,W=null,sel=null,filt='all';
 function build(){el=document.createElement('div');el.className='m63 adv69 u72 c72';el.hidden=true;document.body.appendChild(el);
  el.addEventListener('click',e=>{const t=e.target.closest('[data-a]');if(!t){if(e.target===el)close();return;}const a=t.dataset.a,v=t.dataset.v;
   if(a==='close')close();else if(a==='back'){close();try{Ult72.open();}catch{}}else if(a==='home')home();
   else if(a==='sock')picker(+v);else if(a==='eq'){const [id,s]=v.split('|');equip(id,W,+s);home();}else if(a==='uneq'){unequip(v);home();}
   else if(a==='det')detail(v);else if(a==='inv'){filt=v||filt;inv();}else if(a==='forge')forge();
   else if(a==='prod'){const out=produce(+v);if(out.length)band('SẢN XUẤT '+out.length+' CHIP');forge();}
   else if(a==='up'){if(upgrade(v))band('NÂNG CẤP CHIP');detail(v);}else if(a==='lock'){toggleLock(v);detail(v);}
   else if(a==='sal'){const g=salvage([v]);if(g.n)band('PHÂN GIẢI · +'+g.cry+' TINH THỂ');inv();}
   else if(a==='salq'){const ids=S.ch.filter(c=>canUse(c)&&!c.mod&&c.q<=+v&&!C.q[c.q].set).map(c=>c.id);const g=salvage(ids);band('PHÂN GIẢI '+g.n+' CHIP · +'+g.cry+' TINH THỂ');inv();}
   else if(a==='ref'||a==='reb'){const [id,i]=v.split('|');const r=a==='ref'?refine(id,+i):rebuild(id,+i);if(r)candPanel();else detail(id);}
   else if(a==='g203'){grp203=v||'all';const d=el.querySelector('.g203');if(d)d.outerHTML=grpBox203();el.querySelectorAll('[data-a="typ"]').forEach(b=>{const [id,j]=b.dataset.v.split('|');const c=S.ch.find(x=>x.id===id);const sm=b.querySelector('small');if(c&&sm)sm.textContent=costTxt191(c,+j,'type');});}
   else if(a==='cal'||a==='typ'){const [id,j]=v.split('|');const r=a==='cal'?calib(id,+j):retype(id,+j);if(r)candPanel();}
   else if(a==='keep190'||a==='take190'){warn190=a==='keep190'?'keep':'take';candPanel();}
   else if(a==='take'||a==='keep'){warn190=null;const id=cand&&cand.id;accept(a==='take');detail(id);}
   else if(a==='mg'){const [q,sh]=v.split('|');const c=merge(+q,sh);if(c)band('GHÉP → '+C.q[c.q].n.toUpperCase());forge();}});}
 function close(){if(el)el.hidden=true;}
 function band(t){const b=document.createElement('div');b.className='adv-band';b.textContent=t;document.body.appendChild(b);setTimeout(()=>b.remove(),1600);try{tone(880,.18,'triangle',.06);}catch{}}
 function chipIc(c,cls=''){const body=ART['chip_body_'+c.sh],sym=c.set?ART['chip_'+c.set]:null,col=C.q[c.q].c;
  return `<span class="c72-ic ${cls}" style="--qc:${col}">${body?`<img class="bd" src="${body}" alt="">`:'<i class="bd"></i>'}${sym?`<img class="sy" src="${sym}" alt="">`:''}<b>${c.lv}</b>${c.lock?'<u>🔒</u>':''}</span>`;}
 const matRow=()=>`<div class="c72-mat">${[['cry','chip_mat_energy','Tinh thể'],['coder','chip_mat_coder','Bộ mã hóa'],['core','chip_mat_core','Lõi chip']].map(([k,ic,n])=>`<span title="${n}">${ART[ic]?`<img src="${ART[ic]}" alt="">`:''}<b>${fmt(S.mat[k])}</b><small>${n}</small></span>`).join('')}</div>`;
 function lineTxt(c,l,j){return `<li class="${c.rbi===j?'lk':''}${isNL(l)?' nl193':''}">${esc(LN(l,1))} <b>+${pc(lval(c,l))}</b>${c.rbi===j?' <i>(khóa tái tạo)</i>':''}</li>`;}
 function mainTxt(c){return ['atk','hp','armor'].filter(st=>C.sh[c.sh].main[st]).map(st=>({atk:'Tấn công',hp:'Máu',armor:'Giáp'})[st]+' +'+pc(mval(c,st))).join(' · ');}
 function home(){if(!el)build();if(!unlocked()){el.innerHTML=`<div class="m63-card adv-card u72-card"><div class="m63-eye">CHIP GIAO THỨC</div><h3>Mở khóa ở ải ${C.unlock}</h3><p class="adv-max">Vượt ải ${C.unlock} để mở chip cho vũ khí tối thượng (tặng ${C.gift.cry} tinh thể, ${C.gift.coder} bộ mã hóa, ${C.gift.core} lõi chip).</p><div class="adv-btns"><button class="adv-x" data-a="back">‹ VŨ KHÍ</button></div></div>`;el.hidden=false;return;}
  const isMain=Ult72.mainW()===W,T=agg(W),L=onW(W);
  const socks=C.slots.map((sh,i)=>{const c=L.find(x=>x.eq.s===i);const bg=ART['mod_slot_'+C.sh[sh].slot];return `<button class="c72-sk" data-a="sock" data-v="${i}">${bg?`<img class="bg" src="${bg}" alt="">`:''}${c?chipIc(c):`<small>${C.sh[sh].n}</small>`}</button>`;}).join('');
  const sets=SETS.filter(s=>C.sets[s].w===W).map(s=>{const n=T.set[s]|0,S_=C.sets[s];return `<div class="c72-set ${n>=3?'on':''}">${ART['chip_'+s]?`<img src="${ART['chip_'+s]}" alt="">`:''}<div><b>${S_.n} <em>${n}/6</em></b><small class="${n>=3?'on':''}">(3) ${esc(S_.s3)}</small><small class="${n>=6?'on':''}">(6) ${esc(S_.s6)}</small></div></div>`;}).join('');
  el.innerHTML=`<div class="m63-card adv-card u72-card"><div class="m63-eye">CHIP GIAO THỨC · ${esc(U.nm[W].toUpperCase())}</div><h3>${isMain?'':'<span class="c72-warn">Chỉ có tác dụng khi là CHỦ CHIẾN</span>'}</h3>${matRow()}
   <div class="c72-socks">${socks}</div>
   <div class="adv-cmp"><div><i>CHỈ SỐ TỪ CHIP</i>Tấn công +${pc(T.atk)} · Máu +${pc(T.hp)} · Giáp +${pc(T.armor)} <small>(trần ${pc(C.statCap)})</small></div><div><i>KỸ NĂNG</i>ST +${pc(T.skill)} · Sạc +${pc(T.charge)} · Lên boss +${pc(T.boss)}${T.crit?' · Chí mạng +'+pc(T.crit):''}${T.elite?' · Tinh anh +'+pc(T.elite):''}${T.tm?' · <b style="color:#ffd23a">Tuyệt mật +'+pc(T.tm)+' toàn đội</b>':''}</div></div>
   ${typeof TapBan200!=='undefined'&&TapBan200.on()?TapBan200.btn:''}${nlBox193(T)}<div class="c72-sets">${sets}</div>
   <div class="adv-btns"><button class="adv-x" data-a="back">‹ VŨ KHÍ</button><button class="adv-x" data-a="inv" data-v="all">KHO CHIP · ${S.ch.length}</button><button class="m63-go" data-a="forge">LÒ SẢN XUẤT</button></div></div>`;el.hidden=false;}
 function nlBox193(T){if(!V193()||!T.nl||!T.nl.length)return '';const G={};for(const [a,t,v] of T.nl){const f=NL.f[a];const key=f.cat?'all:'+t:t;const g=G[key]=G[key]||{t,cat:!!f.cat,b:0,bs:0,f:0,fs:0};
   if(f.cat)g.f+=v;else if(f.b)(f.sup?g.fs+=v:g.f+=v);else (f.sup?g.bs+=v:g.b+=v);}
  const cs=curShip(),cg=curGear();const row=g=>{const nm=g.cat?'Tổng '+CATN[g.t]:tName(g.t),on=!g.cat&&(g.t===cs||cg.includes(g.t));const p=[];const ar=String(g.t).startsWith('a:')||g.t==='armors';if(ar){const n=g.b+g.f,bt=g.bs+g.fs;if(n)p.push('hiệu lực +'+pc(n));if(bt)p.push('khi Bạo Tẩu +'+pc(bt));p.push('trần +25%');return `<div class="${on?'on':''}">${on?'★ ':''}<b>${esc(nm)}</b> <small>${p.join(' · ')}</small></div>`;}if(g.b)p.push('thường +'+pc(g.b));if(g.bs)p.push('Bạo Tẩu +'+pc(g.bs));if(g.f)p.push('cuối +'+pc(g.f));if(g.fs)p.push('cuối BT +'+pc(g.fs));
   return `<div class="${on?'on':''}">${on?'★ ':''}<b>${esc(nm)}</b> <small>${p.join(' · ')}</small></div>`;};
  const L=Object.values(G).sort((a,b)=>{const oa=!a.cat&&(a.t===cs||cg.includes(a.t))?0:1,ob=!b.cat&&(b.t===cs||cg.includes(b.t))?0:1;return oa-ob;});
  return `<div class="adv-req-t">KHUẾCH ĐẠI THEO MÓN</div><div class="nl193">${L.map(row).join('')}</div><p class="adv-cost">★ = món đang dùng. Trần: chiến cơ +${Math.round((NL.cap.ship-1)*100)}% · tên lửa / vũ khí phụ +${Math.round((NL.cap.weapon-1)*100)}%.</p>`;}
 // V202 · so sánh khi gắn chip (GPT rà soát V199 mục 3–4): lực chiến nếu lắp + số dòng có tác dụng với tàu/trang bị đang dùng. Tắt: window.CMP202=false
 function cpIf202(id,w,slot){const bk=S.ch.map(x=>[x,x.eq]);let cp=null;try{const c=S.ch.find(x=>x.id===id);for(const x of S.ch)if(x.eq&&x.eq.w===w&&x.eq.s===slot)x.eq=null;if(c)c.eq={w,s:slot};bump();cp=Combat.stats().cp;}catch{}for(const [x,e] of bk)x.eq=e;bump();return cp;}
 function live202(c){const cs=curShip(),cg=curGear();return c.ln.filter(l=>!isNL(l)||NL.f[l.a].cat||l.t===cs||cg.includes(l.t)).length;}
 function cmp202(c,slot,cp0){if(window.CMP202===false)return '';const cp=cpIf202(c.id,W,slot);const d=cp==null||cp0==null?0:Math.round(cp-cp0);const n=live202(c);
  return `<em class="d202 ${d>0?'up':d<0?'dn':''}">${d>0?'▲ +'+d:d<0?'▼ '+d:'= 0'} lực chiến · ${n}/${c.ln.length} dòng có tác dụng</em>`;}
 function picker(slot){const sh=C.slots[slot],cur=onW(W).find(c=>c.eq.s===slot);const L=S.ch.filter(c=>c.sh===sh&&!(c.eq&&c.eq.w===W&&c.eq.s===slot)).sort((a,b)=>(a.eq?1:0)-(b.eq?1:0)||(C.q[b.q].set&&b.set&&C.sets[b.set].w===W?1:0)-(C.q[a.q].set&&a.set&&C.sets[a.set].w===W?1:0)||b.q-a.q||b.lv-a.lv);
  let cp0=null;try{cp0=Combat.stats().cp;}catch{}const ismain=Ult72.mainW()===W;
  el.innerHTML=`<div class="m63-card adv-card u72-card"><div class="m63-eye">Ô ${slot+1} · ${C.sh[sh].n.toUpperCase()}</div><h3>Chọn chip</h3>${ismain?'':'<p class="adv-max">Chip chỉ có tác dụng khi lắp trên vũ khí CHỦ CHIẾN.</p>'}
   ${cur?`<div class="c72-row cur">${chipIc(cur)}<div><b style="color:${C.q[cur.q].c}">${esc(C.q[cur.q].n)}${cur.set?' · '+esc(C.sets[cur.set].n):''}</b><small>${mainTxt(cur)}</small></div><button data-a="uneq" data-v="${cur.id}">THÁO</button></div>`:''}
   <div class="st71-list">${L.slice(0,60).map(c=>`<div class="c72-row">${chipIc(c)}<div><b style="color:${C.q[c.q].c}">${esc(C.q[c.q].n)}${c.set?' · '+esc(C.sets[c.set].n):''}</b><small>${mainTxt(c)} · ${c.ln.map(l=>esc(LN(l,1))+' +'+pc(lval(c,l))).join(' · ')}${c.eq?' · <u>đang lắp ở '+esc(U.nm[c.eq.w])+'</u>':''}</small>${ismain?cmp202(c,slot,cp0):''}</div><button data-a="eq" data-v="${c.id}|${slot}">LẮP</button></div>`).join('')||'<p class="adv-max">Chưa có chip hình '+C.sh[sh].n+'. Vào Lò sản xuất.</p>'}</div>
   <div class="adv-btns"><button class="adv-x" data-a="home">‹ QUAY LẠI</button><button class="m63-go" data-a="forge">LÒ SẢN XUẤT</button></div></div>`;el.hidden=false;}
 function detail(id){const c=S.ch.find(x=>x.id===id);if(!c)return inv();const up=c.lv<50?C.up[c.lv/10-1]:null;const adv=c.q>=2;
  el.innerHTML=`<div class="m63-card adv-card u72-card"><div class="m63-eye">CHIP · ${esc(C.sh[c.sh].n.toUpperCase())}</div><h3 style="color:${C.q[c.q].c}">${esc(C.q[c.q].n)} <span class="fr70" style="--fc:${C.q[c.q].c}">Lv ${c.lv}</span></h3>
   <div class="c72-big">${chipIc(c,'big')}</div>${c.set?`<p class="adv-cost">Bộ <b>${esc(C.sets[c.set].n)}</b> (${esc(U.nm[C.sets[c.set].w])})</p>`:'<p class="adv-cost">Không tính bộ</p>'}
   <p class="u72-sk"><b>Tham số chủ</b>${mainTxt(c)}</p><ul class="c72-ln">${c.ln.map((l,j)=>lineTxt(c,l,j)).join('')}</ul>${c.q===6?`<p class="u72-sk" style="color:#ffd23a"><b>Tuyệt mật</b>+1,5% sát thương chuẩn toàn đội${c.lv>=C.tm307.lv?'':' · mở ở cấp '+C.tm307.lv}</p>`:''}
   ${adv?`<p class="adv-cost">Luyện ${c.ref}/${C.refine.max} (${C.refine.cry} tinh thể + ${C.refine.cr} ◈) · Tái tạo ${c.reb}/${C.rebuild.max} (${C.rebuild.coder} mã hóa + ${C.rebuild.core} lõi + ${C.rebuild.cr} ◈)</p>
    <div class="c72-rr">${c.ln.map((l,j)=>`<button data-a="ref" data-v="${c.id}|${j}">LUYỆN DÒNG ${j+1}</button>`).join('')}${c.ln.map((l,j)=>c.rbi==null||c.rbi===j?`<button class="gold" data-a="reb" data-v="${c.id}|${j}">TÁI TẠO DÒNG ${j+1}</button>`:'').join('')}</div>`.replace(/^[\s\S]*$/,m=>V191()?btn191(c):m):'<p class="adv-cost">Luyện / Tái tạo: chỉ chip từ Nguyên mẫu trở lên.</p>'}
   <div class="u72-acts"><button class="hb-btn cyan" data-a="up" data-v="${c.id}" ${up?'':'disabled'}>NÂNG CẤP<small>${up?up[0]+' lõi · '+up[1]+' ◈':'Lv 50 tối đa'}</small></button><button class="hb-btn" data-a="lock" data-v="${c.id}">${c.lock?'MỞ KHÓA':'KHÓA BẢO VỆ'}<small>chặn phân giải / luyện</small></button>
    <button class="hb-btn gold" data-a="sal" data-v="${c.id}" ${canUse(c)?'':'disabled'}>PHÂN GIẢI<small>+${C.salvage[c.q][0]} tinh thể${C.salvage[c.q][1]?' · +'+C.salvage[c.q][1]+' mã hóa':''}${C.salvage[c.q][2]+Math.floor((c.spent|0)/2)?' · +'+(C.salvage[c.q][2]+Math.floor((c.spent|0)/2))+' lõi':''}</small></button>${c.eq?`<button class="hb-btn" data-a="uneq" data-v="${c.id}">THÁO<small>${esc(U.nm[c.eq.w])}</small></button>`:''}</div>
   <div class="adv-btns"><button class="adv-x" data-a="inv">‹ KHO CHIP</button><button class="adv-x" data-a="home">CHIP VŨ KHÍ</button></div></div>`;el.hidden=false;}
 // V190 · chống bấm nhầm: so dòng theo % giá trị tối đa của chính dòng đó; bỏ dòng tốt hơn phải bấm 2 lần. Tắt: window.CHIP190=false
 let warn190=null;
 function q190(c,l){try{const m=lval(c,Object.assign({},l,{u:1}));return m>0?lval(c,l)/m:0;}catch{return 0;}}
 function btn191(c){return `<div class="adv-btns" style="flex-wrap:wrap">${c.ln.map((l,j)=>`<button class="adv-x" data-a="cal" data-v="${c.id}|${j}">TẨY THÔNG SỐ ${j+1}<br><small>${costTxt191(c,j,'cal')}</small></button>`).join('')}${c.ln.map((l,j)=>maxStage()>=UNL191.type?`<button class="gold" data-a="typ" data-v="${c.id}|${j}">TẨY DÒNG ${j+1}<br><small>${costTxt191(c,j,'type')}</small></button>`:'').join('')}${maxStage()<UNL191.type?`<p class="adv-cost">Tẩy dòng (đổi loại dòng) mở ở ải ${UNL191.type}.</p>`:''}</div>${ON203()&&maxStage()>=UNL191.type?grpBox203():''}`;}
 function grpBox203(){const gs=E203.grp.filter(g=>g!=='a:'||V195()),eq=eqT203(grp203),p=S.pity203|0;
  return `<div class="g203"><b>NHẮM DÒNG KHI TẨY</b><div class="g203-r">${gs.map(g=>`<button type="button" data-a="g203" data-v="${g}" aria-pressed="${g===grp203}">${E203.gn[g]}${g==='all'?'':' <small>+1 mã hóa</small>'}</button>`).join('')}</div>
   <p>${grp203==='all'?'50% ra dòng có tên · 1/4 trong đó nhắm món đang dùng':'Chỉ ra dòng nhóm '+E203.gn[grp203]+' · 50% ra dòng có tên, 1/2 trong đó đúng món đang dùng'}${eq.length?` · Bảo hiểm: <b>${p}/${E203.pity}</b> (lần thứ ${E203.pity+1} chắc chắn ra dòng món đang dùng)`:' · Chưa trang bị món nào thuộc nhóm này'}</p></div>`;}
 function candPanel(){const c=S.ch.find(x=>x.id===cand.id);const old=c.ln[cand.idx],nw=cand.line;const eq191=Math.abs(q190(c,nw)-q190(c,old))<1e-4,G190=window.CHIP190!==false&&!eq191,nwB=q190(c,nw)>q190(c,old);
  el.innerHTML=`<div class="m63-card adv-card u72-card"><div class="m63-eye">${cand.kind==='ref'?'LUYỆN':cand.kind==='cal'?'TẨY THÔNG SỐ':cand.kind==='type'?'TẨY DÒNG':'TÁI TẠO'} · DÒNG ${cand.idx+1}</div><h3>Chọn kết quả</h3>
   <div class="adv-cmp"><div><i>CŨ</i>${esc(LN(old))} +${pc(lval(c,old))}</div><div><i>MỚI</i><span class="${G190?(nwB?'up':'dn190'):'up'}">${esc(LN(nw,1))} +${pc(lval(c,nw))}${G190?(nwB?' ▲':' ▼'):eq191?' =':''}</span></div></div>
   ${warn190?`<p class="adv-cost" style="color:#ff8a8a">⚠ Bạn sắp BỎ dòng ${warn190==='keep'?'MỚI':'CŨ'} tốt hơn. Bấm lại để chắc chắn.</p>`:''}
   <div class="adv-btns"><button class="adv-x" data-a="${G190&&nwB&&warn190!=='keep'?'keep190':'keep'}">${warn190==='keep'?'CHẮC CHẮN GIỮ CŨ':'GIỮ CŨ'}</button><button class="m63-go" data-a="${G190&&!nwB&&warn190!=='take'?'take190':'take'}">${warn190==='take'?'CHẮC CHẮN NHẬN MỚI':'NHẬN MỚI'}</button></div></div>`;el.hidden=false;if(G190&&q190(c,nw)>=.8&&window.CHIP191!==false){const bs=el.querySelectorAll('[data-a^="keep"],[data-a^="take"]');bs.forEach(x=>x.disabled=true);const card=el.querySelector('.adv-card');if(card)card.style.boxShadow='0 0 0 2px #ffd23a';setTimeout(()=>{bs.forEach(x=>x.disabled=false);if(card)card.style.boxShadow='';},600);}/* V191: dòng rất tốt → khóa nút 0,6 s chống bấm lố */}
 function inv(){const L=S.ch.filter(c=>filt==='all'||c.sh===filt||(filt==='set'&&c.set)).sort((a,b)=>b.q-a.q||b.lv-a.lv);
  el.innerHTML=`<div class="m63-card adv-card u72-card"><div class="m63-eye">KHO CHIP · ${S.ch.length}/${C.cap}</div><h3>Chip giao thức</h3>
   <div class="hb-filter st71-tabs">${[['all','Tất cả'],['fire','Hỏa lực'],['frame','Cấu trúc'],['link','Mạch'],['set','Có bộ']].map(([k,n])=>`<button data-a="inv" data-v="${k}" aria-pressed="${k===filt}">${n}</button>`).join('')}</div>
   <div class="c72-grid">${L.slice(0,120).map(c=>`<button data-a="det" data-v="${c.id}" class="${c.eq?'eq':''}">${chipIc(c)}</button>`).join('')||'<p class="adv-max">Chưa có chip.</p>'}</div>
   <div class="adv-btns"><button class="adv-x" data-a="salq" data-v="1">PHÂN GIẢI LỤC + LAM</button><button class="adv-x" data-a="home">‹ CHIP VŨ KHÍ</button></div></div>`;el.hidden=false;}
 function forge(){const dl=dropLv(),disc=S.dday!==today(),D=C.drop[dl],nx=C.drop[dl+1];
  const mg=[0,1,2].map(q=>SHAPES.map(sh=>{const n=mergeable(q,sh).length;return `<button class="st71-mg ${n>=C.merge.k?'hot':''}" data-a="mg" data-v="${q}|${sh}" style="--tc:${C.q[C.merge.up[q]].c}">${C.sh[sh].n}<small>${C.q[q].n} ${n}/${C.merge.k}</small></button>`;}).join('')).join('');
  const last=S.last.map(id=>S.ch.find(c=>c.id===id)).filter(Boolean);
  el.innerHTML=`<div class="m63-card adv-card u72-card"><div class="m63-eye">LÒ SẢN XUẤT CHIP</div><h3>Cấp rơi ${dl+1}/5</h3>${matRow()}
   <div class="c72-forge">${ART.chip_forge?`<img src="${ART.chip_forge}" alt="">`:''}<div><p class="adv-cost">Mỗi lần: <b>${disc?C.prod.daily+' tinh thể (ưu đãi đầu ngày)':C.prod.cry+' tinh thể'}</b> + ${C.prod.cr} ◈</p>
    <p class="adv-cost">Bảo hiểm: <b>${S.pity}/${C.prod.pity}</b> → chắc chắn ${dl<=1?'Giao ước Nguyên mẫu':'Giao ước Chiến lược'} thuộc bộ của vũ khí chủ chiến</p>
    <p class="adv-cost">Tỉ lệ: Lục ${Math.round(D.q[0]*100)}% · Lam ${Math.round(D.q[1]*100)}% · Tím ${Math.round(D.q[2]*100)}% · Cam ${Math.round(D.q[3]*100)}% · Lv50 ${Math.round(D.lv[4]*100)}%</p>
    <p class="adv-cost">${nx?`Lên cấp rơi ${dl+2}: XP chip ${S.xp}/${nx.xp} và vượt ải ${nx.st}`:'Cấp rơi tối đa'}</p></div></div>
   <div class="adv-btns"><button class="m63-go" data-a="prod" data-v="1">SẢN XUẤT ×1</button><button class="m63-go" data-a="prod" data-v="10">SẢN XUẤT ×10</button></div>
   ${last.length?`<div class="c72-grid sm">${last.map(c=>`<button data-a="det" data-v="${c.id}">${chipIc(c)}</button>`).join('')}</div>`:''}
   <div class="adv-req-t">GHÉP 5 → 1 (cùng phẩm, cùng hình, chưa luyện)</div><div class="c72-mgs">${mg}</div>
   <div class="adv-btns"><button class="adv-x" data-a="home">‹ CHIP VŨ KHÍ</button><button class="adv-x" data-a="inv" data-v="all">KHO CHIP</button></div></div>`;el.hidden=false;}
 function open(w){if(!el)build();W=w||Ult72.mainW()||'fortress';try{Ult72.close&&Ult72.close();}catch{}document.querySelectorAll('.u72:not(.c72)').forEach(e=>e.hidden=true);home();}
 function summary(w){if(!unlocked())return 'mở ở ải '+C.unlock;const L=onW(w);const T=agg(w);const sets=Object.entries(T.set).filter(([,n])=>n>=3).map(([s,n])=>C.sets[s].n+' '+n);return L.length+'/6 chip'+(sets.length?' · '+sets.join(', '):'');}
 return {_t203:(id,idx,g)=>{grp203=g||'all';const r=retype(id,idx);if(!r)return null;const o={line:r.line,name:LN(r.line,1),hit:hit203(r.line,grp203),pity:S.pity203|0};accept(false);return o;},NL,armorEff,shipM,gearM,nlMult,LN,tgts,C,state:()=>JSON.parse(JSON.stringify(S)),open,summary,gen,produce,equip,unequip,salvage,upgrade,refine,rebuild,accept,merge,agg,dropLv,unlocked,
  _set:o=>{for(const k in o){if(k==='mat')Object.assign(S.mat,o.mat);else S[k]=o[k];}save();bump();},_give:c=>{S.ch.push(c);save();bump();return c;}};
})();
