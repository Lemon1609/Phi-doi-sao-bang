# V2.1 · xuất ẢNH GỐC (tệp nguồn trong repo, kích thước thật, PNG nền trong suốt) cho GPT vẽ tiến hóa 4 bậc → V21_anh_goc_tien_hoa.zip
# Nguồn chọn ĐÚNG chuỗi ưu tiên mà build74_mau.py / tb309.js đang dùng (ảnh game đang hiện), không lấy ảnh đã nén nhúng trong HTML.
# python3 claude_tools/v21_export.py <repo nguon-v212 (clone blob:none)> <names.json> <zip ra>
import sys,os,io,json,re,subprocess,unicodedata,zipfile
from PIL import Image
REPO,NAMES,OUTZ=sys.argv[1],sys.argv[2],sys.argv[3]
N=json.load(open(NAMES))
tree=set(subprocess.run(['git','-C',REPO,'ls-tree','-r','--name-only','HEAD'],capture_output=True,text=True).stdout.split('\n'))
ex=lambda p:p in tree
def slug(s):
  s=s.replace('đ','d').replace('Đ','D');s=unicodedata.normalize('NFKD',s);s=''.join(c for c in s if not unicodedata.combining(c))
  return re.sub(r'[^A-Za-z0-9]+','_',s).strip('_').lower()
def first(*ps):
  for p in ps:
    if p and ex(p):return p
  return None
# bảng tb309.js (sprite trong trận hiện hành)
CSPR={'inferno':'c_m_inferno','nova36':'c_m_inferno','cryo':'c_m_cryo','thunder':'c_m_thunder','singularity':'c_m_singularity','devour10_m':'c_m_singularity','spiral':'c_m_spiral','swarm9':'c_m_spiral','stellar':'c_m_stellar','comet36':'c_m_sword_gold','judgement36':'c_m_sword_gold','monarch12_m':'c_m_sword_gold','chrono11_m':'c_m_chrono','disc':'c_s_disc','gravity':'c_s_orb_gravity','prism':'c_s_ricochet','ricochet':'c_s_prism','lance36':'c_s_lance36','halo36':'c_s_halo36','orbit36':'c_s_halo36','chrono11_s':'c_s_halo36','monarch12_s':'c_s_sigil_monarch','carrier9':'c_s_mini_drone'}
SPR={'inferno':'m_standard','nova36':'m_standard','cryo':'m_crystal','thunder':'m_lightning','devour10_m':'m_lightning','singularity':'m_torpedo','spiral':'m_slim','swarm9':'m_slim','stellar':'m_comet','comet36':'m_sword','judgement36':'m_sword','monarch12_m':'m_sword','chrono11_m':'m_chrono','disc':'s_crescent','gravity':'s_orb','solar':'s_orb','ricochet':'s_prism','prism':'s_shard','lance36':'s_lance','halo36':'s_halo','orbit36':'s_halo','chrono11_s':'s_halo','monarch12_s':'s_sigil','carrier9':'s_mini_drone'}
SHF={'aegis':'shield_hex','aegis9':'shield_hex','mirror':'shield_mirror','aurora36':'shield_mirror','seraph36':'shield_mirror','orbital':'shield_orbital','chrono11_a':'shield_orbital','monarch12_a':'shield_orbital','nanite':'shield_wave','phase':'shield_wave','void36':'shield_wave','devour10_a':'shield_wave','reactive':'shield_wave'}
AL={'aurora36':'forge_armor','void36':'void_armor','seraph36':'dawn_armor','aegis9':'fleet_armor'}
def share(tbl,v):k=tbl.get(v);return sorted(x for x,y in tbl.items() if y==k and x!=v) if k else []
jobs=[];man=[]   # jobs: (đường dẫn trong zip, tệp nguồn)
def add(item,zpath,srcp,key,note=None):
  e={'file_goc':zpath,'nguon_repo':srcp,'khoa_trong_code':key}
  if note:e['ghi_chu']=note
  if srcp:jobs.append((zpath,srcp))
  item.setdefault('anh',[]).append(e)
