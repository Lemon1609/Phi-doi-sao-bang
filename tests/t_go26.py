# V2.2.3 · GO26: bấm XUẤT KÍCH ngay khi thẻ ải đang trượt lên (đo nút lúc 60 ms, chạm lúc ~220 ms) → vẫn vào trận
# python3 tests/t_go26.py <html tuyệt đối> [số lần]   (GO26OFF=1 chạy bản tắt để so)
import sys,os,json
from playwright.sync_api import sync_playwright
H=sys.argv[1];N=int(sys.argv[2]) if len(sys.argv)>2 else 6;OK=[]
def chk(n,c,info=''):OK.append(bool(c));print(('✓ ' if c else '✗ ')+n,str(info)[:300],flush=True)
with sync_playwright() as p:
  br=p.chromium.launch();ctx=br.new_context(viewport={'width':390,'height':844},has_touch=True,is_mobile=True,device_scale_factor=2)
  pg=ctx.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  if os.environ.get('GO26OFF'):pg.add_init_script('window.GO26=false')
  pg.goto('file://'+H+'?nopop');pg.wait_for_timeout(9000)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();document.querySelectorAll('.m63').forEach(e=>e.hidden=true);try{V75.addEn(999)}catch(e){};try{for(let s=1;s<=12;s++)Campaign36.recordStars&&Campaign36.recordStars(s,3)}catch(e){}}")
  OPEN="()=>{document.querySelectorAll('.m63').forEach(e=>e.hidden=true);try{ChapterMap.open()}catch(e){}}"
  res=[]
  it=0
  while sum(1 for r in res if not r.startswith('khong'))<N and it<3*N:
    it+=1
    pg.wait_for_timeout(900);pg.evaluate("()=>{try{End78.goLobby()}catch(e){};try{mode='menu'}catch(e){};try{Lobby.show()}catch(e){}}");pg.wait_for_timeout(900)
    pg.evaluate(OPEN);pg.wait_for_timeout(900)
    pg.evaluate("()=>{const x=document.querySelector('#cmap .cm-sheet.open .cm-x');if(x)x.click()}");pg.wait_for_timeout(400)
    pg.evaluate("()=>document.querySelector('#cmap .cm-node:not(.lock)').scrollIntoView({block:'center'})");pg.wait_for_timeout(400)
    tap=pg.evaluate("()=>{const n=document.querySelector('#cmap .cm-node:not(.lock)');const r=n.getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2]}")
    pg.touchscreen.tap(tap[0],tap[1])
    go=pg.evaluate("()=>new Promise(res=>{const t0=performance.now();const f=()=>{const b=document.querySelector('#cmap .cm-sheet.open .cm-go:not([disabled])');if(b){const r=b.getBoundingClientRect();if(r.bottom<=innerHeight)return res([r.left+r.width/2,r.top+r.height/2]);}if(performance.now()-t0>600)return res(null);requestAnimationFrame(f)};f()})")
    if not go:res.append('khong nut '+json.dumps(pg.evaluate("(t)=>{const e=document.elementFromPoint(t[0],t[1]);const s=document.querySelector('#cmap .cm-sheet');return [e&&(e.className||e.tagName),s&&s.className,mode,!!document.querySelector('#cmap:not([hidden])')]}",tap)));continue
    pg.wait_for_timeout(170)
    fin=pg.evaluate("()=>{const b=document.querySelector('#cmap .cm-go');const r=b.getBoundingClientRect();return r.top+r.height/2}")
    pg.touchscreen.tap(go[0],go[1]);pg.wait_for_timeout(1200)
    m=pg.evaluate("()=>mode");res.append(('OK' if m=='play' else 'NUOT')+' dy=%d'%round(go[1]-fin))
  ok=sum(1 for r in res if r.startswith('OK'))
  chk('Chạm XUẤT KÍCH lúc thẻ đang trượt → vào trận (bỏ lượt chạm ô ải không trúng)',ok==N,'%d/%d %s go26=%s'%(ok,N,json.dumps([r[:24] for r in res]),pg.evaluate('()=>window.__go26||0')))
  chk('Không lỗi JS',not errs,errs[:3])
  br.close()
print('KẾT QUẢ %d/%d'%(sum(OK),len(OK)))
