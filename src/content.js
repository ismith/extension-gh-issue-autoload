(function () {
  const BUTTON_SELECTOR = 'button[data-testid="issue-timeline-load-more-load-top"]';
  const COUNT_SELECTOR = 'span[data-testid="issue-timeline-load-more-count-load-top"]';
  const CLICK_DELAY_MS = 500;

  function clickLoadMoreButton() {
    const button = document.querySelector(BUTTON_SELECTOR);
    if (!button) {
      return false;
    }

    const countSpan = document.querySelector(COUNT_SELECTOR);
    const remaining = countSpan ? countSpan.textContent.trim() : 'unknown';
    console.log(`[GitHub Autoload] Loading more items... (${remaining} remaining)`);

    button.click();
    return true;
  }

  function startObserver() {
    // Initial check
    if (clickLoadMoreButton()) {
      console.log('[GitHub Autoload] Found initial load more button, clicking...');
    }

    const observer = new MutationObserver(() => {
      // Debounce to allow DOM to settle
      setTimeout(() => {
        if (clickLoadMoreButton()) {
          // Button was found and clicked, observer continues watching
        }
      }, CLICK_DELAY_MS);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    console.log('[GitHub Autoload] Observer started, watching for load more buttons...');
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startObserver);
  } else {
    startObserver();
  }
})();