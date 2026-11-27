from PIL import Image,ImageDraw,ImageFont
F='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';FR='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
f=ImageFont.truetype(F,20);ft=ImageFont.truetype(F,30);fs=ImageFont.truetype(FR,18)
def lab(im,t,c='#e6f0ff'):
    o=Image.new('RGB',(im.width,im.height+34),'#0b1020');o.paste(im,(0,34));ImageDraw.Draw(o).text((8,6),t,font=f,fill=c);return o
B='/tmp/r26/after_png4/png/';A='/tmp/r26/after_b/'
items=[('01','Sảnh'),('05','Kho (Xưởng)'),('07','Túi đồ'),('08','Cường hóa')]
W,Hh=390,844;CW=820
o=Image.new('RGB',(4*(W+10)+10+CW+10,56+2*(Hh+44)+330),'#05070f');d=ImageDraw.Draw(o)
d.text((16,12),'T27b · V2.3 U1b: nút kim loại 3D + dọn thanh Kho (nhánh v23-ui-meta, bản thử)',font=ft,fill='#ffd36b')
y=56
for r,(P,tag,col) in enumerate([(B,'T27 (cũ)','#9fb3cc'),(A,'T27b (mới)','#7CFF6B')]):
    for i,(fn,t) in enumerate(items):
        im=Image.open(P+fn+'.png').convert('RGB').resize((W,Hh));o.paste(lab(im,tag+' · '+t,col),(10+i*(W+10),y+r*(Hh+44)))
# cận cảnh từ ảnh mới (780x1688)
x0=10+4*(W+10);yy=y
def crop(fn,a,b,t):
    global yy
    im=Image.open(A+fn+'.png').convert('RGB');k=im.width/390
    c=im.crop((0,int(a*k),im.width,int(b*k)));c=c.resize((CW,int(c.height*CW/c.width)))
    o.paste(lab(c,t,'#FFD54F'),(x0,yy));yy+=c.height+44
crop('01',735,840,'Cận cảnh · Sảnh: bệ kim loại + VÔ TẬN / CHIẾN ĐẤU')
crop('05',640,844,'Cận cảnh · Kho: dải lối tắt + ô khóa + thanh đáy 1 dòng (lam ngọc)')
crop('07',720,844,'Cận cảnh · Túi đồ: 3 nút ngọc lục + tab đáy thép (tab chọn viền vàng)')
crop('08',50,108,'Cận cảnh · Cường hóa: nút phụ thép ĐỔI MÓN + tab')
yy=y+2*(Hh+44)+10
for l in open('/tmp/r26/t27b.txt').read().split('\n'):d.text((16,yy),l,font=fs,fill='#cfe3ff');yy+=27
o.save('/home/claude/out/V22/T27b_nut_3d_dep.jpg',quality=88);print(o.size)
