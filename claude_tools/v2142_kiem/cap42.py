# Chụp/kiểm V2.1.42: python3 cap42.py <html> <ra> <jobs.json>
#  jobs: [{"n":tên,"steps":[["js",mã]|["w",ms]|["st",ải]|["shot",tên]|["eval",mã,tên]],"vp":[390,844]}]
import sys,os,json
R='/home/claude/phi-doi-sao-bang';os.chdir(R)
HTML,OUT,JOBS=sys.argv[1],sys.argv[2],json.load(open(sys.argv[3]))
src=open('claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
sys.argv=['x',HTML,'160'];exec(src)
t209=open('tests/v203_v212/t209.py').read();exec(t209[t209.find('def start'):t209.find('with sync_playwright')])
os.makedirs(OUT,exist_ok=True)
def setup2(br,grade,vp,pre=''):
  ctx=br.new_context(viewport={'width':vp[0],'height':vp[1]},device_scale_factor=2);pg=ctx.new_page();pg.set_default_timeout(180000);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  if pre:pg.add_init_script(pre)
  pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2000);pg.add_init_script(SEED);pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(5000)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();window.RULE84=false;window.TITLE84=false;try{Ch9.open=()=>true}catch{};document.querySelectorAll('.m63,.adv70,.st71').forEach(e=>e.hidden=true)}")
  pg.evaluate('()=>{window.__SSG=false}');o=pg.evaluate(BUILD,[b,ci,FR,PCAP]);pg.wait_for_timeout(800)
  pg.add_init_script(LV%(ci,b['sl'],ci,json.dumps(grade)));pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(5000)
  pg.evaluate("""(a)=>{const [b,ci]=a;Progress.setLocked(false);SSS87._set({done:b.sss?{[ci]:1}:{},off:{}});Wing87._set({id:b.wing?b.wing-1:null});selectCraft(ci);launchCraft=ci;}""",[b,ci])
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();const q=document.getElementById('q307');if(q)q.style.display='none';document.querySelectorAll('.m63').forEach(e=>e.hidden=true)}")
  return pg,errs
res={}
with sync_playwright() as p:
  br=p.chromium.launch(args=['--autoplay-policy=no-user-gesture-required'])
  for J in JOBS:
    pg,errs=setup2(br,J.get('g','SS'),J.get('vp',[390,844]),J.get('pre',''))
    out={}
    for s in J['steps']:
      k=s[0]
      if k=='js':pg.evaluate("()=>{"+s[1]+"}")
      elif k=='w':pg.wait_for_timeout(s[1])
      elif k=='reload':pg.reload();pg.wait_for_function("()=>typeof Gear44==='object'",timeout=180000);pg.wait_for_timeout(4000);pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();const q=document.getElementById('q307');if(q)q.style.display='none';document.querySelectorAll('.m63').forEach(e=>e.hidden=true);try{Progress.setLocked(false)}catch{}}")
      elif k=='st':start(pg,s[1])
      elif k=='shot':pg.screenshot(path=OUT+'/'+s[1]+'.png')
      elif k=='eval':out[s[2]]=pg.evaluate("()=>{"+s[1]+"}")
      elif k=='aeval':out[s[2]]=pg.evaluate("async()=>{"+s[1]+"}")
    out['errs']=errs[:8];res[J['n']]=out;print(J['n'],json.dumps(out,ensure_ascii=False)[:1500],flush=True)
    pg.context.close()
  br.close()
json.dump(res,open(OUT+'/res.json','w'),ensure_ascii=False,indent=1)
