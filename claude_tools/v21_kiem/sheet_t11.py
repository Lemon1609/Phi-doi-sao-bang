from PIL import Image,ImageDraw,ImageFont
A='/home/claude/anh/e21/led';B='/home/claude/anh/e21/t11'
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',24);f=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',17)
def lab(im,t):
  c=Image.new('RGB',(im.width,im.height+30),(10,12,22));c.paste(im,(0,30));ImageDraw.Draw(c).text((6,6),t,font=f,fill=(200,230,255));return c
def row(items,gap=12):
  H=max(i.height for i in items);r=Image.new('RGB',(sum(i.width for i in items)+gap*(len(items)+1),H),(10,12,22));x=gap
  for i in items:r.paste(i,(x,0));x+=i.width+gap
  return r
top=[]
for t,n in [(0,'+0'),(1,'+3'),(2,'+10')]:
  k=Image.open(f'{A}/kho_{t}.png').crop((0,160,393,560));top.append(lab(k,f'Kho 2.1 · SSS {n}'))
for t,n in [(0,'+0'),(2,'+10')]:
  h=Image.open(f'{A}/hop_{t}.png').crop((0,140,393,760)).resize((258,407));top.append(lab(h,f'Xưởng SSS · {n}'))
Z=lambda p,s=1.25:(lambda im:im.resize((int(im.width*s),int(im.height*s)),Image.LANCZOS))(Image.open(p).convert('RGB'))
bot=[lab(Z(f'{B}/s13_thuong_off.png'),'#13 thường · LED tắt'),lab(Z(f'{B}/s13_thuong.png'),'#13 thường · LED bật'),lab(Z(f'{B}/s13_bt.png'),'#13 Bạo Tẩu · LED'),
     lab(Z(f'{B}/ct2_chienco_off.png',1.1),'CT#2 chiến cơ · tắt'),lab(Z(f'{B}/ct2_chienco.png',1.1),'CT#2 chiến cơ · LED')]
bot2=[lab(Z(f'{B}/ct2_robot_off.png',1),'CT#2 robot +10 · tắt'),lab(Z(f'{B}/ct2_robot.png',1),'CT#2 robot +10 · LED'),lab(Z(f'{B}/ct2_ult.png',1),'Tuyệt kỹ E · bùng 0,4 s'),lab(Z(f'{B}/s13_gear.png',1),'Tàu con + tên lửa SSS +10 · LED')]
rows=[row(top),row(bot),row(bot2)]
W=max(r.width for r in rows);H=sum(r.height for r in rows)+60+20*len(rows)
o=Image.new('RGB',(W,H),(6,8,16));d=ImageDraw.Draw(o);d.text((14,14),'T11 · EVO21_LED neon + Kho / Xưởng SSS theo mốc +0 / +3 / +10',font=F,fill=(255,220,120));y=60
for r in rows:o.paste(r,(0,y));y+=r.height+20
o.save('/home/claude/out/V21/T11_led_neon_kho.jpg',quality=86);print(o.size)
