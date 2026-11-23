// V2.1.42 · ghi sổ các vòng lặp giao diện (setInterval 200–1200 ms có thao tác DOM) để khi mở bảng / Kho có thể chạy ngay 1 lượt
// (dựng xong giao diện trong CÙNG khung hình, không hiện bản thô rồi đổi kiểu sau 300–700 ms). Tắt: window.V2142=false
(function(){if(window.V2142===false)return;var R=window.__iv42=[];var si=window.setInterval,ci=window.clearInterval;
 window.setInterval=function(fn,ms){var id=si.apply(window,arguments);try{if(typeof fn==='function'&&ms>=200&&ms<=1200){var s=Function.prototype.toString.call(fn);if(/querySelector|innerHTML|classList|getElementById|textContent/.test(s)&&!/superTime|score\s*=|bullets\s*=|accumulator|activeRobot|Audio|audio\.|Music96/.test(s))R.push({fn:fn,ms:ms,id:id});}}catch(e){}return id;};
 window.clearInterval=function(id){for(var i=R.length-1;i>=0;i--)if(R[i].id===id)R.splice(i,1);return ci.apply(window,arguments);};})();
