let boxes = document.querySelectorAll(".box");
let resetBt = document.querySelector("#reset-button");
let turnO = true; //playerX, playerO
let newBt = document.querySelector("#new-button");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

let count = 0;
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            box.innerText = "O";
            turnO = false;
            count++;
            addColor(box);
        } else {
            box.innerText= "X";
            turnO = true;
            count++;
            addColor(box);
        }
        box.disabled = true;
        checkWinner();
        checkDraw(count);
    });
});
 let addColor = (box) => {
    let color = (box.innerText === "X") ? "#e5eaf5" : "#a28089";
    box.style.color = color;
 }

const checkWinner = () => {
    for(let pattern of winPatterns){
        // console.log(pattern[0], pattern[1], pattern[2]);
        // console.log(boxes[pattern[0]], boxes[pattern[1]], boxes[pattern[2]]);
        let val1 =boxes[pattern[0]].innerText;
        let val2 = boxes[pattern[1]].innerText;
        let val3 = boxes[pattern[2]].innerText;
        if(val1 != "" && val2 != "" && val3 != "" ){
            if(val1 === val2 && val2 === val3) {
                // console.log("winner", val1);
                showWinner(val1);
            }
        }
    }
}

const checkDraw = (count) => {
    if(count === 9) {
        showResult("Draw");
    }
}

const showResult = (result) => {
    msg.innerText = `The match is a ${result}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
} 

const disabledBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enabledBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const resetGame = () => {
    turnO = true;
    count = 0;
    enabledBoxes();
    msgContainer.classList.add("hide"); 
}

newBt.addEventListener("click", resetGame);
resetBt.addEventListener("click", resetGame);