const inquirer = require('inquirer');
module.exports = {
  askGithubCredentials: () => {
    const questions = [
      {
        name: 'username',
        type: 'input',
        message: 'Enter your GitHub username or e-mail address:',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your username or e-mail address.';
          }
        }
      },
      {
        name: 'password',
        type: 'password',
        message: 'Enter your password:',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your password.';
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },
  askViewDirPath: () => {
    const questions = [
      {
        name: 'path',
        type: 'input',
        message: 'Enter the path of Dir where the list of files you want to view:',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Enter the path of Dir where the list of files you want to view:';
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },
  askFilePath: () => {
    const questions = [
      {
        name: 'path',
        type: 'input',
        message: 'Enter the path of file:',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Enter the correct path of file:';
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },
  askWriteFilePath: () => {
    const questions = [
      {
        name: 'path',
        type: 'input',
        message: 'Enter the path of Dir where you want to create new file:',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Enter the path of Dir where you want to create new file:';
          }
        }
      },
      {
        name: 'filename',
        type: 'input',
        message: 'Enter the filename to save it:',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Enter the filename to save it:';
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },

  askFaceBookCredentials: () => {
    const questions = [
      {
        name: 'username',
        type: 'input',
        message: 'Enter your Facebook username or e-mail address:',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your Facebook username or e-mail address.';
          }
        }
      },
      {
        name: 'password',
        type: 'password',
        message: 'Enter your password:',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your password.';
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },


};
