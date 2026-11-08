# V85 · đo khả năng dọn quái (số quái hạ / 15 s) của 13 chiến cơ ở ải 59 (ải thường), cấp đạn 5, khung Trắng.
import sys,json,os
from playwright.sync_api import sync_playwright
f=sys.argv[1]
SEED="if(!sessionStorage.getItem('a85')){sessionStorage.setItem('a85','1');const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:60},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));}"
R={}
with sync_playwright() as p:
  b=p.chromium.launch();pg=b.new_page(viewport={'width':393,'height':852})
  pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2000);pg.add_init_script(SEED);pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(5500)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();window.RULE84=false;try{V75.addEn(2000)}catch{};for(let i=0;i<13;i++)try{Campaign36.acquire('craft',i,'','story')}catch{};window.__k=0;const ok=kill;kill=function(e){const w=e&&!e.dead;const r=ok.apply(this,arguments);if(w&&e.dead)window.__k++;return r;};window.kill=kill;setInterval(()=>{try{invuln=999;hp=maxHp;const d=document.getElementById('st80');if(d)d.hidden=true;window.__st80=0;}catch{}},200)}")
  for i in [int(x) for x in os.environ.get('SHIPS','0,1,2,3,4,5,6,7,8,9,10,11,12').split(',')]:
    pg.evaluate("(i)=>{try{PlayScreen.exit(false)}catch{};mode='menu';try{Lobby.show()}catch{};selectCraft(i);Progress.setLocked(false);try{V75.addEn(50)}catch{};document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='59';Lobby.hide();reset();}",i)
    pg.wait_for_timeout(1500);pg.evaluate("()=>{if(mode==='pause'){try{resume()}catch{}if(mode==='pause')mode='play';}}");pg.wait_for_timeout(1500);pg.evaluate("()=>{power=5;powerUpgrades=4;window.__k=0}");pg.wait_for_timeout(15000)
    R[i]=pg.evaluate("()=>({k:window.__k,mode,sel:selected})");print(i,R[i],flush=True)
  b.close()
print(json.dumps(R))
