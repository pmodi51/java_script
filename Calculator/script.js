// Select DOM elements
const screen = document.getElementById('screen');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';
let operator = '';
let firstOperand = '';
let secondOperand = '';

// Handle button clicks
buttons.forEach(button => {
  button.addEventListener('click', function() {
    const value = button.getAttribute('data-value');
    
    // Handle the input buttons
    if (!isNaN(value) || value === '.') {
      currentInput += value;
      screen.value = currentInput;
    }
    
    // Handle operators
    else if (value === '+' || value === '-' || value === '*' || value === '/') {
      if (firstOperand === '') {
        firstOperand = currentInput;
        operator = value;
        currentInput = '';
      } else {
        secondOperand = currentInput;
        firstOperand = calculate(firstOperand, operator, secondOperand);
        operator = value;
        currentInput = '';
      }
    }

    // Handle clear button
    else if (value === 'C') {
      currentInput = '';
      firstOperand = '';
      secondOperand = '';
      operator = '';
      screen.value = '';
    }

    // Handle equals button
    else if (value === '=') {
      if (firstOperand !== '' && currentInput !== '') {
        secondOperand = currentInput;
        currentInput = calculate(firstOperand, operator, secondOperand);
        screen.value = currentInput;
        firstOperand = '';
        secondOperand = '';
        operator = '';
      }
    }
  });
});

// Function to calculate the result
function calculate(first, operator, second) {
  first = parseFloat(first);
  second = parseFloat(second);

  switch (operator) {
    case '+':
      return first + second;
    case '-':
      return first - second;
    case '*':
      return first * second;
    case '/':
      if (second === 0) {
        return 'Error';
      }
      return first / second;
    default:
      return second;
  }
}
