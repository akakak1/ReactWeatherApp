
var React = require('react');
var WeatherForm = require('WeatherForm');
var WeatherMessage = require('WeatherMessage');
var openWeatherMap = require('openWeatherMap');


var Weather = React.createClass({

    getInitialState:function(){
        return {
            isLoading:false
        }
    },


    //   FOR CURRENT CITY TEMPERATURE AUTO-REFRESH
    lastLocation:'',
    count:0,

    refresh:function(){

        this.handleSearch(this.lastLocation);

    },

    handleSearch:function(location){

        this.lastLocation = location;

        var that = this;
        
        this.setState({isLoading: true});
        
        openWeatherMap.getTemp(location).then(function(temp){

            //This function will execute if there is no error 
            // this will not execute even if there is a throw in 1st function in openWeatherMap.getTemp()
            that.setState({
                location:location,
                temp:temp,
                isLoading:false,
                notFound:false // this is optional // not this state doenst need to be changed because the JSX corresponding to this doesnt have any props 
            });
        },function(err){

            //NOTE: This will be executed if something is thrown or if there is some error ....

            //NOTE: This will not be executed If there is catch() OR nothing thrown from the second promise function  :) 
            
           // alert(err);  // Error : Error :  ... because we are making new error in openWetherMap then throwing  :)

            // console.log(err.response) :: this is valid only if original error is thrown fron openWeatherMap.getTemp()
        
            that.setState({ 
                location:false, // vvvvi change the state of either location or temp so that <WeatherMessage> will be swapped out :)
                isLoading:false, 
                notFound:true  // there can be different types of error ... I am only checking for City not found ...
            });
        })

        //   FOR CURRENT CITY TEMPERATURE AUTO-REFRESH.
    
        var  myVar = setInterval(this.refresh, 10000);     // I think this is being called multiple times... better pass refresh() as prop to WeatherForm(and put setInterval in it) and Call it once
        
        console.log(this.count++);
        
        if (this.count>10){
            clearInterval(myVar);
        }
        
    },

    render:function(){

  

        var {temp, isLoading, location, notFound} = this.state;

        function renderMessage(){
            if(isLoading){
                return <h2>Fetching data...</h2>
            }else if(location && temp){
                return <WeatherMessage location={location} temp={temp} />
            }
            else if(notFound){
                return <h2>City not found</h2>
            } 
        }
        
        return(
            <div>
                <h3>Weather Component</h3>
                <WeatherForm onSearch={this.handleSearch} />
                {renderMessage()}
            </div>
        );
    }
})


module.exports = Weather;