
/** PENDIENTES 09/Jun/2021
 *  1. Add "backspace" support
 *  2. Decimal point does not work when entering the second value
 *  3. Still to workout how to use single operation options
 */


let isFirstValue = false, isSecondValue = false;

let firstValue = '', secondValue = '', operator = ''; // stores the display string accordingly

let display = '';
let displayMode = 100; // to capture the firstNumber argument // 200 -> capture secondValur argument




window.addEventListener('keydown', function (e) {

    let key = e.key;
    if (key == 'Enter') key = '=';

    processEntryKey(key);
});


function processEntryKey (eKey){


    const entry = entryType(eKey);
        if( !entry.type ) return; // an empty value on type, quits the function

    if( displayMode == 100 ){

        if( !isFirstValue ) /// clears the entry only once, before start entering the numbers sequence
            display = '';

        if ( entry.type == 'number' || ( entry.type == 'dot' && !hasDot(display) ) ){            

            display = display + eKey;
            isFirstValue = true; // a valid number sequence has been entered, but still dislpayMode 100 to keep processing the entries

            firstValue = display;
            setDisplay(display);
        }
    
    }

    if( entry.type == 'operator' && isFirstValue && !entry.singleOperator ) { // if an operator is entered, after isFirstValue a valid sequence
        operator = eKey;
        displayMode = 200;
        console.log( `${firstValue} ${operator} ${secondValue} = ${displayMode}`);
        
    }

    if( displayMode == 200 ){

        if( !secondValue )
            display = ''; /// clears the entry only once, before start entering the numbers sequence

        if ( entry.type == 'number' || ( entry.type == 'dot' && !hasDot(display) ) ){

            display = display + eKey;
            isSecondValue = true; // a valid number sequence has been entered, now dislpayMode 200 for the secondValue entries
            
            secondValue = display;
            setDisplay(display);
        }

    }

    if( entry.type == 'equal' && isSecondValue ) {

        const result = operate(operator,parseFloat(firstValue),parseFloat(secondValue) );
        display = result.toString();
        setDisplay(display);

        console.log( `${firstValue} ${operator} ${secondValue} = ${result}`);
        
        firstValue = display;
        isFirstValue = true;
        
        displayMode = 200;
        
        secondValue = '';
        operator = '';
        isSecondValue = false;
        
    }



}


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


const hasDot = (str) =>
    str.indexOf('.') !== -1;

const clearEntries = () => {

    displayMode = 100;
    firstValue = '';
    isFirtValue = false;

    operator = '';
    secondValue = '';
    isSecondValue = false;
    display = '0';
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
    if( key === 'Backspace'){
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
    display.textContent = txt.substr(0,13);

}



const add = (a, b) => (a) + (b);
const substract = (a, b) => (a) - (b);
const multiply = (a, b) => (a) * (b);
const divide = (a, b) =>  (a/b);
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