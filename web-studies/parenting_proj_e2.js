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


var atts = ['Although a lot about babies and adults is different, they still learn in basically the same way.',
'Children learn best when adults always reward them for correct answers or behaviors.',
'Babies learn by noticing patterns around them (e.g., mom always looks for her phone after the ringing noise).',
'Babies are born as a blank slate and their personalities are formed through their experiences.',
'Children of different ages learn in very different ways. For example, preschoolers learn differently from babies and toddlers.',
'Newborn babies can see and hear and have some simple physical reflexes (e.g., blinking and sucking), but have almost no other knowledge.',
'Babies learn mostly from their own senses (e.g., touch, smell, taste) and physical exploration of the world.',
'Children’s development happens in stages; at first they learn about simple things they can see, and then later on they learn about abstract things, such as numbers.',
'Babies learn by looking for things that feel and taste good (e.g., by putting things in their mouths).',
'The most important thing for young children to learn is to control their impulses (e.g., waiting when told to wait).',
'If young children do not learn to control their behavior, they will not be able to learn or socialize normally later on.',
'Children learn best from examples: if they are shown why an idea is right, or why a behavior is good, they can learn without rewards or punishments.',
'Children can learn about abstract concepts like good behavior from an early age.',
'Children learn the most when adults talk to them about something they are already interested in.',
'Children can learn a lot just by playing, especially when they are allowed to choose what to play with.',
'Adults should have strict rules about what children can and cannot do.',
'It is important for children to learn to respect adults, such as parents and teachers.',
'The best way to encourage children to behave well is to punish them when they misbehave.',
'Parents should always explain the reasons for their rules to children.',
'When planning family activities, parents should think about what their child likes to do.',
'Children learn the most when they are allowed to play unsupervised by adults.',
'It is best not to have many rules for children, so that they can establish independence.',
'The primary role of parents is to act as supportive friends to their children.',
'A strong bond with mom is important if a baby is going to have good relationships in the future.',
'It’s more important for parents to provide a safe and loving environment than to make strict rules.',
'Children who have behavior problems often don’t get enough love at home.',
'Holding, cradling, and sleeping together with babies is important for forming strong bonds with parents.']; 
atts = shuffle(atts); 

var totalTrialsAtt = atts.length;

// ###### End Attitudes Scale ########


//####     Knowledge scale ######


var knows = ['Using baby-talk (i.e. talking in a sing-song voice) helps babies learn how to talk.',
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
'2-year-olds should do their best to listen quietly when you read to them.',
'Children can learn from looking at books by themselves before they know how to read.',
'Saying numbers and counting are the only ways you can help toddlers get ready to learn math in school.',
'Toddlers need to learn how to count before they can understand math.',
'Talking about the difference between tall and short teaches toddlers about math.',
'It’s best for children to wait until they are old enough for school to learn about math.',
'Children are learning about math when they learn the names of different shapes (like triangles and squares).',
'Talking to children cannot make them smarter.',
'How many words 3-year-olds know can predict how well they might do in kindergarten.',
'Children should be told what to do instead of given choices.',
'How many words 3-year-olds know cannot predict how many new words they will learn during their lifetime.',
'Talking to 3-year-olds can help them do better in school.',
'It’s the school’s responsibility to make sure children learn how to read and do math.',
'Watching educational TV is good for children of all ages.',
'The more television children under 2 watch by themselves the more words they learn.']; 
knows = shuffle(knows); 

var totalTrialsKnow = knows.length;

// Build trials array
var numTrialsExperiment = totalTrialsKnow + totalTrialsAtt
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

trials.push(trial = {sentence: "", 
	trial_number_block: 0,
	trial_type: "2afc_instructions"});

// add knowledge question trials after
for (i = 0; i < totalTrialsKnow; i++) {
	trial = {
		sentence: knows[i],
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
	homelang: [],
	ladder: [],
	children:[],
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
			    String(100 * (1 - (trials.length-1)/numTrialsExperiment)) + "%")

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
	    } else if (trial_info.trial_type == "2afc_instructions") {
	    	showSlide("two_choice_slide");
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
    experiment.data.ladder.push(document.getElementById("ladder").value);
	experiment.data.homelang.push(document.getElementById("homelang").value);
	experiment.data.children.push($("input[name=children]:checked").val());
	experiment.data.expt_aim.push(document.getElementById("expthoughts").value);
	experiment.data.expt_gen.push(document.getElementById("expcomments").value);
	experiment.end();
    }
}

