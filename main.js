//Pomodoro Timer WIP

var min = 0
var sec = 0
var placeholder = ''
var minString = ''
var secString = ''

if (!localStorage.Todo) {
  localStorage.setItem("Todo", "")
}

window.onunload = function () {
  localStorage.setItem("Todo", document.getElementById("toDoList").value)
}

window.onload = function(){
  document.getElementById("toDoList").value = localStorage.getItem("Todo")
  
  // //Background
  //Images
  // var images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg', '21.jpg', '22.jpg', '23.jpg', '24.jpg', '25.jpg', '26.jpg', '27.jpg', '28.jpg', '29.jpg', '30.jpg'];
  // document.body.style.backgroundImage = "url(images/" + images[Math.floor(Math.random() * images.length)] + ')'
  
  //Gifs
  var gifs = ["https://i.imgur.com/emSvYMy.gif", "https://i.imgur.com/RktuAes.gif", "https://i.imgur.com/OBXSp8n.gif", "https://i.imgur.com/HTyT6I7.gif", "https://i.imgur.com/HufwA6q.gif", "https://i.imgur.com/91U2BYA.gif"];
  document.body.style.backgroundImage = "url(" + gifs[Math.floor(Math.random() * gifs.length)] + ")"



}


var timing = function(){


  //DateTime

  //A clock on the main screen

  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds()
  var en = 'AM'

  function checkTime(i) {
    if (i < 10) { i = "0" + i };
    return i;
  }

  if (h > 12) {
    en = 'PM'
    h = h - 12

  }
  if (h == 0) {
    h = 12
  }
  m = checkTime(m);
  s = checkTime(s);

  document.getElementById("time").innerHTML = h + ":" + m + ":" + s + ' ' + en;
  
  //Weather, Maybe later
  // function weatherFetch() {
  //   var key = '{yourkey}';
  //   fetch('https://api.openweathermap.org/data/2.5/weather?q=Oakville&appid=00ded47b1315decbc8872f32c630ceaf')
  //     .then(function (resp) { return resp.json() })
  //     .then(function (data) {
  //       console.log(data);
  //     })
  //     .catch(function () {

  //     });
  // }

  // weatherFetch();

  //Todo list

  if (document.getElementById("toDoList").value != localStorage.getItem("Todo")){
    localStorage.setItem("Todo", document.getElementById("toDoList").value)

  }

  //Timer
  var timerX = document.getElementById('timer')

  var buttonX = document.getElementById('reset')

  buttonX.onclick = function () {

    if(localStorage.Paused == 'false'){
      localStorage.setItem('Paused', 'true')
    }
    else if (localStorage.Paused == 'true') {
      localStorage.setItem('Paused', 'false')
    }
  
  };

  if(localStorage.Paused == 'true'){
    timerX.style.color = 'purple'
    timerX.innerHTML = 'Paused'
    localStorage.removeItem('REST')
    localStorage.removeItem('END')
    localStorage.removeItem('Done')

  }

  else{
    if (localStorage.Done == "false") {

      if (!localStorage.END) {
        timerX.innerHTML = 'Starting...'
      }
      else {
        min = Math.floor(((localStorage.END - Date.now()) / 60000))
        sec = Math.round(((localStorage.END - Date.now()) / 1000) % 60)

        if (sec < 10 || sec == 0) {
          placeholder = '0'
        }

        else {
          placeholder = ''
        }

        if (localStorage.END - Date.now() < 250) {
          timerX.innerHTML = 'Complete.'
        }
        else {
          timerX.style.color = "red"

          if (sec == 60) {
            timerX.innerHTML = "Grinding for: " + String(min + 1) + ":" + '00'
          }
          else {
            timerX.innerHTML = "Grinding for: " + String(min) + ":" + placeholder + String(sec)

          }
        }

      }
    }

    if (localStorage.Done == "true") {
      min = Math.floor(((localStorage.REST - Date.now()) / 60000))
      sec = Math.round(((localStorage.REST - Date.now()) / 1000) % 60)
      if (sec < 10 || sec == 0) {
        placeholder = '0'
      }

      else {
        placeholder = ''
      }
      if (localStorage.REST - Date.now() < 250) {
        timerX.innerHTML = 'Complete.'
      }
      else {
        timerX.style.color = 'green'
        if (sec == 60) {
          timerX.innerHTML = "Resting for: " + String(min + 1) + ":" + '00'
        }
        else {
          timerX.innerHTML = "Resting for: " + String(min) + ":" + placeholder + String(sec)
        }

      }

    }
  }
}
setInterval(timing, 1000)
