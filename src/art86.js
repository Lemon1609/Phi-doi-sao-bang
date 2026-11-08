// V86 · GHÉP TRANH GPT ĐỢT V85 (76 PNG): vỏ giáp + bệ tên lửa + drone bộ 6–12 · skin riêng #11–#13 · đạn địch chương 6–9
//  (boss ải 120/140/160 đi qua Boss82 — xem build). Chỉ thay HÌNH: sát thương, hitbox, tốc độ giữ nguyên.
//  • Trang bị bộ 6–12: GEAR_FX đang mượn hình của 18 món gốc → thay khóa ảnh của đúng trạng thái đó (vỏ giáp _shell_idle, bệ _pod_normal/_pod_super).
//    Khung dưới Tím dùng evo1, từ Tím dùng evo2. Bạo Tẩu luôn dùng evo2. Bệ tên lửa vẽ 1 bên → bên trái lật gương.
//  • Skin riêng #11 Huyết Long · #12 Bạch Kim · #13 Thái Cổ — 0 chỉ số (Gemini REVIEW85 G5). Mở: #11 tích lũy 200 triệu điểm boss cuối tuần ·
//    #12 đổi 150 Xu Tinh Anh · #13 đủ 3★ cả 20 ải Chương 9. Mặc/tháo trong Tủ skin. Khóa lưu mới: saobang-skin86.
//  • Đạn địch đủ 9 chương: 1 hồn ma · 2 thép · 3 điện · 4 tinh vân · 5 băng · 6 dung nham · 7 thợ săn · 8 omega · 9 hư không (orb / orb lớn / kim / mảnh). Tắt: window.ART86=false
const Art86=(()=>{
 const on=()=>window.ART86!==false;const A=typeof ART86_ASSETS!=='undefined'?ART86_ASSETS:{};
 const IM={};const img=k=>{if(!(k in IM)){IM[k]=A[k]?Object.assign(new Image(),{src:A[k]}):null;}const m=IM[k];return m&&m.complete&&m.naturalWidth?m:null;};
 for(const k in A)img(k);
 const FL={};function flip(k){if(FL[k])return FL[k];const m=img(k);if(!m)return null;const c=document.createElement('canvas');c.width=m.naturalWidth;c.height=m.naturalHeight;const g=c.getContext('2d');g.translate(c.width,0);g.scale(-1,1);g.drawImage(m,0,0);return FL[k]=c;}
 // ---------- trang bị ----------
 const PRE={aurora36:'forge_armor',comet36:'forge_missile',lance36:'forge_aux',void36:'void_armor',nova36:'void_missile',orbit36:'void_aux',seraph36:'dawn_armor',judgement36:'dawn_missile',halo36:'dawn_aux',
  aegis9:'fleet_armor',swarm9:'fleet_missile',carrier9:'fleet_aux',devour10_a:'devour10_a',devour10_m:'devour10_m',devour10_s:'devour10_s',chrono11_a:'chrono11_a',chrono11_m:'chrono11_m',chrono11_s:'chrono11_s',
  monarch12_a:'monarch12_a',monarch12_m:'monarch12_m',monarch12_s:'monarch12_s'};
 const SUF={armor:'_armor_shell_idle_evo',missiles:'_missile_pod_evo',sidearm:'_aux_pod_evo'};
 function eqItem(kind){try{const eq=Progress.v70.equipped();const id=eq[kind];return id?Progress.v70.get(id):null;}catch{return null;}}
 const tim=it=>{try{return (V70.nOf(it)|0)>=6;}catch{return false;}};
 // Equipment25 vẽ trang bị bằng 1 tấm hình chung theo loại/khung (r11Gear) → build chèn móc: món bộ 6–12 vẽ bằng tranh riêng.
 function gearSprite(it,x,y,size,g){if(!on()||!it||!PRE[it.variant]||!SUF[it.kind])return false;const sup=(()=>{try{return superTime>0;}catch{return false;}})();
  const e=(sup||tim(it))?2:1,base=PRE[it.variant]+SUF[it.kind],im=img(base+e)||img(base+1);if(!im)return false;g=g||ctx;g.save();
  if(it.kind==='armor'){// vòng giáp quanh tàu (móc gọi ở đuôi tàu y+37 → dời về tâm tàu)
   const S=sup?168:150;g.globalCompositeOperation='lighter';g.globalAlpha*=sup?.7:.55;g.drawImage(im,x-S/2,y-37-S/2,S,S);}
  else if(it.kind==='missiles'){// 2 bệ đeo hông (ảnh 1 bên → bên trái lật)
   const h=size*1.75,w=h*.5,dx=size*.95;const L=e===2?flip(base+2):flip(base+e);g.drawImage(im,x+dx-w/2,y-18-h/2,w,h);if(L)g.drawImage(L,x-dx-w/2,y-18-h/2,w,h);}
  else{const S=size*1.45;g.drawImage(im,x-S/2,y-S/2,S,S);}
  g.restore();return true;}
 function hookFx(){}
 // ---------- skin riêng #11–#13 ----------
 const SK=[{i:10,k:'s10_huyetlong',n:'Thôn Tinh · Huyết Long',how:'Tích lũy 200 triệu điểm Boss cuối tuần',col:'#ff2a3a'},
           {i:11,k:'s11_bachkim',n:'Thời Không · Bạch Kim',how:'Đổi 150 Xu Tinh Anh',cost:150,col:'#bfe8ff'},
           {i:12,k:'s12_thaico',n:'Đế Vương · Thái Cổ',how:'Đạt 3★ cả 20 ải Chương 9 (ải 161–180)',col:'#d9a640'}];
 const KEY='saobang-skin86';let S={own:{},eq:{}};try{const v=JSON.parse(localStorage.getItem(KEY)||'null');if(v&&typeof v==='object')S=Object.assign(S,v);}catch{}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const skOf=i=>SK.find(x=>x.i===i);
 function met(sk){try{if(sk.i===10)return (Event83.state().life|0)>=200000000;if(sk.i===12){const st=Campaign36.getState().stars||{};for(let n=161;n<=180;n++)if((st[n]|0)<3)return false;return true;}}catch{}return false;}
 function progress(sk){try{if(sk.i===10)return Math.floor((Event83.state().life|0)/1e6)+' / 200 triệu';if(sk.i===12){const st=Campaign36.getState().stars||{};let t=0;for(let n=161;n<=180;n++)t+=Math.min(3,st[n]|0);return t+' / 60★';}if(sk.i===11){return (V77.state().tok|0)+' / 150 Xu Tinh Anh';}}catch{}return '';}
 function tick(){for(const sk of SK)if(!S.own[sk.k]&&met(sk)){S.own[sk.k]=1;save();try{toast('✦ MỞ SKIN '+sk.n.toUpperCase());}catch{}}}
 function buy(i){const sk=skOf(i);if(!sk||!sk.cost||S.own[sk.k])return false;try{const st=V77.state();if((st.tok|0)<sk.cost){toast('CẦN '+sk.cost+' XU TINH ANH');return false;}V77._set({tok:(st.tok|0)-sk.cost});}catch{return false;}S.own[sk.k]=1;save();try{toast('✦ ĐÃ ĐỔI SKIN '+sk.n.toUpperCase());}catch{}return true;}
 function wear(i,on1){const sk=skOf(i);if(!sk)return;if(on1&&!S.own[sk.k])return;S.eq[i]=on1?sk.k:null;save();}
 function hull(i,sup){if(!on())return null;const k=S.eq[i];if(!k||!S.own[k])return null;return img('skin_'+k+(sup?'_super':''))||img('skin_'+k);}
 // ---------- đạn địch chương 6–9 ----------
 const PAL=window.DAN185===false?[[1,20,'wraith'],[21,40,'titan'],[41,60,'ion'],[61,80,'nebula'],[81,100,'frost'],[101,120,'lava'],[121,140,'hunter'],[141,160,'omega'],[161,180,'void'],[181,200,'abyss']]:/* V185: chủ dự án chốt đạn địch ĐỎ TÂM TRẮNG — tạm dùng các bộ đỏ sẵn có (tránh cam/vàng trùng sao điểm, tím trùng tia ta) tới khi GPT giao bộ mới */(window.DAN185B===false?[[1,20,'frost'],[21,40,'omega'],[41,60,'nebula'],[61,80,'frost'],[81,100,'omega'],[101,120,'nebula'],[121,140,'frost'],[141,160,'omega'],[161,180,'nebula'],[181,200,'abyss']]:/* V186: bộ đạn GPT đỏ (chương 1–5) / hồng (6–10) */[[1,100,'do'],[101,200,'hong']]);// V86b: chương 1–5 (tranh GPT đợt V86)
 function pal(){let lv=0,gm='';try{lv=level|0;gm=gameMode;}catch{}if(gm!=='campaign'){return window.DAN185B===false?null:'do';}/* V187: Vô tận / phó bản dùng bộ đạn đỏ GPT */try{if(Event83.inRaid())return window.DAN185B===false?null:'hong';}catch{}for(const [a,b,p] of PAL)if(lv>=a&&lv<=b)return p;return null;}
 function tag(){const p=pal();if(!p)return;try{for(const b of bullets){if(b.__e86!==undefined||b.dead)continue;const k=b.type==='needle'?'needle':(b.r||5)>=8?'orb_big':b.sp75?'shard':'orb';b.__e86='ebullet_'+k+'_'+p;}}catch{}}
 // phải là lớp NGOÀI CÙNG (module skin đạn có thể bọc sau và tự vẽ không gọi lớp trong) → kiểm tra lại mỗi giây
 function hookBul(){try{if(Threat30.draw&&Threat30.draw.__a86)return;const o=Threat30.draw;Threat30.draw=function(b){try{if(on()&&b&&b.__e86&&!b.dead){const im=img(b.__e86);if(im){const r=Math.max(3,b.r||5),nd=b.__e86.includes('needle'),sz=(r+9)*2.3*(nd?1.15:1);ctx.save();ctx.translate(b.x,b.y);if(nd)ctx.rotate(Math.atan2(b.vy||1,b.vx||0)+Math.PI/2);else if(!b.__e86.includes('orb_big'))ctx.rotate((b.age||0)*2);ctx.globalCompositeOperation='lighter';ctx.drawImage(im,-sz/2,-sz/2,sz,sz);ctx.restore();return;}}}catch{}return o.apply(this,arguments);};Threat30.draw.__a86=1;}catch{}}
 let upd86=false;function hookUpd(){try{if(upd86)return;upd86=true;const o=window.update;const f=function(dt){const r=o.apply(this,arguments);try{if(on())tag();}catch{}return r;};f.__a86=1;window.update=f;try{update=f;}catch{}}catch{}}
 function install(){hookFx();hookBul();}
 install();hookUpd();setTimeout(install,500);setTimeout(install,2600);setInterval(()=>{try{tick();}catch{}},3000);setInterval(()=>{try{hookBul();}catch{}},1000);
 return {gearSprite,hull,wear,buy,SK,own:k=>!!S.own[k],eqOf:i=>S.eq[i]||null,progress,state:()=>JSON.parse(JSON.stringify(S)),_set:o=>{Object.assign(S,o);save();},img};
})();
window.Art86=Art86;
