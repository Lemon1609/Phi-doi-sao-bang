# V309 Lượt 4 · cắt tranh GPT: 26 icon trang bị thường, 21 icon SSS (+ tàu con SSS trong trận), 7 chiến thần hợp thể (chiến cơ / mặt trước / mặt lưng)
#  Tách nền: flood-fill từ mép (R,G,B < 18), thân đục, viền ≤ 3 px mềm (giữ quầng neon); mỗi hình gom các mảnh theo tâm vào ô lưới.
import os, json
import numpy as np
from PIL import Image
from scipy import ndimage

S = 'src/ship118_cho/'


def tach(a):
    L = a.max(2).astype(int)
    lab, n = ndimage.label(L < 18)
    edge = set(np.unique(np.r_[lab[0], lab[-1], lab[:, 0], lab[:, -1]])) - {0}
    bg = np.isin(lab, list(edge))
    dist = ndimage.distance_transform_edt(~bg)
    al = np.where(bg, 0.0, 1.0)
    band = (~bg) & (dist <= 3) & (L < 70)
    al[band] = np.clip((L[band] - 12) / 58, 0.08, 1)
    rgb = a.astype(float)
    rgb[band] = np.clip(rgb[band] / al[band][:, None], 0, 255)
    return np.dstack([rgb, al * 255]).astype('uint8'), ~bg


