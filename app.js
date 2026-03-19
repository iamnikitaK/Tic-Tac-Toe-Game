let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let newBtn=document.querySelector("#new-btn");
let msg=document.querySelector("#msg");
let msgcontainer=document.querySelector(".msg-container");
let count=0;

let turnO=true;//playerX , playerO

const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        count++;
        if(turnO){//playerO turn
            box.innerText="O"; 
            turnO=false;
        }
        else{//playerX turn
            box.innerText="X";
            turnO=true;
        }
        box.disabled=true;
        checkWinner();
    });
});

const draw=()=>{
    msg.innerText="It is a Draw";
    msgcontainer.classList.remove("hide");
    disable();
}
const disable=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
const showWinner=(winner)=>{
    disable();
    msg.innerText=`Congratulations , Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    
};

const enable=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}
const resetGame=()=>{
    count=0;
    turnO=true;
    enable();
    msgcontainer.classList.add("hide");
}

newBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);
const checkWinner=()=>{
    let winnerFound=false;
    for(let pattern of winPatterns){
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;
        if(pos1Val!=""&& pos2Val!="" && pos3Val!=""){
           if(pos1Val === pos2Val && pos2Val === pos3Val){
             winnerFound=true;
             setTimeout( ()=>{showWinner(pos1Val)},1000);
             
           }
           if (!winnerFound && count === 9) {
            setTimeout(draw, 300);
           }
           
      }
    }
};