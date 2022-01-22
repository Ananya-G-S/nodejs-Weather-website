const path =require('path')
const express =require('express')
const hbs =require('hbs')
const geocode = require('./utils/geocode')
const forecast= require('./utils/forecast')

const app = express()

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
        helptext:'This is to your help',
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
              
         forecast(latitude,longitude, (error, forecastdata)=>{
             if(error){
                 return res.send({error})
             }

             res.send({
                 forecast:forecastdata,
                 location:location,
                address:req.query.address})


         })
    })
    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:'you must provide a search term'
        })
    }
  
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

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})

