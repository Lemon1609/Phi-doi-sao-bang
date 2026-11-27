from PIL import Image,ImageDraw,ImageFont
F='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';FR='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
f=ImageFont.truetype(F,20);ft=ImageFont.truetype(F,30);fs=ImageFont.truetype(FR,18)
def lab(im,t,c='#e6f0ff'):
    o=Image.new('RGB',(im.width,im.height+34),'#0b1020');o.paste(im,(0,34));ImageDraw.Draw(o).text((8,6),t,font=f,fill=c);return o
B='/tmp/r26/after_b/';A='/tmp/r27/after/'
items=[('01','Sảnh'),('05','Kho (Xưởng)'),('07','Túi đồ'),('08','Cường hóa')]
W,Hh=390,844;CW=820
o=Image.new('RGB',(4*(W+10)+10+CW+10,56+2*(Hh+44)+300),'#05070f');d=ImageDraw.Draw(o)
d.text((16,12),'T27c · V2.3 U1c: nút tấm kim loại từ ảnh 90339 (nhánh v23-ui-meta, bản thử)',font=ft,fill='#ffd36b')
y=56
for r,(P,tag,col) in enumerate([(B,'T27b (cũ)','#9fb3cc'),(A,'T27c (mới)','#7CFF6B')]):
    for i,(fn,t) in enumerate(items):
        im=Image.open(P+fn+'.png').convert('RGB').resize((W,Hh));o.paste(lab(im,tag+' · '+t,col),(10+i*(W+10),y+r*(Hh+44)))
x0=10+4*(W+10);yy=y
def crop(fn,a,b,t,x=(0,390)):
    global yy
    im=Image.open(A+fn+'.png').convert('RGB');k=im.width/390
    c=im.crop((int(x[0]*k),int(a*k),int(x[1]*k),int(b*k)));c=c.resize((CW,int(c.height*CW/c.width)))
    o.paste(lab(c,t,'#FFD54F'),(x0,yy));yy+=c.height+44
crop('01',722,844,'Cận cảnh · Sảnh: 3 lối tắt tấm lam + VÔ TẬN / CHIẾN ĐẤU tấm cánh')
crop('05',612,844,'Cận cảnh · Kho: CỘNG HƯỞNG 1 dòng + 5 lối tắt cùng icon + thanh đáy')
crop('07',700,795,'Cận cảnh · Túi đồ: 3 nút tấm lục (PHÂN GIẢI 1 dòng) + hàng #1D54B0')
crop('07',30,92,'Cận cảnh · thanh tiêu đề tấm bạc: TÚI ĐỒ')
crop('08',30,92,'Cận cảnh · thanh tiêu đề tấm bạc: CƯỜNG HÓA · NÂNG CẤP (ĐỔI MÓN tấm thép)')
crop('18',30,100,'Cận cảnh · thanh tiêu đề tấm bạc: PHI CÔNG & TIỀM NĂNG')
yy=y+2*(Hh+44)+10
for l in open('/tmp/r27/t27c.txt').read().split('\n'):d.text((16,yy),l,font=fs,fill='#cfe3ff');yy+=27
o.save('/home/claude/out/V22/T27c_nut_3d_plate.jpg',quality=88);print(o.size)
