console.log('Content script works!');
class Extractor {
  constructor() {}

  getPageData() {}

  isPageDetected() {}
}

const cleanupMessage = (message) => {
  let content = message;
  content = content.replace(/^\s*\n/gm, "");
  content = content.replace(/(\r\n|\r|\n){2,}/g, "$1\n");
  content = content.replace(/^\t*/gm, "");
  content = content.replace(/^\s*\r/gm, "");

  /*let from = content.match(/From: .*([a-zA-Z0-9._-]+)@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+.*\n/g)
  let to = content.match(/To: .*\n/g)
  let sent = content.match(/Sent: .*\n/g)
  console.log(content)
  console.log(from)
  console.log(to)
  console.log(sent)*/
  content = content.replace(/To: .*\n/g, "");
  content = content.replace(/Cc: .*\n/g, "");
  content = content.replace(/Bcc: .*\n/g, "");
  content = content.replace(/Subject: .*\n/g, "");
  content = content.replace(/Sent: .*\n/g, "");
  content = content.replace(/From: .*<([a-zA-Z0-9._-]+)@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+.*\n/g, "$1 : ");
  content = content.replace(/To: .*\r/g, "");
  content = content.replace(/Cc: .*\r/g, "");
  content = content.replace(/Bcc: .*\r/g, "");
  content = content.replace(/Subject: .*\r/g, "");
  content = content.replace(/Sent: .*\r/g, "");
  content = content.replace(/From: .*<([a-zA-Z0-9._-]+)@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+.*\r/g, "$1 : ");
  // console.log(content)
  return content;
};

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
    let contents = document.querySelectorAll('.wiki-content');
    let content = contents[contents.length - 1].innerText
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
      ).cloneNode(true);
      let timestamp = update
        .querySelector('.request_head .upd-time')
        .getAttribute('data-timestamp');
      
      // Cleaup links & tables
      let tables = content.querySelectorAll('table');
      tables.forEach((table) => {
        table.parentNode.removeChild(table);
      });
      let links = content.querySelectorAll('a');
      links.forEach((link) => {
        link.parentNode.removeChild(link);
      })
      content = content.innerText;

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
    for (let i =0; i < extractors.length; i++) {
      const extractor = extractors[i];
      if (extractor.isPageDetected()) {
        let content = extractor.getPageData()
        content = cleanupMessage(content)
        if (content.length > 2000) {
          // use only first 5000 characters
          content = content.substring(0, 2000);
        }
        sendResponse(content);
        break;
      }
    }
  }
});
