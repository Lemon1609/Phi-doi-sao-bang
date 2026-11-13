// V264 · Trang bị tỏa màu riêng lúc Bạo Tẩu (chủ dự án 13/11 14:32: "tùy từng bậc tàu, màu tàu, trang bị mà cánh bung, hiệu ứng sẽ có màu riêng";
//  trước đó: "tàu có màu riêng, trang bị màu riêng… màu sẽ tỏa ra dưới trang bị, tàu"; vũ khí và giáp không cần).
//  Dưới mỗi tàu con (sidearm) lúc Bạo Tẩu: quầng sáng + cặp lưỡi neon nhỏ (vẽ bằng mã, cộng sáng) màu của chính trang bị (spec.color).
//  Phẩm chất trang bị cao hơn → nhiều lưỡi hơn, thêm nét neon thứ hai, sáng hơn. Bung ra 0,25 s, thở nhẹ, tắt dần 0,3 s.
//  Tắt: window.EQGLOW264=false
(function(){
  const T={};let lastOn=0;
  const hex=c=>{c=String(c||'#9fe8ff').replace('#','');if(c.length===3)c=c.split('').map(x=>x+x).join('');const n=parseInt(c,16)||0;return [(n>>16)&255,(n>>8)&255,n&255];};
  const rgba=(c,a)=>'rgba('+c[0]+','+c[1]+','+c[2]+','+a.toFixed(3)+')';
  const mix=(c,w)=>c.map(v=>Math.round(v+(255-v)*w));
  function gradeOf(item){try{return Math.max(0,Workshop.index(item.grade)|0);}catch{}return Math.max(0,(item&&item.spec&&item.spec.rank)|0);}
  function blade(g,len,wid,bend){g.beginPath();g.moveTo(0,0);g.quadraticCurveTo(wid*1.1,-len*.45,bend*len,-len);g.quadraticCurveTo(wid*.15,-len*.5,-wid*.25,-len*.08);g.closePath();}
  function under(g,item,pod,size){
    if(window.EQGLOW264===false||!item||!pod)return;
    let st=0;try{st=superTime;}catch{}
    const now=performance.now()/1000,key=(item.id||item.variant||'x')+':'+(()=>{try{return pod.x<player.x?'L':'R';}catch{return pod.x<240?'L':'R';}})();
    const s=T[key]||(T[key]={v:0,t0:0,last:now});const dt=Math.min(.1,Math.max(0,now-s.last));s.last=now;
    const want=st>0?1:0;if(want&&!s.v)s.t0=now;
    s.v+=((want?1:0)-s.v)*Math.min(1,dt*(want?12:9));if(s.v<0.01){s.v=0;return;}
    const c=hex(item.spec&&item.spec.color),hi=mix(c,.55),gr=gradeOf(item),k=Math.min(1,(now-s.t0)/0.25),grow=.55+.45*(1-(1-k)*(1-k));
    const br=(.55+Math.min(5,gr)*.09)*s.v,pul=1+.06*Math.sin(now*6.2+pod.x*.05),R=size*1.25*grow*pul;
    g.save();g.globalCompositeOperation='lighter';g.translate(pod.x,pod.y);
    // quầng sáng dưới trang bị
    const rg=g.createRadialGradient(0,size*.08,0,0,size*.08,R);rg.addColorStop(0,rgba(hi,.55*br));rg.addColorStop(.45,rgba(c,.28*br));rg.addColorStop(1,rgba(c,0));
    g.fillStyle=rg;g.beginPath();g.arc(0,size*.08,R,0,Math.PI*2);g.fill();
    // cặp lưỡi neon xòe ra hai bên, xuôi về sau (không khép kín quanh trang bị)
    const n=gr>=4?3:gr>=2?2:1,len=size*(.95+gr*.08)*grow*pul,wid=size*.22;
    for(const sd of [-1,1])for(let j=0;j<n;j++){
      g.save();g.scale(sd,1);g.rotate(Math.PI*(.62+j*.11));blade(g,len*(1-j*.16),wid*(1-j*.12),.18);
      const lg=g.createLinearGradient(0,0,0,-len);lg.addColorStop(0,rgba(hi,.75*br));lg.addColorStop(.5,rgba(c,.42*br));lg.addColorStop(1,rgba(c,0));
      g.fillStyle=lg;g.fill();g.lineWidth=1.4;g.strokeStyle=rgba(hi,.9*br);g.stroke();
      if(gr>=3){g.scale(.72,.86);blade(g,len*(1-j*.16),wid*(1-j*.12),.18);g.lineWidth=1;g.strokeStyle=rgba([255,255,255],.55*br);g.stroke();}
      g.restore();}
    g.restore();lastOn=now;}
  window.EqGlow264={under,state:T};
})();
