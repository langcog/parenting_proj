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

// set up order of articles
var articles = ['uptake_exp1', 'uptake_exp2', 'uptake_con1', 'uptake_con2'];
articles = shuffle(articles);

var reading = ['reading_instructions', articles[0], articles[1], articles[2], articles[3],'recall_instructions'];

//set up order of recall items within article groups.
var uptake_question_exp1 = [
'In this article, when an adult acted more like a teacher and showed children how to make a toy squeak, children:',
'According to this article, children were more likely to find new and better ways to make a toy work when the adult:',
'According to this article, children believe:',
'Based on this article, when children see a teacher demonstrate the function of a toy, they:',
'A teacher and child are playing with a toy cash register. The teacher says he is an expert at this toy, and presses several different keys followed by the open key, and the register opens. Based on this article, the child is more likely to:',
'Based on Article 1, when playing with blocks with a toddler, you should:'];

var uptake_answer_a_exp1 = [
'Were more likely to disobey the teacher and ignore the rules',
'Pretended to be an expert on the toy',
'That teachers don’t know everything',
'Explore the toy less because they have become bored by the toy',
'Imitate the teacher by pressing the same set of keys to make the box open',
'Tell the child what to build but have her do the work'];

var uptake_answer_b_exp1 = [
'Played with the toy less than when the teacher acted surprised by the toy',
'Pretended not to care about the toy',
'That teachers will give them incomplete information', 
'Explore the toy more because they have become more interested in the toy',
'Be uninterested in making the box open',
'Demonstrate for the child how to build a tower and then have her imitate you'];

var uptake_answer_c_exp1 = [
'Were more likely to show other children how to make the toy squeak',
'Pretended to be clueless about the toy',
'That teachers should not be trusted',
'Explore the toy more because they assume the teacher has not showed them everything there is to know about the toy',
'Understand that only the final key made the box open, and press that key',
'Help the child by putting blocks together yourself if she can’t do it right away'];

var uptake_answer_d_exp1 = [
'Were more trusting of the teacher for the rest of the play session',
'Didn’t mention the toy at all and ignored it',
'That teachers try to be informative',
'Explore the toy less because they assume the teacher has showed them everything there is to know about the toy',
'Try pressing a different set of keys to figure out how to make the box open',
'Encourage the child to play with the blocks however she wants'];

var uptake_question_exp2 = [
'In this article, children saw unexpected events including:',
'In this article, when given the choice to play with one of the toys they had seen, children were more likely to:',
'In this article, when playing with a toy they had seen go through a wall, children:',
'Based on the results of the study described in this article, researchers can conclude that:',
'Based on the results of the study in this article, a baby who sees a ball appear to hover in midair is likely to:',
'Based on the results of the study in this article, we might assume that:'];

var uptake_answer_a_exp2 = [
'A toy car rolling through a solid wall',
'Play with the toy they were least familiar with',
'Were hesitant to interact with the toy too much',
'Babies have trouble processing surprising events and learn by paying attention to familiar, predictable events',
'Try picking up and dropping the ball',
'Babies’ vision is not good enough for them to realize something impossible has happened (e.g., that an object has moved through a solid wall)'];

var uptake_answer_b_exp2 = [
'A toy falling off the table',
'Play with the toy that did something unexpected',
'Asked an adult for help using the toy',
'Babies learn by paying attention to surprising events',
'Be afraid of the ball',
'Babies have expectations about the physics of their environment (e.g., that unsupported things fall down and objects cannot move through walls)'];

var uptake_answer_c_exp2 = [
'A toy animal speaking out loud',
'Play with the toy they were most familiar with',
'Banged the toy to see if it was solid',
'Babies quickly learn new rules about the physical world (e.g., cars can go through walls) if they see it happen once',
'Believe that objects can move around on their own',
'Babies only realize that an event is surprising when they see someone else act surprised'];

var uptake_answer_d_exp2 = [
'A balloon flying away',
'Play with the toy that behaved as expected',
'Dropped the toy to see if it fell',
'Babies do not know enough about the physical world to be surprised by a toy going through a wall',
'Play with the ball less than other toys',
'Babies cannot learn new things about the physics of their environment (e.g., that objects can move through solid walls)'];

var uptake_question_con1 = [
'In this article, scientists described the discovery of an unusual new humanlike species. What made this discovery surprising:',
'The “island rule” discussed in the article refers to the idea that:',
'Some researchers have challenged the “island rule” because:',
'Scientists interested in whether the “island rule” applies to human evolution might be excited to find:',
'In the study of human origins, what statement best describes the state of scientists’ knowledge as portrayed in the article:',
'What other evidence do scientists have that species sometimes change size on islands?'];

