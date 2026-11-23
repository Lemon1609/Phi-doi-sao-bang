import sys,os,json
__file__='/home/claude/nguon/claude_tools/ui_audit/cap_ui.py'
HT=os.environ.get('HT','/home/claude/work/l21e.html')
sys.argv=['x',HT,'/home/claude/anh/e21']
exec(open('/home/claude/nguon/claude_tools/ui_audit/cap_ui.py').read().split("with sync_playwright() as p:")[0])
P=[[5,8],[10,11],[7,9],[12,12],[2,6],[0,3],[1,4]]
JOBS=json.loads(os.environ.get('JOBS','[[0,10],[1,6],[4,3],[5,0]]'))
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs=setup2(br,'S')
  for i,adv in JOBS:
    pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(4500);pg.evaluate(PREP)
    pg.add_init_script("""(()=>{const i=%d,adv=%d;const PP=[[5,8],[10,11],[7,9],[12,12],[2,6],[0,3],[1,4]];localStorage.setItem('saobang-robots-v1',JSON.stringify({unlocked:[],selected:'sss:'+i,supers:[0,1,2,3,4,5,6].map(k=>({key:'sss:'+k,model:k,a:PP[k][0],b:PP[k][1],form:0})),fusionVersion:2}));localStorage.setItem('saobang-hop4309-v1','1');let H={};try{H=JSON.parse(localStorage.getItem('saobang-hop309-v1')||'{}')||{}}catch(e){}H.adv=H.adv||{};H.adv[i]=adv;localStorage.setItem('saobang-hop309-v1',JSON.stringify(H));})()"""%(i,adv))
    pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(4500);pg.evaluate(PREP)
    pg.evaluate("(a)=>{window.__adv=a;Hop309.enh=function(){return window.__adv};try{Hop309.refreshAtlas()}catch(e){}}",adv)
    r=pg.evaluate("(i)=>{const R=Fusion.resolve('sss:'+i);return {enh:R&&R.enhance,sel:Fusion.getState().selected,lim:Hop309.limit?Hop309.limit(i):null}}",i)
    print(i,adv,r,flush=True)
    start(pg,14);pg.evaluate("()=>{invuln=1e9;setInterval(()=>{try{hp=maxHp}catch(e){}},300)}");pg.wait_for_timeout(1800)
    pg.evaluate("()=>{try{activateSuper()}catch(e){}}");pg.wait_for_timeout(1600);pg.screenshot(path=OUT+'/r%d_robot.png'%i)
    print(pg.evaluate("()=>({robot:!!(typeof activeRobot!=='undefined'&&activeRobot),sup:superTime,m:Evo21.robM()})"))
    pg.evaluate("()=>{try{SSSGame.useUlt()}catch(e){console.log(e)}}");pg.wait_for_timeout(700);pg.screenshot(path=OUT+'/r%d_ult.png'%i)
  print('errs',errs[:5])
