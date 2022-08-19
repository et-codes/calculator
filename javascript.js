// TODO: Add keyboard support
// TODO: Comment code
// TODO: Update README.md with details on how it works

const MAX_DIGITS = 15;
const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const OPERATORS = ['mul', 'div', 'add', 'sub'];

let currentNumber = '0';
let lastNumber = '0';
let lastOperator = null;
let pressedC = false;

function initKeypad() {
  const keys = Array.from(document.getElementsByClassName('key'));
  keys.forEach(key => {
    key.addEventListener('click', handleClick);
  });
}

function setCurrentNumber(number) {
  currentNumber = number;
  display();
}

function setLastNumber(number) {
  lastNumber = number;
  display();
}

function handleClick(event) {
  const key = event.target.id;

  if (key === 'AC') {
    setLastNumber('0');
    setCurrentNumber('0');

  } else if (key === 'C') {
    pressedC = true;
    setCurrentNumber('0');

  } else if (NUMBERS.includes(key)) {
    currentNumber === '0'
      ? setCurrentNumber(key)
      : setCurrentNumber(currentNumber + key);

  } else if (key === 'dot' && !currentNumber.includes('.')) {
    setCurrentNumber(currentNumber + '.');

  } else if (key === 'sgn') {
    if (currentNumber.startsWith('-')) {
      setCurrentNumber(currentNumber.replace('-', ''));
    } else if (currentNumber !== '0') {
      setCurrentNumber('-' + currentNumber);
    }

  } else if (key === 'pct') {
    setCurrentNumber((Number(currentNumber) / 100).toString());

  } else if (OPERATORS.includes(key)) {
    if (lastOperator === null) {
      setLastNumber(currentNumber);
    } else {
      const result = operate(lastNumber, currentNumber, lastOperator);
      setLastNumber(result);
    }
    setCurrentNumber('0');
    lastOperator = key;

  } else if (key === 'eq') {
    const result = operate(lastNumber, currentNumber, lastOperator);
    setLastNumber('0');
    setCurrentNumber(result);
    lastOperator = null;
  }
}

function display() {
  const display = document.getElementById('display');

  if (pressedC) {
    number = '0';
    pressedC = false;
  } else {
    number = currentNumber !== '0' ? currentNumber : lastNumber;
  }

  let displayedNumber;
  const numberParts = number.split('.');
  if (numberParts[0].length >= MAX_DIGITS) {
    // If number left of decimal exceeds screen length, use exponential
    displayedNumber = Number(number).toExponential(MAX_DIGITS - 6);
  } else if (number.length >= MAX_DIGITS && numberParts[1]) {
    // If total length is too long, but not left of decimal, round off
    displayedNumber = Number(number).toFixed(MAX_DIGITS - numberParts[0].length - 1);
  } else {
    displayedNumber = number;
  }

  display.textContent = displayedNumber;
}

function operate(a, b, op) {
  a = Number(a);
  b = Number(b);
  switch (op) {
    case 'add':
      return String(a + b);
    case 'sub':
      return String(a - b);
    case 'mul':
      return String(a * b);
    case 'div':
      return String(a / b);
  }
}

function app() {
  setCurrentNumber('0');
  initKeypad();
}

app();