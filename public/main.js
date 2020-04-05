console.log("Connected!");


var navBarHandling = (function(){

var DOMstrings = {
	dropOneContent: "dropOne-content",
	dropTwoContent: "dropTwo-content",
	dropThreeContent: "dropThree-content"
}

var dropDownsContent = [];

// USING EVENT BUBBLING and EVENT TARGETING = EVENT DELEGATION
var navDOM = document.querySelector(".navbar");
navDOM.addEventListener('click', dropDownHandling);

var mainDOM = document.querySelector("#mainwindow");
mainDOM.addEventListener('click', removeDrop);

for(var key in DOMstrings){
	dropDownsContent.push(document.getElementById(DOMstrings[key]));
}

function dropDownHandling(event){

	if(event.target.nextElementSibling){ // if no sibling, at least take away dropdowns
		
		var elem = event.target.nextElementSibling;

		var dropDown;

		for(var key in DOMstrings){
			if(elem.id === DOMstrings[key]){ // the list of id with dropdown-content
				dropDown = true;
				break; // posible?
			}
		}

		if(dropDown){

			toggleDrop(elem);
			
			dropDownsContent.forEach((el)=>{
			
				if(elem.id !== el.id) el.style.display = "none";

			});

		}else{
			removeDrop();
			console.log("Has next sibling, but no dropdown content");
		}

	}else{
		removeDrop();
		console.log("No next sibling");
	}

	console.log(event.target);
}

function toggleDrop(elem){

	!elem.style.display ? elem.style.display = "none":null;
	
	elem.style.display === "none" ? elem.style.display = "block":elem.style.display = "none";

}

function removeDrop(){
	dropDownsContent.forEach((el)=>{ // only dropdown-content
		el.style.display = "none";
	});
}

		return {
			DOM: DOMstrings,
		}
})();








// var controller = (function(){ // IIFE

// 	var x = 23;

// 	var add = function(a){
// 		return a + x;
// 	}

// 	return {
// 		publicTest: function (b){
// 			console.log(add(b));
// 		} 
// 	}


// })();

// var UImodule = (function(){

// })();

// var DATAmodule = (function(){

// })();