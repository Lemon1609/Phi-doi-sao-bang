# V309 L13 · ĐO BOSS ĐƠN: boss ải 40 ghim giữa màn (x 240, y 190), máu vô hạn (hp + coreHp lõi + cánh), không bắn, không quái phụ, Math.random cố định.
# Hỏa lực trong lượt ghim 5 (P tối đa). Chỉ cộng sát thương đạn CHÍNH lên boss (bọc damageBoss ngoài cùng, bỏ đạn trang bị gearKind/gearItem). Bậc Tím, không Bạo Tẩu.
# SID=<0-based> CO=1|0 GIAY=20 BAC=tim python3 tests/do_boss_don.py <html tuyệt đối>
import sys, os, json
from playwright.sync_api import sync_playwright
H = sys.argv[1]; SID = int(os.environ.get('SID', '0')); CO = os.environ.get('CO', '1') == '1'; T = float(os.environ.get('GIAY', 20)); BAC = os.environ.get('BAC', 'tim')
sys.argv = ['x', H]; exec(open('tests/v203_v212/t209.py').read().split("with sync_playwright() as p:")[0])
E = {'thuong': (0, 0, 0), 'luc': (1, 0, 0), 'lam': (3, 0, 0), 'tim': (5, 0, 0), 'tim5': (5, 1, 0), 'ss': (5, 1, 1)}[BAC]
CLEAN = "()=>{document.getElementById('tutorial392')?.remove();window.RULE84=false;window.TITLE84=false;try{Ch9.open=()=>true}catch{};document.querySelectorAll('.m63,.adv70,.st71').forEach(e=>e.hidden=true)}"
PATCH = """(a)=>{const SID=%d;const [e,mx,ss]=a;const o=V70.ve.bind(V70);V70.ve=(k,i)=>k==='c'&&i===SID?e:o(k,i);const m=V70.isMax.bind(V70);V70.isMax=i=>i===SID?!!mx:m(i);
  const g=Workshop.craftGrade.bind(Workshop);Workshop.craftGrade=i=>i===SID&&ss?'SS':(i===SID?'S':g(i));}""" % SID
with sync_playwright() as p:
    br = p.chromium.launch(); pg, errs, _o = setup(br, 'SS'); pg.wait_for_timeout(1500)
    pg.add_init_script("%sMath.random=(()=>{let x=12345;return()=>{x=(x*1103515245+12345)%%2147483648;return x/2147483648;}})();" % ('' if CO else 'window.CO309B=false;'))
    pg.reload(); pg.wait_for_timeout(4500); pg.evaluate(CLEAN); pg.evaluate(PATCH, list(E))
    pg.evaluate("""()=>{const SID=%d;Progress.setLocked(false);selectCraft(SID);launchCraft=SID;document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='40';Lobby.hide();reset();if(mode==='pause')mode='play';try{startBoss()}catch(e){}
      window.__iv=setInterval(()=>{try{hp=maxHp;shield=0;superTime=0;power=5;powerUpgrades=4;player.y=760;player.x=240;for(const e of enemies)e.dead=true;bullets.length=0;
        if(boss&&!boss.dead){if(!boss.__bd){boss.__bd=1;boss.max=boss.hp=1e12;boss.coreMax=boss.coreHp=1e12;for(const q of boss.parts||[]){q.hp=q.max=1e12;}}boss.x=240;boss.y=190;boss.hp=Math.max(boss.hp,1e11);boss.coreHp=Math.max(boss.coreHp||0,1e11);for(const q of boss.parts||[])if(!q.dead)q.hp=Math.max(q.hp,1e11);if(boss.beams)boss.beams.length=0;}}catch(e){}},30);}""" % SID)
    pg.wait_for_function("()=>typeof boss!=='undefined'&&boss&&boss.__bd", timeout=90000)
    pg.wait_for_timeout(2500)
    pg.evaluate("""()=>{window.__dm=0;const o=damageBoss;damageBoss=function(a,s,p){if(s&&typeof s==='object'&&!s.gearKind&&!s.gearItem&&Number.isFinite(a)&&a>0)window.__dm+=a*((window.CO309&&CO309.bkMul)?CO309.bkMul(s):1);/* L13: hệ số boss của co309 nằm ở lớp trong */return o.apply(this,arguments)}}""")
    pg.wait_for_timeout(int(T * 1000))
    r = pg.evaluate("()=>({dm:Math.round(window.__dm),co309:window.CO309B!==false,sel:selected})")
    print(json.dumps({'sid': SID, 'co': CO, 'giay': T, **r, 'err': len(errs)}), flush=True); br.close()
