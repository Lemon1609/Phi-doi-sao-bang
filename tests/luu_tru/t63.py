import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];seed=open('tests/seed_full.js').read();R={}
with sync_playwright() as p:
    b=p.chromium.launch()
    def ctx(E=0):
        c=b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,device_scale_factor=2);c.add_init_script(seed)
        c.add_init_script('(()=>{const w=JSON.parse(localStorage.getItem("saobang-workshop-v1"));w.craftEnhancements=w.craftEnhancements.map(()=>%d);localStorage.setItem("saobang-workshop-v1",JSON.stringify(w));})()'%E)
        pg=c.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2800);return c,pg,errs
    # 1) tác dụng tiến hóa
    for E in (0,4,5):
        c,pg,errs=ctx(E)
        pg.evaluate("()=>{document.getElementById('mission-select').value='3';Lobby.hide();reset();window.__g=setInterval(()=>{if(mode==='play'){bullets.length=0;player.x=240;player.y=H*.8;for(const e of enemies)if(e.hp<5)e.hp=50;}},20)}")
        pg.wait_for_timeout(5000)
        r=pg.evaluate("()=>{const a=Evo53.perk();const h0=hp,s0=shield;invuln=0;shield=0;bulletShieldTime=0;damage('bullet');const h1=hp;invuln=0;damage('bullet');return {perk:a,after:Evo53.perk().blocks,hp:[h0,h1,hp]}}")
        r['errs']=errs;R['evo_e%d'%E]=r;c.close()
    # 2) sao theo mục tiêu + gợi ý graze
    c,pg,errs=ctx(0)
    out={}
    for lv,act in [(3,'none'),(3,'hit'),(3,'bomb'),(4,'none'),(4,'graze')]:
        pg.evaluate("(lv)=>{if(mode!=='menu'){mode='menu';}document.getElementById('mission-select').value=String(lv);Lobby.hide();reset();}",lv);pg.wait_for_timeout(400)
        pg.evaluate("(a)=>{if(a==='hit'){invuln=0;shield=0;bulletShieldTime=0;damage('bullet');}if(a==='bomb'){bombs=Math.max(1,bombs);bomb();}if(a==='graze'){for(let i=0;i<9;i++){const b={x:player.x+12,y:player.y,r:3,dead:false};invuln=0;bulletShieldTime=0;Combat26.graze(b,12);}}}",act)
        out['lv%d_%s'%(lv,act)]=pg.evaluate("()=>[Report392.starScore(),Play63.obj3(level).txt]")
    out['hint']=pg.evaluate("()=>localStorage.getItem('saobang-hint-v63')")
    R['stars']=out;R['stars_errs']=errs;c.close()
    # 3) sao lưu + thử thách ngày
    c,pg,errs=ctx(0)
    pg.evaluate("()=>localStorage.setItem('saobang-gear-sss-v1',JSON.stringify({v:1,owned:{sss_aegis_mirror:{at:1}},equip:{armor:null,missiles:null,sidearm:null}}))")
    R['backup']=pg.evaluate("()=>{const code=DeviceSave.encode();const d=DeviceSave.decode(code);const v=DeviceSave.validate(d);return {len:code.length,hasSSS:!!d.data['saobang-gear-sss-v1'],validSSS:!!v['saobang-gear-sss-v1'],keys:Object.keys(v).length}}")
    pg.evaluate("()=>{try{Hangar41.open()}catch(e){}}");pg.wait_for_timeout(1500)
    R['side']=pg.evaluate("()=>[...document.querySelectorAll('#hgr41 .h1-side button')].map(b=>b.textContent)")
    pg.evaluate("()=>Play63.Daily.open()");pg.wait_for_timeout(300);pg.screenshot(path='shots/v63_daily.png')
    plan=pg.evaluate("()=>{const p=Play63.Daily.plan();return {lv:p.lv,rule:p.rule.id,credits:p.credits}}");R['plan']=plan
    c0=pg.evaluate("()=>Progress.getState().credits")
    pg.evaluate("()=>document.querySelector('#m63-daily .m63-go').click()");pg.wait_for_timeout(2500)
    R['daily_play']=pg.evaluate("()=>({mode,level,act:Play63.Daily.state().act,hp,bombs})");pg.screenshot(path='shots/v63_daily_play.png')
    pg.evaluate("()=>{mode='reward';}");pg.wait_for_timeout(1500)
    R['daily_done']=pg.evaluate("()=>Play63.Daily.state()");R['credits']=[c0,pg.evaluate("()=>Progress.getState().credits")]
    pg.evaluate("()=>{mode='menu';Play63.openBackup()}");pg.wait_for_timeout(300);pg.evaluate("()=>document.querySelector('#m63-save .m63-copy').click()");pg.wait_for_timeout(500);pg.screenshot(path='shots/v63_save.png')
    R['save_st']=pg.evaluate("()=>document.querySelector('#m63-save .m63-st').textContent")
    pg.evaluate("()=>document.querySelector('#m63-save .m63-check').click()");pg.wait_for_timeout(300)
    R['check_st']=pg.evaluate("()=>[document.querySelector('#m63-save .m63-st').textContent,document.querySelector('#m63-save .m63-restore').disabled]")
    R['errs3']=errs;c.close();b.close()
print(json.dumps(R,ensure_ascii=False,indent=0))
