import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];seed=open('tests/seed_full.js').read();R={}
with sync_playwright() as p:
    b=p.chromium.launch()
    c=b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,device_scale_factor=2);c.add_init_script(seed)
    pg=c.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2800)
    pg.evaluate("()=>{document.getElementById('mission-select').value='3';Lobby.hide();reset();window.PX=195;window.PY=H*.82;window.__g=setInterval(()=>{if(mode==='play'){hp=Math.min(hp,maxHp-1);enemies.forEach(e=>e.dead=true);bullets.length=0;player.x=PX;player.y=PY;}},10)}")
    pg.wait_for_timeout(600)
    pg.evaluate("()=>{drops=[];for(const [t,x,y] of [['heal',60,120],['shield',330,150],['bomb',195,90]])Safety31.push(drops,100,{x,y,type:t,t:0,vx:(Math.random()-.5)*40,vy:-80,ph:Math.random()*6,v40:true});}")
    S="()=>({W,H,player:[Math.round(player.x),Math.round(player.y)],d:drops.filter(d=>!d.dead&&d.type!=='none'&&d.type!=='star').map(d=>[d.type,Math.round(d.x),Math.round(d.y),Math.round(Math.hypot(d.x-player.x,d.y-player.y))])})"
    for t in (500,1000,1500,2200):
        pg.wait_for_timeout(t- (0 if t==500 else [500,1000,1500,2200][[500,1000,1500,2200].index(t)-1]));R['t%d'%t]=pg.evaluate(S)
    pg.screenshot(path='shots/v51_hover.png')
    # chiến cơ chạy ngang → buff bám theo
    pg.evaluate("()=>{window.__m=setInterval(()=>{PX=Math.max(40,PX-4)},16)}");pg.wait_for_timeout(1200);pg.evaluate("()=>clearInterval(__m)");pg.wait_for_timeout(600)
    R['sau_chay_trai']=pg.evaluate(S)
    # nhích nhẹ 30 px về 1 buff → nhặt được
    pg.evaluate("()=>{const d=drops.find(d=>!d.dead&&d.type==='bomb'||d.type==='heal'||d.type==='shield');PX+=Math.sign(d.x-PX)*30;PY+=Math.sign(d.y-PY)*30;}")
    pg.wait_for_timeout(700);R['sau_nhich']=pg.evaluate(S)
    # 5 buff cùng lúc: chia chỗ, không chồng
    pg.evaluate("()=>{Lobby.hide();reset();}");pg.wait_for_timeout(500);pg.evaluate("()=>{PX=195;PY=H*.82;gear.magnet=0;Balance48&&0;drops=[];for(let i=0;i<5;i++)Safety31.push(drops,100,{x:60+i*70,y:120,type:['power','heal','shield','bomb','drone'][i],t:0,vx:0,vy:-80,ph:i,v40:true});}")
    pg.wait_for_timeout(3500);R['dbg']=pg.evaluate('()=>[mode,Loot40.state().magnetT,gear.magnet,drops.length,drops.map(d=>d.type+(d.dead?"x":"")).join(",")]');R['nam_buff']=pg.evaluate(S);R['magnet']=pg.evaluate('()=>[gear.magnet,gear.magnetTier]');pg.screenshot(path='shots/v51_five.png')
    R['errs']=errs;b.close()
print(json.dumps(R,ensure_ascii=False))
