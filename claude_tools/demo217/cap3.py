import sys
from playwright.sync_api import sync_playwright
mode=sys.argv[1]
with sync_playwright() as p:
    br=p.chromium.launch(args=['--allow-file-access-from-files'])
    pg=br.new_page(viewport={'width':900,'height':880});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file:///home/claude/work/demo217/demo3.html');pg.wait_for_function('window.ready===true',timeout=20000)
    if mode=='still':
        for t in (2.2,3.37):
            pg.evaluate('t=>draw(t)',t);pg.screenshot(path=f'still3_{t}.png')
    else:
        import os;os.makedirs('fr3',exist_ok=True)
        for i in range(int(6.6*25)):
            pg.evaluate('t=>draw(t)',i/25);pg.screenshot(path=f'fr3/{i:04d}.png')
    print('errs',errs);br.close()
