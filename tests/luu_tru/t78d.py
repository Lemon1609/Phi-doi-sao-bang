# V78 · mã tân thủ + mã tài nguyên vô hạn (không mở tiến trình)
import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];R={}
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':393,'height':852});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3500);pg.add_style_tag(content='#g74{display:none!important}')
    snap="()=>({cr:Progress.balance(),gem:Econ74.gems(),exp:Workshop.expBalance(),en:V75.energy(),tk:V75.tickets(),alloy1:V70.have('alloy1'),sss:V70.have('sss_core'),pil1:Pilot67.state().pieces[1]||0,xu:V77.state().tok,bk:BK78.state().shards,oc:OC75.state().st,stones:Stone71.state().st.length,cleared:(JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}').cleared||[]).length})"
    R['0']=pg.evaluate(snap)
    pg.evaluate("()=>Gfx66.open()");pg.fill('#st66-code','tanthu2026');pg.click('[data-adm]');R['msgN']=pg.inner_text('#st66-adm');R['newbie']=pg.evaluate(snap)
    pg.click('[data-adm]');R['msgN2']=pg.inner_text('#st66-adm')
    pg.fill('#st66-code','ADMIN-VOHAN');pg.click('[data-adm]');R['msgA']=pg.inner_text('#st66-adm');pg.wait_for_timeout(7000);R['admin']=pg.evaluate(snap)
    pg.reload();pg.wait_for_timeout(9000);R['afterReload']=pg.evaluate(snap)
    pg.evaluate("()=>Gfx66.open()");pg.fill('#st66-code','SAI-MA');pg.click('[data-adm]');R['wrong']=pg.inner_text('#st66-adm')
    R['errs']=errs;b.close()
print(json.dumps(R,ensure_ascii=False,indent=0))
