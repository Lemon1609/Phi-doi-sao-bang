// V82 · tranh GPT (gói đồ họa V80–V81): boss cuối chương 1/3/4/5 (ải 20/60/80/100) 3 pha + chân dung bản đồ — cùng chuẩn với Phá Không 17.1 (boss78.js)
//  Tâm 3 pha trùng tâm ảnh (registration.json) → đổi pha tại chỗ, mờ chéo. Phần thân rộng 240 px logic: S = 240·768 / bbox rộng nhất của 3 pha.
//  Chỉ thay HÌNH VẼ: đạn, hitbox, máu, tốc độ giữ nguyên. Tắt: window.BOSS82=false
const Boss82=(()=>{
 const A=typeof BOSS82_ART!=='undefined'?BOSS82_ART:{};const IM={};
 for(const k in A){if(k==='meta')continue;const im=new Image();im.src=A[k];IM[k]=im;}
 const META=A.meta||{};
 const ok=k=>IM[k]&&IM[k].complete&&IM[k].naturalWidth>0;
 function stageArt(b){try{if(window.Event83&&Event83.inRaid&&Event83.inRaid())return null;if(!b||b!==boss||b.bossPart||gameMode!=='campaign')return null;if(Dungeons.active())return null;}catch{return null;}const m=META[level|0];return m||null;}
 function phaseOf(m){try{if(m.w3){const s=B75.state();const ph=s?s.ph|0:0;const n=(boss&&boss.parts||[]).filter(p=>!p.dead&&p.hp>0).length;return n?Math.min(1,ph):2;}}catch{}try{if(m.src==='c76'){const s=C76.state().boss;return s?s.ph|0:0;}const s=B75.state();return s?s.ph|0:0;}catch{return 0;}}
 const fade={};
 function drawB(b,m){const ph=Math.max(0,Math.min(2,phaseOf(m))),k=m.id+'_p'+(ph+1);if(!ok(k))return false;const f=fade[m.id]||(fade[m.id]={last:ph,shown:1});
  if(ph!==f.last){f.prev=f.last;f.last=ph;f.shown=0;}f.shown=Math.min(1,f.shown+.08);
  let S=240*768/m.w,x=b.x,y=b.y;
  // V86: tranh có tọa độ 2 cánh (GPT đợt V85) → chỉnh tỉ lệ để cánh trong tranh trùng đúng vị trí cánh phá được (hitbox giữ nguyên)
  try{if(m.wings&&b.parts&&b.parts.length>=2){const dx=Math.abs(b.parts[b.parts.length-1].x-b.parts[0].x)/2,aw=Math.abs(m.wings[1][0]-m.wings[0][0])/2;if(dx>20&&aw>20)S=Math.max(150,Math.min(420,dx*768/aw));const wy=(m.wings[0][1]+m.wings[1][1])/2-383.5,py=(b.parts[0].y+b.parts[b.parts.length-1].y)/2-b.y;y=b.y+py-wy*S/768;}}catch{}
  ctx.save();
  if(f.shown<1&&f.prev!=null&&ok(m.id+'_p'+(f.prev+1))){ctx.globalAlpha=1-f.shown;ctx.drawImage(pre107(m.id+'_p'+(f.prev+1),S),x-S/2,y-S/2,S,S);}
  ctx.globalAlpha=f.shown<1?f.shown:1;ctx.drawImage(pre107(k,S),x-S/2,y-S/2,S,S);ctx.restore();return true;}
 // V107: thu nhỏ tranh boss sẵn đúng cỡ hiển thị (không bắt máy thu nhỏ ảnh lớn mỗi khung)
 const PRE107=new Map();function pre107(key,S){const im=IM[key];if(window.PRE107===false||!im||!im.naturalWidth)return im;let sx=2;try{sx=ctx.canvas.width/W;}catch{}const px=Math.max(32,Math.ceil(S*sx/16)*16);if(px>=im.naturalWidth*.9)return im;const id=key+'|'+px;let c=PRE107.get(id);if(c)return c;
  c=document.createElement('canvas');c.width=c.height=px;const g=c.getContext('2d');g.imageSmoothingEnabled=true;g.imageSmoothingQuality='high';g.drawImage(im,0,0,px,px);if(PRE107.size>12)PRE107.clear();PRE107.set(id,c);return c;}
 function install(){if(window.BOSS82===false)return;
  for(const name of ['Major36','BossBake3D']){try{const M=window[name]||eval(name);if(M.__b82)continue;const o=M.draw;M.draw=function(b){try{const m=stageArt(b);if(m&&drawB(b,m))return true;}catch{}return o.apply(this,arguments);};M.__b82=1;}catch{}}}
 function map(){for(const st in META){const id=META[st].id;if(!A[id+'_portrait'])continue;const n=document.querySelector('.cm-node[data-stage="'+st+'"]');if(!n||n.querySelector('.bp78'))continue;const im=document.createElement('img');im.className='bp78';im.src=A[id+'_portrait'];im.alt='';n.appendChild(im);}}
 setTimeout(install,60);setInterval(()=>{try{map();}catch{}},900);
 return {ok,META,state:()=>({loaded:Object.keys(IM).filter(ok).length,stages:Object.keys(META)})};
})();
window.Boss82=Boss82;
