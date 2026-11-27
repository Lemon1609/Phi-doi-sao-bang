# V2.3 U2 (v23-ui-meta): thẻ Túi đồ mật độ cao (4 tab) + danh sách phi công (mảnh thật, chấm đỏ đúng, luật đội hình) · không đổi kinh tế
# python3 tests/t_u2_v23.py <html tuyệt đối>
import sys,os,json
src=open('claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
HTML=sys.argv[1];sys.argv=['x',HTML,'160'];exec(src)
t209=open('tests/v203_v212/t209.py').read();exec(t209[t209.find('def start'):t209.find('with sync_playwright')])
R=[]
def ck(n,ok,d=None):R.append(bool(ok));print(('ĐẠT ' if ok else 'TRƯỢT ')+n,'' if d is None else json.dumps(d,ensure_ascii=False)[:480],flush=True)
RSEED="""(()=>{try{const PP=[[5,8],[10,11],[7,9],[12,12],[2,6],[0,3],[1,4]];const r=JSON.parse(localStorage.getItem('saobang-robots-v1')||'null');if(!r||!(r.supers||[]).length)localStorage.setItem('saobang-robots-v1',JSON.stringify({unlocked:[],selected:null,supers:[6].map(k=>({key:'sss:'+k,model:k,a:PP[k][0],b:PP[k][1],form:0})),fusionVersion:2}));}catch(e){}})()"""
ECON="()=>JSON.stringify({cr:Progress.balance(),gem:(()=>{try{return Econ74.gems()}catch(e){return null}})(),xp:XPDA307.total(),items:Progress.v70.items().map(i=>[i.id,i.level|0,i.variant]).sort(),pil:Pilot67.state(),eq:Progress.v70.equipped(),cp:(()=>{try{return Combat.stats().attack}catch(e){return 0}})()})"
CNT="""()=>{const P=CanvasRenderingContext2D.prototype,od=Object.getOwnPropertyDescriptor(P,'shadowBlur'),of=Object.getOwnPropertyDescriptor(P,'filter'),oc=document.createElement;window.__k23={sb:0,fl:0,cv:0};
 Object.defineProperty(P,'shadowBlur',{configurable:true,get(){return od.get.call(this)},set(v){if(v>0)__k23.sb++;od.set.call(this,v)}});Object.defineProperty(P,'filter',{configurable:true,get(){return of.get.call(this)},set(v){if(v&&v!=='none')__k23.fl++;of.set.call(this,v)}});
 document.createElement=function(t){if(String(t).toLowerCase()==='canvas'){__k23.cv++;(__k23.st=__k23.st||[]).push((new Error).stack.split(String.fromCharCode(10)).slice(2,4).join('|'))}return oc.apply(this,arguments)};window.__k23off=()=>{Object.defineProperty(P,'shadowBlur',od);Object.defineProperty(P,'filter',of);document.createElement=oc;return __k23}}"""
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'SS')
  sid=pg.evaluate("()=>{const it=Progress.v70.get(Progress.v70.equipped().armor);const d=Gear44.defs().find(d=>d.kind==='armor'&&d.parents.includes(it.variant));return d?d.id:null}")
  snap=pg.evaluate("()=>JSON.stringify(Object.fromEntries(Object.keys(localStorage).map(k=>[k,localStorage.getItem(k)])))")
  pg.add_init_script("(()=>{try{const S=%s;for(const k in S)localStorage.setItem(k,S[k]);}catch(e){}})()"%snap)
  pg.add_init_script(RSEED)
  pg.add_init_script("(()=>{try{const k='saobang-gear-sss-v2';const o=JSON.parse(localStorage[k]||'null')||{v:2,owned:{},bind:{},wk:{w:0,n:0},pay:null,l4:1};o.v=2;o.l4=o.l4||1;if(!o.owned['%s'])o.owned['%s']={lv:3,at:1};localStorage[k]=JSON.stringify(o);}catch(e){}})()"%(sid,sid))
  pg.reload();pg.wait_for_timeout(7000)
  pg.evaluate("()=>{document.querySelectorAll('#q307,#tutorial392').forEach(e=>e.remove());document.querySelectorAll('.m63,.adv70,.st71').forEach(e=>e.hidden=true);try{Progress.setLocked(false)}catch{};Gfx66.set('light');window.NOBS22=false}");pg.wait_for_timeout(600)
  econ0=pg.evaluate(ECON)
  ck('Chuẩn bị: 1 Chiến Thần (mẫu 6, ghép chiến cơ 2+5) + 1 SSS gắn giáp đang mặc',sid and pg.evaluate("()=>Fusion.getState().supers.length>0&&/^sss_/.test(Gear44.activeId('armor'))"),sid)
  # 1) Túi đồ 4 tab
  pg.evaluate("()=>{Nav74.tab('home')}");pg.wait_for_timeout(1500)
  pg.evaluate("()=>document.querySelector('[data-ck9=kho]').click()");pg.wait_for_timeout(2500)
  pg.evaluate("()=>document.querySelector('.c9bar .bag').click()");pg.wait_for_timeout(1500)
  TAB="""(k)=>{const rows=[...document.querySelectorAll('#k307 .k307-row[data-k=item],#k307 .k307-row[data-k=ship]')];const RR=e=>e.getBoundingClientRect();
   const out={n:rows.length,bad:[],link:[],skillBad:[],clip:[]};const pairs=FusionBlueprints.pairs,sup=Fusion.getState().supers.map(q=>q.model);
   for(const r of rows){const id=r.dataset.id,ship=r.dataset.k==='ship';const has=s=>!!r.querySelector(s);if(!(r.classList.contains('u2c')&&has('.k307-ic > .u2st')&&has('.k307-ic > .u1lk')&&has('.u2l1')&&has('.u2l2')))out.bad.push(id);
    let skill='',linked=false;if(ship){skill=Fighters28.profiles[+id].weapon;linked=sup.some(m=>(pairs[m]||[]).includes(+id));}else{const it=Progress.v70.get(id);skill=(GearCatalog[it.variant]||{}).skill||'';const eqd=Object.values(Progress.v70.equipped()).includes(id);linked=eqd&&!!Gear44.sssFor(it.variant,it.kind);}
    const l3=r.querySelector('.u2l3 b');if(skill&&(!l3||l3.textContent!==skill))out.skillBad.push(id);
    if(linked!==has('.u2ln'))out.link.push(id+':'+linked);if(linked)out.nl=(out.nl||0)+1;
    const rb=RR(r);for(const e of r.querySelectorAll('.u2l1,.u2l2,.u2l3,.u2l1 *,.u2l2 *,.u2l3 *,.k9a')){const q=RR(e);if(!q.width)continue;if(e.scrollWidth>e.clientWidth+1&&getComputedStyle(e).overflow!=='visible'||q.top<rb.top-.5||q.bottom>rb.bottom+.5||q.right>rb.right+.5)out.clip.push(id+':'+(e.className||e.tagName));}}
   return out}"""
  res={}
  for k in ['craft','armor','missiles','sidearm']:
    pg.evaluate("(k)=>document.querySelector('#k307 [data-k=kf][data-id='+k+']').click()",k);pg.wait_for_timeout(900)
    res[k]=pg.evaluate(TAB,k)
  ok=all(v['n']>0 and not v['bad'] and not v['skillBad'] and not v['link'] and not v['clip'] for v in res.values())
  ck('Túi đồ 4 tab (Chiến cơ · Giáp · Tên lửa · Tàu con): mỗi thẻ có cột sao dọc, ổ khóa, 3 dòng; Đặc kỹ đúng GearCatalog.skill / Fighters28.weapon; xích Chiến Thần đúng món đang cấp sức; 0 chữ tràn / tràn khung',ok,{k:{'n':v['n'],'nl':v.get('nl',0),'bad':v['bad'][:3],'skill':v['skillBad'][:3],'link':v['link'][:3],'clip':v['clip'][:3]} for k,v in res.items()})
  ck('Có xích Chiến Thần ở cả chiến cơ (2 tàu ghép mẫu 6) và giáp gắn SSS',res['craft'].get('nl',0)==2 and res['armor'].get('nl',0)>=1,{'craft':res['craft'].get('nl',0),'armor':res['armor'].get('nl',0)})
  d=pg.evaluate("""()=>{const w=Q10309.oc();const rows=[...document.querySelectorAll('#k307 .k307-row[data-k=item]')];let bad=0,n=0;for(const r of rows){const it=Progress.v70.get(r.dataset.id);const exp=w[it.kind]===it.variant;if(exp)n++;if(exp!==!!r.querySelector('.u2oc'))bad++;}return {n,bad}}""")
  ck('Cộng điểm +10% chỉ ở món trùng Siêu Tần Tuần (Q10309.oc, +10 % điểm Vô tận / món)',d['bad']==0,d)
  pg.evaluate("()=>{const x=document.querySelector('#k307 [data-k=x]');if(x)x.click()}");pg.wait_for_timeout(500)
  # 2) Danh sách phi công
  pg.evaluate("()=>{document.querySelectorAll('.m63').forEach(e=>e.hidden=true);Nav74.tab('home')}");pg.wait_for_timeout(1000)
  pg.evaluate("()=>document.querySelector('[data-ck9=pilot]').click()");pg.wait_for_timeout(1800)
  d=pg.evaluate("""()=>{const S=Pilot67.state(),bal=Progress.balance();const out={cards:0,bad:[],dots:0};
   for(const b of document.querySelectorAll('.m63.pl67 .pl67-list > button[data-v]')){out.cards++;const id=+b.dataset.v,R=Pilot67.ready(id),pc=S.pieces[id]|0;const sh=(b.querySelector('.u2psh')||{}).textContent||'';
    if(!sh.startsWith('Mảnh '+pc))out.bad.push(id+':mảnh '+sh+'≠'+pc);
    let ok=R.ok;if(R.st==='lv')ok=bal>=Pilot67.lvCost(S.own[id].lv).c;if(R.st==='tier'){const c=Pilot67.tierCost(id);ok=S.own[id].lv>=Pilot67.capOf(id)&&pc>=c.pieces&&bal>=c.c&&!c.core;if(c.core)ok=R.ok;}if(R.st==='max')ok=false;
    const dot=!!b.querySelector('.u2dot');if(dot)out.dots++;if(dot!==ok)out.bad.push(id+':chấm '+dot+'≠'+ok);if(!b.querySelector('.u2pbt'))out.bad.push(id+':nút');}
   const rule=(document.querySelector('.m63.pl67 .u2rule')||{}).textContent||'';out.rule=rule;out.sub=Pilot67.SUB;
   out.st=[...document.querySelectorAll('.m63.pl67 .pl67-st')].map(p=>p.innerText.replace(/\\s+/g,' ').trim());return out}""")
  pct=('%g'%(d['sub']*100)).replace('.',',')
  ck('Phi công: mảnh = số thật trong save, chấm đỏ đúng khi làm được ngay (lên cấp / đột phá / chiêu mộ), đủ nút trạng thái',d['cards']==8 and not d['bad'],d)
  ck('Chú thích luật đội hình đúng số trong mã (lái chính 100 %, lái phụ = Pilot67.SUB)','100%' in d['rule'] and ('+'+pct+'%') in d['rule'] and abs(d['sub']-0.05)<1e-9,{'rule':d['rule'],'sub':d['sub']})
  import re
  ck('Dòng chỉ số PHI CÔNG & TIỀM NĂNG: không còn số lẻ không tên ở cuối',all(not re.search(r'·\s*\d+\s*$',s) or re.search(r'Mảnh\s*\d+\s*$',s) for s in d['st']) and d['st'],d['st'])
  # 3) kinh tế + đồ họa
  pg.evaluate("()=>{document.querySelectorAll('.m63').forEach(e=>e.hidden=true);Nav74.tab('home')}");pg.wait_for_timeout(1500)
  econ1=pg.evaluate(ECON)
  ck('Kinh tế / chỉ số không đổi sau khi xem Túi đồ + Phi công (hợp kim, kim cương, Đá XP, trang bị, phi công, công)',econ0==econ1,{'giong':econ0==econ1})
  bf=pg.evaluate("()=>[...document.querySelectorAll('body *')].filter(e=>{const v=getComputedStyle(e).backdropFilter;return v&&v!=='none'}).length")
  dpr=pg.evaluate("()=>{const c=document.querySelector('.h1-stage canvas');const r=c.getBoundingClientRect();return c.width/r.width}")
  ck('0 backdrop-filter · NHẸ DPR 1,00 (Sảnh)',bf==0 and abs(dpr-1)<=.02,{'bf':bf,'dpr':dpr})
  start(pg,12);pg.wait_for_timeout(4000);pg.evaluate(CNT);pg.wait_for_timeout(3500);k=pg.evaluate("()=>__k23off()")
  ck('Trong trận: 0 shadowBlur · 0 ctx.filter · 0 canvas mới',k['sb']==0 and k['fl']==0 and k['cv']==0,k)
  ck('Không lỗi JS',not errs,errs[:3])
  br.close()
print('KẾT QUẢ %d/%d'%(sum(R),len(R)))
