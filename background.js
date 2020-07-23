//Background scripts, button, notifs, badges
chrome.browserAction.onClicked.addListener(buttonClicked)

function buttonClicked(tab) {
    let msg = {
        txt: 'colour'
    }
    chrome.tabs.sendMessage(tab.id, msg)
}

var timing = function () {

    if (!localStorage.Paused) {
        localStorage.setItem('Paused', 'false')
    }

    if(localStorage.Paused == 'false'){
        if (!localStorage.Done) {
            localStorage.setItem("Done", 'false')
        }

        if (!localStorage.END || !localStorage.REST) {
            localStorage.setItem("END", Date.now() + 1800000)
            localStorage.setItem("REST", Date.now() + 2100000)
        }

        if (localStorage.Done == "false") {

            if (Date.now() > localStorage.END) {
                localStorage.setItem("Done", "true")

                var notifOptions1 = {
                    type: "basic",
                    title: "Done",
                    message: "Good work, relax for 5 minutes now.",
                    iconUrl: "128.png",

                }

                chrome.notifications.create(notifOptions1);
            }
        }

        else if (localStorage.Done == "true") {
            if (Date.now() > localStorage.REST) {
                localStorage.setItem("Done", "false")

                localStorage.removeItem("END")
                localStorage.removeItem("REST")

                var notifOptions2 = {
                    type: "basic",
                    title: "Started.",
                    message: "Back to the grind for 30 minutes now.",
                    iconUrl: "128.png",

                }

                chrome.notifications.create(notifOptions2);
            }
        }

    }

}


var getMinutes = function(){
    if (localStorage.END) {
        minLeft = Math.abs(Math.floor((localStorage.END - Date.now()) / 60000))
    }

    else if (localStorage.REST) {
        minLeft = Math.abs(Math.floor((localStorage.REST - Date.now()) / 60000))
    }
    chrome.browserAction.setBadgeBackgroundColor({ color: "green" });
    chrome.browserAction.setBadgeText({ text: String(minLeft) })

}

setInterval(timing, 1000)
setInterval(getMinutes, 1000)
