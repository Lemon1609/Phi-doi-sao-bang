# V2.4-C · kiểm: 6 ảnh cắt · Xung Kích (nón + lửa + vòng hút) · cảnh báo laser dọc ⚠ · lõi trắng đạn boss · boss 68–80 % bề ngang
#  · thẻ Mục tiêu Vô tận · huy hiệu CHIẾN THẮNG + lật rương (cả chạm bỏ qua) · 0 shadowBlur/filter/backdrop/canvas mới · DPR 1,00 NHẸ
#  · 0 % đổi điểm Vô tận.   Dùng: python3 tests/t_v24c.py <html tuyệt đối> [CHUP=thư mục]
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

# ---------- 1) ảnh ----------
D = os.path.join(ROOT, 'src/v24cimg')
F = ['fx_blitz_cone', 'fx_blitz_flame', 'fx_blitz_vortex', 'ui_victory_crest', 'ui_chest_closed', 'ui_chest_open']
sz = {}; bad = []
for f in F:
    p = os.path.join(D, f + '.webp'); sz[f] = os.path.getsize(p)
    try: a = np.array(Image.open(p).convert('RGBA')); assert a.shape[0] > 20 and a[..., 3].max() > 200
    except Exception as e: bad.append((f, str(e)))
chk('6 ảnh V2.4-C tổng ≤ 150 KB (%.1f KB), 0 ảnh hỏng' % (sum(sz.values()) / 1024), sum(sz.values()) <= 150 * 1024 and not bad, (sz, bad))
from scipy import ndimage
a = np.array(Image.open(os.path.join(D, 'ui_chest_open.webp')).convert('RGBA')).astype(int)
al = a[..., 3]; solid = al > 200
edge = solid & ~ndimage.binary_erosion(solid, iterations=1)  # điểm đặc sát mép
fr = (al > 40) & (al <= 200)
dark_edge = (a[..., :3].max(axis=2) < 28) & edge
dark_fr = (a[..., :3].max(axis=2) < 28) & fr
chk('Rương mở: 0 viền đen (mép đặc tối %.2f %% · bán trong suốt tối %.2f %%)' % (dark_edge.sum() / max(1, edge.sum()) * 100, dark_fr.sum() / max(1, fr.sum()) * 100),
    dark_edge.sum() / max(1, edge.sum()) < .02 and dark_fr.sum() / max(1, fr.sum()) < .02, (int(dark_edge.sum()), int(dark_fr.sum())))
