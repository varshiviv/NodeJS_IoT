/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

/*
 * Author: Vivek Sharanappa
 */

var mraa = require('mraa'); //require mraa
console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the console

//cloud data
var ubidots = require('ubidots');// installed explicitly using npm install ubidots to get client api
var client = ubidots.createClient('f66998a21eee346d081536bacf1db8948ac691a9');//my ubidots api-key

//var myOnboardLed = new mraa.Gpio(3, false, true); //LED hooked up to digital pin (or built in pin on Galileo Gen1)
var myOnboardLed = new mraa.Gpio(2); //LED hooked up to digital pin 13 (or built in pin on Intel Galileo Gen2 as well as Intel Edison)
myOnboardLed.dir(mraa.DIR_OUT); //set the gpio direction to output
var ledState = false; //Boolean to hold the state of Led


setInterval(lightActivity,1000);

function lightActivity() //Light Sensor
{
    //var red = random(0,255);
    //var green = random(0,255);
    //var blue = random(0,255);
    var analogValue = 0;
    //display.setColor(red, green, blue);
    var analogPin0 = new mraa.Aio(0); //setup access analog input Analog pin #0 (A0)
    analogValue = analogPin0.read(); //read the value of the analog pin
    console.log('PIN A0(Light): ' + analogValue); //write the value of the analog pin to the console
    myOnboardLed.write(ledState?1:0); //if ledState is true then write a '1' (high) otherwise write a '0' (low)
    if (analogValue > 250) {
        ledState = 0; //invert the ledState
    } else {
        ledState = 1; //invert the ledState
    }
    //display.setCursor(0,0);
    //display.clear();
    //display.write('Light lux is:');
    //display.setCursor(1,0);
    //display.write('' + analogValue);
    //upload data to ubidots
    client.auth(function () {
        //var ds = this.getDatasource('579a03127625425afe46ce48'); //my intel edison source id
        var v = this.getVariable('579ef9917625420307438521'); //my variable
        v.saveValue(analogValue);
        console.log('Saved Light Sensor Data on ubidots!');
    });
}

/*function random(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}*/