from PIL import Image,ImageDraw,ImageFont,ImageFilter
import numpy as np
R='raw';T=['thuong','luc','lam','tim','tim5','ss'];G={'thuong':345,'luc':355,'lam':368,'tim':380,'tim5':392,'ss':405}
def load(k):return np.asarray(Image.open(f'{R}/{k}.png').convert('RGBA')).astype(float)
def stat(a):
  al=a[...,3];A=al>128;r,g,b=[a[...,i]/255 for i in range(3)];mx=np.maximum(np.maximum(r,g),b);mn=np.minimum(np.minimum(r,g),b);d=mx-mn+1e-9;s=d/(mx+1e-9)
  h=np.where(mx==r,((g-b)/d)%6,np.where(mx==g,(b-r)/d+2,(r-g)/d+4))*60;n=A.sum();col=(s>=.18)&A;hot=(s>.45)&(mx>.85)&A
  hs=np.histogram(h[col],bins=[0,70,150,215,250,300,330,360])[0]/max(1,col.sum())*100;ys,xs=np.where(A);w=xs.max()-xs.min()+1;hh=ys.max()-ys.min()+1
  return dict(n=int(n),w=int(w),h=int(hh),asp=w/hh,g=round((w*hh)**.5),mg=int(min(xs.min(),ys.min(),511-xs.max(),511-ys.max())),kl=((s<.18)&A).sum()/n*100,ps=hot.sum()/n*100,lo=hs[2],ch=hs[3],ti=hs[4],xanhla=hs[1],hong=hs[5]+hs[6]+hs[0],halo=((al>0)&(al<=40)).sum()/n*100,cx=(xs.min()+xs.max())/2,cy=(ys.min()+ys.max())/2)
print('bậc | THƯỜNG: rộng×cao tỉ lệ cỡ(chuẩn) lề | crôm% phát sáng% lam lơ/chàm/tím | xanh lá% đỏ-hồng% quầng% || BẠO TẨU: diện tích × · rộng×cao · lề · thân lõi khớp bản thường (sai lệch màu TB trong vùng thân) · quầng%')
for t in T:
  n=load(f'tau7_{t}');b=load(f'tau7_{t}_bt');sn=stat(n);sb=stat(b)
  core=n[...,3]>200;diff=np.abs(n[...,:3]-b[...,:3]).mean(-1)[core].mean();cover=(b[...,3][core]>200).mean()*100
  print(f"{t:6} | {sn['w']}×{sn['h']} {sn['asp']:.2f} {sn['g']} ({G[t]}) lề {sn['mg']} | {sn['kl']:.0f} {sn['ps']:.0f} {sn['lo']:.0f}/{sn['ch']:.0f}/{sn['ti']:.0f} | {sn['xanhla']:.1f} {sn['hong']:.1f} {sn['halo']:.0f} || ×{sb['n']/sn['n']:.2f} · {sb['w']}×{sb['h']} · lề {sb['mg']} · lệch {diff:.1f}/255, phủ {cover:.0f}% · quầng {sb['halo']:.0f}")
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',13);C=200
S=Image.new('RGB',(C*6,(C+20)*2),(8,12,28));d=ImageDraw.Draw(S)
for j,t in enumerate(T):
  for i,sf in enumerate(('','_bt')):
    im=Image.open(f'{R}/tau7_{t}{sf}.png').convert('RGBA').resize((C,C),Image.LANCZOS);S.paste(im,(j*C,i*(C+20)+20),im);d.text((j*C+4,i*(C+20)+3),t+sf,fill=(230,230,230),font=F)
S.save('bang_tau7.png')
