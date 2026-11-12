# V231 · chụp tàu 8 bậc tím: sảnh, trận, Bạo Tẩu (chuỗi khung để xem nhịp bung). python3 tests/quay231_tau8.py <html tuyệt đối> <thư mục ra>
import sys, os
from playwright.sync_api import sync_playwright
H, O = sys.argv[1], sys.argv[2]; os.makedirs(O, exist_ok=True)
CLEAN = "()=>{document.getElementById('tutorial392')?.remove();window.RULE84=false;window.TITLE84=false;try{Ch9.open=()=>true}catch{};document.querySelectorAll('.m63,.adv70,.st71').forEach(e=>e.hidden=true)}"
TIER = "()=>{try{const o=V70.ve.bind(V70);V70.ve=(k,i)=>k==='c'&&i===7?5:o(k,i);const m=V70.isMax.bind(V70);V70.isMax=i=>i===7?false:m(i);}catch(e){return 'loi '+e}return 'ok'}"
_src = open('tests/v203_v212/t209.py').read().split("with sync_playwright() as p:")[0]
_argv = sys.argv; exec(_src); sys.argv = _argv
with sync_playwright() as p:
    br = p.chromium.launch(); pg, errs, _o = setup(br, 'SS'); pg.wait_for_timeout(1500)
    pg.reload(); pg.wait_for_timeout(5000); pg.evaluate(CLEAN); print('tier', pg.evaluate(TIER))
    print(pg.evaluate("()=>{Progress.setLocked(false);selectCraft(7);launchCraft=7;return {n:(()=>{try{return V70.craftN(7)}catch{return null}})(),form:(()=>{try{return ART118S.form(7,V70.ve('c',7))}catch(e){return ''+e}})()}}"))
    pg.wait_for_timeout(2500); pg.screenshot(path=f'{O}/sanh.png')
    pg.evaluate("()=>{document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='40';selectCraft(7);launchCraft=7;Lobby.hide();reset();if(mode==='pause')mode='play';invuln=0;window.__iv=setInterval(()=>{hp=maxHp;shield=maxShield;superTime=0;try{player.y=560;player.x=196}catch{}},30)}")
    pg.wait_for_timeout(6500); pg.screenshot(path=f'{O}/tran.png')
    pg.evaluate("()=>{clearInterval(window.__iv);window.__iv=setInterval(()=>{hp=maxHp;shield=maxShield;try{player.y=560;player.x=196}catch{}},30);activateSuper()}")
    for i in range(12):
        pg.screenshot(path=f'{O}/bt_{i:02d}.png'); pg.wait_for_timeout(60)
    pg.wait_for_timeout(1500); pg.screenshot(path=f'{O}/bt_giu.png')
    print('trạng thái', pg.evaluate("()=>{try{return {bt:BtFx218.state(),v118:V118.state()}}catch(e){return ''+e}}"))
    print('loi', errs[:5]); br.close()
