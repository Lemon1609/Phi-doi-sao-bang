# V2.2.3 Gói C (T26): nền địa hình parallax — chương → nền, tốc độ thường / Bạo Tẩu / Xung Kích S, Vô tận đổi nền mỗi boss,
#  mây α ≤ .28, nối mép trên–dưới, không canvas / shadowBlur / filter mới, tắt được (PKC26=false). python3 tests/t_pkc26.py <html>
import sys,os,json
import numpy as np
from PIL import Image
src=open('claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
HTML=sys.argv[1];sys.argv=['x',HTML,'160'];exec(src)
t209=open('tests/v203_v212/t209.py').read();exec(t209[t209.find('def start'):t209.find('with sync_playwright')])
R=[]
def ck(n,ok,d=None):R.append(ok);print(('ĐẠT ' if ok else 'TRƯỢT ')+n,'' if d is None else json.dumps(d,ensure_ascii=False)[:400])
# nối mép: chênh hàng cuối ↔ hàng đầu không lớn hơn chênh trung bình giữa 2 hàng liền kề ×2,5
def _seam():
 D='src/pkc26img';sz={}
 for f in sorted(os.listdir(D)):
   sz[f]=os.path.getsize(os.path.join(D,f));a=np.asarray(Image.open(os.path.join(D,f)).convert('RGBA')).astype(float)
   if 'clouds' in f:a=a[:,:,3:]
   else:a=a[:,:,:3]
   adj=np.abs(np.diff(a,axis=0)).mean();seam=np.abs(a[-1]-a[0]).mean();sz[f+'_seam']=round(seam/max(adj,1e-6),2)
 return sz
sz=_seam()
ck('Nối mép trên–dưới (chênh mép ≤ 2,5× chênh hàng liền kề)',all(v<=2.5 for k,v in sz.items() if k.endswith('_seam')),sz)
ck('Dung lượng: nền ≤ 140 KB, mây ≤ 80 KB',all(v<=(80 if 'clouds' in k else 140)*1024 for k,v in sz.items() if not k.endswith('_seam')))
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'SS')
  start(pg,12);pg.evaluate("()=>{clearInterval(window.__hz);window.__h0=setInterval(()=>{hp=maxHp;invuln=9;for(const e of enemies)e.hp=Math.max(e.hp,1e7)},40)}");pg.wait_for_timeout(1500)
  m=pg.evaluate("""()=>new Promise(res=>{const o={};const lv0=level;const ch=[];for(let l=1;l<=200;l++){const c=Campaign36.chapter(l)+1;if(!ch[c])ch[c]=l;}
    const want={1:'valley',2:'orbit',3:'skycity'};let i=0;const ks=[1,2,3];const nx=()=>{if(i>=ks.length){level=lv0;return res(o)}const c=ks[i++];level=ch[c];setTimeout(()=>{o[c]=[PKC26S.state().cur,want[c]];nx()},1600)};nx()})""")
  ck('Chiến dịch: chương 1 Thung Lũng · 2 Quỹ Đạo · 3 Thành Phố Mây (hòa 1,2 s khi đổi)',all(v[0]==v[1] for v in m.values()),m)
  d=pg.evaluate("""()=>new Promise(res=>{const o={};const s=()=>PKC26S.state();o.n0=s().k;const y0=s().y,t0=stageTime;
    setTimeout(()=>{o.v=(s().y-y0)/Math.max(.01,stageTime-t0);o.dt=stageTime-t0;superTime=8;setTimeout(()=>{o.bt=s().k;superTime=0;PKB25S.apply('s',player.x,player.y);setTimeout(()=>{o.s=s().k;PKB25S.R.sEnd=0;window.__surgeS25=0;res(o)},1300)},1300)},1000)})""")
  ck('Tốc độ: thường 75 px/s theo đồng hồ trận (k 1), Bạo Tẩu ×1,85, Xung Kích S ×3,2 (đổi mượt)',abs(d['n0']-1)<.05 and 50<d['v']<100 and abs(d['bt']-1.85)<.12 and abs(d['s']-3.2)<.2,d)
  d=pg.evaluate("""()=>{const c=PKC26S;const im=[...document.images];let a=[];const P=CanvasRenderingContext2D.prototype,od=P.drawImage;P.drawImage=function(i){if(i&&i.src&&i.src===(window.PKC26_IMG||{}).bg_clouds)a.push(this.globalAlpha);return od.apply(this,arguments)};
    try{PKC26.draw(.016,false);PKB25S.apply('s',player.x,player.y);for(let k=0;k<30;k++)PKC26.draw(.016,false);superTime=8;for(let k=0;k<30;k++)PKC26.draw(.016,false);}finally{P.drawImage=od;superTime=0;PKB25S.R.sEnd=0;window.__surgeS25=0}return {n:a.length,max:Math.max(...a)}}""")
  ck('Mây: α tối đa ≤ 0,28 kể cả Bạo Tẩu / S',d['n']>0 and d['max']<=.2801,d)
  d=pg.evaluate("""()=>new Promise(res=>{window.__gm=gameMode;gameMode='endless';const b0=boss;boss=null;setTimeout(()=>{const a=PKC26S.state();boss={x:240,y:-999,hp:1e9,max:1e9,coreHp:1e9,w:1,h:1};
    setTimeout(()=>{const b=PKC26S.state();setTimeout(()=>{const c=PKC26S.state();boss=b0;gameMode=window.__gm;res({a,b,c})},1400)},300)},400)})""")
  ck('Vô tận: boss xuất hiện → chuyển nền kế (hòa 1,2 s)',d['b']['eIdx']==d['a']['eIdx']+1 and d['b']['fade']>0 and d['c']['fade']==0 and d['c']['cur']!=d['a']['cur'],d)
  pg.evaluate('()=>{superTime=6}');pg.wait_for_timeout(7000)  # khởi động Bạo Tẩu 1 lần: bộ đệm quầng sáng core-v407 tạo canvas lần đầu cho mỗi màu (có từ trước Gói C)
  pg.wait_for_timeout(1200)  # bước trước đổi gameMode tạm → nền sao cũ dựng lại 1 lần (bakeFar, có từ trước Gói C); đo sau đó
  d=pg.evaluate("""()=>new Promise(res=>{const P=CanvasRenderingContext2D.prototype,od=Object.getOwnPropertyDescriptor(P,'shadowBlur'),of=Object.getOwnPropertyDescriptor(P,'filter'),oc=document.createElement;let sb=0,fl=0,cv=0;
      Object.defineProperty(P,'shadowBlur',{configurable:true,get(){return od.get.call(this)},set(v){if(v>0)sb++;od.set.call(this,v)}});Object.defineProperty(P,'filter',{configurable:true,get(){return of.get.call(this)},set(v){if(v&&v!=='none')fl++;of.set.call(this,v)}});
      document.createElement=function(t){if(String(t).toLowerCase()==='canvas'){cv++;(window.__cvs26=window.__cvs26||[]).push((new Error().stack||'').split('\\n').slice(2,4).join('|').slice(0,160))}return oc.apply(this,arguments)};const n0=PKC26S.state().n;
      superTime=6;setTimeout(()=>{superTime=0;Object.defineProperty(P,'shadowBlur',od);Object.defineProperty(P,'filter',of);document.createElement=oc;res({sb,fl,cv,frames:PKC26S.state().n-n0,st:[...new Set(window.__cvs26||[])].slice(0,4)})},2500)})""")
  ck('Trong trận có nền: 0 canvas mới, 0 shadowBlur, 0 filter',d['frames']>10 and d['sb']==0 and d['fl']==0 and d['cv']==0,d)
  d=pg.evaluate("()=>{window.PKC26=false;const a=PKC26S.state().on,f=!!NEN194.far(level);window.PKC26=undefined;return {on:a,far:f,on2:PKC26S.state().on}}")
  ck('Tắt PKC26=false: về nền chương cũ',d['on'] is False and d['far'] and d['on2'],d)
  ck('Không lỗi JS',not errs,errs[:3])
  br.close()
print('KẾT QUẢ %d/%d'%(sum(R),len(R)))
