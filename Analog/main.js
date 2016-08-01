/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

/*
 * Author: Vivek Sharanappa
 */

var mraa = require('mraa'); //require mraa
console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the console

var lcd = require('jsupm_i2clcd');
var display = new lcd.Jhd1313m1(0, 0x3E, 0x62);
var sleep = require('sleep');
var B = 3975;

//lightActivity(); //call the lightActivity function
//tempActivity();
//soundActivity();

setInterval(lightActivity,1000);
setInterval(tempActivity,1000);
setInterval(soundActivity,1000);

function lightActivity() //
{
    var red = 200;
    var green = 192;
    var blue = 203;
    var analogValue = 0;
    display.setColor(red, green, blue);
    var analogPin0 = new mraa.Aio(0); //setup access analog input Analog pin #0 (A0)
    analogValue = analogPin0.read(); //read the value of the analog pin
    console.log('PIN A0(Light): ' + analogValue); //write the value of the analog pin to the console
    display.setCursor(0,0);
    display.clear();
    display.write('Light lux is:');
    display.setCursor(1,0);
    display.write('' + analogValue);
    sleep.sleep(2);
}

function tempActivity() //
{
    var red = 200;
    var green = 192;
    var blue = 203;
    var analogValueC = 0;
    var analogValueF = 0;

    display.setColor(red, green, blue);

    var analogPin1 = new mraa.Aio(1); //setup access analog input Analog pin #1 (A1)
    var a = analogPin1.read(); //read the value of the analog pin
    var resistance = (1023 - a) * 10000 / a; //get the resistance of the sensor;
    analogValueC = (1 / (Math.log(resistance / 10000) / B + 1 / 298.15) - 273.15).toFixed(2);
    analogValueF = ((analogValueC * (9 / 5)) + 32).toFixed(2);
    console.log('PIN A1(Temperature C): ' + analogValueC); //write the value of the analog pin to the console
    console.log('PIN A1(Temperature F): ' + analogValueF); //write the value of the analog pin to the console
    display.setCursor(0,0);
    display.clear();
    display.write('Temperature:');
    display.setCursor(1,0);
    display.write('C ' + analogValueC + ' F ' + analogValueF);
    sleep.sleep(2);

}

function soundActivity() //
{
    var red = 200;
    var green = 192;
    var blue = 203;

    display.setColor(red, green, blue);
    var analogPin2 = new mraa.Aio(2); //setup access analog input Analog pin #2 (A2)
    var analogValue = analogPin2.read(); //read the value of the analog pin
    console.log('PIN A2(Sound): ' + analogValue); //write the value of the analog pin to the console
    display.setCursor(0,0);
    display.clear();
    display.write('Noise Level:');
    display.setCursor(1,0);
    display.write(''+analogValue);
    sleep.sleep(2);

}
    //var analogPin2 = new mraa.Aio(3); //setup access analog input Analog pin #3 (A3)
    //var analogValue = analogPin3.read(); //read the value of the analog pin
    //console.log('PIN A3: ' + analogValue); //write the value of the analog pin to the console
    //<NewVariable> = analogValue;


