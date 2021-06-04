const { add, substract, multiply, divide, percentage, shiftSign } = require('./operations');

describe('operations: add, substract, multiply, divide, percentage', () => {
    test('add two numbers', () => {
        expect(add(10, 5)).toBe(15);
    });
    test('substract two numbers', () => {
        expect(substract(100, 20)).toBe(80);
    });
    test('multiply two numbers', () => {
        expect(multiply(50, 2)).toBe(100);
    });
    test('divide one number over another', () => {
        expect(divide(20, 2)).toBe(10);
    });
    test('obtain the percentage factor',()=>{
        expect( percentage(7)).toBe(0.07);
    });
    test('shift the sign of the number',()=>{
        expect( shiftSign(2)).toBe(-2);
    })
});