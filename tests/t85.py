# V85 · boss E1 (CH6–CH9), thưởng lần đầu boss 120–180, dọn chữ "phôi", Chợ Đen, boss cuối tuần không chết
import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];O=(sys.argv[2] if len(sys.argv)>2 else '/tmp')+'/';R={};OK=[]
def chk(n,c):OK.append(('✓' if c else '✗')+' '+n)
SEED="if(!sessionStorage.getItem('t85')){sessionStorage.setItem('t85','1');const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:119},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));}"
with sync_playwright() as p:
  b=p.chromium.launch();pg=b.new_page(viewport={'width':393,'height':852});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2000);pg.add_init_script(SEED);pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(6000)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove()}")
  R['spec']=pg.evaluate("()=>['CH6','CH7','CH8','CH9'].map(k=>[k,B75.specOf(k).sc,B75.SPEC[k].phases.flat().map(m=>m.speed||m.fastSpeed||m.spiralSpeed||0)])")
  chk('Boss 120–180 dùng mẫu Gemini E1 (V86: ×0,88), đạn gốc ≤ 205 px/s',all(abs(x[1]-.88)<1e-9 and max(x[2])<=205 for x in R['spec']))
  # thưởng lần đầu
  R['drop']=pg.evaluate("""async()=>{const s0=Drop85.state();DROP85.chance[120]=1;const n0=(Evo82.list?Evo82.list().length:0);
     const orig=Progress.getState;Progress.getState=()=>Object.assign({},orig(),{cleared:[...(orig().cleared||[]),120]});Drop85.tick();Progress.getState=orig;
     return {s0,s1:Drop85.state(),n0,n1:(Evo82.list?Evo82.list().length:0)}}""")
  chk('Người chơi cũ đã qua ải: không phát bù',R['drop']['s0'] is not None and '120' not in (R['drop']['s0'] or {}).get('done',{}))
  chk('Hạ boss ải 120 lần đầu → bản sao Tím Lv1',R['drop']['s1']['done'].get('120')=='copy')
  # Chợ Đen
  R['bm']=pg.evaluate("""async()=>{try{Trade67.open?Trade67.open('bm'):null}catch{};await new Promise(r=>setTimeout(r,300));const st=JSON.parse(localStorage.getItem('saobang-trade67')||'{}');return {slots:(st.bm||{}).slots||null}}""")
  # dọn chữ: chèn 1 đoạn có chữ phôi vào giao diện rồi chờ quét
  R['fix']=pg.evaluate("""async()=>{const d=document.createElement('div');d.id='fx85t';d.textContent='Đổi 1 phôi Lam chiến cơ · ĐÚC PHÔI TÍM · thành phôi sắt';document.body.appendChild(d);await new Promise(r=>setTimeout(r,1500));const t=d.textContent;d.remove();return t}""")
  chk('Chữ "phôi Lam/PHÔI TÍM" đổi thành bản sao, giữ "phôi sắt"',R['fix']=='Đổi 1 bản sao Lam Lv1 chiến cơ · ĐÚC BẢN SAO TÍM · thành phôi sắt')
  pg.evaluate("()=>{try{Nav74.tab('shop')}catch{}}");pg.wait_for_timeout(2500);pg.screenshot(path=O+'t85_shop.png')
  R['shopTxt']=pg.evaluate("()=>{const t=document.body.innerText;return {phoi:(t.match(/phôi (Trắng|Lục|Lam|Tím)/g)||[]).length,sweep:t.includes('vé càn quét')}}")
  chk('Cửa hàng không còn "phôi + màu"',R['shopTxt']['phoi']==0)
  R['errs']=errs[:5];chk('không lỗi JS',not errs);b.close()
print(json.dumps(R,ensure_ascii=False)[:2500]);print('KẾT QUẢ '+' · '.join(OK))
