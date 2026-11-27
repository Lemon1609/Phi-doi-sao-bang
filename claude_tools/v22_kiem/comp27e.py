from PIL import Image,ImageDraw,ImageFont
F='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';FR='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
f=ImageFont.truetype(F,20);ft=ImageFont.truetype(F,30);fs=ImageFont.truetype(FR,18)
def lab(im,t,c='#e6f0ff'):
    o=Image.new('RGB',(im.width,im.height+34),'#0b1020');o.paste(im,(0,34));ImageDraw.Draw(o).text((8,6),t,font=f,fill=c);return o
C='/tmp/r27/capef/';W,Hh=393,852
cols=[(C+'1_thienlam.png','ĐỘI PHI CÔNG · Thiên Lam'),(C+'2_lamphuong.png','ĐỘI PHI CÔNG · Lâm Phương'),(C+'3_mocmien.png','ĐỘI PHI CÔNG · Mộc Miên'),(C+'4_tiemnang.png','PHI CÔNG & TIỀM NĂNG')]
CW=600
o=Image.new('RGB',(4*(W+10)+10+CW+10,56+Hh+44+420),'#05070f');d=ImageDraw.Draw(o)
d.text((16,12),'T27e · V2.3 U1e: mặt phi công rõ, không bị che / cắt đầu (nhánh v23-ui-meta, bản thử)',font=ft,fill='#ffd36b')
y=56
for i,(p,t) in enumerate(cols):o.paste(lab(Image.open(p).convert('RGB'),t,'#7CFF6B'),(10+i*(W+10),y))
x0=10+4*(W+10);yy=y
old=Image.open('/tmp/r27/capf/2_doi.png').convert('RGB').crop((30,250,365,520));new=Image.open(C+'1_thienlam.png').convert('RGB').crop((30,300,365,545))
for im,t,c in [(old,'T27d (cũ): ĐỘI CỘNG đè tóc, đỉnh đầu chạm mép','#9fb3cc'),(new,'T27e (mới): ĐỘI CỘNG dưới khung, đầu cách 13 px','#FFD54F')]:
    im=im.resize((CW,int(im.height*CW/im.width)));o.paste(lab(im,t,c),(x0,yy));yy+=im.height+44
yy=max(y+Hh+44,yy)+10
for l in open('/tmp/r27/t27e.txt').read().split('\n'):d.text((16,yy),l,font=fs,fill='#cfe3ff');yy+=27
o.save('/home/claude/out/V22/T27e_phicong_ro_mat.jpg',quality=88);print(o.size)
