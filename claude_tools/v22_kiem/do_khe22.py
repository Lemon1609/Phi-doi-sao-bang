# V2.2 · đo khe giữa mép cánh chiến cơ và mép phần đặc tàu con (13 tàu, bậc theo setup).
# python3 claude_tools/v22_kiem/do_khe22.py <html> [ra.json]   (mỗi tàu: vào ải 12, Thường rồi Bạo Tẩu)
import sys,os,json
R='/home/claude/phi-doi-sao-bang';os.chdir(R)
HTML=sys.argv[1];OUT=sys.argv[2] if len(sys.argv)>2 else None
src=open('claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
sys.argv=['x',HTML,'160'];exec(src)
t209=open('tests/v203_v212/t209.py').read();exec(t209[t209.find('def start'):t209.find('with sync_playwright')])
PROBE="""()=>{const K=window.__L42&&window.SCALE42!==false?1.22:1;const wing=(window.__half22||0)*K,ph=window.__podh22||0;
 let P=[];try{P=Battle28.support()||[];}catch(e){}const ps=P.map(p=>Math.abs(p.x-player.x));const sp=ps.length?Math.min(...ps):0;
 return {wing:+wing.toFixed(1),podh:+ph.toFixed(1),sp:+sp.toFixed(1),khe:+(sp-wing-ph).toFixed(1),n:ps.length,sup:superTime>0}}"""
res=[]
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,os.environ.get('G','SS'));pg.add_style_tag(content='#q307{display:none!important}')
  for i in [int(x) for x in os.environ.get('IDS','0,1,2,3,4,5,6,7,8,9,10,11,12').split(',')]:
    pg.evaluate("(i)=>{try{selectCraft(i);launchCraft=i;}catch(e){}}",i)
    start(pg,12)
    pg.evaluate("()=>{invuln=1e9;clearInterval(window.__k);window.__k=setInterval(()=>{try{enemies=[];bullets=[];hp=maxHp;player.x=240;player.y=600;superTime=window.__st22||0}catch(e){}},30)}")
    pg.wait_for_timeout(1800);a=pg.evaluate(PROBE)
    pg.evaluate("()=>{window.__st22=6;activateSuper()}");pg.wait_for_timeout(1800);b=pg.evaluate(PROBE);pg.evaluate("()=>{window.__st22=0;superTime=0}")
    res.append({'tau':i+1,'thuong':a,'bt':b});print(i+1,a,b,flush=True)
  br.close()
print('khe Thường min/max',min(r['thuong']['khe'] for r in res),max(r['thuong']['khe'] for r in res))
print('khe Bạo Tẩu min/max',min(r['bt']['khe'] for r in res),max(r['bt']['khe'] for r in res))
if OUT:json.dump(res,open(OUT,'w'),ensure_ascii=False,indent=1)
