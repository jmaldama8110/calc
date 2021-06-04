
const buttons = document.querySelectorAll('.item');

buttons.forEach((item) => {

    // The border effect only for "click-able" buttons
    if (!(item.getAttribute('id') === 'display')) { 
        item.addEventListener("mousedown", () =>
            item.style.cssText = "border: 2px gray solid");

        item.addEventListener("mouseup", () =>
            item.style.cssText = "border: none");
    }


    item.addEventListener('click',function(){

        const digit = this.textContent;        
        const display = document.querySelector('#displaytxt');
        const cur = display.textContent ==='0' ? '': display.textContent ;
        display.textContent =  `${cur}${digit}`;

    });
});




function clearDisplay () {
        const display = document.querySelector('#displaytxt');
        display.textContent = '0'; 
}

const btnClear = document.querySelector('#btnAC'); 
btnClear.addEventListener('click', clearDisplay );