# 1. chiến cơ
for i,nm in enumerate(N['ships']):
  ma='tau%02d'%(i+1);it={'id':ma,'ten_game':nm,'nhom':'chien_co','cac_bac_can_thay':['trang','luc','lam'],'giu_goc':'tim','bac_hien_co_trong_repo':sorted(f.split('_',1)[1][:-4] for f in tree if f.startswith('src/ship309/tau%d_'%(i+1)) and f.endswith('.png'))}
  add(it,'01_chien_co/%02d_%s_%s.png'%(i+1,ma,slug(nm)),first('src/ship309/tau%d_tim.png'%(i+1)),"SHIP118['%d'].tim"%i);man.append(it)
# 2. Chiến Thần
for i,r in enumerate(N['robots']):
  ma='hop%d'%(i+1);it={'id':ma,'ten_game':r['name'],'nhom':'chien_than','cha_me_chien_co':[N['ships'][p] for p in r['parents']],'cac_bac_can_thay':['goc','moc3','moc10']}
  add(it,'02_chien_than/ct%02d_%s.png'%(i+1,ma),first('src/hop4309/hop%d_tau.png'%(i+1)),'SSS_ATLAS hàng 1 ô %d (512 px)'%i)
  add(it,'02_chien_than/tham_khao/ct%02d_%s_chandung.png'%(i+1,ma),first('src/hop4309/hop%d_chandung.png'%(i+1)),'SSS_ATLAS hàng 2 ô %d (chân dung sảnh)'%i)
  add(it,'02_chien_than/tham_khao/ct%02d_%s_bay.png'%(i+1,ma),first('src/hop4309/hop%d_bay.png'%(i+1)),'SSS_ATLAS_BAY hàng 2 ô %d (bay trong trận)'%i)
  add(it,'02_chien_than/tham_khao/ct%02d_%s_moc3_hien_tai.png'%(i+1,ma),first('src/hop4309/f%d_b2.png'%i),'HOP309_IMG.f%d_b2 (chiến cơ mốc +3..+9)'%i)
  add(it,'02_chien_than/tham_khao/ct%02d_%s_moc10_hien_tai.png'%(i+1,ma),first('src/hop4309/f%d_b3.png'%i),'HOP309_IMG.f%d_b3 (chiến cơ mốc +10)'%i)
  man.append(it)
# 3–5. trang bị
DIR={'missiles':'03_ten_lua','sidearm':'04_tau_con','armor':'05_giap'}
for c in N['cat']:
  v,k=c['id'],c['kind'];d=DIR[k];it={'id':v,'ten_game':c['name'],'nhom':{'missiles':'ten_lua','sidearm':'tau_con','armor':'giap'}[k],'cac_bac_can_thay':['trang','luc','lam','tim']}
  ic=first('src/icon309/%s.png'%v,'src/tb133/%s_icon1.png'%v)
  add(it,'%s/%s_icon.png'%(d,v),ic,'GEAR44_ASSETS.%s_icon'%v,'icon309 (Lượt 4, 1 hình mọi bậc)' if ic and 'icon309' in ic else None)
  if k=='missiles':
    p=CSPR.get(v);add(it,'%s/%s_pod.png'%(d,v),first('src/tb309img/%s.webp'%p) if p else None,'TB309_IMG.%s'%p if p else '—','hình tên lửa đang bay trong trận (tb309.put)'+('; dùng chung với: '+', '.join(share(CSPR,v)) if share(CSPR,v) else ''))
    add(it,'%s/%s_proj.png'%(d,v),first('src/tb133/%s_projectile_normal.png'%v),'GEAR44_ASSETS.%s_projectile_normal'%v,'tranh đạn Phần J (tb133) — hiện tb309 vẽ chính quả tên lửa, ảnh này chưa hiện trong trận')
    it['dung_chung_hinh_bay']=share(CSPR,v)
  elif k=='sidearm':
    add(it,'%s/%s_pod.png'%(d,v),first('src/tb309img/pod_%s.webp'%v,'src/tb133/%s_tran1.png'%v),'TB309_IMG.pod_%s'%v,'tàu con bay trong trận (tb309.pod)')
    p=CSPR.get(v);q=SPR.get(v)
    if not p and not q:
      add(it,'%s/%s_proj.png'%(d,v),None,{'rail':'gear_fx_v3 tia Pháo Điện Từ (FX309.beam theo bậc)','devour10_s':'TB309.fx81 tia Thôn Phệ (FX309 e3)'}.get(v,'—'),'tàu con này BẮN TIA LASER vẽ bằng mã, không có sprite đạn — GPT vẽ mới nếu muốn đạn dạng hình');it['dan_la_tia_laser']=True
    else:
      add(it,'%s/%s_proj.png'%(d,v),first('src/tb309img/%s.webp'%p if p else None,'src/tb309img/%s.webp'%q if q else None),'TB309_IMG.%s'%(p or q),'đạn tàu con trong trận'+('; dùng chung với: '+', '.join(share(CSPR,v) if p else share(SPR,v)) if (share(CSPR,v) if p else share(SPR,v)) else '')+('' if p else ' (sprite xám nhuộm màu lúc chạy)'))
    if ex('src/tb133/%s_tran1.png'%v):add(it,'%s/tham_khao/%s_pod_tb133.png'%(d,v),'src/tb133/%s_tran1.png'%v,'(cũ) GEAR44_ASSETS.%s_pod_normal'%v)
  else:
    own=first('src/evo/gear/%s_shell_idle_evo2.png'%v,'src/art86/gear85/%s/%s_armor_shell_idle_evo2.png'%(v,v),'src/art86/gear85/%s/%s_armor_shell_idle_evo2.png'%(AL.get(v,v),AL.get(v,v)),'src/gear81art/%s/%s_shell_idle_evo2.png'%(v,v))
    it['thieu_vo_giap']=own is None
    if own:add(it,'%s/%s_shield.png'%(d,v),own,'vỏ giáp riêng (nguồn: %s)'%own.split('/')[1],'vỏ giáp riêng của món (CHƯA vẽ trong trận) — trong trận hiện là vòng khiên dùng chung %s vẽ bằng tb309'%SHF.get(v))
    add(it,'%s/tham_khao/%s_khien_dung_chung_%s.png'%(d,v,SHF.get(v)),first('src/tb309img/%s.webp'%SHF.get(v)),'TB309_IMG.%s'%SHF.get(v),'vòng khiên trong trận hiện hành, dùng chung với: '+', '.join(share(SHF,v)))
  man.append(it)
