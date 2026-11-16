'use strict';
// V74 · ĐIỀU HƯỚNG 5 TAB (chốt 23/10/2026 sau tư vấn GPT + Gemini, người dùng chọn lối tắt 2 trái + 2 phải).
//  SẢNH · CHIẾN ĐẤU · PHI ĐỘI · TRANG BỊ · CỬA HÀNG. Mỗi tính năng 1 "nhà"; sảnh chỉ giữ lối tắt việc hằng ngày.
//  Không viết lại màn chức năng: tab con gọi đúng màn cũ (tab cũ, Hub40, hoặc .click() nút gốc đã ẩn).
//  Chấm đỏ: chỉ khi có quà nhận được / việc ngày chưa mở; tab cha 1 chấm, không số. Ô khóa: hiện khi còn ≤ 15 ải hoặc là mốc kế tiếp.
window.NAV74ON=true;
// V74 · icon GPT 15a-2 (ICON74) — thiếu tranh thì dùng ký tự
const ICMAP74={map:'tab_ban_do',dungeon:'ic_nguyen_lieu',challenge:'ic_thu_thach',expedition:'ic_vien_chinh',ships:'tab_chien_co',pilot:'ic_phi_cong',sss:'tab_hop_the',ult:'ic_vu_khi_tt',armory:'tab_kho',stones:'ic_da_kham',materials:'ic_nguyen_lieu',chest:'tab_ruong',market:'ic_giao_dich',skinshop:'ic_skin',breakout:'ic_thu_thach',seed78:'ic_thu_thach',honor:'ic_thanh_tuu',daily:'ic_thu_thach',tower:'ic_thap_boss',endless:'ic_vo_tan',patrol:'ic_tuan_tra',skin:'ic_skin',share:'ic_khoe',sssShip:'tab_hop_the',sssGear:'ic_trang_bi_sss',sssStar:'ic_dot_pha_sss',sssHall:'ic_sanh_sss',sssOc:'ic_dot_pha_sss',gifts:'ic_qua',wheel:'ic_vong_quay',limited:'ic_pho_ban_gh',
 home:'tab_sanh',combat:'tab_chien_dau',fleet:'tab_chien_co',equip:'tab_kho',shop:'tab_cua_hang',g_missions:'ic_nhiem_vu',g_nb:'ic_qua',g_season:'ic_thanh_tuu',g_codex:'ic_sanh_sss',g_pass:'ic_kho_bau',g_daily:'ic_diem_danh',g_ach:'ic_thanh_tuu',g_set:'ic_cai_dat',g_save:'ic_sao_luu',g_guide:'ic_cot_truyen',g_share:'ic_khoe',g_skill:'ic_thu_thach',g_max:'ic_dot_pha_sss',g_auto:'tab_chien_co',gear:'ic_cai_dat'};
