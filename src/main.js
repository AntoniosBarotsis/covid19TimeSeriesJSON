const fs = require('fs')
const shell = require('shelljs')

const lastUpdate = fs.readFileSync('./src/lastUpdate.txt')

shell.exec('chmod +x ./src/getLastUpdate.sh')
shell.exec('./src/getLastUpdate.sh ')

const currentUpdate = fs.readFileSync('./src/lastUpdate.txt')

if (lastUpdate.toString() === currentUpdate.toString()) {
    shell.exec('npm start')
}
