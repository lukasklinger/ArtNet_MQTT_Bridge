const dmxlib = require('dmxnet');
const dmxnet = new dmxlib.dmxnet({});
const mqtt = require('mqtt');

const mqttTopic = "dmx";
const mqttServer = "192.168.168.3";

var client  = mqtt.connect(`mqtt://${mqttServer}`);
var mqttConnected = false;

var receiver = dmxnet.newReceiver({
  subnet: 0,
  universe: 0,
  net: 0,
});

client.on('connect', function () {
  client.subscribe(mqttTopic, function (err) {
    if (!err) {
      mqttConnected = true;
    }
  })
})

receiver.on('data', function(data) {
  if (mqttConnected) {
    client.publish(mqttTopic, JSON.stringify(data));
    
    for (var i = 0; i < data.length; i++) {
      client.publish(`${mqttTopic}/${i}`, data[i].toString(10));
    }
  }
});
