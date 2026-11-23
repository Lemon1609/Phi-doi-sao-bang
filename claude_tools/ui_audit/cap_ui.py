# V309 · TỔNG RÀ UI (trước Lượt 17): chụp mọi màn/tab/popup ở 390×844 DPR2 + kiểm kê icon SVG/phẳng/ký tự và nút/khung style cũ.
# Chạy: python3 claude_tools/ui_audit/cap_ui.py <bản.html> <thư mục ra> [lọc tên]
import sys,os,json,re
os.chdir(os.path.dirname(os.path.abspath(__file__))+'/../..')
src=open('claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
HTML,OUT=sys.argv[1],sys.argv[2];FILT=sys.argv[3] if len(sys.argv)>3 else ''
sys.argv=['x',HTML,'160'];exec(src)
t209=open('tests/v203_v212/t209.py').read();exec(t209[t209.find('def start'):t209.find('with sync_playwright')])
os.makedirs(OUT,exist_ok=True)
# setup() của t193 nhưng khung 390×844 DPR 2
def setup2(br,grade):
  ctx=br.new_context(viewport={'width':390,'height':844},device_scale_factor=2);pg=ctx.new_page();pg.set_default_timeout(180000);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2000);pg.add_init_script(SEED);pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(5000)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();window.RULE84=false;window.TITLE84=false;try{Ch9.open=()=>true}catch{};document.querySelectorAll('.m63,.adv70,.st71').forEach(e=>e.hidden=true)}")
  pg.evaluate('()=>{window.__SSG=false}');o=pg.evaluate(BUILD,[b,ci,FR,PCAP]);pg.wait_for_timeout(800)
  pg.add_init_script(LV%(ci,b['sl'],ci,json.dumps(grade)));pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(5000)
  pg.evaluate("""(a)=>{const [b,ci]=a;Progress.setLocked(false);SSS87._set({done:b.sss?{[ci]:1}:{},off:{}});Wing87._set({id:b.wing?b.wing-1:null});selectCraft(ci);launchCraft=ci;}""",[b,ci])
  return pg,errs
PREP="""()=>{window.__uiKeys="badge,calendar,crystal,duy_tri,hand,hap_thu,lock,music,nap_nhanh,pha_giap,phan_cong,plane,shield,slot_atk,slot_def,slot_tac,swords,target,trophy,tu_truong,vo_nl,xung_chan,xung_kich".split(",");document.getElementById('tutorial392')?.remove();window.RULE84=false;window.TITLE84=false;try{Ch9.open=()=>true}catch{};
 document.querySelectorAll('.m63,.adv70,.st71').forEach(e=>e.hidden=true);const q=document.getElementById('q307');if(q)q.style.display='none';
 window.__clickText=(t,sel)=>{const L=[...document.querySelectorAll(sel||'button,[data-ck9],[data-h9b],[data-tab],[role=button],a,li,.tab,[data-t]')].filter(e=>{const r=e.getBoundingClientRect();if(!r.width||!r.height||r.bottom<0||r.top>innerHeight)return false;const cs=getComputedStyle(e);if(cs.visibility==='hidden'||cs.display==='none'||+cs.opacity===0)return false;return (e.textContent||'').replace(/\\s+/g,' ').toUpperCase().includes(t.toUpperCase());});
  L.sort((a,b)=>a.textContent.length-b.textContent.length);if(!L.length)return false;L[0].click();return L[0].textContent.trim().slice(0,30);};}"""
