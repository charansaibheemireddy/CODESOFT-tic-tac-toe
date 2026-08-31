const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#status');
const restartBtn = document.querySelector('#restartBtn');

let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Initialize Game
function initGame() {
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
        cell.textContent = '';
        cell.classList.remove('x', 'o');
        cell.disabled = false;
    });
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    statusText.textContent = "Your Turn (X)";
}

// Check for winner (matching Python check_winner logic)
function checkWinner(currentBoard) {
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
            return currentBoard[a];
        }
    }
    if (!currentBoard.includes('')) {
        return 'Tie';
    }
    return null;
}

// Minimax Algorithm
function minimax(tempBoard, depth, isMaximizing) {
    let winner = checkWinner(tempBoard);
    if (winner === 'O') return 1;
    if (winner === 'X') return -1;
    if (winner === 'Tie') return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (tempBoard[i] === '') {
                tempBoard[i] = 'O';
                let score = minimax(tempBoard, depth + 1, false);
                tempBoard[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (tempBoard[i] === '') {
                tempBoard[i] = 'X';
                let score = minimax(tempBoard, depth + 1, true);
                tempBoard[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

// Determine AI Move
function getBestMove() {
    let bestScore = -Infinity;
    let move = -1;

    for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
            board[i] = 'O';
            let score = minimax(board, 0, false);
            board[i] = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}

// Handle User Click
function handleCellClick(e) {
    const index = e.target.getAttribute('data-index');

    if (board[index] !== '' || !isGameActive) return;

    // Human Turn (X)
    makeMove(index, 'X');

    // Check status after Human Move
    if (handleGameEnd()) return;

    // AI Turn (O)
    statusText.textContent = "AI is thinking...";
    
    // Add small delay for natural AI feel
    setTimeout(() => {
        const aiMove = getBestMove();
        if (aiMove !== -1) {
            makeMove(aiMove, 'O');
            handleGameEnd();
        }
    }, 250);
}

function makeMove(index, player) {
    board[index] = player;
    cells[index].textContent = player;
    cells[index].classList.add(player.toLowerCase());
    cells[index].disabled = true;
}

function handleGameEnd() {
    const winner = checkWinner(board);

    if (winner) {
        isGameActive = false;
        if (winner === 'Tie') {
            statusText.textContent = "🤝 It's a Tie!";
        } else if (winner === 'O') {
            statusText.textContent = "🤖 AI Wins!";
        } else {
            statusText.textContent = "🎉 You Won!";
        }
        return true;
    }
    
    statusText.textContent = "Your Turn (X)";
    return false;
}

restartBtn.addEventListener('click', initGame);
initGame();
