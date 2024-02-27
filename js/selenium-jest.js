import { Builder, By } from 'selenium-webdriver';

async function runTest(outputPath, name, email) {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('file://' + outputPath);

        // Test for page title
        const title = await driver.getTitle();
        expect(title).toBe('My Team');

        // Test for heading text
        const heading = await driver.findElement(By.className('jumbotron')).getText();
        expect(heading).toContain('My Team');

        // Test for manager's card information
        const managerName = await driver.findElement(By.css('.card-title')).getText();
        expect(managerName).toBe(name);

        const managerRole = await driver.findElement(By.css('.card-title i')).getAttribute('class');
        expect(managerRole).toContain('fas fa-mug-hot');

        const managerEmail = await driver.findElement(By.css('.card-body a')).getAttribute('href');
        expect(managerEmail).toBe("mailto:" + email);
    } finally {
        await driver.quit();
    }
}

export { runTest }; // Export to Jest
