# V2.2.1 · ĐƯA ẢNH RA TỆP NGOÀI cho bản APK (www/): chạy SAU split.py.
#   python3 claude_tools/ext22.py <www> [--min 2048]
# Mọi chuỗi data:image/(webp|png|jpeg|gif|svg+xml);base64,… dài ≥ --min ký tự trong index.html và a/*.js|css
#   → ghi www/assets/<sha1 12>.<đuôi> (gộp ảnh trùng), thay bằng đường dẫn tương đối:
#      index.html / a/*.js  → "assets/<băm>.<đuôi>"  (JS phân giải theo địa chỉ trang)
#      *.css (dời từ a/ lên gốc) → "assets/<băm>.<đuôi>"
# Ảnh nhỏ (< --min) giữ nội tuyến (tránh hàng nghìn yêu cầu tệp nhỏ). Âm thanh base64 thô không bị đụng.
# Ghi báo cáo www/ext22.json. Lưu ý: kiểm bằng máy chủ http (file:// làm canvas getImageData bị "bẩn").
import os,re,sys,base64,hashlib,json,glob
W=sys.argv[1];MIN=2048
if '--min' in sys.argv:MIN=int(sys.argv[sys.argv.index('--min')+1])
os.makedirs(os.path.join(W,'assets'),exist_ok=True)
RX=re.compile(r'data:image/(webp|png|jpeg|jpg|gif|svg\+xml);base64,([A-Za-z0-9+/]+={0,2})')
EXT={'webp':'webp','png':'png','jpeg':'jpg','jpg':'jpg','gif':'gif','svg+xml':'svg'}
seen={};st={'files':0,'refs':0,'uniq':0,'bytes_b64':0,'bytes_bin':0,'kept_small':0}
def proc(path,prefix):
  s=open(path,encoding='utf-8').read();b0=len(s.encode('utf-8'))
  def sub(m):
    b=m.group(2)
    if len(b)<MIN:st['kept_small']+=1;return m.group(0)
    h=hashlib.sha1(b.encode()).hexdigest()[:12];e=EXT[m.group(1)];fn=h+'.'+e
    if fn not in seen:
      raw=base64.b64decode(b);open(os.path.join(W,'assets',fn),'wb').write(raw);seen[fn]=len(raw);st['uniq']+=1;st['bytes_bin']+=len(raw)
    st['refs']+=1;st['bytes_b64']+=len(b);return prefix+'assets/'+fn
  s2=RX.sub(sub,s)
  if s2!=s:open(path,'w',encoding='utf-8').write(s2);st['files']+=1
  return b0,len(s2.encode('utf-8'))
sz={}
for p in [os.path.join(W,'index.html')]+sorted(glob.glob(os.path.join(W,'a','*.js'))):sz[os.path.relpath(p,W)]=proc(p,'')
# CSS ở a/ dời lên gốc www/: biến CSS chứa url(assets/…) (khai báo trong index hoặc gán bằng JS) được Chrome phân giải theo VỊ TRÍ TỆP CSS DÙNG BIẾN
#  → để mọi tệp CSS ngang hàng index.html thì 'assets/…' luôn đúng.
ix=os.path.join(W,'index.html');H=open(ix,encoding='utf-8').read()
for p in sorted(glob.glob(os.path.join(W,'a','*.css'))):
  fn=os.path.basename(p);assert H.count('href="a/'+fn+'"')==1,fn;H=H.replace('href="a/'+fn+'"','href="'+fn+'"');os.replace(p,os.path.join(W,fn))
if 'charset' not in H[:1024]:H='<meta charset="UTF-8">'+H   # split.py bỏ <head> gốc → máy chủ không ghi charset sẽ đọc latin1 (WebView APK vẫn đúng, nhưng thêm cho chắc)
open(ix,'w',encoding='utf-8').write(H)
for p in sorted(glob.glob(os.path.join(W,'*.css'))):sz[os.path.relpath(p,W)]=proc(p,'')
st['code_before']=sum(a for a,b in sz.values());st['code_after']=sum(b for a,b in sz.values())
json.dump(st,open(os.path.join(W,'ext22.json'),'w'),indent=1)
print(json.dumps(st))
