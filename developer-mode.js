const developerButton=document.createElement('button');
developerButton.id='developerMode';
developerButton.className='developer-toggle';
developerButton.type='button';
developerButton.title='Unlock all games for testing';
document.querySelector('.actions').prepend(developerButton);
let developerMode=localStorage.getItem('lunaDeveloperMode')==='true';

function normalUnlockedLevel(){
  if(state.owned.includes('board'))return 3;
  if(state.owned.includes('brooch'))return 2;
  return 1;
}

function applyDeveloperMode(showMessage=false){
  state.unlocked=developerMode?3:normalUnlockedLevel();
  document.body.classList.toggle('developer-active',developerMode);
  developerButton.innerHTML=developerMode?'<span>⚙</span> DEV ON':'<span>⚙</span> DEV';
  developerButton.setAttribute('aria-pressed',String(developerMode));
  developerButton.setAttribute('aria-label',developerMode?'Disable developer mode':'Enable developer mode');
  localStorage.setItem('lunaDeveloperMode',String(developerMode));
  save();
  if(showMessage)toast(developerMode?'Developer mode: all games unlocked':'Developer mode off: normal progress restored');
}

developerButton.onclick=()=>{
  developerMode=!developerMode;
  applyDeveloperMode(true);
};

applyDeveloperMode();
