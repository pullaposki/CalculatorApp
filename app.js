import {ElementValidator} from "./element-validator.js";
// Selector constants
const ELEMENT_IDS = {
    num1: 'num1-el',
    num2: 'num2-el',
    sum: 'sum-el',
    addBtn: 'add-btn',
    subBtn: 'sub-btn',
    mulBtn: 'mul-btn',
    divBtn: 'div-btn',
    errEl: 'err-el'
};

const DEFAULT_NUMBER = 0;

const [number1Element, number2Element, sumElement, addButton, subtractButton, multiplyButton, divideButton, errorElement] = ElementValidator.getElementsByIds(ELEMENT_IDS);

resetNumbers();
addButtonListeners();
handleInput(number1Element);
handleInput(number2Element);

function addButtonListeners() {
    addButton.addEventListener("click", performAndReset.bind(null, (a, b) => a + b));
    subtractButton.addEventListener("click", performAndReset.bind(null, (a, b) => a - b));
    multiplyButton.addEventListener("click", performAndReset.bind(null, (a, b) => a * b));
    divideButton.addEventListener("click", performAndReset.bind(null, (a, b) => a / b));
}

function handleInput(inputElement) {
    inputElement.addEventListener("input", () => {
        resetErrorElement();
        preventNonNumericInput(inputElement);
        let value = parseInt(inputElement.value, 10);
        inputElement.value = Number.isNaN(value) ? DEFAULT_NUMBER : value;
    });
}

function performAndReset(operation) {
    let number1 = parseInt(number1Element.value, 10);
    let number2 = parseInt(number2Element.value, 10);

    if (Number.isNaN(number1) || Number.isNaN(number2)) {
        errorElement.innerText = "Please enter valid numbers!";
        return;
    }

    if (number2 === 0) {
        errorElement.innerText = "Cannot divide by zero!"
        return;
    }

    sumElement.innerText = operation(number1, number2);
    resetNumbers();
}

function resetNumbers() {
    number1Element.value = DEFAULT_NUMBER;
    number2Element.value = DEFAULT_NUMBER;
}

function resetErrorElement(){
    errorElement.innerText = "";
}


function preventNonNumericInput(inputElement) {
    inputElement.addEventListener("keypress", (event) => {
        let character = String.fromCharCode(event.which || event.keyCode);
        if (!/[0-9]/.test(character)) {            
            errorElement.innerText = "Please enter valid numbers!";
            event.preventDefault();
        }
    });
}





