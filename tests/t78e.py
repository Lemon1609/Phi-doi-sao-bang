# V78 · đám mây (giả lập db/user): máy A lưu → máy B mới tải về; bảng xếp hạng; số liệu ải
import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];STORE={};R={}
MOCK="""(uid)=>{const call=(op,path,data)=>window.__cl(op,path,data?JSON.stringify(data):null).then(r=>r&&JSON.parse(r));
 const snapOf=(path,d)=>({id:path.split('/').pop(),exists:!!d,data:()=>d||undefined,metadata:{fromCache:false,hasPendingWrites:false}});
 const doc=p=>({id:p.split('/').pop(),path:p,get:async()=>snapOf(p,await call('get',p)),set:async d=>{await call('set',p,d)},update:async d=>{await call('update',p,d)},delete:async()=>{await call('del',p)}});
 const coll=p=>{const q={path:p,doc:id=>doc(p+'/'+id),limit:()=>q,orderBy:()=>q,where:()=>q,get:async()=>{const L=await call('list',p);const docs=L.map(([id,d])=>snapOf(p+'/'+id,d));return {docs,size:docs.length,empty:!docs.length}}};return q;};
 const db={doc,collection:coll};const user={id:async()=>uid,profiles:async ids=>Object.fromEntries([].concat(ids).map(i=>[i,{id:i,name:i==='u_A'?'Cường':'Bạn B',avatarUrl:'',color:'#fff',email:null,isMe:i===uid,guest:false}]))};
 window.claude={use:async n=>n==='db'?db:n==='user'?user:null};}"""
def cl(op,path,data):
    if op=='get': return json.dumps(STORE.get(path)) if path in STORE else None
    if op=='set': STORE[path]=json.loads(data);return 'null'
    if op=='list':
        pre=path+'/';return json.dumps([[k[len(pre):],v] for k,v in STORE.items() if k.startswith(pre) and '/' not in k[len(pre):]])
    return 'null'
with sync_playwright() as p:
    b=p.chromium.launch();errs=[]
    def dev(uid):
        ctx=b.new_context(viewport={'width':393,'height':852});ctx.expose_function('__cl',cl);ctx.add_init_script('('+MOCK+')('+json.dumps(uid)+')')
        pg=ctx.new_page();pg.on('pageerror',lambda e:errs.append(str(e)));return ctx,pg
    ca,A=dev('u_A');A.goto('file://'+f+'?nopop');A.wait_for_timeout(4000)
    A.evaluate("()=>{Progress.grantCredits(12345);const h=JSON.parse(localStorage.getItem('saobang-hangar-v1'));h.cleared=[1,2,3,4,5,6,7];localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));}")
    A.evaluate("()=>Cloud78.push()");A.wait_for_timeout(1500)
    R['A']=A.evaluate("()=>({st:Cloud78.state(),cr:Progress.balance()})");R['keys']=sorted(k for k in STORE if not k.startswith('data/users/u_A/s'))
    # máy B: cùng tài khoản A, trình duyệt mới
    cb,B=dev('u_A');B.goto('file://'+f+'?nopop');B.wait_for_timeout(9000)
    R['B']=B.evaluate("()=>({st:Cloud78.state(),cr:Progress.balance(),cleared:(JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}').cleared||[]).length})")
    # người chơi khác + bảng xếp hạng
    cc,C=dev('u_C');C.goto('file://'+f+'?nopop');C.wait_for_timeout(5000)
    C.evaluate("()=>{document.getElementById('tutorial392')?.remove();Cloud78.open('stage')}");C.wait_for_timeout(1500)
    R['board']=C.evaluate("()=>[...document.querySelectorAll('#lb78 .lb78r')].map(r=>r.innerText.replace(/\\n/g,' | '))")
    C.screenshot(path='/tmp/claude-0/t78e_board.png')
    C.evaluate("()=>{document.getElementById('lb78')?.remove();Gfx66.open()}");C.wait_for_timeout(900);R['settings']=C.evaluate("()=>[document.getElementById('cl78s')?.textContent,document.getElementById('fs78s')?.textContent]")
    C.screenshot(path='/tmp/claude-0/t78e_set.png')
    # số liệu: thua 1 trận ải 1
    C.evaluate("()=>{Gfx66.close&&Gfx66.close();document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='1';Lobby.hide();reset()}");C.wait_for_timeout(1500)
    C.evaluate("()=>{try{end()}catch(e){mode='over'}}");C.wait_for_timeout(4500)
    R['tele']=STORE.get('tele/u_C')
    R['errs']=errs;b.close()
print(json.dumps(R,ensure_ascii=False,indent=0))
