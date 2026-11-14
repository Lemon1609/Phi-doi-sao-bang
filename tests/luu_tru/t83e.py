# V83 · sự kiện tuần + boss cuối tuần
import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];R={};O='/tmp/claude-0/-home-claude/5e17076b-711a-5cdd-a148-8fee187c2778/scratchpad/'
SEED="""if(!sessionStorage.getItem('t83e')){sessionStorage.setItem('t83e','1');const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:60},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));}"""
with sync_playwright() as p:
  b=p.chromium.launch();pg=b.new_page(viewport={'width':393,'height':852});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3000);pg.add_init_script(SEED);pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(5000)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();window.RAID83_ALWAYS=true;Nav74.tab('combat');}");pg.wait_for_timeout(500)
  pg.evaluate("()=>{const b=document.querySelector('#nav74s [data-s=\"challenge\"]');b&&b.click()}");pg.wait_for_timeout(800)
  R['card']=pg.evaluate("()=>!!document.querySelector('[data-n74=\"event83\"],[data-f=\"event83\"],[data-go=\"event83\"]')||document.body.innerText.includes('SỰ KIỆN TUẦN')")
  pg.evaluate("()=>Event83.open()");pg.wait_for_timeout(500);pg.screenshot(path=O+'ev83_panel.png',full_page=False)
  R['st0']=pg.evaluate("()=>{const s=Event83.state();return {ev:s.ev,idx:s.idx,open:s.raidOpen}}")
  # nhiệm vụ: giả đủ tiến độ rồi nhận
  R['claim']=pg.evaluate("()=>{const s=Event83.state();const ev=EVENT83.ev[s.idx];const p={};for(const t of ev.tasks)p[t.k]=t.target;Event83._set({p});Event83.open();for(const t of ev.tasks)document.querySelector('.ev83 [data-e83=\"claim\"][data-v=\"'+t.id+'\"]')?.click();Event83.open();const s2=Event83.state();return {cur:s2.cur,earn:s2.earn,done:s2.done,ship12:Ship83.state().ev}}")
  R['buy']=pg.evaluate("()=>{const b=document.querySelector('.ev83 [data-e83=\"buy\"]:not([disabled])');if(b)b.click();return Event83.state().cur}")
  # boss cuối tuần
  pg.evaluate("()=>{const b=document.querySelector('.ev83 [data-e83=\"raid\"]');b&&b.click()}")
  pg.wait_for_timeout(9000);pg.evaluate("()=>{invuln=999;hp=maxHp}")
  pg.wait_for_timeout(20000);R['mid']=pg.evaluate("()=>({m:mode,lv:level,rd:Event83.state().RD,boss:!!boss&&boss.raid83})");pg.screenshot(path=O+'ev83_raid.png')
  pg.wait_for_timeout(8000);pg.screenshot(path=O+'ev83_raid2.png')
  pg.evaluate("()=>{invuln=999;hp=maxHp}")
  pg.wait_for_timeout(65000)
  R['end']=pg.evaluate("()=>({m:mode,raid:Event83.state().raid,res:!!document.querySelector('#rd83r:not([hidden])'),ship11:Ship83.state().raid})")
  pg.screenshot(path=O+'ev83_res.png')
  R['errs']=errs[:6];b.close()
print(json.dumps(R,ensure_ascii=False))
