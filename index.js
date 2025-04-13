const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('resetBtn');
const messageElement = document.getElementById('message');

let currentPlayer = 'X'; // Player X starts
let gameActive = true; // The game is active until a winner is found
let gameState = ['', '', '', '', '', '', '', '', '']; // Keeps track of board state

// Winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle cell click
function handleCellClick(event) {
    const clickedIndex = event.target.dataset.index;

    // Ignore if the cell is already filled or if the game is not active
    if (gameState[clickedIndex] !== '' || !gameActive) return;

    // Mark the cell with the current player's symbol
    gameState[clickedIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    // Check if there's a winner
    checkWinner();

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Check for winner
function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            gameActive = false;
            messageElement.textContent = `${currentPlayer} wins!`;
            return;
        }
    }

    // Check for draw

    
    if (!gameState.includes('')) {
        gameActive = false;
        messageElement.textContent = 'It\'s a draw!';
    }
}

// Reset the game
function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';

    

    cells.forEach(cell => {
        cell.textContent = '';
    });
    messageElement.textContent = '';
}

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
