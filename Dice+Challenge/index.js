var randomNumber1 = Math.floor(Math.random() * 6 + 1);
// console.log(randomNumber1);
var randomNumberDice = "dice" + randomNumber1 + ".png";

var randomImage = "./images/" + randomNumberDice;

var image1 = document.querySelectorAll("img")[0];

image1.setAttribute("src", randomImage);

var randomNumber2 = Math.floor(Math.random() * 6) + 1;

var randomNumberDice2 = "dice" + randomNumber2 + ".png";

var randomImage2 = "./images/" + randomNumberDice2;

var image2 = document.querySelectorAll("img")[1];

image2.setAttribute("src", randomImage2);

if (randomNumber1 > randomNumber2) {
  document.querySelector("h1").innerHTML = "🚩Player 1 Wins";
} else if (randomNumber1 < randomNumber2) {
  document.querySelector("h1").innerHTML = "🚩Player 2 Wins";
} else {
  document.querySelector("h1").innerHTML = "Game Tie";
}
