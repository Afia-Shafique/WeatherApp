const request = require( "request" );
const axios = require( "axios" );

var longitude;
var Latitude;

const geoCode=(address,callback)=>{
    // 1. get the address from the user
    const geoCodeUrl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYWZpYS1zaGFmaXF1ZSIsImEiOiJjbHNuZDFwMmQwM2YyMmxrNTU2MHRxdDJ5In0.22pbA4TMsdpH8e0KQQmkdw'
  
    request(geoCodeUrl,{json:true},(err,response)=>{
        if(!err && response.statusCode === 200){
            callback(response.body.features[0],"Successfully fetched Data")
        }
        else if(response.body.features.length === 0){
            callback(undefined,"No data associated with that location")    //callback function to check weather against long, lat
        }
        else if(err) {
            let error={
                statusCode:500,
                message:"Error Occurred in Geocoding API"
            }
            callback(undefined,error);
        }
})}


function parseUrl(lat,long){    //function to parse URL
    const coordinates = ""+lat+","+long+"";

    const apiKey ="43d87436e03553a9b02534dd74371807";

    const baseUrl = "http://api.weatherstack.com/current";
    const urlObject = new URL(baseUrl);

    urlObject.searchParams.set('access_key', apiKey);
    urlObject.searchParams.set('query', coordinates);

    
    const finalUrl = urlObject.toString();
    return finalUrl;
}


geoCode("Los Angeles",(res,err)=>{  //Enter name of the City you want to  search weather for here, e.g:Los Angeles
     longitude=res.center[0];
     Latitude=res.center[1];

const weatherUrl = parseUrl(Latitude,longitude);    //user-defined function to parse URL to input long and lat in URL

axios    //axios to make http request 
    .get(weatherUrl)
    .then((response) => {

    const Temperature=response.data.current.temperature;  //data fetched from weatherStack API against Long ,Lat 
    const location=response.data.location.name;
    const country=response.data.location.country;

    console.log("Area is: "+location + ", Country is :"+country );

    console.log("Temperature is "+ Temperature);

    const rain=response.data.current.precip;
    console.log("There are "+ rain +"% chances of rain")
    console.log(err);
})
})

