const {chromium,open}=require('./harness');
(async()=>{const b=await chromium.launch();const out={};
for(const [nm,f] of [['V43',require('path').resolve(__dirname,'../Phi_Doi_Sao_Bang_V44.html')],['V44',require('path').resolve(__dirname,'../Phi_Doi_Sao_Bang_V44.html')]]){const res=[];
for(const lvl of [8,20]){const p=await open(b,f,{mobile:false});await p.evaluate(l=>{Math.random=(()=>{let s=12345;return()=>{s=(s*16807)%2147483647;return s/2147483647;}})();document.getElementById('mission-select').value=String(l);Lobby.hide();reset();window.__k=0;const ok=kill;kill=function(e){if(!e.dead)window.__k++;return ok.apply(this,arguments);};window.__god=setInterval(()=>{if(mode==='play'){hp=maxHp;}},16);},lvl);
await p.waitForTimeout(25000);res.push(await p.evaluate(()=>({mode,score,kills:window.__k,boss:boss?Math.round(boss.hp):null})));await p.context().close();}
out[nm]=res;}console.log(JSON.stringify(out));await b.close();})();
