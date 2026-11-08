# V86 · duyệt tranh GPT đợt V85 trong game: boss 120/140/160, vỏ giáp + bệ bộ 6–12, skin #11–#13, đạn địch chương 6–9
import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];O=sys.argv[2]+'/';R={};OK=[]
def chk(n,c):OK.append(('✓' if c else '✗')+' '+n)
SEED="if(!sessionStorage.getItem('ta86')){sessionStorage.setItem('ta86','1');const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:179},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));}"
GO="""(a)=>{const [st,ship,set]=a;mode='menu';try{Lobby.show()}catch{};try{Ch9.open=()=>true}catch{};Progress.setLocked(false);try{V75.addEn(99)}catch{};
 if(set!=null){for(const m of Campaign36.sets[set]){Campaign36.acquire('gear',m,'','story');const it=Progress.getState().items.filter(x=>x.variant===m).slice(-1)[0];if(it)Progress.equip(it.id);}}
 if(ship!=null)selectCraft(ship);document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value=String(st);Lobby.hide();reset();if(mode==='pause'){try{resume()}catch{}if(mode==='pause')mode='play';}
 if(!window.__iv86)window.__iv86=setInterval(()=>{try{invuln=999;hp=maxHp;const d=document.getElementById('st80');if(d)d.hidden=true;window.__st80=0;}catch{}},150);return {mode,level}}"""
with sync_playwright() as p:
  b=p.chromium.launch();pg=b.new_page(viewport={'width':393,'height':852});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2000);pg.add_init_script(SEED);pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(6500)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();window.RULE84=false;for(let i=0;i<13;i++)try{Campaign36.acquire('craft',i,'','story')}catch{}}")
  R['loaded']=pg.evaluate("()=>({art:Object.keys(ART86_ASSETS).length,boss:Boss82.state()})")
  chk('Nạp 84 tranh art86 + boss 120/140/160',R['loaded']['art']>=84 and all(str(s) in R['loaded']['boss']['stages'] for s in [120,140,160]))
  # boss
  R['boss']={}
  for st in [120,140,160]:
    pg.evaluate(GO,[st,0,None])
    for _ in range(160):
      if pg.evaluate("()=>!!(boss&&boss.bossHealthReady&&boss.y>80)"):break
      pg.evaluate("()=>{try{for(const e of enemies)if(!e.boss)e.dead=true;}catch{}}");pg.wait_for_timeout(250)
    pg.evaluate("()=>{window.__b75r=.5}");pg.wait_for_timeout(3500)
    R['boss'][st]=pg.evaluate("()=>({art:!!Boss82.META[level],parts:(boss.parts||[]).map(p=>[Math.round(p.x-boss.x),Math.round(p.y-boss.y)]),bul:bullets.filter(b=>!b.dead&&b.__e86).length,all:bullets.filter(b=>!b.dead).length,k:[...new Set(bullets.map(b=>b.__e86).filter(Boolean))].slice(0,4)})")
    pg.screenshot(path=O+'a86_boss%d.png'%st)
  chk('Boss 120/140/160 có tranh GPT',all(R['boss'][s]['art'] for s in R['boss']))
  chk('Đạn địch chương 6–8 dùng tranh mới',all(R['boss'][s]['bul']>0 for s in R['boss']))
  # trang bị bộ 6 và bộ 10 trên #1, bộ 12 trên #13
  for st,ship,st_set,tag in [(101,0,6,'set6'),(102,10,10,'set10'),(103,12,12,'set12')]:
    pg.evaluate(GO,[st,ship,st_set]);pg.wait_for_timeout(3500)
    R[tag]=pg.evaluate("()=>{const out={};try{for(const k of ['armor','missiles','sidearm']){const st=Gear44&&Gear44.fxState?Gear44.fxState(k):null;out[k]=st?st.__a86||null:'?';}}catch(e){out.err=String(e)}return out}")
    box=pg.evaluate("()=>{const c=document.querySelector('canvas');const r=c.getBoundingClientRect();return [r.x+player.x*r.width/W-95,r.y+player.y*r.height/H-100,190,190]}")
    pg.screenshot(path=O+'a86_%s.png'%tag,clip={'x':max(0,box[0]),'y':box[1],'width':box[2],'height':box[3]})
  # skin #11
  R['skin']=pg.evaluate("""async()=>{mode='menu';try{Lobby.show()}catch{};Art86._set({own:{s10_huyetlong:1}});Art86.wear(10,true);selectCraft(10);Skin69.open();await new Promise(r=>setTimeout(r,800));return {txt:(document.querySelector('.sk69')||{}).innerText||'',eq:Art86.eqOf(10)}}""")
  pg.screenshot(path=O+'a86_tuskin.png')
  chk('Tủ skin có chiến cơ #11–#13 + skin riêng',('Huyết Long' in R['skin']['txt']) and R['skin']['eq']=='s10_huyetlong')
  pg.evaluate("()=>{document.querySelectorAll('.sk69').forEach(e=>e.hidden=true)}");pg.evaluate(GO,[104,10,None]);pg.wait_for_timeout(3000)
  box=pg.evaluate("()=>{const c=document.querySelector('canvas');const r=c.getBoundingClientRect();return [r.x+player.x*r.width/W-95,r.y+player.y*r.height/H-100,190,190]}")
  pg.screenshot(path=O+'a86_skin11.png',clip={'x':max(0,box[0]),'y':box[1],'width':box[2],'height':box[3]})
  R['errs']=errs[:5];chk('không lỗi JS',not errs);b.close()
print(json.dumps(R,ensure_ascii=False)[:2500]);print('KẾT QUẢ '+' · '.join(OK))
