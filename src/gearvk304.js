// V304 · Hình đạn trang bị mới (Gemini, trắng/xám) cho 13 tên lửa + 3 vũ khí phụ.
// Chỉ đổi hình; đường bay, sát thương, kỹ năng giữ nguyên. Màu = màu riêng của trang bị (GearCatalog.color).
// Cỡ gốc GEAR_FX vẽ tên lửa 18×48 px (quá nhỏ so với đạn tàu 40–78 px) → tự vẽ lại to hơn, đúng tỉ lệ tranh, có quầng màu.
// Tắt: window.GEARVK304=false (trước khi vào trận).
(function(){
  const D=window.GEARVK304_IMG||{},IM={};for(const k in D){const im=new Image();im.src=D[k][0];IM[k]={im,n:D[k][1]};}
  const MIS={inferno:'tl_01_hoa_nguc',cryo:'tl_02_han_suong',thunder:'tl_03_loi_kich',singularity:'tl_04_ngu_loi',spiral:'tl_05_xoan_oc',stellar:'tl_06_thien_tinh',
    comet36:'tl_07_thien_kiem',nova36:'tl_08_diet_tinh',judgement36:'tl_09_phan_quyet',swarm9:'tl_10_bay_dan',devour10_m:'tl_11_huyet_tinh',chrono11_m:'tl_12_qua_khu',monarch12_m:'tl_13_tram_khong'};
  const SIDE={disc:'vp_nguyet_nhan',lance36:'vp_quang_thuong',chrono11_s:'vp_dong_ho_cat'};
  const SZ={mis:[58,70],side:[40,52]};               // chiều dài vẽ (thường, siêu)
  const ok=o=>o&&o.im.complete&&o.im.naturalWidth;
  const CACHE={};
  function frames(id,k,metal){const key=id;if(CACHE[key])return CACHE[key];const o=IM[k];if(!ok(o))return null;
    const cat=typeof GearCatalog!=='undefined'?GearCatalog:{},col=(cat[id]&&cat[id].color)||'#ffffff';
    const fw=o.im.naturalWidth/o.n,fh=o.im.naturalHeight,out=[];
    for(let i=0;i<o.n;i++){const t=document.createElement('canvas');t.width=fw;t.height=fh;const q=t.getContext('2d');q.drawImage(o.im,i*fw,0,fw,fh,0,0,fw,fh);
      if(metal){q.globalCompositeOperation='source-atop';q.globalAlpha=.38;q.fillStyle=col;q.fillRect(0,0,fw,fh);}   // thân kim loại giữ chi tiết, ánh màu trang bị
      else{q.globalCompositeOperation='multiply';q.fillStyle=col;q.fillRect(0,0,fw,fh);q.globalCompositeOperation='destination-in';q.drawImage(o.im,i*fw,0,fw,fh,0,0,fw,fh);}
      out.push(t);}
    // màu danh mục có thể là #rgb / tên màu → đổi về r,g,b để ghép độ trong suốt an toàn
    const z=document.createElement('canvas').getContext('2d');z.fillStyle='#ffffff';z.fillStyle=col;z.fillRect(0,0,1,1);const [r,g,b]=z.getImageData(0,0,1,1).data;
    return CACHE[key]={f:out,ar:fw/fh,col,g0:`rgba(${r},${g},${b},.4)`,g1:`rgba(${r},${g},${b},0)`};}
  const ST=[];
  function draw(c,st){for(const b of st.pool){if(!b.on||(b.type!=='shot'&&b.type!=='return'))continue;
      const mis=!!MIS[b.id],k=MIS[b.id]||SIDE[b.id];if(!k)continue;const F=frames(b.id,k,mis);if(!F)continue;
      put(c,b,F,mis);}}
  function hook(){if(typeof GEAR_FX==='undefined'||GEAR_FX.__vk304)return false;
    const oc=GEAR_FX.create,od=GEAR_FX.draw;
    GEAR_FX.create=function(){const st=oc.apply(this,arguments);try{ST.push(st);if(ST.length>12)ST.shift();}catch{}return st;};
    GEAR_FX.draw=function(c,st,layer){
      if(window.GEARVK304===false||layer!=='projectiles'||!st||!st.assets||!(MIS[st.id]||SIDE[st.id]))return od.apply(this,arguments);
      const A=st.assets,ks=[st.id+'_projectile_normal',st.id+'_projectile_super'],bak=ks.map(x=>A[x]);
      if(!frames(st.id,MIS[st.id]||SIDE[st.id],!!MIS[st.id]))return od.apply(this,arguments);   // tranh chưa nạp → vẽ hình cũ
      ks.forEach(x=>A[x]=null);let r;try{r=od.apply(this,arguments);}finally{ks.forEach((x,i)=>A[x]=bak[i]);}
      try{draw(c,st);}catch{}return r;};
    GEAR_FX.__vk304=1;return true;}
  if(!hook()){const t=setInterval(()=>{if(hook())clearInterval(t);},200);}
  // Bộ 9 / 36 / 10–12 không chạy qua GEAR_FX: là đạn thường (shots, có gearItem) do art82 vẽ qua Equipment25.drawShot → bọc ngoài cùng.
  function one(s,c0){if(window.GEARVK304===false||!s||!s.gearItem)return false;const v=s.gearItem.variant,mis=!!MIS[v],k=MIS[v]||SIDE[v];if(!k)return false;
    try{if(typeof Gear44!=='undefined'&&Gear44.activeId(s.gearItem.kind)!==v)return false;}catch{}   // đang lắp SSS → giữ hình SSS
    const F=frames(v,k,mis);if(!F)return false;const b={x:s.x,y:s.y,vx:s.vx||0,vy:s.vy||-1,age:s.age||0,id:v,variant:(s.superShot||(typeof superTime!=='undefined'&&superTime>0))?'super':'normal'};
    put(c0||ctx,b,F,mis);return true;}
  function put(c,b,F,mis){const L=(mis?SZ.mis:SZ.side)[b.variant==='super'?1:0],W=L*F.ar,ang=Math.atan2(b.vy,b.vx)+Math.PI/2,im=F.f[Math.floor(b.age*8)%F.f.length],oy=mis?L*.18:0;
    c.save();try{c.translate(b.x,b.y);c.rotate(mis?ang:ang+b.age*(b.id==='disc'?9:0));
    c.globalCompositeOperation='lighter';const r=Math.max(W,L*.5),g=c.createRadialGradient(0,oy,0,0,oy,r*.75);
    g.addColorStop(0,F.g0);g.addColorStop(1,F.g1);c.fillStyle=g;c.fillRect(-r,-r+oy,r*2,r*2);
    c.globalCompositeOperation='source-over';c.drawImage(im,-W/2,-L/2,W,L);}finally{c.restore();}}
  function wrapShot(){try{const o=Equipment25.drawShot;if(!o||o.__vk304)return;const f=function(s){try{if(one(s))return true;}catch{}return o.apply(this,arguments);};f.__vk304=1;Equipment25.drawShot=f;}catch{}}
  function wrapF(){try{const o=Fighters28.draw;if(!o||o.__vk304)return;const f=function(c,s){try{if(s&&s.gearItem&&one(s,c))return true;}catch{}return o.apply(this,arguments);};f.__vk304=1;Fighters28.draw=f;}catch{}}   // Fighters28.draw chạy trước drawShot
  [400,1800,4000].forEach(t=>setTimeout(()=>{wrapShot();wrapF();},t));   // sau các lần art82 tự cài (0 / 300 / 1600 ms)
  // Bộ 36 (Thiên Kiếm / Diệt Tinh / Phán Quyết) bắn qua skill81: đọc GEAR44_ASSETS[id_projectile_*] (dải 4 khung, cỡ vẽ 40–66 px) → thay ảnh nguồn.
  const SK=['comet36','nova36','judgement36'];
  function strip(){if(window.GEARVK304===false||typeof GEAR44_ASSETS==='undefined')return;
    for(const id of SK){const F=frames(id,MIS[id],true);if(!F){setTimeout(strip,300);return;}
      const fh=96,fw=Math.round(fh*F.ar),c=document.createElement('canvas');c.width=fw*4;c.height=fh;const g=c.getContext('2d');
      for(let i=0;i<4;i++)g.drawImage(F.f[i%F.f.length],i*fw,0,fw,fh);
      const u=c.toDataURL('image/png');GEAR44_ASSETS[id+'_projectile_normal']=u;GEAR44_ASSETS[id+'_projectile_super']=u;}}
  setTimeout(strip,500);
  window.GearVK304={MIS,SIDE,SZ,ST,one,frames};
})();
