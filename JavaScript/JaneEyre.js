// ---------------------------SIDE BAR MENU--------------------------------
function openNav() {
    document.getElementById("sideBarMenu").style.width = "250px";
}

function closeNav() {
    document.getElementById("sideBarMenu").style.width = "0";
}


// ------------------------INTERACTIVE TIMELINE--------------------------------
$(function(){
    $().timelinr({
        arrowKeys: 'true'
    })
});
/* ----------------------------------
jQuery Timelinr 0.9.54
tested with jQuery v1.6+

Copyright 2011, CSSLab.cl
Free under the MIT license.
https://www.opensource.org/licenses/mit-license.php

instructions: http://www.csslab.cl/2011/08/18/jquery-timelinr/
---------------------------------- */

jQuery.fn.timelinr = function (options) {
    // default plugin settings
    settings = jQuery.extend({
      orientation: 'horizontal', // value: horizontal | vertical, default to horizontal
      containerDiv: '#timeline', // value: any HTML tag or #id, default to #timeline
      datesDiv: '#dates', // value: any HTML tag or #id, default to #dates
      datesSelectedClass: 'selected', // value: any class, default to selected
      datesSpeed: 'normal', // value: integer between 100 and 1000 (recommended) or 'slow', 'normal' or 'fast'; default to normal
      issuesDiv: '#issues', // value: any HTML tag or #id, default to #issues
      issuesSelectedClass: 'selected', // value: any class, default to selected
      issuesSpeed: 'fast', // value: integer between 100 and 1000 (recommended) or 'slow', 'normal' or 'fast'; default to fast
      issuesTransparency: 0.2, // value: integer between 0 and 1 (recommended), default to 0.2
      issuesTransparencySpeed: 500, // value: integer between 100 and 1000 (recommended), default to 500 (normal)
      prevButton: '#prev', // value: any HTML tag or #id, default to #prev
      nextButton: '#next', // value: any HTML tag or #id, default to #next
      arrowKeys: 'false', // value: true | false, default to false
      startAt: 1, // value: integer, default to 1 (first)
      autoPlay: 'false', // value: true | false, default to false
      autoPlayDirection: 'forward', // value: forward | backward, default to forward
      autoPlayPause: 2000 // value: integer (1000 = 1 seg), default to 2000 (2segs)
    }, options);
  
    $(function () {
      // setting variables... many of them
      var howManyDates = $(settings.datesDiv + ' li').length;
      var howManyIssues = $(settings.issuesDiv + ' li').length;
      var currentDate = $(settings.datesDiv).find('a.' + settings.datesSelectedClass);
      var currentIssue = $(settings.issuesDiv).find('li.' + settings.issuesSelectedClass);
      var widthContainer = $(settings.containerDiv).width();
      var heightContainer = $(settings.containerDiv).height();
      var widthIssues = $(settings.issuesDiv).width();
      var heightIssues = $(settings.issuesDiv).height();
      var widthIssue = $(settings.issuesDiv + ' li').width();
      var heightIssue = $(settings.issuesDiv + ' li').height();
      var widthDates = $(settings.datesDiv).width();
      var heightDates = $(settings.datesDiv).height();
      var widthDate = $(settings.datesDiv + ' li').width();
      var heightDate = $(settings.datesDiv + ' li').height();
      // set positions!
      if (settings.orientation == 'horizontal') {
        $(settings.issuesDiv).width(widthIssue * howManyIssues);
        $(settings.datesDiv).width(widthDate * howManyDates).css('marginLeft', widthContainer / 2 - widthDate / 2);
        var defaultPositionDates = parseInt($(settings.datesDiv).css('marginLeft').substring(0, $(settings.datesDiv).css('marginLeft').indexOf('px')));
      } else if (settings.orientation == 'vertical') {
        $(settings.issuesDiv).height(heightIssue * howManyIssues);
        $(settings.datesDiv).height(heightDate * howManyDates).css('marginTop', heightContainer / 2 - heightDate / 2);
        var defaultPositionDates = parseInt($(settings.datesDiv).css('marginTop').substring(0, $(settings.datesDiv).css('marginTop').indexOf('px')));
      }
  
      $(settings.datesDiv + ' a').click(function (event) {
        event.preventDefault();
        // first vars
        var whichIssue = $(this).text();
        var currentIndex = $(this).parent().prevAll().length;
        // moving the elements
        if (settings.orientation == 'horizontal') {
          $(settings.issuesDiv).animate({ 'marginLeft': -widthIssue * currentIndex }, { queue: false, duration: settings.issuesSpeed });
        } else if (settings.orientation == 'vertical') {
          $(settings.issuesDiv).animate({ 'marginTop': -heightIssue * currentIndex }, { queue: false, duration: settings.issuesSpeed });
        }
        $(settings.issuesDiv + ' li').animate({ 'opacity': settings.issuesTransparency }, { queue: false, duration: settings.issuesSpeed }).removeClass(settings.issuesSelectedClass).eq(currentIndex).addClass(settings.issuesSelectedClass).fadeTo(settings.issuesTransparencySpeed, 1);
        // prev/next buttons now disappears on first/last issue | bugfix from 0.9.51: lower than 1 issue hide the arrows | bugfixed: arrows not showing when jumping from first to last date
        if (howManyDates == 1) {
          $(settings.prevButton + ',' + settings.nextButton).fadeOut('fast');
        } else if (howManyDates == 2) {
          if ($(settings.issuesDiv + ' li:first-child').hasClass(settings.issuesSelectedClass)) {
            $(settings.prevButton).fadeOut('fast');
            $(settings.nextButton).fadeIn('fast');
          } else
          if ($(settings.issuesDiv + ' li:last-child').hasClass(settings.issuesSelectedClass)) {
            $(settings.nextButton).fadeOut('fast');
            $(settings.prevButton).fadeIn('fast');
          }
        } else {
          if ($(settings.issuesDiv + ' li:first-child').hasClass(settings.issuesSelectedClass)) {
            $(settings.nextButton).fadeIn('fast');
            $(settings.prevButton).fadeOut('fast');
          } else
          if ($(settings.issuesDiv + ' li:last-child').hasClass(settings.issuesSelectedClass)) {
            $(settings.prevButton).fadeIn('fast');
            $(settings.nextButton).fadeOut('fast');
          } else
          {
            $(settings.nextButton + ',' + settings.prevButton).fadeIn('slow');
          }
        }
        // now moving the dates
        $(settings.datesDiv + ' a').removeClass(settings.datesSelectedClass);
        $(this).addClass(settings.datesSelectedClass);
        if (settings.orientation == 'horizontal') {
          $(settings.datesDiv).animate({ 'marginLeft': defaultPositionDates - widthDate * currentIndex }, { queue: false, duration: 'settings.datesSpeed' });
        } else if (settings.orientation == 'vertical') {
          $(settings.datesDiv).animate({ 'marginTop': defaultPositionDates - heightDate * currentIndex }, { queue: false, duration: 'settings.datesSpeed' });
        }
      });
  
      $(settings.nextButton).bind('click', function (event) {
        event.preventDefault();
        // bugixed from 0.9.54: now the dates gets centered when there's too much dates.
        var currentIndex = $(settings.issuesDiv).find('li.' + settings.issuesSelectedClass).index();
        if (settings.orientation == 'horizontal') {
          var currentPositionIssues = parseInt($(settings.issuesDiv).css('marginLeft').substring(0, $(settings.issuesDiv).css('marginLeft').indexOf('px')));
          var currentIssueIndex = currentPositionIssues / widthIssue;
          var currentPositionDates = parseInt($(settings.datesDiv).css('marginLeft').substring(0, $(settings.datesDiv).css('marginLeft').indexOf('px')));
          var currentIssueDate = currentPositionDates - widthDate;
          if (currentPositionIssues <= -(widthIssue * howManyIssues - widthIssue)) {
            $(settings.issuesDiv).stop();
            $(settings.datesDiv + ' li:last-child a').click();
          } else {
            if (!$(settings.issuesDiv).is(':animated')) {
              // bugixed from 0.9.52: now the dates gets centered when there's too much dates.
              $(settings.datesDiv + ' li').eq(currentIndex + 1).find('a').trigger('click');
            }
          }
        } else if (settings.orientation == 'vertical') {
          var currentPositionIssues = parseInt($(settings.issuesDiv).css('marginTop').substring(0, $(settings.issuesDiv).css('marginTop').indexOf('px')));
          var currentIssueIndex = currentPositionIssues / heightIssue;
          var currentPositionDates = parseInt($(settings.datesDiv).css('marginTop').substring(0, $(settings.datesDiv).css('marginTop').indexOf('px')));
          var currentIssueDate = currentPositionDates - heightDate;
          if (currentPositionIssues <= -(heightIssue * howManyIssues - heightIssue)) {
            $(settings.issuesDiv).stop();
            $(settings.datesDiv + ' li:last-child a').click();
          } else {
            if (!$(settings.issuesDiv).is(':animated')) {
              // bugixed from 0.9.54: now the dates gets centered when there's too much dates.
              $(settings.datesDiv + ' li').eq(currentIndex + 1).find('a').trigger('click');
            }
          }
        }
        // prev/next buttons now disappears on first/last issue | bugfix from 0.9.51: lower than 1 issue hide the arrows
        if (howManyDates == 1) {
          $(settings.prevButton + ',' + settings.nextButton).fadeOut('fast');
        } else if (howManyDates == 2) {
          if ($(settings.issuesDiv + ' li:first-child').hasClass(settings.issuesSelectedClass)) {
            $(settings.prevButton).fadeOut('fast');
            $(settings.nextButton).fadeIn('fast');
          } else
          if ($(settings.issuesDiv + ' li:last-child').hasClass(settings.issuesSelectedClass)) {
            $(settings.nextButton).fadeOut('fast');
            $(settings.prevButton).fadeIn('fast');
          }
        } else {
          if ($(settings.issuesDiv + ' li:first-child').hasClass(settings.issuesSelectedClass)) {
            $(settings.prevButton).fadeOut('fast');
          } else
          if ($(settings.issuesDiv + ' li:last-child').hasClass(settings.issuesSelectedClass)) {
            $(settings.nextButton).fadeOut('fast');
          } else
          {
            $(settings.nextButton + ',' + settings.prevButton).fadeIn('slow');
          }
        }
      });
  
      $(settings.prevButton).click(function (event) {
        event.preventDefault();
        // bugixed from 0.9.54: now the dates gets centered when there's too much dates.
        var currentIndex = $(settings.issuesDiv).find('li.' + settings.issuesSelectedClass).index();
        if (settings.orientation == 'horizontal') {
          var currentPositionIssues = parseInt($(settings.issuesDiv).css('marginLeft').substring(0, $(settings.issuesDiv).css('marginLeft').indexOf('px')));
          var currentIssueIndex = currentPositionIssues / widthIssue;
          var currentPositionDates = parseInt($(settings.datesDiv).css('marginLeft').substring(0, $(settings.datesDiv).css('marginLeft').indexOf('px')));
          var currentIssueDate = currentPositionDates + widthDate;
          if (currentPositionIssues >= 0) {
            $(settings.issuesDiv).stop();
            $(settings.datesDiv + ' li:first-child a').click();
          } else {
            if (!$(settings.issuesDiv).is(':animated')) {
              // bugixed from 0.9.54: now the dates gets centered when there's too much dates.
              $(settings.datesDiv + ' li').eq(currentIndex - 1).find('a').trigger('click');
            }
          }
        } else if (settings.orientation == 'vertical') {
          var currentPositionIssues = parseInt($(settings.issuesDiv).css('marginTop').substring(0, $(settings.issuesDiv).css('marginTop').indexOf('px')));
          var currentIssueIndex = currentPositionIssues / heightIssue;
          var currentPositionDates = parseInt($(settings.datesDiv).css('marginTop').substring(0, $(settings.datesDiv).css('marginTop').indexOf('px')));
          var currentIssueDate = currentPositionDates + heightDate;
          if (currentPositionIssues >= 0) {
            $(settings.issuesDiv).stop();
            $(settings.datesDiv + ' li:first-child a').click();
          } else {
            if (!$(settings.issuesDiv).is(':animated')) {
              // bugixed from 0.9.54: now the dates gets centered when there's too much dates.
              $(settings.datesDiv + ' li').eq(currentIndex - 1).find('a').trigger('click');
            }
          }
        }
        // prev/next buttons now disappears on first/last issue | bugfix from 0.9.51: lower than 1 issue hide the arrows
        if (howManyDates == 1) {
          $(settings.prevButton + ',' + settings.nextButton).fadeOut('fast');
        } else if (howManyDates == 2) {
          if ($(settings.issuesDiv + ' li:first-child').hasClass(settings.issuesSelectedClass)) {
            $(settings.prevButton).fadeOut('fast');
            $(settings.nextButton).fadeIn('fast');
          } else
          if ($(settings.issuesDiv + ' li:last-child').hasClass(settings.issuesSelectedClass)) {
            $(settings.nextButton).fadeOut('fast');
            $(settings.prevButton).fadeIn('fast');
          }
        } else {
          if ($(settings.issuesDiv + ' li:first-child').hasClass(settings.issuesSelectedClass)) {
            $(settings.prevButton).fadeOut('fast');
          } else
          if ($(settings.issuesDiv + ' li:last-child').hasClass(settings.issuesSelectedClass)) {
            $(settings.nextButton).fadeOut('fast');
          } else
          {
            $(settings.nextButton + ',' + settings.prevButton).fadeIn('slow');
          }
        }
      });
      // keyboard navigation, added since 0.9.1
      if (settings.arrowKeys == 'true') {
        if (settings.orientation == 'horizontal') {
          $(document).keydown(function (event) {
            if (event.keyCode == 39) {
              $(settings.nextButton).click();
            }
            if (event.keyCode == 37) {
              $(settings.prevButton).click();
            }
          });
        } else if (settings.orientation == 'vertical') {
          $(document).keydown(function (event) {
            if (event.keyCode == 40) {
              $(settings.nextButton).click();
            }
            if (event.keyCode == 38) {
              $(settings.prevButton).click();
            }
          });
        }
      }
      // default position startAt, added since 0.9.3
      $(settings.datesDiv + ' li').eq(settings.startAt - 1).find('a').trigger('click');
      // autoPlay, added since 0.9.4
      if (settings.autoPlay == 'true') {
        setInterval("autoPlay()", settings.autoPlayPause);
      }
    });
  };
  
  // autoPlay, added since 0.9.4
  function autoPlay() {
    var currentDate = $(settings.datesDiv).find('a.' + settings.datesSelectedClass);
    if (settings.autoPlayDirection == 'forward') {
      if (currentDate.parent().is('li:last-child')) {
        $(settings.datesDiv + ' li:first-child').find('a').trigger('click');
      } else {
        currentDate.parent().next().find('a').trigger('click');
      }
    } else if (settings.autoPlayDirection == 'backward') {
      if (currentDate.parent().is('li:first-child')) {
        $(settings.datesDiv + ' li:last-child').find('a').trigger('click');
      } else {
        currentDate.parent().prev().find('a').trigger('click');
      }
    }
  }
  //# sourceURL=pen.js


