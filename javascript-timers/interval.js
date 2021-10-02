
var h1 = document.querySelector('h1');
var i = 4;

var intervalID;

function stopCounting(interval){
  clearInterval(interval);
  intervalID = null;
}

if (!intervalID){
  intervalID = setInterval(function (){
    i = i - 1;
    h1.textContent = i;
    if (i === 0) {
      h1.textContent = '~Earth Beeeelooowww Us~';
      stopCounting(intervalID);
    }
  }, 1000);
}
