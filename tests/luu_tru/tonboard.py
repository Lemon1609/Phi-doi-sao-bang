import sys
from playwright.sync_api import sync_playwright
f=sys.argv[1];res={}
with sync_playwright() as p:
    b=p.chromium.launch()
    for name,vp in [('doc',dict(viewport={'width':390,'height':844},device_scale_factor=2,is_mobile=True,has_touch=True)),('ngang',dict(viewport={'width':1280,'height':720}))]:
        c=b.new_context(**vp);pg=c.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        pg.goto('file://'+f)
        vis="()=>{const t=document.getElementById('tutorial392'),m=document.getElementById('m40');const r=t&&t.getBoundingClientRect();return {tut:t?getComputedStyle(t).visibility:'none',x:r&&Math.round(r.x),w:r&&Math.round(r.width),daily:!!(m&&!m.hidden&&m.childElementCount)}}"
        pg.wait_for_timeout(1000);s1=pg.evaluate(vis)
        pg.wait_for_timeout(2500);s2=pg.evaluate(vis);pg.screenshot(path=f'shots/v45/ob_{name}_1.png')
        pg.evaluate("()=>{const m=document.getElementById('m40');const x=m.querySelector('[data-x],.x,.close,button[aria-label*=\"Đóng\"]');if(x)x.click();else m.hidden=true;}")
        pg.wait_for_timeout(600);s3=pg.evaluate(vis);pg.screenshot(path=f'shots/v45/ob_{name}_2.png')
        pg.click('#tutorial-next392');pg.click('#tutorial-next392');pg.click('#tutorial-next392');pg.wait_for_timeout(300)
        s4=pg.evaluate("()=>({tutorialDone:Campaign36.getState().tutorial,card:!!document.getElementById('tutorial392')})")
        res[name]=dict(t1s=s1,t3s=s2,sau_dong=s3,xong=s4,errs=errs);c.close()
    b.close()
for k,v in res.items():print(k,v)
