'use strict';
// V77_SPEC · Gemini 23/10 (nguyên văn khối cấu hình): 18 boss phụ, 6 mid-boss, huy chương, xếp hạng, Tiệm Danh Dự.
const V77_SPEC = {
  // =========================================================================
  // 1. 18 MẪU BOSS PHỤ (9 CHƯƠNG x [SUB_ODD: Ải x5, x15 | SUB_MID10: Ải x10])
  // Sử dụng 100% move.type đã có của Claude, tốc độ đạn 135 -> 225 px/s
  // =========================================================================
  SUB_BOSSES_18: {
    CH1: {
      SUB_ODD: {
        name: "Tuần Dương Hạm Tinh Vệ",
        phases: [
          { hp: 1.0, moves: [
            { type: "FAN_BURST", ways: 3, spreadDeg: 45, speed: 135, cd: 1.8 },
            { type: "AIMED_BURST", burst: 2, gap: 0.20, speed: 145, cd: 2.1 }
          ]},
          { hp: 0.5, moves: [
            { type: "SPLIT_FAN", ways: 4, spreadDeg: 65, centerBlindDeg: 25, speed: 142, cd: 1.6 },
            { type: "RING_PULSE", ways: 10, speed: 135, cd: 2.4 }
          ]}
        ]
      },
      SUB_MID10: {
        name: "Pháo Hạm Tiên Phong",
        phases: [
          { hp: 1.0, moves: [
            { type: "PARALLEL_STREAM", lanes: 2, laneGap: 120, speed: 145, cd: 1.6, safeCorridor: 75 },
            { type: "AIMED_FAN", ways: 3, spreadDeg: 40, speed: 148, cd: 1.9 }
          ]},
          { hp: 0.5, moves: [
            { type: "PULSE_SPIRAL", arms: 1, fireSec: 1.4, pauseSec: 0.4, speed: 145, safeCorridor: 70 },
            { type: "RING_PULSE", ways: 12, speed: 140, cd: 2.2 }
          ]}
        ]
      }
    },

    CH2: {
      SUB_ODD: {
        name: "Thiết Giáp Hộ Pháp",
        phases: [
          { hp: 1.0, moves: [
            { type: "PARALLEL_STREAM", lanes: 3, laneGap: 110, speed: 150, cd: 1.6, safeCorridor: 70 },
            { type: "AIMED_BURST", burst: 3, gap: 0.18, speed: 158, cd: 2.0 }
          ]},
          { hp: 0.5, moves: [
            { type: "CLUSTER_SPLIT", count: 1, stopY: 520, childWays: 6, speed: 145, childSpeed: 155, cd: 2.6, safeRadius: 90 },
            { type: "FAN_BURST", ways: 5, spreadDeg: 60, speed: 152, cd: 1.7 }
          ]}
        ]
      },
      SUB_MID10: {
        name: "Pháo Đài Phá Trận",
        phases: [
          { hp: 1.0, moves: [
            { type: "CROSS_NEEDLES", ways: 3, angleDeg: 30, speed: 160, cd: 1.7 },
            { type: "TIMED_BOMB", count: 2, delaySec: 2.0, childWays: 6, speed: 140, childSpeed: 158, cd: 2.8 }
          ]},
          { hp: 0.5, moves: [
            { type: "CARPET_BARRAGE", columns: 4, colGap: 95, shiftX: 47, speed: 158, cd: 1.3, safeCorridor: 65 },
            { type: "AIMED_FAN", ways: 4, spreadDeg: 50, speed: 162, cd: 1.8 }
          ]}
        ]
      }
    },

    CH3: {
      SUB_ODD: {
        name: "Tàu Khu Trục Tia Chớp",
        phases: [
          { hp: 1.0, moves: [
            { type: "AIMED_FAN", ways: 4, spreadDeg: 55, speed: 160, cd: 1.6 },
            { type: "CROSS_NEEDLES", ways: 2, angleDeg: 28, speed: 168, cd: 1.8 }
          ]},
          { hp: 0.5, moves: [
            { type: "SWEEPING_WAVE", ways: 5, speed: 158, cd: 1.9 },
            { type: "RING_PULSE", ways: 12, speed: 155, cd: 2.1 }
          ]}
        ]
      },
      SUB_MID10: {
        name: "Chiến Hạm Từ Trường",
        phases: [
          { hp: 1.0, moves: [
            { type: "DOUBLE_HELIX", ways: 12, fireSec: 1.5, pauseSec: 0.4, speed: 162, safeCorridor: 68 },
            { type: "AIMED_BURST", burst: 3, gap: 0.16, speed: 170, cd: 1.9 }
          ]},
          { hp: 0.5, moves: [
            { type: "PILLAR_LASER", width: 36, warnSec: 0.8, cd: 3.4 },
            { type: "SPLIT_FAN", ways: 6, spreadDeg: 80, centerBlindDeg: 28, speed: 168, cd: 1.6 }
          ]}
        ]
      }
    },

    CH4: {
      SUB_ODD: {
        name: "Hộ Vệ Tinh Vân",
        phases: [
          { hp: 1.0, moves: [
            { type: "VELOCITY_ARC", ways: 5, spreadDeg: 65, speedMin: 150, speedMax: 175, cd: 1.7, safeCorridor: 64 },
            { type: "AIMED_BURST", burst: 3, gap: 0.15, speed: 175, cd: 1.9 }
          ]},
          { hp: 0.5, moves: [
            { type: "ROSETTE_BLOOM", petals: 4, speed: 168, cd: 1.2, safeCenterGap: 65 },
            { type: "AIMED_FAN", ways: 4, spreadDeg: 50, speed: 172, cd: 1.8 }
          ]}
        ]
      },
      SUB_MID10: {
        name: "Khu Trục Hạm Khúc Xạ",
        phases: [
          { hp: 1.0, moves: [
            { type: "REVERSING_SPIRAL", arms: 2, reverseSec: 3.0, speed: 168, cd: 0.14 },
            { type: "CROSS_NEEDLES", ways: 3, angleDeg: 32, speed: 178, cd: 1.7 }
          ]},
          { hp: 0.5, moves: [
            { type: "BOUNDARY_LASERS", xPositions: [70, 410], warnSec: 0.8, activeSec: 2.8, cd: 5.0 },
            { type: "VELOCITY_ARC", ways: 6, spreadDeg: 70, speedMin: 155, speedMax: 180, cd: 1.6 }
          ]}
        ]
      }
    },

    CH5: {
      SUB_ODD: {
        name: "Tuần Tiễu Hàn Băng",
        phases: [
          { hp: 1.0, moves: [
            { type: "SPLIT_FAN", ways: 6, spreadDeg: 85, centerBlindDeg: 30, speed: 172, cd: 1.6 },
            { type: "AIMED_BURST", burst: 3, gap: 0.14, speed: 182, cd: 1.8 }
          ]},
          { hp: 0.5, moves: [
            { type: "TIMED_BOMB", count: 2, delaySec: 2.0, childWays: 6, speed: 145, childSpeed: 178, cd: 2.6 },
            { type: "SWEEPING_WAVE", ways: 6, speed: 172, cd: 1.8 }
          ]}
        ]
      },
      SUB_MID10: {
        name: "Chiến Giáp Băng Tuyết",
        phases: [
          { hp: 1.0, moves: [
            { type: "PULSE_SPIRAL", arms: 2, fireSec: 1.3, pauseSec: 0.35, speed: 178, safeCorridor: 64 },
            { type: "PILLAR_LASER", width: 38, warnSec: 0.8, cd: 3.2 }
          ]},
          { hp: 0.5, moves: [
            { type: "DUAL_SPEED_RINGS", ways: 12, offsetDeg: 15, speeds: [165, 190], cd: 1.8 },
            { type: "AIMED_FAN", ways: 5, spreadDeg: 60, speed: 185, cd: 1.7 }
          ]}
        ]
      }
    },

    CH6: {
      SUB_ODD: {
        name: "Chiến Xa Hỏa Ngục",
        phases: [
          { hp: 1.0, moves: [
            { type: "PARABOLIC_ERUPTION", ways: 4, gravityY: 140, initialVy: -85, speed: 180, cd: 1.8, safeCorridor: 75 },
            { type: "FAN_BURST", ways: 5, spreadDeg: 55, speed: 185, cd: 1.6 }
          ]},
          { hp: 0.5, moves: [
            { type: "GATE_WALL", totalBullets: 8, gateMissing: 2, gateWidth: 82, speed: 175, cd: 2.1 },
            { type: "AIMED_BURST", burst: 3, gap: 0.14, speed: 192, cd: 1.7 }
          ]}
        ]
      },
      SUB_MID10: {
        name: "Cự Pháo Nhiệt Hạch",
        phases: [
          { hp: 1.0, moves: [
            { type: "GATE_WALL", totalBullets: 9, gateMissing: 2, gateWidth: 80, speed: 180, cd: 2.0 },
            { type: "PARABOLIC_ERUPTION", ways: 5, gravityY: 145, initialVy: -90, speed: 185, cd: 1.9 }
          ]},
          { hp: 0.5, moves: [
            { type: "DUAL_SPEED_RINGS", ways: 14, offsetDeg: 12.8, speeds: [172, 198], cd: 1.7 },
            { type: "CROSS_NEEDLES", ways: 4, angleDeg: 34, speed: 195, cd: 1.6 }
          ]}
        ]
      }
    },

    CH7: {
      SUB_ODD: {
        name: "Thợ Săn Ám Ảnh",
        phases: [
          { hp: 1.0, moves: [
            { type: "TWIN_CLAW_FANS", waysPerSide: 3, speed: 188, cd: 1.5 },
            { type: "AIMED_BURST", burst: 4, gap: 0.12, speed: 200, cd: 1.8 }
          ]},
          { hp: 0.5, moves: [
            { type: "STRAFE_DROP_CURTAIN", columns: 5, colGap: 68, dashSec: 1.3, speed: 188, cd: 2.3, safeCorridor: 64 },
            { type: "RING_PULSE", ways: 14, speed: 182, cd: 2.0 }
          ]}
        ]
      },
      SUB_MID10: {
        name: "Sát Thủ Không Gian",
        phases: [
          { hp: 1.0, moves: [
            { type: "PINCER_SPIRALS", arms: 2, speed: 188, safeCenterGap: 60 },
            { type: "TWIN_CLAW_FANS", waysPerSide: 4, speed: 195, cd: 1.6 }
          ]},
          { hp: 0.5, moves: [
            { type: "BLINK_RING_AMBUSH", nodes: [[120, 220], [240, 180], [360, 220]], ways: 10, warnSec: 0.5, speed: 192, cd: 3.4 },
            { type: "TRIPLE_SLASH_FAN", waves: 2, ways: 7, shiftDeg: 9, waveGap: 0.25, speed: 205, cd: 1.9 }
          ]}
        ]
      }
    },

    CH8: {
      SUB_ODD: {
        name: "Vệ Binh Cơ Giới",
        phases: [
          { hp: 1.0, moves: [
            { type: "CHECKERBOARD_GRID", cols: 5, colGap: 85, alternateShift: 42, speed: 192, cd: 1.3, safeCorridor: 60 },
            { type: "AIMED_FAN", ways: 5, spreadDeg: 55, speed: 202, cd: 1.7 }
          ]},
          { hp: 0.5, moves: [
            { type: "GEAR_SPIRAL", arms: 3, angularVel: 0.75, speed: 195, safeCorridor: 70 },
            { type: "PARTITION_LASERS", count: 2, xPositions: [160, 320], warnSec: 0.8, cd: 3.6 }
          ]}
        ]
      },
      SUB_MID10: {
        name: "Thiết Giáp Hạm Lượng Tử",
        phases: [
          { hp: 1.0, moves: [
            { type: "GEAR_SPIRAL", arms: 4, angularVel: 0.80, speed: 198, safeCorridor: 68 },
            { type: "AIMED_BURST", burst: 4, gap: 0.12, speed: 212, cd: 1.8 }
          ]},
          { hp: 0.5, moves: [
            { type: "PURGE_WALL", gateWidth: 75, centerSafeWidth: 110, speed: 192, cd: 2.0 },
            { type: "ROSETTE_BLOOM", petals: 6, speed: 198, cd: 1.0, safeCenterGap: 60 }
          ]}
        ]
      }
    },

    CH9: {
      SUB_ODD: {
        name: "Sứ Giả Hư Không",
        phases: [
          { hp: 1.0, moves: [
            { type: "CROWN_DUAL_FAN", fastWays: 5, fastSpeed: 212, slowWays: 4, slowSpeed: 168, cd: 1.7 },
            { type: "RICOCHET_ORBS", count: 1, bounces: 1, radius: 9, speed: 195, cd: 2.6 }
          ]},
          { hp: 0.5, moves: [
            { type: "DOUBLE_HELIX", ways: 14, fireSec: 1.5, pauseSec: 0.4, speed: 202, safeCorridor: 65 },
            { type: "SIDE_SPLITTER_TRAP", count: 2, splitAtPlayerY: true, speed: 198, cd: 2.5 }
          ]}
        ]
      },
      SUB_MID10: {
        name: "Thống Soái Vực Thẳm",
        phases: [
          { hp: 1.0, moves: [
            { type: "DOUBLE_HELIX", ways: 16, fireSec: 1.6, pauseSec: 0.4, speed: 208, safeCorridor: 64 },
            { type: "TRIPLE_LASER", lanes: 3, warnSec: 0.8, cd: 4.0 }
          ]},
          { hp: 0.5, moves: [
            { type: "COSMIC_COLLAPSE", spiralArms: 3, spiralSpeed: 198, ringWays: 18, ringMissing: 3, ringSpeed: 185, ringCd: 2.2, safeGateWidth: 72 },
            { type: "AIMED_BURST", burst: 4, gap: 0.10, speed: 222, cd: 2.0 }
          ]}
        ]
      }
    }
  },

  // =========================================================================
  // 2. 6 MẪU MID-BOSS CHƯƠNG 4-9 (1 PHA, 2 ĐÒN, MÁU = 2.8x TINH ANH, 20s RÚT LUI)
  // =========================================================================
  MID_BOSSES_6: {
    CH4: {
      id: "MIDBOSS_CH4",
      name: "Chỉ Huy Tinh Vân",
      hpEliteMultiplier: 2.8,
      timeoutEscapeSec: 20.0,
      phases: [
        { hp: 1.0, moves: [
          { type: "VELOCITY_ARC", ways: 5, spreadDeg: 65, speedMin: 150, speedMax: 185, cd: 1.6, safeCorridor: 65 },
          { type: "RING_PULSE", ways: 12, speed: 160, cd: 2.2 }
        ]}
      ]
    },
    CH5: {
      id: "MIDBOSS_CH5",
      name: "Thiết Kỵ Hàn Băng",
      hpEliteMultiplier: 2.8,
      timeoutEscapeSec: 20.0,
      phases: [
        { hp: 1.0, moves: [
          { type: "SPLIT_FAN", ways: 6, spreadDeg: 85, centerBlindDeg: 32, speed: 175, cd: 1.5, safeCorridor: 62 },
          { type: "TIMED_BOMB", count: 2, delaySec: 2.0, childWays: 6, speed: 145, childSpeed: 165, cd: 2.6 }
        ]}
      ]
    },
    CH6: {
      id: "MIDBOSS_CH6",
      name: "Pháo Thủ Dung Nham",
      hpEliteMultiplier: 2.8,
      timeoutEscapeSec: 20.0,
      phases: [
        { hp: 1.0, moves: [
          { type: "GATE_WALL", totalBullets: 8, gateMissing: 2, gateWidth: 80, speed: 170, cd: 2.0 },
          { type: "PARABOLIC_ERUPTION", ways: 4, gravityY: 140, initialVy: -85, speed: 180, cd: 1.8, safeCorridor: 75 }
        ]}
      ]
    },
    CH7: {
      id: "MIDBOSS_CH7",
      name: "Đội Trưởng Ám Sát",
      hpEliteMultiplier: 2.8,
      timeoutEscapeSec: 20.0,
      phases: [
        { hp: 1.0, moves: [
          { type: "TWIN_CLAW_FANS", waysPerSide: 3, speed: 190, cd: 1.4, safeCorridor: 60 },
          { type: "CROSS_NEEDLES", ways: 3, angleDeg: 30, speed: 195, cd: 1.8 }
        ]}
      ]
    },
    CH8: {
      id: "MIDBOSS_CH8",
      name: "Giám Sát Viên AI",
      hpEliteMultiplier: 2.8,
      timeoutEscapeSec: 20.0,
      phases: [
        { hp: 1.0, moves: [
          { type: "GEAR_SPIRAL", arms: 3, angularVel: 0.75, speed: 185, safeCorridor: 68 },
          { type: "AIMED_BURST", burst: 3, gap: 0.14, speed: 205, cd: 1.9 }
        ]}
      ]
    },
    CH9: {
      id: "MIDBOSS_CH9",
      name: "Ác Quỷ Dị Giới",
      hpEliteMultiplier: 2.8,
      timeoutEscapeSec: 20.0,
      phases: [
        { hp: 1.0, moves: [
          { type: "CROWN_DUAL_FAN", fastWays: 5, fastSpeed: 210, slowWays: 4, slowSpeed: 165, cd: 1.6, safeCorridor: 60 },
          { type: "RICOCHET_ORBS", count: 2, bounces: 1, radius: 9, speed: 185, cd: 2.5 }
        ]}
      ]
    }
  },

  // =========================================================================
  // 3. ĐẶC TẢ VẬT LÝ & THỊ GIÁC HUY CHƯƠNG LIÊN HOÀN (MEDAL CHAINING)
  // =========================================================================
  MEDAL_VISUAL_PHYSICS: {
    SHAPE: "HEXAGON_CREST",            // Hình khiên lục giác dẹt (khác sao 5 cánh & đạn tròn)
    WIDTH_PX: 28,
    HEIGHT_PX: 32,
    PICKUP_RADIUS_PX: 38,              // Bán kính nhặt trực tiếp (không tự hút từ xa)
    INITIAL_BOUNCE_VY: -135,           // Bật nảy lên trên -135 px/s khi vừa rơi ra
    BOUNCE_DURATION_SEC: 0.35,         // Thời gian nảy trước khi rơi đều
    TERMINAL_FALL_SPEED: 85,           // Tốc độ rơi 85 px/s (chậm hơn sao 110 & đạn 135+)
    SHOW_TIER_TEXT: true,              // Hiển thị chữ 'x1' -> 'x10' ngay chính giữa huy chương
    TEXT_FONT: "bold 11px monospace",
    COLOR_TIERS: {
      TIER_1_4:  { bg: "#071A2C", border: "#00F5D4", text: "#FFFFFF" }, // Xanh Ngọc Bạch Kim
      TIER_5_9:  { bg: "#1A0933", border: "#E0AAFF", text: "#FFE600" }, // Tím Hoàng Gia
      TIER_10:   { bg: "#002B36", border: "#00FFFF", text: "#FFFFFF", pulseGlow: true } // Bạch Kim Cực Đại
    },
    VALUES: [100, 200, 300, 450, 600, 800, 1050, 1350, 1650, 2000]
  },

  // =========================================================================
  // 4. LOGIC CHẤM HẠNG CUỐI ẢI (TÁCH BIỆT ẢI THƯỜNG & ẢI BOSS)
  // =========================================================================
  STAGE_RANKING_RULES: {
    // Quy tắc đếm % diệt quái
    KILL_COUNT_POLICY: {
      DENOMINATOR: "TOTAL_SPAWNED_WAVE_ENEMIES", // Tính trên tổng quái đợt chính đã sinh ra
      EXCLUDE_LOOT_CARRIER: true,                // Không phạt nếu bỏ lỡ Tàu Vận Tải Tinh Ngân
      EXCLUDE_BOSS_SUMMONED_PODS: true,          // Không tính đệ/vệ tinh do Boss gọi thêm
      ESCAPED_MIDBOSS_COUNTS_AS_MISSED: true     // Để Mid-Boss chạy thoát sẽ không đạt 100% Kill
    },
    // Điều kiện cho Ải Thường (Không chia hết cho 5)
    NORMAL_STAGE_CRITERIA: {
      S_PLUS: { minKillRatio: 1.00, maxHits: 0, minMedalTier: 5 },
      S:      { minKillRatio: 0.92, maxHits: 1, minGraze: 30 },
      A:      { minKillRatio: 0.85, maxHits: 3 },
      B:      { minKillRatio: 0.00, maxHits: 999 }
    },
    // Điều kiện cho Ải Boss (Chia hết cho 5: kết hợp % diệt quái đợt đầu + thời gian diệt Boss)
    BOSS_STAGE_CRITERIA: {
      S_PLUS: { minWaveKillRatio: 1.00, maxHits: 0, maxBossClearSecSub: 55, maxBossClearSecChapter: 75 },
      S:      { minWaveKillRatio: 0.90, maxHits: 1, maxBossClearSec: 90, orMinGraze: 25 },
      A:      { minWaveKillRatio: 0.80, maxHits: 3 },
      B:      { minWaveKillRatio: 0.00, maxHits: 999 }
    },
    // Phần thưởng theo hạng (0 Kim cương - bảo toàn BALANCE75)
    RANK_REWARDS: {
      S_PLUS: { alloyBonus: 0.40, stoneBonus: 0.20, firstClearMasteryTokens: 3, platinumStar: true },
      S:      { alloyBonus: 0.25, stoneBonus: 0.15, firstClearMasteryTokens: 1, platinumStar: false },
      A:      { alloyBonus: 0.10, stoneBonus: 0.00, firstClearMasteryTokens: 0, platinumStar: false },
      B:      { alloyBonus: 0.00, stoneBonus: 0.00, firstClearMasteryTokens: 0, platinumStar: false }
    }
  },

  // =========================================================================
  // 5. TIỆM DANH DỰ (KỆ 6 MÓN) & KINH TẾ XU TINH ANH HÀNG TUẦN
  // =========================================================================
  HONOR_SHOP_AND_ECONOMY: {
    // Nguồn thu Xu Tinh Anh định kỳ cho người chơi giỏi (~112 -> 160 Xu/tuần)
    RECURRING_TOKEN_SOURCES: {
      DAILY_MANUAL_S_RUNS_MAX: 3,      // Tối đa 3 trận tự lái (không càn quét) đạt S/S+ mỗi ngày
      TOKENS_PER_MANUAL_S: 3,          // Hạng S thưởng 3 Xu
      TOKENS_PER_MANUAL_S_PLUS: 4,     // Hạng S+ thưởng 4 Xu (Tối đa 12 Xu/ngày = 84 Xu/tuần)
      DAILY_CHALLENGE_S_TOKENS: 4,     // Đạt hạng S ở Thử Thách Ngày thưởng 4 Xu (28 Xu/tuần)
      BOSS_TOWER_5FLOORS_TOKENS: 10    // Mỗi 5 tầng Tháp Boss thưởng thêm 10 Xu
    },
    // Kệ 6 món Tiệm Danh Dự
    SHELF_6_ITEMS: [
      { slot: 1, id: "TRAIL_NEON_GOLD",      name: "Vệt Đuôi Hoàng Kim",        costTokens: 50,  type: "COSMETIC", oneTimeOnly: true },
      { slot: 2, id: "GRAZE_RING_CYBER",     name: "Vòng Graze Lục Bảo",        costTokens: 60,  type: "COSMETIC", oneTimeOnly: true },
      { slot: 3, id: "TITLE_BULLET_DANCER",  name: "Danh Hiệu: Vũ Công Mưa Đạn", costTokens: 120, type: "TITLE",    oneTimeOnly: true, speedBonus: 0.02 },
      { slot: 4, id: "REROLL_STONE_1",       name: "Đá Tẩy Khảm (x1)",          costTokens: 5,   type: "MATERIAL", weeklyLimit: 10 }, // 50 Xu/tuần
      { slot: 5, id: "PILOT_SHARD_SELECT_5", name: "5 Mảnh Phi Công Tự Chọn",   costTokens: 25,  type: "MATERIAL", weeklyLimit: 2 },  // 50 Xu/tuần
      { slot: 6, id: "BLUE_FODDER_SELECT",   name: "Phôi Trang Bị Lam Tự Chọn", costTokens: 30,  type: "MATERIAL", weeklyLimit: 2 }   // 60 Xu/tuần
    ]
  }
};
