/*
 * Author: Vivek Sharanappa
 * 2016
 */

// Load Grove module
var groveSensor = require('jsupm_grove');
var mraa = require('mraa'); //require mraa
console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the Intel XDK console
//var myOnboardLed = new mraa.Gpio(3, false, true); //LED hooked up to digital pin (or built in pin on Galileo Gen1)
var myOnboardLed = new mraa.Gpio(2); //LED hooked up to digital pin 13 (or built in pin on Intel Galileo Gen2 as well as Intel Edison)
myOnboardLed.dir(mraa.DIR_OUT); //set the gpio direction to output
var ledState = true; //Boolean to hold the state of Led

//cloud data
var ubidots = require('ubidots');// installed explicitly using npm install ubidots to get client api
var client = ubidots.createClient('f66998a21eee346d081536bacf1db8948ac691a9');//my ubidots api-key

// Create the relay switch object using GPIO pin 0
var relay = new groveSensor.GroveRelay(3);

// Close and then open the relay switch 3 times,
// waiting one second each time.  The LED on the relay switch
// will light up when the switch is on (closed).
// The switch will also make a noise between transitions.
/*var i = 0;
var waiting = setInterval(function() {
    myOnboardLed.write(ledState?1:0); //if ledState is true then write a '1' (high) otherwise write a '0' (low)
        if ( i % 2 == 0 ) {
            relay.on();
            if ( relay.isOn() )
                console.log(relay.name() + " is on");
                ledState = !ledState; //invert the ledState
        } else {
            relay.off();
            if ( relay.isOff() )
                console.log(relay.name() + " is off");
                ledState = !ledState; //invert the ledState
        }
        i++;
        if ( i == 6) clearInterval(waiting);
        }, 1000);
*/
//periodicActivity(); //call the periodicActivity function

// Load Grove module
var groveSensor = require('jsupm_grove');

// Create the button object using GPIO pin 3
var button = new groveSensor.GroveButton(2);

// Read the input and print, waiting one second between readings
function readButtonValue() {
    if ( button.value() > 0){
        console.log(button.name() + " : Button is pressed.");    
        relay.on();
        client.auth(function () {
            //var ds = this.getDatasource('579a03127625425afe46ce48'); //my intel edison source id
            var v = this.getVariable('57a33ab77625422d5549b6e4'); //my variable
            v.saveValue(1);
            console.log('Saved Relay Status on ubidots!');
        });
    }else {
        console.log(button.name() + " : Button is released.");
        relay.off();
        client.auth(function () {
            //var ds = this.getDatasource('579a03127625425afe46ce48'); //my intel edison source id
            var v = this.getVariable('57a33ab77625422d5549b6e4'); //my variable
            v.saveValue(0);
            console.log('Saved Relay Status on ubidots!');
        });
    }
    
}
setInterval(readButtonValue, 1000);