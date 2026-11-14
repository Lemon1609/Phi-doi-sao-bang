import sys,json,os
from playwright.sync_api import sync_playwright
f=sys.argv[1];R={};O='/tmp/claude-0/t75c/';os.makedirs(O,exist_ok=True)
CL="()=>{document.getElementById('tutorial392')?.remove();document.querySelectorAll('.adv70,.st71,.u72').forEach(e=>e.hidden=true)}"
SETS=[('judgement36','rail',5,3),('inferno','ricochet',5,3),('nova36','disc',3,3)]
with sync_playwright() as p:
  errs=[]
  for mi,dr,em,ed in SETS:
    b=p.chromium.launch()
    c=b.new_context(viewport={'width':412,'height':1012},device_scale_factor=2);pg=c.new_page();pg.on('pageerror',lambda e:errs.append(str(e)));pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3000)
    pg.add_style_tag(content='#g74{display:none!important}')
    pg.evaluate("()=>{Gfx66.open()}");pg.fill('#st66-code','SAOBANG-ADMIN-2026');pg.click('[data-adm]');pg.click('[data-adm]');pg.wait_for_timeout(8000);pg.evaluate(CL)
    R[mi]=pg.evaluate("""([mi,dr,em,ed])=>{try{Gear44.equipSSS('missiles',null);Gear44.equipSSS('sidearm',null);}catch{}const out=[];for(const [v,e] of [[mi,em],[dr,ed]]){const it=Progress.grantChestGear(v);out.push(!!it&&Progress.equip(it.id));Progress.v70.set(it.id,{level:100,enhance:e});}try{V70.sync()}catch{};
       document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='100';Lobby.hide();reset();return out}""",[mi,dr,em,ed])
    pg.wait_for_timeout(2500)
    R[mi].append(pg.evaluate("()=>[mode,gear.equipment.map(i=>i.variant+'+'+(typeof V70EF==='function'?V70EF(i):i.enhance)),Gear44.activeId('missiles'),Gear44.activeId('sidearm')]"))
    pg.evaluate("()=>{for(const e of enemies)e.y=-999;player.y-=140;window.FXQ=0}");pg.wait_for_timeout(200)
    R[mi].append(pg.evaluate("""()=>{const cv=document.createElement('canvas');cv.width=560;cv.height=300;cv.id='dbg';Object.assign(cv.style,{position:'fixed',left:0,top:0,zIndex:99999,background:'#123'});document.body.appendChild(cv);const g=cv.getContext('2d');let x=10;const out=[];
      for(const i of gear.equipment){if(i.kind==='armor')continue;let im=null,src='';const st=Gear44.fxState&&Gear44.fxState(i.kind);
        if(st&&st.assets){im=st.assets[i.variant+'_pod_normal'];src='fx';}else if(window._pod36){im=window._pod36(i);src='36';}
        const base=GEAR44_ASSETS[i.variant+'_pod_normal'];out.push([i.variant,src,!!im,im&&(im.naturalWidth||im.width),im&&(im.naturalHeight||im.height)]);
        if(im){const w=i.kind==='missiles'?180:240,h=i.kind==='missiles'?252:240;g.drawImage(im,x,10,w*.9,h*.9);x+=w;}
        const bi=new Image();bi.src=base;}
      out.push(cv.toDataURL());return out}"""))
    import base64;open(O+mi+'.png','wb').write(base64.b64decode(R[mi][-1].pop().split(',')[1]));b.close()
  R['keys']=0;R['errs']=errs
print(json.dumps(R,ensure_ascii=False))