var uptake_answer_a_con1 = [
'They didn’t hunt or use tools like modern humans',
'There are fewer animal species that live on islands compared with the number living on larger land masses',
'The number of species on islands is not always smaller than mainland areas of equal size',
'Evidence of tool use and the use of fire by early human-like species',
'Worries that new discoveries may have been falsified by unscrupulous researchers',
'Tools  that are too small for modern humans to use have been found on islands'];

var uptake_answer_b_con1 = [
'They lived on islands and archipelagos',
'Animals tend to change in size over evolution in insular environments, with large ones getting smaller and small ones getting larger',
'Some animals who evolved to live on islands store water less efficiently than those who evolved on the mainland',
'Large birds flying from island to island to take advantage of limited resources on each island',
'Certainty in the principles that govern human evolution in different environments',
'Fossilized footprints that are smaller than modern mammals’ feet have been found on islands'];

var uptake_answer_c_con1 = [
'They were unusually small, compared to modern humans',
'Animals who evolved to live on islands surrounded by salt water must store more water than those who have access to fresh water on the mainland',
'There are many factors that contribute to the size of animals in an ecosystem',
'Fossils of other early human-like species that lived on islands',
'Limited understanding of any aspect of human evolution',
'Dwarf elephants and hippo fossils have been found on islands'];

var uptake_answer_d_con1 = [
'They lived in areas with little access to water',
'Early human species are less likely to thrive on islands because of the relative sparsity of resources like fresh water or firewood',
'There is no evidence that early humans living on islands had shorter lifespans than those on the mainland',
'Smaller species of hippos and other food sources living on islands',
'Excitement over new discoveries but controversy over what they mean',
'There is not enough fresh water available on islands to sustain larger mammals'];

var uptake_question_con2 = [
'Animals often have metallic, iridescent colors, but these colors are rarer in plants, especially on their leaves. Why is this, according to the article:',
'Peacock begonias need to harvest all the light they can from the sun because:',
'Scientists were surprised to find that the leaves of the peacock begonia:',
'Why do scientists think iridoblasts – the cells in the peacock begonia that make it blue – might have evolved to be blue and shiny in color?',
'When scientists study the properties of cells that make up peacock begonias’ leaves, one major question is:',
'According to the article, one important experiment for the scientists to do in their research on peacock begonia leaves would be:'];

var uptake_answer_a_con2 = [
'Iridescent colors reflect light, but the job of leaves is to absorb light',
'They need more light to support the growth of their large, beautiful iridescent leaves',
'Were able to absorb light even though they were iridescent',
'Their color makes the leaves attractive to insects that pollinate them',
'Why they give off a strong odor and what advantage this creates in the rainforest',
'To test whether animals have more difficulty seeing the shiny blue leaves in the forest compared to other leaves'];

var uptake_answer_b_con2 = [
'Iridescence normally comes from proteins that only animals produce',
'They are in bloom for a shorter period of time than other flowering plants',
'Were able to grow given the heavy rainfall in their native environment',
'Their color makes the leaves harder to see for animals that might otherwise eat them',
'Which chemical compounds make them poisonous',
'To see whether insects are more likely to land on blue leaves compared to green or red leaves'];

var uptake_answer_c_con2 = [
'Iridescence makes plants vulnerable to predators',
'They grow in regions that have few daylight hours during the winter',
'Attracted insects and birds due to their iridescence',
'Animals are less likely to eat them since colorful things are often poisonous',
'How the structure of the cells makes the leaves water resistant',
'To submerge iridescent leaves in water and see if they remain intact longer than non-iridescent leaves'];

var uptake_answer_d_con2 = [
'Water evaporates more quickly from iridescent surfaces',
'They live in the shade at the bottom of the rainforest',
'Were poisonous if consumed',
'They often grow near bodies of water, so their blue color acts as camouflage',
'How the structure of the cells helps them to absorb light energy',
'To feed the leaves to animals to see if they are less tasty when they contain the blue iridescent color'];

var e1_item = [
'e1_1','e1_2','e1_3','e1_4','e1_5','e1_6']

var e2_item = [
'e2_1','e2_2','e2_3','e2_4','e2_5','e2_6']

var c1_item = [
'c1_1','c1_2','c1_3','c1_4','c1_5','c1_6']

var c2_item = [
'c2_1','c2_2','c2_3','c2_4','c2_5','c2_6']

