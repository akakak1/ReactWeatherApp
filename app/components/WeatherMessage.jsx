
var React = require('react');

// var Weather = React.createClass({

//     render:function(){

//         var {temp, location} =this.props

//         return(
//             <h3>The temperature in {location} is {temp} degree celcius</h3>
//         );
//     }
// })



// STATELESS COMPONENT //

// var Weather = (props) => {            
    
//     var {temp, location} = props  // NO NEED OF this.props  ... simply use props
//     return(
//         <h3>The temperature in {location} is {temp} degree celcius</h3>
//     );
// } 


var Weather = ({ temp, location }) => {            // using destructuring in the argument itself

    return(
        <h3>The temperature in {location} is {temp} degree celcius</h3>
    );
} 


module.exports = Weather;