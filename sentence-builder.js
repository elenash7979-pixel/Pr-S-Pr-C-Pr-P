const regularQuestionRender=render;
const chaseSentences=[
  'Quick! The time thief is running away!',
  'Leo rides his hoverboard every weekend.',
  'They have passed two checkpoints already.',
  'Watch out! A drone is flying towards us.',
  'The team has never lost the race.'
];

function shuffledWords(words,seed){
  const result=words.map((word,index)=>({word,index}));
  for(let i=result.length-1;i>0;i--){
    const j=(seed*7+i*3+1)%(i+1);
    [result[i],result[j]]=[result[j],result[i]];
  }
  if(result.every((item,index)=>item.index===index))result.push(result.shift());
  return result;
}

function renderSentenceBuilder(){
  const sentence=chaseSentences[q];
  const words=sentence.split(' ');
  const shuffled=shuffledWords(words,q+3);
  const chosen=[];
  const cat=$('#lunaPlayer');
  cat.className='luna-walker';
  cat.style.setProperty('--target','50%');
  $('#gameRoom').className='game-room room-chase builder-room';
  $('#lunaThought').textContent='Let me build it!';
  $('#questionNumber').textContent=`SENTENCE ${q+1} OF ${games.chase.length}`;
  $('#sentence').textContent='Build the sentence';
  $('#questionBar').style.width=`${q/games.chase.length*100}%`;
  $('#correctCount').textContent=`${correct}/5`;
  $('#runGems').textContent=correct;
  $('#streak').textContent=streak;
  $('#feedback').textContent='';
  $('#feedback').className='feedback';
  $('#combo').textContent='';
  $('#nextQuestion').style.display='none';
  const answers=$('#answers');
  answers.className='answers builder-zone';
  answers.innerHTML='<div class="sentence-line" id="sentenceLine"><span>Tap the words in the correct order</span></div><div class="word-bank" id="wordBank"></div>';
  const bank=$('#wordBank');
  bank.innerHTML=shuffled.map((item,index)=>`<button class="word-token" data-bank="${index}" data-original="${item.index}">${item.word}</button>`).join('');

  bank.querySelectorAll('.word-token').forEach(button=>button.onclick=()=>{
    if(button.disabled)return;
    button.disabled=true;
    button.classList.add('used');
    chosen.push({word:button.textContent,original:Number(button.dataset.original),button});
    $('#sentenceLine').innerHTML=chosen.map((item,index)=>`<button class="placed-word" data-position="${index}">${item.word}</button>`).join('');
    if(chosen.length===words.length)checkBuiltSentence(words,chosen,sentence);
  });
}

function checkBuiltSentence(words,chosen,sentence){
  state.answered++;
  const placed=[...document.querySelectorAll('.placed-word')];
  const allCorrect=chosen.every((item,index)=>item.word===words[index]);
  placed.forEach((word,index)=>word.classList.add(chosen[index].word===words[index]?'word-correct':'word-wrong'));
  const cat=$('#lunaPlayer');
  cat.classList.add('walking');
  if(allCorrect){
    correct++;
    score+=100+streak*25;
    streak++;
    cat.classList.add('happy');
    $('#lunaThought').textContent='Purr-fect sentence!';
    $('#feedback').textContent='Correct! Every word is in the right place.';
    $('#feedback').classList.add('good');
    if(streak>=2)$('#combo').textContent=`${streak}× PERFECT COMBO!`;
    setTimeout(()=>speak(sentence),650);
    tone(660);
    setTimeout(()=>tone(880,.18),90);
  }else{
    streak=0;
    cat.classList.add('sad');
    $('#lunaThought').textContent='Let me try the order again!';
    $('#feedback').textContent=`Not quite. The correct sentence is: ${sentence}`;
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
  if(game==='chase')renderSentenceBuilder();
  else{
    $('#answers').className='answers';
    regularQuestionRender();
  }
};
