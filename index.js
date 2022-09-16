// Selectors
const displayText = document.querySelector('.display-text');
const displayTextSpan = document.querySelector('.display-text > span');
const board = document.querySelector('.board');
const newGameBtn = document.querySelector('#new-game-btn');
const cells = document.querySelectorAll('.cell');
const formContainer = document.querySelector('.form-container');
const playerNameSpan = document.querySelector('.player-name-span');
const nameInputContainer = document.querySelector('.name-input-container');
const nameInput = document.querySelector('#name-input');
const formBtn = document.querySelector('.form-btn');

// Modules
const setupController = (() => {
  const setFooterYear = () => {
    const currYearSpan = document.querySelector('.curr-year');
    const currYear = new Date().getFullYear();
    currYearSpan.innerText = currYear
  }
  return {
    setFooterYear
  }
})();

const uiController = (() => {
  const updateDisplayTextSpan = (turn) => {
    displayText.innerText = '';
    displayTextSpan.innerText = turn === 'X' ? gameController.getPlayerX() : gameController.getPlayerO();
    displayTextSpan.style.color = turn === 'X' ? 'var(--main-blue)' : 'var(--main-purple)';

    displayTextSpan.classList.add('animate__animated', 'animate__flash', 'animate__repeat-1');

    displayText.append(displayTextSpan, "'s Turn");
  }
  const showResult = (result) => {
    displayText.innerText = '';
    displayTextSpan.innerText = result === 'X' ? gameController.getPlayerX() :
                                result === 'O' ? gameController.getPlayerO() :
                                'TIE';
    displayTextSpan.style.color = result === 'X' ? 'var(--main-blue)' :
                                  result === 'O' ? 'var(--main-purple)' :
                                  'var(--tie-color)';

    displayTextSpan.classList.add('animate__animated', 'animate__flash', 'animate__repeat-1');
    
    displayText.append(displayTextSpan, result === 'TIE' ? ' !' : ' WON !');
    showNewGameBtn();
  }
  const resetDisplayText = () => {
    displayText.innerText = '';
  }
  const resetCells = () => {
    cells.forEach(cell => {
      cell.innerText = '';
    })
  }
  const resetBoardAnimation = () => {
    board.style.animation = 'none';

    setTimeout(() => {
      board.style.animation = null;
    }, 100);
  }
  const resetGameUi = () => {
    resetDisplayText();
    resetCells();
    resetBoardAnimation();
  }
  const showNewGameBtn = () => {
    newGameBtn.style.display = 'block';
  }
  const hideNewGameBtn = () => {
    newGameBtn.style.display = 'none';
  }
  const updatePlayerNameSpan = (player) => {
    playerNameSpan.innerText = '';
    playerNameSpan.innerText = player === 'X' ? 'X' : 'O';
    playerNameSpan.style.color = player === 'X' ? 'var(--main-blue)' : 'var(--main-purple)';
  }
  const blurBoard = () => {
    board.style.filter = 'blur(4px)';
  }
  const unblurBoard = () => {
    board.style.filter = 'none';
  }
  const updateForm = (player) => {
    updatePlayerNameSpan(player);
    updateNameInputColor(player);
    blurBoard();
  }
  const showFormX = () => {
    formContainer.style.display = 'flex';
    updateForm('X');
  }
  const showFormO = () => {
    formContainer.style.display = 'flex';
    updateForm('O');
  }
  const hideForm = () => {
    formContainer.style.display = 'none';
    unblurBoard();
  }
  const updateNameInputColor = (player) => {
    nameInput.style.color = player === 'X' ? 'var(--main-blue)' : 'var(--main-purple)';
  }
  const resetNameInput = () => {
    nameInput.value = '';
  }
  const addNameInputContainerAnimation = () => {
    nameInputContainer.classList.add('animate__animated', 'animate__flash', 'animate__repeat-1');
  }
  const removeNameInputContainerAnimation = () => {
    nameInputContainer.classList.remove('animate__animated', 'animate__flash', 'animate__repeat-1');
  }

  return {
    updateDisplayTextSpan,
    showResult,
    resetBoardAnimation,
    resetGameUi,
    showNewGameBtn,
    hideNewGameBtn,
    updatePlayerNameSpan,
    showFormX,
    showFormO,
    hideForm,
    updateNameInputColor,
    resetNameInput,
    addNameInputContainerAnimation,
    removeNameInputContainerAnimation
  }
})();

const gameController = (() => {
  let game;

  const getPlayerX = () => game.playerX;
  const getPlayerO = () => game.playerO;
  const assignPlayerX = () => {
    if (!nameInput.value) {
      uiController.addNameInputContainerAnimation();
      setTimeout(uiController.removeNameInputContainerAnimation, 1250);
      return;
    } else {
      game.playerX = nameInput.value;
      uiController.resetNameInput();
      uiController.removeNameInputContainerAnimation();
      uiController.showFormO();
    }
  }
  const assignPlayerO = () => {
    if (!nameInput.value) {
      uiController.addNameInputContainerAnimation();
      setTimeout(uiController.removeNameInputContainerAnimation, 1250);
      return;
    } else {
      game.playerO = nameInput.value;
      uiController.resetNameInput();
      uiController.removeNameInputContainerAnimation();
    }
  }
  const assignPlayer = () => {
    if (!game.playerX) {
      assignPlayerX();
    } else {
      assignPlayerO();
    }
    
    if (game.playerX && game.playerO) {
      uiController.hideForm();
      uiController.resetBoardAnimation();
      startGame();
    }
  }
  const makeNewGame = () => {
    game = {};
    game.turn = 'X';
    game.isFinished = false;
    game.board = new Array(9).fill('');
    game.result = null;
  }
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
  const startNewRound = () => {
    makeNewGame();
    uiController.hideNewGameBtn();
    uiController.resetGameUi();
    uiController.resetNameInput();
    uiController.showFormX();
  }
  const startGame = () => {
    addEventListenerToCells();
    uiController.updateDisplayTextSpan(game.turn);
  }
  const handleCellClick = (e) => {
    const cell = e.target;
    const cellIndex = cell.dataset.index;

    if (cell.innerText !== '' || game.isFinished) return;

    markCell(cell);
    updateBoard(cellIndex, game.turn);
    checkWin();
  }
  const markCell = (cell) => {
    cell.innerText = game.turn;
    cell.style.color = game.turn === 'X' ? 'var(--main-blue)' : 'var(--main-purple)';
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
      game.isFinished = true;
      game.result = game.turn;
      uiController.showResult(game.result);
      removeEventListenerFromCells();
      return;
    }

    if (!winnerFound && boardIsFull()) {
      game.isFinished = true;
      game.result = 'TIE';
      uiController.showResult(game.result);
      removeEventListenerFromCells();
      return;
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
  return {
    getPlayerX,
    getPlayerO,
    assignPlayer,
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
newGameBtn.addEventListener('pointerup', gameController.startNewRound);
formBtn.addEventListener('pointerup', gameController.assignPlayer);