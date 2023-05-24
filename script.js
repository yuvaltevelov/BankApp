class BankAccount {
    constructor(balance) {
      this.balance = balance;
    }
  
    withdraw(amount) {
      if (amount <= this.balance) {
        this.balance -= amount;
        console.log(`Withdrawn ${amount} from your account. Now you have ${this.balance}$`);
      } else {
        console.log(`You don't have enough money to withdraw ${amount}$, but you can withdraw ${this.balance}$`);
      }
    }
  
    deposit(amount) {
      this.balance += amount;
      console.log(`Deposited ${amount} to your account. Now you have ${this.balance}$`);
    }
  
    getBalance() {
      console.log(`Your account balance is: ${this.balance}$`);
    }
  
    saveBalance() {
      localStorage.setItem('accountBalance', this.balance);
      console.log('Account balance saved.');
    }
  
    static loadBalance() {
      const balance = localStorage.getItem('accountBalance');
      return balance ? new BankAccount(Number(balance)) : new BankAccount(0);
    }
  }
  
  let userBankAccount = BankAccount.loadBalance();
  
  let userChoice = prompt(`What action would you like to perform?\n
    - To see your bank account balance, type 'balance'.
    - To deposit into your bank account, type 'deposit'.
    - To withdraw from your bank account, type 'withdraw'.`);
  
  if (userChoice === 'balance') {
    userBankAccount.getBalance();
  } else if (userChoice === 'deposit') {
    const howMany = prompt('How much would you like to deposit?');
    userBankAccount.deposit(Number(howMany));
    userBankAccount.saveBalance();
  } else if (userChoice === 'withdraw') {
    const howMany = prompt('How much would you like to withdraw?');
    userBankAccount.withdraw(Number(howMany));
    userBankAccount.saveBalance();
  } else {
    console.log('Invalid choice.');
  }