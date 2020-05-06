document.getElementById(navbarHandling.DOM.loginform.gotoRegButton).addEventListener('click', prepareNewUserScreen);

function prepareNewUserScreen(evt){
	document.getElementById(navbarHandling.DOM.sections.login).style.display = "none";
	document.getElementById(navbarHandling.DOM.sections.registration).style.display = "block";
}


document.getElementById(navbarHandling.DOM.loginform.loginButton).addEventListener('click', loginUser);


// AJAX code - Connecting to server routes
function loginUser() {

	var usernameLogin = document.getElementById(navbarHandling.DOM.loginform.username);



	var userData = {
		username: usernameLogin.value,
		password: document.getElementById(navbarHandling.DOM.loginform.password).value
	}


	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {

	    
	    if (this.readyState == 4 && this.status == 200) {
			

	    	var responseObj = JSON.parse(this.responseText);

	    	var loginFeed = document.getElementById(navbarHandling.DOM.loginform.feed);

	    	if(responseObj.msg === "Full match!"){

	    		// output - console + document
	    		console.log(this.responseText);
	    		document.getElementById(navbarHandling.DOM.feeds.feedOne).textContent = responseObj.msg;
	    		loginFeed.textContent = responseObj.msg; // inside registration div

	    		// cleaning
	    		usernameLogin.style.background = "white";
	    		
	    		// User Visual
	    		changeAccountToName(userData.username);

	    		// wait a little bit and get ready for more action
	    		setTimeout(()=>{
	    			// more cleaning
	    			clearLogin();
	    			loginFeed.textContent = ""; // inside registration div
	    			navbarHandling.focusSection(navbarHandling.DOM.sections.home);
	    			// change login to logout
	    			changeLogLinkTo("Logout");
	    			setCookie("username",userData.username, 2);
	    			loggedInUserData.username = userData.username;
	    			loggedInUserData.loggedIn = true;
	    		}, 1000);

	    	}else{
	    		loginFeed.textContent = responseObj.msg;
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
	document.getElementById(navbarHandling.DOM.loginform.username).value = "";
	document.getElementById(navbarHandling.DOM.loginform.password).value = "";

}

function changeLogLinkTo(logwhat){
	document.getElementById(navbarHandling.DOM.linkIDs.logInOut).textContent = logwhat;
}

function changeAccountToName(account){
	document.getElementById(navbarHandling.DOM.linkIDs.account).textContent = account;
}


function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}



