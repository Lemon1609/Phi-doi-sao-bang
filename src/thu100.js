// V100 · BẢN THỬ CHO CHỦ DỰ ÁN (chỉ có trong tệp *_THU.html) — chạy TRƯỚC mọi mã game.
//  • Mọi dữ liệu lưu của bản thử nằm dưới tiền tố "thu100:" → KHÔNG đụng tới dữ liệu chơi thật trên cùng trình duyệt.
//  • Bước 2 của nạp tài khoản mẫu: sửa cấp / bậc chiến cơ trong dữ liệu xưởng trước khi game đọc (giống công cụ đo của Claude).
(()=>{const P='thu100:',SP=Storage.prototype,g=SP.getItem,s=SP.setItem,r=SP.removeItem;
 SP.getItem=function(k){return this===window.localStorage?g.call(this,P+k):g.call(this,k);};
 SP.setItem=function(k,v){return this===window.localStorage?s.call(this,P+k,v):s.call(this,k,v);};
 SP.removeItem=function(k){return this===window.localStorage?r.call(this,P+k):r.call(this,k);};
 window.THU100=true;window.THU100RAW={remove:k=>r.call(window.localStorage,k),key:i=>SP.key.call(window.localStorage,i)};
 try{const st=JSON.parse(sessionStorage.getItem('thu100-step')||'null');if(st&&st.cl!=null&&!st.clDone){const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}')||{};h.cleared=Array.from({length:st.cl},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));st.clDone=1;sessionStorage.setItem('thu100-step',JSON.stringify(st));}
   if(st&&st.phase===2&&st.ws){const w=JSON.parse(localStorage.getItem('saobang-workshop-v1')||'null');
   if(w){for(const [ci,lv,gr] of st.ws){w.craftLevels[ci]=lv;w.crafts[ci]=gr;}localStorage.setItem('saobang-workshop-v1',JSON.stringify(w));}
   const c=JSON.parse(localStorage.getItem('saobang-campaign-v36')||'null');if(c&&st.cl){c.stars=c.stars||{};for(let i=1;i<=st.cl;i++)c.stars[i]=3;localStorage.setItem('saobang-campaign-v36',JSON.stringify(c));}st.phase=3;sessionStorage.setItem('thu100-step',JSON.stringify(st));}}catch(e){}
})();
