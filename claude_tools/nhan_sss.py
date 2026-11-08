# V161 · nhận 1 gói SSS của GPT: giải nén → đo độ nét → cắt (cat_sss) → ảnh soát /tmp/claude-0/soat_<mã>.png
# Dùng (từ V83_nguon): python3 claude_tools/nhan_sss.py <zip>
import sys,os,zipfile,subprocess,glob,json
from PIL import Image,ImageDraw,ImageFont
import numpy as np
z=sys.argv[1];sid=os.path.basename(z).split('SSS_',1)[1].rsplit('.zip',1)[0];d=f'/home/claude/work/sss_mau/{sid}';os.makedirs(d,exist_ok=True)
zipfile.ZipFile(z).extractall(d)
subs=[x for x in glob.glob(d+'/*') if os.path.isdir(x)]
if not glob.glob(d+'/icon1.png') and subs:d=subs[0]
for p in sorted(glob.glob(d+'/*.png')):
    im=Image.open(p);a=np.asarray(im.convert('RGB')).astype(float);W,H=im.size
    e=round(float(np.abs(np.asarray(im.convert('RGB').resize((int(W/1.5),int(H/1.5)),Image.LANCZOS).resize((W,H),Image.LANCZOS)).astype(float)-a).mean()),2)
    print(os.path.basename(p),im.size,e)
for t in glob.glob(d+'/*.txt'):print(open(t,encoding='utf8').read()[:1500])
subprocess.run(['python3','claude_tools/cat_sss.py',d,sid],check=True)
o=f'src/sss_art/{sid}/';F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',16)
out=Image.new('RGBA',(1600,1150),(14,18,30,255));dr=ImageDraw.Draw(out);dr.text((1300,10),sid,font=F,fill=(255,220,140))
for i in range(3):
    if os.path.exists(o+f'icon{i+1}.png'):
        im=Image.open(o+f'icon{i+1}.png');out.alpha_composite(im.resize((220,220),Image.LANCZOS),(10+i*230,10));out.alpha_composite(im.resize((96,96),Image.LANCZOS),(720+i*106,10))
if os.path.exists(o+'pod.png'):
    pod=Image.open(o+'pod.png')
    for i in range(4):
        c=pod.crop((i*128,0,(i+1)*128,128));out.alpha_composite(c,(720+i*140,120));out.alpha_composite(c.resize((48,48),Image.LANCZOS),(720+i*140,250))
y=310
for k in ['chan','kn','pn','ps','in','is','tk']:
    if os.path.exists(o+k+'.png'):
        im=Image.open(o+k+'.png');im.thumbnail((1250,120));out.alpha_composite(im,(10,y));dr.text((1270,y+40),k,font=F,fill=(255,255,255));y+=im.height+8
x=1340
for k in ['mz','tr','g_beam_normal','g_beam_super']:
    if os.path.exists(o+k+'.png'):im=Image.open(o+k+'.png');im.thumbnail((110,300));out.alpha_composite(im,(x,330));x+=115
out.save(f'/tmp/claude-0/soat_{sid}.png');print('soat',f'/tmp/claude-0/soat_{sid}.png')
