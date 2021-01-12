const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=624696ca50bd106d129a23114e3bfff7&query=' +  encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=m'

            //url: url                  //response object
    request({ url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + 
             body.current.feelslike + ' degrees out.')
        }
    })
}

module.exports = forecast