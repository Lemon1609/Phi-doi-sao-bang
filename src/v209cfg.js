'use strict';
// V209 · Hằng số Gemini (V209_ARMOR_EVENT_CONFIG): chướng ngại tăng dần chương 6–10 + thưởng phá tháp pháo + 6 nội tại giáp theo sự kiện (D7).
const V209_ARMOR_EVENT_CONFIG = {
  id: "v209_armor_event_config",
  flag: "ARMOR_EV209",
  hazardProgressionV209: {
    maxAsteroidsOnScreen: 2,
    maxTurretPairsOnScreen: 1,
    turretRightFirePhaseOffsetSec: 1.2,
    dropMarginFromScreenEdgePx: 36,
    byChapter: {
      6:  { stages: [101, 120], asteroidHpMult: 2.2, turretHpMult: 3.5, asteroidSpawnSec: [8.0, 10.0], turretPairSec: 24, turretShotCd: 2.6 },
      7:  { stages: [121, 140], asteroidHpMult: 2.5, turretHpMult: 4.0, asteroidSpawnSec: [7.0, 9.0],  turretPairSec: 22, turretShotCd: 2.4 },
      8:  { stages: [141, 160], asteroidHpMult: 3.0, turretHpMult: 4.8, asteroidSpawnSec: [6.5, 8.5],  turretPairSec: 20, turretShotCd: 2.2 },
      9:  { stages: [161, 180], asteroidHpMult: 3.4, turretHpMult: 5.5, asteroidSpawnSec: [6.0, 8.0],  turretPairSec: 19, turretShotCd: 2.1 },
      10: { stages: [181, 200], asteroidHpMult: 3.8, turretHpMult: 6.0, asteroidSpawnSec: [5.5, 7.5],  turretPairSec: 18, turretShotCd: 2.0 }
    },
    rewards: {
      asteroidBreak: { starCount: 1, starVal: 56 },
      singleTurretBreak: { bigStarCount: 1, bigStarVal: 140, directCredits: 25, buffDropChance: 0.25, buffPool: ["power", "shield", "super"] },
      bothTurretsInPairCleared: { dropComboMedalV77: true, bonusDirectCredits: 60 }
    }
  },
  armorEventPassives: [
    { id: "ev_super_shield", tag: "Khiên Siêu Cấp", trigger: "onEnterSuper", armors: ["aegis", "orbital", "aegis9"], icdSec: 12.0, maxTriggersPerMin: 3,
      lvValues: { shieldProcChance: [0.50, 0.62, 0.75, 0.88, 1.00], clearBulletsRadiusPx: 110 },
      desc: "Khi vào Bạo Tẩu: {chance}% tạo 1 tầng Khiên chặn đòn (vĩnh viễn tới khi vỡ) và xóa đạn gần 110px (hồi 12s)." },
    { id: "ev_pickup_mend", tag: "Tiếp Tế Mạch", trigger: "onPickupBuffOrMedal", armors: ["nanite", "seraph36", "devour10_a"], icdSec: 3.0, maxHealHpPctPerMin: 18.0,
      lvValues: { healMaxHpPct: [2.0, 2.3, 2.7, 3.1, 3.5], restoreMaxArmorPct: [3.0, 3.2, 3.5, 3.8, 4.0] },
      desc: "Nhặt viên Buff hoặc Huy chương: hồi ngay {hp}% Máu và {arm}% Giáp (hồi 3s, trần 18% Máu/phút)." },
    { id: "ev_hazard_charge", tag: "Phá Chướng Nạp", trigger: "onDestroyHazardOrEliteOrWing", armors: ["mirror", "reactive"], icdSec: 4.0, maxTriggersPerMin: 6,
      lvValues: { superGaugeAddPct: [12, 14, 16, 18, 20], extendActiveSuperSec: [0.4, 0.5, 0.6, 0.65, 0.70], maxExtendPerSuperSec: 2.1 },
      desc: "Phá Chướng ngại, Tinh anh hoặc Cánh Boss: nạp +{gauge}% thanh Bạo Tẩu (hoặc kéo dài Bạo Tẩu +{ext}s, hồi 4s)." },
    { id: "ev_graze_pulse", tag: "Lách Đạn Phản", trigger: "onGrazeCountReached", armors: ["phase", "aurora36"], grazeRequired: 5, icdSec: 5.0, maxTriggersPerMin: 8,
      lvValues: { restoreMaxArmorPct: [5.0, 5.8, 6.5, 7.2, 8.0], counterBolts: 2, boltGearDmgPct: [100, 110, 120, 130, 140] },
      desc: "Mỗi 5 lần sượt đạn: hồi ngay {arm}% Giáp và phóng 2 tia phản kích ({dmg}% ST trang bị, hồi 5s)." },
    { id: "ev_break_nova", tag: "Xung Phá Vây", trigger: "onShieldOrArmorLayerBroken", armors: ["void36", "chrono11_a"], icdSec: 10.0, maxTriggersPerMin: 4,
      lvValues: { clearBulletsRadiusPx: [105, 112, 120, 128, 135], refundArmorSkillCdPct: [6, 7, 8, 9, 10] },
      desc: "Khi vỡ Khiên hoặc tầng chặn: xóa sạch đạn địch trong bán kính {rad}px quanh tàu và giảm {cd}% hồi kỹ năng Giáp (hồi 10s)." },
    { id: "ev_bounty_aegis", tag: "Chiến Lợi Thuẫn", trigger: "onKill3ElitesOrBossPhase", armors: ["monarch12_a"], icdSec: 8.0, maxPermanentShieldCapHpPct: 12.0,
      lvValues: { clearDelayedDebtPct: [20, 24, 28, 32, 35], grantPermanentShieldHpPct: [5.0, 5.8, 6.5, 7.2, 8.0] },
      desc: "Hạ 3 Tinh anh hoặc 1 pha Boss: xóa {debt}% máu nợ và nhận Khiên vĩnh viễn bằng {sh}% HP tối đa (trần cộng dồn 12% HP)." }
  ]
};