// -----------------POPUP When the user clicks on <div>, open the popup-----------------------

// function myFunction() {
//   var popup = document.getElementById("myPopup");
//   popup.classList.toggle("show");
// }

// //Quiz button reveal hidden QUiz section
// function ShowAndHideQ1() {
//     var x = document.getElementById('quiz1');
//     if (x.style.display == 'none') {
//         x.style.display = 'block';
//     } else {
//         x.style.display = 'none';
//     }
// }

// //Quiz  function
// function generateQuiz(questions, quizContainer, resultsContainer, submitButton) {

//     function showQuestions(questions, quizContainer) {
//         // we'll need a place to store the output and the answer choices
// 	var output = [];
// 	var answers;

// 	// for each question...
// 	for(var i=0; i<questions.length; i++){
		
// 		// first reset the list of answers
// 		answers = [];

// 		// for each available answer to this question...
// 		for(letter in questions[i].answers){

// 			// ...add an html radio button
// 			answers.push(
// 				'<label>'
// 					+ '<input type="radio" name="question'+i+'" value="'+letter+'">'
// 					+ letter + ': '
// 					+ questions[i].answers[letter]
// 				+ '</label>'
// 			);
// 		}

// 		// add this question and its answers to the output
// 		output.push(
// 			'<div class="question">' + questions[i].question + '</div>'
// 			+ '<div class="answers">' + answers.join('') + '</div>'
// 		);
// 	}

