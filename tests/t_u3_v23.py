# V2.3 U3 (v23-ui-meta): Điểm danh tích lũy + rương mốc · Thám hiểm Tinh tế · Thẻ Kỳ Cựu · khóa Càn quét nhanh sau thẻ
# python3 tests/t_u3_v23.py <html tuyệt đối>
import sys,os,json
src=open('claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
HTML=sys.argv[1];sys.argv=['x',HTML,'160'];exec(src)
t209=open('tests/v203_v212/t209.py').read();exec(t209[t209.find('def start'):t209.find('with sync_playwright')])
R=[]
def ck(n,ok,d=None):R.append(bool(ok));print(('ĐẠT ' if ok else 'TRƯỢT ')+n,'' if d is None else json.dumps(d,ensure_ascii=False)[:520],flush=True)
TD="Math.floor((Date.now()+7*3600000)/86400000)"
CNT="""()=>{const P=CanvasRenderingContext2D.prototype,od=Object.getOwnPropertyDescriptor(P,'shadowBlur'),of=Object.getOwnPropertyDescriptor(P,'filter'),oc=document.createElement;window.__k23={sb:0,fl:0,cv:0};
 Object.defineProperty(P,'shadowBlur',{configurable:true,get(){return od.get.call(this)},set(v){if(v>0)__k23.sb++;od.set.call(this,v)}});Object.defineProperty(P,'filter',{configurable:true,get(){return of.get.call(this)},set(v){if(v&&v!=='none')__k23.fl++;of.set.call(this,v)}});
 document.createElement=function(t){if(String(t).toLowerCase()==='canvas')__k23.cv++;return oc.apply(this,arguments)};window.__k23off=()=>{Object.defineProperty(P,'shadowBlur',od);Object.defineProperty(P,'filter',of);document.createElement=oc;return __k23}}"""
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'SS')
  snap=pg.evaluate("()=>JSON.stringify(Object.fromEntries(Object.keys(localStorage).map(k=>[k,localStorage.getItem(k)])))")
  pg.add_init_script("(()=>{if(localStorage.getItem('__u3seed'))return;try{const S=%s;for(const k in S)localStorage.setItem(k,S[k]);const d=%s;const L=JSON.parse(localStorage['saobang-l14309']||'null')||{v:1,ach:{},open:{tb:0,cc:0,boss:0}};L.v=1;L.days=9;L.last=d-1;L.mig=1;localStorage['saobang-l14309']=JSON.stringify(L);localStorage.removeItem('saobang-u3-v1');localStorage.setItem('__u3seed','1');}catch(e){}})()"%(snap,TD))
  pg.reload();pg.wait_for_timeout(7000)
  pg.evaluate("()=>{document.querySelectorAll('#q307,#tutorial392').forEach(e=>e.remove());document.querySelectorAll('.m63').forEach(e=>e.hidden=true);try{Progress.setLocked(false)}catch{};Gfx66.set('light');Nav74.tab('home')}");pg.wait_for_timeout(1500)
  B="()=>({cr:Progress.balance(),gem:Econ74.gems(),xp:XPDA307.state().c,en:V75.energy()})"
  # ---------- 1. Điểm danh ----------
  d=pg.evaluate("()=>({u3:U3V23S.days(),l14:L14309.state().days,rail:[...document.querySelectorAll('#lob22 .l22L > *')].map(e=>(e.querySelector('small')||{}).textContent)})")
  ck('Sảnh: 2 lối tắt THÁM HIỂM · THẺ KỲ CỰU ở cột trái; điểm danh dùng đúng bộ đếm tổng ngày L14 (không bộ đếm thứ 2)',d['u3']==d['l14']==9 and d['rail'][-2:] in (['THÁM HIỂM','THẺ KỲ CỰU'],['HOÀN THÀNH','THẺ KỲ CỰU']),d)
  pg.evaluate("()=>Meta40.rewardsPanel('daily')");pg.wait_for_timeout(900)
  g=pg.evaluate("""()=>{const m=document.querySelector('#m40 .mm.u3dm');if(!m)return null;const bn=m.querySelector('.u3bn'),h=bn.querySelector('h3'),R=bn.getBoundingClientRect(),hr=h.getBoundingClientRect();
   const W=1672,H=941,s=Math.max(R.width/W,R.height/H),rw=W*s,rh=H*s,ox=R.left+(R.width-rw)*.5,oy=R.top+(R.height-rh)*.1;
   const bx=(x0,y0,x1,y1)=>({l:ox+x0*s,t:oy+y0*s,r:ox+x1*s,b:oy+y1*s});const face=bx(250,40,470,340),hand=bx(630,560,830,720);
   const hit=(a,b)=>!(a.r<=b.left||a.l>=b.right||a.b<=b.top||a.t>=b.bottom);
   const cells=[...m.querySelectorAll('.u3g .u3d')];const d7=m.querySelector('.u3d.d7');
   return {title:h.textContent,face:hit(face,hr),hand:hit(hand,hr),faceIn:face.b>R.top+8&&face.t<R.bottom,x:!!bn.querySelector('.u3x'),cells:cells.length,d7span:getComputedStyle(d7).gridColumnStart,d7parts:d7.querySelectorAll('.u3pt').length,d7need:Math.min(3,(()=>{const P=L14309.dayPack(+d7.querySelector('b').textContent.replace(/\D/g,''));return [P.base,...P.extra].reduce((a,r)=>a+(r.it?1:0)+(r.hk?1:0)+Object.keys(r.xp||{}).length+['boss','cc','tb'].filter(k=>r[k]).length+(r.pc?1:0)+Object.keys(r.vl||{}).length,0)})()),
    ch:[...m.querySelectorAll('.u3ch')].map(b=>b.dataset.m+(b.classList.contains('can')?'+':'')+(b.classList.contains('got')?'✓':'')),tot:m.querySelector('.u3tot b').textContent,btn:m.querySelector('#r-claim').className+'|'+m.querySelector('#r-claim').textContent}}""")
  ck('Băng rôn ĐIỂM DANH TÍCH LŨY: tiêu đề không chạm mặt / bàn tay nữ chỉ huy, có ×; lưới 7 ô (Ngày 7 ô đôi, 3 phần quà); 5 rương mốc 5…25; nút NHẬN QUÀ tấm vàng',g and g['title']=='ĐIỂM DANH TÍCH LŨY' and not g['face'] and not g['hand'] and g['faceIn'] and g['x'] and g['cells']==7 and g['d7parts']==g['d7need'] and 'span 2' in g['d7span'] and g['ch']==['5+','10','15','20','25'] and 'u3pg' in g['btn'] and 'NHẬN QUÀ' in g['btn'],g)
  b0=pg.evaluate(B);pk=pg.evaluate("()=>{const P=L14309.dayPack(10);return [P.base,...P.extra].map(r=>r.hk|0).filter(Boolean)}")
  pg.evaluate("()=>{window.__gc=[];const o=Progress.grantCredits;Progress.grantCredits=function(n){__gc.push([n,((new Error).stack.split(String.fromCharCode(10))[2]||'').trim().slice(0,60)]);return o.apply(this,arguments)};document.querySelector('#m40 #r-claim').click();Progress.grantCredits=o}");pg.wait_for_timeout(700);b1=pg.evaluate(B);gc=pg.evaluate('()=>__gc')
  g2=pg.evaluate("()=>({days:L14309.state().days,btn:(()=>{const b=document.querySelector('#m40 #r-claim');return b.className+'|'+b.textContent+'|'+b.disabled})(),again:L14309.claim()})")
  ck('NHẬN QUÀ: tổng ngày +1, quà ngày đúng định mức cũ (L14 dayPack), nút chuyển tấm thép ĐÃ NHẬN, không nhận lại trong ngày',g2['days']==10 and all(sum(1 for x in gc if x[0]==v)>=pk.count(v) for v in pk) and b1['cr']-b0['cr']-sum(pk) in (0,900,1800,2700,3600,4500) and 'u3ps' in g2['btn'] and 'ĐÃ NHẬN' in g2['btn'] and g2['btn'].endswith('true') and g2['again'] is False,{'d':g2,'hk':b1['cr']-b0['cr'],'pack':pk,'gc':gc})
  b0=pg.evaluate(B);r=pg.evaluate("()=>{const a=U3V23S.msClaim(5),b=U3V23S.msClaim(10),c=U3V23S.msClaim(10),e=U3V23S.msClaim(15);return [a,b,c,e,U3V23S.MS(5),U3V23S.MS(10)]}");b1=pg.evaluate(B)
  ms=r[4];ms2=r[5]
  ck('Rương mốc: 5 và 10 ngày nhận 1 lần (hợp kim + Đá XP + mảnh PC + ít KC), nhận lại / chưa đủ ngày (15) bị chặn',r[:4]==[True,True,False,False] and b1['cr']-b0['cr']==ms['hk']+ms2['hk'] and b1['gem']-b0['gem']==ms['gem']+ms2['gem'],{'r':r[:4],'hk':b1['cr']-b0['cr'],'gem':b1['gem']-b0['gem']})
  pg.reload();pg.wait_for_timeout(6000)
  d=pg.evaluate("()=>({ms:U3V23S.state().ms,c5:U3V23S.msCan(5),days:L14309.state().days,win:U3V23S.msWin()})")
  ck('Lưu bền vững qua tải lại: rương đã nhận giữ ✓, không nhận trùng; cửa sổ mốc cuộn tiếp',d['ms']==[5,10] and not d['c5'] and d['days']==10 and d['win']==[5,10,15,20,25],d)
  pg.evaluate("()=>{document.querySelectorAll('#q307,#tutorial392').forEach(e=>e.remove());try{Progress.setLocked(false)}catch{}}")
  # ---------- 2. Thám hiểm ----------
  r=pg.evaluate("""()=>{const o=[];o.push(U3V23S.exStart(2));o.push(U3V23S.exStart(4));o.push(U3V23S.exClaim());const S=U3V23S.state();S.ex.run.t0-=2*3600000+1000;U3V23S._set({ex:S.ex});o.push(U3V23S.exDone());return o}""")
  b0=pg.evaluate(B);rw=pg.evaluate("()=>U3V23S.reward(2)");c=pg.evaluate("()=>!!U3V23S.exClaim()");b1=pg.evaluate(B)
  ck('Thám hiểm: cử 2 giờ, không cử chồng chuyến, chưa đủ giờ không nhận; đủ 2 giờ (Date.now) nhận đúng hợp kim + Đá XP',r==[True,False,False,True] and c and b1['cr']-b0['cr']==rw['hk'] and all((b1['xp'][t]-b0['xp'][t])==n for t,n in rw['xp'].items()),{'r':r,'hk':b1['cr']-b0['cr'],'rw':rw})
  r=pg.evaluate("""()=>{const o=[];o.push(U3V23S.quickLeft());o.push(!!U3V23S.exQuick());o.push(!!U3V23S.exQuick());
   for(let i=0;i<3;i++){U3V23S.exStart(2);const S=U3V23S.state();if(S.ex.run){S.ex.run.t0-=3*3600000;U3V23S._set({ex:S.ex});}o.push(!!U3V23S.exClaim());}
   o.push(U3V23S.capLeft());o.push(U3V23S.state().ex.n);return o}""")
  ck('Thám hiểm nhanh 1 lượt miễn phí/ngày (không thẻ); TRẦN CỨNG 4 lần nhận/ngày (lần thứ 5 bị chặn)',r==[1,True,False,True,True,False,0,4],r)
  # ---------- 3. Thẻ Kỳ Cựu ----------
  cf0=pg.evaluate("()=>JSON.stringify([Combat.factor(),Combat.stats().attack,Combat.stats().cp])")
  s=pg.evaluate("()=>{try{Progress.setLocked(false)}catch{};const c=Progress.getState().cleared.filter(k=>k%10!==0);const s=c[Math.floor(c.length/2)]||0;if(s)Campaign36.recordStars(s,3);return Campaign36.getState().stars[s]===3?s:0}")
  sw0=pg.evaluate("(s)=>{V75.addEn(60);const e=V75.energy(),r=Campaign36.sweep(s);return {r:!!r,de:e-V75.energy()}}",s)
  pg.evaluate("()=>Econ74.add(1000)");b0=pg.evaluate(B);hk0=pg.evaluate("()=>U3V23S.reward(2)")
  pg.evaluate("()=>U3V23S.open('vet')");pg.wait_for_timeout(500)
  pg.evaluate("()=>{window.__gc=[];const o=Progress.grantCredits;Progress.grantCredits=function(n){__gc.push([n,(new Error).stack.split(String.fromCharCode(10))[2]]);return o.apply(this,arguments)};document.querySelector('#u3m [data-u3=buy]').click();Progress.grantCredits=o}");pg.wait_for_timeout(500);b1=pg.evaluate(B);gc=pg.evaluate('()=>__gc')
  v=pg.evaluate("()=>({left:U3V23S.vetLeft(),on:U3V23S.vetOn(),st:document.querySelector('#u3m .u3vs').textContent,btn:document.querySelector('#u3m [data-u3=buy]').textContent})")
  ck('Thẻ Kỳ Cựu: −600 KC, +300 KC hoàn ngay, +10.000 Hợp kim; hiệu lực 30 ngày, nút đổi GIA HẠN',b1['gem']-b0['gem']==-300 and sum(x[0] for x in gc)==10000 and v['left']==30 and 'Còn 30 ngày' in v['st'] and 'GIA HẠN' in v['btn'],{'gem':b1['gem']-b0['gem'],'hk':b1['cr']-b0['cr'],'v':v,'gc':gc})
  b0=pg.evaluate(B);r=pg.evaluate("()=>{document.querySelector('#u3m [data-u3=vday]').click();const b=document.querySelector('#u3m [data-u3=vday]');return [b.textContent,b.disabled,U3V23S.vetDaily()]}");b1=pg.evaluate(B)
  ck('Quà ngày thẻ: +30 KC + 5 Đá XP, nút → ĐÃ NHẬN tấm thép, không nhận lần 2',b1['gem']-b0['gem']==30 and b1['xp']['2']-b0['xp']['2']==5 and r==['ĐÃ NHẬN',True,False],{'r':r,'gem':b1['gem']-b0['gem']})
  hk1=pg.evaluate("()=>U3V23S.reward(2)");ql=pg.evaluate("()=>[U3V23S.state().ex.q,U3V23S.state().ex.n,U3V23S.quickLeft(),U3V23S.capLeft()]")
  ck('+20 % sản lượng Thám hiểm (hợp kim ×1,2 + Đá XP quy đổi) · +1 lượt nhanh (2/ngày) · trần 4 lần vẫn giữ',abs(hk1['hk']/hk0['hk']-1.2)<.01 and ql==[1,4,1,0],{'hk':[hk0['hk'],hk1['hk']],'q':ql})
  pg.evaluate("()=>U3V23S.close()")
  sw=pg.evaluate("""(s)=>{V75.addEn(60);const max=window.SWEEP92?SWEEP92():10,tk=V75.tickets();const st0=Campaign36.getState().sweep;const e0=V75.energy();const r=Campaign36.sweep(s);const e1=V75.energy();
   let k=1;while(k<60&&Campaign36.sweep(s)){k++;V75.addEn(6);}return {r:!!r,de:e0-e1,used0:st0.used,k,max,tk,used:Campaign36.getState().sweep.used,tk1:V75.tickets()}}""",s)
  ck('CÀN QUÉT NHANH: không thẻ bị khóa (0 thể lực mất); có thẻ quét được ải 3★, trừ đúng 6 thể lực, dừng đúng trần ngày',s>0 and sw0=={'r':False,'de':0} and sw['r'] and sw['de']==6 and sw['k']<60 and sw['used']==sw['max'] and sw['tk1']==0,{'s':s,'khong_the':sw0,'co_the':sw})
  cf1=pg.evaluate("()=>JSON.stringify([Combat.factor(),Combat.stats().attack,Combat.stats().cp])")
  sc=pg.evaluate("()=>[/U3V23|u3v23/.test(String(Combat.factor)),/U3V23|u3v23/.test(String(Combat.stats))]")
  ck('Thẻ Kỳ Cựu 0 ảnh hưởng điểm Vô tận / chỉ số trận (Combat.factor, công, lực chiến giống hệt trước khi mua)',cf0==cf1 and sc==[False,False],{'truoc':cf0,'sau':cf1})
  # ---------- 4. đồ họa ----------
  pg.evaluate("()=>{document.querySelectorAll('.m63').forEach(e=>e.hidden=true);Nav74.tab('home')}");pg.wait_for_timeout(1200)
  bf=pg.evaluate("()=>[...document.querySelectorAll('body *')].filter(e=>{const v=getComputedStyle(e).backdropFilter;return v&&v!=='none'}).length")
  dpr=pg.evaluate("()=>{const c=document.querySelector('.h1-stage canvas');const r=c.getBoundingClientRect();return c.width/r.width}")
  ck('0 backdrop-filter · NHẸ DPR 1,00 (Sảnh)',bf==0 and abs(dpr-1)<=.02,{'bf':bf,'dpr':dpr})
  start(pg,12);pg.wait_for_timeout(4000);pg.evaluate(CNT);pg.wait_for_timeout(3500);k=pg.evaluate("()=>__k23off()")
  ck('Trong trận: 0 shadowBlur · 0 ctx.filter · 0 canvas mới',k['sb']==0 and k['fl']==0 and k['cv']==0,k)
  ck('Không lỗi JS',not errs,errs[:3])
  br.close()
print('KẾT QUẢ %d/%d'%(sum(R),len(R)))
