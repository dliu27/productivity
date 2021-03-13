// timing events

var min = 0
var sec = 0
var placeholder = ''
var minString = ''
var secString = ''

var timing = function(){
  // clock on the main screen

  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();

  if (h >= 20) {
    var hoursWorked = Math.floor((localStorage.getItem("TimeWorked") / (3600000)) % 24);    
    var minutesWorked = Math.floor((localStorage.getItem("TimeWorked") / (60000)) % 60);
    var secondsWorked = Math.floor(localStorage.getItem("TimeWorked") / 1000) % 60;
    
    hoursWorked = (hoursWorked < 10) ? "0" + hoursWorked : hoursWorked;
    minutesWorked = (minutesWorked < 10) ? "0" + minutesWorked : minutesWorked;
    secondsWorked = (secondsWorked < 10) ? "0" + secondsWorked : secondsWorked;
  
    document.getElementById("timeWorkedText").style.visibility = "visible";
    document.getElementById("timeWorked").style.visibility = "visible";
    document.getElementById("timeWorked").innerHTML = hoursWorked + ":" + minutesWorked + ":" + secondsWorked
    localStorage.setItem("WorkFinished", "true")
  }
  
  if (h > 7 && h < 20 && localStorage.getItem("WorkFinished") == "true") {
    document.getElementById("timeWorkedText").style.visibility = "hidden";
    document.getElementById("timeWorked").style.visibility = "hidden";
    localStorage.removeItem("TimeWorked")
    localStorage.setItem("WorkFinished", "false")
    
    //Quote Randomizer
    fetch('quotes.txt').then(response => response.text()).then(response => {
      var quotes = response.split("\n")

      var quotePos = Math.floor(Math.random() * (quotes.length / 2)) * 2

      var notifQuotes = {
        type: "basic",
        title: "Here's the quote for the day:",
        message: quotes[quotePos] + quotes[quotePos + 1],
        iconUrl: "128.png",
      }
      chrome.notifications.create(notifQuotes);
    })
  }

  function checkTime(i) {
    if (i < 10) { 
      i = "0" + i
    };
    return i;
  }


  if (h == 0) {
    h = 12
  }
  m = checkTime(m);
  s = checkTime(s);

  document.getElementById("time").innerHTML = h + ":" + m;
  //+ ":" + s;
  
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

  // Pomodoro Timer
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

        /*
        if (sec < 10 || sec == 0) {
          placeholder = '0'
        }

        else {
          placeholder = ''
        }
        */
        if (localStorage.END - Date.now() < 250) {
          timerX.innerHTML = 'Complete.'
        }
        else {
          timerX.style.color = "red"
          
          if (sec == 60) {
            timerX.innerHTML = "Working: " + String(min + 1) //+ ":" + '00'
          }
          else {
            timerX.innerHTML = "Working: " + String(min) //+ ":" + placeholder + String(sec)

          }
          
        }

      }
    }

    if (localStorage.Done == "true") {
      min = Math.floor(((localStorage.REST - Date.now()) / 60000))
      sec = Math.round(((localStorage.REST - Date.now()) / 1000) % 60)
      /*
      if (sec < 10 || sec == 0) {
        placeholder = '0'
      }

      else {
        placeholder = ''
      }
      */
      if (localStorage.REST - Date.now() < 250) {
        timerX.innerHTML = 'Complete.'
      }
      else {
        timerX.style.color = 'green'
        if (sec == 60) {
          timerX.innerHTML = "Resting: " + String(min + 1) //+ ":" + '00'
        }
        else {
          timerX.innerHTML = "Resting: " + String(min) //+ ":" + placeholder + String(sec)
        }
      }
    }
  }
}

setInterval(timing, 1000)