function IC74(id,fb){const k=ICMAP74[id];let src=k&&typeof ICON74!=='undefined'?ICON74[k]:null;if(!src&&k){try{const v=getComputedStyle(document.documentElement).getPropertyValue('--u15-'+({ic_nhiem_vu:'ic-missions',ic_vo_tan:'ic-endless',ic_kho_bau:'ic-chest'})[k]);const m=v&&v.match(/url\(["']?([^"')]+)/);if(m)src=m[1];}catch{}}return src?`<img class="ic74" src="${src}" alt="">`:(fb||'');}
const Nav74=(()=>{
 const $=s=>document.querySelector(s);
 const KEY='saobang-nav74-v1';let P={};try{P=JSON.parse(localStorage.getItem(KEY)||'{}')||{};}catch{}P.last=P.last||{};P.seen=P.seen||{};
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(P));}catch{}};
 const today=()=>{const d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();};
 const cleared=()=>{try{return Onboard66.cleared();}catch{return 0;}};
 const ob=k=>{try{return Onboard66.open(k);}catch{return true;}};
 const src=()=>{try{return Lobby74.src();}catch{return {};}};
 const proxy=n=>()=>{const b=src()[n];if(b){b.click();return true;}return false;};
 const oldTab=k=>()=>{const b=$('#tabbar [data-tb="'+k+'"]');if(b)b.click();};
 const goRibbon=g=>()=>{const b=$('#hgr41 [data-go="'+g+'"]');if(b)b.click();};
 const oldDot=k=>!!$('#tabbar [data-tb="'+k+'"] .hb-dot:not([hidden])');
 const srcDot=n=>{const b=src()[n];return !!(b&&(b.classList.contains('m63-dot')||b.querySelector('.h1-dot:not([hidden]),.m63-dot')));};
 const ribDot=g=>{if(g==='fest')return typeof Fest78!=='undefined'&&Fest78.ready();if(g==='season'&&typeof S77!=='undefined')return S77.ready();if(g==='missions'&&typeof Q77!=='undefined')return Q77.ready();if(g==='nb')return typeof V75!=='undefined'&&V75.nbReady();const d=$('#hgr41 [data-go="'+g+'"] .h1-dot');return !!(d&&!d.hidden&&d.getClientRects().length);};
 const dailyOnce=(id,fn)=>()=>P.seen[id]!==today()&&fn();          // việc ngày: mở 1 lần trong ngày là tắt chấm
 const markDay=id=>{P.seen[id]=today();save();};
 function closeAll(){document.querySelectorAll('.m63:not(.g74keep),#m40,#g44,#ccht-lobby-wrap,#l74-more,#nav74p,#nav74g').forEach(e=>{e.hidden=true;});}
 // ---------- tính năng ----------
 const F={
  map:{n:'BẢN ĐỒ',ic:'🗺',c:'#4cc9f0',go:oldTab('map'),dot:()=>oldDot('map')},
  dungeon:{n:'PHÓ BẢN',ic:'⛏',c:'#ffd166',lk:()=>ob('dungeon_gold'),lv:8,go:()=>{try{Hub40.openSeg('dungeon');}catch{oldTab('chests')();}}},
  challenge:{n:'THỬ THÁCH',ic:'⚑',c:'#ff5d8f',lk:()=>ob('challenge')||ob('tower')||ob('endless'),lv:10,go:()=>page('challenge'),dot:()=>F.daily.dot()},
  expedition:{n:'VIỄN CHINH',ic:'◐',c:'#c77dff',lk:()=>cleared()>=60,lv:60,go:proxy('VIỄN CHINH')},
  ships:{n:'CHIẾN CƠ',ic:'✈',c:'#4cc9f0',go:oldTab('hangar'),dot:()=>oldDot('hangar'),chips:['skin','share']},
  pilot:{n:'PHI CÔNG',ic:'👩‍✈️',c:'#00f5d4',go:proxy('PHI CÔNG')},
  sss:{n:'HỢP THỂ',ic:'◆',c:'#b388ff',lk:()=>ob('sss'),lv:40,go:oldTab('gems'),dot:()=>oldDot('gems'),chips:['sssShip','sssGear','sssStar','sssHall','sssOc']},
  ult:{n:'TỐI THƯỢNG',ic:'✸',c:'#ff7b00',lk:()=>cleared()>=90,lv:90,chips:['wheel','limited'],go:()=>{try{Ult72.open();}catch{proxy('VŨ KHÍ TT')();}},dot:()=>{try{const s=Ult72.state();return Object.values(s.dl||{}).some(v=>v===1)||Object.values(s.wl||{}).some(v=>v===1);}catch{return false;}}},
  armory:{n:'KHO ĐỒ',ic:'🛡',c:'#4cc9f0',go:oldTab('arsenal'),dot:()=>oldDot('arsenal')},
  stones:{n:'ĐÁ KHẢM',ic:'◆',c:'#00f59b',lk:()=>cleared()>=70,lv:70,go:proxy('ĐÁ KHẢM')},
  materials:{n:'VẬT LIỆU',ic:'◈',c:'#ffd166',go:proxy('NGUYÊN LIỆU')},
  chest:{n:'KHO BÁU',ic:'🎁',c:'#ffb703',lk:()=>ob('chest'),lv:5,go:()=>{try{Hub40.openSeg('chest');}catch{oldTab('chests')();}},dot:()=>oldDot('chests')},
  market:{n:'CHỢ ĐEN',ic:'⇄',c:'#ffd166',go:proxy('GIAO DỊCH')},
  skinshop:{n:'TIỆM SKIN',ic:'👕',c:'#90e0ef',go:()=>{try{Trade67.open('skin');}catch{proxy('TỦ SKIN')();}}},   // V82: mở Kho skin đạn/khung/nổ (có nút sang skin thân tàu)
  honor:{n:'DANH DỰ',ic:'🎖',c:'#00f5d4',go:()=>{try{V77.open();}catch{}}},
  // lối tắt / chip
  daily:{n:'THỬ THÁCH NGÀY',ic:'⚑',c:'#ff5d8f',lk:()=>ob('challenge'),lv:10,go:()=>{markDay('daily');proxy('THỬ THÁCH NGÀY')();},dot:dailyOnce('daily',()=>srcDot('THỬ THÁCH NGÀY'))},
  event83:{n:'SỰ KIỆN TUẦN',ic:'🎪',c:'#ffb703',go:()=>{try{Event83.open();}catch{}},dot:()=>{try{return Event83.dot();}catch{return false;}}},
  breakout:{n:'PHÁ VÂY',ic:'⛓',c:'#ff9e2c',lk:()=>{try{return Progress.getState().cleared.length>=10;}catch{return true;}},lv:10,go:()=>{try{BK78.open();}catch{}}},
  seed78:{n:'THỬ THÁCH HẠT GIỐNG',ic:'🌱',c:'#9be15d',lk:()=>{try{return Progress.getState().cleared.length>=15;}catch{return true;}},lv:15,go:()=>{try{BK78.openSeed();}catch{}}},
  tower:{n:'THÁP BOSS',ic:'♜',c:'#ff7b00',lk:()=>ob('tower'),lv:15,go:goRibbon('tower')},
  endless:{n:'VÔ TẬN',ic:'∞',c:'#00f5d4',lk:()=>ob('endless'),lv:25,go:goRibbon('endless')},
  patrol:{n:'TUẦN TRA',ic:'⌖',c:'#4cc9f0',lk:()=>cleared()>=10,lv:10,go:proxy('TUẦN TRA'),dot:()=>{try{return Stone71.patrolPreview().h>=6;}catch{return false;}}},
  skin:{n:'SKIN',ic:'👕',c:'#90e0ef',go:proxy('TỦ SKIN')},
  share:{n:'KHOE',ic:'📸',c:'#80ed99',go:proxy('KHOE')},
  sssShip:{n:'CHIẾN CƠ SSS',ic:'✈',c:'#b388ff',go:oldTab('gems')},
  sssGear:{n:'TRANG BỊ SSS',ic:'★',c:'#ffb703',go:proxy('TRANG BỊ SSS')},
  sssStar:{n:'ĐỘT PHÁ ★',ic:'⇧',c:'#ff9e00',go:proxy('ĐỘT PHÁ SSS')},
  sssHall:{n:'SẢNH SSS',ic:'✦',c:'#ffd166',go:proxy('SẢNH SSS')},
  sssOc:{n:'TINH LUYỆN',ic:'⚗',c:'#7df9ff',go:()=>{try{OC75.open();}catch{}}},
  wheel:{n:'VÒNG QUAY',ic:'🎡',c:'#ff2a6d',lk:()=>{try{return Econ74.wOpen();}catch{return false;}},lv:45,go:()=>{try{Econ74.wheel();}catch{}},dot:()=>{try{return Econ74.wOpen()&&Econ74.freeLeft()>0;}catch{return false;}}},
  overlimit:{n:'BOSS VƯỢT HẠN',ic:'☠',c:'#ff2a6d',lk:()=>{try{return O78.unlocked();}catch{return false;}},lv:90,go:()=>{try{O78.open();}catch{}},dot:()=>{try{return O78.unlocked()&&O78.left()>0;}catch{return false;}}},
  limited:{n:'PHÓ BẢN GIỚI HẠN',ic:'⏱',c:'#ff7b00',lk:()=>{try{return Econ74.lOpen();}catch{return false;}},lv:45,go:()=>{markDay('limited');try{Econ74.limited();}catch{}},dot:dailyOnce('limited',()=>{try{return Econ74.lOpen()&&Econ74.triesLeft()>0;}catch{return false;}})},
  gifts:{n:'QUÀ',ic:'🎁',c:'#ff5d8f',go:()=>page('gifts'),dot:()=>ribDot('daily')||ribDot('ach')||ribDot('missions')}};
 const TABS=[
  {id:'home',n:'SẢNH',ic:'🏠'},
  {id:'combat',n:'CHIẾN ĐẤU',ic:'⚔',sub:['map','dungeon','challenge','expedition']},
  {id:'fleet',n:'PHI ĐỘI',ic:'✈',sub:['ships','pilot','sss','ult']},
  {id:'equip',n:'TRANG BỊ',ic:'🛡',sub:['armory','ships','materials','stones']},   // V78.4: nâng chiến cơ ngay trong Trang bị
  {id:'shop',n:'CỬA HÀNG',ic:'🛒',sub:['market','skinshop','honor']}];   // V78.4: bỏ Kho báu (rương Vô tận tự mở khi hết lượt)
 const gateHide=id=>{try{const g=UX75.GATE[id];return !!g&&(Progress.getState().cleared.length|0)<g;}catch{return false;}};
 const open_=id=>{const f=F[id];if(!f||!f.lk)return true;try{return !!f.lk();}catch{return true;}};
 function nextLock(){let best=null;for(const id in F){const f=F[id];if(!f.lk||open_(id))continue;if(!best||f.lv<F[best].lv)best=id;}return best;}
 function visible(id){if(open_(id))return true;const f=F[id];return (f.lv-cleared())<=15||id===nextLock();}
 const hasDot=id=>{const f=F[id];if(!f||!f.dot||!open_(id))return false;try{return !!f.dot();}catch{return false;}};
 const tabDot=t=>(t.sub||[]).some(hasDot)||(t.id==='home'&&(hasDot('gifts')));
 // ---------- dựng thanh ----------
 let bar,strip,cur='home',sub=null;
 function build(){if(bar)return;bar=document.createElement('nav');bar.id='nav74';document.body.appendChild(bar);
  strip=document.createElement('div');strip.id='nav74s';strip.hidden=true;document.body.appendChild(strip);
  bar.addEventListener('click',e=>{const b=e.target.closest('[data-t]');if(!b)return;if(b.classList.contains('ux75-lk')){try{toast('MỞ Ở ẢI '+b.dataset.need);}catch{}return;}tab(b.dataset.t);});
  strip.addEventListener('click',e=>{if(e.target.closest('[data-b197]')){ch197=false;paint();return;}const b=e.target.closest('[data-s],[data-c]');if(!b)return;if(b.dataset.c){cc197=b.dataset.c;setTimeout(()=>{try{paint();}catch{}},60);}if(b.dataset.s){if(b.dataset.s===sub&&F[sub]&&F[sub].chips){ch197=true;paint();return;}if(b.classList.contains('lk')){try{toast('MỞ Ở ẢI '+F[b.dataset.s].lv);}catch{}return;}subGo(b.dataset.s);}else{const f=F[b.dataset.c];closeAll();f&&f.go();}});
  document.body.classList.add('nav74on');}
 // V197: khi mục có chip (Hợp thể…), hàng chip THAY hàng tab con (nút ‹ để quay lại). Tắt: window.NAV197=false
 let ch197=true,cc197=null;
 function paint(){if(!bar)return;
  bar.innerHTML=TABS.map(t=>`<button type="button" data-t="${t.id}" class="${t.id===cur?'on':''} ${gateHide(t.id)?'ux75-lk':''}" data-need="${(()=>{try{return UX75.GATE[t.id]||0;}catch{return 0;}})()}"><i>${IC74(t.id,t.ic)}</i><small>${t.n}</small>${tabDot(t)?'<em></em>':''}</button>`).join('');
  const t=TABS.find(x=>x.id===cur);if(!t||!t.sub){strip.hidden=true;document.body.classList.remove('nav74sub');return;}
  const subs=t.sub.filter(visible),f=F[sub];
  const chips=f&&f.chips&&open_(sub)?`<div class="n74c">${f.chips.map(c=>`<button type="button" data-c="${c}" style="--lc:${F[c].c}"><b>${IC74(c,F[c].ic)}</b>${F[c].n}</button>`).join('')}</div>`:'';
  if(chips&&window.NAV197!==false&&ch197){strip.innerHTML=`<div class="n74s n197"><button type="button" class="bk" data-b197="1">‹ ${F[sub].n}</button>${f.chips.map(c=>`<button type="button" data-c="${c}" class="${c===cc197?'on':''}" style="--lc:${F[c].c}">${F[c].n}${hasDot(c)?'<em></em>':''}</button>`).join('')}</div>`;strip.hidden=false;document.body.classList.add('nav74sub');document.body.classList.remove('nav74chip');return;}
  strip.innerHTML=(window.NAV197!==false?'':chips)+`<div class="n74s">${subs.map(s=>{const o=open_(s);return `<button type="button" data-s="${s}" class="${s===sub?'on':''} ${o?'':'lk'}" style="--lc:${F[s].c}">${F[s].n}${o?'':'<i>Ải '+F[s].lv+'</i>'}${hasDot(s)?'<em></em>':''}</button>`;}).join('')}</div>`;
  strip.hidden=false;document.body.classList.add('nav74sub');document.body.classList.toggle('nav74chip',!!chips&&window.NAV197===false);}
 function tab(id){const t=TABS.find(x=>x.id===id);if(!t)return;closeAll();cur=id;
  if(!t.sub){sub=null;oldTab('lobby')();try{Lobby68.set('lobby');}catch{}paint();return;}
  let s=P.last[id];if(!s||!t.sub.includes(s)||!open_(s))s=t.sub.find(open_)||t.sub[0];subGo(s,true);}
 const SCREEN=new Set(['map','dungeon','ships','sss','armory','chest']);
 function subGo(s,fromTab){if(!open_(s))return;ch197=true;if(F[s]&&F[s].chips&&!F[s].chips.includes(cc197))cc197=F[s].chips[0];closeAll();if(!SCREEN.has(s)&&document.querySelector('#hub40:not([hidden]),#cmap:not([hidden])'))oldTab('lobby')();sub=s;P.last[cur]=s;save();const f=F[s];try{f.go();}catch(e){console.warn('nav74',s,e);}paint();}
 // ---------- trang phụ: Thử thách · Quà · ⚙ ----------
 function page(kind){let el=$('#nav74p');if(!el){el=document.createElement('div');el.id='nav74p';el.className='n74p';document.body.appendChild(el);
   el.addEventListener('click',e=>{const t=e.target.closest('[data-go74]');if(!t){if(e.target===el)el.hidden=true;return;}const id=t.dataset.go74;if(id==='__x'){el.hidden=true;return;}if(t.classList.contains('lk')){try{toast('MỞ Ở ẢI '+(F[id]?F[id].lv:''));}catch{}return;}el.hidden=true;const f=F[id];if(f)f.go();else if(G[id])G[id]();});}
  const card=(id,desc,extra='')=>{const f=F[id],o=open_(id);return `<button type="button" class="n74card ${o?'':'lk'}" data-go74="${id}" style="--lc:${f.c}"><i>${IC74(id,f.ic)}</i><div><b>${f.n}</b><small>${desc}</small></div><span>${o?'VÀO ›':'Ải '+f.lv}</span>${hasDot(id)?'<em></em>':''}</button>`;};
  let body='',title='';
  if(kind==='challenge'){title='THỬ THÁCH';body=card('event83','4 sự kiện xoay vòng mỗi tuần · Boss cuối tuần Thứ Bảy & Chủ Nhật')+card('breakout','Roguelite 12 chặng · chọn Ấn Chú · không tốn thể lực')+card('seed78','Cùng 1 ải mỗi ngày · bảng 50 phi công · mã khoe bạn bè')+card('daily','Luật đặc biệt mỗi ngày · chuỗi ngày thưởng tới +40%')+card('tower','Leo tầng, mỗi tầng một boss mạnh hơn')+card('endless','Sống sót qua nhiều đợt · ghi kỷ lục')+card('limited','Boss 60 giây · mảnh Vũ khí tối thượng')+card('overlimit','10 bậc · từ tố xoay tuần · phá giáp làm boss choáng');}
  else if(kind==='gifts'){title='QUÀ';const r=(g,ic,n,d)=>`<button type="button" class="n74card" data-go74="g_${g}" style="--lc:#ff5d8f"><i>${IC74('g_'+g,ic)}</i><div><b>${n}</b><small>${d}</small></div><span>MỞ ›</span>${ribDot(g)?'<em></em>':''}</button>`;
   body=(typeof Fest78!=='undefined'&&Fest78.active()?(()=>{const f=Fest78.active();return r('fest',f.ic,f.n,'Quà mỗi ngày · hạ quái nhặt '+f.tn.toLowerCase()+' đổi quà, danh hiệu, hào quang');})():'')+(typeof V75!=='undefined'&&V75.state().nb.got.length<7?r('nb','🎁','QUÀ 7 NGÀY ĐẦU','Mỗi ngày đăng nhập nhận 1 mốc · tổng 3.400 💎'):'')+r('codex','📚','ĐỒ GIÁM & CỘNG HƯỞNG','Sưu tầm cộng chỉ số vĩnh viễn · bộ SSS cùng hệ')+r('season','🏁','MÙA GIẢI 14 NGÀY','20 cấp thưởng · Làn Tinh Anh 1.500 💎')+r('missions','📋','NHIỆM VỤ','Mốc ngày 50 💎 · mốc tuần 150 💎 · có nút Nhận tất cả')+(ob('daily')?r('daily','📅','ĐIỂM DANH','Quà đăng nhập theo chuỗi ngày'):'')+r('ach','🏆','THÀNH TỰU','Mốc thành tích dài hạn')+r('pass','💳','THẺ THÁNG','1.200 💎 · mỗi ngày 70 💎 + 50 🔋 + 3 vé càn quét')+r('energy','🔋','THỂ LỰC','Hồi 1 mỗi 5 phút · mua thêm bằng 💎');}
  else if(kind==='gear'){title='HỆ THỐNG';const r=(id,ic,n,d)=>`<button type="button" class="n74card" data-go74="${id}" style="--lc:#7fdcff"><i>${IC74(id,ic)}</i><div><b>${n}</b><small>${d}</small></div><span>›</span></button>`;
   body=r('g_set','⚙','CÀI ĐẶT','Hình ảnh · âm thanh · mã quản trị')+r('g_save','⇩','SAO LƯU','Xuất / nhập mã lưu game')+r('g_guide','📖','SỔ TAY','Hướng dẫn mọi tính năng · lộ trình mở khóa')+r('g_story','📜','NHẬT KÝ CHIẾN DỊCH','Xem lại cốt truyện các chương đã mở')+`<h4>XEM CHIẾN CƠ Ở SẢNH</h4>`+r('g_auto','▶','TỰ DIỄN','Bật / tắt màn bắn thử ở sảnh')+r('g_skill','✦','THỬ KỸ NĂNG','Xem kỹ năng chiến cơ')+r('g_max','⚡','XEM MAX','Xem dạng Siêu cấp / MAX')+r('g_share','📸','KHOE','Lưu ảnh chiến cơ');}
  el.innerHTML=`<div class="n74pc"><div class="n74ph"><b>${title}</b><button type="button" data-go74="__x" class="n74x">✕</button></div>${body}</div>`;el.hidden=false;}
 const sel=n=>{const S=src();const k=Object.keys(S).find(x=>x.startsWith(n));if(k){S[k].click();return true;}return false;};
 const G={g_fest:()=>{try{Fest78.open();}catch{}},g_codex:()=>{try{Codex77.open();}catch{}},g_season:()=>{try{S77.open();}catch{}},g_nb:()=>{try{V75.open('nb');}catch{}},g_pass:()=>{try{V75.open('pass');}catch{}},g_energy:()=>{try{V75.open('energy');}catch{}},g_missions:()=>{try{Q77.open('d');}catch{goRibbon('missions')();}},g_daily:goRibbon('daily'),g_ach:goRibbon('ach'),g_set:proxy('CÀI ĐẶT'),g_save:proxy('SAO LƯU'),g_guide:()=>{try{Guide74.library();}catch{}},g_story:()=>{try{Story80.journal();}catch{}},
  g_auto:()=>{tab('home');setTimeout(()=>sel('TỰ DIỄN'),200);},g_skill:()=>{tab('home');setTimeout(()=>sel('THỬ KỸ NĂNG'),200);},g_max:()=>{tab('home');setTimeout(()=>sel('SIÊU CẤP'),200);},g_share:proxy('KHOE')};
 // V75: nút "trang đầy đủ" của Hub40 mở màn cũ cuộn dọc (tính năng đã bỏ) → chặn; Hợp thể đầy đủ chuyển sang trang SSS mới
 document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('#hub40 .hb-full[data-full]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();const k=b.dataset.full;try{if(k==='gems'){tab('fleet');setTimeout(()=>subGo('sss'),60);}}catch{}},true);
 // ---------- sảnh: hàng trên + 2 trái + 2 phải theo giai đoạn ----------
 const STAGE={early:{L:['dungeon'],R:['daily','tower']},mid:{L:['patrol','market'],R:['daily','sss']},late:{L:['patrol','expedition'],R:['daily','ult']}};
 let lastKey='';
 function lobby(){const r=$('#hgr41');if(!r)return;const st=r.querySelector('.h1-stage');if(!st)return;r.classList.add('n74lob');
  const rib=r.querySelector('.h1-ribbon');if(rib&&!rib.querySelector('[data-n74="gifts"]')){const g=document.createElement('button');g.type='button';g.className='h1-ic n74rib';g.dataset.n74='gifts';g.innerHTML=IC74('gifts','<b>🎁</b>')+'<small>QUÀ</small><em class="n74d" hidden></em>';rib.insertBefore(g,rib.firstChild);
   const w=document.createElement('button');w.type='button';w.className='h1-ic n74rib n74wheel';w.dataset.n74='wheel';w.innerHTML=IC74('wheel','<b>🎡</b>')+'<small>VÒNG QUAY</small><em class="n74d" hidden></em>';rib.appendChild(w);
   const s=document.createElement('button');s.type='button';s.className='h1-ic n74rib n74gear';s.dataset.n74='gear';s.innerHTML=IC74('gear','<b>⚙</b>')+'<small>HỆ THỐNG</small>';rib.appendChild(s);}
  rib&&rib.querySelectorAll('[data-n74]').forEach(b=>{if(!b.dataset.w){b.dataset.w=1;b.addEventListener('click',e=>{e.stopPropagation();e.preventDefault();const k=b.dataset.n74;if(k==='wheel'){if(open_('wheel'))F.wheel.go();else{try{toast('VÒNG QUAY MỞ Ở ẢI '+F.wheel.lv);}catch{}}return;}page(k==='gifts'?'gifts':'gear');},true);}});
  const wd=rib&&rib.querySelector('[data-n74="wheel"]');if(wd){wd.classList.toggle('lk',!open_('wheel'));const d=wd.querySelector('.n74d');if(d)d.hidden=!hasDot('wheel');}
  const gd=rib&&rib.querySelector('[data-n74="gifts"] .n74d');if(gd)gd.hidden=!hasDot('gifts');
  const c=cleared(),ph=c<=30?'early':c<=100?'mid':'late',set=STAGE[ph];
  const t=id=>{const f=F[id];if(!f||!open_(id))return '';return `<button type="button" class="l74-b" data-n74s="${id}" style="--lc:${f.c}"><i>${IC74(id,'<b>'+f.ic+'</b>')}</i><small>${f.n}</small>${hasDot(id)?'<em class="l74-dot">!</em>':''}</button>`;};
  const key=ph+open_('expedition')+set.L.concat(set.R).map(id=>id+open_(id)+hasDot(id)).join();if(key===lastKey&&st.querySelector('.n74-l'))return;lastKey=key;
  let L=st.querySelector('.n74-l'),R=st.querySelector('.n74-r');if(!L){L=document.createElement('div');L.className='l74 l74-l n74-l';st.appendChild(L);R=document.createElement('div');R.className='l74 l74-r n74-r';st.appendChild(R);
   st.addEventListener('click',e=>{const b=e.target.closest('[data-n74s]');if(!b)return;e.stopPropagation();e.preventDefault();const f=F[b.dataset.n74s];f&&f.go();},true);}
  L.innerHTML=set.L.map(id=>id==='market'&&window.V98!==false&&open_('expedition')?'expedition':id).map(t).join('');// V98 REVIEW97: đã mở Viễn chinh thì thay ô Chợ Đen (Chợ Đen có trong tab CỬA HÀNG)R.innerHTML=set.R.map(t).join('');
  // icon tài nguyên GPT 15a-2
  if(typeof ICON74!=='undefined')[['stone','res_da_nang_cap'],['coin','res_hop_kim'],['gem','res_loi']].forEach(([c,k])=>{const i=r.querySelector('.h1-res .h1-chip.'+c+' > i');if(i&&!i.dataset.ic74&&ICON74[k]){i.dataset.ic74=1;i.innerHTML=`<img class="ic74r" src="${ICON74[k]}" alt="">`;}});
  const gm=r.querySelector('.gem74');if(gm&&!gm.dataset.ic74&&typeof ICON74!=='undefined'&&ICON74.res_kim_cuong){gm.dataset.ic74=1;gm.innerHTML=`<img class="ic74r" src="${ICON74.res_kim_cuong}" alt=""> <b data-gem74>${(()=>{try{return Econ74.gems().toLocaleString('vi-VN');}catch{return 0;}})()}</b>`;}
  const pc=$('#lb68 .lb68-card');if(pc&&!pc.dataset.n74){pc.dataset.n74=1;pc.style.cursor='pointer';pc.addEventListener('click',()=>F.pilot.go());}}
 // ---------- Tuần tra ở góc Bản đồ ----------
 function mapPatrol(){const m=$('#cmap');if(!m||m.hidden)return;let b=m.querySelector('.n74pat');if(!open_('patrol')){if(b)b.remove();return;}
  if(!b){b=document.createElement('button');b.type='button';b.className='n74pat';m.appendChild(b);b.addEventListener('click',e=>{e.stopPropagation();F.patrol.go();});}
  let h=0;try{h=Stone71.patrolPreview().h;}catch{}const pct=Math.min(100,Math.round(h/12*100));const txt=`<i>⌖</i><b>TUẦN TRA</b><small>${pct}%</small>${h>=6?'<em></em>':''}`;if(b.dataset.k!==txt){b.dataset.k=txt;b.innerHTML=txt;b.style.setProperty('--p',pct+'%');}}
 // ---------- vòng lặp ----------
 const busy=()=>{try{return ['play','pause','reward'].includes(mode);}catch{return false;}};
 let lastP='';
 function tick(){build();const b=busy();bar.hidden=b;document.body.classList.toggle('nav74on',!b);if(b){strip.hidden=true;document.body.classList.remove('nav74sub','nav74chip');lastP='';return;}
  // đồng bộ tab theo màn đang mở (vào màn bằng lối khác vẫn sáng đúng tab)
  const lob=$('#hgr41');if(lob&&!lob.hidden&&!document.querySelector('#hub40:not([hidden]),#cmap:not([hidden])')){if(cur!=='home'&&!document.querySelector('.m63:not([hidden]),#g44:not([hidden]),#ccht-lobby-wrap:not([hidden]),#m40:not([hidden])')){cur='home';sub=null;}}
  else if($('#cmap:not([hidden])')&&cur!=='combat'){cur='combat';sub='map';}
  const k=cur+sub+TABS.map(tabDot).join()+(sub&&F[sub].chips?1:0)+TABS.map(t=>(t.sub||[]).map(s=>visible(s)+''+open_(s)+hasDot(s)).join()).join('|');if(k!==lastP){lastP=k;paint();}
  lobby();mapPatrol();if(!P.intro&&cur==='home'&&cleared()>=3&&typeof Guide74!=='undefined'&&!document.querySelector('.m63:not([hidden]),#g74:not([hidden]),#tutorial392,#st66:not([hidden]),[id^=st66]:not([hidden])')){P.intro=1;save();setTimeout(()=>{try{(Guide74.banner||Guide74.show)('nav');}catch{}},600);}}
 setInterval(()=>{try{tick();}catch(e){}},500);
 return {tab,sub:subGo,page,F,TABS,state:()=>({cur,sub,P:JSON.parse(JSON.stringify(P))}),closeAll};
})();
