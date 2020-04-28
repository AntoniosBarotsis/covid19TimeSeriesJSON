const fs = require('fs')
const shell = require('shelljs')
const cron = require('node-cron')

const lastUpdate = fs.readFileSync('./src/lastUpdate.txt')

shell.exec('chmod +x ./src/getLastUpdate.sh')

console.log('Starting CRON job')

cron.schedule('0 0 0 * * *', () => {
    shell.exec('./src/getLastUpdate.sh ')
    const currentUpdate = fs.readFileSync('./src/lastUpdate.txt')

    console.log(lastUpdate.toString() === currentUpdate.toString())

    if (lastUpdate.toString() === currentUpdate.toString()) {
        console.log('Updating...')
        shell.exec('npm start')
    }
})
