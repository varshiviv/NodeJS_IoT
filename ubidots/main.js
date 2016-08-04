var ubidots = require('ubidots');
var client = ubidots.createClient('f66998a21eee346d081536bacf1db8948ac691a9');

client.auth(function () {
  var ds = this.getDatasource('579a03127625425afe46ce48');
  var v = this.getVariable('579ef9917625420307438521');
  v.saveValue(random(40,500));
  console.log('Saved Data!');
});

function random(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}