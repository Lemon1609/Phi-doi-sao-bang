window.DAN307_IMG={'chrono_needle':'assets/5f7e901dc87d.webp','crescent_slash':'assets/f591bc0ff00f.webp','crescent_slash_heavy':'assets/f5fb70239ad1.webp','gravity_lance':'assets/d7f07e96391a.webp','gravity_lance_mega':'assets/8a969faed1d3.webp','ice_lance':'assets/a927f2ebd2b6.webp','ice_lance_ss':'assets/c444ecdafae3.webp','phoenix_feather':'assets/da351ac2faeb.webp','phoenix_wing_wave':'assets/233b2827d807.webp','quantum_shard':'assets/79b03de5ea35.webp','radiant_dart':'assets/981522f0e0f3.webp','star_spindle':'assets/2578b467eadb.webp','thermobaric_sabot':'assets/86985b34a90d.webp','void_fang':'assets/ed2656c7be95.webp','void_scythe':'assets/661350bf05cc.webp','void_scythe_emperor':'assets/397b4e5d7d0b.webp','wing_blade':'assets/5e8e61372ffb.webp'};'use strict';
/* V2.2.1 GLOW22: trần số quầng cộng sáng của đạn chính mỗi khung (Bạo Tẩu phủ ~0,6 màn hình cộng sáng). document.timeline.currentTime không đổi trong 1 khung rAF.
   ĐẸP 40 · NHẸ 18 · tắt: window.GLOW22=false · đổi trần: window.GLOW22CAP */
const G22={f:-1,n:0};function glow22(){if(window.GLOW22===false)return true;const f=document.timeline?document.timeline.currentTime:performance.now();if(f!==G22.f){G22.f=f;G22.n=0;}
 let lite=false;try{lite=VisualFX.counts().quality==='light'}catch(e){}return ++G22.n<=(window.GLOW22CAP||(lite?18:40));}
