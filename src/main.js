const shell = require('shelljs')
const cron = require('node-cron')

shell.exec('chmod +x ./src/getLastUpdate.sh')

console.log('Main running')

cron.schedule('0 0 */2 * * *', () => { // Checks every 2 hours
    console.log('Starting CRON job')
    shell.exec('./src/getLastUpdate.sh')
    console.log('CRON job finished')
})
