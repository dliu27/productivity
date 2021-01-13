//Background scripts, button, notifs, badges
chrome.browserAction.onClicked.addListener(buttonClicked)

function buttonClicked(tab) {
    let paragraphs = document.getElementsByTagName('body')
    for (block of paragraphs) {
        block.style['background-color'] = '#EFAE65'
    }
}

var timing = function () {

    workTime = 2400000
    restTime = 300000
    millisecondsToMinutesConstant = 60000

    var millisecondsToMinutes = function(milliseconds){
        return milliseconds/millisecondsToMinutesConstant
    }

    var minutesToMilliseconds = function(minutes){
        return minutes*millisecondsToMinutesConstant
    }

    if (localStorage.getItem('Paused') === null) {
        localStorage.setItem('Paused', 'true')
    }

    if(localStorage.Paused == 'false'){
        if (!localStorage.Done) {
            localStorage.setItem("Done", 'false')
        }

        if (!localStorage.END || !localStorage.REST) {
            localStorage.setItem("END", Date.now() + workTime)
            localStorage.setItem("REST", Date.now() + workTime + restTime)
        }

        if (localStorage.Done == "false") {

            if ((localStorage.END - Date.now()) > 1199000 && (localStorage.END - Date.now()) < 1200000) {
                var notifOptions1 = {
                    type: "basic",
                    title: "Done",
                    message: "Good work, remember to follow the 20-20-20 rule.",
                    iconUrl: "128.png",
                }
            }
            else if (Date.now() > localStorage.END) {
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


var getMinutes = function(){
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

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    sendResponse(filenames);
});





setInterval(timing, 1000)
setInterval(getMinutes, 1000)
