'use strict';
// V309 Lượt 2 · CÁNH NĂNG LƯỢNG (GPT 3×2, 6 mẫu nửa cánh phải; Gemini 21/11). Vẽ sau thân tàu qua BtFx218.back (v118: đã dịch về tâm tàu, đã nghiêng theo hướng bay).
//  Thường / sảnh: cánh gọn, vỗ êm sin(t·3)·0,06 rad. Bạo Tẩu: tụ–bung 0,3 s, mở thêm 20°, ×1,25, vỗ 6 Hz.
//  2 lớp: dưới = chính cánh ×1,08 cộng sáng α .20→.35 phập phồng; trên = vẽ thường α .90. Không ctx.filter / shadowBlur.
//  Khi bật, thay lớp cánh Bạo Tẩu aura307 (vòng đếm ngược vẫn giữ). Tắt: window.CANH309=false (WING309 đã dùng cho cánh V132 robot)
(()=>{const D=window.WING309_IMG||{},PIV=window.WING309_PIV||{},IM={};for(const k in D){const im=new Image();im.src=D[k];IM[k]=im;}
 const ok=im=>im&&im.complete&&im.naturalWidth;
 // id tàu 0-based → mẫu cánh
 const MAP={0:'phoenix',7:'phoenix',1:'cryo',2:'cryo',4:'seraph',8:'seraph',5:'void',6:'void',10:'void',12:'void',3:'cyber',9:'cyber',11:'chrono'};
 const st={on:false,t0:-9};
 const on=()=>window.CANH309!==false;
 function draw(ctx,id,size,isOn,now){const k=MAP[id];if(!k)return false;if(!isOn&&window.SHIP309V4&&window.L3309!==false){st.on=false;return true;}/* V309 Lượt 3: ẩn cánh lúc Thường (chỉ bung khi Bạo Tẩu) */const im=IM[k];if(!ok(im))return false;const pv=PIV[k]||[.13,.3];
  if(isOn&&!st.on)st.t0=now;st.on=isOn;
  const ta=now-st.t0,iw=im.naturalWidth,ih=im.naturalHeight;
  // tụ (0–0,12 s co lại) rồi bung (0,12–0,3 s vọt quá rồi về)
  let pop=1;if(isOn&&ta<.3){pop=ta<.12?1-.35*(ta/.12):.65+.6*Math.sin(((ta-.12)/.18)*Math.PI/2);}
  const sc=(isOn?1.25:1)*pop,L=size*(isOn?.86:.7)*sc/1.25*1.25,k2=L/iw,h=ih*k2,
   flap=isOn?Math.sin(now*Math.PI*2*6)*.06:Math.sin(now*3)*.06,open=isOn?-20*Math.PI/180:0,base=.18,
   glowA=.2+.15*(.5+.5*Math.sin(now*(isOn?9:4)));
  for(const sd of [1,-1]){ctx.save();ctx.scale(sd,1);ctx.translate(size*.1,-size*.02);ctx.rotate(base+open+flap);
   const x=-pv[0]*iw*k2,y=-pv[1]*h;
   ctx.globalCompositeOperation='lighter';ctx.globalAlpha=glowA;const g=1.08;ctx.drawImage(im,x*g,y*g,iw*k2*g,h*g);
   ctx.globalCompositeOperation='source-over';ctx.globalAlpha=.9;ctx.drawImage(im,x,y,iw*k2,h);ctx.restore();}
  return true;}
 function hook(){if(!window.BtFx218||!BtFx218.__a307||BtFx218.__w309)return false;const ob=BtFx218.back;
  BtFx218.back=function(c,a,cell,cw,ch,size,isOn,now,ta,id){if(!on())return ob.apply(this,arguments);let done=false;try{done=draw(c,id,size,!!isOn,now);}catch(e){}if(!done)return ob.apply(this,arguments);};
  BtFx218.__w309=1;return true;}
 if(!hook()){const t=setInterval(()=>{if(hook())clearInterval(t);},250);}
 // Tàu không đi qua bộ vẽ v118 (Evo53/BtFx218 không có ảnh, vd tàu 12): tự vẽ cánh sau thân trước khi vẽ tàu
 function hook2(){try{if(typeof SuperGame==='undefined'||!SuperGame.drawShip||SuperGame.drawShip.__w309)return !!(typeof SuperGame!=='undefined'&&SuperGame.drawShip&&SuperGame.drawShip.__w309);if(!SuperGame.__c118)return false;const od=SuperGame.drawShip;
  const f=function(id,rot){try{const v118=(id<=9||(window.ART239!==false&&id<=12&&window.BtFx218&&BtFx218.has&&BtFx218.has(id)));let hasHull=false;try{const a=Evo53.hull(id);hasHull=!!(a&&(a.naturalWidth||a.width));}catch{}
    if(on()&&MAP[id]&&!(v118&&hasHull)&&typeof player!=='undefined'){let sp=false;try{sp=superTime>0;}catch{}const now=(typeof time==='number'?time:performance.now()/1000);ctx.save();ctx.translate(player.x,player.y);ctx.rotate((rot||0)*.6);draw(ctx,id,sp?123:106,sp,now);ctx.restore();}}catch{}
   return od.apply(this,arguments);};f.__w309=1;SuperGame.drawShip=f;return true;}catch{return false;}}
 if(!hook2()){const t2=setInterval(()=>{if(hook2())clearInterval(t2);},250);}
 window.Wing309={MAP,draw};
})();
