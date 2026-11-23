# V309 L16 · kiểm HỆ ĐÁ NỘI TẠI: 9 hiệu ứng đúng số trong trận (so bật/tắt), nâng cấp trừ đúng HK + Tinh Thể, nguồn tinh thể, lưu theo Bộ 1/2/3.
import sys,os,json
os.chdir(os.path.dirname(os.path.abspath(__file__))+'/..')
src=open('claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
HTML=sys.argv[1];sys.argv=['x',HTML,'160'];exec(src)
t209=open('tests/v203_v212/t209.py').read();exec(t209[t209.find('def start'):t209.find('with sync_playwright')])
ok=[];bad=[]
def chk(n,c,info=''):
    (ok if c else bad).append(n);print(('ĐẠT ' if c else 'TRƯỢT ')+n,info,flush=True)
near=lambda a,b,t=.02:abs(a-b)<=t
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'SS');pg.add_style_tag(content='#q307{display:none!important}')
  # ---- nâng cấp ----
  r=pg.evaluate("""()=>{NT16._set({c:200,lv:{}});const b0=Progress.balance(),c0=NT16.have();const res=[];for(let i=0;i<5;i++)res.push(NT16.upgrade('pha_giap'));
    const out={res,dHK:b0-Progress.balance(),dC:c0-NT16.have(),lv:NT16.lv('pha_giap')};NT16._set({c:5,lv:{}});out.thieu=NT16.upgrade('xung_kich');out.lvx=NT16.lv('xung_kich');return out}""")
  print(r);chk('nâng Lv1→5 trừ 63.000 HK + 120 tinh thể',r['dHK']==63000 and r['dC']==120 and r['lv']==5 and r['res']==[True,True,True,True,False])
  chk('thiếu tinh thể không nâng',r['thieu'] is False and r['lvx']==1)
  # ---- nguồn ----
  r=pg.evaluate("""()=>{NT16._set({c:0});const a=[NT16.heroGain(10),NT16.heroGain(50),NT16.heroGain(150)];const h=NT16.have();
    Q77._set({wp:600,wc:[]});Q77.claim('w',400);const w4=NT16.have()-h;Q77.claim('w',600);const w6=NT16.have()-h-w4;
    V77._set({tok:100});const c1=NT16.have();V77.buy('NT16_CRYSTAL_5');const sh=NT16.have()-c1;return {a,w4,w6,sh,tw:[10,15,20,25,32].map(NT16.towerAmt)}}""")
  print(r);chk('Anh Hùng 1/2/3 theo chương',r['a']==[1,2,3]);chk('mốc tuần 400 +5, 600 +10',r['w4']==5 and r['w6']==10);chk('Tiệm Danh Dự +5',r['sh']==5);chk('Tháp tầng 10/15/20/25+ → 3/4/5/6',r['tw']==[3,4,5,6,6])
  # ---- vào trận ----
  start(pg,30);pg.wait_for_timeout(2500)
  base="window.NT16=true;invuln=0;bulletShieldTime=0;"
  def run(js):return pg.evaluate("async()=>{const W=ms=>new Promise(r=>setTimeout(r,ms));"+js+"}")
  # 3 Vỏ Năng Lượng (so bật / tắt)
  r=run(base+"""NT16._set({lv:{vo_nl:1},eq:['pha_giap','vo_nl','duy_tri']});const one=async(on)=>{window.NT16=on;invuln=0;bulletShieldTime=0;shield=0;hp=maxHp;damage('collision');const v=invuln;await W(50);return v};
    const a=await one(false);await W(400);const b=await one(true);window.NT16=true;NT16._set({lv:{vo_nl:5}});await W(400);const c=await one(true);hp=maxHp;return {a,b,c}""")
  print(r);chk('Vỏ Năng Lượng Lv1 +0,3 s / Lv5 +0,7 s bất tử',near(r['b']-r['a'],.3,.01) and near(r['c']-r['a'],.7,.01))
  # 7 Duy Trì Bạo Tẩu
  r=run(base+"""NT16._set({lv:{duy_tri:1},eq:['pha_giap','vo_nl','duy_tri']});const one=async(on)=>{window.NT16=on;superTime=0;charge=0;activateSuper();const v=superTime;superTime=0;await W(100);return v};
    const a=await one(false);const b=await one(true);NT16._set({lv:{duy_tri:5}});const c=await one(true);window.NT16=true;return {a,b,c}""")
  print(r);chk('Duy Trì Bạo Tẩu Lv1 +1,0 s / Lv5 +2,5 s',near(r['b']-r['a'],1,.05) and near(r['c']-r['a'],2.5,.05))
  # 9 Nạp Nhanh
  r=run(base+"""NT16._set({lv:{nap_nhanh:1},eq:['pha_giap','vo_nl','nap_nhanh']});window.NT16=false;const a=Pilot67.gearRate('missiles');window.NT16=true;const b=Pilot67.gearRate('missiles');
    NT16._set({lv:{nap_nhanh:5}});const c=Pilot67.gearRate('missiles');robotCooldown=0;await W(150);robotCooldown=18;await W(200);const rc=robotCooldown;return {a,b,c,rc}""")
  print(r);chk('Nạp Nhanh tên lửa ×0,95 (Lv1) / ×0,85 (Lv5)',near(r['b']/r['a'],.95,.001) and near(r['c']/r['a'],.85,.001));chk('Nạp Nhanh tuyệt kỹ robot 18 s → ≈15,3 s (Lv5)',15.0<=r['rc']<=15.31,r['rc'])
  # 8 Từ Trường
  r=run(base+"""NT16._set({lv:{tu_truong:1},eq:['pha_giap','vo_nl','tu_truong']});window.__mag91=1;const a=window.__mag91;NT16._set({lv:{tu_truong:5}});const b=window.__mag91;
    const g=document.getElementById('gamemode'),old=g.value;g.value='endless';await W(150);const s0=score;score+=10000;await W(400);const ds=score-s0;g.value=old;await W(100);return {a,b,ds}""")
  print(r);chk('Từ Trường tầm hút ×1,20 (Lv1) / ×1,50 (Lv5)',near(r['a'],1.2,.001) and near(r['b'],1.5,.001));chk('Từ Trường điểm Vô tận +15% (Lv5)',10000+1490<=r['ds']<=10000+1600,r['ds'])
  # 4 Hấp Thụ
  r=run(base+"""NT16._set({lv:{hap_thu:1},eq:['pha_giap','hap_thu','duy_tri']});await W(100);const tmpl=enemies.find(e=>!e.dead&&e!==boss)||{x:200,y:200,hp:10,type:1};
    hp=maxHp*.5;NT16.st.kills=0;NT16.st.healed=0;const h0=hp;for(let i=0;i<25;i++){const e=Object.assign({},tmpl,{dead:false,hp:0,rescue28:false,meteor:false});kill(e);}const h1=hp;
    for(let i=0;i<25*14;i++){const e=Object.assign({},tmpl,{dead:false,hp:0,rescue28:false,meteor:false});kill(e);}const h2=hp;hp=maxHp;return {mh:maxHp,d1:h1-h0,d2:h2-h0}""")
  print(r);chk('Hấp Thụ: 25 quái hồi 1% máu tối đa',near(r['d1'],r['mh']*.01,1e-6));chk('Hấp Thụ: trần 10%/trận',near(r['d2'],r['mh']*.10,1e-6),r)
  # 5 Xung Chấn
  r=run(base+"""NT16._set({lv:{xung_chan:1},eq:['pha_giap','xung_chan','duy_tri']});NT16.st.xcd=0;await W(100);const tb=bullets[0]||{r:4,vx:0,vy:0};
    const mk=(dx,dy)=>Object.assign({},tb,{x:player.x+dx,y:player.y+dy,vx:0,vy:0,speed:0,dead:false,id:'nt'+dx});const n0=NT16.stat.xc;invuln=0;Shield78.grant('pick');await W(150);invuln=0;bullets.push(mk(0,-100),mk(0,-115),mk(0,-200),mk(0,-300));damage('bullet');const ys=bullets.filter(b=>String(b.id||'').startsWith('nt')&&!b.dead).map(b=>Math.round(player.y-b.y));
    /* lần 2 trong 20 s hồi: chỉ bán kính mặc định 90 px */await W(300);invuln=0;Shield78.grant('pick');await W(150);invuln=0;bullets.push(mk(0,-100));damage('bullet');const ys2=bullets.filter(b=>String(b.id||'').startsWith('nt')&&!b.dead).map(b=>Math.round(player.y-b.y));return {xc:NT16.stat.xc-n0,ys,ys2}""")
  print(r);chk('Xung Chấn: vỡ khiên xóa đạn trong 120 px, giữ đạn xa hơn',100 not in r['ys'] and 115 not in r['ys'] and 200 in r['ys'] and 300 in r['ys'],r);chk('Xung Chấn hồi 20 s: lần vỡ thứ 2 chỉ xóa 90 px mặc định',r['xc']==1 and 100 in r['ys2'],r)
  # 2 Phản Công
  r=run(base+"""NT16._set({lv:{phan_cong:1},eq:['phan_cong','vo_nl','duy_tri']});NT16.st.bcd=0;NT16.st.buff=0;hp=maxHp*.4;await W(200);const buff=NT16.st.buff,n=NT16.stat.buffN;
    const t=shots.find(s=>!s.gearKind)||{};const fake=Object.assign({},t,{x:player.x,y:player.y-40,vx:0,vy:-10,damage:10,__nt16:0,dead:false,gearKind:undefined,gearItem:undefined});shots.push(fake);await W(120);const d=fake.damage;hp=maxHp;
    NT16.st.buff=0;const fake2=Object.assign({},fake,{damage:10,__nt16:0});shots.push(fake2);await W(120);return {buff,d,d2:fake2.damage,n}""")
  print(r);chk('Phản Công: dưới 50% máu bật 8 s, đạn mới +5%',r['buff']>7.5 and near(r['d'],10.5,.001) and near(r['d2'],10,.001),r)
  # 3 Xung Kích
  r=run(base+"""NT16._set({lv:{xung_kich:1},eq:['xung_kich','vo_nl','duy_tri']});const n0=NT16.stat.xk;NT16.st.xk=.05;await W(400);const v=NT16.st.volley,last=NT16.stat.xkLast;return {n:NT16.stat.xk-n0,v,last}""")
  print(r);chk('Xung Kích: sóng nổ = 120% loạt bắn chính',r['n']>=1 and r['v']>0 and near(r['last']/r['v'],1.2,.001),r)
  # 1 Phá Giáp (boss)
  pg.evaluate("()=>{try{startBoss()}catch(e){}}");pg.wait_for_function("()=>typeof boss!=='undefined'&&boss&&boss.y>80",timeout=60000);pg.wait_for_timeout(4500)
  r=run(base+"""NT16._set({lv:{pha_giap:1},eq:['pha_giap','vo_nl','duy_tri']});const H=()=>(boss.coreHp||0)+(boss.hp||0)+(boss.parts||[]).reduce((a,q)=>a+(q.dead?0:(q.hp||0)),0);const one=on=>{window.NT16=on;const a=H();damageBoss(50,'nt16test',null);return a-H()};
    const a=one(false),b=one(true);NT16._set({lv:{pha_giap:5}});const c=one(true);const mx=boss.coreMax||boss.max;if(boss.coreMax)boss.coreHp=mx*.4;else boss.hp=mx*.4;await W(300);const e=one(false),d=one(true);window.NT16=true;return {a,b,c,d,e}""")
  print(r);chk('Phá Giáp boss > 50%: +4% (Lv1) / +10% (Lv5)',r['a']>0 and near(r['b']/r['a'],1.04,.002) and near(r['c']/r['a'],1.10,.002),r);chk('Phá Giáp không tác dụng khi boss ≤ 50%',near(r['d'],r['e'],1e-3) and r['e']>0)
  # ---- Bộ trang bị (LOAD7) ----
  pg.evaluate("()=>{try{end(false)}catch(e){}}");pg.wait_for_timeout(1500)
  r=pg.evaluate("""async()=>{const W=ms=>new Promise(r=>setTimeout(r,ms));try{mode='menu'}catch{}try{Lobby.show&&Lobby.show()}catch{}await W(800);localStorage.removeItem('saobang-load7-v1');
    const B=k=>document.querySelector('[data-ld7="'+k+'"]');const before=[0,1,2].map(i=>B(i).textContent.trim());
    NT16.setLoadout(['xung_kich','xung_chan','nap_nhanh']);B(0).click();await W(300);NT16.setLoadout(['phan_cong','vo_nl','tu_truong']);B(1).click();await W(300);
    B(0).click();await W(400);const a0=NT16.loadout();B(1).click();await W(400);const a1=NT16.loadout();
    NT16.setLoadout(['pha_giap','hap_thu','duy_tri']);B('s').click();await W(300);B(0).click();await W(300);B(1).click();await W(300);const a2=NT16.loadout();return {before,a0,a1,a2}}""")
  print(r);chk('Bộ 1/2/3 lưu và đổi 3 Đá Nội Tại',r['a0']==['xung_kich','xung_chan','nap_nhanh'] and r['a1']==['phan_cong','vo_nl','tu_truong'],r);chk('LƯU ghi đè bộ đang chọn',r['a2']==['pha_giap','hap_thu','duy_tri'])
  print('ERR',errs[:3]);print('KẾT QUẢ',len(ok),'/',len(ok)+len(bad),'trượt:',bad)
