const { Builder, By, Key, until } = require('selenium-webdriver');
const path = require('path');

async function runTest() {
    console.log("In selenium runTest");

    let driver = await new Builder().forBrowser('chrome').build();
    
    const indexPath = path.resolve(__dirname, '../html/index.html'); // File under test
    try {
        await driver.get('file://' + indexPath);
        
        const heading = await driver.findElement(By.id('heading')).getText();
        const button = await driver.findElement(By.id('button'));

        expect(heading).toEqual('Hello World!'); // Jest assertion
        await button.click();
        const buttonText = await button.getText();
        expect(buttonText).toEqual('Click me'); // Jest assertion
    } finally {
        await driver.quit();
    }
}

module.exports = runTest(); // Export to Jest