shuffle_mult(uptake_question_exp1, uptake_answer_a_exp1, uptake_answer_b_exp1, uptake_answer_c_exp1, uptake_answer_d_exp1, e1_item);
shuffle_mult(uptake_question_exp2, uptake_answer_a_exp2, uptake_answer_b_exp2, uptake_answer_c_exp2, uptake_answer_d_exp2, e2_item);
shuffle_mult(uptake_question_con1, uptake_answer_a_con1, uptake_answer_b_con1, uptake_answer_c_con1, uptake_answer_d_con1, c1_item);
shuffle_mult(uptake_question_con2, uptake_answer_a_con2, uptake_answer_b_con2, uptake_answer_c_con2, uptake_answer_d_con2, c2_item);

var uptake_title = [];
var uptake_question = [];
var uptake_answer_a = [];
var uptake_answer_b = [];
var uptake_answer_c = [];
var uptake_answer_d = [];

var item_order = [];

//create uptake arrays such that recall blocks (by article) show up in the same order as the articles.

//create functions that add the title, questions and response options for a given article to the uptake arrays.
function add_e1 () 
{ 
	for (i = 0; i < 6; i++) {
		title= 'Learning about Toys',
		question = uptake_question_exp1[i];
		answer_a = uptake_answer_a_exp1[i];
		answer_b = uptake_answer_b_exp1[i];
		answer_c = uptake_answer_c_exp1[i];
		answer_d = uptake_answer_d_exp1[i];
		uptake_title.push(title);
		uptake_question.push(question);
		uptake_answer_a.push(answer_a);
		uptake_answer_b.push(answer_b);
		uptake_answer_c.push(answer_c);
		uptake_answer_d.push(answer_d);
		item_order.push(e1_item[i]);

}}

function add_e2 () 
{ 
	for (i = 0; i < 6; i++) {
		title= 'Learning about Toys',
		question = uptake_question_exp2[i];
		answer_a = uptake_answer_a_exp2[i];
		answer_b = uptake_answer_b_exp2[i];
		answer_c = uptake_answer_c_exp2[i];
		answer_d = uptake_answer_d_exp2[i];
		uptake_title.push(title);
		uptake_question.push(question);
		uptake_answer_a.push(answer_a);
		uptake_answer_b.push(answer_b);
		uptake_answer_c.push(answer_c);
		uptake_answer_d.push(answer_d);
		item_order.push(e2_item[i]);
}}

function add_c1 () 
{ 
	for (i = 0; i < 6; i++) {
		title= 'Learning about Toys',
		question = uptake_question_con1[i];
		answer_a = uptake_answer_a_con1[i];
		answer_b = uptake_answer_b_con1[i];
		answer_c = uptake_answer_c_con1[i];
		answer_d = uptake_answer_d_con1[i];
		uptake_title.push(title);
		uptake_question.push(question);
		uptake_answer_a.push(answer_a);
		uptake_answer_b.push(answer_b);
		uptake_answer_c.push(answer_c);
		uptake_answer_d.push(answer_d);
		item_order.push(c1_item[i]);
}}

function add_c2 () 
{ 
	for (i = 0; i < 6; i++) {
		title= 'Learning about Toys',
		question = uptake_question_con2[i];
		answer_a = uptake_answer_a_con2[i];
		answer_b = uptake_answer_b_con2[i];
		answer_c = uptake_answer_c_con2[i];
		answer_d = uptake_answer_d_con2[i];
		uptake_title.push(title);
		uptake_question.push(question);
		uptake_answer_a.push(answer_a);
		uptake_answer_b.push(answer_b);
		uptake_answer_c.push(answer_c);
		uptake_answer_d.push(answer_d);
		item_order.push(c2_item[i]);
}}

//create arrays based on order of articles.
if (reading[1] == "uptake_exp1") {
	add_e1()
}
if (reading[1] == "uptake_exp2") {
	add_e2()
}
if (reading[1] == "uptake_con1") {
	add_c1()
}
if (reading[1] == "uptake_con2") {
	add_c2()
}
if (reading[2] == "uptake_exp1") {
	add_e1()
}
if (reading[2] == "uptake_exp2") {
	add_e2()
}
if (reading[2] == "uptake_con1") {
	add_c1()
}
if (reading[2] == "uptake_con2") {
	add_c2()
}
if (reading[3] == "uptake_exp1") {
	add_e1()
}
if (reading[3] == "uptake_exp2") {
	add_e2()
}
if (reading[3] == "uptake_con1") {
	add_c1()
}
if (reading[3] == "uptake_con2") {
	add_c2()
}
if (reading[4] == "uptake_exp1") {
	add_e1()
}
if (reading[4] == "uptake_exp2") {
	add_e2()
}
if (reading[4] == "uptake_con1") {
	add_c1()
}
if (reading[4] == "uptake_con2") {
	add_c2()
}

