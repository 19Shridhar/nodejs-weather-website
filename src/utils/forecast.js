const request=require('request')

const forecast=(long,lat,callback)=>{
    url='http://api.weatherstack.com/current?access_key=52fc0deb1fa24a9598c027a16a97e184&query='+long+','+lat

    request({url,json:true},(error,{body})=>{
        const {error:Error,current}=body
    if (error)
    {
        callback('Unable to connect to location services!', undefined)
    }
    else if(error){
        callback(Error.info,undefined)
    }
    else{
        const {weather_descriptions,temperature,feelslike,humidity}=current
        callback(undefined,weather_descriptions[0]+". It is curently "+temperature+"°C. It feels like it is "+ feelslike+" °C. The humidity is "+humidity)   
    }
})
}

module.exports=forecast