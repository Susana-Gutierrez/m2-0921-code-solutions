/* exported Account */

function Account(number, holder){
  this.number = number;
  this.holder = holder;
  this.transactions = [];
}


Account.prototype.deposit = function (amount) {

  var account = new Transaction();

  if ((amount === '') || (amount <= 0) || (amount % 1 !== 0)) {
    return false;
  } else if (amount > 0) {

    account.type = 'deposit';
    account.amount = amount;

    this.transactions.push(account);
    return true;
    }
}

Account.prototype.withdraw = function (amount) {

  var account = new Transaction();

  if ((amount === '') || (amount <= 0) || (amount % 1 !== 0)) {
    return false;
  } else if (amount > 0) {
    account.type = 'withdrawal';
    account.amount = amount;
    this.transactions.push(account);
    return true;
  }
}


Account.prototype.getBalance = function () {

  var value = 0;
  for (let i = 0; i < this.transactions.length; i++){
    if (this.transactions[i].type === 'deposit') {
      value = value + this.transactions[i].amount;
    } else if (this.transactions[i].type === 'withdrawal')
      value = value - this.transactions[i].amount;
  }
  return value;
}
