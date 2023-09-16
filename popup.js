
let fontOption = document.getElementById('boldifyFonts');

let propertyOption = 'boldLetters';

fontOption.addEventListener('input', function () {
    switch (fontOption.value) {
        case 'Courier New':
            propertyOption = 'boldLettersCourierNew';
            break;
        case 'Georgia':
            propertyOption = 'boldLettersGeorgia';
            break;
        case 'Arial':
            propertyOption = 'boldLettersArial';
        default:
            propertyOption = 'boldLetters';
            break;
    }

})

// let propertyOption = 'boldLetters';


document.addEventListener('DOMContentLoaded', function () {
    var makeBoldButton = document.getElementById('makeBold');
    makeBoldButton.addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleBold', property: propertyOption });
        });
    });
});
