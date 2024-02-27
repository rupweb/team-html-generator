import { Builder, By } from 'selenium-webdriver';
import path from 'path';

async function runTest(outputPath) {
    console.log("In selenium runTest");

    let driver = await new Builder().forBrowser('chrome').build();
    
    const indexPath = path.resolve(__dirname, outputPath); // File under test
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

export { runTest }; // Export to Jest