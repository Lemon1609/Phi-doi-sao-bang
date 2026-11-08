'use strict';
// V192 · CẢM GIÁC BẮN (đề xuất Claude 06/11, chủ dự án đồng ý)
//  1) Quái thường chớp sáng 60 ms khi trúng đạn (vẽ lại sprite bằng chế độ 'lighter'; tối đa 1 lần / 150 ms / quái).
//  2) Quái chết vỡ thành 6–10 mảnh kim loại văng ra, rơi, xoay, mờ dần (không vòng tròn, không chữ).
//  3) Khựng hình: phá cánh boss 70 ms · hạ tinh anh / quái lớn 45 ms (thời gian trận chạy chậm còn 8%).
//  4) Rung nhẹ khi hạ tinh anh / phá cánh — tôn trọng công tắc Rung màn (V78) và chế độ giảm chuyển động.
//  Tự giảm khi hiệu ứng ở chế độ nhẹ. Tắt cả: window.FEEL192=false
(()=>{
 const on=()=>window.FEEL192!==false;
 const now=()=>performance.now();
 const light=()=>{try{return VisualFX.counts().quality==='light'||VisualFX.reduced();}catch{return false;}};
 const reduced=()=>{try{return VisualFX.reduced();}catch{return false;}};
 let hs=0;const shards=[];
 const PAL=['#8b97a8','#5d6878','#b9c4d2','#ff9a4a','#ffd08a'];
 // 1) chớp sáng
 function wrapHit(){try{if(typeof Render27==='undefined'||Render27.__192)return;const o=Render27.hit;Render27.hit=function(e){try{if(on()&&e&&!e.bossPart&&e!==boss){const t=now();if(!e.f192l||t-e.f192l>150){e.f192=t;e.f192l=t;}}}catch{}return o.apply(this,arguments);};Render27.__192=1;}catch{}}
 function wrapDraw(){try{if(typeof EnemyFleet==='undefined'||EnemyFleet.__192)return;const o=EnemyFleet.drawEnemy;EnemyFleet.drawEnemy=function(e){const r=o.apply(this,arguments);try{if(on()&&e&&e.f192&&now()-e.f192<60&&!reduced()){ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.55;o.apply(this,arguments);ctx.restore();}}catch{}return r;};EnemyFleet.__192=1;}catch{}}
 // 2) mảnh vỡ
 function burst(e){const n=light()?4:(e.large||e.elite?10:7);const sz=e.large||e.elite?1.4:1;
  for(let k=0;k<n&&shards.length<140;k++){const a=Math.random()*Math.PI*2,sp=(90+Math.random()*170)*sz;
   shards.push({x:e.x,y:e.y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-40,r:Math.random()*6,vr:(Math.random()-.5)*14,s:(3+Math.random()*5)*sz,t:0,life:.45+Math.random()*.35,c:PAL[(Math.random()*PAL.length)|0]});}}
 function wrapKill(){try{if(typeof kill!=='function'||kill.__192)return;const o=kill;const f=function(e){const was=e&&!e.dead;const r=o.apply(this,arguments);try{if(on()&&was&&e.dead&&!e.meteor&&!e.rescue28&&!e.bossPart&&mode==='play'){burst(e);if((e.elite||e.large)&&!reduced()){hs=Math.max(hs,.045);try{shake=Math.max(shake,.08);}catch{}}}}catch{}return r;};f.__192=1;kill=f;}catch{}}
 // 3) khựng hình khi phá cánh boss
 function wrapWing(){try{if(typeof Combat26==='undefined'||Combat26.__192)return;const o=Combat26.breakWing;Combat26.breakWing=function(p){const was=p&&!p.broken26&&!p.dead;const r=o.apply(this,arguments);try{if(on()&&!reduced()){hs=Math.max(hs,.07);try{shake=Math.max(shake,.15);}catch{}if(p)burst({x:p.x,y:p.y,large:true});}}catch{}return r;};Combat26.__192=1;}catch{}}
 function wrapUpdate(){try{if(typeof update!=='function'||update.__192)return;const o=update;const f=function(dt){try{if(on()&&hs>0&&mode==='play'&&Number.isFinite(dt)){hs-=dt;arguments[0]=dt*.08;}}catch{}return o.apply(this,arguments);};f.__192=1;update=f;}catch{}}
 // vẽ + cập nhật mảnh (ngay trước vật phẩm rơi)
 let last=0;
 function drawShards(){if(!shards.length)return;const t=now(),dt=last?Math.min(.05,(t-last)/1000):.016;last=t;const k=hs>0?.08:1;
  ctx.save();for(let i=shards.length-1;i>=0;i--){const s=shards[i];s.t+=dt*k;if(s.t>=s.life){shards.splice(i,1);continue;}s.vy+=420*dt*k;s.vx*=1-1.6*dt*k;s.x+=s.vx*dt*k;s.y+=s.vy*dt*k;s.r+=s.vr*dt*k;
   const a=1-s.t/s.life;ctx.globalAlpha=a;ctx.fillStyle=s.c;ctx.setTransform(1,0,0,1,0,0);try{const m=ctx.__base192;if(m)ctx.setTransform(m);}catch{}ctx.translate(s.x,s.y);ctx.rotate(s.r);ctx.beginPath();ctx.moveTo(-s.s,-s.s*.4);ctx.lineTo(s.s,0);ctx.lineTo(-s.s*.3,s.s*.6);ctx.closePath();ctx.fill();}
  ctx.restore();}
 function wrapLoot(){try{if(typeof Loot40==='undefined'||Loot40.__192)return;const o=Loot40.draw;Loot40.draw=function(){try{if(on()){ctx.__base192=ctx.getTransform();drawShards();}}catch{}return o.apply(this,arguments);};Loot40.__192=1;}catch{}}
 function all(){wrapHit();wrapDraw();wrapKill();wrapWing();wrapUpdate();wrapLoot();}
 all();setInterval(()=>{all();if(typeof mode!=='undefined'&&mode!=='play'&&mode!=='pause'){shards.length=0;hs=0;}},1000);
 window.V192={state:()=>({shards:shards.length,hs})};
})();
