# WARNING
Although the repo includes scripts that make the automatic refresh of the data possible I will **not** be hosting them therefore the
data will be outdated. If you want to use this you'll have to clone the repo, install [jq](https://stedolan.github.io/jq/download/).
The data from [this](https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data) repository was used to make this possible.

## Table of Contents

- [Format](#Format)
- [How does this work?](#Info)

# Format

```JSON
{
    "Country": {
        "state": "",
        "data": {
            "Dates": [
                {
                    "date": "1/22/20",
                    "confirmedValues": 0,
                    "deathValues": 0,
                    "recoveredValues": 0,
                    "changeC": 0,
                    "changeD": 0,
                    "changeR": 0
                },
            ]
        }
    },
}
```

Each date comes along with the total amount of confirmed cases/deaths/recoveries **up to that date** (confirmedValues, deathValues, recoveredValues) and the difference between the current and previous day (changeC, changeD, changeR). Note that ``state`` might be empty.

# Info

After running ``npm start`` which starts [main.js](https://github.com/AntoniosBarotsis/covid19TimeSeriesJSON/blob/master/src/main.js),
A scheduled task will run every 2 hours which executes [getLastUpdate.sh](https://github.com/AntoniosBarotsis/covid19TimeSeriesJSON/blob/master/src/getLastUpdate.sh), for this part to run you need to have [curl](https://github.com/curl/curl) and [jq](https://github.com/stedolan/jq) installed on your machine. The bash script will retrieve the date of the last commit to the [original csv repository](https://github.com/CSSEGISandData/COVID-19)] and it will compare it to the date that was last added to [this text file](https://github.com/AntoniosBarotsis/covid19TimeSeriesJSON/blob/master/src/lastUpdate.txt) and also refresh the date, if the two are different
the [download script](https://github.com/AntoniosBarotsis/covid19TimeSeriesJSON/blob/master/src/app.js) will run which refreshes the [data file](https://github.com/AntoniosBarotsis/covid19TimeSeriesJSON/blob/master/data/timeSeriesCovid19.json). After that the [push script](https://github.com/AntoniosBarotsis/covid19TimeSeriesJSON/blob/master/src/push.js) will execute which pushes all changes to my repository. Note that this last part is useless since you would need my credentials to do that so feel free to change the target repo or remove the push script altogether. The commit message includes the full date of the commit in a human readable format. After that is complete nothing will happen for another 2 hours until the CRON job triggers again.
