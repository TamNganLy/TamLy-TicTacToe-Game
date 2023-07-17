let arrs = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];
let gameResutl = false;
let w1, w2, w3;
let countMove = 0;
let score = {
  player1: 0,
  tie: 0,
  player2: 0
}

let turn = true;

render();

const buttonElement = document.querySelectorAll('.js-game-button');

buttonElement.forEach((gameButton, index) => {
  gameButton.addEventListener('click', () => {
    move(gameButton, index);
  });
});

function move(gameButton, index) {
  countMove+= 1;
  const r = Math.floor(index/3);
  const c = index%3;

  if (arrs[r][c] === -1) {
    if (turn) {
      gameButton.innerHTML = `
      <img src="images/X.png" class="move-icon">
      `;
      // console.log('X');
      turn = false;
      arrs[r][c] = 0;
    } else {
      gameButton.innerHTML = `
      <img src="images/O.png" class="move-icon">
      `;
      // console.log('O');
      turn = true;
      arrs[r][c] = 1;
    }
  } 
  // console.table(arrs);
  // checkGame();
  // console.log(checkGame());
  const check = checkGame();
  if (check !== -1) {
    buttonElement[w1].classList.add('win-button');
    buttonElement[w2].classList.add('win-button');
    buttonElement[w3].classList.add('win-button');
    buttonElement.forEach((gameButton, index) => {
      gameButton.disabled = true;
    });
  }
  if (check === 0) {
    score.player1 += 1;
  } else if (check === 1) {
    score.player2 += 1;
  } else if (countMove === 9) {
    score.tie += 1;
  }
  render();
}

function checkGame() {
  let ret = -1;
  for (let i = 0; i < 3; i++) {
    if (arrs[i][0] === arrs[i][1] && arrs[i][0] === arrs[i][2] && arrs[i][0] !== -1) {
      ret = arrs[i][0];
      w1 = i*3;
      w2 = i*3 + 1;
      w3 = i*3 + 2;
      break;
    } 
    if (arrs[0][i] === arrs[1][i] && arrs[0][i] === arrs[2][i] && arrs[0][i] !== -1) {
      ret = arrs[0][i];
      w1 = i;
      w2 = 3 + i;
      w3 = 6 + i;
      break;
    }
  }
  if (arrs[0][0] === arrs[1][1] && arrs[0][0] === arrs[2][2] && arrs[0][0] !== -1) {
    ret = arrs[0][0];
    w1 = 0;
    w2 = 4;
    w3 = 8;
  } else if (arrs[0][2] === arrs[1][1] && arrs[0][2] === arrs[2][0] && arrs[0][2] !== -1) {
    ret = arrs[0][2];
    w1 = 2;
    w2 = 4;
    w3 = 6;
  }
  return ret;
}

document.querySelector('.js-new-game-button')
  .addEventListener('click', () => {
    reset();
  });

document.querySelector('.js-reset-button')
  .addEventListener('click', () => {
    reset();
    score.player1 = 0;
    score.tie = 0;
    score.player2 = 0;
    render();
  });

function clear(gameButton, index) {
  const r = Math.floor(index/3);
  const c = index%3;
  gameButton.innerHTML = ``;
  arrs[r][c] = -1;
}

function reset() {
  turn = true;
    countMove = 0;
    if(w1 || w2 || w3) {
      buttonElement[w1].classList.remove('win-button');
      buttonElement[w2].classList.remove('win-button');
      buttonElement[w3].classList.remove('win-button');
    }
    buttonElement.forEach((gameButton, index) => {
      clear(gameButton, index);
      gameButton.disabled = false;
    });
}

function render() {
  document.querySelector('.score1')
    .innerHTML = score.player1;
  document.querySelector('.tie')
    .innerHTML = score.tie;
  document.querySelector('.score2')
    .innerHTML = score.player2;
}

const nameElement = document.querySelector('.name');

/*
setInterval(() => {
  if(nameElement.classList.contains('js-name')) {
    nameElement.classList.remove('js-name');
  } else {
    nameElement.classList.add('js-name')
  }
}, 1000);
*/