# V2.4-A · các thay chuỗi trên mã GỐC (base V42 + khối đã ghép) và chèn mô-đun V2.4.
#  build74_mau.py gọi apply_build(rep, h) ngay trước khi ghi tệp; bản vá nhanh HTML đã dựng: python3 claude_tools/v24_rep.py <vào> <ra>
#  (bản vá nhanh áp thêm SRC_PAIRS = các sửa đã nằm sẵn trong src/*.js để khỏi dựng lại 20 phút).
import sys,os,json
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def rd(p):return open(os.path.join(ROOT,p),encoding='utf-8').read()
BASE_PAIRS=[
 # NEN24: số khung + cờ nền đục; bỏ màu nền ải và hào quang gradient khi PKC26 phủ kín
 ("ctx.save();ctx.fillStyle=mission.bg;ctx.fillRect(0,0,W,H);if(slowTime>0){ctx.fillStyle='#7845af22';ctx.fillRect(0,0,W,H);}",
  "window.__f24=(window.__f24|0)+1;const n24=window.PERF24!==false&&typeof N24F==='function'&&N24F();window.__n24=n24;ctx.save();if(!n24){ctx.fillStyle=mission.bg;ctx.fillRect(0,0,W,H);if(slowTime>0){ctx.fillStyle='#7845af22';ctx.fillRect(0,0,W,H);}}",1),
 ("const g=safeGrad(ctx,350,200,20,230,340,400);g.addColorStop(0,mission.glow);g.addColorStop(1,'#08142200');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);Report392.background();",
  "if(!n24){const g=safeGrad(ctx,350,200,20,230,340,400);g.addColorStop(0,mission.glow);g.addColorStop(1,'#08142200');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);}Report392.background();",1),
 ("ctx.save();ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);if(VisualFX.counts().quality==='high'&&!VisualFX.reduced()){ctx.strokeStyle=CHAPTERS36[index].glow;",
  "if(window.__n24)return;ctx.save();ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);if(VisualFX.counts().quality==='high'&&!VisualFX.reduced()){ctx.strokeStyle=CHAPTERS36[index].glow;",1),
 ("if(h1>0)ctx.drawImage(B,0,top,B.width,h1,0,0,B.width,h1);const h2=HH-h1;if(h2>0)ctx.drawImage(B,0,0,B.width,h2,0,h1,B.width,h2);}",
  "if(!window.__n24){if(h1>0)ctx.drawImage(B,0,top,B.width,h1,0,0,B.width,h1);const h2=HH-h1;if(h2>0)ctx.drawImage(B,0,0,B.width,h2,0,h1,B.width,h2);}}",1),
 # băng CẢNH BÁO: dùng lại pattern sọc (trước tạo mới 2 lần/khung) + chữ phát sáng dựng sẵn (trước shadowBlur 14 mỗi khung)
 ("const p=ctx.createPattern(stripe(),'repeat');ctx.translate(dir*off,yy);","const p=cache.pat||(cache.pat=ctx.createPattern(stripe(),'repeat'));ctx.translate(dir*off,yy);",1),
 ("ctx.shadowColor='#ff2a46';ctx.shadowBlur=14;ctx.fillText('⚠ CẢNH BÁO NGUY HIỂM ⚠',W/2,y-4);ctx.shadowBlur=0;",
  "if(window.PERF24!==false&&typeof WARN24==='function')WARN24(ctx,W/2,y-4);else{ctx.shadowColor='#ff2a46';ctx.shadowBlur=14;ctx.fillText('⚠ CẢNH BÁO NGUY HIỂM ⚠',W/2,y-4);ctx.shadowBlur=0;}",1),
 # BOSS24: boss chiếm 60–70 % bề ngang (lớn 300 px / 480 = 62,5 %, nhỏ 250 = 52 %); cánh phá được + vùng trúng tính theo cùng hệ số k nên khớp hình
 ("k=Math.min((b.major36?212:156)/bb.w,(b.major36?290:230)/bb.h);","k=window.BOSS24!==false?(window.BOSSXL24!==false&&window.V24C!==false?Math.min((b.major36?372:336)/bb.w,(b.major36?430:390)/bb.h):Math.min((b.major36?300:250)/bb.w,(b.major36?340:300)/bb.h)):Math.min((b.major36?212:156)/bb.w,(b.major36?290:230)/bb.h);",1),
 # DOM: 3 cặp ghi đè nhau mỗi khung (đo bằng ngăn xếp 28/11) → mỗi phần tử 1 chủ
 ("function robotHUD(){const box=$('robot-control');box.hidden=!activeRobot;if(!activeRobot){Rank36.hud();return;}",
  "function robotHUD(){const box=$('robot-control');if(!activeRobot){Rank36.hud();return;}box.hidden=false;",1),
 ("$('robot-skill-name').textContent=Campaign36.label(r)+' · XUNG HỘI TỤ';",
  "{const _n=$('robot-skill-name');if(!(_n.__v121>performance.now()-300))_n.textContent=Campaign36.label(r)+' · XUNG HỘI TỤ';}",1),
 ("cp.hidden=f>=1;q('.t7-sc').hidden=f<1;if(f<1){",
  "if(window.__h68t>performance.now()-300)f=2;else{cp.hidden=f>=1;q('.t7-sc').hidden=f<1;}if(f<1){",1),
 # vòng rAF xem trước SSS ở Sảnh: không đọc bố cục (offsetParent) khi đang trận
 ("last=ms;if(!cv||!cv.offsetParent||document.hidden||!im.complete)return;clock+=dt;",
  "last=ms;if((window.PERF24!==false&&typeof mode!=='undefined'&&(mode==='play'||mode==='pause'))||!cv||!cv.offsetParent||document.hidden||!im.complete)return;clock+=dt;",1),
]
SRC_PAIRS=[  # đã sửa trong src/*.js — chỉ dùng cho bản vá nhanh HTML
 (',w=wd21?L*(s.art28===11?.55:.8)*iw/Math.max(iw,ih):e21?h*iw/ih*1.15:h*iw/ih*(window.DAN309===false?1:(iw/ih<.22?1.9:1.4));',',w=(window.V24TW?V24TW(s,wd21):1)*(wd21?L*(s.art28===11?.55:.8)*iw/Math.max(iw,ih):e21?h*iw/ih*1.15:h*iw/ih*(window.DAN309===false?1:(iw/ih<.22?1.9:1.4)));',1),
 ("function codex(){if(!window.WING10)return;const box=$('.m63.cx7:not([hidden]) .cx7-big');if(!box)return;","function codex(){if(!window.WING10)return;const box=$('.m63.cx7:not([hidden]) .cx7-big');if(!box)return;{const _s=(($('.m63.cx7 .cx7-c.sel')||{}).dataset||{}).cx7||'';if(window.V24!==false&&window.V24A2!==false&&window.DG24!==false&&_s[0]==='s'){const old=box.querySelector('canvas.pv10');if(old){old.remove();box.classList.remove('pv10on');pvS=null;}return;}}",1),
 ("else{c.globalCompositeOperation='lighter';const r=Math.max(W,L)*.62,q=c.createRadialGradient(0,0,0,0,0,r);const hc=own?I.pal[3]:I.pal[1];q.addColorStop(0,rgba(hc,own?.22:.30));q.addColorStop(1,rgba(hc,0));c.fillStyle=q;c.fillRect(-r,-r,r*2,r*2);}","else{c.globalCompositeOperation='lighter';const r=Math.max(W,L)*.62;const hc=own?I.pal[3]:I.pal[1];if(window.TB24G&&window.PERF24!==false){const ga=c.globalAlpha;c.globalAlpha=ga*(own?.22:.30);c.drawImage(TB24G(hc,'q'),-r,-r,r*2,r*2);c.globalAlpha=ga;}else{const q=c.createRadialGradient(0,0,0,0,0,r);q.addColorStop(0,rgba(hc,own?.22:.30));q.addColorStop(1,rgba(hc,0));c.fillStyle=q;c.fillRect(-r,-r,r*2,r*2);}}",1),
 ("const hr=W*(sup?.42:.32),hy=-L*.36,hg=c.createRadialGradient(0,hy,0,0,hy,hr);hg.addColorStop(0,'rgba(255,255,255,'+(sup?.95:.75)+')');hg.addColorStop(.5,rgba(I.pal[0],.45));hg.addColorStop(1,rgba(I.pal[0],0));c.globalCompositeOperation='lighter';c.fillStyle=hg;c.fillRect(-hr,hy-hr,hr*2,hr*2);","const hr=W*(sup?.42:.32),hy=-L*.36;c.globalCompositeOperation='lighter';if(window.TB24G&&window.PERF24!==false){const ga=c.globalAlpha;c.globalAlpha=ga*(sup?.95:.75);c.drawImage(TB24G(I.pal[0],'h'),-hr,hy-hr,hr*2,hr*2);c.globalAlpha=ga;}else{const hg=c.createRadialGradient(0,hy,0,0,hy,hr);hg.addColorStop(0,'rgba(255,255,255,'+(sup?.95:.75)+')');hg.addColorStop(.5,rgba(I.pal[0],.45));hg.addColorStop(1,rgba(I.pal[0],0));c.fillStyle=hg;c.fillRect(-hr,hy-hr,hr*2,hr*2);}",1),
 ("if(q<.35){const fr=16*B.k*(1-q/.35)+4,fg=c.createRadialGradient(B.x,B.y,0,B.x,B.y,fr);fg.addColorStop(0,'rgba(255,255,255,.9)');fg.addColorStop(1,'rgba(255,255,255,0)');c.globalAlpha=1;c.fillStyle=fg;c.fillRect(B.x-fr,B.y-fr,fr*2,fr*2);}","if(q<.35){const fr=16*B.k*(1-q/.35)+4;if(window.TB24G&&window.PERF24!==false){c.globalAlpha=.9;c.drawImage(TB24G('#fff','w'),B.x-fr,B.y-fr,fr*2,fr*2);}else{const fg=c.createRadialGradient(B.x,B.y,0,B.x,B.y,fr);fg.addColorStop(0,'rgba(255,255,255,.9)');fg.addColorStop(1,'rgba(255,255,255,0)');c.globalAlpha=1;c.fillStyle=fg;c.fillRect(B.x-fr,B.y-fr,fr*2,fr*2);}}",1),
 ("y0=p.y+w*.36,gr=c.createLinearGradient(0,y0,0,y0+fl*1.6);gr.addColorStop(0,'rgba(255,255,255,.9)');gr.addColorStop(.35,rgba(I.pal[3],.65));gr.addColorStop(1,rgba(I.pal[3],0));c.fillStyle=gr;c.beginPath();c.moveTo(p.x+dx-3,y0);c.lineTo(p.x+dx+3,y0);c.lineTo(p.x+dx,y0+fl*1.6);c.closePath();c.fill();}","y0=p.y+w*.36;if(window.TB24G&&window.PERF24!==false){c.drawImage(TB24G(I.pal[3],'f'),p.x+dx-3,y0,6,fl*1.6);continue;}const gr=c.createLinearGradient(0,y0,0,y0+fl*1.6);gr.addColorStop(0,'rgba(255,255,255,.9)');gr.addColorStop(.35,rgba(I.pal[3],.65));gr.addColorStop(1,rgba(I.pal[3],0));c.fillStyle=gr;c.beginPath();c.moveTo(p.x+dx-3,y0);c.lineTo(p.x+dx+3,y0);c.lineTo(p.x+dx,y0+fl*1.6);c.closePath();c.fill();}",1),
 ("const nm=document.getElementById('robot-skill-name');if(nm)nm.textContent=(ss?'TUYỆT KỸ · ':'KỸ NĂNG S · ')+(ss?SK[i].ss:SK[i].s);","const nm=document.getElementById('robot-skill-name');if(nm){nm.textContent=(ss?'TUYỆT KỸ · ':'KỸ NĂNG S · ')+(ss?SK[i].ss:SK[i].s);nm.__v121=performance.now();}",1),
 ("function fixTele(){const t=$('tele07');if(!t||t.hidden)return;","function fixTele(){const t=$('tele07');if(!t||t.hidden)return;window.__h68t=performance.now();",1),
 ("parts.push('Điểm hạ địch & nhặt đồ <b>'+fmt(base)+'</b> (hệ số combo cao nhất <b>×'+R.maxM+'</b>: mỗi 5 mục tiêu liên tiếp +1, tối đa ×5)');","parts.push(window.V24!==false?'Điểm hạ địch & nhặt đồ <b>'+fmt(base)+'</b> · combo <b>×'+R.maxM+'</b>':'Điểm hạ địch & nhặt đồ <b>'+fmt(base)+'</b> (hệ số combo cao nhất <b>×'+R.maxM+'</b>: mỗi 5 mục tiêu liên tiếp +1, tối đa ×5)');",1),
 ("g.save();g.globalAlpha=a;g.font='bold 13px sans-serif';const w=g.measureText(txt).width+26,x=W/2-w/2,y=132;g.fillStyle='rgba(8,14,26,.82)';g.fillRect(x,y,w,24);","if(window.V24!==false&&typeof V24TXT24==='function'){V24TXT24(g,txt,E.type==='em'?'#38bdf8':E.type==='rock'?'#fb923c':'#a78bfa',W/2,144,a);return;}g.save();g.globalAlpha=a;g.font='bold 13px sans-serif';const w=g.measureText(txt).width+26,x=W/2-w/2,y=132;g.fillStyle='rgba(8,14,26,.82)';g.fillRect(x,y,w,24);",1),
 (" function pose(i,t,B,K){const c=CFG[i],J=RW23_J['ct'+(i+1)],W=c.W*K,L=[];if(!J)return {L,W};const y=c.y;",
  " function pose24(i,t,B,K){const c=window.RW24CFG[i],J=RW23_J['ct'+(i+1)],W=c.W*K,L=[],y=c.y;\n  if(J.O){const b=1+.03*Math.sin(t*2*Math.PI*.8);L.push(['O',0,y,S.ang,b,b]);return {L,W};}\n  const fl=3*D2*Math.sin(t*2*Math.PI*(i===6?1.2:1.5)),rot=(c.down-c.openBT*S.spread)*D2+fl;\n  L.push(['R',c.sh,y,rot,1,1],['L',-c.sh,y,-rot,-1,1]);return {L,W};}\n function pose(i,t,B,K){const c=CFG[i],J=RW23_J['ct'+(i+1)],W=c.W*K,L=[];if(!J)return {L,W};const y=c.y;if(window.RW24CFG&&J&&((J.R&&J.R.v24)||(J.O&&J.O.v24)))return pose24(i,t,B,K);",1),
 ("const out=e[0]==='O'?q.w/2*kk:(e[0].slice(-1)==='L'?q.px:q.w-q.px)*kk;","const out=e[0]==='O'?q.w/2*kk:((e[0].slice(-1)==='L'&&!q.mir)?q.px:q.w-q.px)*kk;",1),
 ("ctx.fillStyle='rgba(4,9,18,'+A+')';","let A2=A;if(window.PERF24!==false&&window.NEN24!==false){const d=window.BG76??.28;if(d>0){A2=1-(1-A)*(1-d);window.__dim24f=window.__f24;}}ctx.fillStyle='rgba(4,9,18,'+A2.toFixed(3)+')';",1),
 ("const a=window.BG76??.28;","const a=(window.__dim24f!=null&&window.__dim24f===window.__f24)?0:(window.BG76??.28);",1),
 ("return {on,draw,state:()=>({on:on(),cur:S.cur>=0?NAMES[S.cur]:''","function full(){if(!on())return false;const t=biome();if(t<0||!im(NAMES[t]))return false;if(S.ft>0&&S.prev>=0&&!im(NAMES[S.prev]))return false;return true;}\n return {on,draw,full,state:()=>({on:on(),cur:S.cur>=0?NAMES[S.cur]:''",1),
]
def modules():
    """khối mô-đun chèn (đầu <head> cho perf24, cuối <body> cho phần còn lại)"""
    head='<script id="perf24-js">'+rd('src/perf24.js')+'</script>'
    tail=''
    for f,sid in (('src/v24.js','v24-js'),('src/snd24.js','snd24-js'),('src/v24c.js','v24c-js')):
        if os.path.exists(os.path.join(ROOT,f)):
            if f=='src/v24.js' and os.path.isdir(os.path.join(ROOT,'src/wing24img')):
                import base64
                J=json.load(open(os.path.join(ROOT,'src/wing24img/wing24.json')))
                IM={k:'data:image/webp;base64,'+base64.b64encode(open(os.path.join(ROOT,'src/wing24img',k+'.webp'),'rb').read()).decode() for k in J}
                tail+='<script id="wing24-img-js">window.WING24_IMG='+json.dumps(IM,separators=(',',':'))+';window.WING24_J='+json.dumps(J,separators=(',',':'))+';</script>'
            if f=='src/v24c.js' and os.path.isdir(os.path.join(ROOT,'src/v24cimg')):
                import base64
                IM={k[:-5]:'data:image/webp;base64,'+base64.b64encode(open(os.path.join(ROOT,'src/v24cimg',k),'rb').read()).decode() for k in sorted(os.listdir(os.path.join(ROOT,'src/v24cimg'))) if k.endswith('.webp')}
                tail+='<script id="v24c-img-js">window.V24C_IMG='+json.dumps(IM,separators=(',',':'))+';</script>'
            css=f[:-3]+'.css'
            if os.path.exists(os.path.join(ROOT,css)):tail+='<style id="'+sid[:-3]+'-css">'+rd(css)+'</style>'
            tail+='<script id="'+sid+'">'+rd(f)+'</script>'
    return head,tail
def apply_build(rep,get_h):
    for a,b,n in BASE_PAIRS:rep(a,b,n)
    head,tail=modules()
    rep('</title>','</title>'+head,1)
    rep('</body>',tail+'</body>',1)
if __name__=='__main__':
    h=open(sys.argv[1],encoding='utf-8').read()
    def rep(a,b,n=1):
        global h
        c=h.count(a);assert c==n,(a[:90],c);h=h.replace(a,b)
    for a,b,n in SRC_PAIRS:
        if h.count(b)==0:rep(a,b,n)
    apply_build(rep,None)
    open(sys.argv[2],'w',encoding='utf-8').write(h);print('ok',len(h))
