//imports
const {Gpio} = require('pigpio')
const {writeFileSync, readFileSync} = require('fs')
const {device} = require('aws-iot-device-sdk')

// constants
const SENSITIVITY = 625


//configurations
const led = new Gpio(47, {mode: Gpio.OUTPUT})
const sideA = new Gpio(10, {
  mode: Gpio.INPUT,
  pullUpDown: Gpio.PUD_DOWN,
  edge: Gpio.EITHER_EDGE
})
const sideB = new Gpio(9, {
  mode: Gpio.INPUT,
  pullUpDown: Gpio.PUD_DOWN,
  edge: Gpio.EITHER_EDGE
})
const pi = device({
  host: 'a2iinrpf5r98gd.iot.us-east-1.amazonaws.com',
  port: 8883,
  clientId: 'pi_mvp',
  thingName: 'pi_mvp',
  caPath: './certs/root-CA.crt',
  certPath: './certs/ebwu.pem.crt',
  keyPath: './certs/ebwu-private.pem.key',
})

//helpers
const debounce = (fn, wait, immediate) =>{
  let timeout
  return function(){
    const context = this, args = arguments
    const later = ()=>{
      timeout=null
      if(!timeout) fn.apply(context, args)
    }
clearTimeout(timeout)
timeout = setTimeout(later, wait)
if (immediate && !timeout) fn.apply(context, args)
  }
}
const cleanUp = (err)=>{
  err ? console.log( err) : null
  led.digitalWrite(0)
  process.exit()
}


//set initial state
writeFileSync('/sys/class/leds/led0/trigger', 'none','utf8')
writeFileSync( 'stateA',sideA.digitalRead(), 'utf8' )
writeFileSync( 'stateB',sideB.digitalRead(), 'utf8' )





// main
pi.on('connect', ()=> {

    console.log('connected!')
    led.digitalWrite(1)

    const publishState = ()=>{
      const stateA = readFileSync('stateA', 'utf8')
      const stateB = readFileSync('stateB', 'utf8')
      pi.publish('sheet_state', JSON.stringify({ sheet_state: stateA + stateB}) )
    }

    // side A listener
    sideA.on('interrupt', debounce( level =>{
      writeFileSync( 'stateA',level, 'utf8' )
      publishState()

    },SENSITIVITY))

    //sideB listener
    sideB.on('interrupt', debounce( level => {
      writeFileSync( 'stateB',level, 'utf8' )
      publishState()
    }, SENSITIVITY))

 })


// eror handling
pi.on('error', (error) =>{
  console.log('connection error', error)
  led.digitalWrite(0)
})
process.on('exit', cleanUp)
//catches ctrl+c event
process.on('SIGINT', cleanUp)
// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', cleanUp)
process.on('SIGUSR2', cleanUp)
//catches uncaught exceptions
process.on('uncaughtException',  cleanUp)
