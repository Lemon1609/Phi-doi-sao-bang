// V113 · REVIEW113 (Gemini)
//  §B trần đạn boss: ải ≥140 (chiến dịch) và Nguyệt Thực, chỉ khi có boss. Không xóa đạn đang bay;
//     chỉ xử lý đạn MỚI sinh trong khung hình: ≥ ngưỡng nén → giữ 65% loạt mới (đạn to hơn 15%, va chạm +12%, nhanh hơn 8%, 1 viên nhắm tàu);
//     chạm trần → hoãn loạt mới cho tới khi còn dưới mức nối lại.
//  §A1.2 bản đồ: CHƯƠNG x / 10 và dòng điều kiện mở Chương 9 khi chưa mở.
(()=>{
  const CAP={camp:{pretty:[45,65,57],light:[34,48,40]},ecl:{pretty:[50,72,64],light:[38,54,46]}};
  const st={held:0,cut:0,comp:0,frames:0,maxSeen:0,hold:false};
  const lite=()=>{try{return VisualFX.counts().quality==='light';}catch{return false;}};
  const ecl=()=>{try{return typeof Eclipse67!=='undefined'&&Eclipse67.active();}catch{return false;}};
  function rule(){try{if(window.BCAP113===false||mode!=='play'||!boss||boss.dead)return null;const e=ecl();if(!e&&!(gameMode==='campaign'&&level>=140))return null;return (e?CAP.ecl:CAP.camp)[lite()?'light':'pretty'];}catch{return null;}}
  const seen=new WeakSet();
  function post(){const R=rule();let arr;try{arr=bullets;}catch{return;}if(!Array.isArray(arr))return;
    if(!R){for(const b of arr)seen.add(b);st.hold=false;return;}
    const [thr,cap,resume]=R;const fresh=[];let old=0;for(const b of arr){if(b.dead)continue;if(seen.has(b))old++;else fresh.push(b);}
    st.frames++;
    if(st.hold&&old<resume)st.hold=false;
    if(old>=cap)st.hold=true;
    if(fresh.length){
      if(st.hold){for(const b of fresh)b.dead=true;st.held+=fresh.length;}
      else{let keep=fresh;
        if(old+fresh.length>=thr){st.comp++;const n=fresh.length,k=Math.max(1,Math.round(n*.65));keep=[];
          for(let i=0;i<n;i++){if(Math.floor((i+1)*k/n)>Math.floor(i*k/n))keep.push(fresh[i]);else{fresh[i].dead=true;st.cut++;}}
          let px=240,py=900;try{px=player.x;py=player.y;}catch{}
          for(const b of keep){if(b.__c113)continue;b.__c113=1;b.r=(b.r||5)*1.12;b.vx=(b.vx||0)*1.08;b.vy=(b.vy||0)*1.08;}
          // 1 viên giữa loạt nhắm thẳng vào tàu
          const c=keep[Math.floor(keep.length/2)];if(c&&keep.length>=3){const sp=Math.hypot(c.vx||0,c.vy||0);if(sp>0){const a=Math.atan2(py-c.y,px-c.x);c.vx=Math.cos(a)*sp;c.vy=Math.sin(a)*sp;}}}
        if(old+keep.length>cap){const over=old+keep.length-cap;for(let i=keep.length-1,j=0;i>=0&&j<over;i--,j++){keep[i].dead=true;st.held++;}st.hold=true;}}
      for(const b of fresh)seen.add(b);}
    try{st.maxSeen=Math.max(st.maxSeen,arr.filter(b=>!b.dead).length);}catch{}}
  function install(){try{const ou=update;const nu=function(dt){const r=ou.apply(this,arguments);try{post();}catch{}return r;};window.update=nu;try{update=nu;}catch{}}catch(e){console.warn('V113',e);}}
  setTimeout(install,0);
  // ---------- bản đồ: CHƯƠNG x / 10 + điều kiện mở Chương 9 ----------
  setInterval(()=>{try{const sm=document.getElementById('cm-small');if(!sm||!sm.offsetParent)return;const t=sm.textContent;const m=t.match(/^CHƯƠNG (\d+) \/ (\d+)(.*)$/);if(m&&m[2]!=='10')sm.textContent='CHƯƠNG '+m[1]+' / 10'+m[3];
    const info=document.getElementById('cm-info');if(!info)return;let h=document.getElementById('cm-lock113');
    let need=false,cp=0;try{need=+m[1]===8&&typeof Ch9!=='undefined'&&!Ch9.open();cp=Math.round(Combat.stats().cp);}catch{}
    if(need){if(!h){h=document.createElement('div');h.id='cm-lock113';h.style.cssText='font-size:11px;color:#ffd27a;margin-top:3px;text-align:center';info.after(h);}
      const cl=(()=>{try{return Progress.getState().cleared.includes(160);}catch{return false;}})();
      h.textContent='🔒 Chương 9: '+(cl?'':'vượt ải 160 · ')+'cần 1 món SSS / siêu chiến cơ hoặc lực chiến 12.000 (đang '+cp.toLocaleString('vi-VN')+')';h.hidden=false;}
    else if(h)h.hidden=true;}catch{}},600);
  window.V113={state:()=>({...st,rule:rule()})};
})();
// ---------- HUD: biểu tượng Sượt đạn + cảnh báo thiếu lực chiến (tranh GPT V113) ----------
(()=>{try{const A=window.HUD113_ART||{};const st=document.createElement('style');st.id='v113-css';
  st.textContent=`.t7-gz .gz113{display:inline-block;min-width:15px;height:15px;line-height:15px;padding-left:${A.graze?17:0}px;vertical-align:middle;background:${A.graze?`url(${A.graze}) left center/15px 15px no-repeat`:'none'};font-size:9px;white-space:nowrap}`+
   `.t7-cp:not([hidden]){display:inline-flex;align-items:center;gap:3px}`+(A.warn?`.t7-cp::before{content:'';width:13px;height:13px;flex:none;background:url(${A.warn}) center/contain no-repeat}`:'');
  document.head.appendChild(st);}catch{}})();
