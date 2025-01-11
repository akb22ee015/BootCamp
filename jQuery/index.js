$("h1").addClass("big-title margin-50");

$("h1").hasClass("margin-50");

$("h1").text("Bye");
$("button").html("<em>Hye</em>");

$("a").attr("href", "https://www.instagram.com");

// for (var i = 0; i < 4; i++) {
//   document.querySelectorAll("button")[i].addEventListener("click", function () {
//     document.querySelector("h1").style.color = "purple";
//   });
// }

$("button").click(function () {
  $("h1").css("color", "purple");
});

$("input").keypress(function (event) {
  $("h1").text(event.key);
});
