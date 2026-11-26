'use strict';
// V100 · Gemini REVIEW98 — tinh giản sau 10 đợt V90–V99 (không xóa tính năng, không đổi khóa lưu cũ)
//  §1.1 Tiếp tế trước trận ở bảng chọn ải: ẩn hẳn khi đang có Cứu trợ tân thủ; thu gọn thành nút "+ Tiếp tế ◈" khi lực chiến ≥ đề nghị và lượt trước không thua ải đó
//  §1.2 Khế Ước: 3 nút chọn nhanh (sửa trong v91.js) · §1.3 bỏ nhãn danh hiệu dưới đuôi tàu + bỏ chọn tay hào quang (title84.js), hào quang về Tự động 1 lần
//  §1.4 mũi tên báo nguy chỉ boss + tối đa 2 tinh anh (v93.js) · §1.5 trang THỬ THÁCH: chế độ đã hết lượt thưởng hôm nay xuống cuối, nhãn "ĐÃ XONG HÔM NAY"
//  §2 nhấp nháy tab PHI ĐỘI khi vừa mở ở ải 12 (v94.js). Khóa lưu mới: saobang-ux100. Tắt: window.V100=false
const V100=(()=>{
 const on=()=>window.V100!==false;const g=f=>{try{return f();}catch{return null;}};
 const KEY='saobang-ux100';let S={lf:{}};try{Object.assign(S,JSON.parse(localStorage.getItem(KEY)||'{}'));}catch{}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 // hào quang: chuyển về Tự động 1 lần (bộ chọn tay đã gỡ)
 if(!S.aura){S.aura=1;save();try{window.AURA85&&AURA85.set('auto');}catch{}setTimeout(()=>{try{window.AURA85&&AURA85.set('auto');}catch{}},1500);}
 // ghi nhận thua / thắng từng ải chiến dịch (để mở sẵn tiếp tế khi vừa thua)
 let oEnd=null;function hookEnd(){if(oEnd||typeof end!=='function')return;oEnd=end;const f=function(win){let lv=0,c=false,lost=false;try{lv=level|0;c=gameMode==='campaign'&&!(typeof Eclipse67!=='undefined'&&Eclipse67.active());lost=!win&&hp<=0;}catch{}const r=oEnd.apply(this,arguments);try{if(c&&lv){if(win){if(S.lf[lv]){delete S.lf[lv];save();}}else if(lost){S.lf[lv]=1;save();}}}catch{}return r;};window.end=f;try{end=f;}catch{}}
 // §1.1
 let openFor=0;
 function supply(){if(!on())return;const sh=document.getElementById('cm-sheet');if(!sh||!sh.classList.contains('open'))return;const box=sh.querySelector('.su90');if(!box)return;
  const n=+((sh.querySelector('h4')||{}).textContent||'').replace(/\D+/g,' ').trim().split(' ')[0]||0;if(!n)return;
  const head=[...box.querySelectorAll('p')].find(p=>/TIẾP TẾ TRƯỚC TRẬN/.test(p.textContent));const row=box.querySelector('[data-su90]')&&box.querySelector('[data-su90]').parentElement;if(!head||!row)return;
  let aid=false;try{aid=n<=40&&((V94.state().S.fail||{})[n]|0)>=2;}catch{}
  let bought=false;try{bought=Object.keys(UX90.state().p||{}).length>0;}catch{}
  let cp=0,req=0;try{cp=Combat.stats().cp;req=Meta40.reqCP(n);}catch{}
  const collapse=!aid&&!bought&&openFor!==n&&cp>=req&&!S.lf[n];
  head.style.display=row.style.display=(aid||collapse)?'none':'';
  let t=box.querySelector('.st100');if(collapse){if(!t){t=document.createElement('button');t.className='st100';t.textContent='+ Tiếp tế ◈';t.style.cssText='margin:2px 0 4px;padding:4px 10px;font-size:11px;font-weight:800;border-radius:6px;border:1px solid #3e6f98;background:rgba(11,29,51,.85);color:#cfe6ff';
    t.addEventListener('click',e=>{e.stopPropagation();openFor=n;supply();});head.before(t);}}else if(t)t.remove();}
 // §1.5
 const done={breakout:()=>{try{const st=BK78.state(),d=new Date(Date.now()+7*3600000).toISOString().slice(0,10);const n=st.day&&st.day.d===d?st.day.n|0:0;return n>=FEATURES_V78.BREAKOUT_ROGUELITE.DAILY_REWARDED_RUNS_MAX;}catch{return false;}},
  limited:()=>{try{return Econ74.lOpen()&&Econ74.triesLeft()<=0;}catch{return false;}},
  daily:()=>{try{return !Nav74.F.daily.dot();}catch{return false;}}};
 function sortChallenge(){if(!on())return;const el=document.getElementById('nav74p');if(!el||el.hidden)return;const hd=el.querySelector('.n74ph b');if(!hd||hd.textContent!=='THỬ THÁCH')return;const pc=el.querySelector('.n74pc');if(!pc||pc.dataset.s100)return;pc.dataset.s100=1;
  const cards=[...pc.querySelectorAll('.n74card[data-go74]')];const tail=[];for(const c of cards){const id=c.dataset.go74;if(c.classList.contains('lk')||!done[id]||!done[id]())continue;tail.push(c);c.style.opacity='.6';const sp=c.querySelector('span');if(sp)sp.textContent='ĐÃ XONG HÔM NAY';}
  for(const c of tail)pc.appendChild(c);}
 function boot(){hookEnd();}
 boot();setTimeout(boot,900);setTimeout(boot,3200);
 let lm='';setInterval(()=>{try{const m=mode;if(lm==='play'&&(m==='reward'||m==='win')){const lv=level|0;if(S.lf[lv]){delete S.lf[lv];save();}}lm=m;}catch{}},150);
 (window.__SH26=window.__SH26||[]).push(()=>{try{supply();}catch{}});setInterval(()=>{try{supply();}catch{}try{sortChallenge();}catch{}},400);
 return {state:()=>JSON.parse(JSON.stringify(S))};
})();
window.V100=V100;
