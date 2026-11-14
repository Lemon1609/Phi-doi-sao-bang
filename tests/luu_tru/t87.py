# V87 · REVIEW86: H1 bộ 9 đánh boss · H2 hợp thể SSS 2 chiến cơ · H4 quà bảo hiểm + biểu ngữ · Đồng đội offline
import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];O=sys.argv[2]+'/';R={};OK=[]
def chk(n,c):OK.append(('✓' if c else '✗')+' '+n)
SEED="if(!sessionStorage.getItem('t87')){sessionStorage.setItem('t87','1');const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:119},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));}"
GO="""(a)=>{const [st,ship]=a;mode='menu';try{Lobby.show()}catch{};Progress.setLocked(false);try{V75.addEn(99)}catch{};if(ship!=null)selectCraft(ship);document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value=String(st);Lobby.hide();reset();if(mode==='pause'){try{resume()}catch{}if(mode==='pause')mode='play';}
 if(!window.__iv87)window.__iv87=setInterval(()=>{try{invuln=999;hp=maxHp;const d=document.getElementById('st80');if(d)d.hidden=true;window.__st80=0;}catch{}},150);return {mode,level}}"""
WAITBOSS="""async()=>{for(let k=0;k<160;k++){if(boss&&boss.bossHealthReady&&boss.y>80)return true;try{for(const e of enemies)if(!e.boss)e.dead=true;}catch{};await new Promise(r=>setTimeout(r,250));}return false}"""
with sync_playwright() as p:
  b=p.chromium.launch();pg=b.new_page(viewport={'width':393,'height':852});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2000);pg.add_init_script(SEED);pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(6000)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();window.RULE84=false;window.TITLE84=false;for(let i=0;i<13;i++)try{Campaign36.acquire('craft',i,'','story')}catch{};document.querySelectorAll('.m63,.adv70,.st71').forEach(e=>e.hidden=true)}")
  # ---- H2 hợp thể ----
  R['fuse']=pg.evaluate("""()=>{const r=SSS87.R[0];const c0=SSS87.check(r);V70.setTier('craft',10,11);V70.setTier('craft',7,6);
    Evo82.addCopy('craft',10,0,1,true);Evo82.addCopy('craft',7,0,1,true);Evo82.addCopy('craft',7,1,1,true);Progress.grantCredits(300000);for(let i=0;i<16;i++)Stone71.give(Stone71.make(3,'ship',{ty:'stat'}));
    const c1=SSS87.check(r);const before={cr:Progress.balance(),gem:Stone71.haveT(3),cp:Evo82.list().filter(c=>c.k==='craft'&&(c.m==10||c.m==7)).length};const ok=SSS87.fuse(10);
    const after={cr:Progress.balance(),gem:Stone71.haveT(3),cp:Evo82.list().filter(c=>c.k==='craft'&&(c.m==10||c.m==7)).length};document.getElementById('s87rite')?.remove();
    return {lack0:c0.L,ok1:c1.ok,ok,before,after,st:SSS87.state()}}""")
  d=R['fuse'];chk('Hợp thể chặn khi thiếu điều kiện',len(d['lack0'])>0)
  chk('Hợp thể #11+#8: trừ 250k ◈, 15 đá Tím, 3 bản sao',d['ok'] and d['before']['cr']-d['after']['cr']==250000 and d['before']['gem']-d['after']['gem']==15 and d['before']['cp']-d['after']['cp']==3)
  pg.evaluate("()=>{mode='menu';try{Lobby.show()}catch{};selectCraft(10);SSS87.open(10)}");pg.wait_for_timeout(800);pg.screenshot(path=O+'t87_sss_panel.png')
  pg.evaluate("()=>{document.querySelectorAll('.sss87').forEach(e=>e.hidden=true)}")
  # ---- trận: SSS + đồng đội ----
  pg.evaluate("()=>{Wing87._set({id:7,side:-1})}")
  pg.evaluate(GO,[60,10]);pg.evaluate(WAITBOSS);pg.evaluate("()=>{power=5;SSS87._cd(.5)}");pg.wait_for_timeout(1500);pg.screenshot(path=O+'t87_sss_cast.png')
  pg.wait_for_timeout(9000)
  R['battle']=pg.evaluate("()=>({act:SSS87.active(),mult:SSS87.mult(),sss:SSS87.state(),wing:Wing87.state()})")
  chk('Lái #11 đã hợp thể: dạng SSS, +8% sát thương',R['battle']['act'] and abs(R['battle']['mult']-1.08)<1e-9)
  chk('Kỹ năng Hố Đen Huyết Tinh tự tung và gây sát thương',R['battle']['sss']['nCast']>=1 and R['battle']['sss']['dealt']>0)
  chk('Đồng đội #8 bay kèm #11: cộng hưởng 38%, có bắn',R['battle']['wing']['mate']==7 and abs(R['battle']['wing']['ratio']-.38)<1e-9 and R['battle']['wing']['nShot']>10)
  box=pg.evaluate("()=>{const c=document.querySelector('canvas');const r=c.getBoundingClientRect();return [r.x+player.x*r.width/W-110,r.y+player.y*r.height/H-120,220,220]}")
  pg.screenshot(path=O+'t87_wing.png',clip={'x':max(0,box[0]),'y':box[1],'width':box[2],'height':box[3]})
  # ---- 2 kỹ năng còn lại (mở nhanh qua _set) ----
  for i,sh in [(11,'t87_sss12.png'),(12,'t87_sss13.png')]:
    pg.evaluate("(i)=>{const d=SSS87.state().done;d[i]=1;SSS87._set({done:d})}",i);pg.evaluate(GO,[60,i]);pg.evaluate(WAITBOSS);pg.evaluate("()=>{power=5;SSS87._cd(.3)}");pg.wait_for_timeout(1300);pg.screenshot(path=O+sh)
    pg.wait_for_timeout(3000);R['sk%d'%i]=pg.evaluate("()=>SSS87.state()")
  chk('Lăng Kính Ngưng Đọng + Phán Quyết Hư Không gây sát thương',R['sk11']['nCast']>=1 and R['sk12']['nCast']>=1 and R['sk12']['dealt']>R['sk11']['dealt']-1e9)
  # ---- H1 bộ 9 trên boss có cánh ----
  pg.evaluate("()=>{mode='menu';try{Lobby.show()}catch{};Progress.setLocked(false);for(const m of Campaign36.sets[9]){Campaign36.acquire('gear',m,'','story');const it=Progress.getState().items.filter(x=>x.variant===m).slice(-1)[0];Progress.equip(it.id);}Wing87._set({id:null})}")
  pg.evaluate(GO,[100,0]);pg.evaluate(WAITBOSS);pg.wait_for_timeout(6000)
  R['set9']=pg.evaluate("()=>({g:Gear81.state().boss86,F:Gear81._F().map(f=>[Math.round(f.x),Math.round(f.y)]),parts:(boss.parts||[]).map(p=>[Math.round(p.x),Math.round(p.y),p.dead?0:1]),core:[Math.round(boss.x),Math.round(boss.y)]})")
  pg.screenshot(path=O+'t87_set9.png')
  g=R['set9']['g'];chk('Bộ 9 khi có boss: tiêm kích bám mục tiêu, tên lửa + giáp phản kích có bắn',g['on']==1 and g['nF']>5 and g['nM']>5 and g['nA']>0)
  # ---- H4 ----
  R['h4']=pg.evaluate("""async()=>{mode='menu';try{Lobby.show()}catch{};Drop85._set({done:{}});DROP85.chance[120]=0;const n0=Evo82.list().filter(c=>c.t===2&&c.k==='gear').length,cr0=Progress.balance();
     const orig=Progress.getState;Progress.getState=()=>Object.assign({},orig(),{cleared:[...(orig().cleared||[]),120]});Drop85.tick();Progress.getState=orig;await new Promise(r=>setTimeout(r,1600));
     const bn=document.getElementById('dr87');return {done:Drop85.state().done['120'],dn:Evo82.list().filter(c=>c.t===2&&c.k==='gear').length-n0,dcr:Progress.balance()-cr0,banner:bn&&!bn.hidden?bn.innerText:''}}""")
  pg.screenshot(path=O+'t87_h4.png')
  h=R['h4'];chk('Trượt bản sao Tím ải 120 → 1 bản sao Lam bộ 6–8 + 15.000 ◈ + biểu ngữ',h['done']=='fb' and h['dn']==1 and h['dcr']==15000 and 'CHIẾN LỢI PHẨM THỦ LĨNH LẦN ĐẦU' in h['banner'])
  R['errs']=errs[:5];chk('không lỗi JS',not errs);b.close()
print(json.dumps(R,ensure_ascii=False)[:3000]);print('KẾT QUẢ '+' · '.join(OK))
