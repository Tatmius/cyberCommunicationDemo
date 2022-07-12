function getResult(){
  fetch("https://cybercomdemo.tatmius.tk/duration/ave", {
    method: "GET",
  }).then(response => {
    console.log(response.status); // 多分200
    console.log(response.headers.get('Content-Encoding')); 
  })
}