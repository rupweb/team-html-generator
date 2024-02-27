import { Manager } from './lib/Manager.js';
import { Engineer } from './lib/Engineer.js';
import { Intern } from './lib/Intern.js';
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the questions
import managerQuestions from './js/manager-questions.js';
import internQuestions from './js/intern-questions.js';
import engineerQuestions from './js/engineer-questions.js';
import menuQuestions from './js/menu-questions.js';

// Selenium test
import { runTest } from './js/selenium.js';
let managerName = '';
let managerEmail = '';

// Linter
import { tidyOptions } from './js/tidy-options.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, "team.html");

import { completedPage }from './src/page-template.js';
const teamMembers = [];

// function to initialize program
function init() {
    console.log("In init");
    promptManager();
}

// function call to initialize program
init();

function promptManager() {
    console.log("In promptManager");

    inquirer
        .prompt(managerQuestions)
        .then((answers) => {
            console.log(answers);

            // For selenium test
            managerName = answers.name;
            managerEmail = answers.email;

            const manager = new Manager(answers.name, answers.id, answers.email, answers.office);
            teamMembers.push(manager);
            promptMenu();
    })
    .catch((err) => {
        if (err.isTtyError) {
          console.error("Prompt couldn't be rendered in the current environment", err);
        } else {
          console.error("Something went wrong", err);
        }
      });
}

function promptMenu() {
    console.log("In promptMenu");

    inquirer.prompt(menuQuestions).then((answers) => {
        console.log(answers);
        switch (answers.choice) {
            case 'Add an engineer':
                promptEngineer();
                break;
            case 'Add an intern':
                promptIntern();
                break;
            case 'Finish building the team':
                const html = completedPage(teamMembers);
                writeToFile(outputPath, html);
                runSeleniumTest();
                break;
            default:
                console.log("No option chosen");
                break;
        }
    });

    console.log("Out promptMenu");
}

function promptEngineer() {
    console.log("In promptEngineer");

    inquirer.prompt(engineerQuestions).then((answers) => {
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        teamMembers.push(engineer);
        promptMenu();
    });

    console.log("Out promptEngineer");
}

function promptIntern() {
    console.log("In promptIntern");

    inquirer.prompt(internQuestions).then((answers) => {
        const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        teamMembers.push(intern);
        promptMenu();
    });

    console.log("Out promptIntern");
}

// function to write HTML file
function writeToFile(path, content) {
    console.log("In writeToFile");
    try {
      fs.writeFileSync(path, content, 'utf8');
      console.log("HTML written.");
    } catch (err) {
      console.error("An error occurred:", err);
    }
}

async function runSeleniumTest() {
    try {
        console.log("Run selenium test");
        await runTest(outputPath, managerName, managerEmail); // Run Selenium test on the new html file
        console.log("Selenium test passed!");
    } catch (error) {
        console.error("Selenium test failed:", error);
    }
}