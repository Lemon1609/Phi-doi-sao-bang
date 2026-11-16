import re,os,shutil,sys
# Dùng: python3 claude_tools/split.py <thư_mục_ra> [file_html]  (chạy từ thư mục V83_nguon)
KIT=os.environ.get('KIT',os.getcwd())
src=sys.argv[2] if len(sys.argv)>2 else os.path.join(KIT,'Phi_Doi_Sao_Bang_V74_mau.html');out=sys.argv[1]
shutil.rmtree(out,ignore_errors=True);os.makedirs(out+'/a')
s=open(src,encoding='utf-8').read()
n=[0];files=[]
def rep(m):
    tag,attrs,body=m.group(1),m.group(2),m.group(3)
    if len(body)<100000: return m.group(0)
    n[0]+=1
    if tag=='script' and len(body)>14_000_000 and re.match(r'\s*const (\w+)=\{',body) and body.rstrip().endswith('};'):
        # V167 · khối tài nguyên > 14 MB (giới hạn 16 MB/tệp) → tách nhiều tệp: const X={…phần 1}; Object.assign(X,{…phần k})
        import json as _j
        nm=re.match(r'\s*const (\w+)=',body).group(1);obj=_j.loads(body[body.index('=')+1:body.rstrip().rindex(';')]);parts=[{}];sz=0
        for k,v in obj.items():
            l=len(k)+len(v)+8
            if sz+l>12_000_000 and parts[-1]:parts.append({});sz=0
            parts[-1][k]=v;sz+=l
        tags=[]
        for i,pt in enumerate(parts):
            fn=f'a/s{n[0]:02d}{"" if i==0 else chr(96+i)}.js';js=_j.dumps(pt,separators=(',',':'),ensure_ascii=False)
            open(out+'/'+fn,'w',encoding='utf-8').write((f'const {nm}=' if i==0 else f'Object.assign({nm},')+js+(';' if i==0 else ');'));files.append(fn)
            tags.append(f'<script{attrs} src="{fn}"></script>')
        return ''.join(tags)
    if tag=='script':
        fn=f'a/s{n[0]:02d}.js';open(out+'/'+fn,'w',encoding='utf-8').write(body);files.append(fn)
        return f'<script{attrs} src="{fn}"></script>'
    fn=f'a/c{n[0]:02d}.css';open(out+'/'+fn,'w',encoding='utf-8').write(body);files.append(fn)
    return f'<link rel="stylesheet"{attrs} href="{fn}">'
s=re.sub(r'<(script|style)([^>]*)>(.*?)</\1>',rep,s,flags=re.S)
head='<!doctype html><html lang="vi"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#08101c"><title>Phi Đội Sao Băng V67</title>'
assert s.startswith(head),s[:300]
s='<title>Phi Đội Sao Băng</title><meta name="theme-color" content="#08101c">'+"<script>(()=>{const c=document.createElement('div');c.id='hs78';c.hidden=true;window.__hs78=c;const H=document.head,ap=H.appendChild.bind(H);H.appendChild=function(n){if(n&&(n.tagName==='STYLE'||n.tagName==='LINK'))return c.appendChild(n);return ap(n);};document.currentScript.after(c);})()</script>"+s[len(head):]
# V79C · màn tải (UI19 của GPT): tiến độ theo dung lượng thật của các tệp đã tải xong · lỗi → nút thử lại
import io,base64
from PIL import Image
def du(path,mx,q=82,rgb=False):
    im=Image.open(path);im=im.convert('RGB' if rgb else 'RGBA');im.thumbnail((mx,mx));b=io.BytesIO();im.save(b,'WEBP',quality=q,method=6);return 'data:image/webp;base64,'+base64.b64encode(b.getvalue()).decode()
U=os.path.join(KIT,'src','ui19')+'/'
BG=du(U+'loading_background.png',900,70,True);LG=du(U+'loading_logo.png',512);TR=du(U+'loading_track.png',512);FI=du(U+'loading_fill.png',448);IC=du(U+'app_icon.png',96)
sizes={f:os.path.getsize(out+'/'+f) for f in files};TOT=sum(sizes.values())
def tagload(m):
    t=m.group(0);f=re.search(r'(?:src|href)="(a/[^"]+)"',t).group(1);return t.replace(' src="'+f+'"',' src="'+f+'" onload="__sp79('+str(sizes[f])+')" onerror="__sp79e()"').replace(' href="'+f+'"',' href="'+f+'" onload="__sp79('+str(sizes[f])+')" onerror="__sp79e()"')