// V307 · ĐẠN CHÍNH KIỂU MỚI theo Gemini (docs_claude/de_xuat_cho/GEMINI_TRA_LOI_THIET_KE_DAN_13_TAU_V307.md) · 13 TÀU (tàu có tia laser liền giữ laser cũ)
//  • Cơ chế: gom sát thương của các loạt bắn cũ (giữ nguyên tổng sát thương mỗi giây), phát lại theo nhịp mới thành quạt N tia, bay nhanh, thưa.
//  • Hình: vệt lông vũ lửa vẽ bằng mã (chưa có sprite GPT) — 3 lớp: quầng (đè thường, mờ) · thân màu bão hòa + đuôi mờ dần · lõi sáng nhỏ (cộng sáng).
//  • Tắt: window.DAN307B=false · bật thêm tàu khác: window.DAN307IDS=[0,...]
(function(){
 const CFG={0:{rays:[2,3,4,5,6,7],tot:[8,16,28,40,50,60],len:[70,80,90,102,115,130],rate:6.5,speed:1250,
   col:{thuong:'#ffb347',luc:'#ff8f2e',lam:'#ff6a24',tim:'#ff4a1e',tim5:'#ff7a1a',ss:'#ffcf5a'},core:'#fff1c4',bt:{rays:9,tot:76,col:'#ffd36a',len:84}}};
 // Bảng Gemini (tia × góc tổng theo bậc, tốc độ, nhịp). Tốc độ Gemini tính theo px màn 393 → nhân ~0,8 và chặn 1.400 để không xuyên qua quái (va chạm theo khung hình).
 const G=(rays,tot,sp,rate,bt,base,core)=>{const f=[.7,.8,.9,1,1.12,1.25];return {rays,tot,len:f.map(x=>Math.round(base*x)),rate,speed:Math.min(1400,Math.round(sp*.8)),col:{},core:core||'#ffffff',bt:{rays:bt,tot:76,col:'#ffe6a0',len:Math.round(base*1.3)}};};
 Object.assign(CFG,{
  2:G([1,2,3,4,5,6],[0,10,16,24,30,36],1400,6,7,104,'#eaffff'),
  3:G([2,2,4,4,6,6],[15,24,32,40,46,52],1150,5.5,8,92,'#eaffd8'),
  4:G([3,4,5,7,8,9],[12,18,24,34,40,46],1750,7,13,112,'#fff6cf'),
  5:G([2,3,4,5,6,7],[14,20,26,32,38,44],1350,6,10,88,'#e6fbff'),
  6:G([1,2,3,5,5,7],[0,14,22,28,34,40],1650,6.5,9,96,'#fff3d6'),
  7:G([1,2,3,4,5,6],[0,10,18,26,32,38],1450,5.5,8,104,'#fff0d0'),
  8:G([2,2,4,4,6,6],[20,28,34,42,48,54],1250,6,8,84,'#fff4cc'),
  9:G([2,3,4,5,6,7],[8,14,22,30,36,42],1500,6,9,96,'#eef6ff'),
  10:G([1,2,3,3,4,5],[0,12,20,26,32,38],1300,5,5,104,'#f6e0ff'),
  11:G([2,3,4,5,6,7],[8,14,20,28,34,40],1700,6.5,10,112,'#fffbe8'),
  12:G([1,2,3,4,5,6],[0,14,22,30,36,42],1400,5.5,7,100,'#f6e6ff')});
 // hệ số bù để sát thương trên bia cố định (15 bia) khớp bản cũ (đo 19/11: quạt rộng + xuyên/nổ trúng nhiều bia hơn)
 const DK={3:.90,5:.90,6:1.09,7:.72,8:.93,10:.77,12:.715};
 const on=id=>window.DAN307B!==false&&(window.DAN307IDS||Object.keys(CFG).map(Number)).includes(id)&&CFG[id];
 const tierOf=id=>{try{return Dan299.tierOf(id)||'tim';}catch{return 'tim';}};
 const T=['thuong','luc','lam','tim','tim5','ss'];
 let bank=0,last=-9,tpl=null,bankId=-1;
 function emit(id){const c=CFG[id],bt=typeof superTime!=='undefined'&&superTime>0,ti=Math.max(0,T.indexOf(tierOf(id)));
  const n=bt?c.bt.rays:c.rays[ti],tot=(bt?c.bt.tot:c.tot[ti])*Math.PI/180,L=bt?c.bt.len:c.len[ti],col=bt?c.bt.col:c.col[window.MAUA309!==false?'tim':T[ti]];
  const dmg=bank/n*(DK[id]||1);bank=0;
  for(let k=0;k<n;k++){const a=n>1?-tot/2+tot*k/(n-1):0,vx=Math.sin(a)*c.speed,vy=-Math.cos(a)*c.speed,x=player.x+(k-(n-1)/2)*4;
   shot(x,player.y-30,vx,vy,tpl.type||'rapid',dmg,tpl.r||4);const s=shots.at(-1);if(!s)continue;
   for(const key in tpl){if(['x','y','vx','vy','damage','hit','age','dead'].includes(key))continue;s[key]=tpl[key];}
   if(window.HANGAR_DEMO&&typeof mode!=='undefined'&&mode!=='play'){s.type='rapid';for(const q of ['homing','target','turn','seek','rocket28','missile']){if(q in s)s[q]=0;}}/* sân khấu sảnh: bay thẳng, không bám mục tiêu */s.damage=dmg;s.vx=vx;s.vy=vy;s.d307=1;s.t307=window.MAUA309!==false?'tim':T[ti];/* V309 Phương án A (Gemini 20/11 22:31): mọi bậc giữ màu riêng tàu; bậc thể hiện bằng số tia / cỡ. Tắt: window.MAUA309=false */s.c307=col;s.L307=L;s.bt307=bt;s.k307=k;s.age=0;if(window.CO309&&CO309.decor&&!(window.HANGAR_DEMO&&typeof mode!=='undefined'&&mode!=='play'))try{CO309.decor(id,s,k,n,bt);}catch{}/* V309c cơ chế riêng 13 tàu */if(window.HANGAR_DEMO&&typeof mode!=='undefined'&&mode!=='play'){s.bt307=false;s.L307=Math.min(L,c.len[ti]||L);}/* sảnh: sóng cánh Bạo Tẩu phóng to bị cắt thành vệt trắng chữ V ở mép khung → dùng hình đạn thường */}}
 function hook(){if(typeof Arsenal30==='undefined'||typeof Fighters28==='undefined'||!Fighters28.__d299||Arsenal30.__d307)return false;
  // gom mọi viên đạn chính của tàu đang bay vừa sinh ra (kể cả viên các mô-đun khác thêm sau: co303, v87, ss90…) → ngân hàng sát thương → phát lại theo nhịp mới
  function sweep(){const id=(typeof selected!=='undefined')?selected:-1;if(!on(id)||typeof shots==='undefined')return;try{if(mode!=='play'&&!(window.HANGAR_DEMO&&window.DAN307SANH!==false))return;}catch{return;}/* V307 19/11: bật cả sân khấu sảnh (demo hangar-v41 có di chuyển đạn); tắt riêng: window.DAN307SANH=false */try{if(typeof activeRobot!=='undefined'&&activeRobot)return;}catch{}
   const nw=shots.filter(s=>s.art28===id&&!s.d307&&!s.ray28&&!s.gearItem&&!s.ally&&!s.escort40&&!s.dead&&(s.age||0)<.06&&!(s.hit&&(s.hit.size||s.hit.length)));
   if(nw.length){if(bankId!==id){bank=0;bankId=id;}for(const s of nw){bank+=s.damage||0;s.dead=true;}const keep=new Set(nw);shots=shots.filter(s=>!keep.has(s));tpl=Object.assign({},nw[0]);}
   const now=performance.now()/1000;if(bank>0&&tpl&&now-last>=1/CFG[id].rate){last=now;emit(id);}}
  const of=Arsenal30.fire;Arsenal30.fire=function(){const r=of.apply(this,arguments);try{sweep();}catch{}return r;};Arsenal30.__d307=1;
  if(typeof PlayerFXB!=='undefined'){const ob=PlayerFXB.begin;PlayerFXB.begin=function(){const r=ob.apply(this,arguments);try{if(typeof mode==='undefined'||mode==='play'||window.HANGAR_DEMO)sweep();}catch{}return r;};}
  const od=Fighters28.draw;Fighters28.draw=function(g,s){if(s&&s.d307&&window.DAN307B!==false){try{draw(g,s);return true;}catch{}}return od.apply(this,arguments);};
  return true;}
 const IM={};for(const k in (window.DAN307_IMG||{})){const im=new Image();im.src=DAN307_IMG[k];IM[k]=im;}
 const SPR={0:['phoenix_feather','phoenix_wing_wave'],2:['ice_lance','ice_lance_ss'],3:['void_fang','void_fang'],4:['radiant_dart','radiant_dart'],5:['quantum_shard','quantum_shard'],
  6:['crescent_slash','crescent_slash_heavy'],7:['thermobaric_sabot','thermobaric_sabot'],8:['wing_blade','wing_blade'],9:['star_spindle','star_spindle'],10:['gravity_lance','gravity_lance_mega'],11:['chrono_needle','chrono_needle'],12:['void_scythe','void_scythe_emperor']};
 // màu nhẹ theo bậc (Gemini: vàng cam → cam đỏ → đỏ thẫm → … → vàng trắng rực): lọc màu 1 lần rồi giữ trong bộ đệm
 const TINT={0:{thuong:'hue-rotate(18deg) brightness(1.08)',luc:'hue-rotate(6deg)',lam:'none',tim:'hue-rotate(-12deg) saturate(1.2) brightness(.95)',tim5:'hue-rotate(-26deg) saturate(1.25)',ss:'hue-rotate(28deg) saturate(.8) brightness(1.3)'}};
 const TG={thuong:'saturate(.55) brightness(1.15)',luc:'saturate(.8)',lam:'none',tim:'saturate(1.25) brightness(.95)',tim5:'saturate(1.35) hue-rotate(-12deg)',ss:'saturate(.85) brightness(1.3)'};
 // V309 (chủ dự án 20/11 10:40): đạn sáng hơn, dày hơn, ĐỔI MÀU THEO BẬC — Thường bạc trắng · Lục · Lam · Tím = màu riêng tàu · Tím+5 hồng tím · SS vàng kim.
 //  Tô lại theo độ sáng: tối → màu bậc → gần trắng ở lõi (giữ hình sprite). Tắt: window.DAN309=false
 // V309b (Gemini 20/11 13:43): bảng màu 6 bậc CHỐNG LÓA — lõi ≤25 %, thân bão hòa ≥75 %, viền đậm; Thường = Bạc Thép Xanh, SS = Hoàng Kim Hổ Phách.
 //  [lõi, thân, viền]; Tím giữ màu riêng tàu. Tắt bảng mới (quay bảng 10:40): window.MAU309B=false
 const RCB={thuong:[[216,243,255],[91,192,235],[29,78,216]],luc:[[187,247,208],[16,185,129],[4,120,87]],lam:[[186,230,253],[2,132,199],[30,58,138]],tim5:[[245,208,254],[217,70,239],[134,25,143]],ss:[[254,240,138],[245,158,11],[180,83,9]]};
 const RC={thuong:[220,232,255],luc:[30,225,85],lam:[35,120,255],tim5:[255,55,205],ss:[255,185,25]};
 window.MAU309=RCB;
 const mix=(a,b,f)=>[a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f,a[2]+(b[2]-a[2])*f];
 const RCC={};function recolor(im,k,tier){if(window.DAN309===false)return null;const B=window.MAU309B!==false||/^sk8_/.test(tier)?RCB[tier]:null,c=RC[tier]||(B&&B[1]);if(!c)return null;const key=k+'|'+tier+(B?'b':'');if(RCC[key])return RCC[key];
  try{const W=im.naturalWidth||im.width,H=im.naturalHeight||im.height,cv=document.createElement('canvas');cv.width=W;cv.height=H;const g=cv.getContext('2d');g.drawImage(im,0,0);const d=g.getImageData(0,0,W,H),p=d.data;
   for(let i=0;i<p.length;i+=4){if(!p[i+3])continue;const L=Math.max(p[i],p[i+1],p[i+2])/255;let q;
    if(B){/* ảnh tách nền alpha=max → cường độ nằm ở alpha: v = sáng × alpha */const v=L*p[i+3]/255;q=v<.25?mix(B[2].map(x=>x*.6),B[2],v/.25):v<.55?mix(B[2],B[1],(v-.25)/.3):v<.85?B[1]:mix(B[1],B[0],Math.min(1,(v-.85)/.15));p[i+3]=Math.min(255,p[i+3]*1.35);}
    else{if(L<.4){const f=.25+L/.4*.75;q=[c[0]*f,c[1]*f,c[2]*f];}else if(L<.88)q=c;else q=mix(c,[255,255,255],(L-.88)/.12*.6);}
    p[i]=q[0];p[i+1]=q[1];p[i+2]=q[2];}
   g.putImageData(d,0,0);return RCC[key]=cv;}catch{return null;}}
 const TC={};function tinted(id,k,tier,alt){const im=IM[k];if(!im||!im.complete||!im.naturalWidth)return null;if(!alt&&tier!=='tim'){const rc=recolor(im,k,tier);if(rc)return rc;}let f=(TINT[id]||TG)[tier]||'none';if(alt)f=(f==='none'?'':f+' ')+'hue-rotate(165deg)';tier=tier+(alt?'_alt':'');if(!f||f==='none')return im;const key=k+'|'+tier;if(TC[key])return TC[key];
  try{const c=document.createElement('canvas');c.width=im.naturalWidth;c.height=im.naturalHeight;const g=c.getContext('2d');if(!('filter' in g))return TC[key]=im;g.filter=f;g.drawImage(im,0,0);return TC[key]=c;}catch{return TC[key]=im;}}
 function draw(g,s){let L=s.L307,a=Math.atan2(s.vy,s.vx)+Math.PI/2,sp=SPR[s.art28]||[],alt=s.art28===11&&(s.k307&1),im=s.bt307?(alt?tinted(11,sp[1],'ss',1):(window.DAN309!==false&&s.t307!=='tim'&&IM[sp[1]]&&IM[sp[1]].complete?(recolor(IM[sp[1]],sp[1],s.t307)||IM[sp[1]]):IM[sp[1]])):tinted(s.art28,sp[0],s.t307,alt);
  let e21=null;try{e21=window.Evo21&&Evo21.dan(s.art28,s.bt307);if(e21)im=e21;}catch{}/* V2.1 Đợt 1: ảnh đạn GPT mới (EVO21_IMG) */
  if(im&&(im.width||im.naturalWidth)){const iw=im.naturalWidth||im.width,ih=im.naturalHeight||im.height,wd21=!!(e21&&iw>=ih*.9)/* V2.1: ảnh ngang / vuông (#07 trăng khuyết, #12 đĩa cưa) giữ tỉ lệ, vẽ quanh tâm */,h=wd21?L*(s.art28===11?.55:.8)*ih/Math.max(iw,ih):L*(s.bt307?1.05:1),w=wd21?L*(s.art28===11?.55:.8)*iw/Math.max(iw,ih):e21?h*iw/ih*1.15:h*iw/ih*(window.DAN309===false?1:(iw/ih<.22?1.9:1.4));
   if(e21){try{if(Evo21.spin(s.art28))a+=(s.age||0)*10;}catch{}}/* V2.1: đĩa cưa xoay tròn */
   try{const ot=window.SK8T&&window.SK8T();if(ot&&!alt&&!e21&&window.DAN309!==false){const kk=sp[s.bt307?1:0];if(IM[kk]&&IM[kk].complete){const r8=recolor(IM[kk],kk,ot);if(r8)im=r8;}}}catch{}/* V309 Lượt 8: trang phục chiến cơ đổi màu đạn chính (bảng sk8_<hạng> trong MAU309) */const fa=Math.min(1,(s.age||0)/.07);/* V307: hiện dần 0,07 s đầu để loạt đạn vừa bắn không chồng thành khối sát mũi tàu */
   g.save();g.translate(s.x,s.y);g.rotate(a);g.globalCompositeOperation='source-over';g.globalAlpha=(wd21&&s.art28===11?.85:.95)*fa;g.drawImage(im,-w/2,wd21?-h/2:-h*.12,w,h);
   g.globalCompositeOperation='lighter';if(wd21){/* V2.1: đĩa / trăng khuyết không thêm quầng cộng sáng (chồng nhiều viên thành cục trắng) */}else if(window.MAU309B!==false&&window.DAN309!==false){/* V309b: chỉ quầng ngoài cộng sáng, alpha .35 (Gemini) */if(glow22()){g.globalAlpha=(s.bt307?.3:.35)*fa*(window.FXK42?FXK42():1);/* V2.1.42: −15 % khi FX dày */g.drawImage(im,-w*.62,-h*.18,w*1.24,h*1.08);}}else{g.globalAlpha=(s.bt307?.35:.22)*fa*(window.DAN309===false?1:2);g.drawImage(im,-w*.3,-h*.1,w*.6,h*.5);if(window.DAN309!==false){g.globalAlpha=.3*fa;g.drawImage(im,-w*.62,-h*.18,w*1.24,h*1.08);}}g.restore();return;}
  drawCode(g,s);}
 function drawCode(g,s){const L=s.L307,c=s.c307,w=s.bt307?6:4.5,a=Math.atan2(s.vy,s.vx)+Math.PI/2,fl=Math.sin((s.age||0)*40);
  g.save();g.translate(s.x,s.y);g.rotate(a);
  // 1 · quầng mờ hẹp (đè thường)
  g.globalCompositeOperation='source-over';g.globalAlpha=s.bt307?.22:.14;g.fillStyle=c;g.beginPath();g.ellipse(0,L*.22,w*1.6,L*.42,0,0,6.283);g.fill();
  // 2 · đuôi vệt sáng dài, mỏng, mờ dần
  const gt=g.createLinearGradient(0,0,0,L);gt.addColorStop(0,c);gt.addColorStop(.35,c+'aa');gt.addColorStop(1,c+'00');
  g.globalAlpha=.9;g.fillStyle=gt;g.beginPath();g.moveTo(-w*.55,L*.1);g.lineTo(w*.55,L*.1);g.lineTo(fl*.6,L);g.closePath();g.fill();
  // thân lông vũ ngắn ở đầu
  g.globalAlpha=.95;g.fillStyle=c;g.beginPath();g.moveTo(0,-13);g.quadraticCurveTo(w*1.05,L*.06,w*.3,L*.3);g.lineTo(0,L*.4);g.lineTo(-w*.3,L*.3);g.quadraticCurveTo(-w*1.05,L*.06,0,-13);g.fill();
  // tàn lửa tách rời
  g.globalAlpha=.75;g.beginPath();g.arc(w*1.1+fl*2,L*.5,1.2,0,6.283);g.arc(-w-fl*2,L*.68,1,0,6.283);g.fill();
  // 3 · lõi đầu mũi sáng (cộng sáng, nhỏ)
  g.globalCompositeOperation='lighter';g.globalAlpha=s.bt307?.85:.7;g.fillStyle=(CFG[s.art28]||CFG[0]).core;g.beginPath();g.moveTo(0,-12);g.lineTo(w*.38,0);g.lineTo(0,L*.22);g.lineTo(-w*.38,0);g.closePath();g.fill();
  g.restore();}
 if(!hook()){const t=setInterval(()=>{if(hook())clearInterval(t);},250);}
 window.Dan307={CFG};
 // V309 L17 mục 4: sân khấu màn Kho bắn thử đúng đạn đặc trưng từng chiến cơ (cùng sprite + màu như trong trận). Trả false nếu tàu không có trong bảng (tàu tia laser liền).
 window.Dan307.hangar={rays(id){const c=CFG[id];if(!c)return null;const ti=Math.max(0,T.indexOf(tierOf(id)));return {n:c.rays[ti],tot:c.tot[ti]*Math.PI/180,len:c.len[ti]};},
  draw(g,id,x,y,vx,vy,age,col,sc){const c=CFG[id];if(!c)return false;const ti=Math.max(0,T.indexOf(tierOf(id)));const tier=window.MAUA309!==false?'tim':T[ti];
   const s={x,y,vx,vy,art28:id,age:age||0,L307:c.len[ti]*(sc||1),t307:tier,c307:c.col[tier]||c.col.tim||col||'#7dd3fc',k307:0,bt307:false};try{draw(g,s);}catch{try{drawCode(g,s);}catch{return false;}}return true;}};
})();
