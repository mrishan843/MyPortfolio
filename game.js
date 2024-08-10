var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level=0;
var n;
var started = false;
var h = 0;

$(document).keydown(function(){
  if(!started){ 
    $("h1").text("Level "+level);
    nextSequence();
    started = true;
  }
});


$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  n = userClickedPattern.length - 1;
  makeSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(n);
});


function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColor);
}


function animatePress(currentColor){
  var activeButton = $("#"+currentColor);
  activeButton.addClass("pressed");
  setTimeout(function(){
    activeButton.removeClass("pressed")
  }, 100);
}



function makeSound(key){
    switch (key) {
        case 'red':
          var audio1 = new Audio("./sounds/red.mp3");
          audio1.play();
        break;
        case 'blue':
          var audio2 = new Audio("./sounds/blue.mp3");
          audio2.play();
        break;
        case 'green':
          var audio3 = new Audio("./sounds/green.mp3");
          audio3.play();
        break;
        case 'yellow':
          var audio4 = new Audio("./sounds/yellow.mp3");
          audio4.play();
        break;
        default:
            console.log();
    }
}  


function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout('nextSequence()',1000);
    }
  }
    
    
 
  else{
    console.log("wrong");
    var wrongButton = $("body");
    wrongButton.addClass("game-over");
    setTimeout(function(){
      wrongButton.removeClass("game-over")
    }, 200);
    var audio5 = new Audio("./sounds/wrong.mp3");
    audio5.play();
    $("h1").text("Game Over, Press Any Key to Restart");
    
    if(gamePattern.length > h){
      h = gamePattern.length;
      $("h2").text("High Score: "+gamePattern.length);
    }
    startOver();
  }

}


function startOver(){
  level=0;
  gamePattern=[];
  started = false;
}




