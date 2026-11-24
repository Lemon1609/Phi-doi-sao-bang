# V2.2 · kiểm hồi quy: màn kết quả (VỀ SẢNH không nảy ngược, ẢI TIẾP, CHƠI LẠI) + P Bạo Tẩu (hết → P4, +1 P → Bạo Tẩu, nhặt P khi đang Bạo Tẩu +2,5 s, trần 9 s ở SS).
# Chạy: python3 tests/t_v22.py <html tuyệt đối>   (chạy LẦN LƯỢT, không song song với t156/t209)
import sys,os,json
os.chdir(os.path.dirname(os.path.abspath(__file__))+'/..')
src=open('claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
HTML=sys.argv[1];sys.argv=['x',HTML,'160'];exec(src)
t209=open('tests/v203_v212/t209.py').read();exec(t209[t209.find('def start'):t209.find('with sync_playwright')])
ok=[];bad=[]
def chk(n,c,info=''):
    (ok if c else bad).append(n);print(('ĐẠT ' if c else 'TRƯỢT ')+n,info,flush=True)
BTN="()=>[...document.getElementById('overlay').querySelectorAll('button')].filter(b=>b.offsetParent).map(b=>b.textContent.trim())"
ST="()=>({mode,ovh:document.getElementById('overlay').hidden,res:document.body.classList.contains('res78'),ms:document.getElementById('mission-select').value})"
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'SS');pg.add_style_tag(content='#q307{display:none!important}')
  # 1 THẮNG → VỀ SẢNH: không nảy ngược trong 4 s
  start(pg,12);pg.evaluate("()=>{invuln=1e9}");pg.evaluate("()=>finishStage36(false)");pg.wait_for_timeout(2500)
  b=pg.evaluate(BTN)
  chk('Thắng: có nút VỀ SẢNH + ẢI TIẾP',any('SẢNH' in x for x in b) and any('ẢI TIẾP' in x for x in b),b)
  pg.evaluate("()=>{window.__log=[];const iv=setInterval(()=>{const ov=document.getElementById('overlay');window.__log.push([mode,ov.hidden,document.body.classList.contains('res78')]);},250);setTimeout(()=>clearInterval(iv),4000);document.querySelector('#e22a .e22s').click()}")
  pg.wait_for_timeout(4300);L=pg.evaluate("()=>window.__log")
  bad_=[x for x in L[1:] if not(x[0]=='menu' and x[1] and not x[2])]
  chk('VỀ SẢNH: 4 s liền mode menu, overlay ẩn, không bật lại màn kết quả',len(L)>=4 and not bad_,{'n':len(L),'lech':bad_[:4]})
  # 2 THẮNG → ẢI TIẾP
  start(pg,12);pg.evaluate("()=>{invuln=1e9}");pg.evaluate("()=>finishStage36(false)");pg.wait_for_timeout(2500)
  pg.evaluate("()=>document.querySelector('#e22a .e22g').click()");pg.wait_for_timeout(3500);r=pg.evaluate(ST)
  chk('ẢI TIẾP: vào ải 13, đang chơi, màn kết quả đã tắt',r['mode']=='play' and r['ms']=='13' and r['ovh'] and not r['res'],r)
  # 3 THUA → CHƠI LẠI, rồi thua lại → VỀ SẢNH
  start(pg,12);pg.evaluate("()=>end(false)");pg.wait_for_timeout(2500);b=pg.evaluate(BTN)
  chk('Thua: có nút VỀ SẢNH + CHƠI LẠI',any('SẢNH' in x for x in b) and any('CHƠI LẠI' in x for x in b),b)
  pg.evaluate("()=>document.querySelector('#e22a .e22g').click()");pg.wait_for_timeout(3500);r=pg.evaluate(ST)
  chk('CHƠI LẠI: vào lại ải 12, đang chơi',r['mode']=='play' and r['ms']=='12' and r['ovh'],r)
  pg.evaluate("()=>end(false)");pg.wait_for_timeout(1500);pg.evaluate("()=>document.querySelector('#e22a .e22s').click()");pg.wait_for_timeout(3000);r=pg.evaluate(ST)
  chk('Thua → VỀ SẢNH: mode menu, không màn kết quả',r['mode']=='menu' and r['ovh'] and not r['res'],r)
  # 4 P Bạo Tẩu
  start(pg,12)
  pg.evaluate("()=>{invuln=1e9;clearInterval(window.__k);window.__k=setInterval(()=>{try{enemies=[];bullets=[];hp=maxHp}catch(e){}},30);power=5;powerUpgrades=4;activateSuper();superTime=0.3}")
  pg.wait_for_timeout(900);a=pg.evaluate("()=>({power,superTime})")
  chk('Hết Bạo Tẩu → giữ P4/4 (power 5), không Bạo Tẩu',a['power']==5 and a['superTime']<=0,a)
  pg.evaluate("()=>collect({type:'power',x:player.x,y:player.y})");pg.wait_for_timeout(100);a=pg.evaluate("()=>({power,superTime})")
  chk('Nhặt 1 P → Bạo Tẩu lại',a['superTime']>0,a)
  a=pg.evaluate("()=>{superTime=3;collect({type:'power',x:player.x,y:player.y});const x=superTime;superTime=5;collect({type:'power',x:player.x,y:player.y});const y=superTime;superTime=8;collect({type:'power',x:player.x,y:player.y});return {x,y,z:superTime,g:Rank36.grade()}}")
  chk('Nhặt P khi đang Bạo Tẩu: +2,5 s (3→5,5 · 5→7,5), trần 9 s ở SS',abs(a['x']-5.5)<.02 and abs(a['y']-7.5)<.02 and abs(a['z']-9)<.02 and a['g']=='SS',a)
  pg.evaluate("()=>{power=2;powerUpgrades=1;superTime=0.2}");pg.wait_for_timeout(700);a=pg.evaluate("()=>({power,superTime})")
  chk('Bạo Tẩu kết thúc từ cấp thấp (power 2) → vẫn về power 5',a['power']==5,a)
  a=pg.evaluate("()=>{window.OD22=false;superTime=3;collect({type:'power',x:player.x,y:player.y});const s=superTime;window.OD22=true;return {s}}")
  chk('Tắt OD22: nhặt P khi đang Bạo Tẩu quay về nạp đầy (> 5,5 s)',a['s']>5.6,a)
  # 5 trúng đòn không khiên: hạ 1 cấp đạn (chờ hết Bạo Tẩu + thời gian bất tử còn sót từ bước trước)
  pg.evaluate("()=>{superTime=0}");pg.wait_for_timeout(2000)
  a=pg.evaluate("""()=>{const H=()=>{invuln=0;shield=0;bulletShieldTime=0;};
   const land=(pw)=>{const L=[];for(let k=0;k<10;k++){superTime=0;power=pw;powerUpgrades=pw-1;H();const h0=hp;damage('collision');const hit=hp<h0;L.push([hit,power]);hp=maxHp;if(hit)return {L,ok:true,p:power};}return {L,ok:false,p:power};};
   delete window.LV22;const d=land(4);
   window.LV22=true;const a=land(4);const blk=a.L.filter(x=>!x[0]).every(x=>x[1]===4);
   H();superTime=0;power=3;powerUpgrades=2;shield=50;damage('collision');const p2=power;
   const c=land(1);
   power=4;powerUpgrades=3;superTime=3;H();damage('collision');const p4=power;superTime=0;delete window.LV22;
   return {pDef:d.p,okDef:d.ok,p1:a.p,ok1:a.ok,blk,p2,p3:c.p,p4}}""")
  chk('Mặc định (LV22 chưa bật): trúng đòn mất máu GIỮ cấp đạn như game gốc',a['okDef'] and a['pDef']==4,a)
  chk('Bật LV22=true: mất máu không khiên Lv4 → Lv3; đòn bị giáp chặn / có khiên / Bạo Tẩu giữ cấp; Lv1 không xuống',a['ok1'] and a['p1']==3 and a['blk'] and a['p2']==3 and a['p3']==1 and a['p4']==4,a)
  chk('Không lỗi trang',not errs,errs[:5])
  br.close()
print('KẾT QUẢ %d/%d'%(len(ok),len(ok)+len(bad)))
