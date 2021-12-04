console.log('Content script works!');
class Extractor {
  constructor() {}

  getPageData() {}

  isPageDetected() {}
}

class AllPages extends Extractor {
  constructor() {
    super();
  }

  getPageData() {
    let content = document.body.innerText;
    if (content.length > 5000) {
      // use only first 5000 characters
      content = content.substring(0, 5000);
    }
    return content;
  }

  isPageDetected() {
    return true;
  }
}

class WikiExtractor extends Extractor {
  constructor() {
    super();
  }

  getPageData() {
    let content = document.querySelector('#main-content').innerText;
    let title = document.querySelector(
      '#main #title-heading #title-text'
    ).innerText;
    return `${title}\n${content}`;
  }

  isPageDetected() {
    const url = window.location.href;
    if (url.includes('wiki')) {
      let content = document.querySelector('#main-content');
      if (content) {
        return true;
      }
    }
    return false;
  }
}

class TicketExtractor extends Extractor {
  constructor() {
    super();
  }

  getPageData() {
    let container = document.querySelector('#updates_container');
    let updates = container.querySelectorAll('.request_item');

    // Iterate through updates nodelist
    const extractedContents = [...updates].map((update) => {
      let id = update.getAttribute('data-updateid');
      let user = update
        .querySelector('.request_head .user-details .user-mouseover')
        .getAttribute('data-user');
      let content = update.querySelector(
        '.update_container .request_desc'
      ).innerText;
      let timestamp = update
        .querySelector('.request_head .upd-time')
        .getAttribute('data-timestamp');
      return { id, user, content, timestamp };
    });

    // Sort extractedContents by id
    const sortedContents = extractedContents.sort((a, b) => {
      return a.id - b.id;
    });

    let content = '';
    sortedContents.forEach((update) => {
      if (update.content && update.content.length > 0) {
        content += `${update.user}: ${update.content}\n`;
      }
    });
    return content;
  }

  isPageDetected() {
    const url = window.location.href;
    if (url.includes('desflow')) {
      let content = document.querySelector('#updates_container');
      if (content) {
        return true;
      }
    }
    return false;
  }
}

const extractors = [new WikiExtractor(), new TicketExtractor(), new AllPages()];
chrome.runtime.onMessage.addListener((event, sender, sendResponse) => {
  if (event.type === 'get-page-data') {
    extractors.forEach((extractor) => {
      if (extractor.isPageDetected()) {
        sendResponse(extractor.getPageData());
      }
    });
  }
});
