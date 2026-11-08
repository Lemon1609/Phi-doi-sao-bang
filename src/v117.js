// V117 · REVIEW117 (Gemini) · chỉ đổi HÌNH VẼ, không đổi số viên / sát thương / va chạm
//  Việc 1: dòng đạn chính thanh thoát (cấp 4 nhỏ + mảnh hơn, kéo dài ít hơn, trong hơn khi có boss; 2 luồng giữa rõ hơn luồng rìa)
//  Việc 2: chớp boss 50 ms / nghỉ 90 ms, sáng 35% khi còn cánh · 55% khi lộ lõi; rung hình boss ±1,5 px (đòn nặng ±4 px)
//  Việc 3: hình nổ của vũ khí phụ ở sát boss nhỏ lại 40% và trong hơn (nguồn lóa chính ở lõi)
//  Tắt: window.SHOT117=false trước khi tải · window.JOLT117=false · window.BFL117=false
(()=>{
  if(window.SHOT117===false)return;
  const WS={plume:[.62,.85],shard:[.62,.85],needle:[.75,.9],petal:[.65,.85],beam:[.68,.68],orb:[.68,.68],crescent:[.72,.78]};
  const ROUND={beam:1,orb:1,crescent:1};
  function bossOn(){try{return mode==='play'&&!!boss&&!boss.dead&&boss.bossHealthReady!==false;}catch{return false;}}
  let bossF=false,bossT=0;
  window.SHOT117={on:true,
    st:k=>ROUND[k]?1.05:1.18,
    l4:sc=>{const m=Math.min(sc,1.5);return (.78+.2*m)/(.75+.5*m);},/* V118: giữ ×1,22 của VIVID — bản V117 làm đạn quá nhỏ */
    ws:k=>WS[k]||null,
    boss:()=>{const t=performance.now();if(t-bossT>100){bossT=t;bossF=bossOn();}return bossF;},
    // độ trong tuyệt đối theo REVIEW117; chia cho hệ số .75 mà vòng vẽ đã áp cho đạn xa tàu
    al:(s,k)=>{if(s.__c117==null){let px=240;try{px=player.x;}catch{}s.__c117=Math.abs(s.x-px)<14?1:0;}
      const t=window.ALPHA122===false?(s.__c117?.68:(k==='plume'||k==='petal'||k==='crescent'?.48:.55)):(s.__c117?.88:.78);/* V122 (REVIEW122 B6) */let far=false;try{far=Math.hypot(s.x-player.x,s.y-player.y)>85;}catch{}return Math.min(1,far&&window.ALPHA115!==false?t/.75:t);}};
  // ---------- Việc 2: chớp + rung boss ----------
  function hitFlashCfg(){try{const F=FX16.feedback.hitFlash;if(window.BFL117===false)return;F.durationMs=50;F.cooldownMs=90;
      const ex=bossOn()&&!(boss.parts||[]).some(p=>!p.dead&&p.hp>0);F.alpha=(ex?.55:.35)/.6;}catch{}}
  setInterval(hitFlashCfg,250);
  let jEnd=0,jx=0,jy=0,jNext=0;
  function jolt(heavy){if(window.JOLT117===false)return;const t=performance.now();if(!heavy&&t<jNext)return;jNext=t+140;
    const A=heavy?4:1.5,B=heavy?3:1;jx=(Math.random()<.5?-1:1)*B;jy=-A;jEnd=t+(heavy?90:40);}
  function hookBoss(){try{const od=damageBoss;if(od.__j117)return;const nb=function(amount,src,part){const pa=part&&!part.dead;const r=od.apply(this,arguments);
      try{if(mode==='play'&&boss&&!boss.dead&&amount>0){const heavy=!!(src&&typeof src==='object'&&(src.type==='missile'||src.type==='rocket28'||src.gearKind==='missiles'||src.skill||src.ult))||(pa&&part.dead);jolt(heavy);}}catch{}return r;};
    nb.__j117=1;window.damageBoss=nb;try{damageBoss=nb;}catch{}}catch{}}
  function hookDraw(){try{const B=Bosses28;if(B.__j117)return;const o=B.drawBoss;B.drawBoss=function(b){const t=performance.now();if(t<jEnd&&b===boss){ctx.save();ctx.translate(jx,jy);try{return o.apply(this,arguments);}finally{ctx.restore();}}return o.apply(this,arguments);};B.__j117=1;}catch{}}
  // vệt sáng đuôi đạn (PlayerFXB.tail): bỏ khi có boss
  function hookTail(){try{const P=PlayerFXB;if(P.__t117)return;const o=P.tail;P.tail=function(s){if(s&&s.art28!=null&&!s.gearKind&&window.SHOT117.boss())return;return o.apply(this,arguments);};P.__t117=1;}catch{}}
  setTimeout(()=>{hookBoss();hookDraw();hookTail();hitFlashCfg();},0);
  window.V117={state:()=>({boss:bossOn(),jolt:performance.now()<jEnd,flash:(()=>{try{return {...FX16.feedback.hitFlash};}catch{return null;}})()})};
})();
// ---------- Nền chương 8 (ải 141–160) · tranh GPT V117 ----------
(()=>{if(window.BG117===false||typeof BG117_ART==='undefined')return;const im=new Image();im.src=BG117_ART.ch8;
  function hook(){try{if(Ch9.__bg117)return;const o=Ch9.bgFor;Ch9.bgFor=function(lv){const r=o.apply(this,arguments);if(r)return r;try{if(gameMode==='campaign'&&lv>=141&&lv<=160&&im.complete&&im.naturalWidth)return im;}catch{}return null;};Ch9.__bg117=1;}catch{}}
  setTimeout(hook,0);})();
