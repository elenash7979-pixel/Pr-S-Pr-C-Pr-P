const finishWithJourneyReturn=finish;
finish=function(){
  finishWithJourneyReturn();
  const missionPassed=correct===games[game].length;
  const hasMoreGames=state.owned.length<3;
  if(missionPassed&&hasMoreGames){
    document.querySelector('#resultAction').onclick=()=>{
      music(false);
      dialog.close();
      document.querySelector('#games').scrollIntoView({behavior:'smooth',block:'center'});
      setTimeout(()=>{
        const nextCard=document.querySelector(`[data-game="${order[Math.min(order.indexOf(game)+1,2)]}"]`);
        nextCard.classList.add('newly-unlocked');
        setTimeout(()=>nextCard.classList.remove('newly-unlocked'),1800);
      },500);
    };
  }
};
