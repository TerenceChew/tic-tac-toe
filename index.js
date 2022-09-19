// Game UI selectors
const container = document.querySelector('.container');
const displayText = document.querySelector('.display-text');
const displayTextSpan = document.querySelector('.display-text > span');
const board = document.querySelector('.board');
const replayBtn = document.querySelector('.replay-btn');
const newGameBtn = document.querySelector('.new-game-btn');
const btnDivider1 = document.querySelector('.btn-divider-1');
const cells = document.querySelectorAll('.cell');

// Form selectors
const formContainer = document.querySelector('.form-container');
const formTitle = document.querySelector('.form-title');
const playerNameSpan = document.querySelector('.player-name-span');
const inputBox = document.querySelector('.input-box');
const choosePlayerBox = document.querySelector('.choose-player-box');
const nameInputContainer = document.querySelector('.name-input-container');
const nameInput = document.querySelector('.name-input');
const enterBtn = document.querySelector('.enter-btn');
const playerBtn = document.querySelector('.player-btn');
const aiBtn = document.querySelector('.ai-btn');

// Modules
const setupController = (() => {
  const setFooterYear = () => {
    const currYearSpan = document.querySelector('.curr-year');
    const currYear = new Date().getFullYear();
    currYearSpan.innerText = currYear;
  }
  return {
    setFooterYear
  }
})();

const uiController = (() => {
  // Game UI functions //
  // Display text
  const _resetDisplayText = () => {
    displayText.innerText = '';
  }
  const updateDisplayTextSpan = (turn) => {
    displayText.innerText = '';
    displayTextSpan.innerText = turn === 'X' ? gameController.getPlayerX() : gameController.getPlayerO();
    displayTextSpan.style.color = turn === 'X' ? 'var(--main-orange)' : 'var(--main-pink)';

    displayTextSpan.classList.add('animate__animated', 'animate__flash', 'animate__repeat-1');
    displayText.append(displayTextSpan, "'s Turn");
  }
  const showResult = (result, turn) => {
    displayText.innerText = '';
    displayTextSpan.innerText = result;
    let color;

    if (turn === 'X') {
      color = 'var(--main-orange)';
    } else if (turn === 'O') {
      color = 'var(--main-pink)';
    } else {
      color = 'var(--tie-color)';
    }
    
    displayTextSpan.style.color = color;

    displayTextSpan.classList.add('animate__animated', 'animate__flash', 'animate__repeat-1');
    displayText.append(displayTextSpan, result === 'TIE' ? ' !' : ' WON !');
    _showReplayBtn();
    _showNewGameBtn();
    _showBtnDivider();
  }
  // Board
  const _showBoard = () => {
    board.style.display = 'grid';
  }
  const _hideBoard = () => {
    board.style.display = 'none';
  }
  const _resetBoardAnimation = () => {
    board.style.animation = 'none';

    setTimeout(() => {
      board.style.animation = null;
    }, 100);
  }
  const markCell = (cell, turn) => {
    cell.innerText = turn;
    cell.style.color = turn === 'X' ? 'var(--main-orange)' : 'var(--main-pink)';
  }
  const _resetCells = () => {
    cells.forEach(cell => {
      cell.innerText = '';
    })
  }
  // Buttons
  const _showReplayBtn = () => {
    replayBtn.style.display = 'block';
  }
  const hideReplayBtn = () => {
    replayBtn.style.display = 'none';
  }
  const _showNewGameBtn = () => {
    newGameBtn.style.display = 'block';
  }
  const hideNewGameBtn = () => {
    newGameBtn.style.display = 'none';
  }
  const _showBtnDivider = () => {
    btnDivider1.style.display = 'block';
  }
  const hideBtnDivider = () => {
    btnDivider1.style.display = 'none';
  }
  // Reset
  const resetGameUi = () => {
    _resetDisplayText();
    _resetBoardAnimation();
    _resetCells();
  }

  // Form functions //
  // General
  const _blurBg = () => {
    container.style.filter = 'blur(5px)';
    container.style.pointerEvents = 'none';
  }
  const _unblurBg = () => {
    container.style.filter = 'none';
    container.style.pointerEvents = 'auto';
  }
  const _updateForm = (player) => {
    _updatePlayerNameSpan(player);
    _updateNameInputColor(player);
  }
  const showFormX = () => {
    formContainer.style.display = 'flex';
    _updateForm('X');
    _hideBoard();
    _blurBg();
  }
  const showFormO = () => {
    formContainer.style.display = 'flex';
    _updateForm('O');
    _resetFormTitleAnimation();
  }
  const hideForm = () => {
    formContainer.style.display = 'none';
    _unblurBg();
    _showBoard();
    _resetBoardAnimation();
  }
  // Form title
  const _resetFormTitleAnimation = () => {
    formTitle.style.animation = 'none';

    setTimeout(() => {
      formTitle.style.animation = null;
    }, 100);
  }
  const _updatePlayerNameSpan = (player) => {
    playerNameSpan.innerText = '';
    playerNameSpan.innerText = player === 'X' ? 'X' : 'O';
    playerNameSpan.style.color = player === 'X' ? 'var(--main-orange)' : 'var(--main-pink)';
  }
  // Input box
  const showInputBox = () => {
    inputBox.style.display = 'flex';
  }
  const hideInputBox = () => {
    inputBox.style.display = 'none';
  }
  const resetNameInputContainerAnimation = () => {
    nameInputContainer.style.animation = 'none';
    setTimeout(() => {
      nameInputContainer.style.animation = null;
    }, 100);
  }
  const _updateNameInputColor = (player) => {
    nameInput.style.color = player === 'X' ? 'var(--main-orange)' : 'var(--main-pink)';
  }
  const resetNameInputValue = () => {
    nameInput.value = '';
  }
  // Choose player box
  const showChoosePlayerBox = () => {
    choosePlayerBox.style.display = 'flex';
  }
  const hideChoosePlayerBox = () => {
    choosePlayerBox.style.display = 'none';
  }

  return {
    updateDisplayTextSpan,
    showResult,
    resetGameUi,
    markCell,
    hideReplayBtn,
    hideNewGameBtn,
    hideBtnDivider,
    showFormX,
    showFormO,
    hideForm,
    showInputBox,
    hideInputBox,
    showChoosePlayerBox,
    hideChoosePlayerBox,
    resetNameInputValue,
    resetNameInputContainerAnimation,
  }
})();

