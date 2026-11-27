from PIL import Image,ImageDraw,ImageFont
F='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';FR='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
f=ImageFont.truetype(F,20);ft=ImageFont.truetype(F,30);fs=ImageFont.truetype(FR,18)
C='/tmp/r27/capu2b/';W,Hh=393,852
def lab(im,t,c='#e6f0ff'):
    o=Image.new('RGB',(im.width,im.height+34),'#0b1020');o.paste(im,(0,34));ImageDraw.Draw(o).text((8,6),t,font=f,fill=c);return o
cols=[('1_chienco','Túi đồ · Chiến cơ'),('2_giap','Túi đồ · Giáp'),('3_tenlua','Túi đồ · Tên lửa'),('4_taucon','Túi đồ · Tàu con'),('5_phicong','Phi công · hàng chân dung'),('6_phicong_cuoi','Phi công · dòng chỉ số + luật đội')]
o=Image.new('RGB',(6*(W+10)+10,56+Hh+44+900),'#05070f');d=ImageDraw.Draw(o)
d.text((16,12),'T28 · V2.3 U2: thẻ Túi đồ mật độ cao (4 tab) + danh sách phi công (nhánh v23-ui-meta, bản thử)',font=ft,fill='#ffd36b')
y=56
for i,(p,t) in enumerate(cols):o.paste(lab(Image.open(C+p+'.png').convert('RGB'),t,'#7CFF6B'),(10+i*(W+10),y))
y+=Hh+44+10
Z=[('2_giap',(14,100,380,186),'Phóng to: SSS · sao dọc · +2 · ổ khóa · xích Chiến Thần · Đặc kỹ'),('2_giap',(14,616,380,702),'Cộng điểm +10% (chỉ món Siêu Tần Tuần)'),('1_chienco',(14,100,380,186),'Chiến cơ ghép Chiến Thần: ĐANG DÙNG · SS · tấm vàng'),
   ('5_phicong',(36,145,393,268),'Hàng phi công: Lv · Mảnh thật · tấm trạng thái · chấm đỏ'),('6_phicong_cuoi',(48,440,360,466),'Dòng chỉ số: "· 0" lẻ → "Mảnh 0"'),('6_phicong_cuoi',(34,645,360,680),'Luật đội (số từ mã: Pilot67.SUB = 5 %)')]
x=10;yy=y;cw=(6*(W+10))//3-10
for k,(p,b,t) in enumerate(Z):
    im=Image.open(C+p+'.png').convert('RGB').crop(b);s=cw/im.width;im=im.resize((cw,int(im.height*s)),Image.LANCZOS)
    if k==3:x=10;yy=ymax+10
    o.paste(lab(im,t,'#FFD54F'),(x,yy));ymax=max(yy+im.height+34,ymax if k else 0);x+=cw+10
yy=ymax+14
for l in open('/tmp/r27/t28.txt').read().split('\n'):d.text((16,yy),l,font=fs,fill='#cfe3ff');yy+=27
o=o.crop((0,0,o.width,yy+10));o.save('/home/claude/out/V22/T28_v23_u2_the_do_phicong.jpg',quality=86);print(o.size)
