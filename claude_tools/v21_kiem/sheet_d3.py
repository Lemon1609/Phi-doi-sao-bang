import sys,glob,os
from PIL import Image,ImageDraw
D='/tmp/e21t/d3'; OUT=sys.argv[1]; pre=sys.argv[2]
names=sorted(set(os.path.basename(p).rsplit('_',1)[0] for p in glob.glob(D+'/'+pre+'_*.webp') if '_i' not in os.path.basename(p)[-7:]))
keys=['0','1','2','tr0','tr1','tr2','ex0','ex1'] if pre=='st' else ['0','1','2','b0','b1','b2','wing','hit']
C=150; W=Image.new('RGB',(C*len(keys),C*len(names)),(18,22,40))
for r,n in enumerate(names):
  for c,k in enumerate(keys):
    p=f'{D}/{n}_{k}.webp'
    if not os.path.exists(p): continue
    im=Image.open(p).convert('RGBA'); im.thumbnail((C-6,C-6))
    W.paste(im,(c*C+(C-im.width)//2,r*C+(C-im.height)//2),im)
W.save(OUT,quality=85); print(names)
