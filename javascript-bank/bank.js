/* exported Bank */

function Bank () {
  this.nextAccountNumber = 1;
  this.accounts = [];
}

Bank.prototype.openAccount = function (holder, balance) {

  var account = new Account(this.nextAccountNumber, holder);
  if ((balance > 0) && (balance % 1 === 0)) {
    account.deposit(balance);
    this.accounts.push(account);
    this.nextAccountNumber = this.nextAccountNumber + 1;
    return account.number;
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
  for (var i in this.accounts){
    total = total + this.accounts[i].getBalance();
  }
  return total;

}
