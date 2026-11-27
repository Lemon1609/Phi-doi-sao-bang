# V2.3 U4 (v23-ui-meta): Bệ 3D VKTT + VKTT thiết kế lại (E từ Lam, chia vai trò, 4 nội tại trợ chiến, 8 hiệu ứng trận) + MÔ-ĐUN SIÊU DUY (4 phẩm, 4 giao thức 2/4, đổi save)
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
OLD=r"""(()=>{const mk=(id,q,set,ln,eq)=>({id,q,sh:['fire','frame','link'][q%3],set,lv:20,ln,eq:eq||null,lock:0,ref:0,reb:0,rbi:null,spent:0,mod:0});
 return {v:1,ch:[mk('o0',0,null,[{a:'atk',u:.5}]),mk('o1',1,null,[{a:'nd',t:'s3',u:.4}]),mk('o2',2,null,[{a:'sd',t:'s1',u:.3},{a:'skill',u:.6}]),mk('o3',3,'world_2',[{a:'nd',t:'m:inferno',u:.2},{a:'crit',u:.5}]),
  mk('o4',4,null,[{a:'fd',t:'d:rail',u:.2},{a:'boss',u:.5},{a:'charge',u:.1}]),mk('o5',5,'hunter_2',[{a:'all',t:'vktt',u:.7},{a:'nd',t:'a:orbital',u:.1},{a:'elite',u:.4}]),mk('o6',6,'web_1',[{a:'all',t:'ships',u:.9},{a:'atk',u:.3},{a:'hp',u:.2}],{w:'world',s:2})],
  mat:{cry:777,coder:3,core:9},xp:120,pity:4,dday:'',gift:1,ser:7,last:[]};})()"""
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'SS')
  snap=pg.evaluate("()=>JSON.stringify(Object.fromEntries(Object.keys(localStorage).map(k=>[k,localStorage.getItem(k)])))")
  pg.add_init_script("(()=>{if(localStorage.getItem('__u4seed'))return;try{const S=%s;for(const k in S)localStorage.setItem(k,S[k]);localStorage.removeItem('saobang-u4-v1');localStorage.removeItem('saobang-chip72-v1-bk23');localStorage.setItem('saobang-chip72-v1',JSON.stringify(%s));localStorage.setItem('__u4seed','1');}catch(e){}})()"%(snap,OLD))
  pg.reload();pg.wait_for_timeout(7000);pg.evaluate(CLEAN);pg.wait_for_timeout(1000)
  # ---------- 0. đổi save Chip72 → Mô-đun ----------
  m=pg.evaluate("""()=>{const S=Chip72.state();const bk=JSON.parse(localStorage.getItem('saobang-chip72-v1-bk23')||'null');const g=id=>S.ch.find(c=>c.id===id);
   return {m23:S.m23,n:S.ch.length,q:S.ch.map(c=>c.id+':'+c.q).join(','),set:S.ch.map(c=>c.set).join(','),ln:S.ch.map(c=>c.ln.map(l=>l.a).join('+')).join(','),u5:g('o5').ln[0].u,eq6:g('o6').eq,mat:S.mat,xp:S.xp,bk:bk&&bk.ch.length,bkq:bk&&bk.ch.map(c=>c.q).join(''),nq:CHIP72.q.length,ns:Object.keys(CHIP72.sets).join(',')}}""")
  ck('Đổi save không mất: 7 phẩm → 4 (Chế thức/Cải lương→Lục · Nguyên mẫu/GƯNM→Lam · Chiến lược/GƯCL→Tím · Tuyệt mật→Cam), bộ cũ → 4 giao thức, Lam+ chưa bộ nhận giao thức cố định, dòng gắn tên món → dòng nhóm (giữ độ ngẫu nhiên u), giữ khe lắp / tài nguyên, bản cũ lưu saobang-chip72-v1-bk23',
     m['m23']==1 and m['n']==7 and m['q']=='o0:0,o1:0,o2:1,o3:1,o4:2,o5:2,o6:3' and m['set'].split(',')[:2]==['',''] and all(m['set'].split(',')[2:]) and m['set'].split(',')[3]=='thoiluat' and m['set'].split(',')[5]=='cuonglieu' and m['set'].split(',')[6]=='thienvong'
     and m['ln']=='atk,ship,super+skill,missile+crit,pod+boss+charge,skill+armor+elite,ship+atk+hp' and abs(m['u5']-.7)<1e-9 and m['eq6']=={'w':'world','s':2} and m['mat']['cry']==777 and m['xp']==120 and m['bk']==7 and m['bkq']=='0123456' and m['nq']==4 and m['ns']=='thanhtri,thoiluat,cuonglieu,thienvong',m)
  pg.reload();pg.wait_for_timeout(6000);pg.evaluate(CLEAN)
  m2=pg.evaluate("()=>{const S=Chip72.state();return S.ch.map(c=>c.id+':'+c.q+':'+c.set).join(',')}")
  ck('Đổi save chạy 1 lần (tải lại không đổi tiếp)',m2==','.join('%s:%s:%s'%(i,q,s) for i,q,s in zip(m['q'].split(',')and[x.split(':')[0] for x in m['q'].split(',')],[x.split(':')[1] for x in m['q'].split(',')],[x if x else 'null' for x in m['set'].split(',')])),m2)
  pg.evaluate(VK);pg.evaluate("()=>{Chip72._set({ch:[],mat:{cry:5000,coder:5,core:60}})}")
  # ---------- 1. bệ 3D + đội hình ----------
  pg.evaluate("()=>{Ult72._set({sup:['fortress','hunter']});Ult72.open()}");pg.wait_for_timeout(1800)
  d=pg.evaluate("""()=>{const sr=document.querySelector('.u72.srm .sr.u4sr');if(!sr)return null;const stg=sr.querySelector('.sr-stage');const bg=getComputedStyle(stg).backgroundImage;
   const imgs=[...document.querySelectorAll('.u72 img')].filter(i=>i.offsetParent);const bad=imgs.filter(i=>!i.complete||!i.naturalWidth).length;
   const own=Object.entries(Ult72.state().w).filter(([k,w])=>w.own).length;const cur=Ult72.cur(),w=Ult72.state().w[cur];
   const an=getComputedStyle(sr.querySelector('.sr-wpn')).animationName;const sp=sr.querySelector('.sr-wpn.u4spr .u4spi');
   const fm=[...sr.querySelectorAll('.u4fm .u4fs')].map(b=>b.textContent.replace(/\s+/g,' ').trim());
   return {bg:bg.slice(0,30),bad,n:imgs.length,sel:sr.querySelectorAll('.u4ow button').length,own,box:(sr.querySelector('.u4box')||{}).textContent,lv:'Lv.'+w.lv+'/'+Ult72.C.cap[w.r],an,spr:!!(sp&&sp.style.backgroundImage.includes('data:image/webp')&&sp.offsetWidth>100),fm,inf:(sr.querySelector('.u4inf')||{}).textContent,
    btn:[...sr.querySelectorAll('.u4bb button')].map(b=>b.className.match(/u3p\\w+/g).join('')+':'+b.firstChild.textContent.trim())}}""")
  ck('Bệ 3D: nền stage_vktt_3d, TRANH VKTT RIÊNG trôi ±4 px (CSS), dải đội hình 1 chủ chiến + 2 trợ chiến ghi rõ nội tại, dòng vai trò + bậc E; đáy MÔ-ĐUN SIÊU DUY · CƯỜNG HÓA vàng · VỀ lam; 0 ảnh hỏng',
     d and 'data:image/webp' in d['bg'] and d['bad']==0 and d['spr'] and d['sel']==d['own']==3 and d['lv'] in d['box'] and d['an']=='u4fl' and len(d['fm'])==3 and 'CHỦ CHIẾN' in d['fm'][0] and 'chặn 1 đòn' in d['fm'][1] and 'chí mạng' in d['fm'][2] and 'Khống chế' in d['inf'] and 'E đủ sức' in d['inf']
     and d['btn'][1].startswith('u3pg:CƯỜNG HÓA') and d['btn'][2]=='u3pb:VỀ' and 'MÔ-ĐUN SIÊU DUY' in d['btn'][0],d)
  # ---------- 2. chia vai trò + E theo bậc ----------
  r=pg.evaluate("""()=>{const o={};for(const id of ['fortress','world','hunter','web']){Ult72._set({w:{[id]:{own:1,r:6,lv:40,sh:0}},main:id,sup:[null,null]});o[id]=[Ult72.bonusOf('atk'),Ult72.bonusOf('hp'),Ult72.bonusOf('armor'),Ult72.P(id)];}return o;}""")
  rk={k:(round(v[0]/v[3],3),round(v[1]/v[3],3),round(v[2]/v[3],3)) for k,v in r.items()}
  ck('Chia chỉ số theo vai trò (cùng ngân sách): Pháo Đài Công 0,8 · Máu/Giáp 1,2 · Thế Giới 1/1 · Săn Sao 1,4/0,6 · Lưới Điện 1,3/0,7 (× chỉ số chủ chiến)',rk=={'fortress':(.8,1.2,1.2),'world':(1,1,1),'hunter':(1.4,.6,.6),'web':(1.3,.7,.7)},rk)
  pg.evaluate("()=>{Ult72._set({w:{world:{own:1,r:10,lv:62,sh:0},fortress:{own:1,r:6,lv:40,sh:0},hunter:{own:1,r:3,lv:20,sh:0},web:{own:1,r:1,lv:10,sh:0}},main:'world',sup:['fortress','hunter']})}")
  # ---------- 3. mô-đun ----------
  pg.evaluate("()=>{document.querySelectorAll('.u72').forEach(e=>e.hidden=true);Ult72.open()}");pg.wait_for_timeout(1500)
  pg.evaluate("()=>document.querySelector('.u4bb [data-u4b=mod]').click()");pg.wait_for_timeout(800)
  g=pg.evaluate("()=>({n:Chip72.state().ch.length,q:Chip72.state().ch.map(c=>c.q+':'+c.sh).sort(),gift:U4V23S.state().gift,open:!!document.querySelector('#u4m:not([hidden]) .u4c'),W:U4V23S.cur(),pb:document.querySelectorAll('#u4m .u4pb .u4pg').length})")
  ck('Mở MÔ-ĐUN SIÊU DUY lần đầu: tặng 3 mô-đun Lục (mỗi cụm 1) · có 4 huy hiệu giao thức',g['n']==3 and g['q']==['0:fire','0:frame','0:link'] and g['gift']==1 and g['open'] and g['pb']==4,g)
  W=g['W']
  a=pg.evaluate("""(W)=>{const atk0=Chip72.agg(W).atk;document.querySelector('#u4m [data-u4=slot][data-i="0"]').click();const id=Chip72.state().ch.find(c=>c.sh==='fire').id;document.querySelector('#u4m [data-u4=pick][data-id="'+id+'"]').click();
    const c=Chip72.state().ch.find(x=>x.id===id);return {eq:c.eq,atk0,atk1:Chip72.agg(W).atk,sum:document.querySelector('#u4m .u4sum').textContent,slot0:!!document.querySelector('#u4m [data-u4=slot][data-i="0"] .u4h.f0 i.cf')}}""",W)
  ck('Lắp tay: khe Hỏa lực 1 → mô-đun → lắp đúng khe 0 (khung Lục + lõi Hỏa lực), Công tăng',a['eq']=={'w':W,'s':0} and a['slot0'] and a['atk1']>a['atk0'] and 'Công +' in a['sum'],a)
  lk=pg.evaluate("(W)=>{const c=Chip72.state().ch.find(x=>x.sh==='link');Chip72.equip(c.id,W,4);const A=Chip72.agg(W);return {charge:A.charge,skill:A.skill,atk:A.atk}}",W)
  ck('Liên kết = Tốc sạc E + ST kỹ năng VKTT (không còn Công/Máu/Giáp)',lk['charge']>0 and lk['skill']>0,lk)
  b0=pg.evaluate("()=>({st:Chip72.state().mat})")
  pr=pg.evaluate("()=>{const n0=Chip72.state().ch.length;const o=Progress.spendCredits;let sp=0;Progress.spendCredits=function(n){const r=o.apply(this,arguments);if(r)sp+=n;return r};for(let i=0;i<10;i++)document.querySelector('#u4m [data-u4=prod]').click();Progress.spendCredits=o;const L=Chip72.state().ch.slice(n0);return {n0,n1:Chip72.state().ch.length,sp,q:L.map(c=>c.q),okset:L.every(c=>c.q>=1?!!CHIP72.sets[c.set]:c.set==null),ln:L.every(c=>c.ln.length>=CHIP72.q[c.q].l&&c.ln.every(l=>CHIP72.aff.find(a=>a.id===l.a&&a.w>0))),pity:L.some(c=>c.q>=1&&CHIP72.sets[c.set].w===Ult72.mainW())}}")
  b1=pg.evaluate("()=>({st:Chip72.state().mat})")
  ck('SẢN XUẤT ×10: +10 mô-đun phẩm 0–3, Lam+ luôn có giao thức, dòng phụ toàn dòng nhóm, bảo hiểm lần 10 ra Lam/Tím cộng hưởng VKTT chủ chiến; trừ tinh thể 50 + 9×100, 150 ◈/lần',
     pr['n1']-pr['n0']==10 and all(0<=q<=3 for q in pr['q']) and pr['okset'] and pr['ln'] and pr['pity'] and b0['st']['cry']-b1['st']['cry']==50+9*100 and pr['sp']==10*150,{'pr':pr,'cry':b0['st']['cry']-b1['st']['cry']})
  f=pg.evaluate("(W)=>{document.querySelector('#u4m [data-u4=fit]').click();const on=Chip72.state().ch.filter(c=>c.eq&&c.eq.w===W);const sl=Chip72.C.slots;const ok=on.every(c=>sl[c.eq.s]===c.sh);const free=Chip72.state().ch.filter(c=>!c.eq);const miss=[0,1,2,3,4,5].filter(i=>!on.some(c=>c.eq.s===i)&&free.some(c=>c.sh===sl[i]));return {n:on.length,ok,miss}}",W)
  ck('LẮP NHANH: mọi khe có mô-đun phù hợp, đúng loại khe',f['ok'] and not f['miss'] and f['n']>=3,f)
  # 2/4 viên giao thức
  ps=pg.evaluate("""(W)=>{U4V23S.quickOff(W);const sh=['fire','fire','frame','frame','link','link'];const ids=[];for(let i=0;i<4;i++){const c=Chip72._give(Chip72.gen({q:2,sh:sh[i],set:'thanhtri',lv:10}));Chip72.equip(c.id,W,i);ids.push(c.id);}
    const P=()=>Chip72.proto(W).find(x=>x.k==='thanhtri');const A=Chip72.agg(W);const four=P();Chip72.unequip(ids[3]);Chip72.unequip(ids[2]);const two=P(),A2=Chip72.agg(W);Chip72.unequip(ids[1]);const one=P(),A1=Chip72.agg(W);
    for(let i=1;i<4;i++)Chip72.equip(ids[i],W,i);document.querySelector('#u4m [data-u4=tab][data-k=fire]').click();const pb=document.querySelector('#u4m .u4pg.full');return {four,two,one,hp4:A.hp,hp2:A2.hp,hp1:A1.hp,has4:Ult72.X.has('thanhtri',4),pb:pb&&pb.textContent}}""",W)
  ck('Giao thức 2/4: 2 viên Thành Trì → +8% Máu & Giáp, 4 viên → bậc 4 (X.has), huy hiệu sáng; 1 viên → không thưởng',ps['two']['two'] and not ps['two']['four'] and ps['four']['four'] and not ps['one']['two'] and ps['hp2']-ps['hp1']>.079 and ps['has4'] and ps['pb'] and 'Thành Trì' in ps['pb'],ps)
  u=pg.evaluate("""(W)=>{const c=Chip72.state().ch.find(x=>x.eq&&x.eq.w===W&&x.lv<50);document.querySelector('#u4m [data-u4=tab][data-k="'+c.sh+'"]').click();document.querySelector('#u4m [data-u4=pick][data-id="'+c.id+'"]').click();
    const lv0=c.lv,core0=Chip72.state().mat.core,cr0=Progress.balance(),cost=Chip72.C.up[lv0/10-1];document.querySelector('#u4m [data-u4=up]').click();const c2=Chip72.state().ch.find(x=>x.id===c.id);return {lv0,lv1:c2.lv,dcore:core0-Chip72.state().mat.core,dcr:cr0-Progress.balance(),cost}}""",W)
  ck('CẢI TẠO: +10 cấp, trừ đúng lõi chip + hợp kim',u['lv1']==u['lv0']+10 and u['dcore']==u['cost'][0] and u['dcr']==u['cost'][1],u)
  lz=pg.evaluate("""(W)=>{const c=Chip72._give(Chip72.gen({q:2,sh:'fire',lv:50,set:'cuonglieu'}));U4V23S.close();U4V23S.open(W);document.querySelector('#u4m [data-u4=tab][data-k=fire]').click();document.querySelector('#u4m [data-u4=pick][data-id="'+c.id+'"]').click();const b=document.querySelector('#u4m [data-u4=ref]');const t=b&&b.textContent;if(b)b.click();
    const det=document.querySelector('.u72.c72:not([hidden])');const r={t,det:!!det,ref:det?[...det.querySelectorAll('button')].some(x=>/TẨY|LUYỆN/.test(x.textContent)):false};if(det)det.hidden=true;return r;}""",W)
  ck('LUYỆN DÒNG: mô-đun Lam+ cấp 50 → nút LUYỆN DÒNG mở bảng luyện / tẩy dòng',lz['t'] and 'LUYỆN DÒNG' in lz['t'] and lz['det'] and lz['ref'],lz)
  pg.evaluate("(W)=>U4V23S.open(W)",W);pg.wait_for_timeout(400)
  s=pg.evaluate("""(W)=>{let c=Chip72.state().ch.find(x=>!x.eq&&!x.lock);document.querySelector('#u4m [data-u4=tab][data-k="'+c.sh+'"]').click();document.querySelector('#u4m [data-u4=pick][data-id="'+c.id+'"]').click();const cry0=Chip72.state().mat.cry,n0=Chip72.state().ch.length,g=Chip72.C.salvage[c.q][0];
    document.querySelector('#u4m [data-u4=sal]').click();return {gone:!Chip72.state().ch.some(x=>x.id===c.id),dn:n0-Chip72.state().ch.length,dcry:Chip72.state().mat.cry-cry0,g}}""",W)
  ck('PHÂN GIẢI: mô-đun đang chọn bị tách, +tinh thể đúng bảng 4 phẩm',s['gone'] and s['dn']==1 and s['dcry']==s['g'],s)
  m0=pg.evaluate("(W)=>({hp:Chip72.agg(W).hp,eq:Chip72.state().ch.filter(c=>c.eq&&c.eq.w===W).map(c=>c.id+'@'+c.eq.s).sort(),n:Chip72.state().ch.length})",W)
  pg.reload();pg.wait_for_timeout(6500);pg.evaluate(CLEAN);pg.wait_for_timeout(800)
  m1=pg.evaluate("(W)=>({hp:Chip72.agg(W).hp,eq:Chip72.state().ch.filter(c=>c.eq&&c.eq.w===W).map(c=>c.id+'@'+c.eq.s).sort(),n:Chip72.state().ch.length,gift:U4V23S.state().gift})",W)
  ck('Lưu bền qua tải lại: khe, số mô-đun, chỉ số (gồm giao thức) giữ nguyên; quà không tặng lại',m0['eq']==m1['eq'] and m0['n']==m1['n'] and abs(m0['hp']-m1['hp'])<1e-9 and m1['gift']==1,{'truoc':m0,'sau':m1})
  t=pg.evaluate("(W)=>{const o=U4V23S.quickOff(W);return {o,left:Chip72.state().ch.filter(c=>c.eq&&c.eq.w===W).length}}",W)
  ck('THÁO NHANH: gỡ hết mô-đun khỏi VKTT',t['o']>0 and t['left']==0,t)
  # ---------- 4. trong trận: E từ Lam, nội tại trợ chiến, giao thức, 8 hiệu ứng ----------
  pg.evaluate("()=>{document.querySelectorAll('.u72,#u4m').forEach(e=>e.hidden=true);Nav74.tab('home')}");pg.wait_for_timeout(600)
  pg.evaluate("()=>{Ult72._set({w:{hunter:{own:1,r:1,lv:10,sh:0}},main:'hunter',sup:[null,null]})}")
  start(pg,12);pg.wait_for_timeout(2000)
  e1=pg.evaluate("()=>({btn:!document.getElementById('ult72-btn').hidden,ch:Ult72.charge()})")
  pg.evaluate("()=>{Ult72._set({w:{hunter:{own:1,r:2,lv:20,sh:0}}})}");pg.wait_for_timeout(1500)
  e2=pg.evaluate("()=>({btn:!document.getElementById('ult72-btn').hidden,ch:Ult72.charge()})")
  ck('Tuyệt kỹ E mở từ bậc Lam (Lục: ẩn nút, 0 sạc; Lam: hiện nút, đang sạc)',not e1['btn'] and e1['ch']==0 and e2['btn'] and e2['ch']>0,{'luc':e1,'lam':e2})
  k3=pg.evaluate("""()=>{const B=Ult72._B;const T=r=>{Ult72._set({w:{hunter:{own:1,r,lv:20,sh:0}}});B.t=60;B.ev=0;B.credit=0;B.ready=0;return Ult72.charge();};const o={lam:T(2),tim:T(6),ht:T(10)};
   Ult72._set({w:{hunter:{own:1,r:2,lv:20,sh:0}}});B.credit=1;B.useAt=-99;Ult72.useUlt();o.kLam=B.eK;const s=B.ents.find(x=>x.ty==='saw'&&x.ult);o.vLam=s&&s.vul;o.vd=s&&s.vd;
   Ult72._set({w:{hunter:{own:1,r:10,lv:62,sh:0}}});B.ready=0;B.credit=1;B.useAt=-99;Ult72.useUlt();o.kHT=B.eK;const s2=B.ents.find(x=>x.ty==='saw'&&x.ult);o.vHT=s2&&s2.vul;return o;}""")
  ck('Bậc E: cùng thời gian sạc Lam < Tím < Huyền thoại (sạc lâu hơn ở bậc thấp), sức mạnh ×0,70 / ×1; Săn Sao Dễ tổn thương 6% (Lam) → 8–10% (HT) trong 6 giây',k3['lam']<k3['tim']<k3['ht'] and abs(k3['kLam']-.7)<1e-9 and k3['kHT']==1 and abs(k3['vLam']-.06)<1e-9 and .08<=k3['vHT']<=.10 and k3['vd']==6,k3)
  # nội tại trợ chiến
  pv=pg.evaluate("""()=>{const B=Ult72._B;const o={};Ult72._set({w:{world:{own:1,r:6,lv:40,sh:0},fortress:{own:1,r:6,lv:40,sh:0},hunter:{own:1,r:6,lv:40,sh:0},web:{own:1,r:6,lv:40,sh:0}},main:'world',sup:['fortress','hunter']});
   o.sup=['fortress','world','hunter','web'].map(k=>Ult72.supOn(k));
   // Pháo Đài: rào chắn chặn 1 đòn
   B.sb23=0;return new Promise(r=>setTimeout(()=>{try{o.blk=B.blk23;const h0=hp;invuln=0;try{shield=0}catch{}try{bulletShieldTime=0}catch{}try{damage('bullet')}catch(e){o.err=String(e)}o.hpSame=hp===h0;o.blk2=B.blk23;
    // Săn Sao: bán kính hút đồ ×1,15 (1 lần/trận)
    const m1=window.__mag91;Ult72._set({sup:['fortress',null]});const m0=window.__mag91;Ult72._set({sup:['fortress','hunter']});o.mag=+(m1/m0).toFixed(3);
    // Thế Giới: nạp Bạo Tẩu ×1,08 (đặt Thế Giới vào ô trợ chiến)
    Ult72._set({main:'web',sup:['world','hunter']});const ch=()=>Combat26.state().charge;let c0=ch();if(c0>80){Combat26.addCharge07(-50);c0=ch();}Combat26.addCharge07(10);o.dc=+(ch()-c0).toFixed(3);Ult72._set({main:'web',sup:['fortress','hunter']});let c1=ch();if(c1>80){Combat26.addCharge07(-50);c1=ch();}Combat26.addCharge07(10);o.dc0=+(ch()-c1).toFixed(3);}catch(x){o.ex=String(x)}r(o)},400))}""")
  ck('Nội tại trợ chiến: chỉ VKTT ở ô Trợ chiến mới bật · Pháo Đài rào chắn chặn trọn 1 đòn · Săn Sao +15% hút đồ · Thế Giới +8% nạp Bạo Tẩu',pv['sup']==[True,False,True,False] and pv['blk']==1 and pv['hpSame'] and pv['blk2']==0 and abs(pv['mag']-1.15)<.002 and abs(pv['dc']-10.8)<.01 and abs(pv['dc0']-10)<.01,pv)
  # Lưới Điện trợ chiến: +6% ST boss — đo bằng damageBoss trên boss ải 40
  pg.evaluate("()=>{mode='menu';Lobby.show();document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='40';Lobby.hide();reset();if(mode==='pause')mode='play';try{startBoss()}catch(e){}}");pg.wait_for_function("()=>boss&&!boss.dead&&boss.y>40",timeout=60000);pg.wait_for_timeout(800)
  bw=pg.evaluate("""()=>{if(!boss||boss.dead)return null;boss.entered76=1;/* c76 chặn sát thương lúc boss đang tiến vào */const q=(boss.parts||[]).find(x=>!x.dead);const tg=q||boss;tg.hp=tg.max=1e12;if(!q){boss.coreHp=boss.coreMax=1e12;}const sum=()=>tg.hp+(q?0:(boss.coreHp||0));const dmg=()=>{const a=sum();damageBoss(1000,'t',q||undefined);return a-sum();};
   Ult72._set({main:'world',sup:['fortress','hunter']});const d0=dmg();Ult72._set({main:'world',sup:['web','hunter']});const d1=dmg();Ult72._set({main:'world',sup:['fortress','hunter']});return {d0,d1,k:+(d1/d0).toFixed(3)}}""")
  ck('Nội tại trợ chiến Lưới Điện: +6% sát thương lên Boss',bw and bw['d0']>0 and abs(bw['k']-1.06)<.005,bw)
  # 8 hiệu ứng + ràng buộc đồ họa
  start(pg,12);pg.wait_for_timeout(2500);pg.evaluate(CNT)
  fx=pg.evaluate("""()=>{const M=window.U4FX_IMG||{},inv={};for(const k in M)inv[M[k]]=k;const seen={};const P=CanvasRenderingContext2D.prototype,od=P.drawImage;P.drawImage=function(im){try{const k=im&&inv[im.src];if(k)seen[k]=(seen[k]|0)+1;}catch{}return od.apply(this,arguments)};
   const B=Ult72._B;const U=(id,ent)=>{Ult72._set({w:{[id]:{own:1,r:10,lv:62,sh:0}},main:id,sup:[null,null]});B.ents.length=0;B.ready=0;B.credit=1;B.useAt=-99;Ult72.useUlt();if(ent)Ult72._ent(ent);};
   const seq=[['fortress','turret'],['world','bomb'],['hunter','saw'],['web','net']];let i=0;return new Promise(r=>{const step=()=>{if(i<seq.length){try{U(...seq[i]);}catch(x){seen.err=String(x)}i++;setTimeout(step,1400);}else{P.drawImage=od;r(seen);}};step();});}""")
  k=pg.evaluate("()=>__k23off()")
  need=['fx_vktt_phaodai_turret','fx_vktt_phaodai_shield','fx_vktt_thegioi_bomb','fx_vktt_thegioi_field','fx_vktt_sansao_saw','fx_vktt_sansao_saw_ult','fx_vktt_luoidien_node','fx_vktt_luoidien_mark']
  ck('4 kỹ năng vẽ đủ 8 hiệu ứng trận (ụ pháo + vòm khiên · bom + pháp trận · cưa + cưa tối thượng · nút lưới + dấu khóa)',all(fx.get(x,0)>0 for x in need),fx)
  ck('Trong trận (8 hiệu ứng chạy): 0 shadowBlur · 0 ctx.filter · 0 canvas mới',k['sb']==0 and k['fl']==0 and k['cv']==0,k)
  tp=pg.evaluate("""()=>{const B=Ult72._B;const W='fortress';Ult72._set({w:{fortress:{own:1,r:10,lv:62,sh:0}},main:W,sup:[null,null]});const st=Chip72.state();for(const c of st.ch)if(c.eq)Chip72.unequip(c.id);
    const sh=['fire','fire','frame','frame','link','link'];for(let i=0;i<4;i++){const c=Chip72._give(Chip72.gen({q:2,sh:sh[i],set:i<2?'thanhtri':'thienvong',lv:10}));Chip72.equip(c.id,W,i);}
    const o={thT2:Ult72.X.has('thanhtri',2),thV2:Ult72.X.has('thienvong',2)};B.ents.length=0;B.ready=0;B.credit=1;B.useAt=-99;Ult72.useUlt();const tw=B.ents.filter(x=>x.ty==='tower');o.blk=tw.length?tw[0].blk:null;
    for(let i=2;i<6;i++){const c=Chip72._give(Chip72.gen({q:2,sh:sh[i],set:'thienvong',lv:10}));Chip72.equip(c.id,W,i);}o.tv4=Ult72.X.has('thienvong',4);const f0=Combat.factor();B.ready=0;B.credit=1;B.useAt=-99;Ult72.useUlt();o.cr=B.credit;o.fk=+(Combat.factor()/f0).toFixed(3);return o;}""")
  ck('Giao thức trong trận: Thành Trì 2 viên + Pháo Đài chủ chiến → cộng hưởng ụ pháo chặn +1 · Thiên Võng 4 viên → sau E sạc sẵn 15% + ST ×1,15 trong 6 giây',tp['thT2'] and tp['blk'] is not None and tp['tv4'] and abs(tp['cr']-.15)<1e-9 and abs(tp['fk']-1.15)<.002,tp)
  # ---------- 5. Vô tận: hệ số điểm không đổi ----------
  e=pg.evaluate("(W)=>{const gm=gameMode;gameMode='endless';const g=()=>{try{return [gameMode,multiplier()]}catch(x){return ['?',String(x)]}};const a=g();U4V23S.quickFit(W);Ult72._set({main:'hunter',sup:['web','world']});const b=g();U4V23S.quickOff(W);const c=g();gameMode=gm;return {a,b,c,src:/U4V23|Chip72|Ult72/.test(String(multiplier))}}",W)
  ck('VKTT + mô-đun cộng 0 hệ số điểm Vô tận: multiplier() giống hệt khi đổi đội hình / lắp / tháo',e['a']==e['b']==e['c'] and not e['src'],e)
  # ---------- 6. đồ họa giao diện ----------
  pg.reload();pg.wait_for_timeout(6500);pg.evaluate(CLEAN);pg.wait_for_timeout(1200)
  pg.evaluate("()=>{Ult72.open();return 0}");pg.wait_for_timeout(1200)
  bf=pg.evaluate("()=>[...document.querySelectorAll('body *')].filter(e=>{const v=getComputedStyle(e).backdropFilter;return v&&v!=='none'}).length")
  pg.evaluate("()=>{document.querySelectorAll('.u72').forEach(e=>e.hidden=true);Nav74.tab('home')}");pg.wait_for_timeout(1200)
  dpr=pg.evaluate("()=>{const c=document.querySelector('.h1-stage canvas');const r=c.getBoundingClientRect();return c.width/r.width}")
  ck('0 backdrop-filter (màn VKTT) · NHẸ DPR 1,00 (Sảnh)',bf==0 and abs(dpr-1)<=.02,{'bf':bf,'dpr':dpr})
  ck('Không lỗi JS',not errs,errs[:3])
  br.close()
print('KẾT QUẢ %d/%d'%(sum(R),len(R)))
