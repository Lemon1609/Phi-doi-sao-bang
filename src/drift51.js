'use strict';
// V51 · Buff rơi tự trôi về quanh chiến cơ (thay kiểu "rơi chậm rồi đứng lơ lửng gần đáy màn").
//  • 0,45 s đầu: bật lên tại chỗ địch chết như cũ (người chơi thấy rõ buff rơi từ đâu).
//  • Sau đó: trôi mềm tới 1 "chỗ đậu" cạnh chiến cơ (chéo trên-trái / trên-phải, xa ~78 px),
//    rồi bám theo chiến cơ hơi trễ. Chỉ cần nhích nhẹ là nhặt được (nam châm gốc 70 px).
//  • Nhiều buff cùng lúc chia 6 chỗ đậu khác nhau để không chồng lên nhau (V53: chỗ thứ 6 dời sang trên-phải (120,−95) để bên trái đỡ chen; không đặt chỗ dưới chiến cơ vì buff bay xuyên qua chiến cơ sẽ bị nhặt ngoài ý muốn).
//  • V52: buff đã đậu không vẽ cột sáng; đạn địch trong 46 px → buff mờ còn 40%.
//  • Sao điểm giữ nguyên cách rơi cũ. Mảnh chiến cơ (craft) cũng trôi về như buff.
// (V66.1: thay kiểu trôi về chỗ đậu bằng kiểu NẢY khắp màn — xem step())
const Drift51=(()=>{
 const POP=.45,MAXV=420,SLOTS=[[-55,-55],[55,-55],[-92,-12],[92,-12],[0,-84],[120,-95]];
 let rot=0;
 function slotOf(d){if(d.slot51===undefined){const used=new Set();for(const o of drops)if(!o.dead&&o!==d&&o.slot51!==undefined)used.add(o.slot51);
   let k=0;for(;k<SLOTS.length;k++){const j=(rot+k)%SLOTS.length;if(!used.has(j)){d.slot51=j;break;}}if(d.slot51===undefined)d.slot51=rot%SLOTS.length;rot++;}
  return SLOTS[d.slot51];}
 function target(d){const [ox,oy]=slotOf(d);let x=player.x+ox,y=player.y+oy;
  // chiến cơ sát mép → lật chỗ đậu sang phía còn trống
  if(x<26||x>W-26)x=player.x-ox;x=Math.max(26,Math.min(W-26,x));y=Math.max(H*.3,Math.min(H-40,y));return [x,y];}
 // V66.1 (người dùng): buff KHÔNG hút về chiến cơ nữa. Sau khi bật ra, buff bay thẳng và NẢY khi chạm mép màn hình,
 //  đi khắp bản đồ cho tới hết thời gian (12 s, nhấp nháy ở cuối). Vùng nảy chừa thanh trên và hàng nút dưới.
 //  Vẫn nhặt khi chạm, nam châm gốc 70 px (+ trang bị nam châm) và buff NAM CHÂM vẫn hút như cũ.
 //  Mảnh chiến cơ (craft) nảy 14 s rồi rơi ra khỏi đáy màn.
 const SPEED=125,TOP=78,BOT=150;
 function step(d,dt){
  if(d.t<POP){if(d.vy===undefined)d.vy=0;if(d.vx===undefined)d.vx=0;d.vy+=(40-d.vy)*Math.min(1,dt*3);d.vx*=Math.exp(-dt*2);d.x+=d.vx*dt;d.y+=d.vy*dt;return;}
  if(!d.b66){d.b66=1;const a=(Math.random()<.5?1:-1)*(.35+Math.random()*.8)+Math.PI/2*(Math.random()<.7?1:-1);const sp=SPEED*(.85+Math.random()*.3);d.vx=Math.cos(a)*sp;d.vy=Math.sin(a)*sp;if(Math.abs(d.vx)<35)d.vx=(d.vx<0?-1:1)*35;}
  const leaving=d.type==='craft'&&d.t>14;
  // giữ tốc độ đều (sau khi nam châm kéo lệch)
  const v=Math.hypot(d.vx,d.vy)||1,want=leaving?160:SPEED;d.vx*=1+(want/v-1)*Math.min(1,dt*2);d.vy*=1+(want/v-1)*Math.min(1,dt*2);if(leaving)d.vy=Math.max(d.vy,120);
  d.x+=d.vx*dt;d.y+=d.vy*dt;
  if(d.x<22){d.x=22;d.vx=Math.abs(d.vx);}if(d.x>W-22){d.x=W-22;d.vx=-Math.abs(d.vx);}
  if(d.y<TOP){d.y=TOP;d.vy=Math.abs(d.vy);}
  if(!leaving&&d.y>H-BOT){d.y=H-BOT;d.vy=-Math.abs(d.vy);}
  if(leaving&&d.y>H+40)d.dead=true;
  d.park51=true;  // không vẽ cột sáng khi đang bay nảy
  let near=false;try{for(const b of bullets){if(!b.dead&&Math.abs(b.x-d.x)<46&&Math.abs(b.y-d.y)<46){near=true;break;}}}catch{}
  /* V78.4 (người dùng): buff không mờ/nhấp nháy khi có đạn gần */d.fade51=1;}
 return {step,slots:SLOTS};
})();
