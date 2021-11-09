
var fs = require('fs');

var number = Math.random();
var data = number.toString() + '\n';

fs.writeFile('random.txt', Buffer.from(data, 'utf8'), (err) => {
  if (err) throw err;
});
