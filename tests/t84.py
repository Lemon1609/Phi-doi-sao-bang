# V84 · luật tuần (rule84) + danh hiệu/hào quang (title84) + cân bằng boss cuối tuần + 3 nhiệm vụ chốt lại
# Dùng: python3 tests/t84.py <đường_dẫn_tuyệt_đối.html> [thư_mục_ảnh]
import sys,json,os
from playwright.sync_api import sync_playwright
f=sys.argv[1];O=(sys.argv[2] if len(sys.argv)>2 else os.environ.get('SHOT','/tmp'))+'/';R={};OK=[]
def chk(name,cond):OK.append(('✓' if cond else '✗')+' '+name)
SEED="""if(!sessionStorage.getItem('t84')){sessionStorage.setItem('t84','1');const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:%d},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));}"""
def page(p,n):
  b=p.chromium.launch();pg=b.new_page(viewport={'width':393,'height':852});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2500);pg.add_init_script(SEED%n);pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(5500)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();window.RAID83_ALWAYS=true;try{V75.addEn(900)}catch{}}");return b,pg,errs
def play(pg,stage,gm='campaign'):
  pg.evaluate("()=>{try{V75.addEn(200)}catch{}}");pg.evaluate("([s,g])=>{try{Nav74.closeAll&&Nav74.closeAll()}catch{};mode='menu';try{Progress.setLocked(false)}catch{};document.getElementById('gamemode').value=g;document.getElementById('mission-select').value=String(s);Lobby.hide();reset();setInterval(()=>{try{invuln=999;hp=maxHp;const d=document.getElementById('st80');if(d&&!d.hidden){d.hidden=true;}window.__st80=0;}catch{}},300)}",[stage,gm]);pg.wait_for_timeout(2500)
