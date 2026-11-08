import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];seed=open('tests/seed_full.js').read();R={}
with sync_playwright() as p:
    b=p.chromium.launch()
    def page(vp=(390,844)):
        c=b.new_context(viewport={'width':vp[0],'height':vp[1]},is_mobile=True,has_touch=True,device_scale_factor=2);c.add_init_script(seed)
        pg=c.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2800);return c,pg,errs
    c,pg,errs=page()
    # 1) số biên đội & quái
    R['waves']=pg.evaluate("()=>[1,21,41,61,81,101,121,141,160].map(l=>{level=l;return [l,Waves30.total(),Waves30.budget(0,l),Waves30.budget(Waves30.total()-1,l)]})")
    # 2) qua ải: làm lại từ đầu
    pg.evaluate("()=>{document.getElementById('mission-select').value='3';Lobby.hide();reset();}");pg.wait_for_timeout(800)
    pg.evaluate("()=>{power=5;powerUpgrades=4;drone=10;bombs=1;hp=1;shield=0;superTime=5;bulletShieldTime=4;Safety31.push(drops,100,{x:100,y:100,type:'heal',t:0,v40:true});mode='reward';nextStage();}")
    pg.wait_for_timeout(300)
    R['qua_ai']=pg.evaluate("()=>({level,power,powerUpgrades,drone,bombs,hp,maxHp,shield:+shield.toFixed(2),superTime,bulletShieldTime,drops:drops.filter(d=>!d.dead).length,mode})")
    # 3) nhặt SIÊU CẤP
    pg.evaluate("()=>{superTime=0;Safety31.push(drops,100,{x:player.x,y:player.y,type:'super',t:0,vx:0,vy:0,ph:0,v40:true});}");pg.wait_for_timeout(700)
    R['nhat_sieu_cap']=pg.evaluate("()=>({superTime:+superTime.toFixed(2),con:drops.filter(d=>!d.dead&&d.type==='super').length})")
    # 4) tinh anh rơi SIÊU CẤP (ép Math.random) và quái thường không rơi
    R['roi']=pg.evaluate("""()=>{superTime=0;drops=[];const mr=Math.random;Math.random=()=>0.05;
      const e1={x:200,y:200,elite:true,large:true,hp:1,dead:false,type:4};enemies.push(e1);kill(e1);const a=drops.filter(d=>d.type==='super').length;
      drops=[];const e2={x:200,y:200,elite:false,hp:1,dead:false,type:0};enemies.push(e2);kill(e2);const bb=drops.filter(d=>d.type==='super').length;
      drops=[];superTime=5;const e3={x:200,y:200,elite:true,large:true,hp:1,dead:false,type:4};enemies.push(e3);kill(e3);const cc=drops.filter(d=>d.type==='super').length;
      Math.random=mr;return {tinh_anh:a,quai_thuong:bb,dang_bao_tau:cc}}""")
    pg.wait_for_timeout(200);pg.evaluate("()=>{superTime=0;drops=[];Safety31.push(drops,100,{x:240,y:500,type:'super',t:0,vx:0,vy:0,ph:0,v40:true});}");pg.wait_for_timeout(250);pg.screenshot(path='shots/v47/drop_super.png')
    R['errs1']=errs;c.close()
    # 5) boss: thanh máu gọn
    c,pg,errs=page()
    pg.evaluate("()=>{document.getElementById('mission-select').value='5';Lobby.hide();reset();window.__g=setInterval(()=>{if(mode==='play'){hp=maxHp;if(!boss){endlessWave=99;enemies.forEach(e=>e.dead=true)}}},50)}")
    pg.wait_for_timeout(7000);pg.screenshot(path='shots/v47/boss.png')
    R['boss']=pg.evaluate("()=>({boss:!!boss,bar:getComputedStyle(document.getElementById('bossbar')).display,hp:boss&&Math.round(boss.hp),max:boss&&Math.round(boss.max)})")
    pg.evaluate("()=>{boss.hp=boss.max*.42}");pg.wait_for_timeout(1500);pg.screenshot(path='shots/v47/boss2.png');R['errs2']=errs;c.close()
    b.close()
print(json.dumps(R,ensure_ascii=False,indent=1))
