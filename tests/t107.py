# V107 · Cài đặt: mục ĐỘ NHẠY KÉO TÀU riêng, bấm đổi được
import sys
from playwright.sync_api import sync_playwright
f=sys.argv[1];O=sys.argv[2]+'/';OK=[]
def chk(n,c):OK.append(('✓' if c else '✗')+' '+n)
with sync_playwright() as p:
  b=p.chromium.launch();pg=b.new_page(viewport={'width':393,'height':852},has_touch=True);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto('file://'+f+'?nopop');pg.wait_for_function("()=>typeof Gfx66==='object'&&typeof V98==='object'",timeout=120000);pg.wait_for_timeout(3000)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();document.querySelectorAll('.m63').forEach(e=>e.hidden=true);Gfx66.open()}");pg.wait_for_timeout(1500)
  r=pg.evaluate("()=>{const x=document.querySelector('.st66 [data-sn107]');if(!x)return null;x.scrollIntoView();const bs=[...x.querySelectorAll('[data-sn98]')];const rc=x.getBoundingClientRect();return {n:bs.length,vis:bs.every(b=>{const r=b.getBoundingClientRect();return r.width>40&&r.right<=innerWidth+1&&r.left>=0}),txt:x.textContent.slice(0,40)}}")
  chk('Cài đặt có mục ĐỘ NHẠY KÉO TÀU, 3 nút nằm gọn trong màn hình (%s)'%r,r and r['n']==3 and r['vis'])
  pg.evaluate("()=>document.querySelector('.st66 .st66-row').scrollIntoView()");pg.wait_for_timeout(300);pg.screenshot(path=O+'sens.png')
  pg.evaluate("()=>document.querySelector('.st66 [data-sn107] [data-sn98=\"1.4\"]').click()");pg.wait_for_timeout(300)
  s=pg.evaluate("()=>JSON.parse(localStorage.getItem('saobang-touch98')||'{}')");chk('Bấm RẤT NHANH 1,4×: đã lưu (%s)'%s,s.get('sens')==1.4)
  chk('không lỗi JS'+(' · '+errs[0][:200] if errs else ''),not errs)
  b.close()
print('\n'.join(OK))
