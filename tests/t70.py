import sys,json,os
from playwright.sync_api import sync_playwright
f=sys.argv[1];f69=sys.argv[2] if len(sys.argv)>2 else None;R={};O='/tmp/claude-0/t70/';os.makedirs(O,exist_ok=True)
def ctx(b,errs):
    c=b.new_context(viewport={'width':412,'height':1012},device_scale_factor=2);pg=c.new_page();pg.on('pageerror',lambda e:errs.append(str(e)));return c,pg
def clean(pg):pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();document.getElementById('m40')?.remove();document.querySelectorAll('.adv70').forEach(e=>e.hidden=true)}")
with sync_playwright() as p:
    b=p.chromium.launch();errs=[]
    # ---- 1. người mới: nâng khung chiến cơ 0 ----
    c,pg=ctx(b,errs);pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3500);clean(pg)
    R['new']=pg.evaluate("()=>[V70.craftN(0),Workshop.cap(Workshop.craftProgress(0)),Workshop.levelFactor(Workshop.craftProgress(0)).toFixed(3)]")
    R['lv25']=pg.evaluate("()=>{Progress.grantCredits(900000);Workshop.grant({exp:90000});let k=0;while(Workshop.upgradeCraft(0)&&k<300)k++;const v=Workshop.craftProgress(0);return [v.level,Workshop.cap(v),Workshop.promoteCraft(0),V70.lacks(V70.req('craft',0))]}")
    pg.evaluate("()=>{for(const t of ['alloy','crystal','circuit','plasma'])for(const c of [1,2,3])V70.add(t+c,40)}")
    R['toLuc']=pg.evaluate("()=>{const a=V70.promote('craft',0);const v=Workshop.craftProgress(0);return [a,V70.craftN(0),v.enhance,Workshop.cap(v),V70T(v),V70.have('alloy1')]}")
    R['toLam']=pg.evaluate("()=>{let k=0;while(Workshop.upgradeCraft(0)&&k<300)k++;const a=V70.promote('craft',0);const v=Workshop.craftProgress(0);return [a,V70.craftN(0),v.level,Workshop.cap(v),V70T(v)]}")
    R['lam1_noPh']=pg.evaluate("()=>{let k=0;while(Workshop.upgradeCraft(0)&&k<300)k++;return [V70.promote('craft',0),V70.craftN(0)]}")
    R['forge']=pg.evaluate("()=>{Progress.grantCredits(1000);V70.phAdd('craft',0,1,3);const a=V70.forgeLam('craft',0);return [a,V70.phHave('craft',0,2),V70.phHave('craft',0,1)]}")
    R['lam1']=pg.evaluate("()=>{const a=V70.promote('craft',0);const v=Workshop.craftProgress(0);return [a,V70.craftN(0),v.enhance,Workshop.cap(v),V70T(v),Fusion.componentReady?Fusion.componentReady(0):null]}")
    pg.evaluate("()=>V70.open('craft',0)");pg.wait_for_timeout(400);pg.screenshot(path=O+'panel_craft.png')
    pg.evaluate("()=>V70.inv()");pg.wait_for_timeout(300);pg.screenshot(path=O+'inv.png')
    R['craftMat']=pg.evaluate("()=>{const a=V70.have('alloy2');document.querySelector('.adv70 [data-a=cm][data-v=alloy2]').click();return [a,V70.have('alloy2'),V70.have('alloy1')]}")
    # trang bị
    R['gear']=pg.evaluate("()=>{const it=Progress.v70.items()[0];let k=0;while(Progress.upgrade(it.id)&&k<300)k++;const a=Progress.promote(it.id);const b=V70.promote('gear',it.id);const i2=Progress.v70.get(it.id);return [it.id,a,b,i2.level,i2.enhance,Workshop.cap(i2),V70T(i2),Progress.title(i2)]}")
    gid=R['gear'][0]
    clean(pg);pg.evaluate("()=>Hub40.open('gear')");pg.wait_for_timeout(600);pg.screenshot(path=O+'hub_gear.png')
    pg.evaluate("(id)=>document.querySelector('#hub40 [data-it=\"'+id+'\"]').click()",gid);pg.wait_for_timeout(500);pg.screenshot(path=O+'hub_sheet.png')
    R['sheet']=pg.evaluate("()=>[document.querySelector('#sh-en')?.innerText,document.querySelector('#sh-mg')?.innerText,document.querySelector('#hb-qm')?.innerText]")
    pg.evaluate("()=>Hub40.open('craft')");pg.wait_for_timeout(600);pg.screenshot(path=O+'hub_craft.png')
    R['hubCraft']=pg.evaluate("()=>[document.querySelector('#hb-en')?.innerText,document.querySelector('.hb-prog')?.innerText,document.querySelector('.hb-sub')?.innerText]")
    # rơi đồ 1..40 lần đầu
    R['drops']=pg.evaluate("()=>{const m0=JSON.stringify(V70.state().M.m),ph0=JSON.stringify(V70.state().S.ph);const log=[];for(let n=1;n<=40;n++){const r=Progress.rewardStage(n);if(r&&n%10===0)log.push([n,(r.materials||[]).join(' | ')]);}return [log,JSON.stringify(V70.state().M.m),JSON.stringify(V70.state().S.ph),JSON.stringify(V70.state().S.ms)]}")
    # phân giải
    R['junk']=pg.evaluate("()=>{for(let i=0;i<4;i++)Progress.grantChestGear(Progress.v70.items()[0].variant);const J=V70.junk().length;const n0=Progress.v70.items().length;for(const it of V70.junk())V70.dismantle(it.id,true);return [J,n0,Progress.v70.items().length]}")
    clean(pg);pg.evaluate("()=>{Lobby.show&&Lobby.show();Lobby68.set('kho')}");pg.wait_for_timeout(700);pg.screenshot(path=O+'kho.png')
    c.close()
    # ---- 2. quy đổi save cũ ----
    c,pg=ctx(b,errs);pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3000)
    pg.evaluate("""()=>{const w=JSON.parse(localStorage.getItem('saobang-workshop-v1'));w.craftEnhancements=[3,5,0,1,2,4,0,0,0,0];w.craftLevels=[90,120,45,60,75,105,20,1,1,1];localStorage.setItem('saobang-workshop-v1',JSON.stringify(w));
      const h=JSON.parse(localStorage.getItem('saobang-hangar-v1'));h.items[0].enhance=2;h.items[0].level=75;if(h.items[1]){h.items[1].enhance=5;h.items[1].level=120;}localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));localStorage.removeItem('saobang-tier70-v1');Storage.prototype.setItem=function(){};}""")
    pg.reload();pg.wait_for_timeout(3500);pg.screenshot(path=O+'migrate.png')
    R['mig']=pg.evaluate("()=>{const out=[];for(let i=0;i<7;i++){const v=Workshop.craftProgress(i);out.push([i,V70T(v),v.level,v.enhance,Workshop.cap(v),Workshop.levelFactor(v).toFixed(3)])}const its=Progress.v70.items().slice(0,2).map(i=>[V70T(i),i.level,i.enhance,Workshop.cap(i)]);return [out,its]}")
    R['oldLF']=[[e,l,round((1+(l-1)*.006)*(1+e*.08),3)] for e,l in [(3,90),(5,120),(0,45),(1,60),(2,75),(4,105),(0,20)]]
    R['migCP']=pg.evaluate("()=>{const r=[];for(const i of [0,1]){try{selectCraft(i)}catch{};r.push(Math.round(Combat.stats().cp))}return r}")
    c.close()
    # ---- 3. chế độ quản trị: CP tối đa so với V69 ----
    def admin(path):
        c,pg=ctx(b,errs);pg.goto('file://'+path+'?nopop');pg.wait_for_timeout(3000)
        pg.evaluate("()=>{Gfx66.open()}");pg.fill('#st66-code','SAOBANG-ADMIN-2026');pg.click('[data-adm]');pg.click('[data-adm]');pg.wait_for_timeout(8000);clean(pg)
        r=pg.evaluate("()=>{try{Fusion.select(null)}catch{};selectCraft&&selectCraft(0);const s=Combat.stats();const v=Workshop.craftProgress(0);return [Math.round(s.cp),+s.attack.toFixed(2),+s.hp.toFixed(2),+s.armor.toFixed(2),v.level,v.enhance,typeof V70T==='function'?V70T(v):'']}")
        if path==f:pg.screenshot(path=O+'admin.png')
        c.close();return r
    R['admin70']=admin(f)
    if f69:R['admin69']=admin(f69)
    R['errs']=errs;b.close()
print(json.dumps(R,ensure_ascii=False,indent=0))
