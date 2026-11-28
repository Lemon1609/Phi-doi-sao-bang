# V2.4-B · chụp ảnh cho bảng T33: python3 tests/chup_v24b.py <html tuyệt đối> <thư mục ra>
import sys,os
HTML=sys.argv[1];OUT=sys.argv[2];os.makedirs(OUT,exist_ok=True)
src=open('/home/claude/phi-doi-sao-bang/tests/t_v24b.py').read()
pre=src[:src.index('# ---------- 1)')]
body=src[src.index('# ---------- trận'):src.index('    # ---------- 2) âm thanh')]
sys.argv=['x',HTML]
exec(pre.replace("HTML = sys.argv[1]; CHUP = os.environ.get('CHUP', '')","HTML=sys.argv[1];CHUP='"+OUT+"'")+body.replace("device_scale_factor=2 if CHUP else 1","device_scale_factor=2")+'''
    def clean():pg.evaluate("()=>{try{enemies.length=0;bullets.length=0;if(typeof drops!=='undefined')drops.length=0}catch{}}")
    def lvl_of(ch):return pg.evaluate("(c)=>{for(let x=1;x<=200;x++){if(Campaign36.chapter(x)===c)return x+5}return 1}",ch)
    for nm,ch in (('lava',1),('ice',4)):
      enter(lvl_of(ch));pg.evaluate("()=>{window.__go24u=2}");pg.wait_for_timeout(5200)
      for i in range(3):
        clean();pg.wait_for_timeout(250)
      print(nm,pg.evaluate("()=>PKC26S.state()"))
      pg.screenshot(path=OUT+'/nen_%s.png'%nm)
      pg.evaluate("()=>{try{superTime=0;activateSuper()}catch{}}");pg.wait_for_timeout(900);clean();pg.wait_for_timeout(150);pg.screenshot(path=OUT+'/nen_%s_bt.png'%nm)
      pg.evaluate("()=>{superTime=0}")
    enter(lvl_of(1));pg.wait_for_timeout(4000);clean()
    for u in (.2,.45,.62,.8):
      pg.evaluate("(u)=>{window.__go24u=u}",u);pg.wait_for_timeout(120);pg.screenshot(path=OUT+'/go_%02d.png'%int(u*100))
    pg.evaluate("()=>{window.__go24u=2;SND24S.showMt('start')}");pg.wait_for_timeout(600);pg.screenshot(path=OUT+'/mt_start.png')
    pg.evaluate("()=>{SND24S.showMt('boss')}");pg.wait_for_timeout(600);pg.screenshot(path=OUT+'/mt_boss.png')
    br.close()
''')
