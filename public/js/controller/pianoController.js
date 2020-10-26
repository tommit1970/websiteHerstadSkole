console.log("Connected!");
// global variables
var audioCtx, gainNode, printGainValue, osc, oscArray;

class InstrumentMaker{

	constructor(){
		// this.natural = new NaturalScale(110);
		this.tempered = new TemperedScale(220);
		this.keyboardArray = ['A','W','S','E','D','F','T','G','Y','H','U','J','K'];
		this.numOfButtns = this.keyboardArray.length;
		this.keyboardArrayASCII = []; // this array will be created
		this.makeASCIIFromLetters();
		// to monitor changes of keypresses
		this.keyboardStateArray = [0,0,0,0,0,0,0,0,0,0,0,0,0];
		this.keyboardPrevStateArray = [0,0,0,0,0,0,0,0,0,0,0,0,0];
		this.keyPressedOrder = []; // sequence
		this.stateChange = false;
		this.temperedToneButtonsArray = [];
		this.positionOfA = 0;
		this.targetArray = [];
		this.keysOn = false;
	}

	start(){
		// this.naturalScaleDiv = document.querySelector(".naturalscale");
		this.temperedScaleDiv = document.querySelector(".temperedscale");
		this.checkbox = document.querySelector(".black_keys");
		this.checkbox.addEventListener('change', this.toggleBlackKeys.bind(this)); // bind(this) will send the this-instance to the function
		this.moveLeft = document.querySelector('.left').addEventListener('click', this.moveSetToPreviousNote.bind(this));
		this.moveRight = document.querySelector('.right').addEventListener('click', this.moveSetToNextNote.bind(this));
		// this.natural.calculateAllNaturalFrequencies();
		this.tempered.calculateAllTemperedFrequencies();
		// this.createToneScaleButtons(this.naturalToneButtonsArray, this.natural, this.naturalScaleDiv);
		this.createToneScaleButtons(this.temperedToneButtonsArray, this.tempered, this.temperedScaleDiv);
		document.addEventListener('keydown', this.keyboardPlaySound.bind(this));
		document.addEventListener('keyup', this.keyboardStopSound.bind(this));
	}

	makeASCIIFromLetters(){
		var letterCode;
		for(var i = 0; i < this.keyboardArray.length; i++){
			letterCode = this.keyboardArray[i].charCodeAt(); // from 'letter' to keyCode
			this.keyboardArrayASCII.push(letterCode);
			console.log(this.keyboardArray[i] + " = " + letterCode)
		}
	}

	keyboardPlaySound(evt){

		// evt.preventDefault();

		if(this.keysOn){

			// A key is pressed and a tone should play

			if(this.keyboardArrayASCII.includes(evt.keyCode)){
				console.log("You pressed: " + String.fromCharCode(evt.keyCode)); // from keyCode to 'letter'
				
				var keyIndex = this.keyboardArrayASCII.indexOf(evt.keyCode);
				// var currentButton = this.temperedToneButtonsArray[keyArrayIndex];


				// There was a change in state for a button(pressed)
				this.stateChange = true; // is this neccessary???????

				// console.log(this.keyboardStateArray);

				// Do something about the change
				// if key is allready pressed - because of repetition on the EventListening - don't call this
				if(!this.keyboardStateArray[keyIndex]){

					// console.log("You reached keyboardPlaySound");
					// Set this key to on
					this.keyboardStateArray[keyIndex] = 1;
					// And start making this key's sound
					this.playSound(this.temperedToneButtonsArray[keyIndex], keyIndex);
				}
			}
		}
	}

	keyboardStopSound(evt){
		// evt.preventDefault();

		if(this.keysOn){
			
			// A key is released and a tone should stop

			if(this.keyboardArrayASCII.includes(evt.keyCode)){
				var keyIndex = this.keyboardArrayASCII.indexOf(evt.keyCode);
				

				//  There was a change in state for a button(released)
				this.stateChange = true; // is this neccessary

				// console.log(this.keyboardStateArray);
				if(this.keyboardStateArray[keyIndex] != 0){

					// console.log("You reached keyboardStopSound");
					// Set this key to off			
					this.keyboardStateArray[keyIndex] = 0;
					// And stop making this key's sound
					this.stopSound(this.temperedToneButtonsArray[keyIndex], keyIndex);
				}
			}
		}
	}

