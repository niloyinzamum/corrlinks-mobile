  
  async function extractMessages() {
    // Loop through first 5 chats
    for (let chatIndex = 0; chatIndex < 5; chatIndex++) {
      try {
        const chats = await $$(
          'android=new UiSelector().className("android.view.View").clickable(true)'
        );
        if (!chats[chatIndex]) break;
  
        await chats[chatIndex].click();
        await driver.pause(1500);
  
        // Extract all message elements
        const messages = await $$(
          'android=new UiSelector().className("android.widget.TextView")'
        );
        const lastMessageElem = messages[messages.length - 1];
        const lastMessage = await lastMessageElem.getText();
  
        // Extract names (adjust selectors as needed)
        const nameElements = await $$(
          'android=new UiSelector().className("android.widget.TextView")'
        );
        const from = await nameElements[0].getText();
        const to = await nameElements[1].getText();
  
        console.log({
          from,
          to,
          body: lastMessage,
          scrapedAt: new Date().toISOString(),
        });
  
        // Go back to chat list
        await driver.back();
        await driver.pause(1000);
      } catch (err) {
        console.error('Error handling chat:', err);
        try {
          await driver.back();
        } catch (_) {}
        await driver.pause(1000);
      }
    }
  }

  module.exports = extractMessages;