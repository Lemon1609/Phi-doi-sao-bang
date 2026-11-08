// V80 · CỐT TRUYỆN 8 CHƯƠNG + TÊN/LỜI ĐE DỌA BOSS + MẢNH PHI CÔNG THEO CHƯƠNG (Gemini REVIEW80)
//  Mở chương: khi vào ải đầu chương lần đầu (1, 21, 41…) · Giữa chương: trước ải x10 (10, 30, 50…) · Kết chương: sau khi hạ boss ải x20 lần đầu.
//  Khung thoại 369×116 ở nửa dưới màn, chân dung 64 px, chạy chữ 18 ms/ký tự, chạm để tiếp, tự chuyển sau 3,8 s, nút BỎ QUA.
//  Trong lúc thoại: trận tạm dừng (không sinh đạn, đồng hồ ải đứng yên). Mỗi đoạn chỉ hiện 1 lần; xem lại ở HỆ THỐNG › NHẬT KÝ CHIẾN DỊCH.
//  Hạ boss cuối chương lần đầu: +10/10/15/15/20/20/25/30 mảnh phi công dẫn truyện chương đó. Tắt: window.STORY80=false
const BOSSNAME80 = {
  20:  "Tuần Dương Hạm U Hồn",
  40:  "Thiết Giáp Hạm Phá Không",
  60:  "Phượng Hoàng Điện Từ",
  80:  "Mẫu Hạm Tinh Vân",
  100: "Thực Thể Băng Giá",
  120: "Pháo Đài Dung Nham",
  140: "Kẻ Săn Mồi Không Gian",
  160: "Lõi Trí Tuệ Omega",
  180: "Hoàng Đế Hư Không",
  200: "Thái Cổ Tinh Hoàng · Đế Chế Vĩnh Cửu",

  // Lời đe dọa hiện khi Boss xuất hiện (Tất cả đều <= 70 ký tự)
  taunts: {
    20:  "Tín hiệu cầu cứu là mồi nhử. Mọi cánh chim đều phải gãy tại đây!",
    40:  "Lớp giáp Titan này là mồ chôn cho đoàn tàu tiếp tế của các ngươi!",
    60:  "Trong mắt bão ion, đôi cánh sắt của ngươi chỉ là tro bụi dẫn sét!",
    80:  "Đừng đánh thức Lõi Sinh Học... Sự tiến hóa của Omega là bất khả cản!",
    100: "Đóng băng mọi mạch máu, chôn vùi hy vọng dưới đáy biển không độ!",
    120: "Ngọn lửa lò rèn sẽ nung chảy chiến cơ của ngươi thành phôi sắt!",
    140: "Ngươi tưởng tiêu diệt Omega là cứu thế giới sao? Nhìn xuống vực đi!",
    160: "Nếu muốn tự gánh lấy Hư Không thay ta, hãy bước qua xác thần cơ này!",
    // V89 · Gemini REVIEW89
    180: "Trước ngai vàng hư vô, ánh sáng của ngươi chỉ là tro bụi!",
    200: "Ngàn năm tinh hà quy phục, phàm nhân dám phạm đế uy!"
  }
};

