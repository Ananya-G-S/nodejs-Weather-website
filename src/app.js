const path =require('path')
const express =require('express')
const hbs =require('hbs')
const geocode = require('./utils/geocode')
const forecast= require('./utils/forecast')

const app = express()
const port=process.env.PORT || 3000

//Define path for express config
const publicpath=path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'./templates/views')
const partialpath=path.join(__dirname,'./templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)

//Setup static directory to serve
app.use(express.static(publicpath))

app.get('',(req, res)=>{
    res.render('index',{
        title:'Weather app',
        name:'Ananya'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Ananya'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:'If you cannot find your location, try searching by your pincode',
        title:'Help',
        name:'Ananya'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
         }
              
         forecast(latitude,longitude, (error, {weather_description,Temperature,Humidity}={})=>{
             if(error){
                 return res.send({error})
             }

             res.send({
                 weather_description,
                 Temperature,
                 Humidity,
                 location:location,
                address:req.query.address})


         })
    })
    
})

app.get('/help/*',(req,res)=>{
    res.render('extra',{
        title:'404help',
        text:'Help article not found',
        name:'Ananya'
    })

})

app.get('*',(req,res)=>{
     res.render('extra',{
         title:'404',
         text:'Page not found',
         name:'Ananya'
     })
})

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})

