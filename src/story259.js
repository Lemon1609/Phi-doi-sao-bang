// V259 · Câu chuyện riêng cho 13 chiến cơ (chủ dự án 13/11 11:46 "Mỗi chiến cơ sẽ có 1 câu chuyện riêng", chọn hiện ở sảnh).
//  Nút TRUYỆN ở cột phải sân khấu sảnh (đối xứng TUẦN TRA / VIỄN CHINH) → thẻ truyện của chiến cơ đang chọn, có nút ‹ › xem tàu khác.
//  Tắt: window.STORY259=false
(function(){
  const S=[
   ['Ngọn lửa không bao giờ tắt','Chiếc chiến cơ đầu tiên của Phi Đội Sao Băng, rèn trong lò plasma trạm Hỏa Tinh sau trận tập kích thiêu rụi cả hạm đội tiền tiêu. Kỹ sư tin lõi lửa của nó mang ý chí những phi công đã ngã xuống, nên mỗi lần bị bắn hạ, nó lại được dựng lên từ chính tro tàn. Khi Bạo Tẩu, đôi cánh phượng hoàng plasma bung xòe cùng dải đuôi lửa dài, thiêu cháy mọi thứ trên đường bay. Phượng Hoàng luôn bay đầu đội hình: nơi nguy hiểm nhất, cũng là nơi đồng đội nhìn thấy nó rõ nhất.'],
   ['Vũ công của bão từ','Sinh ra ở trạm nghiên cứu vùng cực hành tinh băng Borea, Cực Quang Ảo Ảnh được thiết kế để bay xuyên bão từ mà không mất tín hiệu. Hai thanh ray dọc trên lưng hứng gió mặt trời rồi nén thành những tia laser mảnh như sợi chỉ. Khi Bạo Tẩu, các dải cực quang mềm như lụa rẽ quạt ra hai bên, khiến kẻ địch thấy cả chục bóng ảo trước khi kịp khóa mục tiêu. Phi đội gọi nó là "vũ công của bầu trời".'],
   ['Mũi tên băng vĩnh cửu','X-Dực Băng Hà được đẽo từ mảnh lõi sao chổi băng vĩnh cửu rơi xuống căn cứ Lam Tuyết. Lớp giáp lạnh đến mức đạn plasma của địch chạm vào cũng đông cứng giữa không trung. Nó bay chậm nhưng gần như không thể bị hạ, mỗi phát bắn để lại vệt băng làm chậm cả đội hình đối phương. Khi Bạo Tẩu, các cụm kiếm tinh thể băng nạp đầy năng lượng vào nòng súng, xuôi về sau như một mũi tên băng khổng lồ.'],
   ['Kẻ đến từ con tàu lạ','Không ai biết Thần Ma Dị Hình được chế tạo ở đâu: Phi Đội tìm thấy nó trôi dạt trong xác một chiến hạm lạ, bốn con mắt năng lượng vẫn còn mở. Sau khi được thuần hóa, nó thành con át chủ bài đáng sợ nhất, với loạt đạn xuyên thủng mọi lớp khiên. Khi Bạo Tẩu, những lưỡi năng lượng như móng vuốt bung ra từ bốn con mắt, đôi sừng bốc lửa và ấn chú tam giác hiện lên sau lưng. Phi công đồn rằng thỉnh thoảng nó tự quay đầu về vùng trời mà nó đã đến.'],
   ['Bình Minh dẫn lối','Thự Quang được điều khiển cùng một trí tuệ nhân tạo hiền hòa tên Bình Minh, vốn được tạo ra để dẫn đường cho các đoàn tàu tị nạn. Vương miện gai trên thân là hàng trăm lăng kính bẻ ánh sáng thành những chùm đạn tán xạ phủ kín bầu trời. Khi Bạo Tẩu, nửa vành hào quang mặt trời mọc lên sau lưng, các phiến lăng kính xòe ra như đóa hoa ánh sáng. Bình Minh tin rằng trận chiến nào cũng phải kết thúc bằng một buổi sáng.'],
   ['Bảy ngày biến mất','U Linh là kết quả của một thí nghiệm lượng tử thất bại: chiến cơ cùng phi công thử nghiệm biến mất suốt bảy ngày rồi bất ngờ trở về, nửa thật nửa ảo. Từ đó nó có thể lệch pha khỏi không gian trong khoảnh khắc, để đạn địch xuyên qua như xuyên qua sương. Đạn khúc xạ lượng tử của nó bẻ cong quỹ đạo, tìm đến mục tiêu từ những góc không ai ngờ. Khi Bạo Tẩu, đôi cánh bóng ma tan thành những mảnh điểm ảnh nhiễu sóng, như thể nó đang ở hai nơi cùng lúc.'],
   ['Thanh kiếm biết bay','Ma Vương Đao Phong do một thợ rèn kiếm lừng danh của Liên Minh thiết kế như một thanh kiếm biết bay. Mỗi lưỡi giáp trên thân được mài sắc đến mức chẻ đôi được thiên thạch, loạt đạn trảm kích của nó chém thành những đường cong sáng loáng. Khi Bạo Tẩu, các phiến đao năng lượng xếp lớp như chiếc quạt mở ra hai bên, để lại những vệt chém gió vắt ngang bầu trời. Người ta nói chưa kẻ địch nào nghe tiếng "xoẹt" của nó đến lần thứ hai.'],
   ['Ngọn cờ của phi đội','Phần Thiên Chiến Chuẩn mang cờ hiệu của Phi Đội Sao Băng, luôn được giao trấn giữ những phòng tuyến cuối cùng. Thân chim săn mồi của nó chứa lò nhiệt áp mạnh đến mức nòng pháo đỏ rực sau mỗi loạt bắn. Khi Bạo Tẩu, đôi cánh lông lửa xếp tầng bừng cháy, tàn lửa vàng rơi như mưa sao băng trên chiến trường. Chỉ cần thấy ngọn lửa ấy, cả phi đội biết rằng họ chưa thua.'],
   ['Đôi mắt của thiên hà','Thiên Khung Lược Ảnh là đôi mắt của Phi Đội: một đài quan sát bay với mái vòm pha lê và hai đĩa radar trên vai, thấy hạm đội địch từ cách xa nửa thiên hà. Nó bắn song vũ, hai làn đạn đan chéo được dẫn đường bằng chính radar của mình. Khi Bạo Tẩu, hai quạt quét radar trong suốt xòe ra cùng những cung quỹ đạo hở, đánh dấu mọi mục tiêu trong tầm. Phi công của nó luôn biết trận chiến sẽ đi về đâu trước tất cả mọi người.'],
   ['Người gác cổng tinh hà','Tinh Hà Thủ Vọng canh giữ tuyến đường tinh hà, nơi các đoàn tàu buôn và tàu tị nạn đi qua mỗi ngày. Con mắt hồng ở lõi chỉ huy ba chiến cơ con bay quanh nó như một quân đoàn nhỏ. Khi Bạo Tẩu, lưới khiên lục giác mảnh và trong suốt mở ra sau hai vai, che chắn cho cả đội hình mà không che tầm nhìn. Nó chưa bao giờ bỏ lại một đồng đội nào phía sau.'],
   ['Hố đen trong lòng bàn tay','Ở lõi Thôn Tinh Chiến Cơ là một hố đen nhân tạo cỡ nắm tay, bị giam trong vòng từ trường tím. Nó nuốt đạn, nuốt mảnh vỡ, nuốt cả ánh sáng, rồi biến tất cả thành năng lượng cho loạt đạn trọng lực. Khi Bạo Tẩu, những dải xoắn ốc đứt đoạn cuộn hút về lõi, kéo kẻ địch xung quanh vào vòng xoáy. Kỹ sư luôn dặn phi công đừng nhìn quá lâu vào lõi của nó.'],
   ['Nhật ký những trận chưa xảy ra','Thời Không Lữ Khách bước ra từ một vết nứt thời gian, mang theo cuốn nhật ký bay ghi những trận chiến chưa từng xảy ra. Bộ máy đồng hồ trong thân cho nó làm chậm đạn địch và tăng tốc đạn của mình theo hai cực thời gian. Khi Bạo Tẩu, mặt đồng hồ quang học hở hiện sau lưng, các mảnh giáp pha lê đứng yên giữa không trung như thời gian bị đóng băng. Không ai biết nó đến từ quá khứ hay tương lai, kể cả chính phi công của nó.'],
   ['Phán quyết cuối cùng','Hư Không Đế Vương là chiến cơ mạnh nhất Phi Đội Sao Băng từng chế tạo, lớp giáp đen như gương phản chiếu cả bầu trời sao. Nó được dựng lên để đối đầu kẻ thù đến từ thứ nguyên khác, chỉ xuất kích khi mọi hy vọng khác đã cạn. Khi Bạo Tẩu, đôi lưỡi hái hư không viền điện tím uốn cong ra sau như vầng trăng khuyết, cắt đứt cả không gian. Khi nó bay qua, các vì sao như lặng đi chờ phán quyết.']];
  window.STORY259_DATA=S;
  // V259B · nguồn gốc, xuất xứ (chủ dự án 13/11 12:18 "Bổ sung thêm về nguồn gốc, xuất xứ"): [xuất xứ, nơi / người chế tạo, năm Tinh Lịch, lõi / vật liệu đặc biệt]
  const O=[
   ['Trạm Hỏa Tinh, tiền tuyến Liên Minh Thiên Hà','Xưởng Xích Diệm, kỹ sư trưởng Lạc Hồng Vân','Tinh Lịch 2187, chiến cơ số 1 của Phi Đội','Lõi lửa Phượng Hoàng, plasma tự tái sinh'],
   ['Trạm nghiên cứu vùng cực, hành tinh băng Borea','Viện Khí Tượng Không Gian Borea','Tinh Lịch 2191','Bộ hứng gió mặt trời song ray'],
   ['Căn cứ Lam Tuyết, vành đai sao chổi xa','Xưởng Hàn Băng của Liên Minh','Tinh Lịch 2189','Mảnh lõi sao chổi băng vĩnh cửu'],
   ['Không rõ, trục vớt từ xác chiến hạm lạ ở Tinh Vân Đen','Thuần hóa tại phòng thí nghiệm kín Hắc Thạch','Tìm thấy năm Tinh Lịch 2193','Bốn "mắt" phản ứng chưa giải mã hết'],
   ['Trạm quỹ đạo Thự Quang, quanh hành tinh Kim Tinh','Hội Hộ Tống Tị Nạn, trí tuệ nhân tạo Bình Minh','Tinh Lịch 2190','Vương miện hàng trăm lăng kính bẻ sáng'],
   ['Cơ sở ngầm Tiềm Uyên trên một tiểu hành tinh','Dự án lượng tử mật U-07','Tinh Lịch 2192, sau bảy ngày biến mất','Lõi lệch pha lượng tử'],
   ['Hành tinh thép Kiếm Tinh','Lò rèn Thiết Phong, thợ rèn Mặc Phong','Tinh Lịch 2188','Tinh thiết mài bằng bụi kim cương sao lùn'],
   ['Kỳ hạm xưởng Thiên Hỏa, Bộ Tư Lệnh Phi Đội','Bộ Tư Lệnh Phi Đội Sao Băng','Tinh Lịch 2188, nhận cờ hiệu phi đội','Lò nhiệt áp lấy từ lõi sao đỏ Thiên Hỏa'],
   ['Đài thiên văn quỹ đạo Thiên Khung','Cục Tình Báo Liên Minh','Tinh Lịch 2190','Song đĩa radar và mái vòm pha lê lượng tử'],
   ['Cảng tinh hà Thủ Vọng, cửa ngõ tuyến thương mại','Hội Thương Đoàn Tinh Hà tài trợ, xưởng cảng Thủ Vọng','Tinh Lịch 2191','Mắt chỉ huy hồng và ba chiến cơ con'],
   ['Trạm Vực Thẳm, sát rìa hố đen Hắc Uyên','Viện Nghiên Cứu Trọng Lực','Tinh Lịch 2194','Hố đen nhân tạo giam trong vòng từ trường tím'],
   ['Không rõ, bước ra từ vết nứt thời gian','Đội Khảo Cứu Thời Gian tiếp nhận','Không xác định, nhật ký bay ghi Tinh Lịch 2231','Bộ máy đồng hồ lưỡng cực'],
   ['Thủ phủ Thiên Đô của Liên Minh','Xưởng Tối Mật Đế Vương, dùng công nghệ giải mã từ Thần Ma Dị Hình','Tinh Lịch 2195, chiến cơ mới nhất','Lõi hư không, giáp gương thứ nguyên']];
  window.STORY259_ORIGIN=O;
  const N=S.length,$=s=>document.querySelector(s);
  const cur=()=>{try{if(typeof launchCraft==='number')return launchCraft;}catch{}try{return selected|0;}catch{}return 0;};
  const nameOf=i=>{try{return craftProfile(i).name;}catch{}return 'Chiến cơ '+(i+1);};
  const wpnOf=i=>{try{return Fighters28.profiles[i].weapon;}catch{}return '';};
  const BOOK='<svg viewBox="0 0 24 24"><path d="M4 5.5c2.6-1.3 5.3-1.3 8 0v13c-2.7-1.3-5.4-1.3-8 0z"/><path d="M12 5.5c2.6-1.3 5.3-1.3 8 0v13c-2.7-1.3-5.4-1.3-8 0z"/></svg>';
  let k=0;
  function show(i){k=(i+N)%N;let m=$('#sto259');if(!m){m=document.createElement('div');m.id='sto259';m.innerHTML='<div class="sto259-card" role="dialog" aria-modal="true"><button class="sto259-x" aria-label="Đóng">✕</button><div class="sto259-n"></div><h3></h3><h4></h4><dl class="sto259-o"><dt>Xuất xứ</dt><dd></dd><dt>Chế tạo</dt><dd></dd><dt>Thời điểm</dt><dd></dd><dt>Lõi</dt><dd></dd></dl><p></p><div class="sto259-nav"><button class="sto259-p" aria-label="Tàu trước">‹</button><span></span><button class="sto259-q" aria-label="Tàu sau">›</button></div></div>';
      document.body.appendChild(m);m.addEventListener('click',e=>{if(e.target===m||e.target.closest('.sto259-x'))m.hidden=true;});
      m.querySelector('.sto259-p').onclick=()=>show(k-1);m.querySelector('.sto259-q').onclick=()=>show(k+1);}
    m.querySelector('.sto259-n').textContent='CHIẾN CƠ '+String(k+1).padStart(2,'0')+(wpnOf(k)?' · '+wpnOf(k).toUpperCase():'');
    m.querySelector('h3').textContent=nameOf(k);m.querySelector('h4').textContent=S[k][0];m.querySelectorAll('.sto259-o dd').forEach((d,j)=>d.textContent=(O[k]||[])[j]||'');m.querySelector('p').textContent=S[k][1];
    m.querySelector('.sto259-nav span').textContent=(k+1)+' / '+N;m.hidden=false;}
  function ensure(){if(window.STORY259===false)return;const st=$('.h1-stage');if(!st||$('#sto259-b'))return;
    let col=st.querySelector('.l74-r');if(!col){col=document.createElement('div');col.className='l74 l74-r';st.appendChild(col);}
    const b=document.createElement('button');b.id='sto259-b';b.className='l74-b';b.style.setProperty('--lc','#ffb347');b.innerHTML='<i>'+BOOK+'</i><small>TRUYỆN</small>';
    b.setAttribute('aria-label','Câu chuyện chiến cơ');b.onclick=e=>{e.stopPropagation();show(cur());};col.appendChild(b);}
  setInterval(ensure,700);ensure();
  window.Story259={show,ensure};
})();
