const canvas = document.getElementById('js-canvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('js-range');
const mode = document.getElementById('js-mode');
const saveBtn = document.getElementById('js-save');

canvas.width = 700;
canvas.height = 700;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false; 
}

function startPainting(){
    painting = true; 
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        //ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function changeColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function changeRange(event){
    const size = event.target.value;
    ctx.lineWidth  = size;
}

function changeMode(){
    if(filling){
        filling = false;
        mode.innerText = 'FILL';
    }else{
        filling = true;
        mode.innerText = 'PAINTING';
    }
}

function canvasFilling(){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
}

function handleRightClick(event){
    event.preventDefault();
}

function handleSave(){
    const dataURL = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = "my-canvas.png";
    link.click();    
}


if(canvas){
    canvas.addEventListener('mousemove',onMouseMove);
    canvas.addEventListener('mousedown',startPainting);
    canvas.addEventListener('mouseup',stopPainting);
    canvas.addEventListener('mouseleave',stopPainting);
    canvas.addEventListener('click',canvasFilling);
    canvas.addEventListener('contextmenu',handleRightClick);
}

// 컬러를 array로 만들고, forEach로 각각에 적용되도함.
// abcd 대신 이름은 자유롭게 지정 가능 (array 안의 아이템을 지칭하는것뿐) 
Array.from(colors).forEach(abcd => abcd.addEventListener("click",changeColor))



if(range){
    range.addEventListener('input',changeRange)
}

if(mode){
    mode.addEventListener('click',changeMode)
}

if(saveBtn){
    saveBtn.addEventListener('click',handleSave)
}