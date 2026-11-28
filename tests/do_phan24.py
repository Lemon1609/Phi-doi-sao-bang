# V2.4-A · ĐO TÁCH TỪNG PHẦN VÒNG LẶP TRẬN (NHẸ · DPR 1,00), kịch bản giống video: quái + thiên thạch → cảnh báo Boss + thiên thạch → Boss.
#  Dùng: python3 tests/do_phan24.py <html tuyệt đối> [ra.json]    env: CPU=4 (hãm CPU) · ST=10 (ải) · HUD=1 (bật thanh FPS như máy chủ dự án)
#  In mỗi pha: ms/khung trung bình (rAF), ms JS trong Safety31.frame, chia % theo PHẦN (Profiler, gán theo hàm tổ tiên gần nhất) + top hàm tự tốn.
import sys,os,json,re,collections
from playwright.sync_api import sync_playwright
HTML=sys.argv[1];OUT=sys.argv[2] if len(sys.argv)>2 else None
CPU=float(os.environ.get('CPU','4'));ST=int(os.environ.get('ST','10'));HUD=os.environ.get('HUD','1')=='1'
src=open(HTML,encoding='utf-8').read()
# vị trí dòng → id thẻ script
lines=[0];[lines.append(m.end()) for m in re.finditer('\n',src)]
import bisect
spos=[(m.start(),m.group(1)) for m in re.finditer(r'<script id="([^"]+)"',src)]
sp=[p for p,_ in spos]
def sid_at(line,col):
  off=lines[line]+col if line<len(lines) else 0
  k=bisect.bisect_right(sp,off)-1
  return spos[k][1] if k>=0 else '?'
# PHẦN theo tên hàm tổ tiên (từ trong ra ngoài, gặp đầu tiên thắng) hoặc theo id script
SEC=[
 ('Cảnh báo Boss',lambda f,s:(f=='warning' and s=='fx-v402') or s in('bw306-js','warn307-js')),
 ('DOM/HUD',lambda f,s:s in('hud22-js','fps88-js','opt15-js','hud307b-js','hud307-js','play-v47','hud68','bar306-js','hudbtn-v45-js','x2-306','v102-js')),
 ('Nền',lambda f,s:s in('v194-js','parallax-v399','tran307-js','pkc26-js','v117-js','bg117-art') or 'NEN194' in f),
 ('Thiên thạch/Môi trường',lambda f,s:s in('l7309-js','haz208','v209','v208')),
 ('Địch/Boss',lambda f,s:s in('enemies-v2','foes-v2','boss82-js','boss78-js','b75-js','enemyfx-v404','dq309-js','art86-js','bal86-js') or f in('drawEnemy','drawBoss','drawBeam')),
 ('Tàu/Cánh',lambda f,s:s in('wing309-js','btfx218-js','aura307-js','l3309-js','a10309-js','v118-js','evo21-led-js','rw23-js','superforms-v2','plume22-js','ship83-js','rig23-js') or f in('drawShip','craftSprite')),
 ('Đạn',lambda f,s:s in('dan307-js','dan299-js','co309-js','shots-v2','tb309-js','gear-fx-v3','gearvk304-js','skill81-js','art82-js','tb307-js') or f in('drawShot','projectile')),
 ('VFX/Hạt',lambda f,s:s in('fx16','fx309-js','l5309-js','vfx23-js','vfx23b-js','vfx23c-js','pka24-js','fx18-js','pcap22-js','evo21-js','l6309-js') or 'VisualFX' in f),
]
def classify(stack):
  for fn,s in stack:  # trong → ngoài
    for name,ok in SEC:
      if ok(fn,s):return name
  for fn,s in stack:
    if fn=='update':return 'Update (logic)'
    if fn=='draw':return 'Vẽ khác'
  return 'Khác'
