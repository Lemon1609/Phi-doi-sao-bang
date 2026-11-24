import sys,os,json
from playwright.sync_api import sync_playwright
H=sys.argv[1];os.chdir('/home/claude/phi-doi-sao-bang')
_src=open('tests/v203_v212/t209.py').read().split("with sync_playwright() as p:")[0];_a=sys.argv;sys.argv=[_a[0],H];exec(_src);sys.argv=_a
INIT=open('/home/claude/pl22/cap_ct.py').read().split('INIT="""')[1].split('"""')[0]
LOG="""()=>new Promise(res=>{const g=ctx,od=g.drawImage,out=[];const A=[window.__hop309atlas,window.__hop309bay];g.drawImage=function(im,...a){if(a.length===8&&(A.includes(im)||(im&&im.width>2000))){const m=g.getTransform();out.push({iw:im.width,ih:im.height,s:a.slice(0,4).map(Math.round),d:a.slice(4).map(v=>+v.toFixed(1)),m:[m.a,m.b,m.c,m.d,m.e,m.f].map(v=>+v.toFixed(3)),al:g.globalAlpha});}return od.apply(this,arguments)};
 setTimeout(()=>{g.drawImage=od;res(JSON.stringify({p:[player.x,player.y],o:out.slice(-3)}))},120)})"""
with sync_playwright() as p:
  br=p.chromium.launch()
  for i,adv in [[0,0],[2,10],[4,5]]:
    pg,errs,_o=setup(br,'SS');pg.add_init_script(INIT%(i,adv));pg.reload();pg.wait_for_timeout(4500)
    pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();document.querySelectorAll('.m63').forEach(e=>e.hidden=true)}")
    pg.evaluate("(a)=>{window.__adv=a;try{Hop309.enh=function(){return window.__adv};Hop309.refreshAtlas()}catch(e){}}",adv)
    start(pg,14);pg.wait_for_timeout(2500)
    pg.evaluate("()=>{invuln=1e9;clearInterval(window.__iv);window.__iv=setInterval(()=>{try{hp=maxHp;player.x=240;player.y=600;}catch(e){}},16)}");pg.wait_for_timeout(800)
    print('F',i,pg.evaluate(LOG))
    pg.evaluate("()=>{try{activateSuper()}catch(e){}}");pg.wait_for_timeout(1700)
    print('R',i,pg.evaluate(LOG));pg.context.close()
  br.close()
