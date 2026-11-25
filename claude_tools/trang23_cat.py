# V2.2.3 · ghép 13 tranh Trắng mới (GPT, nền đen) → src/ship309/tau<N>_thuong.png + _thuong_bt.png (512)
# Tách nền: flood-fill TỪ MÉP ẢNH vào vùng đen tuyền (max kênh ≤ 10) — KHÔNG khóa màu đen toàn ảnh, nên thép tối trong thân giữ đục 100 %.
#   Thêm: lỗ đen kín (max kênh trung bình ≤ 6, ≥ 1.500 px trên ảnh gốc) cũng là nền (vd khe giữa vòng và thân tàu 12) — in danh sách để kiểm.
#   Viền mềm 1–2 px: alpha = min(đục, mờ σ .8) + điểm ảnh tối sát nền (≤ 2 px) trong suốt theo độ sáng (không quầng đen).
# Cỡ: cạnh dài khung bao đục = K × cạnh dài khung bao đục bậc Tím cùng tàu (K mặc định 0,80) · đặt tâm khung chữ nhật bao vào tâm khung 512 (thẳng trục giữa).
# Dùng: python3 claude_tools/trang23_cat.py <thư mục ảnh> <bảng json {"tệp": số tàu}> [--cu <thư mục sao lưu ảnh cũ>]
import sys,os,json,shutil,numpy as np
from PIL import Image,ImageEnhance
from scipy import ndimage as nd
K=float(os.environ.get('K','0.80'));HOLE=int(os.environ.get('HOLE','1500'))
D=sys.argv[1];MAP=json.load(open(sys.argv[2]));CU=sys.argv[sys.argv.index('--cu')+1] if '--cu' in sys.argv else None
S='src/ship309/'
def cut(p):
  a=np.asarray(Image.open(p).convert('RGB')).astype(np.float32);mx=a.max(2)
  bg=mx<=int(os.environ.get('BG','10'));lab,n=nd.label(bg);edge=np.unique(np.r_[lab[0],lab[-1],lab[:,0],lab[:,-1]]);edge=edge[edge>0]
  ext=np.isin(lab,edge);holes=[]
  sz=nd.sum(bg,lab,range(1,n+1))
  for i in range(1,n+1):
    if i in edge:continue
    m=lab==i
    if sz[i-1]>=HOLE and mx[m].mean()<=6:ext|=m;holes.append(int(sz[i-1]))
  hard=(~ext).astype(np.float32)
  soft=np.minimum(hard,nd.gaussian_filter(hard,.8))
  d=nd.distance_transform_edt(~ext)  # khoảng cách tới nền
  lum=a.mean(2);near=(d<=2)&(~ext)
  soft[near]=np.minimum(soft[near],np.clip(lum[near]/70,0,1))
  rgba=np.dstack([a,soft*255]).clip(0,255).astype(np.uint8);im=Image.fromarray(rgba,'RGBA')
  ys,xs=np.where(soft>.06);return im.crop((xs.min(),ys.min(),xs.max()+1,ys.max()+1)),holes
def area(im):return (np.asarray(im)[...,3]>110).sum()
def side(im):
  ys,xs=np.where(np.asarray(im)[...,3]>110);return max(xs.max()-xs.min(),ys.max()-ys.min())+1
def sang(im,b):
  rgb,al=im.convert('RGB'),im.getchannel('A');rgb=ImageEnhance.Brightness(rgb).enhance(b);rgb.putalpha(al);return rgb
log={}
for f,n in MAP.items():
  im,holes=cut(os.path.join(D,f));tim=Image.open(f'{S}tau{n}_tim.png')
  k=K*side(tim)/side(im)
  w,h=round(im.width*k),round(im.height*k);s=min(1,470/max(w,h));w,h=round(w*s),round(h*s)
  im=im.resize((w,h),Image.LANCZOS);c=Image.new('RGBA',(512,512),(0,0,0,0));c.paste(im,((512-w)//2,(512-h)//2),im)
  r=side(c)/side(tim)
  if CU:
    os.makedirs(CU,exist_ok=True)
    for suf in ('','_bt'):
      src=f'{S}tau{n}_thuong{suf}.png'
      if os.path.exists(src) and not os.path.exists(f'{CU}/tau{n}_thuong{suf}.png'):shutil.copy(src,CU)
  c.save(f'{S}tau{n}_thuong.png');sang(c,1.22).save(f'{S}tau{n}_thuong_bt.png')
  log[n]={'f':f,'wh':[w,h],'r':round(r,3),'holes':holes};print(n,f,[w,h],'r',round(r,3),'lỗ',holes)
json.dump(log,open('/home/claude/t23in/log.json','w'),indent=1)
