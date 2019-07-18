# [Marvel Fight Night](https://marvelfightnight.herokuapp.com/pickAFight)
![alt text](https://img.shields.io/badge/uses-Node-brightgreen.svg) ![alt text](https://img.shields.io/badge/uses-Express-brightgreen.svg) 

![alt text](https://img.shields.io/badge/uses-jQuery-blue.svg)  ![alt text](https://img.shields.io/badge/uses-D3-blue.svg) ![alt text](https://img.shields.io/badge/uses-Bootstrap-blue.svg)

The concept of a dating app was not appealing to me. I turned the project into something very similar to a dating app but with a slight twist. I used the same concept about compatibility but not in a I like you manner. You would rank something on various properties in varying scales. From there you could preform some checks for close matches. 


[<img src='https://github.com/krtcotmo2/pickAFight/blob/master/assets/images/fightNightSplash.png'/>](https://marvelfightnight.herokuapp.com/)  [<img src='https://github.com/krtcotmo2/pickAFight/blob/master/assets/images/fightOpponent.png' width=200/>](https://marvelfightnight.herokuapp.com/pickAFight)  [<img src='https://github.com/krtcotmo2/pickAFight/blob/master/assets/images/fightCharts.png' width=200/>](https://marvelfightnight.herokuapp.com/pickAFight)

In this example you are supposed to be a super powered person who has lost one too many fights. You need a win so you come to our app to help pick an opponent that you match up with. You can enter in your stats based on the Marvel Comic Power rankings. I added another category to describe the fighter's reliance on gadgets and weapons. Normally the scale is from 1-7 with 1 being the worst and 7 being the best. The added category actually works in reverse where 1 in best and 7 is the worst. This forced me to handle rankings for the "Gadget Reliance" category differently. 

In addition I also allow a hero to fight a hero or a villain to fight a villain. 

The Public folder holds the html files that are used for the three main pages. Bootstrap powers the layouts

Ndoe JS and express drive the backed server functionality with the routing files in the routing folder.
The graphs are built using google charts and d3 javascript libraries. The data is in a data.js file in the data folder.

# Main Project

Here I played around with Node and Express. I was not particularly concerned about keeping persistent data so I uses a js file to store an initial array of characters and users would add to the array. Since the array was on the server side, as long as the server did not shut down, the data would persist.

Express handled the few routes I had in the application. It also handles the API's which queried the array on the server. The searches in the queries made a comparison other users overs skill point rating and that of all the people in the array. It would look to find the opponents that closely matched the score of the user. It would return all values bac to the front end in the form of an array of objects.

