# (tắt thiên thạch / ngọc Gói B trong bài này để đo riêng phần của bài)
# V2.2.3 · RIG23: (1) thân tàu (lớp ảnh đậm nhất mỗi khung) không bao giờ mờ < 0,35 / không mất khung khi bất tử nhấp nháy + kích hoạt Bạo Tẩu
#  (2) cánh năng lượng không đè 2 tàu con (điểm ảnh cánh α>60 trong khung tàu con 40×40 ≤ 3 %) · (3) không lỗi trang
import sys
src=open('claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
HTML=sys.argv[1];sys.argv=['x',HTML,'160'];exec(src)
t209=open('tests/v203_v212/t209.py').read();exec(t209[t209.find('def start'):t209.find('with sync_playwright')])
ok=[];bad=[]
def chk(n,c,info=''):(ok if c else bad).append(n);print(('ĐẠT ' if c else 'TRƯỢT ')+n,str(info)[:400],flush=True)
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'SS');pg.evaluate("()=>{window.AST25=false;window.ORB25=false}");pg.add_style_tag(content='#q307{display:none!important}')
  res={}
  for sid in [3,0,5]:
    pg.evaluate("(i)=>{try{End78.goLobby()}catch{};V70.setTier('craft',i,9);selectCraft((i+1)%13);selectCraft(i)}",sid)
    start(pg,12);pg.evaluate("()=>{clearInterval(window.__hz);window.__nb=setInterval(()=>{bullets.length=0;for(const e of enemies)e.dead=true;try{hp=maxHp}catch{}},50);player.x=240;player.y=620}")
    pg.wait_for_timeout(800)
    pg.evaluate("""()=>{const S=window.__h23={fr:0,miss:0,minA:9,in:0,got:0,raf:0,on:1};const rf=()=>{if(!S.on)return;S.raf++;requestAnimationFrame(rf)};requestAnimationFrame(rf);const P=CanvasRenderingContext2D.prototype,di=P.drawImage;
      P.drawImage=function(im){if(S.in&&this.canvas.id==='game'){const w=im&&(im.naturalWidth||im.width)||0;if(w>=96){S.got++;S.fa=Math.max(S.fa||0,this.globalAlpha);}}return di.apply(this,arguments)};
      const od=SuperGame.drawShip;SuperGame.drawShip=function(){S.in++;const g0=S.got;if(S.in===1)S.fa=0;try{return od.apply(this,arguments)}finally{S.in--;if(!S.in){S.fr++;if(S.got===g0)S.miss++;else S.minA=Math.min(S.minA,S.fa);}}};window.__od23=od}""")
    pg.evaluate("()=>{invuln=1.6}");pg.wait_for_timeout(1700)
    pg.evaluate("()=>{try{activateSuper();superTime=8}catch(e){}}");pg.wait_for_timeout(1300)
    h=pg.evaluate("()=>{SuperGame.drawShip=window.__od23;window.__h23.on=0;return window.__h23}")
    w=pg.evaluate("""()=>{const L=Rig23.last;if(!L||!L.size)return {err:'no last'};const c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');g.translate(player.x,player.y);
      Evo21.drawWing(g,selected,L.size,true,(typeof time==='number'?time:performance.now()/1000));const d=g.getImageData(0,0,W,H).data;const P=Battle28.support();let tot=0,hit=0;
      for(const q of P)for(let y=Math.round(q.y-20);y<q.y+20;y++)for(let x=Math.round(q.x-20);x<q.x+20;x++){if(x<0||y<0||x>=W||y>=H)continue;tot++;if(d[(y*W+x)*4+3]>60)hit++;}
      return {size:L.size,pods:P.map(q=>[Math.round(q.x-player.x),Math.round(q.y-player.y)]),pct:+(hit/Math.max(1,tot)*100).toFixed(2)}}""")
    res[sid]=(h,w)
    chk(f'Tàu {sid+1}: thân luôn được vẽ mọi khung (bất tử nhấp nháy + bung Bạo Tẩu), α ≥ 0,35',h['fr']>=8 and h['miss']==0 and h['minA']>=.35 and h['fr']>=h['raf']*.85,h)
    chk(f'Tàu {sid+1}: cánh Bạo Tẩu không đè tàu con (≤ 3 % điểm ảnh khung tàu con)','pct' in w and w['pct']<=3,w)
  chk('Không lỗi trang',not errs,errs[:4]);br.close()
print('KẾT QUẢ %d/%d'%(len(ok),len(ok)+len(bad)))
