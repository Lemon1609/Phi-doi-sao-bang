# Bảng kiểm T15 · đuôi lửa ion-plasma đồng bộ (ảnh chụp trong trận / Kho / Sảnh, phóng to cận đuôi)
import sys
from PIL import Image,ImageDraw,ImageFont
P='/home/claude/pl22/';OUT=sys.argv[1] if len(sys.argv)>1 else 'docs_claude/T15_duoi_lua_dong_bo.jpg'
FB=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',22);FS=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',15)
CW,CH=270,290
def cell(path,box=None,zoom=1.5):
  im=Image.open(path).convert('RGB')
  if box:im=im.crop(box)
  w,h=im.size;k=min(CW/w,(CH-30)/h,zoom*9);return im.resize((int(w*k),int(h*k)),Image.LANCZOS)
ROWS=[
 ('1 · CHIẾN CƠ — 1 họng / 2 họng / 3 họng, Thường & Bạo Tẩu (trong trận)',[
  ('t15/s0_tim_0.png','Tàu 1 · 1 họng · Thường'),('t15/s0_tim_1.png','Tàu 1 · Bạo Tẩu ×1,45'),('t15/s7_tim_0.png','Tàu 8 · 2 họng · Thường'),('t15/s7_tim_1.png','Tàu 8 · 2 họng · Bạo Tẩu'),('t15/s10_tim_0.png','Tàu 11 · 3 họng (cánh tối)'),('t15/s12_ss_1.png','Tàu 13 SS · 3 họng · Bạo Tẩu')]),
 ('2 · TÀU CON — TRƯỚC (tam giác vàng phẳng) → SAU (luồng ion .45×), trận + Kho',[
  ('off2/s7_tim_0.png','TRƯỚC · trận (tàu 8)'),('t15/s7_tim_0.png','SAU · trận (tàu 8)'),('off2/s0_tim_0.png','TRƯỚC · trận (tàu 1)'),('t15/s0_tim_0.png','SAU · trận (tàu 1)'),('au/png/05.png|100,600,680,1120','SAU · Kho đồ (bệ)'),('au/png/02.png|190,560,590,1080','SAU · Sảnh · xem trước Bạo Tẩu')]),
 ('3 · CHIẾN THẦN (dạng chiến cơ) & ROBOT — neo đo trên ô atlas đang vẽ',[
  ('t15/ct1_0_f.png','Mẫu 2 · chiến cơ +0'),('t15/ct1_0_r.png','Mẫu 2 · robot +0'),('t15/ct3_10_f.png','Mẫu 4 · chiến cơ +10'),('t15/ct3_10_r.png','Mẫu 4 · robot +10'),('t15/ct5_3_r.png','Mẫu 6 · robot +3'),('t15/ct6_10_r.png','Mẫu 7 · robot +10')]),
]
W=6*CW+40;H=70+len(ROWS)*(CH+40)+10
sh=Image.new('RGB',(W,H),(6,12,28));d=ImageDraw.Draw(sh)
d.text((20,18),'T15 · Đuôi lửa ion-plasma đồng bộ (4 sprite cyan / gold / crimson / void · THRUSTER_ANCHORS · vẽ sau thân)',font=FB,fill=(245,194,73))
y=62
for title,cs in ROWS:
  d.text((20,y),title,font=FS,fill=(140,210,255));y+=24
  for j,(p,lab) in enumerate(cs):
    box=None
    if '|' in p:p,b=p.split('|');box=tuple(map(int,b.split(',')))
    im=cell(P+p,box);x=20+j*CW;sh.paste(im,(x+(CW-10-im.width)//2,y));d.rectangle((x,y,x+CW-10,y+CH-30),outline=(40,90,150))
    d.text((x+4,y+CH-26),lab,font=FS,fill=(230,240,255))
  y+=CH+16
sh.save(OUT,quality=88);print(OUT,sh.size)
