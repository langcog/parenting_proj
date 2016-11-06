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

var slides = ['reading_instructions','reading1','reading2','reading3','recall_instructions', 
'target1_1','target1_2','target1_3','target1_4','target1_5','target1_6',
'target2_1','target2_2','target2_3','target2_4','target2_5','target2_6',
'target3_1','target3_2','target3_3','target3_4','target3_5','target3_6'
];

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
		childAge:[],
		prior_exposure: [],
		questionnaire_rt: [],
		target1_rt: [],
		target2_rt: [],
		target3_rt: [],
	},


	starttime:function(){
			starttime = Date.now();
	},
	starttarget1:function(){
			starttarget1 = Date.now();
			experiment.data.questionnaire_rt = (starttarget1-starttime)/1000;
	},
	starttarget2:function(){
			starttarget2 = Date.now();
			experiment.data.questionnaire_rt = (starttarget2-starttime)/1000;
	},
	starttarget3:function(){
			starttarget3 = Date.now();
			experiment.data.questionnaire_rt = (starttarget3-starttime)/1000;
	},
	getrttarget1:function(){
			endtarget1 = Date.now();
			experiment.data.target1_rt = (endtarget1-starttarget1)/1000;
	},
	getrttarget2:function(){
			endtarget2 = Date.now();
			experiment.data.target2_rt = (endtarget2-starttarget2)/1000;
	},
	getrttarget3:function(){
			endtarget3 = Date.now();
			experiment.data.target3_rt = (endtarget3-starttarget3)/1000;
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

		if (response_logged) {
			nextButton_r1.blur();
			nextButton_r2.blur();
			nextButton_r3.blur();
			nextButton_r4.blur();
			nextButton_r5.blur();
			nextButton_r6.blur();
			nextButton_r7.blur();
			nextButton_r8.blur();
			nextButton_r9.blur();
			nextButton_r10.blur();
			nextButton_r11.blur();
			nextButton_r12.blur();
			nextButton_r13.blur();
			nextButton_r14.blur();
			nextButton_r15.blur();
			nextButton_r16.blur();
			nextButton_r17.blur();
			nextButton_r18.blur();


			//  uncheck radio buttons
			for (i = 0; i < radio.length; i++) {
				radio[i].checked = false
			}

			experiment.next();

		} else {
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
			$("#testMessage_r5").html('<font color="red">' +
			'Please make a response!' +
			'</font>');
			$("#testMessage_r6").html('<font color="red">' +
			'Please make a response!' +
			'</font>');
			$("#testMessage_r7").html('<font color="red">' +
			'Please make a response!' +
			'</font>');
			$("#testMessage_r8").html('<font color="red">' +
			'Please make a response!' +
			'</font>');
			$("#testMessage_r9").html('<font color="red">' +
			'Please make a response!' +
			'</font>');
			$("#testMessage_r10").html('<font color="red">' +
			'Please make a response!' +
			'</font>');
			$("#testMessage_r11").html('<font color="red">' +
			'Please make a response!' +
			'</font>');
			$("#testMessage_r12").html('<font color="red">' +
			'Please make a response!' +
			'</font>');
			$("#testMessage_r13").html('<font color="red">' +
			'Please make a response!' +
			'</font>');
			$("#testMessage_r14").html('<font color="red">' +
			'Please make a response!' +
			'</font>');
			$("#testMessage_r15").html('<font color="red">' +
			'Please make a response!' +
			'</font>');
			$("#testMessage_r16").html('<font color="red">' +
			'Please make a response!' +
			'</font>');
			$("#testMessage_r17").html('<font color="red">' +
			'Please make a response!' +
			'</font>');
			$("#testMessage_r18").html('<font color="red">' +
			'Please make a response!' +
			'</font>');
		}
	},


// LOG RESPONSE
	log_response_q: function() {

		var response_logged = false;

		// Array of radio buttons

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
			

			//  uncheck radio buttons
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
		$("#testMessage_att").html(''); //clear test message
		$("#testMessage_r1").html(''); 
		$("#testMessage_r2").html(''); 
		$("#testMessage_r3").html(''); 
		$("#testMessage_r4").html(''); 
		$("#testMessage_r5").html('');
		$("#testMessage_r6").html('');
		$("#testMessage_r7").html('');
		$("#testMessage_r8").html('');
		$("#testMessage_r9").html('');
		$("#testMessage_r10").html('');
		$("#testMessage_r11").html(''); 
		$("#testMessage_r12").html(''); 
		$("#testMessage_r13").html(''); 
		$("#testMessage_r14").html(''); 
		$("#testMessage_r15").html(''); 
		$("#testMessage_r16").html(''); 
		$("#testMessage_r17").html(''); 
		$("#testMessage_r18").html(''); 

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
	    	if (trial_info.slide == "reading_instructions") {
				showSlide("reading_instructions");              //display slide
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
			if (trial_info.slide == "recall_instructions") {
				showSlide("recall_instructions");              //display slide
			}
			if (trial_info.slide == "target1_1") {
				showSlide("target1_1");              //display slide
			}
			if (trial_info.slide == "target1_2") {
				showSlide("target1_2");              //display slide
			}
			if (trial_info.slide == "target1_3") {
				showSlide("target1_3");              //display slide
			}
			if (trial_info.slide == "target1_4") {
				showSlide("target1_4");              //display slide
			}
			if (trial_info.slide == "target1_5") {
				showSlide("target1_5");              //display slide
			}
			if (trial_info.slide == "target1_6") {
				showSlide("target1_6");              //display slide
			}
			if (trial_info.slide == "target2_1") {
				showSlide("target2_1");              //display slide
			}
			if (trial_info.slide == "target2_2") {
				showSlide("target2_2");              //display slide
			}
			if (trial_info.slide == "target2_3") {
				showSlide("target2_3");              //display slide
			}
			if (trial_info.slide == "target2_4") {
				showSlide("target2_4");              //display slide
			}
			if (trial_info.slide == "target2_5") {
				showSlide("target2_5");              //display slide
			}
			if (trial_info.slide == "target2_6") {
				showSlide("target2_6");              //display slide
			}
			if (trial_info.slide == "target3_1") {
				showSlide("target3_1");              //display slide
			}
			if (trial_info.slide == "target3_2") {
				showSlide("target3_2");              //display slide
			}
			if (trial_info.slide == "target3_3") {
				showSlide("target3_3");              //display slide
			}
			if (trial_info.slide == "target3_4") {
				showSlide("target3_4");              //display slide
			}
			if (trial_info.slide == "target3_5") {
				showSlide("target3_5");              //display slide
			}
			if (trial_info.slide == "target3_6") {
				showSlide("target3_6");              //display slide
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

			var child_age = document.getElementsByName("child_age");

		// Loop through race buttons
		for (i = 0; i < child_age.length; i++) {
			if (child_age[i].checked) {
				experiment.data.child_age.push(child_age[i].value);
			}
		}

		experiment.data.ladder.push(document.getElementById("ladder").value);
		experiment.data.age.push(document.getElementById("age").value);
		experiment.data.gender.push(document.getElementById("gender").value);
		experiment.data.education.push(document.getElementById("education").value);
		experiment.data.homelang.push(document.getElementById("homelang").value);
		experiment.data.ethnicity.push(document.getElementById("ethnicity").value);
		experiment.data.children.push(document.getElementById("children").value);
		experiment.data.childAge.push(document.getElementById("child_age").value);
		experiment.data.prior_exposure.push(document.getElementById("prior_exposure").value);
		experiment.end();
	}
}