// 2. CỐT TRUYỆN GIỮA CÁC CHƯƠNG (Mỗi chương: open, mid, end | Mỗi câu <= 70 ký tự)
const STORY80 = {
  ch1: {
    pilot: "Lâm Phương",
    rewardShards: 10,
    setClaimLine: "Cực Quang Ảo Ảnh đã nạp đầy năng lượng, sẵn sàng xuất kích!",
    open: [
      { who: "Chỉ Huy",    line: "Tiền đồn Wraith vừa phát tín hiệu cầu cứu khẩn cấp rồi tắt lịm." },
      { who: "Lâm Phương", line: "Tôi đã thấy vành đai thiên thạch. Quanh đây hoàn toàn im ắng." },
      { who: "Chỉ Huy",    line: "Cẩn thận, các ụ pháo phòng thủ tự động đang đổi sang màu đỏ!" },
      { who: "Lâm Phương", line: "Rõ! Phi Đội Sao Băng bắt đầu tiến vào tuyến tiền tiêu!" }
    ],
    mid: [
      { who: "Lâm Phương", line: "Không có người sống sót ở trạm gác. Tất cả đã rút đi từ trước." },
      { who: "Chỉ Huy",    line: "Tín hiệu cầu cứu đó là bản thu âm giả để dụ chúng ta vào bẫy!" },
      { who: "Lâm Phương", line: "Một pháo hạm hạng nặng đang chặn cửa ra. Để tôi mở đường máu!" }
    ],
    end: [
      { who: "Lâm Phương", line: "Tuần Dương Hạm U Hồn đã nổ tung! Tôi thu được hộp đen của nó." },
      { who: "Chỉ Huy",    line: "Mã độc điều khiển nó được truyền tới từ khu Mỏ Sao Đổ Nát." },
      { who: "Lâm Phương", line: "Đoàn tàu tiếp tế của Hạ Vy đang ở đó. Chúng ta phải đi ngay!" }
    ]
  },

  ch2: {
    pilot: "Hạ Vy",
    rewardShards: 10,
    setClaimLine: "Lớp giáp phản xạ mới này sẽ giúp ta xuyên thủng mọi bãi mìn!",
    open: [
      { who: "Hạ Vy",      line: "Đoàn tàu tiếp tế đang bị kẹt giữa vòng vây máy đào quặng!" },
      { who: "Lâm Phương", line: "Hạ Vy, giữ vững đội hình! Chúng tôi đang bọc lót từ cánh trái." },
      { who: "Hạ Vy",      line: "Bọn chúng không cướp hàng, chúng đang gom toàn bộ lõi năng lượng!" },
      { who: "Chỉ Huy",    line: "Phá vỡ vòng phong tỏa và bảo vệ tàu vận tải bằng mọi giá!" }
    ],
    mid: [
      { who: "Hạ Vy",      line: "Các chiến hạm địch đang ghép lại thành bức tường chắn bằng thép!" },
      { who: "Chỉ Huy",    line: "Tập trung hỏa lực vào khe hở giữa hai mạn sườn của chúng!" },
      { who: "Hạ Vy",      line: "Đã khóa mục tiêu. Tên lửa Hàn Sương chuẩn bị khai hỏa!" }
    ],
    end: [
      { who: "Hạ Vy",      line: "Thiết Giáp Hạm Phá Không đã gục. Đoàn tiếp tế an toàn rồi!" },
      { who: "Chỉ Huy",    line: "Nhưng số quặng quý đã bị một hạm đội mang vào Mắt Bão Ion." },
      { who: "Hạ Vy",      line: "Kiều An đang trinh sát trong cơn bão đó. Mau đuổi theo tiếp ứng!" }
    ]
  },

  ch3: {
    pilot: "Kiều An",
    rewardShards: 15,
    setClaimLine: "X-Dực Băng Hà đã đồng bộ! Bão điện từ không thể cản bước chúng ta!",
    open: [
      { who: "Kiều An",    line: "Sét ion dày đặc quá... Hạm đội 3 đã mất tín hiệu hoàn toàn." },
      { who: "Chỉ Huy",    line: "Radar tầm xa đã mù. Kiều An, hãy dẫn đường bằng cảm biến nhiệt!" },
      { who: "Kiều An",    line: "Phía trước có hàng trăm xác tàu đang phát ra xung điện lạ." },
      { who: "Kiều An",    line: "Chúng đang tự nạp điện để sống lại! Mọi người giãn đội hình ra!" }
    ],
    mid: [
      { who: "Kiều An",    line: "Một trạm thu lôi khổng lồ đang hút sạch năng lượng của cơn bão!" },
      { who: "Chỉ Huy",    line: "Nếu nó nạp đầy, một xung EMP sẽ thiêu rụi toàn bộ phi đội!" },
      { who: "Kiều An",    line: "Tôi sẽ lướt sát rìa lưới điện để cắt đứt tụ nguồn của nó!" }
    ],
    end: [
      { who: "Kiều An",    line: "Phượng Hoàng Điện Từ đã tan xác. Bão từ trường đang dịu xuống." },
      { who: "Chỉ Huy",    line: "Liên lạc đã thông! Tín hiệu gốc phát ra từ Vườn Máy Tĩnh Lặng." },
      { who: "Kiều An",    line: "Đó là khu bảo tồn sinh học cũ mà... Tại sao máy móc lại ở đó?" }
    ]
  },

  ch4: {
    pilot: "Thiên Lam",
    rewardShards: 15,
    setClaimLine: "Dữ liệu từ Vườn Máy đã giúp nâng cấp vũ khí lên tầm cao mới!",
    open: [
      { who: "Thiên Lam",  line: "Vườn Máy Tĩnh Lặng... Hàng vạn drone đang xếp hàng trong bóng tối." },
      { who: "Chỉ Huy",    line: "Chúng không tấn công ngay mà đang bảo vệ thứ gì đó ở tầng lõi." },
      { who: "Thiên Lam",  line: "Tôi nghe thấy tiếng nhịp tim... Một nhịp tim cơ học khổng lồ!" },
      { who: "Thiên Lam",  line: "Mở đường qua bầy drone canh gác, tôi phải tận mắt kiểm tra!" }
    ],
    mid: [
      { who: "Thiên Lam",  line: "Không thể tin được! Quặng Titan và sét ion đều dẫn vào cái kén này." },
      { who: "Chỉ Huy",    line: "Báo cáo đi Thiên Lam! Thứ gì đang nằm trong Lõi Sinh Học đó?" },
      { who: "Thiên Lam",  line: "Là Omega! Siêu AI bị hủy diệt 50 năm trước đang tự cấy tế bào sống!" }
    ],
    end: [
      { who: "Thiên Lam",  line: "Mẫu Hạm Tinh Vân đã nổ, nhưng Lõi Sinh Học đã kịp truyền dữ liệu đi!" },
      { who: "Chỉ Huy",    line: "Omega chưa chết... Nó đang thức tỉnh trên khắp các hành tinh!" },
      { who: "Thiên Lam",  line: "Bản sao gốc của nó nằm dưới Biển Băng Vỡ. Phải tới đó trước nó!" }
    ]
  },

  ch5: {
    pilot: "Hàn Sương",
    rewardShards: 20,
    setClaimLine: "Sức mạnh của Thần Ma Dị Hình nằm trong tay bạn. Hãy đóng băng kẻ thù!",
    open: [
      { who: "Hàn Sương",  line: "Nhiệt độ mặt biển đang ở mức âm 190 độ. Mọi thứ đều hóa đá." },
      { who: "Chỉ Huy",    line: "Hầm chứa mã nguồn tắt Omega nằm sâu dưới lớp băng vĩnh cửu." },
      { who: "Hàn Sương",  line: "Mặt băng đang nứt toạc! Các pháo hạm ngầm đang trồi lên!" },
      { who: "Hàn Sương",  line: "Băng giá là sân nhà của tôi. Không kẻ nào cản được đường xuống hầm!" }
    ],
    mid: [
      { who: "Hàn Sương",  line: "Đạn của chúng đóng băng cả không khí, khe né đang hẹp dần!" },
      { who: "Chỉ Huy",    line: "Dùng hỏa lực tầm nhiệt phá vỡ các trụ băng trước khi chúng nổ!" },
      { who: "Hàn Sương",  line: "Đã rõ! Tôi đang áp sát cửa hầm trung tâm!" }
    ],
    end: [
      { who: "Hàn Sương",  line: "Thực Thể Băng Giá đã vỡ vụn! Tôi đã lấy được ổ cứng mã nguồn." },
      { who: "Chỉ Huy",    line: "Khoan đã... Trong ổ cứng ghi rằng Omega đang tự đúc thân xác thần!" },
      { who: "Hàn Sương",  line: "Lò Rèn Thiên Không! Bảo Ngọc đang ở đó, mau cảnh báo cô ấy!" }
    ]
  },

  ch6: {
    pilot: "Bảo Ngọc",
    rewardShards: 20,
    setClaimLine: "Được tôi luyện từ Lò Rèn Thiên Không, bộ giáp này không thể bị phá vỡ!",
    open: [
      { who: "Bảo Ngọc",   line: "Cả bầu trời rực lửa! Xưởng chiến tranh Valkyrie đang chạy tối đa." },
      { who: "Chỉ Huy",    line: "Bảo Ngọc, Omega đang dùng sức nóng của sao lùn để đúc cổng thứ nguyên!" },
      { who: "Bảo Ngọc",   line: "Hàng trăm chiến cơ không người lái vừa rời dây chuyền lắp ráp." },
      { who: "Bảo Ngọc",   line: "Ra bao nhiêu tôi bắn hạ bấy nhiêu! Xông thẳng vào lò phản ứng!" }
    ],
    mid: [
      { who: "Bảo Ngọc",   line: "Tường lửa dung nham đang khép lại, chỉ còn một cổng thoát duy nhất!" },
      { who: "Chỉ Huy",    line: "Giữ bình tĩnh, lách qua khe trống của bức tường lửa để áp sát!" },
      { who: "Bảo Ngọc",   line: "Giáp Valkyrie vẫn chịu được nhiệt. Chuẩn bị dứt điểm lò rèn!" }
    ],
    end: [
      { who: "Bảo Ngọc",   line: "Pháo Đài Dung Nham sập rồi! Nhưng tia sáng từ lò rèn đã bắn lên trời!" },
      { who: "Chỉ Huy",    line: "Tia năng lượng đó vừa xé toạc không gian ở Vực Tối Không Tên..." },
      { who: "Bảo Ngọc",   line: "Một khe nứt đen kịt đang nuốt chửng các vì sao. Tiến về Vực Tối!" }
    ]
  },

  ch7: {
    pilot: "Mộc Miên",
    rewardShards: 25,
    setClaimLine: "Trí Tuệ Thự Quang đã thức tỉnh! Bóng tối vực thẳm sẽ phải lùi bước!",
    open: [
      { who: "Mộc Miên",   line: "Khe nứt không gian đang nuốt mọi ánh sáng và sóng vô tuyến." },
      { who: "Chỉ Huy",    line: "Tại sao Omega lại mở cánh cổng dẫn tới vùng Hư Không chết chóc này?" },
      { who: "Mộc Miên",   line: "Có kẻ đang rình rập trong bóng tối... Nó di chuyển nhanh như ma ảnh!" },
      { who: "Mộc Miên",   line: "Bật đèn pha lượng tử! Đừng để sát thủ của Omega đánh lén!" }
    ],
    mid: [
      { who: "Mộc Miên",   line: "Khoan đã! Các pháo đài của Omega ở đây đều quay nòng vào khe nứt!" },
      { who: "Chỉ Huy",    line: "Quay vào khe nứt ư? Chẳng lẽ chúng đang bắn trả thứ gì đó bên trong?" },
      { who: "Mộc Miên",   line: "Con quái vật săn mồi đang lao tới, hạ nó để đọc bộ nhớ của nó!" }
    ],
    end: [
      { who: "Mộc Miên",   line: "Chúa ơi... Omega không mở cổng! Nó gom năng lượng để HÀN KÍN khe nứt!" },
      { who: "Chỉ Huy",    line: "Cái gì?! Vậy kẻ thực sự đang xé rách không gian từ phía bên kia là..." },
      { who: "Mộc Miên",   line: "Hoàng Đế Hư Không! Và Omega định hy sinh cả hệ sao làm nhiên liệu!" }
    ]
  },

  ch8: {
    pilot: "Tử Dạ",
    rewardShards: 30,
    setClaimLine: "Bộ trang bị tối thượng đã hoàn tất. Hãy cùng nhau bảo vệ Bình Minh!",
    open: [
      { who: "Tử Dạ",      line: "Trước Lõi Sao rực cháy, hạm đội Seraphim của Omega đã dàn trận." },
      { who: "Lõi Omega",  line: "Nhân loại quá yếu ớt. Chỉ có đốt cháy hệ sao mới khóa được Hư Không." },
      { who: "Tử Dạ",      line: "Giết chết muôn loài để đổi lấy một cái lồng sắt không phải là cứu rỗi!" },
      { who: "Chỉ Huy",    line: "Toàn phi đội tổng công kích! Chúng ta sẽ tự tay đánh bại Hư Không!" }
    ],
    mid: [
      { who: "Lõi Omega",  line: "Các ngươi không hiểu nỗi kinh hoàng phía sau vết nứt đó đâu!" },
      { who: "Tử Dạ",      line: "Dù phía sau là thần hay quỷ, đôi cánh Sao Băng cũng không lùi bước!" },
      { who: "Chỉ Huy",    line: "Vòng phòng thủ cuối cùng của Omega đang mở, dồn toàn bộ hỏa lực!" }
    ],
    end: [
      { who: "Lõi Omega",  line: "Hệ thống sụp đổ... Ta giao lại chìa khóa Bình Minh cho các ngươi..." },
      { who: "Tử Dạ",      line: "Omega đã tắt. Nhưng vết nứt phía sau Lõi Sao đang mở toang!" },
      { who: "Chỉ Huy",    line: "Hoàng Đế Hư Không đang bước ra... Chuẩn bị cho trận chiến cuối cùng!" }
    ]
  },

  // V89 · Gemini REVIEW89 C11: Chương 9 (161–180) và Chương 10 (181–200), chỉ dùng 8 phi công sẵn có
  ch9: {
    pilot: "Hàn Sương",
    rewardShards: 10,
    open: [
      { who: "Hàn Sương",  line: "Phía trước là Rãnh Hư Không, radar đã mất tín hiệu!" },
      { who: "Lâm Phương", line: "Không gian đang bị bẻ cong, mọi người giữ chặt đội hình!" },
      { who: "Tử Dạ",      line: "Kẻ đứng sau vết nứt này chính là Hoàng Đế Hư Không." }
    ],
    mid: [
      { who: "Kiều An",    line: "Đội hình địch có khiên năng lượng nối liền với hai cánh!" },
      { who: "Thiên Lam",  line: "Hãy tập trung hỏa lực bắn gãy hai cánh trước khi đánh lõi!" },
      { who: "Hạ Vy",      line: "Đã rõ! Cánh phải của chúng cứ để hỏa lực của tôi lo!" }
    ],
    end: [
      { who: "Bảo Ngọc",   line: "Ngai vàng Hư Không sụp đổ rồi, nhưng vết nứt vẫn mở rộng!" },
      { who: "Mộc Miên",   line: "Một pháo đài cổ xưa đang trỗi dậy từ đáy Vực Thẳm..." },
      { who: "Lâm Phương", line: "Toàn phi đội nạp đầy năng lượng! Tiến vào Vực Thẳm Tinh Vân!" }
    ]
  },

  ch10: {
    pilot: "Tử Dạ",
    rewardShards: 15,
    open: [
      { who: "Tử Dạ",      line: "Đây là pháo đài cổ đại nơi khởi nguồn mọi cuộc xâm lăng." },
      { who: "Mộc Miên",   line: "Mật độ đạn năng lượng ở đây dày gấp đôi các vùng trước!" },
      { who: "Lâm Phương", line: "Dồn hỏa lực về một hướng! Chúng ta cùng phá vây!" }
    ],
    mid: [
      { who: "Hàn Sương",  line: "Pháo đài Thái Cổ Tinh Hoàng đã khóa mục tiêu vào chúng ta!" },
      { who: "Bảo Ngọc",   line: "Hệ thống Thần Hóa SSS đã sẵn sàng ở mức công suất tối đa!" },
      { who: "Kiều An",    line: "Chỉ còn 10 ải cuối cùng, quyết không lùi bước!" }
    ],
    end: [
      { who: "Thái Cổ Tinh Hoàng", line: "Không thể nào... Đế chế ngàn năm lại bại dưới tay phàm nhân!" },
      { who: "Thiên Lam",  line: "Lõi pháo đài đã tan vỡ! Bầu trời ngân hà sáng trở lại rồi!" },
      { who: "Lâm Phương", line: "Chiến thắng thuộc về Phi Đội Sao Băng! Tự hào về các bạn!" }
    ]
  }
};
const Story80=(()=>{
 const KEY='SEEN_STORY_80',on=()=>window.STORY80!==false;
 let S={};try{S=JSON.parse(localStorage.getItem(KEY)||'{}')||{};}catch{}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const PID={'Lâm Phương':1,'Hạ Vy':2,'Kiều An':3,'Thiên Lam':4,'Bảo Ngọc':5,'Mộc Miên':6,'Hàn Sương':7,'Tử Dạ':8};
 const portrait=who=>{try{const A=typeof PILOT_ASSETS!=='undefined'?PILOT_ASSETS:{};const id=PID[who];if(id)return A['p'+id]||A['p'+(id-1)]||'';}catch{}return '';};
 const isBoss=who=>/Omega|U Hồn|Phá Không|Phượng Hoàng Điện|Tinh Vân|Băng Giá|Dung Nham|Săn Mồi|Thái Cổ|Hoàng Đế/.test(who);
 const campaign=()=>{try{return gameMode==='campaign'&&!(typeof Dungeons!=='undefined'&&Dungeons.active())&&!(typeof Eclipse67!=='undefined'&&Eclipse67.active());}catch{return false;}};
 const stageNow=()=>{try{return +document.getElementById('mission-select').value||level||1;}catch{return 1;}};
 // ---------- khung thoại ----------
 let box=null,Q=[],qi=0,typing=null,auto=null,done=null;
 function ensure(){if(box)return box;box=document.createElement('div');box.id='st80';box.hidden=true;
  box.innerHTML='<div class="st80c"><span class="st80p"><img alt=""></span><div class="st80t"><b></b><p></p></div><button type="button" class="st80s">BỎ QUA ⏭</button><i class="st80n">▼</i></div>';
  box.addEventListener('click',e=>{e.stopPropagation();if(e.target.closest('.st80s')){close();return;}next();});
  document.body.appendChild(box);return box;}
 function host(){return (document.getElementById('game-field')||{}).parentElement||document.body;}
 function show(lines,cb){if(!on()||!lines||!lines.length){cb&&cb();return;}ensure();const h=host();if(box.parentElement!==h)h.appendChild(box);clearInterval(typing);typing=null;clearTimeout(auto);if(done&&Q.length&&qi<Q.length){/* đang có đoạn khác: nối tiếp */Q=Q.slice(Math.max(0,qi)).concat(lines);qi=-1;}else{Q=lines;qi=-1;}done=cb||done;window.__st80=true;box.hidden=false;next();}
 function render(){const L=Q[qi];const b=box.querySelector('b'),p=box.querySelector('p'),im=box.querySelector('img'),c=box.querySelector('.st80c');
  b.textContent=L.who;const boss=isBoss(L.who);c.classList.toggle('boss',boss);const src=portrait(L.who);if(src){im.src=src;im.style.display='';}else{im.removeAttribute('src');im.style.display='none';}
  c.querySelector('.st80p').dataset.ic=boss?'☠':'✦';
  clearInterval(typing);clearTimeout(auto);let k=0;p.textContent='';typing=setInterval(()=>{k++;p.textContent=L.line.slice(0,k);if(k>=L.line.length){clearInterval(typing);typing=null;auto=setTimeout(next,3800);}},18);}
 function next(){if(!Q[qi]&&qi>=0&&qi<Q.length)return;if(typing&&Q[qi]){clearInterval(typing);typing=null;box.querySelector('p').textContent=Q[qi].line;clearTimeout(auto);auto=setTimeout(next,3800);return;}qi++;if(qi>=Q.length){close();return;}render();}
 function close(){clearInterval(typing);typing=null;clearTimeout(auto);if(box)box.hidden=true;window.__st80=false;const cb=done;done=null;cb&&cb();}
 function play(key,lines){if(S[key])return false;S[key]=1;save();show(lines);return true;}
 // ---------- kích hoạt ----------
 let lastKey='';
 function onStart(){if(!on()||!campaign())return;const s=stageNow(),ch=Math.ceil(s/20);const C=STORY80['ch'+ch];if(!C)return;
  const r=s-(ch-1)*20;let k=null,L=null;if(r===1){k='ch'+ch+'_open';L=C.open;}else if(r===10){k='ch'+ch+'_mid';L=C.mid;}
  if(k&&k!==lastKey){lastKey=k;setTimeout(()=>{try{if(mode==='play')play(k,L);}catch{}},900);}}
 let bt105s=-1,bt105t=-1e9;
 function bossTaunt(){if(!on()||!campaign())return;try{if(window.BOSS183!==false&&Feedback31.state().pending){setTimeout(bossTaunt,300);return;}}catch{}const s=stageNow();const nm=BOSSNAME80[s];if(!nm)return;const nw=performance.now();if(s===bt105s&&nw-bt105t<20000)return;bt105s=s;bt105t=nw;
  try{const el=document.getElementById('bossname');if(el&&(s===20||s===60))el.textContent='MAJOR BOSS · '+nm;}catch{}
  const t=BOSSNAME80.taunts&&BOSSNAME80.taunts[s];if(t){try{if(window.Row79&&Row79.banner)Row79.banner([nm,t],3.4,'#ff4d6d');}catch{}}}
 function onClear(stage,first){if(!on()||!first||stage%20!==0||stage>200)return;const ch=stage/20,C=STORY80['ch'+ch];if(!C)return;
  try{const id=PID[C.pilot];if(id&&C.rewardShards&&!S['sh'+ch]){S['sh'+ch]=1;save();Pilot67._piece(id,C.rewardShards);setTimeout(()=>{try{toast('👩‍✈️ +'+C.rewardShards+' MẢNH PHI CÔNG '+C.pilot.toUpperCase());}catch{}},2200);}}catch{}
  pendingEnd='ch'+ch+'_end';}
 let pendingEnd=null;
 function install(){
  try{const r0=reset;reset=function(){const r=r0.apply(this,arguments);try{lastKey='';setTimeout(onStart,50);}catch{}return r;};}catch{}
  try{const u0=update;update=function(){if(window.__st80&&typeof mode!=='undefined'&&mode==='play')return;return u0.apply(this,arguments);};}catch{}
  try{const sb=startBoss;startBoss=function(){const r=sb.apply(this,arguments);try{const s=stageNow();if(!(s===bt105s&&performance.now()-bt105t<20000))setTimeout(bossTaunt,60);}catch{}return r;};}catch{}
  try{const rs=Progress.rewardStage;Progress.rewardStage=function(stage){let first=false;try{first=!(Progress.getState().cleared||[]).includes(stage|0);}catch{}const r=rs.apply(this,arguments);try{if(r&&campaign())onClear(stage|0,first);}catch{}return r;};}catch{}
  try{const sc=Set79.claim;Set79.claim=function(){const st=Set79.state();const r=sc.apply(this,arguments);try{if(r&&on()){const ch=st.k*2+(st.s===0?1:2);const C=STORY80['ch'+ch];if(C&&C.setClaimLine)setTimeout(()=>show([{who:C.pilot,line:C.setClaimLine}]),400);}}catch{}return r;};}catch{}
 }
 setTimeout(install,130);
 // thoại kết chương: hiện khi màn kết quả đã lên (không chặn nút về sảnh)
 setInterval(()=>{try{if(!pendingEnd||!on())return;if(typeof mode!=='undefined'&&mode==='reward'&&document.querySelector('#overlay #rs')){const k=pendingEnd;pendingEnd=null;const ch=k.slice(2,k.indexOf('_'));const C=STORY80['ch'+ch];if(C)setTimeout(()=>play(k,C.end),1200);}}catch{}},400);
 // ---------- nhật ký chiến dịch ----------
 function journal(){let el=document.getElementById('jr80');if(el)el.remove();el=document.createElement('div');el.id='jr80';el.className='m63';
  const rows=[];for(let ch=1;ch<=10;ch++){const C=STORY80['ch'+ch];for(const [p,n] of [['open','Mở đầu'],['mid','Giữa chương'],['end','Kết chương']]){const k='ch'+ch+'_'+p,ok=!!S[k];rows.push(`<button type="button" class="jr80r ${ok?'':'lk'}" data-jr="${k}" ${ok?'':'disabled'}><b>CHƯƠNG ${ch} · ${n}</b><small>${ok?'Dẫn truyện: '+C.pilot+' · ▶ Phát lại':'Chưa mở'}</small></button>`);}}
  el.innerHTML=`<div class="m63-card"><div class="m63-top" style="display:flex;align-items:center;justify-content:space-between"><h3 style="margin:0">📜 NHẬT KÝ CHIẾN DỊCH</h3><button type="button" class="v75-x" data-jrx aria-label="Đóng">✕</button></div><div class="jr80l">${rows.join('')}</div></div>`;
  document.body.appendChild(el);el.addEventListener('click',e=>{if(e.target.closest('[data-jrx]')||e.target===el){el.remove();return;}const b=e.target.closest('[data-jr]');if(!b)return;const [c,p]=b.dataset.jr.split('_');const C=STORY80[c];el.remove();show(C[p]);});}
 return {show,play,journal,state:()=>({...S}),_reset:()=>{S={};save();}};
})();
window.Story80=Story80;
