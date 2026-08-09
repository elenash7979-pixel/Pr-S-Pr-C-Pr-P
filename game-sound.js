const gameSoundToggle=document.createElement('button');
gameSoundToggle.id='gameSoundToggle';
gameSoundToggle.className='game-sound';
gameSoundToggle.type='button';
gameSoundToggle.title='Game sound';
document.querySelector('.modal-top > div').append(gameSoundToggle);
const gameMusicToggle=document.createElement('button');
gameMusicToggle.id='gameMusicToggle';
gameMusicToggle.className='game-sound music-control';
gameMusicToggle.type='button';
gameMusicToggle.title='Magic background music';
document.querySelector('.modal-top > div').append(gameMusicToggle);
if(typeof state.music==='undefined')state.music=true;

function syncGameSoundButton(){
  gameSoundToggle.textContent=state.sound?'♫ Sound':'🔇 Muted';
  gameSoundToggle.classList.toggle('muted',!state.sound);
  gameSoundToggle.setAttribute('aria-label',state.sound?'Turn game sound off':'Turn game sound on');
  gameMusicToggle.textContent=state.music?'♪ Music':'♩ Music off';
  gameMusicToggle.classList.toggle('muted',!state.music);
  gameMusicToggle.setAttribute('aria-label',state.music?'Turn background music off':'Turn background music on');
}

gameSoundToggle.onclick=()=>{
  state.sound=!state.sound;
  if(state.sound){music();tone(520)}else{music(false)}
  save();
  syncGameSoundButton();
};

gameMusicToggle.onclick=()=>{
  state.music=!state.music;
  state.music?music():music(false);
  save();
  syncGameSoundButton();
};

document.querySelectorAll('.game-card').forEach(card=>card.addEventListener('click',syncGameSoundButton));
document.querySelector('#soundToggle').addEventListener('click',()=>setTimeout(syncGameSoundButton));
syncGameSoundButton();
