document.querySelector("#registerNewUser").addEventListener('click', registerNewUser);
// or this
document.getElementById("goToRegistration").addEventListener('click', prepareNewUserScreen);

function prepareNewUserScreen(evt){
	document.getElementById("loginsection").style.display = "none";
	document.getElementById("registrationsection").style.display = "block";
}



function registerNewUser() {
	console.log("button clicked");

	var userData = {
		username:document.getElementById("usernameRegistration").value,
		password: document.getElementById("passwordRegistration").value
	}

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    
	    var element = document.getElementById("usernameRegistration");
	    
	    if (this.readyState == 4 && this.status == 200) {
	    	// Condition
	    	if(this.responseText === "User already exits"){
	    		element.style.background = "red";
	    		element.focus();
	    	}else{
	    		element.style.background = "white";
	      	}
	      	
	      	// always do this
	    	document.getElementById("demo").innerHTML = this.responseText;

	    }
	};
	xhttp.open("POST", "/reg", true);
	xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
	xhttp.send(JSON.stringify(userData));
}