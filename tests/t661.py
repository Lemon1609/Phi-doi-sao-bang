import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];seed=open('tests/seed_full.js').read().replace("cleared:Array.from({length:60},(_,i)=>i+1)","cleared:Array.from({length:24},(_,i)=>i+1)");R={}
with sync_playwright() as p:
    b=p.chromium.launch();c=b.new_context(viewport={'width':390,'height':844});c.add_init_script(seed)
    c.add_init_script("if(!sessionStorage.getItem('s2')){sessionStorage.setItem('s2',1);localStorage.setItem('saobang-unlock-v66',JSON.stringify({early:{},seen:['daily','chest','dungeon_gold','challenge','dungeon_mat','tower'],fails:{},gift:[]}));}")
    pg=c.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));toasts=[]
    pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3000)
    pg.evaluate("()=>{const ot=toast;toast=function(m){(window.__t=window.__t||[]).push(m);return ot.apply(this,arguments);}}")
    R['c']=pg.evaluate("()=>[Onboard66.cleared(),Onboard66.open('gems'),Onboard66.open('endless')]")
    for k in range(3):
        pg.evaluate("()=>{mode='menu';document.getElementById('mission-select').value='25';Lobby.hide();reset();endlessWave=Waves30.total();}")
        for i in range(30):
            pg.wait_for_timeout(500)
            if pg.evaluate("()=>!!(boss&&boss.bossHealthReady)"):break
        pg.evaluate("()=>{stageTime=Math.max(stageTime,25);hp=0;end(false);}");pg.wait_for_timeout(1300)
    R['toasts']=pg.evaluate("()=>(window.__t||[]).filter(t=>/KẸT|ĐỦ ĐIỀU|MỞ KHÓA/.test(t))")
    pg.evaluate("()=>{mode='menu';Onboard66.apply();}");pg.wait_for_timeout(300)
    R['after']=pg.evaluate("()=>[Onboard66.open('gems'),Onboard66.state().early,Onboard66.state().fails,(window.__t||[]).slice(-2)]")
    # thử thách ngày: không có cổng
    pg.evaluate("()=>{mode='menu';const pl=Play63.Daily.plan();Play63.Daily._force({...pl,lv:4,rule:Play63.Daily.rules[0],applied:false,mag:null,prevSup:0});document.getElementById('mission-select').value='4';Lobby.hide();reset();setInterval(()=>{if(mode==='play'){hp=maxHp;for(const e of enemies)if(!e.dead&&e!==boss&&e.y>0)kill(e);}},150)}")
    pg.wait_for_timeout(14000)
    R['daily']=pg.evaluate("()=>({act:!!Play63.Daily.active(),wave:Waves30.state().wave,gates:Gate66.gates().length,cores:Gate66.cores(),drops:Gate66.state().drops})")
    R['errs']=errs;b.close()
print(json.dumps(R,ensure_ascii=False))
