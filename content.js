// content.js
function convertDollarFigure(text, targetYear) {
  // Here you would use an inflation calculator API or dataset to convert the dollar figure
  // For this example, we'll just use a simple multiplier
  const inflationMultiplier = 1.5; // Assuming 50% inflation from the original year to the target year
  const dollarRegex = /\$(\d+(?:\.\d+)?)/g;
  return text.replace(dollarRegex, (match, amount) => {
    const convertedAmount = parseFloat(amount) * inflationMultiplier;
    return `$${convertedAmount.toFixed(2)}`;
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'convertDollars') {
    const { targetYear } = request;
    const pageContent = document.documentElement.outerHTML;
    const convertedContent = convertDollarFigure(pageContent, targetYear);
    sendResponse({ convertedContent });
  }
});
