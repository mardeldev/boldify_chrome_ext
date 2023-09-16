

document.addEventListener('DOMContentLoaded', function () {
    var toggleMagnifyButton = document.getElementById('toggleMagnify');
    toggleMagnifyButton.addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "toggleMagnify" });
        });
    });

});

document.addEventListener('DOMContentLoaded', function () {
    var makeBoldButton = document.getElementById('makeBold');
    makeBoldButton.addEventListener('click', function () {
        chrome.tabs.executeScript({
            file: 'content.js'
        });
    });
});