SETUP="localStorage.setItem('saobang-gfx-v66','light');if(!sessionStorage.getItem('s24')){sessionStorage.setItem('s24','1');const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:40},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));}"+("localStorage.setItem('saobang-fps88',JSON.stringify({on:true,log:[]}));" if HUD else "")
_t193=open('/home/claude/phi-doi-sao-bang/claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
_argv=sys.argv;sys.argv=['x',HTML,'40'];exec(_t193);sys.argv=_argv
_t209=open('/home/claude/phi-doi-sao-bang/tests/v203_v212/t209.py').read();exec(_t209[_t209.find('def start'):_t209.find('with sync_playwright')])
with sync_playwright() as p:
  ARGS=['--enable-gpu','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--enable-accelerated-2d-canvas','--enable-gpu-rasterization'] if os.environ.get('GPU','1')=='1' else []
  br=p.chromium.launch(args=ARGS)
  _ctx=br.new_context();_ctx.add_init_script(SETUP)
  class _B:  # setup() gọi br.new_page → dùng context có SETUP
    def new_page(self,**k):
      pg=_ctx.new_page();pg.set_viewport_size(k.get('viewport',{'width':393,'height':852}));return pg
  pg,errs,o=setup(_B(),os.environ.get('GRADE','SS'))
  pg.add_style_tag(content='#q307,#tutorial392{display:none!important}')
  for _k in range(3):
    pg.evaluate("(st)=>{const s=document.getElementById('mission-select');if(s&&![...s.options].some(o=>o.value==String(st))){const o=document.createElement('option');o.value=String(st);o.textContent='Ải '+st;s.appendChild(o);}try{Progress.canStart=()=>true}catch{}}",ST)
    start(pg,ST)
    if pg.evaluate("()=>mode")=='play':break
    print('thử vào lại',flush=True);pg.wait_for_timeout(1500)
  pg.evaluate("()=>{clearInterval(window.__hz);window.__iv24=setInterval(()=>{try{invuln=999;hp=maxHp;const d=document.getElementById('st80');if(d)d.hidden=true;window.__st80=0;}catch{}},200);}")
  pg.wait_for_timeout(3000)
  print('VÀO TRẬN',pg.evaluate("()=>({acc:(()=>{try{const c=document.createElement('canvas');const g=c.getContext('webgl');return g?g.getParameter(g.RENDERER):'no-gl'}catch(e){return 'x'}})(),mode,level,gm:gameMode,q:VisualFX.counts().quality,en:enemies.length})"),flush=True)
  cdp=pg.context.new_cdp_session(pg);cdp.send('Emulation.setCPUThrottlingRate',{'rate':CPU})
  cdp.send('Profiler.enable');cdp.send('Profiler.setSamplingInterval',{'interval':200})
  MEAS="""async(G)=>{const fr=[];let last=0,run=true,w=0,wn=0;const o=Safety31.frame;Safety31.frame=function(){const t0=performance.now();try{return o.apply(this,arguments)}finally{w+=performance.now()-t0;wn++}};
    const f=t=>{if(last)fr.push(t-last);last=t;if(run)requestAnimationFrame(f)};requestAnimationFrame(f);const ne=[],nr=[],nb=[];
    const iv=setInterval(()=>{try{ne.push(enemies.filter(e=>!e.dead).length);nb.push(bullets.length+shots.length);nr.push((L7309.E||{rocks:[]}).rocks?.length||0)}catch(e){}},250);
    await new Promise(r=>setTimeout(r,G*1000));run=false;clearInterval(iv);Safety31.frame=o;fr.sort((a,b)=>a-b);const avg=fr.reduce((a,b)=>a+b,0)/Math.max(1,fr.length);const m=a=>a.length?Math.round(a.reduce((x,y)=>x+y,0)/a.length):0;
    let q='?',dpr=0;try{q=VisualFX.counts().quality}catch{}try{dpr=+(canvas.width/canvas.clientWidth).toFixed(2)}catch{}
    return {fps:+(1000/avg).toFixed(1),ms:+avg.toFixed(1),p95:+(fr[Math.floor(fr.length*.95)]||0).toFixed(1),js:+(w/Math.max(1,wn)).toFixed(2),n:fr.length,quai:m(ne),dan:m(nb),q,dpr,mode,pend:Feedback31.state().pending,boss:!!(window.boss||(typeof boss!=='undefined'&&boss))}}"""
  def phase(name,G,pre):
    pg.evaluate(pre)
    cdp.send('Profiler.startPreciseCoverage',{'callCount':False,'detailed':False}) if False else None;cdp.send('Profiler.start');r=pg.evaluate(MEAS,G);prof=cdp.send('Profiler.stop')['profile']
    nodes={n['id']:n for n in prof['nodes']};par={}
    for n in prof['nodes']:
      for c in n.get('children',[]):par[c]=n['id']
    cnt=collections.Counter(prof['samples']);tot=sum(cnt.values());sec=collections.Counter();selfc=collections.Counter();incl=collections.Counter()
    for nid,c in cnt.items():
      st=[];x=nid
      while x in nodes:
        cf=nodes[x]['callFrame'];st.append((cf['functionName'] or '(anon)',sid_at(cf['lineNumber'],cf['columnNumber']) if cf['url'] else cf['functionName']));x=par.get(x)
      top=st[0][0]
      if top in('(idle)','(program)','(garbage collector)'):sec[top]+=c
      else:sec[classify(st)]+=c
      selfc[st[0][0]+' ['+st[0][1]+']']+=c
      seen=set()
      for fn,s in st:
        k=fn+' ['+s+']'
        if k not in seen:seen.add(k);incl[k]+=c
    lt=collections.Counter()
    for n in prof['nodes']:
      cf=n['callFrame']
      for pt in n.get('positionTicks',[]) or []:lt[(cf['functionName'],pt['line'])]+=pt['ticks']
    r['dong']=[]
    for (fn,ln),c in lt.most_common(18):
      txt=src[lines[ln-1]:lines[ln] if ln<len(lines) else None][:900]
      r['dong'].append((fn,ln,round(c/max(1,tot)*100,1),txt.strip()[:160]))
    busy=tot-sec['(idle)']
    r['phan']={k:round(v/busy*100,1) for k,v in sec.most_common() if k!='(idle)'}
    r['tu_ton']=[(k,round(v/busy*100,1)) for k,v in selfc.most_common(14) if not k.startswith('(idle')]
    r['bao_gom']=[(k,round(v/busy*100,1)) for k,v in incl.most_common(40) if not k.startswith(('(root','(idle','loop','runGameFrameC','(anon) [?','(program'))][:22]
    print('\n=====',name,json.dumps({k:r[k] for k in r if k not in('tu_ton','bao_gom','phan')},ensure_ascii=False),flush=True)
    print(' PHẦN %:',r['phan']);print(' TỰ TỐN:',r['tu_ton']);print(' BAO GỒM:',r['bao_gom'],flush=True)
    for d in r['dong']:print('   DÒNG',d,flush=True)
    return r
  R={}
  R['A_quai_thienthach']=phase('A · quái + thiên thạch (10 s)',10,"()=>{try{L7309.start('rock')}catch(e){}}")
  R['B_canhbao_thienthach']=phase('B · cảnh báo Boss + thiên thạch',3,"()=>{try{L7309.start('rock')}catch(e){};try{startBoss()}catch(e){}}")
  R['C_boss']=phase('C · Boss (6 s)',6,"()=>{}")
  R['err']=errs[:5];print('ERR',errs[:5])
  if OUT:json.dump(R,open(OUT,'w'),ensure_ascii=False,indent=1)
