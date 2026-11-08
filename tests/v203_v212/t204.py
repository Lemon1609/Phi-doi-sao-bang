import sys,json
src=open('claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
HTML=sys.argv[1];sys.argv=['x',HTML,'180'];exec(src)
from playwright.sync_api import sync_playwright
OK=[]
def chk(n,c,info=''):OK.append(bool(c));print(('✓ ' if c else '✗ ')+n,info,flush=True)
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'')
  r=pg.evaluate("""()=>{const mc=()=>V70.have('sss_core'),mm=()=>({...Chip72.state().mat});Event83._set({cur:400});Event83.open();
    const ids=[...document.querySelectorAll('[data-e83="buy"]')].map(b=>b.dataset.v);
    const a0=mm(),h0=mc();for(const id of ['ev_coder_pack','ev_core_pack','ev_hach_pack']){const b=document.querySelector('[data-e83="buy"][data-v="'+id+'"]');b&&b.click();}
    const a1=mm(),h1=mc(),st=Event83.state();return {ids,coder:a1.coder-a0.coder,core:a1.core-a0.core,hach:h1-h0,cur:st.cur,shop:st.shop}}""")
  chk('Tiệm có 3 món cuối game',all(x in r['ids'] for x in ['ev_coder_pack','ev_core_pack','ev_hach_pack']),r['ids'])
  chk('Mua đủ 3 món: +2 mã hóa +4 lõi +5 hạch, còn 100 xu',r['coder']==2 and r['core']==4 and r['hach']==5 and r['cur']==100,r)
  r=pg.evaluate("""()=>{const b=document.querySelector('[data-e83="buy"][data-v="ev_coder_pack"]');Event83._set({cur:400});Event83.open();const b2=document.querySelector('[data-e83="buy"][data-v="ev_coder_pack"]');return b2.disabled}""")
  chk('Giới hạn 1 lượt/tuần',r)
  # hoàn thành tuần → chip
  r=pg.evaluate("""()=>{const st=Event83.state();const ev=EVENT83.list?null:null;const n0=Chip72.state().ch.length;
    const tasks=[...document.querySelectorAll('[data-e83="claim"]')].map(b=>b.dataset.v);
    // đẩy tiến độ đủ cho mọi nhiệm vụ của tuần hiện tại
    const E=EVENT83.ev[st.idx];const p={};(E?E.tasks:[]).forEach(t=>p[t.k]=t.target);Event83._set({p,cl:{},c204:3});Event83.open();
    for(let i=0;i<5;i++){const b=document.querySelector('[data-e83="claim"]:not([disabled])');if(!b)break;b.click();}
    const ch=Chip72.state().ch;const s2=Event83.state();return {n:ch.length-n0,q:ch.slice(n0).map(c=>c.q),c204:s2.c204,cl:s2.cl,done:s2.done,dw:[s2.doneWk,s2.wk],p:s2.p,btn:tasks}}""")
  chk('Xong tuần thứ 4 tích lũy: +1 chip Chiến lược (q4) + 1 chip Tuyệt mật (q6)',r['n']==2 and sorted(r['q'])==[4,6],r)
  # Thứ Bảy
  r=pg.evaluate("""()=>{window.__ev204dow=6;const m0={...Chip72.state().mat};Ult72.X.onClaim('d','task');const m1=Chip72.state().mat;
    window.__ev204dow=3;const m2={...m1};Ult72.X.onClaim('d','task');const m3=Chip72.state().mat;
    return {sat:[m1.cry-m0.cry,m1.coder-m0.coder,m1.core-m0.core],wd:[m3.cry-m2.cry,m3.coder-m2.coder,m3.core-m2.core]}}""")
  chk('Thứ Bảy nhiệm vụ ngày ×1,5 (30/1/2 → 45/2/3), ngày thường giữ 30/1/2',r['sat']==[45,2,3] and r['wd']==[30,1,2],r)
  # Chủ Nhật
  r=pg.evaluate("""()=>{const h=()=>V70.have('sss_core');mode='menu';window.__ev204dow=0;const h0=h();const out=[];for(let i=0;i<4;i++){const x=Workshop.rollStage(170);out.push(Array.isArray(x)?x.filter(s=>String(s).includes('Siêu Hợp')).length:-1);}const d1=h()-h0;
    window.__ev204dow=3;const h2=h();Workshop.rollStage(170);const d2=h()-h2;window.__ev204dow=0;const h3=h();Workshop.rollStage(150);const d3=h()-h3;return {d1,d2,d3,out,st:EV204X.state()}}""")
  chk('Chủ Nhật: 4 lần thắng ải 170 = 4×5 + 3 hạch thưởng; ngày thường 5; ải 150 không thưởng',r['d1']==23 and r['d2']==5 and r['d3']==0,r)
  # Chiến cơ của tuần
  r=pg.evaluate("""()=>{const sh=EV204X.ships();const oc=launchCraft;launchCraft=sh[1];const a=Chip72.shipM();const oi=Event83.inRaid;Event83.inRaid=()=>true;const b=Chip72.shipM();
    launchCraft=(sh[1]+1)%13;if(sh.includes(launchCraft))launchCraft=(launchCraft+1)%13;const c=Chip72.shipM();Event83.inRaid=oi;launchCraft=oc;return {sh,a,b,c,tl:Chip72.shipM()}}""")
  chk('Chiến cơ của tuần: ×1,10 chỉ khi trong Boss cuối tuần và đúng tàu',abs(r['b']/r['a']-1.1)<1e-9 and abs(r['c']-r['a'])<1e-9 if r['a'] else False,r)
  pg.evaluate("()=>{window.__ev204dow=0;Event83._set({cur:250});Event83.open();}");pg.wait_for_timeout(400)
  pg.screenshot(path='/tmp/V204_su_kien.png',full_page=False)
  pg.evaluate("()=>{const e=document.querySelector('.ev204tag');e&&e.scrollIntoView({block:'center'})}");pg.wait_for_timeout(300)
  pg.screenshot(path='/tmp/V204_tiem.png')
  chk('Không lỗi JS',not errs,errs[:3])
  print(sum(OK),'/',len(OK));br.close()
