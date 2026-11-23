# inject.py <vào> <ra> tên_mô_đun ...  : chèn/thay <script id="tên-js"> nội dung src/tên.js trước </body>
import sys
h=open(sys.argv[1],encoding='utf-8').read()
for m in sys.argv[3:]:
    js=open('/home/claude/nguon/src/%s.js'%m,encoding='utf-8').read();tag='<script id="%s-js">'%m
    if tag in h:
        i=h.find(tag);j=h.find('</script>',i);h=h[:i]+tag+js+h[j:]
    else:
        assert h.count('</body>')==1;h=h.replace('</body>',tag+js+'</script></body>')
    print('chèn',m)
open(sys.argv[2],'w',encoding='utf-8').write(h)
