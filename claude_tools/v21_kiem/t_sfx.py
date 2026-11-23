import sys,os,json
from playwright.sync_api import sync_playwright
H=sys.argv[1]
os.chdir('/home/claude/nguon');sys.argv=['x',H];exec(open('tests/v203_v212/t209.py').read().split("with sync_playwright() as p:")[0])
def run(p,init,label):
  br=p.chromium.launch(args=['--autoplay-policy=user-gesture-required']);pg,errs,_o=setup(br,'SS')
  pg.add_init_script("(()=>{try{const k='saobang-gear-sss-v2';const o=JSON.parse(localStorage[k]||'null')||{v:2,owned:{},bind:{},wk:{w:0,n:0},pay:null,l4:1};o.v=2;o.l4=o.l4||1;for(const id of ['sss_inferno_cryo','sss_halo_carrier'])o.owned[id]={lv:5,at:1};localStorage[k]=JSON.stringify(o);}catch(e){}})();"+init)
  pg.reload();pg.wait_for_timeout(5000)
  a=pg.evaluate("()=>({snd:typeof sound!=='undefined'?sound:null,ctx:(typeof audio!=='undefined'&&audio)?audio.state:'chưa có',sfx:window.EvoSFX?EvoSFX.state():null})")
  pg.evaluate("()=>{try{sound=true}catch(e){}}");pg.mouse.click(200,300);pg.wait_for_timeout(600)
  b=pg.evaluate("()=>({ctx:(typeof audio!=='undefined'&&audio)?audio.state:'chưa có',sfx:window.EvoSFX?EvoSFX.state():null})")
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();try{Gear44.equipSSS('missiles','sss_inferno_cryo');Gear44.equipSSS('sidearm','sss_halo_carrier')}catch(e){}selectCraft(12);launchCraft=12;document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='12';Lobby.hide();reset();if(mode==='pause')mode='play';setInterval(()=>{hp=maxHp;superTime=8},50)}")
  pk=0
  for i in range(40):
    pg.wait_for_timeout(200);st=pg.evaluate("()=>window.EvoSFX?EvoSFX.state():null")
  c=pg.evaluate("()=>({sfx:window.EvoSFX?EvoSFX.state():null,music:window.Music96?Music96.state().vol:null,mode})")
  # thử Kho / Xưởng: gọi trực tiếp
  d=pg.evaluate("()=>{if(!window.EvoSFX)return null;const s0=EvoSFX.state().played;EvoSFX.ui('tier');EvoSFX.ui('enh');EvoSFX.ui('fuse');EvoSFX.transform(3);EvoSFX.ult();return EvoSFX.state().played-s0}")
  print(label,'trước chạm',a,'| sau chạm',b,'| sau 8 s Bạo Tẩu',c,'| UI+biến hình+E tiếng',d,'| lỗi',len(errs),errs[:2],flush=True);br.close()
with sync_playwright() as p:
  run(p,'','EVO21 bật:')
  run(p,'window.EVO21=false;','EVO21=false:')
