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


//####     Attitudes scale ######


var atts = ['It is very important that children learn to respect adults, such as parents and teachers.',
'It is very important for young children to do as they are told, for example, waiting when they are told to wait.',
'Children should be grateful to their parents.',
'It is very important that there are consequences when a child breaks a rule, big or small.',
'It is okay if young children boss around their caregivers.',
'It is okay if children see adults as equals rather than viewing them with respect.',
'Young children should be allowed to make their own decisions, like what to play with and when to eat.',
'Parents do not need to worry if their child misbehaves a lot.',
'Children should be comforted when they are scared or unhappy.',
'It’s important for parents to help children learn to deal with their emotions.',
'Parents should pay attention to what their child likes and dislikes.',
'A child who has close bonds with his or her parents will have better relationships later on in life.',
'Children who receive too much attention from their parents become spoiled.',
'Too much affection, such as hugging and kissing, can make a child weak.',
'Children and parents do not need to feel emotionally close as long as children are kept safe.',
'Parents should not try to calm a child who is upset, it is better to let children calm themselves.',
'It is good to let children explore and experiment.',
'Parents can help babies learn language by talking to them.',
'Parents can prepare young children to succeed in school by teaching them things, such as shapes and numbers.',
'Babies can learn a lot just by playing.',
'It is not helpful to explain the reasons for rules to young children because they won’t understand.',
'Children don’t need to learn about numbers and math until they go to school.',
'Reading books to children is not helpful if they have not yet learned to speak.',
'Babies can’t learn about the world until they learn to speak.']; 

atts = shuffle(atts); 

var priorities = ['respects and follows the rules of society.',
'stays out of trouble.',
'forges their own path.',
'is creative and innovative.',
'is professionally successful.',
'is curious and knowledgeable about the world.',
'is kind and generous to others.',
'gives back to their community.',
'fits in with peers and colleagues.',
'is not overly reliant on family support.'];

priorities = shuffle(priorities); 


var totalTrialsAtt = atts.length;
var totalTrialsPriorities = priorities.length;
var numTrialsExperiment = totalTrialsAtt + totalTrialsPriorities + 2;

var trials = [];


// first build attitudes question trials


trials.push(trial = {sentence: "", 
	trial_number_block: 0,
	trial_type: "attitudes_instruct"});

for (i = 0; i < totalTrialsAtt; i++) {
	trial = {
		sentence: atts[i],
		trial_number_block: i +1,
		trial_type: "attitudes",
		trial_number: i+1,
	}

	trials.push(trial);
}

trials.push(trial = {sentence: "", 
	trial_number_block: 0,
	trial_type: "priorities_instruct"});


for (i = 0; i < priorities.length; i++) {

	 trial = {
		sentence: priorities[i],
		trial_number_block: "",
		trial_type:"priorities",
		trial_number: i+1,
	}

	trials.push(trial);
}


// Show the instructions slide -- this is what we want subjects to see first.
showSlide("instructions");


// ############################## The main event ##############################
var experiment = {
    
    // The object to be submitted.
    data: {
    trial_number_block: [],
    trial_type: [],
	sentence: [],
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
	   nextButton_Att.blur();
	   nextButton_Pri.blur();
	    
	    // uncheck radio buttons
	    for (i = 0; i < radio.length; i++) {
		radio[i].checked = false
	    }
	    experiment.next();
	} else {
	    $("#testMessage_att").html('<font color="red">' + 
				   'Please make a response!' + 
				   '</font>');
	    $("#testMessage_pri").html('<font color="red">' + 
				   'Please make a response!' + 
				   '</font>');
	}
    },

    
    // The work horse of the sequence - what to do on every trial.
    next: function() {

	// Allow experiment to start if it's a turk worker OR if it's a test run
	if (window.self == window.top | turk.workerId.length > 0) {
	    
	    $("#testMessage_att").html(''); 	// clear the test message
		$("#testMessage_pri").html(''); 	// clear the test message 
		$("#progress").attr("style","width:" +
			    String(100 * (1 - (trials.length)/numTrialsExperiment)) + "%")

 //style="width:progressTotal%"
	    
	    // Get the current trial - <code>shift()</code> removes the first element
	    // select from our scales array and stop exp after we've exhausted all the domains
	    var trial_info = trials.shift();
	    
	    //If the current trial is undefined, call the end function.

	    if (typeof trial_info == "undefined") {
			return experiment.debriefing();
	    }
	

	    // check which trial type you're in and display correct slide
	    if (trial_info.trial_type == "attitudes_instruct") {
	    	$("#attitudes").html(trial_info.sentence);  //add sentence to html 
	    	 showSlide("attitudes_instruct");              //display slide
	    } 
	    if (trial_info.trial_type == "attitudes") {
	    	$("#attitudes").html(trial_info.sentence);  //add sentence to html 
	    	 showSlide("attitudes_slide");              //display slide
	    } 
	    if (trial_info.trial_type == "priorities_instruct") {
				showSlide("priorities_instruct");
		}		
		if (trial_info.trial_type == "priorities") {
				$("#priorities").html(trial_info.sentence); 
				showSlide("priorities_slide");		
	    }

	    // log the sentence for each trial
		experiment.data.sentence.push(trial_info.sentence);
		experiment.data.trial_type.push(trial_info.trial_type)
		experiment.data.trial_number_block.push(trial_info.trial_number_block)
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

