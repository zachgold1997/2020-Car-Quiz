let questionsArray = [
  {
    question: "1. Chrysler brought back what comapany as an EV in 2020?",
    optionone: "Mercury",
    optiontwo: "Hummer",
    optionthree: "Pontiac",
    optionfour: "Saturn",
    correctAnswer: "Hummer"
  },
  {
     question: "2. What manufacturer is the 2020 A90 supra's engine sourced from??",
    optionone: "Honda",
    optiontwo: "Toyota",
    optionthree: "Chevrolet",
    optionfour: "BMW",
    correctAnswer: "BMW"
  },
  {
     question: "3. What do all the Tesla model names spell when they are put together?",
    optionone: "No Gas",
    optiontwo: "Sexy Cars",
    optionthree: "Best Cars",
    optionfour: "Electric",
    correctAnswer: "Sexy Cars"
  },
  {
    question: "4. What does the Tesla model S cost after the 2020 price change?",
    optionone: "$69,420",
    optiontwo: "$35,000",
    optionthree: "$50,000",
    optionfour: "$75,000",
    correctAnswer: "$69,420"
  },
  {
    question: "5. Chevrolet revoliutionized the C8 corvette in 2020 with what major change?",
    optionone: "3 seats",
    optiontwo: "Only sold in the U.S.A.",
    optionthree: "Mid-engine",
    optionfour: "Electric motors",
    correctAnswer: "Mid-engine"
  },
  {
    score: 0,
    questionCounter: 0}];

let questionsCount = questionsArray.length;

function handleStartClick(){
	$('.js-start-button').on('click',function(event){
		console.log("handleStartClick() ran");
		renderQuizBox(); 

	});
}

// This function displays the quiz box with the question, options, score and question count
function renderQuizBox(){
  //renderQuestionCount();
  renderQuestion(0);
  //renderScore();
}
function renderScore(){
  $(".progress-section .score-card").text(`${score}/${questionsCount}`);
}
function renderQuestionCount(){
  $(".progress-section .question-count").text(`Question ${questionCounter+1} of ${questionsCount}`);
}

// This function renders a new question
function renderQuestion(counter){
let html_question = "<div>"+questionsArray[5].score+"</div><div>"+questionsArray[6].position+"</div><form class=\"questions-form\"><p>"+questionsArray[counter].question+"</p><label class=\"options\"><input  id=\"option-one\" type=\"radio\" name=\"option-one\"><span>"+questionsArray[counter].optionone+"</span></label><label class=\"options\"><input id=\"option-two\" type=\"radio\" name=\"option-one\"><span>"+questionsArray[counter].optiontwo+"</span></label><label class=\"options\"><input id=\"option-three\" type=\"radio\" name=\"option-one\"><span></span></label><label class=\"options\"><input id=\"option-four\" type=\"radio\" name=\"option-one\"><span></span></label><input type=\"button\" value=\"Submit Answer\" class=\"submit-button js-submit-button\"></form>";
  
  $(".quiz_box").text(html_question)
}

function handleSubmitAnswer(){
  $('.js-submit-button').on('click',function(event){
    console.log("handleSubmitAnswer() ran");
   let selectedOption = $('input[type=radio]:checked').val();
   console.log("selectedOption :"+selectedOption);
    if(selectedOption === undefined) {
       displayPopup(false, selectedOption);
    }
    else{
     //reset radio button
      checkAnswer(selectedOption);
    }
 });
}

// This function checks whether the answer selected by the user is correct or not
function checkAnswer(selected){
  console.log("selected "+selected);
  let rightAnswer = questionsArray[questionCounter].correctAnswer;
  
  if(selected === rightAnswer){
    score++;
    displayPopup(true, rightAnswer);
  } 
  else{
   displayPopup(false, rightAnswer);
  }
}

//This function gives feedback to the user whether the option selected in correct or wrong. It also alerts the user if no option is selected
function displayPopup(statusFlag, answer){
	console.log("correct?" + statusFlag);
  $('.feedback-section').show();
  // $('.quiz-box').fadeIn();
  if(statusFlag){
	  console.log("doing correcty things");
    $(".popup-box img").attr("src","https://raw.githubusercontent.com/zachgold1997/2020-Car-Quiz/main/check-icon.png");
    $(".popup-box #popup-text .answer-header").text('You are right!');
    $('.popup-box .correct-answer').hide();
    $(".popup-box").show();
  }
  else{
	  console.log("doing wrongy things");
      if(answer === undefined) {
         questionCounter--;
         $(".popup-box img").attr("src","https://raw.githubusercontent.com/zachgold1997/2020-Car-Quiz/main/red-x-icon.png");
         $(".popup-box #popup-text .answer-header").text('Please select an option');
	 $('.popup-box .correct-answer').hide();
       }
      else{
         $(".popup-box img").attr("src","https://raw.githubusercontent.com/zachgold1997/2020-Car-Quiz/main/red-x-icon.png");
	 $(".popup-box #popup-text .answer-header").text('Sorry, the correct answer was:');
         $('.popup-box .correct-answer').text(answer).show();
	 //$('.popup-box .correct-answer').hide();
      }
    }
     $(".popup-box").show();
}

function handlePopupClose(){
  $('.js-close-button').on('click', function(event){
    console.log("handlePopupClose() ran");
    $('input[type=radio]:checked').prop('checked',false);
    $('.popup-box').hide();
    $('.feedback-section').hide();
    $('.quiz-box').hide().fadeIn();
    questionCounter++;
    if(questionCounter < questionsArray.length) {
       $('.quiz-box').fadeIn();
       renderQuizBox();
    }
    else{
      $('.quiz-box').hide();
      displayFinalScore();
    }
  });
}

//This function displays the final score of the quiz
function displayFinalScore(){
   $('.end-section').fadeIn(1000);
   $('.end-section h4').text(`Your Score is: ${score}/${questionsCount}`);
   $('.correct .count' ).text(score);
   $('.wrong .count').text(questionsCount - score);
   resetQuiz();
}

//This function resets the questions and score
function resetQuiz(){
  questionCounter = 0;
  score = 0;
}

function handleStartOver(){
  $('.js-startover-button').on('click',function(event){
    console.log("handleStartOver() ran");
  
    $('.end-section').hide();
    $('.quiz-box').fadeIn();
    renderQuizBox();
  });
}

function init(){
  $('.end-section').hide();
  $('.progress-section').hide();
  $('.quiz-box').hide();
  $('.feedback-section').hide();
  handleStartClick();
  handleSubmitAnswer();
  handlePopupClose();
  handleStartOver()
}
$(init());
