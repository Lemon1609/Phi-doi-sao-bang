import sys,os
from PIL import Image,ImageDraw,ImageFont
D='/home/claude/nguon/src/evo21img';A='/home/claude/anh/e21/d3'
try:F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',22);f=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',16)
except:F=f=ImageFont.load_default()
def checker(w,h,s=16):
  im=Image.new('RGB',(w,h),(40,44,60));d=ImageDraw.Draw(im)
  for y in range(0,h,s):
    for x in range(0,w,s):
      if (x//s+y//s)%2:d.rectangle([x,y,x+s-1,y+s-1],fill=(62,68,90))
  return im
def zoom(keys,title):
  ims=[Image.open(f'{D}/{k}.webp').convert('RGBA') for k in keys];ims=[i.resize((i.width*2,i.height*2),Image.LANCZOS) for i in ims]
  W=sum(i.width for i in ims)+20*(len(ims)+1);H=max(i.height for i in ims)+60
  c=checker(W,H);d=ImageDraw.Draw(c);d.text((10,8),title,font=f,fill=(255,230,150));x=20
  for i in ims:c.paste(i,(x,50),i);x+=i.width+20
  return c
def build(grid,zs,shots,title,out):
  G=Image.open(grid);parts=[G]+[zoom(k,t) for k,t in zs]
  S=[Image.open(f'{A}/{s}.png').convert('RGB') for s,_ in shots];S=[s.resize((s.width*2//3,s.height*2//3)) for s in S]
  row=Image.new('RGB',(sum(s.width for s in S)+10*(len(S)+1),S[0].height+40),(14,16,28));d=ImageDraw.Draw(row);x=10
  for s,(n,lab) in zip(S,shots):row.paste(s,(x,34));d.text((x,8),lab,font=f,fill=(200,230,255));x+=s.width+10
  parts.append(row)
  W=max(p.width for p in parts);H=sum(p.height for p in parts)+50+12*len(parts)
  out_im=Image.new('RGB',(W,H),(10,12,22));d=ImageDraw.Draw(out_im);d.text((12,12),title,font=F,fill=(255,220,120));y=50
  for p in parts:out_im.paste(p,(0,y));y+=p.height+12
  out_im.save(out,quality=86);print(out,out_im.size)
B='/home/claude/out/V21';os.makedirs(B,exist_ok=True)
build('/tmp/d3_st.jpg',[
 (['st_sss_thunder_singularity_0','st_sss_thunder_singularity_1','st_sss_thunder_singularity_2'],'×2 · ssstl02 Lôi Uyên — lỗ vòng tím (cả 3 mốc)'),
 (['st_sss_spiral_stellar_0','st_sss_spiral_stellar_1','st_sss_spiral_stellar_2'],'×2 · ssstl03 — khe nhỏ (cả 3 mốc)'),
 (['st_sss_judgement_swarm_2','st_sss_devour_chrono_m_2','st_sss_monarch_inferno_2'],'×2 · ssstl05 +10 hào quang · ssstl06 +10 vòng đồng hồ · ssstl07 +10 mảnh bay rời')],
 [('sss_inferno_cryo_0','inferno_cryo +0'),('sss_thunder_singularity_2','thunder +10'),('sss_comet_nova_1s','comet +3 · Bạo Tẩu'),('sss_monarch_inferno_2','monarch +10')],
 'T9 · 7 tên lửa SSS · cột: +0..2 / +3..9 / +10 · vệt lửa ×3 · nổ thường / nổ lớn (+10, Bạo Tẩu)',B+'/T9_7ssstl_than_fx.jpg')
build('/tmp/d3_sw.jpg',[
 (['sw_sss_halo_carrier_0','sw_sss_halo_carrier_1','sw_sss_halo_carrier_2'],'×2 · ssswing05 Thánh Hoàn — lòng vòng hào quang (cả 3 mốc)'),
 (['sw_sss_monarch_rail_0','sw_sss_monarch_rail_1','sw_sss_monarch_rail_2'],'×2 · ssswing07 — lòng vòng hào quang (cả 3 mốc)')],
 [('sss_halo_carrier_2','halo_carrier +10'),('sss_solar_gravity_1','solar_gravity +3'),('sss_monarch_rail_2s','monarch_rail +10 · Bạo Tẩu'),('sss_rail_disc_1s','rail_disc +3 · Bạo Tẩu')],
 'T10 · 7 tàu con SSS · cột: thân +0..2 / +3..9 / +10 · đạn ×3 · cánh mini · bùng trúng',B+'/T10_7ssswing_than_fx_tran.jpg')
