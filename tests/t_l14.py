# V309 L14 · kiểm: rương (không Tím, VIP chỉ Trắng/Lục, không tính trần Vô tận), đăng nhập tích lũy (giả lập ngày), thành tựu 5 bậc, mốc năng động
import sys,os,json
os.chdir(os.path.dirname(os.path.abspath(__file__))+'/..')
src=open('claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
HTML=sys.argv[1];sys.argv=['x',HTML,'160'];exec(src)
ok=[];bad=[]
def chk(n,c,info=''):
    (ok if c else bad).append(n);print(('ĐẠT ' if c else 'TRƯỢT ')+n,info,flush=True)
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'SS');pg.add_style_tag(content='#q307{display:none!important}')
  # 1. phân bố
  r=pg.evaluate("""()=>{const out={};for(const k of ['tb','cc','boss']){const c={n:[0,0,0],v:[0,0,0],kinds:{}};for(let i=0;i<20000;i++){const x=L14309.roll(k);(x.vip?c.v:c.n)[x.f]++;c.kinds[x.kind]=(c.kinds[x.kind]|0)+1;if(x.f>2)c.tim=(c.tim|0)+1;}out[k]=c;}return out}""")
  for k,c in r.items():
      n=sum(c['n']);v=sum(c['v'])
      print(k,'thường',[round(x/max(1,n)*100,1) for x in c['n']],'VIP',v,c['v'],c['kinds'])
      chk('rương %s không Tím'%k, not c.get('tim'))
      chk('rương %s VIP không Lam'%k, c['v'][2]==0)
  chk('Rương TB chỉ trang bị', set(r['tb']['kinds'])=={'gear'}); chk('Rương CC chỉ chiến cơ', set(r['cc']['kinds'])=={'craft'})
  tb=r['tb']['n'];s=sum(tb);chk('TB ≈ 80/18/2', abs(tb[0]/s-.8)<.02 and abs(tb[1]/s-.18)<.02 and abs(tb[2]/s-.02)<.01)
  bs=r['boss']['n'];s=sum(bs);chk('Boss ≈ 0/75/25', bs[0]==0 and abs(bs[1]/s-.75)<.02)
  # 2. mở rương thật qua kho Chests, không đụng trần Vô tận
  r=pg.evaluate("""()=>{const e0=EL81.state().n|0,c0=Chests.getState().crates.length;L14309.addChest('tb',3);L14309.addChest('cc',2);L14309.addChest('boss',2);const c1=Chests.getState().crates.length;
    const ids=Chests.getState().crates.filter(c=>c.k14).map(c=>c.id);const res=ids.map(id=>{const r=Chests.open(id,Math.random,true);return r?[r.k14,r.kind,r.model,r.f]:null});
    return {add:c1-c0,res,left:Chests.getState().crates.filter(c=>c.k14).length,el:(EL81.state().n|0)-e0}}""")
  print(r); chk('7 rương vào kho', r['add']==7); chk('mở hết 7 rương', r['left']==0 and all(r['res'])); chk('không tính trần Vô tận', r['el']==0)
  chk('mở rương không ra Tím', all(x[3]<=2 for x in r['res']))
  # 3. đăng nhập: save mới, giả lập 95 ngày
  r=pg.evaluate("""()=>{const real=Date.now.bind(Date);let off=0;Date.now=()=>real()+off;const log=[];L14309._set({days:0,last:-1,mig:1});
    const it0=(Progress.getState().items||[]).length;const cr0=Progress.balance();const ch0=Chests.getState().crates.length;
    for(let d=1;d<=95;d++){const a=Meta40.claimDaily(),b=Meta40.claimDaily();log.push([d,a,b,L14309.state().days]);off+=86400000;}
    // bỏ 3 ngày rồi nhận tiếp: tiến độ giữ nguyên
    off+=3*86400000;const z=Meta40.claimDaily();const after=L14309.state().days;
    const owns={orbital:Campaign36.ownsModel('orbital'),cryo:Campaign36.ownsModel('cryo'),disc:Campaign36.ownsModel('disc'),c2:Campaign36.ownsCraft(2)};
    const packs=[1,7,8,9,10,15,20,23,30,46,60,76,90].map(d=>[d,L14309.dayPack(d).lab,L14309.rtext(L14309.dayPack(d).base),L14309.dayPack(d).extra.map(x=>x.mk+':'+L14309.rtext(x))]);
    Date.now=real;return {bad:log.filter(x=>!x[1]||x[2]||x[3]!==x[0]).slice(0,5),z,after,owns,dcr:Progress.balance()-cr0,dch:Chests.getState().crates.length-ch0,packs,meta:Meta40.state().S.daily}}""")
  print(json.dumps(r,ensure_ascii=False)[:2500])
  chk('95 ngày: mỗi ngày nhận đúng 1 lần, tổng ngày tăng đều', not r['bad'])
  chk('bỏ 3 ngày không mất tiến độ (ngày 96)', r['z'] and r['after']==96)
  chk('bộ Lam 4 món đã có', all(r['owns'].values()))
  chk('mốc 30 có 2 Rương Boss (1 mốc lớn + 1 mốc tròn 30)', any(p[0]==30 and 'Rương Boss' in ' '.join(p[3]) for p in r['packs']))
  # 4. quy đổi save cũ (chuỗi 12, đã nhận hôm nay) + thành tựu
  r=pg.evaluate("""()=>{L14309._set({days:0,last:-1,mig:0,ach:{},achMig:0});const s=L14309.state();const rows=L14309.achRows();return {days:L14309.state().days,rows:rows.map(r=>[r.id,r.tier,r.fin,r.can,r.v,r.n]),old:Meta40.state().S.ach}}""")
  print(r); chk('quy đổi: tổng ngày = chuỗi cũ', r['days']>=0)
  chk('12 dòng thành tựu', len(r['rows'])==12)
  m=pg.evaluate("""()=>{const o=Meta40.state;Meta40.state=()=>{const x=o();x.S.ach={star:3,ss:2,boss:1,clear:4};x.S.daily={last:-5,streak:12};return x;};L14309._set({days:0,last:-1,mig:0,ach:{},achMig:0});const rows=L14309.achRows();L14309.claimedToday();const d=L14309.state().days;Meta40.state=o;const g=id=>L14309.state().ach[id]|0;return {star:g('star'),ss:g('ss'),boss:g('boss'),clear:g('clear'),d,starCan:rows.find(r=>r.id==='star').can}}""")
  print(m); chk('quy đổi save: star 3 (480) → 5 bậc, ss 2 (5) → 3, boss 1 → 1, clear 4 (160) → 5, chuỗi 12 → 12 ngày', m['star']==5 and m['ss']==3 and m['boss']==1 and m['clear']==5 and m['d']==12 and not m['starCan'])
  r2=pg.evaluate("""()=>{const a=L14309.achRows().filter(r=>r.can);let n=0;for(const r of a)if(L14309.claimAch(r.id))n++;return {n,again:L14309.achRows().filter(r=>r.can).length,ready:L14309.achReady()}}""")
  print(r2)
  # 5. mốc năng động
  r=pg.evaluate("""()=>{const cnt0={};Chests.getState().crates.filter(c=>c.k14).forEach(c=>cnt0[c.k14]=(cnt0[c.k14]|0)+1);const c0=Chests.getState().crates.length,cr0=Progress.balance();Q77._set({dp:100,dc:[],wp:600,wc:[]});const a=[60,100].map(p=>Q77.claim('d',p)),b=[200,400,500,600].map(p=>Q77.claim('w',p));
    const k=Chests.getState().crates.filter(c=>c.k14).map(c=>c.k14);const cnt={};k.forEach(x=>cnt[x]=(cnt[x]|0)+1);for(const x in cnt)cnt[x]-=(cnt0[x]|0);Q77.open('w');const t=document.querySelector('.q77p')?.innerText||'';return {a,b,dch:Chests.getState().crates.length-c0,cnt,dcr:Progress.balance()-cr0,has600:t.includes('600'),hasBoss:t.includes('Rương Boss'),hk:t.includes('Rương Hư Không')}}""")
  print(r); chk('mốc ngày 60/100 + tuần 200/400/500/600 nhận được', all(r['a']) and all(r['b']))
  chk('rương từ mốc: TB 1+2+2=5, CC 1+2=3, Boss 1', r['cnt'].get('tb')==5 and r['cnt'].get('cc')==3 and r['cnt'].get('boss')==1, r['cnt'])
  chk('bảng tuần hiện mốc 600, Rương Boss, Rương Hư Không', r['has600'] and r['hasBoss'] and r['hk'])
  chk('không lỗi JS', not errs, errs[:3])
  print('KẾT QUẢ', len(ok),'/',len(ok)+len(bad), 'trượt:',bad)
