import sys,os,json
src=open('claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
HTML=sys.argv[1];OUT=sys.argv[2];os.makedirs(OUT,exist_ok=True);sys.argv=['x',HTML,'160'];exec(src)
VET=os.environ.get('VET','1')=='1'
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'SS')
  snap=pg.evaluate("()=>JSON.stringify(Object.fromEntries(Object.keys(localStorage).map(k=>[k,localStorage.getItem(k)])))")
  pg.add_init_script("(()=>{try{const S=%s;for(const k in S)localStorage.setItem(k,S[k]);}catch(e){}})()"%snap)
  td="Math.floor((Date.now()+7*3600000)/86400000)"
  pg.add_init_script("(()=>{try{const d=%s;const L=JSON.parse(localStorage['saobang-l14309']||'null')||{v:1,ach:{},open:{tb:0,cc:0,boss:0}};L.v=1;L.days=12;L.last=d-1;L.mig=1;localStorage['saobang-l14309']=JSON.stringify(L);"
    "localStorage['saobang-u3-v1']=JSON.stringify({v:1,ms:[5],ex:{run:{h:4,t0:Date.now()-5400000},day:d,n:1,q:0},vet:{until:%s,daily:-1,buys:1}});}catch(e){}})()"%(td,("d+23" if VET else "-1")))
  pg.reload();pg.wait_for_timeout(7000)
  pg.evaluate("()=>{document.querySelectorAll('#q307,#tutorial392').forEach(e=>e.remove());document.querySelectorAll('.m63').forEach(e=>e.hidden=true);try{Progress.setLocked(false)}catch{};Nav74.tab('home')}");pg.wait_for_timeout(2500)
  pg.evaluate("()=>{document.querySelectorAll('#q307').forEach(e=>e.remove())}")
  pg.screenshot(path=OUT+'/1_sanh.png')
  pg.evaluate("()=>document.querySelector('#hdr9 [data-h9b=pl]').click()");pg.wait_for_timeout(1800)
  pg.evaluate("()=>{const b=[...document.querySelectorAll('#hub9 button')].find(x=>/Điểm danh/i.test(x.textContent));if(b)b.click()}");pg.wait_for_timeout(1500)
  pg.screenshot(path=OUT+'/2_diemdanh.png')
  pg.evaluate("()=>{const x=document.querySelector('#m40 .u3x');if(x)x.click()}");pg.wait_for_timeout(800)
  pg.evaluate("()=>{Nav74.tab('home')}");pg.wait_for_timeout(1200)
  pg.evaluate("()=>document.querySelector('#lob22 [data-u3r=exp]').click()");pg.wait_for_timeout(1200)
  pg.screenshot(path=OUT+'/3_thamhiem.png')
  pg.evaluate("()=>U3V23S.close()");pg.evaluate("()=>document.querySelector('#lob22 [data-u3r=vet]').click()");pg.wait_for_timeout(1200)
  pg.screenshot(path=OUT+'/4_thekycuu.png')
  pg.evaluate("()=>U3V23S.close()")
  pg.evaluate("()=>{const c=Progress.getState().cleared.filter(k=>k%10!==0);for(const s of c.slice(-30))Campaign36.recordStars(s,3)}")
  pg.evaluate("()=>document.querySelector('#lob22 [data-l22=\"go:camp\"]').click()");pg.wait_for_timeout(2500)
  pg.evaluate("()=>{const b=document.querySelector('.qs10');if(b)b.click()}");pg.wait_for_timeout(1500)
  pg.screenshot(path=OUT+'/5_canquet.png')
  print(pg.evaluate("()=>[...document.querySelectorAll('button')].filter(b=>/CÀN QUÉT/i.test(b.textContent)&&b.offsetParent).map(b=>b.textContent.trim().slice(0,30)).slice(0,8)"))
  print(errs[:5])
  br.close()
