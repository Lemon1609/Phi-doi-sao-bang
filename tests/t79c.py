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
    SEED="if(!sessionStorage.getItem('sd')){sessionStorage.setItem('sd','1');const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');if(h.version){h.cleared=Array.from({length:60},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));const c=JSON.parse(localStorage.getItem('saobang-campaign-v36')||'{}');c.stars={};for(let i=1;i<=60;i++)c.stars[i]=3;localStorage.setItem('saobang-campaign-v36',JSON.stringify(c));}}"
    ca,A=dev('u_A');A.goto('file://'+f+'?nopop');A.wait_for_timeout(3500);A.add_init_script(SEED);A.reload();A.wait_for_timeout(4500)
    R['A0']=A.evaluate("()=>Set79.state()")
    A.evaluate("()=>{Set79.claim();Set79.claim();}");A.evaluate("()=>Cloud78.push()");A.wait_for_timeout(2500)
    R['A1']=A.evaluate("()=>({s:Set79.state(),cloud:Cloud78.state()})")
    cb,B=dev('u_A');B.goto('file://'+f+'?nopop');B.wait_for_timeout(9000)
    R['B1']=B.evaluate("()=>({s:Set79.state(),mirror:(Progress.getState().items||[]).filter(i=>i.variant==='mirror').length,n:(()=>{const it=(Progress.getState().items||[]).find(i=>i.variant==='mirror');return it?V70.nOf(it):null})()})")
    # A tiến thêm (nhận bậc Tím) và lưu; B đang mở với bản cũ hơn rồi cố lưu → phải tải bản mới thay vì ghi đè
    A.evaluate("()=>{Set79.claim();}");A.wait_for_timeout(300);A.evaluate("()=>Cloud78.push()");A.wait_for_timeout(2500)
    R['A2']=A.evaluate("()=>Set79.state()")
    B.evaluate("()=>{Progress.grantCredits(1);}");B.evaluate("()=>Cloud78.push()");B.wait_for_timeout(9000)
    R['B2']=B.evaluate("()=>({s:Set79.state(),n:(()=>{const it=(Progress.getState().items||[]).find(i=>i.variant==='mirror');return it?V70.nOf(it):null})()})")
    R['errs']=errs;b.close()
print(json.dumps(R,ensure_ascii=False))
ok=[('B nhận đúng quà bộ từ A',R['B1']['s']['s']==2 and R['B1']['n']==2),('B cũ không ghi đè A, tự tải bản mới',R['B2']['s']['k']==1 and R['B2']['n']==6),('không lỗi JS',not R['errs'])]
print('KẾT QUẢ',' · '.join(('✓ ' if v else '✗ ')+k for k,v in ok))