// 	// finally combine our output list into one string of html and put it on the page
// 	quizContainer.innerHTML = output.join('');
// }
//     }

//     function showResults(questions, quizContainer, resultsContainer) {
//         // gather answer containers from our quiz
// 	var answerContainers = quizContainer.querySelectorAll('.answers');
	
// 	// keep track of user's answers
// 	var userAnswer = '';
// 	var numCorrect = 0;
	
// 	// for each question...
// 	for(var i=0; i<questions.length; i++){

// 		// find selected answer
// 		userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
		
// 		// if answer is correct
// 		if(userAnswer===questions[i].correctAnswer){
// 			// add to the number of correct answers
// 			numCorrect++;
			
// 			// color the answers green
// 			answerContainers[i].style.color = 'lightgreen';
// 		}
// 		// if answer is wrong or blank
// 		else{
// 			// color the answers red
// 			answerContainers[i].style.color = 'red';
// 		}
// 	}

// 	// show number of correct answers out of total
// 	resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
//     }

//     // show the questions
//     showQuestions(questions, quizContainer);

//     // when user clicks submit, show results
//     submitButton.onclick = function () {
//         showResults(questions, quizContainer, resultsContainer);
    
// }


// //Quiz 1 questions
// var myQuestions = [
//     {
//         question: "What mood is set by Jane's description in the first 2 paragraphs?",
//         answers: {
//             a: "Happy",
//             b: "Mysterious",
//             c: "Sad",
//             d: "Pleasant"
//         },
//         correctAnswer: 'b'
//     },
//     {
//         question: "What does 'the drear November day' symbolize? ",
//         answers: {
//             a: "Jane's anger at her friends",
//             b: "Jane's life",
//             c: "The weather",
//             d: "Jane's emotions"
//         },
//         correctAnswer: 'c'
//     },

//     {
//         question: "Where does Jane choose to go after Mrs. Reed tells her to go be seated somewhere?",
//         answers: {
//             a: "The porch",
//             b: "Her bedroom",
//             c: "The breakfast room",
//             d: "The drawing room"
//         },
//         correctAnswer: 'c'
//     }
// ];

// //Declare Quiz 1 variable so JS will know
// var quizContainer = document.getElementById('quiz1');
// var resultsContainer = document.getElementById('results1');
// var submitButton = document.getElementById('submit1');