const express = require('express');
const path = require('path');
const fs = require('fs');

// Helper method for generating unique ids
const { v4: uuidv4 } = require('uuid');

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
  }
});
});
// POST request to add a note
app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present        
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);
        // res.json(parsedNotes);
        // Add a new note
        parsedNotes.push(newNote);
    
        // Write updated reviews back to the file
        fs.writeFile(
          './db/db.json',
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? res.json(writeErr)
              : res.json(parsedNotes)
        );
      }
    });
  };
});

// DELETE request for api notes
app.delete('/api/notes/:id', (req, res) => {

  // obtain existing notes
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // Convert string into JSON object
      const parsedNotes = JSON.parse(data);
      res.json(parsedNotes);
    // if ()
    //   res.json({msg: "Note Deleted"})
    //   parsedNotes.filter
    }
  });
  });

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);