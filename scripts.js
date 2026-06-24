const calculatorIframe = document.getElementById("branch-fertility-calculator");

window.addEventListener("message", (event) => {
  if (!calculatorIframe) {
    return;
  }

  // Resize iframe
  if (event.data?.type === "branchcare:resize" && event.data.height) {
    calculatorIframe.style.height = event.data.height + "px";
  }

  // Scroll to top of iframe
  if (event.data?.type === "branchcare:scroll-to-top") {
    const iframeTop =
      calculatorIframe.getBoundingClientRect().top + window.scrollY;
    console.log("scrolling to top of iframe", iframeTop);
    window.scrollTo({ top: iframeTop, behavior: "smooth" });
  }

  // Scroll to offset (to a certain element) in iframe
  if (
    event.data?.type === "branchcare:scroll-to-offset" &&
    event.data.offsetInIframe
  ) {
    const iframeTop = iframe.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: iframeTop + e.data.offsetInIframe,
      behavior: "smooth",
    });
  }
});

function sendScrollInfo() {
  if (!calculatorIframe) {
    return;
  }

  calculatorIframe.contentWindow.postMessage(
    {
      type: "branchcare:scroll",
      parentScrollY: window.scrollY,
      iframeOffsetTop:
        calculatorIframe.getBoundingClientRect().top + window.scrollY,
    },
    "*"
  );
}

// Send on every scroll
window.addEventListener("scroll", sendScrollInfo, { passive: true });
