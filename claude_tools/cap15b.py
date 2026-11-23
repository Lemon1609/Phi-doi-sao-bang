import sys,os
os.chdir('/home/claude/nguon')
src=open('claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
HTML=sys.argv[1];OUT=sys.argv[2];sys.argv=['x',HTML,'160'];exec(src)
os.makedirs(OUT,exist_ok=True)
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'SS');pg.add_style_tag(content='#q307{display:none!important}')
  def shot(n,sel=None):
    pg.wait_for_timeout(700);pg.screenshot(path=f'{OUT}/{n}.png')
  pg.evaluate("()=>{L14309._set({days:3,last:-1,mig:1});Meta40.rewardsPanel('daily')}");shot('1_diem_danh_7_ngay')
  pg.evaluate("()=>{L14309._set({days:13,last:-1,mig:1});Meta40.rewardsPanel('daily')}");shot('2_chuoi_ngay8')
  pg.evaluate("()=>{L14309._set({days:29,last:-1,mig:1});Meta40.rewardsPanel('daily')}");shot('2b_chuoi_ngay30')
  pg.evaluate("()=>{Meta40.rewardsPanel('ach')}");pg.wait_for_timeout(900);pg.evaluate("()=>{const r=document.querySelector('#m40 .pk92');if(r)r.scrollIntoView({block:'start'})}");shot('3_thanh_tuu')
  pg.evaluate("()=>{document.querySelector('#m40 .x')?.click();L14309.addChest('tb',2);L14309.addChest('cc',1);L14309.addChest('boss',1);Hub40.openSeg('chest');}");pg.wait_for_timeout(1500)
  pg.evaluate("()=>{const e=document.getElementById('chest-inventory');if(e)e.scrollIntoView({block:'center'})}");shot('4_kho_ruong')
  pg.evaluate("()=>{try{Hub40.close&&Hub40.close()}catch(e){};Q77._set({wp:420,wc:[100,200]});Q77.open('w')}");pg.wait_for_timeout(1600);shot('5_moc_tuan')
  print('errs',errs[:3])
