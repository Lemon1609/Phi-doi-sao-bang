# V2.3 U1 (v23-ui-meta): sân khấu Sảnh / Kho sống + dừng khi có bảng / vào trận · KHÓA TRANG BỊ · bảng màu tươi · không đổi kinh tế
# python3 tests/t_u1_v23.py <html tuyệt đối>
import sys,os,json
src=open('claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
HTML=sys.argv[1];sys.argv=['x',HTML,'160'];exec(src)
t209=open('tests/v203_v212/t209.py').read();exec(t209[t209.find('def start'):t209.find('with sync_playwright')])
R=[]
def ck(n,ok,d=None):R.append(bool(ok));print(('ĐẠT ' if ok else 'TRƯỢT ')+n,'' if d is None else json.dumps(d,ensure_ascii=False)[:420],flush=True)
CNT="""()=>{const P=CanvasRenderingContext2D.prototype,od=Object.getOwnPropertyDescriptor(P,'shadowBlur'),of=Object.getOwnPropertyDescriptor(P,'filter'),oc=document.createElement;window.__k23={sb:0,fl:0,cv:0};
 Object.defineProperty(P,'shadowBlur',{configurable:true,get(){return od.get.call(this)},set(v){if(v>0)__k23.sb++;od.set.call(this,v)}});Object.defineProperty(P,'filter',{configurable:true,get(){return of.get.call(this)},set(v){if(v&&v!=='none')__k23.fl++;of.set.call(this,v)}});
 document.createElement=function(t){if(String(t).toLowerCase()==='canvas')__k23.cv++;return oc.apply(this,arguments)};window.__k23off=()=>{Object.defineProperty(P,'shadowBlur',od);Object.defineProperty(P,'filter',of);document.createElement=oc;return __k23}}"""
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'SS')
  pg.evaluate("()=>{document.querySelectorAll('#q307,#tutorial392').forEach(e=>e.remove());Gfx66.set('light');window.NOBS22=false/* hồ sơ thử có bản sao cũ, nobs22 đổi dần ra hợp kim + Đá XP (có từ trước, không thuộc U1) */}");pg.wait_for_timeout(600)
  econ0=pg.evaluate("()=>({cr:Progress.balance(),gem:(()=>{try{return Econ74.gems()}catch(e){return null}})(),xp:XPDA307.total(),items:Progress.v70.items().length})")
  # 1) Sảnh: sân khấu chạy, đạn ≤ 36, dừng khi mở bảng
  pg.evaluate("()=>{Nav74.tab('home')}");pg.wait_for_timeout(2500)
  pg.evaluate(CNT)
  d=pg.evaluate("""()=>new Promise(r=>{const t0=time,s=[];let k=0;const iv=setInterval(()=>{s.push(shots.length);if(++k>=20){clearInterval(iv);r({dt:time-t0,mx:Math.max(...s),any:s.some(x=>x>0),demo:!!window.HANGAR_DEMO})}},60)})""")
  ck('Sảnh: sân khấu chạy (đồng hồ trận đi, có đạn bắn lên), bể đạn ≤ 36',d['demo'] and d['dt']>.4 and d['any'] and d['mx']<=36,d)
  dpr=pg.evaluate("()=>{const c=document.querySelector('.h1-stage canvas');const r=c.getBoundingClientRect();return {w:c.width,cw:r.width,dpr:c.width/r.width}}")
  ck('Sảnh: canvas sân khấu ở NHẸ đúng DPR 1,00',abs(dpr['dpr']-1)<=.02,dpr)
  k1=pg.evaluate("()=>__k23off()")
  d=pg.evaluate("""()=>{const R=getComputedStyle(document.documentElement);const key=v=>{const m=/base64,([A-Za-z0-9+/]{60})/.exec(v||'');return m?m[1]:null};
    const c=[...document.querySelectorAll('#lob22 .l22row2 > .l22cta')].map(e=>{const r=e.getBoundingClientRect();return {k:key(getComputedStyle(e).backgroundImage),l:Math.round(r.left),r:Math.round(r.right),h:Math.round(r.height),t:e.querySelector('b').innerText}});
    const n=[...document.querySelectorAll('#lob22 .l22row1 > .l22nav')].map(e=>({h:Math.round(e.getBoundingClientRect().height),ic:!!e.querySelector(':scope>i svg'),k:key(getComputedStyle(e).borderImageSource)===key(R.getPropertyValue('--u1pb'))}));
    return {red:c[0]&&c[0].k===key(R.getPropertyValue('--u1hr')),gold:c[1]&&c[1].k===key(R.getPropertyValue('--u1hg')),c,n,W:innerWidth}}""")
  ck('Sảnh U1c: VÔ TẬN tấm cánh đỏ + CHIẾN ĐẤU tấm cánh vàng cạnh nhau, trong khung nhìn, không chồng · 3 lối tắt tấm lam cùng cao, cùng icon SVG',d['red'] and d['gold'] and d['c'][0]['l']>=0 and d['c'][1]['r']<=d['W'] and d['c'][0]['r']<=d['c'][1]['l'] and len(d['n'])==3 and len(set(x['h'] for x in d['n']))==1 and all(x['ic'] and x['k'] for x in d['n']),d)
  pg.evaluate("()=>Gfx66.open()");pg.wait_for_timeout(700)
  d=pg.evaluate("""()=>new Promise(r=>{const t0=time;setTimeout(()=>r({dt:time-t0,m:!!window.__modal42}),1200)})""")
  ck('Sảnh: mở bảng (Cài đặt) → sân khấu dừng',d['m'] and d['dt']<.05,d)
  pg.evaluate("()=>{document.querySelectorAll('.m63').forEach(e=>e.hidden=true);Nav74.tab('home')}");pg.wait_for_timeout(1200)
  # 2) Kho: Stage chạy, ≤ 36, DPR 1 ở NHẸ, dừng khi mở Túi đồ
  pg.evaluate("()=>document.querySelector('[data-ck9=kho]').click()");pg.wait_for_timeout(2500)
  pg.evaluate(CNT)
  d=pg.evaluate("""()=>new Promise(r=>{const K=window.__stg23;if(!K)return r(null);const n0=K.n,s=[];let k=0;const iv=setInterval(()=>{s.push(K.b.length+K.pb.length+K.m.length);if(++k>=20){clearInterval(iv);const c=K.c;r({fr:K.n-n0,mx:Math.max(...s),any:s.some(x=>x>0),dpr:c.width/c.clientWidth})}},60)})""")
  ck('Kho: sân khấu bắn liên tục, đạn ≤ 36, NHẸ DPR 1,00',d and d['fr']>10 and d['any'] and d['mx']<=36 and abs(d['dpr']-1)<=.02,d)
  k2=pg.evaluate("()=>__k23off()")
  pg.evaluate("()=>document.querySelector('.c9bar .bag').click()");pg.wait_for_timeout(900)
  d=pg.evaluate("""()=>new Promise(r=>{const K=window.__stg23,n0=K.n;setTimeout(()=>r({fr:K.n-n0,m:!!window.__modal42}),1000)})""")
  ck('Kho: mở Túi đồ toàn màn → sân khấu dừng',d['fr']<=1,d)
  ck('Sân khấu Sảnh + Kho đang chạy (đo 1,2 s mỗi nơi): 0 shadowBlur · 0 filter · 0 canvas mới mỗi khung',all(k[x]==0 for k in (k1,k2) for x in ('sb','fl','cv')),{'sanh':k1,'kho':k2})
  # 3) bảng màu + Kho cổ điển
  d=pg.evaluate("""()=>{const R=getComputedStyle(document.documentElement);const key=v=>{const m=/base64,([A-Za-z0-9+/]{60})/.exec(v||'');return m?m[1]:null};
    const V={};for(const k of ['hr','hg','pb','pg','pe','ps','hd'])V[k]=R.getPropertyValue('--u1'+k);
    const bi=s=>{const e=document.querySelector(s);return e?key(getComputedStyle(e).borderImageSource):null};
    const kb=Object.fromEntries(Object.entries(V).map(([k,v])=>[k,(atob((/base64,([^)"']+)/.exec(v)||[,''])[1]).length)]));
    const acts=[...document.querySelectorAll('#k307 .k307-acts button')];
    return {img:kb,tot:Object.values(kb).reduce((a,b)=>a+b,0),bag:bi('.c9bar .bag')===key(V.pb),up:bi('.c9bar .up')===key(V.pg),cai:bi('.c9bar .cai')===key(V.pb),ve:bi('.c9bar .u1ve')===key(V.pb),
     q:acts.filter(b=>key(getComputedStyle(b).borderImageSource)===key(V.pe)).length,qm:(acts[2]||{}).innerText,qh:acts.map(b=>Math.round(b.getBoundingClientRect().height)),
     best:bi('#k307 .k9best')===key(V.ps),hdr:bi('#k307 .k307-top')===key(V.hd),row:getComputedStyle(document.querySelector('#k307 .k307-row')).backgroundImage.includes('rgb(29, 84, 176)'),
     barIc:[...document.querySelectorAll('.c9bar > button > i')].filter(i=>getComputedStyle(i).display!=='none').length,
     barH:[...document.querySelectorAll('.c9bar > button')].filter(b=>b.offsetParent).map(b=>Math.round(b.getBoundingClientRect().height)),
     barW:[...document.querySelectorAll('.c9bar > button')].filter(b=>b.offsetParent).map(b=>getComputedStyle(b).fontWeight+'/'+getComputedStyle(b).color),
     st:!!document.querySelector('#hub40 .u1st li'),sc:[...document.querySelectorAll('#hub40 .c9sc button')].filter(b=>getComputedStyle(b).display!=='none').map(b=>b.dataset.c9g),
     scIc:[...document.querySelectorAll('#hub40 .c9sc button')].map(b=>!!b.querySelector(':scope>i.u1ic svg')),
     cb9:Math.round((document.querySelector('#hub40 .cb9')||{getBoundingClientRect:()=>({height:0})}).getBoundingClientRect().height),
     bf:[...document.querySelectorAll('body *')].filter(e=>{const c=getComputedStyle(e);return (c.backdropFilter&&c.backdropFilter!=='none')}).map(e=>(e.id||e.className+'').slice(0,30)).slice(0,5),
     flt:[...document.querySelectorAll('.u1b,.u1s,.l22cta,.c9sc button')].filter(e=>getComputedStyle(e).filter!=='none').length}}""")
  ck('U1c tấm ảnh: 7 tấm ≤ 80 KB · TÚI ĐỒ / CẢI TẠO / VỀ tấm lam, CƯỜNG HÓA tấm vàng (cùng cao, cùng đậm, không icon) · 3 nút tấm lục cùng cao, nhãn PHÂN GIẢI · MẶC TỐT NHẤT tấm thép · thanh TÚI ĐỒ tấm bạc · hàng #1D54B0 · 5 lối tắt cùng icon · CỘNG HƯỞNG 1 dòng mảnh · 0 backdrop-filter / filter',
     d['tot']<=80*1024 and len(d['img'])==7 and all(d['img'].values()) and d['bag'] and d['up'] and d['cai'] and d['ve'] and d['q']==3 and d['qm']=='PHÂN GIẢI' and len(set(d['qh']))==1 and d['best'] and d['hdr'] and d['row'] and d['barIc']==0 and len(set(d['barH']))==1 and len(set(d['barW']))==1
     and d['st'] and d['sc']==['pc23','ult','sss','ssss','stones'] and all(d['scIc']) and 0<d['cb9']<=22 and not d['bf'] and d['flt']==0,d)
  # 4) KHÓA TRANG BỊ
  d=pg.evaluate("""()=>{const eq=Object.values(Progress.v70.equipped());const tgt=Progress.v70.get(Progress.v70.equipped().armor);const same=Progress.v70.items().filter(i=>i.variant===tgt.variant&&!eq.includes(i.id));
    const free=Progress.v70.items().filter(i=>!eq.includes(i.id));const L=free.slice(0,6);for(const i of L)if(!Lock23.has(i.id))Lock23.toggle('g',i.id);for(const i of same)if(!Lock23.has(i.id))Lock23.toggle('g',i.id);
    return {tgt:tgt.id,same:same.map(i=>i.id),L:L.map(i=>i.id)}}""")
  ck('Khóa: ghi vào saobang-lock23-v1',pg.evaluate("(ids)=>{const s=JSON.parse(localStorage.getItem('saobang-lock23-v1'));return ids.every(i=>s.g[i])}",d['L']),len(d['L']))
  r=pg.evaluate("""(D)=>{const out={};const id=D.L[0];const n0=Progress.v70.items().length;
    out.dis=V70.dismantle(id,true);out.rm=Progress.v70.remove(id);out.still=!!Progress.v70.get(id);
    try{const S0=(V70.junk()||[]).map(i=>i.id);out.junk=D.L.filter(i=>S0.includes(i)).length}catch(e){out.junk='x'}
    try{NC307.open(D.tgt);const b=[...document.querySelectorAll('#nc307 button')].find(x=>/TỰ ĐỘNG CHỌN/.test(x.innerText));if(b)b.click();out.nc=NC307._m().filter(i=>D.same.includes(i)).length;out.ncAll=NC307._m().length;NC307.close()}catch(e){out.nc='x '+e}
    try{const p=Evo82.plan('gear',D.tgt);out.evo=p&&p.pick?p.pick.filter(c=>D.same.includes(c.vi)).length:0}catch(e){out.evo='x'}
    try{const it=Progress.v70.get(D.tgt);out.oc=OC17.cands(it).filter(c=>D.same.includes(c.id)).length}catch(e){out.oc='x'}
    try{const hp=D.L.slice(0,5);KHO307.hop.set(0,hp);const m=KHO307.hop.run();out.hop=String(m).slice(0,40);out.hopLeft=hp.filter(i=>Progress.v70.get(i)).length}catch(e){out.hop='x '+e}
    out.n=Progress.v70.items().length-n0;return out}""",d)
  ck('Khóa: không phân giải / xóa / làm vật liệu Cường hóa · Tiến bậc · Ép xung · Hợp thành; số món giữ nguyên',r['dis'] is None and r['rm'] is False and r['still'] and r['junk']==0 and r['nc']==0 and r['evo']==0 and r['oc']==0 and r['hopLeft']==5 and r['n']==0,r)
  econ1=pg.evaluate("()=>({cr:Progress.balance(),gem:(()=>{try{return Econ74.gems()}catch(e){return null}})(),xp:XPDA307.total(),items:Progress.v70.items().length})")
  ck('Kinh tế không đổi sau mọi thao tác Sảnh / Kho / khóa (hợp kim, kim cương, Đá XP, số trang bị)',econ0==econ1,{'truoc':econ0,'sau':econ1})
  pg.reload();pg.wait_for_timeout(9000)
  st=pg.evaluate("(ids)=>ids.every(i=>Lock23.has(i))",d['L'])
  ck('Khóa: giữ sau khi tải lại trang',st)
  pg.evaluate("(ids)=>{for(const i of ids)if(Lock23.has(i))Lock23.toggle('g',i)}",d['L']+d['same']);
  # 5) vào trận: cờ dừng sân khấu
  start(pg,12);pg.wait_for_timeout(1200)
  ck('Vào trận: sân khấu dừng (__u1pause)',pg.evaluate("()=>!!window.__u1pause&&mode==='play'"))
  ck('Không lỗi JS',not errs,errs[:3])
  br.close()
print('KẾT QUẢ %d/%d'%(sum(R),len(R)))