var numTrialsExperiment = atts.length + reading.length + uptake_question.length;


//set up uptake experiment slides.

var trials = [];


for (i = 0; i < atts.length; i++) {
	trial = {
		sentence: atts[i],
		trial_number_block: i +1,
		trial_type: "attitudes",
		slide: "",
		trial_number: i+1,
		item: "",
	}

	trials.push(trial);
}

for (i = 0; i < reading.length; i++) {
	trial = {
		sentence: "",
		trial_number_block: i +1,
		trial_type: "reading",
		slide: reading[i],
		trial_number: i+1,
		item: "",
	}

	trials.push(trial);
}

for (i = 0; i < uptake_question.length; i++) {

	 trial = {
		sentence: "",
		trial_number_block: i+1,
		trial_type:"uptake",
		slide: "uptake",
		trial_number: i+1, 
		uptake_title: uptake_title[i],	
		uptake_question: uptake_question[i],	
		uptake_answer_a: uptake_answer_a[i],	
		uptake_answer_b: uptake_answer_b[i],	
		uptake_answer_c: uptake_answer_c[i],	
		uptake_answer_d: uptake_answer_d[i],	
		item: item_order[i],

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
		uptake_item: [],
		answer: [],
		ladder: [],
		age: [],
		gender: [],
		education: [],
		homelang: [],
		ethnicity:[],
		race: [],
		children:[],
		target1_rt: [],
		target2_rt: [],
		control1_rt: [],
		control2_rt: [],
		item: []
	},



	starttime:function(){
			starttime = Date.now();
	},
	startread:function(){
			startread = Date.now();	
	},
	getrttarget1:function(){
			endtarget1 = Date.now();
			experiment.data.target1_rt = (endtarget1-startread)/1000;
	},
	getrttarget2:function(){
			endtarget2 = Date.now();
			experiment.data.target2_rt = (endtarget2-startread)/1000;
	},
	getrtcontrol1:function(){
			endcontrol1 = Date.now();
			experiment.data.control1_rt = (endcontrol1-startread)/1000;
	},
	getrtcontrol2:function(){
			endcontrol2 = Date.now();
			experiment.data.control2_rt = (endcontrol2-startread)/1000;
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
			nextButton_uptake.blur();


			//  uncheck radio buttons
			for (i = 0; i < radio.length; i++) {
				radio[i].checked = false
			}

			experiment.next();

		} else {
			$("#testMessage_uptake").html('<font color="red">' +
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
			if (trial_info.trial_type == "attitudes") {
	    	$("#attitudes").html(trial_info.sentence);  //add sentence to html 
	    	 showSlide("attitudes_slide"); 
	    	 }
	    	if (trial_info.slide == "reading_instructions") {
				showSlide("reading_instructions");              //display slide
			}           
			if (trial_info.slide == "uptake_exp1") {
				showSlide("uptake_exp1");              //display slide
			}
			if (trial_info.slide == "uptake_exp2") {
				showSlide("uptake_exp2");              //display slide
			}
			if (trial_info.slide == "uptake_con1") {
				showSlide("uptake_con1");              //display slide
			}
			if (trial_info.slide == "uptake_con2") {
				showSlide("uptake_con2");              //display slide
			}
			if (trial_info.slide == "recall_instructions") {
				showSlide("recall_instructions");              //display slide
			}
			if (trial_info.slide == "uptake") {
			$("#uptake_question").html(trial_info.uptake_question), //add question to html 
			$("#uptake_title").html(trial_info.uptake_title), //add question to html 
			$("#uptake_answer_a").html(trial_info.uptake_answer_a), //add question to html 
			$("#uptake_answer_b").html(trial_info.uptake_answer_b), //add question to html 
			$("#uptake_answer_c").html(trial_info.uptake_answer_c), //add question to html 
			$("#uptake_answer_d").html(trial_info.uptake_answer_d), //add question to html 
				showSlide("uptake")}              //display slide
		

		experiment.data.sentence.push(trial_info.sentence);
		experiment.data.trial_type.push(trial_info.trial_type);
		experiment.data.trial_number_block.push(trial_info.trial_number_block);
		experiment.data.item.push(trial_info.item);
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
		experiment.end();
	}
}
