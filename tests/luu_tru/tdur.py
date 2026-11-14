import sys,json,time as T
from playwright.sync_api import sync_playwright
seed=open('tests/seed_full.js').read();out={}
with sync_playwright() as p:
    b=p.chromium.launch();pages=[]
    for f in sys.argv[2:]:
        for lv in sys.argv[1].split(','):
            c=b.new_context(viewport={'width':390,'height':844});c.add_init_script(seed);pg=c.new_page()
            pg.goto('file:///home/claude/V44_kit/'+f+'?nopop');pages.append((f,lv,pg))
    T.sleep(3)
    for f,lv,pg in pages:
        pg.evaluate("l=>{window.__dmg=0;document.getElementById('mission-select').value=l;Lobby.hide();reset();window.__k=0;const ok=kill;kill=function(e){if(!e.dead)window.__k++;return ok.apply(this,arguments)};const oh=window.hp;window.__g=setInterval(()=>{if(mode==='play'){if(hp<maxHp)window.__dmg+=maxHp-hp;hp=maxHp;}},16);}",lv)
    t0=T.time();done=set()
    while T.time()-t0<300 and len(done)<len(pages):
        T.sleep(5)
        for i,(f,lv,pg) in enumerate(pages):
            if i in done:continue
            s=pg.evaluate("()=>({mode,stageTime,wave:endlessWave,kills:window.__k,boss:!!boss,dmg:window.__dmg})")
            if s['mode'] in('reward','over','win'):done.add(i);out[f+' ai '+lv]=s
    for i,(f,lv,pg) in enumerate(pages):
        if i not in done:out[f+' ai '+lv]={'chua_xong':pg.evaluate("()=>({mode,stageTime,wave:endlessWave,kills:window.__k,boss:!!boss,dmg:window.__dmg})")}
    b.close()
print(json.dumps(out,ensure_ascii=False,indent=1))
