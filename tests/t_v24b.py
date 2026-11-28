# V2.4-B · kiểm: nền parallax 2 lớp (Vực Dung Nham / Hẻm Băng) · gói âm thanh dựng sẵn · nhãn tên nhạc · mở màn radar GO!
#  Dùng: python3 tests/t_v24b.py <html tuyệt đối> [CHUP=thư mục]
#  (so ms/khung với bản V2.4-A: tests/do_phan24.py chạy riêng, LẦN LƯỢT)
import sys, os, json
import numpy as np
from PIL import Image
from playwright.sync_api import sync_playwright
HTML = sys.argv[1]; CHUP = os.environ.get('CHUP', '')
ROOT = '/home/claude/phi-doi-sao-bang'
if CHUP: os.makedirs(CHUP, exist_ok=True)
R = []
def chk(n, ok, info=''):
    R.append(bool(ok)); print(('✓ ' if ok else '✗ TRƯỢT ') + n, ('' if ok else info), flush=True)

# ---------- 1) tệp ảnh ----------
D = os.path.join(ROOT, 'src/nen24img'); F = ['bg_lava_floor', 'bg_lava_cliffs', 'bg_ice_floor', 'bg_ice_cliffs']
sz = {f: os.path.getsize(os.path.join(D, f + '.webp')) for f in F}
chk('4 ảnh nền webp tổng ≤ 320 KB (%.1f KB)' % (sum(sz.values()) / 1024), sum(sz.values()) <= 320 * 1024, sz)
bad = []
for f in ('bg_lava_cliffs', 'bg_ice_cliffs'):
    a = np.array(Image.open(os.path.join(D, f + '.webp')).convert('RGBA'))
    w = a.shape[1]; mid = a[:, w // 2 - 20:w // 2 + 21, 3]
    if mid.max() != 0: bad.append((f, int(mid.max())))
    side = a[:, :30, 3].mean() / 255
    if side < .9: bad.append((f, 'mép trái đặc', round(side, 2)))
chk('Vách: alpha = 0 ở giữa hành lang (±20 px), mép vách đặc', not bad, bad)
seam = []
for f in F:
    a = np.array(Image.open(os.path.join(D, f + '.webp')).convert('RGBA')).astype(np.float32)
    d_wrap = np.abs(a[-1, :, :3] - a[0, :, :3]).mean(); d_in = np.abs(a[1:, :, :3] - a[:-1, :, :3]).mean()
    seam.append((f, round(float(d_wrap), 1), round(float(d_in), 1)))
chk('Nối mép dọc liền: chênh hàng cuối↔đầu ≤ 2× chênh giữa 2 hàng kề trung bình', all(w <= 2 * i + 1 for _, w, i in seam), seam)

# ---------- trận ----------
SETUP = "localStorage.setItem('saobang-gfx-v66','light');"
_t193 = open(ROOT + '/claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
_argv = sys.argv; sys.argv = ['x', HTML, '40']; exec(_t193); sys.argv = _argv
_t209 = open(ROOT + '/tests/v203_v212/t209.py').read(); exec(_t209[_t209.find('def start'):_t209.find('with sync_playwright')])
import re as _re, bisect as _bi
_H = open(HTML, encoding='utf-8').read(); _LN = [0]; [_LN.append(m.end()) for m in _re.finditer('\n', _H)]
_SP = [(m.start(), m.group(1)) for m in _re.finditer(r'<script id="([^"]+)"', _H)]; _SPP = [q for q, _ in _SP]
def sid(lc):
    try:
        ln, col = map(int, lc.split(':')[:2]); k = _bi.bisect_right(_SPP, _LN[ln - 1] + col) - 1; return _SP[k][1]
    except Exception: return '?'

with sync_playwright() as p:
    br = p.chromium.launch(args=['--autoplay-policy=no-user-gesture-required'])
    cx = br.new_context(viewport={'width': 393, 'height': 852}, device_scale_factor=2 if CHUP else 1); cx.add_init_script(SETUP)
    class _B:
        def new_page(self, **k): return cx.new_page()
    pg, errs, o = setup(_B(), 'SS')
    pg.add_style_tag(content='#q307,#tutorial392{display:none!important}')
    def shot(n, clip=None):
        if CHUP: pg.screenshot(path=os.path.join(CHUP, n + '.png'))
    pg.evaluate("()=>{try{sound=true;}catch{}try{const b=document.getElementById('music393');if(b&&b.getAttribute('aria-pressed')!=='true')b.click();}catch{}try{Audio393.unlock();}catch{}try{Music96.unlock();}catch{}}")
    pg.wait_for_timeout(2500)
    def enter(st, tau=0):
        pg.evaluate("(a)=>{try{for(let i=0;i<13;i++)Campaign36.acquire('craft',i,'','story')}catch{};try{selectCraft(a)}catch{}}", tau)
        for _k in range(3):
            pg.evaluate("(st)=>{const s=document.getElementById('mission-select');if(s&&![...s.options].some(o=>o.value==String(st))){const o=document.createElement('option');o.value=String(st);s.appendChild(o);}try{Progress.canStart=()=>true}catch{}}", st)
            start(pg, st)
            if pg.evaluate("()=>mode") == 'play': break
        pg.evaluate("()=>{clearInterval(window.__hz);clearInterval(window.__iv24);window.__iv24=setInterval(()=>{try{invuln=999;hp=maxHp;const d=document.getElementById('st80');if(d)d.hidden=true;window.__st80=0;}catch{}},150)}")
    # ---------- 2) âm thanh dựng sẵn ----------
    s0 = pg.evaluate("()=>SND24S.stat()")
    chk('SFX dựng sẵn đủ %d/%d AudioBuffer, 0 lỗi' % (s0['buf'], s0['keys']), s0['buf'] == s0['keys'] and s0['keys'] >= 12 and s0['err'] == 0, s0)
    # ---------- 3) mở màn GO! + nhãn nhạc ----------
    ST_LAVA = int(os.environ.get('ST_LAVA', '30'))
    enter(ST_LAVA)
    g = pg.evaluate("()=>({dt:performance.now()/1000-SND24S.goT(),mt:!!document.querySelector('#mt24.on'),txt:(document.querySelector('#mt24 b')||{}).textContent||'',cur:Music96.state().cur,en:Music96.state().en,ctx:Music96.state().ctx})")
    chk('Vào trận: kích hoạt mở màn radar GO! (≤ 3 s trước)', 0 <= g['dt'] < 3, g)
    chk('Nhãn tên nhạc hiện lúc vào trận', g['mt'] and len(g['txt']) > 3, g)
    if CHUP:
        pg.evaluate("()=>{SND24S.go();}"); pg.wait_for_timeout(180); shot('go_1_radar')
        pg.wait_for_timeout(260); shot('go_2_go')
        pg.evaluate("()=>{SND24S.showMt('start')}"); pg.wait_for_timeout(500); shot('mt_label')
    pg.wait_for_timeout(3800)
    g2 = pg.evaluate("()=>({mt:!!document.querySelector('#mt24.on'),bf:getComputedStyle(document.getElementById('mt24')||document.body).backdropFilter})")
    chk('Nhãn tên nhạc mờ đi sau 3,5 s · không backdrop-filter', not g2['mt'] and g2['bf'] in ('none', '', None), g2)
    # ---------- 4) nền Vực Dung Nham 2 lớp ----------
    a = pg.evaluate("()=>new Promise(res=>{const s0=PKC26S.state();setTimeout(()=>{const s1=PKC26S.state();res({s0,s1,sp:PKC26S.speeds()})},1500)})")
    s0_, s1_ = a['s0'], a['s1']
    chk('Ải chương 2 → Vực Dung Nham 2 lớp', s1_['cur'] == 'lava' and s1_['two'], s1_)
    dy, dk = s1_['y'] - s0_['y'], s1_['yk'] - s0_['yk']
    chk('Lớp vách trôi nhanh hơn lớp nền (%.0f vs %.0f px/1,5 s; ×%.2f)' % (dk, dy, dk / max(1, dy)), dk > dy * 1.4 and a['sp']['cliffs'] > a['sp']['floor'], a)
    if CHUP: pg.evaluate("()=>{try{boss=null}catch{};enemies.length=0;bullets.length=0}"); pg.wait_for_timeout(400); shot('nen_lava')
    # Bạo Tẩu → nhanh hơn
    b = pg.evaluate("()=>new Promise(res=>{const k0=PKC26S.speeds().k;try{superTime=0;activateSuper()}catch{};setTimeout(()=>{res({k0,k1:PKC26S.speeds().k})},900)})")
    chk('Bạo Tẩu: 2 lớp nền trôi nhanh hơn (k %.2f → %.2f)' % (b['k0'], b['k1']), b['k1'] > b['k0'] * 1.3, b)
    # việc vẽ mỗi khung trong trận (dung nham + Bạo Tẩu + âm thanh)
    INST = """async()=>{const g=ctx,P=CanvasRenderingContext2D.prototype;let sh=0,fi=0,nc=0,bg=0,area=0;const di=g.drawImage;
     const A=window.PKC26_IMG||{},set=new Set();for(const k of ['bg_lava_floor','bg_lava_cliffs','bg_ice_floor','bg_ice_cliffs'])set.add(A[k]);
     g.drawImage=function(im){if(g.shadowBlur>0)sh++;if(g.filter&&g.filter!=='none')fi++;if(im&&set.has(im.src)){bg++;const y=arguments[2],h=arguments[4];area+=Math.max(0,Math.min(H,y+h)-Math.max(0,y))*W;}return di.apply(this,arguments)};
     const fs=g.fillText;g.fillText=function(){if(g.shadowBlur>0)sh++;return fs.apply(this,arguments)};const st=P.stroke;
     const ce=document.createElement;window.__ncb=[];document.createElement=function(t){if(String(t).toLowerCase()==='canvas'){nc++;window.__ncb.push((new Error().stack.split(String.fromCharCode(10))[2]||'').replace(/.*html:/,'').replace(/\\).*/,''))}return ce.apply(this,arguments)};
     const f=()=>new Promise(r=>requestAnimationFrame(r));const s0=SND24S.stat();let n=0;for(let i=0;i<60;i++){await f();n++;}
     g.drawImage=di;g.fillText=fs;document.createElement=ce;let dpr=0;try{dpr=+(canvas.width/canvas.clientWidth).toFixed(2)}catch{}
     return {sh,fi,nc,st:window.__ncb.slice(),n,bg,area:area/(W*H),dpr,q:VisualFX.counts().quality,s0,s1:SND24S.stat()}}"""
    r = pg.evaluate(INST)
    mods = [sid(x) for x in r['st']]; mine = [m for m in mods if m in ('snd24-js', 'pkc26-js', 'v24-js', 'perf24-js')]
    chk('Trận dung nham: 0 shadowBlur · 0 ctx.filter · V2.4 tạo 0 canvas · DPR 1,00 (NHẸ)', r['sh'] == 0 and r['fi'] == 0 and not mine and r['dpr'] == 1.0, dict(r, mods=mods))
    chk('Nền 2 lớp phủ %.2f màn / khung (≤ 2,02: không tăng tô đè) · %.1f lần vẽ ảnh / khung (≤ 3 mỗi lớp)' % (r['area'] / r['n'], r['bg'] / r['n']), r['area'] / r['n'] <= 2.02 and r['bg'] / r['n'] <= 6, r)
    # ---------- 5) SFX trong trận ----------
    pg.wait_for_timeout(4000)
    s1 = pg.evaluate("()=>SND24S.stat()")
    chk('SFX trong trận kêu được (đạn %s · trúng/nổ %s), đỉnh %d tiếng ≤ 8, 0 lỗi' % (s1['by'].get('shot', 0), s1['by'].get('hit', 0) + s1['by'].get('boomS', 0) + s1['by'].get('boomL', 0), s1['maxLive']),
        s1['by'].get('shot', 0) > 5 and s1['maxLive'] <= 8 and s1['err'] == 0, s1)
    pg.evaluate("()=>{mode='pause'}"); pg.wait_for_timeout(1500)
    # phát đủ 12 tiếng một lượt (bỏ hồi chiêu) → chờ hết → không rò nút
    s2 = pg.evaluate("""async()=>{const ks=Object.keys(SND24S.DEF);let ok=0;for(const k of ks){await new Promise(r=>setTimeout(r,(SND24S.DEF[k][0]*1000|0)+60));if(SND24S.play(k))ok++;}
      await new Promise(r=>setTimeout(r,2400));return Object.assign(SND24S.stat(),{ok,n:ks.length,ctx:(typeof audio!=='undefined'&&audio)?audio.state:'?'})}""")
    chk('Phát đủ %d tiếng · hết tiếng: nút đang sống = 0, tạo = kết thúc (%d/%d)' % (s2['ok'], s2['made'], s2['ended']), s2['ok'] == s2['n'] and s2['live'] == 0 and s2['made'] == s2['ended'] and s2['err'] == 0, s2)
    # dồn dập: 60 lệnh nổ trong 0,3 s → không vượt trần
    s3 = pg.evaluate("""async()=>{const ks=['boomS','boomL','hit','chime','shot'];for(let i=0;i<60;i++){SND24S.play(ks[i%5]);if(i%6===0)await new Promise(r=>setTimeout(r,30));}
      const pk=SND24S.stat().live;await new Promise(r=>setTimeout(r,1600));return Object.assign(SND24S.stat(),{pk})}""")
    chk('Dồn 60 lệnh: đang sống tối đa %d ≤ 8, rơi bớt %d, sau đó về 0' % (s3['pk'], s3['drop']), s3['pk'] <= 8 and s3['live'] == 0, s3)
    # nhạc boss bass
    # tắt nhạc đang chạy để bộ lập lịch không chèn nốt vào bản dựng ngoại tuyến; đo năng lượng dải trầm (< ~150 Hz)
    pg.evaluate("()=>{const b=document.getElementById('music393');if(b&&b.getAttribute('aria-pressed')==='true')b.click();}"); pg.wait_for_timeout(1500)
    LOW = "(a)=>{let y=0,e=0;const k=1-Math.exp(-2*Math.PI*150/44100);for(let i=0;i<a.length;i++){y+=k*(a[i]-y);e+=y*y;}return e}"
    m = pg.evaluate("async()=>{const low=" + LOW + ";const o={};for(const id of ['boss','battle']){window.MUS24B=undefined;const a=await Music96.render(id,4);window.MUS24B=false;const b=await Music96.render(id,4);window.MUS24B=undefined;o[id]=[low(a),low(b)];}return o}")
    chk('Nhạc thêm bass: dải trầm boss ×%.2f · trận ×%.2f so với tắt MUS24B' % (m['boss'][0] / max(1e-9, m['boss'][1]), m['battle'][0] / max(1e-9, m['battle'][1])), m['boss'][0] > m['boss'][1] * 1.15 and m['battle'][0] > m['battle'][1] * 1.15, m)
    xf = pg.evaluate("()=>{try{return Music96.xf()}catch(e){return String(e)}}")
    # ---------- 6) Hẻm Băng + vòng xoay Vô tận ----------
    rot = pg.evaluate("""()=>{const o={};const gm=gameMode,lv=level;try{for(const c of [1,2,5,8,9]){level=c*20-10;o['ch'+c]=null}}catch{}
      level=lv;return o}""")
    ice = pg.evaluate("""()=>new Promise(res=>{const lv=level;let lv5=lv;for(let x=1;x<=200;x++){if(Campaign36.chapter(x)===4){lv5=x;break}}level=lv5;
       setTimeout(()=>{const a=PKC26S.state();level=lv;res(a)},1600)})""")
    chk('Chương 5 → Hẻm Băng 2 lớp', ice['cur'] == 'ice' and ice['two'], ice)
    if CHUP:
        pg.evaluate("()=>{let lv5=level;for(let x=1;x<=200;x++){if(Campaign36.chapter(x)===4){lv5=x;break}}window.__lv0=level;level=lv5;enemies.length=0;bullets.length=0}"); pg.wait_for_timeout(1700); shot('nen_ice')
        pg.evaluate("()=>{level=window.__lv0}")
    e = pg.evaluate("""()=>new Promise(res=>{const gm=gameMode,b0=boss;gameMode='endless';const seen=[];let i=0;
       const step=()=>{boss=null;setTimeout(()=>{boss={x:240,y:-999,hp:1e9,max:1e9,coreHp:1e9,w:1,h:1};setTimeout(()=>{seen.push(PKC26S.state().cur);if(++i<6)step();else{boss=b0;gameMode=gm;res(seen)}},120)},120)};step()})""")
    chk('Vô tận xoay 5 vùng theo boss, có Dung Nham + Băng: %s' % e, 'lava' in e and 'ice' in e and len(set(e)) >= 5, e)
    # ---------- 7) tắt cờ quay về cũ ----------
    off = pg.evaluate("()=>{window.NEN24B=false;const a=PKC26S.state();window.NEN24B=undefined;window.SND24=false;const r=SND24S.route('boom');window.SND24=undefined;return {r}}")
    chk('Cờ tắt: SND24=false → l6309 tự kêu như cũ', off['r'] is False, off)
    chk('0 lỗi trang', not errs, errs[:5])
    br.close()
print('KẾT QUẢ %d/%d' % (sum(R), len(R)))
sys.exit(0 if all(R) else 1)
