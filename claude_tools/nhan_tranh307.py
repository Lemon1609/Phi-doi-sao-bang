"""V307 · Nhận tranh GPT cho src/tranh307 (băng 4 hộp + phi công lớn).
Dùng: python3 claude_tools/nhan_tranh307.py <ảnh GPT> <khóa>
  khóa: nhiem_vu | mua_giai | diem_danh | qua | phi_cong_1 … phi_cong_8
- Băng: cắt về đúng tỉ lệ 2,8:1 (giữ giữa), rộng 1440. Báo độ sáng nửa trái (chỗ đặt chữ) để biết có cần làm tối không.
- Phi công: nếu ảnh không có kênh trong suốt → tách nền #00FF00 (hoặc nền gần đồng màu ở 4 góc), cắt sát nhân vật, cao ≤1536.
In số đo, ghi src/tranh307/<khóa>.png.
"""
import sys,os
from PIL import Image,ImageFilter
import numpy as np
src,key=sys.argv[1],sys.argv[2]
OUT=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','src','tranh307',key+'.png')
im=Image.open(src).convert('RGBA');a=np.asarray(im).astype(np.float32)
if key.startswith('phi_cong_'):
    al=a[...,3]
    if al.min()>250:   # không có trong suốt → tách nền
        rgb=a[...,:3];c=np.median(np.concatenate([rgb[:8,:8].reshape(-1,3),rgb[:8,-8:].reshape(-1,3),rgb[-8:,:8].reshape(-1,3),rgb[-8:,-8:].reshape(-1,3)]),axis=0)
        d=np.sqrt(((rgb-c)**2).sum(-1));al=np.clip((d-40)/50,0,1)*255
        if c[1]>150 and c[0]<120 and c[2]<120:   # nền lục: khử viền lục loang
            g=rgb[...,1];m=np.maximum(rgb[...,0],rgb[...,2]);rgb[...,1]=np.where(g>m,m+(g-m)*0.25,g)
        a=np.dstack([rgb,al]);print('tách nền màu',c.round())
    im=Image.fromarray(a.clip(0,255).astype(np.uint8),'RGBA')
    im.putalpha(im.getchannel('A').filter(ImageFilter.GaussianBlur(0.6)))
    bb=im.getchannel('A').point(lambda v:255 if v>20 else 0).getbbox();im=im.crop(bb)
    if im.height>1536:im=im.resize((round(im.width*1536/im.height),1536),Image.LANCZOS)
    cov=(np.asarray(im)[...,3]>20).mean()
    print(f'phi công: {im.size} · phủ {cov*100:.0f}% khung · tỉ lệ cao/rộng {im.height/im.width:.2f} (mong 1,4–1,8)')
else:
    W,H=im.size;r=2.8
    if W/H>r:nw=round(H*r);im=im.crop(((W-nw)//2,0,(W-nw)//2+nw,H))
    else:nh=round(W/r);im=im.crop((0,(H-nh)//2,W,(H-nh)//2+nh))
    im=im.resize((1440,514),Image.LANCZOS).convert('RGB').convert('RGBA')
    g=np.asarray(im.convert('L')).astype(float);L=g[:,:int(g.shape[1]*.55)];R=g[:,int(g.shape[1]*.55):]
    print(f'băng: 1440×514 · sáng TB trái {L.mean():.0f} (mong ≤90 để chữ trắng đọc rõ) · phải {R.mean():.0f} · p95 trái {np.percentile(L,95):.0f}')
os.makedirs(os.path.dirname(OUT),exist_ok=True);im.save(OUT);print('ghi',os.path.relpath(OUT))
