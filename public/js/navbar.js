// IIFE - Imediately Invoked Function Expression


		var DOMstrings = {
			// dropdowns:{
			// 	dropOneContent: "dropOne-content",
			// 	dropTwoContent: "dropTwo-content",
			// 	dropThreeContent: "dropThree-content",
			// 	dropFourContent: "dropFour-content"
			// },
			// windows: {
			// 	mainsection: "mainsection",
			// 	loginsection: "loginsection",
			// 	registrationsection: "registrationsection"
			// }
		}

		var dropDownsContent = [];

		// USING EVENT BUBBLING and EVENT TARGETING = EVENT DELEGATION - Learned from Jonas
		var navDOM = document.querySelector("header");
		navDOM.addEventListener('change', checkboxHandling);
		navDOM.addEventListener('click', linkHandling);

		var subBurger = document.querySelectorAll(".dropdown-toggle");
		var mainBurger = document.querySelector(".nav-toggle");


		// var mainDOM = document.querySelector("#mainsection");
		// mainDOM.addEventListener('click', removeDrop);

		// for(var key in DOMstrings.dropdowns){
		// 	dropDownsContent.push(document.getElementById(DOMstrings.dropdowns[key])); // push each dropdown-content-object in an array
		// }

		function checkboxHandling(event){

			// whick el.id is the same as event.target.id
			subBurger.forEach((el)=>{

				if(el.id !== event.target.id){
					el.checked = false;
				}
				// console.log(el.checked);
			});
		}

		function linkHandling(event){

			if(event.target.localName === "a"){
				// console.log("A link");
				console.log(event.target.innerHTML);
				subBurger.forEach((el)=>{
					el.checked = false;
				});
				mainBurger.checked = false;
			}

		}



		function focusSection(clicked){

			// if(clicked === "mainsection"){ // pretty hardcoded
			// 	document.getElementById(clicked).style.display = "block";
			// 	document.getElementById("registrationsection").style.display = "none";
			// 	document.getElementById("loginsection").style.display = "none";
			// }else if(clicked === "loginsection"){
			// 	document.getElementById(clicked).style.display = "block";
			// 	document.getElementById("registrationsection").style.display = "none";
			// 	document.getElementById("mainsection").style.display = "none";
			// }

		}

		function whichButtonWasClickedAndWhatToDo(buttonInformation){

			// console.log(buttonInformation.textContent);

			
			//When some button in menu is clicked remove
			// document.getElementById("nav-toggle").checked = false;
			// console.log("Action button clicked");



			// switch(buttonInformation.textContent){
			// 	case "Home":
			// 		console.log("HomeButton");
			// 		focusSection("mainsection"); // too hardcoded ??
			// 		break;
			// 	case "Link 1":
			// 		console.log("FirstDropDownFirstButton");
			// 		break;
			// 	case "ULink 1":
			// 		console.log("SecondDropDownFirstButton");
			// 		break;
			// 	case "1 Ink":
			// 		console.log("ThirdDropDownFirstButton");
			// 		break;
			// 	case "Login":
			// 		console.log("Login Page getting ready");
			// 		focusSection("loginsection"); // too hardcoded ??
			// 		break;
			// 	default:
			// 		console.log("Button undefined");
			// }


		}

		// return { //accesible from the outside
		// 	DOM: DOMstrings,
		// 	focusSection: focusSection
		// }

var navbarHandling = (function(){
})();

