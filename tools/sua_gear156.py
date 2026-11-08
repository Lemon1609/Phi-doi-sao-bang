# V156 · Phần E: thay luật hợp thể SSS trong src/gear45.js (chạy 1 lần)
p='src/gear45.js';s=open(p,encoding='utf8').read()
assert 'V156' not in s
def R(a,b):
  global s
  assert s.count(a)==1,a[:70];s=s.replace(a,b)
a=s.index(" // ================= dữ liệu người chơi =================");b=s.index(" // ================= trận đấu =================")
s=s[:a]+open('tools/gear156_data.js',encoding='utf8').read()+s[b:]
R("function build(){const key=KINDS.map(k=>activeId(k)+':'+(equippedItem(k)?.id||'')).join('|');if(key===loadKey)return;loadKey=key;for(const k of KINDS){const id=activeId(k);if(!id||!BY[id]){delete R[k];continue;}",
  "function build(){payBack();const key=KINDS.map(k=>activeId(k)+':'+(equippedItem(k)?.id||'')).join('|');if(key===loadKey)return;loadKey=key;for(const k of KINDS){let id=activeId(k);if(id&&!BY[id]){const it=equippedItem(k);id=it&&BY[it.variant]?it.variant:null;}/* V156: SSS chưa có GEAR_FX riêng → chạy hiệu ứng món mẹ đang lắp (×1,35 nằm ở auxDamage) */if(!id||!BY[id]){delete R[k];continue;}")
R("/i.interval*dmgMult(k);}","/i.interval*dmgMult(k)/sssM(k);}/* V156: phần ×SSS đã nằm sẵn trong auxDamage */")
R("const ops=Progress.stats;Progress.stats=function(){const o=ops.apply(this,arguments);try{",
  "const ops=Progress.stats;Progress.stats=function(){const o=ops.apply(this,arguments);try{for(const e of (o&&o.equipment)||[]){if(e.kind==='armor')continue;const m=sssM(e.kind);if(m>1&&e.auxDamage){e.auxDamage*=m;e.sss156=m;}}}catch{}try{")
a=s.index(" // ================= XƯỞNG TRANG BỊ SSS (giao diện) =================");b=s.index(" function hangarSync(){")
s=s[:a]+open('tools/gear156_ui.js',encoding='utf8').read()+s[b:]
R("return {open,close,fuse,equipSSS,activeId,activeDef,dmgMult,slotPic,canFuse,owns,sssEnh,",
  "return {upgrade,lvOf,toCore,fromCore,wkLeft,sssFor,defs:()=>SSS2,sssM,plusOf,open,close,fuse,equipSSS,activeId,activeDef,dmgMult,slotPic,canFuse,owns,sssEnh,")
open(p,'w',encoding='utf8').write(s);print('ok')
