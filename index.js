// Modules
const gameController = (() => {
  let game;
  let turn;
  let isWon;
  let board;
  let playerX;
  let playerO;

  const assignPlayerX = () => {
    playerX = prompt('Player X is: ');
  }
  const assignPlayerO = () => {
    playerO = prompt('Player O is: ');
  }
  const makeNewGame = () => {
    turn = 'X';
    isWon = false;
    board = new Array(9).fill('');
    assignPlayerX();
    assignPlayerO();

    if (!playerX || !playerO) {
      alert('Player missing. Please restart game!');
      return;
    }

    game = {
      board,
      playerX,
      playerO
    }

    console.log(game)
  }
  const updateBoard = () => {

  }
  const switchTurn = () => {
    turn = turn === 'X' ? 'O' : 'X';
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
  }
  const announceResult = () => {

  }
  
  return {
    makeNewGame
  }
})();

const uiController = (() => {
  const setFooterYear = () => {
    const currYearSpan = document.querySelector('.curr-year');
    const currYear = new Date().getFullYear();
    currYearSpan.innerText = currYear
  }

  return {
    setFooterYear
  }
})();



// Factories
const createPlayer = () => {

}

// gameController.makeNewGame();

uiController.setFooterYear()
