
var $userList = document.querySelector('#user-list');

function listUser(user){

  var elementLi = document.createElement('li');
  elementLi.textContent = user;
  return (elementLi);

}

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  console.log(xhr.status);
  console.log(xhr.response);

  for (var user in xhr.response){
    var nameOfUser = xhr.response[user].name
    $userList.appendChild(listUser(xhr.response[user].name));
  }
});

xhr.send();
