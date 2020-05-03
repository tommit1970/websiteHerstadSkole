// AJAX code - Connecting to server routes


document.querySelector("#sendLoginID").addEventListener('click', loginUser);


function loginUser() {

	var userData = {
		username: document.getElementById("usernameLogin").value,
		password: document.getElementById("passwordLogin").value
	}

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    
	    var usernameLogin = document.getElementById("usernameLogin");

	    if (this.readyState == 4 && this.status == 200) {

	    	var responseObj = JSON.parse(this.responseText);

	    	if(responseObj.msg === "Full match!"){

	    		// output - console + document
	    		console.log(this.responseText);
	    		document.getElementById("feedbackOne").textContent = responseObj.msg;
	    		document.getElementById("feedLogin").textContent = responseObj.msg; // inside registration div

	    		// cleaning
	    		usernameLogin.style.background = "white";

	    		// wait a little bit and get ready for more action
	    		setTimeout(()=>{
	    			// more cleaning
	    			clearRegistration();
	    			document.getElementById("feedLogin").textContent = ""; // inside registration div
	    			navbarHandling.focusSection(navbarHandling.DOM.sections.home);
	    		}, 2500);

	    	}else{
	    		document.getElementById("feedLogin").textContent = responseObj.msg;
	    		usernameLogin.focus();
	    		usernameLogin.style.background = "red";

	    	}
	    	
	    	
	    }
	};
	xhttp.open("POST", "/login", true);
	xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
	xhttp.send(JSON.stringify(userData));

}

function clearLogin(){
	document.getElementById("usernameLogin").value = "";
	document.getElementById("passwordLogin").value = "";

}