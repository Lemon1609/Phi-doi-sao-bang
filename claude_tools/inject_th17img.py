# chèn/thay <script id="th17-img-js"> NGAY SAU khối art86-art: ghi đè 6 khóa ART86_ASSETS bằng tranh thần hóa mới (khi window.TH17!==false)
import sys,os,glob,base64,json,re
src,dst=sys.argv[1],sys.argv[2];s=open(src,encoding='utf-8').read()
D={os.path.splitext(os.path.basename(p))[0]:'data:image/webp;base64,'+base64.b64encode(open(p,'rb').read()).decode() for p in sorted(glob.glob('src/th17img/*.webp'))}
tag='<script id="th17-img-js">window.TH17_IMG='+json.dumps(D)+';if(window.TH17!==false&&typeof ART86_ASSETS!=="undefined")Object.assign(ART86_ASSETS,window.TH17_IMG);</script>'
s,n=re.subn(r'<script id="th17-img-js">.*?</script>',lambda m:tag,s,flags=re.S)
if not n:
  i=s.index('<script id="art86-art">');j=s.index('</script>',i)+9;s=s[:j]+tag+s[j:]
open(dst,'w',encoding='utf-8').write(s);print('th17 img',len(D),'thay' if n else 'chèn')