// ---------- Việc 4 (REVIEW117): màn quản lý ----------
(()=>{if(window.UI117===false)return;
  try{const st=document.createElement('style');st.id='v117-css';st.textContent=
   // cấp 2 · tab con dưới màn: viền mảnh 1,2 px, bo 6 px, bỏ khung kim loại
   `html body #nav74s#nav74s#nav74s#nav74s .n74s button{background:rgba(10,22,38,.65)!important;border:1.2px solid #4A6B82!important;border-radius:6px!important;border-image:none!important;box-shadow:none!important;clip-path:none!important;font-size:12px!important;color:#C5DCF0!important}`+
   `html body #nav74s#nav74s#nav74s#nav74s .n74s button::before,html body #nav74s#nav74s#nav74s#nav74s .n74s button::after{display:none!important}`+
   `html body #nav74s#nav74s#nav74s#nav74s .n74s button.on{background:#1565C0!important;border-color:#7DB8F0!important;color:#fff!important}`+
   // cấp 3 · thẻ lọc / SKIN / KHOE: viền đơn 1 px, sáng 40%
   `html body .hb-filter button:not([aria-pressed="true"]),html body #sk114 button{border:1px solid rgba(140,190,230,.40)!important;background:rgba(10,22,38,.65)!important;border-image:none!important;box-shadow:none!important}`+
   // Chợ Đen: dòng cuối không bị khung cắt
   `html body .tr67-wrap{padding-bottom:58px!important}`+`#sk114[hidden]{display:none!important}`;
   document.head.appendChild(st);}catch{}
  // chữ nhỏ nhất 12 px · chữ phụ xám → xanh băng #C5DCF0 (chỉ ngoài trận)
  const lum=c=>{const m=c.match(/\d+(\.\d+)?/g);if(!m)return 1;const [r,g,b]=m.map(Number);return (.2126*r+.7152*g+.0722*b)/255;};
  function scan(){try{if(typeof mode!=='undefined'&&(mode==='play'||mode==='pause'))return;}catch{}
    const root=document.body;const it=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n,k=0;const seen=new Set();
    while((n=it.nextNode())&&k<4000){k++;const e=n.parentElement;if(!e||seen.has(e)||!n.nodeValue.trim())continue;seen.add(e);if(e.closest('#game,canvas,svg,#sk114,.thu100,[data-f117="x"]'))continue;
      if(!e.offsetParent&&getComputedStyle(e).position!=='fixed')continue;const cs=getComputedStyle(e),fs=parseFloat(cs.fontSize);
      if(fs>=6&&fs<12&&n.nodeValue.trim().length>=16&&!e.closest('button,[role=button],.hb-slot,.hb-grid,.hb-tabs,[class*=badge],[class*=tag],small')){e.style.setProperty('font-size','12px','important');e.dataset.f117='1';}
      const m=cs.color.match(/\d+/g);if(m){const [r,g,b]=m.map(Number),L=lum(cs.color);if(Math.max(r,g,b)-Math.min(r,g,b)<40&&L>.25&&L<.62)e.style.setProperty('color','#C5DCF0','important');}}}
  setInterval(scan,1200);
  // tàu trưng bày to hơn: Phi đội ×1,8 · Trang bị ×1,6 (quanh điểm 50% / 65% khung)
  function hookShow(){try{const S=SuperHangar;if(S.__s117)return;const o=S.draw;S.draw=function(id,g,w,h){if(g&&g.canvas&&g.canvas.id==='hb-cv'&&window.SHOW117!==false){const f=g.canvas.closest('.hb-doll')?1.6:1.8;g.save();g.translate(w/2,h*.65);g.scale(f,f);g.translate(-w/2,-h*.65);try{return o.apply(this,arguments);}finally{g.restore();}}return o.apply(this,arguments);};S.__s117=1;}catch{}}
  setTimeout(hookShow,0);setTimeout(hookShow,3000);
})();
