# V157 · kiểm 8 giáp SSS: chặn / giảm / hoãn / giữ mạng / né (đòn 'bullet' gọi thẳng damage())
import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1]
with sync_playwright() as p:
    b=p.chromium.launch();errs=[];pg=b.new_page(viewport={'width':412,'height':860});pg.on('pageerror',lambda e:errs.append(str(e)[:300]));pg.set_default_timeout(240000)
    pg.goto('file://'+f+'?nopop',timeout=240000);pg.wait_for_timeout(3000)
    pg.evaluate("()=>{Gfx66.open()}");pg.fill('#st66-code','SAOBANG-ADMIN-2026');pg.click('[data-adm]');pg.click('[data-adm]');pg.wait_for_timeout(15000)
    pg.wait_for_function("()=>typeof Gear44!=='undefined'&&typeof SSSE3_API!=='undefined'",timeout=240000);pg.wait_for_timeout(4000)
    def go(sid,par):
        pg.evaluate("""([sid,par])=>{document.querySelectorAll('.adv70,.st71,.u72,.m63,#g44').forEach(e=>e.hidden=true);document.getElementById('tutorial392')?.remove();mode='menu';try{Lobby.show()}catch{};Progress.setLocked(false);
          const it=Progress.getState().items.filter(x=>x.variant===par).sort((a,b)=>V70.nOf(b)-V70.nOf(a))[0];Progress.equip(it.id);Gear44.equipSSS('armor',sid);
          document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='20';Lobby.hide();reset();if(mode==='pause')mode='play';window.SHIELD78=false;window.BK78=false;window.FAIR76=false;}""",[sid,par]);pg.wait_for_timeout(3000)
    HIT="(()=>{invuln=0;bulletShieldTime=0;shield=0;const h0=hp;damage('bullet');return h0-hp})()"
    defs=pg.evaluate("()=>Gear44.defs().filter(d=>d.kind==='armor').map(d=>[d.id,d.parents[0]])")
    for sid,par in defs:
        go(sid,par)
        r=pg.evaluate("""()=>{const st=SSSE3_API.state();bullets=[];const out={act:st.a&&st.a.id,lv:st.a&&st.a.lv};const full=()=>{hp=maxHp*.8;};
          window.SSSE3=false;full();out.tat=+HIT.toFixed(3);window.SSSE3=undefined;
          let n=0,tot=0;for(let k=0;k<40;k++){full();const d=HIT;tot+=d;if(d<1e-9)n++;}out.chan=n+'/40';out.tb=+(tot/40).toFixed(3);out.no=SSSE3_API.state().a&&+SSSE3_API.state().a.debt.toFixed(3);
          hp=enemyScale()*.5;invuln=0;shield=0;bulletShieldTime=0;damage('bullet');out.song=hp>0;return out}""".replace('HIT',HIT))
        print(sid,json.dumps(r,ensure_ascii=False),flush=True)
    print('ERRS',errs[:6]);b.close()
