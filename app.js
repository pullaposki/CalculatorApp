// Create four functions: add(), subtract(), divide(), multiply()
// Call the correct function when the user clicks on one of the buttons
// Perform the given calculation using num1 and num2
// Render the result of the calculation in the paragraph with id="sum-el"

// E.g. if the user clicks on the "Plus" button, you should render 
// "Sum: 10" (since 8 + 2 = 10) inside the paragraph with id="sum-el"

import {ElementValidator} from "./element-validator.js";

const number1Element = document.getElementById("num1-el");
const number2Element = document.getElementById("num2-el");
const sumElement = document.getElementById("sum-el");

const addButton = document.getElementById("add-btn");
const subtractButton = document.getElementById("sub-btn");
const multiplyButton = document.getElementById("mul-btn");

ElementValidator.validateElements(number1Element, number2Element, sumElement, addButton, subtractButton, multiplyButton);

let number1;
let number2;
number1Element.addEventListener("input", () => number1 = parseInt(number1Element.value, 10));
number2Element.addEventListener("input", () => number2 = parseInt(number2Element.value, 10));

addButton.addEventListener("click", () => { add(number1,number2) } );


function add(num1, num2){
    sumElement.innerText = num1+num2;
}


