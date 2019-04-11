const axios = require('axios');

module.exports.getGeoCode = (address) => {

    const stringToURL = encodeURIComponent(address);

    // i returned this axios call because it is a promise, so i can use await in async function call in app.js    
    return axios.get(`http://www.mapquestapi.com/geocoding/v1/address?key=js4n2zjYOIohh86G2wtPNjwToZ1SJKRI&location=${stringToURL}`)
        .then((res) => {
            return {
                latLng: res.data.results[0].locations[0].latLng,
                address: res.data.results[0].providedLocation.location
            };
        })
        .catch((err) => {
            return err.response;
        });
}