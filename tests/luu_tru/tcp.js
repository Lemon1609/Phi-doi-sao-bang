// So lực chiến + chỉ số Kho/Sảnh trước và sau khi lắp trang bị SSS
const {chromium,devices}=require('playwright');const path=require('path');
const seed=()=>{if(sessionStorage.getItem('seeded'))return;sessionStorage.setItem('seeded','1');const stars={};for(let i=1;i<=60;i++)stars[i]=3;
 localStorage.setItem('saobang-campaign-v36',JSON.stringify({version:36,tutorial:true,crafts:[0,1,2,3,4,5,6,7,8,9],models:['aegis','mirror','inferno','cryo','rail','disc'],claims:[],endlessBest:12,stars,sweep:{day:'2026-10-18',used:0}}));
 localStorage.setItem('saobang-hangar-v1',JSON.stringify({version:2,catalogVersion:36,cleared:Array.from({length:60},(_,i)=>i+1),credits:5000,items:[
  {id:'a1',kind:'armor',rarity:'legendary',level:10,variant:'aegis',enhance:2},{id:'a2',kind:'armor',rarity:'legendary',level:8,variant:'mirror',enhance:1},
  {id:'m1',kind:'missiles',rarity:'legendary',level:10,variant:'inferno',enhance:1},{id:'m2',kind:'missiles',rarity:'legendary',level:6,variant:'cryo',enhance:3},
  {id:'s1',kind:'sidearm',rarity:'legendary',level:10,variant:'rail',enhance:2},{id:'s2',kind:'sidearm',rarity:'legendary',level:6,variant:'disc',enhance:2}],
  equipped:{armor:'a1',missiles:'m1',sidearm:'s1'},totalKills:900,bosses:12}));
 localStorage.setItem('saobang-workshop-v1',JSON.stringify({version:1,crafts:Array(10).fill(''),craftEnhancements:Array(10).fill(3),craftLevels:Array(10).fill(60),craftFragments:Array(10).fill(5),fusionProgress:{},gearFragments:{},exp:100,aux:0}));
 localStorage.setItem('saobang-meta-v40',JSON.stringify({daily:{last:99999}}));};
(async()=>{const b=await chromium.launch();const out={};
for(const f of process.argv.slice(2)){const ctx=await b.newContext({...devices['iPhone 13']});await ctx.addInitScript(seed);const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+path.resolve(f)+'?nopop');await p.waitForTimeout(3000);
 const read=()=>p.evaluate(()=>{Hangar41.paint(true);const t=id=>(document.getElementById(id)||{}).textContent;const bars=[...document.querySelectorAll('#hgr41 .h1-stats b')].map(e=>e.textContent);const g=Progress.stats();return {gHp:+g.hp.toFixed(2),gShield:+g.maxShield.toFixed(2),maxHp,cp:Combat.stats().cp,kho:bars,slotE:[1,2,3].map(n=>t('h1-e'+n)),slotR:[1,2,3].map(n=>t('h1-r'+n))};});
 const before=await read();
 await p.evaluate(()=>{for(const [k,id] of [['armor','sss_aegis_mirror'],['missiles','sss_inferno_cryo'],['sidearm','sss_rail_disc']]){Gear44.fuse(id);Gear44.equipSSS(k,id);}});await p.waitForTimeout(4500);
 await p.evaluate(()=>{document.querySelectorAll('#g44 .g44-rite').forEach(c=>c.hidden=true);});
 const after=await read();
 await p.evaluate(()=>CCHT_LOBBY_API.open());await p.waitForTimeout(1200);
 const lobby=await p.evaluate(()=>({cp:document.getElementById('ui-total-power').textContent,bars:['fighter','armor','missile','wingman'].map(k=>document.getElementById('stat-val-'+k).textContent),pills:[...document.querySelectorAll('#ccht-lobby-root .upgrade-pill')].map(e=>e.textContent)}));
 await p.evaluate(()=>CCHT_LOBBY_API.close());await p.waitForTimeout(500);
 await p.evaluate(()=>{document.getElementById('mission-select').value='8';Lobby.hide();reset();});await p.waitForTimeout(1500);const inplay=await p.evaluate(()=>({mode,hp,maxHp,shield:typeof shield!=='undefined'?shield:null,gShield:gear.maxShield,armorSSS:gear.armorSSS||1}));await p.screenshot({path:'shots/'+path.basename(f,'.html')+'_kho.png'});
 out[path.basename(f)]={before,after,lobby,inplay,errs};await ctx.close();}
console.log(JSON.stringify(out,null,1));await b.close();})();
