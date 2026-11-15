'use strict';
// V306n · NHÂN ĐÔI HỢP KIM ở màn kết quả chiến dịch (chủ dự án duyệt 15/11/2026): trả thể lực, giới hạn lượt/ngày, trần mỗi lần.
// Chỉ nhân hợp kim nhận được trong chuyến bay; không đụng kim cương/vật phẩm. Số chốt có thể chỉnh qua window.X2306 (chờ Gemini rà soát).
(()=>{try{
 const KEY='saobang-x2-v1',CFG=Object.assign({cost:4,limit:3,cap:3000},window.X2306||{});
 const day=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');};
 const load=()=>{try{const s=JSON.parse(localStorage.getItem(KEY)||'null');return s&&s.d===day()?{d:s.d,n:s.n|0}:{d:day(),n:0};}catch{return {d:day(),n:0};}};
 const save=s=>{try{localStorage.setItem(KEY,JSON.stringify(s));}catch{}};
 let doneAt=0;
 const say=t=>{try{toast(t);}catch{}};
 function run(){
  const rs=document.getElementById('rs');if(!rs||rs.querySelector('#rs306-x2'))return;
  const rib=rs.querySelector('.rs-rib');if(!rib||!/HOÀN THÀNH/i.test(rib.textContent))return;
  if(typeof gameMode==='undefined'||gameMode!=='campaign'||typeof runCredits==='undefined'||typeof Progress==='undefined'||typeof V75==='undefined')return;
  try{if(Daily.active()||Daily.recent())return;}catch{}
  if(runCredits<doneAt)doneAt=0;
  const base=Math.min(CFG.cap,Math.max(0,(runCredits|0)-doneAt));if(base<=0)return;
  const st=load(),left=Math.max(0,CFG.limit-st.n);
  const b=document.createElement('button');b.type='button';b.id='rs306-x2';
  const label=()=>left>0?'<b>NHÂN ĐÔI HỢP KIM</b><small>+'+base+' hợp kim · −'+CFG.cost+' thể lực · còn '+left+'/'+CFG.limit+' lượt hôm nay</small>':'<b>NHÂN ĐÔI HỢP KIM</b><small>Hết '+CFG.limit+' lượt hôm nay</small>';
  b.innerHTML=label();if(left<=0)b.disabled=true;
  b.addEventListener('click',()=>{
   if(b.disabled)return;const s=load();if(s.n>=CFG.limit){b.disabled=true;b.innerHTML=label();return;}
   let ok=false;try{ok=V75.useEn(CFG.cost);}catch{}
   if(!ok){say('THIẾU THỂ LỰC · cần '+CFG.cost+' để nhân đôi');return;}
   Progress.grantCredits(base);s.n++;save(s);doneAt=runCredits|0;
   b.disabled=true;b.classList.add('done');b.innerHTML='<b>ĐÃ NHÂN ĐÔI ✓</b><small>+'+base+' hợp kim · còn '+(CFG.limit-s.n)+'/'+CFG.limit+' lượt hôm nay</small>';
   say('+'+base+' HỢP KIM (nhân đôi)');
  });
  const anchor=rs.querySelector('.rs-score')||rib;anchor.after(b);
 }
 new MutationObserver(()=>setTimeout(run,0)).observe(document.body,{childList:true,subtree:true});
}catch(e){}})();
