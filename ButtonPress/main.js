/*
 * Author: Vivek Sharanappa
 *
 */

// Load Grove module
var groveSensor = require('jsupm_grove');

// Create the button object using GPIO pin 3
var button = new groveSensor.GroveButton(2);

// Read the input and print, waiting one second between readings
function readButtonValue() {
    if ( button.value() > 0){
        console.log(button.name() + " : Button is pressed.");    
    }else {
        console.log(button.name() + " : Button is released.");
    }
    
}
setInterval(readButtonValue, 1000);