var gamePattern = [];
var userClickedPattern = [];
var started = false;
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;

//Play Sound
function playSound(color){
  var audio = new Audio("sounds/"+color+".mp3");
  audio.play();
}

function animatePress(element_id){
  $("#"+element_id).addClass("pressed");
  setTimeout(function(){
    $("#"+element_id).removeClass("pressed");
  }, 100);
}

function startOver(){
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;
}

function nextSequence(){
  var sequence = [];
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  level+=1;
  $("#level-title").text("Level "+level);
  animatePress(randomChosenColor);
  playSound(randomChosenColor);
}
function checkAnswer(currentLevel){
  //if (userClickedPattern[currentLevel-1]===gamePattern[currentLevel-1]){
    var flag = 0;
    for (var i=0; i<gamePattern.length;i++){
      if(gamePattern[i]===userClickedPattern[i]){
        flag = 0;
      }
      else {
        flag = 1;
        break;
      }
    }
    if(flag===0){
    setTimeout(nextSequence, 1000);
    userClickedPattern = [];
  }
  //}
  else{
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").html("Game Over :( <br>Press any key to start a new game.");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    setTimeout(startOver(), 500);
  }
}


$(".btn").on("click",function(){
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  if (level===userClickedPattern.length){
    checkAnswer(level);
  }
  playSound(userChosenColour);
  animatePress(userChosenColour);
});

$(document).keypress(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});
