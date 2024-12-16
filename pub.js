// Publisher: single board computer 1 - SBC-001
// having simulated (random) temperature and illumination sensors

const url = 'tls:f0ae3f10c7934f22af58baf1325a7a00.s2.eu.hivemq.cloud:8883'
const username = 'IoT-GUEST'
const password = 'Gj@ci85TjdJvzMZ'
const clientid = 'SBC-001'
const topic = '/karelia/wartsila/026a/status/'
const timerDelay = 5000

const mqtt = require('mqtt')

const options = {
    clientId: clientid,
    username: username,
    password: password,
    clean: true
}

var client = mqtt.connect( url, options )

client.on('connect', () => {
    console.log("Connection established.")
    setInterval(
        () => {
            const data = {
                temperature: Math.random() * 10 + 15,
                illumination: Math.random() * 100,
                occupied: (Math.random() >= 0.5),
                humidity: (Math.random() * 100)
            }
            const frame = JSON.stringify( data )
            client.publish( topic, frame )
            console.log("Sent " + frame)
        }
    , timerDelay )
})
