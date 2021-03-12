const fetch = require('node-fetch')

const apiIpify = 'https://api.ipify.org/?format=json';
const apiGeolocation = 'https://api.ipgeolocationapi.com/geolocate/';
const airVisualKey = '45dac1d9-0bde-4f2f-9c8c-6a6e6f03023a';

async function getIp(req, res){
    fetch(apiIpify , {method: 'GET', headers:{}
    }).catch(error => console.log('Error api Ipify'))
        .then(response => {
            if(response.ok){
                return response.json()
            } else {
                console.log('Response api Ipify: '+ response.body);
            }
        }).then(function(json){
            try{
                json = JSON.stringify(json);
                ip = JSON.parse(json);
                return ip;
            } catch {
                console.log('Error jsonparse ip');
            }
        })
}

async function getLocation(req, res){
    ip = getIp()
    fetch(apiGeolocation+ip.ip , {method: 'GET', headers:{}
    }).catch(error => console.log('Error api Geolocation'))
        .then(response => {
            if(response.ok){
                return response.json()
            } else {
                console.log('Response api geolocation: '+response.body);
            }
        }).then(function(json){
            try{
                json = JSON.stringify(json);
                location = JSON.parse(json);
                return location;
            } catch{
                console.log('Error jsonparse geo')
            }
        })

}

async function getWeather(req, res){
    location = getLocation()
    fetch('http://api.airvisual.com/v2/nearest_city?lat={'+location.latitude+'}&lon={'+location.longitude+'}&key={'+airVisualKey+'}',
            {method: 'GET', headers:{}}).catch(error => console.log('Error api AirVisual'))
            .then(response => {
                if(response.ok){
                    return response.json()
                } else {
                    console.log('Response api air visual: '+ response.body);
                }
            }).then(function(json){
                try{
                    json=JSON.stringify(json);
                    airData = JSON.parse(json);
                    res.writeHead(200, {'Content-type' : 'text/json'})
                    res.write(JSON.stringify(airData));
                    res.end();
                } catch {
                    console.log('Error jsonparse AirVisual')
                }
            })
}

module.export={getWeather}