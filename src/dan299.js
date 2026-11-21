// V299 · Đạn mới theo tranh Gemini (trắng/xám) + tô màu theo bậc + 3 lớp sáng + đuôi + hiệu ứng trúng đích.
// Học cách làm từ video gốc (docs_claude/tham_chieu/PHAN_TICH_DAN_VIDEO_GOC_V299.md): đạn to, lõi trắng, quầng màu bão hòa, đuôi dài.
// Chỉ đổi HÌNH ẢNH; sát thương, đường bay, hộp va chạm giữ nguyên. Tắt: window.DAN299=false
(function(){
  const IMG={},CACHE={};
  function load(k,src,n){const im=new Image();im.src=src;IMG[k]={im,n};}
  const D=window.DAN299_IMG||{};for(const k in D)load(k,D[k][0],D[k][1]);
  // màu theo bậc; bậc Tím theo màu riêng tàu (id 0-based)
  const TIM={0:'#ff9a3d'};
  const TIER={thuong:'#dfe8f6',luc:'#5dff8a',lam:'#4aa8ff',tim5:'#ff6fd8',ss:'#ffd24a'};
  const TC={};let tcT=0;
  function tierOf(id){const now=performance.now();if(now-tcT>500){for(const k in TC)delete TC[k];tcT=now;}
    if(TC[id])return TC[id];let t='tim';try{t=ART118S.form(id,V70.ve('c',id))||'tim';}catch{}return TC[id]=t;}
  function colorOf(id){const t=tierOf(id);return t==='tim'?(TIM[id]||'#c084fc'):TIER[t]||'#ffffff';}
  // khung tranh đã tô màu (nhân màu lên tranh trắng/xám, giữ alpha)
  function frame(k,f,col){const key=k+'|'+f+'|'+col;if(CACHE[key])return CACHE[key];const o=IMG[k];if(!o||!o.im.complete||!o.im.naturalWidth)return null;
    const w=o.im.naturalWidth/o.n,h=o.im.naturalHeight,c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');
    g.drawImage(o.im,f*w,0,w,h,0,0,w,h);g.globalCompositeOperation='multiply';g.fillStyle=col;g.fillRect(0,0,w,h);
    g.globalCompositeOperation='destination-in';g.drawImage(o.im,f*w,0,w,h,0,0,w,h);return CACHE[key]=c;}
  function raw(k,f){const key=k+'|'+f+'|raw';if(CACHE[key])return CACHE[key];const o=IMG[k];if(!o||!o.im.complete||!o.im.naturalWidth)return null;
    const w=o.im.naturalWidth/o.n,h=o.im.naturalHeight,c=document.createElement('canvas');c.width=w;c.height=h;c.getContext('2d').drawImage(o.im,f*w,0,w,h,0,0,w,h);return CACHE[key]=c;}
  const glow=(()=>{const c=document.createElement('canvas');c.width=c.height=64;const g=c.getContext('2d'),r=g.createRadialGradient(32,32,0,32,32,32);
    r.addColorStop(0,'rgba(255,255,255,1)');r.addColorStop(.35,'rgba(255,255,255,.45)');r.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=r;g.fillRect(0,0,64,64);return c;})();
  const GT={};function glowCol(col){if(GT[col])return GT[col];const c=document.createElement('canvas');c.width=c.height=64;const g=c.getContext('2d');g.drawImage(glow,0,0);
    g.globalCompositeOperation='source-in';g.fillStyle=col;g.fillRect(0,0,64,64);return GT[col]=c;}
  let sup=false;
  // V307 A4 (học video gốc: lõi trắng mảnh, quầng màu bão hòa; đo bản cũ: 20–70 % điểm sáng bị cháy trắng, bão hòa 0,07–0,47 so với gốc 0,5–0,8). Chỉ đổi hình. Tắt: window.DAN307=false
  const K7=()=>window.DAN307!==false;
  // V302 · cấu hình đạn 13 tàu (id 0-based). k/kbt: tranh thường / Bạo Tẩu; L: dài (px) ; n: số khung; spin: xoay; mir: lật theo bên; fx: kiểu trúng đích
  const CFG={
    0:{k:'tau1_cau_lua',kbt:'tau1_cau_lua_bt',n:3,L:60,Lbt:62,fx:'hoa'},
    2:{k:'tau3_khoi_bang',f0:0,n:1,L:58,Lbt:58,fx:'bang'},
    3:{k:'tau4_vuot',kbt:'tau4_vuot_bt',n:2,L:68,Lbt:68,mir:1,fx:'set'},
    4:{k:'tau5_quang_tien',n:2,L:44,Lbt:52,fx:'tia'},
    5:{k:'tau6_khoi_pixel',n:3,L:42,Lbt:50,glitch:1,fx:'pixel'},
    6:{k:'tau7_kiem_khi',kbt:'tau7_kiem_khi_bt',n:2,L:78,Lbt:78,fx:'chem'},
    7:{k:'tau8_ten_lua_nhiet',n:2,L:52,Lbt:60,solid:1,fx:'vong'},
    8:{hud:1,L:34,Lbt:42,fx:'ngam'},
    9:{k:'tau10_cau_luc_giac',n:2,L:40,Lbt:30,spin:1.5,dense:1,fx:'lucgiac'},
    10:{k:'tau11_cau_ho_den',n:3,L:44,Lbt:54,spin:-2,fx:'hut'},
    11:{k:'tau12_dia_banh_rang',n:2,L:40,Lbt:48,spin:5,fx:'khac'},
    12:{k:'tau13_luoi_hai',kbt:'tau13_luoi_hai_bt',n:2,L:54,Lbt:66,mir:1,fx:'nut'}};
  Object.assign(TIM,{1:'#3de0a0',2:'#67d7ff',3:'#9be83a',4:'#fbbf24',5:'#14b8a6',6:'#ffe9a8',7:'#f97316',8:'#0ea5e9',9:'#22d3ee',10:'#d946ef',11:'#facc15',12:'#9b6bff'});
  function px(){try{return player.x;}catch{return 240;}}
  function mine(s){try{return s.art28===selected;}catch{return true;}}/* V303: chỉ đạn của chính chiến cơ đang bay (đạn tàu khác / hỗ trợ giữ hình cũ) */
  function hudArrow(g,L,col){g.save();g.globalCompositeOperation='lighter';g.strokeStyle=col;g.lineWidth=2.4;g.lineJoin='round';
    for(const [w,y,a] of [[.42,0,1],[.32,L*.28,.7],[.22,L*.52,.45]]){g.globalAlpha=a;g.beginPath();g.moveTo(-L*w,y+L*.22);g.lineTo(0,y-L*.18);g.lineTo(L*w,y+L*.22);g.stroke();}
    g.globalAlpha=1;g.fillStyle='#fff';g.beginPath();g.arc(0,-L*.18,2.2,0,6.283);g.fill();g.restore();}
  function drawGen(id,g,s){const c=CFG[id],col=colorOf(id),bt=sup,L=((id===2&&s.__manh)?30:(bt?c.Lbt:c.L))*(K7()&&c.dense?.78:1),ang=Math.atan2(s.vy,s.vx)+Math.PI/2,gc=glowCol(col),pul=1+.08*Math.sin((s.age||0)*28);
    if(c.hud){g.save();g.translate(s.x,s.y);g.rotate(ang);g.globalCompositeOperation='lighter';g.globalAlpha=bt?.16:.32;g.drawImage(gc,-L*.6,-L*.5,L*1.2,L*1.2);g.globalAlpha=bt?.08:.2;g.drawImage(gc,-L*.15,0,L*.3,L*1.6);g.restore();
      g.save();g.translate(s.x,s.y);g.rotate(ang);hudArrow(g,L,col);g.restore();return true;}
    const k=(id===2&&s.__manh)?'tau3_manh_bang':(bt&&c.kbt?c.kbt:c.k),f=(id===2&&s.__manh)?0:c.n>1?Math.floor((s.age||0)*12+((s.x|0)&3))%c.n:(c.f0||0),im=frame(k,f,col),wh=raw(k,f);if(!im)return false;
    const W=L*im.width/im.height;let ox=0;if(c.glitch&&Math.random()<.18)ox=(Math.random()<.5?-1:1)*L*.18;
    g.save();g.translate(s.x+ox,s.y);g.rotate(ang+(c.spin?(s.age||0)*c.spin*6.283:0));if(c.mir&&s.x<px())g.scale(-1,1);
    g.globalCompositeOperation='lighter';g.globalAlpha=(bt?(c.dense?.05:.14):.4)*(K7()?.75:1);g.drawImage(gc,-L*.62*pul,-L*.55*pul,L*1.24*pul,L*1.24*pul);
    if(!c.spin){g.globalAlpha=(bt?.08:.26)*(K7()?.6:1);g.drawImage(gc,-L*.2,-L*.1,L*.4,L*1.4);}
    if(c.solid){g.globalCompositeOperation='source-over';g.globalAlpha=bt?.85:1;g.drawImage(im,-W/2,-L/2,W,L);g.globalCompositeOperation='lighter';g.globalAlpha=bt?.2:.35;g.drawImage(wh,-W/2,-L/2,W,L);}
    else{if(K7()){g.globalCompositeOperation='source-over';g.globalAlpha=bt?(c.dense?.5:.8):.92;g.drawImage(im,-W/2,-L/2,W,L);g.globalCompositeOperation='lighter';g.globalAlpha=bt?.16:.32;g.drawImage(im,-W/2,-L/2,W,L);g.globalAlpha=bt?.08:.2;g.drawImage(wh,-W*.2,-L*.26,W*.4,L*.52);}
     else{g.globalAlpha=bt?(c.dense?.55:.8):1;g.drawImage(im,-W/2,-L/2,W,L);g.globalAlpha=bt?(c.dense?.12:.28):.5;g.drawImage(wh,-W*.36,-L*.36,W*.72,L*.72);}}
    if(c.glitch&&ox){g.globalAlpha=.35;g.drawImage(frame(k,f,'#ff3df0')||im,-W/2-ox*.6,-L/2,W,L);}
    g.restore();return true;}
  // tàu 1 giữ hàm riêng V299 (bố cục tranh cầu lửa lệch tâm)
  function draw0(g,s){const col=colorOf(0),bt=sup,k=bt?'tau1_cau_lua_bt':'tau1_cau_lua',f=Math.floor((s.age||0)*12+((s.x|0)&3))%3;
    const im=frame(k,f,col),wh=raw(k,f);if(!im)return false;
    const L=bt?62:60,W=L*im.width/im.height,ang=Math.atan2(s.vy,s.vx)+Math.PI/2;
    g.save();g.globalCompositeOperation='lighter';g.translate(s.x,s.y);g.rotate(ang);
    const gc=glowCol(col),pul=1+.08*Math.sin((s.age||0)*28);
    const k7=K7();g.globalAlpha=(bt?.14:.42)*(k7?.7:1);g.drawImage(gc,-L*.62*pul,-L*.55*pul,L*1.24*pul,L*1.24*pul);
    g.globalAlpha=(bt?.08:.30)*(k7?.55:1);g.drawImage(gc,-L*.22,-L*.1,L*.44,L*1.5);
    if(k7)g.globalCompositeOperation='source-over';g.globalAlpha=bt?.8:(k7?.92:1);g.drawImage(im,-W/2,-L*.36,W,L);if(k7)g.globalCompositeOperation='lighter';
    g.globalAlpha=(bt?.28:.55)*(k7?.4:1);g.drawImage(wh,-W*(k7?.2:.36),-L*(k7?.2:.30),W*(k7?.4:.72),L*(k7?.44:.72));
    g.restore();return true;}
  const DRAW={0:draw0};for(const id in CFG)if(+id)DRAW[id]=(g,s)=>drawGen(+id,g,s);
  // laser tàu 2 (ray28, art28 1): cột rộng màu bậc, lõi trắng, đầu cột sáng, gợn chạy dọc
  /* V309 Lượt 5: Thời Không Thôn Tinh — tia tím #a855f7 / ngọc #2dd4bf, lõi trắng gắt (tắt window.TK309=false) */
  function tk9(){if(window.TK309===false)return false;try{return !!(activeRobot&&activeRobot.super&&SSSGame.indexFor(activeRobot)===1);}catch{return false;}}
  function laser1(s){const T9=tk9(),g=ctx,col=T9?'#a855f7':colorOf(1),c2=T9?'#2dd4bf':col,y=Math.max(0,s.y),r=Math.max(2,s.r||3),fade=s.life28>0?Math.max(0,Math.min(1,(s.life28-s.age)/.05)):1,w=r*(sup?3.2:4.2)*(K7()?.62:1),gc=glowCol(col),k7=K7();
    g.save();g.globalCompositeOperation='lighter';
    const gr=g.createLinearGradient(s.x-w,0,s.x+w,0);gr.addColorStop(0,col+'00');if(k7){gr.addColorStop(.25,col+'99');gr.addColorStop(.44,c2+'ee');gr.addColorStop(.5,'#ffffff');gr.addColorStop(.56,c2+'ee');gr.addColorStop(.75,col+'99');}else{if(T9){gr.addColorStop(.22,col+'aa');gr.addColorStop(.4,c2+'dd');gr.addColorStop(.5,'#ffffff');gr.addColorStop(.6,c2+'dd');gr.addColorStop(.78,col+'aa');}else{gr.addColorStop(.3,col+'88');gr.addColorStop(.5,'#ffffff');gr.addColorStop(.7,col+'88');}}gr.addColorStop(1,col+'00');
    g.globalAlpha=fade*(sup?.5:.8);g.fillStyle=gr;g.fillRect(s.x-w,0,w*2,y);
    g.globalAlpha=fade*.9;g.fillStyle='#fff';g.fillRect(s.x-(T9?1.5:1),0,T9?3:2,y);
    const t=performance.now()/1000;g.strokeStyle=col;g.lineWidth=1.5;for(let yy=y-((t*600)%60);yy>0;yy-=60){g.globalAlpha=fade*.55*(yy/y);g.beginPath();g.ellipse(s.x,yy,w*.9,3,0,0,6.283);g.stroke();}
    g.globalAlpha=fade*.8;g.drawImage(gc,s.x-w*2,y-w*2,w*4,w*4);g.restore();
    let contact=null;if(s.hit)for(const e of s.hit)if(e&&!e.dead&&e.hp>0&&Number.isFinite(e.y)&&e.y<=s.y&&(!contact||e.y>contact.y))contact=e;
    if(contact){g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.8*fade;g.drawImage(gc,s.x-w*3,contact.y-w*3,w*6,w*6);g.restore();}}
  // hiệu ứng trúng đích: đạn biến mất giữa màn → bung cánh hoa lửa (cung đứt đoạn, không vòng kín)
  const FX=[];let prev=new Map();
  function scan(){if(window.DAN299===false)return;const cur=new Map();try{for(const s of shots){if(s.art28!==undefined&&DRAW[s.art28]&&mine(s))cur.set(s,[s.x,s.y,s.art28]);}}catch{}
    for(const [s,v] of prev){if(!cur.has(s)&&v[1]>12&&v[1]<(typeof H!=='undefined'?H:800)-40&&FX.length<40)FX.push({x:v[0],y:v[1],id:v[2],t:0,col:colorOf(v[2]),r0:Math.random()*6.28});}prev=cur;}
  function drawFx(dt){if(window.DAN299===false||!FX.length)return;const g=ctx;g.save();g.globalCompositeOperation='lighter';
    for(let i=FX.length-1;i>=0;i--){const e=FX[i];e.t+=Math.min(.05,dt||.016);const p=e.t/.28;if(p>=1){FX.splice(i,1);continue;}
      const R=8+30*(1-(1-p)*(1-p)),a=1-p,gc=glowCol(e.col),ty=(CFG[e.id]||{}).fx||'hoa';g.globalAlpha=.6*a;g.drawImage(gc,e.x-R,e.y-R,R*2,R*2);
      g.strokeStyle=e.col;g.fillStyle=e.col;g.lineCap='round';g.lineWidth=2.6*(1-p)+1;
      if(ty==='bang'){const im=frame('tau3_khoi_bang',1,e.col);if(im){g.globalAlpha=a;g.drawImage(im,e.x-R,e.y-R,R*2,R*2);}}
      else if(ty==='chem'){g.globalAlpha=a;for(let k=-1;k<=1;k++){g.beginPath();g.moveTo(e.x-R*.8,e.y+k*7-R*.35);g.lineTo(e.x+R*.8,e.y+k*7+R*.35);g.stroke();}}
      else if(ty==='set'||ty==='nut'){g.globalAlpha=a;for(let k=0;k<4;k++){const an=e.r0+k*1.571;let x=e.x,y=e.y;g.beginPath();g.moveTo(x,y);for(let q=1;q<=4;q++){x=e.x+Math.cos(an)*R*q/4+(Math.random()-.5)*8;y=e.y+Math.sin(an)*R*q/4+(Math.random()-.5)*8;g.lineTo(x,y);}g.stroke();}
        if(ty==='nut'){g.lineWidth=2;g.beginPath();g.moveTo(e.x,e.y-R);g.lineTo(e.x+3,e.y-R*.3);g.lineTo(e.x-3,e.y+R*.3);g.lineTo(e.x,e.y+R);g.stroke();}}
      else if(ty==='pixel'||ty==='lucgiac'){g.globalAlpha=a;for(let k=0;k<7;k++){const an=e.r0+k*.9,d=R*(.3+.7*p),z=ty==='pixel'?5:4;if(ty==='pixel')g.fillRect(e.x+Math.cos(an)*d-z/2,e.y+Math.sin(an)*d-z/2,z,z);else{g.beginPath();for(let q=0;q<6;q++){const b=q*1.047;g.lineTo(e.x+Math.cos(an)*d+Math.cos(b)*z,e.y+Math.sin(an)*d+Math.sin(b)*z);}g.closePath();g.stroke();}}}
      else if(ty==='vong'||ty==='khac'||ty==='ngam'){g.globalAlpha=a;const nseg=ty==='ngam'?4:6;for(let k=0;k<nseg;k++){const a0=e.r0+k*6.283/nseg;g.beginPath();g.arc(e.x,e.y,R,a0,a0+6.283/nseg*.55);g.stroke();}}
      else if(ty==='hut'){g.globalAlpha=a;for(let k=0;k<5;k++){const an=e.r0+k*1.2566+p*3;g.beginPath();g.arc(e.x,e.y,R*(1-p*.7),an,an+.9);g.stroke();}}
      else if(ty==='tia'){g.globalAlpha=a;for(let k=0;k<6;k++){const an=e.r0+k*1.047;g.beginPath();g.moveTo(e.x+Math.cos(an)*R*.2,e.y+Math.sin(an)*R*.2);g.lineTo(e.x+Math.cos(an)*R,e.y+Math.sin(an)*R);g.stroke();}}
      else{for(let k=0;k<5;k++){const an=e.r0+k*1.2566;g.globalAlpha=.9*a;g.beginPath();
        g.moveTo(e.x+Math.cos(an)*R*.35,e.y+Math.sin(an)*R*.35);g.quadraticCurveTo(e.x+Math.cos(an+.35)*R*.8,e.y+Math.sin(an+.35)*R*.8,e.x+Math.cos(an+.15)*R,e.y+Math.sin(an+.15)*R);g.stroke();}}
      g.fillStyle='#fff';g.globalAlpha=a;g.beginPath();g.arc(e.x,e.y,4*(1-p)+1,0,6.283);g.fill();}
    g.restore();}
  function hook(){if(typeof Fighters28==='undefined'||Fighters28.__d299)return false;const od=Fighters28.draw;
    Fighters28.draw=function(g,s){if(window.DAN299!==false&&s&&s.art28!==undefined&&!s.ray28&&DRAW[s.art28]&&mine(s)){try{if(DRAW[s.art28](g,s))return true;}catch{}}return od.apply(this,arguments);};Fighters28.__d299=1;
    if(typeof PlayerFXB!=='undefined'){const ol=PlayerFXB.laser;PlayerFXB.laser=function(s){if(window.DAN299!==false&&s&&s.art28===1&&mine(s)){try{laser1(s);return;}catch{}}return ol.apply(this,arguments);};}
    if(typeof PlayerFXB!=='undefined'){const ob=PlayerFXB.begin;PlayerFXB.begin=function(dt){const r=ob.apply(this,arguments);try{sup=typeof superTime!=='undefined'&&superTime>0;scan();}catch{}return r;};}
    if(typeof VisualFX!=='undefined'){const ov=VisualFX.draw;VisualFX.draw=function(dt){const r=ov.apply(this,arguments);try{drawFx(dt);}catch{}return r;};}
    return true;}
  if(!hook()){const t=setInterval(()=>{if(hook())clearInterval(t);},200);}
  window.Dan299={colorOf,tierOf,FX};
})();
