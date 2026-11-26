# V2.2.3 Gói A (T24): móc đã gắn · nhạc nền hòa tiếng khi Sảnh → Trận · X2 + mưa tinh thể KHÔNG đổi điểm/tài nguyên · báo laser ≥ 0,9 s · âm thanh không vượt trần
import sys,os,json
src=open('claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
HTML=sys.argv[1];sys.argv=['x',HTML,'160'];exec(src)
t209=open('tests/v203_v212/t209.py').read();exec(t209[t209.find('def start'):t209.find('with sync_playwright')])
R=[]
PK_FULL=lambda d:False
def ck(n,ok,d=None):R.append(ok);print(('ĐẠT ' if ok else 'TRƯỢT ')+n,'' if d is None else json.dumps(d,ensure_ascii=False))
with sync_playwright() as p:
  br=p.chromium.launch(args=['--autoplay-policy=no-user-gesture-required']);pg,errs,o=setup(br,'SS')
  pg.keyboard.press('Shift');pg.wait_for_timeout(400);pg.evaluate("()=>{try{sound=true}catch(e){}}")
  hk=pg.evaluate("()=>({s:!!window.PKA24S,f:false,k:PKA24S.hooked(),b:!!BloomQualityC.draw.__p24,h:!!PlayerFXB.hostile.__p24,r:!!Render27.projectile.__p24})");hk['f']=pg.evaluate("()=>new Promise(r=>{let n=0;const i=setInterval(()=>{if(Fighters28.draw.__p24||++n>30){clearInterval(i);r(!!Fighters28.draw.__p24)}},50)})");ck('Móc Gói A đã gắn',all(hk.values()),hk)
  pg.wait_for_timeout(1200);lob=pg.evaluate("()=>Music96.state().cur")
  pg.evaluate("()=>{window.__xf=[];window.__xi=setInterval(()=>{try{__xf.push(Music96.xf())}catch(e){}},100)}")
  start(pg,12);pg.evaluate("()=>{clearInterval(window.__hz);window.__h0=setInterval(()=>{for(const e of enemies)e.hp=Math.max(e.hp,1e7)},40)}");pg.wait_for_timeout(1500)
  xf=pg.evaluate("()=>{clearInterval(__xi);return {old:__xf.filter(x=>x&&x.old).length,cur:Music96.state().cur}}")
  ck('Nhạc nền Sảnh → Trận hòa tiếng (bài cũ còn nhỏ dần ≥ 0,5 s)',lob=='lobby' and xf['old']>=5 and xf['cur']=='battle',{'lob':lob,**xf})
  d=pg.evaluate("""()=>{clearInterval(window.__h0);const L=enemies.filter(x=>!x.dead&&!x.meteor&&!x.rescue28&&!x.elite);let A=null,B=null;for(const a of L){B=L.find(b=>b!==a&&b.type===a.type);if(B){A=a;break;}}if(!A)return null;
    const one=(e,on)=>{window.PKA24=on?undefined:false;combo=14;e.hp=1;const s0=score,x0=PKA24S.xs(),c0=PKA24S.cry();kill(e);return {d:score-s0,x:PKA24S.xs()-x0,c:PKA24S.cry()-c0};};
    const off=one(A,false),on=one(B,true);window.PKA24=undefined;return {off,on}}""")
  ck('Hạ địch có X2: điểm bằng hệt khi tắt Gói A, có chữ X + tinh thể',bool(d) and d['on']['d']==d['off']['d'] and d['off']['x']==0 and (d['on']['x']>=1 or PK_FULL(d)) ,d)
  pg.evaluate("()=>{window.__hold=setInterval(()=>{for(const e of enemies)e.hp=Math.max(e.hp,1e7);hp=maxHp},50)}")
  pg.wait_for_timeout(2700);c1=pg.evaluate("()=>({cry:PKA24S.cry()})")
  ck('Tinh thể bay về tàu hết trong 2,7 s (chỉ trang trí)',c1['cry']==0,c1)
  w=pg.evaluate("()=>{beams.push({x:200,y:0,width:18,age:0,warn:.6,duration:.6});return new Promise(r=>setTimeout(()=>r(beams[beams.length-1].warn),300))}")
  ck('Laser dọc báo trước ≥ 0,9 s',w>=.9,w)
  s=pg.evaluate("()=>PKA24S.stat")
  ck('Âm thanh Gói A có kêu, đỉnh ≤ 10 tiếng',s['n']>0 and s['peak']<=10,s)
  ck('Không lỗi trang',len(errs)==0,errs[:3])
  br.close()
print('KẾT QUẢ %d/%d'%(sum(R),len(R)))
