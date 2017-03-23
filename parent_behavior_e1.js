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

function shuffle_mult() {
    var length0 = 0,
        length = arguments.length,
        i,
        j,
        rnd,
        tmp;

    for (i = 0; i < length; i += 1) {
        if ({}.toString.call(arguments[i]) !== "[object Array]") {
            throw new TypeError("Argument is not an array.");
        }

        if (i === 0) {
            length0 = arguments[0].length;
        }

        if (length0 !== arguments[i].length) {
            throw new RangeError("Array lengths do not match.");
        }
    }


    for (i = 0; i < length0; i += 1) {
        rnd = Math.floor(Math.random() * i);
        for (j = 0; j < length; j += 1) {
            tmp = arguments[j][i];
            arguments[j][i] = arguments[j][rnd];
            arguments[j][rnd] = tmp;
        }
    }
}

// ######################## Configuration settings ############################

//set up attitudes items.

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

var behave = ['In the last month, how often did you read to your child?',
'In the last month, how often did you practice numbers or letters with your child?',
'In the last month, how often did you share facts or observations about the world when you are doing other tasks (e.g., “did you know butter comes from cows?” when you are shopping at the grocery store)?',
'In the last month, how often did your child watch educational programming (e.g., shows like Sesame Street) or play with educational apps (e.g., apps designed to teach numbers, colors, shapes, etc.) on a tablet or mobile device?',
'In the last month, how often did you and your child talk about feelings (e.g., when he/she is sad/angry)?',
'In the last month, how often did you and your child spend time cuddling?',
'In the last month, how often did your child sleep in the same bed as you?',
'In the last month, how often did you hug or kiss your child?',
'In the last month, how often did you talk sternly to your child when he/she does something you don’t want?',
'In the last month, how often did you give your child “time out” or other punishments for acting out?',
'In the last month, how often did you talk about setting limits with your child (e.g., “only 10 minutes of screen time” or “no hitting”)?',
'In the last month, how often did your child help or try to help with chores or tasks (including cleaning up his/her toys)?'
];

var behave_ord = ['EL1', 'EL2', 'EL3', 'EL4', 'AA1','AA2','AA3','AA4','RR1','RR2','RR3','RR4'];

shuffle_mult(behave, behave_ord);

var atts_instruct = ['paq_instruct'];
var behave_instruct = ['behave_instruct'];
var chidlren_qs = ['children_qs'];

var numTrialsExperiment = atts_instruct.length + atts.length + behave_instruct.length + behave.length;


//set up uptake experiment slides.

var trials = [];


for (i = 0; i < atts_instruct.length; i++) {
    trial = {
        sentence: "",
        slide: "attitudes_instruct",
        behavior: "",
        trial_number: i+1,
    }

    trials.push(trial);
}

for (i = 0; i < atts.length; i++) {
    trial = {
        sentence: atts[i],
        slide: "attitudes",
        behavior: "",
        trial_number: i+1,
    }

    trials.push(trial);
}

for (i = 0; i < behave_instruct.length; i++) {
    trial = {
        sentence: "",
        slide: "behave_instruct",
        behavior: "",
        trial_number: i+1,
    }

    trials.push(trial);
}

for (i = 0; i < behave.length; i++) {
    trial = {
        sentence: behave[i],
        slide: "behave",
        behavior: behave_ord[i],
        trial_number: i+1,
    }

    trials.push(trial);
}

for (i = 0; i < chidlren_qs.length; i++) {
    trial = {
        sentence: children_qs[i],
        slide: "children_qs",
        behavior: behave_ord[i],
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
    	trial_type: [],
		sentence: [],
		ladder: [],
		age: [],
		gender: [],
		education: [],
		comments: [],
		ethnicity:[],
		race: [],
		children:[],
		item: [],
        childAgeYoung:[],
        childAgeOld:[],
        behaveAge: []
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
            nextButton_Be.blur();
            
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
		$("#testMessage_uptake").html(''); 


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

            if (trial_info.slide == "attitudes_instruct") {
                showSlide("attitudes_instruct");    
                }
			if (trial_info.slide == "attitudes") {
	    	$("#attitudes").html(trial_info.sentence);  //add sentence to html 
                showSlide("attitudes_slide"); //display slide
	    	    }
            if (trial_info.slide == "behave_instruct") {
                showSlide("behave_instruct");   
                } 
            if (trial_info.slide == "behave") {
            $("#behave").html(trial_info.sentence);  
                showSlide("behave_slide"); 
                }
            if (trial_info.slide == "children_qs") {
                showSlide("children_qs"); 
                }

		experiment.data.sentence.push(trial_info.sentence);
		experiment.data.trial_type.push(trial_info.slide);
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
		experiment.data.comments.push(document.getElementById("comments").value);
		experiment.data.ethnicity.push(document.getElementById("ethnicity").value);
		experiment.data.children.push(document.getElementById("children").value);
        experiment.data.childAgeYoung.push(document.getElementById("youngestAge").value);
        experiment.data.childAgeOld.push(document.getElementById("oldestAge").value);
        experiment.data.behaveAge.push(document.getElementById("b_age").value);
		experiment.end();
	}
}
