import json,sys
L=[json.loads(l) for l in open(sys.argv[1]) if l.startswith('{')]
d={}
for x in L:d.setdefault(x['sid'],{})[x['co']]=x['dm']
for s,v in sorted(d.items()):print('tàu',s+1,v.get(True),v.get(False),round(v.get(True,0)/max(1,v.get(False,1)),2) if False in v else '')
