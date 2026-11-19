'use strict';
// V67 · TRẠM GIAO DỊCH = CHỢ ĐEN (A2) + KHO SKIN — số liệu Gemini, Claude chỉnh cho khớp ví tài nguyên đang có.
//  • Skin CHỈ đổi hình ảnh (0 chỉ số). Đạn: vẽ bằng canvas, thay hình đạn chính. Khung: hào quang quanh chiến cơ.
//    Skin NỔ (6 món) chờ tranh GPT Đợt 10 → hiện "Sắp có".
//  • Chợ Đen: 6 ô làm mới mỗi ngày theo ngày máy, chặn lùi giờ (> 1 giờ thì giữ phiên cũ). Thứ 7 & CN: Phiên Chợ Hiếm −30%.
//  • Chỉnh so với Gemini (game chưa có "mảnh SSS", "bán trang bị", "mảnh ngọc lẻ"): ô thu mua dùng mảnh trang bị thừa / đá / hợp kim / lõi.
try{UNLOCK66.market={lv:18,name:'Chợ Đen',sel:[]};UNLOCK66.skins={lv:25,name:'Kho Skin',sel:[]};}catch{}
const TRADE_ART=typeof TRADE_ASSETS!=='undefined'?TRADE_ASSETS:{};
const SKINS67=[
 {id:'bul_emerald',t:'bul',n:'Lôi Điện Tím',r:'B',price:{c:6000},src:'shop',col:'#b98cff',core:'#f3e8ff',art:'skin_bullet_3'},
 {id:'bul_crimson',t:'bul',n:'Huyết Nguyệt Laser',r:'A',price:{c:15000},src:'shop',col:'#ff5a2a',core:'#ffd29e',art:'skin_bullet_1'},
 {id:'bul_gold',t:'bul',n:'Hoàng Kim Vũ',r:'A',price:{c:22000},src:'bm',col:'#ffd166',core:'#fff6d0',art:'skin_bullet_6'},
 {id:'bul_frost',t:'bul',n:'Băng Tinh Cực Hàn',r:'S',price:{core:8},src:'shop',col:'#4cc9f0',core:'#e8fbff',art:'skin_bullet_2'},
 {id:'bul_void',t:'bul',n:'Hư Không Tím',r:'S',price:{core:12,c:45000},src:'rare',col:'#8a2be2',core:'#1a0420',art:'skin_bullet_5'},
 {id:'bul_rainbow',t:'bul',n:'Anh Đào Thất Sắc',r:'SS',price:null,src:'reward',col:'#ff8fc8',core:'#ffffff',art:'skin_bullet_4',how:'Đạt 3★ toàn bộ 160 ải'},
 {id:'frm_cobalt',t:'frm',n:'Vòng Phản Lực Lam',r:'B',price:{c:8000},src:'shop',col:'#7fd8ff',art:'skin_frame_2'},
 {id:'frm_amber',t:'frm',n:'Khiên Lục Giác Vàng',r:'A',price:{c:18000},src:'shop',col:'#ffc23a',art:'skin_frame_6'},
 {id:'frm_cyber',t:'frm',n:'Mạch Điện Tử Hồng',r:'A',price:{c:25000},src:'bm',col:'#ff7eb6',art:'skin_frame_4'},
 {id:'frm_thunder',t:'frm',n:'Lôi Vân Hộ Thể',r:'S',price:{core:10},src:'shop',col:'#b98cff',art:'skin_frame_3'},
 {id:'frm_wings',t:'frm',n:'Đôi Cánh Hỏa Phượng',r:'S',price:{core:16,c:60000},src:'rare',col:'#ff7a3a',art:'skin_frame_1'},
 {id:'frm_nebula',t:'frm',n:'Hào Quang Chúa Tể',r:'SS',price:null,src:'reward',col:'#9b5cff',art:'skin_frame_5',how:'Hạ boss ải 180'},
 {id:'bom_plasma',t:'bom',n:'Lôi Điện Bùng Nổ',r:'B',price:{c:7000},src:'shop',col:'#b98cff',art:'boom_skin_3'},{id:'bom_firework',t:'bom',n:'Pháo Hoa Vinh Quang',r:'A',price:{c:16000},src:'shop',col:'#ff6a3a',art:'boom_skin_1'},
 {id:'bom_shatter',t:'bom',n:'Băng Vỡ Tuyệt Đối',r:'A',price:{c:24000},src:'bm',col:'#7fd8ff',art:'boom_skin_2'},{id:'bom_pixel',t:'bom',n:'Hoa Anh Đào',r:'S',price:{core:9},src:'shop',col:'#ff8fc8',art:'boom_skin_4'},
 {id:'bom_blackhole',t:'bom',n:'Hố Đen Nuốt Chửng',r:'S',price:{core:15},src:'rare',col:'#8a2be2',art:'boom_skin_5'},{id:'bom_supernova',t:'bom',n:'Hoàng Kim Siêu Tân Tinh',r:'SS',price:null,src:'reward',col:'#ffd166',art:'boom_skin_6',how:'Đạt 3★ toàn bộ Chương 9'}];