# 6. SSS
for i,dd in enumerate(N['sss']):
  v=dd['id'];it={'id':v,'ten_game':dd['name'],'nhom':'trang_bi_sss','loai':dd['kind'],'cha_me':dd.get('parents'),'cac_bac_can_thay':['trang','luc','lam','tim']}
  add(it,'06_trang_bi_sss/sss%02d_%s.png'%(i+1,v),first('src/sss309/%s.png'%v,'src/sss_art/%s/icon1.png'%v),'GEAR44_ASSETS.%s_icon1'%v);man.append(it)
# tải blob cần dùng
need=sorted({s for _,s in jobs})
for k in range(0,len(need),40):subprocess.run(['git','-C',REPO,'checkout','HEAD','--']+need[k:k+40],check=True,capture_output=True)
z=zipfile.ZipFile(OUTZ,'w',zipfile.ZIP_DEFLATED);sz={}
for zp,sp in jobs:
  im=Image.open(os.path.join(REPO,sp)).convert('RGBA');b=io.BytesIO();im.save(b,'PNG',optimize=True);z.writestr(zp,b.getvalue());sz[zp]=list(im.size)
for it in man:
  for e in it.get('anh',[]):e['kich_thuoc_px']=sz.get(e['file_goc'])
  if not it.get('anh') or not any(e.get('nguon_repo') for e in it['anh']):it['thieu_anh']=True
miss=[(it['id'],e['file_goc'],e.get('ghi_chu','')) for it in man for e in it.get('anh',[]) if not e.get('nguon_repo')]
meta={'phien_ban':'V309 V2.0 (nhánh nguon-v212 @ '+subprocess.run(['git','-C',REPO,'rev-parse','--short','HEAD'],capture_output=True,text=True).stdout.strip()+') + 3 tranh Thần hóa TH17',
 'quy_uoc':'PNG nền trong suốt, kích thước gốc của tệp nguồn trong repo (không phải ảnh nén nhúng trong HTML). file_goc = đường dẫn trong zip; nguon_repo = tệp gốc; khoa_trong_code = khóa game đang đọc.',
 'giap_thieu_vo_giap':[it['id'] for it in man if it.get('thieu_vo_giap')],'muc_thieu_anh':miss,'muc':man}
z.writestr('manifest.json',json.dumps(meta,ensure_ascii=False,indent=1));z.close()
print('ảnh:',len(jobs),'· thiếu nguồn:',miss,'· giáp thiếu vỏ:',meta['giap_thieu_vo_giap'])
