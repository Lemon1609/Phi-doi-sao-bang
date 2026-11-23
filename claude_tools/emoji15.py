# quét ký hiệu/emoji hiển thị trên các màn (DOM), in đếm + ngữ cảnh
import sys,os,json
os.chdir('/home/claude/nguon')
src=open('claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
HTML=sys.argv[1];sys.argv=['x',HTML,'160'];exec(src)
SCAN="""()=>{const R=/[\\u2190-\\u2BFF\\u2600-\\u27BF\\u{1F000}-\\u{1FAFF}\\u25C8\\u2B22]/gu;const out={};const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
 while(n=w.nextNode()){const p=n.parentElement;if(!p||p.closest('script,style,#perf15'))continue;if(!p.getClientRects().length)continue;const cs=getComputedStyle(p);if(cs.visibility==='hidden'||cs.opacity==='0')continue;
  const t=n.textContent;const m=t.match(R);if(!m)continue;for(const c of m){const o=out[c]||(out[c]={n:0,ex:[]});o.n++;if(o.ex.length<3)o.ex.push(t.trim().slice(0,50))}}return out}"""
screens=[('sảnh',"()=>{}"),('điểm danh',"()=>Meta40.rewardsPanel('daily')"),('thành tựu',"()=>Meta40.rewardsPanel('ach')"),('nv ngày',"()=>{document.querySelector('#m40 .x')?.click();Q77.open('d')}"),('nv tuần',"()=>Q77.open('w')"),
 ('rương',"()=>{document.querySelector('.q77p [data-q77=x]')?.click();Hub40.openSeg('chest')}")]
try:
  extra=json.loads(os.environ.get('EXTRA','[]'));screens+=extra
except:pass
tot={}
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'SS');pg.add_style_tag(content='#q307{display:none!important}')
  for nm,js in screens:
    try:pg.evaluate(js)
    except Exception as e:print('lỗi mở',nm,str(e)[:80]);continue
    pg.wait_for_timeout(1300);r=pg.evaluate(SCAN)
    print('##',nm,' '.join(f"{c}×{v['n']}" for c,v in sorted(r.items(),key=lambda x:-x[1]['n'])))
    for c,v in r.items():
      t=tot.setdefault(c,{'n':0,'ex':set(),'sc':set()});t['n']+=v['n'];t['sc'].add(nm);[t['ex'].add(x) for x in v['ex'][:2]]
  print('=== TỔNG');
  for c,v in sorted(tot.items(),key=lambda x:-x[1]['n']):print(c,hex(ord(c)),v['n'],sorted(v['sc']),list(v['ex'])[:3])
  print('ERR',errs[:3])
