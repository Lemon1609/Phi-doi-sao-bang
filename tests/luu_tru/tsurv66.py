import sys,json,time as T
from playwright.sync_api import sync_playwright
import os;seed=open('tests/seed_all.js').read()+("\nlocalStorage.setItem('saobang-assist-v48','"+os.environ['ASSIST']+"');" if os.environ.get('ASSIST') else '')+("\nwindow.__natural=true;" if os.environ.get('NATURAL') else '');bot=open('tests/bot.js').read()
files=sys.argv[2].split(',');levels=[int(x) for x in sys.argv[1].split(',')];reps=int(sys.argv[3]) if len(sys.argv)>3 else 1;par=int(sys.argv[4]) if len(sys.argv)>4 else 4
PICK="()=>{setInterval(()=>{if(mode!=='play'||typeof Gate66==='undefined')return;const g=Gate66.gates();if(g.length===2&&g[0].y>H*.25){const low=(hp+shield)<.6*(maxHp+maxShield);const pr=low?['NOVA_SHIELD','FOCUS_BEAM','RICOCHET']:['FOCUS_BEAM','RICOCHET','BERSERK','NOVA_SHIELD'];let i=0;for(const k of pr){const j=g.findIndex(x=>x.k===k);if(j>=0){i=j;break;}}Gate66._take(i);}},200)}"
jobs=[(f,l,r) for f in files for l in levels for r in range(reps)];out=[]
with sync_playwright() as p:
    b=p.chromium.launch()
    for k in range(0,len(jobs),par):
        batch=[];
        for f,l,r in jobs[k:k+par]:
            c=b.new_context(viewport={'width':390,'height':844});c.add_init_script(seed);pg=c.new_page();pg.goto('file:///home/claude/V44_kit/'+f+'?nopop');batch.append([f,l,r,c,pg,None])
        T.sleep(3)
        for x in batch:
            x[4].evaluate("l=>{document.getElementById('tutorial392')?.remove();document.getElementById('mission-select').value=String(l);Lobby.hide();reset();}",x[1]);x[4].evaluate(bot)
            if 'V66' in x[0]:x[4].evaluate(PICK)
        t0=T.time()
        while T.time()-t0<int(sys.argv[5]) if len(sys.argv)>5 else 200:
            T.sleep(4);alive=0
            for x in batch:
                if x[5]:continue
                s=x[4].evaluate("()=>BOT.state()")
                if s['mode'] not in('play','pause'):x[5]=s
                else:alive+=1
            if not alive:break
        for x in batch:
            s=x[5] or dict(x[4].evaluate("()=>BOT.state()"),timeout=True);out.append({'file':x[0],'level':x[1],'rep':x[2],**s});x[3].close()
        print('batch',k//par+1,'/',-(-len(jobs)//par),flush=True)
    b.close()
json.dump(out,open(sys.argv[6] if len(sys.argv)>6 else 'surv.json','w'),ensure_ascii=False,indent=1)
for o in out:print(o['file'][-7:-5],o['level'],o['mode'],o.get('timeout',''),o['stageTime'],'hp',o['hp'],'/',o['maxHp'],'min',o['minHp'],'bom',o.get('bombUsed'),'hits',o['hits'],'dmg',o['dmg'],'roi',{k:v for k,v in o['spawn'].items() if k!='star'},'nhat',{k:v for k,v in o['pick'].items() if k!='star'})