const gameController = (() => {
  let game;

  // General
  const _getMode = () => game.mode;
  const getPlayerX = () => game.playerX;
  const getPlayerO = () => game.playerO;
  const _addEventListenerToCells = () => {
    cells.forEach(cell => {
      cell.style.cursor = 'pointer';
      cell.addEventListener('pointerup', _handleCellClick);
    })
  }
  const _removeEventListenerFromCells = () => {
    cells.forEach(cell => {
      cell.style.cursor = 'not-allowed';
      cell.removeEventListener('pointerup', _handleCellClick);
    })
  }
  // Player assignment
  const _assignPlayerX = () => {
    if (!nameInput.value || !nameInput.value.trim()) {
      uiController.resetNameInputValue();
      uiController.resetNameInputContainerAnimation();
      return;
    } else {
      game.playerX = nameInput.value;
      uiController.resetNameInputValue();
      uiController.showFormO();
      uiController.hideInputBox();
      uiController.showChoosePlayerBox();
    }
  }
  const _assignPlayerO = () => {
    if (game.mode === 'AI') {
      game.playerO = game.ai.getName();
      uiController.resetNameInputValue();
      uiController.hideForm();
      return;
    }

    if (!nameInput.value || !nameInput.value.trim()) {
      uiController.resetNameInputValue();
      uiController.resetNameInputContainerAnimation();
      return;
    } else {
      game.playerO = nameInput.value;
      uiController.resetNameInputValue();
      uiController.hideForm();
    }
  }
  const assignPlayer = () => {
    if (!game.playerX) {
      _assignPlayerX();
    } else {
      _assignPlayerO();
    }

    if (!game.playerX || !game.playerO) return;
    
    _startGame();
  }
  const determinePlayerO = (e) => {
    let btnText = e.target.innerText;

    if (btnText === 'PLAYER') {
      game.mode = 'PLAYER';
      uiController.hideChoosePlayerBox();
      uiController.showInputBox();
    } else {
      uiController.hideChoosePlayerBox();
      game.mode = 'AI';
      game.ai = createAi();
      assignPlayer();
    }
  }
  // Game start
  const _makeNewGame = (playerX = null, playerO = null, mode = null) => {
    game = {};
    game.turn = 'X';
    game.isFinished = false;
    game.board = new Array(9).fill('');
    game.result = null;
    game.playerX = playerX;
    game.playerO = playerO;
    
    if (mode === 'AI') {
      game.ai = createAi();
      game.mode = mode;
    }
  }
  const startNewRound = () => {
    _makeNewGame();
    uiController.hideReplayBtn();
    uiController.hideNewGameBtn();
    uiController.hideBtnDivider();
    uiController.resetGameUi();
    uiController.resetNameInputValue();
    uiController.showFormX();
    uiController.showInputBox();
  }
  const _startGame = () => {
    _addEventListenerToCells();
    uiController.updateDisplayTextSpan(game.turn);
  }
  // Game logic 
  const _handleCellClick = (e) => {
    const cell = e.target;
    const cellIndex = cell.dataset.index;

    if (cell.innerText !== '' || game.isFinished) return;

    uiController.markCell(cell, game.turn);
    _updateBoard(game, cellIndex, game.turn);
    checkWin(game);
  }
  const _updateBoard = (game, cellIndex, turn) => {
    game.board[Number(cellIndex)] = turn;
  }
  const _switchTurn = (game) => {
    game.turn = game.turn === 'X' ? 'O' : 'X';
  }
  const checkWin = (game) => {
    let winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    let winnerFound = winningCombinations.some(combination => {
      let a = game.board[combination[0]];
      let b = game.board[combination[1]];
      let c = game.board[combination[2]];

      return a !== '' && a === b && b === c;
    })

    if (winnerFound) {
      _finishGame(game, game.turn === 'X' ? getPlayerX() : getPlayerO());
    }

    if (!winnerFound && _boardIsFull(game)) {
      _finishGame(game, 'TIE');
    }

    if (!winnerFound && game.board.includes('')) {
      _switchTurn(game);
      uiController.updateDisplayTextSpan(game.turn);

      if (isAiPlaying(game)) {
        handleAiMove(game);
      }

      return;
    }
  }
  const _boardIsFull = (game) => !game.board.includes('');
  const isAiPlaying = (game) => game.mode === 'AI' && game.turn === 'O';
  const handleAiMove = (game) => {
    _removeEventListenerFromCells();
    setTimeout(() => {
      _addEventListenerToCells();
      game.ai.makeMove(game);
    }, 2000);
  }
  // Game end
  const _finishGame = (game, result) => {
    game.isFinished = true;
    game.result = result;
    uiController.showResult(result, result === 'TIE' ? result : game.turn);
    _removeEventListenerFromCells();
    return;
  }
  // Replay
  const replayGame = () => {
    _makeNewGame(getPlayerX(), getPlayerO(), _getMode());
    uiController.hideReplayBtn();
    uiController.hideNewGameBtn();
    uiController.hideBtnDivider();
    uiController.resetGameUi();
    _startGame();
  }

  return {
    getPlayerX,
    getPlayerO,
    assignPlayer,
    determinePlayerO,
    replayGame,
    startNewRound,
    checkWin
  }
})();

// Factories
const createAi = () => {
  const _name = 'AI';

  // General
  const getName = () => _name;
  const _getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  // Board UI
  const _markCell = (randomIndex) => {
    const cells = document.querySelectorAll('.cell');
    uiController.markCell(cells[randomIndex], 'O');
  }
  // Game logic
  const _updateBoard = (game) => {
    let board = game.board;
    let numOfEmptyCells = board.filter(e => e === '').length;

    while (board.filter(e => e === '').length === numOfEmptyCells) {
      let randomIndex = _getRandomIntInclusive(0, 8);

      if (board[randomIndex] === '') {
        board[randomIndex] = 'O';

        _markCell(randomIndex);
      }
    }
  }
  const makeMove = (game) => {
    _updateBoard(game);
    gameController.checkWin(game);
  }
  
  return {
    getName,
    makeMove
  }
}

// Setups
setupController.setFooterYear();

// Event listeners
replayBtn.addEventListener('pointerup', gameController.replayGame);
newGameBtn.addEventListener('pointerup', gameController.startNewRound);
enterBtn.addEventListener('pointerup', gameController.assignPlayer);
playerBtn.addEventListener('pointerup', gameController.determinePlayerO);
aiBtn.addEventListener('pointerup', gameController.determinePlayerO);