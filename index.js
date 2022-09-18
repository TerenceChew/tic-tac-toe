// Game UI selectors
const displayText = document.querySelector('.display-text');
const displayTextSpan = document.querySelector('.display-text > span');
const board = document.querySelector('.board');
const replayBtn = document.querySelector('.replay-btn');
const newGameBtn = document.querySelector('.new-game-btn');
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
  const resetDisplayText = () => {
    displayText.innerText = '';
  }
  const updateDisplayTextSpan = (turn) => {
    displayText.innerText = '';
    displayTextSpan.innerText = turn === 'X' ? gameController.getPlayerX() : gameController.getPlayerO();
    displayTextSpan.style.color = turn === 'X' ? 'var(--main-blue)' : 'var(--main-purple)';

    displayTextSpan.classList.add('animate__animated', 'animate__flash', 'animate__repeat-1');
    displayText.append(displayTextSpan, "'s Turn");
  }
  const showResult = (result) => {
    displayText.innerText = '';
    let innerText;
    let color;

    if (result === 'X') {
      innerText = gameController.getPlayerX();
      color = 'var(--main-blue)';
    } else if (result === 'O') {
      innerText = gameController.getPlayerO();
      color = 'var(--main-purple)';
    } else {
      innerText = 'TIE';
      color = 'var(--tie-color)';
    }
    
    displayTextSpan.innerText = innerText;
    displayTextSpan.style.color = color;

    displayTextSpan.classList.add('animate__animated', 'animate__flash', 'animate__repeat-1');
    displayText.append(displayTextSpan, result === 'TIE' ? ' !' : ' WON !');
    showReplayBtn();
    showNewGameBtn();
  }
  // Board
  const showBoard = () => {
    board.style.display = 'grid';
  }
  const hideBoard = () => {
    board.style.display = 'none';
  }
  const resetBoardAnimation = () => {
    board.style.animation = 'none';

    setTimeout(() => {
      board.style.animation = null;
    }, 100);
  }
  const markCell = (cell, turn) => {
    cell.innerText = turn;
    cell.style.color = turn === 'X' ? 'var(--main-blue)' : 'var(--main-purple)';
  }
  const resetCells = () => {
    cells.forEach(cell => {
      cell.innerText = '';
    })
  }
  // Buttons
  const showReplayBtn = () => {
    replayBtn.style.display = 'block';
  }
  const hideReplayBtn = () => {
    replayBtn.style.display = 'none';
  }
  const showNewGameBtn = () => {
    newGameBtn.style.display = 'block';
  }
  const hideNewGameBtn = () => {
    newGameBtn.style.display = 'none';
  }
  // Reset
  const resetGameUi = () => {
    resetDisplayText();
    resetBoardAnimation();
    resetCells();
  }

  // Form functions //
  // General
  const updateForm = (player) => {
    updatePlayerNameSpan(player);
    updateNameInputColor(player);
    hideBoard();
  }
  const showFormX = () => {
    formContainer.style.display = 'flex';
    updateForm('X');
  }
  const showFormO = () => {
    formContainer.style.display = 'flex';
    updateForm('O');
    resetFormTitleAnimation();
  }
  const hideForm = () => {
    formContainer.style.display = 'none';
  }
  // Form title
  const resetFormTitleAnimation = () => {
    formTitle.style.animation = 'none';

    setTimeout(() => {
      formTitle.style.animation = null;
    }, 100);
  }
  const updatePlayerNameSpan = (player) => {
    playerNameSpan.innerText = '';
    playerNameSpan.innerText = player === 'X' ? 'X' : 'O';
    playerNameSpan.style.color = player === 'X' ? 'var(--main-blue)' : 'var(--main-purple)';
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
  const updateNameInputColor = (player) => {
    nameInput.style.color = player === 'X' ? 'var(--main-blue)' : 'var(--main-purple)';
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
    resetBoardAnimation,
    resetGameUi,
    showBoard,
    markCell,
    hideReplayBtn,
    hideNewGameBtn,
    showFormX,
    showFormO,
    hideForm,
    showInputBox,
    hideInputBox,
    showChoosePlayerBox,
    hideChoosePlayerBox,
    resetNameInputValue,
    resetNameInputContainerAnimation,
    resetFormTitleAnimation
  }
})();

