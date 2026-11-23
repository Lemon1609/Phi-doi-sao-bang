import sys,os
os.chdir('/home/claude/nguon')
src=open('claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
HTML=sys.argv[1];sys.argv=['x',HTML,'160'];exec(src)
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'SS')
  r=pg.evaluate("""()=>{const out={};const un=Rift307.unlocked();out.un=un;const c0=Rift307.state().chest,cr0=Progress.balance();
    Q77._set({wp:500,wc:[]});out.claim=Q77.claim('w',500);out.dchest=Rift307.state().chest-c0;out.dcr=Progress.balance()-cr0;
    // Khe Nứt chưa mở → 3.000 ◈
    const u=Rift307.unlocked;Rift307.unlocked=()=>false;const c1=Rift307.state().chest,cr1=Progress.balance();Q77._set({wp:500,wc:[]});Q77.claim('w',500);out.dchest2=Rift307.state().chest-c1;out.dcr2=Progress.balance()-cr1;Rift307.unlocked=u;
    window.HK13=false;const c2=Rift307.state().chest;Q77._set({wp:500,wc:[]});Q77.claim('w',500);out.off=Rift307.state().chest-c2;window.HK13=true;
    Q77.open('w');out.txt=(document.body.innerText.match(/Rương Hư Không/g)||[]).length;return out}""")
  print(r,'lỗi',errs[:3])
