# Ảnh trận cho T11: chiến cơ #13 thường / Bạo Tẩu, Chiến Thần #2 chiến cơ / robot / Tuyệt kỹ E, tàu con + tên lửa SSS
import sys,os,json
HT=os.environ.get('HT','/home/claude/work/l21i.html');OUT='/home/claude/anh/e21/t11';os.makedirs(OUT,exist_ok=True)
os.chdir('/home/claude/nguon');sys.argv=['x',HT,OUT]
__file__='/home/claude/nguon/claude_tools/ui_audit/cap_ui.py'
exec(open('/home/claude/nguon/claude_tools/ui_audit/cap_ui.py').read().split("with sync_playwright() as p:")[0])
FORCE='''(a)=>{const n=a[0];window.__sid=a[1];window.__fn=n;const cn=V70.craftN,ve=V70.ve;V70.craftN=function(i){return (i|0)===window.__sid?window.__fn:cn.apply(this,arguments)};V70.ve=function(k,i){return (k==='c'&&(i|0)===window.__sid)?({0:0,1:1,2:3,6:5}[window.__fn]):ve.apply(this,arguments)};try{const g=Workshop.craftGrade;Workshop.craftGrade=function(i){return (i|0)===window.__sid?'S':g.apply(this,arguments)}}catch(e){}}'''
LED=os.environ.get('LED','1')!='0'
def crop(pg,name,w=230,h=290,dy=-40):
  r=pg.evaluate("()=>{const c=document.querySelector('canvas#game')||[...document.querySelectorAll('canvas')].sort((a,b)=>b.width-a.width)[0];const b=c.getBoundingClientRect();const k=b.width/(typeof W==='number'?W:480);return {x:b.left+player.x*k,y:b.top+player.y*k,k}}")
  x=max(0,r['x']-w/2);y=max(0,r['y']-h/2+dy)
  pg.screenshot(path=f'{OUT}/{name}.png',clip={'x':x,'y':y,'width':w,'height':h})
with sync_playwright() as p:
  # 1) chiến cơ #13 + SSS
  br=p.chromium.launch();pg,errs=setup2(br,'S');pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(1500)
  pg.add_init_script("(()=>{try{const k='saobang-gear-sss-v2';const o=JSON.parse(localStorage[k]||'null')||{v:2,owned:{},bind:{},wk:{w:0,n:0},pay:null,l4:1};o.v=2;o.l4=o.l4||1;for(const id of ['sss_inferno_cryo','sss_halo_carrier'])o.owned[id]={lv:5,at:1};localStorage[k]=JSON.stringify(o);}catch(e){}})()"+("" if LED else ";window.EVO21LED=false"))
  pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(4500);pg.evaluate(PREP)
  pg.evaluate(FORCE,[6,12])
  print(pg.evaluate("()=>{window.__ts21=2;Gear44.equipSSS('missiles','sss_inferno_cryo');Gear44.equipSSS('sidearm','sss_halo_carrier');selectCraft(12);return [selected,Gear44.activeId('sidearm'),Gear44.activeId('missiles')]}"))
  start(pg,12);pg.evaluate("()=>{invuln=1e9;window.__iv=setInterval(()=>{try{hp=maxHp;shield=0;bulletShieldTime=0;player.x=240;player.y=640;bullets.length=0}catch(e){}},16)}");pg.wait_for_timeout(2500)
  crop(pg,'s13_thuong'+('' if LED else '_off'))
  pg.evaluate("()=>{superTime=8}");pg.wait_for_timeout(900);crop(pg,'s13_bt'+('' if LED else '_off'))
  pg.evaluate("()=>{superTime=0}");pg.wait_for_timeout(1500);crop(pg,'s13_gear',w=330,h=330,dy=-90)
  print('lỗi',errs[:3]);br.close()
  # 2) Chiến Thần #2 (mẫu 1 Thời Không) +10
  i,adv=1,10
  br=p.chromium.launch();pg,errs=setup2(br,'S');pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(1500)
  pg.add_init_script("""(()=>{const i=%d;const PP=[[5,8],[10,11],[7,9],[12,12],[2,6],[0,3],[1,4]];localStorage.setItem('saobang-robots-v1',JSON.stringify({unlocked:[],selected:'sss:'+i,supers:[0,1,2,3,4,5,6].map(k=>({key:'sss:'+k,model:k,a:PP[k][0],b:PP[k][1],form:0})),fusionVersion:2}));localStorage.setItem('saobang-hop4309-v1',JSON.stringify(1));})()"""%i+("" if LED else ";window.EVO21LED=false"))
  pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(4500);pg.evaluate(PREP)
  pg.evaluate("(a)=>{window.__adv=a;Hop309.enh=function(){return window.__adv};try{Hop309.refreshAtlas()}catch(e){}}",adv)
  start(pg,14);pg.evaluate("()=>{invuln=1e9;setInterval(()=>{try{hp=maxHp;player.x=240;player.y=Math.min(player.y,620)}catch(e){}},16)}");pg.wait_for_timeout(1800)
  crop(pg,'ct2_chienco'+('' if LED else '_off'),w=260,h=300)
  pg.evaluate("()=>{try{activateSuper()}catch(e){}}");pg.wait_for_timeout(1800);crop(pg,'ct2_robot'+('' if LED else '_off'),w=300,h=360,dy=-30)
  print(pg.evaluate("()=>({robot:!!(typeof activeRobot!=='undefined'&&activeRobot&&activeRobot.super),sup:superTime,m:Evo21.robM(),led:EvoLED.state()})"))
  pg.evaluate("()=>{try{SSSGame.useUlt()}catch(e){console.log(e)}}");pg.wait_for_timeout(180);crop(pg,'ct2_ult'+('' if LED else '_off'),w=300,h=360,dy=-30)
  print('lỗi',errs[:3]);br.close()
