
var count = 3;
let inIntervId;

function stopInterval () {
  clearInterval(inIntervId);
  inIntervId = null;
}

inIntervId = setInterval(() => {
  if (count === 0) {
    console.log ('Blast off');
    stopInterval();
  } else {
    console.log(count);
    count--;
  }
}, 1000);
