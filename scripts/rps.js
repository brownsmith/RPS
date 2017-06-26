// create namespace
RPS = {};

// initial function
RPS.init = function(){

	// set up our default players
	var defaults = {
		rpsPlayer1: null,
		rpsPlayer2: null		
	};

	// hide the play game again button
	var playGameAgainBtn = document.getElementById('playGameAgainBtn');
	RPS.addClass(playGameAgainBtn, 'hidden');

	// empty out any previous data attributes for player 1
	var player1Selection = document.getElementById('player1Selection');
	player1Selection.removeAttribute('data-selection');

	// empty out any previous data attributes for player 2
	var player2Selection = document.getElementById('player2Selection');
	player2Selection.removeAttribute('data-selection');
	
	// capture the choice of player via the 'Choose this player' button
	document.getElementById('player1choose').addEventListener('click', function(e) {
		// create new player object and pass in their id and role
		defaults.rpsPlayer1 = new RPS.player('player1', document.getElementById('player1select').value);
		// only enable click event once
		e.target.removeEventListener(e.type, arguments.callee);
	});

	// capture the choice of player via the 'Choose this player' button
	document.getElementById('player2choose').addEventListener('click', function(e) {
		// create new player object and pass in their id and role
		defaults.rpsPlayer2 = new RPS.player('player2', document.getElementById('player2select').value);
		// only enable click event once
		e.target.removeEventListener(e.type, arguments.callee);
	});
	
	// play game button
	var playGameBtn = document.getElementById('playGame');

	playGameBtn.addEventListener('click', function(e) {
		// check to see if both players have made a selection - 
		// perhaps we could also put a warning here if one is yet to select and the button is clicked?
		if (defaults.rpsPlayer1 !== null && defaults.rpsPlayer2 !== null) {
			// pass the player objects to decideWinner, to find out who is victorious
			RPS.decideWinner(defaults.rpsPlayer1, defaults.rpsPlayer2);
		}
	});
	
};

RPS.player = function(id, role) {

	// for scope
	var that = this;

	// create array of options available
	var rpsOptions = ['rock', 'paper', 'scissors'];

	// player id - player1 or player2
	that.id = id;

	// role - human or computer
	that.role = role;

	// option - will be populated with their choice of rock, paper or scissors
	that.option = null;

	// this is the element that the players selection is rendered in
	var myElem = document.getElementById(that.id + 'Selection');

	// set up the Human so they can select their item
	if (that.role === 'human') {

		// create the item select
		var selectElem = document.createElement('select');
		// create the select item button
		var selectItem = document.createElement('button');
		// find the element to append these to using the player id
		var appendElem = document.getElementById(that.id);
		// give the button a unique id based upon the player id
		selectItem.id = 'selectItem' + that.id;
		// put 'Choose this option' text into button
		selectItem.innerHTML = 'Choose this option';

		// for each item in the rock, paper, scissors array - there could be more than 3...
		for (var item in rpsOptions) {
			//create option element
			var childElem = document.createElement('option');
			// populate option value
			childElem.value = rpsOptions[item];
			// text
			childElem.innerHTML = rpsOptions[item];
			// append to select element
			selectElem.appendChild(childElem);
		}	
		// append select element to player section		
		appendElem.appendChild(selectElem);
		// append button to player section
		appendElem.appendChild(selectItem);
		// set unique id to select element 
		selectElem.id = 'selectRPS' + that.id;
		// click event listener
		selectItem.addEventListener('click', function() {
			// get selected option
			that.option = selectElem.value;
			// create data attribute for option - this will be used to style the selected option
			myElem.setAttribute('data-selection', that.option);
		});

	}
	// if computer selected
	if (that.role === 'computer') {
		// randomise the array items
		var random = rpsOptions[Math.floor(Math.random() * rpsOptions.length)];
		// set the option to the result
		that.option = random;
		// set the data attribute on the selection element for styling purposes
		myElem.setAttribute('data-selection', that.option);
	}

};

RPS.decideWinner = function(player1, player2) {

	// pass in player1 and player2 options and decide the winner depending on selections
	switch (player1.option + " | " + player2.option) {				
		case 'rock | scissors':
			RPS.showResult(player1);
			break;
		case 'paper | rock':
			RPS.showResult(player1);
			break;
		case 'scissors | paper':
			RPS.showResult(player1);
			break;
		case 'rock | paper':
			RPS.showResult(player2);
			break;
		case 'paper | scissors':
			RPS.showResult(player2);
			break;
		case 'scissors | rock':
			RPS.showResult(player2);
			break;
	}
	// unless its a draw...
	if (player1.option === player2.option) {
		RPS.showResult('draw');
	}

};

RPS.showResult = function(winner){

	var resultText = document.getElementById('showWinner');
	RPS.removeClass(resultText, 'hidden');

	// get the element that we're displaying the result in
	var showWinnerElem = document.getElementById('showWinner');

	// if the contest has been declared a draw
	if (winner === 'draw') {
		// write this in the element
		showWinnerElem.innerHTML = 'its a draw!';
	} else {
		// alternatively, create a string for the winner and their choice and populate element
		showWinnerElem.innerHTML = winner.id + ' is the winner using ' + winner.option + '!';
	}

	// play game again button
	var playGameAgainBtn = document.getElementById('playGameAgainBtn');

	// remove hidden class
	RPS.removeClass(playGameAgainBtn, 'hidden');

	// add event listener to play again button
	playGameAgainBtn.addEventListener('click', function() {
		// hide the result text
		RPS.addClass(resultText, 'hidden');
		// create new game
		setupGame = new RPS.init();
	});

};

// if class is present
RPS.hasClass = function(el,cls) {
	return el.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
};

// add class, pass in element and class value to add
RPS.addClass = function(el,cls) {
	if (!RPS.hasClass(el,cls)) el.className += " "+cls;
};

// remove class, pass in element and class value to remove
RPS.removeClass = function(el,cls) {
	if (RPS.hasClass(el,cls)) {
		var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		el.className=el.className.replace(reg,' ');
	}
};

window.onload = function(){

	// execute new RPS object
	setupGame = new RPS.init();
	
};
