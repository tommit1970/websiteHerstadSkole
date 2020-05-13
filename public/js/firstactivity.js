var canvas, canvasContext;

// top point and bottom point
var runningLine;
var animation = false;
var animReq;

var framesPerSecond;
var minute;
var tempo;
var lineSpeedOneSec;
var lineSpeedTotal;
var barLength;
var numOfInstruments;

var blink;

var startTime, pressTime, pauseTimeStart = 0, pauseTimeCollected = 0, pauseTimeStop = 0, endTime;

document.addEventListener("keydown", keyPressed);

function keyPressed(evt){
	console.log(evt.keyCode);

	if(evt.keyCode === 32){
		console.log("You pressed the spacebar");
		animation === true ? animation = false : animation = true;
		
		if(animation === false){
			cancelAnimationFrame(animReq);
			console.log((endTime-startTime)/1000);
			
			pauseTimeStart = Date.now();

			// console.log(pauseTimeStart);
		}else{
			animReq = requestAnimationFrame(animate);
			if(runningLine[0][0] === 0){
				startTime = Date.now();
			}else{
				if(pauseTimeStart){
					pauseTimeStop = Date.now();
					pauseTimeCollected += (pauseTimeStop - pauseTimeStart);
				}
			}
			// console.log(pauseTimeStop);
		}


	}

	var timeCodes = [0, 500, 1000, 1500, 2000]; // hardcoded

	if(evt.keyCode === 82){ // 'r'
		pressTime = Date.now();

		var diffTime = pressTime - startTime;
		var hit = false;
		// find the timeCode pressTime is closest to


		for(var i = 0; i < timeCodes.length; i++){
			if(Math.abs(diffTime - timeCodes[i]) < 50){
				hit = true;
			}
		}

		if(hit){
			console.log("%c Innafor tidsgrensa " + ((pressTime-startTime)), "color: lime;");
		}else{
			console.log("%c Utafor tidsgrensa " + ((pressTime-startTime)), "color: red;");
		}

	}
}


function canvasHandling(){
	canvas = document.getElementById("firstCanvas");
	canvasContext = canvas.getContext("2d");

	runningLine = [[0,0],[0,canvas.height]];
	framesPerSecond = 60; // bpm or fps
	barLength = 4;
	minute = 60;
	tempo = 120; // bpm
	lineSpeedOneSec = canvas.width / framesPerSecond;
	lineSpeedTotal = lineSpeedOneSec / barLength * tempo / minute;
	numOfInstruments = 4;


	// animate();
	// mainAnimation();
	drawAll(); // first image when animation is off

}

const animate = () => {
    animReq = requestAnimationFrame(animate);
    mainAnimation();
}


function mainAnimation(){
	
		// change data
		moveAll();

		// Aurally sound it
		playAll();

		// Visually show it
		drawAll();
}

function moveAll(){

	runningLine[0][0] += lineSpeedTotal;
	runningLine[1][0] += lineSpeedTotal;


	endTime = Date.now();

	// if(endTime-startTime){

	// }

	if(runningLine[0][0] > canvas.width || ((endTime-startTime)-(pauseTimeCollected))/1000 > barLength){
		// console.log("X = " + runningLine[0][0]);
		// console.log("LineSpeedTotal: " + lineSpeedTotal);
		// console.log("Tempo: " + tempo);
		// console.log("LineSpeedTotal * tempo: " + (lineSpeedTotal * barLength / tempo));
		runningLine[0][0] = 0;
		runningLine[1][0] = 0;
		console.log("Duration of one screenlength is: " + (((endTime-startTime)-(pauseTimeCollected))/1000));

		startTime = endTime;
		pauseTimeStart = pauseTimeStop = pauseTimeCollected = 0;
		// animation = false;
		// cancelAnimationFrame(animReq);
	}

}


function drawAll(){
		// draw data - Visual
		backScreen();


		// instrumentSeparators
		const instrumentTrackHeight = canvas.height / numOfInstruments;
		// console.log(numOfInstruments);

		for (var i = 1; i < numOfInstruments; i++) {
			drawLine(0, instrumentTrackHeight * i, canvas.width, instrumentTrackHeight * i, "red", 1);		
			// console.log("Line " + i);	
		}

		// fixed line in the middle
		for(var i = 1; i < barLength; i++){
			drawLine(canvas.width/barLength*i, 0, canvas.width/barLength*i, canvas.height, "green",1);
		}

		// runningLine
		drawLine(runningLine[0][0],runningLine[0][1], runningLine[1][0],runningLine[1][1], "white",1);


}


function backScreen(){
	drawFilledRectangle(0,0, canvas.width, canvas.height, "black");
}

function playAll(){
	var audioCodes = [0, 500, 1000, 1500, 2000]; // hardcoded
	var treshhold = 10;

	var diff = endTime - startTime;

	if(diff - treshhold < audioCodes[0] && diff + treshhold > audioCodes[0]){
		bassOne.play();
		console.log(diff);
	}

	if(diff - treshhold < audioCodes[2] && diff + treshhold > audioCodes[2]){
		bassTwo.play();
		console.log(diff);
	}

	// find out when sound ends and how to play different sounds simultanously


}