//const symbols = [['1','2','3'],['4','5','6'],['7','8','9'],['','0','']];
//const operators = ['+','-','*','/'];
const operators = {'+':add, '-':subtract, '*':multiply, '/':divide};
const NUM_LIMIT = 10**20;
let computing, leftOperand, rightOperand, operator, result;

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

function operate(a=leftOperand, b=rightOperand, operator=operator) {
    if (b !== null) {
        leftOperand = operator(a,b);
        rightOperand = null;
    }
    else
        //TODO:
        console.log(b);
    
}

function clear() {
    computing = false;
    leftOperand = 0;
    rightOperand = null;
    operator = null;
    result = 0;
    output.textContent = '0';
}

function sendNewDigit(digit) {
    if (result < NUM_LIMIT) {
        result *= 10;
        result += parseInt(digit);
    }
    display();
}

function display(content=result) {
    if (content === null)
        output.textContent = 'ERROR';
    else
        output.textContent = content;
}

function setOperator(op) {
    if (operator !== null && rightOperand !== null)
        operate();
    operator = operators[op];
    display(op);
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
clearButton.addEventListener('click', () => operate());

clear();

/*function generateSymbolGrid() {
    let columns = 3;
    let rows = 4;
    gridContainer.style.gridTemplateColumns = 'auto '.repeat(columns).trim();
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let button = document.createElement('button');
            button.type = 'button';
            button.className = 'symbol';
            button.addEventListener('click', () => operate(symbols[r][c]));
            gridContainer.appendChild(button);
        }
    }
}*/