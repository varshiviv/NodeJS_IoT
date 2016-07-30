/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

/*
A simple node.js application intended to read data from Analog pins on the Intel based development boards such as the Intel(R) Galileo and Edison with Arduino breakout board.

MRAA - Low Level Skeleton Library for Communication on GNU/Linux platforms
Library in C/C++ to interface with Galileo & other Intel platforms, in a structured and sane API with port nanmes/numbering that match boards & with bindings to javascript & python.

Steps for installing MRAA & UPM Library on Intel IoT Platform with IoTDevKit Linux* image
Using a ssh client: 
1. echo "src maa-upm http://iotdk.intel.com/repos/1.1/intelgalactic" > /etc/opkg/intel-iotdk.conf
2. opkg update
3. opkg upgrade

Article: https://software.intel.com/en-us/html5/articles/intel-xdk-iot-edition-nodejs-templates
*/

var mraa = require('mraa'); //require mraa
console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the console

var light;
var temperature;
var sound;

periodicActivity(); //call the periodicActivity function

function periodicActivity() //
{
    var analogPin0 = new mraa.Aio(0); //setup access analog input Analog pin #0 (A0)
    var analogValue = analogPin0.read(); //read the value of the analog pin
    console.log('PIN A0(Light): ' + analogValue); //write the value of the analog pin to the console
    light = analogValue;

    var analogPin1 = new mraa.Aio(1); //setup access analog input Analog pin #1 (A1)
    analogValue = analogPin1.read(); //read the value of the analog pin
    console.log('PIN A1(Temperature): ' + analogValue); //write the value of the analog pin to the console
    temperature = analogValue;
    
    var analogPin2 = new mraa.Aio(2); //setup access analog input Analog pin #2 (A2)
    analogValue = analogPin2.read(); //read the value of the analog pin
    console.log('PIN A2(Sound): ' + analogValue); //write the value of the analog pin to the console
    sound = analogValue;

    //var analogPin2 = new mraa.Aio(3); //setup access analog input Analog pin #3 (A3)
    //var analogValue = analogPin3.read(); //read the value of the analog pin
    //console.log('PIN A3: ' + analogValue); //write the value of the analog pin to the console
    //<NewVariable> = analogValue;

   //setTimeout(periodicActivity,5000); //call the indicated function after 1 second (1000 milliseconds)
}
