# Cắt 2 sheet GPT hiệu ứng V309 → src/fx309img/*.webp (alpha = độ sáng tối đa, màu chia alpha)
from PIL import Image;import numpy as np
S='src/ship118_cho/';O='src/fx309img/'
def rgba(a):
    a=a.astype(float);al=a.max(2);al=np.clip((al-6)/249,0,1)
    rgb=np.where(al[...,None]>0,a/np.maximum(al[...,None]*255,1)*255,0)
    return Image.fromarray(np.dstack([np.clip(rgb,0,255),al*255]).astype('uint8'),'RGBA')
a=np.asarray(Image.open(S+'V309_gpt_fx_beams_6tiers.png').convert('RGB'))
L=a.max(2).astype(int)
cols=[(39,194),(250,389),(458,603),(662,806),(868,1010),(1065,1215)]
r=L[932:1233].max(1);cut=932+int(np.argmin(r[60:200]))+60
print('flare/ring cut',cut)
T=['thuong','luc','lam','tim','tim5','ss']
for i,(x0,x1) in enumerate(cols):
    cx=(x0+x1)//2
    beam=rgba(a[60:860,x0:x1]).resize((64,512),Image.LANCZOS)
    beam.save(O+f'beam_{T[i]}.webp',quality=90)
    fl=rgba(a[932:cut,cx-80:cx+80]);fl=fl.crop(fl.getbbox()).resize((96,96),Image.LANCZOS);fl.save(O+f'flare_{T[i]}.webp',quality=90)
    rg=rgba(a[cut:1240,cx-90:cx+90]);rg=rg.crop(rg.getbbox()).resize((96,96),Image.LANCZOS);rg.save(O+f'ring_{T[i]}.webp',quality=90)
b=np.asarray(Image.open(S+'V309_gpt_fx_special_2x2.png').convert('RGB'))
def tile(y0,y1,x0,x1,name,size,fade=False,rot=0):
    im=rgba(b[y0:y1,x0:x1])
    if rot:im=im.rotate(rot,expand=True,resample=Image.BICUBIC)
    im=im.crop(im.getbbox())
    w,h=im.size;m=max(w,h);c=Image.new('RGBA',(m,m));c.paste(im,((m-w)//2,(m-h)//2));im=c
    if fade:
        yy,xx=np.mgrid[0:m,0:m];d=np.hypot(xx-m/2,yy-m/2)/(m/2);f=np.clip((1-d)/0.18,0,1)
        ar=np.asarray(im).copy();ar[...,3]=(ar[...,3]*f).astype('uint8');im=Image.fromarray(ar)
    im.resize((size,size),Image.LANCZOS).save(O+name+'.webp',quality=88)
tile(24,576,23,609,'nuke',384,fade=True)
tile(24,576,642,1231,'prism',256)
tile(603,1180,23,609,'slash',320,rot=45)
tile(603,1180,642,1231,'shock',320,fade=True)
print('ok')
