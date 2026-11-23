# V309 L15 · ĐẾM VIỆC VẼ MỖI KHUNG (không phụ thuộc máy đo): số drawImage / fill / stroke / text, đổi globalCompositeOperation, save,
#  tổng diện tích tô (đơn vị: số lần phủ kín màn hình), các lệnh drawImage phủ ≥ 40 % màn hình (nguồn gọi). ST=ải, BT=1 bật Bạo Tẩu.
import sys,os,json
os.chdir(os.path.dirname(os.path.abspath(__file__))+'/..')
src=open('claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
HTML=sys.argv[1];sys.argv=['x',HTML,'160'];exec(src)
t209=open('tests/v203_v212/t209.py').read();exec(t209[t209.find('def start'):t209.find('with sync_playwright')])
ST=int(os.environ.get('ST','160'))
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'SS')
  if os.environ.get('OPT')=='0':pg.evaluate("()=>{window.OPT15=false}")
  pg.add_style_tag(content='#q307{display:none!important}')
  start(pg,ST);pg.evaluate("()=>{invuln=1e9;setInterval(()=>{try{hp=maxHp;if(%s&&superTime<1)activateSuper();}catch(e){}},400);try{startBoss()}catch(e){}}"%('true' if os.environ.get('BT','1')=='1' else 'false'))
  pg.wait_for_timeout(7000)
  r=pg.evaluate("""()=>new Promise(res=>{const g=ctx,P=CanvasRenderingContext2D.prototype;const N={di:0,fill:0,stroke:0,text:0,gco:0,save:0,area:0,frames:0,rect:0};const big={},AR={};const W=g.canvas.width*g.canvas.height;
   const wrap=(o,k,f)=>{const of=o[k];o[k]=function(...a){f(a,this);return of.apply(this,a)};return ()=>{o[k]=of}};
   const un=[];const onMain=t=>t===g;
   const areaOf=(a,t)=>{const m=t.getTransform();let w,h;if(a.length>=9){w=a[7];h=a[8]}else if(a.length>=5){w=a[3];h=a[4]}else{w=a[0].width||a[0].videoWidth||0;h=a[0].height||0}return Math.abs(w*h*m.a*m.d)};
   un.push(wrap(P,'drawImage',(a,t)=>{if(!onMain(t))return;N.di++;const ar=areaOf(a,t)*(t.globalAlpha>0?1:0);N.area+=ar;{const s0=(new Error().stack.split(String.fromCharCode(10))[3]||'').trim().replace(/\\(.*:(\\d+):(\\d+)\\)/,'@$1:$2').slice(0,70);AR[s0]=(AR[s0]||0)+ar;}if(ar>=.4*W){const s=(new Error().stack.split(String.fromCharCode(10))[3]||'').trim().replace(/\\(.*:(\\d+):(\\d+)\\)/,'@$1:$2').slice(0,70);big[s]=(big[s]||0)+1}}));
   for(const k of ['fill','fillRect']) un.push(wrap(P,k,(a,t)=>{if(onMain(t)){N.fill++;if(k==='fillRect'){const m=t.getTransform();const ar=Math.abs(a[2]*a[3]*m.a*m.d);N.area+=ar;N.rect++;const s0='RECT '+(new Error().stack.split(String.fromCharCode(10))[3]||'').trim().replace(/\\(.*:(\\d+):(\\d+)\\)/,'@$1:$2').slice(0,64);AR[s0]=(AR[s0]||0)+ar;}}}));
   un.push(wrap(P,'stroke',(a,t)=>{if(onMain(t))N.stroke++}));
   for(const k of ['fillText','strokeText']) un.push(wrap(P,k,(a,t)=>{if(onMain(t))N.text++}));
   un.push(wrap(P,'save',(a,t)=>{if(onMain(t))N.save++}));
   const d=Object.getOwnPropertyDescriptor(g,'globalCompositeOperation')||Object.getOwnPropertyDescriptor(P,'globalCompositeOperation');
   let lastG=g.globalCompositeOperation;const tick=()=>{N.frames++};
   const iv=setInterval(()=>{const v=g.globalCompositeOperation;},5);
   // đếm đổi gco qua setter của prototype
   const pd=Object.getOwnPropertyDescriptor(P,'globalCompositeOperation');Object.defineProperty(P,'globalCompositeOperation',{configurable:true,get(){return pd.get.call(this)},set(v){if(this===g&&v!==pd.get.call(this))N.gco++;pd.set.call(this,v)}});
   let f=0;const st=()=>{N.frames++;if(++f<120)requestAnimationFrame(st);else{un.forEach(u=>u());Object.defineProperty(P,'globalCompositeOperation',pd);clearInterval(iv);
     const F=N.frames;const o={};for(const k in N)if(k!=='frames')o[k]=k==='area'?+(N[k]/F/W).toFixed(2):Math.round(N[k]/F);o.frames=F;o.big=Object.entries(big).sort((a,b)=>b[1]-a[1]).slice(0,12).map(([k,v])=>[k,+(v/F).toFixed(2)]);o.canvas=[g.canvas.width,g.canvas.height];o.ar=Object.entries(AR).sort((a,b)=>b[1]-a[1]).slice(0,18).map(([k,v])=>[k,+(v/F/W).toFixed(2)]);res(o)}};requestAnimationFrame(st)})""")
  print(json.dumps(r,ensure_ascii=False,indent=0));print('ERR',errs[:3])
