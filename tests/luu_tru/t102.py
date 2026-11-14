import sys,json,re
from playwright.sync_api import sync_playwright
f=sys.argv[1]
HOOK="""()=>{if(window.__tx)return;window.__tx={};const P=CanvasRenderingContext2D.prototype;for(const k of ['fillText','strokeText']){const o=P[k];P[k]=function(t){try{if(typeof mode!=='undefined'&&mode==='play'){let s=String(t).replace(/\\d[\\d.,]*/g,'#');window.__tx[s]=(window.__tx[s]||0)+1;}}catch{}return o.apply(this,arguments);};}}"""
with sync_playwright() as p:
  b=p.chromium.launch();pg=b.new_page(viewport={'width':393,'height':852});pg.on('dialog',lambda d:d.accept())
  pg.add_init_script(HOOK.replace('()=>{','(()=>{',1)+')()');pg.goto('file://'+f+'?nopop');pg.wait_for_function("()=>typeof Thu100==='object'",timeout=120000);pg.wait_for_timeout(4000)
  pg.evaluate("(a)=>Thu100.start(a)",200)
  for k in range(60):
    pg.wait_for_timeout(3000)
    try:
      if pg.evaluate("()=>sessionStorage.getItem('thu100-step')===null&&typeof Combat==='object'"):break
    except Exception:pass
  pg.wait_for_timeout(4000);pg.evaluate('()=>{window.__tx={}}')
  for st,en in [(25,False),(121,False),(180,False),(1,True)]:
    pg.evaluate("""([st,en])=>{document.querySelectorAll('.m63').forEach(e=>e.hidden=true);mode='menu';try{Lobby.show()}catch{};Progress.setLocked(false);try{V75.addEn(60)}catch{};const gm=document.getElementById('gamemode');gm.value=en?'endless':'campaign';try{syncModeSetup()}catch{};document.getElementById('mission-select').value=String(st);Lobby.hide();reset();if(mode==='pause')mode='play';
      if(!window.__iv)window.__iv=setInterval(()=>{try{invuln=999;hp=maxHp;const d=document.getElementById('st80');if(d)d.hidden=true;window.__st80=0;if(mode==='pause')mode='play';}catch{}},150)}""",[st,en])
    pg.wait_for_timeout(45000)
    pg.screenshot(path='/tmp/claude-0/sp/txt/s%d.png'%st)
  d=pg.evaluate("()=>window.__tx");st=pg.evaluate('()=>V102.state()');b.close()
print('V102',st)
for k,v in sorted(d.items(),key=lambda x:-x[1]):print(v,repr(k))
import re
BAD=[r'^#$',r'^[+\-]#',r'CHOÁNG',r'^[×xX]#',r'HỎA LỰC|SIÊU CẤP|^BOM$|^DRONE$',r'TÀU VẬN TẢI',r'CHUỖI',r'HUY CHƯƠNG',r'LÕI ĐANG',r'KHIÊN ĐÃ',r'Huyễn Ảnh|Thiết Giáp Từ|Lôi Đình|Hắc Động']
left=[k for k in d if any(re.search(x,k) for x in BAD)]
print(('✓' if not left else '✗')+' Không còn chữ nổi trong trận (còn: %s)'%left)
print(('✓' if any('CẢNH BÁO' in k or 'BOSS' in k for k in d) else '✗')+' Băng cảnh báo boss vẫn hiện')
print(('✓' if st['cut']>0 else '✗')+' Bộ lọc đã chặn %d lần vẽ chữ'%st['cut'])
