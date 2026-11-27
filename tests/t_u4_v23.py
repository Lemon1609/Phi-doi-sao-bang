# V2.3 U4 (v23-ui-meta): Bệ trưng bày 3D VKTT + MÔ-ĐUN SIÊU DUY (giao diện mới của Chip72 — chủ dự án chọn "khoác áo", 0 chỉ số mới)
# python3 tests/t_u4_v23.py <html tuyệt đối>
import sys,os,json
src=open('claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
HTML=sys.argv[1];sys.argv=['x',HTML,'160'];exec(src)
t209=open('tests/v203_v212/t209.py').read();exec(t209[t209.find('def start'):t209.find('with sync_playwright')])
R=[]
def ck(n,ok,d=None):R.append(bool(ok));print(('ĐẠT ' if ok else 'TRƯỢT ')+n,'' if d is None else json.dumps(d,ensure_ascii=False)[:560],flush=True)
CNT="""()=>{const P=CanvasRenderingContext2D.prototype,od=Object.getOwnPropertyDescriptor(P,'shadowBlur'),of=Object.getOwnPropertyDescriptor(P,'filter'),oc=document.createElement;window.__k23={sb:0,fl:0,cv:0};
 Object.defineProperty(P,'shadowBlur',{configurable:true,get(){return od.get.call(this)},set(v){if(v>0)__k23.sb++;od.set.call(this,v)}});Object.defineProperty(P,'filter',{configurable:true,get(){return of.get.call(this)},set(v){if(v&&v!=='none')__k23.fl++;of.set.call(this,v)}});
 document.createElement=function(t){if(String(t).toLowerCase()==='canvas')__k23.cv++;return oc.apply(this,arguments)};window.__k23off=()=>{Object.defineProperty(P,'shadowBlur',od);Object.defineProperty(P,'filter',of);document.createElement=oc;return __k23}}"""
VK="()=>{Ult72._set({gift:1,w:{world:{own:1,r:10,lv:62,sh:0},fortress:{own:1,r:6,lv:40,sh:0},hunter:{own:1,r:3,lv:20,sh:0}},main:'world'});}"
CLEAN="()=>{document.querySelectorAll('#q307,#tutorial392').forEach(e=>e.remove());document.querySelectorAll('.m63').forEach(e=>e.hidden=true);try{Progress.setLocked(false)}catch{};Gfx66.set('light');Nav74.tab('home')}"
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'SS')
  snap=pg.evaluate("()=>JSON.stringify(Object.fromEntries(Object.keys(localStorage).map(k=>[k,localStorage.getItem(k)])))")
  pg.add_init_script("(()=>{if(localStorage.getItem('__u4seed'))return;try{const S=%s;for(const k in S)localStorage.setItem(k,S[k]);localStorage.removeItem('saobang-u4-v1');localStorage.setItem('__u4seed','1');}catch(e){}})()"%snap)
  pg.reload();pg.wait_for_timeout(7000);pg.evaluate(CLEAN);pg.wait_for_timeout(1000);pg.evaluate(VK)
  # bỏ chip cũ của hồ sơ quản trị để đếm sạch
  pg.evaluate("()=>{Chip72._set({ch:[],mat:{cry:5000,coder:5,core:60}})}")
  # ---------- 1. bệ 3D ----------
  pg.evaluate("()=>Ult72.open()");pg.wait_for_timeout(1800)
  d=pg.evaluate("""()=>{const sr=document.querySelector('.u72.srm .sr.u4sr');if(!sr)return null;const stg=sr.querySelector('.sr-stage');const bg=getComputedStyle(stg).backgroundImage;
   const imgs=[...document.querySelectorAll('.u72 img')].filter(i=>i.offsetParent);const bad=imgs.filter(i=>!i.complete||!i.naturalWidth).length;
   const own=Object.entries(Ult72.state().w).filter(([k,w])=>w.own).length;const cur=Ult72.cur(),w=Ult72.state().w[cur];
   const an=getComputedStyle(sr.querySelector('.sr-wpn')).animationName;
   return {bg:bg.slice(0,30),bad,n:imgs.length,sel:sr.querySelectorAll('.u4ow button').length,own,box:(sr.querySelector('.u4box')||{}).textContent,lv:'Lv.'+w.lv+'/'+Ult72.C.cap[w.r],an,
    btn:[...sr.querySelectorAll('.u4bb button')].map(b=>b.className.match(/u3p\\w+/g).join('')+':'+b.firstChild.textContent.trim()),dot:!!sr.querySelector('.u4bb .u4dot')}}""")
  ck('Bệ 3D VKTT: nền stage_vktt_3d, VKTT trôi (CSS), dải chọn đủ VKTT đã có, ô tóm tắt Lv thật, 0 ảnh hỏng; đáy MÔ-ĐUN SIÊU DUY (chấm đỏ khi còn khe lắp được) · CƯỜNG HÓA vàng · VỀ lam',d and 'data:image/webp' in d['bg'] and d['bad']==0 and d['sel']==d['own']==3 and d['lv'] in d['box'] and d['an']=='u4fl' and d['btn'][1].startswith('u3pg:CƯỜNG HÓA') and d['btn'][2]=='u3pb:VỀ' and 'MÔ-ĐUN SIÊU DUY' in d['btn'][0],d)
  # ---------- 2. mô-đun ----------
  pg.evaluate("()=>document.querySelector('.u4bb [data-u4b=mod]').click()");pg.wait_for_timeout(800)
  g=pg.evaluate("()=>({n:Chip72.state().ch.length,q:Chip72.state().ch.map(c=>c.q+':'+c.sh).sort(),gift:U4V23S.state().gift,open:!!document.querySelector('#u4m:not([hidden]) .u4c'),W:U4V23S.cur()})")
  ck('Mở MÔ-ĐUN SIÊU DUY lần đầu: tặng 3 mô-đun Lục (mỗi cụm 1)',g['n']==3 and g['q']==['0:fire','0:frame','0:link'] and g['gift']==1 and g['open'],g)
  W=g['W']
  # lắp tay: chạm khe 0 (Hỏa lực) rồi chạm mô-đun Hỏa lực
  a=pg.evaluate("""(W)=>{const B=Chip72.state();const atk0=Chip72.agg(W).atk;document.querySelector('#u4m [data-u4=slot][data-i="0"]').click();const id=Chip72.state().ch.find(c=>c.sh==='fire').id;document.querySelector('#u4m [data-u4=pick][data-id="'+id+'"]').click();
    const c=Chip72.state().ch.find(x=>x.id===id);return {eq:c.eq,atk0,atk1:Chip72.agg(W).atk,sum:document.querySelector('#u4m .u4sum').textContent,slot0:!!document.querySelector('#u4m [data-u4=slot][data-i="0"] .u4h.f0 i.cf')}}""",W)
  ck('Lắp tay: chạm khe Hỏa lực 1 → chạm mô-đun → lắp đúng khe 0, ô hiện khung Lục + lõi Hỏa lực, Công VKTT tăng và hiện trên tổng mô-đun',a['eq']=={'w':W,'s':0} and a['slot0'] and a['atk1']>a['atk0'] and 'Công +' in a['sum'],a)
  b0=pg.evaluate("()=>({cr:Progress.balance(),st:Chip72.state().mat})")
  pr=pg.evaluate("()=>{const n0=Chip72.state().ch.length;const o=Progress.spendCredits;let sp=0;Progress.spendCredits=function(n){const r=o.apply(this,arguments);if(r)sp+=n;return r};for(let i=0;i<6;i++)document.querySelector('#u4m [data-u4=prod]').click();Progress.spendCredits=o;return {n0,n1:Chip72.state().ch.length,sp}}")
  b1=pg.evaluate("()=>({cr:Progress.balance(),st:Chip72.state().mat})")
  ck('SẢN XUẤT ×6: +6 mô-đun, trừ tinh thể (50 lần đầu ngày, 100 sau) + 150 ◈ mỗi lần (giá Chip72 cũ)',pr['n1']-pr['n0']==6 and b0['st']['cry']-b1['st']['cry']==50+5*100 and pr['sp']==6*150,{'pr':pr,'cry':b0['st']['cry']-b1['st']['cry'],'cr':b0['cr']-b1['cr']})
  f=pg.evaluate("(W)=>{document.querySelector('#u4m [data-u4=fit]').click();const on=Chip72.state().ch.filter(c=>c.eq&&c.eq.w===W);const sl=Chip72.C.slots;const ok=on.every(c=>sl[c.eq.s]===c.sh);const free=Chip72.state().ch.filter(c=>!c.eq);const miss=[0,1,2,3,4,5].filter(i=>!on.some(c=>c.eq.s===i)&&free.some(c=>c.sh===sl[i]));return {n:on.length,ok,miss}}",W)
  ck('LẮP NHANH: lắp mọi khe có mô-đun phù hợp, đúng loại khe, không còn khe trống mà kho có mô-đun lắp được',f['ok'] and not f['miss'] and f['n']>=3,f)
  u=pg.evaluate("""(W)=>{const c=Chip72.state().ch.find(x=>x.eq&&x.eq.w===W&&x.lv<50);document.querySelector('#u4m [data-u4=tab][data-k="'+c.sh+'"]').click();document.querySelector('#u4m [data-u4=pick][data-id="'+c.id+'"]').click();
    const lv0=c.lv,core0=Chip72.state().mat.core,cr0=Progress.balance(),cost=Chip72.C.up[lv0/10-1];document.querySelector('#u4m [data-u4=up]').click();const c2=Chip72.state().ch.find(x=>x.id===c.id);return {lv0,lv1:c2.lv,dcore:core0-Chip72.state().mat.core,dcr:cr0-Progress.balance(),cost}}""",W)
  ck('CẢI TẠO: mô-đun đang chọn +10 cấp, trừ đúng lõi chip + hợp kim (bảng Chip72.C.up)',u['lv1']==u['lv0']+10 and u['dcore']==u['cost'][0] and u['dcr']==u['cost'][1],u)
  s=pg.evaluate("""(W)=>{let c=Chip72.state().ch.find(x=>!x.eq&&!x.lock);if(!c){document.querySelector('#u4m [data-u4=prod]').click();c=Chip72.state().ch.find(x=>!x.eq&&!x.lock);}
    document.querySelector('#u4m [data-u4=tab][data-k="'+c.sh+'"]').click();document.querySelector('#u4m [data-u4=pick][data-id="'+c.id+'"]').click();const cry0=Chip72.state().mat.cry,n0=Chip72.state().ch.length,g=Chip72.C.salvage[c.q][0];
    document.querySelector('#u4m [data-u4=sal]').click();return {gone:!Chip72.state().ch.some(x=>x.id===c.id),dn:n0-Chip72.state().ch.length,dcry:Chip72.state().mat.cry-cry0,g}}""",W)
  ck('PHÂN GIẢI: mô-đun đang chọn (chưa lắp) bị tách, +tinh thể đúng bảng Chip72.C.salvage',s['gone'] and s['dn']==1 and s['dcry']==s['g'],s)
  m0=pg.evaluate("(W)=>({atk:Chip72.agg(W).atk,eq:Chip72.state().ch.filter(c=>c.eq&&c.eq.w===W).map(c=>c.id+'@'+c.eq.s).sort(),n:Chip72.state().ch.length})",W)
  pg.reload();pg.wait_for_timeout(6500);pg.evaluate(CLEAN);pg.wait_for_timeout(800)
  m1=pg.evaluate("(W)=>({atk:Chip72.agg(W).atk,eq:Chip72.state().ch.filter(c=>c.eq&&c.eq.w===W).map(c=>c.id+'@'+c.eq.s).sort(),n:Chip72.state().ch.length,gift:U4V23S.state().gift})",W)
  pg.evaluate("()=>{Ult72.open()}");pg.wait_for_timeout(1200);pg.evaluate("()=>document.querySelector('.u4bb [data-u4b=mod]').click()");pg.wait_for_timeout(600)
  n2=pg.evaluate("()=>Chip72.state().ch.length")
  ck('Lưu bền qua tải lại: khe đang lắp, số mô-đun, chỉ số giữ nguyên; quà khởi đầu không tặng lại',m0['eq']==m1['eq'] and m0['n']==m1['n']==n2 and abs(m0['atk']-m1['atk'])<1e-9 and m1['gift']==1,{'truoc':m0,'sau':m1,'mo_lai':n2})
  inf=pg.evaluate("(W)=>{document.querySelector('#u4m [data-u4=back]').click();return new Promise(r=>setTimeout(()=>r({inf:(document.querySelector('.u72 .u4inf')||{}).textContent||'',sum:(()=>{const A=Chip72.agg(W);return (A.atk*100).toFixed(1).replace('.',',')})()}),900))}",W)
  ck('Màn VKTT hiển thị chỉ số mô-đun thật (Công +x% = Chip72.agg)',('Công +'+inf['sum'].rstrip('0').rstrip(',')) in inf['inf'] or ('Công +'+inf['sum']) in inf['inf'],inf)
  t=pg.evaluate("(W)=>{const o=U4V23S.quickOff(W);return {o,left:Chip72.state().ch.filter(c=>c.eq&&c.eq.w===W).length}}",W)
  ck('THÁO NHANH: gỡ hết mô-đun khỏi VKTT',t['o']>0 and t['left']==0,t)
  # ---------- 3. Vô tận: hệ số điểm không đổi ----------
  pg.evaluate("()=>{document.querySelectorAll('.u72,#u4m').forEach(e=>e.hidden=true);Nav74.tab('home')}");pg.wait_for_timeout(800)
  start(pg,12);pg.wait_for_timeout(2500)
  e=pg.evaluate("(W)=>{const gm=gameMode;gameMode='endless';const g=()=>{try{return [gameMode,multiplier()]}catch(x){return ['?',String(x)]}};const a=g();U4V23S.quickFit(W);const b=g();U4V23S.quickOff(W);const c=g();gameMode=gm;return {a,b,c,src:/U4V23|Chip72/.test(String(multiplier))}}",W)
  ck('Mô-đun cộng 0 hệ số điểm Vô tận: multiplier() giống hệt khi lắp / tháo',e['a']==e['b']==e['c'] and not e['src'],e)
  # ---------- 4. đồ họa ----------
  pg.reload();pg.wait_for_timeout(6500);pg.evaluate(CLEAN);pg.wait_for_timeout(1200)
  bf=pg.evaluate("()=>{Ult72.open();return 0}");pg.wait_for_timeout(1200)
  bf=pg.evaluate("()=>[...document.querySelectorAll('body *')].filter(e=>{const v=getComputedStyle(e).backdropFilter;return v&&v!=='none'}).length")
  pg.evaluate("()=>{document.querySelectorAll('.u72').forEach(e=>e.hidden=true);Nav74.tab('home')}");pg.wait_for_timeout(1200)
  dpr=pg.evaluate("()=>{const c=document.querySelector('.h1-stage canvas');const r=c.getBoundingClientRect();return c.width/r.width}")
  ck('0 backdrop-filter (cả màn VKTT) · NHẸ DPR 1,00 (Sảnh)',bf==0 and abs(dpr-1)<=.02,{'bf':bf,'dpr':dpr})
  start(pg,12);pg.wait_for_timeout(4000);pg.evaluate(CNT);pg.wait_for_timeout(3500);k=pg.evaluate("()=>__k23off()")
  ck('Trong trận: 0 shadowBlur · 0 ctx.filter · 0 canvas mới',k['sb']==0 and k['fl']==0 and k['cv']==0,k)
  ck('Không lỗi JS',not errs,errs[:3])
  br.close()
print('KẾT QUẢ %d/%d'%(sum(R),len(R)))
