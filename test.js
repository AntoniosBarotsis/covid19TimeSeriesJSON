require('dotenv').config()

const USER = process.env.GIT_USER;
const PASS = process.env.GIT_PASS;
const REPO = 'github.com/AntoniosBarotsis/covid19TimeSeriesJSON';

const shell =  require('shelljs');
const remote = `https://${USER}:${PASS}@${REPO}`;

require('simple-git')()
     .add('./*')
     .commit("first commit!")
     .addRemote('origin', 'some-repo-url')
     .push(['-u', 'origin', 'master'], () => console.log('done'));


// shell.exec('chmod +x test.sh')

// shell.exec('./test.sh')

// shell.exec('git add .')
// shell.exec('git commit -m "Update"')
// shell.exec('git push')