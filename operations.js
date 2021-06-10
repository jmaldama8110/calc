
const add = (a,b)=> parseInt(a) + parseInt(b);
const substract = (a,b)=> parseInt(a) - parseInt(b);
const multiply = (a,b) => parseInt(a) * parseInt(b);
const divide = (a,b) => b != 0 ? parseInt(a)/parseInt(b): 0;
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

module.exports = {
    operate
}