import sys,os,json
from playwright.sync_api import sync_playwright
H=sys.argv[1];os.chdir('/home/claude/phi-doi-sao-bang')
_src=open('tests/v203_v212/t209.py').read().split("with sync_playwright() as p:")[0];_a=sys.argv;sys.argv=[_a[0],H];exec(_src);sys.argv=_a
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,_o=setup(br,'SS');pg.wait_for_timeout(1500)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();Progress.setLocked(false);selectCraft(7);launchCraft=7;document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='40';Lobby.hide();reset();}")
  pg.wait_for_timeout(3000);pg.evaluate("()=>{setInterval(()=>{hp=maxHp},50);activateSuper()}");pg.wait_for_timeout(800)
  r=pg.evaluate("""()=>new Promise(res=>{const P=Plume22,od=P.draw;let ms=0,n=0,f0=0;const D=function(){const t=performance.now();const r=od.apply(this,arguments);ms+=performance.now()-t;n++;return r};
   // draw nội bộ được unit() gọi qua biến đóng → đo qua drawImage của canvas khi ảnh là sprite plume
   const g=ctx,di=g.drawImage,IMS=['cyan','gold','crimson','void'].map(k=>P.img(k));let cnt=0,t0=0;g.drawImage=function(im){if(IMS.includes(im)){const t=performance.now();const r=di.apply(this,arguments);ms+=performance.now()-t;cnt++;return r}return di.apply(this,arguments)};
   let frames=0;const st=performance.now();(function loop(){frames++;if(performance.now()-st<4000)requestAnimationFrame(loop);else{g.drawImage=di;res({frames,plumes:cnt,ms_total:+ms.toFixed(1),ms_per_frame:+(ms/frames).toFixed(3),per_plume_us:+(ms/cnt*1000).toFixed(1)})}})();})""")
  print(json.dumps(r));print('loi',errs[:3]);br.close()
