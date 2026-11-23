# Vá nhanh HTML đã dựng: thay khối mô-đun theo bản HEAD → bản mới; chèn mô-đun mới trước </body>
import sys,subprocess
import os
R=os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
src,out=sys.argv[1],sys.argv[2];mods=sys.argv[3:]
h=open(src,encoding='utf-8').read()
for m in mods:
    new=open(f'{R}/src/{m}.js',encoding='utf-8').read()
    try:old=subprocess.run(['git','-C',R,'show',f'0ec531c:src/{m}.js'],capture_output=True,text=True,check=True).stdout
    except Exception:old=None
    if old and old in h:
        assert h.count(old)==1,m;h=h.replace(old,new);print('thay',m)
    elif old:
        print('KHONG KHOP',m);sys.exit(1)
    else:
        i=h.rfind('</body>');h=h[:i]+f'<script id="{m}-js">\n'+new+'\n</script>\n'+h[i:];print('chen',m)
import importlib.util
sp=importlib.util.spec_from_file_location('e',f'{R}/claude_tools/v22_embed.py');em=importlib.util.module_from_spec(sp);sp.loader.exec_module(em)
if 'v22' in mods and 'id="ui22-img"' not in h:
    i=h.find('<script id="v22-js">');h=h[:i]+em.ui22_script(R)+'\n'+h[i:];print('anh ui22')
ns={};exec(open(f'{R}/claude_tools/v22_rep.py').read(),ns)
for a,b in ns['PAIRS22']:
    n=h.count(a)
    if n!=1:print('REP',n,a[:70]);sys.exit(1)
    h=h.replace(a,b)
print('rep22',len(ns['PAIRS22']))
open(out,'w',encoding='utf-8').write(h)
