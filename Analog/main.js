/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

/*
 * Author: Vivek Sharanappa
 */

var mraa = require('mraa'); //require mraa
console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the console

//var lcd = require('jsupm_i2clcd');

//var display = new lcd.Jhd1313m1(0, 0x3E, 0x62);
//var sleep = require('sleep');
var B = 3975;

//var myOnboardLed = new mraa.Gpio(3, false, true); //LED hooked up to digital pin (or built in pin on Galileo Gen1)
var myOnboardLed = new mraa.Gpio(2); //LED hooked up to digital pin 13 (or built in pin on Intel Galileo Gen2 as well as Intel Edison)
myOnboardLed.dir(mraa.DIR_OUT); //set the gpio direction to output
var ledState = false; //Boolean to hold the state of Led

//cloud data
var ubidots = require('ubidots');// installed explicitly using npm install ubidots to get client api
var client = ubidots.createClient('');//my ubidots api-key

/*
var ubidots = require('ubidots');
var client = ubidots.createClient('');

client.auth(function () {
  var ds = this.getDatasource('');
  var v = this.getVariable('');
  v.saveValue(random(40,500));
  console.log('Saved Data!');
});*/

setInterval(lightActivity,1000);
setInterval(tempActivity,1000);
setInterval(soundActivity,1000);

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
        var v = this.getVariable(''); //my variable
        v.saveValue(analogValue);
        console.log('Saved Light Sensor Data on ubidots!');
    });
    //sleep.sleep(10);
}

function tempActivity() //Temperature Sensor
{
    //var red = random(0,255);
    //var green = random(0,255);
    //var blue = random(0,255);
    var analogValueC = 0;
    var analogValueF = 0;

    //display.setColor(red, green, blue);

    var analogPin1 = new mraa.Aio(1); //setup access analog input Analog pin #1 (A1)
    var a = analogPin1.read(); //read the value of the analog pin
    var resistance = (1023 - a) * 10000 / a; //get the resistance of the sensor;
    analogValueC = (1 / (Math.log(resistance / 10000) / B + 1 / 298.15) - 273.15).toFixed(2);
    analogValueF = ((analogValueC * (9 / 5)) + 32).toFixed(2);
    console.log('PIN A1(Temperature C): ' + analogValueC); //write the value of the analog pin to the console
    //console.log('PIN A1(Temperature F): ' + analogValueF); //write the value of the analog pin to the console
    //display.setCursor(0,0);
    //display.clear();
    //display.write('Temperature:');
    //display.setCursor(1,0);
    //display.write('C ' + analogValueC + ' F ' + analogValueF);
    //upload data to ubidots
    client.auth(function () {
        //var ds = this.getDatasource(''); //my intel edison source id
        var v = this.getVariable(''); //my variable
        v.saveValue(analogValueC);
        console.log('Saved Temperature Data on ubidots!');
    });
}

function soundActivity() //Sound Sensor
{
    //var red = random(0,255);
    //var green = random(0,255);
    //var blue = random(0,255);
    var analogValue = 0;
    var upmMicrophone = require("jsupm_mic");
    //var analogValue = 0;
    var myMic = new upmMicrophone.Microphone(2);//setup access analog input Analog pin #2 (A2)
    var threshContext = new upmMicrophone.thresholdContext();
    threshContext.averageReading = 0;
    threshContext.runningAverage = 0;
    threshContext.averagedOver = 2;
    var buffer = new upmMicrophone.uint16Array(128);
    var len = myMic.getSampledWindow(2, 128, buffer);
    if (len)
    {
        analogValue = myMic.findThreshold (threshContext, 30, buffer, len);
        if (analogValue)
            console.log('PIN A2(Sound): ' + analogValue); //write the value of the analog pin to the console
    }    
    //display.setColor(red, green, blue);
    //display.setCursor(0,0);
    //display.clear();
    //display.write('Noise Level:');
    //display.setCursor(1,0);
    //display.write(''+analogValue);
    //upload data to ubidots
    client.auth(function () {
        //var ds = this.getDatasource(''); //my intel edison source id
        var v = this.getVariable(''); //my variable
        v.saveValue(analogValue);
        console.log('Saved Sound Sensor Data on ubidots!');
    });
    
    //sleep.sleep(10);

}
    //var analogPin2 = new mraa.Aio(3); //setup access analog input Analog pin #3 (A3)
    //var analogValue = analogPin3.read(); //read the value of the analog pin
    //console.log('PIN A3: ' + analogValue); //write the value of the analog pin to the console
    //<NewVariable> = analogValue;


/*function random(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}*/
