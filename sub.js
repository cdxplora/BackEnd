const url = 'tls:f0ae3f10c7934f22af58baf1325a7a00.s2.eu.hivemq.cloud:8883'
const username = 'IoT-GUEST'
const password = 'Gj@ci85TjdJvzMZ'
const clientid = 'SBC-002-Petri'
const topic = '/karelia/wartsila/026a/lights/'

let lightsOn = false

const mqtt = require('mqtt')

const options = {
    clientId: clientid,
    username: username,
    password: password,
    clean: true
}

var client = mqtt.connect( url, options )

client.on( 'connect', () => {
    console.log("Subscribing topic " + topic )
    client.subscribe( topic )
    console.log("done.")
})

client.on( 'message', ( topic, message ) => {
    console.log("Received a message from topic " + topic )
    var obj = JSON.parse( message.toString() )
    lightsOn = obj.value
    console.log( "Lights switched to " + (lightsOn ? "on" : "off") )
})

