
const buttons = document.querySelectorAll('.item');

buttons.forEach((item) => {

    // The border effect only for "click-able" buttons
    if (!(item.getAttribute('id') === 'inputcontainer')) { 
        item.addEventListener("mousedown", () =>
            item.style.cssText = "border: 2px gray solid");

        item.addEventListener("mouseup", () =>
            item.style.cssText = "border: none");
    }


});


const btnClear = document.querySelector('#btnAC'); /// Clear the input and set it to 0
btnClear.addEventListener('click', function () {

    const input = document.querySelector('#inputCalculator');
    input.value = '0';

});
