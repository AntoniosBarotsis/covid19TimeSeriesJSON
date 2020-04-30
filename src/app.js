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
    const finalData = []

    for (let i = 1; i < arr.length; i++) {
        const data = []

        for (let j = 4; j < arr[0].length; j++) { // confirmed
            data.push(new Date(dates[0][j], arr[0][i][j], arr[1][i][j], arr[2][i][j]))
        }
        finalData.push(new DataCountry(arr[0][i][0], arr[0][i][1], data))
    }

    return finalData
}

function getChange (arr) {
    const res = []

    for (let i = 0; i < arr.length; i++) {
        if (i === 0) {
            res.push(0)
        } else {
            res.push(arr[i] - arr[i - 1])
        }
    }

    return res
}

function numberify (arr) {
    const res = []

    for (let i = 0; i < arr.length; i++) {
        res[i] = parseInt(arr[i])
    }

    return res
}

class DataCountry {
    constructor (state, country, Dates) {
        this.state = state
        this.country = country
        this.Dates = Dates
    }
}

class Date {
    constructor (date, confirmedValues, deathValues, recoveredValues) {
        this.date = date
        this.confirmedValues = confirmedValues || 0
        this.deathValues = deathValues || 0
        this.recoveredValues = recoveredValues || 0
    }
}
// Sort this by number of confirmed cases