const gameController = (() => {
  let game;

  // General
  const getPlayerX = () => game.playerX;
  const getPlayerO = () => game.playerO;
  const addEventListenerToCells = () => {
    cells.forEach(cell => {
      cell.style.cursor = 'pointer';
      cell.addEventListener('pointerup', handleCellClick);
    })
  }
  const removeEventListenerFromCells = () => {
    cells.forEach(cell => {
      cell.style.cursor = 'not-allowed';
      cell.removeEventListener('pointerup', handleCellClick);
    })
  }
  // Player assignment
  const assignPlayerX = () => {
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
  const assignPlayerO = () => {
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
      assignPlayerX();
    } else {
      assignPlayerO();
    }

    if (!game.playerX || !game.playerO) return;
    
    uiController.showBoard();
    uiController.resetBoardAnimation();
    startGame();
  }
  const determinePlayerO = (e) => {
    let btnText = e.target.innerText;

    if (btnText === 'PLAYER') {
      uiController.hideChoosePlayerBox();
      uiController.showInputBox();
    } else {
      uiController.hideChoosePlayerBox();
      // make ai and start game
    }
  }
  // Game start
  const makeNewGame = (playerX = null, playerO = null) => {
    game = {};
    game.turn = 'X';
    game.isFinished = false;
    game.board = new Array(9).fill('');
    game.result = null;
    game.playerX = playerX;
    game.playerO = playerO;
  }
  const startNewRound = () => {
    makeNewGame();
    uiController.hideReplayBtn();
    uiController.hideNewGameBtn();
    uiController.resetGameUi();
    uiController.resetNameInputValue();
    uiController.showFormX();
  }
  const startGame = () => {
    addEventListenerToCells();
    uiController.updateDisplayTextSpan(game.turn);
  }
  // Game logic 
  const handleCellClick = (e) => {
    const cell = e.target;
    const cellIndex = cell.dataset.index;

    if (cell.innerText !== '' || game.isFinished) return;

    uiController.markCell(cell, game.turn);
    updateBoard(cellIndex, game.turn);
    checkWin();
  }
  const updateBoard = (cellIndex, turn) => {
    game.board[Number(cellIndex)] = turn;
  }
  const switchTurn = () => {
    game.turn = game.turn === 'X' ? 'O' : 'X';
  }
  const checkWin = () => {
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
      finishGame(game.turn);
    }

    if (!winnerFound && boardIsFull()) {
      finishGame('TIE');
    }

    if (!winnerFound && game.board.includes('')) {
      switchTurn();
      uiController.updateDisplayTextSpan(game.turn);
      return;
    }
  }
  const boardIsFull = () => {
    return !game.board.includes('');
  }
  // Game end
  const finishGame = (result) => {
    game.isFinished = true;
    game.result = result;
    uiController.showResult(game.result);
    removeEventListenerFromCells();
    return;
  }
  // Replay
  const replayGame = () => {
    makeNewGame(getPlayerX(), getPlayerO());
    uiController.hideReplayBtn();
    uiController.hideNewGameBtn();
    uiController.resetGameUi();
    startGame();
  }

  return {
    getPlayerX,
    getPlayerO,
    assignPlayer,
    determinePlayerO,
    replayGame,
    makeNewGame,
    startGame,
    startNewRound
  }
})();

// Factories
// const createAI = () => {
//   const makeNextMove = (board) => {
    
//   }
// }

// Setups
setupController.setFooterYear();

// Event listeners
replayBtn.addEventListener('pointerup', gameController.replayGame);
newGameBtn.addEventListener('pointerup', gameController.startNewRound);
enterBtn.addEventListener('pointerup', gameController.assignPlayer);
playerBtn.addEventListener('pointerup', gameController.determinePlayerO);
aiBtn.addEventListener('pointerup', gameController.determinePlayerO);