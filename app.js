let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let pvpBtn = document.querySelector("#pvp-btn");
let pvcBtn = document.querySelector("#pvc-btn");

let playerOScoreElem = document.querySelector("#player-o-score");
let playerXScoreElem = document.querySelector("#player-x-score");
let tieScoreElem = document.querySelector("#tie-score");

let turn0 = true; // player O
let isPvP = true; // default mode is Player vs Player

let playerOScore = 0;
let playerXScore = 0;
let tieScore = 0;

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

const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

const computerMove = () => {
    let emptyBoxes = [];
    boxes.forEach((box, index) => {
        if (box.innerText === "") {
            emptyBoxes.push(index);
        }
    });

    if (emptyBoxes.length > 0) {
        let randomIndex = Math.floor(Math.random() * emptyBoxes.length);
        boxes[emptyBoxes[randomIndex]].innerText = "x";
        boxes[emptyBoxes[randomIndex]].disabled = true;
        turn0 = true;
        checkWinner();
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (isPvP || turn0) {
            if (turn0) { // player O
                box.innerText = "o";
                turn0 = false;
            } else { // player X
                box.innerText = "x";
                turn0 = true;
            }
            box.disabled = true;
            checkWinner();
            if (!isPvP && !turn0) {
                computerMove();
            }
        }
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    if (winner === "o") {
        playerOScore++;
        playerOScoreElem.innerText = playerOScore;
    } else if (winner === "x") {
        playerXScore++;
        playerXScoreElem.innerText = playerXScore;
    } else {
        tieScore++;
        tieScoreElem.innerText = tieScore;
    }
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    let winner = null;
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        let pos1Val = boxes[a].innerText;
        let pos2Val = boxes[b].innerText;
        let pos3Val = boxes[c].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            winner = pos1Val;
            break;
        }
    }
    if (winner) {
        showWinner(winner);
    } else if (Array.from(boxes).every(box => box.innerText !== "")) {
        showWinner("No one. It's a tie!");
    }
};

pvpBtn.addEventListener("click", () => {
    isPvP = true;
    resetGame();
});

pvcBtn.addEventListener("click", () => {
    isPvP = false;
    resetGame();
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
