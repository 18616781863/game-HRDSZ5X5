export default class TileMap {
  constructor(tileSizeX, gapX, tileSizeY, gapY) {
    this.tileSizeX = tileSizeX;
    this.gapX = gapX;
    this.tileSizeY = tileSizeY;
    this.gapY = gapY;
    this.column0 = this.map.length - 1;
    this.row0 = this.map[0].length - 1;
    this.initStep = 100;
  }

  changeSound = new Audio("sounds/change.mp3");

  // 5 X 5 map
  map = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 0],
  ];

  mapWin = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 0],
  ];

  draw(ctx) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        switch (this.map[row][column]) {
          case 0:
            ctx.fillStyle = "black";
            break;
          default:
            ctx.fillStyle = "grey";
        }
        ctx.fillRect(
          column * (this.tileSizeX + this.gapX) + this.gapX,
          row * (this.tileSizeY + this.gapY) + this.gapY,
          this.tileSizeX,
          this.tileSizeY
        );
        ctx.font = "30px Verdana";
        ctx.fillStyle = "white";
        if (this.map[row][column] >= 10) {
          ctx.fillText(
            this.map[row][column],
            column * (this.tileSizeX + this.gapX) + this.tileSizeX / 2 - 10,
            row * (this.tileSizeY + this.gapY) + this.tileSizeY / 1.5
          );
        } else if (this.map[row][column] > 0) {
          ctx.fillText(
            this.map[row][column],
            column * (this.tileSizeX + this.gapX) + this.tileSizeX / 2,
            row * (this.tileSizeY + this.gapY) + this.tileSizeY / 1.5
          );
        }
      }
    }
  }

  change(row, column) {
    let columnMax = this.map[row].length - 1;
    let rowMax = this.map.length - 1;
    let a = this.map[row][column];

    switch (true) {
      // row == rowMax
      case row == rowMax && column == columnMax:
        if (this.map[row - 1][column] == 0) {
          this.map[row - 1][column] = a;
          this.map[row][column] = 0;
          this.changeSound.play();
        } else if (this.map[row][column - 1] == 0) {
          this.map[row][column - 1] = a;
          this.map[row][column] = 0;
          this.changeSound.play();
        }
        break;
      case row == rowMax && column > 0 && column < columnMax:
        if (this.map[row - 1][column] == 0) {
          this.map[row - 1][column] = a;
          this.map[row][column] = 0;
          this.changeSound.play();
        } else if (this.map[row][column + 1] == 0) {
          this.map[row][column + 1] = a;
          this.map[row][column] = 0;
          this.changeSound.play();
        } else if (this.map[row][column - 1] == 0) {
          this.map[row][column - 1] = a;
          this.map[row][column] = 0;
          this.changeSound.play();
        }
        break;
      case row == rowMax && column == 0:
        if (this.map[row - 1][column] == 0) {
          this.map[row - 1][column] = a;
          this.map[row][column] = 0;
          this.changeSound.play();
        } else if (this.map[row][column + 1] == 0) {
          this.map[row][column + 1] = a;
          this.map[row][column] = 0;
          this.changeSound.play();
        }
        break;
      // row == 0
      case row == 0 && column == columnMax:
        if (this.map[row + 1][column] == 0) {
          this.map[row + 1][column] = a;
          this.map[row][column] = 0;
          this.changeSound.play();
        } else if (this.map[row][column - 1] == 0) {
          this.map[row][column - 1] = a;
          this.map[row][column] = 0;
          this.changeSound.play();
        }
        break;
      case row == 0 && column > 0 && column < columnMax:
        if (this.map[row + 1][column] == 0) {
          this.map[row + 1][column] = a;
          this.map[row][column] = 0;
          this.changeSound.play();
        } else if (this.map[row][column + 1] == 0) {
          this.map[row][column + 1] = a;
          this.map[row][column] = 0;
          this.changeSound.play();
        } else if (this.map[row][column - 1] == 0) {
          this.map[row][column - 1] = a;
          this.map[row][column] = 0;
          this.changeSound.play();
        }
        break;
      case row == 0 && column == 0:
        if (this.map[row + 1][column] == 0) {
          this.map[row + 1][column] = a;
          this.map[row][column] = 0;
          this.changeSound.play();
        } else if (this.map[row][column + 1] == 0) {
          this.map[row][column + 1] = a;
          this.map[row][column] = 0;
          this.changeSound.play();
        }
        break;
      // row > 0 && row < rowMax
      case row > 0 && row < rowMax && column == columnMax:
        if (this.map[row + 1][column] == 0) {
          this.map[row + 1][column] = a;
          this.map[row][column] = 0;
          this.changeSound.play();
        } else if (this.map[row - 1][column] == 0) {
          this.map[row - 1][column] = a;
          this.map[row][column] = 0;
          this.changeSound.play();
        } else if (this.map[row][column - 1] == 0) {
          this.map[row][column - 1] = a;
          this.map[row][column] = 0;
          this.changeSound.play();
        }
        break;
      case row > 0 && row < rowMax && column > 0 && column < columnMax:
        if (this.map[row + 1][column] == 0) {
          this.map[row + 1][column] = a;
          this.map[row][column] = 0;
          this.changeSound.play();
        } else if (this.map[row - 1][column] == 0) {
          this.map[row - 1][column] = a;
          this.map[row][column] = 0;
          this.changeSound.play();
        } else if (this.map[row][column + 1] == 0) {
          this.map[row][column + 1] = a;
          this.map[row][column] = 0;
          this.changeSound.play();
        } else if (this.map[row][column - 1] == 0) {
          this.map[row][column - 1] = a;
          this.map[row][column] = 0;
          this.changeSound.play();
        }
        break;
      case row > 0 && row < rowMax && column == 0:
        if (this.map[row + 1][column] == 0) {
          this.map[row + 1][column] = a;
          this.map[row][column] = 0;
          this.changeSound.play();
        }
        if (this.map[row - 1][column] == 0) {
          this.map[row - 1][column] = a;
          this.map[row][column] = 0;
          this.changeSound.play();
        } else if (this.map[row][column + 1] == 0) {
          this.map[row][column + 1] = a;
          this.map[row][column] = 0;
          this.changeSound.play();
        }
        break;
    }
  }

  init() {
    for (let i = 0; i < this.initStep; i++) {
      this.#move(this.row0, this.column0);
      // console.log(this.row0, this.column0);
    }
  }

  #move(row, column) {
    let columnMax = this.map[0].length - 1;
    let rowMax = this.map.length - 1;
    let i = 0;
    switch (true) {
      // middle
      case row > 0 && row < rowMax && column > 0 && column < columnMax:
        i = Math.floor(Math.random() * 4 + 1);
        // 1 up
        // 2 down
        // 3 left
        // 4 right
        switch (i) {
          case 1:
            this.map[row][column] = this.map[row - 1][column];
            this.map[row - 1][column] = 0;
            this.row0--;
            break;
          case 2:
            this.map[row][column] = this.map[row + 1][column];
            this.map[row + 1][column] = 0;
            this.row0++;
            break;
          case 3:
            this.map[row][column] = this.map[row][column - 1];
            this.map[row][column - 1] = 0;
            this.column0--;
            break;
          case 4:
            this.map[row][column] = this.map[row][column + 1];
            this.map[row][column + 1] = 0;
            this.column0++;
            break;
        }
        break;
      // right bottom
      case row == rowMax && column == columnMax:
        i = Math.floor(Math.random() * 2 + 1);
        // 1 up
        // 2 left
        switch (i) {
          case 1:
            this.map[row][column] = this.map[row - 1][column];
            this.map[row - 1][column] = 0;
            this.row0--;
            break;
          case 2:
            this.map[row][column] = this.map[row][column - 1];
            this.map[row][column - 1] = 0;
            this.column0--;
            break;
        }
        break;
      // left bottom
      case row == rowMax && column == 0:
        i = Math.floor(Math.random() * 2 + 1);
        // 1 up
        // 2 right
        switch (i) {
          case 1:
            this.map[row][column] = this.map[row - 1][column];
            this.map[row - 1][column] = 0;
            this.row0--;
            break;
          case 2:
            this.map[row][column] = this.map[row][column + 1];
            this.map[row][column + 1] = 0;
            this.column0++;
            break;
        }
        break;
      // right top
      case row == 0 && column == columnMax:
        i = Math.floor(Math.random() * 2 + 1);
        // 1 down
        // 2 left
        switch (i) {
          case 1:
            this.map[row][column] = this.map[row + 1][column];
            this.map[row + 1][column] = 0;
            this.row0++;
            break;
          case 2:
            this.map[row][column] = this.map[row][column - 1];
            this.map[row][column - 1] = 0;
            this.column0--;
            break;
        }
        break;
      // left top
      case row == 0 && column == 0:
        i = Math.floor(Math.random() * 2 + 1);
        // 1 down
        // 2 right
        switch (i) {
          case 1:
            this.map[row][column] = this.map[row + 1][column];
            this.map[row + 1][column] = 0;
            this.row0++;
            break;
          case 2:
            this.map[row][column] = this.map[row][column + 1];
            this.map[row][column + 1] = 0;
            this.column0++;
            break;
        }
        break;
      // middle bottom
      case row == rowMax && column > 0 && column < columnMax:
        i = Math.floor(Math.random() * 3 + 1);
        // 1 up
        // 2 left
        // 3 right
        switch (i) {
          case 1:
            this.map[row][column] = this.map[row - 1][column];
            this.map[row - 1][column] = 0;
            this.row0--;
            break;
          case 2:
            this.map[row][column] = this.map[row][column - 1];
            this.map[row][column - 1] = 0;
            this.column0--;
            break;
          case 3:
            this.map[row][column] = this.map[row][column + 1];
            this.map[row][column + 1] = 0;
            this.column0++;
            break;
        }
        break;
      // middle right
      case row > 0 && row < rowMax && column == columnMax:
        i = Math.floor(Math.random() * 3 + 1);
        // 1 up
        // 2 down
        // 3 left
        switch (i) {
          case 1:
            this.map[row][column] = this.map[row - 1][column];
            this.map[row - 1][column] = 0;
            this.row0--;
            break;
          case 2:
            this.map[row][column] = this.map[row + 1][column];
            this.map[row + 1][column] = 0;
            this.row0++;
            break;
          case 3:
            this.map[row][column] = this.map[row][column - 1];
            this.map[row][column - 1] = 0;
            this.column0--;
            break;
        }
        break;
      // middle top
      case row == 0 && column > 0 && column < columnMax:
        i = Math.floor(Math.random() * 3 + 1);
        // 1 down
        // 2 left
        // 3 right
        switch (i) {
          case 1:
            this.map[row][column] = this.map[row + 1][column];
            this.map[row + 1][column] = 0;
            this.row0++;
            break;
          case 2:
            this.map[row][column] = this.map[row][column - 1];
            this.map[row][column - 1] = 0;
            this.column0--;
            break;
          case 3:
            this.map[row][column] = this.map[row][column + 1];
            this.map[row][column + 1] = 0;
            this.column0++;
            break;
        }
        break;
      // middle left
      case row > 0 && row < rowMax && column == 0:
        i = Math.floor(Math.random() * 3 + 1);
        // 1 up
        // 2 down
        // 3 right
        switch (i) {
          case 1:
            this.map[row][column] = this.map[row - 1][column];
            this.map[row - 1][column] = 0;
            this.row0--;
            break;
          case 2:
            this.map[row][column] = this.map[row + 1][column];
            this.map[row + 1][column] = 0;
            this.row0++;
            break;
          case 3:
            this.map[row][column] = this.map[row][column + 1];
            this.map[row][column + 1] = 0;
            this.column0++;
            break;
        }
        break;
    }
  }
}