	createToneScaleButtons(buttonArray, toneScaleObject, parentNode){

		for(var i = 0; i < this.numOfButtns; i++){
			//Natural scale 
			buttonArray.push(document.createElement("button"));
			buttonArray[i].textContent = toneScaleObject.toneNameArray[i];
			buttonArray[i].id = parentNode.className[0] + i; // firstLetter of parentNode.className + counter
			buttonArray[i].className = i.toString(); // firstLetter of parentNode.className + counter
			if(i === 1 || i === 3 || i === 6 || i === 8 || i === 10){ // "black" keys - 0 = Do, 2 = Re, 4 = Mi, etc.
				buttonArray[i].classList.add("black");
			}


			buttonArray[i].frequency = toneScaleObject.freqArray[i];
			buttonArray[i].addEventListener('mousedown', this.mousePlaySound.bind(this)); // bind is necessary for this to work
			buttonArray[i].addEventListener('mouseup', this.mouseStopSound.bind(this)); // bind(this) here resulted in 13 calls
			parentNode.appendChild(buttonArray[i]); // place every button side by side
		}
	}

	replaceValuesInToneScaleButtons(buttonArray, toneScaleObject){
		for(var i = 0; i < buttonArray.length; i++){
			buttonArray[i].frequency = toneScaleObject.freqArray[i];
			buttonArray[i].textContent = toneScaleObject.toneNameArray[i];
		}
	}

	mousePlaySound(evt){

		// find index
		var mouseIndex = parseInt(evt.target.classList[0]);
		console.log(mouseIndex);
		// find target
		var target = evt.target;

		console.log("You reached mousePlaySound");

		if(!this.keyboardStateArray[mouseIndex]){
			this.keyboardStateArray[mouseIndex] = 1;
		}
		console.log(this.keyboardStateArray);

			
		// Set this key to on
		// change keyboardStateArray
			
		// And start making this key's sound
		// call stopSound(target, index)
		this.playSound(this.temperedToneButtonsArray[mouseIndex], mouseIndex);

	}
	mouseStopSound(evt){

		// find index
		var mouseIndex = parseInt(evt.target.classList[0]);
		console.log(mouseIndex);
		// find target
		var target = evt.target;




		console.log("You reached mouseStopSound");
			
		// Set this key to on
		// change keyboardStateArray
		if(this.keyboardStateArray[mouseIndex] != 0){
			this.keyboardStateArray[mouseIndex] = 0;
		}
		console.log(this.keyboardStateArray);
			
		// And start making this key's sound
		// call playSound(target, index)
		this.stopSound(this.temperedToneButtonsArray[mouseIndex], mouseIndex);
	}

	playSound(evt, index){

		// do not trust evt to be the event, it could also be the event.target
		var target;

		target = evt;

		// visual stuff
		// this.targetArray.push(target); // remember the button-object clicked down, LIST pressed buttons
		// console.log(this.targetArray[this.targetArray.length-1]); // see the last pressed button and it's properties

		// keeping order of the pushes
		this.keyPressedOrder.push(index);
		
		// In this version of PianoPlayer there can only be one note played at a time even though several keys are pressed

		if(!audioCtx){
			audioCtx = new AudioContext();
			osc = audioCtx.createOscillator();
	
			gainNode = audioCtx.createGain();
			gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
			osc.connect(gainNode);
			gainNode.connect(audioCtx.destination);
			osc.start();
		}
		this.setFrequency(target.frequency); // here

		var attack = 0.01;
		var decay = 0.01;
		// console.log(gainNode.gain.value);
		gainNode.gain.setValueAtTime(gainNode.gain.value, audioCtx.currentTime);
		gainNode.gain.linearRampToValueAtTime(0.7, audioCtx.currentTime + attack);
		// console.log(gainNode.gain.value);
		gainNode.gain.exponentialRampToValueAtTime(0.5, audioCtx.currentTime + attack + decay);


		// visual sugar
		target.classList.add('pressed'); // here

	}

