# V2.4-A · ĐẾM VIỆC MỖI KHUNG theo mô-đun (không phụ thuộc máy đo): lệnh vẽ, diện tích tô, shadowBlur/filter lúc vẽ,
#  gradient/pattern/canvas tạo mới, + bố cục DOM (Layout/RecalcStyle) mỗi khung qua CDP. Kịch bản như do_phan24 (A quái+thiên thạch · B cảnh báo · C boss).
#  Dùng: python3 tests/dem_ve24.py <html tuyệt đối> [ra.json]
import sys,os,json,re,bisect,collections
from playwright.sync_api import sync_playwright
HTML=sys.argv[1];OUT=sys.argv[2] if len(sys.argv)>2 else None;ST=int(os.environ.get('ST','10'))
src=open(HTML,encoding='utf-8').read()
lines=[0];[lines.append(m.end()) for m in re.finditer('\n',src)]
spos=[(m.start(),m.group(1)) for m in re.finditer(r'<script id="([^"]+)"',src)];sp=[p for p,_ in spos]
def sid(line,col):
  off=lines[line-1]+col-1 if 0<line<=len(lines) else 0
  k=bisect.bisect_right(sp,off)-1;return spos[k][1] if k>=0 else '?'
HUD=os.environ.get('HUD','1')=='1'
SETUP="localStorage.setItem('saobang-gfx-v66','light');"+("localStorage.setItem('saobang-fps88',JSON.stringify({on:true,log:[]}));" if HUD else "")
_t193=open('/home/claude/phi-doi-sao-bang/claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
_argv=sys.argv;sys.argv=['x',HTML,'40'];exec(_t193);sys.argv=_argv
_t209=open('/home/claude/phi-doi-sao-bang/tests/v203_v212/t209.py').read();exec(_t209[_t209.find('def start'):_t209.find('with sync_playwright')])
INST=r"""(G)=>new Promise(res=>{const C=CanvasRenderingContext2D.prototype,g=ctx,rec={},cnt=k=>{const s=new Error().stack.split('\n');let m=null;for(let i=2;i<s.length;i++){m=s[i].match(/\.html[^:]*:(\d+):(\d+)\)?$/);if(m)break;}const key=m?m[1]+':'+m[2]:'?';return rec[key]||(rec[key]={})};
 const add=(o,k,v)=>{o[k]=(o[k]||0)+(v||1)};const W=g.canvas.width,H=g.canvas.height;const sv={};
 const wrapI=(obj,name,fn)=>{const o=obj[name];sv[name]=[obj,o];obj[name]=function(){fn.call(this,arguments);return o.apply(this,arguments)}};
 const area=(a)=>{if(a.length>=9)return Math.abs(a[7]*a[8]);if(a.length>=5)return Math.abs(a[3]*a[4]);const im=a[0];return (im.width||0)*(im.height||0)};
 const mark=(o)=>{if(g.shadowBlur>0)add(o,'shadow');if(g.filter&&g.filter!=='none')add(o,'filter');};
 for(const n of ['drawImage'])wrapI(g,n,function(a){if(this!==g)return;const o=cnt();add(o,'di');const tr=g.getTransform();add(o,'px',area(a)*Math.abs(tr.a*tr.d));mark(o)});
 for(const n of ['fill','stroke','fillText','strokeText','clip'])wrapI(g,n,function(a){if(this!==g)return;const o=cnt();add(o,n);mark(o)});
 wrapI(g,'fillRect',function(a){if(this!==g)return;const o=cnt();add(o,'fillRect');const tr=g.getTransform();add(o,'px',Math.abs(a[2]*a[3]*tr.a*tr.d));mark(o)});
 for(const n of ['createLinearGradient','createRadialGradient','createPattern'])wrapI(C,n,function(a){const o=cnt();add(o,n)});
 const ce=document.createElement;document.createElement=function(t){if(String(t).toLowerCase()==='canvas'){const o=cnt();add(o,'newCanvas')}return ce.apply(document,arguments)};
 const mut={};const nm=e=>e.id?('#'+e.id):(e.className&&typeof e.className==='string'?'.'+e.className.split(' ')[0]:e.tagName)+(e.parentElement&&e.parentElement.id?'<#'+e.parentElement.id:'');
 const mo=new MutationObserver(L=>{for(const m of L){const k=m.type+':'+(m.attributeName||'')+':'+nm(m.target);mut[k]=(mut[k]||0)+1}});mo.observe(document.documentElement,{subtree:true,attributes:true,childList:true,characterData:true});
 const an=document.getAnimations().filter(a=>a.playState==='running').map(a=>{const e=a.effect&&a.effect.target;let v=false;try{v=!!(e&&e.getClientRects().length)}catch{};return (a.animationName||a.constructor.name)+'@'+(e?nm(e):'?')+(v?'':'(ẩn)')});
 let fr=0;const f=()=>{fr++;if(fr<G)requestAnimationFrame(f);else{mo.disconnect();for(const k in sv){const [obj,o]=sv[k];obj[k]=o}document.createElement=ce;res({fr,rec,W,H,mut,an})}};requestAnimationFrame(f)})"""
with sync_playwright() as p:
  br=p.chromium.launch();_ctx=br.new_context();_ctx.add_init_script(SETUP)
  class _B:
    def new_page(self,**k):
      pg=_ctx.new_page();pg.set_viewport_size(k.get('viewport',{'width':393,'height':852}));return pg
  pg,errs,o=setup(_B(),'SS')
  pg.add_style_tag(content='#q307,#tutorial392{display:none!important}')
  for _k in range(3):
    pg.evaluate("(st)=>{const s=document.getElementById('mission-select');if(s&&![...s.options].some(o=>o.value==String(st))){const o=document.createElement('option');o.value=String(st);o.textContent='Ải '+st;s.appendChild(o);}try{Progress.canStart=()=>true}catch{}}",ST)
    start(pg,ST)
    if pg.evaluate("()=>mode")=='play':break
    print('thử vào lại',flush=True);pg.wait_for_timeout(1500)
  pg.evaluate("()=>{clearInterval(window.__hz);window.__iv24=setInterval(()=>{try{invuln=999;hp=maxHp;const d=document.getElementById('st80');if(d)d.hidden=true;window.__st80=0;}catch{}},200);}")
  pg.wait_for_timeout(3000)
  cdp=pg.context.new_cdp_session(pg);cdp.send('Performance.enable')
  def met():
    return {m['name']:m['value'] for m in cdp.send('Performance.getMetrics')['metrics']}
  R={}
  def phase(name,pre,G=90):
    pg.evaluate(pre);pg.wait_for_timeout(400)
    m0=met();r=pg.evaluate(INST,G);m1=met();fr=r['fr']
    agg=collections.defaultdict(lambda:collections.Counter())
    for k,v in r['rec'].items():
      ln,col=map(int,k.split(':')) if k!='?' else (0,0);s=sid(ln,col)
      for kk,vv in v.items():agg[s][kk]+=vv
    tot=collections.Counter()
    for s,c in agg.items():tot.update(c)
    big=sorted(((k,v) for k,v in r['rec'].items() if v.get('px',0)/fr>r['W']*r['H']*.25),key=lambda x:-x[1]['px'])
    for k,v in big[:16]:
      ln,col=map(int,k.split(':'));off=lines[ln-1]+col-1;print('   TÔ LỚN',sid(ln,col),round(v['px']/fr/(r['W']*r['H']),2),'màn |',src[off-60:off+120].replace('\n',' '),flush=True)
    per={s:{k:round(v/fr,1) for k,v in c.items()} for s,c in sorted(agg.items(),key=lambda x:-x[1]['px'])}
    dom={k:round((m1[k]-m0[k])/fr,3) for k in ('LayoutCount','RecalcStyleCount')}
    dom.update({k+'_ms':round((m1[k]-m0[k])/fr*1000,2) for k in ('LayoutDuration','RecalcStyleDuration','ScriptDuration','TaskDuration')})
    R[name]={'fr':fr,'tong':{k:round(v/fr,1) for k,v in tot.items()},'man_hinh_px':r['W']*r['H'],'dom':dom,'mo_dun':per}
    t=R[name]['tong'];print('\n=====',name,'khung',fr,'| tô ≈',round(t.get('px',0)/(r['W']*r['H']),1),'màn | drawImage',t.get('di'),'| fill',t.get('fill'),'stroke',t.get('stroke'),'text',t.get('fillText',0)+t.get('strokeText',0),'| shadow',t.get('shadow',0),'filter',t.get('filter',0),'| grad/pat/canvas mới',t.get('createLinearGradient',0)+t.get('createRadialGradient',0),t.get('createPattern',0),t.get('newCanvas',0),flush=True)
    print('  DOM/khung',dom,flush=True)
    mu=sorted(r['mut'].items(),key=lambda x:-x[1])[:16];print('  ĐỔI DOM/khung:',[(k,round(v/fr,2)) for k,v in mu],flush=True)
    an=collections.Counter(r['an']);print('  CSS ĐANG CHẠY (%d):'%len(r['an']),an.most_common(30),flush=True)
    for s,c in list(per.items())[:14]:print('  ',s,dict(c),flush=True)
    bad={s:{k:c[k] for k in c if k in('shadow','filter','createLinearGradient','createRadialGradient','createPattern','newCanvas')} for s,c in per.items()}
    print('  ĐẮT (shadow/filter/tạo mới mỗi khung):',{s:v for s,v in bad.items() if v},flush=True)
  phase('A · quái + thiên thạch',"()=>{try{L7309.start('rock')}catch(e){}}")
  phase('B · cảnh báo Boss + thiên thạch',"()=>{try{L7309.start('rock')}catch(e){};try{startBoss()}catch(e){}}",40)
  pg.wait_for_timeout(4000)
  phase('C · Boss',"()=>{}")
  if OUT:json.dump(R,open(OUT,'w'),ensure_ascii=False,indent=1)
  print('ERR',errs[:4])
