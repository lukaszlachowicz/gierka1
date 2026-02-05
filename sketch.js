let board;
let turn = 1;

function setup() {
  createCanvas(800, 800);
  board = new Board();
  let button = createButton("Reset");
  button.position(width, 0);
  button.size(200, 50)
  button.mousePressed(resetGame);
}

function draw() {
  background(220);
  board.show();
}

class Board {
  constructor() {
    this.w = width / 3;
    this.h = height / 3;
    this.board = [];
    for (let i = 0; i < 3; i++) {
      let r = [];
      for (let j = 0; j < 3; j++) {
        r.push(255);
      }
      this.board.push(r);
    }
  }

  show() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        fill(this.board[i][j]);
        rect(i * this.w, j * this.h, this.w, this.h);
      }
    }
  }

  resetBoard() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.board[i][j] = 255;
      }
    }
  }

  clicked(mx, my) {
    let reset = true;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] == 255) {
          reset = false;
        }
      }
    }
    if (reset) {
      this.resetBoard();
      return;
    }

    if (mx < 0 || mx >= width || my < 0 || my >= height) {
      return;
    }

    let x = int((3 * mx) / width);
    let y = int((3 * my) / height);

    if (this.board[x][y] == 255) {
      if (turn == 1) {
        this.board[x][y] = color(217, 225, 242);
        if (x > 0 && this.board[x - 1][y] != 255) {
          this.board[x - 1][y] = color(217, 225, 242);
        }
        if (x < 2 && this.board[x + 1][y] != 255) {
          this.board[x + 1][y] = color(217, 225, 242);
        }
        if (y > 0 && this.board[x][y - 1] != 255) {
          this.board[x][y - 1] = color(217, 225, 242);
        }
        if (y < 2 && this.board[x][y + 1] != 255) {
          this.board[x][y + 1] = color(217, 225, 242);
        }
      } else {
        this.board[x][y] = color(252, 228, 214);
        if (x > 0 && this.board[x - 1][y] != 255) {
          this.board[x - 1][y] = color(252, 228, 214);
        }
        if (x < 2 && this.board[x + 1][y] != 255) {
          this.board[x + 1][y] = color(252, 228, 214);
        }
        if (y > 0 && this.board[x][y - 1] != 255) {
          this.board[x][y - 1] = color(252, 228, 214);
        }
        if (y < 2 && this.board[x][y + 1] != 255) {
          this.board[x][y + 1] = color(252, 228, 214);
        }
      }
      turn *= -1;
    }
  }
}

function mouseClicked() {
  board.clicked(mouseX, mouseY);
}

function resetGame() {
  board.resetBoard();
  turn = 1;
}
