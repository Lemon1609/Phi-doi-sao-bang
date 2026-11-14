# V77 · boss phụ 2 pha, mid-boss, huy chương, xếp hạng, Tiệm Danh Dự. python3 tests/t77.py <html tuyệt đối>
import sys,json,os
from playwright.sync_api import sync_playwright
f=sys.argv[1];R={};O='/tmp/claude-0/t77/';os.makedirs(O,exist_ok=True)
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':393,'height':852});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3500);pg.add_style_tag(content='#g74{display:none!important}')
    pg.evaluate("()=>{Gfx66.open()}");pg.fill('#st66-code','SAOBANG-ADMIN-2026');pg.click('[data-adm]');pg.click('[data-adm]');pg.wait_for_timeout(8000)
    pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();document.getElementById('rite408')?.remove();document.querySelectorAll('.adv70,.st71,.u72').forEach(e=>e.hidden=true)}")
    def start(n):pg.evaluate("(n)=>{window.__b75r=undefined;mode='menu';try{Lobby.show()}catch{};document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value=String(n);Lobby.hide();reset();invuln=999;}",n)
    # boss phụ
    for n in [45,50,85]:
        start(n);pg.evaluate("()=>{for(const e of enemies)e.dead=true;try{startBoss()}catch{}}");pg.wait_for_timeout(6500)
        a=pg.evaluate("()=>{invuln=99;return [B75.kindNow(),B75.state()]}");pg.evaluate("()=>{window.__b75r=.4}");pg.wait_for_timeout(2500)
        R['sub'+str(n)]=a+[pg.evaluate("()=>{invuln=99;return [B75.state(),bullets.filter(b=>!b.dead).length]}")]
        pg.screenshot(path=O+f'sub{n}.png')
    # huy chương nhặt
    start(12);pg.wait_for_timeout(1500)
    R['medal']=pg.evaluate("()=>new Promise(res=>{invuln=99;const s0=score;V77._drop(player.x,player.y-60);setTimeout(()=>res({tier:V77.run().tier,dScore:score-s0}),1400);})")
    # chạy hết ải 12 (admin bắn) → hạng
    R['rank12']=pg.evaluate("""()=>new Promise(res=>{const t0=performance.now();const iv=setInterval(()=>{invuln=99;if(mode==='reward'||mode==='win'){clearInterval(iv);const c=document.querySelector('.v77r');res({t:Math.round((performance.now()-t0)/1000),card:c&&!c.hidden?c.textContent.slice(0,120):null,best:V77.state().best[12],tok:V77.state().tok});}
      if(performance.now()-t0>150000){clearInterval(iv);res({timeout:true,run:V77.run(),wave:Waves30.state()});}},250);})""")
    pg.screenshot(path=O+'rank12.png')
    # mid-boss ải 65
    start(66)
    R["mid66"]=pg.evaluate("""()=>new Promise(res=>{const t0=performance.now();let seen=false;const iv=setInterval(()=>{invuln=99;const r=V77.run();if(r.mid)seen=true;if(r.midDone&&!r.mid&&seen){clearInterval(iv);res({t:Math.round((performance.now()-t0)/1000),run:r});}
      if(performance.now()-t0>170000){clearInterval(iv);res({timeout:true,run:r,wave:Waves30.state()});}},250);})""")
    # Tiệm Danh Dự
    pg.evaluate("()=>{mode='menu';V77._set({tok:300});V77.open()}");pg.wait_for_timeout(300);pg.screenshot(path=O+'honor.png')
    R['shop']=pg.evaluate("()=>{const r=['TRAIL_NEON_GOLD','REROLL_STONE_1','PILOT_SHARD_SELECT_5','TITLE_BULLET_DANCER'].map(id=>V77.buy(id));const c=[...document.querySelectorAll('[data-v77=fod]')].length;const fb=V77.buy('BLUE_FODDER_SELECT','craft|0');return [r,fb,V77.state().tok,V77.state().own]}")
    R['errs']=errs;b.close()
print(json.dumps(R,ensure_ascii=False))
