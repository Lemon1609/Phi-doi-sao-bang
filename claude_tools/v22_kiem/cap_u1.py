import sys,os,json
src=open('claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
HTML=sys.argv[1];OUT=sys.argv[2];sys.argv=['x',HTML,'160'];exec(src)
os.makedirs(OUT,exist_ok=True)
OFF=os.environ.get('OFF')
with sync_playwright() as p:
  br=p.chromium.launch();
  if OFF:
    pg,errs,o=setup(br,'SS',init='window.U1V23=false') if 'init' in setup.__code__.co_varnames else setup(br,'SS')
  else: pg,errs,o=setup(br,'SS')
  if OFF: pg.evaluate("()=>{window.U1V23=false;document.documentElement.classList.remove('u1v23','u1kho')}")
  pg.add_style_tag(content='#q307,#tutorial392{display:none!important}')
  def shot(n):pg.wait_for_timeout(300);pg.screenshot(path=f'{OUT}/{n}.png')
  pg.evaluate("()=>{Nav74.tab('home')}");pg.wait_for_timeout(2500);shot('1_sanh')
  pg.evaluate("()=>document.querySelector('[data-ck9=kho]').click()");pg.wait_for_timeout(3000)
  if not OFF:
    pg.evaluate("()=>{const l=document.querySelector('#hub40 .hb-slot:not(.c9ship) .u1lk');if(l)l.click()}");pg.wait_for_timeout(600)
  shot('2_kho')
  pg.evaluate("()=>document.querySelector('.c9bar .bag').click()");pg.wait_for_timeout(1500);shot('3_tui')
  if not OFF:
    pg.evaluate("()=>{const l=[...document.querySelectorAll('#k307 .k307-row[data-k=item] .u1lk')].find(x=>!x.classList.contains('on'));if(l)l.click()}");pg.wait_for_timeout(500);shot('3b_tui_khoa')
  pg.evaluate("()=>{const x=document.querySelector('#k307 [data-k=x]');if(x)x.click()}");pg.wait_for_timeout(600)
  pg.evaluate("()=>document.querySelector('.c9bar .up').click()");pg.wait_for_timeout(1500);shot('4_cuong')
  print(errs[:3]);br.close()
