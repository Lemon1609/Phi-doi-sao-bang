# V83 · sao lưu/khôi phục mang đủ mọi khóa saobang-* (chuyển máy / chuyển tài khoản)
import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];O='/tmp/'
with sync_playwright() as p:
  b=p.chromium.launch();ctx=b.new_context(accept_downloads=True);pg=ctx.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(6000)
  pg.evaluate("()=>{Event83._set({cur:123});Ship83._set({raid:777});localStorage.setItem('saobang-zz-test',JSON.stringify({a:1}));}")
  before=pg.evaluate("()=>Object.keys(localStorage).filter(k=>k.startsWith('saobang-')||k.startsWith('PLAYER_')).length")
  with pg.expect_download() as d: pg.evaluate("()=>document.getElementById('device-backup').click()")
  path=d.value.path();J=json.load(open(path));D=J['data'];w=D['saobang-workshop-v1'];print('W',len(w['crafts']),len(w['craftFragments']),len(w.get('craftEnhancements',[])),len(w.get('craftLevels',[])),w.get('exp'),w.get('aux'),D.get('saobang-best'),D.get('saobang-craft'),D['saobang-robots-v1'].get('unlocked'),list(w.get('fusionProgress',{}))[:5]);keys=list(J['data'].keys())
  pg.evaluate("()=>localStorage.clear()");pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(6000)
  pg.set_input_files('#device-backup-file',path);pg.wait_for_timeout(1500);print('preview',pg.evaluate("()=>document.getElementById('device-restore-preview').textContent+' | '+document.getElementById('device-save-status')?.textContent+' | mode='+mode"))
  pg.evaluate("()=>{const b=document.getElementById('device-restore');b.click()}");pg.wait_for_timeout(5000);print('st',pg.evaluate("()=>document.getElementById('device-save-status')?.textContent"))
  R=pg.evaluate("()=>({ev:JSON.parse(localStorage.getItem('saobang-event83')||'{}').cur,raid:JSON.parse(localStorage.getItem('saobang-ship83')||'{}').raid,zz:localStorage.getItem('saobang-zz-test')})")
  print(json.dumps({'before':before,'nkeys':len(keys),'has':[k in keys for k in ['saobang-event83','saobang-evo82','saobang-ship83','saobang-zz-test']],'R':R,'errs':errs[:3]},ensure_ascii=False))
  ok=R['ev']==123 and R['raid']==777 and R['zz'] and not errs;print('KẾT QUẢ','✓' if ok else '✗','sao lưu/khôi phục đủ khóa');b.close()
