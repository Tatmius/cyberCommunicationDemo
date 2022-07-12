const typeArr = ["youtube","niconico","twitch","rumble","local"];

function getResult(){
  fetch("https://cybercomdemo.tatmius.tk/duration/ave", {
    method: "GET",
    headers: {
      Accept: 'application/json',
    },
  }).then(response => {
    console.log(response.status); // 多分200
    console.log(response.headers.get('Content-Encoding')); 
    response.json().then(json => {
      insertResult(json);
    });
  })
}

function insertResult(result){
  const data = JSON.parse(result);
  const resultDiv = document.getElementById('Result');
  for(const element of typeArr){
    result = data[element];
    resultDiv.insertAdjacentHTML('beforeend',formatData(result, element));
  }
}

function formatData(data, title){
  return '<p class="text-2xl text-white">'+title+' : '+String(data)+'[ms]</p>'
}

getResult();