// ############################## Helper functions ##############################

// Shows slides. We're using jQuery here - the **$** is the jQuery selector function, which takes as input either a DOM element or a CSS selector string.
function showSlide(id) {
  // Hide all slides
  $(".slide").hide();
	// Show just the slide we want to show
	$("#"+id).show();
}

// Get random integers.
// When called with no arguments, it returns either 0 or 1. When called with one argument, *a*, it returns a number in {*0, 1, ..., a-1*}. When called with two arguments, *a* and *b*, returns a random value in {*a*, *a + 1*, ... , *b*}.
function random(a,b) {
	if (typeof b == "undefined") {
		a = a || 2;
		return Math.floor(Math.random()*a);
	} else {
		return Math.floor(Math.random()*(b-a+1)) + a;
	}
}

// Add a random selection function to all arrays (e.g., <code>[4,8,7].random()</code> could return 4, 8, or 7). This is useful for condition randomization.
Array.prototype.random = function() {
	return this[random(this.length)];
}

// shuffle function - from stackoverflow?
// shuffle ordering of argument array -- are we missing a parenthesis?
function shuffle (a) 
{ 
	var o = [];

	for (var i=0; i < a.length; i++) {
		o[i] = a[i];
	}

	for (var j, x, i = o.length;
		i;
		j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);	
		return o;
}


// ############################## Configuration settings ##############################
var questions = ["Children should always respect their parents.",
"Children learn by doing, not by watching."];

// make the trial order
questions = shuffle(questions);

totalTrials = questions.length;

// Show the instructions slide -- this is what we want subjects to see first.
showSlide("instructions");

// ############################## The main event ##############################
var experiment = {

    // The object to be submitted.
    data: {	
    	questions: [],
    	rating: [],
    	language: [],
    	expt_aim: [],
    	expt_gen: [],
    },
    
    // end the experiment
    end: function() {
    	showSlide("finished");
    	setTimeout(function() {
    		turk.submit(experiment.data)
    	}, 1500);
    },

    // LOG RESPONSE
    log_response: function() {
    	var response_logged = false;

		//Array of radio buttons
		var radio = document.getElementsByName("judgment");

		// Loop through radio buttons
		for (i = 0; i < radio.length; i++) {
			if (radio[i].checked) {
				experiment.data.rating.push(radio[i].value);
				response_logged = true;		    
			}
		}		

		if (response_logged) {
			nextButton.blur();

	    // uncheck radio buttons
	    for (i = 0; i < radio.length; i++) {
	    	radio[i].checked = false
	    }
	    experiment.next();
	} else {
		$("#testMessage").html('<font color="red">' + 
			'Please make a response!' + 
			'</font>');
		}
	},

    // The work horse of the sequence - what to do on every trial.
    next: function() {
	// Allow experiment to start if it's a turk worker OR if it's a test run
	if (window.self == window.top | turk.workerId.length > 0) {

	    $("#testMessage").html(''); 	// clear the test message
	    $("#prog").attr("style","width:" +
	    	String(100 * (1 - questions.length/totalTrials)) + "%")		

	    // Get the current trial - <code>shift()</code> removes the first element
	    //Randomly select from our scales array and stop exp after we've exhausted all the domains
	    var question = questions.shift();
	    
	    //If the current trial is undefined, call the end function.
	    if (typeof question == "undefined") {
	    	return experiment.debriefing();
	    }
	    
	    // Display the sentence stimuli
	    $("#question").html(question);	   
	    	   	    
	    // push all relevant variables into data object	    
	    experiment.data.questions.push(question);
	    
	    showSlide("stage");
	}
},

    //	go to debriefing slide
    debriefing: function() {
    	showSlide("debriefing");
    },

    // submitcomments function
    submit_comments: function() {
    	experiment.data.language.push(document.getElementById("homelang").value);
    	experiment.data.expt_aim.push(document.getElementById("expthoughts").value);
    	experiment.data.expt_gen.push(document.getElementById("expcomments").value);
    	experiment.end();
    }
}

