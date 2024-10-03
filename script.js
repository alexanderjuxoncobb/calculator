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

let display = document.querySelector("#textbox");
let displayArray = [];
const btns = document.querySelectorAll("button");
btns.forEach((button) => {
  button.addEventListener("click", () => {
    display.textContent += button.textContent;
    displayArray = display.textContent.match(
      /(?<![\d.])-?\d+(\.\d+)?|\+|\*|\/|=|-/g
    );
    console.log(`1: ${displayArray}`);
    // A good way to handle this is to modify the regular expression so that a negative number is only considered as such if it follows an operator or appears at the start of the string.
    if (displayArray.length > 3) {
      console.log(`2: ${displayArray}`);

      if (button.textContent === "=") {
        display.textContent = operate(
          Number(displayArray[0]),
          displayArray[1],
          Number(displayArray[2])
        );
        console.log(`3: ${displayArray}`);
        displayArray = [display.textContent];
        console.log(`4: ${displayArray}`);
      } else {
        display.textContent =
          operate(
            Number(displayArray[0]),
            displayArray[1],
            Number(displayArray[2])
          ) + button.textContent;
        displayArray = [display.textContent, button.textContent];
      }
    } else {
      console.log(`5: ${displayArray}`);
    }
  });
});
