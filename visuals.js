  //Images: Comment this section and uncomment the "Gifs" section if you want to use Gifs
  var images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg', '21.jpg', '22.jpg', '23.jpg', '24.jpg', '25.jpg', '26.jpg', '27.jpg', '28.jpg', '29.jpg', '30.jpg'];
  document.body.style.backgroundImage = "url(images/" + images[Math.floor(Math.random() * images.length)] + ')'
  
  //Gifs: Comment this section and uncomment the "Images" section if you want to use Gifs
  // var gifs = ["https://i.imgur.com/emSvYMy.gif", "https://i.imgur.com/RktuAes.gif", "https://i.imgur.com/OBXSp8n.gif", "https://i.imgur.com/HTyT6I7.gif", "https://i.imgur.com/HufwA6q.gif", "https://i.imgur.com/91U2BYA.gif"];
  // document.body.style.backgroundImage = "url(" + gifs[Math.floor(Math.random() * gifs.length)] + ")"

  //Quote Randomizer
  fetch('quotes.txt').then(response => response.text()).then(response => {
    var quotes = response.split("\n")

    var quotePos = Math.floor(Math.random() * (quotes.length / 2)) * 2

    document.getElementById("quote").innerHTML = quotes[quotePos]
    document.getElementById("quoteName").innerHTML = quotes[quotePos + 1]
  })