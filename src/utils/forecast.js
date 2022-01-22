const request = require('postman-request')
const requiest = require('postman-request')
 
const forecast=(latitude,longitude,callback)=>
{
    const url='http://api.weatherstack.com/current?access_key=dead5a544ee7becc819b11d69ee796d3&query='+latitude+','+longitude+'&units=m'    
    request({url,json:true},(error,{body})=>
    {
        if(error)
        {
            callback('Unable to connect to service',undefined)
        }
        else if(body.error)
        {
            callback('Unable to find the location',undefined)
        }
        else
        {
            const data={
                weather_description: body.current.weather_descriptions[0],
                Temperature: body.current.temperature +" degrees",
                Humidity: body.current.humidity
            }
            callback(undefined,data)
        }
    })
}
module.exports=forecast