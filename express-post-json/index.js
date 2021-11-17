var express = require('express');
var app = express();

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Express server listening on port 3000');
});

var nextId = 1;
var grades = {};
var gradeArray = [];

app.get('/api/grades', function (req, res) {
  res.json(gradeArray);
});

app.use(express.json());

app.post('/api/grades', function (req, res) {
  grades.id = nextId;
  grades.name = req.body.name;
  grades.course = req.body.course;
  grades.score = req.body.score;
  gradeArray.push(grades);
  nextId++;


  res.status(201);
  res.json(grades);

  grades = {};

});
