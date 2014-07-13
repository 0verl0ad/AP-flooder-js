//Coded by J.M. Fernandez 
// @TheXC3LL
// http://0verl0ad.blogspot.com



var apfake = require("./apfake.js");
var fs = require("fs");


var iface = process.argv[2];
var essid = process.argv[3];

if (!iface || !essid) {
	console.log("Usage: node AP-flooder <interface> <FILE> ");
	process.exit(1);
}

var array = fs.readFileSync(essid).toString().split("\n");
apfake.setInterface(iface);

while (1) {
	for (i in array) {
	apfake.beacon(array[i]);
	console.log("Beacon sent");
	}
}
