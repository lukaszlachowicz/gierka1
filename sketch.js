let board;

function setup() {
  createCanvas(800, 800);
  board = new Board();
  let button = createButton("Reset");
  button.position(width, 0);
  button.size(200, 50);
  button.mousePressed(resetGame);
}

function draw() {
  background(220);
  board.show();
}

class Board {
  constructor() {
    this.turn = 1;
    this.w = width / 3;
    this.h = height / 3;
    this.board = [];
    for (let i = 0; i < 3; i++) {
      let r = [];
      for (let j = 0; j < 3; j++) {
        r.push(0);
      }
      this.board.push(r);
    }
  }

  show() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] == 0) {
          fill(255);
        } else if (this.board[i][j] > 0) {
          fill(color(217, 225, 242));
        } else {
          fill(color(252, 228, 214));
        }

        rect(i * this.w, j * this.h, this.w, this.h);
      }
    }
  }

  resetBoard() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.board[i][j] = 0;
      }
    }
  }

  isTerminated() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] == 0) {
          return false;
        }
      }
    }
    return true;
  }

  calculateScore() {
    let sum = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        sum += this.board[i][j];
      }
    }
    return sum;
  }

  makeMove(move) {
    let board_c = [];
    for (let i = 0; i < 3; i++) {
      let r = [];
      for (let j = 0; j < 3; j++) {
        r.push(this.board[i][j]);
      }
      board_c.push(r);
    }

    let x = move[0];
    let y = move[1];
    board_c[x][y] = this.turn;
    if (x > 0 && board_c[x - 1][y] != 0) {
      board_c[x - 1][y] = this.turn;
    }
    if (x < 2 && board_c[x + 1][y] != 0) {
      board_c[x + 1][y] = this.turn;
    }
    if (y > 0 && board_c[x][y - 1] != 0) {
      board_c[x][y - 1] = this.turn;
    }
    if (y < 2 && board_c[x][y + 1] != 0) {
      board_c[x][y + 1] = this.turn;
    }

    let newBoard = new Board();
    newBoard.board = board_c;
    newBoard.turn = -this.turn;
    return newBoard;
  }

  minimax() {
    if (this.isTerminated()) {
      return this.calculateScore();
    }

    if (this.turn > 0) {
      let bestScore = -999;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (this.board[i][j] == 0) {
            let newBoard = this.makeMove([i, j]);
            let score = newBoard.minimax();
            bestScore = max(bestScore, score);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = 999;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (this.board[i][j] == 0) {
            let newBoard = this.makeMove([i, j]);
            let score = newBoard.minimax();
            bestScore = min(bestScore, score);
          }
        }
      }
      return bestScore;
    }
  }

  findBestMove() {
    if (this.turn > 0) {
      let moves = [];
      let bestScore = -999;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (this.board[i][j] == 0) {
            let newBoard = this.makeMove([i, j]);
            let score = newBoard.minimax();
            if (score >= bestScore) {
              bestScore = score;
              moves.push([score, [i, j]]);
            }
          }
        }
      }
      let bestMoves = []
      for(let i = 0; i < moves.length; i++){
        if(moves[i][0] == bestScore){
          bestMoves.push(moves[i][1])
        }
      }
      return random(bestMoves);
    } else {
      let moves = [];
      let bestScore = 999;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (this.board[i][j] == 0) {
            let newBoard = this.makeMove([i, j]);
            let score = newBoard.minimax();
            if (score <= bestScore) {
              bestScore = score;
              moves.push([score, [i, j]]);
            }
          }
        }
      }
      let bestMoves = []
      for(let i = 0; i < moves.length; i++){
        if(moves[i][0] == bestScore){
          bestMoves.push(moves[i][1])
        }
      }
      return random(bestMoves);
    }
  }
}

function mouseClicked() {
  if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
    let x = int((3 * mouseX) / width);
    let y = int((3 * mouseY) / height);
    if (board.isTerminated()) {
      board.resetBoard();
      if(board.turn < 0){
        let bestMove = board.findBestMove();
        board = board.makeMove(bestMove);   
      }

    } else if (board.board[x][y] == 0) {
      board = board.makeMove([x, y]);
      if (!board.isTerminated()) {
        let bestMove = board.findBestMove();
        board = board.makeMove(bestMove);
      }
    }
  }
}

function resetGame() {
  board.resetBoard();
}




