const request=require('request')

const geocode=(address,callback)=>{
    url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoid2VhdGhlci1sb2MiLCJhIjoiY2wwcWxzNnB2MjdpbzNlcHdxMGl3b3R1NSJ9.CT6Stt46vD1SiGJmaKhGIg&limit=1'

    request({url,json:true},(error,{body})=>{
        const {features}=body
        if (error)
        {
            callback('Unable to connect to location services!', undefined)
        }
        else if(features.length === 0){
            callback('Unable to find location. Try another search.',undefined)
        }
        else{
            const {center,place_name}=features[0]
            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location: place_name
                })
        }
        
    })
}



module.exports=geocode