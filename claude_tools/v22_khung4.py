# V2.2 · 4 khung avatar giới hạn (chủ dự án 24/11 10:10): assets/ui_v22/frame_{phoenix,ice,thunder,void}.png (1254², nền đen)
# → src/ui22img/frame_*.webp 256×256 + 2 khung nhuộm (holy từ thunder, jade từ ice) + src/ui22img/frame_win.json (ô cửa sổ trong, tỉ lệ)
# Tách nền: chỉ vùng tối LỚN liền khối (nền ngoài + lòng trong) = trong suốt; dải 10 px quanh mép tối mềm theo độ sáng (giữ quầng);
# thân khung đục 100 %; màu dải mềm chia lại theo alpha (không viền đen). Giữ nguyên khung vuông — không cắt lệch tâm.
import os,json,numpy as np
from PIL import Image
from scipy import ndimage as nd
S='assets/ui_v22';O='src/ui22img'
def key(a,thr=24,band=10,lo=8,hi=70):
    lum=a[...,:3].max(2).astype(float);H,W=lum.shape
    lab,n=nd.label(lum<=thr);bg=np.zeros((H,W),bool)
    if n:
        sz=nd.sum(np.ones_like(lum),lab,range(1,n+1))
        for i,s in enumerate(sz,1):
            if s>H*W*0.004:bg|=lab==i
    d=nd.distance_transform_edt(~bg)
    soft=np.clip((lum-lo)/(hi-lo),0,1)
    al=np.where(bg,0.0,np.where(d<=band,np.maximum(soft,np.clip((d-band*0.6)/(band*0.4),0,1)*0),1.0))
    al=np.where((~bg)&(d<=band),np.maximum(soft,(d/band)**2),al)
    al=nd.gaussian_filter(al,0.7)
    rgb=a[...,:3].astype(float);k=np.clip(al,1e-3,1)[...,None]
    rgb=np.where((al<1)[...,None],np.clip(rgb/k,0,255),rgb)
    # cửa sổ trong = vùng nền chứa tâm ảnh
    c=lab[H//2,W//2];win=None
    if c:
        ys,xs=np.where(lab==c);win=[xs.min()/W,ys.min()/H,(xs.max()+1)/W,(ys.max()+1)/H]
    return np.dstack([rgb,al*255]).clip(0,255).astype(np.uint8),win
def tint(a,col):
    g=a.astype(float).mean(2,keepdims=True)/255;return np.clip(g*np.array(col,float)*1.25,0,255).astype(np.uint8)
win={}
for nm,src,col in [('phoenix','phoenix',None),('ice','ice',None),('thunder','thunder',None),('void','void',None),('holy','thunder',(255,205,90)),('jade','ice',(70,240,160))]:
    a=np.array(Image.open(f'{S}/frame_{src}.png').convert('RGB'))
    if col:a=tint(a,col)
    out,w=key(a);win[nm]=[round(v,4) for v in w] if w else None
    Image.fromarray(out,'RGBA').resize((256,256),Image.LANCZOS).save(f'{O}/frame_{nm}.webp','WEBP',quality=88,method=6)
    print(nm,w and [round(v,3) for v in w],os.path.getsize(f'{O}/frame_{nm}.webp'))
json.dump(win,open(f'{O}/frame_win.json','w'))
