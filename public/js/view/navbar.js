// IIFE - Imediately Invoked Function Expression - Ready
var navbarHandling = (()=>{


		var DOMstrings = {
			sections: {
				home: "home",
				login: "login",
				registration: "registration",
				useraccount: "useraccount",
				firstact: "firstActivity",
				waAPI: "webAudioAPI_container",
				feedback: "feedback",
				piano: "piano"
			},
			sectionsstyle: {
				home: "block",
				login: "block",
				registration: "block",
				useraccount: "grid",
				firstact: "grid",
				waAPI: "grid",
				feedback: "block",
				piano: "block"
			},
			loginform: {
				username: "usernameLogin",
				password: "passwordLogin",
				feed: "feedLogin",
				loginButton: "sendLoginID",
				gotoRegButton: "goToRegistration"
			},
			regform: {
				username: "usernameRegistration",
				email: "emailRegistration",
				password: "passwordRegistration",
				regButton: "registerNewUser",
				feed: "feedRegistration"
			},
			feeds: {
				feedOne: "feedbackOne",
				feedTwo: "feedbackTwo",
				feedThree: "feedbackThree"
			},
			linkIDs: {
				logInOut: "log",
				account: "account"
			}


		}

		var dropDownsContent = [];

		// USING EVENT BUBBLING and EVENT TARGETING = EVENT DELEGATION - Learned from Jonas
		var navDOM = document.querySelector("header");
		navDOM.addEventListener('change', checkboxHandling); // for input-checkbox
		navDOM.addEventListener('click', linkHandling); // for link-clicks

		var subBurger = document.querySelectorAll(".dropdown-toggle");
		var mainBurger = document.querySelector(".nav-toggle");


		// Feedback-toggler - DEVELOPMENT USE ONLY
		document.getElementById("feedback-toggle").addEventListener("click", toggleFeedback);

		// var mainDOM = document.querySelector("#mainsection");
		// mainDOM.addEventListener('click', removeDrop);

		// for(var key in DOMstrings.dropdowns){
		// 	dropDownsContent.push(document.getElementById(DOMstrings.dropdowns[key])); // push each dropdown-content-object in an array
		// }

		function checkboxHandling(event){


			// Turn of other menus when a menu is clicked
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

				var clickedLink = event.target.innerHTML.toLowerCase();

				console.log(clickedLink);
				

				// Turn of menus when a link is clicked
				subBurger.forEach((el)=>{
					el.checked = false;
				});

				// Make sure that mainBurger is turned of after clicking a link
				mainBurger.checked = false;

				// Give focus to a section
				whichLinkWasClickedAndWhatToDo(clickedLink);

			}

		}

		// Reusable??
		function toggleFeedback(evt){
			// console.log(evt);

			var feedbackElement = document.getElementById(DOMstrings.sections.feedback);

			if(!feedbackElement.style.display) feedbackElement.style.display = "none"; // oneliner
			feedbackElement.style.display === "none" ? feedbackElement.style.display = "block" : feedbackElement.style.display = "none";

		}


		function focusSection(clicked){
			// put all the element-object in an array and run through it, turn off all except the chosen one
			
			// run through the DOMstrings.sections-objects and .style.display = "none";
			// console.log(DOMstrings.sections);
			for(const property in DOMstrings.sections){
				// console.log(property);
				document.getElementById(DOMstrings.sections[property]).style.display = "none";
			}
			// display the clicked section
			document.getElementById(DOMstrings.sections[clicked]).style.display = DOMstrings.sectionsstyle[clicked];
		}

		function whichLinkWasClickedAndWhatToDo(link){

			// console.log("Focus on:" + link);

			switch(link){
				case DOMstrings.sections.home:
					// console.log(link);
					focusSection(DOMstrings.sections.home); // too hardcoded ??
					// turn of keyboard
					instrument.keysOn = false;
					break;
				case DOMstrings.sections.piano:
					// activate pianokeyboard - switch on
					instrument.keysOn = true;
					// handle current focus - show piano - visually
					focusSection(DOMstrings.sections.piano);
					break;
				case "ULink 1".toLowerCase():
					console.log(link);
					break;
				case "1 Ink".toLowerCase():
					console.log("I can't believe it: "+link);
					break;

				case "konto":
					// console.log(link);
				case DOMstrings.sections.login:
					// console.log(link);
					focusSection(DOMstrings.sections.login); // too hardcoded ??
					break;
				case main.loggedInUD.username.toLowerCase():
					// console.log("Yes, it worked!");
					focusSection(DOMstrings.sections.useraccount);
					break;
				case "logout":
					// console.log(link);
					logout.logout();
					break;
				default:
					console.log("Button undefined");
			}


		}

		return { //accesible from the outside
			DOM: DOMstrings,
			focusSection: focusSection
		}

})();