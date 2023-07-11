const get = (param) => document.querySelector(`.${param}`);
const boxes = document.querySelectorAll('.box');
const gameInfo = get("gameInfo");
const newGameBtn = get("btn");

let currentPlayer;
let gameGird;
const winPosition = [
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
];

function initGame(){
    currentPlayer = "X";
    gameGird = ["","","","","","","","",""];
    boxes.forEach((box,index)=>{
        box.innerText = "";
        box.style.pointerEvents ="all";
        box.classList.remove('win');
    })
    newGameBtn.classList.remove('active');
    gameInfo.textContent =`Current Player -${currentPlayer}`
}
initGame();

function swapTurn(){
    if(currentPlayer === 'X'){
        currentPlayer = 'O';
    }
    else{
        currentPlayer = 'X';
    }
    gameInfo.textContent =`Current Player - ${currentPlayer}`
}
function checkWin(){
    let answer = "";
    winPosition.forEach((index)=>{
        if((gameGird[index[0]] !== "" || gameGird[index[1]] !== "" || gameGird[index[2]] !== "") &&((gameGird[index[0]] === gameGird[index[1]])  && (gameGird[index[1]] === gameGird[index[2]]))){
            if(gameGird[index[0]] === 'O'){
                answer  = "O"
            }
            else{
                answer  = "X"
            }
            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";
            })
            boxes[index[0]].classList.add('win');
            boxes[index[1]].classList.add('win');
            boxes[index[2]].classList.add('win');
            newGameBtn.classList.add('active');
        }
    })
    if(answer !== ""){
        gameInfo.textContent =`Winner Player - ${answer}` 
        newGameBtn.classList.add('active'); 
    }
    let fillcount = 0;
    gameGird.forEach((box)=>{
        if(box !== ""){
            fillcount++;
        }
    })
    if(fillcount == 9){
        gameInfo.textContent =`Tied !`
        newGameBtn.classList.add('active');
    }
}
function handleClick(index){
    if(gameGird[index] === ""){
        boxes[index].innerText = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        gameGird[index] = currentPlayer;
        swapTurn();
        checkWin();
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener('click',()=>{
        handleClick(index);
    });
})

newGameBtn.addEventListener('click',()=>{
    initGame();
})