const Trade67=(()=>{
 const KEY='saobang-trade-v67',TAU=Math.PI*2;
 let S={owned:[],equip:{bul:null,frm:null,bom:null},bm:{date:'',maxTs:0,slots:[],used:{}},titles:[]};try{const o=JSON.parse(localStorage.getItem(KEY)||'{}');Object.assign(S,o);S.bm=Object.assign({date:'',maxTs:0,slots:[],used:{}},o.bm||{});S.equip=Object.assign({bul:null,frm:null,bom:null},o.equip||{});}catch{}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const SK=id=>SKINS67.find(s=>s.id===id);
 // V81: ghi rõ skin áp cho đâu
 const FOR81={bul:'Đạn chính · áp cho MỌI chiến cơ',frm:'Hào quang quanh chiến cơ đang lái · mọi chiến cơ',bom:'Hiệu ứng nổ khi hạ địch · mọi chiến cơ'};
 const open=k=>{try{return Onboard66.open(k);}catch{return true;}};
 const weekend=()=>{const d=new Date().getDay();return d===0||d===6;};
 const disc=v=>weekend()?Math.ceil(v*.7):v;
 const today=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');};
 let cheat=false;
 // ---------- Chợ Đen ----------
 const TRADES=[
  {id:'scrap',n:'Thu mua phôi Trắng thừa',give:{ph:2},get:{c:1200,e:25},lim:5},
  {id:'sweep',n:'Vé càn quét',give:{c:5000},get:{tk:3},lim:2},// V85: thay ô 'thu mua phôi' khi đã bỏ phôi (V82)
  // V307 (bỏ đá ⬢, Gemini lượt 4): bỏ ô 'Đổi đá lấy hợp kim' (đá giờ trả bằng ◈ → thành ô in ◈); gói đá → 3 gói Đá XP giá 1 ◈ / 1 XP
  ...(window.DA307===false?[{id:'stone2c',n:'Đổi đá lấy hợp kim',give:{e:40},get:{c:1500},lim:3},{id:'c2stone',n:'Gói đá nâng cấp',give:{c:4000},get:{e:60},lim:1}]:
   [{id:'xp307a',n:'Gói Đá XP (150 XP)',give:{c:150},get:{e:10},lim:3},{id:'xp307b',n:'Gói Đá XP (300 XP)',give:{c:300},get:{e:20},lim:2},{id:'xp307c',n:'Gói Đá XP (720 XP)',give:{c:720},get:{e:48},lim:1}]),
  {id:'pilotA',n:'5 mảnh phi công (hạng A)',give:{c:6000},get:{pp:5,rank:'A'},lim:1},
  {id:'pilotS',n:'5 mảnh phi công (hạng S)',give:{c:12000},get:{pp:5,rank:'S'},lim:1},
  {id:'core',n:'1 Lõi Siêu Hợp',give:{c:5000},get:{core:1},lim:1},
  {id:'bundle',n:'Gói Tiếp Tế Hiếm',give:{c:8000},get:{e:120,core:1},lim:1}];
 // V75 (PLAN75.ECONOMY.BLACK_MARKET): Chợ Đen làm mới mỗi 6 giờ · làm mới tay 50 💎 (5 lần/ngày) · thêm 1 ô QUẦY KIM CƯƠNG
 const BM75={hours:6,manualMax:5,manualCost:50,items:[{id:'PILOT_SHARDS_10',n:'10 mảnh phi công',gem:250,w:20,lim:1},{id:'BLUE_FODDER',get n(){return (window.Evo82&&Evo82.on())?'1 bản sao Lam Lv1 (trang bị)':'1 phôi Lam trang bị';},gem:200,w:30,lim:1},{id:'SWEEP_TICKETS_5',n:'5 vé càn quét',gem:80,w:30,lim:1},{id:'ULT_BOSS_TICKET',n:'1 vé Phó bản giới hạn',gem:150,w:20,lim:2},/* BALANCE75 */{id:'PURPLE_FODDER_RANDOM',get n(){return (window.Evo82&&Evo82.on())?'1 bộ nguyên liệu Tím':'1 phôi Tím trang bị';},gem:600,w:8,lim:1,wk:1},{id:'RARE_PILOT_BOX_15',n:'15 mảnh phi công S',gem:350,w:12,lim:1,wk:2},{id:'SSS_OVERCLOCK_STONE',n:'1 Đá Tinh Luyện SSS',gem:150,w:25,lim:1}]};
 const wkK=()=>{const d=new Date(Date.now()+7*3600000);const m=new Date(d);m.setUTCDate(d.getUTCDate()-((d.getUTCDay()+6)%7));return m.toISOString().slice(0,10);};
 const wkUsed=id=>{const w=S.bm.wk;return w&&w.k===wkK()?(w.n[id]|0):0;};
 const sess=()=>today()+'#'+Math.floor(new Date().getHours()/BM75.hours);
 function gemPick(){const tot=BM75.items.reduce((a,b)=>a+b.w,0);let r=Math.random()*tot;for(const it of BM75.items){if((r-=it.w)<0)return it.id;}return BM75.items[0].id;}
 function manualRefresh(){const d=today();S.bm.mr=S.bm.mr&&S.bm.mr.d===d?S.bm.mr:{d,n:0};if(S.bm.mr.n>=BM75.manualMax)return 'Đã làm mới '+BM75.manualMax+' lần hôm nay';try{if(!Econ74.spend(BM75.manualCost))return 'Thiếu kim cương';}catch{return 'Thiếu kim cương';}S.bm.mr.n++;S.bm.date='';save();rollDay();try{Q77.track('market_refresh',1);}catch{}return '';}
 function buyGem(i){const sl=S.bm.slots[i];const it=BM75.items.find(x=>'gem:'+x.id===sl);if(!it)return 'Ô trống';const u=S.bm.used[i]||0;if(u>=it.lim)return 'Hết lượt';if(it.wk&&wkUsed(it.id)>=it.wk)return 'Hết lượt tuần này';
  if(it.id==='RARE_PILOT_BOX_15'&&!pilotIds('S').concat(pilotIds('A')).length)return 'Chưa có phi công — chiêu mộ phi công trước';
  if(it.id==='PILOT_SHARDS_10'&&!pilotIds('A').concat(pilotIds('S')).length)return 'Chưa có phi công — chiêu mộ phi công trước';
  try{if(!Econ74.spend(it.gem))return 'Thiếu kim cương';}catch{return 'Thiếu kim cương';}
  let got81='';try{if(it.id==='PILOT_SHARDS_10'){got81=givePP(Math.random()<.5?'A':'S',10);}
   else if(it.id==='BLUE_FODDER'){const ks=Object.keys(GearCatalog).filter(k=>!/36$/.test(k)&&!(window.GEAR81_NODROP||{})[k]);V70.phAdd('gear',ks[Math.floor(Math.random()*ks.length)],2,1);}
   else if(it.id==='SWEEP_TICKETS_5')V75.addTk(5);else if(it.id==='ULT_BOSS_TICKET')Econ74.addTry();
   else if(it.id==='PURPLE_FODDER_RANDOM'&&(window.Evo82&&Evo82.on())){for(const t of MAT69.types)V70.add(t.id+'3',1);got81='+1 bộ nguyên liệu Tím';try{toast('+1 BỘ NGUYÊN LIỆU TÍM');}catch{}}
   else if(it.id==='PURPLE_FODDER_RANDOM'){const ks=Object.keys(GearCatalog).filter(k=>!/36$/.test(k)&&!(window.GEAR81_NODROP||{})[k]);V70.phAdd('gear',ks[Math.floor(Math.random()*ks.length)],3,1);}
   else if(it.id==='SSS_OVERCLOCK_STONE')OC75.addStone(1);
   else if(it.id==='RARE_PILOT_BOX_15'){got81=givePP('S',15);}}catch(e){}
  if(it.wk){if(!S.bm.wk||S.bm.wk.k!==wkK())S.bm.wk={k:wkK(),n:{}};S.bm.wk.n[it.id]=(S.bm.wk.n[it.id]|0)+1;}
  S.bm.used[i]=u+1;save();try{Q77.track('market',1);}catch{}window.__bm81=got81;return '';}
 function rollDay(){const now=Date.now(),d=today();
  if(S.bm.maxTs&&now<S.bm.maxTs-3600000){cheat=true;return;}cheat=false;S.bm.maxTs=Math.max(S.bm.maxTs||0,now);
  const ss=sess();if(S.bm.date===ss&&S.bm.slots.length)return;S.bm.date=ss;S.bm.used={};
  const pick=arr=>arr[Math.floor(Math.random()*arr.length)];const X307=window.DA307!==false;const scrapPool=[(window.Evo82&&Evo82.on())?'sweep':'scrap',X307?'xp307a':'stone2c'];
  const slots=[scrapPool[0],scrapPool[1],X307?(Math.random()<.6?'xp307b':'xp307c'):'c2stone',(pilotIds('S').length?(Math.random()<.6?'pilotA':'pilotS'):'pilotA'),'core'];
  if(weekend()){const rare=SKINS67.filter(s=>s.src==='rare'&&!S.owned.includes(s.id));slots.push(rare.length?'skin:'+pick(rare).id:'bundle');}
  else{const bm=SKINS67.filter(s=>s.src==='bm'&&!S.owned.includes(s.id));slots.push(bm.length&&Math.random()<.4?'skin:'+pick(bm).id:'bundle');}
  slots.push('gem:'+gemPick());S.bm.slots=slots;save();}
 const OLD307={stone2c:'xp307a',c2stone:'xp307b'};const T=id=>TRADES.find(t=>t.id===id)||TRADES.find(t=>t.id===OLD307[id])||TRADES[0];
 function fragBest(){try{const w=Workshop.getState().gearFragments||{};let best=null,n=0;for(const k in w)if(w[k]>n){n=w[k];best=k;}return [best,n];}catch{return [null,0];}}
 // V75: mảnh trang bị đã bỏ → ô thu mua nhận phôi Trắng (cùng mẫu, mẫu đang có nhiều nhất)
 function phBest(){try{const L=V70.phList();let best=null,n=0;for(const k in L)if(/:0$/.test(k)&&L[k]>n){n=L[k];best=k;}return [best,n];}catch{return [null,0];}}
 function cores(){try{return Meta407.cores();}catch{return 0;}}
 // V81: tặng mảnh phi công — hết phi công đúng hạng thì sang phi công khác đang có; báo rõ tên + số mảnh
 function givePP(rank,n){let ids=pilotIds(rank);if(!ids.length)ids=pilotIds(rank==='A'?'S':'A');if(!ids.length)return '';const id=ids[Math.floor(Math.random()*ids.length)];try{Pilot67._piece(id,n);}catch{return '';}let nm='Phi công';try{nm=PILOTS67.find(p=>p.id===id).name;}catch{}let tot=0;try{tot=Pilot67.state().pieces[id]|0;}catch{}const m='+'+n+' mảnh phi công · '+nm+' (có '+tot+')';try{toast('🧑‍✈️ '+m.toUpperCase());}catch{}return m;}
 function pilotIds(rank){try{const own=Pilot67.state().own;return PILOTS67.filter(p=>own[p.id]&&(rank==='A'?p.rank==='A':p.rank!=='A')).map(p=>p.id);}catch{return [];}}
 function priceOf(g){return {c:g.c?disc(g.c):0,e:g.e?disc(g.e):0,core:g.core?disc(g.core):0,frag:g.frag?disc(g.frag):0,ph:g.ph?disc(g.ph):0};}
 function canPay(p){if(p.c&&Progress.balance()<p.c)return 'Thiếu hợp kim';if(p.e&&Workshop.expBalance()<p.e)return 'Thiếu đá';if(p.core&&cores()<p.core)return 'Thiếu Lõi Siêu Hợp';if(p.frag&&fragBest()[1]<p.frag)return 'Thiếu mảnh trang bị (cần '+p.frag+' mảnh cùng mẫu)';if(p.ph&&phBest()[1]<p.ph)return 'Thiếu phôi Trắng (cần '+p.ph+' phôi cùng mẫu)';return '';}
 function pay(p){if(p.frag){const [m]=fragBest();if(!Workshop.spendFrag(m,p.frag))return false;}if(p.ph){const [k,n]=phBest();if(!k||n<p.ph)return false;const m=k.split(':');try{if(m[0]==='g')V70.phAdd('gear',m[1],0,-p.ph);else V70.phAdd('craft',+m[0].slice(1),0,-p.ph);}catch{return false;}}if(p.c&&!Progress.spendCredits(p.c))return false;if(p.e&&!Workshop.spendExp(p.e)){if(p.c)Progress.grantCredits(p.c);return false;}if(p.core&&!Meta407.spendCores(p.core)){if(p.c)Progress.grantCredits(p.c);if(p.e)Workshop.grant({exp:p.e});return false;}return true;}
 function buySlot(i){rollDay();try{if(window.Evo82&&Evo82.on()){const k=S.bm.slots.indexOf('scrap');if(k>=0){S.bm.slots[k]='sweep';save();}}}catch{}if(cheat)return 'Phát hiện lùi giờ máy — Chợ Đen giữ phiên cũ';const sl=S.bm.slots[i];if(!sl)return 'Ô trống';if(sl.startsWith('gem:'))return buyGem(i);
  if(sl.startsWith('skin:')){if(S.bm.used[i])return 'Đã mua hôm nay';const r=buySkin(sl.slice(5),true);if(!r){S.bm.used[i]=1;save();}return r;}
  const t=T(sl),u=S.bm.used[i]||0;if(u>=t.lim)return 'Hết lượt hôm nay';const p=priceOf(t.give);
  if(t.get.pp&&!pilotIds('A').concat(pilotIds('S')).length)return 'Chưa có phi công — chiêu mộ phi công trước';
  const why=canPay(p);if(why)return why;if(!pay(p))return 'Không đủ tài nguyên';
  if(t.get.c)Progress.grantCredits(t.get.c);if(t.get.e)Workshop.grant({exp:t.get.e});if(t.get.core)try{Meta407.addCores(t.get.core,'CHỢ ĐEN');}catch{}if(t.get.tk)try{V75.addTk(t.get.tk);}catch{}
  let got81='';if(t.get.pp)got81=givePP(t.get.rank,t.get.pp);
  S.bm.used[i]=u+1;save();try{Q77.track('market',1);}catch{}window.__bm81=got81;return '';}
 // ---------- Skin ----------
 function buySkin(id,fromBM){const s=SK(id);if(!s||S.owned.includes(id))return 'Đã sở hữu';if(s.src==='soon')return 'Chờ tranh (sắp có)';if(s.src==='reward')return 'Nhận bằng thành tích: '+s.how;
  if((s.src==='bm'||s.src==='rare')&&!fromBM)return 'Chỉ bán ở Chợ Đen';const p={c:s.price.c?disc(s.price.c):0,core:s.price.core?disc(s.price.core):0};
  let use=p;if(s.price.core&&s.price.c){use=cores()>=p.core?{core:p.core}:{c:p.c};}
  const why=canPay(use);if(why)return why;if(!pay(use))return 'Không đủ tài nguyên';S.owned.push(id);if(!S.equip[s.t])S.equip[s.t]=id;titles();save();try{toast('★ SỞ HỮU SKIN · '+s.n.toUpperCase());}catch{}return '';}
 function grantReward(){try{const st=Campaign36.getState().stars||{};let all=true;for(let i=1;i<=160;i++)if((st[i]||0)<3){all=false;break;}if(all&&!S.owned.includes('bul_rainbow')){S.owned.push('bul_rainbow');save();try{toast('★ SKIN THƯỞNG · THẤT SẮC SAO BĂNG');}catch{}}}catch{}
  try{if(Progress.getState().cleared.includes(180)&&!S.owned.includes('frm_nebula')){S.owned.push('frm_nebula');save();try{toast('★ SKIN THƯỞNG · HÀO QUANG CHÚA TỂ');}catch{}}}catch{}titles();}
 const TITLES=[[3,'Tân Tinh Thời Thượng'],[9,'Kiến Trúc Sư Ngân Hà'],[15,'★ Bá Chủ Chợ Đen ★'],[18,'✦ HUYỀN THOẠI SAO BĂNG ✦']];
 function titles(){for(const [n,t] of TITLES)if(S.owned.length>=n&&!S.titles.includes(t)){S.titles.push(t);try{toast('DANH HIỆU SƯU TẦM · '+t);}catch{}}}
 function equip(id){const s=SK(id);if(!s)return;if(!S.owned.includes(id))return;S.equip[s.t]=S.equip[s.t]===id?null:id;save();}
 // ---------- vẽ đạn skin (thay hình đạn chính) ----------
 // V82: đạn skin vẽ bằng TRANH skin (trước: hình vẽ tay → lệch với đạn chiến cơ). Tranh 1, 2 vẽ chéo 45° → xoay về thẳng.
 const BIM82={};const bim82=k=>{if(!(k in BIM82)){const u=typeof TRADE_ART!=='undefined'&&TRADE_ART[k];BIM82[k]=u?Object.assign(new Image(),{src:u}):null;}const m=BIM82[k];return m&&m.complete&&m.naturalWidth?m:null;};
 const TILT82=window.K153===false?{skin_bullet_1:-Math.PI/4,skin_bullet_2:-Math.PI/4}:{};/* V153: icon GPT Phần K đứng thẳng → bỏ nghiêng */
 // V153 · GPT Phần K: dải đạn động 4 khung skin_dan_N (thay icon). Tắt: window.K153=false
 function drawBul(g,s,sk){try{const n=window.K153!==false&&sk.art&&sk.art.replace('skin_bullet_',''),dm=n&&bim82('skin_dan_'+n);if(dm){const r=Math.max(3,Math.min(9,s.r||4)),a=Math.atan2(s.vy||-1,s.vx||0)+Math.PI/2,h=26+r*3.2,cw=dm.naturalWidth/4,w=h*cw/dm.naturalHeight,f=Math.floor((time*14+(s.x|0))%4);g.save();g.translate(s.x,s.y);g.rotate(a);g.globalCompositeOperation='lighter';g.drawImage(dm,f*cw,0,cw,dm.naturalHeight,-w/2,-h/2,w,h);g.restore();return;}}catch{}const im=window.BUL82!==false&&sk.art&&bim82(sk.art);if(im){const r=Math.max(3,Math.min(9,s.r||4)),a=Math.atan2(s.vy||-1,s.vx||0)+Math.PI/2+(TILT82[sk.art]||0),h=24+r*3.2,w=h;
   g.save();g.translate(s.x,s.y);g.rotate(a);g.globalCompositeOperation='lighter';g.drawImage(im,-w/2,-h/2,w,h);g.restore();return;}const r=Math.max(3,Math.min(9,s.r||4)),a=Math.atan2(s.vy||-1,s.vx||0)+Math.PI/2,t=time;g.save();g.translate(s.x,s.y);g.rotate(a);
  let col=sk.col,core=sk.core;if(sk.id==='bul_rainbow'){col=`hsl(${(t*180+s.x)%360},100%,62%)`;core='#ffffff';}
  g.globalCompositeOperation='lighter';g.globalAlpha=.55;const tl=sk.id==='bul_emerald'||sk.id==='bul_rainbow'?28:16;const gr=g.createLinearGradient(0,0,0,tl);gr.addColorStop(0,col);gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(-r*.6,0,r*1.2,tl);
  g.globalCompositeOperation='source-over';g.globalAlpha=1;g.fillStyle=col;g.strokeStyle=core;g.lineWidth=1.4;g.beginPath();
  if(sk.id==='bul_crimson'||sk.id==='bul_gold'){g.strokeStyle='#bff6ff';}if(sk.id==='bul_crimson'){g.moveTo(0,-r*2.4);g.lineTo(r,0);g.lineTo(0,r*1.6);g.lineTo(-r,0);g.closePath();g.fill();g.stroke();g.fillStyle=core;g.fillRect(-r*1.6,-r*.4,1.2,r*1.6);g.fillRect(r*1.6-1.2,-r*.4,1.2,r*1.6);}
  else if(sk.id==='bul_gold'){g.moveTo(0,-r*2.6);g.lineTo(r*.8,-r*.4);g.lineTo(r*.4,r*1.4);g.lineTo(-r*.4,r*1.4);g.lineTo(-r*.8,-r*.4);g.closePath();g.fill();g.stroke();if(Math.random()<.3){g.fillStyle='#fff';g.fillRect((Math.random()-.5)*r*3,r*2,1.5,1.5);}}
  else if(sk.id==='bul_frost'){g.rotate(t*3);for(let k=0;k<6;k++){const q=k*TAU/6;g.lineTo(Math.cos(q)*r*1.3,Math.sin(q)*r*1.3);}g.closePath();g.fill();g.stroke();}
  else if(sk.id==='bul_void'){const pr=r*(1.1+.2*Math.sin(t*10));g.arc(0,0,pr,0,TAU);g.fillStyle='#1a0420';g.fill();g.strokeStyle=col;g.lineWidth=2;g.stroke();}
  else{g.ellipse(0,0,r*.9,r*1.7,0,0,TAU);g.fill();g.fillStyle=core;g.beginPath();g.ellipse(0,-r*.2,r*.45,r*.9,0,0,TAU);g.fill();}
  g.restore();}
 try{const ofd=Fighters28.draw;Fighters28.draw=function(g,s){try{const sk=S.equip.bul&&SK(S.equip.bul);if(sk&&s&&s.main66&&!s.ray28&&(mode==='play'||mode==='pause')){if(typeof Glow66!=='undefined'&&g===ctx){Glow66.enter('shot');try{drawBul(g,s,sk);}finally{Glow66.leave();}}else drawBul(g,s,sk);return true;}}catch{}return ofd.apply(this,arguments);};}catch{}
 // ---------- khung chiến cơ ----------
 function drawFrame(){const sk=S.equip.frm&&SK(S.equip.frm);if(!sk||!(mode==='play'||mode==='pause'))return;
  // V153 · GPT Phần K: hiệu ứng khung động 4 khung skin_hieu_ung_N (cánh / phản lực / hạt hai bên, không vành). Tắt: window.K153=false
  try{const n=window.K153!==false&&sk.art&&sk.art.replace('skin_frame_',''),hm=n&&bim82('skin_hieu_ung_'+n);if(hm){const c=hm.naturalHeight,f=Math.floor(time*8)%4,z=168;ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.9;ctx.drawImage(hm,f*c,0,c,c,player.x-z/2,player.y-z/2+6,z,z);ctx.restore();return;}}catch{}const x=player.x,y=player.y,t=time,c=sk.col;ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.55;ctx.strokeStyle=c;ctx.fillStyle=c;ctx.lineWidth=1.6;
  if(sk.id==='frm_cobalt'){ctx.beginPath();ctx.arc(x,y+8,46,t*.8,t*.8+4.6);ctx.stroke();ctx.beginPath();ctx.arc(x,y+8,40,-t,-t+2);ctx.stroke();}
  else if(sk.id==='frm_amber'){ctx.beginPath();for(let k=0;k<6;k++){const a=k*TAU/6+Math.PI/6;ctx.lineTo(x+Math.cos(a)*48,y+Math.sin(a)*48);}ctx.closePath();ctx.stroke();ctx.globalAlpha=.25;ctx.fill();}
  else if(sk.id==='frm_cyber'){const d=44,l=12;for(const [sx,sy] of [[-1,-1],[1,-1],[1,1],[-1,1]]){ctx.beginPath();ctx.moveTo(x+sx*d,y+sy*(d-l));ctx.lineTo(x+sx*d,y+sy*d);ctx.lineTo(x+sx*(d-l),y+sy*d);ctx.stroke();}ctx.strokeStyle='#4cc9f0';ctx.strokeRect(x-3,y+30,6,6);}
  else if(sk.id==='frm_thunder'){for(let k=0;k<3;k++){const a=t*2+k*2.1;let px=x+Math.cos(a)*40,py=y+Math.sin(a)*40;ctx.beginPath();ctx.moveTo(px,py);for(let j=0;j<3;j++){px+=(Math.random()-.5)*16;py+=(Math.random()-.5)*16;ctx.lineTo(px,py);}ctx.stroke();}}
  else if(sk.id==='frm_wings'){ctx.globalAlpha=.35;for(const s of [-1,1]){ctx.beginPath();ctx.moveTo(x+s*14,y);ctx.quadraticCurveTo(x+s*70,y-30-Math.sin(t*3)*6,x+s*82,y+10);ctx.quadraticCurveTo(x+s*50,y+6,x+s*14,y+14);ctx.closePath();ctx.fill();}}
  else if(sk.id==='frm_nebula'){ctx.beginPath();ctx.arc(x,y,50,t,t+4);ctx.stroke();ctx.fillStyle='#ffd166';for(let k=0;k<3;k++){const a=-t*1.3+k*TAU/3;ctx.beginPath();ctx.arc(x+Math.cos(a)*54,y+Math.sin(a)*54,2.6,0,TAU);ctx.fill();}}
  ctx.restore();}
 const ovd=VisualFX.draw;VisualFX.draw=function(){const r=ovd.apply(this,arguments);try{if(typeof Glow66!=='undefined'){Glow66.enter('fx');try{drawFrame();}finally{Glow66.leave();}}else drawFrame();}catch{}return r;};
 // ---------- bảng ----------
 let el=null,tab='bm',msg='';
 const fmt=n=>Math.round(n).toLocaleString('vi-VN');
 const pTxt=p=>[p.c?fmt(p.c)+' ◈':'',p.e?fmt(p.e)+' ⬢':'',p.core?p.core+' lõi':'',p.frag?p.frag+' mảnh TB':'',p.ph?p.ph+' phôi Trắng':''].filter(Boolean).join(' + ');
 function build(){el=document.createElement('div');el.className='m63 tr67';el.hidden=true;document.body.appendChild(el);
  el.addEventListener('click',e=>{const t=e.target.closest('[data-x]');if(!t){if(e.target===el)close();return;}const a=t.dataset.x;msg='';
   if(a==='close')return close();if(a==='hull'){close();try{Skin69.open();}catch{}return;}if(a==='tab')tab=t.dataset.v;if(a==='slot'){window.__bm81='';const er=buySlot(+t.dataset.v);msg=er||('Giao dịch thành công!'+(window.__bm81?' '+window.__bm81:''));if(er){try{toast('⚠ '+er.toUpperCase());}catch{}}else if(!window.__bm81){try{toast('✔ ĐỔI THÀNH CÔNG');}catch{}}}if(a==='mref')msg=manualRefresh()||'Đã làm mới Chợ Đen!';if(a==='buy')msg=buySkin(t.dataset.v)||'Đã mua!';if(a==='eq')equip(t.dataset.v);render();});}
 function render(){if(!el)return;rollDay();grantReward();let body='';
  if(tab==='bm'){if(!open('market'))body='<p class="ex67-lock">Mở sau khi vượt ải 18.</p>';
   else{body=`${weekend()?'<p class="tr67-rare">★ PHIÊN CHỢ HIẾM CUỐI TUẦN · −30%</p>':''}${cheat?'<p class="ex67-lock">Phát hiện lùi giờ máy — Chợ Đen giữ phiên cũ cho tới khi đồng hồ vượt mốc đã lưu.</p>':''}<p class="tr67-rf">Làm mới mỗi 6 giờ · <button data-x="mref">LÀM MỚI NGAY · 50 💎 (${(S.bm.mr&&S.bm.mr.d===today()?S.bm.mr.n:0)}/5)</button></p><div class="tr67-slots">`+S.bm.slots.map((sl,i)=>{
     if(sl.startsWith('gem:')){const it=BM75.items.find(x=>'gem:'+x.id===sl);if(!it)return '';const u=S.bm.used[i]||0;return `<div class="tr67-slot gem"><b>💎 QUẦY KIM CƯƠNG · ${it.n}</b><small>${it.gem} 💎 · còn ${it.lim-u}/${it.lim}${it.wk?' · tuần '+wkUsed(it.id)+'/'+it.wk:''}</small><button data-x="slot" data-v="${i}" ${u>=it.lim||(it.wk&&wkUsed(it.id)>=it.wk)?'disabled':''}>${it.gem} 💎</button></div>`;}
     if(sl.startsWith('skin:')){const s=SK(sl.slice(5)),p=s.price,pp=p.core&&p.c?`${disc(p.core)} lõi hoặc ${fmt(disc(p.c))} ◈`:pTxt({c:p.c?disc(p.c):0,core:p.core?disc(p.core):0});return `<div class="tr67-slot skin"><b>SKIN · ${s.n}</b><small>Hạng ${s.r} · ${FOR81[s.t]}</small><button data-x="slot" data-v="${i}" ${S.owned.includes(s.id)||S.bm.used[i]?'disabled':''}>${S.owned.includes(s.id)?'ĐÃ CÓ':pp}</button></div>`;}
     const t=T(sl),u=S.bm.used[i]||0,give=priceOf(t.give),get=[t.get.c?'+'+fmt(t.get.c)+' ◈':'',t.get.e?'+'+t.get.e+' ⬢':'',t.get.core?'+'+t.get.core+' lõi':'',t.get.pp?'+'+t.get.pp+' mảnh phi công':'',t.get.tk?'+'+t.get.tk+' vé càn quét':''].filter(Boolean).join(' ');
     return `<div class="tr67-slot"><b>${t.n}</b><small>${pTxt(give)} → ${get} · còn ${t.lim-u}/${t.lim}</small><button data-x="slot" data-v="${i}" ${u>=t.lim?'disabled':''}>ĐỔI</button></div>`;}).join('')+'</div>';}}
  else{if(!open('skins'))body='<p class="ex67-lock">Mở sau khi vượt ải 25.</p>';
   else{body=`<p class="pl67-note">Skin chỉ đổi hình ảnh, không cộng chỉ số. Đã sở hữu ${S.owned.length}/18${S.titles.length?' · Danh hiệu: <b>'+S.titles[S.titles.length-1]+'</b>':''}</p>`+['bul','frm','bom'].map(ty=>`<h4 class="tr67-h">${ty==='bul'?'SKIN ĐẠN CHÍNH':ty==='frm'?'SKIN HÀO QUANG CHIẾN CƠ':'SKIN HIỆU ỨNG NỔ'} <small class="tr81f">· dùng chung cho mọi chiến cơ · chỉ đổi hình</small></h4><div class="tr67-skins">`+SKINS67.filter(s=>s.t===ty).map(s=>{const own=S.owned.includes(s.id),on=S.equip[ty]===s.id;let btn;
     if(own)btn=`<button data-x="eq" data-v="${s.id}" class="${on?'on':''}">${on?'ĐANG DÙNG':'DÙNG'}</button>`;else if(s.src==='soon')btn='<button disabled>SẮP CÓ</button>';else if(s.src==='reward')btn=`<button disabled>${s.how}</button>`;else if(s.src!=='shop')btn='<button disabled>CHỢ ĐEN</button>';else btn=`<button data-x="buy" data-v="${s.id}">${pTxt({c:s.price.c?disc(s.price.c):0,core:s.price.core?disc(s.price.core):0})}</button>`;
     return `<div class="tr67-skin" style="--c:${s.col||'#8fb6d8'}">${s.art&&TRADE_ART[s.art]?(s.t==='bom'?`<span class="tr67-art bom" style="background-image:url(${TRADE_ART[s.art]})"></span>`:`<img class="tr67-art" src="${TRADE_ART[s.art]}" alt="">`):'<i></i>'}<b>${s.n}</b><small>Hạng ${s.r}</small><small class="tr81f">${FOR81[s.t]}</small>${btn}</div>`;}).join('')+'</div>').join('');}}
  el.innerHTML=`<div class="m63-card tr67-wrap">${tab==='bm'&&TRADE_ART.merchant?`<img class="tr67-merchant" src="${TRADE_ART.merchant}" alt="">`:''}<div class="m63-eye">TRẠM GIAO DỊCH</div><h3>${tab==='bm'?'CHỢ ĐEN':'KHO SKIN'}</h3>
   <div class="ex67-tabs tr67-tabs"><button data-x="tab" data-v="bm" aria-pressed="${tab==='bm'}">CHỢ ĐEN</button><button data-x="tab" data-v="skin" aria-pressed="${tab==='skin'}">KHO SKIN</button><button data-x="hull">THÂN TÀU ›</button></div>
   <p class="pl67-sum">◈ ${fmt(Progress.balance())} · Lõi ${fmt(cores())}</p>${msg?`<p class="pl67-msg">${msg}</p>`:''}${body}
   <div class="m63-btns" style="display:flex;margin-top:12px"><button class="m63-go" data-x="close">ĐÓNG</button></div></div>`;}
 function openP(t){if(!open('market')&&!open('skins')){try{toast('MỞ KHÓA SAU KHI VƯỢT ẢI 18 · TRẠM GIAO DỊCH');}catch{}return;}if(t)tab=t;if(!el)build();el.hidden=false;render();}
 function close(){if(el)el.hidden=true;}
 setInterval(()=>{try{const b=dock67btn('tr67','GIAO DỊCH',()=>openP());if(b)b.classList.toggle('lk67',!open('market')&&!open('skins'));}catch{}},800);
 /* V69 · skin NỔ (GPT Đợt 10): dải 8 khung 1024×128 · áp cho nổ địch thường (nhỏ) + bom (lớn) */
 const BOOM=[],BIM={};function boomIm(k){if(!TRADE_ART[k])return null;let im=BIM[k];if(!im){im=new Image();im.src=TRADE_ART[k];BIM[k]=im;}return im.complete&&im.naturalWidth?im:null;}
 setInterval(()=>{try{const sk=S.equip.bom&&SK(S.equip.bom);if(sk&&sk.art)boomIm(sk.art);}catch{}},1000);
 function boomAdd(x,y,sz){const sk=S.equip.bom&&SK(S.equip.bom);if(!sk||!sk.art||!(mode==='play'))return;if(BOOM.length>24)BOOM.shift();BOOM.push({x,y,sz,t:0,k:sk.art});}
 try{const oe=VisualFX.explode;VisualFX.explode=function(x,y,size,type){const r=oe.apply(this,arguments);try{if(type!=='player')boomAdd(x,y,Math.max(56,(size||1)*62));}catch{}return r;};}catch{}
 try{const ob=bomb;bomb=function(){const b0=bombs;const r=ob.apply(this,arguments);try{if(bombs<b0){boomAdd(W/2,H*.42,W*1.1);}}catch{}return r;};}catch{}
 try{const vd=VisualFX.draw;VisualFX.draw=function(){const r=vd.apply(this,arguments);try{if(BOOM.length){const now=performance.now();ctx.save();ctx.globalCompositeOperation='source-over';for(let i=BOOM.length-1;i>=0;i--){const b=BOOM[i];const im=boomIm(b.k);if(!im){if(!b.w0)b.w0=now;if(now-b.w0>800)BOOM.splice(i,1);continue;}if(!b.t0)b.t0=now;const f=Math.floor((now-b.t0)/62);if(f>7){BOOM.splice(i,1);continue;}ctx.drawImage(im,f*128,0,128,128,b.x-b.sz/2,b.y-b.sz/2,b.sz,b.sz);}ctx.restore();}}catch{}return r;};}catch{}
 return {open:openP,close,state:()=>JSON.parse(JSON.stringify(S)),buySkin,buySlot,equip,rollDay,_own:id=>{if(!S.owned.includes(id))S.owned.push(id);save();}};
})();
