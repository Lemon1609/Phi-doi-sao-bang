# chụp một tàu (SID) cả 6 bậc lúc Bạo Tẩu (chuỗi khung theo thời gian). python3 tests/quay231e_6bac.py <html tuyệt đối> <thư mục ra>
import sys, os, time
from playwright.sync_api import sync_playwright
H, O = sys.argv[1], sys.argv[2]; os.makedirs(O, exist_ok=True)
SID = int(os.environ.get('SID', '7'))  # chỉ số tàu từ 0 (tàu 8 = 7, tàu 7 = 6)
_src = open('tests/v203_v212/t209.py').read().split("with sync_playwright() as p:")[0]
_argv = sys.argv; exec(_src); sys.argv = _argv
CLEAN = "()=>{document.getElementById('tutorial392')?.remove();window.RULE84=false;window.TITLE84=false;try{Ch9.open=()=>true}catch{};document.querySelectorAll('.m63,.adv70,.st71').forEach(e=>e.hidden=true)}"
E = {'thuong': (0, 0, 0), 'luc': (1, 0, 0), 'lam': (3, 0, 0), 'tim': (5, 0, 0), 'tim5': (5, 1, 0), 'ss': (5, 1, 1)}
PATCH = """(a)=>{const SID=%d;const [e,mx,ss]=a;const o=V70.ve.bind(V70);V70.ve=(k,i)=>k==='c'&&i===SID?e:o(k,i);const m=V70.isMax.bind(V70);V70.isMax=i=>i===SID?!!mx:m(i);
  const g=Workshop.craftGrade.bind(Workshop);Workshop.craftGrade=i=>i===SID&&ss?'SS':(i===SID?'S':g(i));}""" % SID
TS = [0.15, 0.3, 0.42, 0.5, 0.6, 0.75, 1.2, 2.0]
with sync_playwright() as p:
    br = p.chromium.launch(); pg, errs, _o = setup(br, 'SS'); pg.wait_for_timeout(1500)
    for t, e in E.items():
        if len(sys.argv) > 3 and t not in sys.argv[3].split(','): continue
        pg.reload(); pg.wait_for_timeout(4500); pg.evaluate(CLEAN); pg.evaluate(PATCH, list(e))
        if os.environ.get('INITJS'): pg.evaluate(os.environ['INITJS'])  # V273: đặt biến thử (vd. phóng to cánh) trước khi bật Bạo Tẩu
        pg.evaluate("()=>{const SID=%d;Progress.setLocked(false);selectCraft(SID);launchCraft=SID;document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='40';Lobby.hide();reset();if(mode==='pause')mode='play';window.__iv=setInterval(()=>{hp=maxHp;shield=0;superTime=0;try{player.y=760;player.x=240}catch{}},20)}" % SID)
        pg.wait_for_timeout(4000)
        pg.evaluate("()=>{clearInterval(window.__iv);window.__iv=setInterval(()=>{hp=maxHp;shield=0;try{player.y=760;player.x=240}catch{}},20);window.__t0=performance.now();activateSuper()}")
        for ts in TS:
            while True:
                el = pg.evaluate("()=>(performance.now()-window.__t0)/1000")
                if el >= ts: break
                pg.wait_for_timeout(15)
            pg.screenshot(path=f'{O}/{t}_{int(ts*100):03d}.png', clip={'x': 46, 'y': 470, 'width': 300, 'height': 260})
        print(t, pg.evaluate("()=>{const SID=%d;try{return ART118S.form(SID,V70.ve('c',SID))}catch(e){return ''+e}}" % SID), flush=True)
    print('loi', errs[:3]); br.close()
