# V2.4-A · chụp các khoảnh khắc trận để đối chiếu (T31): thường 0 cánh · bung cánh Bạo Tẩu + hỏa lực + tia chạm · cảnh báo Boss ·
#  chuỗi nổ + CHIẾN THẮNG · bảng tổng kết · hộp thoại đầu trận · bảng hồi sinh.
#  Dùng: python3 tests/chup24.py <html tuyệt đối> <thư mục ra> [TAU=0-based] [ST=ải]
import sys,os,json
from playwright.sync_api import sync_playwright
HTML,OUT=sys.argv[1],sys.argv[2];os.makedirs(OUT,exist_ok=True)
ST=int(os.environ.get('ST','10'));SHIP=int(os.environ.get('TAU','0'));ONLY=os.environ.get('ONLY','')
SETUP=os.environ.get("PRE","")+";"+"localStorage.setItem('saobang-gfx-v66','light');if(!sessionStorage.getItem('s24')){sessionStorage.setItem('s24','1');const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:40},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));}"
_t193=open('/home/claude/phi-doi-sao-bang/claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
_argv=sys.argv;sys.argv=['x',HTML,'40'];exec(_t193);sys.argv=_argv
_t209=open('/home/claude/phi-doi-sao-bang/tests/v203_v212/t209.py').read();exec(_t209[_t209.find('def start'):_t209.find('with sync_playwright')])
def want(k):return not ONLY or k in ONLY.split(',')
with sync_playwright() as p:
  br=p.chromium.launch();_ctx=br.new_context(viewport={'width':393,'height':852},device_scale_factor=2);_ctx.add_init_script(SETUP)
  class _B:
    def new_page(self,**k):return _ctx.new_page()
  pg,errs,o=setup(_B(),'SS')
  pg.add_style_tag(content='#q307,#tutorial392{display:none!important}')
  def enter(keep_story=False):
    for _k in range(3):
      pg.evaluate("(st)=>{const s=document.getElementById('mission-select');if(s&&![...s.options].some(o=>o.value==String(st))){const o=document.createElement('option');o.value=String(st);s.appendChild(o);}try{Progress.canStart=()=>true}catch{}}",ST)
      pg.evaluate("(i)=>{try{selectCraft(i);launchCraft=i;}catch(e){}}",SHIP)
      start(pg,ST)
      if pg.evaluate("()=>mode")=='play':break
    pg.evaluate("()=>{clearInterval(window.__hz)}")
  def shot(name):
    pg.screenshot(path=os.path.join(OUT,name+'.png'));print('ảnh',name,flush=True)
  INV="()=>{clearInterval(window.__iv24);window.__iv24=setInterval(()=>{try{invuln=999;hp=maxHp;const d=document.getElementById('st80');if(d&&!window.__keep80)d.hidden=true;if(!window.__keep80)window.__st80=0;}catch{}},150)}"
  # 1) hộp thoại đầu trận (giữ st80)
  if want('hoithoai'):
    pg.evaluate("()=>{window.__keep80=1;try{localStorage.removeItem('saobang-story80-v1')}catch{}}");enter(True);pg.wait_for_timeout(1200)
    vis=pg.evaluate("()=>{const d=document.getElementById('st80');return !!(d&&!d.hidden)}")
    if not vis:
      pg.evaluate("()=>{try{Story80.show([{who:0,t:'Phi đội, chuẩn bị xuất kích!'}],()=>{})}catch(e){try{Story80.say&&Story80.say('Phi đội, chuẩn bị xuất kích!')}catch(_){}}}");pg.wait_for_timeout(900)
    shot('1_hoithoai_dau_tran');pg.evaluate("()=>{window.__keep80=0}")
  else:enter()
  pg.evaluate(INV);pg.wait_for_timeout(2500)
  # 2) thường (0 cánh) — có quái, có đạn
  if want('thuong'):pg.wait_for_timeout(1500);shot('2_thuong_0_canh')
  # 3) Bạo Tẩu: bung cánh + tia + hỏa lực
  if want('baotau'):
    pg.evaluate("()=>{try{superTime=0;activateSuper()}catch(e){}}");pg.wait_for_timeout(110);shot('3a_baotau_bung_0.1s')
    pg.wait_for_timeout(600);shot('3b_baotau_0.7s')
    pg.wait_for_timeout(1500);shot('3c_baotau_2.2s')
    pg.evaluate("()=>{try{superTime=1.2}catch(e){}}");pg.wait_for_timeout(500);shot('3d_baotau_nhay_cuoi')
    pg.wait_for_timeout(900);shot('3e_thu_canh')
  # 4) cảnh báo Boss + thiên thạch
  if want('canhbao'):
    pg.evaluate("()=>{try{L7309.start('rock')}catch(e){}}");pg.wait_for_timeout(1800);shot('4a_truoc_canhbao_thienthach')
    pg.evaluate("()=>{try{startBoss()}catch(e){}}");pg.wait_for_timeout(700);shot('4b_canhbao_0.7s');pg.wait_for_timeout(1000);shot('4c_canhbao_1.7s')
    pg.wait_for_timeout(4500);shot('4d_boss_vao')
  # 5) hồi sinh
  if want('hoisinh'):
    pg.evaluate("()=>{clearInterval(window.__iv24);try{Revive393.offer()}catch(e){window.__e24=String(e)}}");pg.wait_for_timeout(900);shot('5_hoisinh')
    pg.evaluate("()=>{try{Revive393.accept()}catch(e){}}");pg.wait_for_timeout(800);pg.evaluate(INV)
  # 6) hạ boss → chuỗi nổ → CHIẾN THẮNG → tổng kết
  if want('ketthuc'):
    pg.evaluate("()=>{try{if(!boss)startBoss()}catch(e){}}");pg.wait_for_timeout(5500)
    pg.evaluate("()=>{try{boss.entered76=1;boss.bossHealthReady=true;for(const q of (boss.parts||[]))q.hp=0;boss.coreHp=0;boss.hp=0;defeatBoss();}catch(e){window.__e24=String(e)}}")
    ok=pg.evaluate("async()=>{for(let i=0;i<120;i++){if(window.V24S&&V24S.CH.on)return true;if((!window.V24S||window.V24WIN===false)&&(mode!=='play'||stageFinished36))return 'goc';try{if(boss&&!boss.defeatStarted){boss.entered76=1;boss.bossHealthReady=true;for(const q of (boss.parts||[])){q.hp=0;q.dead=true;}boss.coreHp=0;boss.coreOpen=true;defeatBoss();}}catch(e){}await new Promise(r=>setTimeout(r,50));}return false}")
    print('chuỗi nổ',ok)
    pg.wait_for_timeout(350);shot('6a_no_lien_hoan_0.35s');pg.wait_for_timeout(450);shot('6b_chien_thang_0.8s')
    pg.wait_for_timeout(2600);shot('6c_tong_ket');print('CH',pg.evaluate("()=>{const c=window.V24S?V24S.CH:{};return {after:c.after,sf:c.sf,err:c.err,mode,st:stageFinished36,boss:!!boss}}"))
  print('LỖI',errs[:5],pg.evaluate("()=>window.__e24||''"))
