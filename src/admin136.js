// V136 · MÃ QUẢN TRỊ mở TOÀN BỘ: bổ sung phần mã V66 còn thiếu (chiến cơ 11–13, ải 161–200, trang bị bộ 10–13, SSS riêng tàu 11–13)
//  Chạy 1 lần sau khi mã SAOBANG-ADMIN-2026 đã kích hoạt (Admin66.on()); cờ: saobang-admin136
(()=>{
  const FLAG='saobang-admin136';
  function run(){try{
    if(typeof Admin66==='undefined'||!Admin66.on())return;const fl=localStorage.getItem(FLAG);if(fl==='done')return;
    if(fl){// giai đoạn 2: trang bị bộ 10–13 phải thêm lúc game đã nạp đủ danh mục
      const have=new Set(Progress.getState().items.map(x=>x.variant));
      for(const v of Object.keys(GearCatalog)){if(have.has(v)||String(v).startsWith('sss_'))continue;try{Campaign36.acquire('gear',v,'SS','endless');const it=Progress.getState().items.filter(x=>x.variant===v).slice(-1)[0];if(it)V70.setTier('gear',it.id,11);}catch{}}
      localStorage.setItem(FLAG,'done');try{Progress.render();}catch{}return;}
    const read=k=>{try{return JSON.parse(localStorage.getItem(k)||'null')||{};}catch{return {};}};
    const L=n=>Array.from({length:n},(_,i)=>i+1);
    const c=read('saobang-campaign-v36');c.crafts=[...new Set([...(c.crafts||[]),0,1,2,3,4,5,6,7,8,9,10,11,12])];const st=c.stars||{};for(const i of L(200))st[i]=3;c.stars=st;
    c.models=[...new Set([...(c.models||[]),...Object.keys(GearCatalog)])];
    const hg=read('saobang-hangar-v1');hg.cleared=L(200);hg.items=hg.items||[];const have=new Set(hg.items.map(x=>x.variant));
    for(const v of Object.keys(GearCatalog)){if(have.has(v)||String(v).startsWith('sss_'))continue;const d=GearCatalog[v];if(!d||!d.kind)continue;hg.items.push({id:'adm-'+v,kind:d.kind,rarity:'legendary',level:120,variant:v,enhance:5,grade:'SS',rank:'SS'});}
    const ws=read('saobang-workshop-v1');for(const k of ['crafts','craftEnhancements','craftLevels','craftFragments']){if(Array.isArray(ws[k]))while(ws[k].length<13)ws[k].push(k==='crafts'?'SS':k==='craftEnhancements'?5:k==='craftLevels'?120:999);}
    localStorage.setItem('saobang-campaign-v36',JSON.stringify(c));localStorage.setItem('saobang-hangar-v1',JSON.stringify(hg));localStorage.setItem('saobang-workshop-v1',JSON.stringify(ws));
    try{for(let i=0;i<13;i++)V70.setTier('craft',i,11);}catch{}
    try{for(const it of hg.items)V70.setTier('gear',it.id,11);}catch{}
    try{const s=SSS87.state?SSS87.state():{};SSS87._set({done:{...(s.done||{}),10:1,11:1,12:1}});}catch{}
    localStorage.setItem(FLAG,'p1');
    try{toast('★ QUẢN TRỊ: đã mở toàn bộ chiến cơ, ải, trang bị');}catch{}
    window.__adm66=true;setTimeout(()=>location.reload(),400);
  }catch(e){console.warn('admin136',e);}}
  setTimeout(run,4000);
})();
