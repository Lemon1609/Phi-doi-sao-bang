# V304 · chụp đạn trang bị: python3 tests/quay_tb.py <html> <ra> [variant,...]  (mặc định 13 tên lửa + 4 vũ khí phụ có hình mới)
import sys, os
from playwright.sync_api import sync_playwright
H, O = sys.argv[1], sys.argv[2]; os.makedirs(O, exist_ok=True)
_argv = sys.argv; sys.argv = ['x', H]; exec(open('tests/v203_v212/t209.py').read().split("with sync_playwright() as p:")[0]); sys.argv = _argv
MIS = ['inferno','cryo','thunder','singularity','spiral','stellar','comet36','nova36','judgement36','swarm9','devour10_m','chrono11_m','monarch12_m']
SIDE = ['disc','lance36','chrono11_s','rail','solar','ricochet','gravity','prism','orbit36','halo36','carrier9','devour10_s','monarch12_s']
L = sys.argv[3].split(',') if len(sys.argv) > 3 else MIS + SIDE[:3]
CLEAN = "()=>{document.getElementById('tutorial392')?.remove();window.RULE84=false;window.TITLE84=false;try{Ch9.open=()=>true}catch{};document.querySelectorAll('.m63,.adv70,.st71').forEach(e=>e.hidden=true)}"
with sync_playwright() as p:
    for v in L:
        br = p.chromium.launch(); pg, errs, _o = setup(br, 'SS'); pg.wait_for_timeout(1500)
        kind = 'sidearm' if v in SIDE else 'missiles'
        if os.environ.get('TAT'): pg.add_init_script('window.GEARVK304=false')
        pg.add_init_script("""(()=>{try{const c=JSON.parse(localStorage['saobang-campaign-v36']||'null');if(c&&c.models&&!c.models.includes('%s')){c.models.push('%s');localStorage['saobang-campaign-v36']=JSON.stringify(c);}}catch(e){}try{const h=JSON.parse(localStorage['saobang-hangar-v1']);const it=h.items.find(i=>i.id===h.equipped['%s']);if(it){it.variant='%s';localStorage['saobang-hangar-v1']=JSON.stringify(h);}}catch(e){}})()""" % (v, v, kind, v))
        pg.reload(); pg.wait_for_timeout(4500); pg.evaluate(CLEAN)
        pg.evaluate("(a)=>{const [k,v]=a;Progress.setLocked(false);{const S=Progress.getState(),cur=S.items.find(i=>i.id===S.equipped[k]);if(!cur||cur.variant!==v){let it=null;try{it=Progress.grantChestGear(v,'','story')}catch(e){}if(it)Progress.equip(it.id);else if(cur)cur.variant=v;const S2=Progress.getState();window.__eq=(it?'grant':'mut')+':'+S2.items.find(i=>i.id===S2.equipped[k]).variant;}}selectCraft(0);launchCraft=0;document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='12';Lobby.hide();reset();if(mode==='pause')mode='play';window.__iv=setInterval(()=>{hp=maxHp;shield=0;superTime=0;try{player.y=760;player.x=240}catch{};for(let i=shots.length-1;i>=0;i--)if(!shots[i].gearItem)shots.splice(i,1);try{bullets.length=0}catch{}},20)}", [kind, v])
        pg.wait_for_timeout(3000)   # đầu màn tàu còn đang bay vào
        best = -1
        for t in range(24):
            pg.wait_for_timeout(250)
            n = pg.evaluate("()=>{let n=0;for(const s of (GearVK304.ST||[]))for(const b of s.pool)if(b.on&&(b.type==='shot'||b.type==='return'))n++;for(const q of shots)if(q.gearItem&&q.gearItem.kind!=='armor')n++;return n}")
            if n > best: best = n; pg.screenshot(path=f'{O}/{v}.png', clip={'x': 90, 'y': 330, 'width': 300, 'height': 480})
            if os.environ.get('CHUOI') and t % 3 == 0: pg.screenshot(path=f'{O}/{v}_{t:02d}.png', clip={'x': 0, 'y': 150, 'width': 393, 'height': 660})   # chuỗi khung cho món bắn qua skill81
        print(v, best, errs[:2], flush=True); br.close()
