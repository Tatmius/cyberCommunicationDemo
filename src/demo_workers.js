let iframeCount = 0;
let islocalVideoLoad = false;

addEventListener('message',(e) => {
  postMessage(e.data);
  if(e.data === 'iframeLoad'){
    iframeCount++;
  }else if(e.data === 'videoLoaded'){
    islocalVideoLoad = true;
  }
  if(iframeCount>=3 && islocalVideoLoad==true){
    postMessage('resourceAllLoaded');
  }
}, false);