# V309 L17: áp thẳng các sửa nhỏ vào HTML đã dựng (khối có rep của build nên va.py từ chối)
import sys
src,dst=sys.argv[1],sys.argv[2];s=open(src,encoding='utf-8').read()
R=[("function artOf(k,m){if(k==='craft'){const s=shipThumb(m|0);","function artOf(k,m,t){if(k==='craft'){const s=(window.UI17!==false&&typeof window.SHIPART17==='function'&&SHIPART17(m|0,t))||shipThumb(m|0);/* V309 L17: ảnh chiến cơ chuẩn SHIP118 thay atlas cũ */"),
 ("artOf(c.k,c.m)","artOf(c.k,c.m,c.t)"),
 ("return {invested:it=>{try{return invested(it);}catch{return 0;}},","return {cur:()=>cur,mode:()=>mode,get:id=>get(id),render:()=>{try{render();}catch{}},/* V309 L17 */invested:it=>{try{return invested(it);}catch{return 0;}},")]
for a,b in R:
  n=s.count(a);assert n==1,(n,a[:60]);s=s.replace(a,b)
open(dst,'w',encoding='utf-8').write(s);print('rep17 ok')
