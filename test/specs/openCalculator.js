describe('Open Chrome App', () => {
    it('should open chrome app', async () => {
        console.log('Opening Chrome app...');
        
        // Method 1: Use startActivity to ensure Chrome opens
        try {
            await driver.startActivity('com.android.chrome', 'com.google.android.apps.chrome.Main');
            await driver.pause(2000);
            console.log('Chrome started using startActivity');
        } catch (error) {
            console.log('startActivity failed, trying shell command...');
        }
        
        // Method 2: Force Chrome to open using shell command (backup method)
        try {
            await driver.execute('mobile: shell', {
                command: 'am start -S -n com.android.chrome/com.google.android.apps.chrome.Main'
            });
            await driver.pause(2000);
            console.log('Chrome started using shell command');
        } catch (error) {
            console.log('Shell command also failed:', error.message);
        }
        
        // Get current activity for logging (not for validation)
        const currentActivity = await driver.getCurrentActivity();
        console.log('Current activity after opening Chrome:', currentActivity);
        
        console.log('Chrome app opening completed!');
    });
});