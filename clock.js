//Pomodoro Timer WIP

var min = 0
var sec = 0
var placeholder = ''
var minString = ''
var secString = ''
var done = false

var timing = function(){

  if (!localStorage.END) {
    var end = Date.now() + 2700000
    localStorage.setItem("END", end)
  }
  if (!localStorage.REST) {
    var rest = end + 900000
    localStorage.setItem("REST", rest)
  }

  if(!done){
    var timerX = document.getElementById('timer')
    min = Math.abs(Math.floor((localStorage.END - Date.now()) / 60000))
    sec = Math.round(((localStorage.END - Date.now()) / 1000) % 60)
    if (sec < 10 || sec == 60) {
      placeholder = '0'
    }
    else {
      placeholder = ''
    }

    if (Date.now() > localStorage.END) {
      timerX.innerHTML = 'Done.'
      done = true

      var notifOptions = {
        type: "basic",
        title: "Done",
        message: "Good work, relax for 15 minutes now.",
        iconUrl: "128.png",

      }

      chrome.notifications.create(notifOptions);
    }

    else {
      timerX.innerHTML = String(min) + ":" + placeholder + String(sec)
    }
  }

  else if(done){
    var timerX = document.getElementById('timer')
    min = Math.abs(Math.floor((localStorage.REST - Date.now()) / 60000))
    sec = Math.round(((localStorage.REST - Date.now()) / 1000) % 60)
    if (sec < 10 || sec == 60) {
      placeholder = '0'
    }
    else {
      placeholder = ''
    }

    if (Date.now() > localStorage.REST) {
      timerX.innerHTML = 'Done Rest.'
      done = false
      localStorage.clear()

      var notifOptions = {
        type: "basic",
        title: "Started.",
        message: "Back to the grind for 45 minutes now.",
        iconUrl: "128.png",

      }

      chrome.notifications.create(notifOptions);
    }

    else {
      timerX.innerHTML = String(min) + ":" + placeholder + String(sec)
    }

  }

}

setInterval(timing, 1000)