# V110 · tàu bay sát 4 góc màn hình (kéo ngón tay)
import sys
from playwright.sync_api import sync_playwright
f=sys.argv[1];O=sys.argv[2]+'/';OK=[]
def chk(n,c):OK.append(('✓' if c else '✗')+' '+n)
with sync_playwright() as p:
  b=p.chromium.launch();pg=b.new_page(viewport={'width':393,'height':852},has_touch=True);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto('file://'+f+'?nopop');pg.wait_for_function("()=>typeof V105==='object'",timeout=120000);pg.wait_for_timeout(3000)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();document.querySelectorAll('.m63').forEach(e=>e.hidden=true);mode='menu';try{Lobby.show()}catch{};Progress.setLocked(false);document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='1';Lobby.hide();reset();if(mode==='pause')mode='play';setInterval(()=>{invuln=999;const d=document.getElementById('st80');if(d)d.hidden=true;window.__st80=0;if(mode==='pause')mode='play'},100)}")
  pg.wait_for_timeout(1500)
  res={}
  for name,(fx,fy) in {'trái trên':(-1,-1),'phải trên':(1,-1),'trái dưới':(-1,1),'phải dưới':(1,1),'giữa dưới':(0,1)}.items():
    pg.evaluate("()=>{player.x=W/2;player.y=H*.6;pointerTarget=null}")
    r=pg.evaluate("""([fx,fy])=>{const c=document.querySelector('canvas#game');const R=c.getBoundingClientRect();const x0=R.x+R.width/2,y0=R.y+R.height*.6;
      const ev=(t,x,y)=>c.dispatchEvent(new PointerEvent(t,{pointerId:9,pointerType:'touch',clientX:x,clientY:y,bubbles:true,isPrimary:true}));
      ev('pointerdown',x0,y0);for(let i=1;i<=10;i++)ev('pointermove',x0+fx*i*60,y0+fy*i*90);return true}""",[fx,fy])
    pg.wait_for_timeout(1500)
    res[name]=pg.evaluate("()=>({m:mode,x:Math.round(player.x),y:Math.round(player.y),W,H:Math.round(H)})")
    pg.evaluate("()=>{const c=document.querySelector('canvas#game');c.dispatchEvent(new PointerEvent('pointerup',{pointerId:9,pointerType:'touch',bubbles:true}))}");pg.wait_for_timeout(200)
  W=res['trái trên']['W'];H=res['trái trên']['H']
  z=pg.evaluate('()=>V111.zones()');print('zones',z)
  top=min(q['t'] for q in z) if z else H
  chk('V116: góc dưới không còn bị chặn (trái %s · phải %s)'%(res['trái dưới'],res['phải dưới']),res['trái dưới']['y']>=H-30 and res['phải dưới']['y']>=H-30)
  ok=res['trái trên']['x']<=30 and res['phải trên']['x']>=W-30 and res['giữa dưới']['y']>=H-30 and res['trái trên']['y']<=60
  chk('Tàu tới sát 4 góc (%s)'%res,ok)
  pg.screenshot(path=O+'corner.png')
  errs=[e for e in errs if 'setPointerCapture' not in e];chk('không lỗi JS'+(' · '+errs[0][:200] if errs else ''),not errs)
  b.close()
print('\n'.join(OK))
