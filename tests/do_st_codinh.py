# V304 · BÀI ĐO CỐ ĐỊNH: 15 bia đứng yên (3 hàng × 5 cột), không địch ngẫu nhiên, Math.random cố định.
# Cùng cấu hình → cùng kết quả; dùng để cân hệ số cơ chế (không phản ánh tác dụng làm chậm).
# gốc từ: V303 · đo sát thương chính (Report392.dealt.main) của một tàu trong N giây, bật/tắt cơ chế mới.
# CO9=0 tắt 13 cơ chế đạn V309 (co309) · SID=<0-based> CO=1|0 GIAY=25 BAC=tim python3 tests/do_st.py <html tuyệt đối>
import sys, os, json
from playwright.sync_api import sync_playwright
H = sys.argv[1]; SID = int(os.environ.get('SID', '0')); CO = os.environ.get('CO', '1') == '1'; T = float(os.environ.get('GIAY', 25)); BAC = os.environ.get('BAC', 'tim')
sys.argv = ['x', H]; exec(open('tests/v203_v212/t209.py').read().split("with sync_playwright() as p:")[0])
E = {'thuong': (0, 0, 0), 'luc': (1, 0, 0), 'lam': (3, 0, 0), 'tim': (5, 0, 0), 'tim5': (5, 1, 0), 'ss': (5, 1, 1)}[BAC]
CLEAN = "()=>{document.getElementById('tutorial392')?.remove();window.RULE84=false;window.TITLE84=false;try{Ch9.open=()=>true}catch{};document.querySelectorAll('.m63,.adv70,.st71').forEach(e=>e.hidden=true)}"
PATCH = """(a)=>{const SID=%d;const [e,mx,ss]=a;const o=V70.ve.bind(V70);V70.ve=(k,i)=>k==='c'&&i===SID?e:o(k,i);const m=V70.isMax.bind(V70);V70.isMax=i=>i===SID?!!mx:m(i);
  const g=Workshop.craftGrade.bind(Workshop);Workshop.craftGrade=i=>i===SID&&ss?'SS':(i===SID?'S':g(i));}""" % SID
with sync_playwright() as p:
    br = p.chromium.launch(); pg, errs, _o = setup(br, 'SS'); pg.wait_for_timeout(1500)
    pg.add_init_script(("window.CO309B=false;" if os.environ.get("CO9")=="0" else "")+"window.CO303=%s;window.CO303_HS=%s;Math.random=(()=>{let x=12345;return()=>{x=(x*1103515245+12345)%%2147483648;return x/2147483648;}})();" % ('true' if CO else 'false', os.environ.get('HS', '{}')))
    pg.reload(); pg.wait_for_timeout(4500); pg.evaluate(CLEAN); pg.evaluate(PATCH, list(E))
    pg.evaluate("()=>{const SID=%d;Progress.setLocked(false);selectCraft(SID);launchCraft=SID;document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='40';Lobby.hide();reset();if(mode==='pause')mode='play';window.__bia=[];for(let r=0;r<3;r++)for(let c=0;c<5;c++)window.__bia.push({x:64+c*88,y:170+r*90,hp:1e9,maxHp:1e9,v:0,type:0,age:0,phase:0,fire:999,dead:false,bia304:true});window.__iv=setInterval(()=>{hp=maxHp;shield=0;superTime=0;try{player.y=760;player.x=240}catch{};for(const e of enemies)if(!e.bia304)e.dead=true;try{bullets.length=0}catch{};enemies.length=0;for(const b of window.__bia){b.dead=false;enemies.push(b)}},20)}" % SID)
    pg.wait_for_timeout(2000); a = pg.evaluate("()=>({m:Report392?Object.assign({},(()=>{try{return eval('Report392')}catch{return {}}})()):0})")
    d0 = pg.evaluate("()=>{try{const t=document.createElement('div');return null}catch{return null}}")
    pg.evaluate("()=>{window.__m0=0;window.__k0=kills;const o=Report392.hit;window.__dm=0;Report392.hit=function(a,s){if(!(s&&(s.gearKind||typeof s==='string'))&&Number.isFinite(a)&&a>0)window.__dm+=a;return o.apply(this,arguments)}}")
    pg.evaluate("()=>{window.__bia0=window.__bia.reduce((t,b)=>t+(1e9-b.hp),0)}")
    pg.wait_for_timeout(int(T * 1000))
    r = pg.evaluate("()=>({dm:window.__bia.reduce((t,b)=>t+(1e9-b.hp),0)-window.__bia0,kills:0})")
    print(json.dumps({'sid': SID, 'co': CO, 'giay': T, **r}), flush=True); br.close()
