const previousOperand = document.getElementById("previous-operand");

const currentOperand = document.getElementById("current-operand");

const numberButtons = document.querySelectorAll("[data-number]");

const functionButtons = document.querySelectorAll("[data-function]");

const scientificButtons = document.querySelectorAll(".scientific-btn");

const scientificPanel = document.getElementById("scientific-panel");

const toggleScientific = document.getElementById("toggle-scientific");

let currentInput = "0";

let previousInput = "";

let operator = null;

function updateDisplay() {
  currentOperand.textContent = currentInput;

  previousOperand.textContent = previousInput;
}

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (currentInput === "0") {
      currentInput = button.dataset.number;
    } else {
      currentInput += button.dataset.number;
    }

    updateDisplay();
  });
});

function chooseOperator(selectedOperator) {
  previousInput = currentInput;

  operator = selectedOperator;

  currentInput = "0";

  previousOperand.textContent = `${previousInput} ${operator}`;

  updateDisplay();
}

functionButtons.forEach((button) => {
  switch (button.dataset.function) {
    case "add":
      button.addEventListener("click", () => {
        chooseOperator("+");
      });

      break;

    case "subtract":
      button.addEventListener("click", () => {
        chooseOperator("-");
      });

      break;

    case "multiply":
      button.addEventListener("click", () => {
        chooseOperator("*");
      });

      break;

    case "divide":
      button.addEventListener("click", () => {
        chooseOperator("/");
      });

      break;
  }
});
