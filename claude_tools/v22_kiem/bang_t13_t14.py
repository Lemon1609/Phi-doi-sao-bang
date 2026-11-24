# V2.2 · ghép bảng T13 (giao diện) + T14 (tổng hợp trận + số đo) từ ảnh chụp job_t13.json (390×844, --safe-top giả 34 px)
# python3 claude_tools/v22_kiem/bang_t13_t14.py <thư mục t13> <thư mục t13_tau1> <ra thư mục>
import sys,os
from PIL import Image,ImageDraw,ImageFont
A,B,O=sys.argv[1],sys.argv[2],sys.argv[3];os.makedirs(O,exist_ok=True)
FB='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';FR='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
f=lambda s,b=True:ImageFont.truetype(FB if b else FR,s)
W,H=390,844;CAP=34
def sheet(items,cols,title,sub,extra=None,extraH=0):
    rows=(len(items)+cols-1)//cols;pad=14;TH=96
    S=Image.new('RGB',(cols*(W+pad)+pad,TH+rows*(H+CAP+pad)+extraH+pad),'#070d1c');d=ImageDraw.Draw(S)
    d.text((pad,14),title,font=f(30),fill='#ffd23f');d.text((pad,56),sub,font=f(16,False),fill='#9fb6d6')
    for i,(p,lab) in enumerate(items):
        x=pad+(i%cols)*(W+pad);y=TH+(i//cols)*(H+CAP+pad)
        d.rectangle([x-1,y-1,x+W,y+CAP+H],outline='#1f3a66');d.text((x+8,y+7),lab,font=f(17),fill='#e6f0ff')
        S.paste(Image.open(p).convert('RGB').resize((W,H)),(x,y+CAP))
    if extra:extra(S,d,TH+rows*(H+CAP+pad))
    return S
P=lambda d,n:os.path.join(d,n+'.png')
t13=[(P(A,'a_sanh'),'1 · Sảnh (khung avatar, nền hangar)'),(P(A,'b_hoso'),'2 · Hồ sơ · Trang bị'),(P(A,'c_hoso_ct'),'3 · Hồ sơ · Chiến tích'),
     (P(A,'d_khung'),'4 · Trang phục & khung avatar'),(P(A,'e_khung_gh'),'5 · Khung giới hạn (Hàn Băng)'),(P(A,'f_kho_pc'),'6 · Kho · Phi công'),
     (P(A,'g_kho_vktt'),'7 · Kho · Vũ khí tối thượng'),(P(A,'h_vktt'),'8 · Màn VKTT'),(P(A,'i_tienbac'),'9 · Tiến bậc thành công (2 tầng)'),
     (P(A,'j_hopthoai'),'10 · Hộp thoại viền kép (Cài đặt)'),(P(A,'n_kq_thang'),'11 · Kết quả thắng · VỀ SẢNH / ẢI TIẾP'),(P(A,'o_kq_thua'),'12 · Kết quả thua · VỀ SẢNH / CHƠI LẠI')]
sheet(t13,6,'T13 · GIAO DIỆN V2.2.0 · 390×844 · vùng an toàn giả 34 px','Ảnh chụp bản dựng sạch build74_mau (24/11). Chỉ để duyệt thiết kế — chưa xuất bản.').save(os.path.join(O,'T13_giao_dien_V22.jpg'),quality=86)
t14=[(P(A,'k_tran_thuong'),'Tàu 10 · Thường (khe cánh 10 px)'),(P(A,'l_tran_baotau'),'Tàu 10 · Bạo Tẩu (khe 10 px, trần 100)'),
     (P(B,'k_tran_thuong'),'Tàu 1 · Thường'),(P(B,'l_tran_baotau'),'Tàu 1 · Bạo Tẩu'),(P(A,'m_tamdung'),'Tạm dừng')]
L=[('ĐO ĐƯỢC (Playwright, 24/11)',None),
 ('Hồi quy bản dựng sạch: t156 14/14 · t209 20/20 · t_v22 13/13 — cả EVO21 bật và tắt',''),
 ('VKTT (Vô tận 120 s, tổng sát thương thật qua trần ngân sách, đơn vị d0):',''),
 ('  Lưới Điện  cũ 0,122 · mới 0,670 (×5,5) → hệ số ×0,2 ⇒ ≈0,15 (tính từ lượt ×0,3 = 0,225)',''),
 ('  Pháo Đài   mới ×0,8 · cũ không chạy được trong job (tính ≈0,24 khi ném bom mỗi 20 s)',''),
 ('  Săn Sao    cũ 0,180 · mới ×0,9 = 0,198 (+10 %, cùng 2 lưỡi cưa)   ·   Đồng Hồ cũ 0,027 · mới 0,007 (giữ)',''),
 ('Khe mép cánh → mép phần đặc tàu con, 13 tàu: Thường 10–23 px · Bạo Tẩu 10–16 px (tàu 10 nhờ trần 100)',''),
 ('Trúng đòn mất máu không khiên: Lv4 → Lv3; đòn bị nội tại giáp chặn / có khiên / đang Bạo Tẩu: giữ cấp',''),
 ('CHỈ ĐỀ XUẤT / CHƯA ĐO',None),
 ('Hệ số VKTT đo trong Vô tận nhịp hạ địch cao (≈3,4/s); chiến dịch thường chậm hơn → Lưới Điện có thể hơi yếu hơn bản cũ.',''),
 ('Chưa đo FPS máy thật.','')]
def ex(S,d,y):
    x=14;d.rectangle([x,y,S.size[0]-14,y+len(L)*30+20],fill='#0c1a33',outline='#2a4e86')
    for i,(t,_) in enumerate(L):d.text((x+16,y+12+i*30),t,font=f(19 if _ is None else 17,_ is None),fill='#ffd23f' if _ is None else '#dbe7ff')
sheet(t14,5,'T14 · TỔNG HỢP V2.2.0 · trận + số đo','Đội hình tàu con theo mép cánh thật · P Bạo Tẩu · trúng đòn hạ cấp · cân bằng VKTT 5C',ex,len(L)*30+50).save(os.path.join(O,'T14_tong_hop_V22.jpg'),quality=86)
print('ok')
