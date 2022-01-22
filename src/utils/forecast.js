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
            callback(undefined,body.current.weather_descriptions[0]+". It is currently "+ body.current.temperature +" degrees out. But it feels like "+body.current.feelslike+" degrees.")
        }
    })
}
module.exports=forecast