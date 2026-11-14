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
    STORE['lb/u_X']={'stage':160,'stars':400,'cp':90000,'ew':80,'bk':12}
    STORE['lb/u_Y']={'stage':20,'stars':50,'cp':3000,'ew':5,'bk':1}
    ca,A=dev('u_A');A.goto('file://'+f+'?nopop');A.wait_for_timeout(4000)
    A.evaluate("()=>{const h=JSON.parse(localStorage.getItem('saobang-hangar-v1'));h.cleared=Array.from({length:30},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));}")
    A.evaluate("()=>Cloud78.push()");A.wait_for_timeout(1500)
    R['lbA']=STORE.get('lb/u_A')
    R['first']=A.evaluate("async()=>{await Cloud78._weekly();return JSON.parse(localStorage.getItem('saobang-wk79')||'{}')}")
    R['bal0']=A.evaluate("()=>({g:Econ74.state().g,cr:Progress.balance(),tok:V77.state().tok,sh:BK78.state().shards})")
    R['settle']=A.evaluate("async()=>{localStorage.setItem('saobang-wk79',JSON.stringify({w:'2000-01-03'}));await Cloud78._weekly();return JSON.parse(localStorage.getItem('saobang-wk79')||'{}')}")
    R['bal1']=A.evaluate("()=>({g:Econ74.state().g,cr:Progress.balance(),tok:V77.state().tok,sh:BK78.state().shards})")
    R['title']=A.evaluate("()=>({t:Cloud78.title(),badge:document.getElementById('tt79')?.textContent||null})");A.wait_for_timeout(1800);R['badge']=A.evaluate("()=>document.getElementById('tt79')?.textContent||null")
    R['again']=A.evaluate("async()=>{await Cloud78._weekly();return Econ74.state().g}")
    A.evaluate("()=>Cloud78.open('stars')");A.wait_for_timeout(1500);R['tabs']=A.evaluate("()=>[...document.querySelectorAll('#lb78 [data-lbt]')].map(b=>b.textContent)")
    A.screenshot(path='/tmp/claude-0/-home-claude/5e17076b-711a-5cdd-a148-8fee187c2778/scratchpad/lb79.png')
    R['errs']=errs;b.close()
print(json.dumps(R,ensure_ascii=False))
