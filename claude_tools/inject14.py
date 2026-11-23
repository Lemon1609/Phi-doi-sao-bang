import sys
h=open(sys.argv[1],encoding='utf-8').read()
js=open('/home/claude/nguon/src/l14309.js',encoding='utf-8').read()
if 'id="l14309-js"' in h:
    i=h.find('<script id="l14309-js">');j=h.find('</script>',i);h=h[:i]+'<script id="l14309-js">'+js+h[j:]
else:
    assert h.count('</body>')==1;h=h.replace('</body>','<script id="l14309-js">'+js+'</script></body>')
open(sys.argv[2],'w',encoding='utf-8').write(h);print('inject ok')
