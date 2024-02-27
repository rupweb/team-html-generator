import { runTest } from '../js/selenium-jest.js';
import path from 'path';

describe('Selenium HTML test', () => {
    it('should test the HTML file using Selenium', async () => {
        const outputPath = path.resolve(__dirname, '../output/teamTest.html');
        await runTest(outputPath, "test1", "a@b.com");
    });
});
