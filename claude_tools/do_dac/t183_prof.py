# V183 · lấy hồ sơ CPU 5 giây trong trận (ải 60, SSS, Bạo Tẩu) → hàm tốn thời gian nhất
import sys,json,collections
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
    c=pg.context.new_cdp_session(pg);c.send('Profiler.enable');c.send('Profiler.setSamplingInterval',{'interval':500});c.send('Profiler.start');pg.wait_for_timeout(5000);prof=c.send('Profiler.stop')['profile']
    nodes={n['id']:n for n in prof['nodes']};cnt=collections.Counter(prof['samples']);tot=sum(cnt.values())
    self_=collections.Counter()
    for nid,k in cnt.items():
        cf=nodes[nid]['callFrame'];self_[(cf['functionName'] or '(anon)',cf['lineNumber'],cf['columnNumber'])]+=k
    for (fn,l,cn),k in self_.most_common(14):print(f"{100*k/tot:5.1f}%  {fn}  L{l}:{cn}")
    par={}
    for n in prof['nodes']:
        for c in n.get('children',[]):par[c]=n['id']
    pc=collections.Counter()
    for nid,k in cnt.items():
        cf=nodes[nid]['callFrame']
        if cf['functionName'] in ('restore','save','drawImage','fill','stroke') and nid in par:
            q=nodes[par[nid]]['callFrame'];pc[(cf['functionName'],q['functionName'],q['lineNumber'])]+=k
    print('--- ham goi native ---')
    for (a,b_,l),k in pc.most_common(12):print(f"{100*k/tot:5.1f}%  {a} <- {b_} L{l}")
    print('beams',pg.evaluate("()=>{try{return beams.length+' warn '+beams.filter(b=>b.age<b.warn).length}catch(e){return String(e)}}"),'V105',pg.evaluate("()=>JSON.stringify(V105.state())"))
    b.close()
