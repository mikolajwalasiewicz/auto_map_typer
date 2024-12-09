chrome.action.onClicked.addListener((tab) => {
  // Validate the URL
  if (!tab.url.startsWith("http") || tab.url.startsWith("chrome://")) {
    console.log("Cannot run the extension on this page:", tab.url);
    alert("This extension does not work on Chrome system pages.");
    return;
  }

  // Execute script on web pages
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: openChatAndTypeMessage,
  })
    .then(() => {
      console.log("Script executed successfully.");
    })
    .catch((error) => {
      console.error("Error executing script:", error);
    });
});

function openChatAndTypeMessage() {
  console.log("Function openChatAndTypeMessage started.");

  // Locate and click the chat button
  const chatButton = document.querySelector(
    "#canvas-body > div > div.MatchRoom__MainHolder-sc-96077666-3.bZwYJu > div > div.MatchRoom__MatchRoomNavBarHolder-sc-96077666-1.iJulnm > div > div.NavBar__Expand-sc-2a481647-3.gqUhsj > div > button"
  );

  if (chatButton) {
    chatButton.click();
    console.log("Chat button clicked.");

    setTimeout(() => {
      // Handle multiple inputs
      const inputs = [
        document.querySelector(
          "#canvas-body > div > div.MatchRoom__ChatSidebarContainer-sc-96077666-7.hwlfKJ > div > div:nth-child(2) > div.ChatSection__ChatContainer-sc-79bcb534-3.PCDbx > div > div > div > div > div > div > div.Channel__commonCss-sc-c233e347-4.Channel__MessagesAndInput-sc-c233e347-5.bEbIfD.cLneRf.chat-messages-and-input > div.Channel__Input-sc-c233e347-10.fvrauG.chat-input"
        ),
        document.querySelector(
          "#canvas-body > div > div.MatchRoom__ChatSidebarContainer-sc-96077666-7.hwlfKJ > div > div:nth-child(2) > div.ChatSection__ChatContainer-sc-79bcb534-3.PCDbx > div > div > div > div > div > div > div.Channel__commonCss-sc-c233e347-4.Channel__MessagesAndInput-sc-c233e347-5.bEbIfD.cLneRf.chat-messages-and-input > div.Channel__Input-sc-c233e347-10.fvrauG.chat-input > div"
        ),
      ];

      inputs.forEach((input, index) => {
        if (input) {
          console.log(`Input ${index + 1} found.`);
          const inputField = input.querySelector("textarea");
          if (inputField) {
            inputField.focus(); // Focus on the input field

            // Type the message character by character
            const message = "-nuke -vertigo";
            message.split("").forEach((char) => {
              const keydownEvent = new KeyboardEvent("keydown", {
                bubbles: true,
                cancelable: true,
                key: char,
                char: char,
                keyCode: char.charCodeAt(0),
              });
              inputField.dispatchEvent(keydownEvent);

              inputField.value += char; // Add character to the input field
              inputField.dispatchEvent(new Event("input", { bubbles: true }));

              const keyupEvent = new KeyboardEvent("keyup", {
                bubbles: true,
                cancelable: true,
                key: char,
                char: char,
                keyCode: char.charCodeAt(0),
              });
              inputField.dispatchEvent(keyupEvent);
            });

            // Simulate pressing Enter to send the message
            const enterEvent = new KeyboardEvent("keydown", {
              bubbles: true,
              cancelable: true,
              key: "Enter",
              code: "Enter",
              keyCode: 13,
            });
            inputField.dispatchEvent(enterEvent);

            console.log(`Message typed and sent in input ${index + 1}`);
          } else {
            console.log(`No textarea found in input ${index + 1}`);
          }
        } else {
          console.log(`Input ${index + 1} not found.`);
        }
      });
    }, 1000); // Wait 1 second for the chat to open
  } else {
    console.log("Chat button not found.");
  }
}
