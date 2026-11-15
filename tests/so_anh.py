# Lưu ý: không đặt tên biến toàn cục b / f / ci / SEED / LV / BUILD (setup() của t193 dùng chung).
# V305 · So ảnh tự động: chụp 13 chiến cơ (bậc Tím+, đạn thường + Bạo Tẩu) bằng ĐỒNG HỒ ẢO + Math.random cố định
# → mỗi lần chạy ra đúng cùng khung hình; so với ảnh chuẩn đã duyệt để báo khi cánh / đạn / thân bị lệch ngoài ý muốn.
#   Lập ảnh chuẩn (sau khi chủ dự án duyệt):  python3 tests/so_anh.py chuan <html tuyệt đối>
#   So với ảnh chuẩn:                         python3 tests/so_anh.py so <html tuyệt đối> [thư mục ra]
#   Chỉ vài tàu: TAU=0,3,7 (0-based).  Ngưỡng: NGUONG=1.5 (% điểm ảnh lệch rõ).
import sys, os, json
import numpy as np
from PIL import Image, ImageDraw
from playwright.sync_api import sync_playwright
CHE, H = sys.argv[1], sys.argv[2]
CHUAN = 'tests/anh_chuan'; O = CHUAN if CHE == 'chuan' else (sys.argv[3] if len(sys.argv) > 3 else '/tmp/so_anh')
os.makedirs(O, exist_ok=True)
TAU = sorted(int(x) for x in os.environ.get('TAU', ','.join(map(str, range(13)))).split(','))
NGUONG = float(os.environ.get('NGUONG', '6'))        # % điểm ảnh lệch rõ trên toàn khung (đạn chính lệch pha bắn ~2–3 %)
NGUONG_THAN = float(os.environ.get('NGUONG_THAN', '1'))   # % trong vùng thân + cánh quanh chiến cơ (tất định)
VUNG = {'thuong': (76, 330, 236, 520), 'bt': (6, 250, 306, 560)}   # (x0,y0,x1,y1) trong ảnh 313×600, tàu đứng ở (156,422)
_src = open('tests/v203_v212/t209.py').read().split("with sync_playwright() as p:")[0]
_argv = sys.argv; sys.argv = [_argv[0], H]; exec(_src); sys.argv = _argv
CLEAN = "()=>{document.getElementById('tutorial392')?.remove();window.RULE84=false;window.TITLE84=false;try{Ch9.open=()=>true}catch{};document.querySelectorAll('.m63,.adv70,.st71').forEach(e=>e.hidden=true)}"
# mulberry32 (cách của Claude-Code-Game-Studios, MIT): số nguyên 32 bit, không mất chính xác như LCG nhân số thực
MB32 = "let __s=20261115;Math.random=function(){__s=(__s+0x6D2B79F5)|0;let t=Math.imul(__s^(__s>>>15),__s|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};"
RNG = "()=>{" + MB32 + "}"   # gieo lại đúng lúc vào trận
PATCH = """(SID)=>{const o=V70.ve.bind(V70);V70.ve=(k,i)=>k==='c'&&i===SID?5:o(k,i);const m=V70.isMax.bind(V70);V70.isMax=i=>i===SID?true:m(i);
  const g=Workshop.craftGrade.bind(Workshop);Workshop.craftGrade=i=>i===SID?'S':g(i);}"""
GO = """(SID)=>{Progress.setLocked(false);selectCraft(SID);launchCraft=SID;document.getElementById('gamemode').value='campaign';
  document.getElementById('mission-select').value='12';Lobby.hide();reset();if(mode==='pause')mode='play';
  setInterval(()=>{hp=maxHp;shield=0;try{player.y=760;player.x=240}catch{};try{bullets.length=0;enemies.length=0}catch{};try{for(let i=shots.length-1;i>=0;i--)if(shots[i].gearItem||shots[i].gearKind)shots.splice(i,1);for(const st of GearVK304.ST)for(const q of st.pool)q.on=false;}catch{}},16);}"""   # bỏ địch + đạn trang bị (phụ thuộc mục tiêu, không tất định) → chỉ soi chiến cơ
