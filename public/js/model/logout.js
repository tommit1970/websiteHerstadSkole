// IIFE - 
var logout = (()=>{

		function logout(){
			// logout to login
			login.chLogLink("Login");

			// remove account posibility
			login.chAccToName("Konto");

			// cookies remove
			login.cookieSet("username", main.loggedInUD.username, 0); // expires now, see login.js - erase cookie

			// clear loggedInUserData
			main.loggedInUD.username = "";
			main.loggedInUD.email = "";
			main.loggedInUD.loggedIn = false;

		    // clear localStorage
		    localStorage.removeItem("username");
		    localStorage.removeItem("email");


			// Focus on home
			navbarHandling.focusSection(navbarHandling.DOM.sections.home);
		}

		return { // accessible from the outside
			logout : logout

		}

})();