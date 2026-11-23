# va.py <vào> <ra> id=tệp ...   thay nội dung <script id="id"> bằng src/tệp ; chỉ khi bản trong HTML == bản gốc lưu ở /home/claude/goc/<tệp> (an toàn trước rep của build)
import sys,os
SRC='/home/claude/nguon/src'
h=open(sys.argv[1],encoding='utf-8').read()
for a in sys.argv[3:]:
    id_,f=a.split('=')
    tag='style' if f.endswith('.css') else 'script'
    i=h.find('<%s id="%s"'%(tag,id_)); assert i>=0,id_
    assert h.find('<%s id="%s"'%(tag,id_),i+1)<0,'trùng '+id_
    j=h.find('>',i)+1;k=h.find('</%s>'%tag,j)
    old=h[j:k];goc='/home/claude/goc/'+f
    if os.path.exists(goc) and old.strip()!=open(goc,encoding='utf-8').read().strip(): sys.exit('KHÁC bản gốc (build có rep?): '+id_)
    new=open(os.path.join(SRC,f),encoding='utf-8').read()
    h=h[:j]+new+h[k:];print('thay',id_,len(old),'->',len(new))
open(sys.argv[2],'w',encoding='utf-8').write(h)
