import sys, os, json
from playwright.sync_api import sync_playwright
H=sys.argv[1]; SID=int(sys.argv[2]); TIER=sys.argv[3] if len(sys.argv)>3 else 'tim'
sys.argv=['x',H]
_src=open('tests/v203_v212/t209.py').read().split("with sync_playwright() as p:")[0]; exec(_src)
CLEAN="()=>{document.getElementById('tutorial392')?.remove();window.RULE84=false;window.TITLE84=false;try{Ch9.open=()=>true}catch{};document.querySelectorAll('.m63,.adv70,.st71').forEach(e=>e.hidden=true)}"
E={'thuong':(0,0,0),'luc':(1,0,0),'lam':(3,0,0),'tim':(5,0,0),'tim5':(5,1,0),'ss':(5,1,1)}[TIER]
PATCH="""(a)=>{const SID=%d;const [e,mx,ss]=a;const o=V70.ve.bind(V70);V70.ve=(k,i)=>k==='c'&&i===SID?e:o(k,i);const m=V70.isMax.bind(V70);V70.isMax=i=>i===SID?!!mx:m(i);
  const g=Workshop.craftGrade.bind(Workshop);Workshop.craftGrade=i=>i===SID&&ss?'SS':(i===SID?'S':g(i));}"""%SID
with sync_playwright() as p:
    br=p.chromium.launch(); pg,errs,_o=setup(br,'SS'); pg.wait_for_timeout(1500)
    pg.reload(); pg.wait_for_timeout(4500); pg.evaluate(CLEAN); pg.evaluate(PATCH,list(E))
    pg.evaluate("()=>{const SID=%d;Progress.setLocked(false);selectCraft(SID);launchCraft=SID;document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='40';Lobby.hide();reset();if(mode==='pause')mode='play';window.__iv=setInterval(()=>{hp=maxHp;shield=0;try{player.y=760;player.x=240}catch{}},20)}"%SID)
    pg.wait_for_timeout(5000)
    pg.evaluate("()=>{window.__seen={};window.__si=setInterval(()=>{for(const s of shots){if(s.gearKind||s.ally||s.escort40||s.gearItem)continue;const k=[s.type,s.art28,!!s.ray28,s.r|0].join('|');window.__seen[k]=(window.__seen[k]||0)+1;}},30)}")
    pg.wait_for_timeout(3000)
    r=pg.evaluate("""()=>{const o=window.__seen;
      let tier='';try{tier=ART118S.form(%d,V70.ve('c',%d)).__f}catch(e){tier=''+e}
      return {o,tier,mode,nshots:shots.length,launch:launchCraft,keys:Object.keys(shots[0]||{}).join(',')}}"""%(SID,SID))
    print(json.dumps(r,ensure_ascii=False,indent=1)); print('loi',errs[:3]); br.close()
