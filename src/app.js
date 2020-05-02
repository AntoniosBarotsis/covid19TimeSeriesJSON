const { StringStream } = require('scramjet')
const request = require('request')
const recovered = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv'
const confirmed = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv'
const deaths = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv'
const fs = require('fs')
var jsonFormat = require('json-format')

const urlData = []

urlData.push(getData(confirmed))
urlData.push(getData(deaths))
urlData.push(getData(recovered))

function getData (source) {
    const rows = []

    return new Promise(function (resolve) {
        request.get(source)
            .pipe(new StringStream())
            .CSVParse()
            .consume(object => rows.push(object))
            .then(() => {
                const finalArray = rows

                resolve(finalArray)
            }).catch(error => {
                console.error(error)
            })
    })
}

Promise.all(urlData).then(arr => {
    const config = {
        type: 'space',
        size: 4
    }

    fs.writeFile('data/timeSeriesCovid19.json', jsonFormat(getDays(arr), config), (err) => {
        if (err) {
            console.error(err)
        }
        console.log('Done')
    })
}).catch(err => {
    console.error(err)
    fs.writeFileSync('data/timeSeriesCovid19.json', '{}')
})

function getDays (arr) {
    const dates = arr[0]
    const finalData = {}

    for (let i = 1; i < arr[0].length; i++) {
        const data = []

        for (let j = 4; j < arr[0][i].length; j++) {
            data.push(new Date(dates[0][j],
                parseInt(arr[0][i][j]),
                parseInt(arr[1][i][j]),
                arr[2][i] ? parseInt(arr[2][i][j]) : 0,
                (j > 4) ? parseInt(arr[0][i][j]) - parseInt(arr[0][i][j - 1]) : 0,
                (j > 4) ? parseInt(arr[1][i][j]) - parseInt(arr[1][i][j - 1]) : 0,
                arr[2][i] ? (j > 4) ? parseInt(arr[2][i][j]) - parseInt(arr[2][i][j - 1]) : 0 : 0))
        }
        finalData[arr[0][i][1]] = new CountryObj(arr[0][i][0], new DataCountry(data))
    }

    return finalData
}

class CountryObj {
    constructor (state, data) {
        this.state = state
        this.data = data
    }
}
class DataCountry {
    constructor (Dates) {
        this.Dates = Dates
    }
}

class Date {
    constructor (date, confirmedValues, deathValues, recoveredValues, changeC, changeD, changeR) {
        this.date = date
        this.confirmedValues = confirmedValues
        this.deathValues = deathValues
        this.recoveredValues = recoveredValues
        this.changeC = changeC
        this.changeD = changeD
        this.changeR = changeR
    }
}
// Sort this by number of confirmed cases
