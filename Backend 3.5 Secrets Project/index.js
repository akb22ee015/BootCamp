//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 3000;

var userFound = false;

app.use(bodyParser.urlencoded({ extended: true }));

function checkPassword(req, res, next) {
  const password = req.body["password"];
  if (password === "ILoveProgramming") {
    userFound = true;
  }
  next();
}

app.use(checkPassword);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
  if (userFound) {
    res.sendFile(__dirname + "/public/secret.html");
    userFound = false;
  } else {
    res.redirect("/");
    // res.sendFile(__dirname + "/public/index.html");
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
