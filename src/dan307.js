'use strict';
// V307 · ĐẠN CHÍNH KIỂU MỚI theo Gemini (docs_claude/de_xuat_cho/GEMINI_TRA_LOI_THIET_KE_DAN_13_TAU_V307.md) · BẢN THỬ TÀU 1
//  • Cơ chế: gom sát thương của các loạt bắn cũ (giữ nguyên tổng sát thương mỗi giây), phát lại theo nhịp mới thành quạt N tia, bay nhanh, thưa.
//  • Hình: vệt lông vũ lửa vẽ bằng mã (chưa có sprite GPT) — 3 lớp: quầng (đè thường, mờ) · thân màu bão hòa + đuôi mờ dần · lõi sáng nhỏ (cộng sáng).
//  • Tắt: window.DAN307B=false · bật thêm tàu khác: window.DAN307IDS=[0,...]
(function(){
 const CFG={0:{rays:[2,3,4,5,6,7],tot:[8,16,28,40,50,60],len:[70,80,90,102,115,130],rate:6.5,speed:1250,
   col:{thuong:'#ffb347',luc:'#ff8f2e',lam:'#ff6a24',tim:'#ff4a1e',tim5:'#ff7a1a',ss:'#ffcf5a'},core:'#fff1c4',bt:{rays:9,tot:76,col:'#ffd36a',len:120}}};
 const on=id=>window.DAN307B!==false&&(window.DAN307IDS||[0]).includes(id)&&CFG[id];
 const tierOf=id=>{try{return Dan299.tierOf(id)||'tim';}catch{return 'tim';}};
 const T=['thuong','luc','lam','tim','tim5','ss'];
 let bank=0,last=-9,tpl=null;
 function emit(id){const c=CFG[id],bt=typeof superTime!=='undefined'&&superTime>0,ti=Math.max(0,T.indexOf(tierOf(id)));
  const n=bt?c.bt.rays:c.rays[ti],tot=(bt?c.bt.tot:c.tot[ti])*Math.PI/180,L=bt?c.bt.len:c.len[ti],col=bt?c.bt.col:c.col[T[ti]];
  const dmg=bank/n;bank=0;
  for(let k=0;k<n;k++){const a=n>1?-tot/2+tot*k/(n-1):0,vx=Math.sin(a)*c.speed,vy=-Math.cos(a)*c.speed,x=player.x+(k-(n-1)/2)*4;
   shot(x,player.y-30,vx,vy,tpl.type||'rapid',dmg,tpl.r||4);const s=shots.at(-1);if(!s)continue;
   for(const key in tpl){if(['x','y','vx','vy','damage','hit','age','dead'].includes(key))continue;s[key]=tpl[key];}
   s.damage=dmg;s.vx=vx;s.vy=vy;s.d307=1;s.t307=T[ti];s.c307=col;s.L307=L;s.bt307=bt;s.age=0;s.homing=false;}}
 function hook(){if(typeof Arsenal30==='undefined'||typeof Fighters28==='undefined'||!Fighters28.__d299||Arsenal30.__d307)return false;
  const of=Arsenal30.fire;Arsenal30.fire=function(fusion){const id=(typeof selected!=='undefined')?selected:-1;
   if(fusion||!on(id)||typeof shots==='undefined')return of.apply(this,arguments);
   const b=shots.length,r=of.apply(this,arguments);const nw=shots.slice(b).filter(s=>s.art28===id&&!s.ray28&&!s.gearItem&&!s.ally&&!s.d307);
   if(nw.length){for(const s of nw){bank+=s.damage||0;s.dead=true;}const keep=new Set(nw);shots=shots.filter(s=>!keep.has(s));tpl=Object.assign({},nw[0]);
    const now=performance.now()/1000;if(now-last>=1/CFG[id].rate){last=now;emit(id);}}
   return r;};Arsenal30.__d307=1;
  const od=Fighters28.draw;Fighters28.draw=function(g,s){if(s&&s.d307&&window.DAN307B!==false){try{draw(g,s);return true;}catch{}}return od.apply(this,arguments);};
  return true;}
 const IM={};for(const k in (window.DAN307_IMG||{})){const im=new Image();im.src=DAN307_IMG[k];IM[k]=im;}
 const SPR={0:['phoenix_feather','phoenix_wing_wave']};
 // màu nhẹ theo bậc (Gemini: vàng cam → cam đỏ → đỏ thẫm → … → vàng trắng rực): lọc màu 1 lần rồi giữ trong bộ đệm
 const TINT={0:{thuong:'hue-rotate(18deg) brightness(1.08)',luc:'hue-rotate(6deg)',lam:'none',tim:'hue-rotate(-12deg) saturate(1.2) brightness(.95)',tim5:'hue-rotate(-26deg) saturate(1.25)',ss:'hue-rotate(28deg) saturate(.8) brightness(1.3)'}};
 const TC={};function tinted(id,k,tier){const im=IM[k];if(!im||!im.complete||!im.naturalWidth)return null;const f=(TINT[id]||{})[tier];if(!f||f==='none')return im;const key=k+'|'+tier;if(TC[key])return TC[key];
  try{const c=document.createElement('canvas');c.width=im.naturalWidth;c.height=im.naturalHeight;const g=c.getContext('2d');if(!('filter' in g))return TC[key]=im;g.filter=f;g.drawImage(im,0,0);return TC[key]=c;}catch{return TC[key]=im;}}
 function draw(g,s){const L=s.L307,a=Math.atan2(s.vy,s.vx)+Math.PI/2,sp=SPR[s.art28]||[],im=s.bt307?IM[sp[1]]:tinted(s.art28,sp[0],s.t307);
  if(im&&(im.width||im.naturalWidth)){const iw=im.naturalWidth||im.width,ih=im.naturalHeight||im.height,h=L*(s.bt307?1.05:1),w=h*iw/ih;
   g.save();g.translate(s.x,s.y);g.rotate(a);g.globalCompositeOperation='source-over';g.globalAlpha=.95;g.drawImage(im,-w/2,-h*.12,w,h);
   g.globalCompositeOperation='lighter';g.globalAlpha=s.bt307?.35:.22;g.drawImage(im,-w*.3,-h*.1,w*.6,h*.5);g.restore();return;}
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
  g.globalCompositeOperation='lighter';g.globalAlpha=s.bt307?.85:.7;g.fillStyle=CFG[0].core;g.beginPath();g.moveTo(0,-12);g.lineTo(w*.38,0);g.lineTo(0,L*.22);g.lineTo(-w*.38,0);g.closePath();g.fill();
  g.restore();}
 if(!hook()){const t=setInterval(()=>{if(hook())clearInterval(t);},250);}
 window.Dan307={CFG};
})();
