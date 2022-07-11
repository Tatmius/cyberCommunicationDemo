const worker = new Worker('demo_workers.js');
let iframeLoadCount = 0;

function startLoad() {  
  let startButton = document.getElementById('startLoadButtonDiv');
  startButton.remove();
  let youtubeFrameDiv = document.getElementById('youtubeFrame');
  let nicoVideoFrameDiv = document.getElementById('nicoVideoFrame');
  let twitchFrameDiv = document.getElementById('twitchFrame');
  let rumbleFrameDiv = document.getElementById('rumbleFrame');
  let localVideoDiv = document.getElementById('localVideo');

  const youtubeFrame = '<iframe width="350" onload="iframeLoaded()" src="https://www.youtube.com/embed/gEYNgdvcdLs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  const nicoVideoFrame = '<iframe width="350" onload="iframeLoaded()" src="https://embed.nicovideo.jp/watch/sm40683783"></iframe>';
  const twitchFrame = '<iframe src="https://clips.twitch.tv/embed?clip=TenaciousFunnyWaspKeepo-wYjv4YsAOY0_AThZ&parent=cybercomdemo.tatmius.tk" frameborder="0" allowfullscreen="true" scrolling="no" width="350"></iframe>'
  const rumbleFrame = '<iframe class="rumble" onload="iframeLoaded()" width="350" src="https://rumble.com/embed/v18p5pn/?pub=4" frameborder="0" allowfullscreen></iframe>';
  const localVideo = '<video controls width="350"><source src="localVideo.mp4" type="video/mp4" playsinline></video>'
  youtubeFrameDiv.insertAdjacentHTML('afterbegin', youtubeFrame);
  nicoVideoFrameDiv.insertAdjacentHTML('afterbegin', nicoVideoFrame);
  twitchFrameDiv.insertAdjacentHTML('afterbegin', twitchFrame);
  rumbleFrameDiv.insertAdjacentHTML('afterbegin', rumbleFrame);
  localVideoDiv.insertAdjacentHTML('afterbegin',localVideo )

  const video = document.querySelector('video');
  video.addEventListener('canplaythrough', (e) => {
    worker.postMessage('videoLoaded');
  });

  worker.addEventListener('message', (e) => {
    if(e.data==='resourceAllLoaded'){
      inserttDurations();
    }
  }, false);
  
}

function iframeLoaded(){
  worker.postMessage('iframeLoad');
}

function inserttDurations() {
  let entries = performance.getEntries();
  let entriesLen = entries.length;
  let ytDuration = 0;
  let ncDuration = 0;
  let rbDuration = 0;
  let localVideoDuration = 0;
  for(let i=0;i<entriesLen;i++){
    let name = entries[i].name;
    if(name.match(/youtube/)){
      ytDuration = insertDuration(entries[i],"ytResult");
    }else if(name.match(/nicovideo/)){
      ncDuration = insertDuration(entries[i], "ncResult");
    }else if(name.match(/rumble/)){
      rbDuration = insertDuration(entries[i], "rbResult");
    }else if(name.match(/localVideo/)){
      console.log(entries[i].duration);
      localVideoDuration += entries[i].duration;
    }
  }
  insertLocalDuration(localVideoDuration);
  console.log(performance.getEntries());
  postDurationData(ytDuration, ncDuration, rbDuration,localVideoDuration);
} 

function insertDuration(performanceResourceTiming, name){
  const resultDiv = document.getElementById(name);
  const duraion = performanceResourceTiming.duration
  const element = '<p>読み込み時間:'+String(duraion)+'[ms]</p>'
  resultDiv.innerHTML = element;
  return duraion
}

function insertLocalDuration(duration){
  const resultDiv = document.getElementById('lcResult');
  const element1 = '<p>読み込み時間:'+String(duration)+'[ms]</p>'
  resultDiv.innerHTML = element1;
}

function postDurationData(ytDuration, ncDuration, rbDuration, lcDuration){
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "https://cybercomdemo.tatmius.tk/duration/post", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    "youtube": ytDuration,
    "niconico": ncDuration,
    "rumble": rbDuration,
    "local":lcDuration,
  }));
}