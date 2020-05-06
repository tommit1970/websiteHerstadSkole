document.getElementById(navbarHandling.DOM.regform.regButton).addEventListener('click', registerNewUser);

function registerNewUser() {
	// console.log("Reg button clicked");

	var userData = {
		username:document.getElementById(navbarHandling.DOM.regform.username).value,
		password: document.getElementById(navbarHandling.DOM.regform.password).value
	}

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    
	    var element = document.getElementById(navbarHandling.DOM.regform.username);
	    
	    if (this.readyState == 4 && this.status == 200) {

	    	var responseObj = JSON.parse(this.responseText);

	    	// Condition
	    	if(responseObj.msg === "User already exits"){

	    		// visual feedback in document
	    		element.style.background = "#666";
	    		element.focus();
	    		document.getElementById(navbarHandling.DOM.regform.feed).textContent = responseObj.msg;

	    		// output in console
	    		console.log(this.responseText);

	    	}else{
	    		// output - console + document
	    		console.log(this.responseText);
	    		document.getElementById(navbarHandling.DOM.feeds.feedOne).textContent = responseObj.msg; // feedbackOne at the bottom - developer
	    		document.getElementById(navbarHandling.DOM.regform.feed).textContent = responseObj.msg; // inside registration div

	    		// cleaning
	    		element.style.background = "white";

	    		// wait a little bit and get ready for more action
	    		setTimeout(()=>{
	    			clearRegistration();
	    			navbarHandling.focusSection("home");
	    			document.getElementById(navbarHandling.DOM.regform.feed).textContent = ""; // inside registration div
	    		}, 1000);

	      	}
	      	
	      	// always do this

	    }
	};
	xhttp.open("POST", "/reg", true);
	xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
	xhttp.send(JSON.stringify(userData));
}

function clearRegistration(){
	document.getElementById(navbarHandling.DOM.regform.username).value = "";
	document.getElementById(navbarHandling.DOM.regform.password).value = "";
}