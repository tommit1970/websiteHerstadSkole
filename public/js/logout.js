function logout(){
	// logout to login
	changeLogLinkTo("Login");

	// remove account posibility
	changeAccountToName("Konto");

	// cookies remove
	setCookie("username", loggedInUserData.username, 0); // expires now, see login.js - erase cookie

	// clear loggedInUserData
	loggedInUserData.username = "";
	loggedInUserData.email = "";
	loggedInUserData.loggedIn = false;

    // clear localStorage
    localStorage.removeItem("username");
    localStorage.removeItem("email");


	// Focus on home
	navbarHandling.focusSection(navbarHandling.DOM.sections.home);
}