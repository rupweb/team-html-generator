import { Manager } from './lib/Manager.js';
import { Engineer } from './lib/Engineer.js';
import { Intern } from './lib/Intern.js';
import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs';

// Get the questions
import managerQuestions from './js/manager-questions.js';
import internQuestions from './js/intern-questions.js';
import engineerQuestions from './js/engineer-questions.js';
import menuQuestions from './js/menu-questions.js';

// Selenium test
import { runTest } from './js/selenium.js';

// Linter
import { tidyOptions } from './js/tidy-options.js';

const OUTPUT_DIR = path.resolve(path.dirname(new URL(import.meta.url).pathname), 'output');
const outputPath = path.join(OUTPUT_DIR, "team.html");

import { render } from './src/page-template.js';
const teamMembers = [];

// function to initialize program
function init() {
    console.log("In init");
    promptManager();

    console.log("Lint HTML");
    tidy(htmlContent, tidyOptions, (err, html) => {
        if (err) {
            console.error('Error tidying HTML:', err);
        } else {
            // Write the tidied HTML to a file
            fs.writeFileSync('tidied.html', html);
            console.log('HTML tidied and saved to tidied.html');
        }
    });

    console.log("Run selenium test");
    runSeleniumTest();
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

function promptManager() {
    inquirer.prompt(managerQuestions).then(answers => {
        const manager = new Manager(answers.name, answers.id, answers.email, answers.office);
        teamMembers.push(manager);
        promptMenu();
    }); 
}

function promptEngineer() {
    inquirer.prompt(engineerQuestions).then(answers => {
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        teamMembers.push(engineer);
        promptMenu();
    });
}

function promptIntern() {
    inquirer.prompt(internQuestions).then(answers => {
        const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        teamMembers.push(intern);
        promptMenu();
    });
}

function promptMenu() {
    inquirer.prompt(menuQuestions).then(answers => {
        switch (answers.menu) {
            case 'Add an Engineer':
                promptEngineer();
                break;
            case 'Add an Intern':
                promptIntern();
                break;
            case 'Finish building the team':
                render();
                break;
            default:
                break;
        }
    });
}

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

module.exports = outputPath;