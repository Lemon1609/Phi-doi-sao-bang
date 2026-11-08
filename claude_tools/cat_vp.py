# V153 · (nguyên liệu/đá tách theo cụm `groups` vì khoảng trống rộng làm `gaps` đặt 2 nhát vào cùng khe) · Cắt bảng tranh GPT Phần K (vật phẩm) thành tệp game.
# Dùng: python3 claude_tools/cat_vp.py <thư_mục_K1> <thư_mục_K2> <thư_mục_ra>
#  K1: mat_<alloy|crystal|circuit|plasma>.png (3 cấp) → ra/mat/<id>1..3.png (128)
#      stone_c.png (5) → ra/da/stone_c1..5.png (256) · stone_x.png (3) → ra/da/stone_x3..5.png (256)
#  K2: skin_bullet_N/icon.png → ra/trade/skin_bullet_N.png (256) · skin_bullet_N/dan.png (4 khung) → ra/trade/skin_dan_N.png (4 ô 64×128)
#      skin_frame_N/icon.png → ra/trade/skin_frame_N.png (256) · skin_frame_N/hieu_ung.png (4 khung, mỗi khung 2 nửa rời)
#        → ra/trade/skin_hieu_ung_N.png (4 ô 256×256, cắt theo 4 CỘT ĐỀU của vùng có hình, cùng khung cho cả 4 → không giật)
#      boom_skin_N.png (8 khung) → ra/trade/boom_skin_N.png (8 ô 128 = 1024×128), khung 8 giảm alpha còn 45%
import sys,os
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from cat_bo import gaps,groups,sheet,crop,fit
from PIL import Image
import numpy as np
def L(p):return Image.open(p).convert('RGBA')
def fade(cell,k):
    a=np.array(cell).astype(float);a[...,3]*=k;return Image.fromarray(a.astype('uint8'),'RGBA')
def even4(im,cw=256,ch=256,fill=.94):
    b=im.getchannel('A').point(lambda v:255 if v>10 else 0).getbbox();x0,y0,x1,y1=b;w=(x1-x0)/4
    fr=[im.crop((int(x0+i*w),y0,int(x0+(i+1)*w),y1)) for i in range(4)]
    k=min(cw*fill/fr[0].width,ch*fill/fr[0].height);out=Image.new('RGBA',(cw*4,ch),(0,0,0,0))
    for i,f in enumerate(fr):
        f=f.resize((max(1,round(f.width*k)),max(1,round(f.height*k))),Image.LANCZOS);out.alpha_composite(f,(i*cw+(cw-f.width)//2,(ch-f.height)//2))
    return out
def main():
    k1,k2,ra=sys.argv[1:4];done=[]
    for d in ['mat','da','trade']:os.makedirs(os.path.join(ra,d),exist_ok=True)
    for m in ['alloy','crystal','circuit','plasma']:
        for i,f in enumerate(groups(L(f'{k1}/mat_{m}.png'),3),1):fit(f,128,128,.9).save(f'{ra}/mat/{m}{i}.png');done.append(f'mat/{m}{i}')
    for i,f in enumerate(groups(L(f'{k1}/stone_c.png'),5),1):fit(f,256,256,.9).save(f'{ra}/da/stone_c{i}.png');done.append(f'da/stone_c{i}')
    for i,f in zip((3,4,5),groups(L(f'{k1}/stone_x.png'),3)):fit(f,256,256,.9).save(f'{ra}/da/stone_x{i}.png');done.append(f'da/stone_x{i}')
    for n in range(1,7):
        b=f'{k2}/skin_bullet_{n}';fit(L(b+'/icon.png'),256,256,.9).save(f'{ra}/trade/skin_bullet_{n}.png')
        sheet(gaps(L(b+'/dan.png'),4),64,128,fill=.94).save(f'{ra}/trade/skin_dan_{n}.png')
        f=f'{k2}/skin_frame_{n}';fit(L(f+'/icon.png'),256,256,.9).save(f'{ra}/trade/skin_frame_{n}.png')
        even4(L(f+'/hieu_ung.png')).save(f'{ra}/trade/skin_hieu_ung_{n}.png')
        s=sheet(gaps(L(f'{k2}/boom_skin_{n}.png'),8),128,128,fill=.96);last=s.crop((896,0,1024,128));s.paste(Image.new('RGBA',(128,128),(0,0,0,0)),(896,0));s.alpha_composite(fade(last,.45),(896,0));s.save(f'{ra}/trade/boom_skin_{n}.png')
        done+= [f'skin_bullet_{n}',f'skin_dan_{n}',f'skin_frame_{n}',f'skin_hieu_ung_{n}',f'boom_skin_{n}']
    print(len(done),'tệp')
if __name__=='__main__':main()
