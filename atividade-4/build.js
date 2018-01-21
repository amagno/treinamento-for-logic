// selectors
var primaryDisplay = document.getElementById('primary');
var secondaryDisplay = document.getElementById('secondary');
var keyList = Array.from(document.querySelectorAll('.key.number'));
var containerList = document.getElementById('operations-list');
containerList.classList.add('hide'); // Operations functions

var operations = {
  sum: function sum(a, b) {
    return a + b;
  },
  minus: function minus(a, b) {
    return a - b;
  },
  multiply: function multiply(a, b) {
    return a * b;
  },
  division: function division(a, b) {
    return a / b;
  }
}; // Cache value operation

var cachePrimaryValue;
var cacheSecondaryValue; // Cache operation function

var cacheOperation;
var cacheSignal; // Equal flag

var equal = false; // Operation Array List

var operationsList = []; // Clear list and container

function clearOperationList() {
  operationsList = [];
  containerList.innerHTML = '';
  containerList.classList.add('hide');
} // insert operationList array into DOM


function insertOperationsList(list) {
  containerList.classList.remove('hide');
  var opList = '';
  list.forEach(function (op) {
    opList += "<div class=\"operation\">".concat(op.primary, " ").concat(op.signal, " ").concat(op.secondary, " = ").concat(op.result, "</div>");
  });
  containerList.innerHTML = "".concat(opList, "<button style=\"width: 100%;\" class=\"key\" onClick=\"clearOperationList()\">Clear</button>");
  containerList.scrollTo(0, containerList.scrollHeight);
} // Insert operation on list operation array


function insertOperation(primary, secondary, signal, result) {
  operationsList.push({
    primary: primary,
    secondary: secondary,
    signal: signal,
    result: result
  });
  insertOperationsList(operationsList);
} // for dev


var logCaches = function logCaches() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  console.log('Primary: ', cachePrimaryValue);
  console.log('Secondary: ', cacheSecondaryValue);
  console.log(type);
}; // make operation receive string signal and callback()


function makeOperation(signal, operation) {
  // debugger;
  logCaches('makeOperation');
  var primaryValue = primaryDisplay.innerText;
  var secondaryValue = secondaryDisplay.innerText;
  if (primaryValue == '0') return;
  console.log(primaryValue);
  console.log(secondaryValue);
  console.log(signal); // if (signal == '/' && primaryValue == '0') return;
  // Change operation

  if (cacheOperation !== operation && secondaryValue) {
    var sub = secondaryValue.substr(0, secondaryValue.length - 2);
    secondaryDisplay.innerHTML = "".concat(sub, " ").concat(signal);
    cacheOperation = operation;
    cacheSignal = signal;
    cacheSecondaryValue = undefined;
    return;
  } // First operation


  if (!secondaryValue && primaryValue) {
    secondaryDisplay.innerHTML = "".concat(primaryValue, " ").concat(signal);
    cachePrimaryValue = primaryValue;
    cacheOperation = operation;
    cacheSignal = signal;
    cacheSecondaryValue = undefined;
    return;
  } // Operation signal result


  if (cacheSecondaryValue && secondaryValue) {
    secondaryDisplay.innerHTML = "".concat(secondaryValue, " ").concat(primaryValue, " ").concat(signal);
    var result = operation(parseFloat(cachePrimaryValue), parseFloat(primaryValue));
    primaryDisplay.innerHTML = result;
    cachePrimaryValue = result;
    cacheSecondaryValue = undefined;
    cacheOperation = operation;
    cacheSignal = signal;
  }
} // Equals function


function equals() {
  // if not exists keypad cache
  if (!cacheSecondaryValue) {
    cacheSecondaryValue = cachePrimaryValue;
  } // Operation cache


  if (typeof cacheOperation === 'function') {
    var result = cacheOperation(parseFloat(cachePrimaryValue), parseFloat(cacheSecondaryValue));
    insertOperation(cachePrimaryValue, cacheSecondaryValue, cacheSignal, result);
    cachePrimaryValue = result;
    secondaryDisplay.innerHTML = '';
    primaryDisplay.innerHTML = result;
    equal = true;
  }

  logCaches('equal function');
} // Clear display


function clearDisplay() {
  cacheOperation = undefined;
  cachePrimaryValue = undefined;
  cacheSecondaryValue = undefined;
  secondaryDisplay.innerHTML = '';
  primaryDisplay.innerHTML = '0';
} // Keypad and set secondary cache


keyList.forEach(function (n) {
  return n.addEventListener('click', function (event) {
    logCaches('click event');
    var value = event.target.innerText; // not accept 0

    if (value == 0 && !cacheSecondaryValue) return; // set cache count

    var count = cacheSecondaryValue ? cacheSecondaryValue.length : 0; // Max digits

    if (count > 19) return; // Reset primary display7

    if (!cacheSecondaryValue || equal) {
      cacheSecondaryValue = value;
      primaryDisplay.innerHTML = cacheSecondaryValue;
      equal = false;
      return;
    }

    cacheSecondaryValue += value;
    primaryDisplay.innerHTML = cacheSecondaryValue;
  });
}); // Numeric Key event

window.addEventListener('keydown', function (event) {
  if (!event.metaKey) {
    event.preventDefault();
  }

  console.log(event.keyCode);
  var el = document.querySelector(".key[data-key=\"".concat(event.keyCode, "\"]"));

  if (el) {
    el.classList.add('pressed');
    el.click();
  }
}); // Remove class pressed

window.addEventListener('keyup', function (event) {
  var el = document.querySelector(".key[data-key=\"".concat(event.keyCode, "\"]"));

  if (el) {
    el.classList.remove('pressed');
  }
});
