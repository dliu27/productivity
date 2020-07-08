//Background scripts, still have to do badges and notifs

chrome.browserAction.onClicked.addListener(buttonClicked)

function buttonClicked(tab) {
    let msg = {
        txt: 'colour'
    }
    chrome.tabs.sendMessage(tab.id, msg)
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

setInterval(getMinutes, 1000)