CLIP = {'x': 40, 'y': 200, 'width': 313, 'height': 600}

def chup(p, sid):
    br = p.chromium.launch(); pg, errs, _o = setup(br, 'SS'); pg.wait_for_timeout(1500)
    T0 = 1893456000                                  # giây
    pg.add_init_script('(()=>{' + MB32 + '})()')   # ngẫu nhiên cố định từ lúc trang bắt đầu tải
    pg.clock.install(time=T0); pg.clock.pause_at(T0 + 1)   # dừng đồng hồ TRƯỚC khi tải lại: cả lúc khởi động game cũng tất định
    pg.reload(); pg.wait_for_timeout(3000)           # thời gian thật chỉ để nạp ảnh; đồng hồ game đứng yên
    pg.clock.run_for(4500)
    pg.evaluate(CLEAN); pg.evaluate(PATCH, sid)
    pg.evaluate(RNG); pg.evaluate(GO, sid)
    pg.clock.run_for(3000); s1 = pg.screenshot(clip=CLIP)
    pg.evaluate("()=>activateSuper()"); pg.clock.run_for(1200); s2 = pg.screenshot(clip=CLIP)
    br.close(); return s1, s2, errs

def lech(p1, p2, vung):
    a = np.asarray(Image.open(p1).convert('RGB')).astype(np.int16); c = np.asarray(Image.open(p2).convert('RGB')).astype(np.int16)
    if a.shape != c.shape: return 100.0, 100.0, None
    d = np.abs(a - c).max(2) > 40; x0, y0, x1, y1 = vung
    return float(d.mean() * 100), float(d[y0:y1, x0:x1].mean() * 100), d

kq = {}
with sync_playwright() as p:
    errs = []
    for sid in TAU:
        anh1, anh2, loi = chup(p, sid); errs += loi
        for ten, png in (('thuong', anh1), ('bt', anh2)):
            fp = f'{O}/tau{sid + 1:02d}_{ten}.png'; open(fp, 'wb').write(png)
            if CHE == 'so':
                c = f'{CHUAN}/tau{sid + 1:02d}_{ten}.png'
                if not os.path.exists(c): kq[fp] = 'chưa có ảnh chuẩn'; continue
                pct, than, d = lech(c, fp, VUNG[ten]); kq[fp] = (round(pct, 2), round(than, 2))
                if (pct > NGUONG or than > NGUONG_THAN) and d is not None:   # ảnh đối chiếu: chuẩn | mới | chỗ lệch (đỏ)
                    A, B = Image.open(c).convert('RGB'), Image.open(fp).convert('RGB'); M = B.copy(); m = Image.fromarray((d * 255).astype(np.uint8))
                    M.paste((255, 40, 40), mask=m); W = A.width; X = Image.new('RGB', (W * 3 + 20, A.height), (0, 0, 0))
                    X.paste(A, (0, 0)); X.paste(B, (W + 10, 0)); X.paste(M, (2 * W + 20, 0)); X.save(fp[:-4] + '_LECH.jpg', quality=85)
        print(f'tàu {sid + 1}', *(f'{k.split("/")[-1]}: {v}' for k, v in kq.items() if f'tau{sid + 1:02d}_' in k), flush=True)
if CHE == 'chuan':
    json.dump({'ghi_chu': 'ảnh chuẩn so_anh.py (bậc Tím+, màn 12, đồng hồ ảo 3,0 s + Bạo Tẩu 1,2 s)'}, open(f'{CHUAN}/thong_tin.json', 'w'), ensure_ascii=False)
    print('đã lập ảnh chuẩn:', len(TAU) * 2, 'ảnh trong', CHUAN)
else:
    hong = {k: v for k, v in kq.items() if not isinstance(v, tuple) or v[0] > NGUONG or v[1] > NGUONG_THAN}
    print(f"KẾT QUẢ: {'ĐẠT' if not hong else f'LỆCH {len(hong)} ảnh'} · ngưỡng toàn khung {NGUONG} % · vùng thân {NGUONG_THAN} % (số in: toàn khung, vùng thân)")
    for k, v in hong.items(): print('  ', k, v)
    if errs: print('lỗi trang:', errs[:3])
