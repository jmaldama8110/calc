
let firstNumber = 0, secondNumber = 0, result = 0, operator = '';
let display = '';


window.addEventListener('keydown', function (e) {

    let key = e.key;
    if (key == 'Enter')
        key = '=';
    processEntryKey(key);
});


/// For buttons with Numbers, adds the eventListener
const buttons = document.querySelectorAll('.item');
buttons.forEach((item) => {

    // The border effect only for "click-able" buttons
    if (!(item.getAttribute('id') === 'display')) {
        item.addEventListener("mousedown", () =>
            item.style.cssText = "border: 2px gray solid");

        item.addEventListener("mouseup", () =>
            item.style.cssText = "border: none");
    }


    item.addEventListener('click', function () {

        const digit = this.textContent;

        if (digit == 'AC') {
            clearEntries();
            setDisplay('0');
        } // when the Clear buttons is pressed
        else
            processEntryKey(digit);

    });
});

function processEntryKey(eKey) {

    const entry = entryType(eKey);

    if( !entry.type ) return;

    if (!firstNumber) { // as many numbers and one DOT as the firstValue is no assigned
        if (entry.type == 'number' ||
            (entry.type == 'dot' && !hasDot(display))) {
            display = display + eKey;
            setDisplay(display);
        }

        if (entry.type == 'operator') {

            if (!entry.singleOperator) { // when the operator is a two number operator
                firstNumber = parseFloat(display);
                operator = entry.operator;
            }
        }
    } else {
        if (!secondNumber) {
            display = '';
            setDisplay(display);
        }

        if (entry.type == 'number' ||
            (entry.type == 'dot' && !hasDot(display))) {
            display = display + eKey;
            secondNumber = parseFloat(display);
            setDisplay(display);

        }

        if (entry.type == 'equal') {
            result = operate(operator, firstNumber, secondNumber);
            display = Math.round(result * 100000000 + Number.EPSILON) / 100000000;
            setDisplay(display);

            firstNumber = 0;
            display = '';
            secondNumber = 0;
            
            
        }

    }

}


const hasDot = (str) =>
    str.indexOf('.') !== -1;

const clearEntries = () => {
    firstNumber = 0;
    operator = '';
    secondNumber = 0;
    result = 0;
    display = '';
}

const entryType = (key) => {

    const isNumber = parseInt(key);

    if ((isNumber >= 0) && (isNumber <= 9)) {
        return {
            type: 'number',
            operator: '',
            singleOperator: false
        }
    }

    if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%' || key === '!') {

        return {
            type: 'operator',
            operator: key,
            singleOperator: (key === '!' || key === '%') ? true : false
        }
    }

    if (key === '=') {
        return {
            type: 'equal',
            operator: key,
            singleOperator: false
        }
    }
    if (key === '.') {
        return {
            type: 'dot',
            operator: key,
            singleOperator: false
        }
    }

    return {
        type: '',
        operator: key,
        singleOperator: false
    }

}

function setDisplay(txt) {
    const display = document.querySelector('#displaytxt');
    display.textContent = txt;

}



const add = (a, b) => (a) + (b);
const substract = (a, b) => (a) - (b);
const multiply = (a, b) => (a) * (b);
const divide = (a, b) => (a) / (b);
const percentage = (a) => (a) / 100;
const shiftSign = (a) => ((a) * (-1));


function operate(opt, a, b) {

    switch (opt) {
        case '+':

            return add(a, b);
        case '-':
            return substract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        case '%':
            return percentage(a);
        case '!':
            return shiftSign(a);
        default:
            return ':(';
    }

}