# V183 · kiểm tra tổng thể: thời gian tải, bộ nhớ, FPS trong trận (thường / boss / Bạo Tẩu + SSS), chụp các màn
import sys,json,time
from playwright.sync_api import sync_playwright
f=sys.argv[1];O='/tmp/claude-0/audit/'
with sync_playwright() as p:
    b=p.chromium.launch(args=['--enable-precise-memory-info']);errs=[];cons=[]
    pg=b.new_page(viewport={'width':412,'height':860},device_scale_factor=2);pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
    pg.on('console',lambda m:cons.append(m.text[:160]) if m.type=='error' else None)
    pg.set_default_timeout(240000)
    t0=time.time();pg.goto('file://'+f,timeout=240000);t1=time.time()
    pg.wait_for_function("()=>typeof Lobby!=='undefined'",timeout=240000);t2=time.time()
    pg.wait_for_timeout(4000);pg.screenshot(path=O+'01_mo_game.png')
    mem=lambda:pg.evaluate("()=>performance.memory?Math.round(performance.memory.usedJSHeapSize/1e6):0")
    print('tai_html_s',round(t1-t0,1),'san_sang_s',round(t2-t0,1),'heap_MB',mem(),flush=True)
    pg.evaluate("()=>{try{Gfx66.open()}catch{}}");pg.wait_for_timeout(800);pg.screenshot(path=O+'02_cai_dat.png')
    pg.fill('#st66-code','SAOBANG-ADMIN-2026');pg.click('[data-adm]');pg.click('[data-adm]');pg.wait_for_timeout(15000)
    pg.evaluate("()=>{document.querySelectorAll('.adv70,.st71,.u72,.m63,#g44,#st66').forEach(e=>e.hidden=true);document.getElementById('tutorial392')?.remove();mode='menu';try{Lobby.show()}catch{}}");pg.wait_for_timeout(1500)
    pg.screenshot(path=O+'03_sanh.png');print('heap_sau_admin',mem(),flush=True)
    FPS="""(ms)=>new Promise(r=>{let n=0,worst=0,last=performance.now();const t0=last;function f(){const now=performance.now();worst=Math.max(worst,now-last);last=now;n++;if(now-t0<ms)requestAnimationFrame(f);else r({fps:+(n*1000/(now-t0)).toFixed(1),worst_ms:Math.round(worst),bullets:(typeof bullets!=='undefined'?bullets.length:0),shots:(typeof shots!=='undefined'?shots.length:0),enemies:(typeof enemies!=='undefined'?enemies.length:0)})}requestAnimationFrame(f)})"""
    def battle(stage,tag,sss=False,sup=False):
        pg.evaluate("""([st,sss])=>{document.querySelectorAll('.adv70,.st71,.u72,.m63,#g44').forEach(e=>e.hidden=true);mode='menu';try{Lobby.show()}catch{};Progress.setLocked(false);
          if(sss){try{Gear44.equipSSS('missiles','sss_monarch_inferno');Gear44.equipSSS('sidearm','sss_lance_orbit');Gear44.equipSSS('armor','sss_aegis_mirror');}catch(e){}}
          document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value=String(st);Lobby.hide();reset();if(mode==='pause')mode='play';invuln=1e9;}""",[stage,sss])
        pg.wait_for_timeout(9000)
        if sup:pg.evaluate("()=>{superTime=8}")
        r=pg.evaluate(FPS,5000);r['heap']=mem();print(tag,json.dumps(r),flush=True);pg.screenshot(path=O+tag+'.png')
    battle(3,'10_tran_ai3')
    battle(20,'11_tran_ai20_boss')
    battle(60,'12_tran_ai60_SSS_baotau',sss=True,sup=True)
    battle(100,'13_tran_ai100_SSS',sss=True)
    print('ERRS',len(errs),errs[:5]);print('CONSOLE_ERR',len(cons),cons[:5]);b.close()
