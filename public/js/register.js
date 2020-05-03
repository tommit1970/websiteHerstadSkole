document.querySelector("#registerNewUser").addEventListener('click', registerNewUser);
// or this
document.getElementById("goToRegistration").addEventListener('click', prepareNewUserScreen);

function prepareNewUserScreen(evt){
	document.getElementById("login").style.display = "none";
	document.getElementById("registration").style.display = "block";
}



function registerNewUser() {
	console.log("Reg button clicked");

	var userData = {
		username:document.getElementById("usernameRegistration").value,
		password: document.getElementById("passwordRegistration").value
	}

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    
	    var element = document.getElementById("usernameRegistration");
	    
	    if (this.readyState == 4 && this.status == 200) {

	    	var responseObj = JSON.parse(this.responseText);

	    	// Condition
	    	if(responseObj.msg === "User already exits"){

	    		// visual feedback in document
	    		element.style.background = "red";
	    		element.focus();
	    		document.getElementById("feedRegistration").textContent = responseObj.msg;

	    		// output in console
	    		console.log(this.responseText);

	    	}else{
	    		// output - console + document
	    		console.log(this.responseText);
	    		document.getElementById("feedbackOne").textContent = responseObj.msg;
	    		document.getElementById("feedRegistration").textContent = responseObj.msg; // inside registration div

	    		// cleaning
	    		element.style.background = "white";

	    		// wait a little bit and get ready for more action
	    		setTimeout(()=>{
	    			clearRegistration();
	    			navbarHandling.focusSection("home");
	    			document.getElementById("feedRegistration").textContent = ""; // inside registration div
	    		}, 2500);

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