// V85 · THƯỞNG LẦN ĐẦU HẠ BOSS CUỐI CHƯƠNG 6–9 (Gemini REVIEW84 §E1 clearDrop)
//  Ải 120 / 140 / 160 / 180 đã rơi Sợi Plasma màu theo dải ải (adv70). V85 thêm: LẦN ĐẦU hạ boss có 45% / 50% / 60% / 100% nhận
//  1 bản sao Tím Lv1 của món đang dùng (chiến cơ hoặc trang bị). Chỉ lần đầu — càn quét / đánh lại không có (tránh lạm phát).
//  Người chơi đã qua các ải này từ trước: đánh dấu đã nhận, không phát bù. Khóa lưu: saobang-drop85. Tắt: window.DROP85=false
// V87 · REVIEW86 H4: trượt bản sao Tím ở ải 120/140/160 → quà bảo hiểm: bản sao Lam Lv1 thuộc bộ trang bị trong poolSets + hợp kim ◈
//  (ải 160 được 2 bản sao). Thêm biểu ngữ "★ CHIẾN LỢI PHẨM THỦ LĨNH LẦN ĐẦU ★" liệt kê quà. Không đổi khóa lưu cũ.
const DROP85={chance:{120:.45,140:.5,160:.6,180:1,200:1},tier:6,
 // V87 · REVIEW87 §4.2: ải 200 lần đầu → 100% bản sao Tím Lv1 lấy từ bộ 10–12 + 35.000 ◈ + 2 đá khảm Tím
 pool:{200:[10,11,12]},extra:{200:{cr:35000,gem:2}},
 fb:{120:{n:1,cr:15000,sets:[6,7,8]},140:{n:1,cr:20000,sets:[7,8,9]},160:{n:2,cr:25000,sets:[8,9,10,11]}},fbTier:2,banner:'★ CHIẾN LỢI PHẨM THỦ LĨNH LẦN ĐẦU ★'};
const Drop85=(()=>{
 const on=()=>window.DROP85!==false,KEY='saobang-drop85';
 let S=null;try{S=JSON.parse(localStorage.getItem(KEY)||'null');}catch{}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const cleared=()=>{try{return Progress.getState().cleared||[];}catch{return null;}};
 function pick(){const L=[];try{const eq=Progress.v70.equipped();for(const id of Object.values(eq)){const it=Progress.v70.get(id);if(it)L.push(['gear',it.variant]);}}catch{}try{L.push(['craft',selected|0]);}catch{}return L.length?L[Math.floor(Math.random()*L.length)]:['craft',0];}
 function give(st){let [k,m]=pick();try{const P=DROP85.pool[st];if(P){k='gear';const set=Campaign36.sets[P[Math.floor(Math.random()*P.length)]];m=set[Math.floor(Math.random()*set.length)];}}catch{}try{if(window.Evo82&&Evo82.on())Evo82.addCopy(k,m,DROP85.tier,1,true);else V70.phAdd(k,m,3,1);}catch{return '';}
  let nm='';try{nm=k==='craft'?Fighters28.profiles[m].name:GearCatalog[m].name;}catch{}return nm;}
 function fallback(st){const f=DROP85.fb[st];if(!f)return [];const out=[];
  for(let k=0;k<f.n;k++){let m=null;try{const set=Campaign36.sets[f.sets[Math.floor(Math.random()*f.sets.length)]];m=set[Math.floor(Math.random()*set.length)];}catch{}if(!m)continue;
   try{if(window.Evo82&&Evo82.on())Evo82.addCopy('gear',m,DROP85.fbTier,1,true);else V70.phAdd('gear',m,2,1);}catch{continue;}let nm=m;try{nm=GearCatalog[m].name;}catch{}out.push('Bản sao Lam Lv1 · '+nm);}
  try{Progress.grantCredits(f.cr);}catch{}out.push(f.cr.toLocaleString('vi-VN')+' ◈ hợp kim');return out;}
 let bel=null;function banner(st,lines){try{if(!bel){bel=document.createElement('div');bel.id='dr87';bel.style.cssText='position:fixed;left:50%;top:22%;transform:translateX(-50%);z-index:99990;pointer-events:none;text-align:center;min-width:280px;max-width:92vw;padding:14px 18px;border:1px solid #ffd36a;background:linear-gradient(160deg,rgba(40,24,6,.94),rgba(12,8,24,.94));box-shadow:0 0 28px rgba(255,200,90,.45);color:#fff;font:600 13px/1.5 system-ui,sans-serif;transition:opacity .5s';document.body.appendChild(bel);}
   bel.innerHTML='<div style="color:#ffd36a;font-size:15px;letter-spacing:1px;margin-bottom:6px">'+DROP85.banner+'</div><div style="color:#cfe6ff;font-size:11px;margin-bottom:4px">HẠ BOSS ẢI '+st+'</div>'+lines.map(l=>'<div>'+l.replace(/[<>&]/g,'')+'</div>').join('');
   bel.style.opacity='1';bel.hidden=false;clearTimeout(bel.__t);bel.__t=setTimeout(()=>{bel.style.opacity='0';setTimeout(()=>{bel.hidden=true;},600);},4200);}catch{}}
 function tick(){if(!on())return;const c=cleared();if(!c)return;
  if(!S){S={done:{}};for(const st in DROP85.chance)if(c.includes(+st))S.done[st]='old';save();return;}
  for(const st in DROP85.chance){if(S.done[st]||!c.includes(+st))continue;const ok=Math.random()<DROP85.chance[st];S.done[st]=ok?'copy':'miss';save();
   let lines=[];if(ok){const nm=give(st);lines.push('Bản sao Tím Lv1'+(nm?' · '+nm:''));const X=DROP85.extra[st];if(X){try{Progress.grantCredits(X.cr);lines.push(X.cr.toLocaleString('vi-VN')+' ◈ hợp kim');}catch{}try{for(let i=0;i<X.gem;i++)Stone71.give(Stone71.make(3));lines.push(X.gem+' đá khảm Tím');}catch{}}}else{lines=fallback(st);if(lines.length)S.done[st]='fb';save();}
   if(lines.length)setTimeout(()=>{banner(st,lines);try{toast('🎁 '+DROP85.banner);}catch{}},1200);}}
 setInterval(()=>{try{tick();}catch{}},2000);setTimeout(()=>{try{tick();}catch{}},2500);
 return {state:()=>JSON.parse(JSON.stringify(S)),_set:o=>{S=o;save();},tick,banner};
})();
window.Drop85=Drop85;
