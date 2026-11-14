# V79 · bộ kiểm thử theo danh sách 16 tình huống của Gemini (REVIEW79B §7) — phần áp dụng được
import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];R={}
SEED="""if(!sessionStorage.getItem('t79')){sessionStorage.setItem('t79','1');
 const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:60},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));
 const c=JSON.parse(localStorage.getItem('saobang-campaign-v36')||'{}');c.stars={};for(let i=1;i<=60;i++)c.stars[i]=i<=20?3:(i<=40?(i%5===0?1:3):2);localStorage.setItem('saobang-campaign-v36',JSON.stringify(c));}"""
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':393,'height':852});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3500);pg.add_init_script(SEED);pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(4500)
    # T1 + T3: quà bộ — món đã cao hơn không bị hạ, nhận phôi thay thế; bộ 2 chỉ mở sau khi xong bộ 1
    R['t1_t3']=pg.evaluate("""()=>{const o={};o.s0=Set79.state();Set79.claim();const id=Set79.state().ids.mirror;V70.setTier('gear',id,3);const ph0=(V70.phList()['g:mirror:2']|0)+Evo82.list().filter(c=>c.m==='mirror').length;
      Set79.claim();o.mirrorN=V70.nOf(Progress.getState().items.find(i=>i.id===id));o.phGain=(V70.phList()['g:mirror:2']|0)+Evo82.list().filter(c=>c.m==='mirror').length-ph0;o.afterLam=Set79.state();Set79.claim();o.afterTim=Set79.state();
      o.set2ready=Set79.ready();return o;}""")
    # T5: 10.000 lượt rương Vô tận + 4.000 lượt phó bản trang bị cấp 4 → 0 phôi Tím
    R['t5']=pg.evaluate("""()=>{const b0={...V70.phList()};for(let i=0;i<10000;i++)Chest74V70({grade:i%4?'B':'A',type:i%2?'gear':'craft'});for(let i=0;i<4000;i++)Campaign36.loot('equipment',4);
      const a=V70.phList();let tim=0,all=[0,0,0,0];for(const k in a){const d=(a[k]|0)-(b0[k]|0);all[+k.slice(-1)]+=d;if(k.endsWith(':3'))tim+=d;}return {tim,all};}""")
    # T6: đồ bậc S nhận được → khung Lam (nấc 2)
    R['t6']=pg.evaluate("""()=>{const r=Campaign36.acquire('gear','inferno','S','equipment');try{V70.sync();}catch{}const it=r&&r.item;return it?V70.nOf(it):'noitem';}""")
    # T11: buff boss — cách nhau ≥ 3,5 s và trần mỗi trận
    R['t11']=pg.evaluate("""()=>{const o=[];window.boss={hp:1,maxHp:1};time=100;o.push(Bal787.bossTake());time=100.8;o.push(Bal787.bossTake());time=104;o.push(Bal787.bossTake());time=108;o.push(Bal787.bossTake());time=112;o.push(Bal787.bossTake());window.boss=null;return o;}""")
    # T12: đếm thắng/càn quét ải boss
    R['t12']=pg.evaluate("""()=>{const a=Ach79.state().boss;gameMode='campaign';for(let i=0;i<5;i++)Workshop.rollStage(10,0);Workshop.rollStage(11,0);return Ach79.state().boss-a;}""")
    # T13: thưởng sao chương mốc 50★ (chương 2 có 20 ải × ~2.8★)
    R['t13']=pg.evaluate("""()=>{const s=Campaign36.getState().stars;let t=0;for(let i=21;i<=40;i++)t+=s[i]|0;return t;}""")
    # T14: chặn trang cũ
    R['t14']=pg.evaluate("""()=>new Promise(res=>{UI392.showTab('arsenal',true);setTimeout(()=>{const e=document.elementFromPoint(196,400);res(!!(e&&e.closest('main')&&!e.closest('#hub40,#cmap,#hgr41')) ? 'LEGACY':'ok:'+Nav74.state().cur);},900);})""")
    # lộ trình chiến cơ #10 (phá đảo ải 160) + mốc năng động 100
    R['ship2']=pg.evaluate("""()=>{const g0=Progress.getState;Progress.getState=function(){const o=g0.apply(this,arguments);o.cleared=Array.from({length:160},(_,i)=>i+1);return o;};
      const ready=Ship79.ready();const ok=Ship79.claim(4);Progress.getState=g0;return {ready,ok,own:Campaign36.ownsCraft(9),n:V70.craftN(9),again:Ship79.claim(4)}}""")
    R['q100']=pg.evaluate("""()=>{try{Evo82._reset()}catch{};const ph0=JSON.stringify(V70.phList())+Evo82.list().map(c=>c.u).join();const st=Q77.state();Q77._set({dp:100,dc:[]});const n=Q77.claimAll();return {n,changed:JSON.stringify(V70.phList())+Evo82.list().map(c=>c.u).join()!==ph0,xp:S77.state().xp}}""")
    # bảng thưởng phó bản
    R['dg']=pg.evaluate("()=>({gold:DG79T.cr.gold,gem:DG79T.gem,starHint:typeof STAR79TXT==='function'?STAR79TXT(45):null})")
    R['errs']=errs;b.close()
ok=[]
t=R['t1_t3'];ok.append(('T1 không hạ cấp',t['mirrorN']>=3));ok.append(('T1 bản sao/phôi thay thế',t['phGain']>=1));ok.append(('T3 chuyển bộ 2',t['afterTim']['k']==1))
ok.append(('T5 không phôi Tím',R['t5']['tim']==0));ok.append(('T6 đồ S = Lam',R['t6']==2))
ok.append(('T11 cách 3.5s + trần',R['t11'][:3]==[True,False,True] and R['t11'].count(True)<=3))
ok.append(('T12 đếm ải boss',R['t12']==5));ok.append(('T13 chương 2 ≥ 50★',R['t13']>=50));ok.append(('T14 chặn trang cũ',str(R['t14']).startswith('ok')));ok.append(('Chiến cơ #10 mở (V82: khung Lam)',R['ship2']['own'] and R['ship2']['n']>=2 and not R['ship2']['again']));ok.append(('Năng động 5 mốc',R['q100']['n']>=5 and R['q100']['changed'] and R['q100']['xp']>=250));ok.append(('không lỗi JS',not R['errs']))
print(json.dumps(R,ensure_ascii=False)[:1500])
print(R.get('ship2'));print('KẾT QUẢ',' · '.join(('✓ ' if v else '✗ ')+k for k,v in ok))
