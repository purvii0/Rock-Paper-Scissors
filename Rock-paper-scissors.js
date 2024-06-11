let score =  JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses:0,
  ties:0
};

// if(!score) {
//   score ={
//     wins: 0,
//     losses:0,
//     ties:0
//   };
//}

updateScoreOnPage()

document.querySelector('.js-rock-button').addEventListener('click',()=>{
  playGame('rock');
});
document.querySelector('.js-paper-button').addEventListener('click',()=>{
  playGame('paper');
});
document.querySelector('.js-scissors-button').addEventListener('click',()=>{
  playGame('scissors');
});

document.querySelector('.js-reset-score-button').addEventListener('click',()=>{
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');  
  updateScoreOnPage(); 
});

document.querySelector('.js-auto-play-button').addEventListener('click',()=>{
  autoPlay();
});

document.body.addEventListener('keyDown',(event)=>{
  if(event.key==='r'){
    playGame('rock');
  }
  else if(event.key==='p'){
    playGame('paper');
  }
  else if (event.key==='s'){
    playGame('scissors');
  }
});


function playGame(playerMove){
const computerMove = pickComputerMove();

let result ='';

if(playerMove === 'scissors'){
    if(computerMove === 'rock'){
    result = 'You lose';
  }
  else if(computerMove === 'paper'){
    result = 'You win';
  }
  else if(computerMove === 'scissors'){
    result = 'Tie';
  }
}

else if(playerMove === 'paper'){
      if(computerMove === 'rock'){
    result = 'You win';
  }
  else if(computerMove === 'paper'){
    result = 'Tie';
  }
  else if(computerMove === 'scissors'){
    result = 'You lose';
  }
}

else if(playerMove === 'rock'){
    if(computerMove === 'rock'){
    result = 'Tie';
  }
  else if(computerMove === 'paper'){
    result = 'You lose';
  }
  else if(computerMove === 'scissors'){
    result = 'You win';
  }
}

if(result === 'You win'){
  score.wins++;
}
else if(result === 'You lose'){
  score.losses++;
}
else if(result === 'Tie'){
  score.ties++;
}

updateScoreOnPage();    
localStorage.setItem('score', JSON.stringify(score));

// alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}. 
// Wins: ${score.wins}, Losses: ${score.losses}, Tie: ${score.ties}`);

document.querySelector('.js-result').innerHTML=`${result}`;
document.querySelector('.js-moves').innerHTML=`You <img class="move-icon" src="./images /${playerMove}-emoji.png" >  Computer <img class="move-icon" src="./images /${computerMove}-emoji.png" > `;


}

function updateScoreOnPage(){
document.querySelector('.js-score').innerHTML=`Wins: ${score.wins}, Losses: ${score.losses}, Tie: ${score.ties}`;
}



function pickComputerMove() {
const randomNumber = Math.random();
let computerMove ='';

if(randomNumber >= 0 && randomNumber < 1/3){
  computerMove = 'rock';  
}
else if(randomNumber >= 1/3 && randomNumber < 2/3){
  computerMove = 'paper';  
}
else if(randomNumber >= 2/3 && randomNumber < 1){
  computerMove = 'scissors';  
}

return computerMove;
}

let isAutoPlaying = false;
let intervalId ;

function autoPlay(){
  if(!isAutoPlaying){
    intervalId = setInterval(() => {
      const playerMove=pickComputerMove();
      playGame(playerMove);
    },1000)
    isAutoPlaying=true;
  }
  else{
    clearInterval(intervalId);
    isAutoPlaying=false;
  }
  
}