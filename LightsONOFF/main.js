/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

/*
 * Author: Vivek Sharanappa
 */

var mraa = require('mraa'); //require mraa
console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the console
var twitter = require('twitter');

var twit = new twitter({
    consumer_key : 'ZEhcwUlo7R5MuxsyuiGeEtDg4',
    consumer_secret : 'TIUsmCfH26oT6P4jgIS0khfRR8tbIkOdQzQvCY2cvrVhYHOa5j',
    access_token_key : '122389426-nzfc93iJDcidFbTRvLFTJREzma7s2w1qxlVBDtH1',
    access_token_secret : 'SFJlfNmFTKJNQUgZHLEt6gu12uUEUCzclJ4Xy3GjRYpOR'
});

//cloud data
var ubidots = require('ubidots');// installed explicitly using npm install ubidots to get client api
var client = ubidots.createClient('f66998a21eee346d081536bacf1db8948ac691a9');//my ubidots api-key

//var myOnboardLed = new mraa.Gpio(3, false, true); //LED hooked up to digital pin (or built in pin on Galileo Gen1)
var myOnboardLed = new mraa.Gpio(2); //LED hooked up to digital pin 13 (or built in pin on Intel Galileo Gen2 as well as Intel Edison)
myOnboardLed.dir(mraa.DIR_OUT); //set the gpio direction to output
var ledState = false; //Boolean to hold the state of Led
var tweetonce = 0;

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
    console.log('TWEETONCE: ' + tweetonce); //write the value of the tweetonce to the console
    myOnboardLed.write(ledState?1:0); //if ledState is true then write a '1' (high) otherwise write a '0' (low)
    if (analogValue > 250) {
        ledState = 0; //invert the ledState
        tweetonce = 0;
    } else {
        ledState = 1; //invert the ledState
        if (tweetonce == 0){
            tweetonce = 1;
        twit.post('statuses/update', {status: 'I am a tweet & LED Light is ON from @vivekhs Light Sensor Data #Edison #IoT kit ' + analogValue}, 
           function(error, tweet, response) {
           if (!error) {
              //console.log(tweet);   
              console.log('Tweet Success');
            }
        });
    }}
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