# V2.2 · Rà soát giao diện toàn game: chụp 28 màn 390×844 DPR2 (vùng an toàn giả trên 34 px / dưới 20 px + vạch dẫn),
# quét DOM từng màn (nút/tab tràn vùng an toàn · chữ tràn · nút bo tròn kiểu cũ / khung sáng cũ / thanh trượt mặc định / sao ★ trên thẻ trang bị
# · lỗi JS · ảnh hỏng), ghép 3 tấm UI_AUDIT_1..3 + bảng kiểm (md + json).
# Dùng: python3 claude_tools/v22_kiem/audit_ui.py <html tuyệt đối> <thư mục ra> [ONLY=01,05,...]
import sys,os,json,time
R='/home/claude/phi-doi-sao-bang';os.chdir(R)
HTML,OUT=sys.argv[1],sys.argv[2];os.makedirs(OUT+'/png',exist_ok=True)
ONLY=[x for x in os.environ.get('ONLY','').split(',') if x]
src=open('claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
sys.argv=['x',HTML,'160'];exec(src)
t209=open('tests/v203_v212/t209.py').read();exec(t209[t209.find('def start'):t209.find('with sync_playwright')])
SAFE_T,SAFE_B=34,20
CL=lambda s:["click",s]
HOME=[["js","Nav74.tab('home')"],["w",1800]]
KHO=[["js","Nav74.tab('home')"],["w",800],CL("[data-ck9=kho]"),["w",3000]]
HS=HOME+[CL("#lb68-pp"),["w",900]]
VK="Ult72._set({w:{world:{own:1,r:10,lv:80,sh:0}},main:'world'});"
FRAME={'01':'phoenix','10':'void','11':'thunder'}  # đeo thử khung giới hạn để xem tranh mới
SC=[
 ('01','Sảnh chính · XƯỞNG (thường) · khung Phượng Hoàng',1,HOME+[["until","!(superTime>0)",9000],["w",400]]),
 ('02','Sảnh chính · xem trước Bạo Tẩu',1,HOME+[["until","superTime>0",12000],["w",700]]),
 ('03','Chọn ải · CHIẾN ĐẤU',1,HOME+[CL("#lb68 .lb68-cta .cta.c"),["w",2600]]),
 ('04','VÔ TẬN · Tiếp tế chiến thuật',1,HOME+[CL("#lb68 .lb68-cta .cta.e"),["w",1500]]),
 ('05','Kho đồ · tab PHI CÔNG',1,KHO),
 ('06','Kho đồ · tab VŨ KHÍ TỐI THƯỢNG',1,KHO+[CL("#hub40 .tb22 [data-t22=b]"),["w",900]]),
 ('07','Túi đồ',1,KHO+[CL(".c9bar button:not(.up):not(.cai)"),["w",1400]]),
 ('08','Cường hóa',1,KHO+[CL(".c9bar .up"),["w",1400]]),
 ('09','Cải tạo',1,KHO+[CL(".c9bar .cai"),["w",1400]]),
 ('10','Hồ sơ phi công · TRANG BỊ · khung Hư Không',2,HS),
 ('11','Hồ sơ phi công · CHIẾN TÍCH',2,HS+[CL("#hs22 [data-hs='t:ct']"),["w",500]]),
 ('12','Trang phục · KHUNG AVATAR',2,HS+[CL("#hs22 [data-hs=fr]"),["w",800],CL("#fr22 [data-fr='t:base']"),["w",500]]),
 ('13','Trang phục · KHUNG GIỚI HẠN',2,HS+[CL("#hs22 [data-hs=fr]"),["w",800],CL("#fr22 [data-fr='t:lim']"),["w",400],CL("#fr22 [data-fr='f:ice']"),["w",400]]),
 ('14','Màn Vũ khí tối thượng',2,[["js",VK+"Nav74.tab('home');Ult72.open()"],["w",1500]]),
 ('15','Tiến bậc thành công (2 tầng)',2,[["js",VK+"Nav74.tab('home');Ult72.open()"],["w",1400],["js","Ult72._set({w:{world:{own:1,r:11,lv:80,sh:0}}})"],["w",1600]]),
 ('16','Đá khảm',2,KHO+[CL("[data-c9g=stones]"),["w",1500]]),
 ('17','Chiến Thần (hợp thể)',2,KHO+[CL("[data-c9g=sss]"),["w",2200]]),
 ('18','Phi công (từ Sảnh)',2,HOME+[CL("[data-ck9=pilot]"),["w",1500]]),
 ('19','Nhiệm vụ',3,HOME+[CL("[data-h9b=mis]"),["w",1500]]),
 ('20','Phúc lợi',3,HOME+[CL("[data-h9b=pl]"),["w",1500]]),
 ('21','Bộ sưu tập',3,HOME+[CL("[data-h9b=bst]"),["w",1500]]),
 ('22','Cửa hàng',3,HOME+[CL("[data-h9b=shop]"),["w",1500]]),
 ('23','Bách khoa',3,HOME+[CL("[data-ck9=codex]"),["w",1500]]),
 ('24','Cài đặt',3,HOME+[["js","Gfx66.open()"],["w",900]]),
 ('25','Trong trận · thanh máu boss + Bạo Tẩu',3,[["st",20],["js","invuln=1e9;try{startBoss()}catch(e){};setInterval(()=>{try{hp=maxHp}catch(e){}},200)"],["w",4200],["js","activateSuper();superTime=6"],["w",1200]]),
 ('26','Hộp thoại Tạm dừng',3,[["st",12],["w",1500],CL("#pause"),["w",900]]),
 ('27a','Kết quả · CHIẾN THẮNG',3,[["st",12],["w",1500],["js","finishStage36(false)"],["w",2700]]),
 ('27b','Kết quả · THẤT BẠI',3,[["st",12],["w",1500],["js","end(false)"],["w",2700]]),
]
PREP="""()=>{try{Safe42(%d)}catch(e){};document.getElementById('tutorial392')?.remove();const q=document.getElementById('q307');if(q)q.style.display='none';
 document.querySelectorAll('.m63').forEach(e=>e.hidden=true);try{Progress.setLocked(false)}catch(e){}}"""%SAFE_T
CHECK="""(a)=>{const [ST,SB]=a;const H=innerHeight,W=innerWidth,top=ST,bot=H-SB;
 const clipR=(e,r)=>{let t=r.top,b=r.bottom,l=r.left,rr=r.right;for(let p=e.parentElement;p&&p!==document.body;p=p.parentElement){const s=getComputedStyle(p);if(/(auto|scroll|hidden|clip)/.test(s.overflowY+s.overflowX)){const q=p.getBoundingClientRect();const bt=parseFloat(s.borderTopWidth)||0,bb=parseFloat(s.borderBottomWidth)||0;t=Math.max(t,q.top+bt);b=Math.min(b,q.bottom-bb);l=Math.max(l,q.left);rr=Math.min(rr,q.right);}}return {top:t,bottom:b,left:l,right:rr,width:rr-l,height:b-t};};
 const vis=e=>{const r0=e.getBoundingClientRect();const r=clipR(e,r0);if(r.width<4||r.height<4||r.bottom<=0||r.top>=H||r.right<=0||r.left>=W)return null;const cs=getComputedStyle(e);if(cs.visibility==='hidden'||+cs.opacity<.05)return null;
  const pts=[[r.left+r.width/2,r.top+r.height/2],[r.left+4,r.top+4],[r.right-4,r.bottom-4]];for(const [x,y] of pts){const cx=Math.min(W-1,Math.max(0,x)),cy=Math.min(H-1,Math.max(0,y));const t=document.elementFromPoint(cx,cy);if(t&&(t===e||e.contains(t)))return r;}return null;};
 const sel=e=>{const one=x=>x.tagName.toLowerCase()+(x.id?'#'+x.id:'')+((x.className&&typeof x.className==='string')?'.'+x.className.trim().split(/\\s+/).slice(0,2).join('.'):'');const pa=e.parentElement;return '<'+(pa?one(pa)+' > ':'')+one(e)+'>';};
 const lab=e=>((e.innerText||e.getAttribute('aria-label')||e.getAttribute('title')||(e.className+'')||e.tagName)+'').trim().replace(/\\s+/g,' ').slice(0,24);
 const ov=[],of=[],rd=[],sh=[],sl=[],st=[],im=[];
 const btns=[...document.querySelectorAll('button,[role=tab],a[href]')];
 for(const b of btns){const r=vis(b);if(!r)continue;const cs=getComputedStyle(b);
  if(r.top<top-.5||r.bottom>bot+.5)ov.push(lab(b)+' ['+Math.round(r.top)+'–'+Math.round(r.bottom)+'] '+sel(b));
  const rad=Math.max(...['borderTopLeftRadius','borderTopRightRadius','borderBottomLeftRadius','borderBottomRightRadius'].map(k=>parseFloat(cs[k])||0));const circ=Math.abs(r.width-r.height)<=4&&rad>=r.width*.45;/* nút biểu tượng tròn hẳn: miễn */if(rad>4&&cs.clipPath==='none'&&!circ&&r.height>=14)rd.push(lab(b)+' (bo '+Math.round(rad)+'px) '+sel(b));
  const over=x=>x.clientWidth>0&&x.scrollWidth>x.clientWidth+1;
  const txt=x=>(x.innerText||'').trim().length>0;
  const own=x=>[...x.childNodes].some(n=>n.nodeType===3&&n.textContent.trim());
  const txtClip=c=>{const R=c.getBoundingClientRect();if(own(c)&&c.scrollWidth>c.clientWidth+1)return true;for(const d of c.querySelectorAll('*')){if(!own(d))continue;const r=d.getBoundingClientRect();if(r.width<1||r.height<1)continue;if(r.right>R.right+1||r.left<R.left-1)return true;}return false;};const clipT=(x,s)=>(s.overflow!=='visible'||s.textOverflow==='ellipsis'||s.whiteSpace==='nowrap');
  if((txt(b)&&clipT(b,cs)&&over(b)&&!b.querySelector('img,canvas,.fi22'))||[...b.querySelectorAll('*')].some(c=>{if(c.matches('.e17,.u7i,.ic15e,.ic15'))return false;/* ô biểu tượng giữ ký tự gốc trong DOM, cố ý giấu chữ */const s=getComputedStyle(c);return s.display!=='inline'&&(s.overflow==='hidden'||s.textOverflow==='ellipsis')&&over(c)&&txtClip(c)}))of.push(lab(b)+' '+sel(b));}
 for(const h of document.querySelectorAll('h1,h2,h3,h4,.hd22 b,.m63-eye,.sr-title,.rs-t,.cd9h b,[class*=pill],.cp22,.kh42 .n42,.nm9 b')){const r=vis(h);if(!r)continue;const s=getComputedStyle(h);if(s.display!=='inline'&&h.clientWidth>0&&h.scrollWidth>h.clientWidth+1&&h.textContent.trim())of.push('Tiêu đề: '+lab(h)+' '+sel(h));}
 for(const e of document.querySelectorAll('.m63-card,#rs,.pz12,.m22>div,#m40 .mm,#nav74p .n74pc,#k307 .k307-in,#nc307,.e74p .e74c,#cd9 .cd9c,#hub9')){const r=vis(e);if(!r||r.width*r.height<30000)continue;const cs=getComputedStyle(e);const bi=cs.backgroundImage+cs.backgroundColor;
  if(/rgb\\((2[2-5]\\d), (2[2-5]\\d), (2[2-5]\\d)\\)/.test(bi.slice(0,160))&&!/(#040d21|rgb\\(4, 13, 33\\))/i.test(bi))sh.push((e.id||(e.className+'').split(' ')[0])+'');}
 for(const e of document.querySelectorAll('input[type=range]')){const r=vis(e);if(!r)continue;const cs=getComputedStyle(e);if((cs.appearance||cs.webkitAppearance)!=='none')sl.push(lab(e.parentElement||e));}
 for(const e of document.querySelectorAll('.hb-slot *,.c309 *,.gear25-art *,.k307-ic *,.hgc *,.nc307 .card *,.f17slot *')){if(!/★/.test(e.textContent)||e.children.length)continue;const r=vis(e);if(!r)continue;st.push((e.textContent.trim()).slice(0,8));}
 for(const e of document.querySelectorAll('img')){const r=e.getBoundingClientRect();if(r.width<2||r.bottom<0||r.top>H)continue;if(e.complete&&e.getAttribute('src')&&e.naturalWidth===0)im.push((e.getAttribute('src')||'').slice(0,40));}
 const u=a=>[...new Set(a)];return {ov:u(ov),of:u(of),rd:u(rd),sh:u(sh),sl:u(sl),st:u(st).length,im:u(im)};}"""
GUIDE="""(a)=>{const [ST,SB]=a;for(const [y,t] of [[ST,'safe-top '+ST+'px'],[innerHeight-SB,'safe-bottom '+SB+'px']]){const d=document.createElement('div');d.className='au22';d.style.cssText='position:fixed;left:0;right:0;top:'+y+'px;height:0;border-top:1px dashed rgba(255,60,60,.95);z-index:2147483647;pointer-events:none';const s=document.createElement('span');s.textContent=t;s.style.cssText='position:absolute;right:2px;top:'+(y>100?-12:1)+'px;font:700 8px/1 sans-serif;color:#ff5a5a;background:rgba(0,0,0,.55);padding:1px 3px';d.appendChild(s);document.body.appendChild(d);}}"""
def run_steps(pg,steps,miss):
  for s in steps:
    k=s[0]
    if k=='js':pg.evaluate("()=>{"+s[1]+"}")
    elif k=='w':pg.wait_for_timeout(s[1])
    elif k=='st':start(pg,s[1])
    elif k=='click':
      ok=pg.evaluate("(q)=>{const e=document.querySelector(q);if(!e)return false;e.click();return true}",s[1])
      if not ok:miss.append(s[1])
    elif k=='until':
      t0=time.time()
      while time.time()-t0<s[2]/1000:
        if pg.evaluate("()=>{try{return !!("+s[1]+")}catch(e){return false}}"):break
        pg.wait_for_timeout(150)
res={}
with sync_playwright() as p:
  br=p.chromium.launch(args=['--autoplay-policy=no-user-gesture-required'])
  # setup() của t193 dùng viewport 393×852 → đặt lại 390×844 DPR2 bằng ngữ cảnh mới, chép localStorage đã dựng
  pg0,errs0,o=setup(br,'SS');ls=pg0.evaluate("()=>JSON.stringify(Object.assign({},localStorage))");ss=pg0.evaluate("()=>JSON.stringify(Object.assign({},sessionStorage))");pg0.context.close() if pg0.context!=None else None
  ctx=br.new_context(viewport={'width':390,'height':844},device_scale_factor=2)
  ctx.add_init_script("(()=>{if(sessionStorage.getItem('au22'))return;sessionStorage.setItem('au22','1');const L=%s,S=%s;for(const k in L)localStorage.setItem(k,L[k]);for(const k in S)sessionStorage.setItem(k,S[k]);})()"%(ls,ss))
  pg=ctx.new_page();pg.set_default_timeout(180000);errs=[];pg.on('pageerror',lambda e:errs.append('pageerror: '+str(e)[:160]));pg.on('console',lambda m:errs.append('console: '+m.text[:160]) if m.type=='error' else None)
  pg.goto('file://'+HTML+'?nopop');pg.wait_for_function("()=>typeof Gear44==='object'",timeout=180000);pg.wait_for_timeout(2500)
  pg.goto('file://'+HTML+'?nopop');pg.wait_for_function("()=>typeof Gear44==='object'",timeout=180000);pg.wait_for_timeout(4000)
  for sid,lab,sheet,steps in SC:
    if ONLY and sid not in ONLY:continue
    fr=FRAME.get(sid,'none')
    pg.evaluate("(f)=>{try{const k='saobang-hoso22-v1';const S=JSON.parse(localStorage.getItem(k)||'{}');S.fr=f;S.unl=Object.assign({},S.unl,{phoenix:1,ice:1,thunder:1,void:1,holy:1,jade:1});localStorage.setItem(k,JSON.stringify(S));}catch(e){}}",fr)
    pg.reload();pg.wait_for_function("()=>typeof Gear44==='object'",timeout=180000);pg.wait_for_timeout(3500)
    pg.evaluate(PREP);e0=len(errs);miss=[]
    try:run_steps(pg,steps,miss)
    except Exception as ex:miss.append('lỗi bước: '+str(ex)[:120])
    pg.evaluate("()=>{const q=document.getElementById('q307');if(q)q.style.display='none';document.getElementById('tutorial392')?.remove()}")
    r=pg.evaluate(CHECK,[SAFE_T,SAFE_B]);r['js']=errs[e0:];r['miss']=miss;r['lab']=lab;r['sheet']=sheet
    if os.environ.get('DBG'):print(pg.evaluate('()=>{'+os.environ['DBG']+'}'))
    pg.evaluate(GUIDE,[SAFE_T,SAFE_B]);pg.screenshot(path=f'{OUT}/png/{sid}.png');pg.evaluate("()=>document.querySelectorAll('.au22').forEach(e=>e.remove())")
    res[sid]=r;print(sid,lab,json.dumps({k:(v if not isinstance(v,list) else len(v)) for k,v in r.items() if k not in('lab','sheet')},ensure_ascii=False),flush=True)
  br.close()
old={}
if ONLY and os.path.exists(OUT+'/kiem.json'):old=json.load(open(OUT+'/kiem.json'))
old.update(res);json.dump(old,open(OUT+'/kiem.json','w'),ensure_ascii=False,indent=1)
print('XONG',len(res))
