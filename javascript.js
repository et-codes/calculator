const DIGITS = 15;

function display(number) {
  const display = document.getElementById('display');
  const length = parseInt(number).toString().length;

  let displayedNumber = 0;
  if (length > DIGITS) {
    displayedNumber = number.toExponential(DIGITS - 6);
  } else if (number % parseInt(number) !== 0) {
    displayedNumber = number.toFixed(DIGITS - length - 1);
  } else {
    displayedNumber = number.toString();
  }

  display.textContent = displayedNumber;
}

function operate(a, b, op) {
  switch (op) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return a / b;
  }
}

display(123456789122345.123234345);