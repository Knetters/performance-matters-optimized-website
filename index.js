// Import the required modules.
import express from "express";
import fetch from "node-fetch";

// Create a new Express app.
const app = express();

// The API's.
const url = "https://raw.githubusercontent.com/fdnd-agency/ultitv/main/ultitv-api";

const postUrl = "https://api.ultitv.fdnd.nl/api/v1/players?first=100";
const apiUrl = "https://api.ultitv.fdnd.nl/api/v1/questions";

// All different url's for the API.
const urls = [
  url + "/game/943.json",
  url + "/game/943/statistics.json",
  url + "/facts/Player/8607.json",
  postUrl,
  apiUrl
];

// Wait for all the data to load and map it.
const [data1, data2, data3, data4, data5] = await Promise.all(urls.map(fetchJson));
// Combine the url into one data type to send in the view.
const data = {data1, data2, data3, data4, data5};

// Set EJS as the template engine and specify the views directory.
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files from the public directory
app.use(express.static("public"));


// Create a route for the index page
app.get('/', async function (request, response) {
  // render the index page with the data from the API
  response.render('index', data);

});
console.log(data2);

// Create a route for the player info page
app.get('/playerInfo/:id', (request, response) => {
  // Define the player id
  let playerId = request.params.id;
  // Make a url with the player id
  let playerInfoUrl = url + 'facts/Player/' + playerId + '.json';
  // Fetch the data from the player.
  fetchJson(playerInfoUrl).then((data) => {
    // Render the playerInfo and the data.
    response.render('playerInfo', {data: data});
  });
});

// Create a route for the index page
app.get('/stats', async function (request, response) {
  // Render the stats with the data.
  response.render('stats', data);
});

// Create a route for the styleguide page
app.get('/styleguide', async function (request, response) {
  response.render('styleguide');
});

// Create a route for the index page
app.get('/teams', async function (request, response) {
  // Fetch the data from the API
  const [data1, data2, data3, data4, data5] = await Promise.all(urls.map(fetchJson));
  const data = { data1, data2, data3, data4, data5 };
  
  // Render the teams with the data.
  response.render('teams', data);
});

// Handle form submission
app.post('/newPlayer', async function (request, response) {
  // Extract the form data from the request body
  const { name, gender, jerseyNumber, image, team, question, content } = request.body;

  // Construct the request body in the desired format
  const requestBody = {
    "name": name,
    "gender": gender,
    "jerseyNumber": jerseyNumber,
    "image": image,
    "team": team,
    "answers": [
      {
        "content": content,
        "questionId": question
      }
    ]
  };

  // Make a POST request to the API endpoint
  const postResponse = await fetch(postUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  // Wait for the post request to complete before fetching the updated data
  await postResponse.json();

  // Continuously poll the API until the data is updated
  const pollInterval = 2000; // in milliseconds
  let isDataUpdated = false;
  while (!isDataUpdated) {
    // Fetch the data from the API
    const [newData1, newData2, newData3, newData4, newData5] = await Promise.all(urls.map(fetchJson));
    const newData = { data1: newData1, data2: newData2, data3: newData3, data4: newData4, data5: newData5 };
    
    // Check if the data has been updated
    if (JSON.stringify(newData) !== JSON.stringify(data)) {
      // Update the data and set the flag to indicate that the data has been updated
      data.data1 = newData.data1;
      data.data2 = newData.data2;
      data.data3 = newData.data3;
      data.data4 = newData.data4;
      data.data5 = newData.data5;
      isDataUpdated = true;
    } else {
      // Wait for some time before polling again
      await new Promise(resolve => setTimeout(resolve, pollInterval));
    }
  }

  // Render the updated data
  response.render('teams', data);
});

// -------------------- Start local host ---------------------

// Set the port number and start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`

  ░██████╗███████╗██████╗░██╗░░░██╗███████╗██████╗░  ██████╗░███████╗░█████╗░██████╗░██╗░░░██╗
  ██╔════╝██╔════╝██╔══██╗██║░░░██║██╔════╝██╔══██╗  ██╔══██╗██╔════╝██╔══██╗██╔══██╗╚██╗░██╔╝
  ╚█████╗░█████╗░░██████╔╝╚██╗░██╔╝█████╗░░██████╔╝  ██████╔╝█████╗░░███████║██║░░██║░╚████╔╝░
  ░╚═══██╗██╔══╝░░██╔══██╗░╚████╔╝░██╔══╝░░██╔══██╗  ██╔══██╗██╔══╝░░██╔══██║██║░░██║░░╚██╔╝░░
  ██████╔╝███████╗██║░░██║░░╚██╔╝░░███████╗██║░░██║  ██║░░██║███████╗██║░░██║██████╔╝░░░██║░░░
  ╚═════╝░╚══════╝╚═╝░░╚═╝░░░╚═╝░░░╚══════╝╚═╝░░╚═╝  ╚═╝░░╚═╝╚══════╝╚═╝░░╚═╝╚═════╝░░░░╚═╝░░░
  (Geen error Sanne!)
  
  Application available on: http://localhost:${port}
  `);
});

// Wait untill the data exists end fetches the data.
async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error)
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