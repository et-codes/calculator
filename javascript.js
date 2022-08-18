const MAX_DIGITS = 15;
const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const OPERATORS = ['mul', 'div', 'add', 'sub'];

let currentNumber = '0';
let lastNumber = '0';
let rightOfDecimal = false;
let operatorPressed = false;
let lastOperator = 'add';

function initKeypad() {
  const keys = Array.from(document.getElementsByClassName('key'));
  keys.forEach(key => {
    key.addEventListener('click', handleClick);
  });
}

function setCurrentNumber(number) {
  if (operatorPressed) {
    display(lastNumber);
    currentNumber = '0';
    operatorPressed = false;
  } else {
    currentNumber = number;
    display(currentNumber);
  }
  console.log(`current: ${currentNumber} last: ${lastNumber} op pressed: ${operatorPressed}`);
}

function setLastNumber(number) {
  lastNumber = number;
  console.log(`current: ${currentNumber} last: ${lastNumber} op pressed: ${operatorPressed}`);
}

function handleClick(event) {
  const key = event.target.id;
  // console.log(`key: ${key}`);
  if (key === 'AC') {
    setCurrentNumber('0');
    setLastNumber('0');
  } else if (key === 'C') {
    setCurrentNumber('0');
  } else if (NUMBERS.includes(key)) {
    currentNumber === '0'
      ? setCurrentNumber(key)
      : setCurrentNumber(currentNumber + key);
  } else if (key === 'dot') {
    setCurrentNumber(currentNumber + '.');
  } else if (OPERATORS.includes(key)) {
    operatorPressed = true;
    lastOperator = key;
    if (lastNumber === '0') {
      setLastNumber(currentNumber);
    } else {
      const result = operate(lastNumber, currentNumber, key);
      setLastNumber(result);
    }
    setCurrentNumber(currentNumber);
  } else if (key === 'eq') {
    const result = operate(lastNumber, currentNumber, lastOperator);
    operatorPressed = true;
    setCurrentNumber(result);
    setLastNumber('0');
  }
}

function display(number) {
  const display = document.getElementById('display');
  let displayedNumber;
  if (number.length >= MAX_DIGITS) {
    // Use exponential notation if the number is long
    displayedNumber = Number(number).toExponential(MAX_DIGITS - 6);
  } else {
    displayedNumber = number;
  }
  display.textContent = displayedNumber;
}

function operate(a, b, op) {
  console.log(`operate: ${a} ${b} ${op}`);
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