# chụp 13 giáp: khiên + vỡ khiên
import sys,os
H,O=sys.argv[1],sys.argv[2];os.makedirs(O,exist_ok=True)
exec(open('/home/claude/sc/chup_tran307.py').read().split("\nwith sync_playwright() as p:\n")[0])
SET="(o)=>{for(const it of gear.equipment){if(o[it.kind]){it.variant=o[it.kind];it.id='t309-'+o[it.kind];try{delete it.spec}catch{}}}try{syncLoadout&&syncLoadout(true)}catch{}}"
L=sys.argv[3].split(',') if len(sys.argv)>3 else ['aegis','mirror','orbital','phase','reactive','nanite','aurora36','void36','seraph36','aegis9','devour10_a','chrono11_a','monarch12_a']
with sync_playwright() as p:
    br=p.chromium.launch();pg,errs,_o=setup(br,'SS');pg.wait_for_timeout(1500)
    for a in L:
        go(pg,62);pg.wait_for_timeout(2500)
        try:pg.evaluate(SET,{'armor':a})
        except Exception as e:print('set',e)
        pg.evaluate("()=>{invuln=0;bulletShieldTime=6;shield=Math.max(shield||0,50)}");pg.wait_for_timeout(1200)
        bb=pg.evaluate("()=>{const c=document.getElementById('game');const r=c.getBoundingClientRect();return [r.left+player.x/W*r.width,r.top+player.y/H*r.height]}");CL={'x':max(0,bb[0]-150),'y':max(0,bb[1]-260),'width':300,'height':340}
        pg.screenshot(path=f'{O}/{a}_khien.png',clip=CL)
        pg.evaluate("()=>{bulletShieldTime=0;shield=0;}");pg.wait_for_timeout(140)
        pg.screenshot(path=f'{O}/{a}_vo.png',clip=CL);print('ok',a,flush=True)
    print('loi',errs[:5]);br.close()
