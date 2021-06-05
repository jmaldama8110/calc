
/*  
    displayState = 100 -> default state, ready to set firstValue until the operator is assinged
    displayState = 200 -> 
    displayState = 300 -> 
 */
let displayState = 100;
let index = 0;

let firstValue = '';
let secondValue = '';
let operator = '';

const calcRecord = [];

window.addEventListener('keydown', function (e) {

    const display = document.querySelector('#displaytxt');

    if (displayState == 100) {

        const keyNumber = parseInt(e.key);
        if ((keyNumber >= 0) && (keyNumber <= 9)) { /// here we are validating the key entry as an Number
            
            const cur = display.textContent === '0' ? '' : display.textContent;
            display.textContent = `${cur}${e.key}`; // allows to enter any figure
            
            firstValue = display.textContent; // 100 state and pressing the operator means the user has finished entering the firstValue
        }

        if ( isAnOperator(e.key) && !operator) {

            operator = e.key; // now the operator is assign
            displayState = 200; // set the next state
        }

    }

    if (displayState == 200) { 

        
        const keyNumber = parseInt(e.key);
        if ((keyNumber >= 0) && (keyNumber <= 9)) { /// here we are validating the key entry as an Number
            
            if( !secondValue ) /// clears the display for the second value
                display.textContent = '';
                
            const cur = display.textContent === '0' ? '' : display.textContent;
            display.textContent = `${cur}${e.key}`; // allows to enter any figure
            secondValue = display.textContent;
        }

        if( e.key === 'Enter' ){ /// when Equal is pressed (Enter ), then has to execute the appropitate operation

            const result = operate(operator,firstValue,secondValue);
            display.textContent = result.toString();

            displayState = 300;

        }

    }

    if( displayState == 300 ){
        console.log(firstValue,operator,secondValue);
    }


});



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
        const display = document.querySelector('#displaytxt');
        const cur = display.textContent === '0' ? '' : display.textContent;
        display.textContent = `${cur}${digit}`;

    });
});


function clearDisplay() {
    const display = document.querySelector('#displaytxt');
    display.textContent = '0';

    firstValue = '';
    secondValue = '';
    operator = '';
    displayState = 100;
}

const btnClear = document.querySelector('#btnAC');
btnClear.addEventListener('click', clearDisplay);


function isAnOperator(key) {
    return (key === '+' || key === '-' || key === '*' || key === '/' || key === '%' || key === 'Enter');

}

const add = (a,b)=> parseInt(a) + parseInt(b);
const substract = (a,b)=> parseInt(a) - parseInt(b);
const multiply = (a,b) => parseInt(a) * parseInt(b);
const divide = (a,b) => parseInt(a)/parseInt(b);
const percentage = (a) => parseInt(a)/100;
const shiftSign = (a) => (parseInt(a)*(-1));


function operate (opt, a, b ) {

    switch( opt ){
        case '+':
            
            return add(a,b);
        case '-':
            return substract(a,b);
        case '*':
            return multiply(a,b);
        case '/':
            return divide(a,b);
        case '%':
            return percentage(a);
        case '!':
            return shiftSign(a);
        default:
            return ':(';
    }

}