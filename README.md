# GitHub Autoload Chrome Extension

GitHub Issues pages - https://{github.com|*.ghe.com}/{org}/{repo}/issues/{id} - only request a subset of comments. To get the rest, if a Load more button exists, you have to click it.

This is annoying, but not doing it leaves you with insufficient context to work. Unfortunately, there is a [layout bug](https://github.com/github/issues/issues/17917) (see also [this related  issue](https://github.com/github/issues/issues/16633#issuecomment-3195396320)) such that it scrolls to the wrong position, making doing this while working or reading the issue disruptive.

This extension just does that all for you up front.

1. Checking if `button[data-testid="issue-timeline-load-more-load-top"]` exists.
2. If so, get the textContent of `span[data-testid="issue-timeline-load-more-count-load-top"`, log to console the number of items remaining to load, then click the button.
3. Keep watching for a new or changed button with that selector, and loop until done.