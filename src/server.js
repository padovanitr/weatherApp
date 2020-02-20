const port = 3001

let express = require('express')
let request = require('request')
let bodyParser = require('body-parser')
let app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.get('/weather/:city', function(req, res){

    let url = `http://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&appid=1ff1a41b00a9651803822b4665dd0149`

    request(url, function(error, response, body){

        weather_json = JSON.parse(body)

        let cityTemp = ((weather_json.main.temp) -272.15).toFixed(0)

        //console.log(cityTemp)

        if (cityTemp > 30) {
            //playlist fest

            request({url: 'https://api.deezer.com/playlist/2097558104'}, function(err, response) {
                if(err) {
                    res.send(err);
                } else {
                    res.send(response.body)
                }
            
            });
            
        } 
        
        if (cityTemp <= 30 && cityTemp >= 15) {
            //playlist pop
     
            request({url: 'https://api.deezer.com/playlist/1592591647'}, function(err, response) {
                if(err) {
                    res.send(err);
                } else {
                    res.send(response.body)
                }
            
            });
  
        }

        if(cityTemp >= 10 && cityTemp <= 14) {
            //playlist rock

            request({url: 'https://api.deezer.com/playlist/1924357302'}, function(err, response) {
                    if(err) {
                      res.send(err);
                    } else {
                      res.send(response.body)
                    }
              
            });
        }

        if (cityTemp < 10) {
            //playlist classical

            request({url: 'https://api.deezer.com/playlist/4590825924'}, function(err, response) {
                    if(err) {
                      res.send(err);
                    } else {
                      res.send(response.body)
                    }
              
            });

        }

    })

})


app.listen(port, function (){
    console.log(`Backend running on port ${port}`)
})