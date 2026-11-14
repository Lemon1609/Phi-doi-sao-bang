import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];seed=open('tests/seed_full.js').read();R={}
with sync_playwright() as p:
    b=p.chromium.launch()
    def ctx(E=0,G=None):
        c=b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,device_scale_factor=1);c.add_init_script(seed)
        c.add_init_script('(()=>{const w=JSON.parse(localStorage.getItem("saobang-workshop-v1"));w.craftEnhancements=w.craftEnhancements.map(()=>%d);localStorage.setItem("saobang-workshop-v1",JSON.stringify(w));%s})()'%(E,'' if G is None else 'const h=JSON.parse(localStorage.getItem("saobang-hangar-v1"));for(const it of h.items)it.enhance=%d;localStorage.setItem("saobang-hangar-v1",JSON.stringify(h));'%G))
        pg=c.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2800);return c,pg,errs
    start="(lv)=>{mode='menu';document.getElementById('mission-select').value=String(lv);Lobby.hide();reset();}"
    # 1) mục tiêu sao: bảng mục tiêu theo ải
    c,pg,errs=ctx()
    R['obj']=pg.evaluate("()=>[1,2,3,4,5,6,7,8,9,10,41,45,50,121,140].map(l=>[l,Play63.obj3(l).txt])")
    out={}
    for lv,act in [(1,'none'),(1,'shieldlow'),(2,'graze8'),(3,'elite_miss'),(3,'elite_all'),(4,'od2'),(6,'bomb')]:
        pg.evaluate(start,lv);pg.wait_for_timeout(300)
        pg.evaluate("""(a)=>{if(a==='shieldlow'){shield=0.1;}
          if(a==='graze8'){for(let i=0;i<8;i++){invuln=0;bulletShieldTime=0;Combat26.graze({x:player.x+12,y:player.y,r:3,dead:false},12);}}
          if(a.startsWith('elite')){const e1={x:100,y:100,hp:1,elite:true,dead:false,type:0},e2={x:200,y:100,hp:1,elite:true,dead:false,type:0};enemies.push(e1,e2);}
          if(a==='od2'){superTime=0;}if(a==='bomb'){bombs=2;bomb();}}""",act)
        pg.wait_for_timeout(250)
        pg.evaluate("""(a)=>{if(a==='elite_all'){for(const e of enemies)if(e.elite)kill(e);}if(a==='elite_miss'){const e=enemies.find(e=>e.elite);if(e)kill(e);}
          if(a==='od2'){activateSuper();}}""",act)
        pg.wait_for_timeout(300)
        if act=='od2':
            pg.evaluate("()=>{superTime=0}");pg.wait_for_timeout(200);pg.evaluate("()=>activateSuper()");pg.wait_for_timeout(200)
        out['%d_%s'%(lv,act)]=pg.evaluate("()=>{const r=Play63.stars().res;return [Report392.starScore(),r.o.id,r.hp,r.m3,r.elites,r.od]}")
    R['stars']=out
    # hỗ trợ → tối đa 2 sao
    pg.evaluate("()=>{localStorage.setItem('saobang-assist-v48',JSON.stringify({stage:1,fails:2}));}");c.close()
    c,pg,errs2=ctx();pg.evaluate("()=>{localStorage.setItem('saobang-assist-v48',JSON.stringify({stage:1,fails:2}))}");c.close()
    c,pg,errs2=ctx();pg.evaluate(start,1);pg.wait_for_timeout(400);R['assist']=pg.evaluate("()=>[Balance48.assisted(),power,Report392.starScore()]");errs+=errs2;c.close()
    R['errs_stars']=errs
    # 2) tia sét & lá chắn & trang bị +5
    for E,G in [(4,5),(5,5)]:
        c,pg,errs=ctx(E,G)
        pg.evaluate("()=>{document.getElementById('mission-select').value='3';Lobby.hide();reset();setInterval(()=>{if(mode==='play'){hp=maxHp;bullets.length=0;}},50)}")
        pg.wait_for_timeout(12000)
        R['evo_%d'%E]=pg.evaluate("()=>{const d=Report392.state().dealt,z=Evo53.perk();return {pct:+(100*z.zapDmg/(d.main+d.gear)).toFixed(1),zaps:z.zaps,shCD:z.shCD,bonusM:Evo53.gearBonus('missiles'),bonusS:Evo53.gearBonus('sidearm'),tiers:Evo53.tiers().missiles.t}}")
        R['armor_%d'%E]=pg.evaluate("()=>{shield=1;invuln=0;bulletShieldTime=0;for(let i=0;i<30;i++)bullets.push({x:player.x+40,y:player.y,vx:0,vy:0,r:5,type:'orb',age:0});const n0=bullets.length;Evo53.perk().shReady;invuln=0;damage('collision');return [n0,bullets.length,Evo53.perk().armorClears||0,shield]}")
        R['errs_evo%d'%E]=errs;c.close()
    # 3) thử thách ngày: 10 luật
    c,pg,errs=ctx()
    res={}
    for i in range(10):
        pg.evaluate("(i)=>{mode='menu';const p=Play63.Daily.plan();const r=Play63.Daily.rules[i];Play63.Daily._force({...p,lv:3,rule:r,applied:false,mag:null,prevSup:0});document.getElementById('mission-select').value='3';Lobby.hide();reset();}",i)
        pg.wait_for_timeout(1500)
        res[i]=pg.evaluate("""()=>{const a=Play63.Daily.state().act;const e=enemies.find(e=>!e.dead&&e!==boss);return {rule:a&&a.rule,hp,shield:+shield.toFixed(2),bombs,power,mag:gear.magnet,star:Report392.starScore(),bs:bullets.slice(0,1).map(b=>Math.round(Math.hypot(b.vx||0,b.vy||0)))}}""")
        if i==6: pg.evaluate("()=>{power=5}");pg.wait_for_timeout(200);res[i]['power_after']=pg.evaluate("()=>power")
        if i==8:
            n0=pg.evaluate("()=>bullets.length");pg.evaluate("()=>{const e={x:200,y:H*.7,hp:1,dead:false,type:0};enemies.push(e);kill(e)}");res[i]['kami']=[n0,pg.evaluate("()=>bullets.length")]
        if i==9:
            res[i]['boss']=pg.evaluate("()=>{const b={x:240,y:120,max:100,hp:100};Combat26.setupBoss(b);return b.max}")
    R['daily']=res;R['errs_daily']=errs;c.close();b.close()
print(json.dumps(R,ensure_ascii=False))
