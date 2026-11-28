# V2.4-C · chụp ảnh cho bảng T34: python3 tests/chup_v24c.py <html tuyệt đối> <thư mục ra>
import sys,os
HTML=sys.argv[1];OUT=sys.argv[2];os.makedirs(OUT,exist_ok=True)
src=open('/home/claude/phi-doi-sao-bang/tests/t_v24c.py').read()
pre=src[:src.index('# ---------- 1)')]
body=src[src.index('# ---------- trận'):src.index('    # ---------- 2) Xung Kích')]
sys.argv=['x',HTML]
exec(pre.replace("HTML = sys.argv[1]; CHUP = os.environ.get('CHUP', '')","HTML=sys.argv[1];CHUP='"+OUT+"'")+body.replace("device_scale_factor=2 if CHUP else 1","device_scale_factor=2")+r'''
    S=lambda n:pg.screenshot(path=OUT+'/'+n+'.png')
    WAITBOSS="()=>new Promise(r=>{const t0=performance.now();const iv=setInterval(()=>{if((boss&&boss.y>=110)||performance.now()-t0>14000){clearInterval(iv);setTimeout(r,900)}},100)})"
    # 1) Dung Nham (ải 30): Xung Kích → vòng xoáy → boss → huy hiệu → rương
    pg.evaluate("()=>{try{for(let s=1;s<30;s++){if(!Progress.getState().cleared.includes(s))Progress.rewardStage(s)}}catch(e){window.__rs0=String(e)}}")  # mở khóa ải 1–29 để phần thưởng ải 30 hợp lệ (chỉ cho bài kiểm)
    enter(30);pg.evaluate("()=>{window.__go24u=2}");pg.wait_for_timeout(2000)
    pg.evaluate("()=>{enemies.length=0;bullets.length=0;PKB25S.apply('s',player.x,player.y);player.y=Math.min(player.y,H-260)}");pg.wait_for_timeout(700)
    pg.evaluate("()=>{for(let i=0;i<5;i++)enemies.push({x:player.x+(i-2)*22,y:player.y-30,hp:1,v:0,type:0,age:0,phase:0,fire:999,dead:false})}");pg.wait_for_timeout(160);S('a_blitz')
    pg.evaluate("()=>{for(let i=0;i<8;i++)Safety31.push(drops,100,{x:40+i*55,y:220+(i%3)*70,type:'star',t:0,vy:0});}")
    pg.evaluate("()=>new Promise(r=>{const iv=setInterval(()=>{if(!(window.__surgeS25>0)){clearInterval(iv);setTimeout(r,60)}},15)})");pg.evaluate("()=>{window.__vt24u=.45}");pg.wait_for_timeout(120);S('b_vortex');pg.evaluate("()=>{window.__vt24u=undefined}")
    pg.evaluate("()=>{try{startBoss()}catch{}}");pg.evaluate(WAITBOSS)
    pg.evaluate("()=>{beams.length=0;bullets.length=0;boss.dead=true;finishStage36(true)}");pg.wait_for_timeout(1600);S('e_crest')
    pg.evaluate("()=>new Promise(r=>{const t0=performance.now();const iv=setInterval(()=>{const l=document.querySelector('#overlay.rs-on #rs .rs-loot');if((l&&l.dataset.c24==='done')||performance.now()-t0>9000){clearInterval(iv);r()}},30)})")
    pg.wait_for_timeout(900);S('h_result')
    for ph,nm in (('shake','f_chest_shake'),('open','g_chest_open')):
      pg.evaluate("(ph)=>{window.__c24hold=ph;const l=document.querySelector('#overlay.rs-on #rs .rs-loot');if(!l)return;l.querySelectorAll('.c24box').forEach(b=>b.remove());l.classList.remove('c24in','c24h');delete l.dataset.c24}",ph);pg.wait_for_timeout(600);S(nm)
    pg.evaluate("()=>{window.__c24hold=undefined;try{End78.goLobby()}catch{}}");pg.wait_for_timeout(900)
    # 2) Hẻm Băng (ải boss chương 5): laser ⚠ + lõi trắng
    b5=pg.evaluate("()=>{for(let x=1;x<=200;x++){if(Campaign36.chapter(x)===4)return x+9}return 90}")
    enter(b5);pg.evaluate("()=>{window.__go24u=2;try{startBoss()}catch{}}");pg.evaluate(WAITBOSS)
    pg.evaluate("()=>{beams.length=0;Safety31.push(beams,24,{x:150,y:0,width:44,age:.7,warn:1.2,duration:.9});const bb=beams[beams.length-1];clearInterval(window.__bf);window.__bf=setInterval(()=>{bb.age=.7},5);for(let i=0;i<16;i++)bullets.push({x:60+i*24,y:360+(i%4)*46,vx:0,vy:14,r:6,color:'#ff4466'})}");pg.wait_for_timeout(150);S('c_laser_warn')
    pg.evaluate("()=>{clearInterval(window.__bf);beams.length=0;Safety31.push(beams,24,{x:300,y:0,width:44,age:1.3,warn:1.2,duration:1.5});const bb=beams[beams.length-1];window.__bf=setInterval(()=>{bb.age=1.3},5)}");pg.wait_for_timeout(150);S('d_laser_fire')
    pg.evaluate("()=>{clearInterval(window.__bf);beams.length=0;try{End78.goLobby()}catch{}}");pg.wait_for_timeout(900)
    # 3) Vô tận: thẻ mục tiêu
    enter(12);pg.evaluate("()=>{window.__go24u=2;gameMode='endless';boss=null}");pg.wait_for_timeout(900);S('i_target')
    pg.evaluate("()=>{const e=document.querySelector('#game-field .tg307 b');score=(parseInt((e&&e.textContent||'0').replace(/\D/g,''))||1000)+5}");pg.wait_for_timeout(260);S('j_target_pass')
    br.close()
''')
