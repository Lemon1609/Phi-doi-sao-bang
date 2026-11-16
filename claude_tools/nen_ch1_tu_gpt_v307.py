from PIL import Image,ImageFilter
import numpy as np
d='/mnt/user-data/attachments/2d5151e6-d720-54f8-929b-1a507e555bce/'
W,H=720,1560;TW=818
def load(f):
    a=Image.open(d+f+'-image.png').convert('RGB');w,h=a.size
    base=round(H*w/h);sx=TW/base
    a=a.resize((TW,H),Image.LANCZOS);x=(TW-W)//2
    return np.asarray(a.crop((x,0,x+W,H))).astype(float)/255
xa,gi,ga=load('dfcaf0a5'),load('8824a06e'),load('6eddd60e')
rng=np.random.default_rng(7)
def fbm():
    t=np.zeros((H,W))
    for s,wt in [(160,1),(70,.6),(28,.35)]:
        n=rng.random((H//s+2,W//s+2));im=Image.fromarray((n*255).astype('uint8')).resize((W,H),Image.BICUBIC)
        t+=wt*np.asarray(im).astype(float)/255
    t/=1.95;return (t-t.mean())/t.std()
yy,xx=np.mgrid[0:H,0:W];r=np.hypot((xx-W/2)/(W*.62),(yy-H*.5)/(H*.6));glow=np.clip(1-r,0,1)**1.6
tint=np.array([0.03,0.14,0.19])
tex=np.clip(1+0.55*fbm(),0.25,2.0)
def scr(a,b):return 1-(1-a)*(1-b)
bg=np.clip(xa,0,1)**0.72*1.2
bg=scr(bg,(glow*tex)[...,None]*tint*1.0)
st=(rng.random((H,W))>0.9985)*rng.random((H,W));bg=scr(bg,np.dstack([st*.8]*3))
bg=np.clip(bg-0.075,0,1)*1.12
k=80;w2=np.linspace(0,1,k)[:,None,None]
bg[-k:]=bg[-k:]*(1-w2)+bg[:k]*w2
def key(a,boost):
    m=a.max(2);al=np.clip(m/0.35,0,1)**0.8
    rgb=np.clip(a/np.maximum(al[...,None],1e-3),0,1)*boost
    return np.dstack([np.clip(rgb,0,1),al])
def save(arr,name,rgba=False):
    im=Image.fromarray((np.clip(arr,0,1)*255).astype('uint8'),'RGBA' if rgba else 'RGB');im.save('/tmp/new194/'+name)
import os;os.makedirs('/tmp/new194',exist_ok=True)
save(bg,'ch1_xa.png');save(key(gi,1.5),'ch1_giua.png',True);save(key(ga,1.25),'ch1_gan.png',True)
def over(b,l):
    a=l[...,3:4];return b*(1-a)+l[...,:3]*a
comp=over(over(bg,key(gi,1.5)),key(ga,1.25))
for n,x in [('xa',bg),('gộp',comp)]:
    x=x[int(H*.1):int(H*.9)];l=x.mean(2)*255
    print(n,'p10/p50/p90',np.percentile(l,[10,50,90]).round(0))
Image.fromarray((comp*255).astype('uint8')).resize((360,780)).save('/tmp/new194/prev.png')
