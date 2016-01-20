// ############################ Helper functions ##############################

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

// ######################## Configuration settings ############################

//set up attitudes items.


var atts = ['It is very important that children learn to respect adults, such as parents and teachers.',
'It is important for young children to learn to control their impulses (e.g., waiting when told to wait).',
'Children should be taught to be grateful to their parents.',
'Children should not be punished for breaking small rules.',
'Parents should follow their children’s lead rather than imposing structure in the form of rules.',
'Young children should be allowed to make their own decisions, such as what to eat for dinner.',
'Parents need to provide safe and loving environments for their children.',
'Holding and cradling babies is important for forming strong bonds between parent and child.',
'Children should be given comfort and understanding when they are scared or unhappy.',
'Parents do not need to talk to their child about his or her emotions.',
'Children become spoiled if they receive too much attention from parents.',
'Too much affection can make a child weak.',
'Children can learn about things like good and bad behavior from a very early age.',
'Young children can teach themselves things by exploring and playing.',
'Babies’ repetitive behaviors (e.g. banging a cup on the table) are a way for them to explore cause and effect.',
'It is not helpful for adults to explain the reasons for rules to young children because they won’t understand.',
'Children don’t need to learn about numbers and math until they go to school.',
'Reading books to children is not helpful if they have not yet learned to speak.']; 

atts = shuffle(atts); 

var slides = ['reading0','reading1','reading2','reading3','target1','target2','target3','target4',
'vitamins1','vitamins2'];

var totalTrialsAtt = atts.length;
var totalTrialsUptake = slides.length;

var numTrialsExperiment = totalTrialsAtt + totalTrialsUptake;


//set up uptake experiment slides.

var trials = [];


for (i = 0; i < totalTrialsAtt; i++) {
	trial = {
		sentence: atts[i],
		trial_number_block: i +1,
		trial_type: "attitudes",
		slide: "",
		trial_number: i+1,
	}

	trials.push(trial);
}

for (i = 0; i < slides.length; i++) {

	 trial = {
		sentence: "",
		trial_number_block: "",
		trial_type:"uptake",
		slide: slides[i],
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
		rating: [],
		trial_number_block: [],
    	trial_type: [],
		sentence: [],
		answer: [],
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
		reading_ease_target: [],
		reading_ease_vitamins: [],
		enjoy_target: [],
		enjoy_vitamins: [],
		targetrt: [],
		vitaminsrt: []
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

		// Array of radio buttons
		var radio = document.getElementsByName("recall");

		//  Loop through radio buttons
		for (i = 0; i < radio.length; i++) {
			if (radio[i].checked) {
				experiment.data.answer.push(radio[i].value);
				response_logged = true;
			}
		}


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
			nextButton_r1.blur();
			nextButton_r2.blur();
			nextButton_r3.blur();
			nextButton_r4.blur();
			nextButton_v1.blur();
			nextButton_v2.blur();

			//  uncheck radio buttons
			for (i = 0; i < radio.length; i++) {
				radio[i].checked = false
			}
			experiment.next();
		} else {
			$("#testMessage_att").html('<font color="red">' + 
			'Please make a response!' + 
			 '</font>');
			$("#testMessage_r1").html('<font color="red">' +
			'Please make a response!' +
			'</font>');
			$("#testMessage_r2").html('<font color="red">' +
			'Please make a response!' +
			'</font>');
			$("#testMessage_r3").html('<font color="red">' +
			'Please make a response!' +
			'</font>');
			$("#testMessage_r4").html('<font color="red">' +
			'Please make a response!' +
			'</font>');
			$("#testMessage_v1").html('<font color="red">' +
			'Please make a response!' +
			'</font>');
			$("#testMessage_v2").html('<font color="red">' +
			'Please make a response!' +
			'</font>');
		}
	},

	getrtinstruct:function(){
			starttime = Date.now();
	},
	getrttar:function(){
			endtarget = Date.now();
			experiment.data.targetrt = (endtarget-starttime)/1000;
	},
	getrtvit:function(){
			endvitamins = Date.now();
			experiment.data.vitaminsrt = (endvitamins-endtarget)/1000;
	},

	// The work horse of the sequence - what to do on every trial.
	next: function() {

		// Allow experiment to start if it's a turk worker OR if it's a test run
		if (window.self == window.top | turk.workerId.length > 0) {
		$("#testMessage_att").html(''); //clear test message
		$("#testMessage_r1").html(''); 
		$("#testMessage_r2").html(''); 
		$("#testMessage_r3").html(''); 
		$("#testMessage_r4").html(''); 
		$("#testMessage_v1").html(''); 
		$("#testMessage_v2").html(''); 

		$("#progress").attr("style","width:" +
			    String(100 * (1 - (trials.length)/numTrialsExperiment)) + "%")
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
	    	 showSlide("attitudes_slide"); 
	    	 }
			if (trial_info.slide == "reading1") {
				showSlide("reading1");              //display slide
			}
			if (trial_info.slide == "reading2") {
				showSlide("reading2");              //display slide
			}
			if (trial_info.slide == "reading3") {
				showSlide("reading3");              //display slide
			}
			if (trial_info.slide == "target1") {
				showSlide("target1");              //display slide
			}
			if (trial_info.slide == "target2") {
				showSlide("target2");              //display slide
			}
			if (trial_info.slide == "target3") {
				showSlide("target3");              //display slide
			}
			if (trial_info.slide == "target4") {
				showSlide("target4");              //display slide
			}
			if (trial_info.slide == "vitamins1") {
				showSlide("vitamins1");              //display slide
			}
			if (trial_info.slide == "vitamins2") {
				showSlide("vitamins2");              //display slide
			}

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
		experiment.data.reading_ease_target.push(document.getElementById("reading_ease_target").value);
		experiment.data.reading_ease_vitamins.push(document.getElementById("reading_ease_vitamins").value);
		experiment.data.enjoy_target.push(document.getElementById("enjoy_target").value);
		experiment.data.enjoy_vitamins.push(document.getElementById("enjoy_vitamins").value);
		experiment.end();
	}
}
