// Modules
const setupController = (() => {
  const _setFooterYear = () => {
    const currYearSpan = document.querySelector(".curr-year");
    const currYear = new Date().getFullYear();
    currYearSpan.innerText = currYear;
  };

  _setFooterYear();
})();

const uiController = (() => {
  // Game UI selectors
  const _container = document.querySelector(".container");
  const _displayText = document.querySelector(".display-text");
  const _displayTextSpan = document.querySelector(".display-text > span");
  const _board = document.querySelector(".board");
  const _replayBtn = document.querySelector(".replay-btn");
  const _newGameBtn = document.querySelector(".new-game-btn");
  const _btnDivider1 = document.querySelector(".btn-divider-1");
  const _cells = document.querySelectorAll(".cell");

  // Form selectors
  const _formContainer = document.querySelector(".form-container");
  const _formTitle = document.querySelector(".form-title");
  const _playerNameSpan = document.querySelector(".player-name-span");
  const _inputBox = document.querySelector(".input-box");
  const _choosePlayerBox = document.querySelector(".choose-player-box");
  const _nameInputContainer = document.querySelector(".name-input-container");
  const _nameInput = document.querySelector(".name-input");

  // Game UI functions //
  // Display text
  const _resetDisplayText = () => {
    _displayText.innerText = "";
  };
  const updateDisplayTextSpan = (turn) => {
    _displayText.innerText = "";
    _displayTextSpan.innerText =
      turn === "X" ? gameController.getPlayerX() : gameController.getPlayerO();
    _displayTextSpan.style.color =
      turn === "X" ? "var(--main-orange)" : "var(--main-pink)";

    _displayTextSpan.classList.add(
      "animate__animated",
      "animate__flash",
      "animate__repeat-1"
    );
    _displayText.append(_displayTextSpan, "'s Turn");
  };
  const showResult = (result, turn) => {
    _displayText.innerText = "";
    _displayTextSpan.innerText = result;
    let color;

    if (turn === "X") {
      color = "var(--main-orange)";
    } else if (turn === "O") {
      color = "var(--main-pink)";
    } else {
      color = "var(--tie-color)";
    }

    _displayTextSpan.style.color = color;

    _displayTextSpan.classList.add(
      "animate__animated",
      "animate__flash",
      "animate__repeat-1"
    );
    _displayText.append(_displayTextSpan, result === "TIE" ? " !" : " WON !");
    _showReplayBtn();
    _showNewGameBtn();
    _showBtnDivider();
  };
  // Board
  const _showBoard = () => {
    _board.style.display = "grid";
  };
  const _hideBoard = () => {
    _board.style.display = "none";
  };
  const _resetBoardAnimation = () => {
    _board.style.animation = "none";

    setTimeout(() => {
      _board.style.animation = null;
    }, 100);
  };
  const markCell = (cell, turn) => {
    cell.innerText = turn;
    cell.style.color = turn === "X" ? "var(--main-orange)" : "var(--main-pink)";
  };
  const _resetCells = () => {
    _cells.forEach((cell) => {
      cell.innerText = "";
    });
  };
  // Buttons
  const _showReplayBtn = () => {
    _replayBtn.style.display = "block";
  };
  const hideReplayBtn = () => {
    _replayBtn.style.display = "none";
  };
  const _showNewGameBtn = () => {
    _newGameBtn.style.display = "block";
  };
  const hideNewGameBtn = () => {
    _newGameBtn.style.display = "none";
  };
  const _showBtnDivider = () => {
    _btnDivider1.style.display = "block";
  };
  const hideBtnDivider = () => {
    _btnDivider1.style.display = "none";
  };
  // Reset
  const resetGameUi = () => {
    _resetDisplayText();
    _resetBoardAnimation();
    _resetCells();
  };

  // Form functions //
  // General
  const _blurBg = () => {
    _container.style.filter = "blur(5px)";
    _container.style.pointerEvents = "none";
  };
  const _unblurBg = () => {
    _container.style.filter = "none";
    _container.style.pointerEvents = "auto";
  };
  const _updateForm = (player) => {
    _updatePlayerNameSpan(player);
    _updateNameInputColor(player);
  };
  const showFormX = () => {
    _formContainer.style.display = "flex";
    _updateForm("X");
    _hideBoard();
    _blurBg();
  };
  const showFormO = () => {
    _formContainer.style.display = "flex";
    _updateForm("O");
    _resetFormTitleAnimation();
  };
  const hideForm = () => {
    _formContainer.style.display = "none";
    _unblurBg();
    _showBoard();
    _resetBoardAnimation();
  };
  // Form title
  const _resetFormTitleAnimation = () => {
    _formTitle.style.animation = "none";

    setTimeout(() => {
      _formTitle.style.animation = null;
    }, 100);
  };
  const _updatePlayerNameSpan = (player) => {
    _playerNameSpan.innerText = "";
    _playerNameSpan.innerText = player === "X" ? "X" : "O";
    _playerNameSpan.style.color =
      player === "X" ? "var(--main-orange)" : "var(--main-pink)";
  };
  // Input box
  const showInputBox = () => {
    _inputBox.style.display = "flex";
  };
  const hideInputBox = () => {
    _inputBox.style.display = "none";
  };
  const resetNameInputContainerAnimation = () => {
    _nameInputContainer.style.animation = "none";
    setTimeout(() => {
      _nameInputContainer.style.animation = null;
    }, 100);
  };
  const _updateNameInputColor = (player) => {
    _nameInput.style.color =
      player === "X" ? "var(--main-orange)" : "var(--main-pink)";
  };
  const resetNameInputValue = () => {
    _nameInput.value = "";
  };
  // Choose player box
  const showChoosePlayerBox = () => {
    _choosePlayerBox.style.display = "flex";
  };
  const hideChoosePlayerBox = () => {
    _choosePlayerBox.style.display = "none";
  };

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
  };
})();

