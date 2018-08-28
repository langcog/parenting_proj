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
'The best way to encourage children to behave well is to punish them when they misbehave.',
'It is important for children to learn to not interrupt their parents.',
'It is important for young children to learn to control their impulses (e.g., waiting when told to wait).',
'If young children do not learn to control their behavior, they will have trouble learning and making friends later on.',
'The most important role for parents is to provide structure for their children in the form of rules.',
'Parents should not have strict rules about what children can and cannot do.',
'Children should not be punished for breaking small rules.',
'It’s important for a baby to have a strong bond with mom.',
'It’s important for parents to provide a safe and loving environment for their child.',
'Holding and cradling babies is important for forming strong bonds with parents.',
'If a child does not enjoy an activity, the parent should not force the child to do it.',
'Children who have behavior problems often don’t get enough love at home.',
'Parents should encourage young children to talk about their opinions.',
'Parents do not need to talk to their child about the child’s feelings.',
'Children become spoiled if they receive too much affection from parents.',
'Children learn best when adults give them examples (e.g., examples of good behavior).',
'Children can learn about things like good and bad behavior from an early age.',
'Children learn the most when adults talk to them about something they are already interested in.',
'Children can learn a lot just by playing.',
'Children learn the most when they can choose how to play instead of being told how to play.',
'Babies start to learn about the world (e.g., their toy ball is heavier than their cup) even before they learn to talk.',
'It is not helpful for adults to explain the reasons for rules to children.',
'Children cannot learn if parents don’t reward them when they are right.',
]; 
atts = shuffle(atts); 

var totalTrialsAtt = atts.length;


var know = ['Using baby-talk (i.e. talking in a sing-song voice) helps babies learn how to talk.',
'Children learn fewer words when adults talk with a warm tone.',
'Babies should be able to see your face when you talk to them.',
'By the age of 3, children answer questions just as quickly as adults.',
'Parents should not talk back when their toddlers use ‘baby-talk’ (like when they say “ba-ba” instead of “teddy bear”).',
'Pointing to things is one way that babies learn how to talk.',
'Adults cannot have conversations with babies who can’t talk yet.',
'Children learn fewer words when they don’t pay attention to what you’re saying.',
'Parents need to know a lot of big words to teach children how to talk.',
'You cannot teach children anything new by reading them the same book over and over.',
'Parents who have trouble reading can help their children learn how to read books.',
'Some books should be kept where babies can reach them.',
'When reading with toddlers, you should always read all of the words on one page before moving on to the next page.',
'2-year-olds should do their best to listen quietly when you read to them.',
'Children can learn from looking at books by themselves before they know how to read.',
'Saying numbers and counting are the only ways you can help toddlers get ready to learn math in school.',
'Toddlers need to learn how to count before they can understand math.',
'Talking about the difference between tall and short teaches toddlers about math.',
'It’s best for children to wait until they are old enough for school to learn about math.',
'Children are learning about math when they learn the names of different shapes (like triangles and squares).',
'Children who know fewer words when they start school will probably do worse in third grade than their classmates who know more words.',
'Talking to children cannot make them smarter.',
'How many words 3-year-olds know can predict how well they might do in kindergarten.',
'Children should be told what to do instead of given choices.',
'How many words 3-year-olds know cannot predict how many new words they will learn during their lifetime.',
'Talking to 3-year-olds can help them do better in school.',
'It’s the school’s responsibility to make sure children learn how to read and do math.',
'Watching educational TV is good for children of all ages.',
'Having conversations with adults while watching television can help 3-year-olds learn new words.',
'The more television children under 2 watch by themselves the more words they learn.'
]; 
know = shuffle(know); 

var totalTrialsKnow = know.length;

var numTrialsExperiment = totalTrialsAtt + totalTrialsKnow;
var trials = [];

// first build attitudes question trials
for (i = 0; i < totalTrialsAtt; i++) {
	trial = {
		sentence: atts[i],
		trial_number_block: i +1,
		trial_type: "attitudes"
	}

	trials.push(trial);
}

// add knowledge question trials after
for (i = 0; i < totalTrialsKnow; i++) {
	trial = {
		sentence: know[i],
		trial_number_block: i +1,
		trial_type: "knowledge"
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


	for (i = 0; i < radio.length; i++) {
	    if (radio[i].checked) {
		experiment.data.rating.push(radio[i].value);
		response_logged = true;		    
	    }
	}
	
	
	if (response_logged) {
	   nextButton_Att.blur();
	   nextButton_Kno.blur();
	    
	    // uncheck radio buttons
	    for (i = 0; i < radio.length; i++) {
		radio[i].checked = false
	    }
	    experiment.next();
	} else {
	    $("#testMessage_att").html('<font color="red">' + 
				   'Please make a response!' + 
				   '</font>');
	    $("#testMessage_kno").html('<font color="red">' + 
				   'Please make a response!' + 
				   '</font>');
	}
    },

    
    // The work horse of the sequence - what to do on every trial.
    next: function() {

	// Allow experiment to start if it's a turk worker OR if it's a test run
	if (window.self == window.top | turk.workerId.length > 0) {
	    
	    $("#testMessage_att").html(''); 	// clear the test message

		$("#testMessage_kno").html(''); 
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
	    if (trial_info.trial_type == "attitudes") {
	    	$("#attitudes").html(trial_info.sentence);  //add sentence to html 
	    	 showSlide("attitudes_slide");              //display slide
	    } else {
			$("#knowledge").html(trial_info.sentence);
	    	showSlide("knowledge_slide");
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

