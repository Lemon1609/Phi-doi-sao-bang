'use strict';
// V201 · SURVIVE_BAL_V200 (Gemini chốt 07/11 từ số đo DO_SONG_SOT_V200): nhân sát thương MỖI ĐÒN địch gây cho người chơi
//  theo mốc ải chiến dịch, nội suy tuyến tính. Chỉ chế độ Chiến dịch (không Nguyệt Thực / Vô tận / Tháp). Tắt: window.SURV200=false
//  Áp ngay tại 2 chỗ trừ khiên/máu trong damage() gốc (rep trong build) → mọi lớp hoãn/chặn đòn phía ngoài giữ nguyên.
const SURV200=(()=>{
 const A=[[1,1],[20,1],[40,.90],[60,.80],[80,.80],[100,.80],[120,.90],[140,1],[160,.82],[180,.65],[200,.60]];
 // V210 (Gemini V210_SURVIVE_AND_EVENT_BAL): bù nội tại sự kiện → 160/180/200 = .86/.68/.63. Tắt: window.BAL210=false
 function anc(){try{const B=(typeof BAL_EV==='function')?BAL_EV():null;if(B&&B.anchors){const o=B.anchors;return Object.keys(o).map(Number).sort((x,y)=>x-y).map(k=>[k,o[k]]);}}catch{}return A;}
 function at(lv){const A=anc();if(lv<=A[0][0])return A[0][1];for(let i=1;i<A.length;i++){if(lv<=A[i][0]){const [a,x]=A[i-1],[b,y]=A[i];return x+(y-x)*(lv-a)/(b-a);}}return A[A.length-1][1];}
 function m(){if(window.SURV200===false)return 1;try{if(typeof gameMode!=='undefined'&&gameMode!=='campaign')return 1;if(typeof Dungeons!=='undefined'&&Dungeons.active())return 1;return at(level);}catch{return 1;}}
 return {m,at,A};
})();
