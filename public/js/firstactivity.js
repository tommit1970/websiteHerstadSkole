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

var timeCodesII = [0];

var playButton = document.querySelector(".play");

playButton.addEventListener("click", runPlayer);


var startTime, pressTime, pauseTimeStart = 0, pauseTimeCollected = 0, pauseTimeStop = 0, endTime;

document.addEventListener("keydown", keyPressed);

function keyPressed(evt){
	evt.preventDefault();
	console.log(evt.keyCode);

	if(evt.keyCode === 32){
		console.log("You pressed the spacebar");
		playIt();

	}

	var timeCodes = [0, 500, 1000, 1500, 2000]; // hardcoded, this should be calculated/adjusted on changes made to the tempo

	if(evt.keyCode === 82){ // 'r'
		pressTime = Date.now();

		var diffTime = pressTime - startTime;
		var hit = false;
		// find the timeCode pressTime is closest to


		for(var i = 0; i < timeCodesII.length; i++){
			if(Math.abs(diffTime - timeCodesII[i]) < 50){
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

function playIt(){
	// both spacebar and playbutton
	animation === true ? animation = false : animation = true;
	
	// font-awesome - fa
	var psButton = document.querySelector(".fa-play") || document.querySelector(".fa-pause");

	if(animation === false){
		// stop animation
		cancelAnimationFrame(animReq);

		// stop to play
		psButton.classList.add("fa-play");
		psButton.classList.remove("fa-pause");
		
		// console.log((endTime-startTime)/1000);
		
		pauseTimeStart = Date.now();

		// console.log(pauseTimeStart);
	}else{
		// start animation
		animReq = requestAnimationFrame(animate);

		// play to stop
		psButton.classList.add("fa-pause");
		psButton.classList.remove("fa-play");

		document.getElementById("tempoInput").value = tempo;

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


function canvasHandling(){
	canvas = document.getElementById("firstCanvas");
	canvasContext = canvas.getContext("2d");

	runningLine = [[0,0],[0,canvas.height]];
	quantiSize = 1000;
	framesPerSecond = 60; // bpm or fps
	barLength = 4;
	minute = 60;
	tempo = 120; // bpm
	//calculate timeCodesII here
	for(var i = 1; i < barLength + 1; i++){
		timeCodesII.push(minute/tempo * quantiSize * i);
	}
	console.log(timeCodesII);

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

	// running timeline
	runningLine[0][0] += lineSpeedTotal;
	runningLine[1][0] += lineSpeedTotal;


	// timer
	endTime = Date.now();

	// check timer and canvas.width
	if(runningLine[0][0] >= canvas.width || ((endTime-startTime)-(pauseTimeCollected))/1000 >= barLength){
		runningLine[0][0] = 0;
		runningLine[1][0] = 0;
		console.log("Duration of one screenlength is: " + (((endTime-startTime)-(pauseTimeCollected))/1000));

		startTime = endTime;
		pauseTimeStart = pauseTimeStop = pauseTimeCollected = 0;
	}
}


function drawAll(){
		// draw data - Visual
		backScreen();

		// instrumentSeparators
		const instrumentTrackHeight = canvas.height / numOfInstruments;

		for (var i = 1; i < numOfInstruments; i++) {
			drawLine(0, instrumentTrackHeight * i, canvas.width, instrumentTrackHeight * i, "red", 1);		
			// console.log("Line " + i);	
		}

		// lines per beat
		for(var i = 1; i < barLength; i++){
			drawLine(canvas.width/barLength*i, 0, canvas.width/barLength*i, canvas.height, "green",1);
		}

		// running timeline
		drawLine(runningLine[0][0],runningLine[0][1], runningLine[1][0],runningLine[1][1], "white",1);

}


function backScreen(){
	drawFilledRectangle(0,0, canvas.width, canvas.height, "black");
}

function playAll(){
	var treshhold = 10;

	var diff = (endTime - startTime) - pauseTimeCollected;

	if(diff - treshhold < timeCodesII[0] && diff + treshhold > timeCodesII[0]){
		bassOne.play();
		console.log(diff);
		console.log(lineSpeedTotal);
	}
	if(diff - treshhold < timeCodesII[1] && diff + treshhold > timeCodesII[1]){
			snareOne.play();
			console.log(diff);
	}

	if(diff - treshhold < timeCodesII[2] && diff + treshhold > timeCodesII[2]){
		bassTwo.play();
		console.log(diff);
	}

	if(diff - treshhold < timeCodesII[3] && diff + treshhold > timeCodesII[3]){
			snareTwo.play();
			console.log(diff);
	}

	if(diff - treshhold < timeCodesII[4] && diff + treshhold > timeCodesII[4]){
			// snareTwo.play();
			console.log(diff);
	}
	// find out when sound ends and how to play different sounds simultanously

}

function runPlayer(){
	console.log("You clicked play");
	playIt();

}
