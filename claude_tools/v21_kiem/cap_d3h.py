import sys, os
from playwright.sync_api import sync_playwright
H=os.environ.get('HT','/home/claude/work/l21h.html');O='/home/claude/anh/e21/d3';os.makedirs(O,exist_ok=True)
os.chdir('/home/claude/nguon');_a=sys.argv;sys.argv=['x',H];exec(open('tests/v203_v212/t209.py').read().split("with sync_playwright() as p:")[0]);sys.argv=_a
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,_o=setup(br,'SS');pg.wait_for_timeout(1500)
  pg.add_init_script("(()=>{try{const k='saobang-gear-sss-v2';const o=JSON.parse(localStorage[k]||'null')||{v:2,owned:{},bind:{},wk:{w:0,n:0},pay:null,l4:1};o.v=2;o.l4=o.l4||1;for(const id of ['sss_monarch_inferno','sss_halo_carrier'])o.owned[id]={lv:5,at:1};localStorage[k]=JSON.stringify(o);}catch(e){}})()")
  pg.reload();pg.wait_for_timeout(5000)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();Gear44.equipSSS('missiles','sss_monarch_inferno');Gear44.equipSSS('sidearm','sss_halo_carrier');}")
  try:
    pg.evaluate("()=>{try{Nav74.tab('equip')}catch(e){}}");pg.wait_for_timeout(2500);pg.screenshot(path=O+'/kho.png')
  except Exception as e: print('kho',e)
  pg.evaluate("()=>{document.querySelectorAll('.m63').forEach(e=>e.hidden=true);try{Gear44.open('missiles')}catch(e){Gear44.open()}}");pg.wait_for_timeout(2000);pg.screenshot(path=O+'/hopthe.png')
  print('lỗi',errs[:3]);br.close()
