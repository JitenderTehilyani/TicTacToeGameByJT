// access box of html
let boxes = document.querySelectorAll(".box");
// access reset button
let resetBtn = document.querySelector("#reset-btn");
// access new game button
let newGameBtn = document.querySelector("#new-btn");
// access container of msg
let msgContainer = document.querySelector(".msg-container");
// access msg
let msg = document.querySelector("#msg");

let turnO = true; //playerX, playerO
let count = 0; //To Track Draw

// winning patterns
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Function for reset/new game button
const resetGame = () => {
  turnO = true;
  count = 0;
  // enable all boxes for new game
  enableBoxes();
  msgContainer.classList.add("hide");
};

// Print X/O on click of box
boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (!box.innerText) { // Only proceed if the box is empty
      if (turnO) {
        //playerO
        box.innerText = "O";
        // now playerX
        turnO = false;
      } else {
        //playerX
        box.innerText = "X";
        // now playerO
        turnO = true;
      }
      // Once clicked on box the box value won't change
      box.disabled = true;
      count++;

      // Pushing the index of the clicked box into the moves array
      moves.push(index);

      // Checking winner
      let isWinner = checkWinner();

      if (count === 9 && !isWinner) {
        gameDraw();
      }
    }
  });
});


const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  // Disable all boxes after winning
  disableBoxes();
};

// Function to Disable all boxes after winning
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// Function to enable all boxes for new game
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

// Function for showing winner
const showWinner = (winner) => {
  // msg for winner
  msg.innerText = `Congratulations, Winner is ${winner}`;
  // Shows msg conatiner
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Function to check the winner
const checkWinner = () => {

  // getting each pattern
  for (let pattern of winPatterns) {
    // Value of each box
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    // Checking that box is not empty
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {

      // Checking the box value is same or not to show winner
      if (pos1Val === pos2Val && pos2Val === pos3Val) {

        // Showing who won
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

// Button to reset game for new game
newGameBtn.addEventListener("click", resetGame);
// Button to reset game
resetBtn.addEventListener("click", resetGame);

// Access undo button
let undoBtn = document.querySelector("#undo-btn");

// Array to store moves
let moves = [];

// Function to handle the click event of the undo button
undoBtn.addEventListener("click", () => {
  console.log("click");
  if (moves.length > 0) {
    // Get the last move from the moves array
    let lastMove = moves.pop();
    // Clear the box corresponding to the last move
    boxes[lastMove].innerText = "";
    // Enable the box
    boxes[lastMove].disabled = false;
    // Switch turns
    turnO = !turnO;
    // Decrement move count
    count--;
  }
});

// Access dark mode button
let darkModeBtn = document.querySelector("#dark-btn");

// Function to toggle dark mode
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
  if(darkModeBtn.innerText === "Dark Mode"){

    darkModeBtn.innerText = "Light Mode";
  }
  else{
    darkModeBtn.innerText = "Dark Mode";
    
  }
};

// Event listener for dark mode button
darkModeBtn.addEventListener("click", toggleDarkMode);
