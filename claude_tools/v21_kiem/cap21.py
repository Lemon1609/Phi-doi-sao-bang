import sys,os,json
__file__='/home/claude/nguon/claude_tools/ui_audit/cap_ui.py'
HT=os.environ.get('HT','/home/claude/work/l21a.html')
sys.argv=['x',HT,'/home/claude/anh/e21']
exec(open('/home/claude/nguon/claude_tools/ui_audit/cap_ui.py').read().split("with sync_playwright() as p:")[0])
os.makedirs(OUT,exist_ok=True)
FORCE='''(a)=>{const n=a[0];window.__sid=a[1];window.__fn=n;const cn=V70.craftN,ve=V70.ve;V70.craftN=function(i){return (i|0)===window.__sid?window.__fn:cn.apply(this,arguments)};V70.ve=function(k,i){return (k==='c'&&(i|0)===window.__sid)?({0:0,1:1,2:3,6:5}[window.__fn]):ve.apply(this,arguments)};try{const g=Workshop.craftGrade;Workshop.craftGrade=function(i){return (i|0)===window.__sid?'S':g.apply(this,arguments)}}catch(e){}}'''
SID=int(os.environ.get('SID','0'))
TI={'thuong':0,'luc':1,'lam':2,'tim':6}
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs=setup2(br,os.environ.get('GR','S'))
  for t in os.environ.get('TIERS','thuong,luc,lam,tim').split(','):
    pg.evaluate("(a)=>{const n=a[0];const k='saobang-tier70-v1';const S=JSON.parse(localStorage.getItem(k)||'{}');S.c=S.c||{};S.c[String(a[1])]={n};localStorage.setItem(k,JSON.stringify(S));try{Workshop.set70(a[1],{enhance:V70.Eof(n),level:60})}catch(e){}}",[TI[t],SID])
    pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(4500);pg.evaluate(PREP)
    pg.evaluate(FORCE,[TI[t],SID]);pg.evaluate("()=>{const i=window.__sid;selectCraft(i);launchCraft=i;document.querySelector('[data-ck9=kho]').click()}")
    pg.wait_for_timeout(2600);pg.screenshot(path=OUT+'/s%d_kho_%s.png'%(SID,t))
    if os.environ.get('NOTRAN'):continue
    start(pg,14);pg.evaluate("()=>{invuln=1e9;setInterval(()=>{try{hp=maxHp}catch(e){}},300);try{Rank36.grade=()=>'S'}catch(e){}}");pg.wait_for_timeout(2600);pg.screenshot(path=OUT+'/s%d_tran_%s.png'%(SID,t))
    print(t,pg.evaluate("()=>({tier:Evo21.tierOf(window.__sid),K:Evo21.coK(0),st:Evo21.state().K,splash:CO309.C.splashK,dk:CO309.DK[0],p:Evo21.state().p})"),flush=True)
    if t in ('tim','lam'):
      pg.evaluate("()=>{try{Rank36.activate()}catch(e){console.log('rk',e)}}");pg.wait_for_timeout(450);pg.screenshot(path=OUT+'/s%d_kn_%s.png'%(SID,t))
      pg.wait_for_timeout(300);pg.screenshot(path=OUT+'/s%d_kn2_%s.png'%(SID,t))
    if t=='tim':
      pg.wait_for_timeout(2500);pg.evaluate("()=>{try{activateSuper()}catch(e){}}");pg.wait_for_timeout(700);pg.screenshot(path=OUT+'/s%d_bt_%s.png'%(SID,t));pg.wait_for_timeout(600);pg.screenshot(path=OUT+'/s%d_bt2_%s.png'%(SID,t))
  print('errs',errs[:5])
