
const add = (a,b)=> a + b;
const substract = (a,b)=> a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => a/b;
const percentage = (a) => a/100;
const shiftSign = (a) => (a*(-1));


function operate (opt, a, b ) {

    switch( opt ){
        case 'add':
            add(a,b);
        case 'sub':
            substract(a,b);
        case 'mul':
            multiply(a,b);
        case 'div':
            divide(a,b);
        case 'per':
            percentage(a);
        case 'shi':
            shiftSign(a);
        default:
            ':(';
    }

}

module.exports = {
    add,
    substract,
    multiply,
    divide,
    percentage,
    shiftSign
}