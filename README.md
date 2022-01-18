# ArtNet-MQTT Bridge
> Connecting DMX ArtNet data to MQTT devices.

[![forthebadge](https://forthebadge.com/images/badges/uses-badges.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/built-with-science.svg)](https://forthebadge.com)

Simply put, this software receives DMX data through ArtNet and publishes values for the entire DMX universe to an MQTT broker. Useful to integrate smart home devices (e.g. lights) with an existing DMX/ArtNet setup.

## Installation

Linux, Windows & macOS:

```sh
npm install
```

Then set *environment variables* as necessary. The following variables are available:
* **MQTT_TOPIC** (DMX data will be published to this topic, default *dmx*)
* **MQTT_HOST** (hostname for MQTT broker (e.g. "192.168.1.2"), default *localhost*)
* **ARTNET_NET** (ArtNet network to be used, default *0*)
* **ARTNET_SUBNET** (ArtNet subnet to be used, default *0*)
* **ARTNET_UNIVERSE** (ArtNet universe to be used, default *0*)

## Usage

Run installation, then run

```sh
node app
```

If all environment variables are set correctly, ArtNet data will now be published to the MQTT broker. The topic *dmx* (or other, if variable set) receives the entire DMX universe as a JSON array, topics *dmx/0* to *dmx/511* receive the value for the respective DMX channel.

## Docker

This repository also includes a Dockerfile. Simply build it like this

```sh
docker build -t artnetMqttBridge .
```

and run it like this

```sh
docker run -p 6454:6454/udp -e MQTT_TOPIC=dmx -e MQTT_HOST=192.168.1.1 artnetMqttBridge
```

## Release History

* 1.0.0
    * First release

## Meta

lukasklinger – [@cyaniccerulean](https://twitter.com/cyaniccerulean) – lukasklinger.com

[https://github.com/lukasklinger](https://github.com/lukasklinger/)

[https://git.lukasklinger.com/lukas](https://git.lukasklinger.com/lukas)

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
