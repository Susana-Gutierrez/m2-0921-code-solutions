
var $picture = document.querySelector('.picture');
var $faCircle = document.getElementsByClassName('fa-circle');
var $faCircleSelector = document.querySelector('.progress-dot');
var $faAngleLeft = document.querySelector('.fa-angle-left');
var $faAngleRight = document.querySelector('.fa-angle-right');
var intervalID;

function startCarousel(index){

  var i = index;

  if (!intervalID) {
    intervalID = setInterval(function(){
    i = i + 1;
    if (i === $faCircle.length) {
      i = 0;
        $faCircle[$faCircle.length-1].className = 'far fa-circle';
    }
    $picture.src = 'images/00' + i + '.png';
    $faCircle[i].className = 'fas fa-circle';
    if (i !== 0) {
      $faCircle[i - 1].className = 'far fa-circle';
    }
   }, 3000);
  }
}


function stopCounting(interval, index) {
  clearInterval(interval);
  intervalID = null;
  startCarousel(index);
}



function handleClickCircleSelector(){

  if (event.target.matches('.fa-circle')){
    var dataView = event.target.getAttribute('data-view');
    $picture.src = 'images/00' + dataView + '.png';

    for (var i = 0; i < $faCircle.length; i++) {
      $faCircle[i].className = 'far fa-circle';
    }
    $faCircle[parseInt(dataView)].className = 'fas fa-circle';
    var index = parseInt(dataView);
    stopCounting(intervalID, index);
  }

}

$faCircleSelector.addEventListener('click', handleClickCircleSelector);

function handleClickFaAngleLeft(){

  for (var i = 0; i < $faCircle.length; i++){
    if ($faCircle[i].className === 'fas fa-circle'){
      $faCircle[i].className = 'far fa-circle';
      if (i !== 0) {
        $faCircle[i - 1].className = 'fas fa-circle';
        $picture.src = 'images/00' + (i - 1) + '.png';
        stopCounting(intervalID, i - 1);
      } else {
        $faCircle[$faCircle.length - 1].className = 'fas fa-circle';
        $picture.src = 'images/00' + ($faCircle.length - 1) + '.png';
        stopCounting(intervalID, $faCircle.length - 1);
      }

      break;
    }
  }
}


$faAngleLeft.addEventListener('click', handleClickFaAngleLeft);


function handleClickFaAngleRight() {

  for (var i = 0; i < $faCircle.length; i++) {
    if ($faCircle[i].className === 'fas fa-circle') {
      $faCircle[i].className = 'far fa-circle';
      if (i !== $faCircle.length - 1) {
        $faCircle[i + 1].className = 'fas fa-circle';
        $picture.src = 'images/00' + (i + 1) + '.png';
        stopCounting(intervalID, i + 1);
      } else {
        $faCircle[0].className = 'fas fa-circle';
        $picture.src = 'images/00' + 0 + '.png';
        stopCounting(intervalID, 0);
      }

      break;
    }
  }
}

$faAngleRight.addEventListener('click', handleClickFaAngleRight);


function handleDOMContentLoaded(event) {
  var i = 0;
  startCarousel(i);
}

window.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
