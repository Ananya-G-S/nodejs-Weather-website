const request= require('postman-request')

const geocode=(address,callback)=>
{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?limit=2&access_token=pk.eyJ1IjoiYW5hbnlhLWctcyIsImEiOiJja3lsdms1dzQwcmhqMm5wbmh0N3c3aHVtIn0.QMNlfWtUIR13_FHQHBFdHA&limit=1'
    request({ url,json: true},(error,{body})=>{
    if(error)
    {
        callback('Unable to connect to location serices',undefined)
    }
    else if(body.features.length===0)
    {
        callback('Unable to find location.Try another search',undefined)
    }
    else
    {
        callback(undefined,{
            latitude:body.features[0].center[1],
            longitude:body.features[0].center[0],
            location:body.features[0].place_name,
            })
    }
    })
 }
 module.exports=geocode