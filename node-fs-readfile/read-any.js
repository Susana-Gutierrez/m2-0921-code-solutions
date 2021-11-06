
var fs = require('fs');
var file = process.argv[process.argv.length - 1];

fs.readFile(file, 'utf8', (err, data) => {
  console.log(data);
});
