# V156 · Phần E: Xưởng SSS 24 công thức · Tím +1 · Lv1–5 · chọn SSS cho món mẹ chung · chuyển save v1 · đá 3→1 / rèn đặc biệt · đổi Tinh Hạch
import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];O=sys.argv[2]+'/';OK=[]
def chk(n,c):OK.append(('✓' if c else '✗')+' '+n);print(OK[-1],flush=True)
V1=json.dumps({"v":1,"owned":{"sss_aegis_mirror":{"at":1},"sss_mirror_orbital":{"at":1},"sss_prism_rail":{"at":1}},"equip":{"armor":"sss_mirror_orbital","missiles":None,"sidearm":None}})
with sync_playwright() as p:
  b=p.chromium.launch();pg=b.new_page(viewport={'width':393,'height':852},device_scale_factor=2);pg.on('dialog',lambda d:d.accept());errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  # 1) chuyển save v1
  pg.goto('file://'+f+'?nopop');pg.wait_for_function("()=>typeof Gear44==='object'",timeout=120000)
  pg.evaluate("(v)=>{localStorage.removeItem('saobang-gear-sss-v2');localStorage.setItem('saobang-gear-sss-v1',v)}",V1);pg.reload();pg.wait_for_function("()=>typeof Gear44==='object'",timeout=120000);pg.wait_for_timeout(2000)
  st=pg.evaluate("()=>Gear44.state()")
  chk('24 công thức SSS (%d)'%pg.evaluate("()=>Gear44.defs().length"),pg.evaluate("()=>Gear44.defs().length")==24)
  ow=sorted(st['owned']);chk('Chuyển v1: giữ aegis_mirror, 2 món bị bỏ đổi sang SSS chung món mẹ (%s) · bind %s'%(ow,st['bind']),'sss_aegis_mirror' in ow and len(ow)==3 and all(x in [d for d in ow] for x in ow) and 'sss_mirror_orbital' not in ow)
  chk('Khóa v1 không bị xóa',pg.evaluate("()=>!!localStorage.getItem('saobang-gear-sss-v1')"))
  # 2) tài khoản quản trị (đồ Tím +5), xóa SSS để thử hợp thể
  pg.evaluate("()=>Gfx66.open()");pg.wait_for_timeout(800);pg.fill('#st66-code','SAOBANG-ADMIN-2026');pg.click('[data-adm]');pg.wait_for_timeout(600)
  try:pg.click('[data-adm]',timeout=3000)
  except Exception:pass
  pg.wait_for_timeout(15000);pg.wait_for_function("()=>typeof Gear44==='object'",timeout=120000);pg.wait_for_timeout(2000)
  chk('Quản trị: sở hữu đủ 24 SSS Lv5 (%d)'%len(pg.evaluate("()=>Gear44.state().owned")),len(pg.evaluate("()=>Gear44.state().owned"))==24)
  pg.evaluate("()=>{localStorage.setItem('saobang-gear-sss-v2',JSON.stringify({v:2,owned:{},bind:{},wk:{w:0,n:0},pay:null}))}");pg.reload();pg.wait_for_function("()=>typeof Gear44==='object'",timeout=120000);pg.wait_for_timeout(2500)
  pg.evaluate("()=>{for(const m of ['alloy3','crystal3','circuit3','plasma3'])V70.add(m,-(V70.have(m)|0));V70.add('sss_core',-(V70.have('sss_core')|0))}")
  c0=pg.evaluate("()=>Gear44.canFuse('sss_thunder_singularity')");chk('Thiếu nguyên liệu thì không hợp thể (%s)'%c0['why'],not c0['ok'] and 'Thiếu' in c0['why'])
  pg.evaluate("()=>{for(const m of ['alloy3','crystal3','circuit3','plasma3'])V70.add(m,60);V70.add('sss_core',40)}")
  r=pg.evaluate("""()=>{const cr0=Progress.balance(),a0=V70.have('alloy3'),k0=V70.have('crystal3');const ok=Gear44.fuse('sss_thunder_singularity');document.querySelector('.g44-rite')&&(document.querySelector('.g44-rite').hidden=true);
    return {ok,dcr:cr0-Progress.balance(),da:a0-V70.have('alloy3'),dk:k0-V70.have('crystal3'),lv:Gear44.lvOf('sss_thunder_singularity'),enh:Gear44.sssEnh('sss_thunder_singularity')}}""")
  chk('Hợp thể Lv1 trừ đúng 2 Lõi Hợp Kim + 2 Tinh Thể Tím + 10.000 ◈, cường hóa +10 (%s)'%r,r['ok'] and r['dcr']==10000 and r['da']==2 and r['dk']==2 and r['lv']==1 and r['enh']==10)
  u=pg.evaluate("()=>{const L=[];for(let i=0;i<4;i++){const cr=Progress.balance();Gear44.upgrade('sss_thunder_singularity');L.push(cr-Progress.balance())}return {lv:Gear44.lvOf('sss_thunder_singularity'),L,more:Gear44.upgrade('sss_thunder_singularity')}}")
  chk('Nâng Lv2→5 tốn 15k/20k/30k/40k, dừng ở Lv5 (%s)'%u,u['lv']==5 and u['L']==[15000,20000,30000,40000] and not u['more'])
  # 3) món mẹ chung: aegis (aegis_mirror nhóm I · monarch_aegis nhóm III)
  g=pg.evaluate("""()=>{if(!Progress.getState().items.some(i=>i.variant==='monarch12_a')){Campaign36.acquire('gear','monarch12_a','SS','endless');}const mi=Progress.getState().items.filter(i=>i.variant==='monarch12_a').slice(-1)[0];V70.setTier('gear',mi.id,11);Gear44.fuse('sss_aegis_mirror');Gear44.fuse('sss_monarch_aegis');document.querySelector('.g44-rite').hidden=true;const it=Progress.getState().items.find(i=>i.variant==='aegis');Progress.equip(it.id);
    const a=Gear44.activeId('armor');Gear44.equipSSS('armor','sss_aegis_mirror');const b=Gear44.activeId('armor');Gear44.equipSSS('armor',null);const c=Gear44.activeId('armor');Gear44.equipSSS('armor','sss_monarch_aegis');const d=Gear44.activeId('armor');return {a,b,c,d}}""")
  chk('Món mẹ chung: mặc định nhóm cao hơn, chọn được, gỡ về món thường (%s)'%g,g=={'a':'sss_monarch_aegis','b':'sss_aegis_mirror','c':'aegis','d':'sss_monarch_aegis'})
  m=pg.evaluate("""()=>{window.SSSE3=false;const it=Progress.getState().items.find(i=>i.variant==='thunder');Progress.equip(it.id);const s1=Progress.stats().equipment.find(e=>e.kind==='missiles');window.SSSE3=false;Gear44.equipSSS('missiles',null);const s0=Progress.stats().equipment.find(e=>e.kind==='missiles');Gear44.equipSSS('missiles','sss_thunder_singularity');const r={k:s1.auxDamage/s0.auxDamage,m:Gear44.sssM('missiles')};window.SSSE3=undefined;return r}""")
  chk('Hỏa lực SSS ×1,35×(1+3%%×10) = %.3f (đo %.3f)'%(m['m'],m['k']),abs(m['k']-1.755)<.01)
  # 4) đổi Tinh Hạch
  x=pg.evaluate("""()=>{const c0=V70.have('sss_core'),p0=['alloy3','crystal3','circuit3','plasma3'].reduce((a,k)=>a+V70.have(k),0),w0=Gear44.wkLeft();Gear44.toCore();const c1=V70.have('sss_core'),p1=['alloy3','crystal3','circuit3','plasma3'].reduce((a,k)=>a+V70.have(k),0);Gear44.fromCore('plasma3');return {dc:c1-c0,dp:p0-p1,w:[w0,Gear44.wkLeft()],c2:V70.have('sss_core')-c1}}""")
  chk('3 nguyên liệu Tím → 1 Tinh Hạch (giới hạn tuần 25→24 · V203) và 1 Tinh Hạch → 1 nguyên liệu Tím (%s)'%x,x['dc']==1 and x['dp']==3 and x['w']==[25,24] and x['c2']==-1)
  # 5) đá
  s=pg.evaluate("""()=>{const st=()=>Stone71.state().st;const keep=new Set(st().map(s=>s.id));for(let i=0;i<3;i++)Stone71.give(Stone71.make(0,'ship',{ty:'stat'}));const n=Stone71.mergeAll('ship');const nw=st().filter(s=>!keep.has(s.id));
    for(let i=0;i<4;i++)Stone71.give(Stone71.make(2,'armor',{ty:'stat'}));Stone71.give(Stone71.make(1,'armor',{ty:'stat'}));const o=Stone71.forgeOpts('armor')[0];const c0=V70.have('sss_core');const x=Stone71.forgeX('armor',o.ty,o.m);const xs=x&&[x.t,x.ty],dc=c0-V70.have('sss_core');
    for(let i=0;i<2;i++)Stone71.give(Stone71.make(3,'armor',{ty:'stat'}));const y=x&&Stone71.upX(x.id);return {n,nw:nw.map(s=>s.t),x:xs,dc,y:y&&[y.t,y.ty],k:Stone71.C.merge.k}}""")
  chk('Đá: ghép 3→1 (%s) · rèn đặc biệt Tím %s tốn 9 Tinh Hạch (%d) · nâng Cam %s'%(s['nw'],s['x'],s['dc'],s['y']),s['k']==3 and 1 in s['nw'] and s['x'] and s['x'][0]==3 and s['dc']==9 and s['y'] and s['y'][0]==4 and s['y'][1]==s['x'][1])
  # 6) giao diện
  pg.evaluate("()=>{document.querySelectorAll('.m63').forEach(e=>e.hidden=true);mode='menu';Gear44.open('missiles')}");pg.wait_for_timeout(1500);pg.screenshot(path=O+'xuong_ten_lua.png')
  pg.click('#g44 [data-tab="armor"]');pg.wait_for_timeout(800);pg.screenshot(path=O+'xuong_giap.png')
  pg.click('#g44 [data-tab="items"]');pg.wait_for_timeout(800);pg.screenshot(path=O+'xuong_vat_pham.png')
  chk('Giao diện: 8 dòng mỗi loại, thẻ vật phẩm hiện',pg.evaluate("()=>{Gear44.open('sidearm');return document.querySelectorAll('#g44 .g44-r').length}")==8)
  pg.evaluate("()=>Gear44.close()")
  # 7) vào trận với SSS món Bộ 07–13 (judgement36 + swarm9) — không lỗi
  pg.evaluate("()=>{for(const id of ['sss_judgement_swarm','sss_aurora_void']){const d=Gear44.defs().find(x=>x.id===id);for(const v of d.parents){let it=Progress.getState().items.filter(i=>i.variant===v).sort((a,b)=>V70.nOf(b)-V70.nOf(a))[0];if(!it||V70.nOf(it)<7){try{Campaign36.acquire('gear',v,'SS','endless');it=Progress.getState().items.filter(i=>i.variant===v).slice(-1)[0];V70.setTier('gear',it.id,11);}catch(e){}}}}}")  # V191: tự cấp món mẹ thiếu (admin không có swarm9 → test trượt theo ngày)
  pg.evaluate("()=>{Gear44.fuse('sss_judgement_swarm');Gear44.fuse('sss_aurora_void');document.querySelector('.g44-rite').hidden=true;Gear44.equipSSS('missiles','sss_judgement_swarm');Gear44.equipSSS('armor','sss_aurora_void')}")
  GO="""(st)=>{document.querySelectorAll('.m63').forEach(e=>e.hidden=true);mode='menu';try{Lobby.show()}catch{};Progress.setLocked(false);try{V75.addEn(60)}catch{};try{Fusion.select(null)}catch{};document.getElementById('gamemode').value='campaign';try{syncModeSetup()}catch{};document.getElementById('mission-select').value=String(st);Lobby.hide();reset();if(mode==='pause')mode='play';
    if(!window.__iv)window.__iv=setInterval(()=>{try{invuln=999;hp=maxHp;const d=document.getElementById('st80');if(d)d.hidden=true;window.__st80=0;if(mode==='pause')mode='play';}catch{}},120)}"""
  pg.evaluate(GO,60);pg.wait_for_timeout(9000)
  t=pg.evaluate("()=>({mode,a:Gear44.activeId('armor'),m:Gear44.activeId('missiles'),mm:Gear44.sssM('missiles'),hp:Math.round(maxHp*100)/100})")
  pg.screenshot(path=O+'tran.png')
  chk('Trong trận: SSS Bộ 07–13 hoạt động, không lỗi (%s · lỗi %d)'%(t,len(errs)),t['mode']=='play' and t['m']=='sss_judgement_swarm' and t['a']=='sss_aurora_void' and t['mm']>1.0 and not errs)
  if errs:print(errs[:3])
  # 8) V157 · E3: nội tại / Tuyệt kỹ chạy, giáp SSS có tầng khiên, nội tại giáp mẹ tắt
  pg.evaluate("()=>{mode='menu';Progress.setLocked(false);Gear44.fuse('sss_inferno_cryo');Gear44.fuse('sss_aegis_mirror');document.querySelector('.g44-rite').hidden=true;Gear44.equipSSS('missiles','sss_inferno_cryo');Gear44.equipSSS('armor','sss_aegis_mirror')}")
  pg.evaluate(GO,60);pg.wait_for_timeout(9000)
  e=pg.evaluate("()=>({s:SSSE3_API.state(),A:!!window.SSSE_A,nt:(typeof NT147S!=='undefined')})")
  pg.evaluate("()=>{try{activateSuper()}catch(e){}}");pg.wait_for_timeout(700);pg.screenshot(path=O+'tran_e3.png')
  f2=pg.evaluate("()=>SSSE3_API.state().fx")
  chk('E3: nội tại tên lửa gây sát thương (%d), giáp SSS có tầng khiên (%s), Tuyệt kỹ vẽ hiệu ứng (%d), không lỗi (%d)'%(e['s']['dealt'],e['s']['a'],f2,len(errs)),e['s']['dealt']>0 and e['s']['a'] and e['s']['a']['layer']==1 and e['A'] and f2>0 and not errs)

  b.close()
print('\n'.join(OK));print(sum(o[0]=='✓' for o in OK),'/',len(OK))
