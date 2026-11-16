# V307: tách nền đen bộ UI GPT -> RGBA, cắt sát, đổi cỡ, ghi vào src/ui306n (giữ tên cũ để CSS cũ chạy tiếp). Chỉ giữ alpha phần ngoài khung (vùng nối với mép); trong khung giữ đặc.
import sys,numpy as np
from PIL import Image
from scipy import ndimage as ndi
SRC=sys.argv[1];OUT=sys.argv[2]
def key(f):
    a=np.array(Image.open(f).convert('RGB')).astype(np.float32);m=a.max(2)
    low=m<34;lab,n=ndi.label(low)
    edge=set(lab[0].tolist())|set(lab[-1].tolist())|set(lab[:,0].tolist())|set(lab[:,-1].tolist());edge.discard(0)
    out=np.isin(lab,list(edge))
    al=np.where(out,np.clip((m-5)/70,0,1),1.0)
    al=np.maximum(al,0.0001)
    rgb=np.where(out[...,None],np.clip(a/np.maximum(al[...,None],.02),0,255),a)
    # viền mềm
    A=(al*255).astype(np.uint8);im=np.dstack([rgb.astype(np.uint8),A])
    return Image.fromarray(im,'RGBA')
def crop(im,th=14):
    A=np.array(im)[...,3];ys,xs=np.where(A>th);return im.crop((xs.min(),ys.min(),xs.max()+1,ys.max()+1))
def fit(im,w=None,h=None):
    if w: h=round(im.height*w/im.width)
    else: w=round(im.width*h/im.height)
    return im.resize((w,h),Image.LANCZOS)
def dark(im,k=.78,dy=0):
    a=np.array(im).astype(np.float32);a[...,:3]*=k;r=Image.fromarray(a.astype(np.uint8),'RGBA');return r
def sq(im,s):
    c=Image.new('RGBA',(max(im.size),)*2,(0,0,0,0));c.paste(im,((c.width-im.width)//2,(c.height-im.height)//2));return c.resize((s,s),Image.LANCZOS)
K={}
for n in ['nut_vang','nut_vang_nhan','nut_khoa_xam','nut_xanh','nut_luc','nut_do','che_do_vang','che_do_tim','khung_bang','o_icon_thuong','o_icon_chon','thanh_tai_nguyen','thanh_tien_do','thanh_tien_do_lap_mau_tham_khao','o_vat_pham_xam','o_vat_pham_luc','o_vat_pham_lam','o_vat_pham_tim','o_vat_pham_vang']:
    K[n]=crop(key(f'{SRC}/{n}.png'));print(n,K[n].size)
def sv(n,im):im.save(f'{OUT}/{n}.png',optimize=True)
W=520
sv('nut_vang',fit(K['nut_vang'],W));sv('nut_do_cam',fit(K['nut_vang'],W))
sv('nut_vang_nhan',fit(dark(K['nut_vang'],.8),W));sv('nut_do_cam_nhan',fit(dark(K['nut_vang'],.8),W))
sv('nut_xanh',fit(K['nut_xanh'],W));sv('nut_xanh_nhan',fit(dark(K['nut_xanh'],.8),W))
sv('nut_luc',fit(K['nut_luc'],W));sv('nut_luc_nhan',fit(dark(K['nut_luc'],.8),W));sv('nut_do',fit(K['nut_do'],W))
for n in ['nut_vang_khoa','nut_xanh_khoa','nut_do_cam_khoa','nut_xam']:sv(n,fit(K['nut_khoa_xam'],W))
sv('che_do_vang',fit(K['che_do_vang'],720));sv('che_do_tim',fit(K['che_do_tim'],720))
sv('khung_bang',fit(K['khung_bang'],600))
for n,m in [('xam','o_vat_pham_xam'),('luc','o_vat_pham_luc'),('lam','o_vat_pham_lam'),('tim','o_vat_pham_tim'),('vang','o_vat_pham_vang')]:sv('o_vat_pham_'+n,sq(K[m],256))
sv('o_vat_pham_chon',sq(K['o_icon_chon'],256));sv('o_vat_pham_trong',sq(K['o_icon_thuong'],256))
tr=fit(K['thanh_tien_do'],600);sv('thanh_tien_do',tr)
fl=K['thanh_tien_do_lap_mau_tham_khao'];c=Image.new('RGBA',tr.size,(0,0,0,0))
fl=fl.resize((round(tr.width*.97),round(tr.height*.5)),Image.LANCZOS);c.paste(fl,((tr.width-fl.width)//2,(tr.height-fl.height)//2));sv('thanh_tien_do_lap_day',c)
sv('thanh_tai_nguyen',fit(K['thanh_tai_nguyen'],484))
