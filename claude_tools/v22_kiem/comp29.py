from PIL import Image,ImageDraw,ImageFont
F='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';FR='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
f=ImageFont.truetype(F,20);ft=ImageFont.truetype(F,30);fs=ImageFont.truetype(FR,18)
C='/tmp/r27/capu3f/';W,Hh=393,852
def lab(im,t,c='#e6f0ff'):
    o=Image.new('RGB',(im.width,im.height+34),'#0b1020');o.paste(im,(0,34));ImageDraw.Draw(o).text((8,6),t,font=f,fill=c);return o
cols=[('1_sanh','(1) Sảnh · 2 lối tắt cột trái'),('2_diemdanh','(2) ĐIỂM DANH TÍCH LŨY'),('3_thamhiem','(3) THÁM HIỂM TINH TẾ'),('4_thekycuu','(4) THẺ KỲ CỰU'),('5_canquet','(4b) CÀN QUÉT NHANH · ải 3★')]
L=open('/tmp/r27/t29.txt').read().split('\n')
o=Image.new('RGB',(5*(W+10)+10,56+Hh+44+len(L)*27+20),'#05070f');d=ImageDraw.Draw(o)
d.text((16,12),'T29 · V2.3 U3: Điểm danh tích lũy + rương mốc · Thám hiểm Tinh tế · Thẻ Kỳ Cựu (nhánh v23-ui-meta, bản thử)',font=ft,fill='#ffd36b')
for i,(p,t) in enumerate(cols):o.paste(lab(Image.open(C+p+'.png').convert('RGB'),t,'#7CFF6B'),(10+i*(W+10),56))
yy=56+Hh+44+8
for l in L:d.text((16,yy),l,font=fs,fill='#cfe3ff');yy+=27
o.save('/home/claude/out/V22/T29_v23_u3_diemdanh_thamhiem_thekycuu.jpg',quality=86);print(o.size)
