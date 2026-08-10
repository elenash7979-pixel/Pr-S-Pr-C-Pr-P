const renderBeforeTypingGame=render;

function renderTypingGame(){
  const task=games.mystery[q];
  const cat=$('#lunaPlayer');
  cat.className='luna-walker';
  cat.style.setProperty('--target','50%');
  $('#gameRoom').className='game-room room-mystery typing-room';
  $('#lunaThought').textContent='I will type the clue!';
  $('#questionNumber').textContent=`CLUE ${q+1} OF ${games.mystery.length}`;
  $('#sentence').textContent=task[0];
  $('#questionBar').style.width=`${q/games.mystery.length*100}%`;
  $('#correctCount').textContent=`${correct}/5`;
  $('#runGems').textContent=correct;
  $('#streak').textContent=streak;
  $('#feedback').textContent='';
  $('#feedback').className='feedback';
  $('#combo').textContent='';
  $('#nextQuestion').style.display='none';
  const answers=$('#answers');
  answers.className='answers typing-zone';
  answers.innerHTML=`
    <div class="suggestion-title">Choose one clue and type it yourself:</div>
    <div class="typing-suggestions">${task[1].map(value=>`<span>${value}</span>`).join('')}</div>
    <form class="typing-form" id="typingForm">
      <label for="typedAnswer">Your answer</label>
      <div><input id="typedAnswer" type="text" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="Type the correct words…"><button type="submit">Check answer</button></div>
    </form>`;
  const form=$('#typingForm');
  const input=$('#typedAnswer');
  form.onsubmit=event=>{
    event.preventDefault();
    if(!input.value.trim()){
      input.classList.add('needs-answer');
      input.focus();
      return;
    }
    checkTypedAnswer(task,input,form.querySelector('button'));
  };
  setTimeout(()=>input.focus(),250);
}

function checkTypedAnswer(task,input,submitButton){
  const expected=task[1][task[2]];
  const typed=input.value.trim().replace(/\s+/g,' ');
  const isCorrect=typed.toLocaleLowerCase('en')===expected.toLocaleLowerCase('en');
  state.answered++;
  input.disabled=true;
  submitButton.disabled=true;
  input.classList.remove('needs-answer');
  input.classList.add(isCorrect?'typed-correct':'typed-wrong');
  const cat=$('#lunaPlayer');
  cat.classList.add('walking');
  if(isCorrect){
    correct++;
    score+=100+streak*25;
    streak++;
    cat.classList.add('happy');
    $('#lunaThought').textContent='Mystery solved!';
    $('#feedback').textContent=`Correct! ${task[3]}`;
    $('#feedback').classList.add('good');
    if(streak>=2)$('#combo').textContent=`${streak}× PERFECT COMBO!`;
    setTimeout(()=>speak(task[0].replace('___',expected)),650);
    tone(660);
    setTimeout(()=>tone(880,.18),90);
  }else{
    streak=0;
    cat.classList.add('sad');
    $('#lunaThought').textContent='That clue does not fit.';
    $('#feedback').textContent=`Not quite. The correct answer is “${expected}”. ${task[3]}`;
    $('#feedback').classList.add('bad');
    tone(180,.25,'triangle');
  }
  $('#correctCount').textContent=`${correct}/5`;
  $('#runGems').textContent=correct;
  $('#streak').textContent=streak;
  $('#nextQuestion').style.display='flex';
  save();
}

render=function(){
  if(game==='mystery')renderTypingGame();
  else renderBeforeTypingGame();
};
