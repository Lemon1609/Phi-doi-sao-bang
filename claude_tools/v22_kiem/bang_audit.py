# Ghép 3 tấm UI_AUDIT_1..3 (3×3, mỗi ô 560 px) + bảng kiểm md từ thư mục của audit_ui.py
# python3 claude_tools/v22_kiem/bang_audit.py <thư mục audit> <thư mục ra>
import sys,os,json
from PIL import Image,ImageDraw,ImageFont
A,O=sys.argv[1],sys.argv[2];os.makedirs(O,exist_ok=True)
K=json.load(open(A+'/kiem.json'))
FB='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';FR='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
f=lambda s,b=True:ImageFont.truetype(FB if b else FR,s)
PW,PH=560,1212;PAD=18;LH=44;SH=30;TOP=118
SHEETS=[(1,'UI_AUDIT_1_SANH_KHO','RÀ SOÁT GIAO DIỆN 1/3 · SẢNH, KHO & PHÁT TRIỂN',['01','02','03','04','05','06','07','08','09']),
        (2,'UI_AUDIT_2_HE_THONG_CUA_HANG','RÀ SOÁT GIAO DIỆN 2/3 · HỆ THỐNG & NÂNG CẤP',['10','11','12','13','14','15','16','17','18']),
        (3,'UI_AUDIT_3_PHU_TRO_TRAN_DAU','RÀ SOÁT GIAO DIỆN 3/3 · MENU PHỤ & TRONG / SAU TRẬN',['19','20','21','22','23','24','25','26','27'])]
def summ(k):
  r=K.get(k);
  if not r:return '— chưa chụp',(160,160,160)
  p=[]
  if r['ov']:p.append(f"{len(r['ov'])} nút tràn vùng an toàn")
  if r['of']:p.append(f"{len(r['of'])} chữ tràn")
  if r['rd']:p.append(f"{len(r['rd'])} nút bo tròn cũ")
  if r['sh']:p.append('khung sáng cũ')
  if r['sl']:p.append('thanh trượt mặc định')
  if r['st']:p.append(f"{r['st']} sao ★")
  if r['im']:p.append(f"{len(r['im'])} ảnh hỏng")
  if r['js']:p.append(f"{len(r['js'])} lỗi JS")
  if r['miss']:p.append('không mở được')
  return ('⚠ '+' · '.join(p),(255,170,60)) if p else ('✓ đạt 4 tiêu chí',(110,231,160))
def panel(k):
  if k=='27':
    a=Image.open(A+'/png/27a.png').convert('RGB').resize((PW//2-3,PH//2*1)) if os.path.exists(A+'/png/27a.png') else None
    S=Image.new('RGB',(PW,PH),'#05070f')
    for i,n in enumerate(['27a','27b']):
      if os.path.exists(f'{A}/png/{n}.png'):im=Image.open(f'{A}/png/{n}.png').convert('RGB').resize((PW//2-3,int((PW//2-3)*1688/780)));S.paste(im,(i*(PW//2+3),(PH-im.size[1])//2))
    return S
  p=f'{A}/png/{k}.png'
  return Image.open(p).convert('RGB').resize((PW,PH)) if os.path.exists(p) else Image.new('RGB',(PW,PH),'#222')
LAB={k:v['lab'] for k,v in K.items()};LAB['27']='Kết quả · CHIẾN THẮNG | THẤT BẠI'
for n,fn,title,ids in SHEETS:
  W=3*PW+4*PAD;H=TOP+3*(LH+PH+SH+PAD)+PAD
  S=Image.new('RGB',(W,H),'#070d1c');d=ImageDraw.Draw(S)
  d.text((PAD,18),title,font=f(36),fill='#ffd23f')
  d.text((PAD,68),'Bản dựng nhánh v22-dang-lam + đồng bộ U22 · 390×844 DPR2 · vạch đỏ = vùng an toàn giả (trên 34 px, dưới 20 px) · chưa xuất bản',font=f(19,False),fill='#9fb6d6')
  for i,k in enumerate(ids):
    x=PAD+(i%3)*(PW+PAD);y=TOP+(i//3)*(LH+PH+SH+PAD)
    d.rectangle([x-2,y-2,x+PW+1,y+LH+PH+SH+1],outline='#1f3a66',width=2)
    d.rectangle([x,y,x+PW-1,y+LH-1],fill='#0c1a33')
    d.text((x+10,y+8),k,font=f(26),fill='#ffd23f');d.text((x+62,y+11),LAB.get(k,k)[:40],font=f(21),fill='#e6f0ff')
    S.paste(panel(k),(x,y+LH))
    t,c=summ(k) if k!='27' else (lambda a,b:((a[0]+'  |  '+b[0]) if a[0]!=b[0] else a[0],a[1] if a[1]!=(110,231,160) else b[1]))(summ('27a'),summ('27b'))
    d.rectangle([x,y+LH+PH,x+PW-1,y+LH+PH+SH-1],fill='#0a1428');d.text((x+10,y+LH+PH+5),t[:62],font=f(16),fill=c)
  S.save(f'{O}/{fn}.jpg',quality=88);print(fn,S.size)
# bảng kiểm
L=['| # | Màn | Tràn vùng an toàn | Chữ tràn | Nút bo tròn cũ / khung sáng / thanh trượt / ★ | Ảnh hỏng / lỗi JS |','|---|---|---|---|---|---|']
for k in sorted(K):
  r=K[k];c3=[]
  if r['rd']:c3.append('bo tròn: '+', '.join(r['rd'][:3]))
  if r['sh']:c3.append('khung sáng: '+', '.join(r['sh'][:2]))
  if r['sl']:c3.append('thanh trượt mặc định')
  if r['st']:c3.append(f"{r['st']} ★")
  L.append(f"| {k} | {r['lab']} | {', '.join(r['ov'][:4]) or '—'} | {', '.join(r['of'][:4]) or '—'} | {'; '.join(c3) or '—'} | {(', '.join(r['im'][:2])+' '+' / '.join(r['js'][:2])).strip() or '—'}{(' · KHÔNG MỞ ĐƯỢC: '+', '.join(r['miss'])) if r['miss'] else ''} |")
open(f'{O}/UI_AUDIT_bang_kiem.md','w').write('\n'.join(L)+'\n');print('bang ok')
