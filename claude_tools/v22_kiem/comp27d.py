from PIL import Image,ImageDraw,ImageFont
F='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';FR='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
f=ImageFont.truetype(F,20);ft=ImageFont.truetype(F,30);fs=ImageFont.truetype(FR,18)
def lab(im,t,c='#e6f0ff'):
    o=Image.new('RGB',(im.width,im.height+34),'#0b1020');o.paste(im,(0,34));ImageDraw.Draw(o).text((8,6),t,font=f,fill=c);return o
A='/tmp/r27/after2/';C='/tmp/r27/capf/'
W,Hh=390,844;CW=820
cols=[('/tmp/r27/cap3/5_pilot.png','T27c (cũ) · ĐỘI PHI CÔNG','#9fb3cc'),(C+'2_doi.png','T27d (mới) · ĐỘI PHI CÔNG','#7CFF6B'),
      ('/tmp/r27/after/18.png','T27c (cũ) · PHI CÔNG & TIỀM NĂNG','#9fb3cc'),(A+'18.png','T27d (mới) · PHI CÔNG & TIỀM NĂNG','#7CFF6B')]
o=Image.new('RGB',(4*(W+10)+10+CW+10,56+Hh+44+560),'#05070f');d=ImageDraw.Draw(o)
d.text((16,12),'T27d · V2.3 U1d: sửa 2 màn phi công + căn lề tiêu đề / nút cánh (nhánh v23-ui-meta, bản thử)',font=ft,fill='#ffd36b')
y=56
for i,(p,t,c) in enumerate(cols):
    im=Image.open(p).convert('RGB').resize((W,Hh));o.paste(lab(im,t,c),(10+i*(W+10),y))
x0=10+4*(W+10);yy=y
def crop(src,a,b,t):
    global yy
    im=Image.open(src).convert('RGB');k=im.width/390
    c=im.crop((0,int(a*k),im.width,int(b*k)));c=c.resize((CW,int(c.height*CW/c.width)))
    o.paste(lab(c,t,'#FFD54F'),(x0,yy));yy+=c.height+44
crop(A+'07.png',30,92,'Cận cảnh · tiêu đề TÚI ĐỒ (chừa mũi cánh, × trong ô phải)')
crop(A+'08.png',30,92,'Cận cảnh · tiêu đề CƯỜNG HÓA · NÂNG CẤP')
crop(C+'2_doi.png',10,62,'Cận cảnh · tiêu đề ĐỘI PHI CÔNG')
crop(A+'18.png',30,100,'Cận cảnh · tiêu đề PHI CÔNG & TIỀM NĂNG (bỏ tiêu đề lặp)')
crop(A+'01.png',722,844,'Cận cảnh · Sảnh: chữ VÔ TẬN / CHIẾN ĐẤU giữa lõi kính')
yy=max(y+Hh+44,yy)+10
for l in open('/tmp/r27/t27d.txt').read().split('\n'):d.text((16,yy),l,font=fs,fill='#cfe3ff');yy+=27
o.save('/home/claude/out/V22/T27d_sua_phicong_va_canle.jpg',quality=88);print(o.size)
