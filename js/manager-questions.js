const managerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the team manager name?',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter a manager!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'id',
        message: 'Please enter manager employee id.',
        validate: idInput => {
            if (idInput) {
                return true;
            } else {
                console.log('Please enter manager id!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is the manager email?',
        validate: managerEmail => {
            if (managerEmail) {
                return true;
            } else {
                console.log('Please enter a manager email!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'office',
        message: 'Please enter manager office number.',
        validate: officeInput => {
            if (officeInput) {
                return true;
            } else {
                console.log('Please enter manager office number!');
                return false;
            }
        }
    }
];

export default managerQuestions;