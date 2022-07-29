//Constants and global variables
const operators = {'+':add, '-':subtract, '*':multiply, '/':divide};
const NUM_LIMIT = 10**20;
const left = 'left';
const right = 'right';
const Modes = {
    left: 0,
    right: 1,
    result: 2,
}
Object.freeze(Modes);
const operands = {};
let operator, mode;

//Mathematical operations
function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    if (b == 0) return null;
    return a / b;
}

//Reset settings
function clear() {
    operands[left] = 0;
    operands[right] = null;
    operator = null;
    output.textContent = '0';
    mode = Modes.left;
}

//Determine what operand you're editing using the mode
function determineOperand() {
    if (mode === Modes.left)
        return left;
    else if (mode === Modes.right) 
        return right;
    return null;
}

//Update state for digit input
function sendNewDigit(digit) {
    let operand;
    let num = parseInt(digit);
    if (mode === Modes.result) {
        clear();
        operand = left;
        operands[operand] = num;
        mode = Modes.left;
    } else {
        operand = determineOperand();
        if (operands[operand] < NUM_LIMIT) {
            operands[operand] *= 10;
            operands[operand] += num
        }
    }    
    display(operands[operand]);
}

//Update state for operator input
function setOperator(op) {
    console.log("setOperator");
    let outStr = '';
    if (mode === Modes.right) {
        operate();
        outStr += ` = ${operands[left]} `;
    }
    else
        mode = Modes.right;
    operator = operators[op];
    operands[right] = 0;
    outStr += op;
    display(outStr); 
}

//Update state for equals input
function setEquals() {
    console.log("setEquals");
    if (mode === Modes.right)
        operate();
    operands[right] = null;
    operator = null;
    mode = Modes.result;
    display(operands[left]);
}

//Perform calculation
function operate(a=operands[left], b=operands[right], op=operator) {
    console.log("operate");
    if (b !== null) {
        console.log(op);
        operands[left] = op(a,b);
    }
    else 
        console.log("ERROR");
    
}

//Display result to screen
function display(content=operands[left]) {
    if (content === null)
        output.textContent = 'ERROR';
    else if (typeof content === 'number')
        output.textContent = content; //TODO: Round number
    else
        output.textContent = content;
}

//Create variables for HTML I/O
const output = document.querySelector('.output');
const numberButtons = document.querySelectorAll('button.number');
numberButtons.forEach((button) => 
    button.addEventListener('click', () => 
        sendNewDigit(button.textContent))
);
const operatorButtons = document.querySelectorAll('button.operator');
operatorButtons.forEach((button) => 
    button.addEventListener('click', () => 
        setOperator(button.textContent))
);
const clearButton = document.querySelector('button.clear');
clearButton.addEventListener('click', () => clear());
const equalsButton = document.querySelector('button.equals');
equalsButton.addEventListener('click', () => setEquals());

//Initialize variables
clear();