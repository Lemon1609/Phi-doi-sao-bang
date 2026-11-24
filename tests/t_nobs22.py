# V2.2.1 · kiểm "bỏ hẳn bản sao": python3 tests/t_nobs22.py <html tuyệt đối>
import sys,json
from playwright.sync_api import sync_playwright
H=sys.argv[1];OK=[]
def chk(n,c,info=''):OK.append(bool(c));print(('✓ ' if c else '✗ ')+n,str(info)[:300],flush=True)
with sync_playwright() as p:
  br=p.chromium.launch();pg=br.new_page(viewport={'width':390,'height':844});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto('file://'+H+'?nopop');pg.wait_for_timeout(9000)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();document.querySelectorAll('.m63').forEach(e=>e.hidden=true)}")
  chk('NOBS22 bật + đã bọc addCopy',pg.evaluate("()=>NOBS22.on()&&NOBS22.hooked()"))
  # 1) save cũ có bản sao → quy đổi
  r=pg.evaluate("""()=>{const o=NOBS22.orig();Progress.setLocked&&Progress.setLocked(false);
    const ids=Object.keys(GearCatalog).filter(v=>GearCatalog[v].kind==='armor'&&!/^sss/.test(v));const v=ids[0];
    try{Campaign36.acquire('gear',v,'','t')}catch(e){}
    const xp0=XPDA307.total?XPDA307.total():0,cr0=Progress.balance();
    o('gear',v,0,1,true);o('gear',v,2,1,true);o('craft',0,6,1,true);const n0=Evo82.list().length;
    const res=NOBS22.migrate(true);return {v,n0,n1:Evo82.list().length,res,xp:(XPDA307.total?XPDA307.total():0)-xp0,cr:Progress.balance()-cr0}}""")
  chk('Quy đổi bản sao save cũ: kho bản sao về 0',r['n0']>=3 and r['n1']==0,r)
  chk('Quy đổi cho Đá XP + hợp kim',r['xp']>0 and r['cr']>0,{'xp':r['xp'],'cr':r['cr']})
  # 2) nhận món cùng mẫu bậc cao hơn → nâng món chính, dùng được ngay
  r=pg.evaluate("""()=>{const v=Object.keys(GearCatalog).filter(v=>GearCatalog[v].kind==='missiles'&&!/^sss/.test(v))[1];
    try{Campaign36.acquire('gear',v,'','t')}catch(e){}const its=()=>Progress.getState().items.filter(i=>i.variant===v);
    const t0=Math.max(...its().map(i=>V70.nOf(i)|0));Evo82.addCopy('gear',v,2,1,true);const t1=Math.max(...its().map(i=>V70.nOf(i)|0));
    return {v,t0,t1,copies:Evo82.list().length,n:its().length}}""")
  chk('Món cùng mẫu bậc Lam → món chính lên Lam, không tạo bản sao',r['t1']>=2 and r['t1']>r['t0'] and r['copies']==0,r)
  # 3) nhận món chưa có → mở khóa món thật
  r=pg.evaluate("""()=>{const v=Object.keys(GearCatalog).filter(v=>!/^sss/.test(v)&&!Progress.getState().items.some(i=>i.variant===v))[0];
    Evo82.addCopy('gear',v,2,1,true);const it=Progress.getState().items.find(i=>i.variant===v);return {v,has:!!it,t:it?V70.nOf(it):null,copies:Evo82.list().length}}""")
  chk('Món chưa có → mở khóa món thật đúng bậc (vào Kho đồ)',r['has'] and r['t']==2 and r['copies']==0,r)
  # 4) Tiến bậc: không bước nào đòi bản sao
  r=pg.evaluate("()=>{const out=[];for(let t=0;t<11;t++){const s=Evo82.stepOf(t);out.push([t,s.same,s.any,s.mat,s.mn||1]);}return out}")
  chk('Tiến bậc 11 bước: 0 bản sao, bước có nguyên liệu riêng',all(x[1]==0 and x[2]==0 and x[3]>0 for x in r),r)
  # 5) Ép xung: 0 bản sao
  r=pg.evaluate("()=>{try{const it=Progress.getState().items[0];const p=OC17.plan?OC17.plan(it):null;return p&&p.c?p.c.cp:'-';}catch(e){return 'err '+e}}")
  chk('Ép Xung không đòi bản sao',r in (0,'-'),r)
  # 6) Màn Nâng cấp: không còn ô vật liệu bản sao, tự chọn chỉ Đá XP
  r=pg.evaluate("""()=>{for(let k=1;k<=4;k++)XPDA307.add(k,20);const it=Progress.getState().items.find(i=>i.kind==='armor');NC307.open(it.id,'up');
    const el=document.getElementById('nc307');const b=el&&el.querySelector('[data-nc=auto]');b&&b.click();
    return {mats:el?el.querySelectorAll('.nc307-mats').length:-1,lab:el?(el.querySelector('.nc307-row2 span')||{}).textContent:'',go:el?!el.querySelector('[data-nc=go]').disabled:false}}""")
  chk('Nâng cấp: 0 ô bản sao, nhãn Đá XP, Tự động chọn bật được nút',r['mats']==0 and 'Đá XP' in (r['lab'] or '') and r['go'],r)
  chk('Không lỗi JS',not errs,errs[:3])
  br.close()
print('KẾT QUẢ %d/%d'%(sum(OK),len(OK)))
