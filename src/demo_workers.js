let iframeCount = 0;
let localVideoCount = 0;

addEventListener('message',(e) => {
  postMessage(e.data);
  if(e.data === 'iframeLoad'){
    iframeCount++;
  }
  if(iframeCount>=3){
    postMessage('iframeAllLoaded');
  }
}, false);