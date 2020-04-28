require('dotenv').config()

const USER = process.env.GIT_USER;
const PASS = process.env.GIT_PASS;
const REPO = 'github.com/AntoniosBarotsis/covid19TimeSeriesJSON';

const shell =  require('shelljs');
const remote = `https://${USER}:${PASS}@${REPO}`;


// const simpleGit = require('simple-git')();
// const simpleGitPromise = require('simple-git/promise')();

require('simple-git')()
     .add('./*')
     .commit("A!")
     .addRemote('origin', 'https://github.com/AntoniosBarotsis/covid19TimeSeriesJSON.git')
     .push('origin', 'master');


// shell.exec('chmod +x test.sh')

// shell.exec('./test.sh')

// shell.exec('git add .')
// shell.exec('git commit -m "Update"')
// shell.exec('git push')