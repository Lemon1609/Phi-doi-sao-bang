import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1]
with sync_playwright() as p:
    b=p.chromium.launch();errs=[];pg=b.new_page(viewport={'width':412,'height':860});pg.on('pageerror',lambda e:errs.append(str(e)[:300]));pg.set_default_timeout(240000)
    pg.goto('file://'+f+'?nopop',timeout=240000);pg.wait_for_timeout(3000)
    pg.evaluate("()=>{Gfx66.open()}");pg.fill('#st66-code','SAOBANG-ADMIN-2026');pg.click('[data-adm]');pg.click('[data-adm]');pg.wait_for_timeout(15000)
    pg.wait_for_function("()=>typeof Gear44!=='undefined'",timeout=240000);pg.wait_for_timeout(3000)
    pg.evaluate("()=>{window.__d=new Set();const o=CanvasRenderingContext2D.prototype.drawImage;CanvasRenderingContext2D.prototype.drawImage=function(im,...a){try{if(im&&im.src)window.__d.add(im.src.length+':'+im.src.slice(-40));}catch{}return o.call(this,im,...a)}}")
    for sid in (sys.argv[2].split(',') if len(sys.argv)>2 else ['sss_devour_chrono_s','sss_chrono_monarch_s','sss_devour_chrono_m','sss_chrono_monarch_m','sss_monarch_rail','sss_lance_orbit','sss_comet_nova']):
        r=pg.evaluate("""(sid)=>{const d=Gear44.defs().find(x=>x.id===sid);document.querySelectorAll('.adv70,.st71,.u72,.m63,#g44').forEach(e=>e.hidden=true);document.getElementById('tutorial392')?.remove();mode='menu';try{Lobby.show()}catch{};Progress.setLocked(false);
          for(const pv of d.parents){if(!Progress.getState().items.some(i=>i.variant===pv)){try{Campaign36.acquire('gear',pv,'SS','endless');const mi=Progress.getState().items.filter(i=>i.variant===pv).slice(-1)[0];V70.setTier('gear',mi.id,11);}catch(e){}}}try{Gear44.fuse(sid);document.querySelector('.g44-rite')&&(document.querySelector('.g44-rite').hidden=true);}catch{}
          const it=Progress.getState().items.filter(x=>x.variant===d.parents[0]).sort((a,b)=>V70.nOf(b)-V70.nOf(a))[0];if(!it)return 'no item';Progress.equip(it.id);Gear44.equipSSS(d.kind,sid);
          document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='20';Lobby.hide();reset();if(mode==='pause')mode='play';invuln=1e9;window.__s=sid;return d.kind+' '+d.parents}""",sid)
        pg.wait_for_timeout(6000)
        pg.evaluate("()=>{window.__d.clear();superTime=6}");pg.wait_for_timeout(4000)
        n=pg.evaluate("""(sid)=>{const o=[];for(const k of Object.keys(GEAR44_ASSETS))if(k.startsWith(sid+'_')){const u=GEAR44_ASSETS[k];if(window.__d.has(u.length+':'+u.slice(-40)))o.push(k.slice(sid.length+1));}window.__d.clear();return o.join(',')}""",sid)
        print(sid,r,'|',n,flush=True);pg.screenshot(path='/tmp/claude-0/t180_'+sid+'.png')
    
    print('ERRS',errs[:6]);b.close()
