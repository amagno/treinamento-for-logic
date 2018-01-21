// selectors
const primaryDisplay = document.getElementById('primary');
const secondaryDisplay = document.getElementById('secondary');
const keyList = Array.from(document.querySelectorAll('.key.number'));
const containerList = document.getElementById('operations-list');
containerList.classList.add('hide');
// Operations functions
const operations = {
  sum: (a, b) => a + b,
  minus: (a, b) => a - b,
  multiply: (a, b) => a * b,
  division: (a, b) => a / b,
};
// Cache value operation
let cachePrimaryValue;
let cacheSecondaryValue;
// Cache operation function
let cacheOperation;
let cacheSignal;
// Equal flag
let equal = false;
// Operation Array List
let operationsList = [];
// Clear list and container
function clearOperationList() {
  operationsList = [];
  containerList.innerHTML = '';
  containerList.classList.add('hide');
}
// insert operationList array into DOM
function insertOperationsList(list) {
  containerList.classList.remove('hide');
  let opList = '';
  list.forEach((op) => {
    opList += `<div class="operation">${op.primary} ${op.signal} ${op.secondary} = ${op.result}</div>`;
  });
  containerList.innerHTML = `${opList}<button style="width: 100%;" class="key" onClick="clearOperationList()">Clear</button>`;
  containerList.scrollTo(0, containerList.scrollHeight);
}
// Insert operation on list operation array
function insertOperation(primary, secondary, signal, result) {
  operationsList.push({
    primary,
    secondary,
    signal,
    result,
  });
  insertOperationsList(operationsList);
}
// for dev
const logCaches = (type = '') => {
  console.log('Primary: ', cachePrimaryValue);
  console.log('Secondary: ', cacheSecondaryValue);
  console.log(type);
};
// make operation receive string signal and callback()
function makeOperation(signal, operation) {
  // debugger;
  logCaches('makeOperation');
  const primaryValue = primaryDisplay.innerText;
  const secondaryValue = secondaryDisplay.innerText;
  
  if (primaryValue == '0') return;
  console.log(primaryValue);  
  console.log(secondaryValue);
  console.log(signal);
  // if (signal == '/' && primaryValue == '0') return;
  // Change operation
  if (cacheOperation !== operation && secondaryValue) {
    const sub = secondaryValue.substr(0, (secondaryValue.length - 2));
    secondaryDisplay.innerHTML = `${sub} ${signal}`;
    cacheOperation = operation;
    cacheSignal = signal;
    cacheSecondaryValue = undefined;
    return;
  }
  // First operation
  if (!secondaryValue && primaryValue) {
    secondaryDisplay.innerHTML = `${primaryValue} ${signal}`;
    cachePrimaryValue = primaryValue;
    cacheOperation = operation;
    cacheSignal = signal;
    cacheSecondaryValue = undefined;
    return;
  }
  // Operation signal result
  if (cacheSecondaryValue && secondaryValue) {
    secondaryDisplay.innerHTML = `${secondaryValue} ${primaryValue} ${signal}`;
    const result = operation(parseFloat(cachePrimaryValue), parseFloat(primaryValue));
    primaryDisplay.innerHTML = result;
    cachePrimaryValue = result;
    cacheSecondaryValue = undefined;
    cacheOperation = operation;
    cacheSignal = signal;
  }
}
// Equals function
function equals() {
  // if not exists keypad cache
  if (!cacheSecondaryValue) {
    cacheSecondaryValue = cachePrimaryValue;
  }
  // Operation cache
  if (typeof cacheOperation === 'function') {
    const result = cacheOperation(parseFloat(cachePrimaryValue), parseFloat(cacheSecondaryValue));
    insertOperation(cachePrimaryValue, cacheSecondaryValue, cacheSignal, result);
    cachePrimaryValue = result;
    secondaryDisplay.innerHTML = '';
    primaryDisplay.innerHTML = result;
    equal = true;
  }
  logCaches('equal function');
}
// Clear display
function clearDisplay() {
  cacheOperation = undefined;
  cachePrimaryValue = undefined;
  cacheSecondaryValue = undefined;
  secondaryDisplay.innerHTML = '';
  primaryDisplay.innerHTML = '0';
}
// Keypad and set secondary cache
keyList.forEach(n => n.addEventListener('click', (event) => {
  logCaches('click event');
  const value = event.target.innerText;
  // not accept 0
  if (value == 0 && !cacheSecondaryValue) return;
  // set cache count
  const count = cacheSecondaryValue ? cacheSecondaryValue.length : 0;
  // Max digits
  if (count > 19) return;
  // Reset primary display7
  if (!cacheSecondaryValue || equal) {
    cacheSecondaryValue = value;
    primaryDisplay.innerHTML = cacheSecondaryValue;
    equal = false;
    return;
  }
  cacheSecondaryValue += value;
  primaryDisplay.innerHTML = cacheSecondaryValue;
}));
// Numeric Key event
window.addEventListener('keydown', (event) => {
  if (!event.metaKey) {
    event.preventDefault();
  }
  console.log(event.keyCode);
  const el = document.querySelector(`.key[data-key="${event.keyCode}"]`);
  if (el) {
    el.classList.add('pressed');
    el.click();
  }
});
// Remove class pressed
window.addEventListener('keyup', (event) => {
  const el = document.querySelector(`.key[data-key="${event.keyCode}"]`);
  if (el) {
    el.classList.remove('pressed');
  }
});
