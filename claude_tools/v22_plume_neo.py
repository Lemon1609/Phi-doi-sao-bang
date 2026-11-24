# V2.2 · đo THRUSTER_ANCHORS: đường đáy thân thật (bỏ gai mảnh bằng phép mở hình thái) → 1–4 họng xả đối xứng.
# Đơn vị: x,y chia cạnh dài ảnh, gốc = tâm ảnh (khớp cách tb309 / l3309 / SSSGame vẽ); y là mép đáy họng (chưa thụt — thụt 3–5 px tính lúc vẽ).
# Ra: src/plume22_anchors.json + ảnh kiểm /home/claude/pl22/neo_*.jpg
import os,sys,json,glob,re,numpy as np
from PIL import Image,ImageDraw
from scipy import ndimage as nd
OUT='src/plume22_anchors.json';DBG=os.environ.get('DBG','/home/claude/pl22')
def mask(p):
  im=Image.open(p).convert('RGBA');A=np.asarray(im)[...,3]>110;return im,A
def nozzles(A,maxn=4,frac=.045,spread=.30):
  H,W=A.shape;S=max(H,W);ys,xs=np.where(A)
  if not len(xs):return []
  x0,x1,y0,y1=xs.min(),xs.max(),ys.min(),ys.max();bw=x1-x0;bh=y1-y0
  r=max(2,int(bw*frac));O=nd.binary_opening(A,structure=np.ones((r,r)))
  lab,n=nd.label(O)
  if n>1:
    sz=nd.sum(O,lab,range(1,n+1));O=lab==(1+int(np.argmax(sz)))
  cx=(x0+x1)/2
  # đường đáy trong dải giữa ±spread·bề ngang
  L=int(cx-bw*spread);R=int(cx+bw*spread)+1
  b=np.full(W,-1.0)
  for x in range(max(0,L),min(W,R)):
    c=np.where(O[:,x])[0]
    if len(c):b[x]=c.max()
  # đối xứng hoá: lấy min của cột và cột gương
  bs=b.copy()
  for x in range(W):
    m=int(round(2*cx-x))
    if 0<=m<W and b[x]>=0 and b[m]>=0:bs[x]=min(b[x],b[m])
    elif b[x]>=0:bs[x]=-1
  v=bs.copy();v[v<0]=np.nan
  sm=nd.uniform_filter1d(np.nan_to_num(v,nan=0),max(3,int(bw*.02)))
  sm[np.isnan(v)]=-1
  top=np.nanmax(v);thr=top-bh*.06
  cand=[]
  for x in range(1,W-1):
    if sm[x]<thr or sm[x]<0:continue
    if sm[x]>=sm[x-1] and sm[x]>=sm[x+1]:cand.append(x)
  # gom cụm liền nhau
  grp=[];
  for x in cand:
    if grp and x-grp[-1][-1]<=max(3,bw*.03):grp[-1].append(x)
    else:grp.append([x])
  pts=[(float(np.mean(g)),float(np.max(sm[g]))) for g in grp]
  # tách về nửa phải (|dx|), giữ điểm giữa
  ctr=[p for p in pts if abs(p[0]-cx)<bw*.04];side=sorted([p for p in pts if p[0]-cx>=bw*.04],key=lambda p:-p[1])
  out=[]
  if ctr:out.append((cx,max(p[1] for p in ctr)))
  for p in side:
    if len(out)+2>maxn:break
    if any(abs(p[0]-q[0])<bw*.07 for q in out):continue
    out+= [(p[0],p[1]),(2*cx-p[0],p[1])]
  if not out:out=[(cx,top)]
  # bề rộng mỗi họng: đoạn đáy nằm trong 3 % chiều cao quanh đỉnh họng
  res=[]
  for x,y in out:
    xi=int(round(x));lw=0;rw=0
    while xi-lw-1>=0 and sm[xi-lw-1]>=y-bh*.03:lw+=1
    while xi+rw+1<W and sm[xi+rw+1]>=y-bh*.03:rw+=1
    wd=max(lw+rw+1,bw*.05)
    res.append([round((x-W/2)/S,4),round((y-H/2)/S,4),round(min(1.6,max(.5,wd/(bw*.16))),2)])
  res.sort(key=lambda p:p[0]);return res