def cells(path, nr, nc, want, DIL=2):
    a = np.asarray(Image.open(path).convert('RGB'))
    img, fg = tach(a)
    lab, k = ndimage.label(ndimage.binary_dilation(fg, iterations=DIL) if DIL else fg)
    ch, cw = a.shape[0] / nr, a.shape[1] / nc
    groups = {}
    for i, sl in enumerate(ndimage.find_objects(lab), 1):
        m = lab[sl] == i
        if m.sum() < 200:
            continue
        ys, xs = np.where(m)
        cy, cx = ys.mean() + sl[0].start, xs.mean() + sl[1].start
        groups.setdefault(int(cy // ch) * nc + int(cx // cw), []).append(sl)
    out = {}
    for c in want:
        sls = groups.get(c)
        r0, c0 = divmod(c, nc)
        if not sls or (DIL and (max(s[1].stop for s in sls) - min(s[1].start for s in sls)) > cw * 1.3):  # gộp nhầm sang ô bên cạnh → cắt thẳng theo ô
            y0, y1, x0, x1 = int(r0 * ch), int((r0 + 1) * ch), int(c0 * cw), int((c0 + 1) * cw)
            im = Image.fromarray(img[y0:y1, x0:x1], 'RGBA'); out[c] = im.crop(im.getbbox()); print('cat theo o', path[-30:], c); continue
        y0 = min(s[0].start for s in sls); y1 = max(s[0].stop for s in sls)
        x0 = min(s[1].start for s in sls); x1 = max(s[1].stop for s in sls)
        im = Image.fromarray(img[y0:y1, x0:x1], 'RGBA')
        out[c] = im.crop(im.getbbox())
    return out


def fit(im, n, pad=0.04):
    k = n * (1 - 2 * pad) / max(im.width, im.height)
    big = im.resize((max(1, round(im.width * k)), max(1, round(im.height * k))), Image.LANCZOS)
    o = Image.new('RGBA', (n, n), (0, 0, 0, 0))
    o.paste(big, ((n - big.width) // 2, (n - big.height) // 2), big)
    return o


A = ['aegis', 'mirror', 'orbital', 'phase', 'reactive', 'nanite', 'aurora36', 'void36', 'seraph36', 'aegis9', 'devour10_a', 'chrono11_a', 'monarch12_a']
M = ['inferno', 'cryo', 'thunder', 'singularity', 'spiral', 'stellar', 'comet36', 'nova36', 'judgement36', 'swarm9', 'devour10_m', 'chrono11_m', 'monarch12_m']
os.makedirs('src/icon309', exist_ok=True)
for L, f in [(A, 'V309_gpt_icons_armor_13_4x4.png'), (M, 'V309_gpt_icons_missile_13_4x4.png')]:
    C = cells(S + f, 4, 4, range(13))
    for i, v in enumerate(L):
        fit(C[i], 512).save('src/icon309/%s.png' % v)
# 21 SSS: ô 1–6 + ô 8 (0-based 0..5, 7)
SA = ['sss_aegis_mirror', 'sss_orbital_phase', 'sss_reactive_nanite', 'sss_aurora_void', 'sss_seraph_aegis9', 'sss_devour_chrono_a', 'sss_monarch_aegis']
SM = ['sss_inferno_cryo', 'sss_thunder_singularity', 'sss_spiral_stellar', 'sss_comet_nova', 'sss_judgement_swarm', 'sss_devour_chrono_m', 'sss_monarch_inferno']
SS = ['sss_rail_disc', 'sss_solar_gravity', 'sss_ricochet_prism', 'sss_lance_orbit', 'sss_halo_carrier', 'sss_devour_chrono_s', 'sss_monarch_rail']
os.makedirs('src/sss309', exist_ok=True)
os.makedirs('src/tb309img', exist_ok=True)
for L, f in [(SA, 'V309_gpt_sss_armor_3x3.png'), (SM, 'V309_gpt_sss_missile_3x3.png'), (SS, 'V309_gpt_sss_side_3x3.png')]:
    C = cells(S + f, 3, 3, [0, 1, 2, 3, 4, 5, 7], DIL=0)
    for i, c in enumerate([0, 1, 2, 3, 4, 5, 7]):
        fit(C[c], 512).save('src/sss309/%s.png' % L[i])
        if L is SS:  # tàu con SSS bay trong trận: tranh riêng, cạnh dài 192
            im = C[c]; k = 192 / max(im.width, im.height)
            im.resize((max(1, round(im.width * k)), max(1, round(im.height * k))), Image.LANCZOS).save('src/tb309img/pod_%s.webp' % L[i], quality=92)
# 7 chiến thần (chỉ số mẫu 0..6 giữ nguyên chỗ cũ; 1 = Thời Không Thôn Tinh, 3 = Hư Không Đế Vương)
O = 'src/hop4309/'
os.makedirs(O, exist_ok=True)
F = cells(S + 'V309_gpt_hop_fighter_3x3.png', 3, 3, [0, 2, 4, 5, 6])
TK = Image.open(S + 'V309_gpt_hop_fighter_thoikhong.png').convert('RGB')
tk, _ = tach(np.asarray(TK)); tk = Image.fromarray(tk, 'RGBA'); tk = tk.crop(tk.getbbox())
t13 = Image.open('src/ship309/tau13_ss.png').convert('RGBA'); t13 = t13.crop(t13.getbbox())
FR = cells(S + 'V309_gpt_robot_truoc_3x3.png', 3, 3, range(7))
BK = cells(S + 'V309_gpt_robot_lung_3x3.png', 3, 3, range(7))
NU = cells(S + 'V309_gpt_robot_lung_nu_2x2.png', 2, 2, [0, 1, 2])
# mẫu → (chiến cơ, mặt trước ô 89263, mặt lưng)
MAP = {0: (F[0], FR[3], NU[2]), 1: (tk, FR[5], BK[5]), 2: (F[2], FR[4], BK[4]), 3: (t13, FR[6], BK[6]),
       4: (F[4], FR[2], NU[1]), 5: (F[5], FR[0], BK[0]), 6: (F[6], FR[1], NU[0])}
info = {}
for i, (f, fr, bk) in MAP.items():
    fit(f, 512, .03).save(O + 'hop%d_tau.png' % (i + 1))
    fit(fr, 512, .02).save(O + 'hop%d_chandung.png' % (i + 1))
    bk.save(O + 'hop%d_bay.png' % (i + 1))
    for b in (2, 3):
        fit(f, 512, .03).save(O + 'f%d_b%d.png' % (i, b))
    info[i] = dict(tau=f.size, truoc=fr.size, lung=bk.size)
json.dump(info, open(O + 'log.json', 'w'), indent=1)
print(json.dumps(info))
