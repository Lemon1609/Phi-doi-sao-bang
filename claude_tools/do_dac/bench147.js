const fs=require('fs');global.window=global;const f=process.argv[2];const LV=+process.argv[3]||5;
if(process.argv[4]==='on'){global.KN146API={hit(){},well(){},deflect(){},kill:()=>false};}
eval(fs.readFileSync(f,'utf8')+';global.GEAR_FX=GEAR_FX;');
const ids=['inferno','rail','cryo','disc','thunder','solar','singularity','gravity','spiral','ricochet','stellar','prism'];
const o={};
for(const id of ids){const r={};for(const n of [1,6]){let tot=0;for(const seed of [91873,1234,777]){const s=GEAR_FX.create(id,{seed,targets:GEAR_FX.fixture(n),player:{x:240,y:558,hp:9000,maxHp:10000},enhance:5,demo:true,numbers:false,light:true});s.lv146=LV;for(let i=0;i<60*30;i++)GEAR_FX.update(s,1/30,'normal');tot+=s.metrics.damage;}r[n]=Math.round(tot/3/60);}o[id]=r;}
console.log(JSON.stringify(o));
