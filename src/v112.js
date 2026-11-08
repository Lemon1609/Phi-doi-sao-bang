// V112 · hiệu ứng trúng boss gọn lại: mỗi viên đạn trúng boss trước đây tạo 1 chớp sáng (×1,7 khi siêu cấp) + nổ + vòng bán kính 40
//  (~250 hiệu ứng/giây chồng lên nhau thành quầng trắng + nhiều vòng cam). Nay quanh boss: tối đa 1 chớp nhỏ mỗi 0,09 s, không vòng, không nổ phụ.
(()=>{
  const near=(x,y)=>{try{if(!boss||boss.dead)return false;if(Math.hypot(x-boss.x,y-boss.y)<170)return true;for(const p of boss.parts||[])if(!p.dead&&Math.hypot(x-p.x,y-p.y)<90)return true;}catch{}return false;};
  let last=-1;const now=()=>performance.now();
  function install(){try{const V=VisualFX;if(V.__v112)return;V.__v112=1;
    const oi=V.impact,oe=V.explode,orr=V.ringA;
    V.impact=function(x,y,c,s){if(window.HIT112!==false&&near(x,y)){const t=now();if(t-last<90)return;last=t;return oi.call(this,x,y,c,Math.min(.55,(s==null?1:s)*.5));}return oi.apply(this,arguments);};
    V.explode=function(x,y,s,kind){if(window.HIT112!==false&&kind!=='boss'&&(s==null||s<.9)&&near(x,y)&&!(typeof boss!=='undefined'&&boss&&boss.dead))return;return oe.apply(this,arguments);};
    V.ringA=function(x,y,c,r){if(window.HIT112!==false&&near(x,y)&&(r||10)<=60)return;return orr.apply(this,arguments);};}catch(e){console.warn('V112',e);}}
  setTimeout(install,0);
})();
