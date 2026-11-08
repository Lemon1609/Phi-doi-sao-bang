'use strict';
// V71 · HỆ ĐÁ KHẢM (Đá-1) — thay hệ Ngọc. Thiết kế: Gemini (GEMINI_TRA_LOI_DA_V70.md), Claude hiệu chỉnh theo thang CP thật (tối đa ≈ 33.000).
//  • 5 phẩm: Trắng · Lục · Lam · Tím · Cam. 4 vị trí: Chiến cơ · Giáp · Tên lửa · Tàu con. Mỗi món 5 ô, mở theo khung V70: Lam · Lam+2 · Tím · Tím+3 · Tím+5
//    (SSS theo ★1/3/5/7/9). Ô 1: chỉ số · ô 2: chỉ số/hiệu ứng · ô 3: + Ω/Σ · ô 4–5: hiệu ứng/Ω/Σ (α/β ở Đá-2).
//  • Đá chỉ số: % tấn công CỦA MÓN ĐÓ (chiến cơ / tên lửa / tàu con) hoặc % máu & giáp (giáp). Ω/Σ: chỉ lắp đúng mẫu, mỗi món 1 Ω + 1 Σ.
//  • Đầy đá Cam (cả 4 vị trí) ≈ +19% CP. 14 đá hiệu ứng trong trận (không cộng CP); 14 viên còn lại + Tẩy đá + α/β ở Đá-2.
//  • Tụ hợp 5 → 1, Tinh hóa trang bị Lam/Tím, Tuần tra treo máy, quy đổi Ngọc cũ.
const STONE71={
 unlock:70,patrolUnlock:10,
 tn:['Trắng','Lục','Lam','Tím','Cam'],tc:['#d6e0ea','#3ee08f','#3aa8ff','#b45cff','#ff9a2e'],
 pos:['ship','armor','missiles','sidearm'],pn:{ship:'Chiến cơ',armor:'Giáp',missiles:'Tên lửa',sidearm:'Tàu con'},
 slotN:[2,4,6,9,11],slotS:[1,3,5,7,9],
 allow:[['stat'],['stat','effect'],['stat','effect','omega','sigma'],['effect','omega','sigma','alpha'],['effect','omega','sigma','beta']],
 stat:{off:[.005,.01,.016,.023,.03],def:[.01,.02,.03,.045,.06]},          // % của món
 ex:{off:{omega:[.025,.045],sigma:[.018,.032]},def:{omega:[.05,.08],sigma:[.035,.06]},sss:1.3},  // [Tím, Cam]
 // hiệu ứng: v = [Lam, Tím, Cam] (null = chưa có ở phẩm đó), cap = trần cộng dồn, hi = chỉ lấy viên cao nhất
 eff:{
  s2:{pos:'ship',n:'Đá Hấp Thụ',v:[null,.10,.20],cap:.25,d:'Nhặt vật phẩm hồi {v} giáp tối đa (đầy giáp: +1 máu) · hồi 6 giây'},
  s5:{pos:'ship',n:'Đá Bạo Tẩu',v:[null,.5,1],cap:2.5,u:'s',d:'Bạo Tẩu kéo dài thêm {v} (tối đa 12 giây)'},
  s7:{pos:'ship',n:'Đá Diệt Boss',v:[.04,.07,.12],cap:.24,d:'+{v} sát thương khi đánh boss'},
  a2:{pos:'armor',n:'Đá Nhân Đôi',v:[null,.15,.30],cap:.45,d:'Nhặt vật phẩm nâng đạn: {v} tỉ lệ được 2 cấp'},
  a7:{pos:'armor',n:'Đá Toàn Thịnh',v:[.07,.115,.205],cap:.30,d:'Khi đầy máu: +{v} sát thương'},
  m2:{pos:'missiles',n:'Đá Hưng Phấn',v:[null,.07,.15],cap:.15,hi:1,d:'5 giây sau khi nhặt vật phẩm: +{v} sát thương'},
  m4:{pos:'missiles',n:'Đá Dư Chấn',v:[null,.15,.265],cap:.35,d:'5 giây sau khi dùng bom: +{v} sát thương'},
  m6:{pos:'missiles',n:'Đá Chinh Phạt',v:[.05,.07,.155],cap:.155,hi:1,d:'Chế độ Vô Tận: +{v} sát thương'},
  m7:{pos:'missiles',n:'Đá Quét Quân',v:[.07,.115,.205],cap:.30,d:'+{v} sát thương khi không có boss (quái thường, tinh anh)'},
  w2:{pos:'sidearm',n:'Đá Phòng Hộ',v:[null,.10,.20],cap:.25,d:'5 giây sau khi nhặt vật phẩm: giảm {v} sát thương nhận vào'},
  w3:{pos:'sidearm',n:'Đá Trợ Công',v:[null,.115,.205],cap:.30,d:'Khi đang có khiên chắn đạn: +{v} sát thương'},
  w4:{pos:'sidearm',n:'Đá Nhiệt Hạch',v:[null,.18,.30],cap:.45,d:'+{v} sát thương của bom'},
  w5:{pos:'sidearm',n:'Đá Quá Tải',v:[null,.115,.205],cap:.30,d:'Khi đang Bạo Tẩu: +{v} sát thương'},
  w7:{pos:'sidearm',n:'Đá Tử Chiến',v:[.08,.135,.235],cap:.35,d:'Máu càng thấp sát thương càng cao, tối đa +{v} (máu ≤ 25%)'},
  // V73 · Đá-2 (các dòng "kỹ năng phi công" chuyển sang Vũ khí tối thượng theo thiết kế GPT, Câu 6)
  s1:{pos:'ship',n:'Đá Chỉ Huy',v:[null,.1,.2],cap:.2,grp:'pre',d:'Vào trận: tối thượng Vũ khí tối thượng sạc sẵn {v} (chung trần 20% với Đá Tiên Phong)'},
  s3:{pos:'ship',n:'Đá Nối Khiên',v:[null,.7,1.5],cap:2.5,u:'s',d:'Nhặt khiên khi khiên đang bật: kéo dài thêm {v}'},
  s4:{pos:'ship',n:'Đá Nạp Đạn Bom',v:[null,.2,.5],cap:.7,d:'Dùng bom: {v} tỉ lệ +1 cấp đạn'},
  s6:{pos:'ship',n:'Đá Nhảy Vọt',v:[8,14,24],cap:24,hi:1,u:'n',d:'Vô Tận: vào trận từ đợt {v}+1 (đợt bỏ qua không nhận thưởng)'},
  a1:{pos:'armor',n:'Đá Bảo Toàn',v:[null,.1,.2],cap:.3,d:'Dùng tối thượng Vũ khí tối thượng: {v} tỉ lệ giữ lại lượt (1 lần/trận)'},
  a3:{pos:'armor',n:'Đá Dưỡng Khiên',v:[null,.08,.15],cap:.15,hi:1,d:'Khi khiên chắn đạn đang bật: mỗi 3 giây hồi {v} giáp'},
  a4:{pos:'armor',n:'Đá Hồi Bom',v:[null,60,45],cap:45,lo:1,u:'s',d:'Trong trận hồi 1 bom mỗi {v} (tối đa 3)'},
  a5:{pos:'armor',n:'Đá Kim Cang',v:[null,.11,.2],cap:.2,hi:1,d:'Khi Bạo Tẩu: giảm {v} sát thương nhận vào'},
  a6:{pos:'armor',n:'Đá Vinh Quang',v:[.2,.5,1],cap:1,hi:1,d:'Vô Tận: +{v} điểm hạ địch'},
  m1:{pos:'missiles',n:'Đá Tiếp Viện',v:[null,.5,1],cap:1,hi:1,d:'Dùng tối thượng Vũ khí tối thượng: {v} tỉ lệ rơi 1 vật phẩm hỗ trợ (hồi 20 giây)'},
  m3:{pos:'missiles',n:'Đá Phá Đạn',v:[null,150,300],cap:300,hi:1,u:'n',d:'Khi khiên chắn đạn đang bật: mỗi giây +{v} điểm và +2 ◈ (tối đa 60 ◈/ải)'},
  m5:{pos:'missiles',n:'Đá Cuồng Sát',v:[null,.1,.2],cap:.3,d:'Khi Bạo Tẩu: hạ địch +{v} điểm, 15% rơi thêm sao'},
  w1:{pos:'sidearm',n:'Đá Tiên Phong',v:[null,.1,.2],cap:.2,grp:'pre',d:'Vào trận: tối thượng Vũ khí tối thượng sạc sẵn {v} (chung trần 20% với Đá Chỉ Huy)'},
  w6:{pos:'sidearm',n:'Đá Di Sản',v:[6,10,16],cap:16,hi:1,u:'n',d:'Vô Tận: tử trận thì lượt sau trong ngày vào từ đợt {v}+1'}},
 // Đá α/β (Đá-2): Gemini + GPT (6 món bổ sung), khóa bộ 1–3 và 3 chiến cơ đầu. Hiệu ứng quy về cơ chế game làm được, mô tả đúng cái game thực làm.
 //  e: ['dmg', p, điều kiện] = +p sát thương CỦA MÓN ĐÓ (quy theo tỉ trọng sát thương món trong đội) · ['u', loại, giá trị] = tiện ích. Bản Tím = ½ (pv: giá trị Tím riêng).
 ab:{
  9:{pos:'ship',pa:'alpha',a:{n:'Tinh Hà α',e:[['dmg',.20]],d:'Vụ nổ từ trường lớn hơn: +{p} sát thương đạn chính'},b:{n:'Tinh Hà β',e:[['dmg',.25,'super']],d:'Bạo Tẩu gọi vệ tinh phụ: +{p} sát thương đạn chính khi Bạo Tẩu'}},
  6:{pos:'ship',pa:'beta',a:{n:'Đao Phong α',e:[['u','superKill',.5]],d:'Bạo Tẩu: hạ tinh anh/quái lớn kéo dài Bạo Tẩu +{v} giây (tối đa +5 giây/lần)'},b:{n:'Đao Phong β',e:[['dmg',.35]],d:'Lưỡi đao xoáy mạnh và lớn hơn: +{p} sát thương đạn chính'}},
  5:{pos:'ship',pa:'alpha',a:{n:'U Linh α',e:[['dmg',.40,'boss']],d:'Giữ laser trên mục tiêu: +{p} sát thương đạn chính khi đánh boss'},b:{n:'U Linh β',e:[['dmg',.20,'mob']],d:'Tia khúc xạ nảy thêm: +{p} sát thương đạn chính lên quái thường'}},
  3:{pos:'ship',pa:'alpha',a:{n:'Thần Ma α',e:[['dmg',.20]],d:'Bắn xa càng mạnh: +{p} sát thương đạn chính (trung bình)'},b:{n:'Thần Ma β',e:[['dmg',.25,'mob']],d:'Đạn xuyên cộng dồn: +{p} sát thương đạn chính lên đàn quái'}},
  8:{pos:'ship',pa:'beta',a:{n:'Lược Ảnh α',e:[['dmg',.27],['u','keepPower',1]],d:'+{p} sát thương đạn chính; hết Bạo Tẩu giữ đạn cấp tối đa'},b:{n:'Lược Ảnh β',e:[['dmg',.08]],d:'Mỗi phát thứ 5 gây ×1,4: +{p} sát thương đạn chính (trung bình)'}},
  7:{pos:'ship',pa:'alpha',a:{n:'Phần Thiên α',e:[['dmg',.30]],d:'Thiêu đốt lâu và lan rộng hơn: +{p} sát thương đạn chính'},b:{n:'Phần Thiên β',e:[['dmg',.30]],d:'Tàn lửa dưới sân: +{p} sát thương đạn chính'}},
  4:{pos:'ship',pa:'beta',a:{n:'Thự Quang α',e:[['dmg',.27]],d:'Dồn hỏa lực, thu hẹp góc tán xạ: +{p} sát thương đạn chính'},b:{n:'Thự Quang β',e:[['dmg',.20]],d:'Áp sát càng mạnh: +{p} sát thương đạn chính (trung bình)'}},
  seraph36:{pos:'armor',pa:'alpha',a:{n:'Thiên Ân α',e:[['u','shieldEvery',60]],pv:{shieldEvery:100},d:'Mỗi {v} giây tự bật khiên chắn đạn 5 giây'},b:{n:'Thiên Ân β',e:[['u','shieldPlus',2]],d:'Khiên chắn đạn nhặt được kéo dài thêm {v} giây'}},
  void36:{pos:'armor',pa:'alpha',a:{n:'Vực Tối α',e:[['u','bombConvert',1]],d:'Dùng bom: mỗi viên đạn bị xóa +{v}×20 điểm, hồi {v}×10% giáp'},b:{n:'Vực Tối β',e:[['u','buffAfterHit',.32]],d:'Trúng đạn: +{v} sát thương toàn đội trong 6 giây'}},
  aurora36:{pos:'armor',pa:'alpha',a:{n:'Thánh Quang α',e:[['u','pickBuff',.39]],d:'Đầy máu: mỗi 20 vật phẩm nhặt được +{v} sát thương toàn đội 8 giây'},b:{n:'Thánh Quang β',e:[['u','healBoost',.5]],d:'Máu/giáp hồi từ vật phẩm +{v}'}},
  nanite:{pos:'armor',pa:'alpha',a:{n:'Nano α',e:[['u','hpScale',.195]],d:'Máu & giáp càng đầy sát thương toàn đội càng cao, tối đa +{v}'},b:{n:'Nano β',e:[['u','killShield',19]],pv:{killShield:22},d:'Mỗi {v} quái hạ được: hồi 10% giáp'}},
  reactive:{pos:'armor',pa:'alpha',a:{n:'Long Viêm α',e:[['u','grazeChain',.44]],d:'Lách đạn 5 lần liên tiếp (2 giây): +{v} sát thương toàn đội 8 giây'},b:{n:'Long Viêm β',e:[['u','grazeScore',1]],d:'Lách đạn: +{v}×100% điểm; mỗi 10 lần lách hồi 5% giáp'}},
  phase:{pos:'armor',pa:'alpha',a:{n:'Dịch Pha α',e:[['u','hitInvuln',.4]],d:'Trúng đạn: bất tử thêm {v} giây (hồi 5 giây)'},b:{n:'Dịch Pha β',e:[['u','hitReduce',.25]],d:'Sau khi trúng đạn: giảm {v} sát thương nhận vào trong 3 giây'}},
  judgement36:{pos:'missiles',pa:'alpha',a:{n:'Phán Quyết α',e:[['dmg',.28]],d:'Tách 3 luồng hình quạt: +{p} sát thương tên lửa'},b:{n:'Phán Quyết β',e:[['dmg',.30]],d:'Nổ nội chấn lần 2: +{p} sát thương tên lửa'}},
  nova36:{pos:'missiles',pa:'alpha',a:{n:'Diệt Tinh α',e:[['dmg',.30]],d:'Vụ nổ lớn hơn: +{p} sát thương tên lửa'},b:{n:'Diệt Tinh β',e:[['dmg',.20]],d:'Mục tiêu càng xa càng đau: +{p} sát thương tên lửa (trung bình)'}},
  singularity:{pos:'missiles',pa:'alpha',a:{n:'Hư Không α',e:[['dmg',.25]],d:'Vùng hư không tồn tại lâu hơn: +{p} sát thương tên lửa'},b:{n:'Hư Không β',e:[['dmg',.28,'boss'],['dmg',-.12,'mob']],d:'Chuyên diệt boss: +28% lên boss, −12% lên quái thường (sát thương tên lửa)'}},
  comet36:{pos:'missiles',pa:'alpha',a:{n:'Thiên Kiếm α',e:[['dmg',.25]],d:'Cú chạm đầu tiên mạnh hơn: +{p} sát thương tên lửa'},b:{n:'Thiên Kiếm β',e:[['dmg',.15]],d:'Hồi kiếm đánh bồi: +{p} sát thương tên lửa'}},
  stellar:{pos:'missiles',pa:'beta',a:{n:'Thiên Tinh α',e:[['dmg',.30]],d:'Nổ gốc mạnh và rộng hơn: +{p} sát thương tên lửa'},b:{n:'Thiên Tinh β',e:[['dmg',.20]],d:'Thêm mảnh xuyên: +{p} sát thương tên lửa'}},
  spiral:{pos:'missiles',pa:'alpha',a:{n:'Xoắn Ốc α',e:[['dmg',.30]],d:'+{p} sát thương tên lửa'},b:{n:'Xoắn Ốc β',e:[['dmg',.20]],d:'Tách tên lửa con: +{p} sát thương tên lửa'}},
  halo36:{pos:'sidearm',pa:'alpha',a:{n:'Thiên Hoàn α',e:[['dmg',.30,'boss']],d:'Dồn vào một mục tiêu: +{p} sát thương tàu con khi đánh boss'},b:{n:'Thiên Hoàn β',e:[['dmg',.30,'super']],d:'Bạo Tẩu tăng dần: +{p} sát thương tàu con khi Bạo Tẩu'}},
  lance36:{pos:'sidearm',pa:'beta',a:{n:'Quang Thương α',e:[['dmg',.32]],d:'Khóa góc bắn thẳng: +{p} sát thương tàu con'},b:{n:'Quang Thương β',e:[['dmg',.08]],d:'Mỗi phát thứ 5 gây ×1,4: +{p} sát thương tàu con (trung bình)'}},
  prism:{pos:'sidearm',pa:'alpha',a:{n:'Hàn Băng α',e:[['dmg',.27]],d:'Thêm 1 lần phản xạ: +{p} sát thương tàu con'},b:{n:'Hàn Băng β',e:[['dmg',.28,'mob'],['dmg',-.14,'boss']],d:'Dọn quái: +28% lên quái thường, −14% lên boss (sát thương tàu con)'}},
  gravity:{pos:'sidearm',pa:'alpha',a:{n:'Trọng Lực α',e:[['dmg',.25]],d:'Cầu trọng lực mạnh và lớn hơn: +{p} sát thương tàu con'},b:{n:'Trọng Lực β',e:[['dmg',.15]],d:'Chặn đạn phát xung điện: +{p} sát thương tàu con'}},
  orbit36:{pos:'sidearm',pa:'beta',a:{n:'Chân Trời α',e:[['dmg',.20]],d:'Vùng hút tồn tại lâu hơn: +{p} sát thương tàu con'},b:{n:'Chân Trời β',e:[['dmg',.20]],d:'Nổ kết thúc vùng hút mạnh hơn: +{p} sát thương tàu con'}},
  ricochet:{pos:'sidearm',pa:'alpha',a:{n:'Lục Lăng α',e:[['dmg',.20]],d:'Thêm 2 lần nảy: +{p} sát thương tàu con'},b:{n:'Lục Lăng β',e:[['dmg',.25]],d:'Lần nảy mạnh hơn: +{p} sát thương tàu con'}}},
 abCap:.6,
 reforge:{std:{k:5,cr:[0,0,0,8000,25000]},one:{cr:[0,0,0,2500,8000],rate:.12,pity:15}},
 merge:{k:3,cr:[300,900,2500,6000],exChance:.2},  // V156 · Gemini Phần E: 3→1, không thất bại
 forgeX:{lam:4,luc:1,core:9,cr:8000},upX:{tim:2,core:12,cr:10000},  // V156 · rèn đá đặc biệt (Lam đặc biệt chưa có trong game → gộp 2 bước Gemini thành 1 bước ra Tím)
 salvage:{lam:{cr:3000},tim:{cr:10000,ex:.4},timS:{cr:20000,cam:.25,pity:4}},
 patrol:{max:12,cr:s=>120+5*s,st:s=>8+Math.floor(s/15),low:2,lam:6},
 drop:{boss:.35,mini:.15,sweepK:.5},
 gift:[{t:2,pos:'ship',ty:'stat'},{t:2,pos:'armor',ty:'stat'}],
 mig:{cr:[200,500,1200,3000,8000],leftCr:400,fragK:5}};
