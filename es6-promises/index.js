const takeAChance = require('./take-a-chance');
var promiseVar = takeAChance('Susie');


promiseVar.then(function(value) {
  console.log(value);
}).catch (function(e) {
  console.log(e.message);
});
