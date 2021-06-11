

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

    /**
     * 1. Procesar el primer valor, hasta que se detecta un "operador"
     * 2. Si el operador presionado es de un solo valor, entonces generar el estado de calcular el resultado
     * 3. Si el operador presionado es de dos valores, entonces ir mover el estado a la posicion de captura del segundo valor
     * 4. Si el operador presionado es el "Enter" o =, entonces generar el resultado
     * 5. Si el se presiona de nuevo un operador, volvemos al punto 2
     */


    const entry = entryType(eKey);
    if (!entry.type) return; // an empty value on type, quits the function

    if ((entry.type == 'number' ||
        (entry.type == 'dot' && !hasDot(display))) && !operator) {  // operator has to be empty for the first value to be assgined     

        display = display + eKey;
        isFirstValue = true; // a number sequence has been entered

        setDisplay(display);
    } else

        if (entry.type == 'operator' && isFirstValue) {

            operator = eKey; // save de operator
            firstValue = display;

            if (entry.singleOperator) {
                result = operate(operator, parseFloat(firstValue), 0);
                display = result.toString();
                setDisplay(display);
            } else {
                /// aqui listo para recibir el segundo valor
                if (!isSecondValue)
                    display = '';
            }
        } else
            if (entry.type == 'number' || (entry.type == 'dot' && !hasDot(display))) {
                display = display + eKey;
                isSecondValue = true;
                setDisplay(display);

            } else {
                console.log(isSecondValue);
                if (isSecondValue) {
                    console.log(entry.type);
                    if (entry.type == 'equal' || entry.type == 'operator') { // when equals, starts all over

                        secondValue = display;
                        const result = operate(operator, parseFloat(firstValue), parseFloat(secondValue));
                        display = result.toString();
                        setDisplay(display);

                        console.log(firstValue,operator,secondValue,'=>',result);

                        firstValue = display; // saves firstValue as the current display for next operation
                        display = ''; // resets the display characters for the next operation
                        isFirstValue = true; // sets to assgined value for FirstValue
                        
                        secondValue = ''; // clear secondValue
                        isSecondValue = false; // sets not assgined value for secondValue

                        if( entry.type == 'operator')
                            operator = eKey;

                    }

//                    if (entry.type == 'operator') {

                        // firstValue = display;
                        // isFirstValue = true;
                        // operator = eKey;

                        // secondValue = display;
                        // const result = operate(operator, parseFloat(firstValue), parseFloat(secondValue));
                        // display = result.toString();
                        // setDisplay(display);


                        // secondValue = '';
                        // isSecondValue = false;
                        // display = '';


                    //     console.log(eKey);
                    // }
                }


            }

}








//function processEntryKey (eKey){

// const entry = entryType(eKey);
//     if( !entry.type ) return; // an empty value on type, quits the function

// if( displayMode == 100 ){

//     if( !isFirstValue ) /// clears the entry only once, before start entering the numbers sequence
//         display = '';

//     if ( entry.type == 'number' || ( entry.type == 'dot' && !hasDot(display) ) ){            

//         display = display + eKey;
//         isFirstValue = true; // a valid number sequence has been entered, but still dislpayMode 100 to keep processing the entries

//         firstValue = display;
//         setDisplay(display);
//     }

// }

// if( entry.type == 'operator' && isFirstValue && !entry.singleOperator ) { // if an operator is entered, after isFirstValue a valid sequence
//     operator = eKey;
//     displayMode = 200; 
// }

// if( displayMode == 200 ){

//     if( !secondValue )
//         display = ''; /// clears the entry only once, before start entering the numbers sequence

//     if ( entry.type == 'number' || ( entry.type == 'dot' && !hasDot(display) ) ){

//         display = display + eKey;
//         isSecondValue = true; // a valid number sequence has been entered, now dislpayMode 200 for the secondValue entries

//         secondValue = display;
//         setDisplay(display);
//     }

// }

// if( entry.type == 'equal' && isSecondValue ) {

//     const result = operate(operator,parseFloat(firstValue),parseFloat(secondValue) );
//     display = result.toString();
//     setDisplay(display);

//     console.log( `${firstValue} ${operator} ${secondValue} = ${result}`);


// }

//}


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