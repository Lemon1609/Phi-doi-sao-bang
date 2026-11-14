import sys
from playwright.sync_api import sync_playwright
f=sys.argv[1];tag=sys.argv[2]
with sync_playwright() as p:
    b=p.chromium.launch();c=b.new_context(viewport={'width':390,'height':844},device_scale_factor=3,is_mobile=True,has_touch=True)
    pg=c.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3000)
    pg.evaluate("()=>{try{document.getElementById('tutorial392')?.remove();Campaign36.finishTutorial();}catch(e){};Lobby.hide();reset();window.__g=setInterval(()=>{if(mode==='play')hp=maxHp},16)}");pg.wait_for_timeout(3500)
    shots=[]
    def snap(n):
        pg.screenshot(path=f'shots/v45/{tag}_{n}.png');shots.append(n)
    snap('ready')
    pg.tap('#missile-action');pg.wait_for_timeout(1500);snap('cd')
    r=pg.evaluate("()=>({cd:Equipment25.cooldown(),txt:document.querySelector('#missile-action small').textContent,bombs})")
    pg.tap('#bomb');pg.wait_for_timeout(600);r2=pg.evaluate("()=>({bombs,txt:document.getElementById('bombcount').textContent})")
    pg.tap('#pause');pg.wait_for_timeout(400);r3=pg.evaluate("()=>mode");pg.tap('#pause');pg.wait_for_timeout(300)
    print(tag,r,r2,'pause->',r3,'sau:',pg.evaluate("()=>mode"),errs)
    b.close()
from PIL import Image
s=3;ims=[Image.open(f'shots/v45/{tag}_{n}.png') for n in ('ready','cd')]
o=Image.new('RGB',(390*s,130*s*2))
for i,im in enumerate(ims):
    o.paste(im.crop((0,0,390*s,46*s)).crop((240*s,0,390*s,46*s)),(0,i*130*s));o.paste(im.crop((0,754*s,390*s,844*s)),(0,i*130*s+40*s))
o.resize((585,390)).save(f'shots/v45/{tag}_hud.png')