// V210 · Hằng số Gemini (V210_SURVIVE_AND_EVENT_BAL): giảm 4 nội tại phòng thủ, kế thừa SSS 1,0 / 0,6 / 1,25, va chạm thiên thạch = 1 đòn đạn, SURV200 160/180/200 = .86/.68/.63
const V210_SURVIVE_AND_EVENT_BAL = {
  id: "v210_survive_and_event_bal",
  flag: "BAL210",

  // 1. Xác nhận 5 quy tắc kỹ thuật từ V209
  confirmedRulesV209: {
    turretMedalMissKeepsCombo: true,          // Trôi mất huy chương thưởng tháp không làm đứt chuỗi V77
    additiveWithV144AndV147: true,            // Chạy cộng thêm với nội tại giáp cũ
    fixedCdRefundBaseSec: { v144: 16, void36: 22, chrono11_a: 75 },
    bossPhaseTriggerIsWingBreak: true,        // 1 pha boss = vỡ 1 cánh boss
    permanentShieldBlocksCollision: true,     // Khiên Chiến Lợi Thuẫn chặn cả va chạm
    hazardAsteroidCollisionScaleVsBullet: 1.0 // Riêng va chạm thiên thạch tính bằng 1.0 đòn đạn (không nhân 3.1x như đâm thân Boss)
  },

  // 2. Quy tắc kế thừa 2 nội tại sự kiện trên Giáp Hợp Thể SSS
  sssArmorEventInheritance: {
    primaryParentScale: 1.00,   // Nội tại món mẹ thứ nhất hưởng 100% mốc Lv5
    secondaryParentScale: 0.60, // Nội tại món mẹ thứ hai hưởng 60% hiệu lực hồi/tỉ lệ (chống vượt trần khi ghép 2 giáp hồi phục)
    samePassiveIdBonus: 1.25    // Nếu 2 món mẹ có cùng mã nội tại sự kiện (vd: seraph36 + aegis9) thì gộp làm 1 và nhân 1.25x
  },

  // 3. Vi chỉnh thông số 4 nội tại phòng thủ (ev_hazard_charge và ev_break_nova giữ nguyên như V209)
  tunedEventPassivesV210: {
    ev_super_shield: {
      icdSec: 16.0,             // 12s -> 16s
      maxTriggersPerMin: 2,     // 3 -> 2 lần/phút
      shieldProcChance: [0.40, 0.50, 0.60, 0.70, 0.80], // 50..100% -> 40..80%
      clearBulletsRadiusPx: 110
    },
    ev_pickup_mend: {
      icdSec: 3.5,              // 3.0s -> 3.5s
      maxHealHpPctPerMin: 12.0, // 18% -> 12% HP/phút
      healMaxHpPct: [1.5, 1.7, 2.0, 2.2, 2.5],          // 2.0..3.5% -> 1.5..2.5%
      restoreMaxArmorPct: [2.0, 2.2, 2.5, 2.8, 3.0]     // 3.0..4.0% -> 2.0..3.0%
    },
    ev_graze_pulse: {
      grazeRequired: 6,         // 5 -> 6 lần sượt đạn
      icdSec: 6.0,              // 5.0s -> 6.0s
      maxTriggersPerMin: 6,     // 8 -> 6 lần/phút
      restoreMaxArmorPct: [3.5, 4.1, 4.7, 5.3, 6.0],    // 5.0..8.0% -> 3.5..6.0%
      counterBolts: 2,
      boltGearDmgPct: [100, 110, 120, 130, 140]
    },
    ev_bounty_aegis: {
      icdSec: 8.0,
      maxPermanentShieldCapHpPct: 10.0,                 // 12% -> 10% HP
      clearDelayedDebtPct: [15, 18, 20, 22, 25],        // 20..35% -> 15..25%
      grantPermanentShieldHpPct: [4.0, 4.6, 5.2, 5.8, 6.5] // 5.0..8.0% -> 4.0..6.5%
    }
  },

  // 4. Bảng hệ số sát thương địch SURV200 cập nhật nhẹ ở ải 160-200 để bù cho nội tại sự kiện mới
  enemyDamageMultAnchorsV210: {
    1:   1.00,
    20:  1.00,
    40:  0.90,
    60:  0.80,
    80:  0.80,
    100: 0.80,
    120: 0.90,
    140: 1.00,
    160: 0.86, // Từ 0.82 -> 0.86 (giữ ~11.2 đòn khi có thêm nội tại sự kiện)
    180: 0.68, // Từ 0.65 -> 0.68 (giữ ~11.4 đòn)
    200: 0.63  // Từ 0.60 -> 0.63 (giữ ~11.0 đòn)
  }
};