	stopSound(evt, index){

		// do not trust evt to be the event, it could also be the target
		// console.log(this.keyPressedOrder);
		this.keyPressedOrder.splice(this.keyPressedOrder.indexOf(index),1); // MORE research on this one ********************************
		// console.log(this.keyPressedOrder);

		// console.log(evt);
		// console.log(this.targetArray.length);
		if(!this.keyPressed(this.keyboardStateArray)){ // mousePressed
			var release = 0.01;
			gainNode.gain.setValueAtTime(gainNode.gain.value, audioCtx.currentTime);
			gainNode.gain.exponentialRampToValueAtTime(0.000001, audioCtx.currentTime + release);
		}else{
			// make arrayOfKeyPressesInOrderOfPressing
			// find prevPressedKey
			var lastPressedKey = this.keyPressedOrder[this.keyPressedOrder.length-1];

			// play the note that is still held
			this.setFrequency(this.tempered.freqArray[lastPressedKey]);
		}
		
		// visual
		// this.targetArray.shift(); // remove from array of targets(pressed keys)
		evt.classList.remove('pressed');
		// multiple key-presses are handled in playSound()
	}

	keyPressed(keyboardStateArray){
		for(var i = 0; i < keyboardStateArray.length; i++){
			if(keyboardStateArray[i]){
				return true;
			}
		}
		return false;
	}

	countKeysPressed(keyboardStateArray){
		var keyCounter = 0;
		for(var i = 0; i < keyboardStateArray.length; i++){
			if(keyboardStateArray[i] == 1){
				keyCounter++;
			}
		}
		return keyCounter;
	}

	updateKeyboardPressArray(key, value){


	}



	setFrequency(freq){
		// console.log(freq);
		osc.frequency.value = freq;
	}

	toggleBlackKeys(evt){
		var black_keys = [1,3,6,8,10];
		for(var i = 0; i < black_keys.length; i++){
				this.temperedToneButtonsArray[black_keys[i]].classList.toggle("black");
		}
	}

	moveSetToPreviousNote(evt){
		// console.log("You clicked left");
		// toneNameArray
		this.popingAndUnshiftingArrays(this.tempered.toneNameArray);
		console.log(this.positionOfA = this.tempered.toneNameArray.indexOf('A'));
		// freqArray
		this.popingAndUnshiftingArrays(this.tempered.freqArray);
		// adjust values in buttonObject
		this.replaceValuesInToneScaleButtons(this.temperedToneButtonsArray, this.tempered);
	}

	moveSetToNextNote(evt){
		// console.log("You clicked right");
		// toneNameArray
		this.shiftingAndPushingArrays(this.tempered.toneNameArray);
		console.log(this.positionOfA = this.tempered.toneNameArray.indexOf('A'));
		//freqArray
		this.shiftingAndPushingArrays(this.tempered.freqArray);
		// adjust values in buttonObject
		this.replaceValuesInToneScaleButtons(this.temperedToneButtonsArray, this.tempered);
	}

	popingAndUnshiftingArrays(arrayToBeHandled){
		// remove tone from 
		arrayToBeHandled.pop();
		var copyEndOfArrayValue = arrayToBeHandled[arrayToBeHandled.length-1];
		console.log(typeof(copyEndOfArrayValue));
		if(typeof(copyEndOfArrayValue)=== 'number'){
			copyEndOfArrayValue /= 2; // freqArray is made of numbers
		}
		arrayToBeHandled.unshift(copyEndOfArrayValue);
	}

	shiftingAndPushingArrays(arrayToBeHandled){
		arrayToBeHandled.shift();
		var copyOfFirstArrayValue = arrayToBeHandled[0];
		console.log(typeof(copyOfFirstArrayValue));
		if(typeof(copyOfFirstArrayValue)==='number'){
			copyOfFirstArrayValue *= 2; // freqArray is made of numbers
		}
		arrayToBeHandled.push(copyOfFirstArrayValue);
	}
}

var instrument = new InstrumentMaker();

instrument.start();



