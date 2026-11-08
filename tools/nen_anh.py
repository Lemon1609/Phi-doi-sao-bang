# Nén lại mọi ảnh webp nhúng (data URI) trong HTML đã dựng. Giữ nguyên kích thước điểm ảnh.
# Chỉ thay khi: nhỏ hơn ≥10% VÀ PSNR (trên RGB nhân alpha + kênh alpha) ≥ NGUONG dB. Có cache theo sha1.
import re,base64,io,hashlib,os,json
import numpy as np
from PIL import Image
NGUONG=float(os.environ.get('NEN_DB','34'))   # V79: 40 → 34 dB (mắt thường khó thấy ở màn điện thoại) để giảm dung lượng tải
CACHE='tools/.cache_nen' if NGUONG==40 else 'tools/.cache_nen%d'%int(NGUONG);os.makedirs(CACHE,exist_ok=True)
def psnr(a,b):
    a=np.asarray(a,dtype=np.float32);b=np.asarray(b,dtype=np.float32)
    if a.shape[-1]==4:
        aa=a[...,3:]/255;bb=b[...,3:]/255
        a=np.concatenate([a[...,:3]*aa,a[...,3:]],-1);b=np.concatenate([b[...,:3]*bb,b[...,3:]],-1)
    m=np.mean((a-b)**2);return 99 if m==0 else 10*np.log10(255**2/m)
def nen1(raw):
    h=hashlib.sha1(raw).hexdigest();cp=os.path.join(CACHE,h)
    if os.path.exists(cp+'.json'):
        j=json.load(open(cp+'.json'));return (open(cp+'.webp','rb').read() if j['ok'] else raw),j
    im=Image.open(io.BytesIO(raw));n=getattr(im,'n_frames',1)
    j={'ok':False,'q':None,'psnr':None,'a':len(raw),'b':len(raw)}
    if n==1:
        im=im.convert('RGBA') if im.mode in('RGBA','LA','P') or 'transparency' in im.info else im.convert('RGB')
        for q in ((72,78,84,90) if NGUONG<40 else (80,86,92)):
            bio=io.BytesIO();im.save(bio,'WEBP',quality=q,alpha_quality=90,method=6);nb=bio.getvalue()
            p=psnr(im,Image.open(io.BytesIO(nb)).convert(im.mode))
            if p>=NGUONG:
                if len(nb)<=len(raw)*.9:j.update(ok=True,q=q,psnr=round(float(p),1),b=len(nb));open(cp+'.webp','wb').write(nb)
                break
    json.dump(j,open(cp+'.json','w'));return (open(cp+'.webp','rb').read() if j['ok'] else raw),j
def nen_html(h):
    tong=[0,0];bad=[]
    def f(m):
        raw=base64.b64decode(m.group(1));nb,j=nen1(raw);tong[0]+=len(raw);tong[1]+=len(nb)
        return 'data:image/webp;base64,'+base64.b64encode(nb).decode()
    h2=re.sub(r'data:image/webp;base64,([A-Za-z0-9+/=]{2000,})',f,h)
    print('anh webp: %.2f MB -> %.2f MB'%(tong[0]/1e6,tong[1]/1e6));return h2
if __name__=='__main__':
    import sys;s=open(sys.argv[1],encoding='utf-8').read();o=nen_html(s);open(sys.argv[2],'w',encoding='utf-8').write(o);print(round(len(o)/1e6,2),'MB')
