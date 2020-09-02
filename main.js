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
