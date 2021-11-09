
var fs = require('fs');


var data = process.argv[process.argv.length - 1] + '\n';

fs.writeFile('note.txt', Buffer.from(data, 'utf8'), (err) => {
  if (err) throw err;
});
