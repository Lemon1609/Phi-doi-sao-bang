# cặp sửa áp cho cả src và HTML (các mô-đun mà build đã rep nên không thay nguyên khối được)
P={
'l9b309.js':[("function gearIm(kind){try{","function gearIm(kind){try{{const e=window.Evo21&&Evo21.hangarImg?Evo21.hangarImg(kind):null;if(e)return e.im;}/* V2.1 Đợt 3b: ảnh 4 bậc / SSS 3 mốc */")],
'a10309.js':[
 ("podWing(g,px,py,S*.24,burst>.5,pc);g.drawImage(pim,px-iw*s/2,py-ih*s/2,iw*s,ih*s);}}",
  "podWing(g,px,py,S*.24,burst>.5,pc);g.drawImage(pim,px-iw*s/2,py-ih*s/2,iw*s,ih*s);if(window.EvoLED)try{const e=window.Evo21&&Evo21.hangarImg('sidearm');if(e)EvoLED.pod(g,px,py,S*.24,e.I,burst>.5,null);}catch{}}}"),
 ("true);else{g.globalCompositeOperation='lighter';g.fillStyle='rgba(251,146,60,.55)';g.beginPath();g.ellipse(0,14,4,12,0,0,Math.PI*2);g.fill();}g.globalCompositeOperation='source-over';\n       if(mim){const iw=mim.naturalWidth||mim.width,ih=mim.naturalHeight||mim.height,L=30,w=L*iw/ih;g.drawImage(mim,-w/2,-L/2,w,L);}",
  "true);else{g.globalCompositeOperation='lighter';g.fillStyle='rgba(251,146,60,.55)';g.beginPath();g.ellipse(0,14,4,12,0,0,Math.PI*2);g.fill();}g.globalCompositeOperation='source-over';\n       if(mim){const iw=mim.naturalWidth||mim.width,ih=mim.naturalHeight||mim.height,L=30,w=L*iw/ih;g.drawImage(mim,-w/2,-L/2,w,L);if(window.EvoLED)try{const e=window.Evo21&&Evo21.hangarImg('missiles');if(e)EvoLED.mis(g,w,L,e.I,false);}catch{}}"),
 ("if(o.th17&&window.TH17API)",
  "if(window.EvoLED&&o.wing!==false&&Number.isInteger(o.id))try{EvoLED.stageShip(g,o.id,x,y,S,t,burst);}catch{}/* V2.1 EVO21_LED trên bệ Kho */\n       if(o.th17&&window.TH17API)")],
'gear45.js':[
 ("function pic(d,size,row=0){const u=GEAR44_ASSETS[",
  "function pic(d,size,row=0){{const e=d&&/^sss_/.test(d.id||'')&&window.Evo21&&Evo21.sssIcon?Evo21.sssIcon(d.id):null;if(e)return `<img class=\"g44-ico e21i\" style=\"width:${size}px;height:${size}px;object-fit:contain\" alt=\"\" src=\"${e}\">`;}/* V2.1 Đợt 3b: icon SSS theo mốc +0/+3/+10 */const u=GEAR44_ASSETS["),
 ("<div class=\"g44-art\">${pic(d,96,0)}${pic(d,96,1)}</div>",
  "${(()=>{const e=window.Evo21&&Evo21.sssIcon&&Evo21.sssIcon(d.id,0);if(!e)return `<div class=\"g44-art\">${pic(d,96,0)}${pic(d,96,1)}</div>`;const ct=Evo21.sssT(d.id);return `<div class=\"g44-art e21a\"><canvas class=\"e21pv\" data-id=\"${d.id}\" data-c=\"${d.color}\"></canvas><div class=\"e21t\">${[0,1,2].map(t=>`<span class=\"${t===ct?'on':''}\"><img alt=\"\" src=\"${Evo21.sssIcon(d.id,t)}\"><b>${['+0','+3','+10'][t]}</b></span>`).join('')}</div></div>`;})()}")],
}
import sys
def apply(text,f,strict=True):
    for a,b in P[f]:
        n=text.count(a)
        if n!=1: raise SystemExit('%s: %d lần · %s'%(f,n,a[:70]))
        text=text.replace(a,b)
    return text
if __name__=='__main__':
    mode=sys.argv[1]
    if mode=='src':
        for f in sys.argv[2:]:
            p='/home/claude/nguon/src/'+f;t=apply(open(p).read(),f);open(p,'w').write(t);print('src',f)
    else:
        h=open(sys.argv[2],encoding='utf-8').read()
        for f in P:h=apply(h,f)
        open(sys.argv[3],'w',encoding='utf-8').write(h);print('html ok')
