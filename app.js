const express = require('express');
const app = express();

const https = require('https');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});

app.post("/",(req,res) => {
    // const query = 'Rajkot,india';
    const apikey = 'dc9579ab6658eacd54214809f689b51e';
    const units = 'metric';
    const query = req.body.cityName;
    const api = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + apikey + '&units=' + units;

    https.get(api,(response) =>{
            console.log(response.statusCode); // to print status code on console
    
            response.on('data',(data)=>{
                //console.log(data); // print real data of api which is in buffer format
                const weatherData = JSON.parse(data);
                const city = JSON.stringify(weatherData.name);
                const temp = weatherData.main.temp;
                const icon = weatherData.weather[0].icon;
                const url = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
                res.write('<h1>Weather data of ' + city + '</h1>');
                res.write('<h2>Temperature is ' + temp + 'deg Celcius</h2>');
                res.write('<img src=' + url + '>');
                res.send();
            });
        });
});


app.listen(3000,()=>{
    console.log('Application is lipve');
});