# V2.2.1 · stress bản đồ chọn ải: kéo bản đồ không được vào trận; 10 lần chọn ải + XUẤT KÍCH → mode 'play' giữ ≥1,5 s, không bị kéo về menu/bản đồ
# python3 tests/t_map22.py <html tuyệt đối>   (MAP22OFF=1 để chạy bản không sửa)
import sys,os,json
from playwright.sync_api import sync_playwright
H=sys.argv[1];OK=[]
def chk(n,c,info=''):OK.append(bool(c));print(('✓ ' if c else '✗ ')+n,str(info)[:300],flush=True)
with sync_playwright() as p:
  br=p.chromium.launch();ctx=br.new_context(viewport={'width':390,'height':844},has_touch=True,is_mobile=True,device_scale_factor=2)
  pg=ctx.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  if os.environ.get('MAP22OFF'):pg.add_init_script('window.MAP22=false')
  pg.goto('file://'+H+'?nopop');pg.wait_for_timeout(9000)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();document.querySelectorAll('.m63').forEach(e=>e.hidden=true);try{V75.addEn(999)}catch(e){};try{for(let s=1;s<=12;s++)Campaign36.recordStars&&Campaign36.recordStars(s,3)}catch(e){}}")
  OPEN="()=>{document.querySelectorAll('.m63').forEach(e=>e.hidden=true);try{ChapterMap.open()}catch(e){}}"
  def back():
    pg.wait_for_timeout(900)
    pg.evaluate("()=>{try{End78.goLobby()}catch(e){};try{mode='menu'}catch(e){};try{Lobby.show()}catch(e){}}");pg.wait_for_timeout(900)
  # 1) kéo bản đồ (bắt đầu trên 1 ô ải) không được mở thẻ / vào trận
  pg.evaluate(OPEN);pg.wait_for_timeout(1200)
  box=pg.evaluate("()=>{const n=document.querySelector('#cmap .cm-node:not(.lock)');if(!n)return null;const r=n.getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2]}")
  if box:
    x,y=box;cdp=ctx.new_cdp_session(pg)
    cdp.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':x,'y':y}]})
    for k in range(1,9):cdp.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':x,'y':y-k*12}]});pg.wait_for_timeout(16)
    cdp.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]});pg.wait_for_timeout(700)
    r=pg.evaluate("()=>({m:mode,sheet:!!document.querySelector('#cmap .cm-sheet .cm-go')})")
    chk('Kéo bản đồ từ ô ải: không mở thẻ, không vào trận',r['m']!='play' and not r['sheet'],r)
  r=pg.evaluate("""()=>{try{document.querySelector('#cmap .cm-sheet').innerHTML=''}catch(e){}const n=document.querySelector('#cmap .cm-node:not(.lock)');const r=n.getBoundingClientRect();const x=r.left+r.width/2,y=r.top+r.height/2;
    const ev=(t,yy)=>n.dispatchEvent(new PointerEvent(t,{bubbles:true,clientX:x,clientY:yy,pointerType:'touch'}));ev('pointerdown',y);ev('pointermove',y-14);ev('pointerup',y-14);n.click();
    return {sheet:!!document.querySelector('#cmap .cm-sheet .cm-go'),m:mode}}""")
  chk('Kéo 14 px rồi WebView vẫn bắn click: bị hủy (không mở thẻ)',not r['sheet'] and r['m']!='play',r)
  # 1b) V2.2.3: tâm ô ải đang tới đứng yên (20 mẫu / 2 s, lệch ≤ 1,0 px); chiến cơ chỉ đường thẳng tâm ô, chỉ nhún dọc ±3 px; thanh đầu mảnh
  pg.evaluate("()=>{try{document.querySelector('#cmap .cm-sheet').innerHTML=''}catch(e){}}");pg.evaluate(OPEN);pg.wait_for_timeout(1200)
  r=pg.evaluate("""()=>new Promise(res=>{const n=document.querySelector('#cmap .cm-node.cur');const sh=document.querySelector('#cmap .cm-ship');if(!n)return res(null);n.scrollIntoView({block:'center'});const c=[],s=[];let k=0;
    const t=setInterval(()=>{const r=n.getBoundingClientRect();c.push([r.left+r.width/2,r.top+r.height/2]);if(sh){const q=sh.getBoundingClientRect();s.push([q.left+q.width/2,q.top+q.height/2]);}if(++k>=20){clearInterval(t);
     const d=a=>a.length?[Math.max(...a.map(p=>p[0]))-Math.min(...a.map(p=>p[0])),Math.max(...a.map(p=>p[1]))-Math.min(...a.map(p=>p[1]))]:[0,0];
     res({node:d(c),ship:d(s),dx:s.length?Math.abs(s[0][0]-c[0][0]):0,bar:!!document.querySelector('#map22:not([hidden])'),hdr9:(()=>{const h=document.getElementById('hdr9');return !!h&&getComputedStyle(h).display!=='none'})()})}},100)})""")
  chk('Ô ải đang tới: tâm lệch ≤ 1,0 px trong 2 s (20 mẫu)',r and max(r['node'])<=1.0,r)
  chk('Chiến cơ chỉ đường: thẳng tâm ô (≤1 px), không trôi ngang, nhún dọc ≤ 6,5 px',r and r['dx']<=1.0 and r['ship'][0]<=1.0 and r['ship'][1]<=6.5,r)
  if not os.environ.get('MAP22OFF'):chk('Bản đồ: thanh đầu mảnh ← SẢNH + 3 ô tài nguyên, ẩn hàng 5 nút #hdr9',r and r['bar'] and not r['hdr9'],r)
  # 2) 10 lần chọn ải → XUẤT KÍCH
  res=[]
  for i in range(10):
    back();pg.evaluate(OPEN);pg.wait_for_timeout(900)
    st=1
    tap=pg.evaluate("""(st)=>{const n=document.querySelector('#cmap .cm-node[data-stage="'+st+'"]')||document.querySelector('#cmap .cm-node:not(.lock)');if(!n)return null;n.scrollIntoView({block:'center'});const r=n.getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2,n.dataset.stage]}""",st)
    if not tap:res.append('khong o');continue
    pg.touchscreen.tap(tap[0],tap[1]);pg.wait_for_timeout(500)
    go=pg.evaluate("()=>{const b=document.querySelector('#cmap .cm-go:not([disabled])');if(!b)return null;const r=b.getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2]}")
    if not go:res.append('khong nut '+str(tap[2]));continue
    pre=pg.evaluate("()=>({m:mode,en:(()=>{try{return V75.energy()}catch(e){return -1}})(),m63:[...document.querySelectorAll('.m63:not([hidden])')].map(e=>e.className).join(',')})")
    pg.touchscreen.tap(go[0],go[1])
    seq=pg.evaluate("()=>new Promise(res=>{const o=[];const t0=performance.now();const iv=setInterval(()=>{let m='?';try{m=mode}catch(e){}const map=!!document.querySelector('#cmap:not([hidden])');o.push([Math.round(performance.now()-t0),m+(map?'+MAP':'')]);if(performance.now()-t0>2300){clearInterval(iv);res(o)}},50)})")
    first=next((k for k,(t,m) in enumerate(seq) if m.startswith('play')),None)
    stable=first is not None and all(m.startswith('play') or m.startswith('pause') for t,m in seq[first:]) and seq[-1][0]-seq[first][0]>=1500
    flick=first is not None and any('MAP' in m for t,m in seq[first:])
    res.append('OK' if stable and not flick else 'LOI '+json.dumps(pre,ensure_ascii=False)+' '+'>'.join(str(t)+m for k,(t,m) in enumerate(seq) if k==0 or m!=seq[k-1][1]))
  print('BLK',pg.evaluate('()=>FIX22.blocked()'))
  ok=sum(1 for r in res if r=='OK')
  chk('10 lần chọn ải → vào trận giữ ≥1,5 s, không kéo về / chớp bản đồ',ok==10,str(ok)+'/10 '+json.dumps(res,ensure_ascii=False))
  chk('Không lỗi JS',not errs,errs[:3])
  br.close()
print('KẾT QUẢ %d/%d'%(sum(OK),len(OK)))
