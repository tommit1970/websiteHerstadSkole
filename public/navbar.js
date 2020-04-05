console.log("Connected!");

// IIFE - Imediately Invoked Function Expression preparations
var navBarHandling = (function(){

		var DOMstrings = {
			dropdowns:{
				dropOneContent: "dropOne-content",
				dropTwoContent: "dropTwo-content",
				dropThreeContent: "dropThree-content",
				dropFourContent: "dropFour-content"
			}
		}

		var activeWindows = { // onload - one section active(visible) at once
			mainwindow: "block",
			loginsection: "none",
			gradesection: "none"
		}

		var dropDownsContent = [];

		// USING EVENT BUBBLING and EVENT TARGETING = EVENT DELEGATION
		var navDOM = document.querySelector(".navbar");
		navDOM.addEventListener('click', dropDownHandling);

		var mainDOM = document.querySelector("#mainwindow");
		mainDOM.addEventListener('click', removeDrop);

		for(var key in DOMstrings.dropdowns){
			dropDownsContent.push(document.getElementById(DOMstrings.dropdowns[key]));
		}

		function dropDownHandling(event){

			var linkWasClicked;


			if(event.target.nextElementSibling){ // if no sibling, at least take away dropdowns
				
				var elem = event.target.nextElementSibling;

				var dropDown;

				for(var key in DOMstrings.dropdowns){
					if(elem.id === DOMstrings.dropdowns[key]){ // the list of id with dropdown-content
						dropDown = true;
						break; // posible?
					}
				}

				if(dropDown){

					toggleDrop(elem);
					
					dropDownsContent.forEach((el)=>{
					
						if(elem.id !== el.id) el.style.display = "none";

					});

				}else{
					removeDrop();
					// console.log("Has next sibling, but no dropdown content");
					linkWasClicked = true;
				}

			}else{
				removeDrop();
				// console.log("No next sibling");
				linkWasClicked = true;
			}

			if(linkWasClicked){
				whichButtonWasClickedAndWhatToDo(event.target);
			}
		}

		function toggleDrop(elem){

			!elem.style.display ? elem.style.display = "none":null;
			elem.style.display === "none" ? elem.style.display = "block":elem.style.display = "none";

		}

		function removeDrop(){
			dropDownsContent.forEach((el)=>{ // only dropdown-content
				el.style.display = "none";
			});
		}

		function toggleSections(clicked, other){

			if(document.getElementById(clicked).style.display === "block"){
				actionOne = "none";
				actionTwo = "block";
			}else{
				actionOne = "block";
				actionTwo = "none";

			}	
			document.getElementById(clicked).style.display = actionOne;
			document.getElementById(other).style.display = actionTwo;

		}

		function whichButtonWasClickedAndWhatToDo(buttonInformation){

			// console.log(buttonInformation.textContent);

			switch(buttonInformation.textContent){
				case "Home":
					console.log("HomeButton");
					toggleSections("mainwindow", "loginsection"); // too hardcoded
					break;
				case "Link 1":
					console.log("FirstDropDownFirstButton");
					break;
				case "ULink 1":
					console.log("SecondDropDownFirstButton");
					break;
				case "1 Ink":
					console.log("ThirdDropDownFirstButton");
					break;
				case "Login":
					console.log("Login Page getting ready");
					toggleSections("loginsection", "mainwindow"); // too hardcoded
					break;
				default:
					console.log("Button undefined");
			}


		}

		return { //accesible from the outside
			DOM: DOMstrings
		}
}); // not an IIFE yet


window.onload = function (){
	navBarHandling(); // Now it's an IIFE
}