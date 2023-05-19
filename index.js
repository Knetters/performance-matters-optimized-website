// Import the required modules.
import express from "express";
import fetch from "node-fetch";
import { createServer } from "http";
import { Server } from "socket.io";

// Create a new Express app.
const app = express();
const server = createServer(app);
const io = new Server(server);

// The API URLs.
const apiUrl = "https://raw.githubusercontent.com/fdnd-agency/ultitv/main/ultitv-api";
const postUrl = "https://api.ultitv.fdnd.nl/api/v1/players?first=100";
const urls = [
  `${apiUrl}/game/943.json`,
  `${apiUrl}/game/943/statistics.json`,
  `${apiUrl}/facts/Player/8607.json`,
  postUrl,
  `${apiUrl}/api/v1/questions`
];

// Set EJS as the template engine and specify the views directory.
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory.
app.use(express.static("public"));

// Create a route for the index page.
app.get('/', async function (request, response) {
  // Fetch the data from the API.
  const data = await fetchData();

  // Render the index page with the data from the API.
  response.render('index', { ...data, active: '/' });
});

// Create a route for the loading page.
app.get('/loading', async function (request, response) {
  // Fetch the data from the API.
  const data = await fetchData();

  response.render('loading', { ...data, active: '/' });
});

// Create a route for the styleguide page.
app.get('/styleguide', async function (request, response) {
  // Fetch the data from the API.
  const data = await fetchData();

  response.render('styleguide', { ...data, active: '/' });
});

// Socket.IO logic
io.on("connection", (socket) => {
  console.log("A user connected!");

  // Listen for the player score event
  socket.on("playerScore", (score) => {
    console.log("Player score data:", score); // Log the data being sent

    // Emit the player score to all connected clients
    io.emit("scoreUpdate", score);
  });

  // Disconnect event
  socket.on("disconnect", () => {
    console.log("A user disconnected!");
  });
});

// Create a route for the stats page.
app.get("/stats", async function (request, response) {
  // Fetch the data from the API.
  const data = await fetchData();

  // Render the stats page with the data from the API.
  response.render("stats", { ...data, active: "/stats" });
});

// Handle form submission
app.post('/newPlayer', async function (request, response) {
  // Extract the form data from the request body
  const { playerScored } = request.body;

  // Emit the player score to all connected clients
  io.emit("scoreUpdate", playerScored);

  // Redirect the user to the stats route
  response.redirect('/stats');
});

// Fetch data from the API
async function fetchData() {
  const [data1, data2, data3, data4, data5] = await Promise.all(urls.map(fetchJson));
  return { data1, data2, data3, data4, data5 };
}

// Set the port number and start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("Application available on: http://localhost:" + port);
});

// Wait until the data exists and fetches the data.
async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error);
}

// Wait untill the data exists and posts the data. 
export async function postJson(url, body) {
  return await fetch(url, {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .catch((error) => error)
}