for f in ('ui_victory_crest', 'ui_chest_closed'):
    b = np.array(Image.open(os.path.join(D, f + '.webp')).convert('RGBA'))
    chk('%s: góc ngoài trong suốt, thân đặc' % f, b[0, 0, 3] == 0 and b[-1, -1, 3] == 0 and b[b.shape[0] // 2, b.shape[1] // 2, 3] == 255, (b[0, 0], b[b.shape[0] // 2, b.shape[1] // 2]))

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
INST = """async(n)=>{const g=ctx;let sh=0,fi=0,nc=0;const A=window.V24C_IMG||{},inv={};for(const k in A)inv[A[k]]=k;const cnt={};const di=g.drawImage;
 g.drawImage=function(im){if(g.shadowBlur>0)sh++;if(g.filter&&g.filter!=='none')fi++;const k=im&&inv[im.src];if(k)cnt[k]=(cnt[k]||0)+1;return di.apply(this,arguments)};
 const fs=g.fillText;g.fillText=function(){if(g.shadowBlur>0)sh++;return fs.apply(this,arguments)};
 const ce=document.createElement;window.__ncc=[];document.createElement=function(t){if(String(t).toLowerCase()==='canvas'){nc++;window.__ncc.push((new Error().stack.split(String.fromCharCode(10))[2]||'').replace(/.*html:/,'').replace(/\\).*/,''))}return ce.apply(this,arguments)};
 const f=()=>new Promise(r=>requestAnimationFrame(r));for(let i=0;i<n;i++)await f();
 g.drawImage=di;g.fillText=fs;document.createElement=ce;let dpr=0;try{dpr=+(canvas.width/canvas.clientWidth).toFixed(2)}catch{}
 return {sh,fi,nc,st:window.__ncc.slice(),cnt,dpr,n}}"""
MINE = ('v24c-js', 'v24c-img-js', 'v24-js', 'snd24-js', 'pkc26-js', 'target307-js')
with sync_playwright() as p:
    br = p.chromium.launch(args=['--autoplay-policy=no-user-gesture-required'])
    cx = br.new_context(viewport={'width': 393, 'height': 852}, device_scale_factor=2 if CHUP else 1); cx.add_init_script(SETUP)
    class _B:
        def new_page(self, **k): return cx.new_page()
    pg, errs, o = setup(_B(), 'SS')
    pg.add_style_tag(content='#q307,#tutorial392{display:none!important}')
    def shot(n):
        if CHUP: pg.screenshot(path=os.path.join(CHUP, n + '.png'))
    def enter(st, tau=0):
        pg.evaluate("(a)=>{try{for(let i=0;i<13;i++)Campaign36.acquire('craft',i,'','story')}catch{};try{selectCraft(a)}catch{}}", tau)
        for _k in range(3):
            pg.evaluate("(st)=>{const s=document.getElementById('mission-select');if(s&&![...s.options].some(o=>o.value==String(st))){const o=document.createElement('option');o.value=String(st);s.appendChild(o);}try{Progress.canStart=()=>true}catch{}}", st)
            start(pg, st)
            if pg.evaluate("()=>mode") == 'play': break
        pg.evaluate("()=>{clearInterval(window.__hz);clearInterval(window.__iv24);window.__iv24=setInterval(()=>{try{invuln=999;hp=maxHp;const d=document.getElementById('st80');if(d)d.hidden=true;window.__st80=0;}catch{}},150)}")
    pg.evaluate("()=>{try{sound=true}catch{};try{Audio393.unlock()}catch{}}"); pg.wait_for_timeout(2200)
    # ---------- 2) Xung Kích ----------
    pg.evaluate("()=>{try{for(let s=1;s<30;s++){if(!Progress.getState().cleared.includes(s))Progress.rewardStage(s)}}catch(e){window.__rs0=String(e)}}")  # mở khóa ải 1–29 để phần thưởng ải 30 hợp lệ (chỉ cho bài kiểm)
    enter(30)
    pg.evaluate("()=>{enemies.length=0;bullets.length=0;PKB25S.apply('s',player.x,player.y)}"); pg.wait_for_timeout(900)
    r = pg.evaluate(INST, 30)
    k = pg.evaluate("()=>({b:window.__blitz24,k:PKC26S.speeds().k,s:window.__surgeS25})")
    chk('Xung Kích: nón gió + cột lửa vẽ mỗi khung (%s), nền parallax ×%.2f (~2,4)' % (r['cnt'], k['k']), k['b'] == 1 and r['cnt'].get('fx_blitz_cone', 0) >= 25 and r['cnt'].get('fx_blitz_flame', 0) >= 25 and 2.2 <= k['k'] <= 2.45, (r['cnt'], k))
    mods = [sid(x) for x in r['st']]; mine = [m for m in mods if m in MINE]
    chk('Xung Kích: 0 shadowBlur · 0 filter · V2.4 tạo 0 canvas · DPR 1,00', r['sh'] == 0 and r['fi'] == 0 and not mine and r['dpr'] == 1.0, dict(r, mods=mods))
    # tông quái → X<n> + mưa tinh thể
    t = pg.evaluate("""()=>new Promise(res=>{for(let i=0;i<4;i++){enemies.push({x:player.x+(i-1.5)*18,y:player.y-20,hp:1,v:0,type:0,age:0,phase:0,fire:999,dead:false})}
      setTimeout(()=>res({pops:V24CS.pops(),sp:V24CS.sp()}),180)})""")
    if CHUP: shot('blitz_ram')
    chk('Tông nổ quái khi Xung Kích → chữ X<n> + mưa tinh thể (%d chữ · %d hạt)' % (t['pops'], t['sp']), t['pops'] >= 1 and t['sp'] >= 4, t)
    # thả 8 viên ★ rồi chờ hết Xung Kích → vòng xoáy + hút (Chiến dịch: hút thật)
    pg.evaluate("()=>{for(let i=0;i<8;i++)Safety31.push(drops,100,{x:40+i*55,y:180+(i%3)*60,type:'star',t:0,vy:0});window.__d0=drops.filter(d=>d.type==='star').map(d=>Math.hypot(d.x-player.x,d.y-player.y)).reduce((a,b)=>a+b,0)}")
    v = pg.evaluate("""()=>new Promise(res=>{const t0=performance.now();const iv=setInterval(()=>{if(!(window.__surgeS25>0)){clearInterval(iv);setTimeout(()=>{const ds=drops.filter(d=>d.type==='star');
       res({vt:performance.now()/1000-V24CS.S.vt,ghost:V24CS.ghost(),n:ds.length,d1:ds.map(d=>Math.hypot(d.x-player.x,d.y-player.y)).reduce((a,b)=>a+b,0),d0:window.__d0})},120)}},20)})""")
    if CHUP: shot('blitz_vortex')
    chk('Hết Xung Kích: vòng xoáy bật (%.2f s trước) + hút tinh thể (bóng %d; khoảng cách ★ %.0f → %.0f)' % (v['vt'], v['ghost'], v['d0'], v['d1']), 0 <= v['vt'] < .45 and v['ghost'] >= 1 and (v['n'] == 0 or v['d1'] < v['d0']), v)
    # ---------- 3) laser dọc ⚠ ----------
    pg.evaluate("()=>{try{startBoss()}catch{}}")
    pg.evaluate("()=>new Promise(r=>{const t0=performance.now();const iv=setInterval(()=>{if((boss&&boss.y>=110)||performance.now()-t0>14000){clearInterval(iv);setTimeout(r,1500)}},100)})")
    w = pg.evaluate("""async()=>{const g=ctx;let red=0,tri=0,white=0;const fr=g.fillRect;g.fillRect=function(){if(g.fillStyle==='#ff2a2a')red++;if(g.fillStyle==='#ffffff'&&g.globalCompositeOperation==='lighter')white++;return fr.apply(this,arguments)};
      const di=g.drawImage;g.drawImage=function(im){if(im&&im.width===64&&im.height===58)tri++;return di.apply(this,arguments)};const b0=(SND24S.stat().by.beep||0);
      Safety31.push(beams,24,{x:200,y:0,width:44,age:0,warn:1.2,duration:.9});const f=()=>new Promise(r=>requestAnimationFrame(r));let t0=performance.now(),early=red;
      while(performance.now()-t0<380)await f();early=red;while(performance.now()-t0<1150)await f();const warn=red,wt=tri;while(performance.now()-t0<1700)await f();
      g.fillRect=fr;g.drawImage=di;return {early,warn,tri:wt,white,beep:(SND24S.stat().by.beep||0)-b0}}""")
    if CHUP:
        pg.evaluate("()=>{Safety31.push(beams,24,{x:140,y:0,width:44,age:.7,warn:1.2,duration:.9});}"); pg.wait_for_timeout(150); shot('laser_warn')
    chk('Laser dọc: 0,75 s cuối báo trước có đường ngắm đỏ + ⚠ nhấp nháy + bíp, rồi bắn lõi trắng (%s)' % w, w['early'] == 0 and w['warn'] > 5 and w['tri'] > 3 and w['beep'] >= 1 and w['white'] >= 1, w)
    # ---------- 4) đạn boss lõi trắng + cỡ boss ----------
    c = pg.evaluate("""async()=>{for(let i=0;i<12;i++)bullets.push({x:60+i*30,y:300+(i%4)*40,vx:0,vy:20,r:6,color:'#ff4466'});const g=ctx;let d=0,bw=0;const di=g.drawImage;
      g.drawImage=function(im){if(im&&im.width===24&&im.height===24)d++;return di.apply(this,arguments)};const od=Bosses28.drawBoss;let inB=0;Bosses28.drawBoss=function(){inB=1;const r=od.apply(this,arguments);inB=0;return r};
      let x0=1e9,x1=-1e9;const di2=g.drawImage;g.drawImage=function(im){if(inB&&im&&(im.width||0)>40){const n=arguments.length,dx=n>=9?arguments[5]:arguments[1],dw=n>=9?arguments[7]:n>=5?arguments[3]:(im.width||0);const tr=g.getTransform();
        for(const xx of [dx,dx+dw]){const X=tr.a*xx+tr.e;x0=Math.min(x0,X);x1=Math.max(x1,X);}bw=x1-x0;}return di2.apply(this,arguments)};
      const f=()=>new Promise(r=>requestAnimationFrame(r));for(let i=0;i<10;i++)await f();g.drawImage=di;Bosses28.drawBoss=od;
      let dpr=1;try{dpr=canvas.width/W}catch{};return {d,bw:bw/dpr,W,major:!!(boss&&boss.major36),bx:boss&&boss.x}}""")
    if CHUP:
        pg.wait_for_timeout(200); shot('boss_core')
    chk('Đạn boss có lõi trắng sắc (%d chấm / 10 khung)' % c['d'], c['d'] >= 60, c)
    chk('Boss lớn %.0f px = %.0f %% bề ngang (68–80 %%)' % (c['bw'], c['bw'] / c['W'] * 100), .66 <= c['bw'] / c['W'] <= .82, c)
    # ---------- 5) huy hiệu + lật rương ----------
    pg.evaluate("""()=>{bullets.length=0;beams.length=0;window.__tl=[];const t0=performance.now();window.__tli=setInterval(()=>{const l=document.querySelector('#overlay.rs-on #rs .rs-loot');const k=(l?l.dataset.c24||'-':'x');const L=window.__tl;if(!L.length||L[L.length-1][0]!==k)L.push([k,Math.round(performance.now()-t0)])},20);
      try{boss.dead=true;finishStage36(true)}catch(e){window.__fe=String(e)}}""")
    pg.wait_for_timeout(1650)
    if CHUP: shot('crest')
    ch = pg.evaluate("""()=>new Promise(res=>{const t0=performance.now();const iv=setInterval(()=>{const l=document.querySelector('#overlay.rs-on #rs .rs-loot');if(l&&l.dataset.c24){clearInterval(iv);res({st:l.dataset.c24,box:!!l.querySelector('.c24box'),dt:performance.now()-t0,tl:window.__tl.slice()})}
      if(performance.now()-t0>7000){clearInterval(iv);res({st:'none',mode,CH:window.V24S&&{on:V24S.CH.on,done:V24S.CH.done,err:V24S.CH.err,after:V24S.CH.after,sf:V24S.CH.sf},fe:window.__fe,sf36:typeof stageFinished36!=='undefined'?stageFinished36:'?',boss:!!boss,rs:!!document.querySelector('#overlay.rs-on #rs'),loot:!!document.querySelector('#overlay.rs-on #rs .rs-loot'),n:document.querySelectorAll('#overlay.rs-on #rs .rs-loot .rw78').length})}},20)})""")
    if CHUP: pg.wait_for_timeout(200); shot('chest_shake'); pg.wait_for_timeout(420); shot('chest_open')
    pg.wait_for_timeout(4500)  # máy đo không GPU: hoạt ảnh CSS chậm theo khung
    done = pg.evaluate("()=>{const l=document.querySelector('#overlay.rs-on #rs .rs-loot');return l?{st:l.dataset.c24,box:!!l.querySelector('.c24box'),vis:[...l.querySelectorAll('.rw78:not(.e22h)')].map(e=>getComputedStyle(e).opacity)}:null}")
    if CHUP: shot('result')
    chk('Kết trận: lật rương chạy (%s) rồi quà hiện đủ (%s)' % (ch.get('st'), done and done.get('vis')), ch.get('st') == 'run' and ch.get('box') and done and done['st'] == 'done' and all(float(x) > .9 for x in done['vis']), (ch, done))
    bf = pg.evaluate("()=>[...document.querySelectorAll('#overlay *')].filter(e=>{const s=getComputedStyle(e);return (s.backdropFilter&&s.backdropFilter!=='none')||(s.webkitBackdropFilter&&s.webkitBackdropFilter!=='none')}).length")
    chk('Màn kết quả: 0 backdrop-filter', bf == 0, bf)
    # bấm bỏ qua: làm lại trên chính lưới quà
    sk = pg.evaluate("""()=>new Promise(res=>{const l=document.querySelector('#overlay.rs-on #rs .rs-loot');if(!l)return res(null);delete l.dataset.c24;setTimeout(()=>{const st=l.dataset.c24;
       document.getElementById('overlay').dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}));setTimeout(()=>res({before:st,after:l.dataset.c24,box:!!l.querySelector('.c24box:not(.c24out)')}),80)},260)})""")
    chk('Chạm bỏ qua hoạt ảnh rương: quà hiện ngay (%s)' % sk, sk and sk['before'] == 'run' and sk['after'] == 'done' and not sk['box'], sk)
    # ---------- 6) thẻ Mục tiêu Vô tận + 0 % đổi điểm ----------
    pg.evaluate("()=>{try{End78.goLobby()}catch{}}"); pg.wait_for_timeout(1200)
    enter(12); pg.wait_for_timeout(600)
    g0 = pg.evaluate("()=>new Promise(r=>{gameMode='endless';boss=null;stageTime=.3;setTimeout(()=>r({gm:gameMode,mode,blitz:window.__blitz24,st:stageTime,k:PKC26S.speeds().k}),200)})")
    if CHUP: shot('endless_start')
    tg = pg.evaluate("""()=>new Promise(res=>{setTimeout(()=>{const e=document.querySelector('#game-field .tg307');const a=e&&e.querySelector('.tg24a');const t0=e&&e.querySelector('b').textContent;
       score=(parseInt((t0||'0').replace(/\\D/g,''))||1000)+5;setTimeout(()=>{res({tg:!!e,avatar:!!(a&&a.getAttribute('src')),pass:e&&e.classList.contains('pass'),pp:e&&getComputedStyle(e.querySelector('.tg24p')).opacity,t0,t1:e&&e.querySelector('b').textContent,lab:e&&e.querySelector('small').textContent})},420)},600)})""")
    if CHUP: shot('target_pass')
    chk('Vô tận: thẻ Mục tiêu có avatar phi công, vượt mốc → VƯỢT MỐC! + trượt mốc kế (%s → %s)' % (tg.get('t0'), tg.get('t1')), tg['tg'] and tg['avatar'] and tg['pass'] and float(tg['pp'] or 0) > .3 and tg['t0'] != tg['t1'], (g0, tg))
    lb = pg.evaluate("()=>{try{return (V92.CFG.rank.tiers.find(t=>t.min===60000)||{}).n}catch{return null}}")
    # 0 % đổi điểm Vô tận: hút Xung Kích không dời viên ★ thật; tông quái cộng điểm như khi tắt V2.4-C
    z = pg.evaluate("""()=>new Promise(res=>{enemies.length=0;drops.length=0;for(let i=0;i<6;i++)Safety31.push(drops,100,{x:60+i*60,y:200,type:'star',t:0,vy:0});const p0=drops.map(d=>d.x+','+d.y).join('|');
       V24CS.vortex();setTimeout(()=>{const p1=V24CS.S.pull<=0?p0:'moved';
        const mk=()=>({x:player.x,y:player.y-20,hp:1,maxHp:1,r:14,size:28,type:'scout',vy:0,dead:false});window.__surgeS25=1;combo=0;comboTime=0;let s0=score;const e1=mk();enemies.push(e1);kill(e1);const dOn=score-s0;
        window.V24C=false;combo=0;comboTime=0;s0=score;const e2=mk();enemies.push(e2);kill(e2);const dOff=score-s0;window.V24C=undefined;res({same:p0===p1,dOn,dOff,pull:V24CS.S.pull,gm:gameMode,mode})},300)})""")
    chk('Vô tận 0 %% đổi điểm: hút chỉ là hình (không kéo ★ thật: %s), điểm tông quái bật/tắt V2.4-C %s / %s' % (z['same'], z['dOn'], z['dOff']), z['same'] and z['dOn'] == z['dOff'], z)
    # bứt tốc đầu trận Vô tận (chỉ hình)
    chk('Bứt tốc đầu trận Vô tận (1,6 s đầu, chỉ hình): bật (%s)' % g0, g0['gm'] == 'endless' and g0['blitz'] == 1, g0)
    chk('0 lỗi trang', not errs, errs[:5])
    br.close()
print('KẾT QUẢ %d/%d' % (sum(R), len(R)))
sys.exit(0 if all(R) else 1)