s=re.sub(r'<(?:script|link)[^>]*(?:src|href)="a/[^"]+"[^>]*>',tagload,s)
SPL=('<link rel="icon" href="'+IC+'"><style>#sp79{position:fixed;inset:0;z-index:2147483647;background:#0b1220 url('+BG+') center/cover no-repeat;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;font-family:system-ui,sans-serif;color:#e8e4d9;transition:opacity .4s}'
 '#sp79 .lg{width:224px;height:112px;background:url('+LG+') center/contain no-repeat}#sp79 h1{margin:0;font-size:20px;letter-spacing:.08em;color:#f3d48a;text-shadow:0 1px 2px #000}'
 '#sp79 .tr{position:relative;width:297px;height:28px;background:url('+TR+') center/100% 100% no-repeat}#sp79 .fi{position:absolute;left:20px;top:9px;height:10px;width:257px;background:url('+FI+') left center/257px 10px no-repeat;clip-path:inset(0 100% 0 0);transition:clip-path .25s}'
 '#sp79 p{margin:0;font-size:13px;color:#b9ccdf;min-height:18px}#sp79 #sp79tip{max-width:300px;text-align:center;font-size:12.5px;line-height:1.35;color:#9fd4ff;min-height:34px;padding:0 10px}#sp79 button{display:none;padding:10px 22px;border-radius:8px;border:1px solid #5ab8ff;background:#101d30;color:#e8e4d9;font-size:14px}#sp79.err button{display:block}</style>'
 '<div id="sp79"><div class="lg"></div><h1>PHI ĐỘI SAO BĂNG</h1><div class="tr"><div class="fi" id="sp79f"></div></div><p id="sp79t">Đang tải tài nguyên…</p><p id="sp79tip"></p><button onclick="location.reload()">THỬ LẠI</button></div>'
 '<script>(()=>{let got=0;const T='+str(TOT)+';const f=document.getElementById("sp79f"),t=document.getElementById("sp79t");'
 'window.__sp79=n=>{got+=n;const p=Math.min(100,Math.floor(got/T*100));f.style.clipPath="inset(0 "+(100-p)+"% 0 0)";t.textContent="Đang tải tài nguyên… "+p+"% · "+(got/1048576).toFixed(1)+" / "+(T/1048576).toFixed(1)+" MB";};'
 '(()=>{const T=["Bay sát đạn để nạp GRAZE; giữ bom cho lúc boss xả đạn.","Dấu ▲ đỏ ở mép trên báo quái lớn hoặc tinh anh sắp vào màn.","Kẹt ở ải boss? Vào Bản đồ › Phó bản để cày đồ trước.","Thưởng Tháp boss tính theo tầng cao nhất đã vượt; mạnh lên rồi quay lại leo tiếp.","Sau ải 5, màn kết quả có nút NHÂN ĐÔI hợp kim (mỗi ngày có giới hạn lượt).","Vòng quay, điểm danh và nhiệm vụ ngày/tuần đều có quà mỗi ngày."];const e=document.getElementById("sp79tip");if(e){let i=Math.floor(Math.random()*T.length);e.textContent=T[i];setInterval(()=>{i=(i+1)%T.length;e.textContent=T[i];},3500);}})();'
 'window.__sp79e=()=>{const e=document.getElementById("sp79");e.classList.add("err");t.textContent="Không tải được một phần dữ liệu. Kiểm tra mạng rồi thử lại.";};'
 'window.addEventListener("load",()=>{const e=document.getElementById("sp79");if(!e||e.classList.contains("err"))return;t.textContent="Đang khởi động…";setTimeout(()=>{e.style.opacity=0;setTimeout(()=>e.remove(),450);},350);});})()</script>')
s=s.replace("document.currentScript.after(c);})()</script>","document.currentScript.after(c);})()</script>"+SPL,1)
for a,b in [('</head><body>','<script>document.currentScript.before(window.__hs78)</script>'),('</body></html>','')]:
    assert s.count(a)==1,a;s=s.replace(a,b)
open(out+'/index.html','w',encoding='utf-8').write(s)
print('index KB',len(s.encode())//1024,'files',len(files),'max MB',max(os.path.getsize(out+'/'+f) for f in files)/1e6, 'total MB',sum(os.path.getsize(out+'/'+f) for f in files)/1e6)
