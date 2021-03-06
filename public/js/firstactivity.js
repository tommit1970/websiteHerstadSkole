// IIFE - Immediately Invoked Function Expression
var player = (()=>{


		var visualArea;
		var canvas, canvasContext;
			canvas = document.getElementById("firstCanvas");
			canvasContext = canvas.getContext("2d");

		// top point and bottom point
		var runningLine;
		var animation = false;
		var animReq;

		var framesPerSecond;
		var minute;
		// var tempo;
		var lineSpeedOneSec;
		var lineSpeedTotal;
		// var barLength;
		// var numOfInstruments;

		var timeCodesII = [];

		var measureStart, measureEnd = 0;

		// Measure = own class - stores measureArr = [0,0,0,0,etc.]

		// BRICK W + H
		var brickW;
		var brickH;
		var gap;

		// mouse
		var mouseX, mouseY;

		// canvas eventListener is found in canvasHandling below

		// control area - functionallity
		var playButton = document.querySelector(".play");
		var plussButton = document.querySelector(".plussTempo");
		var minusButton = document.querySelector(".minusTempo");
		var tapTempo = document.querySelector(".tapTempo");

		playButton.addEventListener("click", runPlayer);
		plussButton.addEventListener("click", (evt)=>{
			main.measure.tempoInc();
			timeCodeAndLineSpeedReset();
		});

		minusButton.addEventListener("click", (evt)=>{
			main.measure.tempoDec();
			timeCodeAndLineSpeedReset();
		});

		tapTempo.addEventListener("mousedown", measureTempo);



		// window resize listener
		window.addEventListener('resize', setCanvasWidthAndHeight);

		window.addEventListener('mousedown', ()=>{
			console.log("MouseB hold");
		});

		window.addEventListener('mouseup', ()=>{
			console.log("MouseB released");
		});




		var startTime, pressTime, pauseTimeStart = pauseTimeCollected = pauseTimeStop = 0, endTime;

		document.addEventListener("keydown", keyPressed);

		function keyPressed(evt){
			console.log(evt.keyCode);

			if(evt.keyCode === 32){
				console.log("You pressed the spacebar");
				togglePlayIt();

			}

			// var timeCodes = [0, 500, 1000, 1500, 2000]; // hardcoded, this should be calculated/adjusted on changes made to the tempo

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

			if(evt.keyCode === 116){
				location.reload(); // when evt.preventDefault()
			}
			// evt.preventDefault();
		}

		function togglePlayIt(){
			// both spacebar and playbutton
			animation === true ? animation = false : animation = true;
			
			// font-awesome - fa
			var psButton = document.querySelector(".fa-play") || document.querySelector(".fa-pause");

			if(animation === false){
				// pause animation
				cancelAnimationFrame(animReq);

				// console.dir(bassOne);

				// pause-icon to play
				psButton.classList.add("fa-play");
				psButton.classList.remove("fa-pause");
				
				// console.log((endTime-startTime)/1000);
				
				pauseTimeStart = Date.now();

				// console.log(pauseTimeStart);
			}else{
				// start animation
				animReq = requestAnimationFrame(animate);

				// play-icon to pause
				psButton.classList.add("fa-pause");
				psButton.classList.remove("fa-play");

				document.getElementById("tempoInput").value = main.measure.tempo;

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
			visualArea = document.querySelector(".visualArea");


			// to get proper width and height of canvas - no scaling

			// mouse move
			canvas.addEventListener("mousemove", mouseMove);
			canvas.addEventListener("click", toggleSound);

			// set runningLine points top and bottom
			runningLine = [[0,0],[0,visualArea.offsetWidth]];
			quantiSize = 1000;
			framesPerSecond = 60; // fps
			// barLength = 4;
			minute = 60;
			// tempo = 120; // bpm


			// numOfInstruments = 4;

			setCanvasWidthAndHeight();
			// drawAll(); // first image when animation is off

		}

		function setCanvasWidthAndHeight(){

			var percentOfCanvasWidth = runningLine[0][0]/visualArea.offsetWidth;
			var diffNewWidth = visualArea.offsetWidth - canvas.width;

			// canvas width and height
			canvas.width = visualArea.offsetWidth;
			canvas.height = visualArea.clientHeight;

			// brickSizes
			brickW = canvas.width / main.measure.beatsPerMeasure / main.measure.resPerBeat;
			brickH = canvas.height / main.measure.numOfInstruments;
			gap = brickW * 0.05;

			// adjust runningLine
			runningLine[0][0] += diffNewWidth * percentOfCanvasWidth;
			runningLine[1][0] += diffNewWidth * percentOfCanvasWidth;

			// console.log(runningLine);

			timeCodeAndLineSpeedReset();

			drawAll();
		}

		function timeCodeAndLineSpeedReset(){
			//calculate timeCodesII here
			timeCodesII = [0];
			for(var i = 1; i < main.measure.beatsPerMeasure*main.measure.resPerBeat + 1; i++){
				timeCodesII.push(Math.round(minute/main.measure.tempo / main.measure.resPerBeat * quantiSize * i));
			}

			console.log("TimeCodes: " + timeCodesII);

			lineSpeedOneSec = canvas.width / framesPerSecond;
			lineSpeedTotal = lineSpeedOneSec / main.measure.beatsPerMeasure * main.measure.tempo / minute; // no need for main.measure.resPerBeat??

			document.getElementById("tempoInput").value = main.measure.tempo;
		}

		// animate function
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
			if(runningLine[0][0] >= canvas.width || (((endTime-startTime)-(pauseTimeCollected))) >= timeCodesII[timeCodesII.length - 1]){ // safety timer
				// console.log("Width: "+ canvas.width);
				// console.log("Beats per Measure: " + main.measure.beatsPerMeasure);
				// console.log("Resolution per Beat: " + main.measure.resPerBeat);
				// console.log("TimeCodesII: " + timeCodesII);
				runningLine[0][0] = 0;
				runningLine[1][0] = 0;
				console.log("%cDuration of one screenlength is: " + (((endTime-startTime)-(pauseTimeCollected))/1000),"color: Green;");

				startTime = endTime;
				pauseTimeStart = pauseTimeStop = pauseTimeCollected = 0;
			}
		}


		function drawAll(){
				// draw data - Visual
				backScreen("black");

				// sounds on is drawn
				for(var row = 0; row < main.measure.numOfInstruments; row++){
					for(var col = 0; col < main.measure.beatsPerMeasure*main.measure.resPerBeat; col++){
						var index = colRowToIndex(col, row);
						if(main.measure.measureArr[index]){
							drawFilledRectangle(col*brickW+gap, row*brickH + gap, brickW - 2*gap, brickH - 2*gap, "orange");
							// fillCircle(col*brickW + brickW / 2, row * brickH + brickH / 2,brickH/4, "maroon");
							// console.log(index);
						}
					}
				}

				// instrumentSeparators
				const instrumentTrackHeight = canvas.height / main.measure.numOfInstruments;

				for (var i = 1; i < main.measure.numOfInstruments; i++) {
					drawLine(0, instrumentTrackHeight * i, canvas.width, instrumentTrackHeight * i, "red", 1);		
					// console.log("Line " + i);	
				}

				// lines per measure
				for(var i = 1; i < main.measure.beatsPerMeasure*main.measure.resPerBeat; i++){
					drawLine(canvas.width/main.measure.beatsPerMeasure/main.measure.resPerBeat*i, 0, canvas.width/main.measure.beatsPerMeasure/main.measure.resPerBeat*i, canvas.height, "green", 1);
				}


				// running timeline
				drawLine(runningLine[0][0],runningLine[0][1], runningLine[1][0],runningLine[1][1], "white", 1);

		}

		function colRowToIndex(col, row){
			return row*main.measure.beatsPerMeasure*main.measure.resPerBeat + col;
		}


		function backScreen(color){
			drawFilledRectangle(0,0, canvas.width, canvas.height, color);
		}

		function playAll(){
			var treshhold = 10;

			var diff = (endTime - startTime) - pauseTimeCollected;

			var resolution = main.measure.beatsPerMeasure * main.measure.resPerBeat;

			// use main.measure.measureArr to time sound

			for(var time = 0; time < timeCodesII.length; time++){
				if(diff - treshhold < timeCodesII[time] && diff + treshhold > timeCodesII[time]){

					for(var i = time; i < main.measure.measureArr.length; i+=resolution){
						if(main.measure.measureArr[i]){
							// console.log(soundArr[i]);
							// console.log(main.measure.measureArr[i]);
							var index = Math.floor(i/resolution);
							console.log("Flooring "+ i + "/resolution: "+Math.floor(i/resolution));
							if(!soundArr[index].ended){
								console.log(soundArr[index].ended);
								soundArr[index].currentTime = 0;
								soundArr[index].ended = true;
							}
							soundArr[index].play();
							// break;
						}

					}
					console.log(diff);
					
					break;

				}

			}



			if(diff - treshhold < timeCodesII[4] && diff + treshhold > timeCodesII[4]){
					// snareTwo.play();
					console.log(diff);
			}
			// find out when sound ends and how to play different sounds simultanously

		}

		function runPlayer(){
			console.log("You clicked play");
			togglePlayIt();

		}

		function measureTempo(){
			var measureDiff;
			var measureTime = Date.now();


			// check for start
			if(measureStart){
				measureEnd = measureTime;
			}else{
				measureStart = measureTime;
			}

			// timeout security
			if(measureEnd - measureStart > 2000){
				measureStart = measureEnd = 0;
				console.log("Start and End reset");
			}else{
				console.log("MeasureDiff: " + (measureEnd - measureStart));
			}


			if(measureEnd && measureStart && measureEnd - measureStart > 250){
				measureDiff = measureEnd - measureStart;
				measureStart = measureEnd;
				//calculate tempo
				main.measure.tempo = Math.round(60 * 1000/measureDiff);
				timeCodeAndLineSpeedReset();
				console.log("MeasureDiff: " + measureDiff);
			}




		}

		function mouseMove(evt){
		    var root = document.documentElement;
		    var rect = canvas.getBoundingClientRect();

		    // mouseX = evt.clientX - rect.left- root.scrollLeft;
		    // mouseX = evt.clientX - rect.left- root.scrollLeft;
		    mouseX = evt.clientX - rect.left;
		    mouseY = evt.clientY - rect.top;

		}

		function toggleSound(evt){
		    console.log("X: " + mouseX + "\nY: " + mouseY);

			var gridCol = Math.floor(mouseX / brickW);
			var gridRow = Math.floor(mouseY / brickH);

			var index = colRowToIndex(gridCol, gridRow);

			main.measure.measureArr[index] ? main.measure.measureArr[index] = false : main.measure.measureArr[index] = true; // the toggle

			console.log("GridCol: " + gridCol + "\nGridRow: " + gridRow);

		    drawAll();

		}

		return { // accessible from the outside
			canHandling : canvasHandling,
			canCtx : canvasContext,
			tcII : timeCodesII
		}


})();