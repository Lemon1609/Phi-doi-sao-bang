# V85 · so sánh độ khó boss ải 120/140/160/180: mẫu cũ REVIEW75 (B75_OLD) vs mẫu mới Gemini E1, bằng bot né đạn.
# Dùng: python3 tests/t85boss.py <html tuyệt đối> <thư_mục_ảnh> [giây_mỗi_pha]
import sys,json,os
from playwright.sync_api import sync_playwright
f=sys.argv[1];O=sys.argv[2]+'/';SEC=int(sys.argv[3]) if len(sys.argv)>3 else 15
BOT=open(os.path.join(os.path.dirname(__file__),'bot.js'),encoding='utf-8').read()
SEED="""if(!sessionStorage.getItem('t85')){sessionStorage.setItem('t85','1');const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:180},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));}"""
R={}
with sync_playwright() as p:
  b=p.chromium.launch()
  for st in [int(x) for x in os.environ.get('STAGES','120,140,160,180').split(',')]:
    for old in [True,False]:
      pg=b.new_page(viewport={'width':393,'height':852});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
      pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2000);pg.add_init_script(SEED);pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(5500)
      ok=pg.evaluate("""([st,old])=>{document.getElementById('tutorial392')?.remove();window.B75_OLD=old;try{V75.addEn(900)}catch{};try{Ch9.open=()=>true}catch{};
        mode='menu';Progress.setLocked(false);document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value=String(st);Lobby.hide();reset();
        window.__af=Arsenal30.fire;Arsenal30.fire=()=>{};setInterval(()=>{try{const d=document.getElementById('st80');if(d)d.hidden=true;window.__st80=0;if(hp<maxHp*.35)hp=maxHp;}catch{}},150);return {mode,level}}""",[st,old])
      # chờ boss
      for _ in range(160):
        if pg.evaluate("()=>!!(boss&&boss.bossHealthReady&&B75.state())"):break
        pg.evaluate("()=>{try{for(const e of enemies)if(!e.boss)e.dead=true;}catch{}}");pg.wait_for_timeout(250)
      pg.evaluate("()=>{invuln=0;}");pg.add_script_tag(content=BOT)
      res=[]
      for ph,r in enumerate([.85,.5,.15]):
        pg.evaluate("(r)=>{window.__b75r=r;}",r);pg.wait_for_timeout(1500)
        h0=pg.evaluate("()=>BOT.state().hits");nb=[]
        for k in range(SEC):
          pg.wait_for_timeout(1000);nb.append(pg.evaluate("()=>bullets.filter(b=>!b.dead).length"))
          if k==SEC//2 and not old:pg.screenshot(path=O+'b85_%d_p%d.png'%(st,ph+1))
        h1=pg.evaluate("()=>BOT.state().hits");sp=pg.evaluate("()=>{const L=bullets.filter(b=>!b.dead&&b.boss75);return L.length?Math.round(L.reduce((a,b)=>a+Math.hypot(b.vx||0,b.vy||0),0)/L.length):0}")
        res.append({'ph':ph+1,'hits':h1-h0,'bullets_avg':round(sum(nb)/len(nb),1),'bullets_max':max(nb),'speed':sp,'b75':pg.evaluate("()=>B75.state()")})
      R['%d_%s'%(st,'cu' if old else 'moi')]={'start':ok,'phases':res,'errs':errs[:3]}
      pg.close()
  b.close()
print(json.dumps(R,ensure_ascii=False))
for k,v in R.items():print(k,' | '.join('P%d: %d trúng/%ds · đạn tb %s, max %s · tốc %s'%(x['ph'],x['hits'],SEC,x['bullets_avg'],x['bullets_max'],x['speed']) for x in v['phases']),v['errs'])
