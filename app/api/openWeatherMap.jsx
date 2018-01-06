var axios = require('axios');

const OPEN_WEATHER_MAP_URL = 'http://api.openweathermap.org/data/2.5/weather?appid=c4e735ea8bd7e7b6dc8368c752517b2d&units=metric';


//c4e735ea8bd7e7b6dc8368c752517b2d
//2b92ac90c161a8b52a86175509113de9
//fbd7bb87711d9f0fbcfb7c8f171816fd    --my own

module.exports = {
    getTemp:function(location){
        var encodedLocation = encodeURIComponent(location);
        var requestUrl=`${OPEN_WEATHER_MAP_URL}&q=${location}`;

      return axios.get(requestUrl).then(function(res){
        
        
        //   console.log(res.data)   NOTE: here we dont need "res.response.data"   :)

            //NOTE: this if condition will not execute ... because if there is an error then the next function is executed...
            //I think its because axios is using promises .... TRY THIS WITH AJAX OR ANGULAR ....

            //WHAT TO DO IF  I want the error object returned from Weather site  ???? ... use  console.log(res.response)

                if(res.data.cod && res.data.message){
                    throw new Error(res.data.message);
                                                          
                }else{
                    return res.data.main.temp;       // WHAT IS DIFFERENCE BETWEEN THROW and RETURN ..
                }
           },
           function(res){
               //If this function is not used then default message will be "thrown"

            //    throw new Error(res); // from this javascript error will be throw ...
               
               
               //    console.log(res.response) :: to catch validation errors from the server
             throw new Error(res.response.data.message) // SERVER RESPONSEMESSAGE WILL BE THROWN
           
               //NOTE:  from here we can  throw res(original) also .... without making new Error.
               
           })
        //    .catch(function(res){
        //         // console.log(res.response)
        //         throw new Error(res)  // NOTE: we can also rethrow from the catch()  :) 
        //    });
    }
}