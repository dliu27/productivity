chrome.browserAction.onClicked.addListener(buttonClicked)

function buttonClicked(tab){
    console.log('button')
    let msg = {
        txt: 'colour'
    }
    chrome.tabs.sendMessage(tab.id, msg)
}