/* exported Student */

function Student(firstName, lastName, subject) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.subject = subject;
  this.fullName = this.firstName + ' ' + this.lastName;

}

Student.prototype.getFullName = function () {
  return this.fullName;
};

Student.prototype.getIntroduction = function () {
  var introduction = 'Hello, my name is ' + this.fullName + ' and I am studying ' + this.subject + '.';
  return introduction;
}
