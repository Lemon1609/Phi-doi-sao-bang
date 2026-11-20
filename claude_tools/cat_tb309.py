# Cắt 2 sheet GPT trang bị V309 → src/tb309img/*.webp (xám, nhuộm màu bằng mã trong tb309.js)
from PIL import Image;import numpy as np;from scipy import ndimage
S='src/ship118_cho/';O='src/tb309img/'
def rgba_max(a):
    a=a.astype(float);al=np.clip((a.max(2)-6)/249,0,1)
    rgb=np.where(al[...,None]>0,a/np.maximum(al[...,None]*255,1)*255,0)
    return Image.fromarray(np.dstack([np.clip(rgb,0,255),al*255]).astype('uint8'),'RGBA')
def tach(a,thr=16,kin=1500):
    L=a.max(2).astype(int);dark=L<=thr;lab,n=ndimage.label(dark)
    edge=set(np.unique(np.r_[lab[0],lab[-1],lab[:,0],lab[:,-1]]))-{0}
    sz=ndimage.sum(dark,lab,range(1,n+1));big={i+1 for i,s in enumerate(sz) if s>kin}
    bg=np.isin(lab,list(edge|big));alpha=np.where(bg,0,255).astype(float)
    soft=bg&(L>4);alpha[soft]=np.clip((L[soft]-4)/(thr-4),0,1)*255
    alpha=ndimage.gaussian_filter(alpha,.7)
    return Image.fromarray(np.dstack([a,alpha]).astype('uint8'),'RGBA')
def fit(im,size,pad=.06,sqr=True):
    im=im.crop(im.getbbox());w,h=im.size
    if not sqr:
        k=size/max(w,h);return im.resize((max(1,round(w*k)),max(1,round(h*k))),Image.LANCZOS)
    m=int(max(w,h)*(1+pad));c=Image.new('RGBA',(m,m));c.paste(im,((m-w)//2,(m-h)//2));return c.resize((size,size),Image.LANCZOS)
def cells(path,R,C):
    a=np.asarray(Image.open(path).convert('RGB'));H,W=a.shape[:2]
    return [[a[int(r*H/R):int((r+1)*H/R),int(c*W/C):int((c+1)*W/C)].copy() for c in range(C)] for r in range(R)]
P=cells(S+'V309_gpt_fx_gear_projectiles_4x4.png',4,4);Q=cells(S+'V309_gpt_fx_gear_projectiles_4x4_phu.png',4,4)
P[1][1]=Q[1][1];P[2][1]=Q[2][1]
K=[['m_standard','m_crystal','m_lightning','m_torpedo'],['m_slim','m_comet','m_sword','m_chrono'],['s_crescent','s_orb','s_prism','s_shard'],['s_lance','s_halo','s_sigil','s_mini_drone']]
GLOW={'s_orb','m_comet'}
for r in range(4):
    for c in range(4):
        k=K[r][c];im=rgba_max(P[r][c]) if k in GLOW else tach(P[r][c])
        fit(im,128,sqr=k in ('s_crescent','s_orb','s_halo','s_sigil','s_mini_drone')).save(O+k+'.webp',quality=90)
D=cells(S+'V309_gpt_fx_gear_pods_shields_4x2.png',2,4)
for c,k in enumerate(['pod_cannon','pod_disc','pod_wing','pod_void']):fit(tach(D[0][c]),128).save(O+k+'.webp',quality=90)
for c,k in enumerate(['shield_hex','shield_mirror','shield_orbital','shield_wave']):
    im=rgba_max(D[1][c]) if k=='shield_wave' else tach(D[1][c],kin=800);fit(im,256,pad=.02).save(O+k+'.webp',quality=90)
print('ok')
# --- V309 lượt 2: tranh đa sắc (không nhuộm) ---
def tach_mau(a,thr=16,kin=1500):
    im=tach(a,thr,kin);return im
PODN=['rail','disc','solar','gravity','prism','ricochet','lance36','orbit36','halo36','carrier9','devour10_s','chrono11_s','monarch12_s']
D=cells(S+'V309_gpt_fx_aux_pods_13_4x4.png',4,4)
for k,v in enumerate(PODN):fit(tach_mau(D[k//4][k%4]),160).save(O+'pod_'+v+'.webp',quality=90)
CK=[['c_m_inferno','c_m_cryo','c_m_thunder','c_m_singularity'],['c_m_spiral','c_m_stellar','c_m_sword_gold','c_m_chrono'],['c_s_disc','c_s_orb_gravity','c_s_prism','c_s_ricochet'],['c_s_lance36','c_s_halo36','c_s_sigil_monarch','c_s_mini_drone']]
D=cells(S+'V309_gpt_fx_gear_projectiles_color_4x4.png',4,4)
for r in range(4):
    for c in range(4):
        k=CK[r][c];im=rgba_max(D[r][c]) if k=='c_s_orb_gravity' else tach_mau(D[r][c])
        fit(im,128,sqr=k in ('c_s_disc','c_s_orb_gravity','c_s_halo36','c_s_sigil_monarch','c_s_mini_drone')).save(O+k+'.webp',quality=90)
print('ok mau')
