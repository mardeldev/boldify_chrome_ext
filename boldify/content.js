
try {
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.action === "toggleBold") {
            propertyOption = request.property;
            toggleBoldEffect(propertyOption);
        }
    });

} catch (error) {
    console.log(error);
}

var isBoldActive = false;


export function toggleBoldEffect(propertyOption) {

    var paragraphs = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, div, li, #text, span');

    for (var i = 0; i < paragraphs.length; i++) {
        if (isBoldActive) {
            revertBoldEffect(paragraphs[i]);
        } else {
            makeFirstTwoLettersBold(paragraphs[i], propertyOption);

        }
    }
    isBoldActive = !isBoldActive;
}

let replacedChar = '';

function checkQuotations(words) {
    let openDoubleQuote = 8220;
    let openSingleQuote = 8216;
    let openSquareBracket = 91;
    let openCurlyBracket = 123;
    let openParenthesis = 40;

    switch (words.codePointAt(0)) {
        case (openDoubleQuote):
            replacedChar = openDoubleQuote;
            return true;
        case (openSingleQuote):
            replacedChar = openSingleQuote;
            return true;
        case (openSquareBracket):
            replacedChar = openSquareBracket;
            return true;
        case (openCurlyBracket):
            replacedChar = openCurlyBracket;
            return true;
        case (openParenthesis):
            replacedChar = openParenthesis;
            return true;
        default:
            break;
    }
}


function makeFirstTwoLettersBold(element, propertyOption) {
    let node, walk = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    element.originalElement = element.cloneNode(true);


    while (node = walk.nextNode()) {



        let words = node.textContent.split(' ');
        let newNode = document.createElement('span');


        for (let i = 0; i < words.length; i++) {
            if (words[i].length > 0) {
                let start = 0;
                let end = 2;


                let spanElement = document.createElement('span');
                spanElement.className = propertyOption;

                spanElement.textContent = checkQuotations(words[i]) == true ? `${String.fromCodePoint(replacedChar)}${words[i].substring(start += 1, end += 1)}` : `${words[i].substring(start, end)}`


                newNode.appendChild(spanElement);
                newNode.appendChild(document.createTextNode(words[i].substring(end)));


                if (i < words.length - 1) {
                    newNode.appendChild(document.createTextNode(' '));
                }
            }
        }
        node.parentNode.replaceChild(newNode, node);
    }
}

function revertBoldEffect(element) {

    if (element.originalElement) {
        element.parentNode.replaceChild(element.originalElement, element);
    }
}






