//Pomodoro Timer

var min = 0
var sec = 0
var placeholder = ''
var minString = ''
var secString = ''

var timing = function(){
  //DateTime

  //A clock on the main screen

  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds()

  function checkTime(i) {
    if (i < 10) { i = "0" + i };
    return i;
  }


  if (h == 0) {
    h = 12
  }
  m = checkTime(m);
  s = checkTime(s);

  document.getElementById("time").innerHTML = h + ":" + m + ":" + s;
  
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
            timerX.innerHTML = "Working for: " + String(min + 1) + ":" + '00'
          }
          else {
            timerX.innerHTML = "Working for: " + String(min) + ":" + placeholder + String(sec)

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
