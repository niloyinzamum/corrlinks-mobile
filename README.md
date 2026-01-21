# Mobile App Automation

Automate Android app testing using WebdriverIO and Appium. Supports both real devices and emulators.

---

## Prerequisites
### Required Software
Install these on your computer before starting:

- **Node.js** (v16 or v18 recommended): [https://nodejs.org/](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Java JDK** (v11+): Required for Android tools. [AdoptOpenJDK](https://adoptium.net/)
- **Android Studio**: Includes Android SDK, Emulator, ADB drivers. [Download](https://developer.android.com/studio)
- **Appium**: Automatically installed via project dependencies, but you can use Appium Desktop (optional): [https://github.com/appium/appium-desktop](https://github.com/appium/appium-desktop)
- **Git** (for repository operations): [https://git-scm.com/](https://git-scm.com/)

---

## Device Preparation
### Android Emulator
- Launch Android Studio > Open **Device Manager** > Create and start a virtual device (emulator)
- Or use CLI: `emulator -avd <emulator_name>`

### Real Android Device
1. Enable **Developer options** and **USB Debugging** on your phone:
   - Settings > About phone > Tap Build number 7 times to unlock Developer options
   - Settings > Developer options > Enable **USB debugging**
2. Connect the phone via USB cable.
3. On your PC, open a terminal and run:
   ```bash
   adb devices
   ```
   If prompted on your device, allow USB debugging.
   Your device should show in the list.

*ADB (`adb` command) comes with Android Studio.*

---

## Initial Setup

1. **Clone & Install dependencies:**
   ```bash
   git clone <your-repo-url>
   cd Mobile\ App\ Automation
   npm install
   ```
2. **Start Appium Server:**
   - In one terminal:
     ```bash
     npm run start:appium
     # or
     npx appium
     ```
3. **Start your emulator OR connect your real device.**
   - Verify device:
     ```bash
     npm run list:devices
     # or
     adb devices
     ```

---

## Running Tests
- Standard run:
  ```bash
  npm test
  # or
  npm run test:headed
  ```
- Headless (no emulator GUI):
  ```bash
  npm run test:headless
  ```

---

## Configuration
- **Change testing device or app:** Edit `capabilities` in `wdio.conf.js`.
   - Update:
     - `deviceName` and `udid` (get by running `adb devices`)
     - `appPackage` and `appActivity` (use `adb shell pm list packages` and `adb shell dumpsys package <package> | grep Activity`)
- **App install/uninstall:**
   - Update the APK path in `package.json` script if changing app
   - Install: `npm run install:app`
   - Uninstall: `npm run uninstall:app`

---

## Project Structure
- `test/specs/` – Main test scripts
- `test/pageobjects/` – Page object models
- `helpers/` – Utility functions, login, extraction
- `wdio.conf.js` – Main config (edit this for device/app changes)

---

## Deploy to GitHub
1. `.gitignore` excludes node_modules, logs, and build files automatically.
2. To upload:
   ```bash
   git init
   git add .
   git remote add origin <your-repo-url>
   git commit -m "Initial commit"
   git push -u origin main
   ```

---

## Troubleshooting
- If your device isn’t listed: Install Android USB drivers, restart adb (`adb kill-server && adb start-server`), reconnect cable, or restart emulator.
- Appium errors? Check your Java and Node.js versions.
- Emulator issues? Use Android Studio’s Device Manager.
- Still having trouble? Consult logs in `appium-logs/` or ask your developer.

---

**For further help, check script comments or open an issue in the repository.**
