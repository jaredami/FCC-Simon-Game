var greenSound = new Audio(
  "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
);
var redSound = new Audio(
  "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"
);
var yellowSound = new Audio(
  "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"
);
var blueSound = new Audio(
  "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
);
var colors = $(".quarterCircle");
var computerSequence = [];
var playerSequence = [];
var soFarSoGood = true;
var stepCounter = 1;
var guessCounter = 0;
var colorFlashTime = 500;
var timeBetweenColorFlashes = 800;
var strictOn = false;

/* -----------color play functions----------------*/
function greenPlay() {
  greenSound.play();
  $("#green").css("background-color", "#00ff73");
  setTimeout(function() {
    $("#green").css("background-color", "#00A74B");
  }, colorFlashTime);
}
function redPlay() {
  redSound.play();
  $("#red").css("background-color", "#e91620");
  setTimeout(function() {
    $("#red").css("background-color", "#9F0F17");
  }, colorFlashTime);
}
function yellowPlay() {
  yellowSound.play();
  $("#yellow").css("background-color", "#f8d53a");
  setTimeout(function() {
    $("#yellow").css("background-color", "#CCA707");
  }, colorFlashTime);
}
function bluePlay() {
  blueSound.play();
  $("#blue").css("background-color", "#127ced");
  setTimeout(function() {
    $("#blue").css("background-color", "#0B4A8F");
  }, colorFlashTime);
}
function allPlay() {
  greenPlay();
  setTimeout(redPlay, 100);
  setTimeout(bluePlay, 200);
  setTimeout(yellowPlay, 300);
}

/* -------------start function--------------*/
function start() {
  $("#stepCounterDisplay").text(1);
  stepCounter = 1;
  guessCounter = 0;
  soFarSoGood = true;
  computerSequence = [];
  var randomColor = colors.eq([Math.floor(Math.random() * colors.length)]);
  computerSequence.push(randomColor.attr("id"));
  console.log(computerSequence);
  if (randomColor.attr("id") == "green") {
    greenPlay();
    console.log("green");
  } else if (randomColor.attr("id") == "red") {
    redPlay();
    console.log("red");
  } else if (randomColor.attr("id") == "yellow") {
    yellowPlay();
    console.log("yellow");
  } else if (randomColor.attr("id") == "blue") {
    bluePlay();
    console.log("blue");
  }
  $(".quarterCircle").prop("disabled", false);
}

/* ------------adding one step to sequence--------------*/
function addOneStepToSequence() {
  if (stepCounter == 21) { // check for game completed
    $("#stepCounterDisplay").text("W");
    allPlay();
    setTimeout(allPlay, 400);
    setTimeout(start, 3000);
  } else {
    guessCounter = 0;
    $("#stepCounterDisplay").text(stepCounter);
    var randomColor = colors.eq([Math.floor(Math.random() * colors.length)]);
    computerSequence.push(randomColor.attr("id"));
    console.log(computerSequence); // for testing
    playSequence();
  }
}

/* -------------playing the sequence--------------*/
function playSequence() {
  setTimeBetweenColorFlashes();
  $(".quarterCircle").prop("disabled", true);
  var i = 0;
  function playOneStep() {
    if (computerSequence[i] == "green") {
      greenPlay();
    } else if (computerSequence[i] == "red") {
      redPlay();
    } else if (computerSequence[i] == "yellow") {
      yellowPlay();
    } else if (computerSequence[i] == "blue") {
      bluePlay();
    }
    i++;
    if (i < computerSequence.length) {
      setTimeout(playOneStep, timeBetweenColorFlashes);
    }
  }
  playOneStep();
  soFarSoGood = true;
  guessCounter = 0;
  // disable buttons while sequence is playing
  setTimeout(function() {
    $(".quarterCircle").prop("disabled", false);
  }, timeBetweenColorFlashes * computerSequence.length);
}

/* ------------checking the player's choice--------------*/
function checkPlayerChoice(playerChoice) {
  console.log(guessCounter, stepCounter); // for testing
  // if player got the sequence correct, add one step to sequence
  if (playerChoice == computerSequence[guessCounter]) {
    soFarSoGood = true;
    if (guessCounter == stepCounter - 1) {
      stepCounter++;
      setTimeout(addOneStepToSequence, 2000);
    }
    // if play got the sequence wrong...
  } else if (playerChoice !== computerSequence[guessCounter]) {
    soFarSoGood = false;
    $("#stepCounterDisplay").text("!!");
    if (strictOn == false) {
      setTimeout(function() {
        playSequence();
        $("#stepCounterDisplay").text(stepCounter);
      }, 2000);
    } else if (strictOn == true) {
      stepCounter = 1;
      setTimeout(function() {
        start();
        $("#stepCounterDisplay").text(1);
      }, 2000);
    }
    $(".quarterCircle").prop("disabled", true);
  }
  console.log(soFarSoGood);
}

/* ---------speed up sequence as steps increase------------*/
function setTimeBetweenColorFlashes() {
  if (stepCounter < 5) {
    timeBetweenColorFlashes = 800;
  } else if (stepCounter < 10) {
    timeBetweenColorFlashes = 700;
  } else if (stepCounter < 15) {
    timeBetweenColorFlashes = 600;
  } else if (stepCounter < 20) {
    timeBetweenColorFlashes = 500;
  }
}

/* ----------doc ready, button click events-----------*/
$(document).ready(function() {
  $(".quarterCircle").prop("disabled", true);
  $("#green").click(function() {
    if (soFarSoGood == true) {
      greenPlay();
      checkPlayerChoice("green");
      guessCounter++;
    }
  });
  $("#red").click(function() {
    if (soFarSoGood == true) {
      redPlay();
      checkPlayerChoice("red");
      guessCounter++;
    }
  });
  $("#yellow").click(function() {
    if (soFarSoGood == true) {
      yellowPlay();
      checkPlayerChoice("yellow");
      guessCounter++;
    }
  });
  $("#blue").click(function() {
    if (soFarSoGood == true) {
      bluePlay();
      checkPlayerChoice("blue");
      guessCounter++;
    }
  });
  $("#startButton").click(function() {
//    allPlay();
    start();
  });
  $("#strictButton").click(function() {
    if (strictOn == false) {
      strictOn = true;
      $("#strictIndicator").css("background-color", "green");
    } else if (strictOn == true) {
      strictOn = false;
      $("#strictIndicator").css("background-color", "gray");
    }
  });
});