/*
 * Author: Vivek Sharanappa 
 */

// Load Grove module
var groveSensor = require('jsupm_grove');
var ubidots = require('ubidots');
var client = ubidots.createClient('f66998a21eee346d081536bacf1db8948ac691a9');

client.auth(function () {
  this.getDatasources(function (err, data) {
    console.log(data.results);
  });

  //Data Source is MyEddy
  var ds = this.getDatasource('579a03127625425afe46ce48');

  ds.getVariables(function (err, data) {
    console.log(data.results);
  });

  ds.getDetails(function (err, details) {
    console.log(details);
  });

  //Variable is Microphone
  //var v = this.getVariable('579a18e37625427ee209c747');
  
  //Variable is Temperature Sensor
  var v = this.getVariable('579a03267625425c2b7d565c');

  v.getDetails(function (err, details) {
    console.log(details);
  });

// Create the temperature sensor object using AIO pin 0
var temp = new groveSensor.GroveTemp(1);
console.log(temp.name());

// Read the temperature ten times, printing both the Celsius and
// equivalent Fahrenheit temperature, waiting one second between readings
var i = 0;
var waiting = setInterval(function() {
        var celsius = temp.value();
        var fahrenheit = celsius * 9.0/5.0 + 32.0;
        console.log(celsius + " degrees Celsius, or " +
            Math.round(fahrenheit) + " degrees Fahrenheit");
        i++;
        //if (i == 10) clearInterval(waiting);
          v.saveValue(celsius);
          v.getValues(function (err, data) {
             //console.log(data.results);
          });
        }, 2500);
});