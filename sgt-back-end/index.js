var express = require('express');
var app = express();

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 3000');
});


const pg = require('pg');
const db = new pg.Pool({
  connectionString: 'postgres://dev:dev@localhost/studentGradeTable',
  ssl: {
    rejectUnauthorized: false
  }
});

app.get('/api/grades', (req, res, next) => {

  const sql = `
    select *
      from "grades"
  `;

  db.query(sql)
    .then(result => {
      const grade = result.rows;
      if (!grade) {
        res.status(404).json({
          error: `Cannot find grade with "gradeId" ${gradeId}`
        });
      } else {
        res.json(grade);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: `An unexpected error occurred.`
      });
    });
});


app.get('/api/grades/:gradeId', (req, res, next) => {
  const gradeId = Number(req.params.gradeId);
  if (!Number.isInteger(gradeId) || gradeId <= 0) {
    res.status(400).json({
      error: `"gradeId" must be a positive integer`
    });
    return;
  }

  const sql = `
    select "gradeId",
           "name",
           "course",
           "score",
           "createdAt"
      from "grades"
     where "gradeId" = $1
  `;

  const params = [gradeId];

  db.query(sql, params)
    .then(result => {
      const grade = result.rows[0];
      if (!grade) {
        res.status(404).json({
          error: `Cannot find grade with "gradeId" ${gradeId}`
        });
      } else {
        res.json(grade);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: `An unexpected error occurred.`
      });
    });
});

/***** POST */

app.use(express.json());
app.post('/api/grades', function (req, res) {

  let goodEntry = true;
  const name = req.body.name;
  const course = req.body.course;
  const score = Number(req.body.score);
  let errorMessage = '';


  if ((req.body.name === '') || (req.body.name === undefined)) {
    goodEntry = false;
    errorMessage = `Missing or invalid name`;
  } else if ((req.body.course === '') || (req.body.course === undefined)) {
    goodEntry = false;
    errorMessage = `Missing or invalid course`;
  } else if ((req.body.score === '') || (req.body.score === undefined)) {
    goodEntry = false;
    errorMessage = `Missing or invalid score`;
  } else if ((!Number.isInteger(score) || score < 0 || score > 100)) {
    goodEntry = false;
    errorMessage = `Score isn't an integer from 0 to 100`;
  }

  if (goodEntry === true ) {
    const sql = `
       insert into "grades" ("name", "course", "score")
       values ($1, $2, $3)
       returning *`;

    const params = [name, course, score];

    db.query(sql, params)
      .then(result => {
        const grade = result.rows[0];
        res.status(201);
        res.json (grade);
      })
      .catch( err => {
        console.error(err);
        res.status(500).json({
        error: `An unexpected error occurred.`
      });
    });
  } else {
    res.status(400).json({
      error: errorMessage});
  }
});

/**** PUT ** */


app.put('/api/grades/:gradeId', function (req, res) {


  const gradeId = Number(req.params.gradeId);
  if (!Number.isInteger(gradeId) || gradeId <= 0) {
    res.status(400).json({
      error: `"gradeId" must be a positive integer`
    });

  } else {

    let goodEntry = true;
    const name = req.body.name;
    const course = req.body.course;
    const score = Number(req.body.score);


    if ((req.body.name === '') || (req.body.name === undefined)) {
      goodEntry = false;
      errorMessage = `Missing or invalid name`;
    } else if ((req.body.course === '') || (req.body.course === undefined)) {
      goodEntry = false;
      errorMessage = `Missing or invalid course`;
    } else if ((req.body.score === '') || (req.body.score === undefined)) {
      goodEntry = false;
      errorMessage = `Missing or invalid score`;
    } else if ((!Number.isInteger(score) || score < 0 || score > 100)) {
      goodEntry = false;
      errorMessage = `Score isn't an integer from 0 to 100`;
    }


    if (goodEntry === true) {

      const sql = `update "grades"
      set "name" = $2,
          "course" = $3,
          "score" = $4
      where "gradeId" = $1
      returning *`;

      const params = [gradeId, name, course, score];

      db.query(sql, params)
        .then(result => {
          const grade = result.rows[0];

          if (!grade) {
            res.status(404).json({
              error: `Cannot find grade with "gradeId" ${gradeId}`
            });
          } else {
            res.status(200);
            res.json(grade);
          }
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({
            error: `An unexpected error occurred.`
          });
        });
    } else {
      res.status(400).json({
        error: errorMessage
      });
    }
  }
});


/***** DELETE ****/


app.delete('/api/grades/:gradeId', function (req, res) {

  const gradeId = Number(req.params.gradeId);
  if (!Number.isInteger(gradeId) || gradeId <= 0) {
    res.status(400).json({
      error: `"gradeId" must be a positive integer`
    });

  } else {

      const sql = `delete from "grades"
      where "gradeId" = $1
      returning *`;

      const params = [gradeId];

      db.query(sql, params)
        .then(result => {
          const grade = result.rows[0];
          if (!grade) {
            res.status(404).json({
              error: `Cannot find grade with "gradeId" ${gradeId}`
            });
          } else {
            res.status(204);
            res.json(grade);
          }
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({
            error: `An unexpected error occurred.`
          });
        });

  }
});
