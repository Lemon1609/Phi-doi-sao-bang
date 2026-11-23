# V309 L17 · kiểm PHẦN A (UI17): 18 ảnh GPT đã tách nền, icon Đá Nội Tại/Tinh Thể 3D, hợp kim thống nhất, emoji → icon nhưng giữ token chữ, khung 3D theo bậc, cờ UI17=false trả lại như cũ.
import sys,os,json
os.chdir(os.path.dirname(os.path.abspath(__file__))+'/..')
src=open('claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
HTML=sys.argv[1];sys.argv=['x',HTML,'160'];exec(src)
ok=[];bad=[]
def chk(n,c,info=''):
    (ok if c else bad).append(n);print(('ĐẠT ' if c else 'TRƯỢT ')+n,info,flush=True)
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'SS');pg.add_style_tag(content='#q307{display:none!important}')
  r=pg.evaluate("""async()=>{const W=t=>new Promise(r=>setTimeout(r,t));const I=window.UI17_IMG||{};const ks=Object.keys(I);
   const sizes={};await Promise.all(ks.map(k=>new Promise(res=>{const im=new Image();im.onload=()=>{sizes[k]=[im.width,im.height];res();};im.onerror=()=>res();im.src=I[k];})));
   return {n:ks.length,webp:ks.every(k=>I[k].startsWith('data:image/webp')),sizes,cls:document.documentElement.classList.contains('ui17'),
    st:['pha_giap','xung_chan','nap_nhanh','crystal'].map(k=>UI_ICONS.src(k).slice(0,15)),hk:TN307_IMG.hop_kim===ICON74.res_hop_kim}}""")
  chk('18 ảnh GPT (12 icon 128 px + 6 khung 256 px) dạng WebP',r['n']==18 and r['webp'] and all(v==[128,128] for k,v in r['sizes'].items() if not k.startswith('f_')) and all(v==[256,256] for k,v in r['sizes'].items() if k.startswith('f_')),r['sizes'])
  chk('Icon Đá Nội Tại + Tinh Thể dùng ảnh 3D (WebP) · Hợp kim dùng 1 ảnh của thanh tài nguyên',r['cls'] and all(x.startswith('data:image/webp') for x in r['st']) and r['hk'],r)
  # emoji → icon, token vẫn trong textContent
  r=pg.evaluate("""async()=>{const W=t=>new Promise(r=>setTimeout(r,t));const d=document.createElement('div');d.id='t17';d.innerHTML='<button>QUAY ×10 · 810 💎</button><span>1 🎫 · 🗼 LEO · 50 🎖 · 🥉 · ✅ · 💡 · 🎪 · 🔓</span>';document.body.appendChild(d);await W(600);
   const sp=[...d.querySelectorAll('.e17')];const t=d.textContent;const r={n:sp.length,keep:['💎','🎫','🗼','🎖','🥉','✅','💡','🎪','🔓'].every(c=>t.includes(c)),bg:sp.every(s=>/url\\(/.test(getComputedStyle(s).backgroundImage)),col:getComputedStyle(sp[0]).color};d.remove();return r}""")
  chk('9 emoji → icon nền (💎 🎫 🗼 🎖 🥉 ✅ 💡 🎪 🔓), ký tự gốc vẫn còn trong textContent',r['n']==9 and r['keep'] and r['bg'] and r['col'] in ('rgba(0, 0, 0, 0)','transparent'),r)
  # khung 3D ở Kho đồ (4 ô) + Kho bản sao + quà bộ
  r=pg.evaluate("""async()=>{const W=t=>new Promise(r=>setTimeout(r,t));mode='menu';Lobby.show();await W(400);document.querySelector('[data-ck9=kho]').click();await W(1800);
   const sl=[...document.querySelectorAll('#hb-body .hb-slot')].filter(s=>s.getClientRects().length);const f=sl.map(s=>s.dataset.f17);
   Evo82.addCopy('craft',1,0,1,true);try{Evo82.open();}catch{}await W(900);const b=[...document.querySelectorAll('button')].find(x=>/KHO BẢN SAO/.test(x.textContent)&&x.getClientRects().length);b&&b.click();await W(1500);
   const ev=[...document.querySelectorAll('.ev82c .ev82a')].slice(0,6).map(a=>[a.dataset.f17,(a.querySelector('img')||{}).src===SHIPART17(+((a.closest('.ev82c').querySelector('[data-v]')||{}).dataset||{}).v||0)]);
   return {n:sl.length,f,frames:sl.every(s=>s.querySelector(':scope > i.f17x')),ev:ev.length,evf:ev.every(x=>x[0]!=null)}}""")
  chk('Kho đồ: cả 4 ô (gồm chiến cơ) dùng khung 3D mới theo bậc',r['n']==4 and r['frames'] and all(x is not None for x in r['f']),r)
  chk('Kho bản sao: ảnh có khung 3D theo khung bậc',r['ev']>0 and r['evf'],r)
  r=pg.evaluate("""()=>{const a=Ui19.pieceArt('craft',1),g=Ui19.pieceArt('gear',GearCatalog?Object.keys(GearCatalog)[0]:'');return {craft:a.includes(SHIPART17(1,0)),gear:/u17a/.test(g)}}""")
  chk('Quà bộ (Thành tựu): ảnh chiến cơ SHIP118 chuẩn + ảnh trang bị 3D chuẩn',r['craft'] and r['gear'],r)
  # tắt cờ → trả lại
  r=pg.evaluate("""async()=>{const W=t=>new Promise(r=>setTimeout(r,t));window.UI17=false;await W(1300);const a={cls:document.documentElement.classList.contains('ui17'),st:UI_ICONS.src('pha_giap').slice(0,20),hk:TN307_IMG.hop_kim===ICON74.res_hop_kim};window.UI17=undefined;await W(1300);a.back=document.documentElement.classList.contains('ui17');return a}""")
  chk('Cờ window.UI17=false: bỏ lớp ui17, icon SVG cũ, ảnh hợp kim cũ; bật lại được',not r['cls'] and r['st'].startswith('data:image/svg') and not r['hk'] and r['back'],r)
  chk('Không lỗi JS',not errs,errs[:3])
  print('KẾT QUẢ',len(ok),'/',len(ok)+len(bad),'trượt:',bad)
