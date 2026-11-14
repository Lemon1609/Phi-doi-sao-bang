// V303 · Cơ chế đạn mới theo bảng V273 (chủ dự án 14/11: "Làm cơ chế thật", cân sát thương, báo số trước khi giữ).
//  tàu 3 (id 2): khối băng trúng mục tiêu đầu tiên → vỡ 2 mảnh băng bắn chéo sang hai bên (mỗi mảnh 35 % sát thương); khối chính giảm theo HS3 để tổng gần như cũ.
//  tàu 4 (id 3): vuốt bay lượn sóng đan chéo qua trục giữa (vẫn xuyên).
//  tàu 9 (id 8): 1/3 số đạn tự bẻ lái đuổi mục tiêu gần nhất.
//  (tàu 11 bay xoắn: đã thử, giảm 32 % sát thương → bỏ, giữ đường thẳng)
//  tàu 12 (id 11): mục tiêu trúng đạn bị khựng 0,15 s (làm chậm nhịp di chuyển); sát thương giảm theo HS12.
//  Tắt toàn bộ: window.CO303=false (để đo so sánh). Hệ số cân: window.CO303_HS={3:..,12:..}
(function(){
  const HS=Object.assign({3:.76,4:1.1,12:1.2},/* V303: đo 3 lần × 40 s mỗi cấu hình, chỉnh để tổng sát thương ≈ cũ */window.CO303_HS||{});
  const SEEN=new WeakSet(),HITN=new WeakMap();let n9=0;
  function px(){try{return player.x;}catch{return 240;}}
  function tag(s){const id=s.art28;
    if(id===2&&!s.__manh){s.damage*=HS[3];}
    else if(id===3){s.damage*=HS[4];s.pathStyle=2;s.pathCurve=150*(s.x<px()?1:-1);s.pathPhase=0;}
    else if(id===8){if((n9++)%3===0){s.homing=true;s.homingSpeed=s.homingSpeed||Math.hypot(s.vx,s.vy)||700;}}
    else if(id===11){s.damage*=HS[12];}}
  function manh(s){if(typeof shot!=='function')return;for(const sd of [-1,1]){const sp=Math.hypot(s.vx,s.vy)||600,a=Math.atan2(s.vy,s.vx)+sd*.62;
      try{shot(s.x,s.y-6,Math.cos(a)*sp*.9,Math.sin(a)*sp*.9,'ice',s.damage/HS[3]*.35,3);const m=shots.at(-1);if(m){m.art28=2;m.__manh=true;m.piercing=false;m.freeze=s.freeze;m.color=s.color;m.hit=new Set(s.hit||[]);m.effect22=null;SEEN.add(m);}}catch{}}}
  function step(){if(window.CO303===false)return;let L;try{L=shots;}catch{return;}
    for(let i=0;i<L.length;i++){const s=L[i];if(!s||s.dead||s.art28===undefined||s.gearKind)continue;try{if(s.art28!==selected)continue;}catch{}
      if(!SEEN.has(s)){SEEN.add(s);tag(s);}
      const h=s.hit?s.hit.size:0,o=HITN.get(s)||0;if(h>o){HITN.set(s,h);
        if(s.art28===2&&!s.__manh&&o===0)manh(s);
        if(s.art28===11&&s.hit){for(const e of s.hit){if(e&&!e.dead&&!e.bossPart&&!(typeof boss!=='undefined'&&e===boss))e.frozen=Math.max(e.frozen||0,.15);}}}}}
  function hook(){if(typeof PlayerFXB==='undefined'||PlayerFXB.__co303)return false;const ob=PlayerFXB.begin;
    PlayerFXB.begin=function(dt){const r=ob.apply(this,arguments);try{if(mode==='play')step();}catch{}return r;};PlayerFXB.__co303=1;return true;}
  if(!hook()){const t=setInterval(()=>{if(hook())clearInterval(t);},200);}
  window.Co303={HS};
})();
