HerstadMusikk2020

TRELLO
Remember to use Trello.com

[]][][][][][][][][][][][][][][]
	Working on now:
	- musiclab meets beatbox
	- firstactivity => play/stop-button - back/forth-button - tempo-pluss/minus-button
	- firstactivity => rythmbank - record and put in folder
	- firstactivity => calculate hit points for 'r'-button, now they're hardcoded 
[]][][][][][][][][][][][][][][]
	
*********************************************************
	Things I'll do:
	- Logo system - upload images 16x16px(save in db) - choose an avatar icon for your account
	- MinKonto/Navn => logo replacement
	- logo in right corner in mobile mode - userimage
	- Expand the registration info (email(unique), username(unique), password, grade, logo(choose between two(owner, user))
	- Expand login system - make it safer
	- Sidebar
	- focusSection - improve system so it is more versatile
	- iframe musiclab
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
			useraccount.css
							FRONTEND		BACKEND
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
-----------------------------------------------------------------------------
							FRONTEND		BACKEND


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
	- firstactivity => working on timer(bpm) vs graphics bar (four beats per bar)
	- firstactivity => startTime, pressTime, pauseTimeStart, pauseTimeEnd, pauseTimeCollected(important to collect all paused time), endTime
	- firstactivity => graphical display area
	- firstactivity => rows with sounds from rythminstruments
	- when you register, login as well
	- make mailaddress apear in account email-input-field
	- loggedInUserData - document.cookie - first version, simple - setCookie, getCookie, checkCookie
	- logout - change login to logout and back again
	- reg and log - improve css - responsiveness
	- System for all the html element sections in navbar.js (navbarHandling.DOM.section) - One place to store all of the element ids, so that changes is done in one place only
	- Responsiveness (mobile vs. desktop/laptop)
	- Grid display system, basic
	- Button to toggle feedback info
