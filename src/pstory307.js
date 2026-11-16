'use strict';
// V307 · TRUYỆN PHI CÔNG (Gemini viết 16/11/2026): nút 📖 TRUYỆN ngay trong thẻ phi công đang chọn (màn Phi công). Tắt: window.PSTORY307=false
(()=>{try{
 const D=[
 {
  "n": "Lâm Phương",
  "t": "Vũ điệu bên lằn ranh sáng",
  "o": "Vành đai tiểu hành tinh Thất Tinh / Học viện Bay Tốc Độ Cao",
  "y": "Tinh Lịch 2189",
  "s": "Lách đạn sát và chuyển hóa xung lực",
  "l": "Thích cảm giác gió rít qua buồng lái / Sợ sự tĩnh lặng kéo dài",
  "b": "Lâm Phương chưa bao giờ tin vào việc né tránh thật xa làn đạn địch. Trong trận đột phá qua hẻm núi thiên thạch ở vành đai Thất Tinh, khi hệ thống cảm biến cảnh báo va chạm đỏ rực, cô lại đẩy cần lái lao thẳng vào khe hở hẹp nhất giữa hai chùm tia plasma. Nhiệt lượng từ đạn địch lướt qua làm lớp giáp nóng ran, nhưng chính luồng điện từ ấy lại được bộ thu trên chiến giáp của cô nuốt trọn, biến thành nguồn năng lượng tinh khiết dội ngược về buồng lái. Với Lâm Phương, khoảng cách an toàn nhất trên bầu trời luôn chỉ cách mũi tên lửa đúng một nhịp thở.",
  "c": "Cô thường lái Cực Quang Ảo Ảnh (chiến cơ số 2) xuyên qua các cơn bão từ và hay trêu chọc Thiên Lam vì thói quen bắn tỉa từ xa."
 },
 {
  "n": "Hạ Vy",
  "t": "Nhịp đập giữ lửa đội hình",
  "o": "Pháo đài quỹ đạo Thiên Cực / Trường Sĩ Quan Chỉ Huy Liên Minh",
  "y": "Tinh Lịch 2188",
  "s": "Điều phối nhịp độ và duy trì trạng thái Bạo Tẩu",
  "l": "Thích trà thảo mộc ấm trước giờ xuất kích / Sợ nhìn đồng đội đơn độc giữa vòng vây",
  "b": "Giữa tiếng còi báo động chát chúa trên boong chỉ huy, giọng nói của Hạ Vy vẫn đều đặn như nhịp đồng hồ nguyên tử. Trong chiến dịch giữ vững phòng tuyến tại tinh hệ biên viễn, khi lò phản ứng của cả phi đội bắt đầu quá tải và có dấu hiệu tắt lịm sau đợt Bạo Tẩu đầu tiên, cô bình tĩnh mở khóa van điều tiết trên chiến giáp chỉ huy, nối thẳng tần số tinh thần của mình vào mạng lưới chiến thuật chung. Luồng xung nhịp ổn định từ cô giữ cho ngọn lửa Bạo Tẩu của toàn đội cháy rực thêm từng nhịp quý giá, nghiền nát đội hình tiên phong của địch. Khi bầu trời lặng xuống, Hạ Vy luôn là người cuối cùng rời khỏi đài quan sát.",
  "c": "Hạ Vy trực tiếp điều khiển kỳ hạm Phần Thiên Chiến Chuẩn (chiến cơ số 8) và là điểm tựa tinh thần vững chắc nhất của Bảo Ngọc trên mọi chiến trường."
 },
 {
  "n": "Kiều An",
  "t": "Bàn tay vá lại bầu trời",
  "o": "Khu công nghiệp nổi Tân Cảng / Xưởng Cơ Khí Trọng Lực",
  "y": "Tinh Lịch 2190",
  "s": "Tự động tái cấu trúc giáp hợp kim nano",
  "l": "Thích mùi dầu máy và tiếng cờ lê va nhau / Sợ những bản thiết kế thiếu tính thực dụng",
  "b": "Kiều An mang ra chiến trường bộ đồ nghề nặng trĩu thay vì những lời tuyên thệ hào nhoáng. Trên đường rút lui qua vùng nhiễu sóng gần trạm Kim Tinh, mảnh vỡ thiên thạch xé toạc một mảng lớn trên vai giáp và thân tàu của cô. Thay vì quay về xưởng, Kiều An lợi dụng vài khoảnh khắc hiếm hoi khuất sau bóng một tiểu hành tinh, bình thản kích hoạt các bọ nano sửa chữa giấu trong ống tay áo. Từng lớp vảy hợp kim tự động đan lại, hàn kín vết nứt trước khi đợt truy kích tiếp theo ập đến. Với cô, một chiến cơ tốt không phải là cỗ máy không bao giờ trầy xước, mà là cỗ máy biết tự đứng dậy sau mỗi vết thương.",
  "c": "Kiều An gắn bó mật thiết với Trí Tuệ Thự Quang (chiến cơ số 5) và thường xuyên thức trắng đêm tại xưởng để bảo trì giáp cho Lâm Phương."
 },
 {
  "n": "Thiên Lam",
  "t": "Viên đạn không có tiếng vang",
  "o": "Đỉnh tháp quan trắc Hàn Sơn / Viện Xạ Kích Không Gian",
  "y": "Tinh Lịch 2191",
  "s": "Bắn tỉa điểm yếu trên các chiến hạm khổng lồ",
  "l": "Thích sự im lặng tuyệt đối trong buồng ngắm / Sợ những phát bắn lệch khỏi tâm điểm",
  "b": "Trong từ điển của Thiên Lam không tồn tại khái niệm bắn áp chế. Trước pháo đài bay khổng lồ của hạm đội xâm lược, giữa muôn vàn luồng đạn đan chéo rực sáng bầu trời, cô hạ nhịp thở xuống mức tối thiểu và khóa chặt thấu kính chiến giáp vào một khe hở nhỏ bằng bàn tay trên lớp giáp lõi của đối phương. Một giây ngưng đọng. Một tia sáng xanh lạnh lẽo xé toạc không gian, xuyên thẳng vào buồng năng lượng khiến cả khối thép khổng lồ sụp đổ từ bên trong. Thiên Lam thu gọn nòng ngắm, ánh mắt vẫn phẳng lặng như mặt hồ đóng băng trên đỉnh Hàn Sơn.",
  "c": "Cô là phi công duy nhất thuần thục hệ thống ngắm của Thiên Khung Lược Ảnh (chiến cơ số 9) và luôn phối hợp ăn ý cùng Hàn Sương trong các nhiệm vụ tiêu diệt mục tiêu trọng yếu."
 },
 {
  "n": "Bảo Ngọc",
  "t": "Bức tường thành mang đầy vết sẹo",
  "o": "Tiền đồn biên giới Hỏa Tinh / Trung Đoàn Phòng Vệ Đời Đầu",
  "y": "Tinh Lịch 2187",
  "s": "Kháng chịu va đập ở ngưỡng sinh tử",
  "l": "Thích ngắm bình minh từ boong tàu cũ / Sợ quên đi tên của những người đồng đội năm xưa",
  "b": "Bảo Ngọc thuộc thế hệ phi công đầu tiên bước ra từ tro tàn của trận tập kích năm Tinh Lịch 2187. Trong cuộc vây hãm kéo dài ba ngày ở vành đai ngoài, khi lớp khiên năng lượng vỡ tan và hệ thống cảnh báo trên chiến giáp nhấp nháy màu đỏ tuyệt vọng, cô không hề lùi bước. Trái lại, càng bị dồn vào chân tường, bản năng sinh tồn tôi luyện qua hàng trăm trận đánh càng khiến cô khóa chặt từng khớp giáp, gồng mình hứng trọn mưa đạn để che chắn cho các tân binh rút lui phía sau. Những vết sẹo trên áo giáp không làm Bảo Ngọc chậm lại, chúng chỉ nhắc cô nhớ rằng mình vẫn còn đứng vững.",
  "c": "Bảo Ngọc là người đầu tiên cầm lái Nộ Hỏa Phượng Hoàng (chiến cơ số 1) và luôn coi Mộc Miên như người em gái nhỏ cần được che chở."
 },
 {
  "n": "Mộc Miên",
  "t": "Hạt mầm giữa vùng trời khói lửa",
  "o": "Hành tinh vườn ươm Thanh Lâm / Học Viện Y Sinh Liên Minh",
  "y": "Tinh Lịch 2192",
  "s": "Thu hồi tiếp tế tầm xa và phục hồi sinh lực",
  "l": "Thích chăm sóc những chậu cây nhỏ trong khoang nghỉ / Sợ nhìn thấy tín hiệu cấp cứu tắt lịm",
  "b": "Giữa chiến trường ngổn ngang mảnh vỡ và tàn lửa, Mộc Miên giống như một làn gió mát lành thổi qua bầu trời khô khốc. Trong trận giải cứu đoàn tàu tị nạn bị mắc kẹt ở hành lang thương mại, khi các thùng tiếp tế năng lượng trôi dạt quá xa tầm với của đồng đội, cô nhẹ nhàng mở rộng trường từ tính sinh học trên đôi cánh chiến giáp. Hàng chục lõi năng lượng và tinh thể sửa chữa lập tức bay vút về phía cô như những đốm đom đóm tìm về ánh sáng, hóa thành luồng sóng xanh dịu dàng chữa lành từng vết nứt trên thân tàu cả đội. Mộc Miên tin rằng mỗi mảnh tiếp tế được nhặt lên đều mang theo một cơ hội sống.",
  "c": "Mộc Miên đồng hành cùng Tinh Hà Thủ Vọng (chiến cơ số 10) trên các tuyến hộ tống và luôn chuẩn bị sẵn trà ấm cho Hạ Vy sau mỗi chuyến bay dài."
 },
 {
  "n": "Hàn Sương",
  "t": "Cơn mưa tuyết không báo trước",
  "o": "Trạm băng ngầm Lam Tuyết / Lực Lượng Tuần Tra Cực Bắc",
  "y": "Tinh Lịch 2190",
  "s": "Điều khiển tên lửa siêu thanh và đội tàu hộ vệ",
  "l": "Thích tiếng tuyết rơi trên mái vòm kính / Sợ những cuộc trò chuyện dài dòng vô nghĩa",
  "b": "Hàn Sương hiếm khi nói quá ba câu trong mỗi buổi họp chiến thuật. Cô trả lời bằng những vệt khói trắng xé gió. Trên bầu trời đóng băng của vành đai sao chổi, khi hạm đội địch vừa mở đội hình bao vây, Hàn Sương chỉ khẽ nâng cổ tay. Hai chiếc tàu con hộ vệ lập tức tách cánh, trút xuống một cơn mưa đạn dày đặc trong khi hàng loạt tên lửa truy đuổi lao đi với tốc độ kinh hoàng, không cho đối phương kịp xoay trở. Trận đánh kết thúc trước khi tín hiệu liên lạc kịp truyền về căn cứ. Với Hàn Sương, im lặng là cách nhanh nhất để kết thúc một cuộc chiến.",
  "c": "Hàn Sương là chủ nhân của X-Dực Băng Hà (chiến cơ số 3) và thường lặng lẽ bay yểm trợ bên cánh trái của Thiên Lam."
 },
 {
  "n": "Tử Dạ",
  "t": "Vệt mực loang giữa ngân hà",
  "o": "Khu vực cấm Hắc Thạch / Viện Nghiên Cứu Lượng Tử Mật",
  "y": "Tinh Lịch 2194",
  "s": "Cộng hưởng cổ vật tối thượng và tạo vùng Hư Không",
  "l": "Thích ngắm nhìn những tinh vân không có ánh sao / Sợ ánh sáng rực rỡ làm lộ bí mật quá khứ",
  "b": "Không ai biết Tử Dạ đến từ đâu trước khi cô bước ra từ phòng thí nghiệm kín Hắc Thạch cùng bộ chiến giáp đen tuyền như nhung. Trong trận quyết chiến trước khe nứt thứ nguyên, khi những trang bị tối thượng trên người cô đồng loạt thức tỉnh và cộng hưởng với luồng năng lượng cổ xưa, Tử Dạ thả xuống một quả cầu tối sẫm. Quả bom không phát ra tiếng nổ mà nở bung thành một vùng bóng tối đặc quánh, nuốt chửng mọi làn đạn và ăn mòn dần giáp trụ của kẻ thù bên trong. Khi màn đêm tan đi, chiến trường chỉ còn lại sự tĩnh mịch tuyệt đối và bóng dáng cô lặng lẽ tan vào khoảng không.",
  "c": "Tử Dạ là người duy nhất có thể cộng hưởng cùng Hư Không Đế Vương (chiến cơ số 13) và từng tham gia giải mã lõi của Thần Ma Dị Hình (chiến cơ số 4)."
 }
];
 const BY={};D.forEach(d=>BY[d.n]=d);
 const st=document.createElement('style');
 st.textContent='#ps307{position:fixed;inset:0;z-index:9100;display:grid;place-items:center;background:rgba(2,6,20,.68);backdrop-filter:blur(2px)}#ps307[hidden]{display:none}#ps307 .sto259-card{max-height:calc(100vh - 90px)}#ps307 .ps-c{margin:10px 0 0;padding-top:8px;border-top:1px solid rgba(111,211,255,.35);font:500 12.5px/1.5 sans-serif;color:#9fd8ff;font-style:italic}'+
 '.pl67-card .ps307{margin-top:6px;display:inline-flex;align-items:center;gap:5px;padding:5px 11px;border-radius:9px;border:1.5px solid #ffd56a;background:linear-gradient(180deg,#f0a21a,#b86a00);color:#fff;font:800 11px/1 sans-serif;letter-spacing:.04em;text-shadow:0 1px 2px #5a3000;cursor:pointer}';
 document.head.appendChild(st);
 let order=D.map(d=>d.n),k=0;
 function show(name){const i=order.indexOf(name);k=i<0?0:i;let m=document.getElementById('ps307');
  if(!m){m=document.createElement('div');m.id='ps307';m.hidden=true;
   m.innerHTML='<div class="sto259-card" role="dialog" aria-modal="true"><button class="sto259-x" aria-label="Đóng">✕</button><div class="sto259-n"></div><h3></h3><h4></h4><dl class="sto259-o"><dt>Xuất thân</dt><dd></dd><dt>Niên đại</dt><dd></dd><dt>Sở trường</dt><dd></dd><dt>Ưa / Sợ</dt><dd></dd></dl><p class="ps-b"></p><p class="ps-c"></p><div class="sto259-nav"><button class="ps-p" aria-label="Trước">‹</button><span></span><button class="ps-q" aria-label="Sau">›</button></div></div>';
   document.body.appendChild(m);m.addEventListener('click',e=>{if(e.target===m||e.target.closest('.sto259-x'))m.hidden=true;});
   m.querySelector('.ps-p').onclick=()=>paint(k-1);m.querySelector('.ps-q').onclick=()=>paint(k+1);}
  paint(k);m.hidden=false;}
 function paint(i){const m=document.getElementById('ps307');const N=D.length;k=(i+N)%N;const d=D[k];
  m.querySelector('.sto259-n').textContent='PHI CÔNG '+String(k+1).padStart(2,'0');m.querySelector('h3').textContent=d.n;m.querySelector('h4').textContent=d.t;
  const dd=m.querySelectorAll('.sto259-o dd');dd[0].textContent=d.o;dd[1].textContent=d.y;dd[2].textContent=d.s;dd[3].textContent=d.l;
  m.querySelector('.ps-b').textContent=d.b;m.querySelector('.ps-c').textContent=d.c;m.querySelector('.sto259-nav span').textContent=(k+1)+' / '+N;}
 function tick(){if(window.PSTORY307===false)return;
  for(const c of document.querySelectorAll('.pl67-card')){const h=c.querySelector('h4');if(!h)continue;
   const name=h.textContent.split('·')[0].trim();if(!BY[name])continue;
   let b=c.querySelector('.ps307');
   if(!b){b=document.createElement('button');b.type='button';b.className='ps307';b.textContent='📖 TRUYỆN';b.setAttribute('aria-label','Đọc truyện phi công');
    b.addEventListener('click',e=>{e.stopPropagation();e.preventDefault();show(b.dataset.n);});(h.parentElement||c).appendChild(b);}
   b.dataset.n=name;}}
 setInterval(tick,500);
 window.PStory307={show,data:D};
}catch(e){console.warn('PSTORY307',e);}})();
