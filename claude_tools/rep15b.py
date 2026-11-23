# L15B · thay hàm frame() của gear-fx-v3 trong HTML đã dựng (build có sửa khối này nên không thay cả khối)
import sys
h=open(sys.argv[1],encoding='utf-8').read()
a="function frame(c,s,key,n,fw,fh,x,y,w,h,a=1,angle=0){const im=s.assets[key];if(!im)return;c.save();c.globalAlpha*=a;c.translate(x,y);c.rotate(angle);c.drawImage(im,n*fw,0,fw,fh,-w/2,-h/2,w,h);c.restore()}"
src=open('/home/claude/nguon/src/gear_fx_v3.js',encoding='utf-8').read()
i=src.find("function frame(c,s,key,n,fw,fh,");j=src.find("return k;}",i)+len("return k;}")
b=src[i:j]
assert h.count(a)==1,h.count(a);h=h.replace(a,b);open(sys.argv[2],'w',encoding='utf-8').write(h);print('ok rep15b')