// V211 · Hằng số Gemini (V211_ARMOR_EVENT_AND_SURV_FIX): chỉnh theo đòn thật 5,64 máu. Ưu tiên V211 > V210. Tắt V211: window.BAL211=false
const V211_ARMOR_EVENT_AND_SURV_FIX = {
  id: "v211_armor_event_and_surv_fix",
  flag: "BAL211",

  // Giữ nguyên quy tắc kế thừa SSS của V210 và va chạm thiên thạch của V208
  sssArmorEventInheritance: {
    primaryParentScale: 1.00,
    secondaryParentScale: 0.60,
    samePassiveIdBonus: 1.25
  },

  // Chỉnh lại 3 nội tại theo % máu/giáp dựa trên sát thương đòn thật 5.64
  tunedEventPassivesV211: {
    ev_super_shield: {
      // Giữ nguyên mức V210 vì chặn trọn 1 đòn bất kể lượng sát thương
      icdSec: 16.0,
      maxTriggersPerMin: 2,
      shieldProcChance: [0.40, 0.50, 0.60, 0.70, 0.80],
      clearBulletsRadiusPx: 110
    },
    ev_pickup_mend: {
      // Khôi phục về mức V209 (trần 18% máu/phút ≈ 1.7 đòn thật)
      icdSec: 3.0,
      maxHealHpPctPerMin: 18.0,
      healMaxHpPct: [2.0, 2.3, 2.7, 3.1, 3.5],
      restoreMaxArmorPct: [3.0, 3.2, 3.5, 3.8, 4.0]
    },
    ev_graze_pulse: {
      // Khôi phục về mức V209 (8% giáp ≈ 0.28 đòn thật mỗi lần kích)
      grazeRequired: 5,
      icdSec: 5.0,
      maxTriggersPerMin: 8,
      restoreMaxArmorPct: [5.0, 5.8, 6.5, 7.2, 8.0],
      counterBolts: 2,
      boltGearDmgPct: [100, 110, 120, 130, 140]
    },
    ev_bounty_aegis: {
      // Nâng khiên lên 6-10% máu (Lv5 = 5.33 máu ≈ 95% của 1 đòn 5.64)
      icdSec: 8.0,
      maxPermanentShieldCapHpPct: 15.0,
      clearDelayedDebtPct: [20, 24, 28, 32, 35],
      grantPermanentShieldHpPct: [6.0, 7.0, 8.0, 9.0, 10.0]
    }
  },

  // Hạ nhẹ hệ số sát thương địch ở ải 160-200 về mức trung gian giữa V200 và V210
  enemyDamageMultAnchorsV211: {
    1:   1.00,
    20:  1.00,
    40:  0.90,
    60:  0.80,
    80:  0.80,
    100: 0.80,
    120: 0.90,
    140: 1.00,
    160: 0.84,
    180: 0.66,
    200: 0.61
  }
};
// Bộ cân bằng đang dùng: V211 (nếu bật) → V210 (nếu bật) → null (số gốc V209)
function BAL_EV(){try{if(window.BAL211!==false&&typeof V211_ARMOR_EVENT_AND_SURV_FIX!=='undefined'){const b=V211_ARMOR_EVENT_AND_SURV_FIX;return {v:211,tuned:b.tunedEventPassivesV211,inh:b.sssArmorEventInheritance,anchors:b.enemyDamageMultAnchorsV211};}
 if(window.BAL210!==false&&typeof V210_SURVIVE_AND_EVENT_BAL!=='undefined'){const b=V210_SURVIVE_AND_EVENT_BAL;return {v:210,tuned:b.tunedEventPassivesV210,inh:b.sssArmorEventInheritance,anchors:b.enemyDamageMultAnchorsV210};}}catch{}return null;}
