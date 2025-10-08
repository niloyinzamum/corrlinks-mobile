async function checkLoginText() {
    console.log('Checking if login text is displayed...');
    console.log('Checking if login text is displayed...');
    console.log('Checking if login text is displayed...');
    console.log('Checking if login text is displayed...');
    const loginTextView = await $(
      'android=new UiSelector().className("android.widget.TextView").text("Login")'
    );
    return loginTextView.isDisplayed();
  }
  
export default checkLoginText;