//Background script: notifs, badges

// constants for time
workTime = 2400000
restTime = 300000
millisecondsToMinutesConstant = 60000

// functions to convert times
var millisecondsToMinutes = function(milliseconds){
    return milliseconds/millisecondsToMinutesConstant
}

var minutesToMilliseconds = function(minutes){
    return minutes*millisecondsToMinutesConstant
}

var timing = function () {
    // make Paused variable in localStorage
    if (localStorage.getItem('Paused') === null) {
        localStorage.setItem('Paused', 'true')
    }

    // if Pomodoro Timer started, handle events accordingly 
    if(localStorage.Paused == 'false'){
        // make Done variable in localStorage
        if (!localStorage.Done) {
            localStorage.setItem("Done", 'false')
        }

        // make END and REST variables in localStorage
        if (!localStorage.END || !localStorage.REST) {
            localStorage.setItem("END", Date.now() + workTime)
            localStorage.setItem("REST", Date.now() + workTime + restTime)
        }
        
        // notifications
        if (localStorage.Done == "false") {
            // 20-20-20 rule
            if ((localStorage.END - Date.now()) > 1199000 && (localStorage.END - Date.now()) < 1200000) {
                var notifOptions1 = {
                    type: "basic",
                    title: "Done",
                    message: "Good work, remember to follow the 20-20-20 rule.",
                    iconUrl: "128.png",
                }
            }
            else if (Date.now() > localStorage.END) {
                // notification for Pomodoro Timer finished
                localStorage.setItem("Done", "true")

                var notifOptions1 = {
                    type: "basic",
                    title: "Done",
                    message: "Good work, take a " + millisecondsToMinutes(restTime) + " minute break now.",
                    iconUrl: "128.png",

                }
            }
            chrome.notifications.create(notifOptions1);
        }

        else if (localStorage.Done == "true") {
            if (Date.now() > localStorage.REST) {
                // if rest is over, reset all values and send notif
                localStorage.setItem("Done", "false")

                localStorage.removeItem("END")
                localStorage.removeItem("REST")

                var notifOptions2 = {
                    type: "basic",
                    title: "Started.",
                    message: "Back to work for " + millisecondsToMinutes(workTime) + " minutes now.",
                    iconUrl: "128.png",

                }
                chrome.notifications.create(notifOptions2);
            }
        }
    }
}

// gets the minutes left of the Pomodoro Timer and displays it as text in the P++ badge
var getMinutesLeft = function(){
    if (localStorage.Paused == 'false') {
        if (localStorage.Done == 'false') {
            minLeft = Math.floor((millisecondsToMinutes(localStorage.END - Date.now())))
        }

        else{
            minLeft = Math.floor((localStorage.REST - Date.now()) / 60000)
        }
        chrome.browserAction.setBadgeBackgroundColor({ color: "green" });
        chrome.browserAction.setBadgeText({ text: String(minLeft) })
    }
    else{
        chrome.browserAction.setBadgeText({ text: '' })
    }
}

// read filenames in directory custom
var filenames = [];
chrome.runtime.getPackageDirectoryEntry(function(directoryEntry) {
    directoryEntry.getDirectory('custom', {}, function(subDirectoryEntry) {
        var directoryReader = subDirectoryEntry.createReader();
        
        directoryReader.readEntries(function (entries) {
            for (var i = 0; i < entries.length; i++) {
                if (entries[i].name != "READMECUSTOM.md")
                    filenames.push(entries[i].name);
            }
        });
        
    });
});

// send filenames to visuals.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    sendResponse(filenames);
});

setInterval(timing, 1000)
setInterval(getMinutesLeft, 1000)
