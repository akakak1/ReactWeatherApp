
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
    location:'',
    count:0,
    intervalVar:'',

    refresh:function(location){
        this.location= location;

        this.intervalVar = setInterval(this.handleSearch, 10000);

        
        
    },

    handleSearch:function(){

        var that = this;
        
        this.setState({isLoading: true});
        
        openWeatherMap.getTemp(this.location).then(function(temp){

            that.setState({
                location:that.location,
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

        console.log(this.count++);
        
        if (this.count>10){
            clearInterval(this.intervalVar);
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
                <WeatherForm onSearch={this.refresh} />
                {renderMessage()}
            </div>
        );
    }
})


module.exports = Weather;