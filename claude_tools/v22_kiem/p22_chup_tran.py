# chụp cận đuôi lửa trong trận: JOBS='[[sid,"tim",0|1 bạo tẩu]]' OFF=1 tắt plume
import sys,os,json
from playwright.sync_api import sync_playwright
H,O=sys.argv[1],sys.argv[2];os.makedirs(O,exist_ok=True);os.chdir('/home/claude/phi-doi-sao-bang')
_src=open('tests/v203_v212/t209.py').read().split("with sync_playwright() as p:")[0];_a=sys.argv;sys.argv=[_a[0],H];exec(_src);sys.argv=_a
JOBS=json.loads(os.environ.get('JOBS','[[0,"tim",0]]'))
E={'thuong':(0,0,0),'luc':(1,0,0),'lam':(3,0,0),'tim':(5,0,0),'tim5':(5,1,0),'ss':(5,1,1)}
CLEAN="()=>{document.getElementById('tutorial392')?.remove();window.RULE84=false;window.TITLE84=false;try{Ch9.open=()=>true}catch{};document.querySelectorAll('.m63,.adv70,.st71').forEach(e=>e.hidden=true)}"
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,_o=setup(br,'SS');pg.wait_for_timeout(1500)
  for sid,tf,bt in JOBS:
    pg.reload();pg.wait_for_timeout(4500);pg.evaluate(CLEAN)
    if os.environ.get('OFF'):pg.evaluate("()=>{window.PLUME22=false}")
    e=E[tf];pg.evaluate("""(a)=>{const [SID,e,mx,ss]=a;const o=V70.ve.bind(V70);V70.ve=(k,i)=>k==='c'&&i===SID?e:o(k,i);const m=V70.isMax.bind(V70);V70.isMax=i=>i===SID?!!mx:m(i);const g=Workshop.craftGrade.bind(Workshop);Workshop.craftGrade=i=>i===SID&&ss?'SS':(i===SID?'S':g(i));}""",[sid,*e])
    pg.evaluate("(SID)=>{Progress.setLocked(false);selectCraft(SID);launchCraft=SID;document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='40';Lobby.hide();reset();}",sid)
    pg.wait_for_timeout(3500)
    pg.evaluate("()=>{clearInterval(window.__iv);window.__iv=setInterval(()=>{hp=maxHp;try{player.y=640;player.x=240;enemies.length=0;bullets.length=0}catch{}},16)}")
    if bt:pg.evaluate("()=>activateSuper()");pg.wait_for_timeout(1300)
    else:pg.wait_for_timeout(600)
    r=pg.evaluate("()=>{const c=document.querySelector('canvas#game')||document.querySelector('canvas');const b=c.getBoundingClientRect();return [b.left,b.top,b.width/W]}")
    k=r[2];cx=r[0]+240*k;cy=r[1]+640*k
    pg.screenshot(path=f'{O}/s{sid}_{tf}_{bt}.png',clip={'x':cx-90,'y':cy-80,'width':180,'height':190})
  print('loi',errs[:3]);br.close()
