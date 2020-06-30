chrome.runtime.onMessage.addListener(changeColor)

function changeColor(message){
  console.log(message.txt)
  if(message.txt === 'colour'){
    console.log('hi')
    let paragraphs = document.getElementsByTagName('body')
    for (block of paragraphs) {
        console.log(block.style)
        block.style['background-color'] = '#EFAE65'
    }
  }

}

