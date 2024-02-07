document.addEventListener('DOMContentLoaded', function () {
    const board1 = document.getElementById('board1');
    const message1 = document.getElementById('message1');
    const restartBtn = document.getElementById('restartBtn');
    const moveSound = document.getElementById('moveSound');
    const gameOverSound = document.getElementById('gameOverSound');

    let currentPlayer = 'X';
    let cells = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;


    initializeBoard();

    function initializeBoard() {
        cells = ['', '', '', '', '', '', '', '', ''];
        board1.innerHTML = '';
        cells.forEach((cell, index) => {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            cellDiv.setAttribute('data-index', index);
            cellDiv.addEventListener('click', handleCellClick);
            board1.appendChild(cellDiv);
        });
        message1.textContent = `Player X's turn`;
        gameActive = true;
        setTimeout(chooseWinnerAutomatically, 10000); // Automatically choose winner after 10 seconds
    }

    function handleCellClick(event) {
        if (!gameActive) return; // If game is not active, do nothing
        const clickedCellIndex = event.target.getAttribute('data-index');
        if (cells[clickedCellIndex] === '') {
            cells[clickedCellIndex] = currentPlayer;
            event.target.textContent = currentPlayer;
            moveSound.play(); // Play move sound
            if (checkWin() || checkDraw()) {
                gameActive = false;
                message1.textContent = checkWin() ? `Player ${currentPlayer} wins!` : `It's a draw!`;
                gameOverSound.play(); // Play game over sound
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                message1.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    function checkWin() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6], // Diagonals
        ];
        return winConditions.some(condition => {
            return condition.every(index => cells[index] === currentPlayer);
        });
    }

    function checkDraw() {
        return cells.every(cell => cell !== '');
    }

    function chooseWinnerAutomatically() {
        if (gameActive) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message1.textContent = `Time's up!! Player ${currentPlayer} wins!`;
            gameActive = false;
        }
    }

    restartBtn.addEventListener('click', function () {
        initializeBoard();
    });
});
