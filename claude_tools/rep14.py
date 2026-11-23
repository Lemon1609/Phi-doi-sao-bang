# Lượt 14 · nối Meta40 / Chests với L14309 (cùng nội dung khối rep "V309 Lượt 14" trong build74_mau.py)
import sys
R=[("function claimDaily(){const d=today(),ds=dailyState();if(ds.claimed)return false;",
    "function claimDaily(){const d=today(),ds=dailyState();if(ds.claimed)return false;if(window.Login14Hook&&Login14Hook.on()){if(!Login14Hook.claim())return false;S.daily={last:d,streak:ds.streak+1};save();return true;}/* V309 L14: đăng nhập tích lũy */"),
   ("function rewardsPanel(tab='daily'){const ds=dailyState();",
    "function rewardsPanel(tab='daily'){if(window.Login14Hook&&(tab==='ach'?Login14Hook.achOn():Login14Hook.on())){Login14Hook.panel(tab,{modal,closeM,claimDaily,again:rewardsPanel});return;}/* V309 L14 */const ds=dailyState();"),
   ("const achReady=()=>achRows().some(r=>r.can);",
    "const achReady=()=>(window.Login14Hook&&Login14Hook.achOn())?Login14Hook.achReady():achRows().some(r=>r.can);/* V309 L14 */"),
   ("return {init,render,setLocked,rewardBoss,open,openAll,dayKey,rollover,mergeRestoreState,getState:",
    "return {add14:c=>{rollover();state.crates.push(c);save();render();return c;}/* V309 L14: rương từ đăng nhập / nhiệm vụ / thành tựu, không tính trần ngày */,init,render,setLocked,rewardBoss,open,openAll,dayKey,rollover,mergeRestoreState,getState:")]
h=open(sys.argv[1],encoding='utf-8').read()
for a,b in R:
    c=h.count(a); assert c==1,(a[:60],c); h=h.replace(a,b)
open(sys.argv[2],'w',encoding='utf-8').write(h);print('ok rep14')
