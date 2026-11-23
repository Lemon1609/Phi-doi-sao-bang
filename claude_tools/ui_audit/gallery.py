# V309 · BỘ ẢNH TỔNG: mọi chiến cơ (thường + Bạo Tẩu theo khung), 3 dạng Thần hóa, 7 Chiến Thần (atlas), Giáp / Tên lửa / Tàu con
# (thẻ trong game theo bậc Trắng/Lục/Lam/Tím + sprite gốc + hình trong trận), 21 trang bị SSS, Vũ khí Tối thượng.
# Mỗi tấm: nền tối, ô có nhãn "tên trong game · khóa ảnh · kích thước thật px". Ảnh lấy đúng dữ liệu game đang chạy.
# python3 claude_tools/ui_audit/gallery.py <bản.html> <thư mục ra>
import sys,os,json
os.chdir(os.path.dirname(os.path.abspath(__file__))+'/../..')
src=open('claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
HTML,OUT=sys.argv[1],sys.argv[2];sys.argv=['x',HTML,'160'];exec(src)
os.makedirs(OUT,exist_ok=True)
JS=r"""async(which)=>{
 const W=t=>new Promise(r=>setTimeout(r,t));
 const sz=src=>new Promise(r=>{if(!src){r(null);return;}const i=new Image();i.onload=()=>r([i.naturalWidth,i.naturalHeight,i]);i.onerror=()=>r(null);i.src=src;});
 const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const TN=['Trắng','Lục','Lam','Tím'];const FN=['thuong','luc','lam','tim','tim5','ss'];
 const firstN=f=>{for(let n=0;n<12;n++)if((TIER70.frame[n]|0)===f)return n;return 0;};
 const sheet=[];let title='';
 const cell=async(name,key,src,opt={})=>{const s=await sz(src);return `<div class="c"><div class="im" style="${opt.big?'height:200px':''}">${s?`<img src="${src}">`:'<i>(không có)</i>'}</div><b>${esc(name)}</b><small>${esc(key)}</small><em>${s?s[0]+'×'+s[1]+' px':'—'}</em></div>`;};
 const html=(name,key,h,dim)=>`<div class="c"><div class="im">${h}</div><b>${esc(name)}</b><small>${esc(key)}</small><em>${esc(dim||'thẻ trong game')}</em></div>`;
 const row=(lab,cells)=>`<div class="r"><div class="rl">${esc(lab)}</div>${cells.join('')}</div>`;
 const pname=i=>{try{return Fighters28.profiles[i].name;}catch{return '#'+i;}};
 if(which==='ship'||which==='ship_bt'){const bt=which==='ship_bt';title=bt?'CHIẾN CƠ · BẠO TẨU (SHIP118[i][khung_bt])':'CHIẾN CƠ · THƯỜNG theo khung (SHIP118[i][khung])';
  for(let i=0;i<13;i++){const S=SHIP118[String(i)]||{};const cs=[];for(const f of FN)cs.push(await cell(pname(i)+' · '+f,'SHIP118['+i+'].'+f+(bt?'_bt':''),S[f+(bt?'_bt':'')]));sheet.push(row('#'+(i+1)+' '+pname(i),cs));}}
 if(which==='than'){title='3 CHIẾN CƠ THẦN HÓA (ART86_ASSETS · tranh mới TH17)';const L=[['sss11_huyettinh','Huyết Tinh Thôn Phệ Giả (#11 Thôn Tinh)'],['sss12_vinhhang','Vĩnh Hằng Thời Không (#12 Thời Không)'],['sss13_chanthan','Chân Thần Hư Không (#13 Hư Không)']];
  for(const [k,n] of L)sheet.push(row(n,[await cell(n+' · thường','ART86_ASSETS.'+k,ART86_ASSETS[k],{big:1}),await cell(n+' · Bạo Tẩu','ART86_ASSETS.'+k+'_super',ART86_ASSETS[k+'_super'],{big:1})]));}
 if(which==='robot'){title='7 CHIẾN THẦN (robot hợp thể) — atlas SSS_ATLAS / SSS_ATLAS_BAY + hình chiến cơ theo mốc HOP309_IMG';
  for(const [nm,A] of [['SSS_ATLAS',typeof SSS_ATLAS!=='undefined'?SSS_ATLAS:null],['SSS_ATLAS_BAY',typeof SSS_ATLAS_BAY!=='undefined'?SSS_ATLAS_BAY:null]]){const s=await sz(A);if(!s)continue;const [w,h,im]=s;const cw=w/7,rows=Math.max(1,Math.round(h/cw)),ch=h/rows;
   for(let r=0;r<rows;r++){const cs=[];for(let k=0;k<7;k++){const c=document.createElement('canvas');c.width=Math.round(cw);c.height=Math.round(ch);c.getContext('2d').drawImage(im,k*cw,r*ch,cw,ch,0,0,c.width,c.height);let n='Chiến Thần '+(k+1);try{n=SSSGame.name(k)||n;}catch{}cs.push(await cell(n,nm+' ô ['+r+','+k+']',c.toDataURL()));}sheet.push(row(nm+' hàng '+(r+1)+' ('+w+'×'+h+')',cs));}}
  const cs=[];for(let k=0;k<7;k++){let n='Chiến Thần '+(k+1);try{n=SSSGame.name(k)||n;}catch{}cs.push(await cell(n+' mốc +3','HOP309_IMG.f'+k+'_b2',HOP309_IMG['f'+k+'_b2']));}sheet.push(row('Chiến cơ mốc +3..+9',cs));
  const cs2=[];for(let k=0;k<7;k++){let n='Chiến Thần '+(k+1);try{n=SSSGame.name(k)||n;}catch{}cs2.push(await cell(n+' mốc +10','HOP309_IMG.f'+k+'_b3',HOP309_IMG['f'+k+'_b3']));}sheet.push(row('Chiến cơ mốc +10',cs2));}
 if(['armor','missiles','sidearm'].includes(which)){title={armor:'GIÁP',missiles:'TÊN LỬA',sidearm:'TÀU CON'}[which]+' — thẻ trong game theo bậc · sprite gốc · hình trong trận';
  const G=GEAR44_ASSETS,E=typeof EVO53_ART!=='undefined'?EVO53_ART:{};
  for(const [v,c] of Object.entries(GearCatalog)){if(c.kind!==which)continue;const cs=[];
   for(let f=0;f<4;f++){const n=firstN(f);const it={id:'gal_'+v+'_'+f,kind:c.kind,variant:v,level:1,enhance:V70.Eof(n),rarity:'normal',rank:'',grade:''};let h='';try{h=String(Progress.art(it));}catch{}cs.push(html(c.name+' · '+TN[f],v+' · khung '+n,h));}
   const al=(typeof GEAR81_DATA!=='undefined'&&GEAR81_DATA[v])?GEAR81_DATA[v].art:v;
   cs.push(await cell('icon gốc',(G[v+'_icon']?v:al)+'_icon',G[v+'_icon']||G[al+'_icon']));
   const bk=which==='armor'?'_shell_idle':'_pod_normal';cs.push(await cell(which==='armor'?'vỏ giáp (trận)':'bệ/pod (trận)',(G[v+bk]?v:al)+bk,G[v+bk]||G[al+bk]));
   cs.push(await cell('đạn (trận)',(G[v+'_projectile_normal']?v:al)+'_projectile_normal',G[v+'_projectile_normal']||G[al+'_projectile_normal']));
   const ck=window.TB309&&TB309.SPR[v];cs.push(await cell('sprite TB309',ck||'—',ck&&window.TB309_IMG?TB309_IMG[ck]:null));
   sheet.push(row(c.name+' ('+v+')',cs));}}
 if(which==='sss'){title='21 TRANG BỊ SSS (Gear44) — icon theo bậc';const G=GEAR44_ASSETS;
  for(const d of Gear44.defs()){const ks=Object.keys(G).filter(k=>k.startsWith(d.id+'_icon')).sort();const cs=[];for(const k of ks.slice(0,4))cs.push(await cell(d.name,k,G[k]));if(G['atlas_'+d.kind]&&!ks.length)cs.push(await cell(d.name+' (atlas)','atlas_'+d.kind,G['atlas_'+d.kind]));sheet.push(row(d.name+' · '+d.kind,cs.length?cs:[html(d.name,d.id,'<i>(không có icon riêng)</i>','—')]));}}
 if(which==='ult'){title='VŨ KHÍ TỐI THƯỢNG (ULT72_ART)';const A=typeof ULT72_ART!=='undefined'?ULT72_ART:{};const ks=Object.keys(A);for(let i=0;i<ks.length;i+=6){const cs=[];for(const k of ks.slice(i,i+6))cs.push(await cell(k,'ULT72_ART.'+k,A[k]));sheet.push(row('',cs));}}
 const css=`#gal{position:absolute;left:0;top:0;z-index:2147483647;width:1560px;padding:18px;background:radial-gradient(circle at 50% 0,#14335f,#050d1f 70%);color:#dbeeff;font:12px/1.25 sans-serif}
 #gal h1{margin:0 0 12px;font:900 22px sans-serif;color:#ffd56a;letter-spacing:1px}#gal .r{display:flex;gap:8px;align-items:stretch;margin-bottom:8px;padding:6px;border:1px solid #23558f;background:#06152b99}
 #gal .rl{width:150px;flex:none;font-weight:800;color:#9fe9ff;display:flex;align-items:center}#gal .c{width:150px;flex:none;display:flex;flex-direction:column;align-items:center;gap:2px;padding:4px;background:#0a2347;border:1px solid #1d4677}
 #gal .im{width:140px;height:140px;display:grid;place-items:center;background:repeating-conic-gradient(#0a1a33 0 25%,#0e2142 0 50%) 0 0/16px 16px;overflow:hidden;position:relative}#gal .im img{max-width:100%;max-height:100%;object-fit:contain}
 #gal .im>*:not(img){transform:scale(1);max-width:100%;max-height:100%}#gal b{font-size:11px;text-align:center;color:#fff}#gal small{font-size:9.5px;color:#9fc2e4;text-align:center;word-break:break-all}#gal em{font-style:normal;font-size:10px;color:#46ffb2}`;
 document.querySelectorAll('#gal,#galcss').forEach(e=>e.remove());const st=document.createElement('style');st.id='galcss';st.textContent=css;document.head.appendChild(st);
 const d=document.createElement('div');d.id='gal';d.innerHTML=`<h1>${esc(title)}</h1>`+sheet.join('');document.body.appendChild(d);await W(800);return {n:sheet.length,h:d.scrollHeight};}"""
SHEETS=['ship','ship_bt','than','robot','armor','missiles','sidearm','sss','ult']
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'SS')
  pg.set_viewport_size({'width':1600,'height':1000})
  pg.add_style_tag(content='body>*:not(#gal){visibility:hidden!important}#gal{visibility:visible!important}#q307{display:none!important}')
  for k in SHEETS:
    r=pg.evaluate(JS,k);el=pg.query_selector('#gal')
    el.screenshot(path=OUT+'/%s.png'%k);print(k,r,flush=True)
  print('errs',errs[:3])
