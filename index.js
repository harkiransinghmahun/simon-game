var randomButtonPosition = 0
var sequence = []
var levelCount = 1
var playerSequence = []
var buttonPositionNo = {
  "green" : 0,
  "red" : 1,
  "yellow": 2,
  "blue": 3
}
var clickedButton = 0

$(document).on("keypress", gameStart)

function gameStart(){
  sequence = []
  playerSequence = []
  levelCount = 1
  computerTurn()
  $(document).off()
  playerTurn()
}

function computerTurn(){
  randomButtonPosition = Math.floor(Math.random()*4)
  $("#level-title").text("Level " + levelCount)
  $(".btn")[randomButtonPosition].classList.add("pressed")
  setTimeout(function(){$(".btn").removeClass("pressed")}, 80)

  var soundId =  $(".btn")[randomButtonPosition].id
  var sound = new Audio("sounds/" + soundId + ".mp3")
  sound.play()

  sequence.push(randomButtonPosition)
  levelCount++
  console.log(sequence)
}


function playerTurn(){
  $(".btn").click(function() {
    var clickedButtonId =  this.id
    $("#" + clickedButtonId).addClass("pressed")
    setTimeout(function() {$("#" + clickedButtonId).removeClass("pressed")}, 80)

    var sound = new Audio("sounds/" + clickedButtonId + ".mp3")
    sound.play()
    playerSequence.push(buttonPositionNo[clickedButtonId])

    if (sequence.length === playerSequence.length){
        if (sequence[sequence.length-1] !== playerSequence[sequence.length-1]){
          $("body").css("background-color", "red")
          var wrongSound = new Audio("sounds/wrong.mp3")
          wrongSound.play()
          setTimeout(function(){$("body").css("background-color", "#011F3F")}, 80)
          $("#level-title").text("Game Over, press a key to start again")
          $(".btn").off()
          $(document).on("keypress", gameStart)
        }else{
          playerSequence = []
          setTimeout(function() {computerTurn()}, 1000)
        }
      }else if(playerSequence.length < sequence.length){
      for(i=0; i<playerSequence.length; i++){
        if (sequence[i] !== playerSequence[i]){
          $("body").css("background-color", "red")
          var wrongSound = new Audio("sounds/wrong.mp3")
          wrongSound.play()
          setTimeout(function(){$("body").css("background-color", "#011F3F")}, 80)
          $("#level-title").text("Game Over, press a key to start again")
          $(".btn").off()
          $(document).on("keypress", gameStart)
        }
      }
    }
    })
  }
