//A clock on the main screen

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds()
    var en = 'AM'

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
}
function checkTime(i) {
    if (i < 10) { i = "0" + i };
    return i;
}
setInterval(startTime, 1000)
