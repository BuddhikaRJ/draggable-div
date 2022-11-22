import styles from "./styles.css";

document.addEventListener('DOMContentLoaded',init);

let isDragging = false;
let draggable = null;
let parent = null;
let initX, initY;

let parentRect, draggableRect;

function init(){

    draggable = document.getElementById("child");
    parent = document.getElementById("parent");

    draggable.addEventListener('mousedown', onClick);
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', onDrop);
}

function onClick(event) {
    event.preventDefault();
  isDragging = true;
  initX = event.offsetX;
  initY = event.offsetY;

  parentRect = parent.getBoundingClientRect();
  draggableRect = draggable.getBoundingClientRect();
}

function onDrag(event) {
  if (isDragging === false) return;

  let x = event.clientX - initX;
  let y = event.clientY - initY;

  x = clampPostion(x , parentRect.left, parentRect.right - draggableRect.width);
  y = clampPostion(y , parentRect.top, parentRect.bottom - draggableRect.height);

  
  draggable.style.left = x + "px";
  draggable.style.top = y + "px";
}

function onDrop() {
  isDragging = false;
}

function clampPostion(value, min, max){
    if(value > max) return max;
    else if(value < min)return min;
    else return value;
}