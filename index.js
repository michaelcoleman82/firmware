const Gpio = require('pigpio').Gpio,
      {writeFileSync, readFileSync, appendFileSync} = require('fs')

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


function debounce(func, wait, immediate) {
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



const sendMessage = ( stateA, stateB) => {

  console.log(stateA, stateB)

}

sideA.on('interrupt', debounce(function (level) {
  writeFileSync( 'stateA',level, 'utf8' )

  let stateA, stateB
  try{
    stateA = readFileSync('stateA', 'utf8')
    stateB = readFileSync('stateB', 'utf8')
  } catch (e) {}

  if(stateA && stateB  ){
    sendMessage(stateA, stateB);
  }


},100))

sideB.on('interrupt', debounce(function (level) {
  writeFileSync( 'stateB',level, 'utf8' )

  let stateA, stateB
  try{
    stateA = readFileSync('stateA', 'utf8')
    stateB = readFileSync('stateB', 'utf8')
  } catch (e) {}

  if(stateA && stateB  ){
    sendMessage(stateA, stateB);
  }



}, 100))
