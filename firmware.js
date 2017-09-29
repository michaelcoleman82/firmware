//imports
const Gpio = require('pigpio').Gpio
const {writeFileSync, readFileSync} = require('fs')


// constants
const SENSITIVITY = 625


//initialize
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


// get initial state
writeFileSync( 'stateA',sideA.digitalRead(), 'utf8' )
writeFileSync( 'stateB',sideB.digitalRead(), 'utf8' )


 

// helper
const debounce = (func, wait, immediate) => {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};


// side A listener
sideA.on('interrupt', debounce( (level) =>{

  writeFileSync( 'stateA',level, 'utf8' )
  stateA = readFileSync('stateA', 'utf8')
  stateB = readFileSync('stateB', 'utf8')
  sendMessage(stateA, stateB)

},SENSITIVITY))

//sideB listener
sideB.on('interrupt', debounce( (level) => {
  writeFileSync( 'stateB',level, 'utf8' )
  stateA = readFileSync('stateA', 'utf8')
  stateB = readFileSync('stateB', 'utf8')
  sendMessage(stateA, stateB)

}, SENSITIVITY))


// TODO: sends state to cloud
const sendMessage = ( stateA, stateB) => console.log(stateA, stateB)
