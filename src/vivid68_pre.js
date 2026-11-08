'use strict';
// V68-A2 · Đạn rực màu (người dùng: "hiệu ứng đạn khá nhạt màu, chán so với game gốc").
//  Nguyên nhân: sprite đạn (ShotV2) tô dải màu bắt đầu bằng trắng + màu nhạt, vẽ chế độ cộng sáng ('lighter') rồi bị Glow66 giảm
//  độ mờ (chống lóa) → ra màu xám trắng. Cách sửa (giữ chống lóa):
//   1) Bảng màu DEF đậm hơn (thân đạn mang màu chính, chỉ đầu nhọn trắng).
//   2) Tăng bão hòa từng điểm ảnh sprite một lần lúc dựng (K) + làm thân đạn đặc hơn (alpha).
//   3) Vẽ thân đạn bằng 'source-over' (không cộng dồn thành trắng → vẫn hết lóa), viền sáng nhẹ giữ cộng sáng.
//   4) Đạn to hơn ~22% (chỉ hình vẽ; va chạm giữ nguyên).
const VIVID68={on:true,K:1.45,alpha:1.18,size:1.22,dewhite:.86};
function Vivid68Pre(SPR){if(!VIVID68.on)return;
 const seen=new Set();
 function sat(c){if(!c||seen.has(c)||!c.getContext)return;seen.add(c);try{const g=c.getContext('2d');const d=g.getImageData(0,0,c.width,c.height),p=d.data,K=VIVID68.K,A=VIVID68.alpha,DW=VIVID68.dewhite;
  for(let i=0;i<p.length;i+=4){const a=p[i+3];if(!a)continue;let r=p[i],gg=p[i+1],b=p[i+2];const y=.299*r+.587*gg+.114*b;
   r=y+(r-y)*K;gg=y+(gg-y)*K;b=y+(b-y)*K;const mx=Math.max(r,gg,b),mn=Math.min(r,gg,b);
   // vùng gần trắng nhưng có chút màu → kéo về màu (giữ lõi trắng tinh nhỏ)
   if(mn>200&&mx-mn>6){const k=DW;r=mx-(mx-r)/k*1;gg=mx-(mx-gg)/k;b=mx-(mx-b)/k;r*=k+.1;gg*=k+.1;b*=k+.1;}
   p[i]=Math.max(0,Math.min(255,r));p[i+1]=Math.max(0,Math.min(255,gg));p[i+2]=Math.max(0,Math.min(255,b));p[i+3]=Math.min(255,a*A);}
  g.putImageData(d,0,0);}catch(e){}}
 for(const s of SPR){for(const f of s.main||[])sat(f.img);for(const f of s.alt||[])sat(f.img);sat(s.beam);}
}
