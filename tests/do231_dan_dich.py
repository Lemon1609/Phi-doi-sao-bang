# V231 · đo độ dễ thấy của đạn địch khi nằm trong vùng cánh bung tàu 8 (có cánh / tắt cánh).
#  Cách đo: giữ tàu đứng yên, đặt 1 viên đạn địch đứng yên tại các điểm trong vùng cánh; chụp có đạn và ngay sau khi gỡ đạn;
#  "độ nổi" = tổng chênh lệch điểm ảnh trong ô 24×24 quanh viên đạn. Tỉ số có cánh / tắt cánh < 1 nghĩa là đạn chìm hơn.
import sys, os, json
import numpy as np
from PIL import Image
from playwright.sync_api import sync_playwright
H = sys.argv[1]
_src = open('tests/v203_v212/t209.py').read().split("with sync_playwright() as p:")[0]
_argv = sys.argv; exec(_src); sys.argv = _argv
CLEAN = "()=>{document.getElementById('tutorial392')?.remove();window.RULE84=false;window.TITLE84=false;try{Ch9.open=()=>true}catch{};document.querySelectorAll('.m63,.adv70,.st71').forEach(e=>e.hidden=true)}"
TIER = "()=>{const o=V70.ve.bind(V70);V70.ve=(k,i)=>k==='c'&&i===7?5:o(k,i);const m=V70.isMax.bind(V70);V70.isMax=i=>i===7?false:m(i);}"
PX, PY = 240, 700  # tọa độ khung vẽ 480×1041; ảnh chụp = × 393/480
K = 392.84375 / 480
PTS = [(-100, 10), (-70, 50), (-120, 70), (100, 10), (70, 50), (120, 70), (-50, 90), (50, 90)]
def shot(pg):
    b = pg.screenshot(); import io; return np.asarray(Image.open(io.BytesIO(b)).convert('RGB')).astype(np.float32)
with sync_playwright() as p:
    br = p.chromium.launch(); pg, errs, _o = setup(br, 'SS'); pg.wait_for_timeout(1500)
    pg.reload(); pg.wait_for_timeout(5000); pg.evaluate(CLEAN); pg.evaluate(TIER)
    pg.evaluate("()=>{Progress.setLocked(false);document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='40';selectCraft(7);launchCraft=7;Lobby.hide();reset();if(mode==='pause')mode='play';}")
    pg.wait_for_timeout(5000)
    pg.evaluate("()=>{window.__tpl=Object.assign({},bullets.find(b=>b.type==='needle'||b.r)||bullets[0])}")
    pg.evaluate("(a)=>{window.__iv=setInterval(()=>{hp=maxHp;shield=0;try{player.x=a[0];player.y=a[1];}catch{};enemies.forEach(e=>e.dead=true)},16);activateSuper()}", [PX, PY])
    pg.wait_for_timeout(1500)
    res = {}
    for on in (True, False):
        pg.evaluate("(on)=>{window.BUNG231=on;}", on); pg.wait_for_timeout(300)
        vals = []
        for dx, dy in PTS:
            x, y = PX + dx, PY + dy
            ok = pg.evaluate("(a)=>{bullets.length=0;const b=Object.assign({},window.__tpl,{x:a[0],y:a[1],vx:0,vy:0,age:0});bullets.push(b);window.__b=b;return bullets.length}", [x, y])
            pg.wait_for_timeout(120); A = shot(pg)
            pg.evaluate("()=>{bullets.length=0}"); pg.wait_for_timeout(120); B = shot(pg)
            sx, sy = round(x * K), round(y * K)
            d = np.abs(A - B)[sy - 12:sy + 12, sx - 12:sx + 12].sum() / 1000
            vals.append(round(float(d), 1))
            if on and (dx, dy) == PTS[0]: Image.fromarray(A.astype(np.uint8)).crop((round(PX*K) - 150, round(PY*K) - 110, round(PX*K) + 150, round(PY*K) + 130)).save('/tmp/claude-0/s231/dan_trong_canh.png')
        res['co_canh' if on else 'tat_canh'] = vals
    r = [round(a / b, 2) if b else None for a, b in zip(res['co_canh'], res['tat_canh'])]
    res['ti_so'] = r; res['ti_so_TB'] = round(float(np.mean([x for x in r if x])), 2)
    print(json.dumps(res, ensure_ascii=False)); print('loi', errs[:3]); br.close()
