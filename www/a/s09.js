/* GEAR_FX V3 · 480×680 · pure Canvas2D. No DOM or decoding.
   create(id,{assets,glows,targets,player,enhance,seed,light,reduced,demo})
   update(state,dt,mode), draw(ctx,state,layer). Layers:
   armor → [caller ship] → hardware → projectiles → hits → ult → ui.
   Assets are predecoded. Particle pools: standard300/light120/reduced60.
   Damage energy is divided among branches/targets; never duplicated.
   benchmark() uses this SAME update code; no synthetic hit counters.
*/
const GEAR_FX=(()=>{'use strict';const DATA=[
  {
    "id": "aegis",
    "kind": "armor",
    "tier": "base",
    "ring": 0,
    "name": "Giáp Thành Trì",
    "color": "#71dfff",
    "second": "#daf8ff",
    "trait": {
      "name": "Phá Đạn Thành Trì",
      "lv": [
        {
          "lv": 1,
          "proc": 1,
          "magnitude": 0.7875,
          "effect": "Chặn cố định 0,787 sát thương mỗi viên đạn; đặc biệt hiệu quả trước mưa đạn nhỏ."
        },
        {
          "lv": 2,
          "proc": 1,
          "magnitude": 0.871875,
          "effect": "Chặn cố định 0,872 sát thương mỗi viên đạn; đặc biệt hiệu quả trước mưa đạn nhỏ."
        },
        {
          "lv": 3,
          "proc": 1,
          "magnitude": 0.9562499999999999,
          "effect": "Chặn cố định 0,956 sát thương mỗi viên đạn; đặc biệt hiệu quả trước mưa đạn nhỏ."
        },
        {
          "lv": 4,
          "proc": 1,
          "magnitude": 1.040625,
          "effect": "Chặn cố định 1,041 sát thương mỗi viên đạn; đặc biệt hiệu quả trước mưa đạn nhỏ."
        },
        {
          "lv": 5,
          "proc": 1,
          "magnitude": 1.125,
          "effect": "Chặn cố định 1,125 sát thương mỗi viên đạn; đặc biệt hiệu quả trước mưa đạn nhỏ."
        }
      ]
    },
    "stats": {
      "hp": 100,
      "scoreBonus": 99
    },
    "normal": {
      "pattern": "orbit",
      "cadence": 1.1,
      "count": 1,
      "speed": 130,
      "pierce": false,
      "homing": 0,
      "notes": "Đặc kỹ phòng thủ vận hành liên tục; đạn phản kích phát khi đặc kỹ kích hoạt. Ngân sách năng lượng chia giữa các nhánh; ATK và cường hóa được tính trước khi chia."
    },
    "skill": {
      "name": "Kết Giới Thành Trì",
      "cooldown": 8,
      "effect": "Tăng tần suất giảm đòn và phản kích trong thời gian kỹ năng; từng lần chặn phát tấm giáp vỡ sáng.",
      "visual": "Ba phiến thành giáp cyan nối thành vòm tổ ong.",
      "duration": 2
    },
    "super": {
      "name": "BẤT ĐỘNG THÀNH LŨY",
      "effect": "Tấm giáp mở rộng, tăng gấp đôi nhịp giảm đòn và phản kích so với trạng thái thường.",
      "visual": "Vòm cyan có đường nứt tổ ong; khi chặn, các mảnh chắn bắn ngược hướng đạn.",
      "formChange": "Ba phiến lục giác gập thành vòm chắn trước mũi, mép giáp mở thêm một tầng."
    },
    "hitFx": "Ba phiến thành giáp cyan nối thành vòm tổ ong.",
    "flavor": "Rèn từ giáp trạm tiền tiêu, lõi Thành Trì giữ vững tuyến bay cuối cùng. Những phiến giáp mở ra theo hướng đạn tới.",
    "sources": [
      "Vô tận",
      "Boss",
      "Rương trang bị"
    ],
    "budget": {
      "damagePerSecond": 110,
      "defensePerMinute": 180,
      "policy": "Hiệu suất DPS/ATK ±8%; tỷ lệ đầu đạn chạm mục tiêu ≥45%. Giáp so tổng chặn+hồi trong hỗn hợp mưa đạn, đòn nặng và bào mòn."
    },
    "combat": {
      "damageScale": 0,
      "notes": "DPS thiết kế = ATK sau cường hóa × hiệu suất cố định 1,0. Đạn phải va chạm thật mới cộng sát thương; không chuẩn hóa ngược theo ATK."
    },
    "defense": {
      "type": "flat",
      "cooldown": 0
    },
    "pattern": {
      "type": "orbit",
      "count": 1,
      "spread": 0.25,
      "speed": 130,
      "cadence": 1.1,
      "pierce": false,
      "homing": 0,
      "notes": "Đặc kỹ phòng thủ vận hành liên tục; đạn phản kích phát khi đặc kỹ kích hoạt. Ngân sách năng lượng chia giữa các nhánh; ATK và cường hóa được tính trước khi chia."
    },
    "tuning": {
      "dpsIndex": 1,
      "defenseIndex": 1
    },
    "reviewStatus": {
      "completeArt": true,
      "missingArt": []
    }
  },
  {
    "id": "mirror",
    "kind": "armor",
    "tier": "base",
    "ring": 1,
    "name": "Giáp Kính Phản",
    "color": "#b1edff",
    "second": "#68cbff",
    "trait": {
      "name": "Kính Quang Phản",
      "lv": [
        {
          "lv": 1,
          "proc": 0.1085,
          "magnitude": 1,
          "effect": "10,85% cơ hội phản toàn bộ đòn trúng thành tia gương."
        },
        {
          "lv": 2,
          "proc": 0.12012499999999998,
          "magnitude": 1,
          "effect": "12,012% cơ hội phản toàn bộ đòn trúng thành tia gương."
        },
        {
          "lv": 3,
          "proc": 0.13175,
          "magnitude": 1,
          "effect": "13,175% cơ hội phản toàn bộ đòn trúng thành tia gương."
        },
        {
          "lv": 4,
          "proc": 0.143375,
          "magnitude": 1,
          "effect": "14,338% cơ hội phản toàn bộ đòn trúng thành tia gương."
        },
        {
          "lv": 5,
          "proc": 0.155,
          "magnitude": 1,
          "effect": "15,5% cơ hội phản toàn bộ đòn trúng thành tia gương."
        }
      ]
    },
    "stats": {
      "hp": 104,
      "scoreBonus": 99
    },
    "normal": {
      "pattern": "bounce",
      "cadence": 1.1,
      "count": 1,
      "speed": 130,
      "pierce": true,
      "homing": 0,
      "notes": "Đặc kỹ phòng thủ vận hành liên tục; đạn phản kích phát khi đặc kỹ kích hoạt. Ngân sách năng lượng chia giữa các nhánh; ATK và cường hóa được tính trước khi chia."
    },
    "skill": {
      "name": "Kính Quang Phản Chiếu",
      "cooldown": 9,
      "effect": "Tăng nhịp chặn và phản đạn; mỗi lần phản có vệt kính nối về mục tiêu.",
      "visual": "Sáu mặt kính nghiêng phát tia trắng băng.",
      "duration": 3
    },
    "super": {
      "name": "VẠN KÍNH PHẢN QUANG",
      "effect": "Mặt kính mở và sáng lõi; tăng gấp đôi nhịp chặn/đạn phản.",
      "visual": "Mặt kính lần lượt lật sáng, phát tia phản quang trắng xanh hướng lên.",
      "formChange": "Sáu mặt kính nghiêng mở ra thành hai vòng phản xạ so le."
    },
    "hitFx": "Sáu mặt kính nghiêng phát tia trắng băng.",
    "flavor": "Kính phản quang ghi lại tia sáng của các vì sao đã tắt. Mỗi mặt kính trả lại một đường đạn khác nhau.",
    "sources": [
      "Vô tận",
      "Boss",
      "Rương trang bị"
    ],
    "budget": {
      "damagePerSecond": 110,
      "defensePerMinute": 180,
      "policy": "Hiệu suất DPS/ATK ±8%; tỷ lệ đầu đạn chạm mục tiêu ≥45%. Giáp so tổng chặn+hồi trong hỗn hợp mưa đạn, đòn nặng và bào mòn."
    },
    "combat": {
      "damageScale": 0,
      "notes": "DPS thiết kế = ATK sau cường hóa × hiệu suất cố định 1,0. Đạn phải va chạm thật mới cộng sát thương; không chuẩn hóa ngược theo ATK."
    },
    "defense": {
      "type": "reflect",
      "cooldown": 0
    },
    "pattern": {
      "type": "bounce",
      "count": 1,
      "spread": 0.25,
      "speed": 130,
      "cadence": 1.1,
      "pierce": true,
      "homing": 0,
      "notes": "Đặc kỹ phòng thủ vận hành liên tục; đạn phản kích phát khi đặc kỹ kích hoạt. Ngân sách năng lượng chia giữa các nhánh; ATK và cường hóa được tính trước khi chia."
    },
    "tuning": {
      "dpsIndex": 1,
      "defenseIndex": 1
    },
    "reviewStatus": {
      "completeArt": true,
      "missingArt": []
    }
  },
  {
    "id": "orbital",
    "kind": "armor",
    "tier": "base",
    "ring": 2,
    "name": "Giáp Quỹ Đạo",
    "color": "#929fff",
    "second": "#e0ddff",
    "trait": {
      "name": "Tinh Vệ Hộ Thân",
      "lv": [
        {
          "lv": 1,
          "proc": 1,
          "magnitude": 3.605,
          "effect": "Vệ tinh chặn tối đa 3,605 sát thương, hồi một lượt chặn mỗi 1,2 giây."
        },
        {
          "lv": 2,
          "proc": 1,
          "magnitude": 3.99125,
          "effect": "Vệ tinh chặn tối đa 3,991 sát thương, hồi một lượt chặn mỗi 1,2 giây."
        },
        {
          "lv": 3,
          "proc": 1,
          "magnitude": 4.3775,
          "effect": "Vệ tinh chặn tối đa 4,378 sát thương, hồi một lượt chặn mỗi 1,2 giây."
        },
        {
          "lv": 4,
          "proc": 1,
          "magnitude": 4.76375,
          "effect": "Vệ tinh chặn tối đa 4,764 sát thương, hồi một lượt chặn mỗi 1,2 giây."
        },
        {
          "lv": 5,
          "proc": 1,
          "magnitude": 5.15,
          "effect": "Vệ tinh chặn tối đa 5,15 sát thương, hồi một lượt chặn mỗi 1,2 giây."
        }
      ]
    },
    "stats": {
      "hp": 108,
      "scoreBonus": 99
    },
    "normal": {
      "pattern": "orbit",
      "cadence": 1.1,
      "count": 1,
      "speed": 130,
      "pierce": false,
      "homing": 0,
      "notes": "Đặc kỹ phòng thủ vận hành liên tục; đạn phản kích phát khi đặc kỹ kích hoạt. Ngân sách năng lượng chia giữa các nhánh; ATK và cường hóa được tính trước khi chia."
    },
    "skill": {
      "name": "Hộ Vệ Quỹ Đạo",
      "cooldown": 10,
      "effect": "Tăng nhịp vệ tinh chặn đạn; vệ tinh phát đạn trả về mục tiêu đang gần nhất.",
      "visual": "Ba vệ tinh tím lam trên vòng quỹ đạo nghiêng.",
      "duration": 4
    },
    "super": {
      "name": "THIÊN VỆ TAM HOÀN",
      "effect": "Emitter quỹ đạo mở cánh và bay xa thân hơn; tăng gấp đôi nhịp hộ vệ.",
      "visual": "Vệ tinh tím chạy trên quỹ đạo mảnh, điểm chặn nổ tia lửa hình ba nhánh.",
      "formChange": "Ba vệ tinh triển khai tấm chắn bên hông và kéo dài quỹ đạo hộ vệ."
    },
    "hitFx": "Ba vệ tinh tím lam trên vòng quỹ đạo nghiêng.",
    "flavor": "Ba vệ tinh cổ vẫn xoay đúng nhịp sau hàng thế kỷ. Chúng coi mọi đường đạn xâm nhập là tín hiệu báo động.",
    "sources": [
      "Vô tận",
      "Boss",
      "Rương trang bị"
    ],
    "budget": {
      "damagePerSecond": 110,
      "defensePerMinute": 180,
      "policy": "Hiệu suất DPS/ATK ±8%; tỷ lệ đầu đạn chạm mục tiêu ≥45%. Giáp so tổng chặn+hồi trong hỗn hợp mưa đạn, đòn nặng và bào mòn."
    },
    "combat": {
      "damageScale": 0,
      "notes": "DPS thiết kế = ATK sau cường hóa × hiệu suất cố định 1,0. Đạn phải va chạm thật mới cộng sát thương; không chuẩn hóa ngược theo ATK."
    },
    "defense": {
      "type": "satellite",
      "cooldown": 1.2
    },
    "pattern": {
      "type": "orbit",
      "count": 1,
      "spread": 0.25,
      "speed": 130,
      "cadence": 1.1,
      "pierce": false,
      "homing": 0,
      "notes": "Đặc kỹ phòng thủ vận hành liên tục; đạn phản kích phát khi đặc kỹ kích hoạt. Ngân sách năng lượng chia giữa các nhánh; ATK và cường hóa được tính trước khi chia."
    },
    "tuning": {
      "dpsIndex": 1,
      "defenseIndex": 1
    },
    "reviewStatus": {
      "completeArt": true,
      "missingArt": []
    }
  },
  {
    "id": "phase",
    "kind": "armor",
    "tier": "base",
    "ring": 3,
    "name": "Giáp Dịch Pha",
    "color": "#c49aff",
    "second": "#75dfff",
    "trait": {
      "name": "Dư Ảnh Dịch Pha",
      "lv": [
        {
          "lv": 1,
          "proc": 0.2975,
          "magnitude": 1,
          "effect": "29,75% cơ hội vô hiệu đòn nặng từ 12 sát thương; đạn nhỏ đi xuyên kết giới."
        },
        {
          "lv": 2,
          "proc": 0.329375,
          "magnitude": 1,
          "effect": "32,938% cơ hội vô hiệu đòn nặng từ 12 sát thương; đạn nhỏ đi xuyên kết giới."
        },
        {
          "lv": 3,
          "proc": 0.36124999999999996,
          "magnitude": 1,
          "effect": "36,125% cơ hội vô hiệu đòn nặng từ 12 sát thương; đạn nhỏ đi xuyên kết giới."
        },
        {
          "lv": 4,
          "proc": 0.39312499999999995,
          "magnitude": 1,
          "effect": "39,312% cơ hội vô hiệu đòn nặng từ 12 sát thương; đạn nhỏ đi xuyên kết giới."
        },
        {
          "lv": 5,
          "proc": 0.425,
          "magnitude": 1,
          "effect": "42,5% cơ hội vô hiệu đòn nặng từ 12 sát thương; đạn nhỏ đi xuyên kết giới."
        }
      ]
    },
    "stats": {
      "hp": 112,
      "scoreBonus": 99
    },
    "normal": {
      "pattern": "split",
      "cadence": 1.1,
      "count": 1,
      "speed": 130,
      "pierce": false,
      "homing": 0,
      "notes": "Đặc kỹ phòng thủ vận hành liên tục; đạn phản kích phát khi đặc kỹ kích hoạt. Ngân sách năng lượng chia giữa các nhánh; ATK và cường hóa được tính trước khi chia."
    },
    "skill": {
      "name": "Ảnh Bộ Dịch Pha",
      "cooldown": 11,
      "effect": "Tăng nhịp vô hiệu đòn trúng, tạo dư ảnh dịch pha rồi phản kích.",
      "visual": "Hai cổng mảnh tím cùng dư ảnh cyan.",
      "duration": 2
    },
    "super": {
      "name": "HƯ KHÔNG VÔ ẢNH",
      "effect": "Lõi dịch pha đổi sắc, các dư ảnh tách rộng; tăng gấp đôi nhịp vô hiệu đòn trúng.",
      "visual": "Bóng tím trong suốt lệch nhịp và gợn pha quét từ đuôi lên mũi.",
      "formChange": "Hai dư ảnh tách sang hai bên; vành dịch pha mở thành cổng kép."
    },
    "hitFx": "Hai cổng mảnh tím cùng dư ảnh cyan.",
    "flavor": "Một phần thân tàu luôn nằm giữa hai lớp không gian. Dư ảnh tím rời đi trước khi viên đạn chạm giáp.",
    "sources": [
      "Vô tận",
      "Boss",
      "Rương trang bị"
    ],
    "budget": {
      "damagePerSecond": 110,
      "defensePerMinute": 180,
      "policy": "Hiệu suất DPS/ATK ±8%; tỷ lệ đầu đạn chạm mục tiêu ≥45%. Giáp so tổng chặn+hồi trong hỗn hợp mưa đạn, đòn nặng và bào mòn."
    },
    "combat": {
      "damageScale": 0,
      "notes": "DPS thiết kế = ATK sau cường hóa × hiệu suất cố định 1,0. Đạn phải va chạm thật mới cộng sát thương; không chuẩn hóa ngược theo ATK."
    },
    "defense": {
      "type": "heavy",
      "cooldown": 0
    },
    "pattern": {
      "type": "split",
      "count": 1,
      "spread": 0.25,
      "speed": 130,
      "cadence": 1.1,
      "pierce": false,
      "homing": 0,
      "notes": "Đặc kỹ phòng thủ vận hành liên tục; đạn phản kích phát khi đặc kỹ kích hoạt. Ngân sách năng lượng chia giữa các nhánh; ATK và cường hóa được tính trước khi chia."
    },
    "tuning": {
      "dpsIndex": 1,
      "defenseIndex": 1
    },
    "reviewStatus": {
      "completeArt": true,
      "missingArt": []
    }
  },
  {
    "id": "reactive",
    "kind": "armor",
    "tier": "base",
    "ring": 4,
    "name": "Giáp Long Viêm",
    "color": "#ff9461",
    "second": "#ffdf79",
    "trait": {
      "name": "Long Viêm Phản Chấn",
      "lv": [
        {
          "lv": 1,
          "proc": 1,
          "magnitude": 0.1640625,
          "effect": "Giảm 16,406% đòn từ 7 sát thương và phát phản hỏa thiêu đốt."
        },
        {
          "lv": 2,
          "proc": 1,
          "magnitude": 0.18164062499999997,
          "effect": "Giảm 18,164% đòn từ 7 sát thương và phát phản hỏa thiêu đốt."
        },
        {
          "lv": 3,
          "proc": 1,
          "magnitude": 0.19921875,
          "effect": "Giảm 19,922% đòn từ 7 sát thương và phát phản hỏa thiêu đốt."
        },
        {
          "lv": 4,
          "proc": 1,
          "magnitude": 0.21679687499999997,
          "effect": "Giảm 21,68% đòn từ 7 sát thương và phát phản hỏa thiêu đốt."
        },
        {
          "lv": 5,
          "proc": 1,
          "magnitude": 0.234375,
          "effect": "Giảm 23,438% đòn từ 7 sát thương và phát phản hỏa thiêu đốt."
        }
      ]
    },
    "stats": {
      "hp": 116,
      "scoreBonus": 99
    },
    "normal": {
      "pattern": "fan",
      "cadence": 1.1,
      "count": 1,
      "speed": 130,
      "pierce": false,
      "homing": 0,
      "notes": "Đặc kỹ phòng thủ vận hành liên tục; đạn phản kích phát khi đặc kỹ kích hoạt. Ngân sách năng lượng chia giữa các nhánh; ATK và cường hóa được tính trước khi chia."
    },
    "skill": {
      "name": "Long Viêm Phản Chấn",
      "cooldown": 12,
      "effect": "Tăng phản chấn vảy rồng; đạn phản kích gây thêm cháy theo thời gian.",
      "visual": "Vảy giáp cam mở thành hai hàm rồng cơ khí.",
      "duration": 3
    },
    "super": {
      "name": "NỘ LONG HỘ THỂ",
      "effect": "Vảy giáp dựng lên, phản kích phun đầu đạn long viêm mới và gây cháy theo thời gian.",
      "visual": "Lưỡi lửa cam cuộn dọc hai sườn, vảy tách lớp mỗi khi phản hỏa.",
      "formChange": "Vảy giáp đuôi xòe rộng thành áo choàng long viêm, lõi phản kích mở."
    },
    "hitFx": "Vảy giáp cam mở thành hai hàm rồng cơ khí.",
    "flavor": "Vảy long viêm giữ nhiệt của một lõi sao non. Càng bị ép sát, hàm giáp càng phóng ra lửa phản kích.",
    "sources": [
      "Vô tận",
      "Boss",
      "Rương trang bị"
    ],
    "budget": {
      "damagePerSecond": 110,
      "defensePerMinute": 180,
      "policy": "Hiệu suất DPS/ATK ±8%; tỷ lệ đầu đạn chạm mục tiêu ≥45%. Giáp so tổng chặn+hồi trong hỗn hợp mưa đạn, đòn nặng và bào mòn."
    },
    "combat": {
      "damageScale": 0,
      "notes": "DPS thiết kế = ATK sau cường hóa × hiệu suất cố định 1,0. Đạn phải va chạm thật mới cộng sát thương; không chuẩn hóa ngược theo ATK."
    },
    "defense": {
      "type": "counter",
      "cooldown": 0
    },
    "pattern": {
      "type": "fan",
      "count": 1,
      "spread": 0.25,
      "speed": 130,
      "cadence": 1.1,
      "pierce": false,
      "homing": 0,
      "notes": "Đặc kỹ phòng thủ vận hành liên tục; đạn phản kích phát khi đặc kỹ kích hoạt. Ngân sách năng lượng chia giữa các nhánh; ATK và cường hóa được tính trước khi chia."
    },
    "tuning": {
      "dpsIndex": 1,
      "defenseIndex": 1
    },
    "reviewStatus": {
      "completeArt": true,
      "missingArt": []
    }
  },
  {
    "id": "nanite",
    "kind": "armor",
    "tier": "base",
    "ring": 5,
    "name": "Giáp Nano",
    "color": "#75f5b4",
    "second": "#d7ffe9",
    "trait": {
      "name": "Mạch Nano Tái Tạo",
      "lv": [
        {
          "lv": 1,
          "proc": 1,
          "magnitude": 2.0999999999999996,
          "effect": "Hồi 2,1 HP/giây khi đang mất máu; không chặn trực tiếp đòn nặng.",
          "unit": "HP/giây"
        },
        {
          "lv": 2,
          "proc": 1,
          "magnitude": 2.3249999999999997,
          "effect": "Hồi 2,325 HP/giây khi đang mất máu; không chặn trực tiếp đòn nặng.",
          "unit": "HP/giây"
        },
        {
          "lv": 3,
          "proc": 1,
          "magnitude": 2.55,
          "effect": "Hồi 2,55 HP/giây khi đang mất máu; không chặn trực tiếp đòn nặng.",
          "unit": "HP/giây"
        },
        {
          "lv": 4,
          "proc": 1,
          "magnitude": 2.775,
          "effect": "Hồi 2,775 HP/giây khi đang mất máu; không chặn trực tiếp đòn nặng.",
          "unit": "HP/giây"
        },
        {
          "lv": 5,
          "proc": 1,
          "magnitude": 3,
          "effect": "Hồi 3 HP/giây khi đang mất máu; không chặn trực tiếp đòn nặng.",
          "unit": "HP/giây"
        }
      ]
    },
    "stats": {
      "hp": 120,
      "scoreBonus": 99
    },
    "normal": {
      "pattern": "homing",
      "cadence": 1.1,
      "count": 1,
      "speed": 130,
      "pierce": false,
      "homing": 0.8,
      "notes": "Đặc kỹ phòng thủ vận hành liên tục; đạn phản kích phát khi đặc kỹ kích hoạt. Ngân sách năng lượng chia giữa các nhánh; ATK và cường hóa được tính trước khi chia."
    },
    "skill": {
      "name": "Mạch Sống Tái Tạo",
      "cooldown": 13,
      "effect": "Tăng tốc hồi máu lên 1,5 lần mức thường; drone sửa chữa đồng thời phát xung phản kích.",
      "visual": "Mạch xanh lục cùng hạt nano bay về thân.",
      "duration": 4
    },
    "super": {
      "name": "VẠN MẠCH TÁI SINH",
      "effect": "Các mạch sửa chữa bung ra; hồi máu gấp đôi, xung nano phản kích dày hơn.",
      "visual": "Nút nano chạy nối mạch, đường khâu sáng lấp kín từng đoạn lưới bị vỡ.",
      "formChange": "Các mắt lưới xanh liên kết thành hai lớp mạch sửa chữa quanh tàu."
    },
    "hitFx": "Mạch xanh lục cùng hạt nano bay về thân.",
    "flavor": "Đàn nano học cách nối lại từng vết nứt trên thân tàu. Ánh xanh là dấu hiệu mạch sống vẫn đang tiếp diễn.",
    "sources": [
      "Vô tận",
      "Boss",
      "Rương trang bị"
    ],
    "budget": {
      "damagePerSecond": 110,
      "defensePerMinute": 180,
      "policy": "Hiệu suất DPS/ATK ±8%; tỷ lệ đầu đạn chạm mục tiêu ≥45%. Giáp so tổng chặn+hồi trong hỗn hợp mưa đạn, đòn nặng và bào mòn."
    },
    "combat": {
      "damageScale": 0,
      "notes": "DPS thiết kế = ATK sau cường hóa × hiệu suất cố định 1,0. Đạn phải va chạm thật mới cộng sát thương; không chuẩn hóa ngược theo ATK."
    },
    "defense": {
      "type": "heal",
      "cooldown": 0
    },
    "pattern": {
      "type": "homing",
      "count": 1,
      "spread": 0.25,
      "speed": 130,
      "cadence": 1.1,
      "pierce": false,
      "homing": 0,
      "notes": "Đặc kỹ phòng thủ vận hành liên tục; đạn phản kích phát khi đặc kỹ kích hoạt. Ngân sách năng lượng chia giữa các nhánh; ATK và cường hóa được tính trước khi chia."
    },
    "tuning": {
      "dpsIndex": 1,
      "defenseIndex": 1
    },
    "reviewStatus": {
      "completeArt": true,
      "missingArt": []
    }
  },
  {
    "id": "inferno",
    "kind": "missiles",
    "tier": "base",
    "ring": 0,
    "name": "Tên Lửa Hỏa Ngục",
    "color": "#ff8b4e",
    "second": "#ffd178",
    "trait": {
      "name": "Liệt Hỏa Bộc Phá",
      "lv": [
        {
          "lv": 1,
          "proc": 0.105,
          "magnitude": 0.8,
          "effect": "Vụ nổ gây cháy, nhả tàn lửa trên đường bay. Tỷ lệ đạn cường hóa: 10,5% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 2,
          "proc": 0.1162,
          "magnitude": 0.85,
          "effect": "Vụ nổ gây cháy, nhả tàn lửa trên đường bay. Tỷ lệ đạn cường hóa: 11,62% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 3,
          "proc": 0.1275,
          "magnitude": 0.9,
          "effect": "Vụ nổ gây cháy, nhả tàn lửa trên đường bay. Tỷ lệ đạn cường hóa: 12,75% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 4,
          "proc": 0.1387,
          "magnitude": 0.95,
          "effect": "Vụ nổ gây cháy, nhả tàn lửa trên đường bay. Tỷ lệ đạn cường hóa: 13,87% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 5,
          "proc": 0.15,
          "magnitude": 1,
          "effect": "Vụ nổ gây cháy, nhả tàn lửa trên đường bay. Tỷ lệ đạn cường hóa: 15% (đạn cường hóa gây thêm 4% sát thương)."
        }
      ]
    },
    "stats": {
      "atk": 100,
      "scoreBonus": 99
    },
    "normal": {
      "pattern": "fan",
      "cadence": 0.7,
      "count": 1,
      "speed": 210,
      "pierce": false,
      "homing": 0.9,
      "notes": "Tên lửa tản hướng rồi dồn khóa; vụ nổ chia nhiệt cho các mục tiêu và để cháy trong 2 giây. Ngân sách năng lượng chia giữa các nhánh; ATK và cường hóa được tính trước khi chia."
    },
    "skill": {
      "name": "Hỏa Ngục Liên Xạ",
      "cooldown": 8,
      "effect": "Tên lửa tản hướng rồi dồn khóa; vụ nổ chia nhiệt cho các mục tiêu và để cháy trong 2 giây.",
      "visual": "Bệ đôi miệng đỏ, vệt lửa cam và vòng dung nham.",
      "duration": 2
    },
    "super": {
      "name": "LIỆT HỎA THIÊU THIÊN",
      "effect": "Đầu đạn hai mũi lửa mới, tạo mảnh tàn hỏa dọc đường và cháy sau nổ; hardpoint mở cánh.",
      "visual": "Đầu đạn cam phun lửa rung lệch nhịp, va chạm bung cánh hỏa liên rồi tàn tro.",
      "formChange": "Nắp ống phóng mở, ray nhiệt kép trượt dài và đầu đạn tăng buồng đốt."
    },
    "hitFx": "Bệ đôi miệng đỏ, vệt lửa cam và vòng dung nham.",
    "flavor": "Được chế tạo cho những tuyến bay dài ngoài vùng dẫn đường. Vụ nổ gây cháy, nhả tàn lửa trên đường bay. Mỗi loạt khai hỏa để lại dấu năng lượng riêng trên không gian.",
    "sources": [
      "Vô tận",
      "Boss",
      "Rương trang bị"
    ],
    "budget": {
      "damagePerSecond": 100,
      "defensePerMinute": 180,
      "policy": "Hiệu suất DPS/ATK ±8%; tỷ lệ đầu đạn chạm mục tiêu ≥45%. Giáp so tổng chặn+hồi trong hỗn hợp mưa đạn, đòn nặng và bào mòn."
    },
    "combat": {
      "damageScale": 1,
      "notes": "DPS thiết kế = ATK sau cường hóa × hiệu suất cố định 1,0. Đạn phải va chạm thật mới cộng sát thương; không chuẩn hóa ngược theo ATK."
    },
    "pattern": {
      "type": "fan",
      "count": 1,
      "spread": 0.25,
      "speed": 210,
      "cadence": 0.7,
      "pierce": false,
      "homing": 0.9,
      "notes": "Tên lửa tản hướng rồi dồn khóa; vụ nổ chia nhiệt cho các mục tiêu và để cháy trong 2 giây. Ngân sách năng lượng chia giữa các nhánh; ATK và cường hóa được tính trước khi chia."
    },
    "tuning": {
      "dpsIndex": 1,
      "defenseIndex": 1
    },
    "reviewStatus": {
      "completeArt": true,
      "missingArt": []
    }
  },
  {
    "id": "cryo",
    "kind": "missiles",
    "tier": "base",
    "ring": 1,
    "name": "Tên Lửa Hàn Sương",
    "color": "#83edff",
    "second": "#e2fbff",
    "trait": {
      "name": "Hàn Sương Phá Giáp",
      "lv": [
        {
          "lv": 1,
          "proc": 0.105,
          "magnitude": 0.8,
          "effect": "Mảnh băng xuyên giáp, làm chậm mục tiêu. Tỷ lệ đạn cường hóa: 10,5% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 2,
          "proc": 0.1162,
          "magnitude": 0.85,
          "effect": "Mảnh băng xuyên giáp, làm chậm mục tiêu. Tỷ lệ đạn cường hóa: 11,62% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 3,
          "proc": 0.1275,
          "magnitude": 0.9,
          "effect": "Mảnh băng xuyên giáp, làm chậm mục tiêu. Tỷ lệ đạn cường hóa: 12,75% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 4,
          "proc": 0.1387,
          "magnitude": 0.95,
          "effect": "Mảnh băng xuyên giáp, làm chậm mục tiêu. Tỷ lệ đạn cường hóa: 13,87% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 5,
          "proc": 0.15,
          "magnitude": 1,
          "effect": "Mảnh băng xuyên giáp, làm chậm mục tiêu. Tỷ lệ đạn cường hóa: 15% (đạn cường hóa gây thêm 4% sát thương)."
        }
      ]
    },
    "stats": {
      "atk": 104,
      "scoreBonus": 99
    },
    "normal": {
      "pattern": "straight",
      "cadence": 0.7,
      "count": 2,
      "speed": 210,
      "pierce": false,
      "homing": 0.9,
      "notes": "Tạo trường băng tại vùng mục tiêu; mục tiêu trong trường bị làm chậm, tên lửa tiếp tục xuyên vào vùng băng. Ngân sách năng lượng chia giữa các nhánh; ATK và cường hóa được tính trước khi chia."
    },
    "skill": {
      "name": "Băng Phong Tề Xạ",
      "cooldown": 9,
      "effect": "Tạo trường băng tại vùng mục tiêu; mục tiêu trong trường bị làm chậm, tên lửa tiếp tục xuyên vào vùng băng.",
      "visual": "Ống phóng trắng cyan, mảnh băng lục giác.",
      "duration": 3
    },
    "super": {
      "name": "TUYỆT ĐỐI BĂNG PHONG",
      "effect": "Đầu khoan băng mở cánh; mỗi lần trúng đặt thêm trường làm chậm tại điểm nổ.",
      "visual": "Tên lửa băng xanh kéo hơi lạnh, đầu nhọn vỡ thành chùm tinh thể trên mục tiêu.",
      "formChange": "Giá phóng tách đôi, tinh thể đóng băng vươn khỏi miệng ống."
    },
    "hitFx": "Ống phóng trắng cyan, mảnh băng lục giác.",
    "flavor": "Được chế tạo cho những tuyến bay dài ngoài vùng dẫn đường. Mảnh băng xuyên giáp, làm chậm mục tiêu. Mỗi loạt khai hỏa để lại dấu năng lượng riêng trên không gian.",
    "sources": [
      "Vô tận",
      "Boss",
      "Rương trang bị"
    ],
    "budget": {
      "damagePerSecond": 104,
      "defensePerMinute": 180,
      "policy": "Hiệu suất DPS/ATK ±8%; tỷ lệ đầu đạn chạm mục tiêu ≥45%. Giáp so tổng chặn+hồi trong hỗn hợp mưa đạn, đòn nặng và bào mòn."
    },
    "combat": {
      "damageScale": 1,
      "notes": "DPS thiết kế = ATK sau cường hóa × hiệu suất cố định 1,0. Đạn phải va chạm thật mới cộng sát thương; không chuẩn hóa ngược theo ATK."
    },
    "pattern": {
      "type": "straight",
      "count": 2,
      "spread": 0.25,
      "speed": 210,
      "cadence": 0.7,
      "pierce": false,
      "homing": 0.9,
      "notes": "Tạo trường băng tại vùng mục tiêu; mục tiêu trong trường bị làm chậm, tên lửa tiếp tục xuyên vào vùng băng. Ngân sách năng lượng chia giữa các nhánh; ATK và cường hóa được tính trước khi chia."
    },
    "tuning": {
      "dpsIndex": 1,
      "defenseIndex": 1
    },
    "reviewStatus": {
      "completeArt": true,
      "missingArt": []
    }
  },
  {
    "id": "thunder",
    "kind": "missiles",
    "tier": "base",
    "ring": 2,
    "name": "Tên Lửa Lôi Kích",
    "color": "#ffe180",
    "second": "#ffffff",
    "trait": {
      "name": "Lôi Tỏa Liên Kích",
      "lv": [
        {
          "lv": 1,
          "proc": 0.105,
          "magnitude": 0.8,
          "effect": "Sét nối các mục tiêu, chia ngân sách sát thương. Tỷ lệ đạn cường hóa: 10,5% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 2,
          "proc": 0.1162,
          "magnitude": 0.85,
          "effect": "Sét nối các mục tiêu, chia ngân sách sát thương. Tỷ lệ đạn cường hóa: 11,62% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 3,
          "proc": 0.1275,
          "magnitude": 0.9,
          "effect": "Sét nối các mục tiêu, chia ngân sách sát thương. Tỷ lệ đạn cường hóa: 12,75% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 4,
          "proc": 0.1387,
          "magnitude": 0.95,
          "effect": "Sét nối các mục tiêu, chia ngân sách sát thương. Tỷ lệ đạn cường hóa: 13,87% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 5,
          "proc": 0.15,
          "magnitude": 1,
          "effect": "Sét nối các mục tiêu, chia ngân sách sát thương. Tỷ lệ đạn cường hóa: 15% (đạn cường hóa gây thêm 4% sát thương)."
        }
      ]
    },
    "stats": {
      "atk": 108,
      "scoreBonus": 99
    },
    "normal": {
      "pattern": "chain",
      "cadence": 0.7,
      "count": 2,
      "speed": 210,
      "pierce": false,
      "homing": 0.9,
      "notes": "Đầu đạn đổi góc tiếp cận rồi phóng chuỗi sét giữa các mục tiêu; năng lượng chia qua từng nhánh. Ngân sách năng lượng chia giữa các nhánh; ATK và cường hóa được tính trước khi chia."
    },
    "skill": {
      "name": "Lôi Đình Liên Tỏa",
      "cooldown": 10,
      "effect": "Đầu đạn đổi góc tiếp cận rồi phóng chuỗi sét giữa các mục tiêu; năng lượng chia qua từng nhánh.",
      "visual": "Cuộn điện vàng quanh bệ đen, tia sét phân nhánh.",
      "duration": 4
    },
    "super": {
      "name": "CỬU TIÊU LÔI KIẾP",
      "effect": "Nova lôi kích mới nối tối đa năm mục tiêu, thay cho ba mục tiêu của trạng thái thường.",
      "visual": "Hồ quang chạy giữa các vòng tụ, sét vàng nối tối đa năm mục tiêu.",
      "formChange": "Cuộn tụ mở hai bên giá phóng, điện cực vàng nối thành cung dẫn."
    },
    "hitFx": "Cuộn điện vàng quanh bệ đen, tia sét phân nhánh.",
    "flavor": "Được chế tạo cho những tuyến bay dài ngoài vùng dẫn đường. Sét nối các mục tiêu, chia ngân sách sát thương. Mỗi loạt khai hỏa để lại dấu năng lượng riêng trên không gian.",
    "sources": [
      "Vô tận",
      "Boss",
      "Rương trang bị"
    ],
    "budget": {
      "damagePerSecond": 108,
      "defensePerMinute": 180,
      "policy": "Hiệu suất DPS/ATK ±8%; tỷ lệ đầu đạn chạm mục tiêu ≥45%. Giáp so tổng chặn+hồi trong hỗn hợp mưa đạn, đòn nặng và bào mòn."
    },
    "combat": {
      "damageScale": 1,
      "notes": "DPS thiết kế = ATK sau cường hóa × hiệu suất cố định 1,0. Đạn phải va chạm thật mới cộng sát thương; không chuẩn hóa ngược theo ATK."
    },
    "pattern": {
      "type": "chain",
      "count": 2,
      "spread": 0.25,
      "speed": 210,
      "cadence": 0.7,
      "pierce": false,
      "homing": 0.9,
      "notes": "Đầu đạn đổi góc tiếp cận rồi phóng chuỗi sét giữa các mục tiêu; năng lượng chia qua từng nhánh. Ngân sách năng lượng chia giữa các nhánh; ATK và cường hóa được tính trước khi chia."
    },
    "tuning": {
      "dpsIndex": 1,
      "defenseIndex": 1
    },
    "reviewStatus": {
      "completeArt": true,
      "missingArt": []
    }
  },
  {
    "id": "singularity",
    "kind": "missiles",
    "tier": "base",
    "ring": 3,
    "name": "Ngư Lôi Hư Không",
    "color": "#c38cff",
    "second": "#efb9ff",
    "trait": {
      "name": "Hư Uyên Thôn Phệ",
      "lv": [
        {
          "lv": 1,
          "proc": 0.105,
          "magnitude": 0.8,
          "effect": "Đạn xoáy gom mục tiêu nhỏ, không kéo trùm. Tỷ lệ đạn cường hóa: 10,5% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 2,
          "proc": 0.1162,
          "magnitude": 0.85,
          "effect": "Đạn xoáy gom mục tiêu nhỏ, không kéo trùm. Tỷ lệ đạn cường hóa: 11,62% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 3,
          "proc": 0.1275,
          "magnitude": 0.9,
          "effect": "Đạn xoáy gom mục tiêu nhỏ, không kéo trùm. Tỷ lệ đạn cường hóa: 12,75% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 4,
          "proc": 0.1387,
          "magnitude": 0.95,
          "effect": "Đạn xoáy gom mục tiêu nhỏ, không kéo trùm. Tỷ lệ đạn cường hóa: 13,87% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 5,
          "proc": 0.15,
          "magnitude": 1,
          "effect": "Đạn xoáy gom mục tiêu nhỏ, không kéo trùm. Tỷ lệ đạn cường hóa: 15% (đạn cường hóa gây thêm 4% sát thương)."
        }
      ]
    },
    "stats": {
      "atk": 112,
      "scoreBonus": 99
    },
    "normal": {
      "pattern": "vortex",
      "cadence": 0.7,
      "count": 1,
      "speed": 210,
      "pierce": false,
      "homing": 0.9,
      "notes": "Đặt hai trường hấp dẫn trước tuyến bay, hút mục tiêu nhỏ và nuốt đạn địch vào tâm. Ngân sách năng lượng chia giữa các nhánh; ATK và cường hóa được tính trước khi chia."
    },
    "skill": {
      "name": "Hư Không Tụ Điểm",
      "cooldown": 11,
      "effect": "Đặt hai trường hấp dẫn trước tuyến bay, hút mục tiêu nhỏ và nuốt đạn địch vào tâm.",
      "visual": "Lõi tím đen, hai vòng hấp dẫn và đuôi khói tím.",
      "duration": 2
    },
    "super": {
      "name": "VỰC SÂU THÔN PHỆ",
      "effect": "Ngư lôi mở tâm xoáy lớn; đạn địch bị hút được chuyển thành đạn phản công.",
      "visual": "Ngư lôi tím xoay vành bồi tụ; va chạm co vào tâm rồi phóng các dải xoáy.",
      "formChange": "Khóa treo mở thành vòng gia tốc, buồng ngư lôi lộ lõi hấp dẫn."
    },
    "hitFx": "Lõi tím đen, hai vòng hấp dẫn và đuôi khói tím.",
    "flavor": "Được chế tạo cho những tuyến bay dài ngoài vùng dẫn đường. Đạn xoáy gom mục tiêu nhỏ, không kéo trùm. Mỗi loạt khai hỏa để lại dấu năng lượng riêng trên không gian.",
    "sources": [
      "Vô tận",
      "Boss",
      "Rương trang bị"
    ],
    "budget": {
      "damagePerSecond": 112,
      "defensePerMinute": 180,
      "policy": "Hiệu suất DPS/ATK ±8%; tỷ lệ đầu đạn chạm mục tiêu ≥45%. Giáp so tổng chặn+hồi trong hỗn hợp mưa đạn, đòn nặng và bào mòn."
    },
    "combat": {
      "damageScale": 1,
      "notes": "DPS thiết kế = ATK sau cường hóa × hiệu suất cố định 1,0. Đạn phải va chạm thật mới cộng sát thương; không chuẩn hóa ngược theo ATK."
    },
    "pattern": {
      "type": "vortex",
      "count": 1,
      "spread": 0.25,
      "speed": 210,
      "cadence": 0.7,
      "pierce": false,
      "homing": 0.9,
      "notes": "Đặt hai trường hấp dẫn trước tuyến bay, hút mục tiêu nhỏ và nuốt đạn địch vào tâm. Ngân sách năng lượng chia giữa các nhánh; ATK và cường hóa được tính trước khi chia."
    },
    "tuning": {
      "dpsIndex": 1,
      "defenseIndex": 1
    },
    "reviewStatus": {
      "completeArt": true,
      "missingArt": []
    }
  },
  {
    "id": "spiral",
    "kind": "missiles",
    "tier": "base",
    "ring": 4,
    "name": "Tên Lửa Xoắn Ốc",
    "color": "#6fffe0",
    "second": "#adfff1",
    "trait": {
      "name": "Song Long Truy Ảnh",
      "lv": [
        {
          "lv": 1,
          "proc": 0.105,
          "magnitude": 0.8,
          "effect": "Hai đường xoắn đuổi mục tiêu, đổi góc truy kích. Tỷ lệ đạn cường hóa: 10,5% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 2,
          "proc": 0.1162,
          "magnitude": 0.85,
          "effect": "Hai đường xoắn đuổi mục tiêu, đổi góc truy kích. Tỷ lệ đạn cường hóa: 11,62% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 3,
          "proc": 0.1275,
          "magnitude": 0.9,
          "effect": "Hai đường xoắn đuổi mục tiêu, đổi góc truy kích. Tỷ lệ đạn cường hóa: 12,75% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 4,
          "proc": 0.1387,
          "magnitude": 0.95,
          "effect": "Hai đường xoắn đuổi mục tiêu, đổi góc truy kích. Tỷ lệ đạn cường hóa: 13,87% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 5,
          "proc": 0.15,
          "magnitude": 1,
          "effect": "Hai đường xoắn đuổi mục tiêu, đổi góc truy kích. Tỷ lệ đạn cường hóa: 15% (đạn cường hóa gây thêm 4% sát thương)."
        }
      ]
    },
    "stats": {
      "atk": 116,
      "scoreBonus": 99
    },
    "normal": {
      "pattern": "spiral",
      "cadence": 0.7,
      "count": 2,
      "speed": 210,
      "pierce": false,
      "homing": 0.9,
      "notes": "Hai luồng xoắn uốn góc truy đuổi mục tiêu đang di chuyển; tăng hỏa lực trong thời gian kỹ năng. Ngân sách năng lượng chia giữa các nhánh; ATK và cường hóa được tính trước khi chia."
    },
    "skill": {
      "name": "Song Long Truy Ảnh",
      "cooldown": 12,
      "effect": "Hai luồng xoắn uốn góc truy đuổi mục tiêu đang di chuyển; tăng hỏa lực trong thời gian kỹ năng.",
      "visual": "Bệ kép xoắn turbine bạc xanh ngọc.",
      "duration": 3
    },
    "super": {
      "name": "BÍCH LONG SONG VŨ",
      "effect": "Hai thương xoắn đổi mục tiêu sau lần trúng đầu, chia năng lượng cho cả hai lượt truy đuổi.",
      "visual": "Dải ngọc lam quấn đổi pha quanh tên lửa, tách vòng truy kích khi chạm địch.",
      "formChange": "Hai ray dẫn xoắn mở nghiêng, vòi lái phụ triển khai truy kích vòng hai."
    },
    "hitFx": "Bệ kép xoắn turbine bạc xanh ngọc.",
    "flavor": "Được chế tạo cho những tuyến bay dài ngoài vùng dẫn đường. Hai đường xoắn đuổi mục tiêu, đổi góc truy kích. Mỗi loạt khai hỏa để lại dấu năng lượng riêng trên không gian.",
    "sources": [
      "Vô tận",
      "Boss",
      "Rương trang bị"
    ],
    "budget": {
      "damagePerSecond": 116,
      "defensePerMinute": 180,
      "policy": "Hiệu suất DPS/ATK ±8%; tỷ lệ đầu đạn chạm mục tiêu ≥45%. Giáp so tổng chặn+hồi trong hỗn hợp mưa đạn, đòn nặng và bào mòn."
    },
    "combat": {
      "damageScale": 1,
      "notes": "DPS thiết kế = ATK sau cường hóa × hiệu suất cố định 1,0. Đạn phải va chạm thật mới cộng sát thương; không chuẩn hóa ngược theo ATK."
    },
    "pattern": {
      "type": "spiral",
      "count": 2,
      "spread": 0.25,
      "speed": 210,
      "cadence": 0.7,
      "pierce": false,
      "homing": 0.9,
      "notes": "Hai luồng xoắn uốn góc truy đuổi mục tiêu đang di chuyển; tăng hỏa lực trong thời gian kỹ năng. Ngân sách năng lượng chia giữa các nhánh; ATK và cường hóa được tính trước khi chia."
    },
    "tuning": {
      "dpsIndex": 1,
      "defenseIndex": 1
    },
    "reviewStatus": {
      "completeArt": true,
      "missingArt": []
    }
  },
  {
    "id": "stellar",
    "kind": "missiles",
    "tier": "base",
    "ring": 5,
    "name": "Tên Lửa Thiên Tinh",
    "color": "#ffeeb4",
    "second": "#a9cfff",
    "trait": {
      "name": "Thiên Tinh Phân Liệt",
      "lv": [
        {
          "lv": 1,
          "proc": 0.105,
          "magnitude": 0.8,
          "effect": "Đầu đạn tách sao con giữa quãng bay. Tỷ lệ đạn cường hóa: 10,5% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 2,
          "proc": 0.1162,
          "magnitude": 0.85,
          "effect": "Đầu đạn tách sao con giữa quãng bay. Tỷ lệ đạn cường hóa: 11,62% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 3,
          "proc": 0.1275,
          "magnitude": 0.9,
          "effect": "Đầu đạn tách sao con giữa quãng bay. Tỷ lệ đạn cường hóa: 12,75% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 4,
          "proc": 0.1387,
          "magnitude": 0.95,
          "effect": "Đầu đạn tách sao con giữa quãng bay. Tỷ lệ đạn cường hóa: 13,87% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 5,
          "proc": 0.15,
          "magnitude": 1,
          "effect": "Đầu đạn tách sao con giữa quãng bay. Tỷ lệ đạn cường hóa: 15% (đạn cường hóa gây thêm 4% sát thương)."
        }
      ]
    },
    "stats": {
      "atk": 120,
      "scoreBonus": 99
    },
    "normal": {
      "pattern": "split",
      "cadence": 0.7,
      "count": 2,
      "speed": 210,
      "pierce": false,
      "homing": 0.9,
      "notes": "Tên lửa tách thành bốn sao con có khóa mục tiêu, thay cho ba nhánh của bắn thường. Ngân sách năng lượng chia giữa các nhánh; ATK và cường hóa được tính trước khi chia."
    },
    "skill": {
      "name": "Thiên Tinh Phân Liệt",
      "cooldown": 13,
      "effect": "Tên lửa tách thành bốn sao con có khóa mục tiêu, thay cho ba nhánh của bắn thường.",
      "visual": "Đầu phóng chóp sao vàng nhạt, đuôi sao trắng.",
      "duration": 4
    },
    "super": {
      "name": "VẠN TINH LƯU VŨ",
      "effect": "Vương miện sao tách năm nhánh khóa mục tiêu, thay cho ba nhánh thường.",
      "visual": "Sao ngà đổi góc cánh và phân thành năm vệt sao con trên đường bay.",
      "formChange": "Cụm chứa sao mở từng cánh, để lộ chùm đầu đạn phân ly."
    },
    "hitFx": "Đầu phóng chóp sao vàng nhạt, đuôi sao trắng.",
    "flavor": "Được chế tạo cho những tuyến bay dài ngoài vùng dẫn đường. Đầu đạn tách sao con giữa quãng bay. Mỗi loạt khai hỏa để lại dấu năng lượng riêng trên không gian.",
    "sources": [
      "Vô tận",
      "Boss",
      "Rương trang bị"
    ],
    "budget": {
      "damagePerSecond": 120,
      "defensePerMinute": 180,
      "policy": "Hiệu suất DPS/ATK ±8%; tỷ lệ đầu đạn chạm mục tiêu ≥45%. Giáp so tổng chặn+hồi trong hỗn hợp mưa đạn, đòn nặng và bào mòn."
    },
    "combat": {
      "damageScale": 1,
      "notes": "DPS thiết kế = ATK sau cường hóa × hiệu suất cố định 1,0. Đạn phải va chạm thật mới cộng sát thương; không chuẩn hóa ngược theo ATK."
    },
    "pattern": {
      "type": "split",
      "count": 2,
      "spread": 0.25,
      "speed": 210,
      "cadence": 0.7,
      "pierce": false,
      "homing": 0.9,
      "notes": "Tên lửa tách thành bốn sao con có khóa mục tiêu, thay cho ba nhánh của bắn thường. Ngân sách năng lượng chia giữa các nhánh; ATK và cường hóa được tính trước khi chia."
    },
    "tuning": {
      "dpsIndex": 1,
      "defenseIndex": 1
    },
    "reviewStatus": {
      "completeArt": true,
      "missingArt": []
    }
  },
  {
    "id": "rail",
    "kind": "sidearm",
    "tier": "base",
    "ring": 0,
    "name": "Pháo Điện Từ",
    "color": "#70dcff",
    "second": "#d9ffff",
    "trait": {
      "name": "Điện Từ Xuyên Tâm",
      "lv": [
        {
          "lv": 1,
          "proc": 0.105,
          "magnitude": 0.8,
          "effect": "Tia ray xuyên mục tiêu theo trục thẳng. Tỷ lệ đạn cường hóa: 10,5% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 2,
          "proc": 0.1162,
          "magnitude": 0.85,
          "effect": "Tia ray xuyên mục tiêu theo trục thẳng. Tỷ lệ đạn cường hóa: 11,62% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 3,
          "proc": 0.1275,
          "magnitude": 0.9,
          "effect": "Tia ray xuyên mục tiêu theo trục thẳng. Tỷ lệ đạn cường hóa: 12,75% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 4,
          "proc": 0.1387,
          "magnitude": 0.95,
          "effect": "Tia ray xuyên mục tiêu theo trục thẳng. Tỷ lệ đạn cường hóa: 13,87% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 5,
          "proc": 0.15,
          "magnitude": 1,
          "effect": "Tia ray xuyên mục tiêu theo trục thẳng. Tỷ lệ đạn cường hóa: 15% (đạn cường hóa gây thêm 4% sát thương)."
        }
      ]
    },
    "stats": {
      "atk": 100,
      "scoreBonus": 99
    },
    "normal": {
      "pattern": "beam",
      "cadence": 0.45,
      "count": 2,
      "speed": 210,
      "pierce": true,
      "homing": 0,
      "notes": "Tia khóa mục tiêu tích điện nhanh, đánh bốn nhịp liên tục và xuyên các mục tiêu cùng tuyến. Ngân sách năng lượng chia giữa các nhánh; ATK và cường hóa được tính trước khi chia."
    },
    "skill": {
      "name": "Xuyên Tâm Điện Pháo",
      "cooldown": 8,
      "effect": "Tia khóa mục tiêu tích điện nhanh, đánh bốn nhịp liên tục và xuyên các mục tiêu cùng tuyến.",
      "visual": "Nòng ray dài cyan, tia trắng lõi xanh.",
      "duration": 2
    },
    "super": {
      "name": "LƯỠNG CỰC PHÁ THIÊN",
      "effect": "Pod mở đại cánh, tạo bốn tuyến ray; mỗi tuyến đánh hai nhịp xuyên và dùng lõi tia mới.",
      "visual": "Hồ quang cyan chạy dọc lõi, tích sáng rồi nhả các xung ray xuyên thẳng.",
      "formChange": "Hai pod kéo dài ray điện từ, hai thanh dẫn mở thành bốn nòng."
    },
    "hitFx": "Nòng ray dài cyan, tia trắng lõi xanh.",
    "flavor": "Được chế tạo cho những tuyến bay dài ngoài vùng dẫn đường. Tia ray xuyên mục tiêu theo trục thẳng. Mỗi loạt khai hỏa để lại dấu năng lượng riêng trên không gian.",
    "sources": [
      "Vô tận",
      "Boss",
      "Rương trang bị"
    ],
    "budget": {
      "damagePerSecond": 100,
      "defensePerMinute": 180,
      "policy": "Hiệu suất DPS/ATK ±8%; tỷ lệ đầu đạn chạm mục tiêu ≥45%. Giáp so tổng chặn+hồi trong hỗn hợp mưa đạn, đòn nặng và bào mòn."
    },
    "combat": {
      "damageScale": 1,
      "notes": "DPS thiết kế = ATK sau cường hóa × hiệu suất cố định 1,0. Đạn phải va chạm thật mới cộng sát thương; không chuẩn hóa ngược theo ATK."
    },
    "pattern": {
      "type": "beam",
      "count": 2,
      "spread": 0.25,
      "speed": 210,
      "cadence": 0.45,
      "pierce": true,
      "homing": 0,
      "notes": "Tia khóa mục tiêu tích điện nhanh, đánh bốn nhịp liên tục và xuyên các mục tiêu cùng tuyến. Ngân sách năng lượng chia giữa các nhánh; ATK và cường hóa được tính trước khi chia."
    },
    "tuning": {
      "dpsIndex": 1,
      "defenseIndex": 1
    },
    "reviewStatus": {
      "completeArt": true,
      "missingArt": []
    }
  },
  {
    "id": "disc",
    "kind": "sidearm",
    "tier": "base",
    "ring": 1,
    "name": "Đĩa Nguyệt Nhận",
    "color": "#d29bff",
    "second": "#f1d7ff",
    "trait": {
      "name": "Nguyệt Nhận Hồi Hoàn",
      "lv": [
        {
          "lv": 1,
          "proc": 0.105,
          "magnitude": 0.8,
          "effect": "Lưỡi trăng bay ra rồi hồi về pod. Tỷ lệ đạn cường hóa: 10,5% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 2,
          "proc": 0.1162,
          "magnitude": 0.85,
          "effect": "Lưỡi trăng bay ra rồi hồi về pod. Tỷ lệ đạn cường hóa: 11,62% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 3,
          "proc": 0.1275,
          "magnitude": 0.9,
          "effect": "Lưỡi trăng bay ra rồi hồi về pod. Tỷ lệ đạn cường hóa: 12,75% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 4,
          "proc": 0.1387,
          "magnitude": 0.95,
          "effect": "Lưỡi trăng bay ra rồi hồi về pod. Tỷ lệ đạn cường hóa: 13,87% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 5,
          "proc": 0.15,
          "magnitude": 1,
          "effect": "Lưỡi trăng bay ra rồi hồi về pod. Tỷ lệ đạn cường hóa: 15% (đạn cường hóa gây thêm 4% sát thương)."
        }
      ]
    },
    "stats": {
      "atk": 104,
      "scoreBonus": 99
    },
    "normal": {
      "pattern": "orbit",
      "cadence": 0.45,
      "count": 2,
      "speed": 210,
      "pierce": true,
      "homing": 0.65,
      "notes": "Nguyệt nhận vòng cung phóng ra rồi quay về pod; tăng nhịp chém trong thời gian kỹ năng. Ngân sách năng lượng chia giữa các nhánh; ATK và cường hóa được tính trước khi chia."
    },
    "skill": {
      "name": "Nguyệt Luân Hồi Toàn",
      "cooldown": 9,
      "effect": "Nguyệt nhận vòng cung phóng ra rồi quay về pod; tăng nhịp chém trong thời gian kỹ năng.",
      "visual": "Lưỡi trăng tím bạc cùng vệt cong.",
      "duration": 3
    },
    "super": {
      "name": "TỬ NGUYỆT VẠN NHẬN",
      "effect": "Nguyệt nhận kép lớn phóng từ pod bung cánh, quét rộng rồi hồi về hai bên thân tàu.",
      "visual": "Nguyệt nhận tím tự quay, chém thành cung cong rồi hồi về hộ tống.",
      "formChange": "Vỏ pod mở thành cánh cung, lưỡi trăng kép trượt ra khỏi giá xoay."
    },
    "hitFx": "Lưỡi trăng tím bạc cùng vệt cong.",
    "flavor": "Được chế tạo cho những tuyến bay dài ngoài vùng dẫn đường. Lưỡi trăng bay ra rồi hồi về pod. Mỗi loạt khai hỏa để lại dấu năng lượng riêng trên không gian.",
    "sources": [
      "Vô tận",
      "Boss",
      "Rương trang bị"
    ],
    "budget": {
      "damagePerSecond": 104,
      "defensePerMinute": 180,
      "policy": "Hiệu suất DPS/ATK ±8%; tỷ lệ đầu đạn chạm mục tiêu ≥45%. Giáp so tổng chặn+hồi trong hỗn hợp mưa đạn, đòn nặng và bào mòn."
    },
    "combat": {
      "damageScale": 1,
      "notes": "DPS thiết kế = ATK sau cường hóa × hiệu suất cố định 1,0. Đạn phải va chạm thật mới cộng sát thương; không chuẩn hóa ngược theo ATK."
    },
    "pattern": {
      "type": "orbit",
      "count": 2,
      "spread": 0.25,
      "speed": 210,
      "cadence": 0.45,
      "pierce": true,
      "homing": 0.65,
      "notes": "Nguyệt nhận vòng cung phóng ra rồi quay về pod; tăng nhịp chém trong thời gian kỹ năng. Ngân sách năng lượng chia giữa các nhánh; ATK và cường hóa được tính trước khi chia."
    },
    "tuning": {
      "dpsIndex": 1,
      "defenseIndex": 1
    },
    "reviewStatus": {
      "completeArt": true,
      "missingArt": []
    }
  },
  {
    "id": "solar",
    "kind": "sidearm",
    "tier": "base",
    "ring": 2,
    "name": "Pháo Thái Dương",
    "color": "#ffaa60",
    "second": "#ffe8a1",
    "trait": {
      "name": "Nhật Hạch Bạo Liệt",
      "lv": [
        {
          "lv": 1,
          "proc": 0.105,
          "magnitude": 0.8,
          "effect": "Cầu mặt trời nổ, để vành nhiệt. Tỷ lệ đạn cường hóa: 10,5% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 2,
          "proc": 0.1162,
          "magnitude": 0.85,
          "effect": "Cầu mặt trời nổ, để vành nhiệt. Tỷ lệ đạn cường hóa: 11,62% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 3,
          "proc": 0.1275,
          "magnitude": 0.9,
          "effect": "Cầu mặt trời nổ, để vành nhiệt. Tỷ lệ đạn cường hóa: 12,75% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 4,
          "proc": 0.1387,
          "magnitude": 0.95,
          "effect": "Cầu mặt trời nổ, để vành nhiệt. Tỷ lệ đạn cường hóa: 13,87% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 5,
          "proc": 0.15,
          "magnitude": 1,
          "effect": "Cầu mặt trời nổ, để vành nhiệt. Tỷ lệ đạn cường hóa: 15% (đạn cường hóa gây thêm 4% sát thương)."
        }
      ]
    },
    "stats": {
      "atk": 108,
      "scoreBonus": 99
    },
    "normal": {
      "pattern": "straight",
      "cadence": 0.45,
      "count": 1,
      "speed": 210,
      "pierce": false,
      "homing": 0.9,
      "notes": "Cầu mặt trời quay quanh chiến cơ trước khi lao ra và nổ trên các mục tiêu. Ngân sách năng lượng chia giữa các nhánh; ATK và cường hóa được tính trước khi chia."
    },
    "skill": {
      "name": "Nhật Hạch Bạo Phát",
      "cooldown": 10,
      "effect": "Cầu mặt trời quay quanh chiến cơ trước khi lao ra và nổ trên các mục tiêu.",
      "visual": "Lõi mặt trời cam, cầu lửa có vành nhật miện.",
      "duration": 4
    },
    "super": {
      "name": "THÁI DƯƠNG LIỆT BIẾN",
      "effect": "Nhật cầu mới có vành năng lượng lớn, nổ lan trên các mục tiêu; pod mở sáu cánh.",
      "visual": "Cầu nhật viêm đổi lưỡi lửa theo nhịp, bùng vành nhật miện rồi rơi tàn.",
      "formChange": "Bốn lá tản nhiệt tách quanh lõi mặt trời; buồng cầu lửa mở hoàn toàn."
    },
    "hitFx": "Lõi mặt trời cam, cầu lửa có vành nhật miện.",
    "flavor": "Được chế tạo cho những tuyến bay dài ngoài vùng dẫn đường. Cầu mặt trời nổ, để vành nhiệt. Mỗi loạt khai hỏa để lại dấu năng lượng riêng trên không gian.",
    "sources": [
      "Vô tận",
      "Boss",
      "Rương trang bị"
    ],
    "budget": {
      "damagePerSecond": 108,
      "defensePerMinute": 180,
      "policy": "Hiệu suất DPS/ATK ±8%; tỷ lệ đầu đạn chạm mục tiêu ≥45%. Giáp so tổng chặn+hồi trong hỗn hợp mưa đạn, đòn nặng và bào mòn."
    },
    "combat": {
      "damageScale": 1,
      "notes": "DPS thiết kế = ATK sau cường hóa × hiệu suất cố định 1,0. Đạn phải va chạm thật mới cộng sát thương; không chuẩn hóa ngược theo ATK."
    },
    "pattern": {
      "type": "straight",
      "count": 1,
      "spread": 0.25,
      "speed": 210,
      "cadence": 0.45,
      "pierce": false,
      "homing": 0.9,
      "notes": "Cầu mặt trời quay quanh chiến cơ trước khi lao ra và nổ trên các mục tiêu. Ngân sách năng lượng chia giữa các nhánh; ATK và cường hóa được tính trước khi chia."
    },
    "tuning": {
      "dpsIndex": 1,
      "defenseIndex": 1
    },
    "reviewStatus": {
      "completeArt": true,
      "missingArt": []
    }
  },
  {
    "id": "gravity",
    "kind": "sidearm",
    "tier": "base",
    "ring": 3,
    "name": "Cầu Trọng Lực",
    "color": "#ef94ff",
    "second": "#ae80ff",
    "trait": {
      "name": "Trọng Vực Hội Tụ",
      "lv": [
        {
          "lv": 1,
          "proc": 0.105,
          "magnitude": 0.8,
          "effect": "Cầu hấp dẫn tụ mục tiêu về tâm xoáy. Tỷ lệ đạn cường hóa: 10,5% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 2,
          "proc": 0.1162,
          "magnitude": 0.85,
          "effect": "Cầu hấp dẫn tụ mục tiêu về tâm xoáy. Tỷ lệ đạn cường hóa: 11,62% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 3,
          "proc": 0.1275,
          "magnitude": 0.9,
          "effect": "Cầu hấp dẫn tụ mục tiêu về tâm xoáy. Tỷ lệ đạn cường hóa: 12,75% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 4,
          "proc": 0.1387,
          "magnitude": 0.95,
          "effect": "Cầu hấp dẫn tụ mục tiêu về tâm xoáy. Tỷ lệ đạn cường hóa: 13,87% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 5,
          "proc": 0.15,
          "magnitude": 1,
          "effect": "Cầu hấp dẫn tụ mục tiêu về tâm xoáy. Tỷ lệ đạn cường hóa: 15% (đạn cường hóa gây thêm 4% sát thương)."
        }
      ]
    },
    "stats": {
      "atk": 112,
      "scoreBonus": 99
    },
    "normal": {
      "pattern": "vortex",
      "cadence": 0.45,
      "count": 1,
      "speed": 210,
      "pierce": false,
      "homing": 0.9,
      "notes": "Hai tâm trọng lực được đặt trước tuyến bay, gom mục tiêu nhỏ và thu đạn địch. Ngân sách năng lượng chia giữa các nhánh; ATK và cường hóa được tính trước khi chia."
    },
    "skill": {
      "name": "Tinh Vực Dẫn Lực",
      "cooldown": 11,
      "effect": "Hai tâm trọng lực được đặt trước tuyến bay, gom mục tiêu nhỏ và thu đạn địch.",
      "visual": "Cầu tím hồng nằm trong vòng cánh hấp dẫn.",
      "duration": 2
    },
    "super": {
      "name": "TỬ VỰC NGHỊCH CHUYỂN",
      "effect": "Vòng cầu trọng lực mở ra, tâm xoáy bắt đạn địch và đổi thành xung phản công.",
      "visual": "Tay xoáy hồng luân chuyển quanh tâm rỗng, kéo mục tiêu nhỏ và hút đạn.",
      "formChange": "Vỏ cầu mở bốn hướng, vòng dẫn trọng lực tách thành hai tầng."
    },
    "hitFx": "Cầu tím hồng nằm trong vòng cánh hấp dẫn.",
    "flavor": "Được chế tạo cho những tuyến bay dài ngoài vùng dẫn đường. Cầu hấp dẫn tụ mục tiêu về tâm xoáy. Mỗi loạt khai hỏa để lại dấu năng lượng riêng trên không gian.",
    "sources": [
      "Vô tận",
      "Boss",
      "Rương trang bị"
    ],
    "budget": {
      "damagePerSecond": 112,
      "defensePerMinute": 180,
      "policy": "Hiệu suất DPS/ATK ±8%; tỷ lệ đầu đạn chạm mục tiêu ≥45%. Giáp so tổng chặn+hồi trong hỗn hợp mưa đạn, đòn nặng và bào mòn."
    },
    "combat": {
      "damageScale": 1,
      "notes": "DPS thiết kế = ATK sau cường hóa × hiệu suất cố định 1,0. Đạn phải va chạm thật mới cộng sát thương; không chuẩn hóa ngược theo ATK."
    },
    "pattern": {
      "type": "vortex",
      "count": 1,
      "spread": 0.25,
      "speed": 210,
      "cadence": 0.45,
      "pierce": false,
      "homing": 0.9,
      "notes": "Hai tâm trọng lực được đặt trước tuyến bay, gom mục tiêu nhỏ và thu đạn địch. Ngân sách năng lượng chia giữa các nhánh; ATK và cường hóa được tính trước khi chia."
    },
    "tuning": {
      "dpsIndex": 1,
      "defenseIndex": 1
    },
    "reviewStatus": {
      "completeArt": true,
      "missingArt": []
    }
  },
  {
    "id": "ricochet",
    "kind": "sidearm",
    "tier": "base",
    "ring": 4,
    "name": "Pháo Lục Lăng",
    "color": "#8affb8",
    "second": "#e0ffb2",
    "trait": {
      "name": "Lục Lăng Chiết Xạ",
      "lv": [
        {
          "lv": 1,
          "proc": 0.105,
          "magnitude": 0.8,
          "effect": "Đạn khúc xạ nảy biên rồi khóa lại mục tiêu. Tỷ lệ đạn cường hóa: 10,5% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 2,
          "proc": 0.1162,
          "magnitude": 0.85,
          "effect": "Đạn khúc xạ nảy biên rồi khóa lại mục tiêu. Tỷ lệ đạn cường hóa: 11,62% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 3,
          "proc": 0.1275,
          "magnitude": 0.9,
          "effect": "Đạn khúc xạ nảy biên rồi khóa lại mục tiêu. Tỷ lệ đạn cường hóa: 12,75% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 4,
          "proc": 0.1387,
          "magnitude": 0.95,
          "effect": "Đạn khúc xạ nảy biên rồi khóa lại mục tiêu. Tỷ lệ đạn cường hóa: 13,87% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 5,
          "proc": 0.15,
          "magnitude": 1,
          "effect": "Đạn khúc xạ nảy biên rồi khóa lại mục tiêu. Tỷ lệ đạn cường hóa: 15% (đạn cường hóa gây thêm 4% sát thương)."
        }
      ]
    },
    "stats": {
      "atk": 116,
      "scoreBonus": 99
    },
    "normal": {
      "pattern": "bounce",
      "cadence": 0.45,
      "count": 2,
      "speed": 210,
      "pierce": false,
      "homing": 0.9,
      "notes": "Đạn lục lăng bật hướng ở biên rồi khóa lại mục tiêu bằng đoạn gãy khúc. Ngân sách năng lượng chia giữa các nhánh; ATK và cường hóa được tính trước khi chia."
    },
    "skill": {
      "name": "Lục Lăng Liên Phản",
      "cooldown": 12,
      "effect": "Đạn lục lăng bật hướng ở biên rồi khóa lại mục tiêu bằng đoạn gãy khúc.",
      "visual": "Thân lục giác xanh lục, tia gãy khúc.",
      "duration": 3
    },
    "super": {
      "name": "VẠN CHIẾT LĂNG QUANG",
      "effect": "Đạn lục lăng mới bẻ góc liên tiếp trước khi khóa mục tiêu, pod bung các mặt phản xạ.",
      "visual": "Tinh thể xanh xoay mặt, nảy theo đường gấp khúc trước khi khóa đích.",
      "formChange": "Sáu phiến lăng kính xoay lệch, giá phóng mở đường dẫn khúc xạ."
    },
    "hitFx": "Thân lục giác xanh lục, tia gãy khúc.",
    "flavor": "Được chế tạo cho những tuyến bay dài ngoài vùng dẫn đường. Đạn khúc xạ nảy biên rồi khóa lại mục tiêu. Mỗi loạt khai hỏa để lại dấu năng lượng riêng trên không gian.",
    "sources": [
      "Vô tận",
      "Boss",
      "Rương trang bị"
    ],
    "budget": {
      "damagePerSecond": 116,
      "defensePerMinute": 180,
      "policy": "Hiệu suất DPS/ATK ±8%; tỷ lệ đầu đạn chạm mục tiêu ≥45%. Giáp so tổng chặn+hồi trong hỗn hợp mưa đạn, đòn nặng và bào mòn."
    },
    "combat": {
      "damageScale": 1,
      "notes": "DPS thiết kế = ATK sau cường hóa × hiệu suất cố định 1,0. Đạn phải va chạm thật mới cộng sát thương; không chuẩn hóa ngược theo ATK."
    },
    "pattern": {
      "type": "bounce",
      "count": 2,
      "spread": 0.25,
      "speed": 210,
      "cadence": 0.45,
      "pierce": false,
      "homing": 0.9,
      "notes": "Đạn lục lăng bật hướng ở biên rồi khóa lại mục tiêu bằng đoạn gãy khúc. Ngân sách năng lượng chia giữa các nhánh; ATK và cường hóa được tính trước khi chia."
    },
    "tuning": {
      "dpsIndex": 1,
      "defenseIndex": 1
    },
    "reviewStatus": {
      "completeArt": true,
      "missingArt": []
    }
  },
  {
    "id": "prism",
    "kind": "sidearm",
    "tier": "base",
    "ring": 5,
    "name": "Quang Pháo Hàn Băng",
    "color": "#9eeeff",
    "second": "#d9d5ff",
    "trait": {
      "name": "Hàn Tinh Quang Mạc",
      "lv": [
        {
          "lv": 1,
          "proc": 0.105,
          "magnitude": 0.8,
          "effect": "Phiến tinh thể làm chậm và vỡ thành mảnh nhỏ. Tỷ lệ đạn cường hóa: 10,5% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 2,
          "proc": 0.1162,
          "magnitude": 0.85,
          "effect": "Phiến tinh thể làm chậm và vỡ thành mảnh nhỏ. Tỷ lệ đạn cường hóa: 11,62% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 3,
          "proc": 0.1275,
          "magnitude": 0.9,
          "effect": "Phiến tinh thể làm chậm và vỡ thành mảnh nhỏ. Tỷ lệ đạn cường hóa: 12,75% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 4,
          "proc": 0.1387,
          "magnitude": 0.95,
          "effect": "Phiến tinh thể làm chậm và vỡ thành mảnh nhỏ. Tỷ lệ đạn cường hóa: 13,87% (đạn cường hóa gây thêm 4% sát thương)."
        },
        {
          "lv": 5,
          "proc": 0.15,
          "magnitude": 1,
          "effect": "Phiến tinh thể làm chậm và vỡ thành mảnh nhỏ. Tỷ lệ đạn cường hóa: 15% (đạn cường hóa gây thêm 4% sát thương)."
        }
      ]
    },
    "stats": {
      "atk": 120,
      "scoreBonus": 99
    },
    "normal": {
      "pattern": "fan",
      "cadence": 0.45,
      "count": 3,
      "speed": 210,
      "pierce": false,
      "homing": 0.9,
      "notes": "Tạo trường hàn tinh làm chậm vùng mục tiêu, các mũi băng tiếp tục tỏa quạt vào trận địa. Ngân sách năng lượng chia giữa các nhánh; ATK và cường hóa được tính trước khi chia."
    },
    "skill": {
      "name": "Hàn Tinh Quang Trận",
      "cooldown": 13,
      "effect": "Tạo trường hàn tinh làm chậm vùng mục tiêu, các mũi băng tiếp tục tỏa quạt vào trận địa.",
      "visual": "Cụm tinh thể cyan tím nhạt, tia băng tán góc.",
      "duration": 4
    },
    "super": {
      "name": "CỰC QUANG BĂNG VŨ",
      "effect": "Phiến băng mới chuyển mục tiêu sau lần trúng đầu, để trường hàn tinh ở điểm nổ.",
      "visual": "Mũi băng xanh nhạt đổi mặt tinh thể, vỡ thành kim tuyết để lại vùng chậm.",
      "formChange": "Cụm tinh thể mở thành quạt băng, lõi pháo lộ đường dẫn hàn quang."
    },
    "hitFx": "Cụm tinh thể cyan tím nhạt, tia băng tán góc.",
    "flavor": "Được chế tạo cho những tuyến bay dài ngoài vùng dẫn đường. Phiến tinh thể làm chậm và vỡ thành mảnh nhỏ. Mỗi loạt khai hỏa để lại dấu năng lượng riêng trên không gian.",
    "sources": [
      "Vô tận",
      "Boss",
      "Rương trang bị"
    ],
    "budget": {
      "damagePerSecond": 120,
      "defensePerMinute": 180,
      "policy": "Hiệu suất DPS/ATK ±8%; tỷ lệ đầu đạn chạm mục tiêu ≥45%. Giáp so tổng chặn+hồi trong hỗn hợp mưa đạn, đòn nặng và bào mòn."
    },
    "combat": {
      "damageScale": 1,
      "notes": "DPS thiết kế = ATK sau cường hóa × hiệu suất cố định 1,0. Đạn phải va chạm thật mới cộng sát thương; không chuẩn hóa ngược theo ATK."
    },
    "pattern": {
      "type": "fan",
      "count": 3,
      "spread": 0.25,
      "speed": 210,
      "cadence": 0.45,
      "pierce": false,
      "homing": 0.9,
      "notes": "Tạo trường hàn tinh làm chậm vùng mục tiêu, các mũi băng tiếp tục tỏa quạt vào trận địa. Ngân sách năng lượng chia giữa các nhánh; ATK và cường hóa được tính trước khi chia."
    },
    "tuning": {
      "dpsIndex": 1,
      "defenseIndex": 1
    },
    "reviewStatus": {
      "completeArt": true,
      "missingArt": []
    }
  },
  {
    "id": "sss_aegis_mirror",
    "kind": "armor",
    "tier": "sss",
    "ring": 0,
    "name": "Thành Kính Thiên Vệ",
    "color": "#71dfff",
    "second": "#b1edff",
    "trait": {
      "name": "Phá Đạn Thành Trì",
      "lv": [
        {
          "lv": 1,
          "proc": 0.21,
          "magnitude": 0.8,
          "effect": "30% cơ hội giảm một nửa sát thương đòn trúng."
        },
        {
          "lv": 2,
          "proc": 0.2325,
          "magnitude": 0.85,
          "effect": "30% cơ hội giảm một nửa sát thương đòn trúng."
        },
        {
          "lv": 3,
          "proc": 0.255,
          "magnitude": 0.9,
          "effect": "30% cơ hội giảm một nửa sát thương đòn trúng."
        },
        {
          "lv": 4,
          "proc": 0.2775,
          "magnitude": 0.95,
          "effect": "30% cơ hội giảm một nửa sát thương đòn trúng."
        },
        {
          "lv": 5,
          "proc": 0.3,
          "magnitude": 1,
          "effect": "30% cơ hội giảm một nửa sát thương đòn trúng."
        }
      ]
    },
    "traits": [
      {
        "name": "Phá Đạn Thành Trì",
        "lv": [
          {
            "lv": 1,
            "proc": 1,
            "magnitude": 0.7875,
            "effect": "Chặn cố định 0,787 sát thương mỗi viên đạn; đặc biệt hiệu quả trước mưa đạn nhỏ."
          },
          {
            "lv": 2,
            "proc": 1,
            "magnitude": 0.871875,
            "effect": "Chặn cố định 0,872 sát thương mỗi viên đạn; đặc biệt hiệu quả trước mưa đạn nhỏ."
          },
          {
            "lv": 3,
            "proc": 1,
            "magnitude": 0.9562499999999999,
            "effect": "Chặn cố định 0,956 sát thương mỗi viên đạn; đặc biệt hiệu quả trước mưa đạn nhỏ."
          },
          {
            "lv": 4,
            "proc": 1,
            "magnitude": 1.040625,
            "effect": "Chặn cố định 1,041 sát thương mỗi viên đạn; đặc biệt hiệu quả trước mưa đạn nhỏ."
          },
          {
            "lv": 5,
            "proc": 1,
            "magnitude": 1.125,
            "effect": "Chặn cố định 1,125 sát thương mỗi viên đạn; đặc biệt hiệu quả trước mưa đạn nhỏ."
          }
        ]
      },
      {
        "name": "Kính Quang Phản",
        "lv": [
          {
            "lv": 1,
            "proc": 0.1085,
            "magnitude": 1,
            "effect": "10,85% cơ hội phản toàn bộ đòn trúng thành tia gương."
          },
          {
            "lv": 2,
            "proc": 0.12012499999999998,
            "magnitude": 1,
            "effect": "12,012% cơ hội phản toàn bộ đòn trúng thành tia gương."
          },
          {
            "lv": 3,
            "proc": 0.13175,
            "magnitude": 1,
            "effect": "13,175% cơ hội phản toàn bộ đòn trúng thành tia gương."
          },
          {
            "lv": 4,
            "proc": 0.143375,
            "magnitude": 1,
            "effect": "14,338% cơ hội phản toàn bộ đòn trúng thành tia gương."
          },
          {
            "lv": 5,
            "proc": 0.155,
            "magnitude": 1,
            "effect": "15,5% cơ hội phản toàn bộ đòn trúng thành tia gương."
          }
        ]
      }
    ],
    "stats": {
      "hp": 122.4,
      "scoreBonus": 124
    },
    "normal": {
      "pattern": "orbit",
      "cadence": 1.1,
      "count": 3,
      "speed": 130,
      "pierce": false,
      "homing": 0,
      "notes": "Chặn và phá đạn trong cung phía trước trong 2 giây. Đơn vị: spread độ, speed px/giây, cadence giây; số đếm là tổng hai pod với tàu con. Kết hợp Kính Quang Phản."
    },
    "skill": {
      "name": "Thiên Thành Kính Trận",
      "cooldown": 12,
      "duration": 3,
      "effect": "Tăng tần suất giảm đòn và phản kích trong thời gian kỹ năng; từng lần chặn phát tấm giáp vỡ sáng. Tăng nhịp chặn và phản đạn; mỗi lần phản có vệt kính nối về mục tiêu.",
      "visual": "Hai cơ chế phối hợp trong một nhịp khai hỏa."
    },
    "super": {
      "name": "Vạn Kính Thiên Bích",
      "effect": "Tấm giáp mở rộng, tăng gấp đôi nhịp giảm đòn và phản kích so với trạng thái thường. Mặt kính mở và sáng lõi; tăng gấp đôi nhịp chặn/đạn phản.",
      "visual": "Vòm cyan có đường nứt tổ ong; khi chặn, các mảnh chắn bắn ngược hướng đạn. Mặt kính lần lượt lật sáng, phát tia phản quang trắng xanh hướng lên.",
      "formChange": "Ba phiến lục giác gập thành vòm chắn trước mũi, mép giáp mở thêm một tầng. Sáu mặt kính nghiêng mở ra thành hai vòng phản xạ so le."
    },
    "max": {
      "formChange": "Biến hình 0,35 giây: mở các bản lề, trải cánh quang và đổi màu lõi.",
      "effect": "Tấm giáp mở rộng, tăng gấp đôi nhịp giảm đòn và phản kích so với trạng thái thường. Mặt kính mở và sáng lõi; tăng gấp đôi nhịp chặn/đạn phản."
    },
    "ult": {
      "name": "THIÊN THÀNH VẠN KÍNH",
      "duration": 3.6,
      "effect": "Làn sóng xóa đạn sau bước tụ lực; hai cơ chế Phá Đạn Thành Trì và Kính Quang Phản cùng trình diễn trên toàn màn.",
      "visual": "Vòm lục giác khổng lồ ghép từ sáu phiến kính, từng mặt phóng một tia phản quang lên trên.",
      "choreography": "Vòm lục giác khổng lồ ghép từ sáu phiến kính, từng mặt phóng một tia phản quang lên trên.",
      "layers": [
        "sss_aegis_mirror_ult_a",
        "sss_aegis_mirror_ult_b"
      ],
      "framesPerLayer": 2
    },
    "parents": [
      "aegis",
      "mirror"
    ],
    "bonus": 0.35,
    "hitFx": "Ba phiến thành giáp cyan nối thành vòm tổ ong. + Sáu mặt kính nghiêng phát tia trắng băng.",
    "flavor": "Hai lõi cộng hưởng Phá Đạn Thành Trì và Kính Quang Phản nối thành một hệ chiến đấu. Không thành phần nào bị mất đi sau nghi lễ.",
    "sources": [
      "Hợp thể"
    ],
    "budget": {
      "damagePerSecond": 160,
      "defensePerMinute": 234,
      "policy": "Hiệu suất DPS/ATK ±8%; tỷ lệ đầu đạn chạm mục tiêu ≥45%. Giáp so tổng chặn+hồi trong hỗn hợp mưa đạn, đòn nặng và bào mòn."
    },
    "oldId": "sss_aegis_mirror",
    "combat": {
      "damageScale": 0,
      "notes": "DPS thiết kế = ATK sau cường hóa × hiệu suất cố định 1,0. Đạn phải va chạm thật mới cộng sát thương; không chuẩn hóa ngược theo ATK.",
      "defensePolicy": "Mỗi đặc kỹ cha mẹ dùng hệ số 0,65; tổng sát thương chặn không vượt đòn nhận. Hồi máu chỉ tính phần HP thực sự hồi."
    },
    "tuning": {
      "dpsIndex": 1.35,
      "defenseIndex": 1.3
    },
    "reviewStatus": {
      "completeArt": true,
      "missingArt": []
    }
  },
  {
    "id": "sss_mirror_orbital",
    "kind": "armor",
    "tier": "sss",
    "ring": 1,
    "name": "Kính Hoàn Tinh Chủ",
    "color": "#b1edff",
    "second": "#929fff",
    "trait": {
      "name": "Kính Quang Phản",
      "lv": [
        {
          "lv": 1,
          "proc": 0.105,
          "magnitude": 0.8,
          "effect": "15% cơ hội chặn đòn và phản đạn về mục tiêu."
        },
        {
          "lv": 2,
          "proc": 0.1162,
          "magnitude": 0.85,
          "effect": "15% cơ hội chặn đòn và phản đạn về mục tiêu."
        },
        {
          "lv": 3,
          "proc": 0.1275,
          "magnitude": 0.9,
          "effect": "15% cơ hội chặn đòn và phản đạn về mục tiêu."
        },
        {
          "lv": 4,
          "proc": 0.1387,
          "magnitude": 0.95,
          "effect": "15% cơ hội chặn đòn và phản đạn về mục tiêu."
        },
        {
          "lv": 5,
          "proc": 0.15,
          "magnitude": 1,
          "effect": "15% cơ hội chặn đòn và phản đạn về mục tiêu."
        }
      ]
    },
    "traits": [
      {
        "name": "Kính Quang Phản",
        "lv": [
          {
            "lv": 1,
            "proc": 0.1085,
            "magnitude": 1,
            "effect": "10,85% cơ hội phản toàn bộ đòn trúng thành tia gương."
          },
          {
            "lv": 2,
            "proc": 0.12012499999999998,
            "magnitude": 1,
            "effect": "12,012% cơ hội phản toàn bộ đòn trúng thành tia gương."
          },
          {
            "lv": 3,
            "proc": 0.13175,
            "magnitude": 1,
            "effect": "13,175% cơ hội phản toàn bộ đòn trúng thành tia gương."
          },
          {
            "lv": 4,
            "proc": 0.143375,
            "magnitude": 1,
            "effect": "14,338% cơ hội phản toàn bộ đòn trúng thành tia gương."
          },
          {
            "lv": 5,
            "proc": 0.155,
            "magnitude": 1,
            "effect": "15,5% cơ hội phản toàn bộ đòn trúng thành tia gương."
          }
        ]
      },
      {
        "name": "Tinh Vệ Hộ Thân",
        "lv": [
          {
            "lv": 1,
            "proc": 1,
            "magnitude": 3.605,
            "effect": "Vệ tinh chặn tối đa 3,605 sát thương, hồi một lượt chặn mỗi 1,2 giây."
          },
          {
            "lv": 2,
            "proc": 1,
            "magnitude": 3.99125,
            "effect": "Vệ tinh chặn tối đa 3,991 sát thương, hồi một lượt chặn mỗi 1,2 giây."
          },
          {
            "lv": 3,
            "proc": 1,
            "magnitude": 4.3775,
            "effect": "Vệ tinh chặn tối đa 4,378 sát thương, hồi một lượt chặn mỗi 1,2 giây."
          },
          {
            "lv": 4,
            "proc": 1,
            "magnitude": 4.76375,
            "effect": "Vệ tinh chặn tối đa 4,764 sát thương, hồi một lượt chặn mỗi 1,2 giây."
          },
          {
            "lv": 5,
            "proc": 1,
            "magnitude": 5.15,
            "effect": "Vệ tinh chặn tối đa 5,15 sát thương, hồi một lượt chặn mỗi 1,2 giây."
          }
        ]
      }
    ],
    "stats": {
      "hp": 127.2,
      "scoreBonus": 124
    },
    "normal": {
      "pattern": "bounce",
      "cadence": 1.1,
      "count": 6,
      "speed": 130,
      "pierce": true,
      "homing": 0,
      "notes": "Phản lại 6 viên đạn địch thành tia nhắm mục tiêu trong 2 giây. Đơn vị: spread độ, speed px/giây, cadence giây; số đếm là tổng hai pod với tàu con. Kết hợp Tinh Vệ Hộ Thân."
    },
    "skill": {
      "name": "Tinh Hoàn Chiếu Kính",
      "cooldown": 12,
      "duration": 3,
      "effect": "Tăng nhịp chặn và phản đạn; mỗi lần phản có vệt kính nối về mục tiêu. Tăng nhịp vệ tinh chặn đạn; vệ tinh phát đạn trả về mục tiêu đang gần nhất.",
      "visual": "Hai cơ chế phối hợp trong một nhịp khai hỏa."
    },
    "super": {
      "name": "Thiên Luân Kính Vực",
      "effect": "Mặt kính mở và sáng lõi; tăng gấp đôi nhịp chặn/đạn phản. Emitter quỹ đạo mở cánh và bay xa thân hơn; tăng gấp đôi nhịp hộ vệ.",
      "visual": "Mặt kính lần lượt lật sáng, phát tia phản quang trắng xanh hướng lên. Vệ tinh tím chạy trên quỹ đạo mảnh, điểm chặn nổ tia lửa hình ba nhánh.",
      "formChange": "Sáu mặt kính nghiêng mở ra thành hai vòng phản xạ so le. Ba vệ tinh triển khai tấm chắn bên hông và kéo dài quỹ đạo hộ vệ."
    },
    "max": {
      "formChange": "Biến hình 0,35 giây: mở các bản lề, trải cánh quang và đổi màu lõi.",
      "effect": "Mặt kính mở và sáng lõi; tăng gấp đôi nhịp chặn/đạn phản. Emitter quỹ đạo mở cánh và bay xa thân hơn; tăng gấp đôi nhịp hộ vệ."
    },
    "ult": {
      "name": "VẠN KÍNH TINH HÀ",
      "duration": 3.6,
      "effect": "Làn sóng xóa đạn sau bước tụ lực; hai cơ chế Kính Quang Phản và Tinh Vệ Hộ Thân cùng trình diễn trên toàn màn.",
      "visual": "Vệ tinh gương chạy quanh quỹ đạo rộng, ba tia sáng nảy liên tiếp giữa các mặt kính.",
      "choreography": "Vệ tinh gương chạy quanh quỹ đạo rộng, ba tia sáng nảy liên tiếp giữa các mặt kính.",
      "layers": [
        "sss_mirror_orbital_ult_a",
        "sss_mirror_orbital_ult_b"
      ],
      "framesPerLayer": 2
    },
    "parents": [
      "mirror",
      "orbital"
    ],
    "bonus": 0.35,
    "hitFx": "Sáu mặt kính nghiêng phát tia trắng băng. + Ba vệ tinh tím lam trên vòng quỹ đạo nghiêng.",
    "flavor": "Hai lõi cộng hưởng Kính Quang Phản và Tinh Vệ Hộ Thân nối thành một hệ chiến đấu. Không thành phần nào bị mất đi sau nghi lễ.",
    "sources": [
      "Hợp thể"
    ],
    "budget": {
      "damagePerSecond": 160,
      "defensePerMinute": 234,
      "policy": "Hiệu suất DPS/ATK ±8%; tỷ lệ đầu đạn chạm mục tiêu ≥45%. Giáp so tổng chặn+hồi trong hỗn hợp mưa đạn, đòn nặng và bào mòn."
    },
    "oldId": null,
    "combat": {
      "damageScale": 0,
      "notes": "DPS thiết kế = ATK sau cường hóa × hiệu suất cố định 1,0. Đạn phải va chạm thật mới cộng sát thương; không chuẩn hóa ngược theo ATK.",
      "defensePolicy": "Mỗi đặc kỹ cha mẹ dùng hệ số 0,65; tổng sát thương chặn không vượt đòn nhận. Hồi máu chỉ tính phần HP thực sự hồi."
    },
    "tuning": {
      "dpsIndex": 1.35,
      "defenseIndex": 1.3
    },
    "reviewStatus": {
      "completeArt": true,
      "missingArt": []
    }
  },
  {
    "id": "sss_orbital_phase",
    "kind": "armor",
    "tier": "sss",
    "ring": 2,
    "name": "Hư Không Tinh Vệ",
    "color": "#929fff",
    "second": "#c49aff",
    "trait": {
      "name": "Tinh Vệ Hộ Thân",
      "lv": [
        {
          "lv": 1,
          "proc": 0.105,
          "magnitude": 0.8,
          "effect": "Vệ tinh chặn một phần đạn trên quỹ đạo."
        },
        {
          "lv": 2,
          "proc": 0.1162,
          "magnitude": 0.85,
          "effect": "Vệ tinh chặn một phần đạn trên quỹ đạo."
        },
        {
          "lv": 3,
          "proc": 0.1275,
          "magnitude": 0.9,
          "effect": "Vệ tinh chặn một phần đạn trên quỹ đạo."
        },
        {
          "lv": 4,
          "proc": 0.1387,
          "magnitude": 0.95,
          "effect": "Vệ tinh chặn một phần đạn trên quỹ đạo."
        },
        {
          "lv": 5,
          "proc": 0.15,
          "magnitude": 1,
          "effect": "Vệ tinh chặn một phần đạn trên quỹ đạo."
        }
      ]
    },
    "traits": [
      {
        "name": "Tinh Vệ Hộ Thân",
        "lv": [
          {
            "lv": 1,
            "proc": 1,
            "magnitude": 3.605,
            "effect": "Vệ tinh chặn tối đa 3,605 sát thương, hồi một lượt chặn mỗi 1,2 giây."
          },
          {
            "lv": 2,
            "proc": 1,
            "magnitude": 3.99125,
            "effect": "Vệ tinh chặn tối đa 3,991 sát thương, hồi một lượt chặn mỗi 1,2 giây."
          },
          {
            "lv": 3,
            "proc": 1,
            "magnitude": 4.3775,
            "effect": "Vệ tinh chặn tối đa 4,378 sát thương, hồi một lượt chặn mỗi 1,2 giây."
          },
          {
            "lv": 4,
            "proc": 1,
            "magnitude": 4.76375,
            "effect": "Vệ tinh chặn tối đa 4,764 sát thương, hồi một lượt chặn mỗi 1,2 giây."
          },
          {
            "lv": 5,
            "proc": 1,
            "magnitude": 5.15,
            "effect": "Vệ tinh chặn tối đa 5,15 sát thương, hồi một lượt chặn mỗi 1,2 giây."
          }
        ]
      },
      {
        "name": "Dư Ảnh Dịch Pha",
        "lv": [
          {
            "lv": 1,
            "proc": 0.2975,
            "magnitude": 1,
            "effect": "29,75% cơ hội vô hiệu đòn nặng từ 12 sát thương; đạn nhỏ đi xuyên kết giới."
          },
          {
            "lv": 2,
            "proc": 0.329375,
            "magnitude": 1,
            "effect": "32,938% cơ hội vô hiệu đòn nặng từ 12 sát thương; đạn nhỏ đi xuyên kết giới."
          },
          {
            "lv": 3,
            "proc": 0.36124999999999996,
            "magnitude": 1,
            "effect": "36,125% cơ hội vô hiệu đòn nặng từ 12 sát thương; đạn nhỏ đi xuyên kết giới."
          },
          {
            "lv": 4,
            "proc": 0.39312499999999995,
            "magnitude": 1,
            "effect": "39,312% cơ hội vô hiệu đòn nặng từ 12 sát thương; đạn nhỏ đi xuyên kết giới."
          },
          {
            "lv": 5,
            "proc": 0.425,
            "magnitude": 1,
            "effect": "42,5% cơ hội vô hiệu đòn nặng từ 12 sát thương; đạn nhỏ đi xuyên kết giới."
          }
        ]
      }
    ],
    "stats": {
      "hp": 132,
      "scoreBonus": 124
    },
    "normal": {
      "pattern": "orbit",
      "cadence": 1.1,
      "count": 3,
      "speed": 130,
      "pierce": false,
      "homing": 0,
      "notes": "Ba vệ tinh quay quanh thân, chặn đạn và bắn trả khi chạm. Đơn vị: spread độ, speed px/giây, cadence giây; số đếm là tổng hai pod với tàu con. Kết hợp Dư Ảnh Dịch Pha."
    },
    "skill": {
      "name": "Hư Tinh Dịch Ảnh",
      "cooldown": 12,
      "duration": 3,
      "effect": "Tăng nhịp vệ tinh chặn đạn; vệ tinh phát đạn trả về mục tiêu đang gần nhất. Tăng nhịp vô hiệu đòn trúng, tạo dư ảnh dịch pha rồi phản kích.",
      "visual": "Hai cơ chế phối hợp trong một nhịp khai hỏa."
    },
    "super": {
      "name": "Vạn Tượng Tinh Môn",
      "effect": "Emitter quỹ đạo mở cánh và bay xa thân hơn; tăng gấp đôi nhịp hộ vệ. Lõi dịch pha đổi sắc, các dư ảnh tách rộng; tăng gấp đôi nhịp vô hiệu đòn trúng.",
      "visual": "Vệ tinh tím chạy trên quỹ đạo mảnh, điểm chặn nổ tia lửa hình ba nhánh. Bóng tím trong suốt lệch nhịp và gợn pha quét từ đuôi lên mũi.",
      "formChange": "Ba vệ tinh triển khai tấm chắn bên hông và kéo dài quỹ đạo hộ vệ. Hai dư ảnh tách sang hai bên; vành dịch pha mở thành cổng kép."
    },
    "max": {
      "formChange": "Biến hình 0,35 giây: mở các bản lề, trải cánh quang và đổi màu lõi.",
      "effect": "Emitter quỹ đạo mở cánh và bay xa thân hơn; tăng gấp đôi nhịp hộ vệ. Lõi dịch pha đổi sắc, các dư ảnh tách rộng; tăng gấp đôi nhịp vô hiệu đòn trúng."
    },
    "ult": {
      "name": "VÔ ẢNH TINH HOÀN",
      "duration": 3.6,
      "effect": "Làn sóng xóa đạn sau bước tụ lực; hai cơ chế Tinh Vệ Hộ Thân và Dư Ảnh Dịch Pha cùng trình diễn trên toàn màn.",
      "visual": "Ba hộ tinh dịch chuyển xuyên hai cổng tím ở hai bên, để lại dư ảnh và chặn mưa đạn.",
      "choreography": "Ba hộ tinh dịch chuyển xuyên hai cổng tím ở hai bên, để lại dư ảnh và chặn mưa đạn.",
      "layers": [
        "sss_orbital_phase_ult_a",
        "sss_orbital_phase_ult_b"
      ],
      "framesPerLayer": 2
    },
    "parents": [
      "orbital",
      "phase"
    ],
    "bonus": 0.35,
    "hitFx": "Ba vệ tinh tím lam trên vòng quỹ đạo nghiêng. + Hai cổng mảnh tím cùng dư ảnh cyan.",
    "flavor": "Hai lõi cộng hưởng Tinh Vệ Hộ Thân và Dư Ảnh Dịch Pha nối thành một hệ chiến đấu. Không thành phần nào bị mất đi sau nghi lễ.",
    "sources": [
      "Hợp thể"
    ],
    "budget": {
      "damagePerSecond": 160,
      "defensePerMinute": 234,
      "policy": "Hiệu suất DPS/ATK ±8%; tỷ lệ đầu đạn chạm mục tiêu ≥45%. Giáp so tổng chặn+hồi trong hỗn hợp mưa đạn, đòn nặng và bào mòn."
    },
    "oldId": "sss_orbital_phase",
    "combat": {
      "damageScale": 0,
      "notes": "DPS thiết kế = ATK sau cường hóa × hiệu suất cố định 1,0. Đạn phải va chạm thật mới cộng sát thương; không chuẩn hóa ngược theo ATK.",
      "defensePolicy": "Mỗi đặc kỹ cha mẹ dùng hệ số 0,65; tổng sát thương chặn không vượt đòn nhận. Hồi máu chỉ tính phần HP thực sự hồi."
    },
    "tuning": {
      "dpsIndex": 1.35,
      "defenseIndex": 1.3
    },
    "reviewStatus": {
      "completeArt": true,
      "missingArt": []
    }
  },
  {
    "id": "sss_phase_reactive",
    "kind": "armor",
    "tier": "sss",
    "ring": 3,
    "name": "Huyễn Long Viêm Đế",
    "color": "#c49aff",
    "second": "#ff9461",
    "trait": {
      "name": "Dư Ảnh Dịch Pha",
      "lv": [
        {
          "lv": 1,
          "proc": 0.105,
          "magnitude": 0.8,
          "effect": "15% cơ hội dịch pha, vô hiệu đòn trúng."
        },
        {
          "lv": 2,
          "proc": 0.1162,
          "magnitude": 0.85,
          "effect": "15% cơ hội dịch pha, vô hiệu đòn trúng."
        },
        {
          "lv": 3,
          "proc": 0.1275,
          "magnitude": 0.9,
          "effect": "15% cơ hội dịch pha, vô hiệu đòn trúng."
        },
        {
          "lv": 4,
          "proc": 0.1387,
          "magnitude": 0.95,
          "effect": "15% cơ hội dịch pha, vô hiệu đòn trúng."
        },
        {
          "lv": 5,
          "proc": 0.15,
          "magnitude": 1,
          "effect": "15% cơ hội dịch pha, vô hiệu đòn trúng."
        }
      ]
    },
    "traits": [
      {
        "name": "Dư Ảnh Dịch Pha",
        "lv": [
          {
            "lv": 1,
            "proc": 0.2975,
            "magnitude": 1,
            "effect": "29,75% cơ hội vô hiệu đòn nặng từ 12 sát thương; đạn nhỏ đi xuyên kết giới."
          },
          {
            "lv": 2,
            "proc": 0.329375,
            "magnitude": 1,
            "effect": "32,938% cơ hội vô hiệu đòn nặng từ 12 sát thương; đạn nhỏ đi xuyên kết giới."
          },
          {
            "lv": 3,
            "proc": 0.36124999999999996,
            "magnitude": 1,
            "effect": "36,125% cơ hội vô hiệu đòn nặng từ 12 sát thương; đạn nhỏ đi xuyên kết giới."
          },
          {
            "lv": 4,
            "proc": 0.39312499999999995,
            "magnitude": 1,
            "effect": "39,312% cơ hội vô hiệu đòn nặng từ 12 sát thương; đạn nhỏ đi xuyên kết giới."
          },
          {
            "lv": 5,
            "proc": 0.425,
            "magnitude": 1,
            "effect": "42,5% cơ hội vô hiệu đòn nặng từ 12 sát thương; đạn nhỏ đi xuyên kết giới."
          }
        ]
      },
      {
        "name": "Long Viêm Phản Chấn",
        "lv": [
          {
            "lv": 1,
            "proc": 1,
            "magnitude": 0.1640625,
            "effect": "Giảm 16,406% đòn từ 7 sát thương và phát phản hỏa thiêu đốt."
          },
          {
            "lv": 2,
            "proc": 1,
            "magnitude": 0.18164062499999997,
            "effect": "Giảm 18,164% đòn từ 7 sát thương và phát phản hỏa thiêu đốt."
          },
          {
            "lv": 3,
            "proc": 1,
            "magnitude": 0.19921875,
            "effect": "Giảm 19,922% đòn từ 7 sát thương và phát phản hỏa thiêu đốt."
          },
          {
            "lv": 4,
            "proc": 1,
            "magnitude": 0.21679687499999997,
            "effect": "Giảm 21,68% đòn từ 7 sát thương và phát phản hỏa thiêu đốt."
          },
          {
            "lv": 5,
            "proc": 1,
            "magnitude": 0.234375,
            "effect": "Giảm 23,438% đòn từ 7 sát thương và phát phản hỏa thiêu đốt."
          }
        ]
      }
    ],
    "stats": {
      "hp": 136.8,
      "scoreBonus": 124
    },
    "normal": {
      "pattern": "split",
      "cadence": 1.1,
      "count": 2,
      "speed": 130,
      "pierce": false,
      "homing": 0,
      "notes": "Miễn va chạm 0,7 giây, để lại hai ảnh phản kích; không tự dịch chuyển người chơi. Đơn vị: spread độ, speed px/giây, cadence giây; số đếm là tổng hai pod với tàu con. Kết hợp Long Viêm Phản Chấn."
    },
    "skill": {
      "name": "Huyễn Long Phá Giới",
      "cooldown": 12,
      "duration": 3,
      "effect": "Tăng nhịp vô hiệu đòn trúng, tạo dư ảnh dịch pha rồi phản kích. Tăng phản chấn vảy rồng; đạn phản kích gây thêm cháy theo thời gian.",
      "visual": "Hai cơ chế phối hợp trong một nhịp khai hỏa."
    },
    "super": {
      "name": "Long Viêm Huyễn Vực",
      "effect": "Lõi dịch pha đổi sắc, các dư ảnh tách rộng; tăng gấp đôi nhịp vô hiệu đòn trúng. Vảy giáp dựng lên, phản kích phun đầu đạn long viêm mới và gây cháy theo thời gian.",
      "visual": "Bóng tím trong suốt lệch nhịp và gợn pha quét từ đuôi lên mũi. Lưỡi lửa cam cuộn dọc hai sườn, vảy tách lớp mỗi khi phản hỏa.",
      "formChange": "Hai dư ảnh tách sang hai bên; vành dịch pha mở thành cổng kép. Vảy giáp đuôi xòe rộng thành áo choàng long viêm, lõi phản kích mở."
    },
    "max": {
      "formChange": "Biến hình 0,35 giây: mở các bản lề, trải cánh quang và đổi màu lõi.",
      "effect": "Lõi dịch pha đổi sắc, các dư ảnh tách rộng; tăng gấp đôi nhịp vô hiệu đòn trúng. Vảy giáp dựng lên, phản kích phun đầu đạn long viêm mới và gây cháy theo thời gian."
    },
    "ult": {
      "name": "HƯ LONG PHẦN THIÊN",
      "duration": 3.6,
      "effect": "Làn sóng xóa đạn sau bước tụ lực; hai cơ chế Dư Ảnh Dịch Pha và Long Viêm Phản Chấn cùng trình diễn trên toàn màn.",
      "visual": "Long viêm xuyên cổng dịch pha chéo màn hình, hai bóng rồng tới sau tiếp tục phản kích.",
      "choreography": "Long viêm xuyên cổng dịch pha chéo màn hình, hai bóng rồng tới sau tiếp tục phản kích.",
      "layers": [
        "sss_phase_reactive_ult_a",
        "sss_phase_reactive_ult_b"
      ],
      "framesPerLayer": 2
    },
    "parents": [
      "phase",
      "reactive"
    ],
    "bonus": 0.35,
    "hitFx": "Hai cổng mảnh tím cùng dư ảnh cyan. + Vảy giáp cam mở thành hai hàm rồng cơ khí.",
    "flavor": "Hai lõi cộng hưởng Dư Ảnh Dịch Pha và Long Viêm Phản Chấn nối thành một hệ chiến đấu. Không thành phần nào bị mất đi sau nghi lễ.",
    "sources": [
      "Hợp thể"
    ],
    "budget": {
      "damagePerSecond": 160,
      "defensePerMinute": 234,
      "policy": "Hiệu suất DPS/ATK ±8%; tỷ lệ đầu đạn chạm mục tiêu ≥45%. Giáp so tổng chặn+hồi trong hỗn hợp mưa đạn, đòn nặng và bào mòn."
    },
    "oldId": null,
    "combat": {
      "damageScale": 0,
      "notes": "DPS thiết kế = ATK sau cường hóa × hiệu suất cố định 1,0. Đạn phải va chạm thật mới cộng sát thương; không chuẩn hóa ngược theo ATK.",
      "defensePolicy": "Mỗi đặc kỹ cha mẹ dùng hệ số 0,65; tổng sát thương chặn không vượt đòn nhận. Hồi máu chỉ tính phần HP thực sự hồi."
    },
    "tuning": {
      "dpsIndex": 1.35,
      "defenseIndex": 1.3
    },
    "reviewStatus": {
      "completeArt": true,
      "missingArt": []
    }
  },
  {
    "id": "sss_reactive_nanite",
    "kind": "armor",
    "tier": "sss",
    "ring": 4,
    "name": "Long Mạch Tái Sinh",
    "color": "#ff9461",
    "second": "#75f5b4",
    "trait": {
      "name": "Long Viêm Phản Chấn",
      "lv": [
        {
          "lv": 1,
          "proc": 0.105,
          "magnitude": 0.8,
          "effect": "Chuyển một phần sát thương thành phản hỏa và đốt."
        },
        {
          "lv": 2,
          "proc": 0.1162,
          "magnitude": 0.85,
          "effect": "Chuyển một phần sát thương thành phản hỏa và đốt."
        },
        {
          "lv": 3,
          "proc": 0.1275,
          "magnitude": 0.9,
          "effect": "Chuyển một phần sát thương thành phản hỏa và đốt."
        },
        {
          "lv": 4,
          "proc": 0.1387,
          "magnitude": 0.95,
          "effect": "Chuyển một phần sát thương thành phản hỏa và đốt."
        },
        {
          "lv": 5,
          "proc": 0.15,
          "magnitude": 1,
          "effect": "Chuyển một phần sát thương thành phản hỏa và đốt."
        }
      ]
    },
    "traits": [
      {
        "name": "Long Viêm Phản Chấn",
        "lv": [
          {
            "lv": 1,
            "proc": 1,
            "magnitude": 0.1640625,
            "effect": "Giảm 16,406% đòn từ 7 sát thương và phát phản hỏa thiêu đốt."
          },
          {
            "lv": 2,
            "proc": 1,
            "magnitude": 0.18164062499999997,
            "effect": "Giảm 18,164% đòn từ 7 sát thương và phát phản hỏa thiêu đốt."
          },
          {
            "lv": 3,
            "proc": 1,
            "magnitude": 0.19921875,
            "effect": "Giảm 19,922% đòn từ 7 sát thương và phát phản hỏa thiêu đốt."
          },
          {
            "lv": 4,
            "proc": 1,
            "magnitude": 0.21679687499999997,
            "effect": "Giảm 21,68% đòn từ 7 sát thương và phát phản hỏa thiêu đốt."
          },
          {
            "lv": 5,
            "proc": 1,
            "magnitude": 0.234375,
            "effect": "Giảm 23,438% đòn từ 7 sát thương và phát phản hỏa thiêu đốt."
          }
        ]
      },
      {
        "name": "Mạch Nano Tái Tạo",
        "lv": [
          {
            "lv": 1,
            "proc": 1,
            "magnitude": 2.0999999999999996,
            "effect": "Hồi 2,1 HP/giây khi đang mất máu; không chặn trực tiếp đòn nặng.",
            "unit": "HP/giây"
          },
          {
            "lv": 2,
            "proc": 1,
            "magnitude": 2.3249999999999997,
            "effect": "Hồi 2,325 HP/giây khi đang mất máu; không chặn trực tiếp đòn nặng.",
            "unit": "HP/giây"
          },
          {
            "lv": 3,
            "proc": 1,
            "magnitude": 2.55,
            "effect": "Hồi 2,55 HP/giây khi đang mất máu; không chặn trực tiếp đòn nặng.",
            "unit": "HP/giây"
          },
          {
            "lv": 4,
            "proc": 1,
            "magnitude": 2.775,
            "effect": "Hồi 2,775 HP/giây khi đang mất máu; không chặn trực tiếp đòn nặng.",
            "unit": "HP/giây"
          },
          {
            "lv": 5,
            "proc": 1,
            "magnitude": 3,
            "effect": "Hồi 3 HP/giây khi đang mất máu; không chặn trực tiếp đòn nặng.",
            "unit": "HP/giây"
          }
        ]
      }
    ],
    "stats": {
      "hp": 141.6,
      "scoreBonus": 124
    },
    "normal": {
      "pattern": "fan",
      "cadence": 1.1,
      "count": 5,
      "speed": 130,
      "pierce": false,
      "homing": 0,
      "notes": "Chặn một đòn, phun hình quạt lửa lên kẻ tấn công; gây cháy 2 giây. Đơn vị: spread độ, speed px/giây, cadence giây; số đếm là tổng hai pod với tàu con. Kết hợp Mạch Nano Tái Tạo."
    },
    "skill": {
      "name": "Long Mạch Hồi Nguyên",
      "cooldown": 12,
      "duration": 3,
      "effect": "Tăng phản chấn vảy rồng; đạn phản kích gây thêm cháy theo thời gian. Tăng tốc hồi máu lên 1,5 lần mức thường; drone sửa chữa đồng thời phát xung phản kích.",
      "visual": "Hai cơ chế phối hợp trong một nhịp khai hỏa."
    },
    "super": {
      "name": "Bất Diệt Long Thể",
      "effect": "Vảy giáp dựng lên, phản kích phun đầu đạn long viêm mới và gây cháy theo thời gian. Các mạch sửa chữa bung ra; hồi máu gấp đôi, xung nano phản kích dày hơn.",
      "visual": "Lưỡi lửa cam cuộn dọc hai sườn, vảy tách lớp mỗi khi phản hỏa. Nút nano chạy nối mạch, đường khâu sáng lấp kín từng đoạn lưới bị vỡ.",
      "formChange": "Vảy giáp đuôi xòe rộng thành áo choàng long viêm, lõi phản kích mở. Các mắt lưới xanh liên kết thành hai lớp mạch sửa chữa quanh tàu."
    },
    "max": {
      "formChange": "Biến hình 0,35 giây: mở các bản lề, trải cánh quang và đổi màu lõi.",
      "effect": "Vảy giáp dựng lên, phản kích phun đầu đạn long viêm mới và gây cháy theo thời gian. Các mạch sửa chữa bung ra; hồi máu gấp đôi, xung nano phản kích dày hơn."
    },
    "ult": {
      "name": "LONG MẠCH BẤT DIỆT",
      "duration": 3.6,
      "effect": "Làn sóng xóa đạn sau bước tụ lực; hai cơ chế Long Viêm Phản Chấn và Mạch Nano Tái Tạo cùng trình diễn trên toàn màn.",
      "visual": "Lưới nano xanh khâu quanh tàu trước khi vảy rồng cam mở và phóng phản hỏa.",
      "choreography": "Lưới nano xanh khâu quanh tàu trước khi vảy rồng cam mở và phóng phản hỏa.",
      "layers": [
        "sss_reactive_nanite_ult_a",
        "sss_reactive_nanite_ult_b"
      ],
      "framesPerLayer": 2
    },
    "parents": [
      "reactive",
      "nanite"
    ],
    "bonus": 0.35,
    "hitFx": "Vảy giáp cam mở thành hai hàm rồng cơ khí. + Mạch xanh lục cùng hạt nano bay về thân.",
    "flavor": "Hai lõi cộng hưởng Long Viêm Phản Chấn và Mạch Nano Tái Tạo nối thành một hệ chiến đấu. Không thành phần nào bị mất đi sau nghi lễ.",
    "sources": [
      "Hợp thể"
    ],
    "budget": {
      "damagePerSecond": 160,
      "defensePerMinute": 234,
      "policy": "Hiệu suất DPS/ATK ±8%; tỷ lệ đầu đạn chạm mục tiêu ≥45%. Giáp so tổng chặn+hồi trong hỗn hợp mưa đạn, đòn nặng và bào mòn."
    },
    "oldId": "sss_reactive_nanite",
    "combat": {
      "damageScale": 0,
      "notes": "DPS thiết kế = ATK sau cường hóa × hiệu suất cố định 1,0. Đạn phải va chạm thật mới cộng sát thương; không chuẩn hóa ngược theo ATK.",
      "defensePolicy": "Mỗi đặc kỹ cha mẹ dùng hệ số 0,65; tổng sát thương chặn không vượt đòn nhận. Hồi máu chỉ tính phần HP thực sự hồi."
    },
    "tuning": {
      "dpsIndex": 1.35,
      "defenseIndex": 1.3
    },
    "reviewStatus": {
      "completeArt": true,
      "missingArt": []
    }
  },
  {
    "id": "sss_nanite_aegis",
    "kind": "armor",
    "tier": "sss",
    "ring": 5,
    "name": "Sinh Mạch Thiên Thành",
    "color": "#75f5b4",
    "second": "#71dfff",
    "trait": {
      "name": "Mạch Nano Tái Tạo",
      "lv": [
        {
          "lv": 1,
          "proc": 0.105,
          "magnitude": 0.8,
          "effect": "Tái tạo máu theo thời gian khi đang mất máu."
        },
        {
          "lv": 2,
          "proc": 0.1162,
          "magnitude": 0.85,
          "effect": "Tái tạo máu theo thời gian khi đang mất máu."
        },
        {
          "lv": 3,
          "proc": 0.1275,
          "magnitude": 0.9,
          "effect": "Tái tạo máu theo thời gian khi đang mất máu."
        },
        {
          "lv": 4,
          "proc": 0.1387,
          "magnitude": 0.95,
          "effect": "Tái tạo máu theo thời gian khi đang mất máu."
        },
        {
          "lv": 5,
          "proc": 0.15,
          "magnitude": 1,
          "effect": "Tái tạo máu theo thời gian khi đang mất máu."
        }
      ]
    },
    "traits": [
      {
        "name": "Mạch Nano Tái Tạo",
        "lv": [
          {
            "lv": 1,
            "proc": 1,
            "magnitude": 2.0999999999999996,
            "effect": "Hồi 2,1 HP/giây khi đang mất máu; không chặn trực tiếp đòn nặng.",
            "unit": "HP/giây"
          },
          {
            "lv": 2,
            "proc": 1,
            "magnitude": 2.3249999999999997,
            "effect": "Hồi 2,325 HP/giây khi đang mất máu; không chặn trực tiếp đòn nặng.",
            "unit": "HP/giây"
          },
          {
            "lv": 3,
            "proc": 1,
            "magnitude": 2.55,
            "effect": "Hồi 2,55 HP/giây khi đang mất máu; không chặn trực tiếp đòn nặng.",
            "unit": "HP/giây"
          },
          {
            "lv": 4,
            "proc": 1,
            "magnitude": 2.775,
            "effect": "Hồi 2,775 HP/giây khi đang mất máu; không chặn trực tiếp đòn nặng.",
            "unit": "HP/giây"
          },
          {
            "lv": 5,
            "proc": 1,
            "magnitude": 3,
            "effect": "Hồi 3 HP/giây khi đang mất máu; không chặn trực tiếp đòn nặng.",
            "unit": "HP/giây"
          }
        ]
      },
      {
        "name": "Phá Đạn Thành Trì",
        "lv": [
          {
            "lv": 1,
            "proc": 1,
            "magnitude": 0.7875,
            "effect": "Chặn cố định 0,787 sát thương mỗi viên đạn; đặc biệt hiệu quả trước mưa đạn nhỏ."
          },
          {
            "lv": 2,
            "proc": 1,
            "magnitude": 0.871875,
            "effect": "Chặn cố định 0,872 sát thương mỗi viên đạn; đặc biệt hiệu quả trước mưa đạn nhỏ."
          },
          {
            "lv": 3,
            "proc": 1,
            "magnitude": 0.9562499999999999,
            "effect": "Chặn cố định 0,956 sát thương mỗi viên đạn; đặc biệt hiệu quả trước mưa đạn nhỏ."
          },
          {
            "lv": 4,
            "proc": 1,
            "magnitude": 1.040625,
            "effect": "Chặn cố định 1,041 sát thương mỗi viên đạn; đặc biệt hiệu quả trước mưa đạn nhỏ."
          },
          {
            "lv": 5,
            "proc": 1,
            "magnitude": 1.125,
            "effect": "Chặn cố định 1,125 sát thương mỗi viên đạn; đặc biệt hiệu quả trước mưa đạn nhỏ."
          }
        ]
      }
    ],
    "stats": {
      "hp": 132,
      "scoreBonus": 124
    },
    "normal": {
      "pattern": "homing",
      "cadence": 1.1,
      "count": 6,
      "speed": 130,
      "pierce": false,
      "homing": 0.8,
      "notes": "Hồi 5% máu tối đa trong 3 giây, drone sửa chữa chặn một đạn. Đơn vị: spread độ, speed px/giây, cadence giây; số đếm là tổng hai pod với tàu con. Kết hợp Phá Đạn Thành Trì."
    },
    "skill": {
      "name": "Sinh Mạch Kết Thành",
      "cooldown": 12,
      "duration": 3,
      "effect": "Tăng tốc hồi máu lên 1,5 lần mức thường; drone sửa chữa đồng thời phát xung phản kích. Tăng tần suất giảm đòn và phản kích trong thời gian kỹ năng; từng lần chặn phát tấm giáp vỡ sáng.",
      "visual": "Hai cơ chế phối hợp trong một nhịp khai hỏa."
    },
    "super": {
      "name": "Vĩnh Sinh Thiên Lũy",
      "effect": "Các mạch sửa chữa bung ra; hồi máu gấp đôi, xung nano phản kích dày hơn. Tấm giáp mở rộng, tăng gấp đôi nhịp giảm đòn và phản kích so với trạng thái thường.",
      "visual": "Nút nano chạy nối mạch, đường khâu sáng lấp kín từng đoạn lưới bị vỡ. Vòm cyan có đường nứt tổ ong; khi chặn, các mảnh chắn bắn ngược hướng đạn.",
      "formChange": "Các mắt lưới xanh liên kết thành hai lớp mạch sửa chữa quanh tàu. Ba phiến lục giác gập thành vòm chắn trước mũi, mép giáp mở thêm một tầng."
    },
    "max": {
      "formChange": "Biến hình 0,35 giây: mở các bản lề, trải cánh quang và đổi màu lõi.",
      "effect": "Các mạch sửa chữa bung ra; hồi máu gấp đôi, xung nano phản kích dày hơn. Tấm giáp mở rộng, tăng gấp đôi nhịp giảm đòn và phản kích so với trạng thái thường."
    },
    "ult": {
      "name": "TRƯỜNG SINH THÀNH LŨY",
      "duration": 3.6,
      "effect": "Làn sóng xóa đạn sau bước tụ lực; hai cơ chế Mạch Nano Tái Tạo và Phá Đạn Thành Trì cùng trình diễn trên toàn màn.",
      "visual": "Lưới sinh mạch kết thành thành lũy tổ ong; hai đợt vòm chắn đẩy lên tuyến trước.",
      "choreography": "Lưới sinh mạch kết thành thành lũy tổ ong; hai đợt vòm chắn đẩy lên tuyến trước.",
      "layers": [
        "sss_nanite_aegis_ult_a",
        "sss_nanite_aegis_ult_b"
      ],
      "framesPerLayer": 2
    },
    "parents": [
      "nanite",
      "aegis"
    ],
    "bonus": 0.35,
    "hitFx": "Mạch xanh lục cùng hạt nano bay về thân. + Ba phiến thành giáp cyan nối thành vòm tổ ong.",
    "flavor": "Hai lõi cộng hưởng Mạch Nano Tái Tạo và Phá Đạn Thành Trì nối thành một hệ chiến đấu. Không thành phần nào bị mất đi sau nghi lễ.",
    "sources": [
      "Hợp thể"
    ],
    "budget": {
      "damagePerSecond": 160,
      "defensePerMinute": 234,
      "policy": "Hiệu suất DPS/ATK ±8%; tỷ lệ đầu đạn chạm mục tiêu ≥45%. Giáp so tổng chặn+hồi trong hỗn hợp mưa đạn, đòn nặng và bào mòn."
    },
    "oldId": null,
    "combat": {
      "damageScale": 0,
      "notes": "DPS thiết kế = ATK sau cường hóa × hiệu suất cố định 1,0. Đạn phải va chạm thật mới cộng sát thương; không chuẩn hóa ngược theo ATK.",
      "defensePolicy": "Mỗi đặc kỹ cha mẹ dùng hệ số 0,65; tổng sát thương chặn không vượt đòn nhận. Hồi máu chỉ tính phần HP thực sự hồi."
    },
    "tuning": {
      "dpsIndex": 1.35,
      "defenseIndex": 1.3
    },
    "reviewStatus": {
      "completeArt": true,
      "missingArt": []
    }
  },
  {
    "id": "sss_inferno_cryo",
    "kind": "missiles",
    "tier": "sss",
    "ring": 0,
    "name": "Băng Hỏa Song Long",
    "color": "#ff8b4e",
    "second": "#83edff",
    "trait": {
      "name": "Liệt Hỏa Bộc Phá",
      "lv": [
        {
          "lv": 1,
          "proc": 0.105,
          "magnitude": 0.8,
          "effect": "Vụ nổ gây cháy, nhả tàn lửa trên đường bay."
        },
        {
          "lv": 2,
          "proc": 0.1162,
          "magnitude": 0.85,
          "effect": "Vụ nổ gây cháy, nhả tàn lửa trên đường bay."
        },
        {
          "lv": 3,
          "proc": 0.1275,
          "magnitude": 0.9,
          "effect": "Vụ nổ gây cháy, nhả tàn lửa trên đường bay."
        },
        {
          "lv": 4,
          "proc": 0.1387,
          "magnitude": 0.95,
          "effect": "Vụ nổ gây cháy, nhả tàn lửa trên đường bay."
        },
        {
          "lv": 5,
          "proc": 0.15,
          "magnitude": 1,
          "effect": "Vụ nổ gây cháy, nhả tàn lửa trên đường bay."
        }
      ]
    },
    "traits": [
      {
        "name": "Liệt Hỏa Bộc Phá",
        "lv": [
          {
            "lv": 1,
            "proc": 0.105,
            "magnitude": 0.8,
            "effect": "Vụ nổ gây cháy, nhả tàn lửa trên đường bay. Tỷ lệ đạn cường hóa: 10,5% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 2,
            "proc": 0.1162,
            "magnitude": 0.85,
            "effect": "Vụ nổ gây cháy, nhả tàn lửa trên đường bay. Tỷ lệ đạn cường hóa: 11,62% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 3,
            "proc": 0.1275,
            "magnitude": 0.9,
            "effect": "Vụ nổ gây cháy, nhả tàn lửa trên đường bay. Tỷ lệ đạn cường hóa: 12,75% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 4,
            "proc": 0.1387,
            "magnitude": 0.95,
            "effect": "Vụ nổ gây cháy, nhả tàn lửa trên đường bay. Tỷ lệ đạn cường hóa: 13,87% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 5,
            "proc": 0.15,
            "magnitude": 1,
            "effect": "Vụ nổ gây cháy, nhả tàn lửa trên đường bay. Tỷ lệ đạn cường hóa: 15% (đạn cường hóa gây thêm 4% sát thương)."
          }
        ]
      },
      {
        "name": "Hàn Sương Phá Giáp",
        "lv": [
          {
            "lv": 1,
            "proc": 0.105,
            "magnitude": 0.8,
            "effect": "Mảnh băng xuyên giáp, làm chậm mục tiêu. Tỷ lệ đạn cường hóa: 10,5% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 2,
            "proc": 0.1162,
            "magnitude": 0.85,
            "effect": "Mảnh băng xuyên giáp, làm chậm mục tiêu. Tỷ lệ đạn cường hóa: 11,62% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 3,
            "proc": 0.1275,
            "magnitude": 0.9,
            "effect": "Mảnh băng xuyên giáp, làm chậm mục tiêu. Tỷ lệ đạn cường hóa: 12,75% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 4,
            "proc": 0.1387,
            "magnitude": 0.95,
            "effect": "Mảnh băng xuyên giáp, làm chậm mục tiêu. Tỷ lệ đạn cường hóa: 13,87% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 5,
            "proc": 0.15,
            "magnitude": 1,
            "effect": "Mảnh băng xuyên giáp, làm chậm mục tiêu. Tỷ lệ đạn cường hóa: 15% (đạn cường hóa gây thêm 4% sát thương)."
          }
        ]
      }
    ],
    "stats": {
      "atk": 122.4,
      "scoreBonus": 124
    },
    "normal": {
      "pattern": "fan",
      "cadence": 0.7,
      "count": 4,
      "speed": 210,
      "pierce": false,
      "homing": 0,
      "notes": "Phóng 6 tên lửa nổ quạt, vùng cháy tồn tại 2 giây. Đơn vị: spread độ, speed px/giây, cadence giây; số đếm là tổng hai pod với tàu con. Kết hợp Hàn Sương Phá Giáp."
    },
    "skill": {
      "name": "Băng Hỏa Giao Long",
      "cooldown": 12,
      "duration": 3,
      "effect": "Tên lửa tản hướng rồi dồn khóa; vụ nổ chia nhiệt cho các mục tiêu và để cháy trong 2 giây. Tạo trường băng tại vùng mục tiêu; mục tiêu trong trường bị làm chậm, tên lửa tiếp tục xuyên vào vùng băng.",
      "visual": "Hai cơ chế phối hợp trong một nhịp khai hỏa."
    },
    "super": {
      "name": "Lưỡng Cực Long Vũ",
      "effect": "Đầu đạn hai mũi lửa mới, tạo mảnh tàn hỏa dọc đường và cháy sau nổ; hardpoint mở cánh. Đầu khoan băng mở cánh; mỗi lần trúng đặt thêm trường làm chậm tại điểm nổ.",
      "visual": "Đầu đạn cam phun lửa rung lệch nhịp, va chạm bung cánh hỏa liên rồi tàn tro. Tên lửa băng xanh kéo hơi lạnh, đầu nhọn vỡ thành chùm tinh thể trên mục tiêu.",
      "formChange": "Nắp ống phóng mở, ray nhiệt kép trượt dài và đầu đạn tăng buồng đốt. Giá phóng tách đôi, tinh thể đóng băng vươn khỏi miệng ống."
    },
    "max": {
      "formChange": "Biến hình 0,35 giây: mở các bản lề, trải cánh quang và đổi màu lõi.",
      "effect": "Đầu đạn hai mũi lửa mới, tạo mảnh tàn hỏa dọc đường và cháy sau nổ; hardpoint mở cánh. Đầu khoan băng mở cánh; mỗi lần trúng đặt thêm trường làm chậm tại điểm nổ."
    },
    "ult": {
      "name": "BĂNG HỎA PHÁ THIÊN",
      "duration": 3.6,
      "effect": "Làn sóng xóa đạn sau bước tụ lực; hai cơ chế Liệt Hỏa Bộc Phá và Hàn Sương Phá Giáp cùng trình diễn trên toàn màn.",
      "visual": "Hỏa long cam và băng long cyan xoắn lên, cắt chéo nhau hai lần giữa màn hình.",
      "choreography": "Hỏa long cam và băng long cyan xoắn lên, cắt chéo nhau hai lần giữa màn hình.",
      "layers": [
        "sss_inferno_cryo_ult_a",
        "sss_inferno_cryo_ult_b"
      ],
      "framesPerLayer": 2
    },
    "parents": [
      "inferno",
      "cryo"
    ],
    "bonus": 0.35,
    "hitFx": "Bệ đôi miệng đỏ, vệt lửa cam và vòng dung nham. + Ống phóng trắng cyan, mảnh băng lục giác.",
    "flavor": "Hai lõi cộng hưởng Liệt Hỏa Bộc Phá và Hàn Sương Phá Giáp nối thành một hệ chiến đấu. Không thành phần nào bị mất đi sau nghi lễ.",
    "sources": [
      "Hợp thể"
    ],
    "budget": {
      "damagePerSecond": 165.24,
      "defensePerMinute": 234,
      "policy": "Hiệu suất DPS/ATK ±8%; tỷ lệ đầu đạn chạm mục tiêu ≥45%. Giáp so tổng chặn+hồi trong hỗn hợp mưa đạn, đòn nặng và bào mòn."
    },
    "oldId": "sss_inferno_cryo",
    "combat": {
      "damageScale": 1,
      "notes": "DPS thiết kế = ATK sau cường hóa × hiệu suất cố định 1,0. Đạn phải va chạm thật mới cộng sát thương; không chuẩn hóa ngược theo ATK."
    },
    "tuning": {
      "dpsIndex": 1.35,
      "defenseIndex": 1.3
    },
    "reviewStatus": {
      "completeArt": true,
      "missingArt": []
    }
  },
  {
    "id": "sss_cryo_thunder",
    "kind": "missiles",
    "tier": "sss",
    "ring": 1,
    "name": "Băng Lôi Thiên Kiếp",
    "color": "#83edff",
    "second": "#ffe180",
    "trait": {
      "name": "Hàn Sương Phá Giáp",
      "lv": [
        {
          "lv": 1,
          "proc": 0.105,
          "magnitude": 0.8,
          "effect": "Mảnh băng xuyên giáp, làm chậm mục tiêu."
        },
        {
          "lv": 2,
          "proc": 0.1162,
          "magnitude": 0.85,
          "effect": "Mảnh băng xuyên giáp, làm chậm mục tiêu."
        },
        {
          "lv": 3,
          "proc": 0.1275,
          "magnitude": 0.9,
          "effect": "Mảnh băng xuyên giáp, làm chậm mục tiêu."
        },
        {
          "lv": 4,
          "proc": 0.1387,
          "magnitude": 0.95,
          "effect": "Mảnh băng xuyên giáp, làm chậm mục tiêu."
        },
        {
          "lv": 5,
          "proc": 0.15,
          "magnitude": 1,
          "effect": "Mảnh băng xuyên giáp, làm chậm mục tiêu."
        }
      ]
    },
    "traits": [
      {
        "name": "Hàn Sương Phá Giáp",
        "lv": [
          {
            "lv": 1,
            "proc": 0.105,
            "magnitude": 0.8,
            "effect": "Mảnh băng xuyên giáp, làm chậm mục tiêu. Tỷ lệ đạn cường hóa: 10,5% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 2,
            "proc": 0.1162,
            "magnitude": 0.85,
            "effect": "Mảnh băng xuyên giáp, làm chậm mục tiêu. Tỷ lệ đạn cường hóa: 11,62% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 3,
            "proc": 0.1275,
            "magnitude": 0.9,
            "effect": "Mảnh băng xuyên giáp, làm chậm mục tiêu. Tỷ lệ đạn cường hóa: 12,75% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 4,
            "proc": 0.1387,
            "magnitude": 0.95,
            "effect": "Mảnh băng xuyên giáp, làm chậm mục tiêu. Tỷ lệ đạn cường hóa: 13,87% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 5,
            "proc": 0.15,
            "magnitude": 1,
            "effect": "Mảnh băng xuyên giáp, làm chậm mục tiêu. Tỷ lệ đạn cường hóa: 15% (đạn cường hóa gây thêm 4% sát thương)."
          }
        ]
      },
      {
        "name": "Lôi Tỏa Liên Kích",
        "lv": [
          {
            "lv": 1,
            "proc": 0.105,
            "magnitude": 0.8,
            "effect": "Sét nối các mục tiêu, chia ngân sách sát thương. Tỷ lệ đạn cường hóa: 10,5% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 2,
            "proc": 0.1162,
            "magnitude": 0.85,
            "effect": "Sét nối các mục tiêu, chia ngân sách sát thương. Tỷ lệ đạn cường hóa: 11,62% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 3,
            "proc": 0.1275,
            "magnitude": 0.9,
            "effect": "Sét nối các mục tiêu, chia ngân sách sát thương. Tỷ lệ đạn cường hóa: 12,75% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 4,
            "proc": 0.1387,
            "magnitude": 0.95,
            "effect": "Sét nối các mục tiêu, chia ngân sách sát thương. Tỷ lệ đạn cường hóa: 13,87% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 5,
            "proc": 0.15,
            "magnitude": 1,
            "effect": "Sét nối các mục tiêu, chia ngân sách sát thương. Tỷ lệ đạn cường hóa: 15% (đạn cường hóa gây thêm 4% sát thương)."
          }
        ]
      }
    ],
    "stats": {
      "atk": 127.2,
      "scoreBonus": 124
    },
    "normal": {
      "pattern": "straight",
      "cadence": 0.7,
      "count": 4,
      "speed": 210,
      "pierce": false,
      "homing": 0,
      "notes": "Bốn tên lửa băng làm chậm 40% trong 2 giây; trùm giảm hiệu lực một nửa. Đơn vị: spread độ, speed px/giây, cadence giây; số đếm là tổng hai pod với tàu con. Kết hợp Lôi Tỏa Liên Kích."
    },
    "skill": {
      "name": "Băng Lôi Kết Phược",
      "cooldown": 12,
      "duration": 3,
      "effect": "Tạo trường băng tại vùng mục tiêu; mục tiêu trong trường bị làm chậm, tên lửa tiếp tục xuyên vào vùng băng. Đầu đạn đổi góc tiếp cận rồi phóng chuỗi sét giữa các mục tiêu; năng lượng chia qua từng nhánh.",
      "visual": "Hai cơ chế phối hợp trong một nhịp khai hỏa."
    },
    "super": {
      "name": "Cửu Thiên Lôi Ngục",
      "effect": "Đầu khoan băng mở cánh; mỗi lần trúng đặt thêm trường làm chậm tại điểm nổ. Nova lôi kích mới nối tối đa năm mục tiêu, thay cho ba mục tiêu của trạng thái thường.",
      "visual": "Tên lửa băng xanh kéo hơi lạnh, đầu nhọn vỡ thành chùm tinh thể trên mục tiêu. Hồ quang chạy giữa các vòng tụ, sét vàng nối tối đa năm mục tiêu.",
      "formChange": "Giá phóng tách đôi, tinh thể đóng băng vươn khỏi miệng ống. Cuộn tụ mở hai bên giá phóng, điện cực vàng nối thành cung dẫn."
    },
    "max": {
      "formChange": "Biến hình 0,35 giây: mở các bản lề, trải cánh quang và đổi màu lõi.",
      "effect": "Đầu khoan băng mở cánh; mỗi lần trúng đặt thêm trường làm chậm tại điểm nổ. Nova lôi kích mới nối tối đa năm mục tiêu, thay cho ba mục tiêu của trạng thái thường."
    },
    "ult": {
      "name": "HÀN LÔI VẠN KIẾP",
      "duration": 3.6,
      "effect": "Làn sóng xóa đạn sau bước tụ lực; hai cơ chế Hàn Sương Phá Giáp và Lôi Tỏa Liên Kích cùng trình diễn trên toàn màn.",
      "visual": "Băng thương ghim thành cây tinh thể, sét vàng nhảy qua từng cành băng đã dựng.",
      "choreography": "Băng thương ghim thành cây tinh thể, sét vàng nhảy qua từng cành băng đã dựng.",
      "layers": [
        "sss_cryo_thunder_ult_a",
        "sss_cryo_thunder_ult_b"
      ],
      "framesPerLayer": 2
    },
    "parents": [
      "cryo",
      "thunder"
    ],
    "bonus": 0.35,
    "hitFx": "Ống phóng trắng cyan, mảnh băng lục giác. + Cuộn điện vàng quanh bệ đen, tia sét phân nhánh.",
    "flavor": "Hai lõi cộng hưởng Hàn Sương Phá Giáp và Lôi Tỏa Liên Kích nối thành một hệ chiến đấu. Không thành phần nào bị mất đi sau nghi lễ.",
    "sources": [
      "Hợp thể"
    ],
    "budget": {
      "damagePerSecond": 171.72000000000003,
      "defensePerMinute": 234,
      "policy": "Hiệu suất DPS/ATK ±8%; tỷ lệ đầu đạn chạm mục tiêu ≥45%. Giáp so tổng chặn+hồi trong hỗn hợp mưa đạn, đòn nặng và bào mòn."
    },
    "oldId": null,
    "combat": {
      "damageScale": 1,
      "notes": "DPS thiết kế = ATK sau cường hóa × hiệu suất cố định 1,0. Đạn phải va chạm thật mới cộng sát thương; không chuẩn hóa ngược theo ATK."
    },
    "tuning": {
      "dpsIndex": 1.35,
      "defenseIndex": 1.3
    },
    "reviewStatus": {
      "completeArt": true,
      "missingArt": []
    }
  },
  {
    "id": "sss_thunder_singularity",
    "kind": "missiles",
    "tier": "sss",
    "ring": 2,
    "name": "Lôi Uyên Thiên Phạt",
    "color": "#ffe180",
    "second": "#c38cff",
    "trait": {
      "name": "Lôi Tỏa Liên Kích",
      "lv": [
        {
          "lv": 1,
          "proc": 0.105,
          "magnitude": 0.8,
          "effect": "Sét nối các mục tiêu, chia ngân sách sát thương."
        },
        {
          "lv": 2,
          "proc": 0.1162,
          "magnitude": 0.85,
          "effect": "Sét nối các mục tiêu, chia ngân sách sát thương."
        },
        {
          "lv": 3,
          "proc": 0.1275,
          "magnitude": 0.9,
          "effect": "Sét nối các mục tiêu, chia ngân sách sát thương."
        },
        {
          "lv": 4,
          "proc": 0.1387,
          "magnitude": 0.95,
          "effect": "Sét nối các mục tiêu, chia ngân sách sát thương."
        },
        {
          "lv": 5,
          "proc": 0.15,
          "magnitude": 1,
          "effect": "Sét nối các mục tiêu, chia ngân sách sát thương."
        }
      ]
    },
    "traits": [
      {
        "name": "Lôi Tỏa Liên Kích",
        "lv": [
          {
            "lv": 1,
            "proc": 0.105,
            "magnitude": 0.8,
            "effect": "Sét nối các mục tiêu, chia ngân sách sát thương. Tỷ lệ đạn cường hóa: 10,5% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 2,
            "proc": 0.1162,
            "magnitude": 0.85,
            "effect": "Sét nối các mục tiêu, chia ngân sách sát thương. Tỷ lệ đạn cường hóa: 11,62% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 3,
            "proc": 0.1275,
            "magnitude": 0.9,
            "effect": "Sét nối các mục tiêu, chia ngân sách sát thương. Tỷ lệ đạn cường hóa: 12,75% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 4,
            "proc": 0.1387,
            "magnitude": 0.95,
            "effect": "Sét nối các mục tiêu, chia ngân sách sát thương. Tỷ lệ đạn cường hóa: 13,87% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 5,
            "proc": 0.15,
            "magnitude": 1,
            "effect": "Sét nối các mục tiêu, chia ngân sách sát thương. Tỷ lệ đạn cường hóa: 15% (đạn cường hóa gây thêm 4% sát thương)."
          }
        ]
      },
      {
        "name": "Hư Uyên Thôn Phệ",
        "lv": [
          {
            "lv": 1,
            "proc": 0.105,
            "magnitude": 0.8,
            "effect": "Đạn xoáy gom mục tiêu nhỏ, không kéo trùm. Tỷ lệ đạn cường hóa: 10,5% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 2,
            "proc": 0.1162,
            "magnitude": 0.85,
            "effect": "Đạn xoáy gom mục tiêu nhỏ, không kéo trùm. Tỷ lệ đạn cường hóa: 11,62% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 3,
            "proc": 0.1275,
            "magnitude": 0.9,
            "effect": "Đạn xoáy gom mục tiêu nhỏ, không kéo trùm. Tỷ lệ đạn cường hóa: 12,75% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 4,
            "proc": 0.1387,
            "magnitude": 0.95,
            "effect": "Đạn xoáy gom mục tiêu nhỏ, không kéo trùm. Tỷ lệ đạn cường hóa: 13,87% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 5,
            "proc": 0.15,
            "magnitude": 1,
            "effect": "Đạn xoáy gom mục tiêu nhỏ, không kéo trùm. Tỷ lệ đạn cường hóa: 15% (đạn cường hóa gây thêm 4% sát thương)."
          }
        ]
      }
    ],
    "stats": {
      "atk": 132,
      "scoreBonus": 124
    },
    "normal": {
      "pattern": "chain",
      "cadence": 0.7,
      "count": 3,
      "speed": 210,
      "pierce": false,
      "homing": 0,
      "notes": "Ba tên lửa dẫn điện, mỗi lần trúng nối tối đa ba mục tiêu. Đơn vị: spread độ, speed px/giây, cadence giây; số đếm là tổng hai pod với tàu con. Kết hợp Hư Uyên Thôn Phệ."
    },
    "skill": {
      "name": "Lôi Uyên Dẫn Kiếp",
      "cooldown": 12,
      "duration": 3,
      "effect": "Đầu đạn đổi góc tiếp cận rồi phóng chuỗi sét giữa các mục tiêu; năng lượng chia qua từng nhánh. Đặt hai trường hấp dẫn trước tuyến bay, hút mục tiêu nhỏ và nuốt đạn địch vào tâm.",
      "visual": "Hai cơ chế phối hợp trong một nhịp khai hỏa."
    },
    "super": {
      "name": "Huyền Uyên Vạn Lôi",
      "effect": "Nova lôi kích mới nối tối đa năm mục tiêu, thay cho ba mục tiêu của trạng thái thường. Ngư lôi mở tâm xoáy lớn; đạn địch bị hút được chuyển thành đạn phản công.",
      "visual": "Hồ quang chạy giữa các vòng tụ, sét vàng nối tối đa năm mục tiêu. Ngư lôi tím xoay vành bồi tụ; va chạm co vào tâm rồi phóng các dải xoáy.",
      "formChange": "Cuộn tụ mở hai bên giá phóng, điện cực vàng nối thành cung dẫn. Khóa treo mở thành vòng gia tốc, buồng ngư lôi lộ lõi hấp dẫn."
    },
    "max": {
      "formChange": "Biến hình 0,35 giây: mở các bản lề, trải cánh quang và đổi màu lõi.",
      "effect": "Nova lôi kích mới nối tối đa năm mục tiêu, thay cho ba mục tiêu của trạng thái thường. Ngư lôi mở tâm xoáy lớn; đạn địch bị hút được chuyển thành đạn phản công."
    },
    "ult": {
      "name": "LÔI UYÊN DIỆT GIỚI",
      "duration": 3.6,
      "effect": "Làn sóng xóa đạn sau bước tụ lực; hai cơ chế Lôi Tỏa Liên Kích và Hư Uyên Thôn Phệ cùng trình diễn trên toàn màn.",
      "visual": "Hắc động neo ở giữa; các tay sét vàng quất ra ngoài rồi co về tâm vực.",
      "choreography": "Hắc động neo ở giữa; các tay sét vàng quất ra ngoài rồi co về tâm vực.",
      "layers": [
        "sss_thunder_singularity_ult_a",
        "sss_thunder_singularity_ult_b"
      ],
      "framesPerLayer": 2
    },
    "parents": [
      "thunder",
      "singularity"
    ],
    "bonus": 0.35,
    "hitFx": "Cuộn điện vàng quanh bệ đen, tia sét phân nhánh. + Lõi tím đen, hai vòng hấp dẫn và đuôi khói tím.",
    "flavor": "Hai lõi cộng hưởng Lôi Tỏa Liên Kích và Hư Uyên Thôn Phệ nối thành một hệ chiến đấu. Không thành phần nào bị mất đi sau nghi lễ.",
    "sources": [
      "Hợp thể"
    ],
    "budget": {
      "damagePerSecond": 178.20000000000002,
      "defensePerMinute": 234,
      "policy": "Hiệu suất DPS/ATK ±8%; tỷ lệ đầu đạn chạm mục tiêu ≥45%. Giáp so tổng chặn+hồi trong hỗn hợp mưa đạn, đòn nặng và bào mòn."
    },
    "oldId": "sss_thunder_singularity",
    "combat": {
      "damageScale": 1,
      "notes": "DPS thiết kế = ATK sau cường hóa × hiệu suất cố định 1,0. Đạn phải va chạm thật mới cộng sát thương; không chuẩn hóa ngược theo ATK."
    },
    "tuning": {
      "dpsIndex": 1.35,
      "defenseIndex": 1.3
    },
    "reviewStatus": {
      "completeArt": true,
      "missingArt": []
    }
  },
  {
    "id": "sss_singularity_spiral",
    "kind": "missiles",
    "tier": "sss",
    "ring": 3,
    "name": "Uyên Long Hồi Không",
    "color": "#c38cff",
    "second": "#6fffe0",
    "trait": {
      "name": "Hư Uyên Thôn Phệ",
      "lv": [
        {
          "lv": 1,
          "proc": 0.105,
          "magnitude": 0.8,
          "effect": "Đạn xoáy gom mục tiêu nhỏ, không kéo trùm."
        },
        {
          "lv": 2,
          "proc": 0.1162,
          "magnitude": 0.85,
          "effect": "Đạn xoáy gom mục tiêu nhỏ, không kéo trùm."
        },
        {
          "lv": 3,
          "proc": 0.1275,
          "magnitude": 0.9,
          "effect": "Đạn xoáy gom mục tiêu nhỏ, không kéo trùm."
        },
        {
          "lv": 4,
          "proc": 0.1387,
          "magnitude": 0.95,
          "effect": "Đạn xoáy gom mục tiêu nhỏ, không kéo trùm."
        },
        {
          "lv": 5,
          "proc": 0.15,
          "magnitude": 1,
          "effect": "Đạn xoáy gom mục tiêu nhỏ, không kéo trùm."
        }
      ]
    },
    "traits": [
      {
        "name": "Hư Uyên Thôn Phệ",
        "lv": [
          {
            "lv": 1,
            "proc": 0.105,
            "magnitude": 0.8,
            "effect": "Đạn xoáy gom mục tiêu nhỏ, không kéo trùm. Tỷ lệ đạn cường hóa: 10,5% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 2,
            "proc": 0.1162,
            "magnitude": 0.85,
            "effect": "Đạn xoáy gom mục tiêu nhỏ, không kéo trùm. Tỷ lệ đạn cường hóa: 11,62% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 3,
            "proc": 0.1275,
            "magnitude": 0.9,
            "effect": "Đạn xoáy gom mục tiêu nhỏ, không kéo trùm. Tỷ lệ đạn cường hóa: 12,75% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 4,
            "proc": 0.1387,
            "magnitude": 0.95,
            "effect": "Đạn xoáy gom mục tiêu nhỏ, không kéo trùm. Tỷ lệ đạn cường hóa: 13,87% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 5,
            "proc": 0.15,
            "magnitude": 1,
            "effect": "Đạn xoáy gom mục tiêu nhỏ, không kéo trùm. Tỷ lệ đạn cường hóa: 15% (đạn cường hóa gây thêm 4% sát thương)."
          }
        ]
      },
      {
        "name": "Song Long Truy Ảnh",
        "lv": [
          {
            "lv": 1,
            "proc": 0.105,
            "magnitude": 0.8,
            "effect": "Hai đường xoắn đuổi mục tiêu, đổi góc truy kích. Tỷ lệ đạn cường hóa: 10,5% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 2,
            "proc": 0.1162,
            "magnitude": 0.85,
            "effect": "Hai đường xoắn đuổi mục tiêu, đổi góc truy kích. Tỷ lệ đạn cường hóa: 11,62% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 3,
            "proc": 0.1275,
            "magnitude": 0.9,
            "effect": "Hai đường xoắn đuổi mục tiêu, đổi góc truy kích. Tỷ lệ đạn cường hóa: 12,75% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 4,
            "proc": 0.1387,
            "magnitude": 0.95,
            "effect": "Hai đường xoắn đuổi mục tiêu, đổi góc truy kích. Tỷ lệ đạn cường hóa: 13,87% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 5,
            "proc": 0.15,
            "magnitude": 1,
            "effect": "Hai đường xoắn đuổi mục tiêu, đổi góc truy kích. Tỷ lệ đạn cường hóa: 15% (đạn cường hóa gây thêm 4% sát thương)."
          }
        ]
      }
    ],
    "stats": {
      "atk": 136.8,
      "scoreBonus": 124
    },
    "normal": {
      "pattern": "vortex",
      "cadence": 0.7,
      "count": 1,
      "speed": 210,
      "pierce": false,
      "homing": 0.45,
      "notes": "Ngư lôi mở xoáy hút đạn nhẹ và quái nhỏ trong 2 giây; không kéo trùm. Đơn vị: spread độ, speed px/giây, cadence giây; số đếm là tổng hai pod với tàu con. Kết hợp Song Long Truy Ảnh."
    },
    "skill": {
      "name": "Hồi Long Dẫn Uyên",
      "cooldown": 12,
      "duration": 3,
      "effect": "Đặt hai trường hấp dẫn trước tuyến bay, hút mục tiêu nhỏ và nuốt đạn địch vào tâm. Hai luồng xoắn uốn góc truy đuổi mục tiêu đang di chuyển; tăng hỏa lực trong thời gian kỹ năng.",
      "visual": "Hai cơ chế phối hợp trong một nhịp khai hỏa."
    },
    "super": {
      "name": "Vạn Chuyển Hư Không",
      "effect": "Ngư lôi mở tâm xoáy lớn; đạn địch bị hút được chuyển thành đạn phản công. Hai thương xoắn đổi mục tiêu sau lần trúng đầu, chia năng lượng cho cả hai lượt truy đuổi.",
      "visual": "Ngư lôi tím xoay vành bồi tụ; va chạm co vào tâm rồi phóng các dải xoáy. Dải ngọc lam quấn đổi pha quanh tên lửa, tách vòng truy kích khi chạm địch.",
      "formChange": "Khóa treo mở thành vòng gia tốc, buồng ngư lôi lộ lõi hấp dẫn. Hai ray dẫn xoắn mở nghiêng, vòi lái phụ triển khai truy kích vòng hai."
    },
    "max": {
      "formChange": "Biến hình 0,35 giây: mở các bản lề, trải cánh quang và đổi màu lõi.",
      "effect": "Ngư lôi mở tâm xoáy lớn; đạn địch bị hút được chuyển thành đạn phản công. Hai thương xoắn đổi mục tiêu sau lần trúng đầu, chia năng lượng cho cả hai lượt truy đuổi."
    },
    "ult": {
      "name": "HƯ UYÊN LONG QUYỂN",
      "duration": 3.6,
      "effect": "Làn sóng xóa đạn sau bước tụ lực; hai cơ chế Hư Uyên Thôn Phệ và Song Long Truy Ảnh cùng trình diễn trên toàn màn.",
      "visual": "Mắt vực trôi lên, luồng tên lửa xoắn ngọc lam cuộn vào rồi văng khỏi thấu kính hấp dẫn.",
      "choreography": "Mắt vực trôi lên, luồng tên lửa xoắn ngọc lam cuộn vào rồi văng khỏi thấu kính hấp dẫn.",
      "layers": [
        "sss_singularity_spiral_ult_a",
        "sss_singularity_spiral_ult_b"
      ],
      "framesPerLayer": 2
    },
    "parents": [
      "singularity",
      "spiral"
    ],
    "bonus": 0.35,
    "hitFx": "Lõi tím đen, hai vòng hấp dẫn và đuôi khói tím. + Bệ kép xoắn turbine bạc xanh ngọc.",
    "flavor": "Hai lõi cộng hưởng Hư Uyên Thôn Phệ và Song Long Truy Ảnh nối thành một hệ chiến đấu. Không thành phần nào bị mất đi sau nghi lễ.",
    "sources": [
      "Hợp thể"
    ],
    "budget": {
      "damagePerSecond": 184.68000000000004,
      "defensePerMinute": 234,
      "policy": "Hiệu suất DPS/ATK ±8%; tỷ lệ đầu đạn chạm mục tiêu ≥45%. Giáp so tổng chặn+hồi trong hỗn hợp mưa đạn, đòn nặng và bào mòn."
    },
    "oldId": null,
    "combat": {
      "damageScale": 1,
      "notes": "DPS thiết kế = ATK sau cường hóa × hiệu suất cố định 1,0. Đạn phải va chạm thật mới cộng sát thương; không chuẩn hóa ngược theo ATK."
    },
    "tuning": {
      "dpsIndex": 1.35,
      "defenseIndex": 1.3
    },
    "reviewStatus": {
      "completeArt": true,
      "missingArt": []
    }
  },
  {
    "id": "sss_spiral_stellar",
    "kind": "missiles",
    "tier": "sss",
    "ring": 4,
    "name": "Tinh Long Vạn Vũ",
    "color": "#6fffe0",
    "second": "#ffeeb4",
    "trait": {
      "name": "Song Long Truy Ảnh",
      "lv": [
        {
          "lv": 1,
          "proc": 0.105,
          "magnitude": 0.8,
          "effect": "Hai đường xoắn đuổi mục tiêu, đổi góc truy kích."
        },
        {
          "lv": 2,
          "proc": 0.1162,
          "magnitude": 0.85,
          "effect": "Hai đường xoắn đuổi mục tiêu, đổi góc truy kích."
        },
        {
          "lv": 3,
          "proc": 0.1275,
          "magnitude": 0.9,
          "effect": "Hai đường xoắn đuổi mục tiêu, đổi góc truy kích."
        },
        {
          "lv": 4,
          "proc": 0.1387,
          "magnitude": 0.95,
          "effect": "Hai đường xoắn đuổi mục tiêu, đổi góc truy kích."
        },
        {
          "lv": 5,
          "proc": 0.15,
          "magnitude": 1,
          "effect": "Hai đường xoắn đuổi mục tiêu, đổi góc truy kích."
        }
      ]
    },
    "traits": [
      {
        "name": "Song Long Truy Ảnh",
        "lv": [
          {
            "lv": 1,
            "proc": 0.105,
            "magnitude": 0.8,
            "effect": "Hai đường xoắn đuổi mục tiêu, đổi góc truy kích. Tỷ lệ đạn cường hóa: 10,5% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 2,
            "proc": 0.1162,
            "magnitude": 0.85,
            "effect": "Hai đường xoắn đuổi mục tiêu, đổi góc truy kích. Tỷ lệ đạn cường hóa: 11,62% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 3,
            "proc": 0.1275,
            "magnitude": 0.9,
            "effect": "Hai đường xoắn đuổi mục tiêu, đổi góc truy kích. Tỷ lệ đạn cường hóa: 12,75% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 4,
            "proc": 0.1387,
            "magnitude": 0.95,
            "effect": "Hai đường xoắn đuổi mục tiêu, đổi góc truy kích. Tỷ lệ đạn cường hóa: 13,87% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 5,
            "proc": 0.15,
            "magnitude": 1,
            "effect": "Hai đường xoắn đuổi mục tiêu, đổi góc truy kích. Tỷ lệ đạn cường hóa: 15% (đạn cường hóa gây thêm 4% sát thương)."
          }
        ]
      },
      {
        "name": "Thiên Tinh Phân Liệt",
        "lv": [
          {
            "lv": 1,
            "proc": 0.105,
            "magnitude": 0.8,
            "effect": "Đầu đạn tách sao con giữa quãng bay. Tỷ lệ đạn cường hóa: 10,5% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 2,
            "proc": 0.1162,
            "magnitude": 0.85,
            "effect": "Đầu đạn tách sao con giữa quãng bay. Tỷ lệ đạn cường hóa: 11,62% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 3,
            "proc": 0.1275,
            "magnitude": 0.9,
            "effect": "Đầu đạn tách sao con giữa quãng bay. Tỷ lệ đạn cường hóa: 12,75% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 4,
            "proc": 0.1387,
            "magnitude": 0.95,
            "effect": "Đầu đạn tách sao con giữa quãng bay. Tỷ lệ đạn cường hóa: 13,87% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 5,
            "proc": 0.15,
            "magnitude": 1,
            "effect": "Đầu đạn tách sao con giữa quãng bay. Tỷ lệ đạn cường hóa: 15% (đạn cường hóa gây thêm 4% sát thương)."
          }
        ]
      }
    ],
    "stats": {
      "atk": 141.6,
      "scoreBonus": 124
    },
    "normal": {
      "pattern": "spiral",
      "cadence": 0.7,
      "count": 2,
      "speed": 210,
      "pierce": false,
      "homing": 0.8,
      "notes": "Hai chùm tên lửa xoắn ốc dẫn đường bám hai mục tiêu. Đơn vị: spread độ, speed px/giây, cadence giây; số đếm là tổng hai pod với tàu con. Kết hợp Thiên Tinh Phân Liệt."
    },
    "skill": {
      "name": "Tinh Long Tụ Vũ",
      "cooldown": 12,
      "duration": 3,
      "effect": "Hai luồng xoắn uốn góc truy đuổi mục tiêu đang di chuyển; tăng hỏa lực trong thời gian kỹ năng. Tên lửa tách thành bốn sao con có khóa mục tiêu, thay cho ba nhánh của bắn thường.",
      "visual": "Hai cơ chế phối hợp trong một nhịp khai hỏa."
    },
    "super": {
      "name": "Vạn Tinh Long Quyển",
      "effect": "Hai thương xoắn đổi mục tiêu sau lần trúng đầu, chia năng lượng cho cả hai lượt truy đuổi. Vương miện sao tách năm nhánh khóa mục tiêu, thay cho ba nhánh thường.",
      "visual": "Dải ngọc lam quấn đổi pha quanh tên lửa, tách vòng truy kích khi chạm địch. Sao ngà đổi góc cánh và phân thành năm vệt sao con trên đường bay.",
      "formChange": "Hai ray dẫn xoắn mở nghiêng, vòi lái phụ triển khai truy kích vòng hai. Cụm chứa sao mở từng cánh, để lộ chùm đầu đạn phân ly."
    },
    "max": {
      "formChange": "Biến hình 0,35 giây: mở các bản lề, trải cánh quang và đổi màu lõi.",
      "effect": "Hai thương xoắn đổi mục tiêu sau lần trúng đầu, chia năng lượng cho cả hai lượt truy đuổi. Vương miện sao tách năm nhánh khóa mục tiêu, thay cho ba nhánh thường."
    },
    "ult": {
      "name": "TINH LONG VẠN TIỄN",
      "duration": 3.6,
      "effect": "Làn sóng xóa đạn sau bước tụ lực; hai cơ chế Song Long Truy Ảnh và Thiên Tinh Phân Liệt cùng trình diễn trên toàn màn.",
      "visual": "Hai dải long quyển ngọc lam vươn lên, nở thành hai trận mưa sao quay ngược chiều.",
      "choreography": "Hai dải long quyển ngọc lam vươn lên, nở thành hai trận mưa sao quay ngược chiều.",
      "layers": [
        "sss_spiral_stellar_ult_a",
        "sss_spiral_stellar_ult_b"
      ],
      "framesPerLayer": 2
    },
    "parents": [
      "spiral",
      "stellar"
    ],
    "bonus": 0.35,
    "hitFx": "Bệ kép xoắn turbine bạc xanh ngọc. + Đầu phóng chóp sao vàng nhạt, đuôi sao trắng.",
    "flavor": "Hai lõi cộng hưởng Song Long Truy Ảnh và Thiên Tinh Phân Liệt nối thành một hệ chiến đấu. Không thành phần nào bị mất đi sau nghi lễ.",
    "sources": [
      "Hợp thể"
    ],
    "budget": {
      "damagePerSecond": 191.16,
      "defensePerMinute": 234,
      "policy": "Hiệu suất DPS/ATK ±8%; tỷ lệ đầu đạn chạm mục tiêu ≥45%. Giáp so tổng chặn+hồi trong hỗn hợp mưa đạn, đòn nặng và bào mòn."
    },
    "oldId": "sss_spiral_stellar",
    "combat": {
      "damageScale": 1,
      "notes": "DPS thiết kế = ATK sau cường hóa × hiệu suất cố định 1,0. Đạn phải va chạm thật mới cộng sát thương; không chuẩn hóa ngược theo ATK."
    },
    "tuning": {
      "dpsIndex": 1.35,
      "defenseIndex": 1.3
    },
    "reviewStatus": {
      "completeArt": true,
      "missingArt": []
    }
  },
  {
    "id": "sss_stellar_inferno",
    "kind": "missiles",
    "tier": "sss",
    "ring": 5,
    "name": "Tinh Viêm Nhật Vũ",
    "color": "#ffeeb4",
    "second": "#ff8b4e",
    "trait": {
      "name": "Thiên Tinh Phân Liệt",
      "lv": [
        {
          "lv": 1,
          "proc": 0.105,
          "magnitude": 0.8,
          "effect": "Đầu đạn tách sao con giữa quãng bay."
        },
        {
          "lv": 2,
          "proc": 0.1162,
          "magnitude": 0.85,
          "effect": "Đầu đạn tách sao con giữa quãng bay."
        },
        {
          "lv": 3,
          "proc": 0.1275,
          "magnitude": 0.9,
          "effect": "Đầu đạn tách sao con giữa quãng bay."
        },
        {
          "lv": 4,
          "proc": 0.1387,
          "magnitude": 0.95,
          "effect": "Đầu đạn tách sao con giữa quãng bay."
        },
        {
          "lv": 5,
          "proc": 0.15,
          "magnitude": 1,
          "effect": "Đầu đạn tách sao con giữa quãng bay."
        }
      ]
    },
    "traits": [
      {
        "name": "Thiên Tinh Phân Liệt",
        "lv": [
          {
            "lv": 1,
            "proc": 0.105,
            "magnitude": 0.8,
            "effect": "Đầu đạn tách sao con giữa quãng bay. Tỷ lệ đạn cường hóa: 10,5% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 2,
            "proc": 0.1162,
            "magnitude": 0.85,
            "effect": "Đầu đạn tách sao con giữa quãng bay. Tỷ lệ đạn cường hóa: 11,62% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 3,
            "proc": 0.1275,
            "magnitude": 0.9,
            "effect": "Đầu đạn tách sao con giữa quãng bay. Tỷ lệ đạn cường hóa: 12,75% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 4,
            "proc": 0.1387,
            "magnitude": 0.95,
            "effect": "Đầu đạn tách sao con giữa quãng bay. Tỷ lệ đạn cường hóa: 13,87% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 5,
            "proc": 0.15,
            "magnitude": 1,
            "effect": "Đầu đạn tách sao con giữa quãng bay. Tỷ lệ đạn cường hóa: 15% (đạn cường hóa gây thêm 4% sát thương)."
          }
        ]
      },
      {
        "name": "Liệt Hỏa Bộc Phá",
        "lv": [
          {
            "lv": 1,
            "proc": 0.105,
            "magnitude": 0.8,
            "effect": "Vụ nổ gây cháy, nhả tàn lửa trên đường bay. Tỷ lệ đạn cường hóa: 10,5% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 2,
            "proc": 0.1162,
            "magnitude": 0.85,
            "effect": "Vụ nổ gây cháy, nhả tàn lửa trên đường bay. Tỷ lệ đạn cường hóa: 11,62% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 3,
            "proc": 0.1275,
            "magnitude": 0.9,
            "effect": "Vụ nổ gây cháy, nhả tàn lửa trên đường bay. Tỷ lệ đạn cường hóa: 12,75% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 4,
            "proc": 0.1387,
            "magnitude": 0.95,
            "effect": "Vụ nổ gây cháy, nhả tàn lửa trên đường bay. Tỷ lệ đạn cường hóa: 13,87% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 5,
            "proc": 0.15,
            "magnitude": 1,
            "effect": "Vụ nổ gây cháy, nhả tàn lửa trên đường bay. Tỷ lệ đạn cường hóa: 15% (đạn cường hóa gây thêm 4% sát thương)."
          }
        ]
      }
    ],
    "stats": {
      "atk": 132,
      "scoreBonus": 124
    },
    "normal": {
      "pattern": "split",
      "cadence": 0.7,
      "count": 3,
      "speed": 210,
      "pierce": false,
      "homing": 0,
      "notes": "Ba tên lửa tách thành chín sao con tại 60% quãng bay. Đơn vị: spread độ, speed px/giây, cadence giây; số đếm là tổng hai pod với tàu con. Kết hợp Liệt Hỏa Bộc Phá."
    },
    "skill": {
      "name": "Tinh Viêm Phần Nhật",
      "cooldown": 12,
      "duration": 3,
      "effect": "Tên lửa tách thành bốn sao con có khóa mục tiêu, thay cho ba nhánh của bắn thường. Tên lửa tản hướng rồi dồn khóa; vụ nổ chia nhiệt cho các mục tiêu và để cháy trong 2 giây.",
      "visual": "Hai cơ chế phối hợp trong một nhịp khai hỏa."
    },
    "super": {
      "name": "Thiên Tinh Hỏa Vũ",
      "effect": "Vương miện sao tách năm nhánh khóa mục tiêu, thay cho ba nhánh thường. Đầu đạn hai mũi lửa mới, tạo mảnh tàn hỏa dọc đường và cháy sau nổ; hardpoint mở cánh.",
      "visual": "Sao ngà đổi góc cánh và phân thành năm vệt sao con trên đường bay. Đầu đạn cam phun lửa rung lệch nhịp, va chạm bung cánh hỏa liên rồi tàn tro.",
      "formChange": "Cụm chứa sao mở từng cánh, để lộ chùm đầu đạn phân ly. Nắp ống phóng mở, ray nhiệt kép trượt dài và đầu đạn tăng buồng đốt."
    },
    "max": {
      "formChange": "Biến hình 0,35 giây: mở các bản lề, trải cánh quang và đổi màu lõi.",
      "effect": "Vương miện sao tách năm nhánh khóa mục tiêu, thay cho ba nhánh thường. Đầu đạn hai mũi lửa mới, tạo mảnh tàn hỏa dọc đường và cháy sau nổ; hardpoint mở cánh."
    },
    "ult": {
      "name": "VẠN TINH THIÊU THIÊN",
      "duration": 3.6,
      "effect": "Làn sóng xóa đạn sau bước tụ lực; hai cơ chế Thiên Tinh Phân Liệt và Liệt Hỏa Bộc Phá cùng trình diễn trên toàn màn.",
      "visual": "Hạt sao vàng rơi một nhịp rồi bốc lửa thành mưa thiên thạch hướng lên.",
      "choreography": "Hạt sao vàng rơi một nhịp rồi bốc lửa thành mưa thiên thạch hướng lên.",
      "layers": [
        "sss_stellar_inferno_ult_a",
        "sss_stellar_inferno_ult_b"
      ],
      "framesPerLayer": 2
    },
    "parents": [
      "stellar",
      "inferno"
    ],
    "bonus": 0.35,
    "hitFx": "Đầu phóng chóp sao vàng nhạt, đuôi sao trắng. + Bệ đôi miệng đỏ, vệt lửa cam và vòng dung nham.",
    "flavor": "Hai lõi cộng hưởng Thiên Tinh Phân Liệt và Liệt Hỏa Bộc Phá nối thành một hệ chiến đấu. Không thành phần nào bị mất đi sau nghi lễ.",
    "sources": [
      "Hợp thể"
    ],
    "budget": {
      "damagePerSecond": 178.20000000000002,
      "defensePerMinute": 234,
      "policy": "Hiệu suất DPS/ATK ±8%; tỷ lệ đầu đạn chạm mục tiêu ≥45%. Giáp so tổng chặn+hồi trong hỗn hợp mưa đạn, đòn nặng và bào mòn."
    },
    "oldId": null,
    "combat": {
      "damageScale": 1,
      "notes": "DPS thiết kế = ATK sau cường hóa × hiệu suất cố định 1,0. Đạn phải va chạm thật mới cộng sát thương; không chuẩn hóa ngược theo ATK."
    },
    "tuning": {
      "dpsIndex": 1.35,
      "defenseIndex": 1.3
    },
    "reviewStatus": {
      "completeArt": true,
      "missingArt": []
    }
  },
  {
    "id": "sss_rail_disc",
    "kind": "sidearm",
    "tier": "sss",
    "ring": 0,
    "name": "Nguyệt Lôi Thiên Nhận",
    "color": "#70dcff",
    "second": "#d29bff",
    "trait": {
      "name": "Điện Từ Xuyên Tâm",
      "lv": [
        {
          "lv": 1,
          "proc": 0.105,
          "magnitude": 0.8,
          "effect": "Tia ray xuyên mục tiêu theo trục thẳng."
        },
        {
          "lv": 2,
          "proc": 0.1162,
          "magnitude": 0.85,
          "effect": "Tia ray xuyên mục tiêu theo trục thẳng."
        },
        {
          "lv": 3,
          "proc": 0.1275,
          "magnitude": 0.9,
          "effect": "Tia ray xuyên mục tiêu theo trục thẳng."
        },
        {
          "lv": 4,
          "proc": 0.1387,
          "magnitude": 0.95,
          "effect": "Tia ray xuyên mục tiêu theo trục thẳng."
        },
        {
          "lv": 5,
          "proc": 0.15,
          "magnitude": 1,
          "effect": "Tia ray xuyên mục tiêu theo trục thẳng."
        }
      ]
    },
    "traits": [
      {
        "name": "Điện Từ Xuyên Tâm",
        "lv": [
          {
            "lv": 1,
            "proc": 0.105,
            "magnitude": 0.8,
            "effect": "Tia ray xuyên mục tiêu theo trục thẳng. Tỷ lệ đạn cường hóa: 10,5% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 2,
            "proc": 0.1162,
            "magnitude": 0.85,
            "effect": "Tia ray xuyên mục tiêu theo trục thẳng. Tỷ lệ đạn cường hóa: 11,62% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 3,
            "proc": 0.1275,
            "magnitude": 0.9,
            "effect": "Tia ray xuyên mục tiêu theo trục thẳng. Tỷ lệ đạn cường hóa: 12,75% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 4,
            "proc": 0.1387,
            "magnitude": 0.95,
            "effect": "Tia ray xuyên mục tiêu theo trục thẳng. Tỷ lệ đạn cường hóa: 13,87% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 5,
            "proc": 0.15,
            "magnitude": 1,
            "effect": "Tia ray xuyên mục tiêu theo trục thẳng. Tỷ lệ đạn cường hóa: 15% (đạn cường hóa gây thêm 4% sát thương)."
          }
        ]
      },
      {
        "name": "Nguyệt Nhận Hồi Hoàn",
        "lv": [
          {
            "lv": 1,
            "proc": 0.105,
            "magnitude": 0.8,
            "effect": "Lưỡi trăng bay ra rồi hồi về pod. Tỷ lệ đạn cường hóa: 10,5% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 2,
            "proc": 0.1162,
            "magnitude": 0.85,
            "effect": "Lưỡi trăng bay ra rồi hồi về pod. Tỷ lệ đạn cường hóa: 11,62% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 3,
            "proc": 0.1275,
            "magnitude": 0.9,
            "effect": "Lưỡi trăng bay ra rồi hồi về pod. Tỷ lệ đạn cường hóa: 12,75% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 4,
            "proc": 0.1387,
            "magnitude": 0.95,
            "effect": "Lưỡi trăng bay ra rồi hồi về pod. Tỷ lệ đạn cường hóa: 13,87% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 5,
            "proc": 0.15,
            "magnitude": 1,
            "effect": "Lưỡi trăng bay ra rồi hồi về pod. Tỷ lệ đạn cường hóa: 15% (đạn cường hóa gây thêm 4% sát thương)."
          }
        ]
      }
    ],
    "stats": {
      "atk": 122.4,
      "scoreBonus": 124
    },
    "normal": {
      "pattern": "beam",
      "cadence": 0.45,
      "count": 2,
      "speed": 210,
      "pierce": true,
      "homing": 0,
      "notes": "Hai pod tích điện rồi bắn tia thẳng xuyên hai mục tiêu. Đơn vị: spread độ, speed px/giây, cadence giây; số đếm là tổng hai pod với tàu con. Kết hợp Nguyệt Nhận Hồi Hoàn."
    },
    "skill": {
      "name": "Nguyệt Nhận Dẫn Lôi",
      "cooldown": 12,
      "duration": 3,
      "effect": "Tia khóa mục tiêu tích điện nhanh, đánh bốn nhịp liên tục và xuyên các mục tiêu cùng tuyến. Nguyệt nhận vòng cung phóng ra rồi quay về pod; tăng nhịp chém trong thời gian kỹ năng.",
      "visual": "Hai cơ chế phối hợp trong một nhịp khai hỏa."
    },
    "super": {
      "name": "Thiên Nhận Lôi Hành",
      "effect": "Pod mở đại cánh, tạo bốn tuyến ray; mỗi tuyến đánh hai nhịp xuyên và dùng lõi tia mới. Nguyệt nhận kép lớn phóng từ pod bung cánh, quét rộng rồi hồi về hai bên thân tàu.",
      "visual": "Hồ quang cyan chạy dọc lõi, tích sáng rồi nhả các xung ray xuyên thẳng. Nguyệt nhận tím tự quay, chém thành cung cong rồi hồi về hộ tống.",
      "formChange": "Hai pod kéo dài ray điện từ, hai thanh dẫn mở thành bốn nòng. Vỏ pod mở thành cánh cung, lưỡi trăng kép trượt ra khỏi giá xoay."
    },
    "max": {
      "formChange": "Biến hình 0,35 giây: mở các bản lề, trải cánh quang và đổi màu lõi.",
      "effect": "Pod mở đại cánh, tạo bốn tuyến ray; mỗi tuyến đánh hai nhịp xuyên và dùng lõi tia mới. Nguyệt nhận kép lớn phóng từ pod bung cánh, quét rộng rồi hồi về hai bên thân tàu."
    },
    "ult": {
      "name": "NGUYỆT LÔI VẠN TRẢM",
      "duration": 3.6,
      "effect": "Làn sóng xóa đạn sau bước tụ lực; hai cơ chế Điện Từ Xuyên Tâm và Nguyệt Nhận Hồi Hoàn cùng trình diễn trên toàn màn.",
      "visual": "Nguyệt nhận tím quét ngang, ba mũi ray cyan đồng thời xuyên dọc chiến trường.",
      "choreography": "Nguyệt nhận tím quét ngang, ba mũi ray cyan đồng thời xuyên dọc chiến trường.",
      "layers": [
        "sss_rail_disc_ult_a",
        "sss_rail_disc_ult_b"
      ],
      "framesPerLayer": 2
    },
    "parents": [
      "rail",
      "disc"
    ],
    "bonus": 0.35,
    "hitFx": "Nòng ray dài cyan, tia trắng lõi xanh. + Lưỡi trăng tím bạc cùng vệt cong.",
    "flavor": "Hai lõi cộng hưởng Điện Từ Xuyên Tâm và Nguyệt Nhận Hồi Hoàn nối thành một hệ chiến đấu. Không thành phần nào bị mất đi sau nghi lễ.",
    "sources": [
      "Hợp thể"
    ],
    "budget": {
      "damagePerSecond": 165.24,
      "defensePerMinute": 234,
      "policy": "Hiệu suất DPS/ATK ±8%; tỷ lệ đầu đạn chạm mục tiêu ≥45%. Giáp so tổng chặn+hồi trong hỗn hợp mưa đạn, đòn nặng và bào mòn."
    },
    "oldId": "sss_rail_disc",
    "combat": {
      "damageScale": 1,
      "notes": "DPS thiết kế = ATK sau cường hóa × hiệu suất cố định 1,0. Đạn phải va chạm thật mới cộng sát thương; không chuẩn hóa ngược theo ATK."
    },
    "tuning": {
      "dpsIndex": 1.35,
      "defenseIndex": 1.3
    },
    "reviewStatus": {
      "completeArt": true,
      "missingArt": []
    }
  },
  {
    "id": "sss_disc_solar",
    "kind": "sidearm",
    "tier": "sss",
    "ring": 1,
    "name": "Nhật Nguyệt Luân Hoàng",
    "color": "#d29bff",
    "second": "#ffaa60",
    "trait": {
      "name": "Nguyệt Nhận Hồi Hoàn",
      "lv": [
        {
          "lv": 1,
          "proc": 0.105,
          "magnitude": 0.8,
          "effect": "Lưỡi trăng bay ra rồi hồi về pod."
        },
        {
          "lv": 2,
          "proc": 0.1162,
          "magnitude": 0.85,
          "effect": "Lưỡi trăng bay ra rồi hồi về pod."
        },
        {
          "lv": 3,
          "proc": 0.1275,
          "magnitude": 0.9,
          "effect": "Lưỡi trăng bay ra rồi hồi về pod."
        },
        {
          "lv": 4,
          "proc": 0.1387,
          "magnitude": 0.95,
          "effect": "Lưỡi trăng bay ra rồi hồi về pod."
        },
        {
          "lv": 5,
          "proc": 0.15,
          "magnitude": 1,
          "effect": "Lưỡi trăng bay ra rồi hồi về pod."
        }
      ]
    },
    "traits": [
      {
        "name": "Nguyệt Nhận Hồi Hoàn",
        "lv": [
          {
            "lv": 1,
            "proc": 0.105,
            "magnitude": 0.8,
            "effect": "Lưỡi trăng bay ra rồi hồi về pod. Tỷ lệ đạn cường hóa: 10,5% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 2,
            "proc": 0.1162,
            "magnitude": 0.85,
            "effect": "Lưỡi trăng bay ra rồi hồi về pod. Tỷ lệ đạn cường hóa: 11,62% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 3,
            "proc": 0.1275,
            "magnitude": 0.9,
            "effect": "Lưỡi trăng bay ra rồi hồi về pod. Tỷ lệ đạn cường hóa: 12,75% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 4,
            "proc": 0.1387,
            "magnitude": 0.95,
            "effect": "Lưỡi trăng bay ra rồi hồi về pod. Tỷ lệ đạn cường hóa: 13,87% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 5,
            "proc": 0.15,
            "magnitude": 1,
            "effect": "Lưỡi trăng bay ra rồi hồi về pod. Tỷ lệ đạn cường hóa: 15% (đạn cường hóa gây thêm 4% sát thương)."
          }
        ]
      },
      {
        "name": "Nhật Hạch Bạo Liệt",
        "lv": [
          {
            "lv": 1,
            "proc": 0.105,
            "magnitude": 0.8,
            "effect": "Cầu mặt trời nổ, để vành nhiệt. Tỷ lệ đạn cường hóa: 10,5% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 2,
            "proc": 0.1162,
            "magnitude": 0.85,
            "effect": "Cầu mặt trời nổ, để vành nhiệt. Tỷ lệ đạn cường hóa: 11,62% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 3,
            "proc": 0.1275,
            "magnitude": 0.9,
            "effect": "Cầu mặt trời nổ, để vành nhiệt. Tỷ lệ đạn cường hóa: 12,75% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 4,
            "proc": 0.1387,
            "magnitude": 0.95,
            "effect": "Cầu mặt trời nổ, để vành nhiệt. Tỷ lệ đạn cường hóa: 13,87% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 5,
            "proc": 0.15,
            "magnitude": 1,
            "effect": "Cầu mặt trời nổ, để vành nhiệt. Tỷ lệ đạn cường hóa: 15% (đạn cường hóa gây thêm 4% sát thương)."
          }
        ]
      }
    ],
    "stats": {
      "atk": 127.2,
      "scoreBonus": 124
    },
    "normal": {
      "pattern": "orbit",
      "cadence": 0.45,
      "count": 2,
      "speed": 210,
      "pierce": true,
      "homing": 0,
      "notes": "Hai đĩa lưỡi liềm bay ra rồi quay về pod, mỗi lượt trúng một lần. Đơn vị: spread độ, speed px/giây, cadence giây; số đếm là tổng hai pod với tàu con. Kết hợp Nhật Hạch Bạo Liệt."
    },
    "skill": {
      "name": "Nhật Nguyệt Song Luân",
      "cooldown": 12,
      "duration": 3,
      "effect": "Nguyệt nhận vòng cung phóng ra rồi quay về pod; tăng nhịp chém trong thời gian kỹ năng. Cầu mặt trời quay quanh chiến cơ trước khi lao ra và nổ trên các mục tiêu.",
      "visual": "Hai cơ chế phối hợp trong một nhịp khai hỏa."
    },
    "super": {
      "name": "Lưỡng Nghi Thiên Vũ",
      "effect": "Nguyệt nhận kép lớn phóng từ pod bung cánh, quét rộng rồi hồi về hai bên thân tàu. Nhật cầu mới có vành năng lượng lớn, nổ lan trên các mục tiêu; pod mở sáu cánh.",
      "visual": "Nguyệt nhận tím tự quay, chém thành cung cong rồi hồi về hộ tống. Cầu nhật viêm đổi lưỡi lửa theo nhịp, bùng vành nhật miện rồi rơi tàn.",
      "formChange": "Vỏ pod mở thành cánh cung, lưỡi trăng kép trượt ra khỏi giá xoay. Bốn lá tản nhiệt tách quanh lõi mặt trời; buồng cầu lửa mở hoàn toàn."
    },
    "max": {
      "formChange": "Biến hình 0,35 giây: mở các bản lề, trải cánh quang và đổi màu lõi.",
      "effect": "Nguyệt nhận kép lớn phóng từ pod bung cánh, quét rộng rồi hồi về hai bên thân tàu. Nhật cầu mới có vành năng lượng lớn, nổ lan trên các mục tiêu; pod mở sáu cánh."
    },
    "ult": {
      "name": "NHẬT NGUYỆT ĐỒNG THIÊN",
      "duration": 3.6,
      "effect": "Làn sóng xóa đạn sau bước tụ lực; hai cơ chế Nguyệt Nhận Hồi Hoàn và Nhật Hạch Bạo Liệt cùng trình diễn trên toàn màn.",
      "visual": "Nhật luân cam và nguyệt luân tím quay trên hai quỹ đạo đối nhau, cắt kéo qua mục tiêu.",
      "choreography": "Nhật luân cam và nguyệt luân tím quay trên hai quỹ đạo đối nhau, cắt kéo qua mục tiêu.",
      "layers": [
        "sss_disc_solar_ult_a",
        "sss_disc_solar_ult_b"
      ],
      "framesPerLayer": 2
    },
    "parents": [
      "disc",
      "solar"
    ],
    "bonus": 0.35,
    "hitFx": "Lưỡi trăng tím bạc cùng vệt cong. + Lõi mặt trời cam, cầu lửa có vành nhật miện.",
    "flavor": "Hai lõi cộng hưởng Nguyệt Nhận Hồi Hoàn và Nhật Hạch Bạo Liệt nối thành một hệ chiến đấu. Không thành phần nào bị mất đi sau nghi lễ.",
    "sources": [
      "Hợp thể"
    ],
    "budget": {
      "damagePerSecond": 171.72000000000003,
      "defensePerMinute": 234,
      "policy": "Hiệu suất DPS/ATK ±8%; tỷ lệ đầu đạn chạm mục tiêu ≥45%. Giáp so tổng chặn+hồi trong hỗn hợp mưa đạn, đòn nặng và bào mòn."
    },
    "oldId": null,
    "combat": {
      "damageScale": 1,
      "notes": "DPS thiết kế = ATK sau cường hóa × hiệu suất cố định 1,0. Đạn phải va chạm thật mới cộng sát thương; không chuẩn hóa ngược theo ATK."
    },
    "tuning": {
      "dpsIndex": 1.35,
      "defenseIndex": 1.3
    },
    "reviewStatus": {
      "completeArt": true,
      "missingArt": []
    }
  },
  {
    "id": "sss_solar_gravity",
    "kind": "sidearm",
    "tier": "sss",
    "ring": 2,
    "name": "Nhật Uyên Thần Pháo",
    "color": "#ffaa60",
    "second": "#ef94ff",
    "trait": {
      "name": "Nhật Hạch Bạo Liệt",
      "lv": [
        {
          "lv": 1,
          "proc": 0.105,
          "magnitude": 0.8,
          "effect": "Cầu mặt trời nổ, để vành nhiệt."
        },
        {
          "lv": 2,
          "proc": 0.1162,
          "magnitude": 0.85,
          "effect": "Cầu mặt trời nổ, để vành nhiệt."
        },
        {
          "lv": 3,
          "proc": 0.1275,
          "magnitude": 0.9,
          "effect": "Cầu mặt trời nổ, để vành nhiệt."
        },
        {
          "lv": 4,
          "proc": 0.1387,
          "magnitude": 0.95,
          "effect": "Cầu mặt trời nổ, để vành nhiệt."
        },
        {
          "lv": 5,
          "proc": 0.15,
          "magnitude": 1,
          "effect": "Cầu mặt trời nổ, để vành nhiệt."
        }
      ]
    },
    "traits": [
      {
        "name": "Nhật Hạch Bạo Liệt",
        "lv": [
          {
            "lv": 1,
            "proc": 0.105,
            "magnitude": 0.8,
            "effect": "Cầu mặt trời nổ, để vành nhiệt. Tỷ lệ đạn cường hóa: 10,5% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 2,
            "proc": 0.1162,
            "magnitude": 0.85,
            "effect": "Cầu mặt trời nổ, để vành nhiệt. Tỷ lệ đạn cường hóa: 11,62% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 3,
            "proc": 0.1275,
            "magnitude": 0.9,
            "effect": "Cầu mặt trời nổ, để vành nhiệt. Tỷ lệ đạn cường hóa: 12,75% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 4,
            "proc": 0.1387,
            "magnitude": 0.95,
            "effect": "Cầu mặt trời nổ, để vành nhiệt. Tỷ lệ đạn cường hóa: 13,87% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 5,
            "proc": 0.15,
            "magnitude": 1,
            "effect": "Cầu mặt trời nổ, để vành nhiệt. Tỷ lệ đạn cường hóa: 15% (đạn cường hóa gây thêm 4% sát thương)."
          }
        ]
      },
      {
        "name": "Trọng Vực Hội Tụ",
        "lv": [
          {
            "lv": 1,
            "proc": 0.105,
            "magnitude": 0.8,
            "effect": "Cầu hấp dẫn tụ mục tiêu về tâm xoáy. Tỷ lệ đạn cường hóa: 10,5% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 2,
            "proc": 0.1162,
            "magnitude": 0.85,
            "effect": "Cầu hấp dẫn tụ mục tiêu về tâm xoáy. Tỷ lệ đạn cường hóa: 11,62% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 3,
            "proc": 0.1275,
            "magnitude": 0.9,
            "effect": "Cầu hấp dẫn tụ mục tiêu về tâm xoáy. Tỷ lệ đạn cường hóa: 12,75% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 4,
            "proc": 0.1387,
            "magnitude": 0.95,
            "effect": "Cầu hấp dẫn tụ mục tiêu về tâm xoáy. Tỷ lệ đạn cường hóa: 13,87% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 5,
            "proc": 0.15,
            "magnitude": 1,
            "effect": "Cầu hấp dẫn tụ mục tiêu về tâm xoáy. Tỷ lệ đạn cường hóa: 15% (đạn cường hóa gây thêm 4% sát thương)."
          }
        ]
      }
    ],
    "stats": {
      "atk": 132,
      "scoreBonus": 124
    },
    "normal": {
      "pattern": "straight",
      "cadence": 0.45,
      "count": 2,
      "speed": 210,
      "pierce": false,
      "homing": 0,
      "notes": "Hai cầu mặt trời nổ lan và để vòng nhiệt 1,5 giây. Đơn vị: spread độ, speed px/giây, cadence giây; số đếm là tổng hai pod với tàu con. Kết hợp Trọng Vực Hội Tụ."
    },
    "skill": {
      "name": "Nhật Hạch Quy Uyên",
      "cooldown": 12,
      "duration": 3,
      "effect": "Cầu mặt trời quay quanh chiến cơ trước khi lao ra và nổ trên các mục tiêu. Hai tâm trọng lực được đặt trước tuyến bay, gom mục tiêu nhỏ và thu đạn địch.",
      "visual": "Hai cơ chế phối hợp trong một nhịp khai hỏa."
    },
    "super": {
      "name": "Thiên Dương Trọng Vực",
      "effect": "Nhật cầu mới có vành năng lượng lớn, nổ lan trên các mục tiêu; pod mở sáu cánh. Vòng cầu trọng lực mở ra, tâm xoáy bắt đạn địch và đổi thành xung phản công.",
      "visual": "Cầu nhật viêm đổi lưỡi lửa theo nhịp, bùng vành nhật miện rồi rơi tàn. Tay xoáy hồng luân chuyển quanh tâm rỗng, kéo mục tiêu nhỏ và hút đạn.",
      "formChange": "Bốn lá tản nhiệt tách quanh lõi mặt trời; buồng cầu lửa mở hoàn toàn. Vỏ cầu mở bốn hướng, vòng dẫn trọng lực tách thành hai tầng."
    },
    "max": {
      "formChange": "Biến hình 0,35 giây: mở các bản lề, trải cánh quang và đổi màu lõi.",
      "effect": "Nhật cầu mới có vành năng lượng lớn, nổ lan trên các mục tiêu; pod mở sáu cánh. Vòng cầu trọng lực mở ra, tâm xoáy bắt đạn địch và đổi thành xung phản công."
    },
    "ult": {
      "name": "NHẬT UYÊN THÔN THIÊN",
      "duration": 3.6,
      "effect": "Làn sóng xóa đạn sau bước tụ lực; hai cơ chế Nhật Hạch Bạo Liệt và Trọng Vực Hội Tụ cùng trình diễn trên toàn màn.",
      "visual": "Hai giếng hồng nén lõi mặt trời, rồi giải phóng một cột nhật viêm bị uốn cong hướng lên.",
      "choreography": "Hai giếng hồng nén lõi mặt trời, rồi giải phóng một cột nhật viêm bị uốn cong hướng lên.",
      "layers": [
        "sss_solar_gravity_ult_a",
        "sss_solar_gravity_ult_b"
      ],
      "framesPerLayer": 2
    },
    "parents": [
      "solar",
      "gravity"
    ],
    "bonus": 0.35,
    "hitFx": "Lõi mặt trời cam, cầu lửa có vành nhật miện. + Cầu tím hồng nằm trong vòng cánh hấp dẫn.",
    "flavor": "Hai lõi cộng hưởng Nhật Hạch Bạo Liệt và Trọng Vực Hội Tụ nối thành một hệ chiến đấu. Không thành phần nào bị mất đi sau nghi lễ.",
    "sources": [
      "Hợp thể"
    ],
    "budget": {
      "damagePerSecond": 178.20000000000002,
      "defensePerMinute": 234,
      "policy": "Hiệu suất DPS/ATK ±8%; tỷ lệ đầu đạn chạm mục tiêu ≥45%. Giáp so tổng chặn+hồi trong hỗn hợp mưa đạn, đòn nặng và bào mòn."
    },
    "oldId": "sss_solar_gravity",
    "combat": {
      "damageScale": 1,
      "notes": "DPS thiết kế = ATK sau cường hóa × hiệu suất cố định 1,0. Đạn phải va chạm thật mới cộng sát thương; không chuẩn hóa ngược theo ATK."
    },
    "tuning": {
      "dpsIndex": 1.35,
      "defenseIndex": 1.3
    },
    "reviewStatus": {
      "completeArt": true,
      "missingArt": []
    }
  },
  {
    "id": "sss_gravity_ricochet",
    "kind": "sidearm",
    "tier": "sss",
    "ring": 3,
    "name": "Huyền Lăng Trọng Đế",
    "color": "#ef94ff",
    "second": "#8affb8",
    "trait": {
      "name": "Trọng Vực Hội Tụ",
      "lv": [
        {
          "lv": 1,
          "proc": 0.105,
          "magnitude": 0.8,
          "effect": "Cầu hấp dẫn tụ mục tiêu về tâm xoáy."
        },
        {
          "lv": 2,
          "proc": 0.1162,
          "magnitude": 0.85,
          "effect": "Cầu hấp dẫn tụ mục tiêu về tâm xoáy."
        },
        {
          "lv": 3,
          "proc": 0.1275,
          "magnitude": 0.9,
          "effect": "Cầu hấp dẫn tụ mục tiêu về tâm xoáy."
        },
        {
          "lv": 4,
          "proc": 0.1387,
          "magnitude": 0.95,
          "effect": "Cầu hấp dẫn tụ mục tiêu về tâm xoáy."
        },
        {
          "lv": 5,
          "proc": 0.15,
          "magnitude": 1,
          "effect": "Cầu hấp dẫn tụ mục tiêu về tâm xoáy."
        }
      ]
    },
    "traits": [
      {
        "name": "Trọng Vực Hội Tụ",
        "lv": [
          {
            "lv": 1,
            "proc": 0.105,
            "magnitude": 0.8,
            "effect": "Cầu hấp dẫn tụ mục tiêu về tâm xoáy. Tỷ lệ đạn cường hóa: 10,5% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 2,
            "proc": 0.1162,
            "magnitude": 0.85,
            "effect": "Cầu hấp dẫn tụ mục tiêu về tâm xoáy. Tỷ lệ đạn cường hóa: 11,62% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 3,
            "proc": 0.1275,
            "magnitude": 0.9,
            "effect": "Cầu hấp dẫn tụ mục tiêu về tâm xoáy. Tỷ lệ đạn cường hóa: 12,75% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 4,
            "proc": 0.1387,
            "magnitude": 0.95,
            "effect": "Cầu hấp dẫn tụ mục tiêu về tâm xoáy. Tỷ lệ đạn cường hóa: 13,87% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 5,
            "proc": 0.15,
            "magnitude": 1,
            "effect": "Cầu hấp dẫn tụ mục tiêu về tâm xoáy. Tỷ lệ đạn cường hóa: 15% (đạn cường hóa gây thêm 4% sát thương)."
          }
        ]
      },
      {
        "name": "Lục Lăng Chiết Xạ",
        "lv": [
          {
            "lv": 1,
            "proc": 0.105,
            "magnitude": 0.8,
            "effect": "Đạn khúc xạ nảy biên rồi khóa lại mục tiêu. Tỷ lệ đạn cường hóa: 10,5% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 2,
            "proc": 0.1162,
            "magnitude": 0.85,
            "effect": "Đạn khúc xạ nảy biên rồi khóa lại mục tiêu. Tỷ lệ đạn cường hóa: 11,62% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 3,
            "proc": 0.1275,
            "magnitude": 0.9,
            "effect": "Đạn khúc xạ nảy biên rồi khóa lại mục tiêu. Tỷ lệ đạn cường hóa: 12,75% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 4,
            "proc": 0.1387,
            "magnitude": 0.95,
            "effect": "Đạn khúc xạ nảy biên rồi khóa lại mục tiêu. Tỷ lệ đạn cường hóa: 13,87% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 5,
            "proc": 0.15,
            "magnitude": 1,
            "effect": "Đạn khúc xạ nảy biên rồi khóa lại mục tiêu. Tỷ lệ đạn cường hóa: 15% (đạn cường hóa gây thêm 4% sát thương)."
          }
        ]
      }
    ],
    "stats": {
      "atk": 136.8,
      "scoreBonus": 124
    },
    "normal": {
      "pattern": "vortex",
      "cadence": 0.45,
      "count": 2,
      "speed": 210,
      "pierce": false,
      "homing": 0.45,
      "notes": "Hai cầu xoáy kéo quái nhỏ về tâm và làm chậm đạn nhẹ. Đơn vị: spread độ, speed px/giây, cadence giây; số đếm là tổng hai pod với tàu con. Kết hợp Lục Lăng Chiết Xạ."
    },
    "skill": {
      "name": "Huyền Lăng Dẫn Lực",
      "cooldown": 12,
      "duration": 3,
      "effect": "Hai tâm trọng lực được đặt trước tuyến bay, gom mục tiêu nhỏ và thu đạn địch. Đạn lục lăng bật hướng ở biên rồi khóa lại mục tiêu bằng đoạn gãy khúc.",
      "visual": "Hai cơ chế phối hợp trong một nhịp khai hỏa."
    },
    "super": {
      "name": "Vạn Chiết Trọng Lao",
      "effect": "Vòng cầu trọng lực mở ra, tâm xoáy bắt đạn địch và đổi thành xung phản công. Đạn lục lăng mới bẻ góc liên tiếp trước khi khóa mục tiêu, pod bung các mặt phản xạ.",
      "visual": "Tay xoáy hồng luân chuyển quanh tâm rỗng, kéo mục tiêu nhỏ và hút đạn. Tinh thể xanh xoay mặt, nảy theo đường gấp khúc trước khi khóa đích.",
      "formChange": "Vỏ cầu mở bốn hướng, vòng dẫn trọng lực tách thành hai tầng. Sáu phiến lăng kính xoay lệch, giá phóng mở đường dẫn khúc xạ."
    },
    "max": {
      "formChange": "Biến hình 0,35 giây: mở các bản lề, trải cánh quang và đổi màu lõi.",
      "effect": "Vòng cầu trọng lực mở ra, tâm xoáy bắt đạn địch và đổi thành xung phản công. Đạn lục lăng mới bẻ góc liên tiếp trước khi khóa mục tiêu, pod bung các mặt phản xạ."
    },
    "ult": {
      "name": "VẠN CHIẾT HƯ UYÊN",
      "duration": 3.6,
      "effect": "Làn sóng xóa đạn sau bước tụ lực; hai cơ chế Trọng Vực Hội Tụ và Lục Lăng Chiết Xạ cùng trình diễn trên toàn màn.",
      "visual": "Giếng trọng lực hồng bẻ đường đạn xanh thành lồng khúc xạ đa giác lan rộng.",
      "choreography": "Giếng trọng lực hồng bẻ đường đạn xanh thành lồng khúc xạ đa giác lan rộng.",
      "layers": [
        "sss_gravity_ricochet_ult_a",
        "sss_gravity_ricochet_ult_b"
      ],
      "framesPerLayer": 2
    },
    "parents": [
      "gravity",
      "ricochet"
    ],
    "bonus": 0.35,
    "hitFx": "Cầu tím hồng nằm trong vòng cánh hấp dẫn. + Thân lục giác xanh lục, tia gãy khúc.",
    "flavor": "Hai lõi cộng hưởng Trọng Vực Hội Tụ và Lục Lăng Chiết Xạ nối thành một hệ chiến đấu. Không thành phần nào bị mất đi sau nghi lễ.",
    "sources": [
      "Hợp thể"
    ],
    "budget": {
      "damagePerSecond": 184.68000000000004,
      "defensePerMinute": 234,
      "policy": "Hiệu suất DPS/ATK ±8%; tỷ lệ đầu đạn chạm mục tiêu ≥45%. Giáp so tổng chặn+hồi trong hỗn hợp mưa đạn, đòn nặng và bào mòn."
    },
    "oldId": null,
    "combat": {
      "damageScale": 1,
      "notes": "DPS thiết kế = ATK sau cường hóa × hiệu suất cố định 1,0. Đạn phải va chạm thật mới cộng sát thương; không chuẩn hóa ngược theo ATK."
    },
    "tuning": {
      "dpsIndex": 1.35,
      "defenseIndex": 1.3
    },
    "reviewStatus": {
      "completeArt": true,
      "missingArt": []
    }
  },
  {
    "id": "sss_ricochet_prism",
    "kind": "sidearm",
    "tier": "sss",
    "ring": 4,
    "name": "Lục Lăng Băng Đế",
    "color": "#8affb8",
    "second": "#9eeeff",
    "trait": {
      "name": "Lục Lăng Chiết Xạ",
      "lv": [
        {
          "lv": 1,
          "proc": 0.105,
          "magnitude": 0.8,
          "effect": "Đạn khúc xạ nảy biên rồi khóa lại mục tiêu."
        },
        {
          "lv": 2,
          "proc": 0.1162,
          "magnitude": 0.85,
          "effect": "Đạn khúc xạ nảy biên rồi khóa lại mục tiêu."
        },
        {
          "lv": 3,
          "proc": 0.1275,
          "magnitude": 0.9,
          "effect": "Đạn khúc xạ nảy biên rồi khóa lại mục tiêu."
        },
        {
          "lv": 4,
          "proc": 0.1387,
          "magnitude": 0.95,
          "effect": "Đạn khúc xạ nảy biên rồi khóa lại mục tiêu."
        },
        {
          "lv": 5,
          "proc": 0.15,
          "magnitude": 1,
          "effect": "Đạn khúc xạ nảy biên rồi khóa lại mục tiêu."
        }
      ]
    },
    "traits": [
      {
        "name": "Lục Lăng Chiết Xạ",
        "lv": [
          {
            "lv": 1,
            "proc": 0.105,
            "magnitude": 0.8,
            "effect": "Đạn khúc xạ nảy biên rồi khóa lại mục tiêu. Tỷ lệ đạn cường hóa: 10,5% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 2,
            "proc": 0.1162,
            "magnitude": 0.85,
            "effect": "Đạn khúc xạ nảy biên rồi khóa lại mục tiêu. Tỷ lệ đạn cường hóa: 11,62% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 3,
            "proc": 0.1275,
            "magnitude": 0.9,
            "effect": "Đạn khúc xạ nảy biên rồi khóa lại mục tiêu. Tỷ lệ đạn cường hóa: 12,75% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 4,
            "proc": 0.1387,
            "magnitude": 0.95,
            "effect": "Đạn khúc xạ nảy biên rồi khóa lại mục tiêu. Tỷ lệ đạn cường hóa: 13,87% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 5,
            "proc": 0.15,
            "magnitude": 1,
            "effect": "Đạn khúc xạ nảy biên rồi khóa lại mục tiêu. Tỷ lệ đạn cường hóa: 15% (đạn cường hóa gây thêm 4% sát thương)."
          }
        ]
      },
      {
        "name": "Hàn Tinh Quang Mạc",
        "lv": [
          {
            "lv": 1,
            "proc": 0.105,
            "magnitude": 0.8,
            "effect": "Phiến tinh thể làm chậm và vỡ thành mảnh nhỏ. Tỷ lệ đạn cường hóa: 10,5% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 2,
            "proc": 0.1162,
            "magnitude": 0.85,
            "effect": "Phiến tinh thể làm chậm và vỡ thành mảnh nhỏ. Tỷ lệ đạn cường hóa: 11,62% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 3,
            "proc": 0.1275,
            "magnitude": 0.9,
            "effect": "Phiến tinh thể làm chậm và vỡ thành mảnh nhỏ. Tỷ lệ đạn cường hóa: 12,75% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 4,
            "proc": 0.1387,
            "magnitude": 0.95,
            "effect": "Phiến tinh thể làm chậm và vỡ thành mảnh nhỏ. Tỷ lệ đạn cường hóa: 13,87% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 5,
            "proc": 0.15,
            "magnitude": 1,
            "effect": "Phiến tinh thể làm chậm và vỡ thành mảnh nhỏ. Tỷ lệ đạn cường hóa: 15% (đạn cường hóa gây thêm 4% sát thương)."
          }
        ]
      }
    ],
    "stats": {
      "atk": 141.6,
      "scoreBonus": 124
    },
    "normal": {
      "pattern": "bounce",
      "cadence": 0.45,
      "count": 4,
      "speed": 210,
      "pierce": false,
      "homing": 0,
      "notes": "Đạn lăng kính nảy biên tối đa hai lần và đổi hướng về mục tiêu. Đơn vị: spread độ, speed px/giây, cadence giây; số đếm là tổng hai pod với tàu con. Kết hợp Hàn Tinh Quang Mạc."
    },
    "skill": {
      "name": "Lục Lăng Ngưng Tuyết",
      "cooldown": 12,
      "duration": 3,
      "effect": "Đạn lục lăng bật hướng ở biên rồi khóa lại mục tiêu bằng đoạn gãy khúc. Tạo trường hàn tinh làm chậm vùng mục tiêu, các mũi băng tiếp tục tỏa quạt vào trận địa.",
      "visual": "Hai cơ chế phối hợp trong một nhịp khai hỏa."
    },
    "super": {
      "name": "Thiên Kính Băng Lao",
      "effect": "Đạn lục lăng mới bẻ góc liên tiếp trước khi khóa mục tiêu, pod bung các mặt phản xạ. Phiến băng mới chuyển mục tiêu sau lần trúng đầu, để trường hàn tinh ở điểm nổ.",
      "visual": "Tinh thể xanh xoay mặt, nảy theo đường gấp khúc trước khi khóa đích. Mũi băng xanh nhạt đổi mặt tinh thể, vỡ thành kim tuyết để lại vùng chậm.",
      "formChange": "Sáu phiến lăng kính xoay lệch, giá phóng mở đường dẫn khúc xạ. Cụm tinh thể mở thành quạt băng, lõi pháo lộ đường dẫn hàn quang."
    },
    "max": {
      "formChange": "Biến hình 0,35 giây: mở các bản lề, trải cánh quang và đổi màu lõi.",
      "effect": "Đạn lục lăng mới bẻ góc liên tiếp trước khi khóa mục tiêu, pod bung các mặt phản xạ. Phiến băng mới chuyển mục tiêu sau lần trúng đầu, để trường hàn tinh ở điểm nổ."
    },
    "ult": {
      "name": "BĂNG LĂNG VẠN QUANG",
      "duration": 3.6,
      "effect": "Làn sóng xóa đạn sau bước tụ lực; hai cơ chế Lục Lăng Chiết Xạ và Hàn Tinh Quang Mạc cùng trình diễn trên toàn màn.",
      "visual": "Hoa băng kết ở tâm, kim băng nảy qua sáu lăng kính lục tạo lưới sao sắc lạnh.",
      "choreography": "Hoa băng kết ở tâm, kim băng nảy qua sáu lăng kính lục tạo lưới sao sắc lạnh.",
      "layers": [
        "sss_ricochet_prism_ult_a",
        "sss_ricochet_prism_ult_b"
      ],
      "framesPerLayer": 2
    },
    "parents": [
      "ricochet",
      "prism"
    ],
    "bonus": 0.35,
    "hitFx": "Thân lục giác xanh lục, tia gãy khúc. + Cụm tinh thể cyan tím nhạt, tia băng tán góc.",
    "flavor": "Hai lõi cộng hưởng Lục Lăng Chiết Xạ và Hàn Tinh Quang Mạc nối thành một hệ chiến đấu. Không thành phần nào bị mất đi sau nghi lễ.",
    "sources": [
      "Hợp thể"
    ],
    "budget": {
      "damagePerSecond": 191.16,
      "defensePerMinute": 234,
      "policy": "Hiệu suất DPS/ATK ±8%; tỷ lệ đầu đạn chạm mục tiêu ≥45%. Giáp so tổng chặn+hồi trong hỗn hợp mưa đạn, đòn nặng và bào mòn."
    },
    "oldId": "sss_ricochet_prism",
    "combat": {
      "damageScale": 1,
      "notes": "DPS thiết kế = ATK sau cường hóa × hiệu suất cố định 1,0. Đạn phải va chạm thật mới cộng sát thương; không chuẩn hóa ngược theo ATK."
    },
    "tuning": {
      "dpsIndex": 1.35,
      "defenseIndex": 1.3
    },
    "reviewStatus": {
      "completeArt": true,
      "missingArt": []
    }
  },
  {
    "id": "sss_prism_rail",
    "kind": "sidearm",
    "tier": "sss",
    "ring": 5,
    "name": "Hàn Quang Điện Hoàng",
    "color": "#9eeeff",
    "second": "#70dcff",
    "trait": {
      "name": "Hàn Tinh Quang Mạc",
      "lv": [
        {
          "lv": 1,
          "proc": 0.105,
          "magnitude": 0.8,
          "effect": "Phiến tinh thể làm chậm và vỡ thành mảnh nhỏ."
        },
        {
          "lv": 2,
          "proc": 0.1162,
          "magnitude": 0.85,
          "effect": "Phiến tinh thể làm chậm và vỡ thành mảnh nhỏ."
        },
        {
          "lv": 3,
          "proc": 0.1275,
          "magnitude": 0.9,
          "effect": "Phiến tinh thể làm chậm và vỡ thành mảnh nhỏ."
        },
        {
          "lv": 4,
          "proc": 0.1387,
          "magnitude": 0.95,
          "effect": "Phiến tinh thể làm chậm và vỡ thành mảnh nhỏ."
        },
        {
          "lv": 5,
          "proc": 0.15,
          "magnitude": 1,
          "effect": "Phiến tinh thể làm chậm và vỡ thành mảnh nhỏ."
        }
      ]
    },
    "traits": [
      {
        "name": "Hàn Tinh Quang Mạc",
        "lv": [
          {
            "lv": 1,
            "proc": 0.105,
            "magnitude": 0.8,
            "effect": "Phiến tinh thể làm chậm và vỡ thành mảnh nhỏ. Tỷ lệ đạn cường hóa: 10,5% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 2,
            "proc": 0.1162,
            "magnitude": 0.85,
            "effect": "Phiến tinh thể làm chậm và vỡ thành mảnh nhỏ. Tỷ lệ đạn cường hóa: 11,62% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 3,
            "proc": 0.1275,
            "magnitude": 0.9,
            "effect": "Phiến tinh thể làm chậm và vỡ thành mảnh nhỏ. Tỷ lệ đạn cường hóa: 12,75% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 4,
            "proc": 0.1387,
            "magnitude": 0.95,
            "effect": "Phiến tinh thể làm chậm và vỡ thành mảnh nhỏ. Tỷ lệ đạn cường hóa: 13,87% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 5,
            "proc": 0.15,
            "magnitude": 1,
            "effect": "Phiến tinh thể làm chậm và vỡ thành mảnh nhỏ. Tỷ lệ đạn cường hóa: 15% (đạn cường hóa gây thêm 4% sát thương)."
          }
        ]
      },
      {
        "name": "Điện Từ Xuyên Tâm",
        "lv": [
          {
            "lv": 1,
            "proc": 0.105,
            "magnitude": 0.8,
            "effect": "Tia ray xuyên mục tiêu theo trục thẳng. Tỷ lệ đạn cường hóa: 10,5% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 2,
            "proc": 0.1162,
            "magnitude": 0.85,
            "effect": "Tia ray xuyên mục tiêu theo trục thẳng. Tỷ lệ đạn cường hóa: 11,62% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 3,
            "proc": 0.1275,
            "magnitude": 0.9,
            "effect": "Tia ray xuyên mục tiêu theo trục thẳng. Tỷ lệ đạn cường hóa: 12,75% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 4,
            "proc": 0.1387,
            "magnitude": 0.95,
            "effect": "Tia ray xuyên mục tiêu theo trục thẳng. Tỷ lệ đạn cường hóa: 13,87% (đạn cường hóa gây thêm 4% sát thương)."
          },
          {
            "lv": 5,
            "proc": 0.15,
            "magnitude": 1,
            "effect": "Tia ray xuyên mục tiêu theo trục thẳng. Tỷ lệ đạn cường hóa: 15% (đạn cường hóa gây thêm 4% sát thương)."
          }
        ]
      }
    ],
    "stats": {
      "atk": 132,
      "scoreBonus": 124
    },
    "normal": {
      "pattern": "fan",
      "cadence": 0.45,
      "count": 6,
      "speed": 210,
      "pierce": false,
      "homing": 0,
      "notes": "Mỗi pod bắn ba tinh thể băng hình quạt, làm chậm 25% trong 2 giây. Đơn vị: spread độ, speed px/giây, cadence giây; số đếm là tổng hai pod với tàu con. Kết hợp Điện Từ Xuyên Tâm."
    },
    "skill": {
      "name": "Hàn Quang Tụ Điện",
      "cooldown": 12,
      "duration": 3,
      "effect": "Tạo trường hàn tinh làm chậm vùng mục tiêu, các mũi băng tiếp tục tỏa quạt vào trận địa. Tia khóa mục tiêu tích điện nhanh, đánh bốn nhịp liên tục và xuyên các mục tiêu cùng tuyến.",
      "visual": "Hai cơ chế phối hợp trong một nhịp khai hỏa."
    },
    "super": {
      "name": "Băng Cực Lôi Thương",
      "effect": "Phiến băng mới chuyển mục tiêu sau lần trúng đầu, để trường hàn tinh ở điểm nổ. Pod mở đại cánh, tạo bốn tuyến ray; mỗi tuyến đánh hai nhịp xuyên và dùng lõi tia mới.",
      "visual": "Mũi băng xanh nhạt đổi mặt tinh thể, vỡ thành kim tuyết để lại vùng chậm. Hồ quang cyan chạy dọc lõi, tích sáng rồi nhả các xung ray xuyên thẳng.",
      "formChange": "Cụm tinh thể mở thành quạt băng, lõi pháo lộ đường dẫn hàn quang. Hai pod kéo dài ray điện từ, hai thanh dẫn mở thành bốn nòng."
    },
    "max": {
      "formChange": "Biến hình 0,35 giây: mở các bản lề, trải cánh quang và đổi màu lõi.",
      "effect": "Phiến băng mới chuyển mục tiêu sau lần trúng đầu, để trường hàn tinh ở điểm nổ. Pod mở đại cánh, tạo bốn tuyến ray; mỗi tuyến đánh hai nhịp xuyên và dùng lõi tia mới."
    },
    "ult": {
      "name": "CỰC QUANG ĐIỆN NGỤC",
      "duration": 3.6,
      "effect": "Làn sóng xóa đạn sau bước tụ lực; hai cơ chế Hàn Tinh Quang Mạc và Điện Từ Xuyên Tâm cùng trình diễn trên toàn màn.",
      "visual": "Hai thanh ray đông tinh vươn lên, nhập thành cột xuyên phá rồi vỡ thành thương băng dẫn điện.",
      "choreography": "Hai thanh ray đông tinh vươn lên, nhập thành cột xuyên phá rồi vỡ thành thương băng dẫn điện.",
      "layers": [
        "sss_prism_rail_ult_a",
        "sss_prism_rail_ult_b"
      ],
      "framesPerLayer": 2
    },
    "parents": [
      "prism",
      "rail"
    ],
    "bonus": 0.35,
    "hitFx": "Cụm tinh thể cyan tím nhạt, tia băng tán góc. + Nòng ray dài cyan, tia trắng lõi xanh.",
    "flavor": "Hai lõi cộng hưởng Hàn Tinh Quang Mạc và Điện Từ Xuyên Tâm nối thành một hệ chiến đấu. Không thành phần nào bị mất đi sau nghi lễ.",
    "sources": [
      "Hợp thể"
    ],
    "budget": {
      "damagePerSecond": 178.20000000000002,
      "defensePerMinute": 234,
      "policy": "Hiệu suất DPS/ATK ±8%; tỷ lệ đầu đạn chạm mục tiêu ≥45%. Giáp so tổng chặn+hồi trong hỗn hợp mưa đạn, đòn nặng và bào mòn."
    },
    "oldId": null,
    "combat": {
      "damageScale": 1,
      "notes": "DPS thiết kế = ATK sau cường hóa × hiệu suất cố định 1,0. Đạn phải va chạm thật mới cộng sát thương; không chuẩn hóa ngược theo ATK."
    },
    "tuning": {
      "dpsIndex": 1.35,
      "defenseIndex": 1.3
    },
    "reviewStatus": {
      "completeArt": true,
      "missingArt": []
    }
  }
],BY={},TAU=Math.PI*2;for(const d of DATA)BY[d.id]=d;const BASE=DATA.filter(d=>d.tier==='base');
// V147 · ĐỢT 1b: nội tại 12 món tên lửa / tàu con Bộ 01–06 theo ky_nang_39_chot.json (cấp 1→5 nội suy). Tắt: window.KN146=false
const K146=()=>window.KN146!==false&&window.KN146API?window.KN146API:null;
function L146(s,a,b){const lv=Math.max(1,Math.min(5,s.lv146||5));return a+(b-a)*(lv-1)/4}
function near146(s,q,R,skip){const o=[];for(const t of s.targets)if(t!==q&&t.hp>0&&!(skip&&skip.has(t))&&Math.hypot(t.x-q.x,t.y-q.y)<R+(t.r||0)*.5)o.push(t);return o}
function burn146(s,id,q,amount,dur){const n=Math.max(1,Math.round(dur/.2)),dot=alloc(s,'dot',id,q.x,q.y,dur+.01);if(dot){dot.target=s.targets.indexOf(q);dot.damage=amount/n;dot.children=0;dot.ticks=n}}
function rng(s){let x=s.seed|0;x^=x<<13;x^=x>>>17;x^=x<<5;s.seed=x>>>0;return s.seed/4294967296}
function stats(d,enh=d.tier==='base'?5:10){const n=Math.max(d.tier==='base'?0:1,Math.min(d.tier==='base'?5:10,enh)),base=(d.stats.atk||d.stats.hp)*(1+(d.tier==='base'?.04:.03)*n),bonus=d.tier==='sss'?base*.35:0;return {main:base+bonus,base,bonus,enhance:n,max:n===(d.tier==='base'?5:10),scoreBonus:d.stats.scoreBonus,traitLv:Math.max(1,Math.min(5,Math.ceil(n/(d.tier==='base'?1:2))))}}
function create(id,o={}){const d=BY[id];if(!d)throw Error('Unknown '+id);return {id,def:d,assets:o.assets||{},glows:o.glows||{},seed:o.seed||91873,t:0,age:0,mode:'normal',previous:'normal',morph:1,enhance:o.enhance??(d.tier==='base'?5:10),player:o.player||{x:240,y:558,hp:850,maxHp:1000},targets:o.targets||[],pool:Array.from({length:300},()=>({on:false})),cursor:0,fire:0,enemyClock:0,procAcc:0,regen:0,shots:0,demo:o.demo!==false,light:!!o.light,reduced:!!o.reduced,numbers:o.numbers!==false,shakeEnabled:o.shake!==false,shake:0,peak:0,live:0,events:[],metrics:{damage:0,hits:0,blocked:0,reflected:0,healed:0,prevented:0,kills:0,firstKill:0,received:0,shots:0,landed:0},cooldowns:{skill:0,ult:0},frame:0,measureAt:o.measureAt||0,incoming:o.incoming||'mixed'}}
function event(s,type,x,y,value=0){if(s.events.length===64)s.events.shift();s.events.push({type,x,y,value,t:s.t})}
function alloc(s,type,id,x,y,life=1){const cap=s.reduced?60:s.light?120:300;let live=0;for(const p of s.pool)if(p.on)live++;if(live>=cap){if(['shot','enemy','beamShot','dot'].includes(type)){const fx=s.pool.find(z=>z.on&&['trail','impact','muzzle','number','beam'].includes(z.type));if(fx)fx.on=false;else return null}else return null;}for(let j=0;j<300;j++){const k=(s.cursor+j)%300,p=s.pool[k];if(p.on)continue;s.cursor=(k+1)%300;Object.assign(p,{on:true,type,id,x,y,sx:x,sy:y,life,full:life,age:0,vx:0,vy:0,target:-1,damage:0,trail:0,variant:s.mode==='super'||s.mode==='ult'?'super':'normal',phase:0,bounced:0,children:0,retargeted:false,landed:false,measured:s.t>=s.measureAt,style:s.mode,heavy:false,pierced:0,hitSet:null,dist146:0,boost146:1,hit146:null,from146:null,ticks:0});return p}return null}
function nearest(s,x,y){let n=-1,best=1e12;for(let j=0;j<s.targets.length;j++){const q=s.targets[j];if(q.hp<=0)continue;const d=(q.x-x)**2+(q.y-y)**2;if(d<best){best=d;n=j}}return n}
function mode(s,m,force=false){if(s.mode===m&&!force)return true;if(m==='skill'&&s.cooldowns.skill>0&&!force)return false;if(m==='ult'&&(!s.def.ult||s.cooldowns.ult>0)&&!force)return false;s.previous=s.mode;s.mode=m;s.ultCleared=false;s.age=0;s.morph=0;if(m==='skill')s.cooldowns.skill=s.def.skill.cooldown;if(m==='ult')s.cooldowns.ult=30;if(m==='skill')for(const id of ids(s)){if(['cryo','prism'].includes(id)){const w=alloc(s,'frost',id,240,230,s.def.skill.duration);if(w)w.phase=125}if(['singularity','gravity'].includes(id))for(const side of [-1,1]){const w=alloc(s,'well',id,240+side*65,240,s.def.skill.duration);if(w)w.phase=100}}if(m!=='normal'){if(!s.reduced)effect(s,s.id,s.player.x,s.player.y,true,false);event(s,'transform',s.player.x,s.player.y)}return true}
function ids(s){return s.def.parents||[s.id]}
function effect(s,id,x,y,heavy=false,canShake=true){if(BY[id]?.parents)id=BY[id].parents[0];const p=alloc(s,'impact',id,x,y,heavy?.65:.42);if(p){p.heavy=heavy;p.phase=0}if(heavy&&canShake&&!s.reduced&&s.shakeEnabled)s.shake=.13}
function damage(s,id,q,energy,heavy=false,dotTick=false){if(q.hp<=0||energy<=0)return;if(!dotTick&&(id==='reactive'||id==='inferno'&&!K146())){const dot=alloc(s,'dot',id,q.x,q.y,2.01);if(dot){dot.target=s.targets.indexOf(q);dot.damage=energy*.25/10;dot.children=0;energy*=.75}}if(!dotTick&&id==='inferno'&&K146()){const b=L146(s,.15,.38);burn146(s,id,q,energy*b,L146(s,1.5,2));energy*=1-b}const v=Math.min(q.hp,energy);q.hp-=v;{const A=K146();if(A&&q.obj)try{A.hit(s,id,q.obj,v,heavy,dotTick)}catch(e){}}s.metrics.damage+=v;s.metrics.hits++;event(s,'hit',q.x,q.y,v);effect(s,id,q.x,q.y,heavy);if(s.numbers){const n=alloc(s,'number',id,q.x,q.y,.65);if(n)n.damage=v}if(id==='cryo'||id==='prism'){q.slow=2;q.slowRatio=q.boss?(id==='cryo'?.8:.875):(id==='cryo'?.6:.75)}if(!dotTick&&(id==='inferno'||id==='reactive'))q.burn=2;if(q.hp<=0){s.metrics.kills++;if(!s.metrics.firstKill)s.metrics.firstKill=s.t;effect(s,id,q.x,q.y,true);q.dead=.35}}
function landed(s,p){if(!p.landed){p.landed=true;if(p.measured)s.metrics.landed++}}
function shellProc(s){const p=alloc(s,'shellproc',s.id,s.player.x,s.player.y,.75);if(p)p.variant=s.mode==='normal'?'normal':'super'}
function impact(s,p){const q=s.targets[p.target];if(!q||q.hp<=0){p.on=false;return}landed(s,p);const alive=[];for(const t of s.targets)if(t.hp>0)alive.push(t);const id=p.id;
if(K146()){const r=impact146(s,p,q,alive);if(r==='keep')return;if(r){p.on=false;return}}
if(id==='thunder'){const n=Math.min(alive.length,p.variant==='super'?5:3);const share=p.damage/n;damage(s,id,q,share,true);let last=q,done=1;for(const t of alive){if(t===q||done>=n)continue;const line=alloc(s,'beam',id,last.x,last.y,.25);if(line){line.tx=t.x;line.ty=t.y;line.phase=1}damage(s,id,t,share,true);last=t;done++}}
else if(['inferno','solar','singularity','gravity'].includes(id)){const n=alive.length;for(const t of alive)damage(s,id,t,p.damage/n,p.heavy);if(id==='singularity'||id==='gravity'){const well=alloc(s,'well',id,q.x,q.y,p.variant==='super'?2.5:1.5);if(well)well.phase=p.variant==='super'?110:70}}
else damage(s,id,q,p.damage,p.heavy);
if(['cryo','prism'].includes(id)&&p.variant==='super'){const field=alloc(s,'frost',id,p.x,p.y,2);if(field)field.phase=90}effect(s,id,p.x,p.y,p.heavy);p.on=false}
function impact146(s,p,q,alive){const id=p.id,A=K146(),sup=p.variant==='super';
if(id==='inferno'){damage(s,id,q,p.damage,p.heavy);const R=L146(s,35,45)*(sup?1.3:1),b=L146(s,.15,.38);for(const t of near146(s,q,R))burn146(s,id,t,p.damage*b,L146(s,1.5,2));effect(s,id,p.x,p.y,true);return true}
if(id==='solar'){const hb=(s.lv146>=5||sup)?.12:0;damage(s,id,q,p.damage*(1-hb),true);if(hb)burn146(s,'inferno',q,p.damage*hb,2);const R=L146(s,30,55)*(sup?1.41:1),f=L146(s,.2,.35);for(const t of near146(s,q,R))damage(s,id,t,p.damage*f,false);effect(s,id,p.x,p.y,true);return true}
if(id==='thunder'){damage(s,id,q,p.damage,true);let n=Math.round(L146(s,2,4))+(sup?2:0)-1;const f=L146(s,.3,.35),seen=new Set([q]);let last=q;while(n-->0){const c=near146(s,last,260,seen).sort((a,b)=>Math.hypot(a.x-last.x,a.y-last.y)-Math.hypot(b.x-last.x,b.y-last.y))[0];if(!c)break;seen.add(c);const line=alloc(s,'beam',id,last.x,last.y,.25);if(line){line.tx=c.x;line.ty=c.y;line.phase=1}damage(s,id,c,p.damage*f,true);if(sup&&A&&c.obj)try{A.stun(c.obj,.5)}catch(e){}last=c}if(sup&&A&&q.obj)try{A.stun(q.obj,.5)}catch(e){}effect(s,id,p.x,p.y,true);return true}
if(id==='singularity'||id==='gravity'){damage(s,id,q,p.damage,true);const R=(id==='gravity'?L146(s,40,60):L146(s,40,65))*(sup?1.5:1),life=L146(s,.8,1.2)*(sup?1.5:1);const well=alloc(s,'well',id,q.x,q.y,life);if(well){well.phase=R;well.variant=p.variant}if(A)try{A.well(q.x,q.y,R,life,id==='gravity'?'push':'eat',sup,L146(s,15,38))}catch(e){}effect(s,id,p.x,p.y,true);return true}
if(id==='prism'){damage(s,id,q,p.damage,p.heavy);const n=Math.round(L146(s,2,4)),f=L146(s,.12,.2);const nb=near146(s,q,70);for(let k=0;k<n&&nb.length;k++){const t=nb[k%nb.length];damage(s,id,t,p.damage*f,false);const tr=alloc(s,'trail',id,q.x,q.y,.22);if(tr){tr.vx=(t.x-q.x)*.6;tr.vy=(t.y-q.y)*.6;tr.variant=p.variant}}if(sup){const field=alloc(s,'frost',id,p.x,p.y,1.5);if(field)field.phase=90}effect(s,id,p.x,p.y,p.heavy);return true}
if(id==='cryo'){p.pierced=(p.pierced||0);damage(s,id,q,p.damage,p.heavy);effect(s,id,p.x,p.y,p.heavy);if(p.pierced<Math.round(L146(s,1,2))){p.pierced++;p.hitSet=p.hitSet||new Set();p.hitSet.add(q);const c=near146(s,q,320,p.hitSet).filter(t=>t.y<=q.y+40).sort((a,b)=>Math.hypot(a.x-q.x,a.y-q.y)-Math.hypot(b.x-q.x,b.y-q.y))[0];if(c){p.target=s.targets.indexOf(c);p.damage*=.6;p.x+=p.vx*.03;p.y+=p.vy*.03;return 'keep'}}if(sup){const field=alloc(s,'frost',id,p.x,p.y,2);if(field)field.phase=90}return true}
if(id==='spiral'){damage(s,id,q,p.damage,true);effect(s,id,p.x,p.y,true);if(!p.retargeted&&A&&q.obj){let dead=false;try{dead=A.kill(q.obj,p.damage*(s.kk146||0))}catch(e){}if(dead&&rng(s)<L146(s,.2,1)){const c=near146(s,q,400,new Set([q]))[0];if(c){p.retargeted=true;p.target=s.targets.indexOf(c);p.damage*=.6;p.boost146=L146(s,1,1.2);return 'keep'}}}return true}
if(id==='rail'){damage(s,id,q,p.damage,p.heavy);return true}
return false}
function fire(s){if(s.def.kind==='armor')return;const list=ids(s),st=stats(s.def,s.enhance),factor=s.def.tier==='base'?st.main/(s.def.stats.atk||1):(1+.03*st.enhance),baseBudget=st.main*s.def.combat.damageScale,boost=s.mode==='normal'?1:s.mode==='skill'?1.35:s.mode==='super'?1.7:2.2,cadence=s.def.normal.cadence/(s.mode==='super'?.85:s.mode==='skill'?.95:1),budget=baseBudget*cadence*boost;
for(let k=0;k<list.length;k++){const id=list[k],d=BY[id],sup=s.mode==='super'||s.mode==='ult',skill=s.mode==='skill';let n=id==='rail'?(sup?4:2):id==='inferno'?(sup?2:1):id==='cryo'?(sup?4:2):id==='thunder'?(sup?3:2):id==='singularity'?1:id==='spiral'?(sup?4:2):id==='stellar'?2:id==='disc'?(sup?4:2):id==='solar'?(sup?2:1):id==='gravity'?1:id==='ricochet'?(sup?4:2):id==='prism'?(sup?6:3):2;if(s.reduced)n=Math.min(n,2);else if(s.light)n=Math.min(n,4);
for(let i=0;i<n;i++){const target=(s.shots+i)%s.targets.length,q=s.targets[target];if(!q)continue;const side=i%2?-1:1,mb=s.def.kind==='missiles'&&window.MIS139!==false/* V139: tên lửa bắn từ thân chiến cơ */,x=s.player.x+side*(mb?14:(s.def.kind==='missiles'?58:78)),y=mb?s.player.y-22:s.player.y+(s.def.kind==='missiles'?16:0)-20;const p=alloc(s,id==='rail'?'beamShot':'shot',id,x,y,8);if(!p)continue;if(p.measured)s.metrics.shots++;p.damage=budget/list.length/n;p.target=target;p.style=s.mode;p.phase=(i-(n-1)/2)*.25;p.heavy=sup||['solar','singularity'].includes(id);const trait=BY[id].trait.lv[st.traitLv-1];s.attackAcc=(s.attackAcc||0)+trait.proc;if(s.attackAcc>=1){s.attackAcc--;p.charged=true;p.damage*=1.04;}const speed=d.normal.speed*(sup?1.25:1),dist=Math.hypot(q.x-x,q.y-y),lead=dist/speed,tx=q.x+(q.vx||0)*lead*.6,ty=q.y;let a=Math.atan2(ty-y,tx-x);if(id==='inferno'||id==='prism')a+=p.phase;if(id==='ricochet')a=i%2?-2.4:-.7;if(id==='disc')a+=i%2?.5:-.5;p.vx=Math.cos(a)*speed;p.vy=Math.sin(a)*speed;
if(id==='rail'){p.life=p.full=skill?.90:sup?.69:.51;p.tx=q.x;p.ty=q.y;p.phase=0}const flash=alloc(s,'muzzle',id,x,y,.14);if(flash)flash.phase=sup?1:0;}
s.shots+=n;}}
function armorShot(s,id){const q=nearest(s,s.player.x,s.player.y);if(q<0)return;const p=alloc(s,'shot',id,s.player.x+(s.shots++%2?64:-64),s.player.y-25,7);if(p){if(p.measured)s.metrics.shots++;p.target=q;p.damage=s.mode==='normal'?12:s.mode==='super'?28:20;p.vx=0;p.vy=-180;alloc(s,'muzzle',id,p.x,p.y,.14)}}
function armorProc(s,p){const st=stats(s.def,s.enhance),list=ids(s),weight=1/list.length,boost=(s.def.tier==='sss'?1.3:1)*(s.mode==='normal'?1:s.mode==='skill'?1.5:2);let saved=0;if(!s.procCounters)s.procCounters=list.map((_,i)=>i*.37);if(!s.guardClock)s.guardClock={};
for(let i=0;i<list.length;i++){const id=list[i],d=BY[id],t=d.trait.lv[st.traitLv-1],type=d.defense.type;let absorb=0,trigger=false;
if(type==='flat'){absorb=Math.min(p.damage,t.magnitude);trigger=true}
else if(type==='satellite'){if(s.t>=(s.guardClock[id]||0)){s.guardClock[id]=s.t+d.defense.cooldown;absorb=Math.min(p.damage,t.magnitude);trigger=true}}
else if(type==='counter'){if(p.damage>=7){absorb=p.damage*t.magnitude;trigger=true}}
else if(type==='reflect'||type==='heavy'){if(type==='reflect'||p.damage>=12){s.procCounters[i]+=t.proc;if(s.procCounters[i]>=1){s.procCounters[i]--;absorb=p.damage;trigger=true}}}
if(!trigger)continue;saved+=absorb*weight*boost;s.metrics.blocked++;shellProc(s);armorShot(s,id);if(id==='mirror'){s.metrics.reflected++;const beam=alloc(s,'beam',id,p.x,p.y,.22);if(beam){const n=nearest(s,p.x,p.y);beam.tx=n>=0?s.targets[n].x:p.x;beam.ty=n>=0?s.targets[n].y:70}}if(id==='phase')s.phaseUntil=s.t+.35;}
saved=Math.min(p.damage,saved);s.metrics.prevented+=saved;const received=p.damage-saved;s.player.hp=Math.max(1,s.player.hp-received);s.metrics.received+=received;event(s,saved?'proc':'hurt',p.x,p.y,saved||received);p.on=false}
function update(s,dt,m=s.mode){dt=Math.max(0,Math.min(.05,dt));if(m!==s.mode)mode(s,m);const cap=s.reduced?60:s.light?120:300;let liveBefore=0;for(const p of s.pool)if(p.on)liveBefore++;if(liveBefore>cap){for(const p of s.pool){if(liveBefore<=cap)break;if(p.on&&['trail','impact','muzzle','number','beam'].includes(p.type)){p.on=false;liveBefore--}}for(const p of s.pool){if(liveBefore<=cap)break;if(p.on){p.on=false;liveBefore--}}}s.t+=dt;s.age+=dt;s.morph=Math.min(1,s.morph+dt/.35);s.shake=Math.max(0,s.shake-dt);s.cooldowns.skill=Math.max(0,s.cooldowns.skill-dt);s.cooldowns.ult=Math.max(0,s.cooldowns.ult-dt);s.frame++;if(s.reduced)s.morph=1;if(s.mode==='ult'&&s.age>=.55&&!s.ultCleared){s.ultCleared=true;for(const p of s.pool)if(p.on&&p.type==='enemy'){effect(s,s.id,p.x,p.y,true);p.on=false;s.metrics.blocked++}event(s,'clear',240,340);}
for(const q of s.targets){q.slow=Math.max(0,(q.slow||0)-dt);q.burn=Math.max(0,(q.burn||0)-dt);if(q.hp<=0){q.dead-=dt;if(q.dead<=0&&s.demo)q.hp=q.maxHp;continue}q.x+=(q.vx||0)*dt*(q.slow>0?q.slowRatio||.6:1);if(q.x<24||q.x>456)q.vx=-(q.vx||0)}
s.fire+=dt;const cadence=s.def.normal.cadence/(s.mode==='super'?.85:s.mode==='skill'?.95:1);if(s.fire>=cadence){s.fire-=cadence;fire(s)}
if(s.demo){s.enemyClock+=dt;const profile=s.incoming==='mixed'?['rain','heavy','sustain'][Math.floor(s.t/5)%3]:s.incoming,interval=profile==='rain'?.20:profile==='heavy'?1.20:.5;if(s.enemyClock>=interval){s.enemyClock-=interval;const x=45+rng(s)*390,p=alloc(s,'enemy',s.id,x,80,7);if(p){p.damage=profile==='rain'?3:profile==='heavy'?28:8;const a=Math.atan2(s.player.y-80,s.player.x-x);p.vx=Math.cos(a)*150;p.vy=Math.sin(a)*150}}}
if(s.def.kind==='armor'&&ids(s).includes('nanite')){const st=stats(s.def,s.enhance),rate=BY.nanite.trait.lv[st.traitLv-1].magnitude*(s.def.tier==='sss'?1.3:1)*(s.mode==='normal'?1:s.mode==='skill'?1.5:2)/ids(s).length,v=Math.min(s.player.maxHp-s.player.hp,rate*dt);s.player.hp+=v;s.metrics.healed+=v;s.metrics.prevented+=v;s.regen+=dt;if(s.regen>1){s.regen=0;shellProc(s);if(s.frame%4===0)armorShot(s,'nanite')}}
let live=0;for(const p of s.pool){if(!p.on)continue;live++;p.age+=dt;p.life-=dt;if(p.life<=0){p.on=false;continue}if(p.type==='number')p.y-=dt*25;if(p.type==='dot'){const q=s.targets[p.target];if(!q||q.hp<=0){p.on=false;continue}if(p.age>=(p.children+1)*.2&&p.children<(p.ticks||10)){p.children++;damage(s,p.id,q,p.damage,false,true)}continue}if(p.type==='beamShot'&&p.age>=(p.style==='skill'?.10:.25)+p.children*.18&&p.children<(p.style==='skill'?4:p.variant==='super'?2:1)){p.children++;const q=s.targets[p.target];if(q&&q.hp>0){landed(s,p);p.tx=q.x;p.ty=q.y;const dx=p.tx-p.x,dy=p.ty-p.y,len=Math.hypot(dx,dy),targets=s.targets.filter(t=>t.hp>0&&Math.abs((t.x-p.x)*dy-(t.y-p.y)*dx)/Math.max(1,len)<t.r+7);const per=p.damage/(p.style==='skill'?4:p.variant==='super'?2:1);if(K146()){const f=L146(s,.5,.8);targets.sort((a,b)=>b.y-a.y);targets.forEach((t,j)=>damage(s,p.id,t,j===0||t===q?per:per*f,p.variant==='super'))}else for(const t of targets)damage(s,p.id,t,per/Math.max(1,targets.length),p.variant==='super')}}if(p.type==='return'){const a=Math.atan2(s.player.y-p.y,s.player.x-p.x);p.vx=Math.cos(a)*(K146()?420:210);p.vy=Math.sin(a)*(K146()?420:210);p.x+=p.vx*dt;p.y+=p.vy*dt;if(K146()&&p.damage>0){p.hit146=p.hit146||new Set();for(const t of s.targets)if(t.hp>0&&t!==p.from146&&!p.hit146.has(t)&&Math.hypot(t.x-p.x,t.y-p.y)<t.r+16){p.hit146.add(t);damage(s,'disc',t,p.damage,p.variant==='super')}}if(Math.hypot(p.x-s.player.x,p.y-s.player.y)<30)p.on=false;continue}
if(p.type==='enemy'){p.x+=p.vx*dt;p.y+=p.vy*dt;if(Math.hypot(p.x-s.player.x,p.y-s.player.y)<(s.def.kind==='armor'?68:23)){if(s.def.kind==='armor')armorProc(s,p);else{p.on=false;s.player.hp=Math.max(1,s.player.hp-p.damage);s.metrics.received+=p.damage}}continue}
if(p.type==='shot'){let q=s.targets[p.target];if(!q||q.hp<=0){p.target=nearest(s,p.x,p.y);q=s.targets[p.target]}if(!q)continue;const speed=BY[p.id].normal.speed*(p.variant==='super'?1.25:1);const a=Math.atan2(q.y-p.y,q.x-p.x),elapsed=p.age;
if(p.style==='skill'&&p.age<.4){p.vx+=Math.sin(p.age*16+p.phase)*dt*180;p.vy-=dt*50;}
if(p.id==='solar'&&p.style==='skill'&&elapsed<.45){p.x=s.player.x+Math.cos(elapsed*12+p.phase)*80;p.y=s.player.y+Math.sin(elapsed*12+p.phase)*35;}
if(p.id==='spiral'){const side=Math.sin(elapsed*(p.variant==='super'?13:8)*(p.boost146||1)+p.phase)*85;p.vx=Math.cos(a)*speed-Math.sin(a)*side;p.vy=Math.sin(a)*speed+Math.cos(a)*side}
else if(p.id==='ricochet'&&elapsed<(K146()?.9:.55)){if((p.x<12&&p.vx<0)||(p.x>468&&p.vx>0)){p.vx=-p.vx;p.bounced=(p.bounced||0)+1;if(K146()&&p.bounced<=Math.round(L146(s,1,2))){p.damage*=1+L146(s,.1,.35);const w=s.targets.filter(t=>t.hp>0).sort((a,b)=>a.hp-b.hp)[0];if(w&&s.lv146>=5)p.target=s.targets.indexOf(w)}effect(s,p.id,p.x,p.y)}if(p.variant==='super'&&Math.floor(elapsed*12)!==Math.floor((elapsed-dt)*12))p.vx=-p.vx}
else{const turn=p.id==='disc'?3:p.id==='inferno'?7:8;p.vx+=(Math.cos(a)*speed-p.vx)*Math.min(1,dt*turn);p.vy+=(Math.sin(a)*speed-p.vy)*Math.min(1,dt*turn)}
if(window.TB309&&TB309.qd&&BY[p.id].kind==='missiles')try{TB309.qd(p,q,dt,speed,a)}catch(e){}p.x+=p.vx*dt;p.y+=p.vy*dt;p.trail+=dt;if(p.trail>(s.reduced?.18:s.light?.09:.045)){p.trail=0;const trail=alloc(s,'trail',p.id,p.x,p.y,.28);if(trail){trail.vx=p.vx*.07;trail.vy=p.vy*.07;trail.phase=p.phase;trail.variant=p.variant}}
p.dist146=(p.dist146||0)+Math.hypot(p.vx,p.vy)*dt;if(p.id==='stellar'&&!p.children&&(K146()?(p.dist146>=220||Math.hypot(p.x-q.x,p.y-q.y)<q.r+30):p.age>.7)){p.children=1;const parts=K146()?(p.variant==='super'?7:p.style==='skill'?4:Math.round(L146(s,3,5))):p.variant==='super'?5:p.style==='skill'?4:3;const tg146=K146()?s.targets.map((t,j)=>[t,j]).filter(z=>z[0].hp>0).sort((a,b)=>Math.hypot(a[0].x-p.x,a[0].y-p.y)-Math.hypot(b[0].x-p.x,b[0].y-p.y)).map(z=>z[1]):null;for(let k=0;k<parts;k++){const child=alloc(s,'shot',p.id,p.x,p.y,7);if(child){if(child.measured)s.metrics.shots++;child.damage=p.damage/parts;child.target=tg146&&tg146.length?tg146[k%tg146.length]:(p.target+k)%s.targets.length;child.vx=(k-(parts-1)/2)*(K146()?90:110);child.vy=-150;child.children=1;child.variant=p.variant;child.style=p.style}}p.on=false;continue}
if(p.variant==='super'&&p.id==='inferno'&&Math.floor(p.age*5)!==Math.floor((p.age-dt)*5))effect(s,p.id,p.x,p.y,false);
if(p.id==='disc'&&p.age<.6){p.vx+=Math.sin(p.age*8+p.phase)*dt*120;}
if(p.id==='gravity'&&K146())try{K146().deflect(p.x,p.y,p.variant==='super'?70:48,L146(s,15,38))}catch(e){}
if(Math.hypot(p.x-q.x,p.y-q.y)<q.r+9){if(p.variant==='super'&&['spiral','prism'].includes(p.id)&&!p.retargeted){landed(s,p);damage(s,p.id,q,p.damage*.5,true);p.damage*=.5;p.retargeted=true;p.target=(p.target+1)%s.targets.length;p.vx=-p.vx;p.vy=-p.vy;}else{const x=p.x,y=p.y,id=p.id,variant=p.variant;const dmg0=p.damage,q0=q;impact(s,p);if(id==='disc'){const r=alloc(s,'return',id,x,y,4);if(r){r.variant=variant;r.damage=K146()?dmg0*L146(s,.6,1):0;r.from146=q0}}}}}
else if(p.type==='trail'){p.x-=p.vx*dt;p.y-=p.vy*dt}
else if(p.type==='frost')for(const q of s.targets)if(q.hp>0&&Math.hypot(q.x-p.x,q.y-p.y)<p.phase){q.slow=.25;q.slowRatio=q.boss?.9:p.id==='prism'?.75:.6;}if(p.type==='well'){for(const b of s.pool)if(b.on&&b.type==='enemy'&&Math.hypot(b.x-p.x,b.y-p.y)<p.phase){b.on=false;s.metrics.blocked++;effect(s,p.id,b.x,b.y);if(p.variant==='super'){const target=nearest(s,p.x,p.y);if(target>=0){const r=alloc(s,'shot',p.id,p.x,p.y,6);if(r){if(r.measured)s.metrics.shots++;r.target=target;r.damage=b.damage*.5;r.vy=-180;r.children=1}}}}for(const q of s.targets)if(q.hp>0&&!q.boss){const dx=p.x-q.x,dy=p.y-q.y;if(Math.hypot(dx,dy)<p.phase){q.x+=dx*dt*.15;q.slow=.2;q.slowRatio=.75}}}
}live=0;for(const z of s.pool)if(z.on)live++;s.live=live;s.peak=Math.max(s.peak,live)}
function PK86(s,k,side){return side<0&&s.assets&&s.assets[k+'_L']?k+'_L':k}// V86: bệ vẽ 1 bên → bên trái dùng bản lật (art86)
function img(c,s,key,x,y,w,h,a=1,angle=0){const im=s.assets[key];if(!im)return;c.save();c.globalAlpha*=a;c.translate(x,y);c.rotate(angle);c.drawImage(im,-w/2,-h/2,w,h);c.restore()}
function frame(c,s,key,n,fw,fh,x,y,w,h,a=1,angle=0){const im=s.assets[key];if(!im)return;const k=vfxK15(im);c.save();c.globalAlpha*=a;c.translate(x,y);c.rotate(angle);c.drawImage(im,n*fw*k,0,fw*k,fh*k,-w/2,-h/2,w,h);c.restore()}
/* V309 L15B: dải hiệu ứng đã thu nhỏ khi dựng (window.VFX15B = {dấu ảnh: hệ số}) → cắt khung theo hệ số; ảnh khác k = 1 */
const VFXK15=new WeakMap();function vfxK15(im){let k=VFXK15.get(im);if(k===undefined){k=1;try{const M=window.VFX15B,u=im.src||'';if(M&&u){const f=M[u.length+':'+u.slice(-24)];if(f>0)k=f;}}catch{}VFXK15.set(im,k);}return k;}
function glow(c,s,col,x,y,r,a){const im=s.glows[col];if(!im)return;c.save();c.globalCompositeOperation='lighter';c.globalAlpha*=a;c.drawImage(im,x-r,y-r,2*r,2*r);c.restore()}
function draw(c,s,layer){const d=s.def,p=s.player,sup=s.mode==='super'||s.mode==='ult',list=ids(s),m=s.morph;const trans=sup?m:1-m;c.save();
if(layer==='armor'&&d.kind==='armor'&&typeof Armor69!=='undefined'){try{Armor69.draw(c,s);}catch(e){}}else if(layer==='armor'&&d.kind==='armor'){const n133=!!(window.TB133&&TB133[d.id]&&d.tier!=='sss');c.globalCompositeOperation=n133?'source-over':'lighter';const fw=d.tier==='sss'?224:192,key=d.id+'_shell_'+(sup&&d.tier==='sss'?'max':(n133&&sup&&s.assets[d.id+'_shell_bt']?'bt':'idle'));img(c,s,key,p.x,p.y,fw,fw,n133?1:(s.reduced?.45:sup?.72:.62),d.tier==='sss'&&list.includes('orbital')&&!s.reduced?s.t*.12:0);if(d.id==='orbital')for(let j=0;j<3;j++){const angle=(s.reduced?0:s.t*.4)+j*TAU/3;img(c,s,'orbital_satellite',p.x+Math.cos(angle)*90,p.y+Math.sin(angle)*90,30,30,.95,angle)}if(list.includes('nanite'))for(let j=0;j<6;j++){const angle=(s.reduced?0:s.t*.7)+j*TAU/6;glow(c,s,'#75f5b4',p.x+Math.cos(angle)*87,p.y+Math.sin(angle)*87,7,.5)}for(const b of s.pool)if(b.on&&b.type==='shellproc'&&!n133)frame(c,s,d.id+'_shell_proc',Math.min(7,Math.floor(b.age/b.full*8)),fw,fw,p.x,p.y,fw,fw,s.reduced?.35:.85)}
if(layer==='hardware'&&d.kind!=='armor'){const key=d.tier==='sss'?d.id:list[0],base=d.kind==='sidearm'?42:40,max=d.kind==='sidearm'?78:40,F7=window.FORM122!==false,w=(base+(max-base)*(sup?m:1-m))*(F7?.8:1),h=(d.kind==='sidearm'?w/(F7?.8:1):56)*(F7?.8:1),offset=window.SPREAD134===false?(d.kind==='sidearm'?78:58)*(F7?.85:1):(d.kind==='sidearm'?100:72);/* V134: tách xa chiến cơ */if(F7)c.globalAlpha*=.85;for(const side of [-1,1]){const x=p.x+side*offset,y=p.y+(d.kind==='missiles'?16:Math.sin(s.t*2+side)*4)+(F7?(window.SPREAD134===false||d.kind==='missiles'?20:4):0);if(sup)glow(c,s,side<0?d.color:d.second,x,y,w,.42);if(m<1){const prev=s.previous==='super'||s.previous==='ult';img(c,s,PK86(s,key+'_pod_'+(prev?'super':'normal'),side),x,y,w,h,1-m);img(c,s,PK86(s,key+'_pod_'+(sup?'super':'normal'),side),x,y,w,h,m)}else img(c,s,PK86(s,key+'_pod_'+(sup?'super':'normal'),side),x,y,w,h,1);if(m<1&&!s.reduced)frame(c,s,list[0]+'_impact_super',Math.min(7,Math.floor(m*8)),192,192,x,y,110,110,.5)}}
if(layer==='projectiles'){for(const b of s.pool){if(!b.on)continue;if(b.type==='enemy')continue;if(b.type==='shot'||b.type==='return'){const missile=BY[b.id].kind==='missiles',w=missile?(b.variant==='super'?22:18):b.variant==='super'?23:14,h=missile?(b.variant==='super'?58:48):b.variant==='super'?42:28,ang=Math.atan2(b.vy,b.vx)+Math.PI/2;frame(c,s,b.id+'_projectile_'+b.variant,Math.floor(b.age*16)%4,missile?48:32,missile?128:64,b.x,b.y,w,h,1,ang)}else if(b.type==='trail'){const missile=BY[b.id].kind==='missiles';if(!(missile&&window.MUZ10!==false&&window.ANIM10!==false))/* L10B: bỏ vệt trail cũ của tên lửa (xoáy trắng mảnh; TB309 đã vẽ đuôi riêng) */img(c,s,b.id+'_trail',b.x,b.y,missile?19:9,missile?36:45,Math.min(.6,b.life/b.full*.6),Math.atan2(b.vy,b.vx)+Math.PI/2)}else if(b.type==='muzzle'){if(!(window.MUZ10!==false&&window.ANIM10!==false&&BY[b.id]&&BY[b.id].kind!=='armor'))img(c,s,b.id+'_muzzle',b.x,b.y,b.phase?28:22,b.phase?36:28,b.life/b.full)}/* L10B: bỏ ảnh chớp nòng cũ (xoáy trắng mảnh) của tên lửa / tàu con — tắt window.MUZ10=false */else if(b.type==='beamShot'||b.type==='beam'){if(b.type==='beamShot'&&b.age<(b.style==='skill'?.10:.25)){if(b.id==='rail'&&window.FX309&&FX309.on()&&window.RAIL309!==false){FX309.flare(c,b.x,b.y,FX309.gearTier(s.lv146||3),26+70*b.age,.9);continue}img(c,s,b.id+'_muzzle',b.x,b.y,30+60*b.age,30+60*b.age,.8);continue}if(b.id==='rail'&&window.FX309&&FX309.on()&&window.RAIL309!==false){/* V309b: tia Pháo Điện Từ 3 lớp + đầu nòng + điểm chạm (Gemini). Tắt: window.RAIL309=false */const _T9=window.TB309&&TB309.on()&&window.TB309RAIL!==false,_t=_T9?TB309.railKey():FX309.gearTier(s.lv146||3),_a=_T9?Math.min(1,b.life*7)*.85*(b.age<.22?1:Math.max(.25,1-(b.age-.22)/.15)):Math.min(1,b.life*7);FX309.beam(c,b.x,b.y,b.tx,b.ty,_t,_T9?(b.variant==='super'?20:18):(b.variant==='super'?44:32),_a,_T9?{fs:16,rs:18}:{fs:30,rs:34});if(!b.__sp309){b.__sp309=1;FX309.sparks(b.tx,b.ty,_t,4);}continue}const dx=b.tx-b.x,dy=b.ty-b.y,len=Math.hypot(dx,dy),im=s.assets[b.id+'_beam_'+b.variant]||s.assets[b.id+'_beam'];c.save();c.translate(b.x,b.y);c.rotate(Math.atan2(dy,dx)+Math.PI/2);c.globalCompositeOperation='lighter';c.globalAlpha=Math.min(1,b.life*7);if(im)c.drawImage(im,-(b.variant==='super'?11:6),-len,b.variant==='super'?22:12,len);c.restore()}}}
if(layer==='hits'){for(const b of s.pool){if(!b.on)continue;if(b.type==='impact'){const sup=b.heavy||b.variant==='super',fw=sup?192:128,n=Math.min(7,Math.floor(b.age/b.full*8));{let z=sup?88:52,al=1;try{if(window.SHOT117&&SHOT117.on&&boss&&!boss.dead&&Math.abs(b.x-boss.x)<90&&Math.abs(b.y-boss.y)<70){z*=.6;al=.55;}}catch{}frame(c,s,b.id+'_impact_'+(sup?'super':'normal'),n,fw,fw,b.x,b.y,z,z,al)}}else if(b.type==='frost'){frame(c,s,b.id+'_impact_super',Math.floor(b.age*9)%8,192,192,b.x,b.y,Math.min(140,b.phase*2),Math.min(140,b.phase*2),.45)}else if(b.type==='well'){frame(c,s,b.id+'_impact_super',Math.floor(b.age*12)%8,192,192,b.x,b.y,Math.min(140,b.phase*2),Math.min(140,b.phase*2),.7,s.t*.3)}}}
if(layer==='ult'&&s.mode==='ult')drawUlt(c,s);
if(layer==='enemy'){for(const b of s.pool)if(b.on&&b.type==='enemy'){c.globalAlpha=1;c.globalCompositeOperation='source-over';c.fillStyle='#140817';c.beginPath();c.arc(b.x,b.y,6,0,TAU);c.fill();c.fillStyle=b.damage>=20?'#ffae42':'#ff448b';c.beginPath();c.arc(b.x,b.y,4.5,0,TAU);c.fill();c.fillStyle='#fff7cf';c.beginPath();c.arc(b.x,b.y,2,0,TAU);c.fill()}}
if(layer==='ui'&&s.numbers){for(const b of s.pool)if(b.on&&b.type==='number'){c.globalAlpha=Math.min(1,b.life*3);c.fillStyle=b.damage>20?'#ffe18d':'#e5faff';c.font='700 '+(b.damage>20?19:15)+'px sans-serif';c.textAlign='center';c.fillText(Math.round(b.damage),b.x,b.y)}}c.restore()}
function drawUlt(c,s){const d=s.def,raw=s.age,u=s.reduced?1.2:raw,du=d.ult.duration,fade=raw<.25?raw/.25:raw>du-.4?Math.max(0,(du-raw)/.4):1;c.save();c.fillStyle='rgba(0,0,0,'+(.55*fade)+')';c.fillRect(0,0,480,680);c.save();c.beginPath();c.rect(0,0,480,453);c.clip();c.globalCompositeOperation='lighter';let placements=[];const w=Math.sin(u*2),v=Math.cos(u*2),r=u/du;
switch(d.id){
case 'sss_aegis_mirror':placements=[['a',240,530,430,430,0],['b',240,330,410,550,0]];break;
case 'sss_mirror_orbital':placements=[['a',240,350,450,540,u*.3],['b',240+w*60,270,420,480,-u*.25]];break;
case 'sss_orbital_phase':placements=[['b',100,330,210,480,0],['b',380,330,210,480,Math.PI],['a',240+w*120,420-v*170,380,430,u*.5]];break;
case 'sss_phase_reactive':placements=[['b',140,360,250,540,.5],['a',90+r*310,640-r*700,400,590,-.6],['b',220+r*180,640-r*550,300,400,-.6]];break;
case 'sss_reactive_nanite':placements=[['b',240,525,430,320,-u*.25],['a',240,470-Math.max(0,u-1)*110,450,500,0]];break;
case 'sss_nanite_aegis':placements=[['a',240,535-r*210,465,380,0],['b',240,610-r*550,450,330,0]];break;
case 'sss_inferno_cryo':placements=[['a',240+Math.sin(u*3)*95,660-r*680,310,560,-Math.cos(u*3)*.35],['b',240-Math.sin(u*3)*95,660-r*680,310,560,Math.cos(u*3)*.35]];break;
case 'sss_cryo_thunder':placements=[['a',240,430-r*170,450,560,0],['b',240,310,470,500,-u*.12]];break;
case 'sss_thunder_singularity':placements=[['a',240,260,350,350,u*.5],['b',240,260,475,550,-u*.7]];break;
case 'sss_singularity_spiral':placements=[['b',240,540-r*350,400,400,u*.4],['a',240+Math.sin(u*4)*85,620-r*680,340,590,-u*.2]];break;
case 'sss_spiral_stellar':placements=[['a',240,620-r*640,420,610,0],['b',240,500-r*430,470,550,-u*.25]];break;
case 'sss_stellar_inferno':placements=[['a',240,210,390,390,u*.18],['b',240,690-r*760,470,610,0]];break;
case 'sss_rail_disc':placements=[['a',-180+r*850,270,360,360,u*1.5],['b',240,330,420,650,0]];break;
case 'sss_disc_solar':placements=[['a',240+Math.cos(u*2)*130,340+Math.sin(u*2)*200,280,280,u],['b',240-Math.cos(u*2)*130,340-Math.sin(u*2)*200,290,290,-u]];break;
case 'sss_solar_gravity':placements=[['a',240,420-r*140,390,390,-u*.4],['b',240,410-r*190,440,610,0]];break;
case 'sss_gravity_ricochet':placements=[['a',240,330,390,430,u*.25],['b',240,330,470,600,-u*.15]];break;
case 'sss_ricochet_prism':placements=[['a',240,330,440,460,u*.25],['b',240,330,470,610,-u*.25]];break;
case 'sss_prism_rail':placements=[['a',240,390-r*220,430,580,0],['b',240,390-r*160,460,640,0]];break;
}
for(const [key,x,y,w,h,a]of placements){const f=s.reduced?0:Math.floor(u*1.4)%2;frame(c,s,d.id+'_ult_'+key,f,512,512,x,Math.min(y,300),w,h,fade*(s.reduced?.4:key==='a'?.7:.45),a)}c.restore();
// A restrained label; enemy bullets are rendered by the caller AFTER this layer.
c.globalAlpha=fade;c.fillStyle='#071321e8';c.fillRect(0,48,480,48);c.fillStyle='#ffdfa0';c.font='700 23px sans-serif';c.textAlign='center';c.fillText(d.ult.name,240,80);c.restore()}
function fixture(n){return Array.from({length:n},(_,i)=>({x:n===1?240:48+i*76.8,y:120+(i%3)*90,vx:(i%2?-1:1)*(20+i*5),r:24,hp:1000,maxHp:1000}))}
function measure(id,seconds=60,seed=91873,n=6,incoming='mixed'){const s=create(id,{seed,targets:fixture(n),player:{x:240,y:558,hp:9000,maxHp:10000},numbers:false,light:false,demo:true,incoming,measureAt:6});for(let k=0;k<360;k++)update(s,1/60);const start={...s.metrics};for(let k=0;k<seconds*60;k++)update(s,1/60);const st=stats(s.def,s.enhance),shots=s.metrics.shots-start.shots,landedCount=s.metrics.landed-start.landed;return {atk:st.main,dps:(s.metrics.damage-start.damage)/seconds,efficiency:(s.metrics.damage-start.damage)/seconds/st.main,preventedPerMinute:(s.metrics.prevented-start.prevented)*60/seconds,hits:s.metrics.hits-start.hits,shots,landed:landedCount,accuracy:shots?landedCount/shots:0,ttk:s.metrics.firstKill,peak:s.peak,blocked:s.metrics.blocked-start.blocked,reflected:s.metrics.reflected-start.reflected,healed:s.metrics.healed-start.healed}}
function benchmark(id,seconds=60,seed=91873){const out={id,single:measure(id,seconds,seed,1),crowd:measure(id,seconds,seed,6)};if(BY[id].kind==='armor'){out.profiles={};for(const kind of ['rain','heavy','sustain'])out.profiles[kind]=measure(id,seconds,seed,1,kind).preventedPerMinute}return out}
function eligible(a,b){if(!a||!b||a.enhance<1||b.enhance<1||a.id===b.id)return null;return DATA.find(d=>d.parents&&d.parents.includes(a.id)&&d.parents.includes(b.id))||null}
return {version:'3.0.0',data:DATA,byId:BY,stats,create,update,draw,setMode:mode,benchmark,fixture,eligible,layers:['armor','hardware','projectiles','hits','ult','ui','enemy'],limits:{standard:300,light:120,reduced:60},models:Object.fromEntries(DATA.map(d=>[d.id,Object.fromEntries(['normal','skill','super','ult'].map(m=>[m,{update:(s,dt)=>update(s,dt,m),draw:(c,s,layer)=>draw(c,s,layer)}]))]))};})();
if(typeof module!=='undefined'&&module.exports)module.exports=GEAR_FX;
