import sys
exec(open('tests/v203_v212/t209.py').read().split("with sync_playwright() as p:")[0])
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'SS')
  print(pg.evaluate("()=>Object.keys(Progress.v70||{})"))
  r=pg.evaluate("()=>{const a=(Progress.v70.all?Progress.v70.all():Progress.v70.items?Progress.v70.items():[]);return a.filter(x=>x.kind==='armor').slice(0,40).map(x=>[x.id,x.variant])}")
  print(r[:40])
  ids=[x for x in r if x[1] in ('aegis','nanite','mirror','phase','void36','monarch12_a','aurora36','reactive')]
  if ids:
    pg.evaluate("(id)=>Hub40.openItem(id)",ids[0][0]);pg.wait_for_timeout(800)
    print(pg.evaluate("()=>{const e=document.querySelector('[data-item] .ev209');return e?e.innerText:null}"))
    pg.screenshot(path='/tmp/V209_mo_ta.png')
  # SSS
  pg.evaluate("()=>{Hub40.close&&Hub40.close();Gear44.open()}");pg.wait_for_timeout(800)
  pg.evaluate("()=>{const tabs=[...document.querySelectorAll('[data-tab],[data-k]')];const t=tabs.find(x=>/giáp/i.test(x.textContent));t&&t.click()}");pg.wait_for_timeout(500)
  pg.evaluate("()=>{const b=[...document.querySelectorAll('.g44-r[data-pick]')].find(x=>{const d=Gear44.defs().find(z=>z.id===x.dataset.pick);return d&&d.kind==='armor'});b&&b.click()}");pg.wait_for_timeout(700)
  print('SSS',pg.evaluate("()=>{const e=document.querySelector('#g44-det .ev209');return e?e.innerText:null}"))
  pg.screenshot(path='/tmp/V209_mo_ta_sss.png')
  print(errs[:3]);br.close()
