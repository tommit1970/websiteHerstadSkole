HerstadMusikk2020

TRELLO
Remember to use Trello.com

[]][][][][][][][][][][][][][][]
	Working on now:
	- MinKonto/Navn => logo replacement
	- Logo system - upload images 16x16px(save in db)
	- logo in right corner in mobile mode - userimage
[]][][][][][][][][][][][][][][]
	
*********************************************************
	Things I'll do:
	- Expand the registration info (email(unique), username(unique), password, grade, logo(choose between two(owner, user))
	- Expand login system - make it safer
	- Sidebar
	- focusSection - improve system so it is more versatile
*********************************************************


Files and Folders:			FRONTEND		BACKEND
-----------------------------------------------------------------------------
	node-mudules/ 							x
		express - installed (body-parser included)
		ejs - installed (embeded javascript <%= %> <% %>)
		jsSHA - encryption
		mongoose - db
-----------------------------------------------------------------------------
	public/ 				x
		js/
			main.js 
			navbar.js - navbarHandling - IIFE - return {DOM, focus}
			login.js
			register.js
			feedbacks.js - empty
		css/
			main.css
			navbar.css
			login.css
			register.css
			feedbacks.css
-----------------------------------------------------------------------------
	db_stuff/								x
		mongodb.js
		user.js
-----------------------------------------------------------------------------
	encryption/								x
		encrypt.js
-----------------------------------------------------------------------------
	routes/									x
		routes.js
-----------------------------------------------------------------------------
	views/ 					x
		index.ejs
-----------------------------------------------------------------------------
	app.js 									x
-----------------------------------------------------------------------------
	package-lock.json 						x
-----------------------------------------------------------------------------
	readme.txt 				x				x
	README.md 				x 				x



Frontend development
	Navbar and Navigation

	AJAX
		Registration
		Login

	Canvas

Backend development
	Registration
	Login
	MongoDB


*********************************************************
		Things I've done: (newest change/improvement on top)
*********************************************************
	-
	-
	- loggedInUserData - document.cookie - first version, simple - setCookie, getCookie, checkCookie
	- logout - change login to logout and back again
	- reg and log - improve css - responsiveness
	- System for all the html element sections in navbar.js (navbarHandling.DOM.section) - One place to store all of the element ids, so that changes is done in one place only
	- Responsiveness (mobile vs. desktop/laptop)
	- Grid display system, basic
	- Button to toggle feedback info
