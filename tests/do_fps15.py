# V309 L15 · ĐO HIỆU NĂNG: CPU hãm CPU=4 lần (giả máy yếu), ải ST (mặc định 160, boss), bất tử, Bạo Tẩu liên tục, GIAY giây.
#  In: FPS trung bình, ms/khung, khung chậm, ms game (Opt15) + top hàm tự tốn CPU (Profiler).  OPT=0 → window.OPT15=false
import sys,os,json
os.chdir(os.path.dirname(os.path.abspath(__file__))+'/..')
src=open('claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
HTML=sys.argv[1];sys.argv=['x',HTML,'160'];exec(src)
t209=open('tests/v203_v212/t209.py').read();exec(t209[t209.find('def start'):t209.find('with sync_playwright')])
CPU=float(os.environ.get('CPU','4'));ST=int(os.environ.get('ST','160'));G=float(os.environ.get('GIAY','12'));PROF=os.environ.get('PROF','1')=='1'
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'SS')
  if os.environ.get('OPT')=='0':pg.evaluate("()=>{window.OPT15=false}")
  pg.add_style_tag(content='#q307{display:none!important}')
  start(pg,ST);pg.evaluate("()=>{window.PERF_HUD=true;invuln=1e9;setInterval(()=>{try{hp=maxHp;if(superTime<1)activateSuper();}catch(e){}},500);try{startBoss()}catch(e){}}")
  pg.wait_for_timeout(5000)
  cdp=pg.context.new_cdp_session(pg);cdp.send('Emulation.setCPUThrottlingRate',{'rate':CPU})
  if PROF:cdp.send('Profiler.enable');cdp.send('Profiler.setSamplingInterval',{'interval':500});cdp.send('Profiler.start')
  r=pg.evaluate("""async(G)=>{const fr=[];let last=0,run=true;const f=t=>{if(last)fr.push(t-last);last=t;if(run)requestAnimationFrame(f)};requestAnimationFrame(f);
    const cs=[];const iv=setInterval(()=>{try{cs.push(Opt15.counts())}catch(e){}},1000);await new Promise(r=>setTimeout(r,G*1000));run=false;clearInterval(iv);
    fr.sort((a,b)=>a-b);const avg=fr.reduce((a,b)=>a+b,0)/fr.length;const st=Opt15.stat();
    const mean=k=>Math.round(cs.reduce((a,c)=>a+c[k],0)/Math.max(1,cs.length));
    return {fps:+(1000/avg).toFixed(1),ms:+avg.toFixed(1),p95:+fr[Math.floor(fr.length*.95)].toFixed(1),p99:+fr[Math.floor(fr.length*.99)].toFixed(1),slow33:fr.filter(x=>x>33.4).length,n:fr.length,game:+st.wk.toFixed(1),ps:mean('ps'),eb:mean('eb'),en:mean('en'),fx:mean('fx'),mode}}""",G)
  print(json.dumps(r,ensure_ascii=False),flush=True)
  if PROF:
    prof=cdp.send('Profiler.stop')['profile'];nodes={n['id']:n for n in prof['nodes']};self={}
    import collections;cnt=collections.Counter(prof['samples']);tot=sum(cnt.values())
    agg=collections.Counter()
    for nid,c in cnt.items():
        n=nodes[nid];cf=n['callFrame'];k=(cf['functionName'] or '(anon)')+' @'+str(cf['lineNumber'])+':'+str(cf['columnNumber'])
        agg[k]+=c
    for k,c in agg.most_common(int(os.environ.get('TOP','25'))):print(f'{c/tot*100:5.1f}%',k)
  print('ERR',errs[:3])
