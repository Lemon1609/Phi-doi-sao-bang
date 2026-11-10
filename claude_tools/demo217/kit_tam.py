# Xuất bộ mảnh tạm ra thư mục (mặc định /home/claude/work/kit_tam) để dựng thử: BTFX218_DIR=<thư mục> python3 build74_mau.py
import sys,os,base64
from playwright.sync_api import sync_playwright
out=sys.argv[1] if len(sys.argv)>1 else '/home/claude/work/kit_tam';os.makedirs(out,exist_ok=True)
here=os.path.dirname(os.path.abspath(__file__))
with sync_playwright() as p:
    br=p.chromium.launch();pg=br.new_page(viewport={'width':1300,'height':900});pg.goto('file://'+here+'/kit_tam.html');pg.wait_for_function('window.ready===true')
    for k,v in pg.evaluate('()=>window.KIT').items():open(os.path.join(out,k+'.png'),'wb').write(base64.b64decode(v.split(',',1)[1]))
    pg.screenshot(path=os.path.join(out,'_xem.png'));br.close()
print(sorted(os.listdir(out)))
