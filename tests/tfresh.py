import sys
from playwright.sync_api import sync_playwright
f=sys.argv[1];out={}
with sync_playwright() as p:
    b=p.chromium.launch()
    for name,vp in [('doc',dict(viewport={'width':390,'height':844},device_scale_factor=2,is_mobile=True,has_touch=True)),('ngang',dict(viewport={'width':1280,'height':720}))]:
        c=b.new_context(**vp);pg=c.new_page();errs=[]
        pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:m.type=='error' and errs.append(m.text))
        pg.goto('file://'+f);pg.wait_for_timeout(4000);pg.screenshot(path=f'shots/v45/fresh_{name}.png')
        pg.evaluate("()=>{try{Lobby.hide();reset();}catch(e){}}");pg.wait_for_timeout(6000)
        st=pg.evaluate("()=>({mode,score,safety:Safety31.stats().errors,gearSSS:localStorage.getItem('saobang-gear-sss-v1')})")
        pg.screenshot(path=f'shots/v45/fresh_{name}_play.png')
        pg.reload();pg.wait_for_timeout(3000)
        out[name]={**st,'errs':errs[:5]};c.close()
    b.close()
print(out)
