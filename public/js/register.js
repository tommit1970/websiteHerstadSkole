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
	    		document.getElementById("feedRegistration").textContent = this.responseText;
	    	}else{
	    		element.style.background = "white";
	    		navbarHandling.focusSection("mainwindow");
	    		console.log(this.responseText);
	    		clearRegistration();
	    		document.getElementById("feedbackOne").textContent = this.responseText;
	    		document.getElementById("feedRegistration").textContent = "";

	      	}
	      	
	      	// always do this

	    }
	};
	xhttp.open("POST", "/reg", true);
	xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
	xhttp.send(JSON.stringify(userData));
}

function clearRegistration(){
	document.getElementById("usernameRegistration").value = "";
	document.getElementById("passwordRegistration").value = "";
}