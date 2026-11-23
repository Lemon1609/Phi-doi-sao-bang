# V2.2: assets/ui_v22/*.png -> src/ui22img/*.webp (tach nen den: khung = flood-fill tu mep + long trong)
import sys,os,numpy as np
from PIL import Image
from scipy import ndimage as nd
S=sys.argv[1] if len(sys.argv)>1 else 'assets/ui_v22'; O=sys.argv[2] if len(sys.argv)>2 else 'src/ui22img'
os.makedirs(O,exist_ok=True)
def key(a,thr=22,soft=40):
    lum=a[...,:3].max(2).astype(float)
    dark=lum<=thr
    lab,n=nd.label(dark)
    keep=np.zeros_like(dark)
    H,W=dark.shape
    for i in range(1,n+1):
        m=lab==i
        if m.sum()>H*W*0.004: keep|=m   # vung toi lon (nen ngoai + long khung)
    al=np.clip((lum-thr)/(soft),0,1)
    al[keep]=0
    al=nd.gaussian_filter(al,0.6)
    rgb=a[...,:3].astype(float)
    # bo vien den: chia lai theo alpha
    out=np.dstack([rgb,al*255]).clip(0,255).astype(np.uint8)
    return out
def crop(im):
    a=np.array(im);m=a[...,3]>8;lab,n=nd.label(m)
    if n>1:
        sz=nd.sum(m,lab,range(1,n+1));keep=np.isin(lab,1+np.where(sz>=sz.max()*0.03)[0]);a[...,3]*=keep;im=Image.fromarray(a,'RGBA')
    bb=im.getchannel('A').point(lambda v:255 if v>8 else 0).getbbox()
    return im.crop(bb) if bb else im
def frame(nm,o,col=None):
    a=np.array(Image.open(f'{S}/{nm}.png').convert('RGB'))
    if col is not None:
        g=a.astype(float).mean(2,keepdims=True)/255
        c=np.array(col,float)
        a=(np.clip(g*c*1.25,0,255)).astype(np.uint8)
    im=crop(Image.fromarray(key(a),'RGBA')).resize((384,384),Image.LANCZOS)
    im.save(f'{O}/{o}.webp','WEBP',quality=88,method=6)
for f in ['ice','phoenix','thunder','void']: frame('frame_'+f,'frame_'+f)
frame('frame_thunder','frame_holy',(255,205,90))      # Thanh Quang (vang)
frame('frame_ice','frame_jade',(70,240,160))          # Luc Bao
a=np.array(Image.open(f'{S}/ui_icons_3d.png').convert('RGB'));H,W=a.shape[:2]
for k,(r,c) in {'map':(0,0),'chest':(0,1),'trophy':(1,0),'core':(1,1)}.items():
    t=a[r*H//2:(r+1)*H//2,c*W//2:(c+1)*W//2]
    im=crop(Image.fromarray(key(t),'RGBA')); im.thumbnail((192,192),Image.LANCZOS)
    im.save(f'{O}/ic_{k}.webp','WEBP',quality=88,method=6)
bg=Image.open(f'{S}/hangar_bg.png').convert('RGB'); bg=bg.resize((540,int(540*bg.height/bg.width)),Image.LANCZOS)
bg.save(f'{O}/hangar_bg.webp','WEBP',quality=80,method=6)
for f in sorted(os.listdir(O)): print(f,os.path.getsize(f'{O}/{f}'))
