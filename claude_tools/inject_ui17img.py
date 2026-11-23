# chèn/thay <script id="ui17-img-js">window.UI17_IMG={...}</script> từ src/ui17img/*.webp (bản HTML đã dựng)
import sys,os,glob,base64,json,re
src,dst=sys.argv[1],sys.argv[2];s=open(src,encoding='utf-8').read()
D={os.path.splitext(os.path.basename(p))[0]:'data:image/webp;base64,'+base64.b64encode(open(p,'rb').read()).decode() for p in sorted(glob.glob('src/ui17img/*.webp'))}
tag='<script id="ui17-img-js">window.UI17_IMG='+json.dumps(D)+';</script>'
s2,n=re.subn(r'<script id="ui17-img-js">.*?</script>',lambda m:tag,s,flags=re.S)
if not n:s2=s.replace('</body>',tag+'</body>',1)
open(dst,'w',encoding='utf-8').write(s2);print('ui17 img',len(D),'thay' if n else 'chèn')
