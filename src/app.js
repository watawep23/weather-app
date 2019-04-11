const path = require('path'); // from node
const express = require('express');
const hbs = require('hbs');
const app = express();

const geocode = require('./apis/geocode');
const weather = require('./apis/weather');

/** ------------------------------------------------
 * Static assets
 * -------------------------------------------------
 */
const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath)); // app.use() is a middleware






/** ------------------------------------------------
 * This is to customize our views folder 
 * if we want to change it to templates lke we did
 * -------------------------------------------------
 */
const viewsPath = path.join(__dirname, '../templates/views');
app.set('views', viewsPath);






/** ------------------------------------------------
 * Template engine 
 * -------------------------------------------------
 */
app.set('view engine', 'hbs'); 






/** ------------------------------------------------
 * Helpers and Partials
 * -------------------------------------------------
 */
const partialsPath = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialsPath);
hbs.registerHelper('showName', () => {
    return 'Gab Pogi';
});






/** ------------------------------------------------
 * Routes
 * -------------------------------------------------
 */
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        description: 'Use this site to get your weather!'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help page',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere sint ad officia nemo eius consequatur? Temporibus dolorum dignissimos hic ullam maiores omnis pariatur, minus, consequuntur cumque quasi similique corrupti aperiam?'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere sint ad officia nemo eius consequatur? Temporibus dolorum dignissimos hic ullam maiores omnis pariatur, minus, consequuntur cumque quasi similique corrupti aperiam?'
    });
});

app.get('/weather', async (req, res) => {
    if (!req.query.address) {
        return res.status(400); // Return bad request
    }

    const result = await geocode.getGeoCode(req.query.address);

    if (!result) {
        res.send({
            error: result.errno
        });
    } else {
        const resultWeather = await weather.getWeather(result.latLng.lat, result.latLng.lng);

        if (resultWeather.data) {
            res.send({
                temperature: resultWeather.data.currently.temperature,
                apparentTemperature: resultWeather.data.currently.apparentTemperature,
                report: resultWeather.data.daily.summary
            });
        } else {
            res.send({
                error: resultWeather.errno
            });
        }
    }
});

app.get('/help/*', (req, res) => { // if there's also no match but we want to display another error related to the url
    res.render('404', {
        description: 'Help article not found'
    });
});

app.get('*', (req, res) => { // if there's no match, and * (wild card) means match anything that hasn't match so far
    res.render('404', {
        description: 'Page not found'
    });
});






/** ------------------------------------------------
 * Port
 * -------------------------------------------------
 */
app.listen(3000, () => { // should change when we up our app to prod
    console.log('Server is up on port 3000');
}); 