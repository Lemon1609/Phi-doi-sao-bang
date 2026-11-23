import sys, os, json
from playwright.sync_api import sync_playwright
H=os.environ.get('HT','/home/claude/work/l21i.html');O=os.environ.get('OUT','/home/claude/anh/e21/led');os.makedirs(O,exist_ok=True)
TS=json.loads(os.environ.get('TS','[0,1,2]'))
MIS=os.environ.get('MIS','sss_monarch_inferno');SIDE=os.environ.get('SIDE','sss_halo_carrier')
os.chdir('/home/claude/nguon');_a=sys.argv;sys.argv=['x',H];exec(open('tests/v203_v212/t209.py').read().split("with sync_playwright() as p:")[0]);sys.argv=_a
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,_o=setup(br,'SS');pg.wait_for_timeout(1500)
  pg.add_init_script("(()=>{try{const k='saobang-gear-sss-v2';const o=JSON.parse(localStorage[k]||'null')||{v:2,owned:{},bind:{},wk:{w:0,n:0},pay:null,l4:1};o.v=2;o.l4=o.l4||1;for(const id of ['%s','%s'])o.owned[id]={lv:5,at:1};localStorage[k]=JSON.stringify(o);}catch(e){}})()"%(MIS,SIDE))
  pg.reload();pg.wait_for_timeout(5000)
  r=pg.evaluate("(a)=>{document.getElementById('tutorial392')?.remove();const x=Gear44.equipSSS('missiles',a[0]),y=Gear44.equipSSS('sidearm',a[1]);return [x,y,Gear44.activeId('missiles'),Gear44.activeId('sidearm')]}",[MIS,SIDE]);print('trang bị',r)
  for t in TS:
    pg.evaluate("t=>{window.__ts21=t;document.querySelectorAll('.m63').forEach(e=>e.hidden=true);try{Gear44.close()}catch(e){}try{Nav74.tab('equip')}catch(e){}}",t);pg.wait_for_timeout(2200)
    pg.screenshot(path=f'{O}/kho_{t}.png')
    pg.evaluate("(a)=>{try{Gear44.open('missiles')}catch(e){Gear44.open()}setTimeout(()=>{const b=document.querySelector('[data-pick=\"'+a+'\"]');if(b)b.click();},300)}",MIS);pg.wait_for_timeout(1600)
    pg.screenshot(path=f'{O}/hop_{t}.png')
  print('lỗi',errs[:4]);br.close()
