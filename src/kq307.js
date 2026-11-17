'use strict';
// V307 · MÀN KẾT QUẢ + HỘP HỒI SINH (tranh GPT B6, 18/11/2026)
//  • Kết quả (#rs, body.res78): nền vũ trụ + hành tinh, 3 sao đầy / rỗng mới, tem "KỶ LỤC MỚI" (ải: khi có tag KỶ LỤC ★ MỚI; Vô tận: khi đợt vượt kỷ lục cũ).
//  • Hồi sinh (#overlay[data-state=revive]): khung hộp hồi sinh bao tiêu đề → nút KẾT THÚC (đo vị trí bằng mã, không di chuyển phần tử gốc).
//  • Tắt: window.KQ307=false.
(function(){
 const I=window.KQ307_IMG||{};if(!I.nen_ket_qua)return;
 const u=k=>'url('+I[k]+')';
 const st=document.createElement('style');st.id='kq307-var';
 st.textContent=':root{--q7-nen:'+u('nen_ket_qua')+';--q7-hs:'+u('hop_hoi_sinh')+';--q7-sd:'+u('sao_ket_qua_day')+';--q7-sr:'+u('sao_ket_qua_rong')+';--q7-tem:'+u('tem_ky_luc_moi')+'}';
 document.head.appendChild(st);
 let eb=0;const best=()=>{try{return Campaign36.getState().endlessBest|0;}catch{return 0;}};
 function tick(){const on=window.KQ307!==false;document.documentElement.classList.toggle('kq307',on);if(!on)return;
  try{if(mode==='play'&&gameMode==='endless')eb=best();else if(mode==='play')eb=-1;}catch{}
  const ov=document.getElementById('overlay');if(!ov)return;
  // hồi sinh: đo khung
  if(ov.dataset.state==='revive'&&!ov.hidden){const a=document.getElementById('badge'),b=document.getElementById('revive-end393')||document.getElementById('start');
   if(a&&b){const r0=ov.getBoundingClientRect(),ra=a.getBoundingClientRect(),rb=b.getBoundingClientRect();const t=ra.top-r0.top+ov.scrollTop-54,h=rb.bottom-ra.top+92;ov.style.setProperty('--q7-t',Math.round(t)+'px');ov.style.setProperty('--q7-h',Math.round(h)+'px');ov.classList.add('q7hs');}}
  else ov.classList.remove('q7hs');
  // kết quả: tem kỷ lục
  const rs=document.getElementById('rs');
  if(rs&&!rs.dataset.q7){rs.dataset.q7='1';let rec=!!rs.querySelector('.rs-tags .gold')&&/KỶ LỤC/.test(rs.querySelector('.rs-tags').textContent);
   try{if(gameMode==='endless'&&eb>0&&level>eb)rec=true;}catch{}
   if(rec){const d=document.createElement('div');d.className='q7tem';d.innerHTML='<b>KỶ LỤC MỚI</b>';const rib=rs.querySelector('.rs-rib');(rib||rs.firstChild).after(d);}}}
 tick();setInterval(()=>{try{tick();}catch{}},250);
})();
