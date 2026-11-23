# L16 · áp các chỗ sửa của v77 / kho307 / l7309 trực tiếp vào HTML đã dựng (build có rep trên các khối này)
import sys
R=[("const ITEMS=SH.SHELF_6_ITEMS.map(it=>it.id==='REROLL_STONE_1'?{...it,name:'Đá khảm Lục ngẫu nhiên (×1)'}:it);",
  "const ITEMS=SH.SHELF_6_ITEMS.map(it=>it.id==='REROLL_STONE_1'?{...it,name:'Đá khảm Lục ngẫu nhiên (×1)'}:it).concat(window.NT16===false?[]:[{slot:7,id:'NT16_CRYSTAL_5',name:'5 Tinh Thể Nội Tại',costTokens:20,type:'MATERIAL',weeklyLimit:3}]);/* V309 L16 (giá Claude đặt, chờ Gemini) */"),
 ("let ok=true;try{if(id==='REROLL_STONE_1'){","let ok=true;try{if(id==='NT16_CRYSTAL_5'){if(typeof NT16==='undefined'){ok=false;}else NT16.add(5);}\n   else if(id==='REROLL_STONE_1'){"),
 ("  try{R.push(['Lõi Siêu Hợp',","  try{if(window.NT16!==false&&typeof NT16!=='undefined')R.push(['Tinh Thể Nội Tại',NT16.have(),'Nâng cấp Đá Nội Tại (Kho › Đá khảm › Đá Nội Tại)','#7fe7ff','◆',NT16.icon()]);}catch{}/* V309 L16 */\n  try{R.push(['Lõi Siêu Hợp',"),
 ("try{o.team=Pilot67.state().team.slice();}catch{}o.at=Date.now();return o;}","try{o.team=Pilot67.state().team.slice();}catch{}try{if(typeof NT16!=='undefined')o.nt16=NT16.loadout();}catch{}/* V309 L16: 3 Đá Nội Tại */o.at=Date.now();return o;}"),
 ("   try{gear=Progress.stats();}catch{}try{Combat.render();}catch{}try{Progress.render();}catch{}return true;}","   try{if(o.nt16&&typeof NT16!=='undefined'&&window.NT16!==false)NT16.setLoadout(o.nt16);}catch{}/* V309 L16 */\n   try{gear=Progress.stats();}catch{}try{Combat.render();}catch{}try{Progress.render();}catch{}return true;}")]
h=open(sys.argv[1],encoding='utf-8').read()
for a,b in R:
    c=h.count(a);assert c==1,(a[:60],c);h=h.replace(a,b)
open(sys.argv[2],'w',encoding='utf-8').write(h);print('ok rep16')
