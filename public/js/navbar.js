// IIFE - Imediately Invoked Function Expression
var navbarHandling = (function(){


		var DOMstrings = {
			sections: {
				home: "home",
				login: "login",
				registration: "registration",
				useraccount: "useraccount",
				feedback: "feedback"
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
			console.log(evt);

			var feedbackElement = document.getElementById(DOMstrings.sections.feedback);

			if(!feedbackElement.style.display) feedbackElement.style.display = "none"; // oneliner
			feedbackElement.style.display === "none" ? feedbackElement.style.display = "block" : feedbackElement.style.display = "none";

		}


		function focusSection(clicked){

			if(clicked === DOMstrings.sections.home){ // pretty hardcoded
				document.getElementById(clicked).style.display = "block";
				document.getElementById(DOMstrings.sections.registration).style.display = "none";
				document.getElementById(DOMstrings.sections.login).style.display = "none";
				document.getElementById(DOMstrings.sections.useraccount).style.display = "none";
			}else if(clicked === DOMstrings.sections.login){
				document.getElementById(clicked).style.display = "block";
				document.getElementById(DOMstrings.sections.registration).style.display = "none";
				document.getElementById(DOMstrings.sections.home).style.display = "none";
				document.getElementById(DOMstrings.sections.useraccount).style.display = "none";
				document.getElementById(DOMstrings.loginform.username).focus();
			}else if(clicked === DOMstrings.sections.useraccount){
				document.getElementById(clicked).style.display = "grid";
				document.getElementById(DOMstrings.sections.home).style.display = "none";
				document.getElementById(DOMstrings.sections.login).style.display = "none";
				document.getElementById(DOMstrings.sections.registration).style.display = "none";
			}

		}

		function whichLinkWasClickedAndWhatToDo(link){

			// console.log(link);

			
			//When some button in menu is clicked remove
			// document.getElementById("nav-toggle").checked = false;
			// console.log("Action button clicked");


			console.log("Focus on:" + link);

			switch(link){
				case DOMstrings.sections.home:
					console.log(link);
					focusSection(DOMstrings.sections.home); // too hardcoded ??
					break;
				case "Link 1":
					console.log(link);
					break;
				case "ULink 1":
					console.log(link);
					break;
				case "1 Ink":
					console.log(link);
					break;

				case "konto":
					// console.log(link);
				case DOMstrings.sections.login:
					console.log(link);
					focusSection(DOMstrings.sections.login); // too hardcoded ??
					break;
				case loggedInUserData.username.toLowerCase():
					console.log("Yes, it worked!");
					focusSection(DOMstrings.sections.useraccount);
					break;
				case "logout":
					console.log(link);
					logout();
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