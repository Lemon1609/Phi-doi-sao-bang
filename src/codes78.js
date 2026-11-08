// V78 · MÃ QUÀ: mã tân thủ (1 lần) + mã quản trị tài nguyên (vô hạn tài nguyên, KHÔNG mở khóa tiến trình)
const Codes78=(()=>{
 const KEY='saobang-codes78',BIG=9999999;
 const NEWBIE=['TANTHU2026','TAN-THU-2026','TANTHU-2026'],RES=['ADMIN-VOHAN','ADMINVOHAN','ADMIN-VO-HAN'];
 let S={};try{S=JSON.parse(localStorage.getItem(KEY)||'{}')||{};}catch{}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const T=m=>{try{toast(m);}catch{}};
 const tr=f=>{try{f();}catch(e){}};
 const MATS=()=>{const o=[];tr(()=>{for(const ty of MAT69.types)for(let t=1;t<=3;t++)o.push(ty.id+t);o.push(MAT69.sss.id);});return o;};
 function festKey(){let k=null;tr(()=>{const f=Fest78.active();if(f&&!f.lunar){const y=+new Date().toISOString().slice(0,4),md=new Date().toISOString().slice(5,10);k=f.id+'@'+(f.id==='noel'&&md<'06'?y-1:y);}});return k;}
 function newbie(){
  tr(()=>Progress.grantCredits(80000));tr(()=>Econ74.add(500,'Quà tân thủ'));tr(()=>Workshop.grant({exp:30000}));
  tr(()=>V75.addEn(120));tr(()=>V75.addTk(20));tr(()=>{for(const m of MATS())if(m!=='sss_core')V70.add(m,m.endsWith('1')?2:m.endsWith('2')?1:0);});
  tr(()=>{for(const p of PILOTS67)Pilot67._piece(p.id,p.id<=2?20:5);});tr(()=>OC75.addStone(30));tr(()=>Econ74.addSpin(5));
  tr(()=>{for(const t of [1,1,2])Stone71.give(Stone71.make(t));});
  T('🎁 QUÀ TÂN THỦ: +80.000◈ · +500💎 · +30.000 EXP · thể lực · 20 vé càn quét · vật liệu · mảnh phi công');}
 function topUp(){if(!S.res)return;if(typeof mode!=='undefined'&&['play','pause'].includes(mode))return;
  tr(()=>{const c=Progress.balance();if(c<BIG/2)Progress.grantCredits(BIG-c);});
  tr(()=>{const e=Workshop.expBalance();if(e<BIG/2)Workshop.grant({exp:BIG-e});});
  tr(()=>{const g=Econ74.gems();if(g<500000)Econ74.add(999999-g,'quản trị');});
  tr(()=>{const e=V75.energy();if(e<900)V75.addEn(999-e);});tr(()=>{const k=V75.tickets();if(k<500)V75.addTk(999-k);});
  tr(()=>{for(const m of MATS()){const h=V70.have(m);if(h<5000)V70.add(m,9999-h);}});
  tr(()=>{const st=Pilot67.state();for(const p of PILOTS67){const h=st.pieces[p.id]||0;if(h<5000)Pilot67._piece(p.id,9999-h);}});
  tr(()=>{const s=V77.state();if((s.tok|0)<50000)V77._set({tok:99999});});
  tr(()=>{const s=BK78.state();if((s.shards|0)<50000)BK78._set({shards:99999});});
  tr(()=>{const s=OC75.state?OC75.state():null;const n=s?s.st|0:0;if(n<5000)OC75.addStone(9999-n);});
  tr(()=>{const k=festKey();if(k){const s=Fest78.state();if(((s.tok||{})[k]|0)<5000)Fest78._set({tok:{...(s.tok||{}),[k]:9999}});}});
  tr(()=>{const s=Econ74.state();if((s.wtk|0)<200)Econ74.addSpin(999-(s.wtk|0));});
  tr(()=>{const st=Stone71.state();if(st.st.length<12&&!S.stoneGift){S.stoneGift=1;save();for(let t=0;t<=4;t++)for(let i=0;i<3;i++)Stone71.give(Stone71.make(t));}});
  tr(()=>{const hd=document.querySelector('#hgr41 .h1-head');if(hd&&!hd.querySelector('.adm78')){const b=document.createElement('span');b.className='adm78';b.textContent='VÔ HẠN';b.style.cssText='margin-left:8px;padding:2px 7px;border-radius:9px;background:#ffb43a;color:#201000;font:900 10px system-ui';hd.appendChild(b);}});}
 // mảnh đồ/mảnh chiến cơ: cộng qua Workshop.grant theo mẫu sở hữu
 function frags(){if(!S.res||(typeof mode!=='undefined'&&['play','pause'].includes(mode)))return;tr(()=>{let st=null;try{st=JSON.parse(localStorage.getItem('saobang-workshop-v1')||'null');}catch{}if(!st)return;
  for(let i=0;i<13;i++)tr(()=>{if(Campaign36.ownsCraft(i)){const h=(st.craftFragments||[])[i]|0;if(h<5000)Workshop.grant({craft:i,fragments:9999-h});}});
  for(const m of Object.keys(GearCatalog))tr(()=>{if(Campaign36.ownsModel(m)){const h=(st.gearFragments||{})[m]|0;if(h<5000)Workshop.grant({model:m,kind:GearCatalog[m].kind,gearFragments:9999-h});}});});}
 function tryCode(code){const c=String(code||'').trim().toUpperCase().replace(/\s+/g,'');
  if(NEWBIE.includes(c)){if(S.newbie)return 'Mã tân thủ đã được dùng trên máy này.';S.newbie=Date.now();save();newbie();return '🎁 Đã nhận QUÀ TÂN THỦ! Kiểm tra kho và Xưởng.';}
  if(RES.includes(c)){S.res=!S.res;save();if(S.res){topUp();frags();T('♾ TÀI NGUYÊN VÔ HẠN · tiến trình vẫn bắt đầu từ thấp');return '♾ Đã BẬT tài nguyên vô hạn. Màn chơi, cấp đồ, phi công giữ nguyên — tự nâng cấp từ thấp lên cao. Nhập lại mã để tắt.';}
   document.querySelectorAll('.adm78').forEach(e=>e.remove());return 'Đã TẮT tài nguyên vô hạn (tài nguyên đang có vẫn giữ).';}
  return null;}
 function install(){if(typeof Admin66==='undefined')return;const o=Admin66.tryCode;Admin66.tryCode=(code,act)=>{const r=tryCode(code);return r!==null?r:o(code,act);};
  setInterval(()=>{tr(topUp);},2500);setInterval(()=>{tr(frags);},6000);setTimeout(()=>{tr(topUp);tr(frags);},2500);}
 setTimeout(install,0);
 return {tryCode,state:()=>({...S}),on:()=>!!S.res};
})();
