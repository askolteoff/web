document.addEventListener('DOMContentLoaded', () => {
    const boardElement = document.getElementById('board');
    const sizeInput = document.getElementById('size');
    const winLengthInput = document.getElementById('win-length');
    const newGameButton = document.getElementById('new-game');
    const statusElement = document.getElementById('status');
    const xScoreElement = document.getElementById('x-score');
    const oScoreElement = document.getElementById('o-score');
    const drawScoreElement = document.getElementById('draw-score');
    
    let boardSize = 3;
    let winLength = 3;
    let board = [];
    let currentPlayer = 'x';
    let gameActive = true;
    let scores = { x: 0, o: 0, draw: 0 };
    
    function initGame() {
        boardSize = parseInt(sizeInput.value);
        winLength = parseInt(winLengthInput.value);
        
        if (winLength > boardSize) {
            winLength = boardSize;
            winLengthInput.value = boardSize;
        }
        
        board = Array(boardSize).fill().map(() => Array(boardSize).fill(''));
        currentPlayer = 'x';
        gameActive = true;
        
        document.querySelectorAll('.winner').forEach(cell => cell.classList.remove('winner'));
        renderBoard();
        updateStatus();
    }
    
    function renderBoard() {
        boardElement.innerHTML = '';
        boardElement.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
        
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = i;
                cell.dataset.col = j;
                
                if (board[i][j]) {
                    const symbol = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    symbol.setAttribute('viewBox', '0 0 100 100');
                    symbol.innerHTML = document.getElementById(board[i][j]).innerHTML;
                    cell.appendChild(symbol);
                    cell.classList.add(board[i][j]);
                }
                
                cell.addEventListener('click', () => handleCellClick(i, j));
                boardElement.appendChild(cell);
            }
        }
    }
    
    function handleCellClick(row, col) {
        if (!gameActive || board[row][col] !== '') return;
        
        board[row][col] = currentPlayer;
        renderBoard();
        
        if (checkWin(row, col)) {
            endGame(currentPlayer);
            return;
        }
        
        if (checkDraw()) {
            endGame('draw');
            return;
        }
        
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
        updateStatus();
    }
    
    function checkWin(row, col) {
        const directions = [
            [ [0, 1], [0, -1] ],
            [ [1, 0], [-1, 0] ],
            [ [1, 1], [-1, -1] ],
            [ [1, -1], [-1, 1] ]
        ];
        
        for (const direction of directions) {
            let count = 1;
            
            for (const [dx, dy] of direction) {
                let r = row + dx;
                let c = col + dy;
                
                while (
                    r >= 0 && r < boardSize && 
                    c >= 0 && c < boardSize && 
                    board[r][c] === currentPlayer
                ) {
                    count++;
                    r += dx;
                    c += dy;
                }
            }
            
            if (count >= winLength) {
                highlightWinningCells();
                return true;
            }
        }
        
        return false;
    }
    
    function highlightWinningCells() {
        for (let r = 0; r < boardSize; r++) {
            for (let c = 0; c < boardSize; c++) {
                if (board[r][c] === currentPlayer) {
                    const cell = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
                    if (cell) cell.classList.add('winner');
                }
            }
        }
    }
    
    function checkDraw() {
        return board.every(row => row.every(cell => cell !== ''));
    }
    
    function endGame(result) {
        gameActive = false;
        
        if (result === 'x' || result === 'o') {
            scores[result]++;
            updateScores();
            statusElement.textContent = `Победили ${result === 'x' ? 'крестики' : 'нолики'}!`;
        } else {
            scores.draw++;
            updateScores();
            statusElement.textContent = 'Ничья!';
        }
    }
    
    function updateStatus() {
        statusElement.textContent = `Ход ${currentPlayer === 'x' ? 'крестиков' : 'ноликов'}`;
    }
    
    function updateScores() {
        xScoreElement.textContent = scores.x;
        oScoreElement.textContent = scores.o;
        drawScoreElement.textContent = scores.draw;
    }
    
    newGameButton.addEventListener('click', initGame);
    sizeInput.addEventListener('change', () => {
        if (sizeInput.value < 3) sizeInput.value = 3;
        if (sizeInput.value > 10) sizeInput.value = 10;
    });
    winLengthInput.addEventListener('change', () => {
        if (winLengthInput.value < 3) winLengthInput.value = 3;
        if (winLengthInput.value > boardSize) winLengthInput.value = boardSize;
    });
    
    initGame();
});