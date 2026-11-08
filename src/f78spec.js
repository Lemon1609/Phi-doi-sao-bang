'use strict';
// FEATURES_V78 · Gemini 24/10 (nguyên văn): Phá Vây, Hạt giống + BXH 50 NPC + mã khoe, nhiệm vụ 3★, Trạm Khai Thác, Cốt truyện & Thân thiết.
const FEATURES_V78 = {
  // =========================================================================
  // 1. CHẾ ĐỘ "PHÁ VÂY" (ROGUELITE 12 CHẶNG)
  // =========================================================================
  BREAKOUT_ROGUELITE: {
    TOTAL_STAGES: 12,
    BOSS_STAGES: [4, 8, 12],             // Chặng 4, 8: Mid/Sub-Boss | Chặng 12: Boss Chương
    PERK_DRAFT_STAGES: [1, 2, 4, 6, 8, 10], // Chọn 1 trong 3 Ấn Chú (Tối đa 6 Ấn Chú/lượt)
    DAILY_REWARDED_RUNS_MAX: 2,          // Chơi vô hạn, nhưng chỉ 2 lượt cao nhất/ngày nhận thưởng
    ENERGY_COST: 0,                      // Miễn phí thể lực để người chơi luyện kỹ năng

    // Chuẩn hóa chỉ số: Kỹ năng quyết định 80%, Lực chiến ngoài chỉ cộng tối đa +25%
    STAT_NORMALIZATION: {
      BASE_ATK: 1000,
      BASE_HP: 5000,
      BASE_SHIELD: 2500,
      MAX_OUTSIDE_CP_BONUS: 0.25,
      CP_SCALING_DIVISOR: 400000
    },

    // Luật hồi phục qua từng chặng
    RECOVERY_RULES: {
      NORMAL_STAGE_CLEAR: { healHpRatio: 0.10, healShieldRatio: 0.15 },
      BOSS_STAGE_CHOICE: {
        OPTION_HEAL: { healHpRatio: 0.60, healShieldRatio: 1.00 },
        OPTION_GREED: { bonusPerkShards: 40 }
      }
    },

    // Đường cong độ khó 12 chặng trong Phá Vây
    STAGE_SCALING: [
      { stage: 1,  hpMult: 1.00, dmgMult: 1.00, bulletSpeed: 140, type: "WAVE" },
      { stage: 2,  hpMult: 1.20, dmgMult: 1.08, bulletSpeed: 148, type: "WAVE" },
      { stage: 3,  hpMult: 1.45, dmgMult: 1.16, bulletSpeed: 155, type: "WAVE" },
      { stage: 4,  hpMult: 1.80, dmgMult: 1.25, bulletSpeed: 162, type: "SUB_BOSS" },
      { stage: 5,  hpMult: 2.05, dmgMult: 1.35, bulletSpeed: 168, type: "WAVE" },
      { stage: 6,  hpMult: 2.35, dmgMult: 1.45, bulletSpeed: 175, type: "WAVE" },
      { stage: 7,  hpMult: 2.65, dmgMult: 1.55, bulletSpeed: 182, type: "WAVE" },
      { stage: 8,  hpMult: 3.00, dmgMult: 1.70, bulletSpeed: 188, type: "SUB_BOSS" },
      { stage: 9,  hpMult: 3.30, dmgMult: 1.85, bulletSpeed: 194, type: "WAVE" },
      { stage: 10, hpMult: 3.60, dmgMult: 2.00, bulletSpeed: 200, type: "WAVE" },
      { stage: 11, hpMult: 3.90, dmgMult: 2.15, bulletSpeed: 208, type: "WAVE" },
      { stage: 12, hpMult: 4.25, dmgMult: 2.30, bulletSpeed: 215, type: "CHAPTER_BOSS" }
    ],

    // Thưởng theo mốc chặng đạt được (0 Kim cương - bảo toàn BALANCE75)
    MILESTONE_REWARDS: [
      { stageReached: 4,  perkShards: 25,  masteryTokens: 2,  alloy: 5000 },
      { stageReached: 8,  perkShards: 55,  masteryTokens: 5,  alloy: 12000 },
      { stageReached: 12, perkShards: 100, masteryTokens: 10, alloy: 25000 }
    ],

    // 24 Ấn Chú (4 Hệ x 6 Món)
    PERKS_24: [
      // HỆ HỎA (FIRE)
      { id: "P_F1", name: "Nòng Kép Phân Kỳ",   group: "FIRE", rarity: "BLUE",   unlockCost: 0,   effect: { extraSpreadShot: 1, shotDmgMod: -0.10 } },
      { id: "P_F2", name: "Đầu Đạn Nhiệt Hạch", group: "FIRE", rarity: "BLUE",   unlockCost: 0,   effect: { burnDpsRatio: 0.20, burnSec: 2.5 } },
      { id: "P_F3", name: "Thuốc Súng Quá Tải", group: "FIRE", rarity: "PURPLE", unlockCost: 0,   effect: { allDmgBonus: 0.35, playerBulletSpeedMod: -0.15 } },
      { id: "P_F4", name: "Đạn Nảy Phản Xạ",   group: "FIRE", rarity: "PURPLE", unlockCost: 0,   effect: { bulletBounce: 1, bounceDmgRatio: 0.65 } },
      { id: "P_F5", name: "Mưa Tên Lửa Đệm",    group: "FIRE", rarity: "ORANGE", unlockCost: 100, effect: { autoMissilesCount: 4, intervalSec: 3.5, dmgRatio: 1.10 } },
      { id: "P_F6", name: "Lời Nguyền Kính Vỡ", group: "FIRE", rarity: "ORANGE", unlockCost: 150, effect: { finalDmgMultiplier: 2.0, forceMaxHpToOne: true } },

      // HỆ BĂNG (ICE)
      { id: "P_I1", name: "Giáp Phản Phổ",      group: "ICE",  rarity: "BLUE",   unlockCost: 0,   effect: { maxShieldBonus: 0.45, roundBulletDmgReduction: 0.15 } },
      { id: "P_I2", name: "Trường Lực Hàn Băng",group: "ICE",  rarity: "BLUE",   unlockCost: 0,   effect: { auraRadiusPx: 110, enemyBulletSlow: 0.25 } },
      { id: "P_I3", name: "Khiên Tự Hồi",       group: "ICE",  rarity: "PURPLE", unlockCost: 0,   effect: { autoBlockShieldCooldownSec: 18.0 } },
      { id: "P_I4", name: "Mảnh Vỡ Đóng Băng",  group: "ICE",  rarity: "PURPLE", unlockCost: 0,   effect: { freezeScreenOnHitSec: 2.0 } },
      { id: "P_I5", name: "Lõi Sinh Mệnh",      group: "ICE",  rarity: "ORANGE", unlockCost: 100, effect: { stageHealBonus: 0.20, extraReviveCount: 1, reviveHpRatio: 0.50 } },
      { id: "P_I6", name: "Pháo Đài Tĩnh Lặng", group: "ICE",  rarity: "ORANGE", unlockCost: 150, effect: { standStillFireRateBonus: 0.45, standStillDmgReduction: 0.40 } },

      // HỆ LÔI (THUNDER)
      { id: "P_T1", name: "Từ Trường Siêu Dẫn", group: "THUNDER", rarity: "BLUE",   unlockCost: 0,   effect: { magnetRadiusPx: 420, moveSpeedBonus: 0.15 } },
      { id: "P_T2", name: "Cảm Ứng Sượt Đạn",   group: "THUNDER", rarity: "BLUE",   unlockCost: 0,   effect: { grazeRageMult: 2.0, grazeRadiusBonus: 0.25 } },
      { id: "P_T3", name: "Tia Chớp Graze",     group: "THUNDER", rarity: "PURPLE", unlockCost: 0,   effect: { lightningOnGrazeDmgRatio: 0.90 } },
      { id: "P_T4", name: "Bạo Tẩu Kéo Dài",    group: "THUNDER", rarity: "PURPLE", unlockCost: 0,   effect: { rampageDurationAddSec: 3.0 } },
      { id: "P_T5", name: "Động Cơ Quá Tải",    group: "THUNDER", rarity: "ORANGE", unlockCost: 100, effect: { rampageFireRateBonus: 0.40, rampageBulletsDestroyEnemyBullets: true } },
      { id: "P_T6", name: "Xung Nhịp Điện Từ",  group: "THUNDER", rarity: "ORANGE", unlockCost: 150, effect: { ultAndBombCooldownReduction: 0.35 } },

      // HỆ HƯ VÔ (VOID)
      { id: "P_V1", name: "Thu Nhỏ Tâm Tàu",    group: "VOID", rarity: "BLUE",   unlockCost: 0,   effect: { hurtboxRadiusOverridePx: 3.5 } },
      { id: "P_V2", name: "Thợ Săn Tinh Anh",   group: "VOID", rarity: "BLUE",   unlockCost: 0,   effect: { eliteAndBossDmgBonus: 0.45 } },
      { id: "P_V3", name: "Đạn Xuyên Không",    group: "VOID", rarity: "PURPLE", unlockCost: 0,   effect: { pierceAllEnemies: true, decayPerPierce: 0.15 } },
      { id: "P_V4", name: "Dư Chấn Hố Đen",     group: "VOID", rarity: "PURPLE", unlockCost: 0,   effect: { blackholeOnEliteKillSec: 2.0 } },
      { id: "P_V5", name: "Bóng Ma Phân Thân",  group: "VOID", rarity: "ORANGE", unlockCost: 100, effect: { shadowCloneDelaySec: 0.35, cloneDmgRatio: 0.45 } },
      { id: "P_V6", name: "Khế Ước Ma Cà Rồng", group: "VOID", rarity: "ORANGE", unlockCost: 150, effect: { convertShieldToHpMult: 1.5, healRatioEvery20Kills: 0.03 } }
    ],

    // 6 Cộng Hưởng (Synergies)
    SYNERGIES_6: [
      { id: "SYN_1", name: "Lăng Kính Vạn Hoa",      req: ["P_F1", "P_F4"], effect: { bounceNoDecay: true, splitOnBounce: 1 } },
      { id: "SYN_2", name: "Lưỡi Hái Tử Thần",       req: ["P_F6", "P_I3"], effect: { shieldCooldownOverrideSec: 10.0, bonusDmgWhileShielded: 0.50 } },
      { id: "SYN_3", name: "Bão Điện Từ Trường",     req: ["P_T2", "P_T3"], effect: { chainTargets: 3, empPulseEveryNGrazes: 15, empRadiusPx: 80 } },
      { id: "SYN_4", name: "Phản Ứng Nhiệt Độ Không",req: ["P_I2", "P_F2"], effect: { thermalShockDpsRatio: 2.50, intervalSec: 3.0 } },
      { id: "SYN_5", name: "Quân Đoàn Hư Ảnh",       req: ["P_V3", "P_V5"], effect: { extraClone: 1, pierceNoDecay: true } },
      { id: "SYN_6", name: "Bạo Tẩu Vĩnh Hằng",      req: ["P_T4", "P_T5"], effect: { extendRampageSecPer12Kills: 1.0, maxExtendSec: 5.0 } }
    ]
  },

  // =========================================================================
  // 2. THỬ THÁCH NGÀY HẠT GIỐNG CHUNG + BẢNG XẾP HẠNG 50 NPC + MÃ KHOE BĂM
  // =========================================================================
  SEEDED_DAILY_LEADERBOARD: {
    SECRET_SALT: "SAOBANG_SECRET_78",

    // Hàm PRNG mulberry32 quyết định toàn bộ hạt giống theo ngày YYYYMMDD
    createSeededRNG(seedNumber) {
      let a = seedNumber >>> 0;
      return function() {
        let t = (a += 0x6D2B79F5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    },

    // Công thức tính điểm trận đấu Hạt giống
    calcScore({ kills, graze, maxMedalTier, hpLeftRatio, clearTimeSec, hitsTaken, isVictory }) {
      const base = (kills * 100) + (graze * 45) + (maxMedalTier * 500);
      if (!isVictory) return Math.max(500, base - (hitsTaken * 600));
      const hpBonus = Math.floor(hpLeftRatio * 3000);
      const speedBonus = Math.max(0, Math.floor((150 - clearTimeSec) * 80));
      return Math.max(1000, base + hpBonus + speedBonus - (hitsTaken * 1200));
    },

    // Sinh điểm cho 50 NPC (Người chơi giỏi ~34.000đ sẽ lọt Top 10 sau ~7 ngày)
    generateNpcBoard(dateSeedYYYYMMDD, playerDaysPlayed = 1) {
      const rng = this.createSeededRNG(dateSeedYYYYMMDD);
      // Rào cản giảm dần từ 1.18 (Ngày 1) xuống 0.95 (Ngày 8+) để tạo cảm giác leo hạng
      const newbieBarrier = Math.max(0.95, 1.18 - Math.min(8, playerDaysPlayed - 1) * 0.03);
      const board = [];

      for (let rank = 1; rank <= 50; rank++) {
        const skillCurve = Math.pow((50 - rank) / 49, 1.35);
        const baseScore = 14000 + 21000 * skillCurve;
        const dailyVariance = 0.95 + 0.10 * rng();
        const finalScore = Math.round((baseScore * newbieBarrier * dailyVariance) / 10) * 10;
        board.push({ npcId: `NPC_${rank}`, score: finalScore });
      }
      return board.sort((a, b) => b.score - a.score);
    },

    // Tạo Mã Khoe Điểm: SB-MMDD-XXXX-HH (Ví dụ: SB-1024-0D80-4F)
    encodeShareCode(mmddStr, score) {
      const compressed = Math.min(65535, Math.max(0, Math.round(score / 10)));
      const hexScore = compressed.toString(16).toUpperCase().padStart(4, "0");
      const payload = `${mmddStr}:${hexScore}:${this.SECRET_SALT}`;
      let hash = 2166136261;
      for (let i = 0; i < payload.length; i++) {
        hash ^= payload.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
      }
      const checksumHex = ((hash >>> 0) & 0xFF).toString(16).toUpperCase().padStart(2, "0");
      return `SB-${mmddStr}-${hexScore}-${checksumHex}`;
    },

    // Giải mã và kiểm tra chống sửa điểm từ bạn bè
    decodeAndVerifyShareCode(codeStr) {
      const parts = (codeStr || "").trim().toUpperCase().split("-");
      if (parts.length !== 4 || parts[0] !== "SB") return { valid: false };
      const [_, mmdd, hexScore, givenHash] = parts;
      const score = parseInt(hexScore, 16) * 10;
      if (isNaN(score)) return { valid: false };
      const expectedCode = this.encodeShareCode(mmdd, score);
      return {
        valid: expectedCode === codeStr.trim().toUpperCase(),
        mmdd,
        score
      };
    },

    // Thưởng xếp hạng ngày
    DAILY_RANK_REWARDS: [
      { maxRank: 3,  masteryTokens: 8, alloy: 15000, upgradeStone: 10 },
      { maxRank: 10, masteryTokens: 6, alloy: 10000, upgradeStone: 6 },
      { maxRank: 30, masteryTokens: 4, alloy: 6000,  upgradeStone: 3 },
      { maxRank: 50, masteryTokens: 2, alloy: 3000,  upgradeStone: 0 }
    ]
  },

  // =========================================================================
  // 3. HỆ 12 NHIỆM VỤ RIÊNG MỖI ẢI (HỢP NHẤT VÀO 3★ SKY FORCE STYLE)
  // =========================================================================
  STAGE_MISSIONS_SKYFORCE: {
    TEMPLATES: {
      M01_CLEAR:        { desc: "Vượt ải chiến dịch thành công" },
      M02_KILL_100:     { desc: "Tiêu diệt 100% quân địch trong ải", targetRatio: 1.00 },
      M03_STAR_90:      { desc: "Thu thập ≥ 90% Sao vàng rơi ra", targetRatio: 0.90 },
      M04_RESCUE:       { desc: "Giải cứu đủ phi công bị giam giữ", baseCount: 2 },
      M05_CARRIER:      { desc: "Bắn hạ Tàu Vận Tải Tinh Ngân" },
      M06_UNTOUCHED:    { desc: "Giữ nguyên 100% Máu (được mất Giáp)" },
      M07_NO_BOMB:      { desc: "Chiến thắng mà không dùng Bom EMP" },
      M08_GRAZE_COUNT:  { desc: "Thực hiện ≥ {X} lần Sượt đạn (Graze)", baseCount: 15, perChapterAdd: 3 },
      M09_MEDAL_CHAIN:  { desc: "Đạt chuỗi Huy chương Liên hoàn Bậc {X}", baseTier: 4, maxTier: 7 },
      M10_ELITE_BLITZ:  { desc: "Hạ mọi Quái Tinh Anh trong vòng 7 giây", maxKillSec: 7.0 },
      M11_FAST_BOSS:    { desc: "Hạ gục Boss trong vòng {X} giây", subBossSec: 55, mid10Sec: 65, chapterBossSec: 80 },
      M12_NO_ULT:       { desc: "Chiến thắng không bật Vũ Khí Tối Thượng" }
    },

    // Luật tự động gán 3 nhiệm vụ ★ cho từng ải (1 -> 180)
    getMissionsForStage(stage) {
      const star1 = "M01_CLEAR";
      // Nếu là ải Boss (chia hết cho 5)
      if (stage % 5 === 0) {
        const star2 = "M11_FAST_BOSS";
        const bossPool = ["M06_UNTOUCHED", "M07_NO_BOMB", "M12_NO_ULT"];
        const star3 = bossPool[(stage / 5) % bossPool.length];
        return [star1, star2, star3];
      }
      // Nếu là ải thường
      const pool2 = ["M05_CARRIER", "M02_KILL_100", "M03_STAR_90", "M04_RESCUE"];
      const pool3 = stage > 20
        ? ["M06_UNTOUCHED", "M07_NO_BOMB", "M08_GRAZE_COUNT", "M09_MEDAL_CHAIN", "M10_ELITE_BLITZ"]
        : ["M06_UNTOUCHED", "M07_NO_BOMB", "M08_GRAZE_COUNT", "M09_MEDAL_CHAIN"];
      return [star1, pool2[stage % pool2.length], pool3[stage % pool3.length]];
    },

    // Thưởng mốc Huy Hiệu Chương (Mỗi chương 20 ải = 60 ★)
    CHAPTER_STAR_REWARDS: {
      STARS_20: { alloy: 15000, upgradeStone: 15 },
      STARS_40: { perkShards: 30, blueFodderBox: 1 },
      STARS_60: { pilotShardSelect: 10, unlockChapterFrame: true, globalAtkBonus: 0.01 }
    }
  },

  // =========================================================================
  // 4. TRẠM KHAI THÁC (GỘP VÀO TUẦN TRA TREO MÁY & VIỄN CHINH NGẮN 1-4H)
  // =========================================================================
  MINING_STATION_IDLE: {
    LEVELS: [
      { lv: 1,  upgradeCostAlloy: 0,       maxHours: 8,  alloyPerHr: 800,  stonePerHr: 1.5, pilotShardEveryHrs: 6.0 },
      { lv: 2,  upgradeCostAlloy: 15000,   maxHours: 8,  alloyPerHr: 1000, stonePerHr: 1.8, pilotShardEveryHrs: 6.0 },
      { lv: 3,  upgradeCostAlloy: 35000,   maxHours: 8,  alloyPerHr: 1250, stonePerHr: 2.2, pilotShardEveryHrs: 5.0 },
      { lv: 4,  upgradeCostAlloy: 70000,   maxHours: 10, alloyPerHr: 1500, stonePerHr: 2.6, pilotShardEveryHrs: 5.0 },
      { lv: 5,  upgradeCostAlloy: 120000,  maxHours: 10, alloyPerHr: 1800, stonePerHr: 3.0, pilotShardEveryHrs: 4.0 },
      { lv: 6,  upgradeCostAlloy: 200000,  maxHours: 10, alloyPerHr: 2100, stonePerHr: 3.5, pilotShardEveryHrs: 4.0 },
      { lv: 7,  upgradeCostAlloy: 320000,  maxHours: 10, alloyPerHr: 2400, stonePerHr: 4.0, pilotShardEveryHrs: 3.5 },
      { lv: 8,  upgradeCostAlloy: 500000,  maxHours: 12, alloyPerHr: 2750, stonePerHr: 4.5, pilotShardEveryHrs: 3.5 },
      { lv: 9,  upgradeCostAlloy: 750000,  maxHours: 12, alloyPerHr: 3100, stonePerHr: 5.0, pilotShardEveryHrs: 3.0 },
      { lv: 10, upgradeCostAlloy: 1100000, maxHours: 12, alloyPerHr: 3500, stonePerHr: 6.0, pilotShardEveryHrs: 2.5 }
    ],
    SHORT_EXPEDITIONS: [
      { id: "EXP_1H", durationHrs: 1, alloy: 2500, upgradeStone: 0, rerollStone: 0, perkShards: 0,  affinityPts: 2 },
      { id: "EXP_2H", durationHrs: 2, alloy: 4500, upgradeStone: 5, rerollStone: 0, perkShards: 0,  affinityPts: 4 },
      { id: "EXP_4H", durationHrs: 4, alloy: 8000, upgradeStone: 0, rerollStone: 1, perkShards: 10, affinityPts: 8 }
    ]
  },

  // =========================================================================
  // 5. CỐT TRUYỆN 9 CHƯƠNG & ĐỘ THÂN THIẾT PHI CÔNG (PILOT AFFINITY)
  // =========================================================================
  STORY_AND_AFFINITY: {
    AFFINITY_GAIN: {
      MANUAL_STAGE_CLEAR: 2,
      SWEEP_STAGE: 1,
      EXPEDITION_4H: 8
    },
    AFFINITY_MILESTONES: [
      { level: 1, reqPts: 50,   title: "Đồng Hành",         rewardAlloy: 5000,  buff: { atkBonus: 0.01 } },
      { level: 2, reqPts: 150,  title: "Tin Cậy",           rewardStone: 10,    buff: { shieldBonus: 0.015 } },
      { level: 3, reqPts: 350,  title: "Tâm Giao",          rewardShards: 5,    buff: { grazeRageBonus: 0.05 } },
      { level: 4, reqPts: 700,  title: "Vào Sinh Ra Tử",    rewardShards: 10,   buff: { atkBonus: 0.02, hpBonus: 0.02 } },
      { level: 5, reqPts: 1200, title: "Huyền Thoại Đôi Cánh", unlockAvatarFrame: true, buff: { rampageAddSec: 0.5 } }
    ],
    BOSS_DIALOGUES: {
      STAGE_20: [
        { speaker: "PILOT", text: "Tín hiệu nhận diện trên Chiến Hạm Tiền Tiêu đã bị ghi đè! Nó đang khóa pháo vào chính quân mình!" },
        { speaker: "BOSS",  text: "[GIAO THỨC HƯ KHÔNG KÍCH HOẠT] — Mọi sinh vật hữu cơ trong khu vực đều phải bị thanh trừng." },
        { speaker: "PILOT", text: "Chú ý vạch cảnh báo đỏ của pháo laze! Bắn hạ động cơ của nó để mở đường!" }
      ],
      STAGE_100: [
        { speaker: "PILOT", text: "Nhiệt độ đang tụt xuống âm 180 độ! Thứ chắn trước hầm hộp đen là một khối tinh thể sống!" },
        { speaker: "BOSS",  text: "Kẻ xâm nhập... Hãy hóa thành tượng băng vĩnh cửu cùng với bí mật của Omega đi!" },
        { speaker: "PILOT", text: "Đạn của nó tách mảnh 6 cạnh! Giữ khoảng cách và luồn qua khe hở 30 độ ở chính diện!" }
      ],
      STAGE_180: [
        { speaker: "BOSS",  text: "Hàng ngàn nền văn minh đã tan biến trong cơn xoáy của ta. Ngươi sao có thể nghịch chuyển vận mệnh?" },
        { speaker: "PILOT", text: "Chừng nào đôi cánh Sao Băng còn bay, bầu trời này sẽ không bao giờ thuộc về bóng tối!" },
        { speaker: "PILOT", text: "Kích hoạt tối đa Cộng Hưởng SSS! Đột phá qua cổng thoát của vòng đạn hủy diệt!" }
      ]
    }
  }
};
