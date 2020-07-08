//Changes colours of all <p> elements

chrome.runtime.onMessage.addListener(changeColor)

function changeColor(message){
  if(message.txt === 'colour'){
    let paragraphs = document.getElementsByTagName('body')
    for (block of paragraphs) {
        console.log(block.style)
        block.style['background-color'] = '#EFAE65'
    }
  }

}

