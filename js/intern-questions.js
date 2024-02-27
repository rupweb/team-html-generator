const internQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the intern name?',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter an intern!');
                return false;
            }
        },
        default: 'My Project'
    },
    {
        type: 'input',
        name: 'id',
        message: 'Please enter intern employee id.',
        validate: idInput => {
            if (idInput) {
                return true;
            } else {
                console.log('Please enter intern id!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is the intern email?',
        validate: internEmail => {
            if (internEmail) {
                return true;
            } else {
                console.log('Please enter a intern email!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'school',
        message: 'Please enter intern school.',
        validate: internInput => {
            if (internInput) {
                return true;
            } else {
                console.log('Please enter intern school!');
                return false;
            }
        }
    }
];

export default internQuestions;