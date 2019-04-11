const axios = require('axios');

module.exports.getWeather = (lat, lng) => {
    return axios.get(`https://api.darksky.net/forecast/950dab04e23660acd3aaef41bb6126f3/${lat},${lng}`)
                .then((result) => {
                    return result;
                })
                .catch((error) => {
                    return error;
                });
}