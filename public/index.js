
var buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {

    userClickedPattern = [];
    levels();

    // generate randomNumbers and push values of buttoncolor array to gamePattern array 
    var randomNumber = Math.floor(Math.random() * 4);
    var selectedColor = buttonColor[randomNumber];
    gamePattern.push(selectedColor);
    console.log(gamePattern);

    // create flash animation and sound accourdingly and its run randomly
    $("#" + selectedColor).fadeOut(100).fadeIn(100,);
    playSound(selectedColor);


}

function levels() {
    $("h1").html("level " + level);
    level++;
}

// to start the game we need key to be pressed , user intaction 
let gameStart = false;
$(document).on("keypress", function () {
    if (!gameStart) {
        levels();
        nextSequence();
        gameStart = true;
    }
});

// if any button get clicked it will gets the button id and push it in array 
$(".btn").on("click", function () {
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animateButton(userChosenColour); // Run the animation
    var lastIndex = userClickedPattern.length - 1;
    checkAnswer(lastIndex);
});


function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    }
    else {
        console.log("failed");
        $("h1").html("Game Over, Press Any Key to Restart");
        level = 0;
        gamePattern = [];
        gameStart = false;
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function () { 
            $("body").removeClass("game-over")
        },200);
        
    }
}


// if any button get clicked it will make sound accoudingly 
function playSound(name) {
    var audioFile = "sounds/" + name + ".mp3";
    var audio = new Audio(audioFile);
    audio.play().catch(function (error) {
        console.log("Audio play was prevented: " + error);
    });
}


// if any button get click it will blink a animation 
function animateButton(name) {
    if (!$("#" + name).is(":animated")) { // Check if the animation is already running
        $("#" + name).addClass("pressed");
        setTimeout(function () {
            $("#" + name).removeClass("pressed");
        }, 100);
    }
}





