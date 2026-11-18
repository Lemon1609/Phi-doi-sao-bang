# 9-slice: ghép ảnh nguồn thành kích thước đích, giữ nguyên 4 góc (đã nhân hệ số s)
# dùng: chin_o(im, (L,T,R,B) theo px nguồn, (W,H) đích, s)
from PIL import Image
def chin_o(im,m,size,s=1.0):
    L,T,R,B=m;w,h=im.size;W,H=size
    l,t,r,b=[max(1,round(v*s)) for v in (L,T,R,B)]
    out=Image.new('RGBA',(W,H),(0,0,0,0))
    xs=[(0,L,0,l),(L,w-R,l,W-r),(w-R,w,W-r,W)];ys=[(0,T,0,t),(T,h-B,t,H-b),(h-B,h,H-b,H)]
    for (sx0,sx1,dx0,dx1) in xs:
        for (sy0,sy1,dy0,dy1) in ys:
            if dx1<=dx0 or dy1<=dy0:continue
            out.paste(im.crop((sx0,sy0,sx1,sy1)).resize((dx1-dx0,dy1-dy0),Image.LANCZOS),(dx0,dy0))
    return out
