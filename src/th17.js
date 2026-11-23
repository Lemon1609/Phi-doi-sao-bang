'use strict';
// V309 · Lượt 17B · 3 CHIẾN CƠ THẦN HÓA tranh mới (GPT 23/11) thay tranh V86. Tắt: window.TH17=false (đặt TRƯỚC khi trang tải để quay về tranh V86).
//  • Ảnh: window.TH17_IMG (src/th17img/*.webp, tách nền 2 lớp bằng claude_tools/th17_assets.py) — khối "th17-img-js" chèn NGAY SAU "art86-art"
//    và ghi đè 6 khóa ART86_ASSETS (sss11_huyettinh, sss12_vinhhang, sss13_chanthan + _super) trước khi Art86 nạp ảnh → trận, Bách Khoa, xem trước, Kho cùng đổi.
//  • Hiệu ứng (sau khi craftSprite vẽ thân #11–#13 dạng thần hóa, mọi khung, không filter/shadowBlur):
//    nhịp thở LED ở lõi (sprite quầng tròn dựng sẵn, 'lighter', alpha theo sin) · lửa động cơ gắn họng xả (FX18.engine).
//    Quầng Bạo Tẩu (BtFx218.neonAt) và hào quang Trang phục vẫn do mô-đun gốc vẽ như tàu thường.
const TH17=(()=>{
 const on=()=>window.TH17!==false;
 // [màu trong, màu ngoài] lõi theo tàu: #11 đỏ–tím · #12 cyan–vàng · #13 tím–hồng
 const CORE={10:['#ff4a6a','#a23cff'],11:['#7ff3ff','#ffd24a'],12:['#e07bff','#ff5fc8']};
 const SPR=new Map();
 function glow(a,b){const k=a+b;let c=SPR.get(k);if(c)return c;const S=128;c=document.createElement('canvas');c.width=c.height=S;const g=c.getContext('2d');const gr=g.createRadialGradient(S/2,S/2,0,S/2,S/2,S/2);
  gr.addColorStop(0,'rgba(255,255,255,.95)');gr.addColorStop(.18,a);gr.addColorStop(.5,b+'88');gr.addColorStop(1,b+'00');g.fillStyle=gr;g.fillRect(0,0,S,S);SPR.set(k,c);return c;}
 const formed=i=>{try{return on()&&window.SSS87&&SSS87.hull&&!!SSS87.hull(i);}catch{return false;}};
 // vẽ lớp hiệu ứng trong hệ tọa độ (cx,cy) = tâm thân, D = cỡ vẽ, rot = góc
 function fx(g,i,im,cx,cy,D,rot,t,noEng){const c=CORE[i];if(!c)return;t=t==null?performance.now()/1000:t;g.save();g.translate(cx,cy);if(rot)g.rotate(rot);
  try{if(!noEng&&window.FX18API&&window.FX18!==false){const inf=FX18API.shipInfo(im);FX18API.engine(g,0,0,D,D,inf,(inf&&inf.col)||c[1],t);}}catch{}
  const k=.62+.38*Math.sin(t*2.6+i),r=D*(.17+.025*Math.sin(t*2.6+i));g.globalCompositeOperation='lighter';g.globalAlpha=.55+.45*k;g.drawImage(glow(c[0],c[1]),-r,-r-D*.004,r*2,r*2);
  g.globalAlpha=.25*k;g.drawImage(glow(c[0],c[1]),-r*1.9,-r*1.9,r*3.8,r*3.8);g.restore();}
 // trận: bọc craftSprite (sau lớp ship83)
 function hook(){try{if(typeof window.craftSprite!=='function'||window.craftSprite.__th17||!window.craftSprite.__s83)return false;const o=window.craftSprite;
  const f=function(index,x,y,size,rotation=0){const r=o.apply(this,arguments);try{if(formed(index)&&typeof ctx!=='undefined'){const sup=(()=>{try{return Fighters28.overdrive();}catch{return false;}})();const im=SSS87.hull(index,sup);if(im)fx(ctx,index,im,x,y,size*1.4,rotation);}}catch{}return r;};
  f.__th17=1;f.__s83=1;window.craftSprite=f;try{craftSprite=f;}catch{}return true;}catch{return false;}}
 if(!hook()){const tm=setInterval(()=>{if(hook())clearInterval(tm);},300);}
 return {on,fx,formed,CORE};
})();window.TH17API=TH17;
