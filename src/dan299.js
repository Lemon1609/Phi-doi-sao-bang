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
  // tàu 1 (id 0): cầu lửa; Bạo Tẩu: phượng hoàng ôm cầu lửa
  function draw0(g,s){const col=colorOf(0),bt=sup,k=bt?'tau1_cau_lua_bt':'tau1_cau_lua',f=Math.floor((s.age||0)*12+((s.x|0)&3))%3;
    const im=frame(k,f,col),wh=raw(k,f);if(!im)return false;
    const L=bt?62:60,/* V300: thường phóng to ~30% */W=L*im.width/im.height,ang=Math.atan2(s.vy,s.vx)+Math.PI/2;
    g.save();g.globalCompositeOperation='lighter';g.translate(s.x,s.y);g.rotate(ang);
    const gc=glowCol(col),pul=1+.08*Math.sin((s.age||0)*28);
    g.globalAlpha=bt?.14:.42;g.drawImage(gc,-L*.62*pul,-L*.55*pul,L*1.24*pul,L*1.24*pul);           // quầng màu rộng
    g.globalAlpha=bt?.08:.30;g.drawImage(gc,-L*.22,-L*.1,L*.44,L*1.5);                              // đuôi sáng kéo dài phía sau
    g.globalAlpha=bt?.8:1;g.drawImage(im,-W/2,-L*.36,W,L);                                         // tranh tô màu
    g.globalAlpha=bt?.28:.55;g.drawImage(wh,-W*.36,-L*.30,W*.72,L*.72);                             // lõi trắng
    g.restore();return true;}
  const DRAW={0:draw0};
  // hiệu ứng trúng đích: đạn biến mất giữa màn → bung cánh hoa lửa (cung đứt đoạn, không vòng kín)
  const FX=[];let prev=new Map();
  function scan(){if(window.DAN299===false)return;const cur=new Map();try{for(const s of shots){if(s.art28!==undefined&&DRAW[s.art28])cur.set(s,[s.x,s.y,s.art28]);}}catch{}
    for(const [s,v] of prev){if(!cur.has(s)&&v[1]>12&&v[1]<(typeof H!=='undefined'?H:800)-40&&FX.length<40)FX.push({x:v[0],y:v[1],id:v[2],t:0,col:colorOf(v[2]),r0:Math.random()*6.28});}prev=cur;}
  function drawFx(dt){if(window.DAN299===false||!FX.length)return;const g=ctx;g.save();g.globalCompositeOperation='lighter';
    for(let i=FX.length-1;i>=0;i--){const e=FX[i];e.t+=Math.min(.05,dt||.016);const p=e.t/.28;if(p>=1){FX.splice(i,1);continue;}
      const R=8+30*(1-(1-p)*(1-p)),a=1-p,gc=glowCol(e.col);g.globalAlpha=.7*a;g.drawImage(gc,e.x-R,e.y-R,R*2,R*2);
      g.strokeStyle=e.col;g.lineCap='round';for(let k=0;k<5;k++){const an=e.r0+k*1.2566;g.globalAlpha=.9*a;g.lineWidth=3*(1-p)+1;g.beginPath();
        g.moveTo(e.x+Math.cos(an)*R*.35,e.y+Math.sin(an)*R*.35);g.quadraticCurveTo(e.x+Math.cos(an+.35)*R*.8,e.y+Math.sin(an+.35)*R*.8,e.x+Math.cos(an+.15)*R,e.y+Math.sin(an+.15)*R);g.stroke();}
      g.fillStyle='#fff';g.globalAlpha=a;g.beginPath();g.arc(e.x,e.y,4*(1-p)+1,0,6.283);g.fill();}
    g.restore();}
  function hook(){if(typeof Fighters28==='undefined'||Fighters28.__d299)return false;const od=Fighters28.draw;
    Fighters28.draw=function(g,s){if(window.DAN299!==false&&s&&s.art28!==undefined&&!s.ray28&&DRAW[s.art28]){try{if(DRAW[s.art28](g,s))return true;}catch{}}return od.apply(this,arguments);};Fighters28.__d299=1;
    if(typeof PlayerFXB!=='undefined'){const ob=PlayerFXB.begin;PlayerFXB.begin=function(dt){const r=ob.apply(this,arguments);try{sup=typeof superTime!=='undefined'&&superTime>0;scan();}catch{}return r;};}
    if(typeof VisualFX!=='undefined'){const ov=VisualFX.draw;VisualFX.draw=function(dt){const r=ov.apply(this,arguments);try{drawFx(dt);}catch{}return r;};}
    return true;}
  if(!hook()){const t=setInterval(()=>{if(hook())clearInterval(t);},200);}
  window.Dan299={colorOf,tierOf,FX};
})();
