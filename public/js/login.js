// AJAX code - Connecting to server routes


document.querySelector("#sendLoginID").addEventListener('click', loginUser);


function loginUser() {

	var userData = {
		username: document.getElementById("usernameLogin").value,
		password: document.getElementById("passwordLogin").value
	}

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    
	    if (this.readyState == 4 && this.status == 200) {

	    	if(this.responseText === "Full match!"){
	    		navbarHandling.focusSection("mainwindow");
	    		clearLogin();
	    		document.getElementById("feedbackOne").textContent = this.responseText;
	    		document.getElementById("feedLogin").textContent = "";
	    	}else{
	    		document.getElementById("feedLogin").textContent = this.responseText;
	    		var unLogin = document.getElementById("usernameLogin");
	    		unLogin.focus();
	    		unLogin.style.background = "red";

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