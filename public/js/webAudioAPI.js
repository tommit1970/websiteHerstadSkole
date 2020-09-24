console.log("WebAudioAPI - connected");

var player2 = (()=>{

	// animation proof
	var frameCounter = 0;
	var chosen = 0;
	var colorArr = ["black", "white"];

	var waAPIcanvas, waCanvasContext, animRequest, animOn = false;

	var audioContext = new 

	waAPIcanvas = document.querySelector(".webAudioAPI_visualArea");
	var visualArea2 = document.querySelector(".visualArea2");
	// console.dir(visualArea2);
	waAPIcanvas.width = visualArea2.clientWidth-1;
	waAPIcanvas.height = visualArea2.clientHeight;
	console.log("Width: "+waAPIcanvas.width);
	waCanvasContext = waAPIcanvas.getContext("2d");

	// document.addEventListener("keydown", keyPressed);

	// function keyPressed(evt){
	// 	console.log(evt.keyCode);
	// 	if(evt.keyCode == 32){
	// 		console.log("Space pressed");
	// 		toggleAnimation();
	// 	}
	// }

	function toggleAnimation(){
		animOn ? animOn = false : animOn = true;

		if(animOn){
			animRequest = requestAnimationFrame(animate2);
		}else{
			cancelAnimationFrame(animRequest);
		}

	}

	// animate function
	const animate2 = () => {
		console.log("Running main!");
	    animRequest = requestAnimationFrame(animate2);
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

	}

	function playAll(){

	}

	function drawAll(){
		
		if(frameCounter > 10){
			// if(chosen == 0){
			// 	chosen = 1;
			// }else{
			// 	chosen = 0;
			// }
			chosen == 0 ? chosen = 1 : chosen = 0;
			frameCounter = 0;
		}
		// drawn every frame - but changes every 10 frame because of the code above
		drawFilledRectangle2(waCanvasContext,0,0,waAPIcanvas.width, waAPIcanvas.height, colorArr[chosen]);
		frameCounter++;

	}



	return {
		waCanContext: waCanvasContext,
		waAPIcanvas: waAPIcanvas,
		// anim: animate2,
		toggleAnim: toggleAnimation

	}

})();

// console.log(player2.waCanContext);



