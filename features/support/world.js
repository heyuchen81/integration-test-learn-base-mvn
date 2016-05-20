'use strict';

var fs = require('fs');
var webdriver = require('selenium-webdriver');
var platform = "FIREFOX"; // "BROWSERSTACK";  //"CHROME";  // process.env.PLATFORM || "CHROME";

// var buildAndroidDriver = function() {
// return new webdriver.Builder().
// usingServer('http://localhost:4723/wd/hub').
// withCapabilities({
// platformName: 'Android',
// platformVersion: '4.4',
// deviceName: 'Android Emulator',
// browserName: 'Chrome'
// }).
// build();
// };
//
 var buildChromeDriver = function() {
 return new webdriver.Builder().
 withCapabilities(webdriver.Capabilities.chrome()).
 build();
 };

 var buildFirefoxDriver = function() {
	 
	    console.log('HE**YU**CHEN: OUTPUT STARTS.');
		console.log('HE**YU**CHEN: ENV MODE IS: ' + process.env.mode);
		console.log('HE**YU**CHEN: ENV USERNAME IS: ' + process.env.USERNAME);
		console.log('HE**YU**CHEN: ENV AUTOMATE_KEY IS: ' + process.env.AUTOMATE_KEY);
		console.log('HE**YU**CHEN: OUTPUT COMPLETES.');
	 
 return new webdriver.Builder().
 withCapabilities(webdriver.Capabilities.firefox()).
 build();
 };

var buildBrowserStackDriver = function() {

	
	var capabilities = {
		'browserName' : 'chrome',
		'browserstack.user' : 'xinhe1',
		'browserstack.key' : 'myHB39JW5AqqzGMhAzzT',
		'browserstack.debug' : 'true'
	};
	return new webdriver.Builder().usingServer(
			'http://hub.browserstack.com/wd/hub')
			.withCapabilities(capabilities).build();
};

switch (platform) {
// case 'ANDROID':
// var driver = buildAndroidDriver();
// break;
 case 'FIREFOX':
 var driver = buildFirefoxDriver();
 break;
 case 'CHROME':
 var driver = buildChromeDriver();
 break;
default:
	var driver = buildBrowserStackDriver();
}

var getDriver = function() {
	return driver;
};

var World = function World() {

	var defaultTimeout = 20000;
	var screenshotPath = "screenshots";

	this.webdriver = webdriver;
	this.driver = driver;

	if (!fs.existsSync(screenshotPath)) {
		fs.mkdirSync(screenshotPath);
	}

	this.waitFor = function(cssLocator, timeout) {
		var waitTimeout = timeout || defaultTimeout;
		return driver.wait(function() {
			return driver.isElementPresent({
				css : cssLocator
			});
		}, waitTimeout);
	};
};

module.exports.World = World;
module.exports.getDriver = getDriver;
