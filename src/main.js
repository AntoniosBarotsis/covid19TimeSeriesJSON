const shell = require('shelljs')
const cron = require('node-cron')

shell.exec('chmod +x ./src/getLastUpdate.sh')

console.log('Main running')

// cron.schedule('0 0 */2 * * *', () => { // Checks every 2 hours
//     const date = new Date()
//     console.log(`Starting CRON job at ${date.getHours()}:${date.getMinutes()}`)
//     shell.exec('./src/getLastUpdate.sh')
//     console.log('CRON job finished')
// })

cron.schedule('9 * * * * *', () => { // Checks every 2 hours
    const date = new Date()
    console.log(`Starting CRON job at ${date.getHours()}:${date.getMinutes()}`)
    shell.exec('./src/getLastUpdate.sh')
    console.log('CRON job finished')
})
