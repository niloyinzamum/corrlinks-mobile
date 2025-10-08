  async function login() {
    console.log('Logging in...');
    // Use class and index for User Id and Password fields
    const editTexts = await $$(
      'android=new UiSelector().className("android.widget.EditText")'
    );
    await editTexts[0].setValue('abs.mtvil@gmail.com'); // User Id
    await editTexts[1].setValue('ABScoversALLtheUSA4u'); // Password
  
    // Find the login button (first android.widget.Button on screen)
    const loginBtn = await $("//*[@clickable='true' and .//android.widget.TextView[@text='Login']]");
    await loginBtn.click();
  
    await driver.pause(10000);
  }

  export default login;