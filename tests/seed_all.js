(()=>{if(sessionStorage.getItem('seeded'))return;sessionStorage.setItem('seeded','1');const stars={};for(let i=1;i<=159;i++)stars[i]=3;
 localStorage.setItem('saobang-campaign-v36',JSON.stringify({version:36,tutorial:true,crafts:[0,1,2,3,4,5,6,7,8,9],models:['aegis','mirror','inferno','cryo','rail','disc'],claims:[],endlessBest:12,stars,sweep:{day:'2026-10-18',used:0}}));
 localStorage.setItem('saobang-hangar-v1',JSON.stringify({version:2,catalogVersion:36,cleared:Array.from({length:159},(_,i)=>i+1),credits:5000,items:[
  {id:'a1',kind:'armor',rarity:'legendary',level:10,variant:'aegis',enhance:2},{id:'a2',kind:'armor',rarity:'legendary',level:8,variant:'mirror',enhance:1},
  {id:'m1',kind:'missiles',rarity:'legendary',level:10,variant:'inferno',enhance:1},{id:'m2',kind:'missiles',rarity:'legendary',level:6,variant:'cryo',enhance:3},
  {id:'s1',kind:'sidearm',rarity:'legendary',level:10,variant:'rail',enhance:2},{id:'s2',kind:'sidearm',rarity:'legendary',level:6,variant:'disc',enhance:2}],
  equipped:{armor:'a1',missiles:'m1',sidearm:'s1'},totalKills:900,bosses:12}));
 localStorage.setItem('saobang-workshop-v1',JSON.stringify({version:1,crafts:Array(10).fill(''),craftEnhancements:Array(10).fill(3),craftLevels:Array(10).fill(60),craftFragments:Array(10).fill(5),fusionProgress:{},gearFragments:{},exp:100,aux:0}));
 localStorage.setItem('saobang-meta-v40',JSON.stringify({daily:{last:99999}}));})()