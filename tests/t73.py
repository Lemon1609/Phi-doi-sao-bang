import sys,json,os
from playwright.sync_api import sync_playwright
f=sys.argv[1];R={};O='/tmp/claude-0/t73/';os.makedirs(O,exist_ok=True)
def clean(pg):pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();document.querySelectorAll('.adv70,.st71,.u72').forEach(e=>e.hidden=true)}")
with sync_playwright() as p:
    b=p.chromium.launch();errs=[]
    c=b.new_context(viewport={'width':412,'height':1012},device_scale_factor=2);pg=c.new_page();pg.on('pageerror',lambda e:errs.append(str(e)));pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3000)
    pg.evaluate("()=>{Gfx66.open()}");pg.fill('#st66-code','SAOBANG-ADMIN-2026');pg.click('[data-adm]');pg.click('[data-adm]');pg.wait_for_timeout(8000);clean(pg)
    R['setup']=pg.evaluate("()=>{try{Fusion.select(null)}catch{};const eq=Progress.v70.equipped();return [typeof launchCraft!=='undefined'?launchCraft:null,eq,Object.fromEntries(Object.entries(eq).map(([k,id])=>[k,Progress.v70.get(id).variant]))]}")
    # α/β lên tên lửa đang mặc (adm-inferno = Hỏa Ngục bộ 1 → không có α/β) → đổi sang Phán Quyết
    R['ab']=pg.evaluate("""()=>{const it=Progress.grantChestGear('judgement36');Progress.equip(it.id);Progress.v70.set(it.id,{level:100,enhance:5});V70.sync();
      const key='g:'+it.id;const h=Stone71.hostOf(key);const a=Stone71.give(Stone71.make(4,'missiles',{ty:'alpha',m:'judgement36'})),be=Stone71.give(Stone71.make(4,'missiles',{ty:'beta',m:'judgement36'}));
      const tp=Stone71.give(Stone71.make(3,'missiles',{ty:'beta',m:'judgement36'}));
      const r=[h&&h.open,Stone71.put(key,3,a.id),Stone71.put(key,4,be.id),Stone71.put(key,2,be.id),a.ty,be.ty,tp.ty,Stone71.desc(a),Stone71.desc(tp)];
      const sh=Stone71.give(Stone71.make(4,'ship',{ty:'alpha',m:0}));r.push(sh.ty+':'+sh.m);
      const cp0=Math.round(Combat.stats().cp);r.push(cp0);return r}""")
    pg.evaluate("()=>{document.getElementById('mission-select').value='100';Lobby.hide();reset();}");pg.wait_for_timeout(2500)
    R['abMult']=pg.evaluate("()=>[mode,+Stone71.abMult().toFixed(4),Math.round(Combat.stats().cp)]")
    # hiệu ứng mới
    R['eff']=pg.evaluate("""()=>{const eq=Progress.v70.equipped();const ak='g:'+eq.armor;const add=(pos,k,key,slot)=>{const s=Stone71.give(Stone71.make(4,pos,{ty:'effect',k}));return Stone71.put(key,slot,s.id);};
      const r=[add('armor','a4',ak,3),add('armor','a5',ak,4)];bombs=1;const t0=time;return [r,Stone71.ef('a4'),Stone71.ef('a5'),bombs]}""")
    pg.wait_for_timeout(1000)
    R['tok']=pg.evaluate("()=>[bombs,mode]")
    clean(pg)
    pg.evaluate("()=>{mode='menu';Lobby.show&&Lobby.show();for(let i=0;i<8;i++)Stone71.give(Stone71.make(3,'armor',{ty:'stat'}));Stone71._rf(3,'missiles');}")
    R['rf']=pg.evaluate("""()=>{const T=Stone71.targets(3,'missiles');const pin=T.find(x=>x.ty==='alpha')||T[0];Stone71._set({pin:Object.assign({t:3},pin)});const n0=Stone71.state().st.length;const s=Stone71.reforgeStd();const o=Stone71.reforgeOne();return [T.length,pin,s&&[s.t,s.ty,s.m],n0,Stone71.state().st.length,o&&[o.hit,o.s.ty],Stone71.state().rpity]}""")
    pg.evaluate("()=>{Stone71.reforge({})}");pg.wait_for_timeout(300);pg.screenshot(path=O+'reforge.png')
    pg.evaluate("()=>{const eq=Progress.v70.equipped();Stone71.host('g:'+eq.missiles)}");pg.wait_for_timeout(300);pg.screenshot(path=O+'host_ab.png')
    # Vô Tận vượt sẵn
    clean(pg)
    R['endless']=pg.evaluate("""()=>{const key='c'+(typeof launchCraft!=='undefined'?launchCraft:0);const s6=Stone71.give(Stone71.make(4,'ship',{ty:'effect',k:'s6'}));const ok=Stone71.put(key,1,s6.id);document.getElementById('gamemode').value='endless';Lobby.hide();reset();return [ok,gameMode,level]}""")
    pg.wait_for_timeout(1500);R['endless'].append(pg.evaluate("()=>[mode,level]"))
    R['errs']=errs;b.close()
print(json.dumps(R,ensure_ascii=False))
