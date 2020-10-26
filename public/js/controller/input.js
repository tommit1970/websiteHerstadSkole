// INPUT module

var inputModule = (()=>{
	document.addEventListener('keydown', keyPressed);

	function keyPressed(evt){
		// console.log(evt.keyCode);

			// The spacebar options
		if(evt.keyCode == 32){
			console.log("Space pressed!");
			if(main.actTools.player2){
				console.log("Player2 is animating!");
				player2.toggleAnim();
			}

			if(main.actTools.player){
				console.log("Player is animating!");
				player.toggleAnim();
			}

			// 'A'-options
		}else if(evt.keyCode == 65){
			main.actTools.player2 ? main.actTools.player2 = false : main.actTools.player2 = true;
			// console.log(main.actTools.player2);
			console.log("Player2 status: " + main.actTools.player2);

			// 'W'-options
		}else if(evt.keyCode == 87){
			main.actTools.player ? main.actTools.player = false : main.actTools.player = true;
			// console.log(main.actTools.player);
			console.log("Player  status: " + main.actTools.player);

			// 'F5'-options
		}else if(evt.keyCode === 116){
			location.reload(); // when evt.preventDefault()
		}

	}





	return {
		// I don't think I need this to have anything inside here, intuitively. Am I wrong?
	}



})();