const Stone71=(()=>{
 const C=STONE71,KEY='saobang-stone71-v1';
 const rd=()=>{try{const v=JSON.parse(localStorage.getItem(KEY)||'null');return v&&typeof v==='object'?v:{};}catch{return {};}};
 const S=Object.assign({v:1,st:[],mig:0,gift:0,pat:{at:0,mx:0,h2:0,h6:0},spity:0,ser:0},rd());if(!Array.isArray(S.st))S.st=[];S.pat=Object.assign({at:0,mx:0,h2:0,h6:0},S.pat||{});
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const fmt=n=>Math.round(n).toLocaleString('vi-VN');
 const pct=v=>(Math.round(v*1000)/10).toLocaleString('vi-VN')+'%';
 const uid=()=>'s'+Date.now().toString(36)+(++S.ser).toString(36);
 const isOff=pos=>pos!=='armor';
 const cleared=()=>{try{return Progress.v70.cleared();}catch{return [];}};
 const maxStage=()=>{const c=cleared();return c.length?Math.max(...c):0;};
 const unlocked=()=>maxStage()>=C.unlock||S.st.length>0;
 // ---------- tên & giá trị ----------
 const modelName=(pos,m)=>{try{if(pos==='ship'){if(typeof m==='string'&&m.startsWith('sss:'))return (SSS_MODELS[+m.slice(4)]||{}).name||'SSS';return Fighters28.profiles[m].name;}return GearCatalog[m].name;}catch{return String(m);}};
 function val(s){if(s.ty==='stat')return C.stat[isOff(s.pos)?'off':'def'][s.t];if(s.ty==='omega'||s.ty==='sigma'){const v=C.ex[isOff(s.pos)?'off':'def'][s.ty][s.t-3]||0;return (typeof s.m==='string'&&s.m.startsWith('sss:'))?v*C.ex.sss:v;}if(s.ty==='effect'){const E=C.eff[s.k];return E?E.v[s.t-2]:0;}return 0;}
 function abE(s){const A=C.ab[s.m];if(!A)return null;const X=s.ty==='alpha'?A.a:A.b;const half=s.t<4;const e=X.e.map(([k,a,b])=>k==='dmg'?['dmg',half?a/2:a,b]:['u',a,half?(X.pv&&X.pv[a]!=null?X.pv[a]:(A.pv&&A.pv[a]!=null?A.pv[a]:b/2)):b]);return {n:X.n,e,d:X.d};}
 function name(s){if(s.ty==='stat')return isOff(s.pos)?'Đá Công':'Đá Thủ';if(s.ty==='effect')return C.eff[s.k]?.n||'Đá hiệu ứng';if(s.ty==='alpha'||s.ty==='beta')return 'Đá '+(s.ty==='alpha'?'α':'β')+' · '+modelName(s.pos,s.m);return 'Đá '+(s.ty==='omega'?'Ω':'Σ')+' · '+modelName(s.pos,s.m);}
 function desc(s){const v=val(s);if(s.ty==='stat')return isOff(s.pos)?'+'+pct(v)+' tấn công của '+C.pn[s.pos].toLowerCase()+' này':'+'+pct(v)+' máu & giáp';
  if(s.ty==='effect'){const E=C.eff[s.k];return E?E.d.replace('{v}',E.u==='s'?(v+' giây').replace('.',','):E.u==='n'?String(v):pct(v)):'';}
  if(s.ty==='alpha'||s.ty==='beta'){const X=abE(s);if(!X)return '';const p=X.e.filter(e=>e[0]==='dmg').reduce((a,e)=>a+e[1],0);const u=X.e.find(e=>e[0]==='u');const uv=u?u[2]:0;return 'Chuyên dụng: '+modelName(s.pos,s.m)+' · '+X.d.replace('{p}',pct(p)).replace(/\{v\}/g,u&&uv<1&&!['shieldEvery','killShield','bombConvert','grazeScore','keepPower'].includes(u[1])?pct(uv):String(uv).replace('.',','))+' · không cộng lực chiến';}
  return 'Chuyên dụng: '+modelName(s.pos,s.m)+' · '+(isOff(s.pos)?'+'+pct(v)+' tấn công của món':'+'+pct(v)+' máu & giáp');}
 const tier=s=>C.tn[s.t];
 // ---------- tạo đá ----------
 function ownedModels(pos){if(pos==='ship'){const L=[];for(let i=0;i<13;i++)try{if(Campaign36.ownsCraft(i))L.push(i);}catch{}return L.length?L:[0];}try{return Campaign36.getState().models.filter(m=>GearCatalog[m]&&GearCatalog[m].kind===pos);}catch{return [];}}
 const pick=a=>a[Math.floor(Math.random()*a.length)];
 function effPool(pos,t){return Object.keys(C.eff).filter(k=>C.eff[k].pos===pos&&C.eff[k].v[t-2]!=null);}
 function make(t,pos,o={}){t=Math.max(0,Math.min(4,t|0));pos=C.pos.includes(pos)?pos:pick(C.pos);let ty=o.ty;
  if(!ty){const r=Math.random();if(t<=1)ty='stat';else if(t===2)ty=r<.7||!effPool(pos,2).length?'stat':'effect';else ty=r<(o.ex!=null?o.ex:.15)?'ex':r<.6?'stat':'effect';}
  const s={id:uid(),t,pos,ty};if((ty==='alpha'||ty==='beta')&&o.m!=null)s.m=o.m;
  if(ty==='effect'){const P=effPool(pos,t);if(!P.length)s.ty='stat';else s.k=o.k||pick(P);}
  if(s.ty==='omega'||s.ty==='sigma'){if(t<3)s.t=t=3;const M=o.m!=null?[o.m]:ownedModels(pos);if(!M.length)s.ty='stat';else s.m=pick(M);}
  if(s.ty==='ex'){const L=exPool(pos,t,o.m);const x=L.length?pick(L):null;if(!x)s.ty='stat';else{s.ty=x.ty;s.m=x.m;}}
  if(s.ty==='alpha'||s.ty==='beta'){if(t<3)s.t=t=3;const ok=abOK(s.m,s.ty,s.t);if(!ok){const L=exPool(pos,s.t,o.m).filter(x=>x.ty==='alpha'||x.ty==='beta');const x=L.length?pick(L):null;if(x){s.ty=x.ty;s.m=x.m;}else{s.ty='omega';if(s.m==null)s.m=pick(ownedModels(pos)||[0]);}}}
  return s;}
 // α/β: mẫu có trong bảng, Tím chỉ có viên purpleActive
 const abOK=(m,ty,t)=>{const A=C.ab[m];if(!A)return false;return t>=4||A.pa===ty;};
 function exPool(pos,t,m){const L=[];const M=m!=null?[m]:ownedModels(pos);for(const mm of M){L.push({ty:'omega',m:mm},{ty:'sigma',m:mm});for(const ab of ['alpha','beta'])if(abOK(mm,ab,t)&&C.ab[mm].pos===pos)L.push({ty:ab,m:mm});}return L;}
 function give(s){S.st.push(s);save();return s;}
 const label=s=>C.tn[s.t]+' · '+name(s);
 // V156 · Phần E: ghép tất cả + rèn đá đặc biệt bằng Tinh Hạch Siêu Việt
 function mergeAll(pos){let n=0;for(let t=0;t<4;t++){while(free(t,pos).length>=C.merge.k&&Progress.balance()>=C.merge.cr[t]){const L=free(t,pos).sort((a,b)=>(a.ty==='stat'?0:1)-(b.ty==='stat'?0:1));const cr=C.merge.cr[t];if(!Progress.spendCredits(cr))return n;const used=new Set(L.slice(0,C.merge.k).map(s=>s.id));const pp=pos||L[0].pos;S.st=S.st.filter(s=>!used.has(s.id));give(make(t+1,pp,{ex:t+1>=3?C.merge.exChance:0}));n++;}}if(n)bump();return n;}
 const plain=(t)=>S.st.filter(s=>!s.on&&s.t===t&&(s.ty==='stat'||s.ty==='effect')).sort((a,b)=>(a.ty==='stat'?0:1)-(b.ty==='stat'?0:1));
 const coreN=()=>{try{return V70.have('sss_core')|0;}catch{return 0;}};
 function forgeOpts(pos){return exPool(pos,3).map(x=>({...x,pos,t:3,label:label({t:3,pos,...x})}));}
 function forgeNeed(){const F=C.forgeX;return {lam:[plain(2).length,F.lam],luc:[plain(1).length,F.luc],core:[coreN(),F.core],cr:[Progress.balance(),F.cr]};}
 function forgeX(pos,ty,m){const F=C.forgeX,o=forgeOpts(pos).find(x=>x.ty===ty&&String(x.m)===String(m));if(!o){toast('KHÔNG RÈN ĐƯỢC LOẠI NÀY');return null;}const a=plain(2),b=plain(1);if(a.length<F.lam||b.length<F.luc){toast('CẦN '+F.lam+' ĐÁ LAM + '+F.luc+' ĐÁ LỤC CHƯA KHẢM');return null;}if(coreN()<F.core){toast('THIẾU TINH HẠCH SIÊU VIỆT · '+coreN()+'/'+F.core);return null;}if(Progress.balance()<F.cr){toast('THIẾU HỢP KIM · cần '+fmt(F.cr));return null;}
  if(!Progress.spendCredits(F.cr))return null;V70.add('sss_core',-F.core);const used=new Set([...a.slice(0,F.lam),...b.slice(0,F.luc)].map(s=>s.id));S.st=S.st.filter(s=>!used.has(s.id));const s={id:uid(),t:3,pos,ty:o.ty,m:o.m};give(s);bump();return s;}
 function upList(){return S.st.filter(s=>!s.on&&s.t===3&&s.ty!=='stat'&&s.ty!=='effect');}
 function upX(id){const F=C.upX,x=S.st.find(s=>s.id===id&&!s.on&&s.t===3&&s.ty!=='stat'&&s.ty!=='effect');if(!x){toast('CHỌN 1 ĐÁ ĐẶC BIỆT TÍM CHƯA KHẢM');return null;}const a=plain(3);if(a.length<F.tim){toast('CẦN '+F.tim+' ĐÁ TÍM THƯỜNG CHƯA KHẢM');return null;}if(coreN()<F.core){toast('THIẾU TINH HẠCH SIÊU VIỆT · '+coreN()+'/'+F.core);return null;}if(Progress.balance()<F.cr){toast('THIẾU HỢP KIM · cần '+fmt(F.cr));return null;}
  if(!Progress.spendCredits(F.cr))return null;V70.add('sss_core',-F.core);const used=new Set(a.slice(0,F.tim).map(s=>s.id));S.st=S.st.filter(s=>!used.has(s.id));x.t=4;save();bump();return x;}
 // ---------- chủ thể (món có ô) ----------
 function hostOf(key){// 'c3' | 'g:<itemId>' | 'r:<robotKey>'
  try{if(key[0]==='c'){const i=+key.slice(1);const n=V70.craftN(i);return {key,pos:'ship',model:i,n,open:C.slotN.filter(x=>n>=x).length,name:Fighters28.profiles[i].name,tag:V70T({...Workshop.craftProgress(i),idx:i})};}
   if(key.startsWith('g:')){const it=Progress.v70.get(key.slice(2));if(!it)return null;const n=V70.nOf(it)|0;return {key,pos:it.kind,model:it.variant,n,open:C.slotN.filter(x=>n>=x).length,name:GearCatalog[it.variant].name,tag:V70T(it),item:it};}
   if(key.startsWith('r:')){const rk=key.slice(2);let open=0,tag='';if(rk.startsWith('sss:')){const st=V70.star('r:'+rk);open=C.slotS.filter(x=>st>=x).length;tag='★'+st;}else{const ps=rk.split(/[-:]/).filter(x=>/^\d$/.test(x)).map(Number);const n=ps.length?Math.min(...ps.map(p=>V70.craftN(p))):0;open=C.slotN.filter(x=>n>=x).length;tag='Siêu chiến cơ';}
    let nm=rk;try{const sel=Fusion.getSelected();if(sel&&sel.key===rk)nm=sel.name;}catch{}return {key,pos:'ship',model:rk,n:0,open,name:nm,tag};}}catch(e){}return null;}
 const on=key=>S.st.filter(s=>s.on&&s.on.h===key);
 function canPut(h,slot,s){if(!h||slot>=h.open||s.pos!==h.pos)return 'sai vị trí';if(!C.allow[slot].includes(s.ty))return 'ô này không nhận loại đá này';
  if((s.ty==='omega'||s.ty==='sigma'||s.ty==='alpha'||s.ty==='beta')&&String(s.m)!==String(h.model))return 'đá chuyên dụng mẫu khác';
  if((s.ty==='omega'||s.ty==='sigma')&&on(h.key).some(x=>x.ty===s.ty&&x.on.s!==slot))return 'mỗi món chỉ 1 viên '+(s.ty==='omega'?'Ω':'Σ');return '';}
 function put(key,slot,id){const h=hostOf(key),s=S.st.find(x=>x.id===id);if(!h||!s)return false;const why=canPut(h,slot,s);if(why){toast(why.toUpperCase());return false;}
  for(const x of S.st)if(x.on&&x.on.h===key&&x.on.s===slot)delete x.on;delete s.on;s.on={h:key,s:slot};save();bump();return true;}
 function take(id){const s=S.st.find(x=>x.id===id);if(!s||!s.on)return false;delete s.on;save();bump();return true;}
 // ô bị khóa lại (hạ khung / bán món) → trả đá về kho
 function tidy(){let ch=false;const keys=new Set(S.st.filter(s=>s.on).map(s=>s.on.h));for(const k of keys){const h=hostOf(k);for(const s of on(k))if(!h||s.on.s>=h.open){delete s.on;ch=true;}}if(ch)save();}
 // ---------- tổng hợp hiệu lực ----------
 let ver=0;const bump=()=>{ver++;cache=null;amAt=-9e9;try{Combat.render&&Combat.render();}catch{}};
 function activeHosts(){const L=[];try{const r=Fusion.getSelected();if(r&&r.key)L.push('r:'+r.key);else L.push('c'+(typeof launchCraft!=='undefined'?launchCraft:selected));}catch{L.push('c0');}
  try{const eq=Progress.v70.equipped();for(const k of ['armor','missiles','sidearm'])if(eq[k])L.push('g:'+eq[k]);}catch{}return L;}
 let cache=null,cacheAt=-9;
 function totals(){const now=performance.now();if(cache&&now-cacheAt<400)return cache;const T={host:{},eff:{},abd:{},abu:{}};
  for(const key of activeHosts()){const h=hostOf(key);if(!h)continue;let p=0;for(const s of on(key)){if(s.on.s>=h.open)continue;if(s.ty==='stat'||s.ty==='omega'||s.ty==='sigma')p+=val(s);else if(s.ty==='effect'){const E=C.eff[s.k];if(!E)continue;const v=val(s);T.eff[s.k]=E.lo?Math.min(T.eff[s.k]||1e9,v):E.hi?Math.max(T.eff[s.k]||0,v):(T.eff[s.k]||0)+v;}else if(s.ty==='alpha'||s.ty==='beta'){const X=abE(s);if(!X)continue;for(const e of X.e){if(e[0]==='dmg')(T.abd[key]=T.abd[key]||[]).push(e);else T.abu[e[1]]=e[1]==='shieldEvery'||e[1]==='killShield'?Math.min(T.abu[e[1]]||1e9,e[2]):Math.max(T.abu[e[1]]||0,e[2]);}}}T.host[key]={pos:h.pos,p};}
  for(const k in T.eff)if(!C.eff[k].lo)T.eff[k]=Math.min(T.eff[k],C.eff[k].cap);
  {const pre=(T.eff.s1||0)+(T.eff.w1||0);if(pre>.2){const k=.2/pre;if(T.eff.s1)T.eff.s1*=k;if(T.eff.w1)T.eff.w1*=k;}}
  T.def=0;for(const k in T.host)if(T.host[k].pos==='armor')T.def+=T.host[k].p;cache=T;cacheAt=now;return T;}
 const ef=k=>totals().eff[k]||0;
 // hệ số tấn công: trộn theo tỉ trọng từng phần (thân chiến cơ / từng tên lửa, tàu con)
 function atkMult(){const T=totals();try{const R=Fusion.getSelected(),v=R||Workshop.craftProgress(typeof launchCraft!=='undefined'?launchCraft:selected);const main=12*Workshop.factor(v.grade)*Workshop.levelFactor(v)*Campaign36.rate(v.grade)*(R?1.25:1);
   let ps=0;for(const k in T.host)if(T.host[k].pos==='ship')ps+=T.host[k].p;let num=main*(1+ps),den=main;W8={['ship']:main,aux:{}};
   const g=Progress.stats();for(const i of (g.auxiliary||[])){const a=i.auxDamage*i.spec.count/i.interval;const hp=T.host['g:'+i.id];num+=a*(1+(hp?hp.p:0));den+=a;W8.aux['g:'+i.id]=a;}return den>0?num/den:1;}catch{return 1;}}
 let W8={ship:1,aux:{}};
 // α/β sát thương món (chỉ trong trận, không cộng CP): trộn theo tỉ trọng như đá chỉ số
 function abMult(){const T=totals();let num=0,den=0;const bossOn=typeof boss!=='undefined'&&boss&&!boss.dead;const ok=c=>!c||(c==='boss'&&bossOn)||(c==='mob'&&!bossOn)||(c==='super'&&superTime>0)||(c==='shield'&&bulletShieldTime>0);
  const add=(key,w)=>{let p=0;for(const e of (T.abd[key]||[]))if(ok(e[2]))p+=e[1];p=Math.max(-.5,Math.min(C.abCap,p));num+=w*(1+p);den+=w;};
  for(const key in T.host){if(T.host[key].pos==='ship')add(key,W8.ship);else if(W8.aux[key]!=null)add(key,W8.aux[key]);}return den>0?num/den:1;}
 const abu=k=>totals().abu[k]||0;
 let am=1,amAt=-9;const atkM=()=>{const now=performance.now();if(now-amAt>500){amAt=now;am=atkMult();}return am;};
 // ---------- móc vào lõi ----------
 let lastPick=-99,lastBomb=-99,inBomb=false,absorbAt=-99,buffHit=-1,buffPick=-1,buffGraze=-1,pickN=0,killN=0,grazeT=[],grazeN=0,invAt=-99,redUntil=-1,shieldAt=0,abT=-1,a3T=0,a4T=0,m3T=0,m3Got=0,superExt=0,lastSuper=0,a1Used=0;
 const playing=()=>typeof mode!=='undefined'&&mode==='play';
 function cond(){if(!playing())return 0;let c=0;const bossOn=typeof boss!=='undefined'&&boss&&!boss.dead;
  c+=bossOn?ef('s7'):ef('m7');
  if(hp>=maxHp)c+=ef('a7');const w7=ef('w7');if(w7&&maxHp>0){const r=hp/maxHp;if(r<1)c+=w7*Math.min(1,(1-r)/.75);}
  if(superTime>0)c+=ef('w5');if(typeof bulletShieldTime!=='undefined'&&bulletShieldTime>0)c+=ef('w3');
  if(time-lastPick<5)c+=ef('m2');if(time-lastBomb<5)c+=ef('m4');if(inBomb)c+=ef('w4');
  try{if(gameMode==='endless')c+=ef('m6');}catch{}
  if(time<buffHit)c+=abu('buffAfterHit');if(time<buffPick)c+=abu('pickBuff');if(time<buffGraze)c+=abu('grazeChain');const hs=abu('hpScale');if(hs&&maxHp+maxShield>0)c+=hs*Math.min(1,(hp+shield)/(maxHp+maxShield));return c;}
 try{const of=Combat.factor;Combat.factor=function(){const v=of.apply(this,arguments);try{return v*atkM()*(1+cond())*(playing()?abMult():1);}catch{return v;}};}catch{}
 try{const ost=Combat.stats;Combat.stats=function(){const r=ost.apply(this,arguments);try{const m=atkM();if(r&&m!==1){const a0=r.attack;r.attack*=m;r.cp=Math.round(r.cp+(r.attack-a0)*24);}}catch{}return r;};}catch{}
 // phòng thủ: % máu & giáp của món giáp đang mặc → máu/giáp tối đa (cả chiến cơ)
 const defM=()=>{try{return 1+totals().def;}catch{return 1;}};
 try{const ocp=craftProfile;craftProfile=function(){const r=ocp.apply(this,arguments);try{const m=defM();if(m!==1&&r){r.hp=Math.round(r.hp*m*100)/100;r.shield=Math.round(r.shield*m*100)/100;}}catch{}return r;};}catch{}
 try{const ops=Progress.stats;Progress.stats=function(){const r=ops.apply(this,arguments);try{const m=defM();if(m!==1&&r){r.hp*=m;r.maxShield*=m;r.startShield*=m;}}catch{}return r;};}catch{}
 // nhặt vật phẩm / bom / Bạo Tẩu / trúng đạn
 try{const oc=collect;collect=function(d){const p0=typeof power!=='undefined'?power:0,h0=hp,s0=shield,b0=typeof bulletShieldTime!=='undefined'?bulletShieldTime:0;const r=oc.apply(this,arguments);try{if(playing()){lastPick=time;
   const s2=ef('s2');if(s2&&time-absorbAt>=6){absorbAt=time;if(shield<maxShield)shield=Math.min(maxShield,shield+maxShield*s2);else if(hp<maxHp)hp=Math.min(maxHp,hp+1);}
   const a2=ef('a2');if(a2&&d&&d.type==='power'&&power>p0&&power<5&&Math.random()<a2){power++;powerUpgrades=power-1;}
   if(d&&d.type==='shield'){const s3=ef('s3');if(s3&&b0>0)bulletShieldTime+=s3;const sp=abu('shieldPlus');if(sp)bulletShieldTime+=sp;}
   const hb=abu('healBoost');if(hb){if(hp>h0)hp=Math.min(maxHp,hp+(hp-h0)*hb);if(shield>s0)shield=Math.min(maxShield,shield+(shield-s0)*hb);}
   if(abu('pickBuff')&&h0>=maxHp){pickN++;if(pickN>=20){pickN=0;buffPick=time+8;}}}}catch{}return r;};}catch{}
 try{const ob=bomb;bomb=function(){const b0=typeof bombs!=='undefined'?bombs:0,n0=typeof bullets!=='undefined'?bullets.length:0;inBomb=true;let r;try{r=ob.apply(this,arguments);}finally{inBomb=false;}try{if(bombs<b0){lastBomb=time;
   const s4=ef('s4');if(s4&&power<5&&Math.random()<s4){power++;powerUpgrades=power-1;}
   const bc=abu('bombConvert');if(bc){score+=Math.round(n0*20*bc);shield=Math.min(maxShield,shield+maxShield*.1*bc);}}}catch{}return r;};}catch{}
 try{const oa=activateSuper;activateSuper=function(){const r=oa.apply(this,arguments);try{superExt=0;const x=ef('s5');if(x)superTime=Math.min(12,superTime+x);}catch{}return r;};}catch{}
 try{const od=damage;damage=function(){const h0=hp,s0=shield;const r=od.apply(this,arguments);try{const loss=(h0-hp)+(s0-shield);if(loss>0&&playing()){let red=0;const w2=ef('w2');if(w2&&time-lastPick<5)red+=w2;const a5=ef('a5');if(a5&&superTime>0)red+=a5;const hr=abu('hitReduce');if(hr&&time<redUntil)red+=hr;red=Math.min(.6,red);
    if(red>0){let back=loss*red;const th=Math.min(back,h0-hp);hp+=th;back-=th;shield=Math.min(s0,shield+back);}
    if(hr)redUntil=time+3;if(abu('buffAfterHit'))buffHit=time+6;const hi=abu('hitInvuln');if(hi&&time-invAt>=5){invAt=time;invuln=Math.max(invuln,hi);}}}catch{}return r;};}catch{}
 // hạ địch (điểm, sao, Bạo Tẩu, hồi giáp)
 try{const ok=kill;kill=function(e){const was=e&&e.dead,sc0=typeof score!=='undefined'?score:0;const r=ok.apply(this,arguments);try{if(playing()&&e&&!was&&e.dead&&!e.rescue28){const ds=score-sc0;
   const a6=ef('a6');if(a6&&gameMode==='endless'&&ds>0)score+=Math.round(ds*a6);
   if(superTime>0){const m5=ef('m5');if(m5){if(ds>0)score+=Math.round(ds*m5);if(Math.random()<.15)try{Safety31.push(drops,100,{x:e.x,y:e.y,type:'star',t:0});}catch{}}
    const sk=abu('superKill');if(sk&&(e.elite||e.large)&&superExt<5){const add=Math.min(sk,5-superExt);superTime=Math.min(12,superTime+add);superExt+=add;}}
   const ks=abu('killShield');if(ks){killN++;if(killN>=ks){killN=0;shield=Math.min(maxShield,shield+maxShield*.1);}}}}catch{}return r;};}catch{}
 // lách đạn
 try{const og=Combat26.graze;Combat26.graze=function(){const r=og.apply(this,arguments);try{if(r&&playing()){const gs=abu('grazeScore');if(gs){score+=Math.round(50*gs);grazeN++;if(grazeN>=10){grazeN=0;shield=Math.min(maxShield,shield+maxShield*.05);}}
   if(abu('grazeChain')){grazeT.push(time);grazeT=grazeT.filter(t=>time-t<=2);if(grazeT.length>=5){grazeT=[];buffGraze=time+8;}}}}catch{}return r;};}catch{}
 // Vô Tận: vào trận vượt sẵn đợt (Nhảy Vọt / Di Sản), không thưởng đợt bỏ qua
 try{const orr=reset;reset=function(){const r=orr.apply(this,arguments);try{endMark=0;a1Used=0;superExt=0;buffHit=buffPick=buffGraze=-1;pickN=killN=grazeN=0;shieldAt=time;a3T=a4T=m3T=0;m3Got=0;lastSuper=0;
   if(gameMode==='endless'){let k=ef('s6')||0;const L=S.legacy;if(L&&L.day===new Date(Date.now()+7*3600000).toISOString().slice(0,10)){k=Math.max(k,L.w|0);}S.legacy=null;save();k=Math.min(24,k|0);if(k>0){level=1+k;toast('VƯỢT SẴN '+k+' ĐỢT');}}}catch{}return r;};}catch{}
 let endMark=0;
 // mỗi khung: khiên định kỳ, hồi giáp khi có khiên, hồi bom, phá đạn, giữ đạn sau Bạo Tẩu, Di Sản
 try{const vd=VisualFX.draw;VisualFX.draw=function(){const r=vd.apply(this,arguments);try{if(playing()){const dt=abT<0?0:Math.max(0,Math.min(.1,time-abT));abT=time;if(dt>0){
   const se=abu('shieldEvery');if(se&&time-shieldAt>=se){shieldAt=time;bulletShieldTime=Math.max(bulletShieldTime,5);}
   if(bulletShieldTime>0){const a3=ef('a3');if(a3){a3T+=dt;if(a3T>=3){a3T=0;shield=Math.min(maxShield,shield+maxShield*a3);}}const m3=ef('m3');if(m3){m3T+=dt;if(m3T>=1){m3T=0;score+=m3;if(m3Got<60){m3Got+=2;try{Progress.grantCredits(2);}catch{}}}}}
   const a4=ef('a4');if(a4&&a4<1e8&&bombs<3){a4T+=dt;if(a4T>=a4){a4T=0;bombs++;}}
   if(abu('keepPower')&&lastSuper>0&&superTime<=0&&power<4){power=4;powerUpgrades=3;}lastSuper=superTime;}}else abT=-1;
   if(mode==='over'&&!endMark&&gameMode==='endless'){endMark=1;const w6=ef('w6');if(w6){S.legacy={day:new Date(Date.now()+7*3600000).toISOString().slice(0,10),w:w6};save();}}}catch{}return r;};}catch{}
 // Vũ khí tối thượng: Bảo Toàn / Tiếp Viện (gọi từ Ult72.useUlt)
 let m1At=-99;
 function onUlt(){if(!playing())return;const a1=ef('a1');if(a1&&!a1Used&&Math.random()<a1){a1Used=1;try{Ult72._B.ready=1;}catch{}toast('BẢO TOÀN · GIỮ LƯỢT');}
  const m1=ef('m1');if(m1&&time-m1At>=20&&Math.random()<m1){m1At=time;try{Safety31.push(drops,100,{x:player.x,y:Math.max(60,player.y-160),type:['power','shield','heal','bomb'][Math.floor(Math.random()*4)],t:0,ult72:1});}catch{}}}
 // ---------- tụ hợp 5 → 1 ----------
 const free=(t,pos)=>S.st.filter(s=>!s.on&&s.t===t&&(!pos||s.pos===pos));
 function merge(t,pos){if(t>=4){toast('CAM LÀ PHẨM CAO NHẤT');return null;}const L=free(t,pos).sort((a,b)=>(a.ty==='stat'?0:1)-(b.ty==='stat'?0:1));if(L.length<C.merge.k){toast('CẦN '+C.merge.k+' ĐÁ '+C.tn[t].toUpperCase()+' CHƯA KHẢM');return null;}
  const cr=C.merge.cr[t];if(Progress.balance()<cr){toast('THIẾU HỢP KIM · cần '+fmt(cr));return null;}if(!Progress.spendCredits(cr))return null;
  const used=new Set(L.slice(0,C.merge.k).map(s=>s.id));const pp=pos||L[0].pos;S.st=S.st.filter(s=>!used.has(s.id));const s=make(t+1,pp,{ex:t+1>=3?C.merge.exChance:0});give(s);bump();return s;}
 // ---------- tinh hóa trang bị (Lam / Tím) ----------
 function salvageInfo(it){const n=V70.nOf(it)|0;if(n<2)return null;const S_=it.grade==='S'||it.grade==='SS';if(n>=6&&S_)return {k:'timS',cr:C.salvage.timS.cr,txt:'1 đá Tím chuyên dụng (25% ra đá Cam)'};if(n>=6)return {k:'tim',cr:C.salvage.tim.cr,txt:'1 đá Tím (40% chuyên dụng của mẫu này)'};return {k:'lam',cr:C.salvage.lam.cr,txt:'1 đá Lam'};}
 function salvage(id){const it=Progress.v70.get(id);if(!it)return null;const inf=salvageInfo(it);if(!inf){toast('CHỈ TINH HÓA ĐƯỢC TRANG BỊ LAM TRỞ LÊN');return null;}if(Object.values(Progress.v70.equipped()).includes(id)){toast('ĐANG MẶC');return null;}
  if(Progress.balance()<inf.cr){toast('THIẾU HỢP KIM · cần '+fmt(inf.cr));return null;}if(!Progress.spendCredits(inf.cr))return null;
  for(const s of on('g:'+id))delete s.on;if(!Progress.v70.remove(id)){Progress.grantCredits(inf.cr);return null;}let s;
  if(inf.k==='lam')s=make(2,it.kind);else if(inf.k==='tim')s=make(3,it.kind,Math.random()<C.salvage.tim.ex?{ty:'ex',m:it.variant}:{ex:0});
  else{S.spity=(S.spity|0)+1;const cam=S.spity>=C.salvage.timS.pity||Math.random()<C.salvage.timS.cam;if(cam)S.spity=0;s=make(cam?4:3,it.kind,{ty:'ex',m:it.variant});}
  give(s);bump();return s;}
 // ---------- rơi đá ----------
 const roll=p=>{const r=Math.random();let a=0;for(let i=0;i<p.length;i++){a+=p[i];if(r<a)return i;}return p.length-1;};
 function tierFor(stage,ecl,boss){if(ecl)return boss?(Math.random()<.25?3:2):roll([0,.5,.5]);if(stage>160)return roll([0,0,.6,.4]);if(stage>=120)return boss?roll([0,0,.8,.2]):roll([0,.5,.5]);return boss?roll([0,.7,.3]):roll([.5,.5]);}
 function dropFor(stage,sweep,ecl){if(!unlocked())return null;const boss=stage%10===0,mini=!boss&&stage%5===0;let p=boss?C.drop.boss:mini?C.drop.mini:0;if(ecl&&boss)p=1;if(sweep)p*=C.drop.sweepK;if(!(Math.random()<p))return null;
  const s=give(make(tierFor(stage,ecl,boss),pick(C.pos)));bump();return '+1 đá '+label(s);}
 try{const ors=Workshop.rollStage;Workshop.rollStage=function(stage){const r=ors.apply(this,arguments);try{if(typeof gameMode!=='undefined'&&gameMode==='endless')return r;let ecl=false;try{ecl=Eclipse67.active();}catch{}
   const sweep=!['play','pause','reward'].includes(mode);const t=dropFor(Math.min(stage|0,200),sweep,ecl);const g=giftCheck();const add=[t,g].filter(Boolean);if(add.length&&Array.isArray(r))return r.concat(add);}catch{}return r;};}catch{}
 // nguồn ngọc cũ (phó bản ngọc, quà mở khóa…) → đá
 try{const og=Gems.rewardStage;Gems.rewardStage=function(stage,gradeRoll=Math.random(),kindRoll=Math.random(),count=null){const id=(Math.max(1,stage|0)-1)%6,rates=[[70,22,6,1.5,.5],[60,27,10,2,1],[50,30,14,4,2],[40,32,20,5,3],[30,33,25,8,4],[20,30,32,12,6]][id];let r=gradeRoll*100,t=4;for(let i=0;i<5;i++){r-=rates[i];if(r<0){t=i;break;}}
   const n=Math.max(1,Math.round((Number.isInteger(count)?count:10+(id+1)*2)/12)),pos=C.pos[Math.min(3,Math.floor(kindRoll*4))];for(let i=0;i<n;i++)give(make(t,pos));bump();return {kind:pos,grade:C.tn[t],count:n,name:'Đá '+C.tn[t]+' · '+C.pn[pos]};};}catch{}
 // ngọc cũ không còn tác dụng (đã quy đổi)
 try{const oa=Gems.apply;Gems.apply=function(out){return S.mig?out:oa.apply(this,arguments);};}catch{}
 function giftCheck(){if(S.gift||maxStage()<C.unlock)return null;S.gift=1;for(const g of C.gift)give(make(g.t,g.pos,{ty:g.ty}));save();bump();setTimeout(()=>{try{toast('MỞ HỆ ĐÁ KHẢM · TẶNG 2 ĐÁ LAM');}catch{}},400);return 'MỞ HỆ ĐÁ KHẢM: +2 đá Lam';}
 // ---------- tuần tra treo máy ----------
 const patrolOpen=()=>maxStage()>=C.patrolUnlock;
 function patrolNow(){const now=Date.now(),P=S.pat;if(!P.at){P.at=now;P.mx=now;save();}if(now<P.mx-60000){P.at=now;P.mx=now;save();}const h=Math.max(0,Math.min(C.patrol.max,(now-P.at)/3600000));return h;}
 function patrolPreview(){const h=patrolNow(),s=Math.max(1,maxStage());const st=unlocked()?{low:Math.floor((S.pat.h2+h)/C.patrol.low),lam:Math.floor((S.pat.h6+h)/C.patrol.lam)}:{low:0,lam:0};return {h,cr:Math.floor(C.patrol.cr(s)*h),ex:Math.floor(C.patrol.st(s)*h),...st};}
 function patrolClaim(){if(!patrolOpen()){toast('MỞ Ở ẢI '+C.patrolUnlock);return null;}const p=patrolPreview();if(p.h<1/60){toast('CHƯA ĐỦ THỜI GIAN');return null;}
  if(p.cr)Progress.grantCredits(p.cr);if(p.ex)try{Workshop.exp70(p.ex);}catch{}const got=[];
  if(unlocked()){S.pat.h2+=p.h;S.pat.h6+=p.h;for(let i=0;i<p.low;i++)got.push(give(make(Math.random()<.5?0:1,pick(C.pos))));S.pat.h2-=p.low*C.patrol.low;for(let i=0;i<p.lam;i++)got.push(give(make(2,pick(C.pos))));S.pat.h6-=p.lam*C.patrol.lam;}
  S.pat.at=Date.now();S.pat.mx=S.pat.at;save();bump();return Object.assign(p,{stones:got});}
 // ---------- quy đổi Ngọc cũ ----------
 function migrate(){if(S.mig)return;let G=null;try{G=Gems.getState();}catch{}let cr=0,n=0;const notes=[];
  try{const items=Progress.v70.items();for(const j of (G&&G.jewels)||[]){const t=['D','C','B','A','S'].indexOf(j.grade);if(t<0)continue;const pos=['armor','missiles','sidearm'].includes(j.kind)?j.kind:'missiles';cr+=C.mig.cr[t];
    const it=j.itemId&&items.find(i=>i.id===j.itemId);const m=it?it.variant:null;let s;
    if(t<=1)s=make(t,pos,{ty:'stat'});else if(t===2)s=make(2,pos);else if(t===3)s=make(3,pos,Math.random()<.5?{ty:'effect'}:{ty:Math.random()<.5?'omega':'sigma',m:m!=null?m:undefined});
    else{s=make(4,pos,{ty:Math.random()<.5?'omega':'sigma',m:m!=null?m:undefined});give(make(3,pos));n++;}
    give(s);n++;if(it){const h=hostOf('g:'+it.id);if(h)for(let k=0;k<h.open;k++){if(!on(h.key).some(x=>x.on.s===k)&&!canPut(h,k,s)){s.on={h:h.key,s:k};break;}}}}
   for(const [key,c] of Object.entries((G&&G.fragments)||{})){const [kind,g]=key.split('-');const t=['D','C','B','A','S'].indexOf(g);if(t<0||!c)continue;const k=Math.floor(c/C.mig.fragK);for(let i=0;i<k;i++){give(make(t,['armor','missiles','sidearm'].includes(kind)?kind:pick(C.pos),{ty:t<=1?'stat':undefined}));n++;}cr+=(c%C.mig.fragK)*C.mig.leftCr;}}catch(e){}
  S.mig=1;save();if(cr)try{Progress.grantCredits(cr);}catch{}if(n||cr)setTimeout(()=>{try{migNote(n,cr);}catch{}},1600);bump();}
 // ---------- giao diện ----------
 let el=null,view=null;
 const ART=(typeof STONE71_ART!=='undefined'&&STONE71_ART)||{};
 function icon(s,cls=''){const ex=s.ty==='omega'||s.ty==='sigma'||s.ty==='alpha'||s.ty==='beta';const k=ex?'stone_x'+Math.max(3,s.t+1):'stone_c'+(s.t+1);const img=ART[k]?`<img src="${ART[k]}" alt="">`:`<i style="background:${C.tc[s.t]}"></i>`;
  const mk=ex?(ART['mark_'+s.ty]?`<img class="mk" src="${ART['mark_'+s.ty]}" alt="">`:`<b class="mk">${s.ty==='omega'?'Ω':'Σ'}</b>`):s.ty==='effect'?'<b class="mk ef">✦</b>':'';
  return `<span class="st71-ic ${cls}" style="--tc:${C.tc[s.t]}">${img}${mk}</span>`;}
 const posIcon=pos=>{const k={ship:'slot_ship',armor:'slot_armor',missiles:'slot_missile',sidearm:'slot_drone'}[pos];return ART[k]?`<img class="pi" src="${ART[k]}" alt="">`:'';};
 function build(){el=document.createElement('div');el.className='m63 adv69 st71';el.hidden=true;document.body.appendChild(el);
  el.addEventListener('click',e=>{const t=e.target.closest('[data-a]');if(!t){if(e.target===el)close();return;}const a=t.dataset.a,v=t.dataset.v;
   if(a==='close')close();else if(a==='inv')inv(v||'all');else if(a==='host')host(v);else if(a==='sock')picker(+v);else if(a==='put'){if(put(view.key,view.slot,v))host(view.key);}
   else if(a==='take'){take(v);host(view.key);}else if(a==='back')host(view.key);
   else if(a==='mergeAll'){const n=mergeAll(v==='all'?null:v);band(n?'GHÉP TẤT CẢ · '+n+' LƯỢT':'CHƯA ĐỦ ĐÁ HOẶC HỢP KIM');inv(view&&view.f||'all');}
   else if(a==='merge'){const [tt,pp]=v.split('|');const s=merge(+tt,pp==='all'?null:pp);if(s){band('TỤ HỢP · '+label(s).toUpperCase());}inv(view&&view.f||'all');}
   else if(a==='pat'){const r=patrolClaim();if(r)band('TUẦN TRA · +'+fmt(r.cr)+' ◈'+(r.stones.length?' · +'+r.stones.length+' ĐÁ':''));patrol();}
   else if(a==='rf')reforge(v?JSON.parse(v):{});else if(a==='rfpin'){S.pin=JSON.parse(v);save();reforge({});}
   else if(a==='rfstd'){const r=reforgeStd();if(r)band('TẨY CHUẨN · '+label(r).toUpperCase());reforge({});}else if(a==='rfone'){const r=reforgeOne();if(r)band((r.hit?'TRÚNG · ':'')+label(r.s).toUpperCase());reforge({});}else if(a==='rfauto'){autoRf();}else if(a==='rfstop'){AR.stop=true;}
   else if(a==='salv'){const s=salvage(v);if(s){band('TINH HÓA · '+label(s).toUpperCase());close();try{Progress.render();}catch{}}}});}
 function close(){if(el)el.hidden=true;}
 function band(t){const b=document.createElement('div');b.className='adv-band';b.textContent=t;document.body.appendChild(b);setTimeout(()=>b.remove(),1600);try{tone(880,.18,'triangle',.06);}catch{}}
 function lockedCard(){if(!el)build();el.innerHTML=`<div class="m63-card adv-card"><div class="m63-eye">ĐÁ KHẢM</div><h3>Mở khóa ở ải ${C.unlock}</h3><p class="adv-max">Vượt ải ${C.unlock} để mở hệ Đá: khảm đá vào chiến cơ và trang bị (ô đầu tiên mở ở khung Lam). Nhận ngay 2 đá Lam khi mở.</p><div class="adv-btns"><button class="adv-x" data-a="close">ĐÓNG</button></div></div>`;el.hidden=false;}
 function host(key){if(!el)build();if(!unlocked())return lockedCard();tidy();const h=hostOf(key);if(!h){close();return;}view={key};const L=on(key);
  const req=k=>key.startsWith('r:')&&String(h.model).startsWith('sss:')?'★'+C.slotS[k]:TIER70.name[C.slotN[k]];
  const socks=[0,1,2,3,4].map(k=>{const s=L.find(x=>x.on.s===k);if(k>=h.open)return `<div class="st71-sk lock">${ART.socket_locked?`<img src="${ART.socket_locked}" alt="">`:'🔒'}<small>Mở ở ${esc(req(k))}</small></div>`;
   if(s)return `<button class="st71-sk full" data-a="sock" data-v="${k}" style="--tc:${C.tc[s.t]}">${icon(s)}<small>${esc(s.ty==='alpha'||s.ty==='beta'?'Đá '+(s.ty==='alpha'?'α':'β'):name(s))}</small><em>${esc(s.ty==='alpha'||s.ty==='beta'?(abE(s)||{}).d.replace('{p}',pct(abE(s).e.filter(e=>e[0]==='dmg').reduce((a,e)=>a+e[1],0))).replace(/\{v\}/g,'…'):desc(s))}</em></button>`;
   return `<button class="st71-sk" data-a="sock" data-v="${k}">${ART.socket_empty?`<img src="${ART.socket_empty}" alt="">`:'＋'}<small>Ô ${k+1}</small><em>${C.allow[k].map(x=>({stat:'Chỉ số',effect:'Hiệu ứng',omega:'Ω',sigma:'Σ',alpha:'α',beta:'β'})[x]).join(' · ')}</em></button>`;}).join('');
  let p=0;for(const s of L)if(s.ty!=='effect'&&s.on.s<h.open)p+=val(s);
  el.innerHTML=`<div class="m63-card adv-card st71-card"><div class="m63-eye">KHẢM ĐÁ · ${esc(C.pn[h.pos].toUpperCase())}</div><h3>${posIcon(h.pos)}${esc(h.name)} <span class="fr70" style="--fc:#3aa8ff">${esc(h.tag||'')}</span></h3>
   <div class="st71-socks">${socks}</div><p class="adv-cost">Đá chỉ số & Ω/Σ trên món này: <b>+${pct(p)} ${isOff(h.pos)?'tấn công của món':'máu & giáp'}</b> · Ô đã mở <b>${h.open}/5</b></p>
   <div class="adv-btns"><button class="adv-x" data-a="inv" data-v="${h.pos}">KHO ĐÁ ›</button><button class="adv-x" data-a="close">ĐÓNG</button></div></div>`;el.hidden=false;}
 function picker(slot){const h=hostOf(view.key);view.slot=slot;const cur=on(view.key).find(x=>x.on.s===slot);
  const L=S.st.filter(s=>!s.on&&s.pos===h.pos&&!canPut(h,slot,s)).sort((a,b)=>b.t-a.t||val(b)-val(a));
  el.innerHTML=`<div class="m63-card adv-card st71-card"><div class="m63-eye">Ô ${slot+1} · ${esc(h.name)}</div><h3>Chọn đá</h3>
   ${cur?`<div class="st71-row cur" style="--tc:${C.tc[cur.t]}">${icon(cur)}<div><b>${esc(label(cur))}</b><small>${esc(desc(cur))}</small></div><button data-a="take" data-v="${cur.id}">THÁO</button></div>`:''}
   <div class="st71-list">${group(L).map(({s,n})=>`<div class="st71-row" style="--tc:${C.tc[s.t]}">${icon(s)}<div><b>${esc(label(s))}${n>1?' <i class="st71-n">×'+n+'</i>':''}</b><small>${esc(desc(s))}</small></div><button data-a="put" data-v="${s.id}">KHẢM</button></div>`).join('')||'<p class="adv-max">Không có đá phù hợp ô này trong kho. Ô '+(slot+1)+' nhận: '+C.allow[slot].filter(x=>x!=='alpha'&&x!=='beta').join(', ').replace('stat','chỉ số').replace('effect','hiệu ứng').replace('omega','Ω').replace('sigma','Σ')+'.</p>'}</div>
   <div class="adv-btns"><button class="adv-x" data-a="back">‹ QUAY LẠI</button></div></div>`;el.hidden=false;}
 const gkey=s=>[s.t,s.pos,s.ty,s.k||'',s.m==null?'':s.m].join('|');
 function group(L){const M=new Map();for(const s of L){const k=gkey(s)+(s.on?'#'+s.id:'');const g=M.get(k);if(g)g.n++;else M.set(k,{s,n:1});}return [...M.values()];}
 function inv(f){if(!el)build();if(!unlocked())return lockedCard();view=Object.assign(view||{},{f});const tabs=['all',...C.pos];
  const L=S.st.filter(s=>f==='all'||s.pos===f).sort((a,b)=>(a.on?1:0)-(b.on?1:0)||b.t-a.t||C.pos.indexOf(a.pos)-C.pos.indexOf(b.pos));
  const mergeRow=[0,1,2,3].map(t=>{const n=free(t,f==='all'?null:f).length;return `<button class="st71-mg ${n>=C.merge.k?'hot':''}" data-a="merge" data-v="${t}|${f}" style="--tc:${C.tc[t+1]}">${C.tn[t]} → ${C.tn[t+1]}<small>${n}/${C.merge.k} · ${fmt(C.merge.cr[t])} ◈</small></button>`;}).join('');
  el.innerHTML=`<div class="m63-card adv-card st71-card"><div class="m63-eye">KHO ĐÁ KHẢM</div><h3>Đá: ${S.st.length} viên</h3>
   <div class="hb-filter st71-tabs">${tabs.map(t=>`<button data-a="inv" data-v="${t}" aria-pressed="${t===f}">${t==='all'?'Tất cả':C.pn[t]}</button>`).join('')}</div>
   <div class="adv-req-t">TỤ HỢP ${C.merge.k} → 1 ${f==='all'?'(cùng phẩm)':'· '+C.pn[f]}</div><div class="st71-mgs">${mergeRow}<button class="st71-mg hot" data-a="mergeAll" data-v="${f}">GHÉP TẤT CẢ<small>từ thấp lên cao</small></button></div>
   <div class="st71-list">${group(L).map(({s,n})=>`<div class="st71-row ${s.on?'used':''}" style="--tc:${C.tc[s.t]}">${icon(s)}<div><b>${esc(label(s))}${n>1?' <i class="st71-n">×'+n+'</i>':''} ${posIcon(s.pos)}</b><small>${esc(desc(s))}${s.on?' · <u>đang khảm</u>':''}</small></div></div>`).join('')||'<p class="adv-max">Chưa có đá.</p>'}</div>
   <div class="adv-btns"><button class="adv-x" data-a="rf">TẨY ĐÁ ›</button>${view.key?'<button class="adv-x" data-a="back">‹ QUAY LẠI</button>':''}<button class="adv-x" data-a="close">ĐÓNG</button></div></div>`;el.hidden=false;}
 // ---------- TẨY ĐÁ (Tím / Cam) ----------
 let rfT=3,rfP='ship';
 function targets(t,pos){const L=[];for(const k of effPool(pos,t))L.push({ty:'effect',k,pos});for(const m of ownedModels(pos)){L.push({ty:'omega',m,pos},{ty:'sigma',m,pos});for(const ab of ['alpha','beta'])if(C.ab[m]&&C.ab[m].pos===pos&&abOK(m,ab,t))L.push({ty:ab,m,pos});}return L;}
 const tKey=x=>[x.ty,x.k||'',x.m==null?'':x.m,x.pos].join('|');
 const pinOK=()=>S.pin&&S.pin.t===rfT&&targets(rfT,S.pin.pos).some(x=>tKey(x)===tKey(S.pin));
 const freeT=t=>S.st.filter(x=>!x.on&&x.t===t).sort((a,b)=>(a.ty==='stat'?0:a.ty==='effect'?1:2)-(b.ty==='stat'?0:b.ty==='effect'?1:2));
 const mkT=(t,x)=>make(t,x.pos,{ty:x.ty,k:x.k,m:x.m});
 function reforgeStd(){if(!pinOK()){toast('HÃY GHIM VIÊN ĐÁ MUỐN NHẬN');return null;}const R=C.reforge.std,L=freeT(rfT);if(L.length<R.k){toast('CẦN '+R.k+' ĐÁ '+C.tn[rfT].toUpperCase()+' CHƯA KHẢM');return null;}const cr=R.cr[rfT];if(Progress.balance()<cr){toast('THIẾU HỢP KIM · cần '+fmt(cr));return null;}if(!Progress.spendCredits(cr))return null;
  const used=new Set(L.slice(0,R.k).map(x=>x.id));S.st=S.st.filter(x=>!used.has(x.id));const r=give(mkT(rfT,S.pin));bump();try{Q77.track('stone',1);Q77.track('upgrade',1);}catch{}return r;}
 function reforgeOne(){const R=C.reforge.one,L=freeT(rfT);if(!L.length){toast('CẦN 1 ĐÁ '+C.tn[rfT].toUpperCase()+' CHƯA KHẢM');return null;}const cr=R.cr[rfT];if(Progress.balance()<cr){toast('THIẾU HỢP KIM · cần '+fmt(cr));return null;}if(!Progress.spendCredits(cr))return null;
  const src=L[0];S.st=S.st.filter(x=>x!==src);S.rpity=(S.rpity|0)+1;let hit=false,r;
  if(pinOK()&&(S.rpity>=R.pity||Math.random()<R.rate)){hit=true;S.rpity=0;r=mkT(rfT,S.pin);}else{const T=targets(rfT,src.pos);r=Math.random()<.4?make(rfT,src.pos,{ty:'stat'}):mkT(rfT,pick(T));}
  give(r);bump();try{Q77.track('stone',1);Q77.track('upgrade',1);}catch{}return {s:r,hit};}
 // V75 · TẨY TỰ ĐỘNG (Gemini PLAN75.SOCKET_SYSTEM.AUTO_REROLL, chỉnh cho đúng hệ tẩy định hướng của game):
 //  lặp Tẩy lẻ, mỗi khung hình 1 lần (không treo trận/canvas), dừng khi TRÚNG viên ghim, hết đá/hợp kim, bấm DỪNG, hoặc chạm trần 50 lần.
 const AR={on:false,stop:false,n:0,cap:50};
 async function autoRf(){if(AR.on)return;if(!pinOK()){toast('HÃY GHIM VIÊN ĐÁ MUỐN NHẬN');return;}AR.on=true;AR.stop=false;AR.n=0;let why='',last=null;const spent0=Progress.balance();reforge({});
  try{while(AR.n<AR.cap&&!AR.stop){const r=reforgeOne();if(!r){why='hết đá hoặc hợp kim';break;}AR.n++;last=r;const b=el&&el.querySelector('[data-a=rfstop]');if(b)b.textContent='DỪNG ('+AR.n+')';if(r.hit){why='TRÚNG viên ghim';break;}await new Promise(res=>requestAnimationFrame(()=>setTimeout(res,60)));}
   if(!why)why=AR.stop?'đã dừng':'chạm trần '+AR.cap+' lần';}finally{AR.on=false;}
  band('TẨY TỰ ĐỘNG · '+AR.n+' lần · '+why.toUpperCase()+(last?' · '+label(last.s).toUpperCase():'')+' · −'+fmt(Math.max(0,spent0-Progress.balance()))+' ◈');reforge({});}
 function reforge(o){if(!el)build();if(o.t)rfT=o.t;if(o.pos)rfP=o.pos;const L=targets(rfT,rfP),pin=pinOK()?tKey(S.pin):'';const n=freeT(rfT).length,R=C.reforge;
  const grp=[['Hiệu ứng',x=>x.ty==='effect'],['Ω / Σ chuyên dụng',x=>x.ty==='omega'||x.ty==='sigma'],['α / β chuyên dụng',x=>x.ty==='alpha'||x.ty==='beta']];
  const row=x=>{const sm=mkT(rfT,x);const k=tKey(x);return `<div class="st71-row ${k===pin?'cur':''}" style="--tc:${C.tc[rfT]}">${icon(sm)}<div><b>${esc(name(sm))}</b><small>${esc(desc(sm))}</small></div><button data-a="rfpin" data-v='${esc(JSON.stringify(Object.assign({t:rfT},x)))}'>${k===pin?'✓ ĐÃ GHIM':'GHIM'}</button></div>`;};
  el.innerHTML=`<div class="m63-card adv-card st71-card"><div class="m63-eye">TẨY ĐÁ ĐỊNH HƯỚNG</div><h3>Đá ${C.tn[rfT]} chưa khảm: ${n}</h3>
   <div class="hb-filter st71-tabs">${[3,4].map(t=>`<button data-a="rf" data-v='{"t":${t}}' aria-pressed="${t===rfT}">${C.tn[t]}</button>`).join('')}${C.pos.map(p=>`<button data-a="rf" data-v='{"pos":"${p}"}' aria-pressed="${p===rfP}">${C.pn[p]}</button>`).join('')}</div>
   <p class="adv-cost">Ghim 1 viên muốn nhận. <b>Tẩy chuẩn</b>: ${R.std.k} đá ${C.tn[rfT]} + ${fmt(R.std.cr[rfT])} ◈ → chắc chắn ra viên đã ghim. <b>Tẩy lẻ</b>: 1 đá + ${fmt(R.one.cr[rfT])} ◈, ${Math.round(R.one.rate*100)}% ra viên ghim, chắc chắn ở lần ${R.one.pity} (đang ${S.rpity|0}/${R.one.pity}).</p>
   <div class="st71-list">${grp.map(([g,f])=>{const G=L.filter(f);return G.length?`<div class="adv-req-t">${g}</div>`+G.map(row).join(''):'';}).join('')}</div>
   <div class="adv-btns"><button class="m63-go ${pin&&n>=R.std.k?'':'off'}" data-a="rfstd">TẨY CHUẨN (${R.std.k} → 1)</button><button class="m63-go ${n?'':'off'}" data-a="rfone">TẨY LẺ</button></div>
   <div class="adv-btns">${AR.on?`<button class="m63-go" data-a="rfstop">DỪNG (${AR.n})</button>`:`<button class="m63-go ${pin&&n?'':'off'}" data-a="rfauto">TẨY TỰ ĐỘNG · đến khi trúng</button>`}</div>
   <div class="adv-btns"><button class="adv-x" data-a="inv" data-v="all">‹ KHO ĐÁ</button><button class="adv-x" data-a="close">ĐÓNG</button></div></div>`;el.hidden=false;}
 function patrol(){if(!el)build();const p=patrolPreview(),ok=patrolOpen();
  el.innerHTML=`<div class="m63-card adv-card st71-card"><div class="m63-eye">TUẦN TRA KHÔNG GIAN</div><h3>Phi đội đang tuần tra</h3>
   <div class="st71-pt"><div class="bar"><i style="width:${Math.min(100,p.h/C.patrol.max*100)}%"></i></div><small>${p.h.toFixed(1).replace('.',',')} / ${C.patrol.max} giờ (tích lũy cả khi tắt game)</small></div>
   <div class="adv-cmp"><div><i>HỢP KIM</i><b>+${fmt(p.cr)} ◈</b></div><div><i>ĐÁ NÂNG CẤP</i><b>+${fmt(p.ex)} ⬢</b></div></div>
   <p class="adv-cost">${unlocked()?`Đá khảm: <b>${p.low}</b> Trắng/Lục (mỗi ${C.patrol.low} giờ) · <b>${p.lam}</b> Lam (mỗi ${C.patrol.lam} giờ)`:'Đá khảm: mở khi vượt ải '+C.unlock}</p>
   <div class="adv-btns">${ok?`<button class="m63-go ${p.h>=1/60?'':'off'}" data-a="pat">NHẬN QUÀ</button>`:`<button class="m63-go off">MỞ Ở ẢI ${C.patrolUnlock}</button>`}<button class="adv-x" data-a="close">ĐÓNG</button></div></div>`;el.hidden=false;}
 function salvPanel(id){if(!el)build();const it=Progress.v70.get(id);if(!it)return;const inf=salvageInfo(it);
  el.innerHTML=`<div class="m63-card adv-card st71-card"><div class="m63-eye">TINH HÓA</div><h3>${esc(GearCatalog[it.variant].name)} <span class="fr70" style="--fc:${V70C(it)}">${esc(V70T(it))}</span></h3>
   <p class="adv-max">${inf?`Rã món này thành <b>${esc(inf.txt)}</b>. Tốn <b>${fmt(inf.cr)} ◈</b>. Món sẽ mất (đá đang khảm trả về kho).`:'Chỉ tinh hóa được trang bị khung Lam trở lên. Món Trắng/Lục hãy dùng Phân giải.'}</p>
   <div class="adv-btns">${inf?`<button class="m63-go ${Progress.balance()>=inf.cr?'':'off'}" data-a="salv" data-v="${esc(id)}">TINH HÓA</button>`:''}<button class="adv-x" data-a="close">ĐÓNG</button></div></div>`;el.hidden=false;}
 function migNote(n,cr){if(!el)build();el.innerHTML=`<div class="m63-card adv-card st71-card"><div class="m63-eye">CẬP NHẬT V71</div><h3>Ngọc đã đổi thành Đá khảm</h3><p class="adv-max">Hệ Ngọc được thay bằng hệ Đá. Toàn bộ ngọc và mảnh ngọc đã đổi thành <b>${n} đá</b>${cr?' và <b>'+fmt(cr)+' ◈</b> bù thêm':''}. Ngọc đang lắp được khảm sẵn vào đúng món nếu ô đã mở.</p><div class="adv-btns"><button class="m63-go" data-a="inv" data-v="all">XEM KHO ĐÁ</button><button class="adv-x" data-a="close">ĐÓNG</button></div></div>`;el.hidden=false;}
 // tóm tắt cho thẻ trang bị (thay COMBO NGỌC)
 function cardHtml(){if(!unlocked())return `<div class="m7-h sub"><b>ĐÁ KHẢM</b><span>Mở ở ải ${C.unlock}</span></div>`;const T=totals();let n=0;for(const k in T.host)n+=on(k).length;const e=Object.keys(T.eff);
  return `<div class="m7-h sub"><b>ĐÁ KHẢM</b><span>${n} viên</span></div><ul class="m7-list"><li class="${atkM()>1?'on':''}">Tấn công ×${atkM().toFixed(3).replace('.',',')} · Máu & giáp +${pct(T.def)}</li>${e.map(k=>`<li class="on"><b>${esc(C.eff[k].n)}</b> · ${esc(C.eff[k].d.replace('{v}',C.eff[k].u==='s'?String(T.eff[k]).replace('.',',')+' giây':pct(T.eff[k])))}</li>`).join('')}</ul>`;}
 // ---------- nút trong Kho (Hub40) & sảnh ----------
 function patchHub(){const h=document.getElementById('hub40');if(!h)return;
  const mg=h.querySelector('#sh-mg');if(mg&&!h.querySelector('#sh-st71')){const sh=mg.closest('.hb-sheet'),id=sh&&sh.dataset.item;if(id){const b=document.createElement('button');b.id='sh-st71';b.className='hb-btn cyan';const hh=hostOf('g:'+id);b.innerHTML='KHẢM ĐÁ<small>'+(unlocked()?(hh?on(hh.key).length+' viên · ô mở '+hh.open+'/5':''):'Mở ở ải '+C.unlock)+'</small>';b.onclick=ev=>{ev.preventDefault();ev.stopPropagation();host('g:'+id);};mg.after(b);
    const it=Progress.v70.get(id);if(it&&salvageInfo(it)&&unlocked()){const s=document.createElement('button');s.id='sh-sv71';s.className='hb-btn gold';s.innerHTML='TINH HÓA<small>rã thành đá · '+fmt(salvageInfo(it).cr)+' ◈</small>';s.onclick=ev=>{ev.preventDefault();ev.stopPropagation();salvPanel(id);};b.after(s);}}}
  const he=h.querySelector('#hb-en');if(he&&!h.querySelector('#hb-st71')){const cur=h.querySelector('#hb-strip [aria-current="true"]'),idx=cur?+cur.dataset.c:0;const b=document.createElement('button');b.id='hb-st71';b.className='hb-btn cyan';const hh=hostOf('c'+idx);b.innerHTML='KHẢM ĐÁ<small>'+(unlocked()?(hh?on(hh.key).length+' viên · ô mở '+hh.open+'/5':''):'Mở ở ải '+C.unlock)+'</small>';b.onclick=ev=>{ev.preventDefault();host('c'+idx);};he.after(b);}}
 function watch(){const h=document.getElementById('hub40');if(!h){setTimeout(watch,500);return;}new MutationObserver(()=>{try{patchHub();}catch{}}).observe(h,{childList:true,subtree:true});patchHub();}
 setInterval(()=>{try{const fx=document.querySelector('#hgr41 .h1-fx');if(fx&&!fx.querySelector('[data-st71]')){for(const [k,t,fn] of [['inv','ĐÁ KHẢM',()=>inv('all')],['pat','TUẦN TRA',patrol]]){const b=document.createElement('button');b.dataset.st71=k;b.className='adv69b';b.textContent=t;b.addEventListener('click',e=>{e.stopPropagation();view=null;fn();});fx.appendChild(b);}}
   const pb=document.querySelector('#hgr41 [data-st71="pat"]');if(pb){const ready=patrolOpen()&&patrolNow()>=1;pb.classList.toggle('hot',ready);}}catch{}},1000);
 // ---------- khởi động ----------
 setTimeout(()=>{try{migrate();}catch{}try{tidy();}catch{}},900);watch();
 // V87 · hợp thể SSS mới tiêu đá khảm theo phẩm: ưu tiên đá chỉ số chưa lắp, rồi đá hiệu ứng; không đụng Ω/Σ/α/β
 function haveT(t){return S.st.filter(x=>x.t===t&&!x.on).length;}
 function spendT(t,n){const L=S.st.filter(x=>x.t===t&&!x.on).sort((a,b)=>(a.ty==='stat'?0:a.ty==='effect'?1:2)-(b.ty==='stat'?0:b.ty==='effect'?1:2));if(L.length<n)return false;const rm=new Set(L.slice(0,n).map(x=>x.id));S.st=S.st.filter(x=>!rm.has(x.id));save();try{bump();}catch{}return true;}
 return {mergeAll,forgeOpts,forgeNeed,forgeX,upList,upX,label,haveT,spendT,reforge,reforgeStd,reforgeOne,targets,onUlt,abMult,abE,exPool,C,state:()=>JSON.parse(JSON.stringify(S)),make,give,put,take,merge,salvage,salvageInfo,hostOf,on,totals,atkMult,ef,host,inv,patrol,patrolPreview,patrolClaim,migrate,unlocked,dropFor,cardHtml,val,desc,name,label,
  _set:(o)=>{Object.assign(S,o);save();bump();},_rf:(t,p)=>{if(t)rfT=t;if(p)rfP=p;},_auto:autoRf,_ar:()=>({...AR}),_cond:cond};
})();
