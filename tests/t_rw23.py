# canvas: chỉ tính canvas do rw23 tạo (mote); canvas khác (bộ đệm dựng 1 lần của mô-đun cũ) chỉ liệt kê trong cvs
# V2.2.3 RW23: cánh riêng 7 Chiến Thần — mỗi mẫu vẽ cánh, 0 shadowBlur/filter/canvas mới khi dạng robot, hạt ≤ 24, tàu con ngoài đầu mút cánh, không lỗi
import sys,os,json
src=open('claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
HTML=sys.argv[1];sys.argv=['x',HTML,'160'];exec(src)
t209=open('tests/v203_v212/t209.py').read();exec(t209[t209.find('def start'):t209.find('with sync_playwright')])
PP=[[5,8],[10,11],[7,9],[12,12],[2,6],[0,3],[1,4]]
R=[]
def ck(n,ok,d=None):R.append(ok);print(('ĐẠT ' if ok else 'TRƯỢT ')+n,'' if d is None else json.dumps(d,ensure_ascii=False))
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'SS')
  for i in [int(x) for x in os.environ.get('ROB','0,1,2,3,4,5,6').split(',')]:
    pg.add_init_script("""(()=>{const i=%d;const PP=%s;localStorage.setItem('saobang-robots-v1',JSON.stringify({unlocked:[],selected:'sss:'+i,supers:[0,1,2,3,4,5,6].map(k=>({key:'sss:'+k,model:k,a:PP[k][0],b:PP[k][1],form:0})),fusionVersion:2}));localStorage.setItem('saobang-hop4309-v1','1');})()"""%(i,json.dumps(PP)))
    pg.reload();pg.wait_for_timeout(8000)
    start(pg,14);pg.evaluate("()=>{clearInterval(window.__hz);window.__nb=setInterval(()=>{bullets.length=0;for(const e of enemies)e.dead=true;hp=maxHp;player.y=600;player.x=240},30)}");pg.wait_for_timeout(1000)
    pg.evaluate("()=>{try{activateSuper();superTime=12}catch(e){}}");pg.wait_for_timeout(600)
    d=pg.evaluate("""()=>new Promise(res=>{const P=CanvasRenderingContext2D.prototype,od=Object.getOwnPropertyDescriptor(P,'shadowBlur'),of=Object.getOwnPropertyDescriptor(P,'filter'),oc=document.createElement;let sb=0,fl=0,cv=0;
      Object.defineProperty(P,'shadowBlur',{configurable:true,get(){return od.get.call(this)},set(v){if(v>0)sb++;od.set.call(this,v)}});Object.defineProperty(P,'filter',{configurable:true,get(){return of.get.call(this)},set(v){if(v&&v!=='none')fl++;of.set.call(this,v)}});
      window.__cvs=[];document.createElement=function(t){if(String(t).toLowerCase()==='canvas'){cv++;__cvs.push((new Error().stack||'').split('\\n').slice(2,4).join('|').replace(/file:[^)]*nopop:/g,'').slice(0,160))}return oc.apply(this,arguments)};const f0=RW23S.stat.f;let mx=0;const iv=setInterval(()=>{mx=Math.max(mx,RW23S.motes())},50);
      setTimeout(()=>{clearInterval(iv);Object.defineProperty(P,'shadowBlur',od);Object.defineProperty(P,'filter',of);document.createElement=oc;let pods=null;try{pods=Battle28.support().map(q=>Math.round(Math.abs(q.x-player.x)))}catch(e){}
        const c=RW23S.CFG[RW23S.S.i];res({i:RW23S.S.i,fr:RW23S.stat.f-f0,sb,fl,cv,mx,pods,half:Math.round(RW23S.S.ext),cvs:window.__cvs})},1500)})""")
    ok=d['i']==i and d['fr']>20 and d['sb']==0 and d['fl']==0 and len([s for s in d['cvs'] if ' mote ' in s or 'rw23' in s])==0 and d['mx']<=24 and d['pods'] and min(d['pods'])>=min(d['half']+14,205)
    ck('CT%d cánh riêng: vẽ mỗi khung, 0 shadowBlur/filter/canvas, hạt ≤ 24, tàu con ngoài cánh'%(i+1),ok,d)
  ck('Không lỗi trang',len(errs)==0,errs[:3])
  br.close()
print('KẾT QUẢ %d/%d'%(sum(R),len(R)))
