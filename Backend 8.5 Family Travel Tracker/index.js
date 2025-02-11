import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

// Database connection
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "akb22ee015311",
  port: 5432,
});
db.connect();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Current user ID
let currentUserId = 1;

// Function to get visited countries for the current user
async function checkVisited() {
  const result = await db.query(
    "SELECT country_code FROM visited_countries WHERE user_id = $1;",
    [currentUserId]
  );
  return result.rows.map((row) => row.country_code);
}

// Function to fetch the current user from the database
async function getCurrentUser() {
  const result = await db.query("SELECT * FROM users WHERE id = $1;", [
    currentUserId,
  ]);
  return result.rows[0] || null;
}

// Route: Home
app.get("/", async (req, res) => {
  try {
    const countries = await checkVisited();
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      res.status(404).send(
        "Current user not found. Please select a valid user or create a new one."
      );
      return;
    }

    const users = (await db.query("SELECT * FROM users;")).rows;

    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      color: currentUser.color,
      error: null,
    });
  } catch (err) {
    console.error("Error in GET /:", err);
    res.status(500).send("An error occurred. Please try again later.");
  }
});

// Route: Add a visited country
app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      res.status(404).send("Current user not found. Please select a valid user.");
      return;
    }

    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    if (result.rows.length === 0) {
      const countries = await checkVisited();
      const users = (await db.query("SELECT * FROM users;")).rows;

      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        users: users,
        color: currentUser.color,
        error: "Country not found. Please try again.",
      });
      return;
    }

    const countryCode = result.rows[0].country_code;

    await db.query(
      "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
      [countryCode, currentUserId]
    );
    res.redirect("/");
  } catch (err) {
    console.error("Error in POST /add:", err);
    res.status(500).send("An error occurred. Please try again later.");
  }
});

// Route: Change or add a new user
app.post("/user", async (req, res) => {
  if (req.body.add === "new") {
    res.render("new.ejs");
  } else {
    currentUserId = parseInt(req.body.user, 10);
    res.redirect("/");
  }
});

// Route: Add a new user
app.post("/new", async (req, res) => {
  const name = req.body.name;
  const color = req.body.color;

  try {
    const result = await db.query(
      "INSERT INTO users (name, color) VALUES($1, $2) RETURNING *;",
      [name, color]
    );
    currentUserId = result.rows[0].id;
    res.redirect("/");
  } catch (err) {
    console.error("Error in POST /new:", err);
    res.status(500).send("Failed to add new user. Please try again.");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
