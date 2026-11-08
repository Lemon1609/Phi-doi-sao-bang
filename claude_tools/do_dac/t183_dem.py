# V183 · đếm số lần save()/drawImage mỗi khung + nơi gọi nhiều nhất (lấy mẫu stack 1/40)
import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];stage=sys.argv[2] if len(sys.argv)>2 else '60';sup=len(sys.argv)>3
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':412,'height':860},device_scale_factor=2);pg.set_default_timeout(240000)
    pg.goto('file://'+f+'?nopop',timeout=240000);pg.wait_for_timeout(3000)
    pg.evaluate("()=>{Gfx66.open()}");pg.fill('#st66-code','SAOBANG-ADMIN-2026');pg.click('[data-adm]');pg.click('[data-adm]');pg.wait_for_timeout(15000)
    pg.evaluate("""(st)=>{document.querySelectorAll('.adv70,.st71,.u72,.m63,#g44,#st66').forEach(e=>e.hidden=true);document.getElementById('tutorial392')?.remove();mode='menu';try{Lobby.show()}catch{};Progress.setLocked(false);
      try{Gear44.equipSSS('missiles','sss_monarch_inferno');Gear44.equipSSS('sidearm','sss_lance_orbit');Gear44.equipSSS('armor','sss_aegis_mirror');}catch(e){}
      document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value=st;Lobby.hide();reset();if(mode==='pause')mode='play';invuln=1e9;}""",stage)
    pg.wait_for_timeout(9000)
    if sup:pg.evaluate("()=>{superTime=8}")
    r=pg.evaluate("""()=>new Promise(res=>{const C={save:0,di:0,arc:0,grad:0},W={};let i=0;const sv=ctx.save,di=ctx.drawImage;const P=CanvasRenderingContext2D.prototype,og=P.createLinearGradient,orad=P.createRadialGradient;
      ctx.save=function(){C.save++;if(++i%40===0){const s=(new Error().stack||'').split('\\n')[2]||'';const k=s.trim().replace(/\\(file.*?:(\\d+):\\d+\\)/,'L$1').slice(0,70);W[k]=(W[k]||0)+40;}return sv.apply(this,arguments)};
      P.createLinearGradient=function(){C.grad++;return og.apply(this,arguments)};P.createRadialGradient=function(){C.grad++;return orad.apply(this,arguments)};
      let n=0;const t0=performance.now();function f(){n++;if(performance.now()-t0<3000)requestAnimationFrame(f);else{ctx.save=sv;P.createLinearGradient=og;P.createRadialGradient=orad;res({frames:n,save_per_frame:Math.round(C.save/n),grad_per_frame:Math.round(C.grad/n),top:Object.entries(W).sort((a,b)=>b[1]-a[1]).slice(0,12).map(([k,v])=>[Math.round(v/n),k])});}}requestAnimationFrame(f);})""")
    print(json.dumps(r,ensure_ascii=False,indent=0));b.close()
