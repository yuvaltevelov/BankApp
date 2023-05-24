document.addEventListener('DOMContentLoaded', () => {
  // Defines the BankAccount class
  class BankAccount {
      constructor(balance) {
          this.balance = balance;
      }
  
      // Method to handle withdrawal of money
      withdraw(amount) {
          if (amount <= this.balance) {
              this.balance -= amount;
              displayOutput(`Withdrawn ${amount} from your account. Now you have ${this.balance}$`);
              console.log('User has successfully withdrawn money. [amount:', amount,']');
            } else {
              displayOutput(`You don't have enough money to withdraw ${amount}$, but you can withdraw ${this.balance}$`);
              console.log('User attempted to withdraw more than the available balance. [Tried amount of:', amount, '');
          }
      }
  
      // Method to handle depositing money
      deposit(amount) {
          this.balance += amount;
          displayOutput(`Deposited ${amount} to your account. Now you have ${this.balance}$`);
          console.log('User has successfully deposited money. [Amount of deposit:',amount,'\nCurrent balance:', this.balance,']');
      }
  
      // Method to display current balance
      getBalance() {
          displayOutput(`Your account balance is: ${this.balance}$`);
          console.log('User checked their account balance.');
        }
  
      // Method to save balance in localStorage
      saveBalance() {
          localStorage.setItem('accountBalance', this.balance);
          console.log('Account balance saved.');
      }
  }

  // Instantiate user bank account
  const userBankAccount = new BankAccount(0);

  // Grab required DOM elements
  const actionSelect = document.getElementById('action');
  const amountContainer = document.getElementById('amount');
  const amountInput = document.getElementById('amountInput');
  const submitBtn = document.getElementById('submitBtn');
  const output = document.getElementById('output');

  function displayOutput(message) {
    const output = document.getElementById('output');
    output.textContent = message;
    output.classList.remove('hidden');
    // output.style.opacity = 0;
  
    // Trigger the fade-in animation
    output.style.animation = 'fadeIn 1.2s forwards';
  
    // Clear the animation after it finishes
    setTimeout(() => {
      output.style.animation = '';
    }, 1000);
  }

  // Function to load balance from localStorage
  function loadBalance() {
      const balance = localStorage.getItem('accountBalance');
      if (balance) {
          userBankAccount.balance = Number(balance);
      }
  }

  // Load balance when page loads
  loadBalance();

  // Handle change of action
  actionSelect.addEventListener('change', () => {
      const selectedAction = actionSelect.value;
      if (selectedAction === 'balance') {
          amountContainer.classList.add('hidden');
      } else {
          amountContainer.classList.remove('hidden');
      }
  });

  // Handle click of submit button
  submitBtn.addEventListener('click', (event) => {
      event.preventDefault();
  
      const selectedAction = actionSelect.value;
      if (selectedAction === 'balance') {
          userBankAccount.getBalance();
      } else if (selectedAction === 'deposit') {
          const amount = Number(amountInput.value);
          if (isNaN(amount)) {
              displayOutput('Please enter a valid amount.');
              console.log('User attempted to deposit an invalid amount.');
              return;
          }
          userBankAccount.deposit(amount);
          userBankAccount.saveBalance();
      } else if (selectedAction === 'withdraw') {
          const amount = Number(amountInput.value);
          if (isNaN(amount)) {
              displayOutput('Please enter a valid amount.');
              console.log('User attempted to withdraw an invalid amount.');
              return;
          }
          userBankAccount.withdraw(amount);
          userBankAccount.saveBalance();
      }
  });
});
