const roomLuna=document.querySelector('.cat-face');
roomLuna.innerHTML='<img class="room-luna-sprite" src="assets/luna-walk.png" alt="Luna, a black cat in a purple cape">';
const lunaDropZone=document.querySelector('.luna-avatar');
const shelfDropZone=document.querySelector('.shelf-items');
let draggedItem='';

function setDraggedItem(item,element,event){
  draggedItem=item;
  element.classList.add('dragging');
  event.dataTransfer.effectAllowed='move';
  event.dataTransfer.setData('text/plain',item);
}

function equipRoomItem(item){
  if(!state.owned.includes(item))return;
  state.equipped=[...new Set([...state.equipped,item])];
  save();
  renderRoom();
  tone(680);
}

function shelveRoomItem(item){
  state.equipped=state.equipped.filter(value=>value!==item);
  save();
  renderRoom();
  tone(440);
}

document.querySelectorAll('[data-item]').forEach(element=>{
  element.draggable=true;
  element.addEventListener('dragstart',event=>setDraggedItem(element.dataset.item,element,event));
  element.addEventListener('dragend',()=>element.classList.remove('dragging'));
});

document.querySelectorAll('[data-wear]').forEach(element=>{
  element.draggable=true;
  element.setAttribute('role','button');
  element.setAttribute('aria-label','Drag this item back to the shelf');
  element.addEventListener('dragstart',event=>setDraggedItem(element.dataset.wear,element,event));
  element.addEventListener('dragend',()=>element.classList.remove('dragging'));
});

[[lunaDropZone,equipRoomItem],[shelfDropZone,shelveRoomItem]].forEach(([zone,action])=>{
  zone.addEventListener('dragover',event=>{event.preventDefault();zone.classList.add('drag-over')});
  zone.addEventListener('dragleave',()=>zone.classList.remove('drag-over'));
  zone.addEventListener('drop',event=>{
    event.preventDefault();
    zone.classList.remove('drag-over');
    action(event.dataTransfer.getData('text/plain')||draggedItem);
  });
});

document.querySelector('#roomHint').textContent='Drag an item onto Luna, or drag it back to the shelf. You can also click it.';
