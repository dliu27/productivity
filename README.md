# productivity++, a free, minimalist solution designed to optimize your work.

## ℹ️ About

Hi! This is my personal take on a new tab productivity chrome extension. Based off the Pomodoro Method, and my minimalist thinking, this extension will bring your workflow to an entire new level.

## 💡 Features

-Pomodoro Timer with a pause/play button (40 minute work sessions, 5 minute breaks)

-Notifications for the 20/20/20 rule and when timer finished

-Time in minutes shows as a button on the taskbar

-Personal Todo List (Store up to 6 items in one compact box, easily viewable every new tab)

-Images / Looping Gif Backgrounds (randomized every load)

-Changes colour of all paragraph elements to an easier to read colour (#efae65)

-Global Clock (shows the current time)

-Quotes (randomized)

-Aesthetically appealing (Minimalist touch)

## 🔨 Installation 

1. Download this repo as a ZIP file. 
2. Extract the ZIP file.
3. Go to `chrome://extensions` in your Chromium browser.
4. Enable "Developer Mode"
5. Click "Load Unpacked" and select the extracted folder.
6. Open a [new tab](chrome://newtab)

## 🤔 FAQ

> **How do I customize this extension (timing, pictures)?**

Currently there is no way to customize other than changing the source code. The clock is found in background.js. Look for: 
     
        localStorage.setItem("END", Date.now() + 2400000)
        localStorage.setItem("REST", Date.now() + 2700000)
  
and change those numbers. All time is in milliseconds. 

For pictures, you can uncomment this block:

        //Images
        // var images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg', '21.jpg', '22.jpg', '23.jpg', '24.jpg', '25.jpg', '26.jpg', '27.jpg', '28.jpg', '29.jpg', '30.jpg'];
        // document.body.style.backgroundImage = "url(images/" + images[Math.floor(Math.random() * images.length)] + ')'

and comment this block:

          //Gifs
          var gifs = ["https://i.imgur.com/emSvYMy.gif", "https://i.imgur.com/RktuAes.gif", "https://i.imgur.com/OBXSp8n.gif", "https://i.imgur.com/HTyT6I7.gif", "https://i.imgur.com/HufwA6q.gif", "https://i.imgur.com/91U2BYA.gif"];
          document.body.style.backgroundImage = "url(" + gifs[Math.floor(Math.random() * gifs.length)] + ")"

You can also put your images in the images folder and add their respective filenames, and you can modify the links in the gifs folder. 

## 👋 Final Words from dliu27

Enjoy the extension, I hope you found value in my work.

If you have any questions, email me at davidliu0987@yahoo.ca
