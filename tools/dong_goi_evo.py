# Đóng gói ô hình dáng tiến hóa của GPT → src/evo/fighters_evo1.webp / fighters_evo2.webp (cùng bố cục fighters-v28).
# LƯU Ý: atlas fighters-v28 là 2500×2000 = 5 cột × 4 hàng, MỖI Ô 500×500 (game: naturalWidth/5, naturalHeight/4).
# Ảnh GPT có thể là 500×400 hoặc 500×500 → căn theo TÂM khung bao của chiến cơ gốc trong ô (alpha>60),
# co giãn để khung bao rộng trong [1,00; 1,15]× gốc và cao ≤ 1,12× gốc (không quá ô). Ô không có tệp → trống (game dùng ô gốc).
import sys,glob,re,os
import numpy as np
from PIL import Image
SRC=sys.argv[1] if len(sys.argv)>1 else 'review_hinhdang3/cells'
base=Image.open('proto53/fighters.webp').convert('RGBA');CW,CH=base.width//5,base.height//4
def bb(im,th=60):a=np.asarray(im)[...,3];ys,xs=np.where(a>th);return xs.min(),xs.max()+1,ys.min(),ys.max()+1
for stage in (1,2):
    out=Image.new('RGBA',base.size,(0,0,0,0));n=0
    for f in sorted(glob.glob(f'{SRC}/o_*_evo{stage}.png')):
        i=int(re.search(r'o_(\d+)_evo',f).group(1));x,y=i%5*CW,i//5*CH
        g=base.crop((x,y,x+CW,y+CH));gx0,gx1,gy0,gy1=bb(g);gw,gh=gx1-gx0,gy1-gy0;gcx,gcy=(gx0+gx1)/2,(gy0+gy1)/2
        im=Image.open(f).convert('RGBA');ex0,ex1,ey0,ey1=bb(im);ew,eh=ex1-ex0,ey1-ey0
        part=im.crop((ex0,ey0,ex1,ey1))
        s=max(1.0*gw/ew,min(1.0,gw*1.15/ew));s=min(s,gw*1.15/ew,gh*1.12/eh,(CW-8)/ew,(CH-8)/eh)
        if abs(s-1)>.005:part=part.resize((max(1,round(ew*s)),max(1,round(eh*s))),Image.LANCZOS)
        px=round(gcx-part.width/2);py=round(gcy-part.height/2);px=max(4,min(CW-4-part.width,px));py=max(4,min(CH-4-part.height,py))
        cell=Image.new('RGBA',(CW,CH),(0,0,0,0));cell.alpha_composite(part,(px,py));out.alpha_composite(cell,(x,y));n+=1
        print(f'evo{stage} o{i:02d}: co {s:.3f} · rộng {part.width/gw:.2f}× · cao {part.height/gh:.2f}× gốc')
    p=f'src/evo/fighters_evo{stage}.webp'
    if n:out.save(p,quality=90,method=6);print('ghi',p,os.path.getsize(p))
