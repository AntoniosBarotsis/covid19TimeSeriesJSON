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

    fs.writeFileSync('data/timeSeriesCovid19.json', jsonFormat(getDays(arr), config))
}).catch(err => {
    console.error(err)
    fs.writeFileSync('data/timeSeriesCovid19.json', '{}')
})

function getDays (arr) {
    const dates = arr[0][0].slice(4)
    const data = []

    for (let i = 1; i < arr[0].length; i++) {
        let confirmedValues
        let deathValues
        let recoveredValues
        let confirmedValuesChange
        let deathValuesChange
        let recoveredValuesChange

        const state = arr[0][i][0]
        const country = arr[0][i][1]

        // eslint-disable-next-line prefer-const
        confirmedValues = (numberify(arr[0][i].slice(4)))
        // eslint-disable-next-line prefer-const
        confirmedValuesChange = (getChange(numberify(arr[0][i].slice(4))))

        if (arr[1][i]) {
            deathValues = numberify(arr[1][i].slice(4))
            deathValuesChange = (getChange(numberify(arr[1][i].slice(4))))
        }

        if (arr[2][i]) {
            recoveredValues = numberify(arr[2][i].slice(4))
            recoveredValuesChange = (getChange(numberify(arr[2][i].slice(4))))
        }

        data.push(new DataCountry(state, country, new DataDay(dates, confirmedValues, confirmedValuesChange, deathValues,
            deathValuesChange, recoveredValues, recoveredValuesChange)))
    }
    return data
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
    constructor (state, country, Data) {
        this.state = state
        this.country = country
        this.Data = Data
    }
}

class DataDay {
    constructor (date, confirmedValues, confirmedValuesChange, deathValues, deathValuesChange, recoveredValues, recoveredValuesChange) {
        this.date = date
        this.confirmedValues = confirmedValues
        this.confirmedValuesChange = confirmedValuesChange
        this.deathValues = deathValues
        this.deathValuesChange = deathValuesChange
        this.recoveredValues = recoveredValues
        this.recoveredValuesChange = recoveredValuesChange
    }
}
