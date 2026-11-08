import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];seed=open('tests/seed_full.js').read();R={}
with sync_playwright() as p:
    b=p.chromium.launch()
    def ctx(init=''):
        c=b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True);c.add_init_script(seed)
        if init:c.add_init_script(init)
        pg=c.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3000);return c,pg,errs
    # người mới
    c,pg,errs=ctx("localStorage.clear();")
    R['fresh']=pg.evaluate("()=>({c:Onboard66.cleared(),locked:[...new Set([...document.querySelectorAll('.lk66')].map(b=>b.dataset.lk66))],next:Onboard66.nextGoal(),nx:(document.querySelector('.nx66')||{}).textContent})")
    pg.screenshot(path='shots/v66b_fresh.png')
    R['errs1']=errs;c.close()
    # cựu binh ải 60: mở hết, thử phí SSS
    c,pg,errs=ctx()
    R['vet']=pg.evaluate("()=>({c:Onboard66.cleared(),locked:document.querySelectorAll('.lk66').length,next:Onboard66.nextGoal()})")
    R['fee']=pg.evaluate("""()=>{const ids=Object.keys(GEAR44_ASSETS).length;const S=Gear44.state();const P=Progress.getState();
      // tìm 1 công thức đang sẵn (đủ +1)
      let rec=null;for(const k of ['armor','missiles','sidearm']){}
      const all=[];try{for(const el of document.querySelectorAll('[data-pick]'))all.push(el.dataset.pick);}catch{}
      return {credits:Progress.balance(),exp:Workshop.expBalance(),owned:Object.keys(S.owned)}}""")
    pg.evaluate("()=>Gear44.open('armor')");pg.wait_for_timeout(500)
    R['fee2']=pg.evaluate("""()=>{const ids=[...document.querySelectorAll('#g44 [data-pick]')].map(e=>e.dataset.pick);const out=ids.map(id=>[id,Gear44.canFuse(id)]);const ok=out.find(x=>x[1].ok);let res=null;
      if(ok){const c0=Progress.balance(),e0=Workshop.expBalance();const r=Gear44.fuse(ok[0]);res={id:ok[0],r,dc:c0-Progress.balance(),de:e0-Workshop.expBalance()};}
      const poor=ids.find(id=>!Gear44.owns(id));return {n:ids.length,ok:out.filter(x=>x[1].ok).length,whys:[...new Set(out.map(x=>x[1].why))],res}}""")
    R['fee3']=pg.evaluate("""()=>{Progress.grantCredits(10000);Workshop.grant({exp:500});Gear44.close&&Gear44.close();Gear44.open('armor');const ids=[...document.querySelectorAll('#g44 [data-pick]')].map(e=>e.dataset.pick);const ok=ids.find(id=>Gear44.canFuse(id).ok);if(!ok)return {ids,why:ids.map(i=>Gear44.canFuse(i).why)};const c0=Progress.balance(),e0=Workshop.expBalance();const r=Gear44.fuse(ok);return {id:ok,r,dc:c0-Progress.balance(),de:e0-Workshop.expBalance()}}""")
    pg.wait_for_timeout(300);pg.screenshot(path='shots/v66b_sss.png')
    R['errs2']=errs;c.close()
    # kẹt boss: người ở ải 22, thua ải 25 ba lần → mở Ngọc sớm
    c,pg,errs=ctx("localStorage.setItem('saobang-unlock-v66',JSON.stringify({early:{},seen:['daily','chest','dungeon_gold','challenge','dungeon_mat','tower'],fails:{},gift:[]}));")
    pg.evaluate("()=>{const st=Progress.getState();}")
    R['stall']=pg.evaluate("async()=>{const a=Onboard66.open('gems');Onboard66._fail(60,3);Onboard66.apply();return [Onboard66.cleared(),a,Onboard66.open('gems'),Onboard66.state().early]}")
    R['errs3']=errs;c.close();b.close()
print(json.dumps(R,ensure_ascii=False))
