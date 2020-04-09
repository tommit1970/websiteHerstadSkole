// this belongs to navbar-system, not feedback
document.getElementById("feedback-toggle").addEventListener("click", toggleElement);


function toggleElement(evt){
	console.log(evt);

	var currentElementID = evt.toElement.id.split("-")[0]+"section"; // assuming that all main parts of the html are called somethingsection

	var currentElement = document.getElementById(currentElementID);

	!currentElement.style.display ? currentElement.style.display = "none":null; // This logic is based on: currentElement.style.display does not exist and therefore should be invisible
	currentElement.style.display === "none" ? currentElement.style.display = "block" : currentElement.style.display = "none";

}