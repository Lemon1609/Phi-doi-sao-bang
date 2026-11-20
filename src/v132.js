// V132 · cánh chiến giáp hợp thể SSS (tranh GPT CANH_HOP): bung khi biến hình, vỗ nhẹ, lớp sáng nhấp nháy, hạt lấp lánh
//  Tắt: window.WING132=false (khi tắt, game dùng lại cánh vẽ bằng code)
(()=>{
  if(typeof CANH132_ART==='undefined')return;
  const IM={};function art(k){let im=IM[k];if(!im){if(!CANH132_ART[k])return null;im=new Image();im.src=CANH132_ART[k];IM[k]=im;}return im.complete&&im.naturalWidth?im:null;}
  const SP=[];let lastT=0;
  function star(g,x,y,r,a){g.save();g.translate(x,y);g.rotate(a);g.beginPath();g.moveTo(0,-r);g.lineTo(r*.22,-r*.22);g.lineTo(r,0);g.lineTo(r*.22,r*.22);g.lineTo(0,r);g.lineTo(-r*.22,r*.22);g.lineTo(-r,0);g.lineTo(-r*.22,-r*.22);g.closePath();g.fill();g.restore();}
  window.__wing132=function(g,i,x,y,S,bloom,phase,t){
    if(window.WING309!==true)return;/* V309: robot cơ khí mới đã có cánh trong tranh → bỏ lớp cánh chiến giáp cũ (bật lại: window.WING309=true) */
    if(window.WING132===false||!(bloom>.02))return;const im=art('canh_hop'+(i+1)),gl=art('canh_hop'+(i+1)+'_sang');if(!im)return;
    const lite=(()=>{try{return VisualFX.counts().quality==='light';}catch{return false;}})(),quiet=(()=>{try{return VisualFX.reduced();}catch{return false;}})();
    // bung: 0 → 1 theo bloom, vượt nhẹ rồi về
    const b=Math.min(1,bloom),open=b<1?(1-Math.pow(1-b,3))*(1+.08*Math.sin(b*Math.PI)):1;
    const k=.236*(S/.54)*open,ax=x,ay=y,fw=im.naturalWidth/1024,ph=quiet?0:Math.sin(t*2*Math.PI/1.1);
    const ang=(4*Math.PI/180)*ph*(open),sx=1+.05*ph;
    g.save();
    for(const side of [-1,1]){
      for(const [src,mode,al] of [[im,'source-over',.97],[gl,'lighter',lite?.35:(.4+.3*(.5+.5*Math.sin(t*5.3)))]]){
        if(!src)continue;const f=src.naturalWidth/1024;g.save();g.globalCompositeOperation=mode;g.globalAlpha=al*Math.min(1,b*1.6);g.translate(ax,ay);g.rotate(side*-ang);g.scale(sx*k,k*(1-.04*ph));
        // nửa trái: cột 0..512 · nửa phải: 512..1024 · neo (512,300)
        const x0=side<0?0:512;g.drawImage(src,x0*f,0,512*f,640*f,x0-512,-300,512,640);g.restore();}
    }
    // hạt lấp lánh trên mép cánh
    if(!quiet&&b>.6){const dt=Math.max(0,Math.min(.05,t-lastT));lastT=t;const cap=lite?10:22;
      if(SP.length<cap&&Math.random()<(lite?.35:.7)){const sd=Math.random()<.5?-1:1,u=.25+Math.random()*.75;SP.push({dx:sd*u*470,dy:-60-Math.random()*170+u*120,t:0,life:.35+Math.random()*.45,r:5+Math.random()*8,a:Math.random()});}
      g.globalCompositeOperation='lighter';
      for(let n=SP.length-1;n>=0;n--){const p=SP[n];p.t+=dt;if(p.t>p.life){SP.splice(n,1);continue;}const v=p.t/p.life,al=Math.sin(v*Math.PI);g.globalAlpha=al*.95;g.fillStyle=n%3?'#ffffff':'#fff4c2';star(g,ax+p.dx*k,ay+p.dy*k,p.r*(.6+.6*al)*(S/.54),p.a);}}
    g.restore();};
})();
