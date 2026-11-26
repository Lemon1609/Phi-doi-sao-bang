# V2.2.3 Gói B (T25): ngọc S / ↑ / 2, thiên thạch, HUD, đua điểm, tổng kết — và KINH TẾ KHÔNG ĐỔI (Vô tận không cộng điểm Gói B, không đụng tài nguyên)
import sys,os,json
src=open('claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
HTML=sys.argv[1];sys.argv=['x',HTML,'160'];exec(src)
t209=open('tests/v203_v212/t209.py').read();exec(t209[t209.find('def start'):t209.find('with sync_playwright')])
R=[]
def ck(n,ok,d=None):R.append(ok);print(('ĐẠT ' if ok else 'TRƯỢT ')+n,'' if d is None else json.dumps(d,ensure_ascii=False)[:400])
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'SS')
  start(pg,12);pg.evaluate("()=>{clearInterval(window.__hz);window.__h0=setInterval(()=>{hp=maxHp;for(const e of enemies)if(!e.__t25)e.hp=Math.max(e.hp,1e7)},40)}");pg.wait_for_timeout(1500)
  h=pg.evaluate("()=>PKB25S.hooks()");ck('Móc Gói B (bọc ≤ 4 lần)',h['kill']>=1 and h['kill']<=4 and h['draw']>=1 and h['draw']<=4,h)
  d=pg.evaluate("""()=>{const e=enemies.find(x=>!x.dead&&!x.meteor&&!x.rescue28);if(!e)return null;e.__t25=1;PKB25S.apply('s',player.x,player.y);const inv=invuln;e.hp=1e6;const iv=setInterval(()=>{player.x=e.x;player.y=e.y+12},16);return new Promise(r=>setTimeout(()=>{clearInterval(iv);player.x=240;player.y=640;r({inv,dead:!!e.dead,ram:PKB25S.R.ramN,son:PKB25S.sOn()})},400))}""")
  ck('Ngọc S: bất tử ≥ 4 s, tông vỡ quái',bool(d) and d['inv']>=4 and d['dead'] and d['ram']>=1,d)
  d=pg.evaluate("""()=>{PKB25S.R.sEnd=0;power=3;PKB25S.apply('up',0,0);const a=power;power=5;superTime=0;PKB25S.apply('up',0,0);return {a,sup:superTime}}""")
  ck('Ngọc ↑: +1 cấp đạn; tối đa thì Bạo Tẩu',d['a']==4 and d['sup']>0,d)
  pg.evaluate("()=>{superTime=0}")
  d=pg.evaluate("""()=>new Promise(res=>{const L=enemies.filter(x=>!x.dead&&!x.meteor&&!x.rescue28&&!x.elite);let A=null,B=null;for(const a of L){B=L.find(b=>b!==a&&(b.type===4)===(a.type===4));if(B){A=a;break;}}if(!B)return res(null);
    const one=(e,cb)=>{combo=0;const s0=score,c0=runCredits,i0=runItems;e.__t25=1;e.hp=1;kill(e);setTimeout(()=>cb({d:score-s0,c:runCredits-c0,i:runItems-i0}),120);};
    PKB25S.R.x2End=0;one(A,off=>{PKB25S.apply('2',0,0);one(B,on=>{PKB25S.R.x2End=0;res({off,on})})})})""")
  ck('Ngọc 2 (chiến dịch): điểm trận ×2, tài nguyên trận không đổi',bool(d) and d['on']['d']==2*d['off']['d'] and d['on']['c']==d['off']['c'] and d['on']['i']==d['off']['i'],d)
  d=pg.evaluate("""()=>{window.__gm=gameMode;gameMode='endless';PKB25S.spawnOrb('2',100,100);const k=PKB25S.OB.filter(o=>o.on).map(o=>o.k);PKB25S.OB.forEach(o=>o.on=0);const s0=score;PKB25S.AST.push({K:{k:1,pts:80},x:100,y:100,r:20,hp:0,max:5,dead:false,vx:0,vy:0,a:0,va:0,fl:0});PKB25S.breakAst(PKB25S.AST[PKB25S.AST.length-1]);const ds=score-s0;
    PKB25S.R.x2End=performance.now()+5000;const s1=score;score+=100;return new Promise(r=>setTimeout(()=>{const d2=score-s1;PKB25S.R.x2End=0;gameMode=window.__gm;r({k,ds,d2})},150))}""")
  ck('Vô tận: không rơi ngọc 2, thiên thạch / ×2 không cộng điểm (giữ hạng mùa)',not ('2' in d['k']) and d['ds']==0 and d['d2']==100,d)
  pg.evaluate("()=>{PKB25S.AST.length=0;PKB25S.startWave();window.__w=setInterval(()=>{for(const a of PKB25S.AST)a.y=Math.min(a.y,260)},30)}");pg.wait_for_timeout(3400)
  d=pg.evaluate("()=>{clearInterval(window.__w);const A=PKB25S.AST;return {n:A.length+PKB25S.R.astN,hit:A.filter(a=>a.hp<a.max).length,brk:PKB25S.R.astN}}")
  ck('Đợt thiên thạch: ≥ 4 viên, bị bắn mất máu / vỡ',d['n']>=4 and (d['hit']+d['brk'])>=1,d)
  d=pg.evaluate("""()=>new Promise(res=>{const P=CanvasRenderingContext2D.prototype,od=Object.getOwnPropertyDescriptor(P,'shadowBlur'),of=Object.getOwnPropertyDescriptor(P,'filter'),oc=document.createElement;let sb=0,fl=0,cv=0,st=[];
      Object.defineProperty(P,'shadowBlur',{configurable:true,get(){return od.get.call(this)},set(v){if(v>0)sb++;od.set.call(this,v)}});Object.defineProperty(P,'filter',{configurable:true,get(){return of.get.call(this)},set(v){if(v&&v!=='none')fl++;of.set.call(this,v)}});
      document.createElement=function(t){if(String(t).toLowerCase()==='canvas'){cv++;st.push((new Error().stack||'').split('\\n').slice(2,4).join('|').slice(0,160))}return oc.apply(this,arguments)};
      PKB25S.apply('s',player.x,player.y);PKB25S.startWave();PKB25S.spawnOrb('up',200,200);
      setTimeout(()=>{Object.defineProperty(P,'shadowBlur',od);Object.defineProperty(P,'filter',of);document.createElement=oc;PKB25S.R.sEnd=0;res({sb,fl,cv,st})},1500)})""")
  ck('Xung kích + thiên thạch + ngọc: 0 shadowBlur / filter / canvas mới',d['sb']==0 and d['fl']==0 and d['cv']==0,d)
  d=pg.evaluate("""()=>{const r=id=>{const e=document.getElementById(id);if(!e)return null;const b=e.getBoundingClientRect();return [Math.round(b.left),Math.round(b.top)]};const g=document.getElementById('rg25'),bs=document.getElementById('bs25');
    return {bomb:r('bomb'),mis:r('missile-action'),skill:r('robot-skill'),ring:!!(g&&!g.hidden),buff:!!(bs&&!bs.hidden&&bs.children.length)}}""")
  ck('HUD: Bom trái, Tuyệt kỹ phải có vòng %, cột buff mép trái',d['bomb'] and d['skill'] and d['bomb'][0]<150 and d['skill'][0]>240 and d['ring'] and d['buff'],d)
  pg.evaluate("()=>{clearInterval(window.__h0);try{finishStage36(false)}catch(e){}}");pg.wait_for_timeout(2500)
  d=pg.evaluate("()=>{const e=document.querySelector('#rs .rs25');return e?e.textContent:null}")
  ck('Màn tổng kết: công thức điểm + thanh trần ngày (đọc EL81) ',bool(d) and '/30' in d and '/5' in d and 'combo' in d,d)
  ck('Không lỗi trang',len(errs)==0,errs[:3])
  br.close()
print('KẾT QUẢ %d/%d'%(sum(R),len(R)))
