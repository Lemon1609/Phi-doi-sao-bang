# Cắt 2 sheet GPT đạn địch V309 → src/dq309img/*.webp + laser địch vào src/fx309img/{beam,flare,ring}_e1..e3.webp
from PIL import Image;import numpy as np;from scipy import ndimage
S='src/ship118_cho/';O='src/dq309img/';F='src/fx309img/'
def rgba_max(a):
    a=a.astype(float);al=np.clip((a.max(2)-6)/249,0,1)
    rgb=np.where(al[...,None]>0,a/np.maximum(al[...,None]*255,1)*255,0)
    return Image.fromarray(np.dstack([np.clip(rgb,0,255),al*255]).astype('uint8'),'RGBA')
def tach(a,thr=14):
    L=a.max(2).astype(int);dark=L<=thr;lab,n=ndimage.label(dark);edge=set(np.unique(np.r_[lab[0],lab[-1],lab[:,0],lab[:,-1]]))-{0}
    bg=np.isin(lab,list(edge));alpha=np.where(bg,0,255).astype(float)
    # viền mềm: pixel nền sát vật thể lấy alpha theo độ sáng
    soft=bg&(L>4);alpha[soft]=np.clip((L[soft]-4)/(thr-4),0,1)*255
    alpha=ndimage.gaussian_filter(alpha,.6)
    return Image.fromarray(np.dstack([a,alpha]).astype('uint8'),'RGBA')
def sq(im,size,pad=.06):
    im=im.crop(im.getbbox());w,h=im.size;m=int(max(w,h)*(1+pad));c=Image.new('RGBA',(m,m));c.paste(im,((m-w)//2,(m-h)//2));return c.resize((size,size),Image.LANCZOS)
b=np.asarray(Image.open(S+'V309_gpt_fx_enemy_bullets_4x4.png').convert('RGB'))
K=[['e_round_red','e_drop_red','e_diamond_red','e_bolt_red'],['e_round_orange','e_drop_orange','e_shuriken_orange','e_arc_orange'],['e_orb_heavy_berry','e_diamond_berry','e_shuriken_berry','e_arc_berry'],['e_orb_heavy_scarlet','e_mine_idle','e_mine_arming','e_muzzle_flash']]
H,W=b.shape[:2];ch,cw=H/4,W/4
for r in range(4):
    for c in range(4):
        cell=b[int(r*ch):int((r+1)*ch),int(c*cw):int((c+1)*cw)].copy()
        if K[r][c]=='e_bolt_red':
            f=np.linspace(0,1,int(cell.shape[0]*.12))[:,None,None];cell[:len(f)]=(cell[:len(f)]*f).astype('uint8')
        im=tach(cell) if 'mine' in K[r][c] or 'shuriken_orange' in K[r][c] else rgba_max(cell)
        size=160 if ('heavy' in K[r][c] or 'mine' in K[r][c]) else 128
        sq(im,size).save(O+K[r][c]+'.webp',quality=90)
l=np.asarray(Image.open(S+'V309_gpt_fx_enemy_lasers_3col.png').convert('RGB'));H,W=l.shape[:2]
L=l.max(2)
for i in range(3):
    x0,x1=int(i*W/3),int((i+1)*W/3);col=L[:,x0:x1];xs=np.where(col[:int(H*.6)].max(0)>25)[0];bx0,bx1=x0+xs.min(),x0+xs.max()+1
    rgba_max(l[int(H*.05):int(H*.62),bx0:bx1]).resize((64,512),Image.LANCZOS).save(F+f'beam_e{i+1}.webp',quality=90)
    fl=rgba_max(l[int(H*.67):int(H*.83),x0:x1]);sq(fl,96,0).save(F+f'flare_e{i+1}.webp',quality=90)
    rg=rgba_max(l[int(H*.83):H,x0:x1]);sq(rg,96,0).save(F+f'ring_e{i+1}.webp',quality=90)
print('ok')
