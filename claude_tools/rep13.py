# Lượt 13 · sửa chữ trên bản đã dựng (cùng nội dung các dòng rep thêm vào build74_mau.py)
import sys
R=[("hồi ${(.3+r*.15).toFixed(2)} giáp đã mất","bật khiên chặn 1 đòn",1),
   ("hồi ${(.5+r*.2).toFixed(1)} giáp đã mất","bật khiên chặn 1 đòn",1),
   ("'hồi 1 giáp, miễn sát thương 1,3s","'bật khiên, miễn sát thương 1,3s",1),
   ("'hồi 1 máu, 1 giáp và xóa đạn gần'","'hồi 1 máu, bật khiên và xóa đạn gần'",1),
   ("phản công tối đa 5 đạn, hồi 1 giáp'","phản công tối đa 5 đạn, bật khiên'",1),
   ("Tự hồi 1 giáp mỗi 14 giây","Tự bật khiên mỗi 14 giây",1),
   ("làm chậm và hồi giáp để trụ lâu","làm chậm và bật khiên để trụ lâu",1),
   ("Bạo Tẩu lâu hơn, hồi giáp, chí mạng","Bạo Tẩu lâu hơn, khiên định kỳ, chí mạng",1)]
h=open(sys.argv[1],encoding='utf-8').read()
for a,b,n in R:
    c=h.count(a); assert c==n,(a,c); h=h.replace(a,b)
open(sys.argv[2],'w',encoding='utf-8').write(h);print('ok')
