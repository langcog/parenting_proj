// ############################## Helper functions ##############################

// Shows slides. We're using jQuery here - the **$** is the jQuery selector function, which takes as input either a DOM element or a CSS selector string.
function showSlide(id) {
  // Hide all slides
	$(".slide").hide();
	// Show just the slide we want to show
	$("#"+id).show();
}

// ############################## Configuration settings ##############################


//####     Attitudes scale ######

var slides = ['reading1','reading2','reading3','target1','target2','target3','target4','vitamins1','vitamins2']


for (i = 0; i < slides.length; i++) {
	trial = {
		slide: slides[i]
		trial_number: i+1
	}

	trials.push(trial);
}


// Show the instructions slide -- this is what we want subjects to see first.
showSlide("instructions");



// ############################## The main event ##############################
var experiment = {
    
    // The object to be submitted.
    data: {
    rating: [],
	ladder: [],
	age: [],
	gender: [],
	education: [],
	homelang: [],
	ethnicity:[],
	race: [],
	children:[],
	childAgeYoung:[],
	childAgeOld:[],
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

Array of radio buttons
		var radio = document.getElementsByName("recall");
		
		 Loop through radio buttons
		for (i = 0; i < radio.length; i++) {
		    if (radio[i].checked) {
			experiment.data.rating.push(radio[i].value);
			response_logged = true;		    
		    }
		}
		
		
		if (response_logged) {
		   nextButton_Att.blur();
		    
		     uncheck radio buttons
		    for (i = 0; i < radio.length; i++) {
			radio[i].checked = false
		    }
		    experiment.next();
		} else {
		    $("#testMessage_att").html('<font color="red">' + 
					   'Please make a response!' + 
					   '</font>');
		}
	    },

    
    // The work horse of the sequence - what to do on every trial.
    next: function() {

	// Allow experiment to start if it's a turk worker OR if it's a test run
	if (window.self == window.top | turk.workerId.length > 0) {
	    
	    
	    // Get the current trial - <code>shift()</code> removes the first element
	    // select from our scales array and stop exp after we've exhausted all the domains
	    var trial_info = trials.shift();
	    
	    //If the current trial is undefined, call the end function.

	    if (typeof trial_info == "undefined") {
			return experiment.debriefing();
	    }
	
	    // check which trial type you're in and display correct slide
	    if (trial_info.slide == "reading1") {
	    	// $("#reading").html(trial_info.reading1);  //add sentence to html 
	    	 showSlide("reading1");              //display slide
	    } 
	      if (trial_info.slide == "reading2") {
	    	// $("#reading").html(trial_info.reading1);  //add sentence to html 
	    	 showSlide("reading2");              //display slide
	    } 
	      if (trial_info.slide == "reading3") {
	    	// $("#reading").html(trial_info.reading1);  //add sentence to html 
	    	 showSlide("reading3");              //display slide
	    } 
	      if (trial_info.slide == "target1") {
	    	// $("#reading").html(trial_info.reading1);  //add sentence to html 
	    	 showSlide("target1");              //display slide
	    } 
	      if (trial_info.slide == "target2") {
	    	// $("#reading").html(trial_info.reading1);  //add sentence to html 
	    	 showSlide("target2");              //display slide
	    } 
	      if (trial_info.slide == "target3") {
	    	// $("#reading").html(trial_info.reading1);  //add sentence to html 
	    	 showSlide("target3");              //display slide
	    } 
	      if (trial_info.slide == "target4") {
	    	// $("#reading").html(trial_info.reading1);  //add sentence to html 
	    	 showSlide("target4");              //display slide
	    } 
	      if (trial_info.slide == "vitamins1") {
	    	// $("#reading").html(trial_info.reading1);  //add sentence to html 
	    	 showSlide("vitamins1");              //display slide
	    } 
	       if (trial_info.slide == "vitamins2") {
	    	// $("#reading").html(trial_info.reading1);  //add sentence to html 
	    	 showSlide("vitamins2");              //display slide
	    } 
	}
    },

    //	go to debriefing slide
    debriefing: function() {
	showSlide("debriefing");
    },

    // submitcomments function
    submit_comments: function() {

    	var races = document.getElementsByName("race");
	
	// Loop through race buttons
	for (i = 0; i < races.length; i++) {
	    if (races[i].checked) {
		experiment.data.race.push(races[i].value);	    
	    }
	}
    experiment.data.ladder.push(document.getElementById("ladder").value);
    experiment.data.age.push(document.getElementById("age").value);
    experiment.data.gender.push(document.getElementById("gender").value);
    experiment.data.education.push(document.getElementById("education").value);
	experiment.data.homelang.push(document.getElementById("homelang").value);
	experiment.data.ethnicity.push(document.getElementById("ethnicity").value);
	experiment.data.children.push(document.getElementById("children").value);
	experiment.data.childAgeYoung.push(document.getElementById("youngestAge").value);
	experiment.data.childAgeOld.push(document.getElementById("oldestAge").value);
	experiment.data.expt_aim.push(document.getElementById("expthoughts").value);
	experiment.data.expt_gen.push(document.getElementById("expcomments").value);
	experiment.end();
    }
}

