# V2.2: nhúng src/ui22img/*.webp → <script id="ui22-img">window.UI22_IMG={...}</script>
import os,base64,json
def ui22_script(R='.'):
    d=os.path.join(R,'src/ui22img');m={}
    for f in sorted(os.listdir(d)):
        if f.endswith('.webp'):m[f[:-5]]='data:image/webp;base64,'+base64.b64encode(open(os.path.join(d,f),'rb').read()).decode()
    return '<script id="ui22-img">window.UI22_IMG='+json.dumps(m)+';</script>'
