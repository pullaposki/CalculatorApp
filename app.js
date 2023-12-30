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
addInputListeners(number1Element);
addInputListeners(number2Element);

function addButtonListeners() {
    addButton.addEventListener("click", performAndReset.bind(null, (a, b) => a + b));
    subtractButton.addEventListener("click", performAndReset.bind(null, (a, b) => a - b));
    multiplyButton.addEventListener("click", performAndReset.bind(null, (a, b) => a * b));
    divideButton.addEventListener("click", () => {
        if (parseInt(number2Element.value, 10) === 0) {
            displayError("Cannot divide by zero!"); 
            return;
        }
        performAndReset((a, b) => a / b)
    });
}

function addInputListeners(inputElement) {
    inputElement.addEventListener("keypress", (event) => {
        let character = String.fromCharCode(event.which || event.keyCode);
        if (!isANumberOrADot(character)) {
            displayError("Please enter valid numbers!");

            event.preventDefault();
        }
    });

    inputElement.addEventListener('paste', (event) => {
        let pasteData = (event.clipboardData || window.clipboardData).getData('text');
        if (isNonNumeric(pasteData)) {
            errorElement.innerText = "Please enter valid numbers!";

            event.preventDefault();
        }
    });

    inputElement.addEventListener("input", () => {
        resetErrorElement();

        let value = parseFloat(inputElement.value);

        if (Number.isNaN(value)) {
            inputElement.value = DEFAULT_NUMBER;
        } else if (value.toString() !== inputElement.value) {
            // Prevent input like '1..2', '1.2.3', '-.1', etc.
            displayError("Please enter a valid number!");
            inputElement.value = DEFAULT_NUMBER;
        }
    });
}

function performAndReset(operation) {
    let number1 = parseFloat(number1Element.value);
    let number2 = parseFloat(number2Element.value);

    if (Number.isNaN(number1) || Number.isNaN(number2)) {
        displayError("Please enter valid numbers!");
        return;
    }    

    sumElement.innerText = operation(number1, number2);
    resetNumbers();
}

function resetNumbers() {
    number1Element.value = DEFAULT_NUMBER;
    number2Element.value = DEFAULT_NUMBER;
}

function displayError(text){
    errorElement.innerText = text;
}

function resetErrorElement(){
    errorElement.innerText = "";
}

function isNonNumeric(pasteData) {
    return !/^-?\d+\.?\d*$/.test(pasteData);
}

function isANumberOrADot(character){
    return /[0-9]|\./.test(character);
}