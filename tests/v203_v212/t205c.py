# Đo tỷ trọng sát thương trang bị (Gemini V204 mục 6): 3 cấu hình trang bị × ải S
import sys,os,json,statistics
HTML=sys.argv[1];ST=int(sys.argv[2]);CFG=sys.argv[3]  # tim5 | sss0 | sss10
src=open('claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
sys.argv=['x',HTML,str(ST)];exec(src)
b['gf']='P+5';b['gl']=max(b['gl'],100)
CLS="""(a,s)=>{if(s==='bomb')return 'bom';if(s&&typeof s==='object'){if(s.gearKind)return 'trang_bi';if(s.wing87||s.ally||s.type==='drone'||s.escort40)return 'canh';return 'chinh';}
 if(s==='gear'||s==='sss'||s==='burn07'||s==='thunder07'||s==='awaken07'||s==='gungnir'||s==='bastion'||s==='pair'||s==='evo'||s==='set77')return 'trang_bi';return 'ky_nang';}"""
SSS="""(cfg)=>{const out={};Progress.setLocked(false);V70.add('sss_core',5000);Progress.grantCredits(5e8);
 const defs=Gear44.defs();for(const kind of ['missiles','sidearm','armor']){const d=defs.find(x=>x.kind===kind);if(!d)continue;
  for(const v of d.parents){let it=Progress.getState().items.filter(x=>x.variant===v).slice(-1)[0];if(!it){Campaign36.acquire('gear',v,'','story');it=Progress.getState().items.filter(x=>x.variant===v).slice(-1)[0];}V70.setTier('gear',it.id,FR['P+5']);for(let k=0;k<200;k++){const g=Progress.v70.get(it.id);if(!g||g.level>=100)break;if(Progress.upgrade(it.id)===false)break;}}
  for(const stp of d.steps||[]){for(const k in (stp.mats||{}))V70.add(k,9999);}const f=Gear44.fuse(d.id);for(let i=0;i<4;i++)Gear44.upgrade(d.id);out[kind]=d.id;out[kind+'_lv']=[f,Gear44.lvOf(d.id)];}
 return out;}"""
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'S' if ST<=100 else 'SS')
  KK=json.loads(os.environ.get('K205','{}'));pg.evaluate("(k)=>{window.K205X=k;if(window.__noA!==1){}try{if(!window.__keepA){BAL205X.C.rank={'':1,S:1,SS:1};BAL205X.C.boss=[[1,1],[200,1]];}}catch{}}",KK)
  info={'cp0':o.get('cp')}
  if CFG!='tim5':
    ids=pg.evaluate(SSS,FR) if False else pg.evaluate(SSS.replace("FR['P+5']",str(FR['P+5'])),CFG)
    pg.wait_for_timeout(4000);info['fuse']=ids
    r=pg.evaluate("""(a)=>{const [ids,cfg,ci]=a;const o={};for(const k of ['missiles','sidearm','armor']){if(!ids[k])continue;o[k]=Gear44.equipSSS(k,ids[k]);if(cfg==='sss10'){for(let i=0;i<10;i++)V70.sssUp('g:'+ids[k]);}}
      selectCraft(ci);launchCraft=ci;return {eq:o,act:['missiles','sidearm','armor'].map(k=>Gear44.activeId(k)),star:['missiles','sidearm','armor'].map(k=>V70.star('g:'+Gear44.activeId(k))),sssMult:V70.sssMult(),cp:Math.round(Combat.stats().cp)}}""",[ids,CFG,ci])
    info.update(r)
  else:
    info['cp']=pg.evaluate("()=>Math.round(Combat.stats().cp)")
  info['gear']=pg.evaluate("()=>{const e=Progress.v70.equipped();return Object.keys(e).map(k=>{const g=Progress.v70.get(e[k]);return k+':'+g.variant+' Lv'+g.level})}")
  print('cfg',ST,CFG,json.dumps(info,ensure_ascii=False),flush=True)
  rows=[]
  for k in range(3):
    pg.evaluate("()=>{window.__iv&&clearInterval(window.__iv);window.__iv=null}")
    pg.evaluate("""(a)=>{const [st,cls]=a;const CL=eval(cls);mode='menu';try{Lobby.show()}catch{};Progress.setLocked(false);try{V75.addEn(99)}catch{};document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value=String(st);Lobby.hide();reset();if(mode==='pause')mode='play';
      if(!window.__f190){window.__f190=1;const of=Combat.factor;Combat.factor=function(){return window.__nof190?1:of.apply(this,arguments)};}window.__nof190=1;
      if(!window.__db204){window.__db204=1;const od=damageBoss;const nb=function(a,s,part){try{if(window.__acc){const v=+a||0;const kk=CL(a,s);window.__acc[kk]=(window.__acc[kk]||0)+v;const sk=typeof s==='string'?s:(s&&s.gearKind)?'obj:'+s.gearKind:(s&&s.wing87)?'obj:wing':'obj';window.__src[sk]=(window.__src[sk]||0)+v;}}catch{}return od.apply(this,arguments)};window.damageBoss=nb;try{damageBoss=nb}catch{}}
      window.__iv=setInterval(()=>{try{invuln=999;hp=maxHp;superTime=0;power=5;powerUpgrades=4;if(mode==='play'){if(boss&&!boss.dead){const w=(boss.parts||[]).filter(p=>!p.dead&&p.hp>0);const tx=w.length?w.reduce((a,b)=>Math.abs(b.x-player.x)<Math.abs(a.x-player.x)?a:b).x:boss.x;player.x+=(tx-player.x)*.3;player.y=Math.min(H-80,boss.y+330);}for(const e of enemies)if(!e.boss&&!e.bossPart)e.dead=true;}}catch{}},50)}""",[int(os.environ.get('FIGHT',ST)),CLS])
    for _ in range(600):
      if pg.evaluate("()=>!!(boss&&boss.bossHealthReady&&boss.y>80&&boss.entered76)"):break
      pg.wait_for_timeout(250)
    pg.evaluate("()=>{const B=boss;if(B){const m=1e3;B.max*=m;B.hp=B.max;if(B.coreMax){B.coreMax*=m;B.coreHp=B.coreMax;}for(const p of (B.parts||[])){if(p.max){p.max*=m;p.hp=p.max;}}}window.__acc={};window.__src={};window.__t=time;window.__hp0=(boss.coreHp||0)+(boss.parts||[]).reduce((n,p)=>n+(p.dead?0:Math.max(0,p.hp||0)),0)}")
    pg.wait_for_timeout(int(os.environ.get('WIN','30'))*1000)
    r=pg.evaluate("()=>({sec:+((time-window.__t)||1).toFixed(1),acc:window.__acc,src:window.__src,hpLoss:window.__hp0-((boss.coreHp||0)+(boss.parts||[]).reduce((n,p)=>n+(p.dead?0:Math.max(0,p.hp||0)),0))})");print('HPLOSS/s',round(r['hpLoss']/r['sec'],1),'ACC/s',round(sum(r['acc'].values())/r['sec'],1),flush=True)
    d=r['sec'];rows.append({'sec':d,'hp':round(r['hpLoss']/d,1),**{k:round(v/d,1) for k,v in r['acc'].items()},'src':{k:round(v/d,1) for k,v in sorted(r['src'].items(),key=lambda x:-x[1])[:12]}})
  med=lambda k:round(statistics.median([x.get(k,0) for x in rows]),1)
  res={'stage':ST,'cfg':CFG,'ship':b['ship'],'hp_mat':med('hp'),'info':info,'chinh':med('chinh'),'canh':med('canh'),'trang_bi':med('trang_bi'),'ky_nang':med('ky_nang'),'bom':med('bom'),'lan':rows}
  tot=res['chinh']+res['canh']+res['trang_bi']+res['ky_nang']+res['bom'];res['tong']=round(tot,1);res['ty_trong_trang_bi']=round(100*res['trang_bi']/tot,1) if tot else 0
  print(json.dumps({k:v for k,v in res.items() if k!='lan'},ensure_ascii=False),flush=True);print('SRC',json.dumps(rows[-1]['src'],ensure_ascii=False))
  print('ERRS',errs[:3]);br.close()
  os.makedirs('/tmp/claude-0/s205',exist_ok=True);json.dump(res,open('/tmp/claude-0/s205/%s_%d_%s_ship%d.json'%(os.environ.get('TAG','x'),ST,CFG,b['ship']),'w'),ensure_ascii=False,indent=1)
