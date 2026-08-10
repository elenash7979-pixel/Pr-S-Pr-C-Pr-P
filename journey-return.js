const finishWithJourneyReturn=finish;
finish=function(){
  finishWithJourneyReturn();
  const missionPassed=correct===games[game].length;
  if(!missionPassed)return;
  const routes={quest:{label:'GAME 2 · CHASE →',next:'chase'},chase:{label:'GAME 3 · MYSTERY →',next:'mystery'}};
  const route=routes[game];
  if(!route)return;
  const action=document.querySelector('#resultAction');
  action.textContent=route.label;
  action.onclick=()=>{
    music(false);
    dialog.close();
    document.querySelector('#games').scrollIntoView({behavior:'smooth',block:'center'});
    setTimeout(()=>{
      const nextCard=document.querySelector(`[data-game="${route.next}"]`);
      nextCard.classList.add('newly-unlocked');
      nextCard.focus({preventScroll:true});
      setTimeout(()=>nextCard.classList.remove('newly-unlocked'),1800);
    },500);
  };
};
