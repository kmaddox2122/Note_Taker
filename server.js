const express = require('express');
const path = require('path');
const fs = require('fs');

// Helper method for generating unique ids
const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//* `GET /notes` should return the `notes.html` file.
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//* `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
// GET request for api notes
app.get('/api/notes', (req, res) => {

// obtain existing notes
fs.readFile('./db/db.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    // Convert string into JSON object
    const parsedNotes = JSON.parse(data);
    res.json(parsedNotes);
    // Add a new review
    // parsedNotes.push(newNote);

    // // Write updated reviews back to the file
    // fs.writeFile(
    //   './db/db.json',
    //   JSON.stringify(parsedNotes, null, 4),
    //   (writeErr) =>
    //     writeErr
    //       ? console.error(writeErr)
    //       : console.info('Successfully updated notes!')
    // );
  }
});
});
// POST request to add a note
app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);

  // Destructuring assignment for the items in req.body
  const { product, review, username } = req.body;

  // If all the required properties are present         //syntax error and need to rename vars, etc.
  if (product && review && username) {
    // Variable for the object we will save
    const newReview = {
      product,
      review,
      username,
      review_id: uuid(),
    };
  };
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);