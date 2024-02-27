import Manager from './lib/Manager.js';
import Engineer from './lib/Engineer.js';
import Intern from './lib/Intern.js';
import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs';

// Get the questions
import managerQuestions from "./js/manager-questions.js";
import questions from "./js/questions.js";

// Selenium test
import runTest from "./js/selenium.js";

// Linter
import tidyOptions from "./js/tidy-options.js";

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

// function to initialize program
function init() {
    console.log("In init");
}

// function call to initialize program
init();

// function to write HTML file
function writeToFile(path, content, callback) {
    console.log("In writeToFile");

    try {
      fs.writeFileSync(path, content, 'utf8');
      console.log("HTML written.");
    } catch (err) {
      console.error("An error occurred:", err);
    }
}

inquirer
    .prompt(questions)
    .then((answers) => {
        console.log(answers);
        const markdown = generateHtml(answers);

        // Synchronous write
        writeToFile('html/index.html', markdown);

        // Linting
        tidy();

        // Optional testing
        if (test) {
            runSeleniumTest();
        }
    })
    .catch((err) => {
        if (err.isTtyError) {
        console.error("Prompt couldn't be rendered in the current environment", err);
        } else {
        console.error("Something went wrong", err);
        }
    });

    // Tidy the HTML content
    tidy(htmlContent, tidyOptions, (err, html) => {
        if (err) {
            console.error('Error tidying HTML:', err);
        } else {
            // Write the tidied HTML to a file
            fs.writeFileSync('tidied.html', html);
            console.log('HTML tidied and saved to tidied.html');
        }
    });

    async function runSeleniumTest() {
        try {
            console.log("Run selenium test");
            await runTest(); // Run the Selenium test
            console.log("Selenium test passed!");
        } catch (error) {
            console.error("Selenium test failed:", error);
        }
    }