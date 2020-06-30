var counter = 0
var timeLeft = 100;
var min = 0
var placeholder = ''
var resetTime = function () {
  counter = 0
  min = 0
  localStorage.setItem("Minutes", String(min))
  localStorage.setItem("Seconds", String(counter))

}

document.getElementById("reset").addEventListener("click", resetTime);

if (typeof (Storage) !== "undefined") {
  console.log('yup')
  min = Number(localStorage.Minutes)
  counter = Number(localStorage.Seconds)

  var timerX = document.getElementById('timer')
  function timeIt() {
    counter++;

    if (counter < 10) {
      placeholder = '0'
    }
    else {
      placeholder = ''
    }
    if (counter == 60) {
      min += 1
      placeholder = '0'
      counter = 0
    }

    if(counter == 0){
      placeholder = '0'
      counter = 0
    }

    timerX.innerHTML = String(min) + ":" + placeholder + String(counter)
  }

  setInterval(timeIt, 1000);

} 
else {
  console.log('nope')
  var timerX = document.getElementById('timer')
  function timeIt() {
    counter++;

    if (counter < 10) {
      placeholder = '0'
    }
    else {
      placeholder = ''
    }
    if (counter == 60) {
      min += 1
      placeholder = '0'
      counter = 0
    }

    if (counter == 0) {
      placeholder = '0'
      counter = 0
    }

    timerX.innerHTML = String(min) + ":" + placeholder + String(counter)
  }

  setInterval(timeIt, 1000);

}

window.onunload = function () {
  localStorage.setItem("Minutes", String(min))
  localStorage.setItem("Seconds", String(counter))
}

