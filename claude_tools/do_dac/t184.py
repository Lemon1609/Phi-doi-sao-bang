# V184 · kiểm: (1) mở lần đầu không bật điểm danh; (2) boss vào màn: 1 dải trên, không băng giữa, không viền đỏ, xóa đạn; lời đe dọa sau cảnh báo
import sys,json,time
from playwright.sync_api import sync_playwright
f=sys.argv[1];O='/tmp/claude-0/audit/'
with sync_playwright() as p:
    b=p.chromium.launch();errs=[]
    pg=b.new_page(viewport={'width':412,'height':860});pg.on('pageerror',lambda e:errs.append(str(e)[:200]));pg.set_default_timeout(240000)
    pg.goto('file://'+f,timeout=240000);pg.wait_for_timeout(9000)
    pop=pg.evaluate("()=>{const t=document.body.innerText;return t.includes('ĐIỂM DANH 7 NGÀY')&&[...document.querySelectorAll('*')].some(e=>e.offsetParent&&/ĐIỂM DANH 7 NGÀY/.test(e.textContent||'')&&e.children.length<3)}")
    pg.screenshot(path=O+'184_lan_dau.png');print('lan dau co popup diem danh:',pop,flush=True)
    pg.evaluate("()=>{Gfx66.open()}");pg.fill('#st66-code','SAOBANG-ADMIN-2026');pg.click('[data-adm]');pg.click('[data-adm]');pg.wait_for_timeout(15000);pg.wait_for_function("()=>typeof Lobby!=='undefined'")
    pg.evaluate("""()=>{document.querySelectorAll('.adv70,.st71,.u72,.m63,#g44,#st66').forEach(e=>e.hidden=true);document.getElementById('tutorial392')?.remove();mode='menu';try{Lobby.show()}catch{};
      document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='20';Lobby.hide();reset();if(mode==='pause')mode='play';invuln=1e9;}""")
    t0=time.time();shot=0
    while time.time()-t0<90:
        st=pg.evaluate("()=>({p:Feedback31.state().pending,w:Feedback31.state().warning,b:bullets.filter(x=>!x.dead).length,red:document.getElementById('game-field').classList.contains('boss-warn')})")
        if st['p'] and shot==0 and st['w']<2.4:
            pg.screenshot(path=O+'184_boss_canhbao.png');print('trong canh bao',st,flush=True);shot=1
        if shot==1 and not st['p']:
            pg.wait_for_timeout(1200);pg.screenshot(path=O+'184_boss_dedoa.png');print('sau canh bao',pg.evaluate("()=>bullets.filter(x=>!x.dead).length"),flush=True);shot=2;break
        pg.wait_for_timeout(150)
    print('ERRS',errs[:4]);b.close()