with sync_playwright() as p:
  # ---------- 1. tài khoản chưa qua ải 20: vào được boss cuối tuần, điểm hệ số < 1 ----------
  b,pg,errs=page(p,12)
  R['new']=pg.evaluate("()=>{const a0=Event83.state().raid.att.n;Event83.start(false);return {a0,mode,level,att:Event83.state().raid.att.n,inRaid:Event83.inRaid()}}")
  chk('Tài khoản ải 12 vào được boss cuối tuần (ải boss 10)',R['new']['mode']=='play' and R['new']['level']==10)
  pg.wait_for_timeout(35000);R['newRd']=pg.evaluate("()=>Event83.state().RD")
  chk('Boss cuối tuần có sát thương',(R['newRd'] or {}).get('dmg',0)>0)
  b.close()
  # ---------- 2. tài khoản ải 60: hệ số, nhiệm vụ, luật tuần ----------
  b,pg,errs=page(p,60)
  R['k']=pg.evaluate("()=>[Meta40.reqCP(60)/Meta40.reqCP(20),EVENT83.raid.ms.map(m=>m.dmg),Ship83.ROUTES[0].a()]")
  chk('5 mốc 1,2/3,2/8,5/18/38 triệu (V86)',R['k'][1]==[1200000,3200000,8500000,18000000,38000000])
  chk('#11 cần 120 triệu',R['k'][2][2]==120000000)
  # bảng sự kiện có luật tuần
  pg.evaluate("()=>{window.RULE84_WEEK=Event83.state().idx;Event83.open()}");pg.wait_for_timeout(600);pg.screenshot(path=O+'t84_panel.png')
  R['panel']=pg.evaluate("()=>{const t=document.querySelector('.ev83')?.innerText||'';return {rule:t.includes('LUẬT TUẦN'),hs:t.includes('hệ số'),tasks:EVENT83.ev.map(e=>e.tasks.map(x=>x.k))}}")
  chk('Bảng sự kiện hiện LUẬT TUẦN + hệ số điểm',R['panel']['rule'] and R['panel']['hs'])
  pg.evaluate("()=>Event83.open&&document.querySelector('.ev83 [data-e83=\"x\"]')?.click()")
  # W1 · chiến dịch thường
  pg.evaluate("()=>{window.RULE84_WEEK=0}");play(pg,7)
  R['w1']=pg.evaluate("""()=>{const a=Rule84.active();const sp=Focus393.speed();const s0=score;const bl={x:player.x+30,y:player.y,r:4,dead:false,grazed:false};invuln=0;bulletShieldTime=0;const ok=Combat26.graze(bl,30);const ds=score-s0;invuln=999;return {a,sp,ok,ds}}""")
  chk('W1 bật ở chiến dịch, bay ×1,2',R['w1']['a']=='EV_W1_NEBULA_RUSH' and abs(R['w1']['sp']-1.2)<1e-6)
  chk('W1 sượt đạn ở 30 px được tính, điểm ×2',R['w1']['ok'] and R['w1']['ds']>=100)
  pg.screenshot(path=O+'t84_w1.png')
  # W2 · ải boss ÷5: máu boss ×1,2, quái chậm
  pg.evaluate("()=>{window.RULE84_WEEK=1;mode='menu'}");play(pg,10)
  R['w2']=pg.evaluate("()=>({a:Rule84.active(),em:Rule84.M('enemyMove'),w:Rule84.where()})")
  chk('W2 bật ở ải 10',R['w2']['a']=='EV_W2_TITAN_BREACH' and R['w2']['em']==.85)
  pg.evaluate("()=>{mode='menu'}");play(pg,11)
  chk('W2 tắt ở ải thường 11',pg.evaluate("()=>Rule84.active()") is None)
  # đo di chuyển quái: cùng một trận, bật/tắt luật xen kẽ mỗi 0,5 s
  pg.evaluate("()=>{mode='menu'}");play(pg,15);pg.wait_for_timeout(4000)
  R['mvst']=pg.evaluate("()=>({m:mode,lv:level,n:enemies.filter(x=>!x.dead).length,st80:window.__st80,boss:!!boss})");pg.screenshot(path=O+'t84_mv.png')
  def spd(w):
    return pg.evaluate("""async(w)=>{window.RULE84_WEEK=w;mode='menu';Progress.setLocked(false);try{V75.addEn(200)}catch{};document.getElementById('mission-select').value='15';Lobby.hide();reset();await new Promise(r=>setTimeout(r,5000));
      const L=enemies.filter(x=>!x.dead&&x.v>0);return L.length?L.reduce((a,x)=>a+x.v,0)/L.length:0}""",w)
  R['mv']=[spd(0),spd(1)]
  chk('W2 quái tiến xuống chậm ~15%',R['mv'][0]>0 and abs(R['mv'][1]/R['mv'][0]-.85)<.04)
  # pha máu boss → nhiệm vụ w2_t1
  pg.evaluate("()=>{mode='menu'}");play(pg,15)
  R['ph']=pg.evaluate("""async()=>{window.RULE84_WEEK=1;const p0=(Event83.state().p.bossPh|0);for(let i=0;i<120&&!boss;i++){try{for(const e of enemies)e.dead=true;endlessWave=9;}catch{}await new Promise(r=>setTimeout(r,250));}
     for(let i=0;i<80&&!(boss&&boss.bossHealthReady);i++)await new Promise(r=>setTimeout(r,250));if(!boss)return {err:'no boss'};for(const q of boss.parts||[])q.dead=true;window.__tb84=boss;const mx=boss.max;for(let i=0;i<400&&boss&&!boss.dead&&boss.hp>0;i++){damageBoss(mx*.02,'test',boss);await new Promise(r=>setTimeout(r,20));}
     const b=window.__tb84;await new Promise(r=>setTimeout(r,1600));return {d:(Event83.state().p.bossPh|0)-p0,mx,marks:Object.keys(b&&b.__ph84||{})}}""")
  chk('Phá pha máu boss: mỗi mốc 70/50/30% / hạ đếm đúng 1 lần',R['ph'].get('d',0)>=2 and R['ph']['d']==len(R['ph']['marks']))
  b.close()
  # ---------- 3. W3 Phá Vây + W4 Vô tận ----------
  b,pg,errs2=page(p,60);errs+=errs2
  pg.evaluate("()=>{window.RULE84_WEEK=2;}")
  R['bk']=pg.evaluate("""async()=>{const p0=Event83.state().p.bkPick|0;BK78.start('bk');await new Promise(r=>setTimeout(r,800));const r=BK78.run();const off=r&&r.offer;const rare=window.__rare84;
     if(off&&off.length)BK78._pick(off[0]);await new Promise(r=>setTimeout(r,3500));await new Promise(r=>setTimeout(r,4000));const bl=bullets.filter(b=>!b.dead);return {kind:r&&r.kind,off,rare,a:Rule84.active(),d:(Event83.state().p.bkPick|0)-p0,mode,nb:bl.length,nb84:bl.filter(b=>b.__m84).length}}""")
  chk('W3 bật ở Phá Vây, Ấn Chú hiếm ×1,5',R['bk']['a']=='EV_W3_ROGUE_MAZE' and R['bk']['rare']==1.5)
  chk('Chọn Ấn Chú Phá Vây đếm nhiệm vụ w3_t2',R['bk']['d']>=1)
  chk('W3 đạn địch được làm chậm',R['bk']['nb']>0 and R['bk']['nb84']==R['bk']['nb'])
  pg.screenshot(path=O+'t84_w3.png')
  pg.evaluate("()=>{try{PlayScreen.exit(false)}catch{};mode='menu';try{Lobby.show()}catch{}}");pg.wait_for_timeout(800)
  R['w4']=pg.evaluate("""async()=>{window.RULE84_WEEK=3;mode='menu';Progress.setLocked(false);document.getElementById('gamemode').value='endless';Lobby.hide();reset();await new Promise(r=>setTimeout(r,2500));
     const a=Rule84.active();let n1=0,n0=0;for(let i=0;i<200;i++)n1+=Bal787.buffNeed();window.RULE84_WEEK=0;for(let i=0;i<200;i++)n0+=Bal787.buffNeed();const e0=C76.ELITE_COUNT(150);window.RULE84_WEEK=3;const e1=C76.ELITE_COUNT(150);return {a,n0,n1,e0,e1,gm:gameMode}}""")
  chk('W4 bật ở Vô tận, thanh buff nhanh hơn, tinh anh ×2',R['w4']['a']=='EV_W4_ENDLESS_STORM' and R['w4']['n1']<R['w4']['n0'] and R['w4']['e1']>R['w4']['e0'])
  b.close()
  # ---------- 4. danh hiệu + hào quang ----------
  b,pg,errs3=page(p,60);errs+=errs3
  R['t']=pg.evaluate("""()=>{const c0=Progress.getState().credits;const f0=Combat.factor();const a=Title84.grant('AURA_STAR_DEVOURER',7);const f1=Combat.factor();const b=Title84.grant('AURA_STAR_DEVOURER',7);const c1=Progress.getState().credits;return {a,b,f:f1/f0,dc:c1-c0,list:Title84.list()}}""")
  chk('Mốc 5: nhận danh hiệu +2% sát thương',abs(R['t']['f']-1.02)<1e-6)
  chk('Nhận lại khi còn hạn: làm mới + 15.000 ◈',R['t']['dc']>=15000)
  pg.evaluate("()=>{Nav74.tab&&Nav74.tab('lobby')}");pg.wait_for_timeout(2200);pg.screenshot(path=O+'t84_lobby.png')
  chk('Thẻ danh hiệu ở sảnh',pg.evaluate("()=>!!document.getElementById('tt84')"))
  play(pg,5);pg.wait_for_timeout(1500);pg.screenshot(path=O+'t84_aura.png')
  # ải 180 → Đế Vương Hư Không vĩnh viễn
  R['vm']=pg.evaluate("""async()=>{const h=JSON.parse(localStorage.getItem('saobang-hangar-v1'));const P=Progress.getState();const orig=Progress.getState;Progress.getState=()=>Object.assign({},orig(),{cleared:[...(orig().cleared||[]),180]});await new Promise(r=>setTimeout(r,1800));Progress.getState=orig;Title84.cycle();return {list:Title84.list(),shown:Title84.shown(),u:Title84.until('AURA_VOID_MONARCH')}}""")
  chk('Vượt ải 180 → Đế Vương Hư Không vĩnh viễn',R['vm']['u']==-1)
  pg.wait_for_timeout(600);pg.screenshot(path=O+'t84_aura2.png')
  b.close()
R['errs']=errs[:6];chk('không lỗi JS',not errs)
print(json.dumps(R,ensure_ascii=False)[:3000]);print('KẾT QUẢ '+' · '.join(OK))
