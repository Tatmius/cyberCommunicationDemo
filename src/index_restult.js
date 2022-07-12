const typeArr = ["youtube","niconico","twitch","rumble","local"];
const labels = ['youtube', 'ニコニコ動画', 'Twitch', 'Rumble', 'ローカル'];
const backgroundColor = [
  'rgba(255, 99, 132, 0.6)',
  'rgba(54, 162, 235, 0.6)',
  'rgba(255, 206, 86, 0.6)',
  'rgba(75, 192, 192, 0.6)',
  'rgba(153, 102, 255, 0.6)',
  'rgba(255, 159, 64, 0.6)'
];

const borderColor = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)'
];

const options = {
  scales:{
    x: {
      ticks: {
        color: 'white',
        font: {
          size: 20
        }
      }
    },
    y: {
      ticks: {
        color: 'white',
        font: {
          size: 20
        }
      }
    }
  },
  plugins: {
    title:{
      display: true,
      text: '読み込み時間[ms]',
      color: 'white',
      font:{
        size: 25
      }
    },
    legend:{
      display:false
    }
  }
}

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
  displayGraph(data);
}

function formatData(data, title){
  return '<p class="text-2xl text-white">'+title+' : '+String(data)+'[ms]</p>'
}

getResult();


function drawBackground(target) {

  let x_scale = target.scales.x;
  let y_scale = target.scales.y;

  let left = x_scale.left;
  let top = y_scale.top;
  let width = x_scale.width;
  let height = y_scale.height;

  var cvs = document.getElementById(target.canvas.id);
  var ctx = cvs.getContext('2d');

  ctx.fillStyle = "#AFE1E4";
  ctx.fillRect(left, top, width, height);
}

function displayGraph(data){
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    plugins: [{
      beforeDraw: drawBackground,
    }],
      type: 'bar',
      data: {
          labels: labels,
          datasets: [{
              label: '読み込み時間',
              data: [data[labels[0]], data[labels[1]], data[labels[2]], data[labels[3]], data[labels[4]]],
              backgroundColor: backgroundColor,
              borderColor: borderColor,
              borderWidth: 5,
          }]
      },
      options: options
  });
}

