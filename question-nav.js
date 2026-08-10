const renderBeforeQuestionNav=render;
const furthestQuestion={quest:0,chase:0,mystery:0};
let reviewMode=false;

function addQuestionNavigation(){
  furthestQuestion[game]=Math.max(furthestQuestion[game],q);
  document.querySelector('#questionNavigator')?.remove();
  const nav=document.createElement('div');
  nav.id='questionNavigator';
  nav.className='question-navigator';
  nav.innerHTML=`<span>${reviewMode?'REVIEW':'QUESTIONS'}</span>${games[game].map((_,index)=>`<button data-question="${index}" class="${index===q?'current':''}" ${index>furthestQuestion[game]?'disabled':''}>${index+1}</button>`).join('')}`;
  document.querySelector('#playScreen').prepend(nav);
  nav.querySelectorAll('button').forEach(button=>button.onclick=()=>{
    const target=Number(button.dataset.question);
    reviewMode=target<furthestQuestion[game];
    q=target;
    render();
  });
  if(reviewMode){
    document.querySelectorAll('#answers button,#answers input').forEach(control=>control.disabled=true);
    $('#nextQuestion').style.display='none';
    $('#feedback').textContent='Review mode — choose your latest question above to continue.';
    $('#feedback').className='feedback review-note';
  }
}

render=function(){renderBeforeQuestionNav();setTimeout(addQuestionNavigation)};
document.querySelectorAll('.game-card').forEach(card=>card.addEventListener('click',()=>{reviewMode=false;furthestQuestion[card.dataset.game]=0}));