INV=open(os.path.dirname(os.path.abspath(__file__))+'/inv.js').read()
# (bộ, tên màn, các bước). Bước: ('js',mã) · ('ct',chữ) bấm phần tử đang hiện có chữ · ('w',ms) · ('st',ải) vào trận
SC=[
 (1,'Sảnh chính',[('js',"mode='menu';Lobby.show()"),('w',1200)]),
 (1,'Tiếp tế Vô Tận',[('js',"mode='menu';Lobby.show()"),('w',600),('js',"document.querySelector('[data-lb68=endless]').click()"),('w',1200)]),
 (1,'Bản đồ Chòm Sao · Thường',[('js',"L11309.HS.on=false;Nav74.F.map.go()"),('w',1500)]),
 (1,'Bản đồ Chòm Sao · Anh Hùng',[('js',"L11309.HS.on=true;Nav74.F.map.go()"),('w',1500)]),
 (1,'Thẻ chọn ải',[('js',"L11309.HS.on=false;Nav74.F.map.go()"),('w',1200),('js',"document.querySelector('.cm-node[data-stage=\"159\"]').click()"),('w',1000)]),
 (1,'Càn Quét Nhanh',[('js',"Q10309.qsOpen()"),('w',1000)]),
 (2,'Kho đồ',[('js',"document.querySelector('[data-ck9=kho]').click()"),('w',1200)]),
 (2,'Túi đồ',[('js',"KHO307.bagRes()"),('w',1200)]),
 (2,'Cường hóa · Nâng cấp',[('js',"NC307.open('craft:'+launchCraft,'up')"),('w',1000)]),
 (2,'Cường hóa · Tiến bậc',[('js',"NC307.open('craft:'+launchCraft,'adv')"),('w',1000)]),
 (2,'Cải tạo / Tách đồ (Kho bản sao)',[('js',"Evo82.open()"),('w',1200)]),
 (2,'Trang phục (Skin)',[('js',"L8309.open()"),('w',1200)]),
 (3,'Đá Khảm',[('js',"Nav74.F.stones.go()"),('w',1500)]),
 (3,'Đá Nội Tại',[('js',"NT16.open()"),('w',1000)]),
 (3,'Hợp thể Chiến Thần',[('js',"Nav74.F.sss.go()"),('w',1500)]),
 (3,'Vũ Khí Tối Thượng',[('js',"Ult72.open()"),('w',1200)]),
 (3,'Đội Phi Công',[('js',"Pilot67.open()"),('w',1200)]),
 (3,'Phi Công · Cây tiềm năng / Lõi',[('js',"Pilot67.open()"),('w',900),('ct','TIỀM NĂNG'),('w',900)]),
 (4,'Nhiệm vụ · Ngày',[('js',"mode='menu';Lobby.show()"),('w',500),('js',"document.querySelector('[data-h9b=mis]').click()"),('w',1200)]),
 (4,'Nhiệm vụ · Tuần',[('js',"mode='menu';Lobby.show()"),('w',500),('js',"document.querySelector('[data-h9b=mis]').click()"),('w',900),('js',"document.querySelector('[data-q77=tab][data-t=w]').click()"),('w',900)]),
 (4,'Chiến Lệnh Mùa Giải',[('js',"mode='menu';Lobby.show()"),('w',500),('js',"document.querySelector('[data-h9b=mis]').click()"),('w',900),('js',"document.querySelector('[data-h9=\"1\"]').click()"),('w',1000)]),
 (4,'Điểm danh 7 ngày',[('js',"mode='menu';Lobby.show()"),('w',500),('js',"document.querySelector('[data-h9b=pl]').click()"),('w',1200)]),
 (4,'Điểm danh · Chuỗi ngày 8+',[('ls',['saobang-l14309','{"v":1,"days":9,"last":-1,"mig":1,"ach":{},"achMig":1,"open":{"tb":0,"cc":0,"boss":0}}']),('js',"mode='menu';Lobby.show()"),('w',500),('js',"document.querySelector('[data-h9b=pl]').click()"),('w',1200)]),
 (4,'Thành tựu',[('js',"mode='menu';Lobby.show()"),('w',500),('js',"document.querySelector('[data-h9b=pl]').click()"),('w',900),('ct','THÀNH TỰU'),('w',1000)]),
 (4,'Phúc lợi',[('js',"mode='menu';Lobby.show()"),('w',500),('js',"document.querySelector('[data-h9b=pl]').click()"),('w',1200)]),
 (4,'Quỹ Tiến Trình',[('js',"Q10309.qfOpen()"),('w',1200)]),
 (4,'Quà',[('js',"Nav74.F.gifts.go()"),('w',1200)]),
 (5,'Kho Rương',[('js',"Nav74.F.chest.go()"),('w',1500)]),
 (5,'Vòng Quay May Mắn',[('js',"Nav74.F.wheel.go()"),('w',1200)]),
 (5,'Chợ Đen',[('js',"Nav74.F.market.go()"),('w',1500)]),
 (5,'Cửa hàng',[('js',"mode='menu';Lobby.show()"),('w',500),('js',"document.querySelector('[data-h9b=shop]').click()"),('w',1200)]),
 (5,'Bách Khoa',[('js',"mode='menu';Lobby.show()"),('w',500),('js',"document.querySelector('[data-ck9=codex]').click()"),('w',1200)]),
 (5,'Tiệm Skin',[('js',"Nav74.F.skinshop.go()"),('w',1200)]),
 (5,'Tiệm Danh Dự',[('js',"V77.open()"),('w',1200)]),
 (5,'Tháp Boss',[('js',"Nav74.F.tower.go()"),('w',1500)]),
 (5,'Thử Thách',[('js',"Nav74.F.challenge.go()"),('w',1500)]),
 (5,'Viễn Chinh',[('js',"Nav74.F.expedition.go()"),('w',1500)]),
 (5,'Khe Nứt Hư Không',[('js',"Rift307.open()"),('w',1200)]),
 (6,'Trong trận · đánh thường',[('st',12),('w',1500)]),
 (6,'Trong trận · Boss',[('st',10),('js',"invuln=1e9;setInterval(()=>{try{hp=maxHp;invuln=1e9}catch{}},300)"),('w',3000),('ct','BỎ QUA'),('w',4000),('ct','BỎ QUA'),('w',4000),('ct','BỎ QUA'),('w',5000),('ct','BỎ QUA'),('w',2500)]),
 (6,'Tạm dừng',[('st',12),('w',800),('js',"document.getElementById('pause').click()"),('w',900)]),
 (6,'Chiến Thắng',[('st',12),('w',800),('js',"finishStage36(false)"),('w',2500)]),
 (6,'Hồi sinh',[('st',12),('w',800),('js',"(async()=>{for(let i=0;i<6;i++){invuln=0;try{bulletShieldTime=0}catch{};hp=Math.min(hp,.3);damage('bullet');await new Promise(r=>setTimeout(r,250));}})()"),('w',3000)]),
 (6,'Thất Bại',[('st',12),('w',800),('js',"(async()=>{for(let i=0;i<6;i++){invuln=0;try{bulletShieldTime=0}catch{};hp=Math.min(hp,.3);damage('bullet');await new Promise(r=>setTimeout(r,250));}})()"),('w',3000),('js',"document.getElementById('revive-end393').click()"),('w',2500)]),
 (6,'Cài đặt',[('js',"mode='menu';Lobby.show()"),('w',500),('js',"document.querySelector('[data-ck9=gear]').click()"),('w',1200)]),
 (2,'Kho bản sao (tách bản sao)',[('js',"Evo82.open()"),('w',900),('ct','KHO BẢN SAO'),('w',1200)]),
 (2,'Túi đồ · Trang bị (Bán / Phân giải)',[('js',"document.querySelector('[data-ck9=kho]').click()"),('w',1000),('w',800),('mc',(55,808)),('w',1500)]),
 (2,'Cải tạo',[('js',"document.querySelector('[data-ck9=kho]').click()"),('w',1000),('w',800),('mc',(316,808)),('w',1500)]),
]
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs=setup2(br,'SS')
  res=[]
  for i,(bo,name,steps) in enumerate(SC):
    if FILT and not any(x in name for x in FILT.split(',')):continue
    pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(4500);pg.evaluate(PREP);e0=len(errs);log=[]
    for s in steps:
      try:
        if s[0]=='js':pg.evaluate("()=>{"+s[1]+"}")
        elif s[0]=='ct':log.append(pg.evaluate("t=>__clickText(t)",s[1]))
        elif s[0]=='w':pg.wait_for_timeout(s[1])
        elif s[0]=='mc':pg.mouse.click(*s[1])
        elif s[0]=='ls':pg.evaluate("a=>localStorage.setItem(a[0],a[1])",s[1]);pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(4500);pg.evaluate(PREP)
        elif s[0]=='st':start(pg,s[1]);pg.evaluate("()=>{const q=document.getElementById('q307');if(q)q.style.display='none'}")
      except Exception as ex:log.append('LỖI '+str(ex).split('\n')[0][:120])
    fn='%d_%02d.png'%(bo,i);pg.screenshot(path=OUT+'/'+fn)
    try:inv=pg.evaluate(INV)
    except Exception as ex:inv={'err':str(ex)[:200]}
    r={'bo':bo,'name':name,'file':fn,'log':log,'errs':errs[e0:][:3],'inv':inv};res.append(r)
    print(bo,name,log,len(inv.get('icons',[])) if isinstance(inv,dict) else inv,flush=True)
  json.dump(res,open(OUT+('/inv_%s.json'%FILT if FILT else '/inv.json'),'w'),ensure_ascii=False,indent=1)