const gameController = (() => {
  // Game UI selectors
  const _replayBtn = document.querySelector(".replay-btn");
  const _newGameBtn = document.querySelector(".new-game-btn");
  const _cells = document.querySelectorAll(".cell");

  // Form selectors
  const _nameInput = document.querySelector(".name-input");
  const _enterBtn = document.querySelector(".enter-btn");
  const _playerBtn = document.querySelector(".player-btn");
  const _aiBtn = document.querySelector(".ai-btn");

  // Variables
  let _game;

  // General
  const _getMode = () => _game.mode;
  const getPlayerX = () => _game.playerX;
  const getPlayerO = () => _game.playerO;
  const _addEventListenerToCells = () => {
    _cells.forEach((cell) => {
      cell.style.cursor = "pointer";
      cell.addEventListener("pointerup", _handleCellClick);
    });
  };
  const _removeEventListenerFromCells = () => {
    _cells.forEach((cell) => {
      cell.style.cursor = "not-allowed";
      cell.removeEventListener("pointerup", _handleCellClick);
    });
  };
  // Player assignment
  const _getPlayerX = () => {
    if (!_nameInput.value || !_nameInput.value.trim()) {
      uiController.resetNameInputValue();
      uiController.resetNameInputContainerAnimation();
      return;
    } else {
      _game.playerX = _nameInput.value;
      uiController.resetNameInputValue();
      uiController.showFormO();
      uiController.hideInputBox();
      uiController.showChoosePlayerBox();
    }
  };
  const _getPlayerO = () => {
    if (_game.mode === "AI") {
      _game.playerO = _game.ai.getName();
      uiController.resetNameInputValue();
      uiController.hideForm();
      return;
    }

    if (!_nameInput.value || !_nameInput.value.trim()) {
      uiController.resetNameInputValue();
      uiController.resetNameInputContainerAnimation();
      return;
    } else {
      _game.playerO = _nameInput.value;
      uiController.resetNameInputValue();
      uiController.hideForm();
    }
  };
  const _assignPlayersAndStartGame = () => {
    if (!_game.playerX) {
      _getPlayerX();
    } else {
      _getPlayerO();
    }

    if (!_game.playerX || !_game.playerO) return;

    _startGame();
  };
  const _determinePlayerO = (e) => {
    let btnText = e.target.innerText;

    if (btnText === "PLAYER") {
      _game.mode = "PLAYER";
      uiController.hideChoosePlayerBox();
      uiController.showInputBox();
    } else {
      uiController.hideChoosePlayerBox();
      _game.mode = "AI";
      _game.ai = createAi();
      _assignPlayersAndStartGame();
    }
  };
  // Game start
  const _makeNewGame = (playerX = null, playerO = null, mode = null) => {
    _game = {};
    _game.turn = "X";
    _game.isFinished = false;
    _game.board = new Array(9).fill("");
    _game.result = null;
    _game.playerX = playerX;
    _game.playerO = playerO;

    if (mode === "AI") {
      _game.ai = createAi();
      _game.mode = mode;
    }
  };
  const _startNewRound = () => {
    _makeNewGame();
    uiController.hideReplayBtn();
    uiController.hideNewGameBtn();
    uiController.hideBtnDivider();
    uiController.resetGameUi();
    uiController.resetNameInputValue();
    uiController.showFormX();
    uiController.showInputBox();
  };
  const _startGame = () => {
    _addEventListenerToCells();
    uiController.updateDisplayTextSpan(_game.turn);
  };
  // Game logic
  const _handleCellClick = (e) => {
    const cell = e.target;
    const cellIndex = cell.dataset.index;

    if (cell.innerText !== "" || _game.isFinished) return;

    uiController.markCell(cell, _game.turn);
    _updateBoard(_game, cellIndex, _game.turn);
    checkWin(_game);
  };
  const _updateBoard = (game, cellIndex, turn) => {
    game.board[Number(cellIndex)] = turn;
  };
  const _switchTurn = (game) => {
    game.turn = game.turn === "X" ? "O" : "X";
  };
  const checkWin = (game) => {
    let winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    let winnerFound = winningCombinations.some((combination) => {
      let a = game.board[combination[0]];
      let b = game.board[combination[1]];
      let c = game.board[combination[2]];

      return a !== "" && a === b && b === c;
    });

    if (winnerFound) {
      _finishGame(game, game.turn === "X" ? getPlayerX() : getPlayerO());
    }

    if (!winnerFound && _boardIsFull(game)) {
      _finishGame(game, "TIE");
    }

    if (!winnerFound && game.board.includes("")) {
      _switchTurn(game);
      uiController.updateDisplayTextSpan(game.turn);

      if (isAiPlaying(game)) {
        handleAiMove(game);
      }

      return;
    }
  };
  const _boardIsFull = (game) => !game.board.includes("");
  const isAiPlaying = (game) => game.mode === "AI" && game.turn === "O";
  const handleAiMove = (game) => {
    _removeEventListenerFromCells();
    setTimeout(() => {
      _addEventListenerToCells();
      game.ai.makeMove(game);
    }, 2000);
  };
  // Game end
  const _finishGame = (game, result) => {
    game.isFinished = true;
    game.result = result;
    uiController.showResult(result, result === "TIE" ? result : game.turn);
    _removeEventListenerFromCells();
    return;
  };
  // Replay
  const _replayGame = () => {
    _makeNewGame(getPlayerX(), getPlayerO(), _getMode());
    uiController.hideReplayBtn();
    uiController.hideNewGameBtn();
    uiController.hideBtnDivider();
    uiController.resetGameUi();
    _startGame();
  };

  // Event listeners
  _replayBtn.addEventListener("pointerup", _replayGame);
  _newGameBtn.addEventListener("pointerup", _startNewRound);
  _enterBtn.addEventListener("pointerup", _assignPlayersAndStartGame);
  _playerBtn.addEventListener("pointerup", _determinePlayerO);
  _aiBtn.addEventListener("pointerup", _determinePlayerO);
  _nameInput.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;

    _assignPlayersAndStartGame();
  });

  return {
    getPlayerX,
    getPlayerO,
    checkWin,
  };
})();

// Factories
const createAi = () => {
  const _name = "AI";

  // General
  const getName = () => _name;
  const _getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  // Board UI
  const _markCell = (randomIndex) => {
    const _cells = document.querySelectorAll(".cell");
    uiController.markCell(_cells[randomIndex], "O");
  };
  // Game logic
  const _updateBoard = (game) => {
    let board = game.board;
    let numOfEmptyCells = board.filter((e) => e === "").length;

    while (board.filter((e) => e === "").length === numOfEmptyCells) {
      let randomIndex = _getRandomIntInclusive(0, 8);

      if (board[randomIndex] === "") {
        board[randomIndex] = "O";

        _markCell(randomIndex);
      }
    }
  };
  const makeMove = (game) => {
    _updateBoard(game);
    gameController.checkWin(game);
  };

  return {
    getName,
    makeMove,
  };
};
