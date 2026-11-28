'use strict';
// V2.4-A · CẢM GIÁC CHIẾN ĐẤU (nhánh v24-combat-feel, chủ dự án 28/11). Chỉ HÌNH: 0 % đổi sát thương / máu / DPS / kinh tế.
//  A) CÁNH BUNG BẠO TẨU riêng từng tàu / Chiến Thần — WING_CONFIG_BY_ID (ảnh src/wing24img, cắt bằng claude_tools/wing24_cat.py).
//     Chiến cơ thường: 0 cánh. Vào Bạo Tẩu: chữ BẠO TẨU! + vòng xung 0,25 s; cánh bung đàn hồi 0,22 s (0 → 1,22 → 1,0),
//     nửa phải + lật gương trái, xoay quanh khớp gốc (neo = lõi tròn), nghiêng theo hướng lượn, thở nhẹ; 1,5 s cuối nhấp nháy;
//     hết Bạo Tẩu ép gọn 0,18 s. 2 tàu con có hào quang cùng tông cánh suốt Bạo Tẩu.
//     Chiến Thần: ảnh mới nạp vào khuôn rw23 (cánh bung khi Hợp Thể / biến hình robot); Bạo Tẩu (bùng) mở rộng góc + cộng sáng.
//     Thay ảnh sau này: chỉ cần thay tệp webp cùng tên + chạy lại wing24_cat.py (neo / màu tự tính) — không sửa logic.
//  0 shadowBlur, 0 ctx.filter; canvas phụ chỉ tạo 1 lần (sprite hào quang / chữ) rồi dùng lại.
//  Tắt: window.V24=false (cả gói) · window.V24WING=false (chỉ cánh mới, trả về cánh cũ).
(()=>{
 if(window.V24===false)return;
 const IMG=window.WING24_IMG||{},J=window.WING24_J||{};
 const D2=Math.PI/180,TAU=Math.PI*2;
 const IM={};const img=k=>{let i=IM[k];if(!i&&IMG[k]){i=new Image();i.decoding='async';i.src=IMG[k];IM[k]=i;}return i&&i.complete&&i.naturalWidth?i:null;};
 // ---------- bảng cấu hình (đọc được từ ngoài để thả ảnh mới) ----------
 // len: dài cánh (từ neo tới mút xa nhất) theo cỡ tàu · offX/offY: vị trí lõi so với tâm tàu (theo cỡ tàu) · down: góc xuôi xuống (độ)
 // openBT: mở thêm khi Bạo Tẩu (độ) · col: tông hào quang tàu con / vòng xung (mặc định lấy từ ảnh)
 const SHIP_DEF={len:.95,offX:.13,offY:.06,down:15,openBT:6};
 const SHIP_OVR={8:{offX:.15},9:{offX:.15},10:{offX:.15,down:12},11:{offX:.16}};// #9–#12 neo sát mép phẳng
 const ROBOT_DEF={W:340,sh:22,y:-12,down:14,openBT:10};
 const WING_CONFIG_BY_ID={ship:{},robot:{}};
 for(let i=0;i<13;i++){const k='s'+i,j=J[k]||{};WING_CONFIG_BY_ID.ship[i]=Object.assign({img:k,anchorX:j.ax,anchorY:j.ay,w:j.w,h:j.h,podColor:j.col||'#7fe8ff',mirror:true},SHIP_DEF,SHIP_OVR[i]||{});}
 for(let i=0;i<7;i++){const k='ct'+(i+1),j=J[k]||{};WING_CONFIG_BY_ID.robot[i]=Object.assign({img:k,anchorX:j.ax,anchorY:j.ay,w:j.w,h:j.h,podColor:j.col||'#ffd36b',mirror:i!==1},ROBOT_DEF,i===1?{W:520,y:-26}:{});}
 window.WING_CONFIG_BY_ID=WING_CONFIG_BY_ID;
 const wingOn=()=>window.V24WING!==false&&!!J.s0;
 // ---------- trạng thái bung / thu ----------
 const st={on:false,t0:-9,t1:-9,id:-1,vx:0,px:0,lt:0,lastSuper:0,ring:-9,ringC:'#fff',ringX:0,ringY:0,fold:false};
 const nowS=()=>performance.now()/1000;
 const back=u=>{const c=1.70158*1.35;return 1+(c+1)*Math.pow(u-1,3)+c*Math.pow(u-1,2);};
 // hệ số mở: 0..~1,22..1 ; trả 0 khi đã thu xong
 function openK(isOn){const t=nowS();
  if(isOn&&!st.on){st.on=true;st.t0=t;st.fold=false;}
  if(!isOn&&st.on){st.on=false;st.t1=t;st.fold=true;}
  if(st.on){const u=Math.min(1,(t-st.t0)/.22);return u<1?Math.max(0,back(u)):1;}
  if(st.fold){const u=(t-st.t1)/.18;if(u>=1){st.fold=false;return 0;}return 1-u*u;}
  return 0;}
 function superLeft(){try{return superTime;}catch{return 0;}}
 // ---------- vẽ 1 cặp cánh (ctx đã ở tâm tàu, mũi hướng lên) ----------
 function drawPair(g,cfg,size,k,t){const im=img(cfg.img);if(!im||k<=0)return false;
  const iw=im.naturalWidth,ih=im.naturalHeight,ax=cfg.anchorX!=null?cfg.anchorX:iw*.1,ay=cfg.anchorY!=null?cfg.anchorY:ih*.5;
  const sc=size*cfg.len/Math.max(40,iw-ax)*k;
  const left=superLeft(),flash=st.on&&left>0&&left<1.5?(.72+.28*Math.sin(t*TAU*6)):1;
  const breath=1+.03*Math.sin(t*TAU*1.4),flap=2.5*D2*Math.sin(t*TAU*2.2);
  // nghiêng khi lượn: cánh phía ngoài khúc cua mở thêm, phía trong khép lại (±6°)
  const lean=Math.max(-1,Math.min(1,st.vx/420))*6*D2;
  for(const sd of [1,-1]){g.save();g.translate(sd*size*cfg.offX,size*cfg.offY);if(sd<0)g.scale(-1,1);
   g.rotate((cfg.down-cfg.openBT*Math.min(1,k))*D2+flap-sd*lean);g.scale(sc*breath,sc*breath);
   g.globalCompositeOperation='source-over';g.globalAlpha=.95*flash;g.drawImage(im,-ax,-ay);
   g.globalCompositeOperation='lighter';g.globalAlpha=(.18+.10*Math.sin(t*TAU*1.6))*flash;g.drawImage(im,-ax,-ay);
   g.restore();}
  g.globalCompositeOperation='source-over';g.globalAlpha=1;return true;}
 // ---------- móc: Evo21.drawWing — điểm vẽ cánh đầu tiên của wing309 ở CẢ 2 đường (v118 qua BtFx218.back, đã được rig23 hoãn
 //  xuống dưới đạn ta · tàu không có thân Evo53 qua SuperGame.drawShip). Trả true = đã vẽ → wing309 không gọi xuống aura307 /
 //  lửa BtFx218 cũ (cánh + lửa Bạo Tẩu cũ tắt hẳn). Ctx đã ở tâm tàu, đã nghiêng theo hướng bay.
 function trackV(){const t=nowS(),dt=Math.min(.05,Math.max(.001,t-(st.lt||t)));st.lt=t;try{const vx=(player.x-st.px)/dt;st.vx+=(vx-st.vx)*.25;st.px=player.x;}catch{}}
 function hookWing(){try{if(!window.Evo21||!Evo21.drawWing||Evo21.drawWing.__v24)return;const od=Evo21.drawWing;
  const f=function(g,id,size,isOn,now){if(!wingOn())return od.apply(this,arguments);const cfg=WING_CONFIG_BY_ID.ship[id];if(!cfg)return od.apply(this,arguments);
   if(st.id!==id){st.id=id;st.on=false;st.fold=false;}trackV();const k=openK(!!isOn);
   if(k>0)try{g.save();drawPair(g,cfg,size,k,nowS());g.restore();}catch{}return true;};f.__v24=1;Evo21.drawWing=f;window.CANH309=true;}catch{}}
 // ---------- Chiến Thần: nạp ảnh mới vào khuôn rw23 ----------
 function feedRW(){if(!wingOn()||!window.RW23_J||window.__rw24)return;window.__rw24=1;
  const RI=window.RW23_IMG=Object.assign({},window.RW23_IMG||{}),RJ=window.RW23_J;
  for(let i=0;i<7;i++){const cfg=WING_CONFIG_BY_ID.robot[i],j=J[cfg.img];if(!j||!IMG[cfg.img])continue;const n='ct'+(i+1);
   if(!cfg.mirror){RI[n+'_O']=IMG[cfg.img];RJ[n]={O:{w:j.w,h:j.h,px:j.ax,py:j.ay,ox:0,oy:0,bw:1,v24:1}};continue;}
   const q={w:j.w,h:j.h,px:j.ax,py:j.ay,ox:0,oy:0,bw:.5*j.w/Math.max(40,j.w-j.ax),v24:1};
   RI[n+'_R']=IMG[cfg.img];RI[n+'_L']=IMG[cfg.img];RJ[n]={R:q,L:Object.assign({},q,{mir:1})};}
  window.RW24CFG=WING_CONFIG_BY_ID.robot;}
 // ---------- vòng xung + chữ BẠO TẨU! (lớp trên cùng) ----------
 const CV={};function sprite(key,w,h,fn){if(CV[key])return CV[key];const c=document.createElement('canvas');c.width=w;c.height=h;fn(c.getContext('2d'),w,h);return CV[key]=c;}
 function txtSpr(){return sprite('bt',300,84,(g,w,h)=>{g.textAlign='center';g.textBaseline='middle';g.font="900 44px 'Be Vietnam Pro',Neo,sans-serif";
  for(const [lw,col,a] of [[14,'#ff6a00',.25],[9,'#ff9a1f',.45],[5,'#2b0a00',1]]){g.globalAlpha=a;g.lineJoin='round';g.lineWidth=lw;g.strokeStyle=col;g.strokeText('BẠO TẨU!',w/2,h/2);}
  g.globalAlpha=1;const gr=g.createLinearGradient(0,h*.2,0,h*.8);gr.addColorStop(0,'#fffbe0');gr.addColorStop(.5,'#ffd23a');gr.addColorStop(1,'#ff7a00');g.fillStyle=gr;g.fillText('BẠO TẨU!',w/2,h/2);});}
 function ringSpr(col){return sprite('r'+col,128,128,(g,w,h)=>{g.lineWidth=7;g.strokeStyle=col;g.globalAlpha=.85;g.beginPath();g.arc(64,64,56,0,TAU);g.stroke();g.lineWidth=3;g.strokeStyle='#ffffff';g.globalAlpha=.9;g.beginPath();g.arc(64,64,56,0,TAU);g.stroke();});}
 function glowSpr(col){return sprite('g'+col,64,64,(g)=>{const r=g.createRadialGradient(32,32,0,32,32,32);r.addColorStop(0,'rgba(255,255,255,.95)');r.addColorStop(.25,col);r.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=r;g.fillRect(0,0,64,64);});}
 function curCfg(){let rob=-1;try{if(typeof SSSGame!=='undefined'&&typeof activeRobot!=='undefined'&&activeRobot)rob=SSSGame.indexFor(activeRobot);}catch{}
  if(rob>=0)return WING_CONFIG_BY_ID.robot[rob];let id=-1;try{id=selected;}catch{}try{if(typeof launchCraft==='number')id=launchCraft;}catch{}return WING_CONFIG_BY_ID.ship[id]||WING_CONFIG_BY_ID.ship[0];}
 function overlay(){if(!wingOn())return;let pl=false;try{pl=mode==='play'||mode==='pause'||!!window.HANGAR_DEMO;}catch{}if(!pl)return;
  const sp=superLeft()>0;const t=nowS();
  if(sp&&!st.lastSuper){st.ring=t;try{st.ringC=curCfg().podColor;}catch{}}
  st.lastSuper=sp;
  const g=ctx;let px=0,py=0;try{px=player.x;py=player.y;}catch{return;}
  // hào quang tàu con suốt Bạo Tẩu (tắt cùng nhịp thu cánh)
  const kOpen=st.on?1:st.fold?Math.max(0,1-(t-st.t1)/.18):0;
  if((sp||kOpen>0)&&typeof Battle28!=='undefined'&&Battle28.support){let P=null;try{P=Battle28.support();}catch{}
   if(P){const col=curCfg().podColor,sp2=glowSpr(col),left=superLeft(),fl=left>0&&left<1.5?(.7+.3*Math.sin(t*TAU*6)):1;g.save();g.globalCompositeOperation='lighter';
    for(const q of P){if(!q||!Number.isFinite(q.x))continue;const R=30*(1+.08*Math.sin(t*TAU*1.8+q.x));g.globalAlpha=.55*fl*(sp?1:kOpen);g.drawImage(sp2,q.x-R,q.y-R,R*2,R*2);}
    g.restore();}}
  // vòng xung 0,25 s + chữ BẠO TẨU! 0,9 s
  const u=(t-st.ring)/.25;if(u>=0&&u<1){const R=24+150*(1-Math.pow(1-u,2.2));g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.9*(1-u);g.drawImage(ringSpr(st.ringC),px-R,py-R,R*2,R*2);g.restore();}
  const v=(t-st.ring)/.9;if(v>=0&&v<1&&window.V24TXT===true)/* chữ BẠO TẨU! đã có băng cam sẵn của game → mặc định không vẽ thêm */{const s=v<.18?.6+.55*Math.sin(v/.18*Math.PI/2):1.15-.15*Math.min(1,(v-.18)/.3),a=v<.7?1:1-(v-.7)/.3,im=txtSpr(),w=im.width*.62*s,h=im.height*.62*s;
   g.save();g.globalAlpha=a;g.drawImage(im,px-w/2,py-118-h/2-v*14,w,h);g.restore();}}
 function hookVFX(){try{if(typeof VisualFX==='undefined'||VisualFX.__v24)return;const od=VisualFX.draw;VisualFX.draw=function(){const r=od.apply(this,arguments);try{overlay();}catch{}return r;};VisualFX.__v24=1;}catch{}}
 // ================= B) HỎA LỰC · HIT-FEEDBACK · SÂN KHẤU BOSS (chỉ hình) =================
 const fxOn=()=>window.V24FX!==false;
 const playing=()=>{try{return mode==='play';}catch{return false;}};
 // sprite dựng 1 lần
 function starSpr(col){return sprite('s'+col,64,64,(g)=>{g.translate(32,32);g.globalCompositeOperation='lighter';
  for(const [r,w,a,c] of [[30,5,.55,col],[22,3,.95,'#ffffff']]){g.globalAlpha=a;g.fillStyle=c;for(let k=0;k<4;k++){g.save();g.rotate(k*Math.PI/2+(r>25?Math.PI/4:0));g.beginPath();g.moveTo(0,-r);g.lineTo(w,0);g.lineTo(0,r*.18);g.lineTo(-w,0);g.closePath();g.fill();g.restore();}}
  const rg=g.createRadialGradient(0,0,0,0,0,14);rg.addColorStop(0,'rgba(255,255,255,1)');rg.addColorStop(1,'rgba(255,255,255,0)');g.globalAlpha=1;g.fillStyle=rg;g.fillRect(-14,-14,28,28);});}
 function coreSpr(){return sprite('core',32,32,(g)=>{const rg=g.createRadialGradient(16,16,0,16,16,16);rg.addColorStop(0,'rgba(255,255,255,1)');rg.addColorStop(.35,'rgba(255,255,255,.85)');rg.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=rg;g.fillRect(0,0,32,32);});}
 function beamSpr(col){return sprite('b'+col,96,8,(g,w,h)=>{const lg=g.createLinearGradient(0,0,w,0);lg.addColorStop(0,'rgba(0,0,0,0)');lg.addColorStop(.18,col);lg.addColorStop(.42,'#ffffff');lg.addColorStop(.58,'#ffffff');lg.addColorStop(.82,col);lg.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=lg;g.fillRect(0,0,w,h);});}
 function txt(key,str,col1,col2,px){return sprite('t'+key,Math.max(120,str.length*px*.72+40),Math.round(px*1.9),(g,w,h)=>{g.textAlign='center';g.textBaseline='middle';g.font="900 "+px+"px 'Be Vietnam Pro',Neo,sans-serif";g.lineJoin='round';
  g.lineWidth=px*.32;g.strokeStyle='rgba(0,0,0,.55)';g.strokeText(str,w/2,h/2+2);g.lineWidth=px*.18;g.strokeStyle='#1a0b00';g.strokeText(str,w/2,h/2);
  const lg=g.createLinearGradient(0,h*.2,0,h*.8);lg.addColorStop(0,'#ffffff');lg.addColorStop(.45,col1);lg.addColorStop(1,col2);g.fillStyle=lg;g.fillText(str,w/2,h/2);});}
 // ---- bông hoa tia sáng + chớp trắng (bể cố định) ----
 const BL=[];for(let i=0;i<28;i++)BL.push({on:0});let bli=0;
 const FL=[];for(let i=0;i<20;i++)FL.push({on:0});let fli=0;
 function shotCol(sh){let id=0;try{id=selected;if(typeof launchCraft==='number')id=launchCraft;}catch{}try{const c=Fighters28.profiles[id].color;if(c&&c[0]==='#')return c.slice(0,7);}catch{}return '#9be8ff';}
 function hookHit(){try{if(typeof Feedback31==='undefined'||Feedback31.__v24)return;const od=Feedback31.damage;
  Feedback31.damage=function(e,amount,sh){const r=od.apply(this,arguments);try{if(fxOn()&&playing()&&e&&amount>0){const t=nowS();
    if(!(e.__b24>t-.06)){e.__b24=t;const x=sh&&Number.isFinite(sh.x)?sh.x:e.x,y=sh&&Number.isFinite(sh.y)?sh.y:e.y;const b=BL[bli=(bli+1)%BL.length];b.on=1;b.x=x;b.y=y-4;b.t=t;b.c=shotCol(sh);b.s=(sh&&sh.superShot)?1.35:1;b.r=Math.random()*6.283;}
    if(e!==boss&&!e.bossPart&&!(e.__f24>t-.05)){e.__f24=t;const f=FL[fli=(fli+1)%FL.length];f.on=1;f.e=e;f.t=t;}}}catch{}return r;};Feedback31.__v24=1;}catch{}}
 // ---- chữ nổi arcade (thay dải chữ nền đen) ----
 const POPS=[];
 const POPDEF={x2:['X2','#ffe066','#ff8a00',34],up:['NÂNG CẤP VŨ KHÍ!','#9bffef','#1fb6ff',24],hp:['HỒI MÁU!','#b4ffb0','#1fd06a',26],sh:['KHIÊN!','#bfe8ff','#3d8bff',26],bomb:['+1 BOM','#ffd0a8','#ff5a1f',26],sup:['SIÊU CẤP!','#fff3a0','#ff9a00',28]};
 function pop(k,x,y){if(!fxOn())return;const d=POPDEF[k];if(!d)return;if(POPS.length>4)POPS.shift();POPS.push({k,x,y,t:nowS()});}
 window.V24POP=pop;
 // chữ arcade 1 dòng có màu (băng môi trường l7309) — dựng sẵn theo nội dung, không nền đen
 window.V24TXT24=function(g,str,col,x,y,a){const im=sprite('e'+str,Math.max(160,str.length*15+40),40,(c,w,h)=>{c.textAlign='center';c.textBaseline='middle';c.font="900 19px 'Be Vietnam Pro',Neo,sans-serif";c.lineJoin='round';c.lineWidth=6;c.strokeStyle='rgba(2,6,14,.85)';c.strokeText(str,w/2,h/2);c.lineWidth=2.5;c.strokeStyle=col;c.globalAlpha=.9;c.strokeText(str,w/2,h/2);c.globalAlpha=1;c.fillStyle='#ffffff';c.fillText(str,w/2,h/2);});
  g.save();g.globalAlpha=a;const w=im.width*.72,h=im.height*.72;g.drawImage(im,x-w/2,y-h/2,w,h);g.restore();};
 // nhặt vật phẩm → chữ nổi arcade gần tàu (thông báo nền đen trong trận vốn đã bị Msg88 chặn)
 function hookCollect(){try{if(typeof collect!=='function'||collect.__v24)return;const oc=collect;const f=function(d){let p0=0,s0=0;try{p0=power;s0=superTime;}catch{}const r=oc.apply(this,arguments);
   try{if(fxOn()&&playing()&&d){const x=player.x,y=player.y,t=d.type;if(t==='power'){let p1=0,s1=0;try{p1=power;s1=superTime;}catch{}pop(p1>p0?'up':(s1>s0+.1&&s0<=0?'sup':'up'),x,y);}else if(t==='heal')pop('hp',x,y);else if(t==='shield'||t==='drone')pop('sh',x,y);else if(t==='bomb')pop('bomb',x,y);else if(/x2/i.test(String(t)))pop('x2',x,y);}}catch{}return r;};f.__v24=1;collect=f;}catch{}}
 // ---- dọn sân khấu khi vào cảnh báo Boss ----
 let wasPend=false;const POOF=[];
 function stageClear(){let p=false;try{p=Feedback31.state().pending;}catch{}
  if(p&&!wasPend&&fxOn()&&window.V24CLR!==false){try{if(typeof L7309!=='undefined'&&L7309.E&&L7309.E.on)L7309.stop();}catch{}
   try{for(const e of enemies){if(e.dead||e===boss||e.bossPart||e.rescue28)continue;POOF.push({x:e.x,y:e.y,t:nowS()});e.dead=true;}if(POOF.length>14)POOF.splice(0,POOF.length-14);}catch{}
   try{if(window.HAZ208X&&HAZ208X._A)HAZ208X._A().length=0;}catch{}}
  else if(p&&fxOn()&&window.V24CLR!==false){/* quái lọt vào trong lúc cảnh báo: dọn lặng lẽ */try{for(const e of enemies){if(e.dead||e===boss||e.bossPart||e.rescue28||e.y>H*.55)continue;e.dead=true;}}catch{}try{if(typeof L7309!=='undefined'&&L7309.E&&L7309.E.on)L7309.stop();}catch{}}
  try{document.documentElement.classList.toggle('v24warn',!!p&&fxOn());const tt=document.getElementById('toast');if(tt){const hid=!!p&&fxOn();if(hid!==!!tt.__v24h){tt.__v24h=hid;tt.style.visibility=hid?'hidden':'';}}}catch{}
  wasPend=p;}
 // ---- chuỗi nổ boss ~1,2 s + CHIẾN THẮNG rồi mới tổng kết ----
 const CH={on:false,t0:0,x:0,y:0,w:200,next:0,args:null,done:false};
 function hookFinish(){try{if(typeof finishStage36!=='function'||finishStage36.__v24)return;const of=finishStage36;
  const f=function(hadBoss){if(CH.on)return;try{if(fxOn()&&window.V24WIN!==false&&hadBoss&&playing()&&gameMode==='campaign'&&!Dungeons.active()&&!(window.Event83&&Event83.inRaid&&Event83.inRaid())&&boss&&!CH.done){
     CH.on=true;CH.done=true;CH.t0=nowS();CH.next=0;CH.x=boss.x;CH.y=boss.y;CH.w=Math.max(160,(boss.r||90)*2.2);CH.args=[...arguments];
     try{invuln=Math.max(invuln||0,3);}catch{}const self=this;setTimeout(()=>{CH.on=false;try{of.apply(self,CH.args);CH.after=mode;CH.sf=stageFinished36;}catch(e){CH.err=String(e&&e.stack||e).slice(0,300);}},1250);return;}}catch{}
   return of.apply(this,arguments);};f.__v24=1;finishStage36=f;}catch{}}
 // tầng vào trận mới: cho phép chuỗi nổ lần sau
 setInterval(()=>{try{if(mode!=='play')CH.done=false;}catch{}},500);
 // ---- vẽ lớp B (sau VisualFX.draw) ----
 function drawB(){if(!fxOn())return;let pl=false;try{pl=mode==='play'||mode==='pause';}catch{}if(!pl)return;const g=ctx,t=nowS();stageClear();
  g.save();g.globalCompositeOperation='lighter';
  // tinh thể sáng / to hơn
  try{const sp=coreSpr();for(const d of drops){if(d.type!=='star')continue;const R=(d.big?20:12)*(1+.12*Math.sin(t*6+d.x));g.globalAlpha=.55;g.drawImage(sp,d.x-R,d.y-R,R*2,R*2);}}catch{}
  // lõi trắng đạn chính theo cấp vũ khí (W1→W5) + tia trung tâm Bạo Tẩu
  try{if(!a2On()){const lv=Math.max(0,Math.min(4,(typeof powerUpgrades==='number'?powerUpgrades:0))),k=.9+.14*lv,cs=coreSpr();g.globalAlpha=.5+.08*lv;
   for(const s of shots){if(s.gearKind||s.gearItem||s.ally||s.escort40||s.type==='drone'||s.dead)continue;const R=(s.r||4)*1.6*k;g.drawImage(cs,s.x-R,s.y-R*1.4,R*2,R*2.8);}}
   const sp=superLeft()>0;let rob=false;try{rob=!!activeRobot;}catch{}let sid=0;try{sid=selected;if(typeof launchCraft==='number')sid=launchCraft;}catch{}
   if(sp&&!rob&&!(a2On()&&sid===7)){const col=curCfg().podColor,bs=beamSpr(col),w=(58+10*Math.sin(t*TAU*5))*(a2On()&&sid===1?1.8:1),y0=player.y-40;g.globalAlpha=.5;g.drawImage(bs,player.x-w/2,0,w,Math.max(0,y0));g.globalAlpha=.85;g.drawImage(bs,player.x-w*.22,0,w*.44,Math.max(0,y0));}}catch{}
  // bông hoa tia sáng
  for(const b of BL){if(!b.on)continue;const u=(t-b.t)/.16;if(u>=1){b.on=0;continue;}const R=(10+16*u)*b.s;g.globalAlpha=1-u;g.save();g.translate(b.x,b.y);g.rotate(b.r+u*.8);g.drawImage(starSpr(b.c),-R,-R,R*2,R*2);g.restore();}
  // chớp trắng thân địch 50 ms
  {const cs=coreSpr();for(const f of FL){if(!f.on)continue;const u=(t-f.t)/.05;if(u>=1||!f.e||f.e.dead){f.on=0;continue;}const e=f.e,R=Math.max(14,(e.r||e.size||18)*1.25);g.globalAlpha=.75*(1-u);g.drawImage(cs,e.x-R,e.y-R,R*2,R*2);}}
  // khói dọn sân khấu
  {const rs=ringSpr('#ff4a6a');for(let i=POOF.length-1;i>=0;i--){const p=POOF[i],u=(t-p.t)/.3;if(u>=1){POOF.splice(i,1);continue;}const R=8+30*u;g.globalAlpha=.7*(1-u);g.drawImage(rs,p.x-R,p.y-R,R*2,R*2);}}
  // chuỗi nổ boss
  if(CH.on){const u=(t-CH.t0)/1.2;if(t>=CH.next&&u<1){CH.next=t+.09;try{const ox=(Math.random()-.5)*CH.w,oy=(Math.random()-.5)*CH.w*.55;VisualFX.explode(CH.x+ox,CH.y+oy,1+Math.random()*.8,'boss');}catch{}try{bullets.length=0;}catch{}}
   const rs=ringSpr('#fff1b0'),R=40+260*Math.min(1,u);g.globalAlpha=.5*(1-Math.min(1,u));g.drawImage(rs,CH.x-R,CH.y-R,R*2,R*2);
   // mưa tinh thể (chỉ hình)
   const st=starSpr('#7fe8ff');for(let k=0;k<22;k++){const a=k*2.399,sp=(.35+((k*37)%10)/10)*u,x=CH.x+Math.cos(a)*sp*260,y=CH.y+Math.sin(a)*sp*200+u*u*160,R=9+((k*13)%6);g.globalAlpha=Math.max(0,1-u)*.9;g.drawImage(st,x-R,y-R,R*2,R*2);}}
  g.restore();
  // chữ nổi + CHIẾN THẮNG (thường, không cộng sáng)
  g.save();
  for(let i=POPS.length-1;i>=0;i--){const p=POPS[i],u=(t-p.t)/.85;if(u>=1){POPS.splice(i,1);continue;}const d=POPDEF[p.k],im=txt(p.k,d[0],d[1],d[2],d[3]),s=u<.15?.6+.6*Math.sin(u/.15*Math.PI/2):1.2-.2*Math.min(1,(u-.15)/.25),w=im.width*.5*s,h=im.height*.5*s;
   g.globalAlpha=u<.7?1:1-(u-.7)/.3;g.drawImage(im,p.x-w/2,p.y-50-u*36-h/2,w,h);}
  g.restore();}
 // rung màn nhẹ trong chuỗi nổ: dùng biến shake gốc của trận
 setInterval(()=>{try{if(CH.on)shake=Math.max(shake||0,.25);}catch{}},60);
 function drawWin(){if(!fxOn())return;const g=ctx,t=nowS();g.save();
  if(CH.on||(t-CH.t0<1.25&&CH.done&&playing())){const u=(t-CH.t0)/1.2;if(u>.25){const v=Math.min(1,(u-.25)/.2),im=txt('win','CHIẾN THẮNG','#fff3b0','#ffb000',46),s=.7+.35*Math.sin(v*Math.PI/2)-(v>=1?.05*Math.min(1,(u-.45)/.3):0),w=im.width*.62*s,h=im.height*.62*s;
    g.globalCompositeOperation='lighter';g.globalAlpha=.35*v;const cs=coreSpr();g.drawImage(cs,W/2-w*.7,H*.38-h*1.1,w*1.4,h*2.2);g.globalCompositeOperation='source-over';g.globalAlpha=v;g.drawImage(im,W/2-w/2,H*.38-h/2,w,h);}}
  g.restore();}
 function hookTop(){try{if(typeof Feedback31==='undefined'||Feedback31.__v24t)return;const od=Feedback31.draw;Feedback31.draw=function(){const r=od.apply(this,arguments);try{drawWin();}catch{}return r;};Feedback31.__v24t=1;}catch{}}
 // chân dung phi công trong bảng HỒI SINH
 function revive24(){try{const ov=document.getElementById('overlay');if(!ov)return;const on=ov.dataset.state==='revive'&&!ov.hidden;let pi=document.getElementById('rv24p');
  if(!on){if(pi)pi.hidden=true;return;}const A=typeof PILOT_ASSETS!=='undefined'?PILOT_ASSETS:{};let id=0;try{id=(Pilot67.state().team||[])[0]||0;}catch{}const src=A['p'+id]||A['p'+(id-1)]||A.p1||'';if(!src)return;
  if(!pi){pi=document.createElement('img');pi.id='rv24p';pi.alt='';const h=document.getElementById('ovtitle')||ov.firstElementChild;if(h&&h.parentNode)h.parentNode.insertBefore(pi,h);else ov.appendChild(pi);}
  if(pi.getAttribute('src')!==src)pi.src=src;pi.hidden=false;}catch{}}
 setInterval(()=>{if(fxOn())revive24();},200);
 function hookVFXB(){try{if(typeof VisualFX==='undefined'||VisualFX.__v24b)return;const od=VisualFX.draw;VisualFX.draw=function(){const r=od.apply(this,arguments);try{drawB();}catch{}return r;};VisualFX.__v24b=1;}catch{}}
 // ================= C) V2.4-A2 · ĐẠN 6 BẬC · CHỮ KÝ BẠO TẨU 13 TÀU · SÂN KHẤU ĐỒ GIÁM (chỉ hình) =================
 const a2On=()=>window.V24A2!==false;
 const TK=['thuong','luc','lam','tim','tim5','ss'],TL=['THƯỜNG','LỤC','LAM','TÍM','TÍM+5','SS · MAX'];
 function tierIdx(id){let k='tim';try{k=(window.Dan299&&Dan299.tierOf(id))||'tim';}catch{}const i=TK.indexOf(k);return i<0?3:i;}
 const grp=ti=>ti<=1?0:ti<=3?1:2;                       // bậc 1–2 · 3–4 · 5–6
 const GK=[{w:7,h:20,a:.55},{w:9.2,h:25,a:.78},{w:11,h:30,a:.95}];   // +31 % / +57 % bề dày so với nhóm đầu
 function pcol(id){try{const c=Fighters28.profiles[id].color;if(c&&c[0]==='#')return c.slice(0,7);}catch{}return '#9be8ff';}
 function bulSpr(col){return sprite('u'+col,24,64,(g,w,h)=>{g.globalCompositeOperation='lighter';const r=g.createRadialGradient(12,32,1,12,32,12);r.addColorStop(0,col);r.addColorStop(1,'rgba(0,0,0,0)');g.save();g.scale(1,2.6);g.translate(0,-32*(1-1/2.6));g.fillStyle=r;g.fillRect(0,0,24,64);g.restore();
  const c=g.createRadialGradient(12,30,0,12,30,6);c.addColorStop(0,'rgba(255,255,255,1)');c.addColorStop(1,'rgba(255,255,255,0)');g.save();g.scale(1,2.2);g.translate(0,-30*(1-1/2.2));g.fillStyle=c;g.fillRect(0,0,24,64);g.restore();});}
 function trSpr(col){return sprite('v'+col,10,64,(g,w,h)=>{const l=g.createLinearGradient(0,0,0,h);l.addColorStop(0,'rgba(255,255,255,.95)');l.addColorStop(.3,col);l.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=l;g.beginPath();g.moveTo(1,0);g.lineTo(9,0);g.lineTo(5,h);g.closePath();g.fill();});}
 function flashSpr(col){return sprite('m'+col,64,64,(g)=>{g.translate(32,32);g.globalCompositeOperation='lighter';const r=g.createRadialGradient(0,0,0,0,0,30);r.addColorStop(0,'rgba(255,255,255,1)');r.addColorStop(.3,col);r.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=r;g.fillRect(-32,-32,64,64);
  g.fillStyle='rgba(255,255,255,.9)';for(let k=0;k<4;k++){g.rotate(Math.PI/2);g.beginPath();g.moveTo(0,-30);g.lineTo(2.4,0);g.lineTo(-2.4,0);g.closePath();g.fill();}});}
 // đạn chính theo bậc: lớp phủ cộng sáng trên viên đạn thật (vị trí / va chạm giữ nguyên)
 function tierShots(g,id,list,t,nose,tiO){const ti=tiO!=null?tiO:tierIdx(id),G=grp(ti),k=GK[G],col=pcol(id),bs=bulSpr(col),ts=trSpr(col);g.save();g.globalCompositeOperation='lighter';
  for(const s of list){const ang=Math.atan2(s.vx||0,-(s.vy||-1));g.save();g.translate(s.x,s.y);if(ang)g.rotate(ang);
   if(G===2){g.globalAlpha=.75;g.drawImage(ts,-k.w*.35,k.h*.25,k.w*.7,k.h*1.5);}
   g.globalAlpha=k.a;g.drawImage(bs,-k.w,-k.h/2,k.w*2,k.h);g.restore();}
  if(G>=1&&nose&&list.some(s=>Math.abs(s.y-nose.y)<64&&Math.abs(s.x-nose.x)<46)){const R=(G===2?20:14)*(.85+.3*Math.random());g.globalAlpha=G===2?.95:.6;g.drawImage(flashSpr(col),nose.x-R,nose.y-R*1.1,R*2,R*2);}
  g.restore();}
 // ---------- chữ ký Bạo Tẩu ----------
 const EM=[];for(let i=0;i<36;i++)EM.push({on:0});let emi=0;
 function emit(x,y,vx,vy,l,c,s){const p=EM[emi=(emi+1)%EM.length];p.on=1;p.x=x;p.y=y;p.vx=vx;p.vy=vy;p.l=l;p.t=0;p.c=c;p.s=s;}
 function arcSpr(c1,c2){return sprite('a'+c1+c2,96,96,(g)=>{g.translate(48,52);g.lineCap='round';for(const [w,c,a] of [[14,c1,.35],[8,c1,.8],[3.5,c2,1]]){g.globalAlpha=a;g.strokeStyle=c;g.lineWidth=w;g.beginPath();g.arc(0,18,40,-Math.PI*.86,-Math.PI*.14);g.stroke();}});}
 function gridSpr(col){return sprite('q'+col,160,160,(g)=>{g.strokeStyle=col;g.lineWidth=1;g.globalAlpha=.55;for(let k=0;k<=160;k+=20){g.beginPath();g.moveTo(k,0);g.lineTo(k,160);g.moveTo(0,k);g.lineTo(160,k);g.stroke();}
  const m=g.createRadialGradient(80,80,10,80,80,80);m.addColorStop(0,'rgba(0,0,0,0)');m.addColorStop(1,'rgba(0,0,0,1)');g.globalCompositeOperation='destination-out';g.globalAlpha=1;g.fillStyle=m;g.fillRect(0,0,160,160);});}
 function clockSpr(col){return sprite('k'+col,160,160,(g)=>{g.translate(80,80);g.strokeStyle=col;g.lineWidth=1.4;g.globalAlpha=.85;g.beginPath();g.arc(0,0,70,0,TAU);g.stroke();g.lineWidth=1;g.globalAlpha=.5;g.beginPath();g.arc(0,0,58,0,TAU);g.stroke();
  for(let k=0;k<60;k++){const a=k*TAU/60,l=k%5?4:10;g.globalAlpha=k%5?.5:.95;g.beginPath();g.moveTo(Math.cos(a)*(70-l),Math.sin(a)*(70-l));g.lineTo(Math.cos(a)*70,Math.sin(a)*70);g.stroke();}
  g.globalAlpha=.9;g.lineWidth=2;g.beginPath();g.moveTo(0,0);g.lineTo(0,-50);g.moveTo(0,0);g.lineTo(32,0);g.stroke();});}
 function swirlSpr(col){return sprite('w'+col,160,160,(g)=>{g.translate(80,80);g.lineCap='round';for(let a=0;a<3;a++){g.rotate(TAU/3);for(let k=0;k<26;k++){const u=k/26,r=12+60*u;g.globalAlpha=(1-u)*.8;g.strokeStyle=col;g.lineWidth=5*(1-u)+1;g.beginPath();g.arc(0,0,r,u*3,u*3+.35);g.stroke();}}});}
 function fanSpr(col){return sprite('f'+col,160,200,(g,w,h)=>{const l=g.createLinearGradient(0,h,0,0);l.addColorStop(0,'rgba(255,255,255,.55)');l.addColorStop(.25,col);l.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=l;g.globalAlpha=.55;g.beginPath();g.moveTo(w/2,h);g.lineTo(0,0);g.lineTo(w,0);g.closePath();g.fill();});}
 const ghost={hist:[],im:{},bake:{}};
 function shipSrc(id,ti){try{const S=SHIP118[String(id)];return S[TK[ti]]||S.tim||S.thuong||Object.values(S)[0];}catch{return '';}}
 function shipImg(id,ti){const src=shipSrc(id,ti);if(!src)return null;let i=ghost.im[src];if(!i){i=new Image();i.src=src;ghost.im[src]=i;}return i.complete&&i.naturalWidth?i:null;}
 function ghostImg(id,ti){const k=id+'|'+ti;if(ghost.bake[k])return ghost.bake[k];const im=shipImg(id,ti);if(!im)return null;
  return ghost.bake[k]=sprite('h'+k,160,160,(g)=>{const s=Math.min(160/im.naturalWidth,160/im.naturalHeight);const w=im.naturalWidth*s,h=im.naturalHeight*s;g.drawImage(im,80-w/2,80-h/2,w,h);g.globalCompositeOperation='source-atop';g.fillStyle='rgba(108,200,255,.62)';g.fillRect(0,0,160,160);});}
 // P = {x,y,t,shots,enemies,pods,W,H,stage,S}
 function sig(g,id,P){const t=P.t,x=P.x,y=P.y,S=P.S||110,col=pcol(id),cfg=WING_CONFIG_BY_ID.ship[id]||{},wc=cfg.podColor||col;g.save();g.globalCompositeOperation='lighter';
  switch(id){
   case 0:{for(const sd of [-1,1])if(Math.random()<.6)emit(x+sd*S*(.55+Math.random()*.35),y+S*.05,sd*20,90+Math.random()*60,.5+Math.random()*.3,Math.random()<.5?'#ffb347':'#ff6a1f',2+Math.random()*2.5);break;}
   case 1:{const R=24+3*Math.sin(t*9);g.globalAlpha=.85;g.save();g.translate(x,y-S*.62);g.rotate(t*2.6);g.scale(1,.55);g.drawImage(ringSpr(col),-R,-R,R*2,R*2);g.restore();g.save();g.translate(x,y-S*.62);g.rotate(-t*3.4);g.scale(1,.45);g.globalAlpha=.6;g.drawImage(ringSpr('#ffffff'),-R*.7,-R*.7,R*1.4,R*1.4);g.restore();break;}
   case 2:{if(Math.random()<.7)for(const sd of [-1,1])emit(x+sd*S*(.4+Math.random()*.6),y+S*(.05+Math.random()*.2),sd*15,120+Math.random()*80,.45,Math.random()<.5?'#bdefff':'#67d7ff',2+Math.random()*2);break;}
   case 3:{const ts=trSpr(col),top=0,len=Math.max(0,y-S*.5-top);g.globalAlpha=.8;for(const dx of [-15,-5,5,15]){g.save();g.translate(x+dx,y-S*.5);g.scale(1,-1);g.drawImage(ts,-2.5,0,5,len);g.restore();}break;}
   case 4:{const f=fanSpr(col),w=(P.W||480)*.6,h=Math.max(60,y-S*.4);g.globalAlpha=.6+.15*Math.sin(t*8);g.drawImage(f,x-w/2,y-S*.4-h,w,h);const R=20+4*Math.sin(t*14);g.globalAlpha=.95;g.drawImage(starSpr(col),x-R,y-S*.6-R,R*2,R*2);break;}
   case 5:{const gs=gridSpr(col),R=S*1.25;g.globalAlpha=.35+.1*Math.sin(t*3);g.drawImage(gs,x-R,y-R,R*2,R*2);const E=(P.enemies||[]).filter(e=>!e.dead&&e.y>0).sort((a,b)=>Math.hypot(a.x-x,a.y-y)-Math.hypot(b.x-x,b.y-y)).slice(0,3);
     g.strokeStyle=col;g.lineWidth=1.2;for(const e of E){g.globalAlpha=.7;g.beginPath();g.moveTo(x,y-S*.4);g.lineTo(e.x,e.y);g.stroke();g.globalAlpha=.9;g.drawImage(ringSpr(col),e.x-14,e.y-14,28,28);}break;}
   case 6:{const as=arcSpr('#9c7bff','#fff4c2');for(const s of P.shots){const a=Math.atan2(s.vx||0,-(s.vy||-1));g.save();g.translate(s.x,s.y);g.rotate(a);g.globalAlpha=.8;g.drawImage(as,-42,-40,84,84);g.restore();}break;}
   case 7:{const bs=beamSpr('#ff9f45'),w=120+18*Math.sin(t*TAU*4),y0=y-S*.4;g.globalAlpha=.5;g.drawImage(bs,x-w/2,0,w,Math.max(0,y0));g.globalAlpha=.9;g.drawImage(bs,x-w*.2,0,w*.4,Math.max(0,y0));const u=(t*1.6)%1,R=30+90*u;g.globalAlpha=.5*(1-u);g.drawImage(ringSpr('#ffb347'),x-R,y-S*.6-R,R*2,R*2);break;}
   case 8:{const ti=P.ti!=null?P.ti:tierIdx(8),gi=ghostImg(8,ti);if(gi){const h=ghost.hist,lag=h.length>5?h[5]:[x,y],R=S*.62;g.globalCompositeOperation='source-over';g.globalAlpha=.42;for(const sd of [-1,1])g.drawImage(gi,lag[0]+sd*S*.62-R,lag[1]+S*.08-R,R*2,R*2);}break;}
   case 9:{for(const q of (P.pods||[])){if(!q||!Number.isFinite(q.x))continue;const R=24+3*Math.sin(t*6+q.x);g.globalAlpha=.85;g.save();g.translate(q.x,q.y+6);g.scale(1,.45);g.drawImage(ringSpr('#5be35b'),-R,-R,R*2,R*2);g.restore();}break;}
   case 10:{const sw=swirlSpr(col),R=S*.95;g.save();g.translate(x,y);g.rotate(-t*2.2);g.globalAlpha=.75;g.drawImage(sw,-R,-R,R*2,R*2);g.restore();const gl=glowSpr(col);for(const s of P.shots){g.globalAlpha=.6;g.drawImage(gl,s.x-18,s.y-18,36,36);}break;}
   case 11:{const ck=clockSpr(col),R=S*.9;g.save();g.translate(x,y+S*.05);g.rotate(t*.35);g.globalAlpha=.7;g.drawImage(ck,-R,-R,R*2,R*2);g.restore();const ts=trSpr(col);for(const s of P.shots){g.globalAlpha=.7;g.save();g.translate(s.x,s.y);g.rotate(t*9);g.drawImage(ts,-3,0,6,22);g.restore();}break;}
   case 12:{const y0=y-S*.5;g.lineWidth=3.2;for(const [c,ph] of [['#ffd36a',0],['#c084fc',Math.PI]]){g.strokeStyle=c;g.globalAlpha=.85;g.beginPath();for(let yy=y0,k=0;yy>0;yy-=14,k++){const xx=x+Math.sin(k*.42-t*7+ph)*26;k?g.lineTo(xx,yy):g.moveTo(xx,yy);}g.stroke();}break;}
  }
  // hạt (lửa tàn #1, mảnh băng #3)
  const dt=P.dt||.016;for(const p of EM){if(!p.on)continue;p.t+=dt;if(p.t>=p.l){p.on=0;continue;}p.x+=p.vx*dt;p.y+=p.vy*dt;g.globalAlpha=1-p.t/p.l;const sp=id===2?starSpr(p.c):glowSpr(p.c);g.drawImage(sp,p.x-p.s*2,p.y-p.s*2,p.s*4,p.s*4);}
  g.restore();}
 window.V24SIG=sig;
 // bề dày hình đạn chính theo bậc (dan307 nhân vào bề ngang sprite; sát thương / vùng trúng giữ nguyên): mảnh → dày +31 % → +57 %
 const TW=[.72,.95,1.13];window.V24TW=(s,wd)=>{if(!a2On()||wd)return 1;let id=0;try{id=Number.isInteger(s.art28)?s.art28:selected;}catch{}if(window.V24DGTI!=null)return TW[grp(window.V24DGTI)];return TW[grp(tierIdx(id))]*(s.bt307?1.08:1);};
 function mainShots(){const L=[];try{for(const s of shots){if(s.dead||s.gearKind||s.gearItem||s.ally||s.escort40||s.type==='drone'||s.drone309)continue;L.push(s);}}catch{}return L;}
 let lastT=0;
 function drawC(){if(!a2On())return;let pl=false;try{pl=mode==='play'||mode==='pause';}catch{}if(!pl)return;let rob=false;try{rob=!!activeRobot;}catch{}if(rob)return;
  let id=0;try{id=selected;if(typeof launchCraft==='number')id=launchCraft;}catch{}const t=nowS(),dt=Math.min(.05,lastT?t-lastT:.016);lastT=t;const L=mainShots();
  try{ghost.hist.unshift([player.x,player.y]);if(ghost.hist.length>8)ghost.hist.length=8;}catch{}
  tierShots(ctx,id,L,t,{x:player.x,y:player.y-46});
  if(superLeft()>0){let pods=[];try{pods=Battle28.support()||[];}catch{}sig(ctx,id,{x:player.x,y:player.y,t,dt,shots:L,enemies:typeof enemies!=='undefined'?enemies:[],pods,W,H,S:110});}}
 function hookVFXC(){try{if(typeof VisualFX==='undefined'||VisualFX.__v24c)return;const od=VisualFX.draw;VisualFX.draw=function(){const r=od.apply(this,arguments);try{drawC();}catch{}return r;};VisualFX.__v24c=1;}catch{}}
 // ---------- dựng sẵn toàn bộ sprite NGOÀI trận (0 canvas mới trong trận) ----------
 function prewarm(){try{if(mode==='play')return false;}catch{}const cols=new Set(['#ffffff','#fff1b0','#7fe8ff','#ff4a6a','#ffb347','#ff6a1f','#bdefff','#67d7ff','#5be35b','#ff9f45','#9c7bff','#ffd36a','#c084fc']);
  for(let i=0;i<13;i++){cols.add(pcol(i));const c=WING_CONFIG_BY_ID.ship[i];if(c)cols.add(c.podColor);}for(let i=0;i<7;i++){const c=WING_CONFIG_BY_ID.robot[i];if(c)cols.add(c.podColor);}
  for(const c of cols){starSpr(c);ringSpr(c);glowSpr(c);beamSpr(c);bulSpr(c);trSpr(c);flashSpr(c);}
  for(let i=0;i<13;i++){const c=pcol(i);gridSpr(c);clockSpr(c);swirlSpr(c);fanSpr(c);}arcSpr('#9c7bff','#fff4c2');coreSpr();txtSpr();
  for(const k in POPDEF){const d=POPDEF[k];txt(k,d[0],d[1],d[2],d[3]);}txt('win','CHIẾN THẮNG','#fff3b0','#ffb000',46);
  for(let ti=0;ti<6;ti++)ghostImg(8,ti);
  const fake={save(){},restore(){},drawImage(){},set globalAlpha(v){}};for(const [tx,c] of [['⚠ BÃO THIÊN THẠCH · BẮN VỠ ĐỂ NHẶT SAO','#fb923c'],['⚠ BÃO ĐIỆN TỪ · BẠO TẨU NẠP +25%','#38bdf8'],['⚠ TRƯỜNG TRỌNG LỰC · VẬT PHẨM TRÔI','#a78bfa']])try{V24TXT24(fake,tx,c,0,0,1);}catch{}
  return true;}
 setTimeout(function pw(){if(!prewarm())setTimeout(pw,3000);},2500);setInterval(()=>{try{if(mode!=='play')prewarm();}catch{}},20000);
 // ================= D) SÂN KHẤU ĐỒ GIÁM (Bách khoa · thẻ chiến cơ) =================
 const DG={on:false,raf:0,id:-1,ti:0,bt:false,c:null,b:[],sh:0,ws:{on:false,t0:-9,t1:-9,fold:false},lt:0,l30:0,tog:-9};
 const dgOn=()=>a2On()&&window.DG24!==false;
 function openKS(w,isOn){const t=nowS();if(isOn&&!w.on){w.on=true;w.t0=t;w.fold=false;}if(!isOn&&w.on){w.on=false;w.t1=t;w.fold=true;}
  if(w.on){const u=Math.min(1,(t-w.t0)/.22);return u<1?Math.max(0,back(u)):1;}if(w.fold){const u=(t-w.t1)/.18;if(u>=1){w.fold=false;return 0;}return 1-u*u;}return 0;}
 const SRC=['Có sẵn từ đầu','Thưởng ải 20 · Rương Chiến Cơ','Thưởng ải 40 · Rương Chiến Cơ','Thưởng ải 60 · Rương Chiến Cơ','Thưởng ải 80 · Rương Chiến Cơ','Thưởng ải 100 · Rương Chiến Cơ (nhóm S)','Thưởng ải 120 · Rương Chiến Cơ (nhóm S)','Thưởng ải 140 · Rương Chiến Cơ (nhóm SS)','Thưởng ải 160 · Rương Chiến Cơ (nhóm SS)','Thưởng ải 160 (hoàn tất chiến dịch) · Rương Chiến Cơ (nhóm SS)','Rương Chiến Cơ / Rương Boss · nhóm APEX','Rương Chiến Cơ / Rương Boss · nhóm APEX','Rương Chiến Cơ / Rương Boss · nhóm APEX'];
 const NV=[0,1,2,6,11,11];
 function atkK(ti){try{const T=TIER70,n=NV[ti],cap=T.cap[n];return {k:(1+(cap-1)*.006*T.lk)*(1+n*T.tm),cap};}catch{return null;}}
 function owned(id){try{return Progress.getState().crafts?.includes(id)||Campaign36.getState().crafts.includes(id);}catch{return false;}}
 function dgInfo(){const box=DG.box;if(!box)return;const inf=box.querySelector('.dg24inf');if(!inf)return;const a=atkK(DG.ti);
  inf.innerHTML='<b>'+TL[DG.ti]+'</b> · '+(a?'Hệ số Công tối đa <b>×'+a.k.toFixed(2).replace('.',',')+'</b> (Lv '+a.cap+')':'')+(DG.ti===5?' + thần hóa':'')+'<br><span>Nguồn: '+(SRC[DG.id]||'—')+'</span>';
  box.querySelectorAll('[data-dt]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.dt===DG.ti)));box.querySelectorAll('[data-dg]').forEach(b=>b.setAttribute('aria-pressed',String((b.dataset.dg==='b')===DG.bt)));}
 function dgFrame(){const c=DG.c,box=DG.box;const vis=c&&c.isConnected&&box&&!box.closest('[hidden]')&&!!c.offsetParent;let pl=false;try{pl=mode==='play';}catch{}
  if(!vis||pl||document.hidden){DG.raf=0;DG.on=false;return;}DG.raf=requestAnimationFrame(dgFrame);const n=performance.now();if(n-DG.l30<31)return;DG.l30=n;
  const W=c.clientWidth,H=c.clientHeight;if(!W||!H)return;const dpr=Math.min(1.5,window.devicePixelRatio||1);if(c.width!==Math.round(W*dpr)||c.height!==Math.round(H*dpr)){c.width=Math.round(W*dpr);c.height=Math.round(H*dpr);}
  const g=c.getContext('2d');g.setTransform(dpr,0,0,dpr,0,0);const t=nowS(),dt=Math.min(.05,DG.lt?t-DG.lt:.016);DG.lt=t;const id=DG.id,ti=DG.ti,x=W/2,y=H*.68,S=Math.min(W*.34,H*.4);
  // nền lưới radar
  g.fillStyle='#081C44';g.fillRect(0,0,W,H);g.strokeStyle='#38e4ff';g.lineWidth=1;for(let k=1;k<=4;k++){g.globalAlpha=.16+.05*(k===2);g.beginPath();g.arc(x,y,S*.55*k,0,TAU);g.stroke();}
  g.globalAlpha=.22;g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.moveTo(x,0);g.lineTo(x,H);g.stroke();
  const sa=t*1.2%TAU;g.globalAlpha=.28;g.beginPath();g.moveTo(x,y);g.lineTo(x+Math.cos(sa)*W,y+Math.sin(sa)*W);g.stroke();g.globalAlpha=1;
  // đạn theo bậc (giả lập trên sân khấu)
  DG.sh-=dt;if(DG.sh<=0){DG.sh=.12;const sp=id===4?[-.35,-.17,0,.17,.35]:id===3?[0]:[-.08,.08];for(const a of sp)DG.b.push({x:x+a*30,y:y-S*.45,vx:Math.sin(a)*700,vy:-Math.cos(a)*700});}
  for(const b of DG.b){b.x+=b.vx*dt;b.y+=b.vy*dt;}DG.b=DG.b.filter(b=>b.y>-30&&b.x>-30&&b.x<W+30);if(DG.b.length>30)DG.b.splice(0,DG.b.length-30);
  const k=openKS(DG.ws,DG.bt),cfg=WING_CONFIG_BY_ID.ship[id]||{},wc=cfg.podColor||'#7fe8ff';
  if(DG.bt&&id!==7){const bs=beamSpr(wc),w=(46+8*Math.sin(t*TAU*5))*(id===1?1.8:1);g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.5;g.drawImage(bs,x-w/2,0,w,y-S*.4);g.globalAlpha=.85;g.drawImage(bs,x-w*.22,0,w*.44,y-S*.4);g.restore();}
  tierShots(g,id,DG.b,t,{x,y:y-S*.45},ti);
  // cánh (sau thân) + thân + tàu con
  if(k>0){g.save();g.translate(x,y);const cf=Object.assign({},cfg,{len:cfg.len*(id===2?1.25:1)});drawPair(g,cf,S*.98,k,t);g.restore();}
  const pods=[{x:x-S*.62,y:y+S*.1},{x:x+S*.62,y:y+S*.1}];
  for(const q of pods){if(k>0){g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.55*k;const R=S*.28;g.drawImage(glowSpr(wc),q.x-R,q.y-R,R*2,R*2);g.restore();}g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.9;g.drawImage(coreSpr(),q.x-6,q.y-6,12,12);g.restore();}
  const im=shipImg(id,ti);if(im){const r=im.naturalWidth/im.naturalHeight,w=r>=1?S:S*r,h=r>=1?S/r:S;g.drawImage(im,x-w/2,y-h/2,w,h);}
  if(DG.bt){const P={x,y,t,dt,shots:DG.b,enemies:[{x:W*.26,y:H*.18},{x:W*.74,y:H*.24}],pods,W,H,S:S*.95,stage:true,ti};try{sig(g,id,P);}catch{}}
  // vòng xung + chữ khi bật Bạo Tẩu
  const u=(t-DG.tog)/.9;if(u>=0&&u<1){g.save();g.globalCompositeOperation='lighter';const R=20+S*1.2*Math.min(1,u*3.6);g.globalAlpha=Math.max(0,.9*(1-u*3.6));g.drawImage(ringSpr(wc),x-R,y-R,R*2,R*2);g.restore();
   const im2=txtSpr(),sc=u<.18?.6+.55*Math.sin(u/.18*Math.PI/2):1.15-.15*Math.min(1,(u-.18)/.3);g.globalAlpha=u<.7?1:1-(u-.7)/.3;const w=im2.width*.5*sc,h=im2.height*.5*sc;g.drawImage(im2,x-w/2,H*.14-h/2,w,h);g.globalAlpha=1;}
  g.globalCompositeOperation='source-over';g.globalAlpha=1;}
 function dgMount(){if(!dgOn())return;let box=null;try{box=document.querySelector('.m63.cx7:not([hidden]) .cx7-big');}catch{}if(!box){return;}
  const sel=((document.querySelector('.m63.cx7 .cx7-c.sel')||{}).dataset||{}).cx7||'';
  if(sel[0]!=='s'){box.classList.remove('dg24on');try{box.parentElement.classList.remove('dg24p');}catch{}const d=box.querySelector('.dg24');if(d)d.remove();return;}
  const id=+sel.slice(1);let d=box.querySelector('.dg24');
  if(!d){d=document.createElement('div');d.className='dg24';d.innerHTML='<canvas class="dg24c"></canvas><div class="dg24ctl"><div class="dg24seg"><button type="button" data-dg="n">THƯỜNG</button><button type="button" data-dg="b">BẠO TẨU</button></div><div class="dg24tier">'+TL.map((l,i)=>'<button type="button" data-dt="'+i+'">'+(i===5?'MAX':l)+'</button>').join('')+'</div><p class="dg24inf"></p></div>';
   box.appendChild(d);box.classList.add('dg24on');DG.id=-1;
   d.addEventListener('click',e=>{const a=e.target.closest('[data-dg]'),b=e.target.closest('[data-dt]');if(a){e.stopPropagation();const nb=a.dataset.dg==='b';if(nb&&!DG.bt)DG.tog=nowS();DG.bt=nb;dgInfo();}if(b){e.stopPropagation();DG.ti=+b.dataset.dt;dgInfo();}});}
  DG.box=box;DG.c=d.querySelector('canvas');try{box.parentElement.classList.add('dg24p');}catch{}
  if(DG.id!==id){DG.id=id;DG.ti=owned(id)?tierIdx(id):5;DG.bt=false;DG.b=[];DG.ws={on:false,t0:-9,t1:-9,fold:false};dgInfo();}
  if(!DG.raf){DG.on=true;DG.raf=requestAnimationFrame(dgFrame);}}
 setInterval(()=>{try{dgMount();}catch(e){}},300);
 window.V24DG=DG;
 function hookAll(){hookWing();feedRW();hookVFX();hookHit();hookFinish();hookVFXB();hookCollect();hookTop();hookVFXC();}
 try{document.documentElement.classList.add('v24');}catch{}
 function portrait24(){try{const st=document.getElementById('st80');if(!st||st.hidden)return;const im=st.querySelector('img');if(!im||(im.getAttribute('src')&&im.style.display!=='none'))return;if(st.querySelector('.boss'))return;
  const A=typeof PILOT_ASSETS!=='undefined'?PILOT_ASSETS:{};let id=0;try{id=(Pilot67.state().team||[])[0]||0;}catch{}const src=A['p'+id]||A['p'+(id-1)]||A.p1||'';if(src){im.src=src;im.style.display='';}}catch{}}
 setInterval(()=>{if(fxOn())portrait24();},250);
 hookAll();setInterval(hookAll,700);
 window.V24S={cfg:WING_CONFIG_BY_ID,st,openK,CH,pop};
})();
