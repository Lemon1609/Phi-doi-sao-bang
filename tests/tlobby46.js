const seed=()=>{if(sessionStorage.getItem('seeded'))return;sessionStorage.setItem('seeded','1');const stars={};for(let i=1;i<=60;i++)stars[i]=3;
 localStorage.setItem('saobang-campaign-v36',JSON.stringify({version:36,tutorial:true,crafts:[0,1,2,3,4,5,6,7,8,9],models:['aegis','mirror','inferno','cryo','rail','disc'],claims:[],endlessBest:12,stars,sweep:{day:'2026-10-18',used:0}}));
 localStorage.setItem('saobang-hangar-v1',JSON.stringify({version:2,catalogVersion:36,cleared:Array.from({length:60},(_,i)=>i+1),credits:5000,items:[
  {id:'a1',kind:'armor',rarity:'legendary',level:10,variant:'aegis',enhance:2},{id:'a2',kind:'armor',rarity:'legendary',level:8,variant:'mirror',enhance:1},
  {id:'m1',kind:'missiles',rarity:'legendary',level:10,variant:'inferno',enhance:1},{id:'m2',kind:'missiles',rarity:'legendary',level:6,variant:'cryo',enhance:3},
  {id:'s1',kind:'sidearm',rarity:'legendary',level:10,variant:'rail',enhance:2},{id:'s2',kind:'sidearm',rarity:'legendary',level:6,variant:'disc',enhance:2}],
  equipped:{armor:'a1',missiles:'m1',sidearm:'s1'},totalKills:900,bosses:12}));
 localStorage.setItem('saobang-workshop-v1',JSON.stringify({version:1,crafts:Array(10).fill(''),craftEnhancements:Array(10).fill(3),craftLevels:Array(10).fill(60),craftFragments:Array(10).fill(5),fusionProgress:{},gearFragments:{},exp:100,aux:0}));
 localStorage.setItem('saobang-meta-v40',JSON.stringify({daily:{last:99999}}));};

const {chromium,devices}=require('playwright');
(async()=>{const b=await chromium.launch();
for(const [w,h] of [[390,844],[360,780]]){const ctx=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:2,isMobile:true,hasTouch:true});await ctx.addInitScript(seed);const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///home/claude/V44_kit/'+(process.env.GAME||'Phi_Doi_Sao_Bang_V46.html')+'?nopop');await p.waitForTimeout(3000);
await p.evaluate(()=>{for(const [k,id] of [['armor','sss_aegis_mirror'],['missiles','sss_inferno_cryo'],['sidearm','sss_rail_disc']]){Gear44.fuse(id);Gear44.equipSSS(k,id);}document.querySelectorAll('#g44 .g44-rite').forEach(c=>c.hidden=true);});await p.waitForTimeout(4500);
await p.evaluate(()=>CCHT_LOBBY_API.open());await p.waitForTimeout(1500);await p.screenshot({path:`shots/${process.env.TAG||'v46'}/lobby_${w}_a.png`});
const acc1=await p.evaluate(()=>getComputedStyle(document.getElementById('ccht-lobby-root')).getPropertyValue('--cc-accent'));
await p.evaluate(()=>CCHT_LOBBY_API.switchSet(1));await p.waitForTimeout(1200);await p.screenshot({path:`shots/${process.env.TAG||'v46'}/lobby_${w}_b.png`});
const acc2=await p.evaluate(()=>getComputedStyle(document.getElementById('ccht-lobby-root')).getPropertyValue('--cc-accent'));
const ov=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
const pills=await p.evaluate(()=>[...document.querySelectorAll('#ccht-lobby-root .upgrade-pill')].map(e=>e.textContent));
console.log(w,acc1,acc2,'tran ngang',ov,pills,errs);await ctx.close();}
await b.close();})();
