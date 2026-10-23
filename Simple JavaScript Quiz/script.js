function submitAnswers() {

  // 01 Function scoped variables
  var totalNumberOfQuestions = 5;
  var score = 0;

  // 02 Capture user input and store inside a variable
  var q1 = document.forms["quizForm"]["q1"].value;
  var q2 = document.forms["quizForm"]["q2"].value;
  var q3 = document.forms["quizForm"]["q3"].value;
  var q4 = document.forms["quizForm"]["q4"].value;
  var q5 = document.forms["quizForm"]["q5"].value;

  // ****** for checking captured values *******
  // alert(q1);

  // 03 Validation (client side only, must also be on the server side) [if users misses a question and doesn't check any option]

  // if (q1 === null || q1 === "") {
  //   alert("You missed question 1");
  //   return false;
  // }
  // if (q2 === null || q2 === "") {
  //   alert("You missed question 2");
  //   return false;
  // }
  // if (q3 === null || q3 === "") {
  //   alert("You missed question 3");
  //   return false;
  // }
  // if (q4 === null || q4 === "") {
  //   alert("You missed question 4");
  //   return false;
  // }
  // if (q5 === null || q5 === "") {
  //   alert("You missed question 5");
  //   return false;
  // }

  // Usign loop to decrease lines of code
  for (var i = 1; i <= totalNumberOfQuestions; i++) {

    if (eval("q" + i) === null || eval("q" + i) === "") {
      alert("You missed question " + i);

      return false;
      // prevents form submission, but we are catching the form submission instead, inside this function

    }
  }

  // 04 Set and array of the correct answers
  var answers = ["b", "a", "d", "b", "d"];

  // Check user submitted option values against the array containing the correct answers and if correct increases 'score' by 1
  // if (q1 === answers[0]) {
  //   score++;
  // }
  // if (q2 === answers[1]) {
  //   score++;
  // }
  // if (q3 === answers[2]) {
  //   score++;
  // }
  // if (q4 === answers[3]) {
  //   score++;
  // }
  // if (q5 === answers[4]) {
  //   score++;
  // }

  // Usign loop to decrease lines of code
  for (var i = 1; i <= totalNumberOfQuestions; i++) {
    if (eval("q" + i) === answers[i - 1]) {
      score++;
    }
  }


  // Display results on to the page
  var results = document.getElementById("quiz-results");
  results.innerHTML = "<h3>You scored <span>" + score + "</span> out of <span>" + totalNumberOfQuestions + "</h3>";

  alert("You scored " + score + " out of " + totalNumberOfQuestions);

  return false;
  // prevents form submission, but we are catching the form submission instead, inside this function
}