const cachedData = require("./data/cache.js")
const express = require('express')
const axios = require("axios");
const md5 = require('md5');

const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


const cronJob = require('cron').CronJob;

const job = new cronJob('00 15 7 * * *', () => {
    console.log('Attempting to update the char data');
    while (cachedData.CachedData.length) {
        cachedData.CachedData.pop();
    }
    getCharData(0,100);
});


function getCharData(offset, limit){
    var ts = new Date().getTime();
    var stringToHash = ts + process.env.MARVEL_PRIVATE_KEY + process.env.MARVEL_PUBLIC_KEY;
    var baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
    var url = baseUrl + '?limit=' + limit + '&ts=' + ts + '&apikey=' + process.env.MARVEL_PUBLIC_KEY + '&hash=' + md5(stringToHash) + '&offset='+offset;
    axios.get(url)
        .then(function (response) {
            let resultArr = response.data.data.results;
            let totalRecords = response.data.data.total;
            for (let charIndex in resultArr) {
                cachedData.CachedData.push({id:resultArr[charIndex].id, name:resultArr[charIndex].name, description: resultArr[charIndex].description});
            }

            if(!(offset >= totalRecords)){
                console.log("Retrieved " +(offset+limit) + " / " + totalRecords);
                getCharData(offset+limit, limit);
            }

        }).catch(function (error) {
            if(error.response.status === 401){
                console.log('Please check your credentials. It appears to be incorrect. Server will exit.')
                process.exit(1);
            }else{
                console.log(error);
                process.exit(1);
            }

        }).then(function () {});
}

app.get('/characters/:characterId', (req, res) => {
    res.json(cachedData.CachedData.filter(entry => entry.id == req.params.characterId));
});

app.get('/characters', (req, res) => {
    res.json(cachedData.CachedData.map(entry => entry.id));

});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

var server = app.listen(8080, () => {
    console.log('Example app listening on port 8080!')
    getCharData(0,100);
});

module.exports = server;