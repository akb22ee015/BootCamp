import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const today = new Date("January 12, 2025 11:13:07");
  let day = today.getDay();

//   console.log(day);

  let type = "a weekday";
  let adv = "Its time to work hard";

  if (day === 0 || day === 6) {
    type = "a weekend";
    adv = "Its time for party";
  }
  res.render("index.ejs", {
    dayType: type,
    advice: adv,
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
