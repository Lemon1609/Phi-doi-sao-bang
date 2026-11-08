import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];seed=open('tests/seed_full.js').read();R={}
with sync_playwright() as p:
    b=p.chromium.launch()
    c=b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,device_scale_factor=2);c.add_init_script(seed)
    c.add_init_script('(()=>{const h=JSON.parse(localStorage.getItem("saobang-hangar-v1"));const E={armor:1,missiles:3,sidearm:5};for(const it of h.items)it.enhance=E[it.kind]??0;localStorage.setItem("saobang-hangar-v1",JSON.stringify(h));localStorage.setItem("saobang-rank-v52",JSON.stringify({craft:"n0",armor:"n0",missiles:"n0",sidearm:"n0"}));})()')
    pg=c.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));toasts=[]
    pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2500)
    pg.evaluate("()=>{const ot=window.toast;window.__t=[];toast=function(m){__t.push(m);return ot.apply(this,arguments)};}")
    pg.evaluate("()=>{try{Hangar41.open()}catch(e){}}");pg.wait_for_timeout(1800)
    R['slots']=pg.evaluate("()=>[...document.querySelectorAll('#hgr41 .h1-slot')].map(e=>[e.dataset.slot,e.dataset.t52])")
    R['toast']=pg.evaluate("()=>__t")
    pg.screenshot(path='shots/v52_kho.png');R['errs']=errs;b.close()
print(json.dumps(R,ensure_ascii=False))
