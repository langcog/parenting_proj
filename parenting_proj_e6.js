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
'Children should be taught to be grateful to their parents.',
'Parents should not have strict rules about what children can and cannot do.',
'Children should not be punished for breaking small rules.',
'Parents should not worry if their toddler misbehaves a lot.',
'Parents should follow their children’s lead rather than imposing structure in the form of rules.',
'Rules and structure don’t prevent children from having tantrums.',
'Young children should be allowed to make their own decisions, such as what to eat for dinner.',
'It’s important for babies and mothers to have strong bonds.',
'Parents need to provide safe and loving environments for their children.',
'Holding and cradling babies is important for forming strong bonds between parent and child.',
'Parents should encourage young children to talk about their opinions.',
'Children should be given comfort and understanding when they are scared or unhappy.',
'Parents do not need to talk to their child about his or her feelings.',
'There’s no reason to talk with children about their feelings before they are mature enough to understand.',
'Children become spoiled if they receive too much attention from parents.',
'Too much affection can harm or weaken a child.',
'Children will not learn how to control their emotions if parents always comfort them when upset.',
'Children learn best when adults give them examples (e.g., examples of good behavior).',
'Children can learn about things like good and bad behavior from a very early age.',
'Children learn the most when adults talk to them about something they are already interested in.',
'Children learn the most when they can choose how to play instead of being told how to play.',
'Babies start to learn about the world (e.g., their toy ball is heavier than their cup) even before they learn to talk.',
'Young children can teach themselves things by exploring and playing.',
'Babies learn about things that tend to happen together (e.g., mom always looks for her phone when it rings).',
'Babies’ repetitive behaviors (e.g. banging a cup on the table) are a way for them to explore cause and effect.',
'It’s important to play pretend with children.',
'The best toys for kids are the simplest ones, like blocks or crayons.',
'It is not helpful for adults to explain the reasons for rules to young children because they won’t understand.',
'Children don’t need to learn about numbers and math until they go to school.',
'Children don’t learn as much from other children as they do from watching adults.',
'Playing with friends is good for children’s social skills but does not help children learn anything.',
'It’s more important to take care of babies’ basic needs than it is to expose them to new experiences.',
'Children should not begin learning to read until they start school.',
'Playing nonsense games with children can teach them bad habits.',
'Parents should limit the amount of time their child plays freely with toys.',
'Parents should choose the toys children play with, regardless of the child’s preferences.',
'Reading books to children is not helpful if they have not yet learned to speak.']; 
atts = shuffle(atts); 

var totalTrialsAtt = atts.length;

var numTrialsExperiment = totalTrialsAtt
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
	    
	    // uncheck radio buttons
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
	    
	    $("#testMessage_att").html(''); 	// clear the test message

		// $("#testMessage_kno").html(''); 
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

