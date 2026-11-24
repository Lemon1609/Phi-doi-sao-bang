# Chiến Thần: JOBS='[[mẫu,adv]]' → ct<i>_<adv>_f.png (dạng chiến cơ) / _r.png (robot)  OFF=1 tắt plume
import sys,os,json
from playwright.sync_api import sync_playwright
H,O=sys.argv[1],sys.argv[2];os.makedirs(O,exist_ok=True);os.chdir('/home/claude/phi-doi-sao-bang')
_src=open('tests/v203_v212/t209.py').read().split("with sync_playwright() as p:")[0];_a=sys.argv;sys.argv=[_a[0],H];exec(_src);sys.argv=_a
JOBS=json.loads(os.environ.get('JOBS','[[0,10]]'))
INIT="""(()=>{const i=%d,adv=%d;const PP=[[5,8],[10,11],[7,9],[12,12],[2,6],[0,3],[1,4]];localStorage.setItem('saobang-robots-v1',JSON.stringify({unlocked:[],selected:'sss:'+i,supers:[0,1,2,3,4,5,6].map(k=>({key:'sss:'+k,model:k,a:PP[k][0],b:PP[k][1],form:0})),fusionVersion:2}));localStorage.setItem('saobang-hop4309-v1','1');let H={};try{H=JSON.parse(localStorage.getItem('saobang-hop309-v1')||'{}')||{}}catch(e){}H.adv=H.adv||{};H.adv[i]=adv;localStorage.setItem('saobang-hop309-v1',JSON.stringify(H));})()"""
with sync_playwright() as p:
  br=p.chromium.launch()
  for i,adv in JOBS:
    pg,errs,_o=setup(br,'SS');pg.add_init_script(INIT%(i,adv));pg.reload();pg.wait_for_timeout(4500)
    pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();try{Ch9.open=()=>true}catch{};document.querySelectorAll('.m63').forEach(e=>e.hidden=true)}")
    pg.evaluate("(a)=>{window.__adv=a;try{Hop309.enh=function(){return window.__adv};Hop309.refreshAtlas()}catch(e){}}",adv)
    if os.environ.get('OFF'):pg.evaluate("()=>{window.PLUME22=false}")
    if os.environ.get('CTK'):pg.evaluate("(k)=>{window.CT22K=k}",json.loads(os.environ['CTK']))
    start(pg,14);pg.wait_for_timeout(2500)
    pg.evaluate("()=>{clearInterval(window.__iv);window.__iv=setInterval(()=>{try{hp=maxHp;player.x=240;player.y=600;enemies.length=0;bullets.length=0}catch(e){}},16)}");pg.wait_for_timeout(800)
    r=pg.evaluate("()=>{const c=document.querySelector('canvas');const b=c.getBoundingClientRect();return [b.left,b.top,b.width/W]}");k=r[2];cx=r[0]+240*k;cy=r[1]+600*k
    cl={'x':cx-120,'y':cy-130,'width':240,'height':260}
    pg.screenshot(path=f'{O}/ct{i}_{adv}_f.png',clip=cl)
    pg.evaluate("()=>{try{activateSuper()}catch(e){}}");pg.wait_for_timeout(1700)
    print(i,adv,pg.evaluate("()=>({rob:!!(activeRobot&&activeRobot.super&&superTime>0),enh:activeRobot&&activeRobot.enhance,k:%f})"%k),flush=True)
    print(pg.evaluate("()=>JSON.stringify(Plume22.REC)"));pg.screenshot(path=f"{O}/ct{i}_{adv}_r.png",clip=cl)
    print('loi',errs[:3]);pg.context.close()
  br.close()
