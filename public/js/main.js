console.log("Connected");

// Data about logged in user
var loggedInUserData = {
	username: "",
	password: "",
	loggedIn: false
}


function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


function checkCookie() {
	var username = getCookie("username");
	if(username != ""){
      	loggedInUserData.username = username;
		loggedInUserData.loggedIn = true;
		changeLogLinkTo("Logout");
		changeAccountToName(username);
		setTimeout(alert("Welcome again, again " + username),1000);
	}
}


window.onload = function(){
	checkCookie();
}