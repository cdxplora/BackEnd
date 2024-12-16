// Gateway module subscribing events from various 
// MQTT channels and making actions accordingly

const url = 'mqtt://test.mosquitto.org:1883';
const username = 'IoT-GUEST'
const password = 'Gj@ci85TjdJvzMZ'
const clientid = 'gateway-controller'
const topic = 'Karelia_IoT_Project_Team2_2024'
const room026ALightsTopic = '/karelia/wartsila/026a/lights/'

const topicSend = 'Karelia_IoT_Project_Team2_2024send'
const timerDelay = 5000

const mqtt = require('mqtt')

const options = {
    clientId: clientid,
    clean: true
}

var client = mqtt.connect( url, options )

client.on( 'connect', function () {
    console.log("Subscribing topic " + topic )
    client.subscribe(topic)
    console.log('done.')
})

client.on( 'message', function ( topic, message ) {
    console.log("Received a message from topic " + topic )
    const frame = message.toString()
    var obj = JSON.parse( frame )
    console.log(obj )
    
    if(obj.Temperature >=30)
    {
        
            console.log("Connection established. send")
            setInterval(
                () => {
                    const data = {
                        Heat: "Very_high"
                      
                    }
                    const frame = JSON.stringify( data )
                    client.publish( topicSend, frame )
                    console.log("Sent " + frame)
                }
            , timerDelay )
    

    }else{ console.log("Connection established. send")
        setInterval(
            () => {
                const data = {
                    Heat: "Very_low"
                  
                }
                const frame = JSON.stringify( data )
                client.publish( topicSend, frame )
                console.log("Sent " + frame)
            }
        , timerDelay )

    }
  
})

client.on('error', (err) => { 
    console.log("Error + " + JSON.stringify(err))
    process.exit(1)
})
