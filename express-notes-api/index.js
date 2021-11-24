
var express = require('express');
var app = express();
var filedata = require('./data.json');
var fs = require('fs');
const { restart } = require('nodemon');

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Express server listening on port 3000');
});

/*** errors */

function error400PositiveInteger (res) {
  res.status(400);
  res.json({ "error": "id must be a positive integer" });
}

function error404CantFindID(res, id) {
  res.status(404);
  res.json({ "error": `cannot find note with id ${id}` });
}

function error404ContentRequiredField (res) {
  res.status(400);
  res.json({ "error": "content is a required field" });
}

function unexpectedError500 (res) {
  res.status(500);
  res.json({ "error": "An unexpected error occurred." });
}


/*** Clients can GET a list of notes */

app.get('/api/notes', function (req, res) {
  var arrayNotes = [];
  for (const value in filedata.notes){
    arrayNotes.push(filedata.notes[value]);
  }
  res.json(arrayNotes);
});

/** Clients can GET a single note by id */

app.get('/api/notes/:id', function (req, res) {
  var isThereANote = false;
  var id = parseInt(req.params.id);

  if (Number.isNaN(id)) {
    error400PositiveInteger(res);
  } else {
    for (const value in filedata.notes) {
      if (filedata.notes[value].id === id) {
        res.json(filedata.notes[value]);
        isThereANote = true;
        break;
      }
    }
    if (isThereANote === false) {
      error404CantFindID(res, id);
    }
  }
});

/***  Clients can POST a new note */

app.use(express.json());
app.post('/api/notes', function (req, res) {

  if (req.body.content === undefined) {
    error404ContentRequiredField(res);
  } else {
    var id = filedata.nextId;
    filedata.notes[id] = req.body;
    filedata.notes[id].id = id;
    fs.writeFile('data.json', JSON.stringify(filedata, null, 2), 'utf8', (err) => {
      if (err) {
        unexpectedError500(res);
      } else {
        res.status(201);
        res.json(filedata.notes[id]);
      }
    });
    filedata.nextId = filedata.nextId + 1;
  }
});

/*** Clients can DELETE a note by id */

app.delete('/api/notes', function (req, res) {
  error400PositiveInteger(res);
});

app.delete('/api/notes/:id', function (req, res) {
  isThereANote = false;
  var id = parseInt(req.params.id);
  if (Number.isNaN(id)) {
    error400PositiveInteger(res);
  } else {
    for (const value in filedata.notes) {
      if (filedata.notes[value].id === id) {
        delete filedata.notes[value];
        fs.writeFile('data.json', JSON.stringify(filedata, null, 2), 'utf8', (err) => {
          if (err) {
            unexpectedError500(res);
          } else {
            res.sendStatus(204);
          }
        });
        isThereANote = true;
        break;
      }
    }
    if (isThereANote === false) {
      error404CantFindID(res, id);
    }
  }
});

/*** Clients can replace a not PUT by id */

app.put('/api/notes', function (req, res) {
  error400PositiveInteger(res);
});


app.put('/api/notes/:id', function (req, res) {
  isThereANote = false;
  var id = parseInt(req.params.id);
  var content = req.body.content;

  if (Number.isNaN(id)) {
    error400PositiveInteger(res);
  } else if (content === undefined) {
    error404ContentRequiredField(res);
  } else {
    for (const value in filedata.notes) {
      if (filedata.notes[value].id === id) {
        filedata.notes[value].content = content;
        fs.writeFile('data.json', JSON.stringify(filedata, null, 2), 'utf8', (err) => {
          if (err) {
            unexpectedError500(res);
          } else {
            res.json(filedata.notes[id]);
          }
        });
        isThereANote = true;
        break;
      }
    }
    if (isThereANote === false) {
      error404CantFindID(res, id);
    }
  }
});
