const  { operate } = require('./operations');

describe('operations: add, substract, multiply, divide, percentage', () => {
    test('add two numbers', () => {
        expect( operate('+',"20","3") ).toBe(23);
    });
    test('substract two numbers', () => {
        expect(operate('-',"5","3")).toBe(2);
    });
    test('multiply two numbers', () => {
        expect(operate('*',"2","3")).toBe(6);
    });
    test('divide one number over another', () => {
        expect(operate('/',"10","2")).toBe(5);
    });
    test('obtain the percentage factor',()=>{
        expect( operate('%',"7","3")).toBe(0.07);
    });
    test('shift the sign of the number',()=>{
        expect( operate('!',"2","3")).toBe(-2);
    })
});