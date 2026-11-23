# Ghép ảnh tổng hợp (≤4 màn/ảnh ngang, có nhãn) + xuất bảng kiểm kê icon & nút style cũ từ inv.json của cap_ui.py
# python3 make_report.py <thư mục ảnh+inv.json> <thư mục ra>
import sys,os,json
from PIL import Image,ImageDraw,ImageFont
IN,OUT=sys.argv[1],sys.argv[2];os.makedirs(OUT,exist_ok=True)
R=json.load(open(IN+'/inv.json'))
BO={1:'Sảnh & Bản đồ',2:'Kho & Nâng cấp',3:'Sức mạnh chuyên sâu',4:'Nhiệm vụ & Phúc lợi',5:'Cửa hàng & Phụ bản',6:'Trận đấu & Hệ thống'}
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',38);F2=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',26)
# đánh số màn trong từng bộ
cnt={};
for r in R:cnt[r['bo']]=cnt.get(r['bo'],0)+1;r['no']='%d.%d'%(r['bo'],cnt[r['bo']])
outs=[]
for bo in sorted(BO):
  L=[r for r in R if r['bo']==bo]
  for part in range(0,len(L),4):
    ch=L[part:part+4];W,H,G,HD=780,1688,24,96
    c=Image.new('RGB',(G+len(ch)*(W+G),HD+H+G),(8,18,36));d=ImageDraw.Draw(c)
    for k,r in enumerate(ch):
      x=G+k*(W+G);im=Image.open(IN+'/'+r['file']).convert('RGB');c.paste(im,(x,HD))
      d.rectangle([x,14,x+W,HD-10],fill=(18,58,110),outline=(156,196,234),width=2)
      d.text((x+18,24),r['no']+'  '+r['name'],font=F,fill=(255,224,138))
    fn='Bo%d_%s_%d.jpg'%(bo,BO[bo].replace(' & ','_').replace(' ','_'),part//4+1);c.save(OUT+'/'+fn,quality=86);outs.append(fn)
# ---- bảng kiểm kê ----
md=['# KIỂM KÊ UI · V309 sau Lượt 16','',
 'Bản chụp: `l16.html` (đã gồm 5 chỉnh UI Đá Nội Tại). Khung 390×844, DPR 2. Kích thước icon tính theo px CSS (×2 = px ảnh thật trên máy DPR 2).',
 'Cách quét: tự động trên DOM của lớp đang hiện trên cùng (bỏ phần bị lớp khác che). **Không quét được phần vẽ bằng canvas** (đạn, tàu, HUD trong trận vẽ canvas), các phần đó đánh giá bằng mắt trên ảnh.',
 'Ký hiệu loại: **SVG (img)** = ảnh SVG nhúng (phần lớn là bộ icon Chrome UI_ICONS của L15B/L16) · **SVG nội tuyến** = thẻ `<svg>` trong HTML · **SVG (nền CSS)** · **Ký tự** = ký hiệu chữ (★ ✦ ◈ ⬢ ➤ ✕ …) · **Emoji** = emoji hệ điều hành (hiển thị khác nhau giữa máy).','']
# tổng hợp toàn game theo icon (gộp trùng)
agg={}
for r in R:
  for i in (r['inv'].get('icons',[]) if isinstance(r['inv'],dict) else []):
    if i['w']==0:continue
    k=(i['type'],i['key']);a=agg.setdefault(k,{'type':i['type'],'key':i['key'],'sz':set(),'scr':[],'lab':set(),'n':0})
    a['sz'].add(i['w']);a['n']+=i['n'];a['lab'].add(i['label'][:26]);
    if r['no'] not in a['scr']:a['scr'].append(r['no'])
order={'Emoji':0,'Ký tự':1,'SVG (img)':2,'SVG nội tuyến':3,'SVG (nền CSS)':4}
md+=['## A. DANH SÁCH GỘP TOÀN GAME (để lọc icon cần vẽ lại 3D)','','| # | Loại | Icon | Cỡ hiển thị (px) | Số chỗ | Màn xuất hiện | Ngữ cảnh (ví dụ) |','|---|---|---|---|---|---|---|']
ag=sorted(agg.values(),key=lambda a:(order.get(a['type'],9),-len(a['scr']),a['key']))
for n,a in enumerate(ag,1):
  key=a['key'] if a['type'] in ('Emoji','Ký tự') or a['key'].startswith('UI_ICONS') else '(svg #'+a['key'][:6]+')'
  key=key.replace('|','\\|')
  md.append('| %d | %s | %s | %s | %d | %s | %s |'%(n,a['type'],key,'/'.join(str(x) for x in sorted(a['sz'])),a['n'],', '.join(a['scr'][:12])+(' …' if len(a['scr'])>12 else ''),'; '.join(sorted(a['lab']))[:70].replace('|','/')))
# nút cũ
nold=0
for title,flt in [('## B1. NÚT / KHUNG CÒN STYLE CŨ — chắc chắn (nền tím, skin tím hop307, nhãn có emoji)',lambda w:not w.startswith('bo tròn')),('## B2. THAM KHẢO — nút bo tròn lớn, không vát góc (nhiều chỗ là thiết kế chủ ý: avatar, mốc tròn, nút tròn sảnh) → anh chọn cái nào cần đổi',lambda w:w.startswith('bo tròn'))]:
  md+=['',title,'','| Màn | Nút / chữ | Cỡ (px) | Lý do |','|---|---|---|---|']
  for r in R:
    for o in (r['inv'].get('old',[]) if isinstance(r['inv'],dict) else []):
      ws=[w for w in o['why'] if flt(w)]
      if not ws:continue
      if title.startswith('## B1'):nold+=1
      md.append('| %s %s | %s | %d×%d | %s |'%(r['no'],r['name'],(o['text'] or o['el']).replace('|','/')[:34],o['w'],o['h'],'; '.join(ws)))
# theo màn
md+=['','## C. CHI TIẾT THEO MÀN','']
for r in R:
  inv=r['inv'] if isinstance(r['inv'],dict) else {}
  md.append('### %s %s  ·  `%s`'%(r['no'],r['name'],r['file']))
  if r.get('log'):md.append('- ghi chú chụp: %s'%r['log'])
  if r.get('errs'):md.append('- lỗi JS lúc chụp: %s'%r['errs'])
  md.append('- ảnh raster (WebP/PNG, coi là đạt): %s · canvas: %s'%(inv.get('raster','?'),inv.get('canvas','?')))
  ic=sorted([i for i in inv.get('icons',[]) if i['w']>0],key=lambda i:(order.get(i['type'],9),i['key']))
  if ic:
    md.append('');md.append('| Loại | Icon | px | ×lần | Ngữ cảnh |');md.append('|---|---|---|---|---|')
    for i in ic:
      key=i['key'] if i['type'] in ('Emoji','Ký tự') or i['key'].startswith('UI_ICONS') else '(svg #'+i['key'][:6]+')'
      md.append('| %s | %s | %d×%d | %d | %s |'%(i['type'],key.replace('|','\\|'),i['w'],i['h'],i['n'],i['label'].replace('|','/')[:40]))
  else:md.append('- không có icon SVG/ký tự trên lớp này')
  md.append('')
s=sum(1 for a in ag if a['type']=='Emoji');t=sum(1 for a in ag if a['type']=='Ký tự');v=sum(1 for a in ag if a['type'].startswith('SVG'))
md.insert(5,'**Tóm tắt:** %d màn · %d emoji khác nhau · %d ký tự-icon khác nhau · %d icon SVG khác nhau · %d chỗ nút/khung style cũ chắc chắn (B1).'%(len(R),s,t,v,nold));md.insert(6,'')
open(OUT+'/KIEM_KE_UI_V309_L16.md','w').write('\n'.join(md))
print(outs);print('emoji',s,'kytu',t,'svg',v,'old',nold)
