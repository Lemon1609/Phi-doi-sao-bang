import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];R={};O='/tmp/claude-0/t69/'
with sync_playwright() as p:
    b=p.chromium.launch();errs=[]
    c=b.new_context(viewport={'width':412,'height':1012},device_scale_factor=2);pg=c.new_page();pg.on('pageerror',lambda e:errs.append(str(e)));pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3500)
    pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();document.getElementById('m40')?.remove();Progress.grantCredits(9e6);Workshop.grant({exp:9e5});}")
    R['mig']=pg.evaluate("()=>Skin69.state()")
    for e in range(0,6):
        if e>0:
            R['p%d'%e]=pg.evaluate("()=>{let k=0;while(Workshop.upgradeCraft(0)&&k<300)k++;for(const t of ['alloy','crystal','circuit','plasma'])for(const n of [1,2,3])Adv69.add(t+n,30);Workshop.grant({craft:0,fragments:50});return [Workshop.promoteCraft(0),Workshop.craftProgress(0).enhance]}")
        pg.wait_for_timeout(700)
        pg.screenshot(path=O+'hg_e%d.png'%e,clip={'x':0,'y':130,'width':412,'height':480})
    pg.evaluate("()=>Skin69.open()");pg.wait_for_timeout(800);pg.screenshot(path=O+'wardrobe.png')
    R['spin']=pg.evaluate("()=>[Skin69.spin(),Skin69.state().sh]")
    pg.evaluate("()=>{Skin69.giveOwn('evo3');Skin69.close()}")
    pg.evaluate("()=>{document.getElementById('mission-select').value='1';Lobby.hide();reset();}");pg.wait_for_timeout(3500);pg.screenshot(path=O+'battle_e5.png')
    R['perk']=pg.evaluate("()=>[Skin69.realT(),Skin69.evoE(0)]")
    R['errs']=errs;b.close()
print(json.dumps(R,ensure_ascii=False))
