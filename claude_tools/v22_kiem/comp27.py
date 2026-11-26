from PIL import Image,ImageDraw,ImageFont
F='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';FR='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
f=ImageFont.truetype(F,20);ft=ImageFont.truetype(F,30);fs=ImageFont.truetype(FR,18);fb=ImageFont.truetype(F,24)
def lab(im,t,c='#e6f0ff'):
    o=Image.new('RGB',(im.width,im.height+34),'#0b1020');o.paste(im,(0,34));ImageDraw.Draw(o).text((8,6),t,font=f,fill=c);return o
B='/tmp/r26/before_png/';A='/tmp/r26/after_png4/png/';C='/tmp/r26/u1f/'
items=[('01','Sảnh'),('05','Kho (Xưởng)'),('07','Túi đồ'),('08','Cường hóa')]
W,Hh=390,844
cols=6;o=Image.new('RGB',(cols*(W+10)+10,56+2*(Hh+34+10)+460),'#05070f');d=ImageDraw.Draw(o)
d.text((16,12),'T27 · V2.3 U1: màu tươi kiểu CCHT · Sảnh/Kho sống · Kho cổ điển · KHÓA TRANG BỊ (nhánh v23-ui-meta, bản thử)',font=ft,fill='#ffd36b')
y=56
for r,(P,tag,col) in enumerate([(B,'TRƯỚC','#9fb3cc'),(A,'SAU','#7CFF6B')]):
    for i,(fn,t) in enumerate(items):
        im=Image.open(P+fn+'.png').convert('RGB').resize((W,Hh));o.paste(lab(im,tag+' · '+t,col),(10+i*(W+10),y+r*(Hh+44)))
# cột phải: cận cảnh khóa
for j,(fn,t) in enumerate([('2_kho','SAU · Kho: 4 chỉ số + khóa'),('3b_tui_khoa','SAU · Túi đồ: ổ khóa vàng')]):
    im=Image.open(C+fn+'.png').convert('RGB').resize((W,Hh));o.paste(lab(im,t,'#FFD54F'),(10+(4+j)*(W+10),y))
im=Image.open(C+'2_kho.png').convert('RGB')
cr=im.crop((0,int(im.height*.10),int(im.width*.5),int(im.height*.33))).resize((W,int(W*(.23*im.height)/(.5*im.width))))
o.paste(lab(cr,'Phóng to · ô chỉ số góc trên trái','#5EE4FF'),(10+4*(W+10),y+Hh+44))
cr=im.crop((0,int(im.height*.76),im.width,int(im.height*.94))).resize((W,int(W*(.18*im.height)/im.width)))
o.paste(lab(cr,'Phóng to · lối tắt + ô có khóa / MAX','#5EE4FF'),(10+5*(W+10),y+Hh+44))
yy=y+2*(Hh+44)+10
for l in open('/tmp/r26/t27.txt').read().split('\n'):d.text((16,yy),l,font=fs,fill='#cfe3ff');yy+=27
o.save('/home/claude/out/V22/T27_v23_u1_sanh_xuong_song.jpg',quality=88);print(o.size)
