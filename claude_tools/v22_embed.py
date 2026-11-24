# V2.2: nhúng src/ui22img/*.webp → <script id="ui22-img">window.UI22_IMG={...}</script>
import os,base64,json
def ui22_script(R='.'):
    d=os.path.join(R,'src/ui22img');m={}
    for f in sorted(os.listdir(d)):
        if f.endswith('.webp'):m[f[:-5]]='data:image/webp;base64,'+base64.b64encode(open(os.path.join(d,f),'rb').read()).decode()
    return '<script id="ui22-img">window.UI22_IMG='+json.dumps(m)+';</script>'
def plume22_script(R='.'):
    """V2.2 · đuôi lửa ion-plasma: 4 sprite + THRUSTER_ANCHORS + plume22.js (bỏ qua khi dựng: PLUME22=0)"""
    if os.environ.get('PLUME22','1')=='0':return ''
    d={k:'data:image/webp;base64,'+base64.b64encode(open(os.path.join(R,f'src/plume22img/plume_{k}.webp'),'rb').read()).decode() for k in ('cyan','gold','crimson','void')}
    return ('<script id="plume22-img-js">window.PLUME22_IMG='+json.dumps(d,separators=(',',':'))+';window.THRUSTER_ANCHORS='+open(os.path.join(R,'src/plume22_anchors.json')).read().strip()+';</script>'
            '<script id="plume22-js">'+open(os.path.join(R,'src/plume22.js'),encoding='utf-8').read()+'</script>')
