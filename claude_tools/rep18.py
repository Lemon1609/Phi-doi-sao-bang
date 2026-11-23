# V309 L17 mục 4: áp thẳng vào HTML đã dựng phần sửa dan307 (khối này có rep của build nên va.py từ chối)
import sys,re
src,dst=sys.argv[1],sys.argv[2];s=open(src,encoding='utf-8').read()
S=open('src/dan307.js',encoding='utf-8').read()
a=" window.Dan307={CFG};\n})();"
add=S[S.index(" window.Dan307={CFG};"):S.rindex("})();")]
m=re.search(r'<script id="dan307-js">(.*?)</script>',s,re.S);blk=m.group(1)
if 'Dan307.hangar' not in blk:
  assert blk.count(" window.Dan307={CFG};")==1
  i=blk.index(" window.Dan307={CFG};");j=blk.index("})();",i)
  blk=blk[:i]+add+blk[j:]
  s=s[:m.start(1)]+blk+s[m.end(1):]

# V309 L17B: thumbnail chiến cơ lấy ảnh SHIP118 (khối có rep của build / tên khác)
for a,b in [("function shipThumb(i){const k=i+':'+craftN(i);if(TH[k])return TH[k];", "function shipThumb(i){const n17=(window.UI17!==false&&typeof window.SHIPCUR17==='function'&&SHIPCUR17(i));if(n17)return n17;/* V309 L17B: ảnh chiến cơ chuẩn SHIP118 */const k=i+':'+craftN(i);if(TH[k])return TH[k];"), ('function shipImg(i){if(TH[i])return TH[i];', "function shipImg(i){const n17=(window.UI17!==false&&typeof window.SHIPCUR17==='function'&&SHIPCUR17(i));if(n17)return n17;/* V309 L17B */if(TH[i])return TH[i];"), ('function shipArt(i){if(TH[i])return TH[i];', "function shipArt(i){const n17=(window.UI17!==false&&typeof window.SHIPCUR17==='function'&&SHIPCUR17(i));if(n17)return n17;/* V309 L17B */if(TH[i])return TH[i];")]:
  if b in s:continue
  assert s.count(a)==1,a[:50];s=s.replace(a,b)
open(dst,'w',encoding='utf-8').write(s);print('rep18 ok')
