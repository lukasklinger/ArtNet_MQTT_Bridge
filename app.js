const dmxlib = require('dmxnet');
const dmxnet = new dmxlib.dmxnet({});
const mqtt = require('mqtt');

const mqttTopic = process.env.MQTT_TOPIC || "dmx";
const mqttHost = process.env.MQTT_HOST || "localhost";

const net = process.env.ARTNET_NET || "0";
const subnet = process.env.ARTNET_SUBNET || "0";
const universe = process.env.ARTNET_UNIVERSE || "0";

var client  = mqtt.connect(`mqtt://${mqttHost}`);
var mqttConnected = false;

// set up ArtNet receiver
var receiver = dmxnet.newReceiver({
  subnet: subnet,
  universe: universe,
  net: net
});

// connect to MQTT broker and check connection
client.on('connect', function () {
  client.subscribe(mqttTopic, function (err) {
    if (!err) {
      mqttConnected = true;
    } else {
      console.log("Could not connect to MQTT broker.")
    }
  })
});

// publish ArtNet data to MQTT
receiver.on('data', function(data) {
  if (mqttConnected) {
    client.publish(mqttTopic, JSON.stringify(data));
    
    for (var i = 0; i < data.length; i++) {
      client.publish(`${mqttTopic}/${i}`, data[i].toString(10));
    }
  } else {
    console.log("Received ArtNet data, discarding. Not connected to MQTT broker.");
  }
});

// logging output
console.log(`Listening for ArtNet data in network: ${net}, subnet: ${subnet}, universe: ${universe}`);
console.log(`Sending data to MQTT on host: ${mqttHost}, to topic ${mqttTopic}`);
