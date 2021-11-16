var express = require('express');
var gradeArray = [];

var grades = {
  12: {
    id: 12,
    name: 'Tim Berners-Lee',
    course: 'HTML',
    score: 95
  },
  47: {
    id: 47,
    name: 'Brendan Eich',
    course: 'JavaScript',
    score: 100
  },
  273: {
    id: 273,
    name: 'Forbes Lindsay',
    course: 'JavaScript',
    score: 92
  }
}

gradeArray.push(grades);
var app = express();

app.get('/api/grades', function (req, res) {
  res.json(gradeArray);
});

app.delete('/api/grades/:id', function (req, res) {
  var id = parseInt(req.params.id);
  delete grades[id];
  res.sendStatus(204);
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 3000');
});
