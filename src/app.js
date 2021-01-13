const path = require('path') //from node core modules
const express = require('express') //express library
const hbs = require('hbs') 
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname) //path to the directory where the current script lives
console.log(path.join(__dirname, '../public')) //


const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs') //telling express which templating engine we installed
app.set('views', viewsPath) //telling express the path of the views that it have to use
hbs.registerPartials(partialsPath) //takes a path to the directory where partials live

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)) //static function takes the path to the folder we want to serve for the program. Also, I think that the program takes the index file by default of /public for the root path ('/')

app.get('', (req, res) => {
    //index match with the name of the template created in the views folder
    res.render('index', {
        title: 'Weather',
        name: 'Javi Espi'
    }) 
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Javi Espi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This site has been developed with the intention of learning more about nodeJS. Here you can search the weather forecast of your city or anywhere :)',
        title: 'Help',
        name: 'Javi Espi'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "You must provide an address!"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error //error: error
            })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error //error: error
                })
            }
            res.send({
                forecast: forecastData,
                location, //location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Javi Espi',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Javi Espi',
        errorMessage: 'Page not found.'
    })
})

// app.com
// app.com/help
// app.com/about

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})