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
	    	document.getElementById("demo").innerHTML = this.responseText;
	    	
	    	
	    }
	};
	xhttp.open("POST", "/login", true);
	xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
	xhttp.send(JSON.stringify(userData));

}