'use strict';
// V47 · Thanh máu boss gọn trên đầu boss (thay bảng to ở đầu màn).
//  • Đọc boss.hp/boss.max như #bossbar cũ; số "ống máu" giữ nguyên (6, boss lớn 20) → hiện "×N".
//  • Bảng #bossbar vẫn chạy ngầm (ẩn bằng CSS) để không đụng logic cũ.
//  • Vẽ trên lớp VisualFX.draw (sau cảnh trận), chỉ khi đang có boss.
(()=>{
 const TUBE=['#ff5a6e','#ffb347','#ffe066','#7dff8a','#4fd8ff','#a98bff'];
 let lastHp=null,trail=1,owner=null,born=0;
 const rr=(g,x,y,w,h,r)=>{g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath();};
 // V209 · G3 (GPT): tên 15 px trắng ngà trên nền xanh đen, thanh 10 px rãnh #132232, máu lõi lam #4DB8FF, ô cánh tím lam #A68AFF (không đỏ/hồng). Tắt: window.G3_209=false
 const G3={name:'#F2F7FF',panel:'rgba(7,23,38,.9)',track:'#132232',core:'#4DB8FF',coreDim:'#245d86',wing:'#A68AFF'};
 function bar(){const b=boss;if(!b||b.dead||!(b.max>0))return;const V=window.G3_209!==false;
  if(owner!==b){owner=b;trail=1;born=time;}
  const N=b.major36?20:6,f=Math.max(0,Math.min(1,b.hp/b.max)),left=Math.max(1,Math.ceil(f*N-1e-6)),inTube=f<=0?0:f*N-(left-1);
  const col=V?((left-1)%2?'#7ccbff':G3.core):TUBE[(left-1)%TUBE.length],nxt=left>1?(V?((left-2)%2?'#3a87bd':G3.coreDim):TUBE[(left-2)%TUBE.length]):(V?G3.track:'#0a0f1c');
  trail+= (inTube-trail)*.08;if(inTube>trail)trail=inTube;
  const w=V?150:124,h=V?10:7,x=Math.max(8,Math.min(W-w-38,b.x-w/2)),y=Math.max(V?96:84,b.y-(b.major36?92:58));
  const g=ctx;g.save();g.globalAlpha=1;g.globalCompositeOperation='source-over';g.shadowBlur=0;
  rr(g,x-2,y-2,w+4,h+4,4);g.fillStyle=V?G3.panel:'rgba(4,7,16,.82)';g.fill();g.strokeStyle=V?'rgba(166,205,255,.45)':'rgba(255,255,255,.35)';g.lineWidth=1;g.stroke();
  rr(g,x,y,w,h,3);g.save();g.clip();g.fillStyle=nxt;g.fillRect(x,y,w,h);
  g.fillStyle='rgba(255,255,255,.7)';g.fillRect(x,y,w*trail,h);
  const lg=g.createLinearGradient(0,y,0,y+h);lg.addColorStop(0,'#ffffffaa');lg.addColorStop(.45,col);lg.addColorStop(1,col);g.fillStyle=lg;g.fillRect(x,y,w*inTube,h);g.restore();
  g.font="800 "+(V?12:11)+"px 'Be Vietnam Pro',Neo,sans-serif";g.textAlign='left';g.textBaseline='middle';g.lineWidth=3;g.strokeStyle='#04070e';
  const cnt='×'+left;g.strokeText(cnt,x+w+6,y+h/2);g.fillStyle='#fff';g.fillText(cnt,x+w+6,y+h/2);
  const parts=b.parts||[];for(let i=0;i<parts.length;i++){const px=x+7+i*12,py=y-(V?8:7),z=V?4:3;g.save();g.translate(px,py);g.rotate(Math.PI/4);g.fillStyle=parts[i].dead?'#4b5563':(V?G3.wing:'#ffd27a');g.fillRect(-z,-z,2*z,2*z);if(V){g.strokeStyle='#04070e';g.lineWidth=1;g.strokeRect(-z,-z,2*z,2*z);}g.restore();}
  // V66.6: luôn ghi CẤP + tên boss (3 giây đầu sáng rõ, sau đó mờ nhẹ)
  {const age=time-born,nm=(document.getElementById('bossname')||{}).textContent||'';let lv=level;try{if(Dungeons.active())lv=20+Dungeons.bossIndex()*20;}catch{}const tag='LV.'+lv+(nm?' · '+nm:'');
   g.globalAlpha=age<3?1:.88;g.textAlign='center';
   if(V){let fs=15,tag2=tag;const maxW=W-24,fit=(t,lo)=>{for(fs=15;fs>lo;fs--){g.font="700 "+fs+"px 'Be Vietnam Pro',Neo,sans-serif";if(g.measureText(t).width<=maxW)return true;}g.font="700 "+fs+"px 'Be Vietnam Pro',Neo,sans-serif";return false;};
    // V211 (GPT): quá dài ở 13 px → bỏ phần khu vực sau dấu "·" cuối, giữ cấp · loại boss · tên chính; vẫn dài mới thu tới 11 px
    if(!fit(tag2,13)){const k=tag2.lastIndexOf(' · ');if(k>0&&tag2.split(' · ').length>3)tag2=tag2.slice(0,k);fit(tag2,11);}
    const tw=Math.min(maxW,g.measureText(tag2).width),cx=Math.max(12+tw/2,Math.min(W-12-tw/2,x+w/2)),ty=y-(parts.length?24:18);
    rr(g,cx-tw/2-8,ty-fs/2-4,tw+16,fs+8,4);g.fillStyle=G3.panel;g.fill();g.strokeStyle='rgba(166,205,255,.3)';g.lineWidth=1;g.stroke();
    g.shadowColor='rgba(0,0,0,.9)';g.shadowBlur=2;g.shadowOffsetY=1;g.fillStyle=G3.name;g.fillText(tag2,cx,ty+.5);g.shadowBlur=0;g.shadowOffsetY=0;}
   else{g.font="800 10px 'Be Vietnam Pro',Neo,sans-serif";const cx=x+w/2;g.strokeText(tag,cx,y-16);g.fillStyle=b.major36?'#ffb3a1':'#ffe2d6';g.fillText(tag,cx,y-16);}}
  g.restore();}
 const ov=VisualFX.draw;VisualFX.draw=function(){const v=ov.apply(this,arguments);try{if(mode==='play'||mode==='pause')bar();}catch(e){}return v;};
 window.Play47={bar};
})();
