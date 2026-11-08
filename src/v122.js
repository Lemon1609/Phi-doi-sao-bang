// V122 · REVIEW122 (Gemini + Claude duyệt chung) · Nhóm 1 — sửa bằng code
//  B5 laser boss gọn (cảnh báo: 1 vạch tâm 2 px + 2 viền 1 px, rộng 22 px; khi bắn: 28 px, lõi 10 px)
//  B1 cánh S/SS sát vai tàu (±26 px), sáng rực (pha sẵn brightness/saturate, trộn lighter), vỗ nhẹ ±4° · 1,2 s
//  B8 cánh S/SS ở khung trưng bày Phi đội + huy hiệu BẬC S / BẬC SS kim loại
//  Tắt từng phần: window.BEAM122=false · window.WING122=false · window.BADGE122=false
(()=>{
  // ---------- B5 · laser boss ----------
  window.__beam122=function(b,angle,length){if(window.BEAM122===false)return false;const c=ctx,w0=b.width||24,t=typeof time==='number'?time:0,col=(b.color||'#ff1744').slice(0,7);
    c.save();c.translate(b.x,b.y);c.rotate(angle);
    if(b.age<b.warn){const u=b.age/b.warn,last=b.warn-b.age<.25;c.globalCompositeOperation='source-over';
      // 2 viền giới hạn 1 px (tổng 22 px)
      c.globalAlpha=.3;c.strokeStyle='#ff1744';c.lineWidth=1;for(const s of [-1,1]){c.beginPath();c.moveTo(0,s*11);c.lineTo(length,s*11);c.stroke();}
      // vạch tâm nét đứt 2 px; 0,25 s cuối lóe trắng
      c.globalAlpha=last?.95:.7;c.strokeStyle=last?'#ffffff':'#ff1744';c.lineWidth=2;c.setLineDash([10,8]);c.lineDashOffset=-t*60;c.beginPath();c.moveTo(0,0);c.lineTo(length*Math.min(1,.35+u),0);c.stroke();c.setLineDash([]);}
    else{const e=b.age-b.warn,fade=Math.max(0,Math.min(1,e/.05)*Math.min(1,((b.duration||1)-e)/.12));c.globalCompositeOperation='lighter';
      // quầng 2 bên 9 px · alpha .45
      c.globalAlpha=fade*.45;c.fillStyle=col;c.fillRect(0,-14,length,9);c.fillRect(0,5,length,9);
      // lõi 10 px · alpha .9
      c.globalAlpha=fade*.9;c.fillStyle='#fff3f6';c.fillRect(0,-5,length,10);}
    c.restore();return true;};
  // ---------- B1 · cánh S/SS ----------
  const BR=new Map();
  function bright(im,ss){const k=(ss?'ss':'s')+im.src.length;if(BR.has(k))return BR.get(k);const c=document.createElement('canvas');c.width=im.naturalWidth;c.height=im.naturalHeight;const g=c.getContext('2d');
    try{g.filter=ss?'brightness(1.35) saturate(1.25)':'brightness(1.2) saturate(1.15)';}catch{}g.drawImage(im,0,0);try{g.filter='none';}catch{}BR.set(k,c);return c;}
  // vẽ 2 nửa cánh sao cho mép trong nằm ở ±gap quanh (x,y); k = tỉ lệ thu
  window.__wings122=function(g,im,x,y,k,ss,t){const src=bright(im,ss),ph=Math.sin(t*2*Math.PI/1.2),ang=4*Math.PI/180*ph,sx=1+.06*ph,gap=26*k/.42;
    g.save();g.globalCompositeOperation='lighter';
    for(const side of [-1,1]){const ix=side<0?234:534,sx0=side<0?0:384;g.save();g.translate(x+side*gap,y+6*k/.42);g.rotate(side*-ang);g.scale(sx,1);
      const f=src.width/768;g.drawImage(src,sx0*f,0,384*f,512*f,(sx0-ix)*k,-212*k,384*k,512*k);/* tranh có thể đã thu nhỏ khi build *//* gốc cánh (y≈212 trong tranh) ngang vai tàu */g.restore();}
    g.restore();};
  // ---------- B8 · khung trưng bày + huy hiệu ----------
  function gradeOf(id){try{return Workshop.craftGrade(id)||'';}catch{return '';}}
  const IMG={};function art(k){if(typeof SK121_ART==='undefined'||!SK121_ART[k])return null;let im=IMG[k];if(!im){im=new Image();im.src=SK121_ART[k];IMG[k]=im;}return im.complete&&im.naturalWidth?im:null;}
  function hookShow(){try{const S=SuperHangar;if(S.__w122)return;const o=S.draw;S.draw=function(id,g,w,h,t){try{if(window.WING125===true&&g&&g.canvas&&g.canvas.id==='hb-cv'){const gr=gradeOf(id);if(gr){const ss=gr==='SS',im=art(ss?'canh_SS':'canh_S');
        if(im){const doll=!!g.canvas.closest('.hb-doll'),k=(doll?.3:.34)*(ss?1.08:1);g.save();g.globalAlpha=ss?.9:.8;window.__wings122(g,im,w/2,h*(doll?.6:.6),k,ss,typeof t==='number'?t:performance.now()/1000);g.restore();}}}}catch{}return o.apply(this,arguments);};S.__w122=1;}catch{}}
  try{const st=document.createElement('style');st.id='v122-css';st.textContent=
    `#hb-badge.b122-ss{background:linear-gradient(180deg,#713f12,#422006)!important;border:2px solid #f59e0b!important;box-shadow:inset 0 0 0 1px #fde68a88,0 0 10px #f59e0b55!important;color:#fef08a!important;letter-spacing:.06em}`+
    `#hb-badge.b122-s{background:linear-gradient(180deg,#0c4a6e,#082f49)!important;border:2px solid #0284c7!important;box-shadow:inset 0 0 0 1px #bae6fd88!important;color:#e0f2fe!important}`;document.head.appendChild(st);}catch{}
  setInterval(()=>{if(window.BADGE122===false)return;try{const b=document.getElementById('hb-badge');if(!b||!b.offsetParent)return;const t=b.textContent||'';const ss=/BẬC\s*SS/.test(t),s=!ss&&/BẬC\s*S\b/.test(t);b.classList.toggle('b122-ss',ss);b.classList.toggle('b122-s',s);if(ss&&!/★/.test(t))b.textContent='★ BẬC SS ★';}catch{}},500);
  setTimeout(hookShow,0);setTimeout(hookShow,3000);
})();
