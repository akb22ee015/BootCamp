var noOfButton = document.querySelectorAll(".drum").length;
for (var i = 0; i < noOfButton; i++) {
  document.querySelectorAll(".drum")[i].addEventListener("click", function () {
    // this.style.color = "white";
    var buttoninnerHTML = this.innerHTML;
    switch (buttoninnerHTML) {
      case "w":
        var tom1 = new Audio("./sounds/tom-1.mp3");
        tom1.play();
        break;
      case "a":
        var tom2 = new Audio("./sounds/tom-2.mp3");
        tom2.play();
        break;
      case "s":
        var tom3 = new Audio("./sounds/tom-3.mp3");
        tom3.play();
        break;
      case "d":
        var tom4 = new Audio("./sounds/tom-4.mp3");
        tom4.play();
        break;
      case "j":
        var audio = new Audio("./sounds/snare.mp3");
        audio.play();
        break;
      case "k":
        var kick = new Audio("./sounds/kick-bass.mp3");
        kick.play();
        break;
      case "l":
        var crash = new Audio("./sounds/crash.mp3");
        crash.play();
        break;
      default:
        console.log(buttoninnerHTML);
    }
  });
}

document.addEventListener("keypress",function(){
    alert("Key is pressed");
})