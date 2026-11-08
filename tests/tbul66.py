import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];levels=[int(x) for x in sys.argv[2].split(',')];secs=int(sys.argv[3]) if len(sys.argv)>3 else 35
seed=open('tests/seed_full.js').read();R={}
with sync_playwright() as p:
    b=p.chromium.launch()
    for lv in levels:
        c=b.new_context(viewport={'width':390,'height':844});c.add_init_script(seed);pg=c.new_page();pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2800)
        pg.evaluate("""(l)=>{document.getElementById('tutorial392')?.remove();document.getElementById('mission-select').value=String(l);Lobby.hide();reset();window.M={n:0,sum:0,max:0,spawn:0,t0:performance.now(),hits:0};
          const od=damage;damage=function(){M.hits++;return od.apply(this,arguments)};
          setInterval(()=>{if(mode!=='play')return;hp=maxHp;shield=maxShield;let a=0;for(const x of bullets){if(x.dead)continue;a++;if(!x.m66){x.m66=1;M.spawn++;}}M.n++;M.sum+=a;M.max=Math.max(M.max,a);},100)}""",lv)
        pg.wait_for_timeout(secs*1000)
        R[lv]=pg.evaluate("()=>{const s=(performance.now()-M.t0)/1000;return {avg:+(M.sum/Math.max(1,M.n)).toFixed(1),max:M.max,perSec:+(M.spawn/s).toFixed(1),hitsPerMin:+(M.hits/s*60).toFixed(1),wave:Waves30.state().wave,boss:!!boss,mode}}")
        c.close()
    b.close()
print(json.dumps(R))
