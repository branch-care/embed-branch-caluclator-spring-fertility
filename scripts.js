const calculatorIframeElem = document.getElementById(
  "branch-fertility-calculator"
);

/**
 * Checks if the message is a resize message
 * @param {unknown} data - The message data
 * @returns {boolean} - True if the message is a resize message, false otherwise
 */
function isResizeMessage(data) {
  return (
    typeof data === "object" &&
    data !== null &&
    data.type === "branchcare:resize" &&
    typeof data.height === "number"
  );
}

/**
 * Checks if the message is a scroll to top message
 * @param {unknown} data - The message data
 * @returns {boolean} - True if the message is a scroll to top message, false otherwise
 */
function isScrollToTopMessage(data) {
  return (
    typeof data === "object" &&
    data !== null &&
    data.type === "branchcare:scroll-to-top"
  );
}

/**
 * Checks if the message is a scroll to offset message
 * @param {unknown} data - The message data
 * @returns {boolean} - True if the message is a scroll to offset message, false otherwise
 */
function isScrollToOffsetMessage(data) {
  return (
    typeof data === "object" &&
    data !== null &&
    data.type === "branchcare:scroll-to-offset" &&
    typeof data.offsetInIframe === "number"
  );
}

window.addEventListener("message", (event) => {
  if (!calculatorIframeElem) {
    return;
  }

  if (isResizeMessage(event.data)) {
    // Resize the iframe to the new height
    calculatorIframeElem.style.height = event.data.height + "px";
  }

  if (isScrollToTopMessage(event.data)) {
    // Scroll to top of the iframe
    const iframeTop =
      calculatorIframeElem.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: iframeTop, behavior: "smooth" });
  }

  if (isScrollToOffsetMessage(event.data)) {
    // Scroll to the given offset in the iframe
    const iframeTop =
      calculatorIframeElem.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: iframeTop + event.data.offsetInIframe,
      behavior: "smooth",
    });
  }
});

function sendScrollInfo() {
  if (!calculatorIframeElem) {
    return;
  }

  calculatorIframeElem.contentWindow.postMessage(
    {
      type: "branchcare:scroll",
      parentScrollY: window.scrollY,
      iframeOffsetTop:
        calculatorIframeElem.getBoundingClientRect().top + window.scrollY,
    },
    "*"
  );
}

// Send the scroll information on every scroll.
// Use a passive event listener so that the the browser
// has permission to keep scrolling without waiting for the event to be handled
window.addEventListener("scroll", sendScrollInfo, { passive: true });
