
var inquire = require("inquirer");

var BasicFlashCard = require("./BasicCard.js");
var ClozeFlashCard = require("./ClozeCard.js");
//var BQuestions = require("./questions.js");

var BasicQuestions = [];
var ClozeQuestions = [];
//console.log(Questions);
var bquestion1 = BasicFlashCard("Which US president has the lowest approval ratings in history ?", "Donald Trump");
BasicQuestions.push(bquestion1);
var bquestion2 = BasicFlashCard("Which planet is closest to the sun ?", "Mercury");
BasicQuestions.push(bquestion2);
var bquestion3 = BasicFlashCard("What does Frank Hernandez like more than being with us cool kids ?", "Capital One");
BasicQuestions.push(bquestion3);

var cquestion1 = ClozeFlashCard("Donald Trump has the lowest approval ratings for president in US History.", "Donald Trump");
ClozeQuestions.push(cquestion1);
var cquestion2 = ClozeFlashCard("Mercury is the planet closest to the sun.", "Mercury");
ClozeQuestions.push(cquestion2);
var cquestion3 = ClozeFlashCard("Frank Hernandez likes Capital One more than being with us cool kids.", "Capital One");
ClozeQuestions.push(cquestion3);

inquire.prompt({
	type: "list",
	message: "Please select what would you like to do :" + "\n\n",
	choices: ["Learn with Basic Flash Cards\n", "Test Yourself With Cloze-Deleted Flash Cards\n"],
	name: "userChoice"
})
.then(function(inquirerResponse) {
	console.log("\nYou chose to: ->" + inquirerResponse.userChoice + "\n");

	if (inquirerResponse.userChoice === "Learn with Basic Flash Cards\n") {
		runBasicFlashCard();
	} else if (inquirerResponse.userChoice === "Test Yourself With Cloze-Deleted Flash Cards\n") {
		runClozeFlashCard();
	}
})
//console.log(uestions.length);
var currentQuestion = 0;

function runBasicFlashCard() {
	
	if (currentQuestion >= BasicQuestions.length) {

		inquire.prompt({
			type: "confirm",
			message: "\nEnough Practice, Lets play the game with Cloze-Deleted Flash Cards..." +
			"\n" + "Ready ?",
			name: "confirm",
			default: true
		})
		.then(function(inquirerResponse) {
			if (inquirerResponse.confirm) {
				currentQuestion = 0;
				runClozeFlashCard();
			} else {
				console.log("\n-----GOOD BYE-----");
			}
		})


	} else if (currentQuestion < BasicQuestions.length) {
	
	inquire.prompt({
		type: "confirm",
		message: "\nQuestion: " + BasicQuestions[currentQuestion].front + "\n" +
				"Answer: " + BasicQuestions[currentQuestion].back + "\n" +
				"\nMove on? ",
		name: "confirm",
		default: true
		
		
	})
	.then(function(inquirerResponse) {
		if (inquirerResponse.confirm) {
			currentQuestion++;
			runBasicFlashCard();

		}
	})
	
}
}

var clozeQuestion = 0;
var correctAnswers = 0;
var wrongAnswers = 0;

function runClozeFlashCard() {
	
	if (clozeQuestion >= ClozeQuestions.length) {

		console.log("\n<-_*-_*-_*-_*-_*-_*-__*-_*-_*-_GAME OVER_-*_-*_-*_-*_-*_-*__-*_*-_*-_*->");
		console.log("\n~~~~~~ RESULTS: Corrects Answers: "+ correctAnswers + " & Incorrect Answers: " + wrongAnswers + " ~~~~~~\n");
		


	} else if (clozeQuestion < ClozeQuestions.length) {
	
	inquire.prompt({
		type: "input",

		message: "\nQuestion: " + ClozeQuestions[clozeQuestion].partial + "\n" +
				"Answer: ", 
				
		name: "answer",
		//default: true
		
		
	})
	.then(function(inquirerResponse) {

		var answerToLowerCase = inquirerResponse.answer.toLowerCase();
		var clozeToLowerCase = ClozeQuestions[clozeQuestion].cloze.toLowerCase();

		if (answerToLowerCase === clozeToLowerCase) {
			
			console.log("\n{ GOOD WORK }");
			clozeQuestion++;
			correctAnswers++
			runClozeFlashCard();

		} else {
			console.log("\n% YOU SUCK. %");
			console.log("\n Correct Answer: " + ClozeQuestions[clozeQuestion].full);
			clozeQuestion++;
			wrongAnswers++
			runClozeFlashCard();
		}
	})
	
}
}