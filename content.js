
function makeFirstTwoLettersBold(element) {
    let node, walk = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);

    while (node = walk.nextNode()) {
        let words = node.textContent.split(' ');
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i].replace(/\b\w{1,2}/, function (match) {
                return `<strong>${match}</strong>`;
            });
        }
        let newNode = document.createElement('span');
        newNode.innerHTML = words.join(' ');
        node.parentNode.replaceChild(newNode, node);
    }
}

var paragraphs = document.querySelectorAll('p:not(span), h1:not(span), h2:not(span), h3:not(span), h4:not(span), h5:not(span), h5:not(span), div:not(span), li:not(span)');
for (var i = 0; i < paragraphs.length; i++) {
    makeFirstTwoLettersBold(paragraphs[i]);
}
