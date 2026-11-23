# Vá HTML đã dựng theo git diff của src/*.js (từng khối dòng thay đổi), + SAFE42 + chèn v2142.  python3 vadiff.py <vào> <ra>
import sys,subprocess,difflib,re,os
R='/home/claude/phi-doi-sao-bang';os.chdir(R)
h=open(sys.argv[1],encoding='utf-8').read()
files=[f for f in subprocess.check_output(['git','diff','--name-only','HEAD','--','src'],text=True).split() if f.endswith('.js') and f!='src/v2142.js']
for f in files:
  old=subprocess.check_output(['git','show','HEAD:'+f],text=True).splitlines(True);new=open(f,encoding='utf-8').read().splitlines(True)
  sm=difflib.SequenceMatcher(a=old,b=new,autojunk=False)
  for tag,i1,i2,j1,j2 in sm.get_opcodes():
    if tag=='equal':continue
    a=''.join(old[max(0,i1-1):i2]) ;b=''.join(new[max(0,j1-1):j2]) # kèm 1 dòng ngữ cảnh trước
    if i1==i2 and i1==0:a=''.join(old[0:1]);b=''.join(new[0:j2])+old[0]
    n=h.count(a)
    if n!=1:print('!!',f,tag,i1,'count',n);continue
    h=h.replace(a,b);print('ok',f,tag,i1)
exec(open(R+'/claude_tools/v2142_rep.py').read())
for a,b in PAIRS:
  assert h.count(a)==1,a[:50];h=h.replace(a,b)
n42=len(re.findall(r'env\(\s*safe-area-inset-top\s*(?:,\s*0(?:px)?\s*)?\)',h));h=re.sub(r'env\(\s*safe-area-inset-top\s*(?:,\s*0(?:px)?\s*)?\)','var(--sat42,0px)',h);print('SAFE42',n42)
assert h.count('</body>')==1
h=h.replace('</body>','<style id="v2142ui-css">'+open('src/v2142ui.css',encoding='utf-8').read().replace('@V ','html.v2142.ui42 body'+':not(#_v42)'*72+' ')+'</style></body>')
h=h.replace('<head>','<head><script id="v2142pre-js">'+open('src/v2142pre.js',encoding='utf-8').read()+'</script>',1)
h=h.replace('</body>','<script id="v2142-js">'+open('src/v2142.js',encoding='utf-8').read()+'</script></body>')
open(sys.argv[2],'w',encoding='utf-8').write(h);print('MB',round(len(h)/1e6,2))
