const path=require('path')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const express=require('express')
const hbs=require('hbs')

const app=express()

//Define path foe express js
const publicdir=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and view location
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

//setup public directory
app.use(express.static(publicdir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Shridhar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Shridhar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text.',
        name: 'Shridhar'
    })
})
app.get('/weather',(req,res)=>{


    if (!req.query.location)
    {
        return res.send({
            error:"Please give an location"
        })
    }


    geocode(req.query.location,(error,{latitude,longitude,location}={})=>{
    
        if (error){
            return res.send({error})
        }
        
        forecast(latitude,longitude,(error,forecastdata)=>{
    
            if (error){
                res.send({error})
            }

            res.send({
                location: req.query.location,
                forecastdata

            })
    
        })
    })
})

app.get('/help/*',(req,res)=>{

    res.render('errorpage',{
        error:'Help article not found',
        name:'Shridhar',
        title:'404'
    })
})

app.get('*',(req,res)=>{

    
    res.render('errorpage',{
        error:'Page not found',
        name:'Shridhar',
        title:'404'
    })
})
app.listen(3000,()=>{
    console.log('Running')
})