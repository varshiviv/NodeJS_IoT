var ubidots = require('ubidots');
var client = ubidots.createClient('f66998a21eee346d081536bacf1db8948ac691a9');

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
  //var v = this.getVariable('579b15f17625426af486ff33');
  
  var v.getDetails(function (err, details) {
    console.log(details);
  });

  v.saveValue(22);

  v.getValues(function (err, data) {
    console.log(data.results);
  });
});