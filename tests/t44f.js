const {chromium,devices}=require('playwright');
const seed=()=>{if(sessionStorage.getItem('seeded'))return;sessionStorage.setItem('seeded','1');const stars={};for(let i=1;i<=60;i++)stars[i]=3;
 localStorage.setItem('saobang-campaign-v36',JSON.stringify({version:36,tutorial:true,crafts:[0,1,2,3,4,5,6,7,8,9],models:['aegis','mirror','inferno','cryo','rail','disc'],claims:[],endlessBest:12,stars,sweep:{day:'2026-10-18',used:0}}));
 localStorage.setItem('saobang-hangar-v1',JSON.stringify({version:2,catalogVersion:36,cleared:Array.from({length:60},(_,i)=>i+1),credits:5000,items:[
  {id:'a1',kind:'armor',rarity:'legendary',level:10,variant:'aegis',enhance:2},{id:'a2',kind:'armor',rarity:'legendary',level:8,variant:'mirror',enhance:1},
  {id:'m1',kind:'missiles',rarity:'legendary',level:10,variant:'inferno',enhance:1},{id:'m2',kind:'missiles',rarity:'legendary',level:6,variant:'cryo',enhance:3},
  {id:'s1',kind:'sidearm',rarity:'legendary',level:10,variant:'rail',enhance:2},{id:'s2',kind:'sidearm',rarity:'legendary',level:6,variant:'disc',enhance:2}],
  equipped:{armor:'a1',missiles:'m1',sidearm:'s1'},totalKills:900,bosses:12}));
 localStorage.setItem('saobang-workshop-v1',JSON.stringify({version:1,crafts:Array(10).fill(''),craftEnhancements:Array(10).fill(3),craftLevels:Array(10).fill(60),craftFragments:Array(10).fill(5),fusionProgress:{},gearFragments:{},exp:100,aux:0}));
 localStorage.setItem('saobang-meta-v40',JSON.stringify({daily:{last:99999}}));};
(async()=>{const b=await chromium.launch();const mob=process.argv[2]!=='desk';const ctx=await b.newContext(mob?{...devices['iPhone 13']}:{viewport:{width:1366,height:900}});await ctx.addInitScript(seed);const p=await ctx.newPage();p.errs=[];p.on('pageerror',e=>p.errs.push(e.message));p.on('dialog',d=>d.accept());
await p.goto('file://'+require('path').resolve(__dirname,process.env.GAME||'../Phi_Doi_Sao_Bang_V44.html')+'?nopop');await p.waitForTimeout(3000);
// trước hợp thể: bắn thường bằng GEAR_FX trong kho chiến cơ
console.log('runtime0',JSON.stringify(await p.evaluate(()=>Gear44.runtime())));
await p.screenshot({path:'T_hangar0.png'});
await p.click('#hgr41 [data-g44]');await p.waitForTimeout(600);await p.screenshot({path:'T_ws_armor.png'});
console.log('can',JSON.stringify(await p.evaluate(()=>['sss_aegis_mirror','sss_inferno_cryo','sss_rail_disc','sss_mirror_orbital'].map(id=>[id,Gear44.canFuse(id)]))));
await p.click('#g44 [data-g="fuse"]');await p.waitForTimeout(1300);await p.screenshot({path:'T_rite.png'});await p.waitForTimeout(2900);
await p.click('#g44 [data-g="equip"]');await p.waitForTimeout(300);await p.screenshot({path:'T_ws_after.png'});
await p.evaluate(()=>{Gear44.fuse('sss_inferno_cryo');Gear44.equipSSS('missiles','sss_inferno_cryo');Gear44.fuse('sss_rail_disc');Gear44.equipSSS('sidearm','sss_rail_disc');});
await p.waitForTimeout(4200);await p.evaluate(()=>Gear44.close());await p.waitForTimeout(1500);
console.log('state',JSON.stringify(await p.evaluate(()=>({S:Gear44.state(),act:['armor','missiles','sidearm'].map(Gear44.activeId),mult:['missiles','sidearm'].map(Gear44.dmgMult),run:Gear44.runtime()}))));
await p.screenshot({path:'T_hangar1.png'});
await p.click('[data-cc-open]');await p.waitForTimeout(1200);await p.screenshot({path:'T_lobby.png'});
await p.click('#ccht-lobby-root [data-cc="back"]');await p.waitForTimeout(800);if(await p.$('#g-go'))await p.click('#g-go').catch(()=>{});await p.waitForTimeout(1500);
await p.evaluate(()=>{window.__god=setInterval(()=>{if(mode==='play'){hp=maxHp;}},16);});
await p.waitForTimeout(5000);await p.screenshot({path:'T_play1.png'});
const d1=await p.evaluate(()=>({mode,run:Gear44.runtime(),en:enemies.filter(e=>!e.dead).length,score}));console.log('play',JSON.stringify(d1));
await p.evaluate(()=>Equipment25.barrage());await p.waitForTimeout(900);await p.screenshot({path:'T_skill.png'});
await p.evaluate(()=>activateSuper());await p.waitForTimeout(1200);await p.screenshot({path:'T_ult.png'});await p.waitForTimeout(2600);await p.screenshot({path:'T_super.png'});
console.log('after',JSON.stringify(await p.evaluate(()=>({run:Gear44.runtime(),err:Safety31.stats(),score}))),p.errs);
await b.close();})();
