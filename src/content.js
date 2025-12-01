(function() {
  "use strict";

  const BUTTON_SELECTOR = "button[data-testid=\"issue-timeline-load-more-load-top\"]";
  const COUNT_SELECTOR = "span[data-testid=\"issue-timeline-load-more-count-load-top\"]";
  const CHECK_INTERVAL = 500;

  function getLoadMoreButton() {
    return document.querySelector(BUTTON_SELECTOR);
  }

  function getCountText() {
    const countSpan = document.querySelector(COUNT_SELECTOR);
    return countSpan ? countSpan.textContent : null;
  }

  function clickLoadMore() {
    const button = getLoadMoreButton();
    if (button) {
      const count = getCountText();
      console.log(`[GH Issue Autoload] Loading more comments... (${count || "unknown"} remaining)`);
      button.click();
      return true;
    }
    return false;
  }

  function startAutoLoad() {
    console.log("[GH Issue Autoload] Extension activated, checking for Load More button...");

    const interval = setInterval(() => {
      if (!clickLoadMore()) {
        console.log("[GH Issue Autoload] All comments loaded.");
        clearInterval(interval);
      }
    }, CHECK_INTERVAL);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startAutoLoad);
  } else {
    startAutoLoad();
  }
})();