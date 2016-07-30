/*
 * Author: Sarah Knepper 
 * Copyright (c) 2014 Intel Corporation.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// Load Grove module
var groveSensor = require('jsupm_grove');

//Ubidots Upload details
var ubidots = require('ubidots');
var client = ubidots.createClient('f66998a21eee346d081536bacf1db8948ac691a9');

// Create the light sensor object using AIO pin 0
var light = new groveSensor.GroveLight(0);

// Read the input and print both the raw value and a rough lux value,
// waiting one second between readings

client.auth(function () {
  this.getDatasources(function (err, data) {
    console.log(data.results);
  });


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
  //var v = this.getVariable('579a03267625425c2b7d565c');

  //Variable is Light Sensor
  var v = this.getVariable('579b15f17625426af486ff33');

  v.getDetails(function (err, details) {
    console.log(details);
  });

  function readLightSensorValue() {
    console.log(light.name() + " raw value is " + light.raw_value() +
            ", which is roughly " + light.value() + " lux");
      v.saveValue(light.raw_value());
      v.getValues(function (err, data) {
        console.log(data.results);
       });
}
    
setInterval(readLightSensorValue, 1000);
    
});