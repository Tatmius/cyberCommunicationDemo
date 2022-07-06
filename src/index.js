function startLoad() {
  let startButton = document.getElementById('startLoadButton');
  startButton.remove();
  let youtubeFrameDiv = document.getElementById('youtubeFrame');
  let nicoVideoFrameDiv = document.getElementById('nicoVideoFrame');
  let rumbleFrameDiv = document.getElementById('rumbleFrame');
  let localVideoDiv = document.getElementById('localVideo');

  const youtubeFrame = '<iframe width="350" onload="iframeLoaded()" src="https://www.youtube.com/embed/LLxCHPhw_pw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  const nicoVideoFrame = '<iframe width="350" onload="iframeLoaded()" src="http://embed.nicovideo.jp/watch/sm40619131"></iframe>';
  const rumbleFrame = '<iframe class="rumble" onload="iframeLoaded()" width="350" src="https://rumble.com/embed/v16xn24/?pub=4" frameborder="0" allowfullscreen></iframe>';
  const localVideo = '<video controls width="350"><source src="localVideo.webm" type="video/webm"></video>'
  youtubeFrameDiv.insertAdjacentHTML('afterbegin', youtubeFrame);
  nicoVideoFrameDiv.insertAdjacentHTML('afterbegin', nicoVideoFrame);
  rumbleFrameDiv.insertAdjacentHTML('afterbegin', rumbleFrame);
  localVideoDiv.insertAdjacentHTML('afterbegin',localVideo )
  
}

function iframeLoaded() {
  let entries = performance.getEntries();
  let entriesLen = entries.length;
  for(let i=0;i<entriesLen;i++){
    let name = entries[i].name;
    if(name.match(/youtube/)){
      insertDuration(entries[i],"ytResult")
    }else if(name.match(/nicovideo/)){
      insertDuration(entries[i], "ncResult")
    }else if(name.match(/rumble/)){
      insertDuration(entries[i], "rbResult")
    }
  }
  console.log(performance.getEntries());
} 

function insertDuration(performanceResourceTiming, name){
  const resultDiv = document.getElementById(name);
  const element = '<p>duration:'+String(performanceResourceTiming.duration)+'</p>'
  resultDiv.innerHTML = element;
}