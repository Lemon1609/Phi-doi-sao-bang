import sys,os,json
os.chdir('/home/claude/phi-doi-sao-bang')
src=open('claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
HTML=sys.argv[1];OUT=sys.argv[2];sys.argv=['x',HTML,'160'];exec(src)
os.makedirs(OUT,exist_ok=True)
RSEED="""(()=>{try{const PP=[[5,8],[10,11],[7,9],[12,12],[2,6],[0,3],[1,4]];const r=JSON.parse(localStorage.getItem('saobang-robots-v1')||'null');if(!r||!(r.supers||[]).length){localStorage.setItem('saobang-robots-v1',JSON.stringify({unlocked:[],selected:null,supers:[6].map(k=>({key:'sss:'+k,model:k,a:PP[k][0],b:PP[k][1],form:0})),fusionVersion:2}));}}catch(e){}})()"""
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'SS')
  sid=pg.evaluate("()=>{const eq=Progress.v70.equipped();const it=Progress.v70.get(eq.armor);const d=Gear44.defs().find(d=>d.kind==='armor'&&d.parents.includes(it.variant));return d?d.id:null}")
  snap=pg.evaluate("()=>JSON.stringify(Object.fromEntries(Object.keys(localStorage).map(k=>[k,localStorage.getItem(k)])))")
  pg.add_init_script("(()=>{try{const S=%s;for(const k in S)localStorage.setItem(k,S[k]);}catch(e){}})()"%snap)
  pg.add_init_script(RSEED)
  if sid:pg.add_init_script("(()=>{try{const k='saobang-gear-sss-v2';const o=JSON.parse(localStorage[k]||'null')||{v:2,owned:{},bind:{},wk:{w:0,n:0},pay:null,l4:1};o.v=2;o.l4=o.l4||1;if(!o.owned['%s'])o.owned['%s']={lv:3,at:1};localStorage[k]=JSON.stringify(o);}catch(e){}})()"%(sid,sid))
  pg.reload();pg.wait_for_timeout(7000)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();window.RULE84=false;window.TITLE84=false;try{Ch9.open=()=>true}catch{};document.querySelectorAll('.m63,.adv70,.st71').forEach(e=>e.hidden=true);try{Progress.setLocked(false)}catch{}}")
  pg.add_style_tag(content='#q307,#tutorial392{display:none!important}')
  print('sss',sid,pg.evaluate("()=>{const eq=Progress.v70.equipped();return Gear44.activeId('armor')}"))
  def shot(n):pg.wait_for_timeout(500);pg.screenshot(path=f'{OUT}/{n}.png')
  pg.evaluate("()=>{Nav74.tab('home')}");pg.wait_for_timeout(2000)
  pg.evaluate("()=>document.querySelector('[data-ck9=kho]').click()");pg.wait_for_timeout(2500)
  pg.evaluate("()=>document.querySelector('.c9bar .bag').click()");pg.wait_for_timeout(1500)
  for k,n in [('craft','1_chienco'),('armor','2_giap'),('missiles','3_tenlua'),('sidearm','4_taucon')]:
    pg.evaluate("(k)=>{const b=document.querySelector('#k307 [data-k=kf][data-id='+k+']');if(b)b.click()}",k);pg.wait_for_timeout(900);shot(n)
  pg.evaluate("()=>{const x=document.querySelector('#k307 [data-k=x]');if(x)x.click()}");pg.wait_for_timeout(600)
  pg.evaluate("()=>{document.querySelectorAll('.m63').forEach(e=>e.hidden=true);Nav74.tab('home')}");pg.wait_for_timeout(1000)
  pg.evaluate("()=>document.querySelector('[data-ck9=pilot]').click()");pg.wait_for_timeout(1800);shot('5_phicong')
  pg.evaluate("()=>{const m=document.querySelector('.m63.pl67');if(m)m.scrollTop=9999}");pg.wait_for_timeout(500);shot('6_phicong_cuoi')
  print(errs[:3]);br.close()
