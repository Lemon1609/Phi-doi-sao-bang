import sys
h=open(sys.argv[1],encoding='utf-8').read()
for f in ['co309.js','dan307.js','wing309.js','rob309.js','v121.js','dan299.js','hop309.js','tb309.js','sss_e3.js','ui309.js','music96.js','l6309.js']:
    a=open('/home/claude/goc/'+f,encoding='utf-8').read().strip(); b=open('/home/claude/nguon/src/'+f,encoding='utf-8').read().strip()
    n=h.count(a); assert n==1,(f,n); h=h.replace(a,b)
open(sys.argv[2],'w',encoding='utf-8').write(h); print('ok')
