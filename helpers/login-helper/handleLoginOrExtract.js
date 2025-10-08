import login from './login.js';
import extractMessages from './extractMessages.js';
import checkLoginText from './checkLoginText.js';

async function handleLoginOrExtract() {
    const isLoginTextDisplayed = await checkLoginText();
    console.log('Is "Login" TextView displayed?', isLoginTextDisplayed);
  
    if (isLoginTextDisplayed) {
      await login();
    } else {
      await extractMessages();
    }
  }

module.exports = handleLoginOrExtract;