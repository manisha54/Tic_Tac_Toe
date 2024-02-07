document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('board');
    const message = document.getElementById('message');
    const restartBtn = document.getElementById('restartBtn');

    let currentPlayer = 'X';
    let cells = Array.from({ length: 25 }, () => '');
    let gameActive = true;

    initializeBoard();

    function initializeBoard() {
        board.innerHTML = '';
        cells.forEach((cell, index) => {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            cellDiv.setAttribute('data-index', index);
            cellDiv.addEventListener('click', handleCellClick);
            board.appendChild(cellDiv);
        });
        message.textContent = `Player X's turn`;

        // Automatically choose winner after 20 seconds
        setTimeout(chooseWinnerAutomatically, 20000);
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
                message.textContent = checkWin() ? `Player ${currentPlayer} wins!` : `It's a draw!`;
                gameOverSound.play(); // Play game over sound

            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                message.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    function checkWin() {
        const winConditions = [
            [0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14], [15, 16, 17, 18, 19], [20, 21, 22, 23, 24], // Rows
            [0, 5, 10, 15, 20], [1, 6, 11, 16, 21], [2, 7, 12, 17, 22], [3, 8, 13, 18, 23], [4, 9, 14, 19, 24], // Columns
            [0, 6, 12, 18, 24], [4, 8, 12, 16, 20], // Diagonals
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
            message.textContent = ` Time's up !! Player ${currentPlayer} wins! `;
            gameActive = false;
        }
    }

    restartBtn.addEventListener('click', function() {
        // Reset all variables and the board
        currentPlayer = 'X';
        cells = Array.from({ length: 25 }, () => '');
        gameActive = true;
        initializeBoard();
    });
});
