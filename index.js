

// let isFirstValue = false, isSecondValue = false;
// let firstValue = '', secondValue = '', operator = ''; // stores the display string accordingly
// let displayMode = 100; // to capture the firstNumber argument // 200 -> capture secondValur argument

let display = ''; // controls a string to display on calculator

let firstValue = '', secondValue = '';
let operator = '';
let isFirstValue = false, isSecondValue = false;


window.addEventListener('keydown', function (e) {

    let key = e.key;
    if (key == 'Enter') key = '=';

    processEntry(key);

});

function processEntry(eKey) {

    const entry = entryType(eKey);
    if (!entry.type) return; // an empty value on type, quits the function 

    if ((entry.type == 'number' ||
        (entry.type == 'dot' && !hasDot(display))) && !operator) {  // operator has to be empty for the first value to be assgined     

        display = display + eKey;
        isFirstValue = true; // a number sequence has been entered
        firstValue = display;
        setDisplay(display);

    }
    else {

        if (entry.type == 'operator' && isFirstValue) {

            operator = eKey; // save de operator

            if (entry.singleOperator) {
                result = operate(operator, parseFloat(firstValue), 0);
                display = result.toString();
                setDisplay(display);

                /// set default values for only first value assigned
                isFirstValue = true;
                firstValue = display;
                display = '';


            } else {
                /// aqui listo para recibir el segundo valor
                if (!isSecondValue)
                    display = '';
            }
        }

        if (!secondValue) { // if second value is not yet captured

            if (entry.type == 'number' || (entry.type == 'dot' && !hasDot(display))) {
                display = display + eKey;
                isSecondValue = true;

                setDisplay(display);

            }

            if (isSecondValue) {

                if (entry.type == 'equal' || entry.type == 'operator') { // when equals, starts all over

                    secondValue = display;
                    const result = operate(operator, parseFloat(firstValue), parseFloat(secondValue));
                    display = result.toString();
                    setDisplay(display);

                    if (entry.type == 'operator') {

                        isFirstValue = true;
                        firstValue = display;
                        display = '';

                        secondValue = '';
                        isSecondValue = false;

                    } else {

                        isFirstValue = false;
                        firstValue = '';

                        isSecondValue = false;
                        secondValue = '';
                        operator = '';
                        display = '';
                    }

                }


            }

        }


    } // end of "else" block over main if statement


} // end of function


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

    });
});


const hasDot = (str) =>
    str.indexOf('.') !== -1;

const clearEntries = () => {

    firstValue = '';
    isFirtValue = false;

    operator = '';
    secondValue = '';
    isSecondValue = false;
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
    if (key === 'Backspace') {
        return {
            type: 'Backspace',
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
    display.textContent = txt.substr(0, 13); // restricts to 14 characters

}



const add = (a, b) => (a) + (b);
const substract = (a, b) => (a) - (b);
const multiply = (a, b) => (a) * (b);
const divide = (a, b) => (a / b);
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
            return b != 0 ? divide(a, b) : 0;
        case '%':
            return percentage(a);
        case '!':
            return shiftSign(a);
        default:
            return ':(';
    }

}