# V307 · tách 6 ô một ảnh GPT (nền đen) → src/ship118/tauN_{thuong,luc,lam,tim,tim5,ss}.png (512×512 RGBA, cạnh dài 456, căn tâm theo khung bao).
# Dùng: python3 claude_tools/tach_tau_v307.py <ảnh> <số tàu> [--bt]   (--bt: ghi _bt = bản sao thân thường; Bạo Tẩu game gốc không đổi thân)
import sys, numpy as np
from PIL import Image
from collections import deque
T=['thuong','luc','lam','tim','tim5','ss']
src,n=sys.argv[1],int(sys.argv[2]);bt='--bt' in sys.argv
im=Image.open(src).convert('RGB');a=np.asarray(im).astype(np.int16);H,W,_=a.shape
mx=a.max(2)
# cột: tách theo khoảng trống đen giữa các ô (bỏ dải nhãn phía trên)
body=(mx>40);body[:170]=False
colsum=body.sum(0);runs=[];on=False
for x in range(W):
    if colsum[x]>2 and not on:s=x;on=True
    if colsum[x]<=2 and on:
        on=False
        if x-s>60:runs.append([s,x])
if on:runs.append([s,W])
# gộp mảnh rời gần nhau (mảnh giáp bay) cho đủ 6 cụm
while len(runs)>6:
    g=[runs[i+1][0]-runs[i][1] for i in range(len(runs)-1)];i=int(np.argmin(g));runs[i]=[runs[i][0],runs[i+1][1]];del runs[i+1]
assert len(runs)==6,runs
crops=[]
for (x0,x1),t in zip(runs,T):
    c=a[170:,max(0,x0-6):x1+6];h,w,_=c.shape;m=c.max(2)
    # nền = vùng đen nối với mép
    bg=np.zeros((h,w),bool);q=deque()
    for x in range(w):
        for y in (0,h-1):
            if m[y,x]<=14 and not bg[y,x]:bg[y,x]=True;q.append((y,x))
    for y in range(h):
        for x in (0,w-1):
            if m[y,x]<=14 and not bg[y,x]:bg[y,x]=True;q.append((y,x))
    while q:
        y,x=q.popleft()
        for dy,dx in((1,0),(-1,0),(0,1),(0,-1)):
            yy,xx=y+dy,x+dx
            if 0<=yy<h and 0<=xx<w and not bg[yy,xx] and m[yy,xx]<=14:bg[yy,xx]=True;q.append((yy,xx))
    al=np.where(bg,0,255).astype(np.uint8)
    # viền mềm: pixel gần nền → alpha theo độ sáng
    soft=np.clip((m-6)*9,0,255).astype(np.uint8);edge=bg|np.pad(bg,1)[2:,1:-1]|np.pad(bg,1)[:-2,1:-1]|np.pad(bg,1)[1:-1,2:]|np.pad(bg,1)[1:-1,:-2]
    al=np.where(edge&~bg,np.minimum(al,soft),al)
    rgba=np.dstack([c.astype(np.uint8),al]);o=Image.fromarray(rgba,'RGBA');bb=o.getchannel('A').point(lambda v:255 if v>40 else 0).getbbox();o=o.crop(bb)
    crops.append((t,o))
# MỘT hệ số chung cho cả 6 bậc: bậc cao to hơn bậc thấp như thiết kế (cạnh dài nhất của bậc to nhất = 456)
k=456/max(max(o.size) for _,o in crops)
for t,o in crops:
    o=o.resize((max(1,round(o.width*k)),max(1,round(o.height*k))),Image.LANCZOS)
    cv=Image.new('RGBA',(512,512),(0,0,0,0));cv.paste(o,((512-o.width)//2,(512-o.height)//2),o)
    cv.save(f'src/ship118/tau{n}_{t}.png')
    if bt:cv.save(f'src/ship118/tau{n}_{t}_bt.png')
    print(t,o.size)
