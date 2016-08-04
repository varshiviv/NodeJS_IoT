// Drive the Grive RGB LCD (a JHD1313m1)
// We can do this in either of two ways
//
// The bext way is to use the upm library. which
// contains support for this device
//
// The alternative way is to drive the LCD directly from
// Javascript code using the i2c interface directly
// This approach is useful for learning about using
// the i2c bus. The lcd file is an implementation
// in Javascript for some of the common LCD functions

// configure jshint
/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

// change this to false to use the hand rolled version
//var useUpmVersion = true;

var lcd = require('jsupm_i2clcd');
var display = new lcd.Jhd1313m1(0, 0x3E, 0x62);

// we want mraa to be at least version 0.6.1
var mraa = require('mraa');
var version = mraa.getVersion();

if (version >= 'v0.6.1') {
    console.log('mraa version (' + version + ') ok');
}
else {
    console.log('meaa version(' + version + ') is old - this code may not work');
}

/**
 * Rotate through a color pallette and display the
 * color of the background as text
 */
function rotateColors(display) {
    var red = 0;
    var green = 192;
    var blue = 203;
    display.setColor(red, green, blue);
    setInterval(function() {
        display.setColor(red, green, blue);
        display.setCursor(0,0);
        display.write('Vivek Here');
        display.setCursor(1,0);
        display.write('No Fear!!');  // extra padding clears out previous text
    }, 1000);
}


rotateColors(display);

