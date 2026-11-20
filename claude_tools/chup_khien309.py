# chụp khiên 13 giáp không có đạn tàu, phóng to: bật / vỡ (60 ms) / hồi
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
        pg.evaluate("()=>{window.__iv2=setInterval(()=>{try{shots.length=0;bullets.length=0;invuln=0}catch{}},16);bulletShieldTime=6;}");pg.wait_for_timeout(900)
        bb=pg.evaluate("()=>{const c=document.getElementById('game');const r=c.getBoundingClientRect();return [r.left+player.x/W*r.width,r.top+player.y/H*r.height]}")
        CL={'x':max(0,bb[0]-80),'y':max(0,bb[1]-80),'width':160,'height':160}
        d=pg.evaluate("()=>{const it=gear.equipment.find(i=>i.kind==='armor');return [it.variant,bulletShieldTime.toFixed(1),shield,JSON.stringify(TB309.info(it.variant,'armor').pal)]}")
        pg.screenshot(path=f'{O}/{a}_1bat.png',clip=CL)
        pg.evaluate("()=>{bulletShieldTime=0;shield=0;}");pg.wait_for_timeout(90)
        pg.screenshot(path=f'{O}/{a}_2vo.png',clip=CL);pg.wait_for_timeout(500)
        pg.evaluate("()=>{bulletShieldTime=6}");pg.wait_for_timeout(120)
        pg.screenshot(path=f'{O}/{a}_3hoi.png',clip=CL);print(a,d,flush=True)
    print('loi',errs[:5]);br.close()
