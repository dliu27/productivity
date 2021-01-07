
chrome.runtime.sendMessage("loaded", function(response) {
  if (response.length > 0){
    document.body.style.backgroundImage = "url(custom/" + response[Math.floor(Math.random() * response.length)] + ")"
  }
  else {
    //Images: Comment this section and uncomment the "Gifs" section if you want to use Gifs
    var images = ["https://i.imgur.com/AFSCtki.jpg", "https://i.imgur.com/zjZweac.jpg", "https://i.imgur.com/fu7C07A.jpg", "https://i.imgur.com/vtUAxNS.jpg", "https://i.imgur.com/ff1hAt9.jpg", "https://i.imgur.com/SEgbJvq.jpg", "https://i.imgur.com/tZtfiEe.jpg", "https://i.imgur.com/tp3N8qb.jpg", "https://i.imgur.com/NnyQVH3.jpg", "https://i.imgur.com/1Qw57uC.jpg", "https://i.imgur.com/Iey9Q43.jpg", "https://i.imgur.com/qiZbQqZ.jpg", "https://i.imgur.com/caVpunr.jpg", "https://i.imgur.com/hKHqdLK.jpg", "https://i.imgur.com/p9hYOPF.jpg", "https://i.imgur.com/NdddZLD.jpg", "https://i.imgur.com/mPRQc8v.jpg", "https://i.imgur.com/50ih09t.jpg", "https://i.imgur.com/k17atCS.jpg", "https://i.imgur.com/IUnF8qn.jpg", "https://i.imgur.com/Af9HGyV.jpg", "https://i.imgur.com/uHNckM7.jpg", "https://i.imgur.com/RwEbil0.jpg", "https://i.imgur.com/gfqEKmX.jpg", "https://i.imgur.com/swrzABJ.jpg", "https://i.imgur.com/yEI9PSC.jpg", "https://i.imgur.com/notnusZ.jpg", "https://i.imgur.com/oMJgfoc.jpg", "https://i.imgur.com/IsWqbGN.jpg", "https://i.imgur.com/P221Mvn.jpg"];
    document.body.style.backgroundImage = "url(" + images[Math.floor(Math.random() * images.length)] + ")"

    //Gifs: Comment this section and uncomment the "Images" section if you want to use Gifs
    // var gifs = ["https://i.imgur.com/emSvYMy.gif", "https://i.imgur.com/RktuAes.gif", "https://i.imgur.com/OBXSp8n.gif", "https://i.imgur.com/HTyT6I7.gif", "https://i.imgur.com/HufwA6q.gif", "https://i.imgur.com/91U2BYA.gif"];
    // document.body.style.backgroundImage = "url(" + gifs[Math.floor(Math.random() * gifs.length)] + ")"
  }

});




//Quote Randomizer
fetch('quotes.txt').then(response => response.text()).then(response => {
  var quotes = response.split("\n")

  var quotePos = Math.floor(Math.random() * (quotes.length / 2)) * 2

  document.getElementById("quote").innerHTML = quotes[quotePos]
  document.getElementById("quoteName").innerHTML = quotes[quotePos + 1]
})

