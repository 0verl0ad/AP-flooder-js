//Coded by J.M. Fernandez 
// @TheXC3LL
// http://0verl0ad.blogspot.com


var pcap = require("pcap");
var iface = "";


function string_to_array (string){ //Convertimos el string en un array con cada caracter en hexadecimal
	var ln = string.length;
	var text = [];
	i = 0;
	while (i < ln) {
		c = string.substr(i, 1);
		i++;
		d = "0x" + c.charCodeAt().toString(16);
		text.push(d);
	}
	return text;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function macRandom() {
	mac = [];
	z = 0;
	while (z < 6) {
		oct = getRandomInt(0,255);
		oct = "0x" + oct.toString(16);
		mac.push(oct);
		z++;
	}
	return mac;
}

var setInterface = function(interface) 
{
	iface = interface;
	session = pcap.createSession(iface, "");
	return;
}


var beacon = function(string) {
	var packet = [0x00, 0x00, 0x1a, 0x00, 0x2f, 0x48, 0x00, 0x00, 0x8d, 0x80, 0x1a, 0x38, 0x19, 0x00, 0x00, 0x00, 0x10, 0x02, 0x9e, 0x09, 0xa0, 0x00, 0xd6, 0x01, 0x00, 0x00, 0x80, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]; //Fixed parameters
var mac_s = macRandom(); //Mac Source Address
var mac_b = mac_s; // BSSID Mac
var fix_par = [0x40, 0x6d, 0x80, 0x81, 0x1a, 0x38, 0x19, 0x00, 0x00, 0x00, 0x64, 0x00, 0x31, 0x04, //Fixed Parameters
0x00];  //Set 0
	packet = packet.concat(mac_s);
	packet = packet.concat(mac_b);
	packet = packet.concat(fix_par);
	var size = string.length;
	size = "0x" + size.toString(16);
	packet.push(size);
	var coded = string_to_array(string);
	 packet = packet.concat(coded);
	var fixed = [
0x01, 0x08, 0x82, 0x84, 0x8b, 0x96, 0x0c, 0x12, 0x18, 0x24, 0x03, 0x01, 0x0b, 0x05, 0x04, 0x00, 0x01, 0x00, 0x00, 0x07, 0x06, 0x45, 0x53, 0x20, 0x01, 0x0d, 0x14, 0x2a, 0x01, 0x00, 0x30, 0x18, 0x01, 0x00, 0x00, 0x0f, 0xac, 0x02, 0x02, 0x00, 0x00, 0x0f, 0xac, 0x04, 0x00, 0x0f, 0xac, 0x02, 0x01, 0x00, 0x00, 0x0f, 0xac, 0x02, 0x00, 0x00, 0x32, 0x04, 0x30, 0x48, 0x60, 0x6c, 0x2d, 0x1a, 0x2c, 0x01, 0x03, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x3d, 0x16, 0x0b, 0x00, 0x17, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xdd, 0x1a, 0x00, 0x50, 0xf2, 0x01, 0x01, 0x00, 0x00, 0x50, 0xf2, 0x02, 0x02, 0x00, 0x00, 0x50, 0xf2, 0x04, 0x00, 0x50, 0xf2, 0x02, 0x01, 0x00, 0x00, 0x50, 0xf2, 0x02, 0xdd, 0x18, 0x00, 0x50, 0xf2, 0x02, 0x01, 0x01, 0x82, 0x00, 0x03, 0xa4, 0x00, 0x00, 0x27, 0xa4, 0x00, 0x00, 0x42, 0x43, 0x5e, 0x00, 0x62, 0x32, 0x2f, 0x00, 0xdd, 0x1e, 0x00, 0x90, 0x4c, 0x33, 0x2c, 0x01, 0x03, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xdd, 0x1a, 0x00, 0x90, 0x4c, 0x34, 0x0b, 0x00, 0x17, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xdd, 0x09, 0x00, 0x03, 0x7f, 0x01, 0x01, 0x00, 0x00,
0xff, 0x7f, 0x98, 0xe2, 0x2b, 0x61]; //Check sequence
	packet = packet.concat(fixed);
	var send = new Buffer( packet );
	session.inject(send);
}

exports.setInterface = setInterface;
exports.beacon = beacon;
