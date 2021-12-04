/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global global, Office, self, window */

Office.onReady(() => {
  // If needed, Office.js is ready to be called
});

const cleanupMessage = (message) => {
  let content = message;
  content = content.replace(/^\s*\n/gm, "");
  content = content.replace(/(\r\n|\r|\n){2,}/g, "$1\n");
  content = content.replace(/^\t*/gm, "");

  /*let from = content.match(/From: .*([a-zA-Z0-9._-]+)@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+.*\n/g)
  let to = content.match(/To: .*\n/g)
  let sent = content.match(/Sent: .*\n/g)
  console.log(content)
  console.log(from)
  console.log(to)
  console.log(sent)*/
  content = content.replace(/To: .*\r/g, "");
  content = content.replace(/Cc: .*\r/g, "");
  content = content.replace(/Bcc: .*\r/g, "");
  content = content.replace(/Subject: .*\r/g, "");
  content = content.replace(/Sent: .*\r/g, "");
  content = content.replace(/From: .*<([a-zA-Z0-9._-]+)@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+.*\r/g, "$1 : ");
  // console.log(content)
  return content;
};

/**
 * Shows a notification when the add-in command is executed.
 * @param event {Office.AddinCommands.Event}
 */
function action(event) {
  let item = Office.context.mailbox.item;
  item.body.getAsync(Office.CoercionType.Text, (asyncResult) => {
    let content = asyncResult.value.trim();
    content = cleanupMessage(content);
    if (content.length > 2000) {
      console.log(`Content is being trimmed from ${content.length}`);
      content = content.substring(0, 2000);
    }
    let formData = new FormData();
    formData.append("content", content);
    formData.append("suggestion", "Suggest a response for this email");
    fetch("http://3.7.255.107:7000/suggest-reply", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        console.log(data);
        item.body.prependAsync(data, () => {
          event.completed();
        });
      });
  });
}

function getGlobal() {
  return typeof self !== "undefined"
    ? self
    : typeof window !== "undefined"
    ? window
    : typeof global !== "undefined"
    ? global
    : undefined;
}

const g = getGlobal();

// The add-in command functions need to be available in global scope
g.generateReply = action;
