// IIFE - Imediately Invoked Function Expression

var navbarHandling = (function(){

		var DOMstrings = {
			dropdowns:{
				dropOneContent: "dropOne-content",
				dropTwoContent: "dropTwo-content",
				dropThreeContent: "dropThree-content",
				dropFourContent: "dropFour-content"
			},
			windows: {
				mainsection: "mainsection",
				loginsection: "loginsection",
				registrationsection: "registrationsection"
			}
		}

		var dropDownsContent = [];

		// USING EVENT BUBBLING and EVENT TARGETING = EVENT DELEGATION - Learned from Jonas
		var navDOM = document.querySelector(".navbar");
		navDOM.addEventListener('click', dropDownHandling);

		var mainDOM = document.querySelector("#mainsection");
		mainDOM.addEventListener('click', removeDrop);

		for(var key in DOMstrings.dropdowns){
			dropDownsContent.push(document.getElementById(DOMstrings.dropdowns[key])); // push each dropdown-content-object in an array
		}



		function dropDownHandling(event){

			var linkWasClicked;


			if(event.target.nextElementSibling){ // if no sibling, at least take away dropdowns
				
				var elem = event.target.nextElementSibling;

				var dropDown;

				for(var key in DOMstrings.dropdowns){
					if(elem.id === DOMstrings.dropdowns[key]){ // compare id of clicked element to the list of id with dropdown-content
						dropDown = true;
					}
				}

				if(dropDown){ // if dropdown is clicked

					toggleDrop(elem);
					
					dropDownsContent.forEach((el)=>{
					
						if(elem.id !== el.id) el.style.display = "none"; // hide dropdown-content that is not clicked lastly

					});

				}else{ // link was clicked
					removeDrop();
					// console.log("Has next sibling, but no dropdown content");
					linkWasClicked = true; 
				}

			}else{ // no sibling
				removeDrop();
				// console.log("No next sibling");
				linkWasClicked = true;
			}

			if(linkWasClicked){
				whichButtonWasClickedAndWhatToDo(event.target); // pass on target-link
			}
		}

		function toggleDrop(elem){

			!elem.style.display ? elem.style.display = "none":null;
			elem.style.display === "none" ? elem.style.display = "block":elem.style.display = "none";

		}

		function removeDrop(){
			dropDownsContent.forEach((el)=>{ // hide all dropdown-content
				el.style.display = "none";
			});
		}

		function focusSection(clicked){

			if(clicked === "mainsection"){ // pretty hardcoded
				document.getElementById(clicked).style.display = "block";
				document.getElementById("registrationsection").style.display = "none";
				document.getElementById("loginsection").style.display = "none";
			}else if(clicked === "loginsection"){
				document.getElementById(clicked).style.display = "block";
				document.getElementById("registrationsection").style.display = "none";
				document.getElementById("mainsection").style.display = "none";
			}

		}

		function whichButtonWasClickedAndWhatToDo(buttonInformation){

			// console.log(buttonInformation.textContent);

			
			//When some button in menu is clicked remove
			document.getElementById("nav-toggle").checked = false;
			// console.log("Action button clicked");



			switch(buttonInformation.textContent){
				case "Home":
					console.log("HomeButton");
					focusSection("mainsection"); // too hardcoded ??
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
					focusSection("loginsection"); // too hardcoded ??
					break;
				default:
					console.log("Button undefined");
			}


		}

		return { //accesible from the outside
			DOM: DOMstrings,
			focusSection: focusSection
		}
})(); // not an IIFE yet


window.onload = function (){

}