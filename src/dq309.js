'use strict';
// V309d · ĐẠN ĐỊCH + LASER BOSS MỚI (Gemini 20/11 18:26 · tranh GPT fx_enemy_bullets_4x4 + fx_enemy_lasers_3col).
//  4 tông nguy hiểm tách hẳn 6 màu bậc đạn người chơi: Đỏ Huyết Quang (chuẩn) · Cam Đỏ Hỏa Diệm (nhanh/ngắm, phe Lò Rèn/Huyết Giác)
//  · Đỏ Tía Mận (đặc biệt, phe Nhật Thực/Hư Không/Thánh Đường) · Đỏ Quá Tải (cầu lớn, laser). Hitbox giữ nguyên; chỉ đổi hình vẽ.
//  Ảnh: global DQ309_IMG (src/dq309img), laser dùng FX309 (beam/flare/ring_e1..e3). Tắt đạn: window.DQ309=false · tắt laser: window.DQL309=false
(function(){
 const IM={},BR={};function im(k){const A=window.DQ309_IMG;if(!A||!A[k])return null;let i=IM[k];if(!i){i=new Image();i.src=A[k];IM[k]=i;}if(!(i.complete&&i.naturalWidth))return null;if(BR[k])return BR[k];
  try{const c=document.createElement('canvas');c.width=i.naturalWidth;c.height=i.naturalHeight;const g=c.getContext('2d');g.filter='brightness(1.18) saturate(1.1)';g.drawImage(i,0,0);return BR[k]=c;}catch{return BR[k]=i;}}/* +18 % sáng (Gemini: sprite 3D nhỏ dễ tối cạnh đạn Bạo Tẩu) */
 // phe theo chương (tên boss từng chương): o = Lò Rèn/Huyết Giác · b = Nhật Thực/Hư Không/Thánh Đường · r = khác
 const CH={1:'o',2:'o',3:'b',4:'r',5:'b',6:'b',7:'b',8:'o',9:'b',10:'b'};
 function grp(){let lv=1;try{lv=gameMode==='endless'?150:(level|0)||1;}catch{}return CH[Math.max(1,Math.min(10,Math.ceil(lv/20)))]||'r';}
 const now=()=>performance.now()/1000;
 // chọn sprite + cỡ vẽ (× bán kính va chạm) + kiểu xoay ('dir' theo hướng bay · 'spin' quay · 'none')
 function pick(b,g){const r=b.r||4,t=b.type,sp=Math.hypot(b.vx||0,b.vy||0);
  if(t==='saw')return [g==='b'?'e_shuriken_berry':'e_shuriken_orange',3.4,'spin',6];
  if(r>=8)return [g==='b'?'e_orb_heavy_berry':'e_orb_heavy_scarlet',3.0,'spin',2];
  if(t==='crescent30'||t==='wave'||t==='feather28')return [g==='b'?'e_arc_berry':'e_arc_orange',4.4,'dir'];
  if(t==='needle'||t==='rice'){if(sp>380)return ['e_bolt_red',5.4,'dir'];return [g==='o'?'e_drop_orange':g==='b'?'e_diamond_berry':'e_drop_red',5.0,'dir'];}
  if(b.splitter)return ['e_diamond_red',4.0,'dir'];
  if(b.aimed30&&g==='o')return ['e_round_orange',3.3,'none'];
  return ['e_round_red',3.3,'none'];}
 // mìn hẹn giờ (TIMED_BOMB: b.sp75.k==='timer'): mìn đen gai, ≤1,2 s cuối nháy đỏ nhanh dần + vòng đếm ngược thu nhỏ
 function mine(b){const o=b.sp75;if(!o||o.k!=='timer')return false;const t=Math.max(0,o.t||0),r=Math.max(6,b.r||9),d=r*4.2,hot=t<=1.2,fq=hot?6+(1.2-t)*14:0,on=hot&&Math.sin(now()*fq*6.283)>0;
  const i=im(on?'e_mine_arming':'e_mine_idle');if(!i)return false;ctx.save();ctx.translate(b.x,b.y);ctx.rotate(now()*1.2);ctx.drawImage(i,-d/2,-d/2,d,d);ctx.restore();
  const T0=o.t0||(o.t0=Math.max(t,.01)),u=Math.max(0,Math.min(1,t/T0));ctx.save();ctx.globalCompositeOperation='lighter';ctx.strokeStyle='#ff1e42';ctx.globalAlpha=hot?.85:.45;ctx.lineWidth=2.2;ctx.beginPath();ctx.arc(b.x,b.y,r*2.4,-Math.PI/2,-Math.PI/2+u*6.283);ctx.stroke();ctx.restore();return true;}
 function draw(b){if(b.dead||!Number.isFinite(b.r))return false;if(b.sp75&&b.sp75.k==='timer')return mine(b);const g=grp(),p=pick(b,g),i=im(p[0]);if(!i)return false;
  const r=Math.max(3,b.r),d=Math.max(p[0].startsWith('e_round')?16:13,r*p[1])*(window.DQ309K||1);ctx.save();ctx.translate(b.x,b.y);
  if(p[2]==='dir')ctx.rotate(Math.atan2(b.vy||1,b.vx||0)-Math.PI/2);else if(p[2]==='spin')ctx.rotate(now()*p[3]+(b.x*.01));
  ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;ctx.drawImage(i,-d/2,-d/2,d,d);ctx.restore();return true;}
 function hookB(){try{const td=Threat30.draw;if(td.__dq309)return true;/* luôn nằm ngoài cùng (art86 bọc lại sau) */
  const nd=function(b){if(window.DQ309!==false){try{if(draw(b))return;}catch{}}return td.apply(this,arguments);};nd.__dq309=1;nd.__a86=1;/* art86 cũng tự bọc ngoài cùng mỗi giây; mang cờ của nó để khỏi giành nhau */Threat30.draw=nd;return true;}catch{return false;}}
 // ---------- laser boss: tia 3 lớp màu địch khi đang bắn (giai đoạn báo trước giữ vạch đỏ ⚠ cũ) ----------
 const hexHue=h=>{h=String(h||'').replace('#','');if(h.length<6)return 0;const r=parseInt(h.slice(0,2),16)/255,g=parseInt(h.slice(2,4),16)/255,bb=parseInt(h.slice(4,6),16)/255,mx=Math.max(r,g,bb),mn=Math.min(r,g,bb),d=mx-mn;if(d<.1)return 0;let hu=mx===r?((g-bb)/d)%6:mx===g?(bb-r)/d+2:(r-g)/d+4;hu*=60;return hu<0?hu+360:hu;};
 function lcol(b){const g=grp();if(g==='b')return 'e3';const h=hexHue(b.color);if(h>=18&&h<60)return 'e2';return g==='o'?'e2':'e1';}
 function beamDraw(b){if(window.DQL309===false||!window.FX309||!FX309.on())return false;const a0=b.warn||0;if(b.age<a0)return false;const u=(b.age-a0)/Math.max(.01,b.duration||1);if(u>1)return false;
  const ang=b.angle28!==undefined?b.angle28+(b.sweep28||0):Math.PI/2,L=b.length28||((typeof H==='number'?H:1100)-(b.y||0)),x1=b.x,y1=b.y||0,x2=x1+Math.cos(ang)*L,y2=y1+Math.sin(ang)*L;
  const fin=u<.08?u/.08:u>.9?(1-u)/.1:1,w=Math.max(14,(b.width||18))*1.9*(.55+.45*fin);
  FX309.beam(ctx,x1,y1,x2,y2,lcol(b),w,1,{fs:Math.max(34,w*1.3),rs:30,ring:false});return true;}
 // chớp tụ nòng: vòng thu nhỏ 24 → 6 px + sao năng lượng (b75 đẩy vào window.__tele75)
 function tele(){const L=window.__tele75;if(!L||!L.length)return;const tn=performance.now(),i=im('e_muzzle_flash');ctx.save();ctx.globalCompositeOperation='lighter';
  for(const e of L){if(tn-e.t>60)continue;const u=1-Math.max(0,Math.min(1,e.l/.32)),R=24-18*u;ctx.globalAlpha=.55+.45*u;ctx.strokeStyle='#ff1e42';ctx.lineWidth=2.5;ctx.beginPath();ctx.arc(e.x,e.y,R,0,6.283);ctx.stroke();if(i){const d=14+22*u;ctx.globalAlpha=.5+.5*u;ctx.drawImage(i,e.x-d/2,e.y-d/2,d,d);}}
  ctx.restore();window.__tele75=L.filter(e=>tn-e.t<=60);}
 function hookT(){try{const vd=VisualFX.draw;if(vd.__dq309)return;const nd=function(){const r=vd.apply(this,arguments);try{if(window.TELE309!==false&&(mode==='play'||mode==='pause'))tele();}catch{}return r;};nd.__dq309=1;VisualFX.draw=nd;}catch{}}
 function hookL(){try{const db=Bosses28.drawBeam;if(db.__dq309)return true;const nd=function(b){try{if(beamDraw(b))return true;}catch{}return db.apply(this,arguments);};nd.__dq309=1;Bosses28.drawBeam=nd;return true;}catch{return false;}}
 setInterval(()=>{hookB();hookL();hookT();},1500);/* kiểm định kỳ: mô-đun khác bọc lại sau thì bọc lại lên trên */
 window.DQ309S={pick,grp,state:()=>{try{return {b:!!Threat30.draw.__dq309,l:!!Bosses28.drawBeam.__dq309};}catch{return {};}}};
})();
