console.log("Connected");

// IIFE - ready
var main = (function () {

    var measure = new Measure(2); // (resolutionPerBeat, beatsPerMeasure, numOfInstruments) => standard is (1, 4, 4)

    // console.log(measure.measureArr);

    // player => beatbox
    // player2 => webAudioAPI

    var activeTools = {
      player: false,
      player2: false
    }

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
    		
        login.chLogLink("Logout");
    		login.chAccToName(username);
    		
        // use localStorage to fill loggedInUserData
        loggedInUserData.username = localStorage.getItem("username");
        loggedInUserData.email = localStorage.getItem("email");
    		loggedInUserData.loggedIn = true;

        // How do you compare localStorage and document.cookie?

        // pop-up
        // setTimeout(alert("Welcome again, again " + username),1000);

        // visual
        document.getElementById("useraccountUsername").value = loggedInUserData.username;
        document.getElementById("useraccountEmail").value = loggedInUserData.email;
    	}
    }

    return { // accessible from the outside
        loggedInUD : loggedInUserData,
        cookieCheck: checkCookie,
        measure: measure,
        actTools: activeTools
    }

})(login);

window.onload = function(){
	main.cookieCheck(); // user - maintainance
  player.canHandling(); // this can be activated when I want to use beatbox
}