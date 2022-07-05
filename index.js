function startLoad() {
  let startButton = document.getElementById('startLoadButton');
  startButton.remove();
  let youtubeFrameDiv = document.getElementById('youtubeFrame');
  let nicoVideoFrameDiv = document.getElementById('nicoVideoFrame');
  let rumbleFrameDiv = document.getElementById('rumbleFrame');
  let localVideoDiv = document.getElementById('localVideo');

  const youtubeFrame = '<iframe width="350" src="https://www.youtube.com/embed/LLxCHPhw_pw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  const nicoVideoFrame = '<iframe width="350" src="http://embed.nicovideo.jp/watch/sm40619131"></iframe>';
  const rumbleFrame = '<iframe class="rumble" width="350" src="https://rumble.com/embed/v16xn24/?pub=4" frameborder="0" allowfullscreen></iframe>';
  const localVideo = '<video controls width="350"><source src="localVideo.webm" type="video/webm"></video>'
  youtubeFrameDiv.insertAdjacentHTML('afterbegin', youtubeFrame);
  nicoVideoFrameDiv.insertAdjacentHTML('afterbegin', nicoVideoFrame);
  rumbleFrameDiv.insertAdjacentHTML('afterbegin', rumbleFrame);
  localVideoDiv.insertAdjacentHTML('afterbegin',localVideo )
}
