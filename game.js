var buttonColours = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

// Start the game with a keypress
$(document).one("keypress", function() {
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Function to generate the next color in the sequence
function nextSequence() {
  userClickedPattern = []; // Reset the user's click pattern for the new level
  level++;
  $("h1").text("Level " + level);

  var randomChosenColor = buttonColours[Math.floor(Math.random() * 4)];
  gamePattern.push(randomChosenColor);

  // Animate the button for the next color in the sequence
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

// Function to play sound based on the button's color
function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

// Function to animate when a user clicks a button
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Event listener for button clicks
$(".btn").on("click", function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  // Check the user's input after each click
  checkAnswer(userClickedPattern.length - 1);
});

// Function to check the user's answer against the game pattern
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");

    // If user completed the current level, generate the next sequence
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver(); // Restart the game if the user clicks the wrong sequence
  }
}

// Function to reset the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;

  // Listen again for a keypress to start the game
  $(document).one("keypress", function() {
    if (!started) {
      $("h1").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
}
