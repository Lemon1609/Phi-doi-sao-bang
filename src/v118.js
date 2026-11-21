// V118 · Bộ vẽ chiến cơ "sạch" cho tàu đã thiết kế lại (SHIP118)
//  Chủ dự án: "hiệu ứng hình ảnh, cánh, đạn trong game chưa đẹp" → tàu có tranh mới thì KHÔNG vẽ các lớp code cũ của Bạo Tẩu
//  (cánh hoa, tia, cột sáng, quầng, hào quang, cánh vàng FX16, hào quang bậc). Tranh _bt của GPT đã có cánh xòe.
//  Còn lại: chuyển mượt thường → Bạo Tẩu 0,22 s, chớp biến hình 0,3 s, 1 quầng màu mềm sau lưng tàu. Tắt: window.FX118=false
(()=>{
  if(window.FX118===false||typeof SHIP118==='undefined')return;
  const has=id=>Number.isInteger(id)&&!!SHIP118[id];
  const st={id:-1,on:false,tOn:-9,tOff:-9,b:0,last:-1,bank:0,px:null};
  const mk=(w,h)=>{const c=document.createElement('canvas');c.width=Math.max(1,Math.ceil(w));c.height=Math.max(1,Math.ceil(h));return c;};
  const SIL=new Map(),GLOW=new Map();
  function sil(a,cell,cw,ch){const k=cell+'|'+cw;let c=SIL.get(a);if(!c||c.k!==k||c.src!==a){c=mk(cw/2,ch/2);const g=c.getContext('2d');g.drawImage(a,cell%5*cw,Math.floor(cell/5)*ch,cw,ch,0,0,c.width,c.height);g.globalCompositeOperation='source-in';g.fillStyle='#fff';g.fillRect(0,0,c.width,c.height);c.k=k;c.src=a;SIL.set(a,c);}return c;}
  function glow(col){let c=GLOW.get(col);if(c)return c;c=mk(128,128);const g=c.getContext('2d'),r=g.createRadialGradient(64,64,0,64,64,64);r.addColorStop(0,col+'aa');r.addColorStop(.45,col+'44');r.addColorStop(1,col+'00');g.fillStyle=r;g.fillRect(0,0,128,128);GLOW.set(col,c);return c;}
  function colorOf(id){try{const c=Fighters28.profiles[id].color;if(/^#[0-9a-f]{6}$/i.test(c))return c;}catch{}return '#9fd8ff';}
  function draw(id,rot){
    let a;try{a=Evo53.hull(id);}catch{return false;}if(!a||!(a.naturalWidth||a.width))return false;
    const now=(typeof time==='number'?time:performance.now()/1000);if(st.id!==id){st.id=id;st.b=0;st.on=false;st.last=-1;st.px=null;}
    const dt=st.last<0?0:Math.max(0,Math.min(.1,now-st.last));st.last=now;
    let on=false,force=false;try{on=superTime>0;force=power>=5||!!Combat26.state().skill;}catch{}
    if(on&&!st.on)st.tOn=now;if(!on&&st.on)st.tOff=now;st.on=on;
    const tgt=(on||force)?1:0;st.b+=(tgt-st.b)*Math.min(1,dt/.22*2.2);
    // nghiêng nhẹ theo hướng bay
    try{if(st.px===null)st.px=player.x;const vx=dt>0?(player.x-st.px)/dt:0;st.px=player.x;{const B9=window.BANK309!==false,M=B9?.15:.22;st.bank+=((Math.max(-M,Math.min(M,-vx/(B9?1100:1400))))-st.bank)*Math.min(1,dt*(B9?8:10));}}catch{}
    const W0=a.naturalWidth||a.width,H0=a.naturalHeight||a.height,cw=W0/5,ch=H0/4,size=(76+12*st.b)*1.4,hs=(()=>{try{return window.BtFx218&&BtFx218.scale?BtFx218.scale(id,a):1;}catch{return 1;}})(),hsB=(()=>{try{return window.BtFx218&&BtFx218.scaleBT?BtFx218.scaleBT(id,a):hs;}catch{return hs;}})(),x=player.x,y=player.y;
    const q=(()=>{try{return VisualFX.reduced();}catch{return false;}})(),lite=(()=>{try{return VisualFX.counts().quality==='light';}catch{return false;}})();
    const lift=(()=>{try{return on&&window.BtFx218&&BtFx218.lift?BtFx218.lift(id,a,now-st.tOn,size):0;}catch{return 0;}})();/* V233: tàu lấy đà trước khi bung (học từ video) */
    ctx.save();ctx.translate(x,y+lift);
    // quầng màu mềm sau lưng khi Bạo Tẩu
    if(on&&!q){const al=.32*st.b*(lite?.8:1)*(.85+.15*Math.sin(now*3.1)),R=size*.62;ctx.globalCompositeOperation='lighter';ctx.globalAlpha=al;ctx.drawImage(glow(colorOf(id)),-R,-R-4,R*2,R*2);ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';}
    ctx.rotate((rot||0)*.6+st.bank);if(window.BANK309!==false)ctx.scale(1-Math.min(.12,Math.abs(st.bank)*.8),1);/* V309: lách trái/phải co scaleX tới .88 (Gemini Lượt 2). Tắt: window.BANK309=false */
    const cellN=id%10,cellB=id%10+10,u=st.b,B218=(!q&&window.BtFx218)||null;
    if(B218)try{B218.back(ctx,a,cellB,cw,ch,size,on,now,now-st.tOn,id,lite);}catch{}/* V218: ánh sáng + lửa (mảnh rời GPT) sau thân */
    const put=(cell,al)=>{if(al<=.01)return;const h=cell>=10?hsB:hs;ctx.globalAlpha=al;if(window.WING10&&window.ANIM10!==false&&!q)WING10.put(ctx,a,cell%5*cw,Math.floor(cell/5)*ch,cw,ch,-size*h/2,-size*h/2,size*h,size*h,u,id);else ctx.drawImage(a,cell%5*cw,Math.floor(cell/5)*ch,cw,ch,-size*h/2,-size*h/2,size*h,size*h);};/* V309 Lượt 10: cánh dập dờn 3 mảnh (a10309.js, tắt window.ANIM10=false) *//* V240: ô Bạo Tẩu vẽ to 1/q *//* V233B: hs = cỡ thân riêng từng bậc */
    if(u<.02)put(cellN,1);else if(u>.98)put(cellB,1);else{put(cellN,1-u);put(cellB,u);}
    ctx.globalAlpha=1;try{if(window.WING10&&window.ANIM10!==false&&!q)WING10.fx(ctx,size*(u>.5?hsB:hs),u,id);}catch{}
    // chớp biến hình 0,3 s khi vừa vào Bạo Tẩu
    const ft=now-st.tOn;if(ft>=0&&ft<.3&&!q){ctx.globalCompositeOperation='lighter';ctx.globalAlpha=(1-ft/.3)*.65;const s=sil(a,cellB,cw,ch),k=(1+.1*(ft/.3))*hsB;ctx.drawImage(s,-size*k/2,-size*k/2,size*k,size*k);ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';}
    if(B218)try{B218.front(ctx,a,cellB,cw,ch,size,on,now,now-st.tOn,id,lite);}catch{}/* V218: sét + lấp lánh trước thân */
    ctx.restore();return true;}
  function install(){try{if(SuperGame.__c118)return;const o=SuperGame.drawShip;SuperGame.drawShip=function(id,rot){window.__clean118=false;try{if(has(id)){window.__clean118=true;if((id<=9||(window.ART239!==false&&id<=12&&window.BtFx218&&BtFx218.has&&BtFx218.has(id)))&&draw(id,rot))return true;}}catch{}return o.apply(this,arguments);};SuperGame.__c118=1;}catch{}}
  setTimeout(install,0);
  window.V118={state:()=>({...st,clean:!!window.__clean118})};
})();