HUE=[('crimson',(0,25)),('gold',(25,75)),('gold',(75,150)),('cyan',(150,250)),('void',(250,335)),('crimson',(335,361))]
def hue_el(im):
  a=np.asarray(im.convert('RGBA')).astype(float);A=a[...,3]>200;rgb=a[...,:3][A]/255
  mx=rgb.max(1);mn=rgb.min(1);s=(mx-mn)/np.maximum(mx,1e-3);k=s>.35
  import colorsys
  if k.sum()<50:return 'cyan'
  h=np.array([colorsys.rgb_to_hsv(*c)[0]*360 for c in rgb[k][::max(1,k.sum()//4000)]])
  hist=np.bincount((h//15).astype(int),minlength=25);hd=hist.argmax()*15+7
  for n,(a0,a1) in HUE:
    if a0<=hd<a1:return n
  return 'cyan'
# nguyên tố theo hệ (luật chủ dự án): băng/điện/ray → cyan; mặt trời/cổ điển/vàng → gold; lửa/phượng → crimson; hư không/thời không/thiên giới/tím → void
SHIP_EL={1:'crimson',2:'cyan',3:'cyan',4:'gold',5:'gold',6:'void',7:'crimson',8:'gold',9:'cyan',10:'cyan',11:'void',12:'void',13:'void'}
POD_EL={'rail':'cyan','prism':'cyan','ricochet':'cyan','lance36':'cyan','solar':'gold','halo36':'gold','carrier9':'gold','disc':'gold','gravity':'void','devour10_s':'void','chrono11_s':'void','monarch12_s':'void','orbit36':'void'}
def pod_el(k):
  for n,e in POD_EL.items():
    if n in k:return e
  for w,e in (('inferno','crimson'),('solar','gold'),('halo','gold'),('rail','cyan'),('lance','cyan'),('ice','cyan'),('cryo','cyan'),('devour','void'),('chrono','void'),('monarch','void'),('gravity','void'),('orbit','void')):
    if w in k:return e
  return 'cyan'
CT_EL=['void','void','gold','void','cyan','crimson','gold']
T={'ship':{},'pod':{},'ctf':{},'ctr':{},'el':{'ship':{},'pod':{},'ct':CT_EL}}
dbg=[]
# chỉnh tay (đo bằng mắt trên ảnh Tím, co theo bề ngang thân từng bậc): tàu 8 có 2 họng xả vàng rõ giữa thân
OVR={8:[[-.082,.322,.85],[.082,.322,.85]]}
def bw(p):
  A=np.asarray(Image.open(p).convert('RGBA'))[...,3]>110;xs=np.where(A.any(0))[0];ys=np.where(A.any(1))[0];return xs.max()-xs.min(),(ys.min()+ys.max())/2
for p in sorted(glob.glob('src/ship309/tau*_*.png')):
  m=re.match(r'tau(\d+)_(\w+?)(_bt)?\.png',os.path.basename(p));n,f,bt=int(m[1]),m[2],m[3]
  im,A=mask(p);noz=nozzles(A,4)
  if n in OVR:
    k=bw(p)[0]/bw(f'src/ship309/tau{n}_tim.png')[0];noz=[[round(x*k,4),round(y*k,4),w] for x,y,w in OVR[n]]
  T['ship'].setdefault(str(n-1),{})[f+('_bt' if bt else '')]=noz;T['el']['ship'][str(n-1)]=SHIP_EL[n]
  if f=='tim' and not bt:dbg.append(('S%d'%n,im,noz))
for p in sorted(glob.glob('src/evo21img/wg_*_[0-3].webp')+glob.glob('src/evo21img/sw_*_[0-2].webp')):
  k=os.path.basename(p)[:-5];im,A=mask(p);noz=nozzles(A,2,.06,.32);T['pod'][k]=noz;T['el']['pod'][k]=pod_el(k)
  if k.endswith('_2') or k.endswith('_3') and k.startswith('wg'):dbg.append((k[3:15],im,noz))
for p in sorted(glob.glob('src/evo21img/ct[1-7]_[fr][1-3].webp')):
  m=re.match(r'ct(\d)_([fr])(\d)',os.path.basename(p));i,kd,mm=int(m[1])-1,m[2],int(m[3])
  im,A=mask(p);noz=nozzles(A,4 if kd=='f' else 4,.05,.38 if kd=='r' else .30)
  T['ct'+kd].setdefault(str(i),{})[str(mm)]=noz;dbg.append(('CT%d%s%d'%(i+1,kd,mm),im,noz))
json.dump(T,open(OUT,'w'),separators=(',',':'))
# ảnh kiểm
os.makedirs(DBG,exist_ok=True);C=8;S=170
for part in range(0,len(dbg),40):
  ch=dbg[part:part+40];sh=Image.new('RGB',(C*S,((len(ch)+C-1)//C)*(S+14)),(14,16,26));d=ImageDraw.Draw(sh)
  for j,(nm,im,noz) in enumerate(ch):
    W0,H0=im.size;Sd=max(W0,H0);k=S/Sd;bg=Image.new('RGBA',(S,S),(14,16,26,255));t=im.resize((int(W0*k),int(H0*k)));bg.alpha_composite(t,((S-t.width)//2,(S-t.height)//2))
    ox,oy=(j%C)*S,(j//C)*(S+14);sh.paste(bg.convert('RGB'),(ox,oy));d.text((ox+3,oy+S),nm,fill=(200,220,255))
    for x,y,ws in noz:
      px,py=ox+S/2+x*S,oy+S/2+y*S;r=5*ws;d.ellipse((px-r,py-2,px+r,py+2),outline=(0,255,120));d.line((px,py,px,py+18),fill=(255,80,200),width=2)
  sh.save(f'{DBG}/neo_{part//40}.jpg',quality=85)
print({k:len(v) for k,v in T.items()})
from collections import Counter
print('ship nozzles',{k:len(v['tim']) for k,v in T['ship'].items()})
