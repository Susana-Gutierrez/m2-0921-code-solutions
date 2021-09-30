/* exported Bank */

function Bank () {
  this.nextAccountNumber = 1;
  this.accounts = [];
}

Bank.prototype.openAccount = function (holder, balance) {
  if ((balance > 0) && (balance % 1 === 0)) {
    var newAccount = new Account(this.nextAccountNumber, holder);
    newAccount.deposit(balance);
    this.accounts.push(newAccount);
    this.nextAccountNumber = this.nextAccountNumber + 1;
    return newAccount.number;
  } else {
    return null;
  }
}

Bank.prototype.getAccount = function (number) {
   for (var i = 0; i < this.accounts.length; i++){
     if (this.accounts[i].number === number) {
       return this.accounts[i];
     }
   }

  return null;
}

Bank.prototype.getTotalAssets = function () {
  var total = 0;
  if (this.accounts.length === 0) {
    return 0
  } else{
    for (var i = 0; i < this.accounts.length; i++) {
      for (var j = 0; j < this.accounts[i].transactions.length; j++) {
        if (this.accounts[i].transactions[j].type === 'deposit') {
          total = total + this.accounts[i].transactions[j].amount;
        }
        if (this.accounts[i].transactions[j].type === 'withdrawal') {
          total = total - this.accounts[i].transactions[j].amount;
        }
      }
    }
    return total;
    }
  }
