# V307 thử: gom màu tàu về 1 màu chủ đạo + giữ kim loại (sat thấp) + giữ vàng/cam (ánh vàng, lửa động cơ). Chỉ để xem trước/sau.
import sys,numpy as np
from PIL import Image
def grade(im,keep_warm=True,pull=.85,desat=.55):
    a=np.array(im.convert('RGBA')).astype(np.float32)/255;rgb=a[...,:3];al=a[...,3]
    mx=rgb.max(2);mn=rgb.min(2);d=mx-mn;s=np.where(mx>0,d/np.maximum(mx,1e-6),0);v=mx
    r,g,b=rgb[...,0],rgb[...,1],rgb[...,2]
    h=np.zeros_like(mx);m=d>1e-6
    rc=np.where(m,(mx-r)/np.maximum(d,1e-6),0);gc=np.where(m,(mx-g)/np.maximum(d,1e-6),0);bc=np.where(m,(mx-b)/np.maximum(d,1e-6),0)
    h=np.where(mx==r,bc-gc,np.where(mx==g,2+rc-bc,4+gc-rc));h=(h/6)%1.0
    deg=h*360
    sel=(al>.8)&(s>.3)&(v>.3)
    hist=np.histogram(deg[sel],bins=36,range=(0,360),weights=(s*v)[sel])[0]
    dom=(np.argmax(hist)+.5)*10
    diff=np.abs(((deg-dom+180)%360)-180)
    warm=(deg>25)&(deg<65)&keep_warm        # vàng/cam: giữ
    off=(s>.3)&(diff>55)&(~warm)
    # kéo hue về chủ đạo (một phần) và giảm bão hòa phần lệch
    newdeg=np.where(off,deg+((dom-deg+180)%360-180)*pull,deg)
    news=np.where(off,s*(1-desat*.0)*0.85,s)
    hh=(newdeg%360)/60;c=v*news;x=c*(1-np.abs(hh%2-1));mm=v-c
    z=np.zeros_like(c)
    cases=[(c,x,z),(x,c,z),(z,c,x),(z,x,c),(x,z,c),(c,z,x)]
    out=np.zeros_like(rgb);idx=np.floor(hh).astype(int)%6
    for k,(R,G,B) in enumerate(cases):
        mk=idx==k;out[...,0][mk]=(R+mm)[mk];out[...,1][mk]=(G+mm)[mk];out[...,2][mk]=(B+mm)[mk]
    res=np.where(off[...,None],out,rgb)
    return Image.fromarray((np.dstack([res,al])*255).astype(np.uint8),'RGBA'),dom
if __name__=='__main__':
    n=int(sys.argv[1]);tiers=['thuong','luc','lam','tim','ss']
    S=Image.new('RGB',(5*260,2*260),(14,20,40))
    for j,t in enumerate(tiers):
        im=Image.open(f'src/ship118/tau{n}_{t}.png').convert('RGBA');g,dom=grade(im)
        for i,x in enumerate((im,g)):
            y=x.copy();y.thumbnail((250,250));S.paste(y,(j*260+5,i*260+5),y)
        print(t,'dom',dom)
    S.save(sys.argv[2])
