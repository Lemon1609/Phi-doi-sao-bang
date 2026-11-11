// V215 · Mục B (bàn giao V214): hiệu ứng phe ta không dùng đỏ #FF334F / hồng #F50057 của đạn địch.
//  1) Màu hồ sơ tàu 1–10 (vệt tàu con hộ tống, quầng Bạo Tẩu v118, cánh wing87, đạn Bạo Tẩu dự phòng) theo tranh mới.
//  2) Quay tông tranh: đạn chính + chớp nòng tàu 4 (hồng cánh sen → lục acid);
//     tranh trúng đích hit_slash (tàu 7), hit_cross (tàu 10), hit_impale (tàu 4), hit_pillar (tàu 13), hit_vortex, hit_phoenix, hit_blast.
//     Chỉ quay các điểm có tông đỏ / hồng (280°–20°); điểm trắng, xám và các tông khác giữ nguyên.
//  3) Fx215.ship(): màu tàu đang xuất kích cho đạn Bạo Tẩu dự phòng (VisualFX, thay #ff84b0) và cho mức tiến hóa 4 của Evo53
//     (đuôi đạn, hạt sao, quầng đạn trang bị, vòng khiên — trước là cầu vồng) và tia sét mọi mức (trước vàng #ffd54a ở mức 1–3).
//  Tắt toàn bộ: window.FX215=false (tải lại trận).
(()=>{
  const on=()=>window.FX215!==false;
  // màu theo tranh mới (giống NEW213 của holo212 / D2P của v120); tàu 8–10 theo tranh mới V216 (cũ: tàu 8 #ff8167 sát đỏ đạn địch, tàu 9 #ef8bff tím hồng)
  const NEWC={0:'#ff9a3d',1:'#3de0a0',2:'#67d7ff',3:'#9be83a',4:'#7fd6ff',5:'#b9a6ff',6:'#9c7bff',7:'#ff9f45',8:'#6cc8ff',9:'#5be35b'};/* V221: tàu 10 lục radar (tách khỏi lục axit của tàu 4) *//* V216: tàu 8–10 theo tranh mới */
  function prof(){try{const P=Fighters28.profiles;for(const k in NEWC){const p=P[k];if(!p||p.__c215)continue;p.__c215=1;let c0=p.color;
      Object.defineProperty(p,'color',{get:()=>on()?NEWC[k]:c0,set:v=>{c0=v;},configurable:true,enumerable:true});}}catch{}}
  prof();window.addEventListener('load',prof);
  function ship(){try{const i=(typeof launchCraft==='number'?launchCraft:(typeof selected==='number'?selected:0));return Fighters28.profiles[i].color||'#ffb35c';}catch{return '#ffb35c';}}
  // quay tông: điểm có tông trong vùng đỏ / hồng → tông đích, giữ độ bão hòa và độ sáng
  const C=new Map();
  function tint(im,key,hue){if(!on()||!im)return im;let c=C.get(key);if(c)return c;
    const w=im.naturalWidth||im.width,h=im.naturalHeight||im.height;if(!w||!h)return im;
    try{c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');x.drawImage(im,0,0);const d=x.getImageData(0,0,w,h),q=d.data;
      for(let j=0;j<q.length;j+=4){if(q[j+3]<4)continue;const r=q[j]/255,g=q[j+1]/255,b=q[j+2]/255,mx=Math.max(r,g,b),mn=Math.min(r,g,b),dd=mx-mn;
        if(mx<=0||dd/mx<.12)continue;let H=mx===r?((g-b)/dd)%6:mx===g?(b-r)/dd+2:(r-g)/dd+4;H=(H*60+360)%360;if(!(H>=280||H<=20))continue;
        const S=dd/mx,V=mx,f=k=>{const kk=(k+hue/60)%6;return V-V*S*Math.max(0,Math.min(kk,4-kk,1));};q[j]=f(5)*255;q[j+1]=f(3)*255;q[j+2]=f(1)*255;}
      x.putImageData(d,0,0);}catch{c=im;}
    C.set(key,c);return c;}
  const HIT={slash:250,cross:120,impale:85,pillar:255,pillar_cot:255,vortex:258,phoenix:26,blast:26};
  window.Fx215={ship,tint,
    lime:(im,key)=>tint(im,'lime:'+key,85),
    hit:(k,im)=>{const n=k.replace(/^hit_/,'');return HIT[n]!=null?tint(im,'hit:'+n,HIT[n]):im;},
    NEWC};
})();
