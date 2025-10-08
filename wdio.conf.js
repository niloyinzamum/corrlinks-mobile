exports.config = {
    runner: 'local', // local means the test will be run on the local machine

    specs: [
        './test/specs/extractMobileMessages.e2e.js',
        // './test/specs/**/*.js'
        // './test/specs/openCalculator.js'
    ],

    exclude: [],

    maxInstances: 1, // Keep at 1 for real device testing

    // capabilities: [{
    //     platformName: 'Android',
    //     'appium:deviceName': 'Mi9T',
    //     'appium:udid': 'f382abb1',
    //     'appium:platformVersion': '10',
    //     'appium:automationName': 'UiAutomator2',
    //     'appium:appPackage': 'com.advtechgrp.corrlinks.chat.text',
    //     // 'appium:appPackage': 'com.android.chrome',
    //     'appium:appActivity': 'com.advtechgrp.corrlinks.chat.text.MainActivity',
    //     // 'appium:appActivity': 'com.google.android.apps.chrome.Main',
    //     'appium:noReset': true,
    //     'appium:newCommandTimeout': 300,
    //     'appium:adbExecTimeout': 20000,
    //     // Remove specific ports to let Appium auto-assign
    //     'appium:autoGrantPermissions': true,
    //     'appium:ignoreHiddenApiPolicyError': true,
    //     'appium:disableWindowAnimation': true
    // }],

    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'sdk_gphone64_x86_64',        // emulator name
        'appium:udid': 'emulator-5554',                    // default ADB id for first emulator
        'appium:platformVersion': '13',                    // Android version
        'appium:automationName': 'UiAutomator2',
        'appium:appPackage': 'com.advtechgrp.corrlinks.chat.text',
        // 'appium:appPackage': 'com.android.chrome',
        'appium:appActivity': 'com.advtechgrp.corrlinks.chat.text.MainActivity',
        // 'appium:appActivity': 'com.google.android.apps.chrome.Main',
        'appium:noReset': true,
        'appium:newCommandTimeout': 300,
        'appium:adbExecTimeout': 20000,
        // let Appium auto-assign ports:
        'appium:autoGrantPermissions': true,
        'appium:ignoreHiddenApiPolicyError': true,
        'appium:disableWindowAnimation': true
      }],

    logLevel: 'error',
    bail: 0, // bail means the test will stop running if an error occurs
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    services: [
        ['appium', {
            command: 'appium',
            args: {
                address: 'localhost',
                port: 4723,
                basePath: '/'
            },
            logPath: './appium-logs/'
        }]
    ],

    framework: 'mocha',
    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    // Hooks for real device testing
    beforeSession: function (config, capabilities) {
        console.log('Starting session with real device:', capabilities['appium:udid']);
    },

    afterSession: function (config, capabilities, specs) {
        console.log('Session ended with device:', capabilities['appium:udid']);
    }
}



// exports.config = {
//     runner: 'local',

//     specs: [
//         // './test/specs/extractMobileMessages.e2e.js',
//         // './test/specs/**/*.js'
//         './test/specs/openCalculator.js'
//     ],

//     exclude: [],

//     maxInstances: 1, // Keep at 1 for real device testing

//     capabilities: [{
//         platformName: 'Android',
//         'appium:deviceName': 'Mi9T',
//         'appium:udid': 'f382abb1',
//         'appium:platformVersion': '10',
//         'appium:automationName': 'UiAutomator2', // Added back - this is required
//         'appium:appPackage': 'com.android.chrome',
//         'appium:appActivity': 'com.google.android.apps.chrome.Main', // Added back - this is required
//         'appium:noReset': true,
//         'appium:newCommandTimeout': 300,
//         'appium:adbExecTimeout': 20000,
//         'appium:autoGrantPermissions': true, // Removed duplicate
//         'appium:ignoreHiddenApiPolicyError': true,
//         'appium:disableWindowAnimation': true
//     }],

//     logLevel: 'info',
//     bail: 0,
//     waitforTimeout: 10000,
//     connectionRetryTimeout: 120000,
//     connectionRetryCount: 3,

//     services: [
//         ['appium', {
//             command: 'appium',
//             args: {
//                 address: 'localhost',
//                 port: 4723,
//                 basePath: '/'
//             },
//             logPath: './appium-logs/'
//         }]
//     ],

//     framework: 'mocha',
//     reporters: ['spec'],

//     mochaOpts: {
//         ui: 'bdd',
//         timeout: 60000
//     },

//     // Hooks for real device testing
//     beforeSession: function (config, capabilities) {
//         console.log('Starting session with real device:', capabilities['appium:udid']);
//     },

//     afterSession: function (config, capabilities, specs) {
//         console.log('Session ended with device:', capabilities['appium:udid']);
//     }
// }