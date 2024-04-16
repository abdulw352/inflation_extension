// popup.js
document.addEventListener('DOMContentLoaded', () => {
  const targetYearInput = document.getElementById('targetYear');
  const convertButton = document.getElementById('convertButton');

  convertButton.addEventListener('click', () => {
    const targetYear = parseInt(targetYearInput.value);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'convertDollars', targetYear }, (response) => {
        if (response && response.convertedContent) {
          // Replace the current page content with the converted content
          document.documentElement.outerHTML = response.convertedContent;
        }
      });
    });
  });
});
