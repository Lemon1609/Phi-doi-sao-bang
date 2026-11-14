# V80 · cốt truyện: thoại mở chương dừng trận · chạm tiếp/bỏ qua · chỉ 1 lần · boss ải 20 tên + đe dọa · hạ boss lần đầu: mảnh phi công + thoại kết · nhật ký
import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];R={};O='/tmp/claude-0/-home-claude/5e17076b-711a-5cdd-a148-8fee187c2778/scratchpad/'
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':393,'height':852});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3500);pg.add_init_script("if(!sessionStorage.getItem('t80')){sessionStorage.setItem('t80','1');const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:19},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));}");pg.reload();pg.wait_for_timeout(4000);pg.add_style_tag(content='#g74{display:none!important}');pg.evaluate("()=>{document.getElementById('tutorial392')?.remove()}")
    pg.evaluate("()=>{document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='1';Lobby.hide();document.getElementById('start').click()}")
    pg.wait_for_timeout(1700)
    R['open']=pg.evaluate("()=>({vis:!document.getElementById('st80')?.hidden,who:document.querySelector('#st80 b')?.textContent,paused:!!window.__st80,t:stageTime})")
    pg.screenshot(path=O+'st80.png')
    pg.wait_for_timeout(1000);R['frozen']=pg.evaluate("()=>stageTime")
    pg.click('#st80');pg.wait_for_timeout(200);pg.click('#st80');pg.wait_for_timeout(300);R['line2']=pg.evaluate("()=>document.querySelector('#st80 b')?.textContent")
    pg.click('#st80 .st80s');pg.wait_for_timeout(500);R['closed']=pg.evaluate("()=>({hid:document.getElementById('st80').hidden,paused:!!window.__st80})")
    pg.wait_for_timeout(800);R['runs']=pg.evaluate("()=>stageTime")
    # chỉ 1 lần: chơi lại ải 1
    pg.evaluate("()=>{invuln=1e9;try{end(false)}catch{}}");pg.wait_for_timeout(800);pg.evaluate("()=>{const b=document.getElementById('lobby-back');b&&b.click()}");pg.wait_for_timeout(1200)
    pg.evaluate("()=>{document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='1';Lobby.hide();document.getElementById('start').click()}");pg.wait_for_timeout(1800)
    R['again']=pg.evaluate("()=>!document.getElementById('st80')?.hidden")
    # boss ải 20: mở khóa bằng Progress tạm, đặt ải 20
    pg.evaluate("()=>{invuln=1e9;try{end(false)}catch{}}");pg.wait_for_timeout(800);pg.evaluate("()=>{const b=document.getElementById('lobby-back');b&&b.click()}");pg.wait_for_timeout(1000)
    pg.evaluate("()=>{document.getElementById('gamemode').value='campaign';Campaign36.renderCampaign();document.getElementById('mission-select').value='20';Lobby.hide();document.getElementById('start').click();}")
    pg.wait_for_timeout(1500);pg.evaluate("()=>{invuln=1e9;for(const e of enemies)e.dead=true;try{startBoss()}catch(e){window.__e=String(e)}}");pg.wait_for_timeout(700)
    R['boss']=pg.evaluate("()=>({lv:level,name:document.getElementById('bossname')?.textContent,banner:document.getElementById('obj79')?.textContent,e:window.__e||''})")
    p0=pg.evaluate("()=>JSON.stringify(Pilot67.state().pc||Pilot67.state().pieces||Pilot67.state())")
    pg.evaluate("()=>{boss=null;try{finishStage36(false)}catch(e){window.__e2=String(e)}}");pg.wait_for_timeout(500)
    R['dbg']=pg.evaluate("()=>({b:!!boss,hp:boss&&boss.hp,max:boss&&boss.maxHp,keys:boss?Object.keys(boss).slice(0,40):null,st80:!!window.__st80,en:enemies.length})")
    pg.wait_for_timeout(3500)
    R['end']=pg.evaluate("()=>({mode,st:!document.getElementById('st80')?.hidden,who:document.querySelector('#st80 b')?.textContent,seen:Story80.state()})")
    R['shards']=pg.evaluate("()=>JSON.stringify(Pilot67.state().pc||Pilot67.state().pieces||Pilot67.state())")!=p0
    pg.evaluate("()=>{document.getElementById('st80').hidden=true;window.__st80=false;Story80.journal()}");pg.wait_for_timeout(500)
    R['journal']=pg.evaluate("()=>[...document.querySelectorAll('#jr80 .jr80r:not(.lk)')].map(b=>b.dataset.jr)")
    pg.screenshot(path=O+'jr80.png')
    R['errs']=errs;b.close()
print(json.dumps(R,ensure_ascii=False))
o=R['open'];ok=[('Thoại mở chương 1',o['vis'] and o['paused']),('Trận dừng khi thoại',abs(R['frozen']-o['t'])<0.05),('Chạm sang câu sau',bool(R['line2'])),('Bỏ qua → trận chạy tiếp',R['closed']['hid'] and not R['closed']['paused'] and R['runs']>R['frozen']),
 ('Chỉ hiện 1 lần',not R['again']),('Boss ải 20 tên + đe dọa','U Hồn' in (R['boss']['name'] or '') and 'mồi nhử' in (R['boss']['banner'] or '')),('Thoại kết chương 1',R['end']['seen'].get('ch1_end')==1),('Mảnh phi công',R['shards']),('Nhật ký',len(R['journal'])>=2),('không lỗi JS',not R['errs'])]
print('KẾT QUẢ',' · '.join(('✓ ' if v else '✗ ')+k for k,v in ok))
