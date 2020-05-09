console.log("Connected");

// Data about logged in user
var loggedInUserData = {
	username: "",
  email: "",
	password: "",
	loggedIn: false
}


function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  // console.log(decodedCookie);
  var ca = decodedCookie.split(';');
  // console.log(ca);
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    // console.log(ca[i]);
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
      console.log(c);
    }
    if (c.indexOf(name) == 0) {
      console.log(c.substring(name.length, c.length));
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


function checkCookie() {
	var username = getCookie("username");

	if(username != ""){
		
    changeLogLinkTo("Logout");
		changeAccountToName(username);
		
    // use localStorage to fill loggedInUserData
    loggedInUserData.username = localStorage.getItem("username");
    loggedInUserData.email = localStorage.getItem("email");
		loggedInUserData.loggedIn = true;

    // pop-up
    setTimeout(alert("Welcome again, again " + username),1000);

    // visual
    document.getElementById("useraccountUsername").value = loggedInUserData.username;
    document.getElementById("useraccountEmail").value = loggedInUserData.email;
	}
}


window.onload = function(){
	checkCookie();
}