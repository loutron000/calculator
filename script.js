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

let scientificOperator = null;

function updateDisplay() {
  currentOperand.textContent = currentInput;

  if (scientificOperator === "power") {
    previousOperand.textContent = `${previousInput} ^`;
  } else if (operator) {
    previousOperand.textContent = `${previousInput} ${operator}`;
  } else {
    previousOperand.textContent = previousInput;
  }
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

    case "equals":
      button.addEventListener("click", () => {
        calculate();
      });

      break;

    case "clear":
      button.addEventListener("click", () => {
        clearCalculator();
      });

      break;

    case "backspace":
      button.addEventListener("click", () => {
        backspace();
      });

      break;

    case "decimal":
      button.addEventListener("click", () => {
        appendDecimal();
      });

      break;

    case "percent":
      button.addEventListener("click", () => {
        percentage();
      });

      break;

    case "power":
      button.addEventListener("click", () => {
        power();
      });
      break;
  }
});

function calculate() {
  if (scientificOperator === "power") {
    currentInput = Math.pow(
      parseFloat(previousInput),
      parseFloat(currentInput),
    ).toString();

    previousInput = "";

    scientificOperator = null;

    updateDisplay();

    return;
  }

  const previous = parseFloat(previousInput);

  const current = parseFloat(currentInput);

  if (isNaN(previous) || isNaN(current)) return;

  let result;

  switch (operator) {
    case "+":
      result = previous + current;
      break;

    case "-":
      result = previous - current;
      break;

    case "*":
      result = previous * current;
      break;

    case "/":
      result = current === 0 ? "Cannot divide by 0" : previous / current;
      break;

    default:
      return;
  }

  currentInput = result.toString();

  previousInput = "";

  operator = null;

  updateDisplay();
}

function clearCalculator() {
  currentInput = "0";

  previousInput = "";

  operator = null;

  updateDisplay();
}

function backspace() {
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = "0";
  }

  updateDisplay();
}

function appendDecimal() {
  if (currentInput.includes(".")) return;

  currentInput += ".";

  updateDisplay();
}

function scientificOperation(operation) {
  let value = parseFloat(currentInput);

  switch (operation) {
    case "sqrt":
      currentInput = Math.sqrt(value).toString();
      break;

    case "square":
      currentInput = Math.pow(value, 2).toString();
      break;

    case "pi":
      currentInput = Math.PI.toString();
      break;

    case "e":
      currentInput = Math.E.toString();
      break;

    case "sin":
      currentInput = Math.sin((value * Math.PI) / 180).toString();
      break;

    case "cos":
      currentInput = Math.cos((value * Math.PI) / 180).toString();
      break;

    case "tan":
      currentInput = Math.tan((value * Math.PI) / 180).toString();
      break;

    case "log":
      currentInput = Math.log10(value).toString();
      break;

    case "ln":
      currentInput = Math.log(value).toString();
      break;

    default:
      return;
  }

  updateDisplay();
}

scientificButtons.forEach((button) => {
  button.addEventListener("click", () => {
    scientificOperation(button.dataset.function);
  });
});

function percentage() {
  currentInput = (parseFloat(currentInput) / 100).toString();

  updateDisplay();
}

function power() {
  previousInput = currentInput;

  currentInput = "0";

  scientificOperator = "power";

  previousOperand.textContent = `${previousInput} ^`;

  updateDisplay();
}

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (key >= "0" && key <= "9") {
    if (currentInput === "0") {
      currentInput = key;
    } else {
      currentInput += key;
    }

    updateDisplay();
  } else if (key === ".") {
    appendDecimal();
  } else if (key === "+") {
    chooseOperator("+");
  } else if (key === "-") {
    chooseOperator("-");
  } else if (key === "*") {
    chooseOperator("*");
  } else if (key === "/") {
    event.preventDefault();
    chooseOperator("/");
  } else if (key === "Enter" || key === "=") {
    event.preventDefault();
    calculate();
  } else if (key === "Backspace") {
    backspace();
  } else if (key === "Escape") {
    clearCalculator();
  } else if (key === "%") {
    percentage();
  }
});
