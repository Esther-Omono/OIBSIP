const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const ops = ["%", "/", "*", "-", "+", "="];
let output = "";

// Function to calculate based on button clicked
const calculate = (btnValue) => {
  if (btnValue === "=" && output !== "") {
    // If output has %, replace with /100 before evaluation
    output = eval(output.replace("%", "/100"));
  } else if (btnValue === "AC") {
    // If AC button is clicked, remove every character from the output
    output = "";
  } else if (btnValue === "DEL") {
    // If DEL button is clicked, remove the last character from output
    output = output.toString().slice(0, -1);
  } else {
    // If output is empty and button is ops then return
    if (output === "" && ops.includes(btnValue)) return;
      output += btnValue;
  }

  display.value = output;
}

// Add event listener to buttons to call calculate() on click
buttons.forEach((button) => {
  // Button click listener calls calculate() with dataset value as argument
  button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});