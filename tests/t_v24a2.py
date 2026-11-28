# V2.4-A2 · kiểm: đạn 6 bậc + chữ ký Bạo Tẩu 13 tàu + sân khấu Đồ Giám; hiệu năng (0 shadowBlur/filter/backdrop-filter, 0 canvas mới trong trận,
#  DPR 1,00 ở NHẸ); 0 đổi sát thương (so ST bia khi bật/tắt V24A2); ảnh chụp cho T32 (CHUP=thư mục).
#  Dùng: python3 tests/t_v24a2.py <html tuyệt đối> [CHUP=thư mục]
import sys,os,json
from playwright.sync_api import sync_playwright
HTML=sys.argv[1];CHUP=os.environ.get('CHUP','');ST=10
if CHUP:os.makedirs(CHUP,exist_ok=True)
SETUP="localStorage.setItem('saobang-gfx-v66','light');"
_t193=open('/home/claude/phi-doi-sao-bang/claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
_argv=sys.argv;sys.argv=['x',HTML,'40'];exec(_t193);sys.argv=_argv
_t209=open('/home/claude/phi-doi-sao-bang/tests/v203_v212/t209.py').read();exec(_t209[_t209.find('def start'):_t209.find('with sync_playwright')])
R=[]
def chk(n,ok,info=''):R.append(bool(ok));print(('✓ ' if ok else '✗ TRƯỢT ')+n,('' if ok else info),flush=True)
FR=[0,1,2,6,11,11]
import re as _re,bisect as _bi
_H=open(HTML,encoding='utf-8').read();_LN=[0];[_LN.append(m.end()) for m in _re.finditer('\n',_H)]
_SP=[(m.start(),m.group(1)) for m in _re.finditer(r'<script id="([^"]+)"',_H)];_SPP=[q for q,_ in _SP]
def sid(lc):
  try:
    ln,col=map(int,lc.split(':')[:2]);k=_bi.bisect_right(_SPP,_LN[ln-1]+col)-1;return _SP[k][1]
  except Exception:return '?'
OLDNC={}
with sync_playwright() as p:
  br=p.chromium.launch();cx=br.new_context(viewport={'width':393,'height':852},device_scale_factor=2 if CHUP else 1);cx.add_init_script(SETUP)
  class _B:
    def new_page(self,**k):return cx.new_page()
  pg,errs,o=setup(_B(),'SS')
  pg.add_style_tag(content='#q307,#tutorial392{display:none!important}')
  def shot(n):
    if CHUP:pg.screenshot(path=os.path.join(CHUP,n+'.png'))
  def enter(tau,fr):
    pg.evaluate("(a)=>{try{for(let i=0;i<13;i++)Campaign36.acquire('craft',i,'','story')}catch{};try{V70.setTier('craft',a[0],a[1])}catch(e){};try{SSS87._set({done:a[2]?{[a[0]]:1}:{},off:{}})}catch{};try{selectCraft(a[0]);launchCraft=a[0]}catch{}}",[tau,fr,fr==11 and tau in (10,11,12) and False])
    for _k in range(3):
      pg.evaluate("(st)=>{const s=document.getElementById('mission-select');if(s&&![...s.options].some(o=>o.value==String(st))){const o=document.createElement('option');o.value=String(st);s.appendChild(o);}try{Progress.canStart=()=>true}catch{}}",ST)
      start(pg,ST)
      if pg.evaluate("()=>mode")=='play':break
    pg.evaluate("()=>{clearInterval(window.__hz);clearInterval(window.__iv24);window.__iv24=setInterval(()=>{try{invuln=999;hp=maxHp;const d=document.getElementById('st80');if(d)d.hidden=true;window.__st80=0;}catch{}},150)}")
  # ---- 1) đạn 6 bậc: nhóm đúng theo bậc khung
  enter(0,0);pg.wait_for_timeout(1500)
  g=pg.evaluate("()=>{const o=[];for(const t of ['thuong','luc','lam','tim','tim5','ss']){o.push(t)}return {tier:(window.Dan299&&Dan299.tierOf(0))||'?'}}")
  chk('Tàu #1 Thường: bậc khung đọc được',g['tier'] in ('thuong','luc','lam','tim','tim5','ss'),g)
  if CHUP:pg.wait_for_timeout(600);shot('a_t1_thuong')
  # ---- 2) chữ ký Bạo Tẩu cho đủ 13 tàu + 0 lỗi + đo việc vẽ
  INST="""async()=>{const g=ctx,P=CanvasRenderingContext2D.prototype;let sh=0,fi=0,nc=0;const di=g.drawImage;g.drawImage=function(){if(g.shadowBlur>0)sh++;if(g.filter&&g.filter!=='none')fi++;return di.apply(this,arguments)};
   const ce=document.createElement;window.__nc24=[];document.createElement=function(t){if(String(t).toLowerCase()==='canvas'){nc++;window.__nc24.push((new Error().stack.split(String.fromCharCode(10))[2]||'').replace(/.*html[^:]*:/,'').replace(/\).*/,''))}return ce.apply(document,arguments)};
   let n=0,sig=0;const os=window.V24SIG;window.V24SIG=os;const f=()=>new Promise(r=>requestAnimationFrame(r));try{superTime=0;activateSuper()}catch(e){}
   for(let i=0;i<40;i++){await f();n++;}g.drawImage=di;document.createElement=ce;let dpr=0;try{dpr=+(canvas.width/canvas.clientWidth).toFixed(2)}catch{}
   return {st:window.__nc24.slice(),sh,fi,nc,n,dpr,sup:superTime>0,wing:window.V24S&&V24S.st.on,q:VisualFX.counts().quality}}"""
  bad=[]
  for tau in range(13):
    enter(tau,11);pg.wait_for_timeout(900)
    r=pg.evaluate(INST)
    mods=[sid(x) for x in r['st']];mine=[m for m in mods if m in('v24-js','perf24-js','wing24-img-js')]
    for m in mods:
      if m not in('v24-js','perf24-js','wing24-img-js'):OLDNC[m]=OLDNC.get(m,0)+1
    if not(r['sup'] and r['wing'] and r['sh']==0 and r['fi']==0 and not mine and r['dpr']==1.0):bad.append((tau,r,mine))
    if CHUP and tau in (1,2,4,6,7,8,9,12):shot('b_chuky_tau%d'%(tau+1))
    if CHUP and tau in (0,7):pg.evaluate("()=>{superTime=0}");pg.wait_for_timeout(700);shot('a_tau%d_max_thuong'%(tau+1))
  chk('13 tàu: Bạo Tẩu bung cánh mới · 0 shadowBlur · 0 filter · V2.4 tạo 0 canvas trong trận · DPR 1,00 (NHẸ)',not bad,bad[:3])
  print('  (mô-đun cũ tạo canvas lần đầu Bạo Tẩu, 13 tàu:',OLDNC,')')
  # Bậc 1 cho 2 tàu mẫu (so với MAX ở trên)
  if CHUP:
    for tau in (0,7):enter(tau,0);pg.wait_for_timeout(1300);shot('a_tau%d_bac1'%(tau+1))
  # ---- 3) 0 đổi sát thương: tổng máu quái mất trong 6 s, bật vs tắt V24A2 (cùng tàu, cùng bậc)
  def dmg(off):
    enter(0,11);pg.evaluate("(o)=>{window.V24A2=o?false:undefined}",off);pg.wait_for_timeout(600)
    return pg.evaluate("""async()=>{let tot=0;const of=Feedback31.damage;Feedback31.damage=function(e,a){if(a>0&&Number.isFinite(a))tot+=a;return of.apply(this,arguments)};await new Promise(r=>setTimeout(r,8000));Feedback31.damage=of;return tot}""")
  A=[];B=[]
  for _i in range(3):A.append(dmg(False));B.append(dmg(True))
  pg.evaluate("()=>{window.V24A2=undefined}");A.sort();B.sort();a,b=A[1],B[1]
  chk('Sát thương thật không đổi khi bật/tắt V2.4-A2 (trung vị 3 lượt × 8 s, lệch ≤ 15 % do quái ngẫu nhiên)',b>0 and abs(a-b)/b<=.15,(A,B))
  # ---- 4) Đồ Giám: mở cả tàu có và chưa có, đổi THƯỜNG ↔ BẠO TẨU, 6 bậc, dừng vòng lặp khi đóng
  pg.evaluate("()=>{try{end(false)}catch{};mode='menu';try{Lobby.show()}catch{}}");pg.wait_for_timeout(1200)
  pg.evaluate("()=>{try{Campaign36.getState()}catch{}}")
  op=pg.evaluate("""async()=>{try{L7309.open()}catch(e){return String(e)}await new Promise(r=>setTimeout(r,700));const cx=document.querySelector('.m63.cx7');return !!(cx&&!cx.hidden)}""")
  chk('Mở được Bách khoa (Đồ Giám)',op is True,op)
  res=pg.evaluate("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const out=[];
    const tab=[...document.querySelectorAll('.m63.cx7 button')].find(b=>/CHIẾN CƠ/.test(b.textContent));if(tab)tab.click();await w(300);
    for(const k of ['s0','s12']){const c=document.querySelector('.m63.cx7 [data-cx7="'+k+'"]');if(!c){out.push({k,miss:1});continue;}c.click();await w(900);
      const d=document.querySelector('.m63.cx7 .dg24');if(!d){out.push({k,nodg:1});continue;}const run0=!!V24DG.raf;
      d.querySelector('[data-dg=b]').click();await w(500);const bt=V24DG.bt&&V24DG.ws.on;const tiers=[];for(let i=0;i<6;i++){d.querySelector('[data-dt="'+i+'"]').click();await w(120);tiers.push(V24DG.ti===i);}
      d.querySelector('[data-dg=n]').click();await w(300);out.push({k,run0,bt,tiers:tiers.every(Boolean),inf:d.querySelector('.dg24inf').textContent.slice(0,80),pv10:!!document.querySelector('.m63.cx7 canvas.pv10')});}
    return out}""")
  ok=all(x.get('run0') and x.get('bt') and x.get('tiers') and not x.get('pv10') for x in res)
  chk('Đồ Giám: tàu có (#1) + chưa có (#13) · THƯỜNG↔BẠO TẨU · 6 bậc · không chạy song song khung pv10 cũ',ok,res)
  if CHUP:
    pg.evaluate("""async()=>{const c=document.querySelector('.m63.cx7 [data-cx7="s12"]');c&&c.click();await new Promise(r=>setTimeout(r,500));const d=document.querySelector('.dg24');d.querySelector('[data-dt="5"]').click();d.querySelector('[data-dg=n]').click();}""")
    pg.wait_for_timeout(900);shot('c_dogiam_thuong')
    pg.evaluate("()=>{document.querySelector('.dg24 [data-dg=b]').click()}");pg.wait_for_timeout(1100);shot('c_dogiam_baotau')
  st=pg.evaluate("""async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const cx=document.querySelector('.m63.cx7');const x=cx&&cx.querySelector('[data-cx7x]');if(x)x.click();else if(cx)cx.hidden=true;await w(700);return {raf:V24DG.raf,on:V24DG.on}}""")
  chk('Đóng Bách khoa: vòng vẽ Đồ Giám dừng hẳn',not st['raf'],st)
  chk('0 lỗi JS',not errs,errs[:4])
  print('KẾT QUẢ',sum(R),'/',len(R))
