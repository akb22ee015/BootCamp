import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "akb22ee015311",
  port: 5432,
});

db.connect().catch((err) =>
  console.error("Error connecting to the database", err)
);

let quiz = [];
let totalCorrect = 0;
let currentQuestion = {};

// Fetch quiz data from the database
async function fetchQuizData() {
  try {
    const res = await db.query("SELECT * FROM capitals");
    quiz = res.rows; // Populate `quiz` with the result rows
  } catch (err) {
    console.error("Error executing query", err.stack);
  }
}

// Fetch the next question
function nextQuestion() {
  if (quiz.length > 0) {
    currentQuestion = quiz[Math.floor(Math.random() * quiz.length)];
  } else {
    currentQuestion = { country: "No data", capital: "" }; // Fallback
  }
}

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET home page
app.get("/", async (req, res) => {
  totalCorrect = 0;
  nextQuestion();
  res.render("index.ejs", { question: currentQuestion });
});

// POST to submit an answer
app.post("/submit", (req, res) => {
  const answer = req.body.answer.trim();
  let isCorrect = false;

  if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    isCorrect = true;
  }

  nextQuestion();
  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

// Start the server after fetching quiz data
app.listen(port, async () => {
  await fetchQuizData(); // Ensure `quiz` is populated before handling requests
  console.log(`Server is running at http://localhost:${port}`);
});
