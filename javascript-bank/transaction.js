/* exported Transaction */

function Transaction(type, amount){
  this.type = type;
  this.amount = amount;
}

Transaction.prototype.type = function () {
  return this.type;
}

Transaction.prototype.amount = function () {
  return this.amount;
}
