function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}

let firstNumber;
let operator;
let secondNumber;

function operate(a, operator, b) {
  if (Number.isNaN(a) || Number.isNaN(b)) return "";
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
}

// Function to check if a character is an operator
function isOperator(char) {
  return ["+", "-", "*", "/"].includes(char);
}

// Function to validate input (prevents consecutive operators, except for negative numbers)
function isValidInput(currentInput, newChar) {
  let lastChar = currentInput.slice(-1); // Get the last character of current input

  // Check if the last character is an operator and the new one is also an operator
  if (isOperator(lastChar) && isOperator(newChar)) {
    // Only allow operator followed by '-' (to handle negative numbers)
    if (newChar === "-" && lastChar !== "-") {
      return true;
    }
    return false; // Otherwise, it's an invalid input
  }

  return true; // Input is valid
}

let display = document.querySelector("#textbox");
let displayArray = [];
const btns = document.querySelectorAll("button");

btns.forEach((button) => {
  button.addEventListener("click", () => {
    // Check if the input is valid before adding it to the display
    if (isValidInput(display.textContent, button.textContent)) {
      if (!(button.textContent === "=")) {
        display.textContent += button.textContent;
        displayArray = display.textContent.match(
          /(?<![\d.])-?\d+(\.\d+)?|\+|\*|\/|=|-/g
        ); // A good way to handle this is to modify the regular expression so that a negative number is only considered as such if it follows an operator or appears at the start of the string.}
      } else {
        displayArray.push("=");
      }
      console.log(`1: ${displayArray}`);
    }
    if (button.textContent === "C") display.textContent = "";

    if (displayArray.length > 3) {
      console.log(`2: ${displayArray}`);

      if (button.textContent === "=") {
        display.textContent = parseFloat(
          operate(
            Number(displayArray[0]),
            displayArray[1],
            Number(displayArray[2])
          ).toFixed(5)
        );
        console.log(`3: ${displayArray}`);
        displayArray = [display.textContent];
        console.log(`4: ${displayArray}`);
      } else {
        display.textContent =
          parseFloat(
            operate(
              Number(displayArray[0]),
              displayArray[1],
              Number(displayArray[2])
            ).toFixed(5)
          ) + button.textContent;
        displayArray = [display.textContent, button.textContent];
      }
    } else {
      console.log(`5: ${displayArray}`);
    }
  });
});
