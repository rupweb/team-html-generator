import { Builder, By } from 'selenium-webdriver';
import { expect } from 'chai'; 

async function runTest(outputPath, name, email) {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('file://' + outputPath);

        // Test for page title
        const title = await driver.getTitle();
        expect(title).to.equal('My Team'); // Chai syntax

        // Test for heading text
        const heading = await driver.findElement(By.className('jumbotron')).getText();
        expect(heading).to.include('My Team'); // Chai syntax

        // Test for manager's card information
        const managerName = await driver.findElement(By.css('.card-title')).getText();
        expect(managerName).to.equal(name); // Chai syntax

        const managerRole = await driver.findElement(By.css('.card-title i')).getAttribute('class');
        expect(managerRole).to.include('fas fa-mug-hot'); // Chai syntax

        const managerEmail = await driver.findElement(By.css('.card-body a')).getAttribute('href');
        expect(managerEmail).to.equal("mailto:" + email); // Chai syntax
    } finally {
        await driver.quit();
    }
}

export { runTest }; // Export to Jest
