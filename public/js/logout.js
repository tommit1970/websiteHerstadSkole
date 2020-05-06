function logout(){
	// logout to login
	changeLogLinkTo("Login");

	// remove account posibility
	changeAccountToName("Konto");


	// cookies remove
	setCookie("username", loggedInUserData.username, 0); // expires now, see login.js

	// clear loggedInUserData
	loggedInUserData.username = "";
	loggedInUserData.loggedIn = false;


	// Focus on home
	navbarHandling.focusSection(navbarHandling.DOM.sections.home);
}