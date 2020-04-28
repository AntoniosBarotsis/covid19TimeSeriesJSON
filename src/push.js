require('dotenv').config()
const git = require('simple-git/promise')()
// const shell = require('shelljs')

const USER = process.env.GIT_USER
const PASS = process.env.GIT_PASS
const REPO = 'github.com/AntoniosBarotsis/covid19TimeSeriesJSON'
const remote = `https://${USER}:${PASS}@${REPO}`

pushToGit()

async function pushToGit () {
    git.add('./*')
    git.commit('AAAAAAAAAAAAAAAAAAAA!')
    git.push(remote, 'master')
}
