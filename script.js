const symbols = [['1','2','3'],['4','5','6'],['7','8','9'],['','0','']];
const operators = ['+','-','*','/'];

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

function operate(a, b, operator) {
    return operator(a,b);
}

function generateSymbolGrid() {
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
}