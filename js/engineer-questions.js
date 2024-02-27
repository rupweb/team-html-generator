const engineerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the engineer name?',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter an engineer!');
                return false;
            }
        },
        default: 'My Project'
    },
    {
        type: 'input',
        name: 'id',
        message: 'Please enter engineer employee id.',
        validate: idInput => {
            if (idInput) {
                return true;
            } else {
                console.log('Please enter engineer id!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is the engineer email?',
        validate: engineerEmail => {
            if (engineerEmail) {
                return true;
            } else {
                console.log('Please enter an engineer email!');
                return false;
            }
        },
        default: 'My Project'
    },
    {
        type: 'input',
        name: 'github',
        message: 'Please enter engineer github user.',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('Please enter engineer github user!');
                return false;
            }
        }
    }
];

export default engineerQuestions;