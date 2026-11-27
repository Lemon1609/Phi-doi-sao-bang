import sys,os,json
os.chdir('/home/claude/phi-doi-sao-bang')
src=open('claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
HTML=sys.argv[1];OUT=sys.argv[2];sys.argv=['x',HTML,'160'];exec(src)
os.makedirs(OUT,exist_ok=True)
M="""()=>{const m=document.querySelector('.m63.pl11');const st=m.querySelector('.pl11m').getBoundingClientRect(),im=m.querySelector('.pl11p');const h=U1HEAD.headTop(im);
 const vis={t:st.top,b:Math.min(st.bottom,im.getBoundingClientRect().bottom)};const lim=vis.t+(vis.b-vis.t)*.65;
 const ov=[...m.querySelectorAll('.pl11t,.u1rib,.pl11n,.pl11n *')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&getComputedStyle(e).display!=='none'&&r.top<lim&&r.bottom>vis.t&&r.left<st.right&&r.right>st.left}).map(e=>e.className||e.tagName);
 return {name:(m.querySelector('.pl11n b')||{}).textContent,head:Math.round((h-st.top)*10)/10,ov,rib:(m.querySelector('.u1rib')||{}).textContent}}"""
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'SS')
  pg.add_style_tag(content='#q307,#tutorial392{display:none!important}')
  pg.evaluate("()=>{Nav74.tab('home')}");pg.wait_for_timeout(2000)
  pg.evaluate("()=>Pilot67.open()");pg.wait_for_timeout(1800)
  print(json.dumps(pg.evaluate(M),ensure_ascii=False));pg.screenshot(path=f'{OUT}/1_thienlam.png')
  for i,n in [(0,'2_lamphuong'),(5,'3_mocmien')]:
    pg.evaluate("(i)=>document.querySelectorAll('.m63.pl11 .pl11r button')[i].click()",i);pg.wait_for_timeout(1500)
    print(json.dumps(pg.evaluate(M),ensure_ascii=False));pg.screenshot(path=f'{OUT}/{n}.png')
  pg.evaluate("()=>{document.querySelectorAll('.m63').forEach(e=>e.hidden=true)}");pg.wait_for_timeout(400)
  pg.evaluate("()=>document.querySelector('[data-ck9=pilot]').click()");pg.wait_for_timeout(1800)
  print(pg.evaluate("()=>{const c=document.querySelector('.m63.pl67 .pl67-card'),im=c.querySelector('img.pl307-hero');return Math.round(U1HEAD.headTop(im)-c.getBoundingClientRect().top)}"))
  pg.screenshot(path=f'{OUT}/4_tiemnang.png');print(errs[:3]);br.close()
