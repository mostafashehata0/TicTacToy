import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public board: any = [];
  boardSize: number = 9;
  activePlayr: string = 'X';
  turnCount: number = 0;
  isGamerunning: boolean = false;
  isGameOver: boolean = false;
  winner: boolean = false;
  constructor() {
    this.newGame();
  }
  newGame() {
    this.activePlayr = 'X';
    this.turnCount = 0;
    this.isGamerunning = false;
    this.isGameOver = false;
    this.winner = false;
    this.board = this.createBoard();
  }
  createBoard() {
    let board = [];
    for (let i = 0; i < 9; i++) {
      board.push({ id: i, state: null });
    }
    return board;
  }
  get getBoard() {
    return this.board;
  }
  set setBoard(board: any) {
    this.board = [...board];
  }

  changePlayerTurn(squareClicked: any) {
    this.updateBoard(squareClicked);
    if (!this.isGameOver)
      this.activePlayr = this.activePlayr === 'X' ? 'O' : 'X';
    this.turnCount++;
    this.isGameOver = this.isGameOver ? true : false;
  }
  updateBoard(squareClicked: any) {
    this.board[squareClicked.id].state = squareClicked.state;
    if (this.isWinner) {
      this.winner = true;
      this.isGameOver = false;
      this.isGameOver = true;
    }
  }
  get gameOver(): boolean {
    return this.turnCount > 8 || this.winner ? true : false;
  }

  get isWinner(): boolean {
    return this.checkDiag() ||
      this.checkRows(this.board, 'row') ||
      this.checkRows(this.board, 'col')
      ? true
      : false;
  }

  checkRows(board: any, mode: any) {
    const ROW = mode === 'row' ? true : false,
      DIST = ROW ? 1 : 3,
      INC = ROW ? 3 : 1,
      NUMTIMES = ROW ? 7 : 3;

    for (let i = 0; i < NUMTIMES; i += INC) {
      let firstSquare = board[i].state,
        secondSquare = board[i + DIST].state,
        thirdSquare = board[i + DIST * 2].state;

      if (firstSquare && secondSquare && thirdSquare) {
        if (firstSquare === secondSquare && secondSquare === thirdSquare)
          return true;
      }
    }

    return false;
  }

  checkDiag() {
    const timesRun = 2,
      midSquare = this.board[4].state;

    for (let i = 0; i <= timesRun; i += 2) {
      let upperCorner = this.board[i].state,
        lowerCorner = this.board[8 - i].state;

      if (midSquare && upperCorner && lowerCorner) {
        if (midSquare === upperCorner && upperCorner === lowerCorner)
          return true;
      }
    }
    return false;
  }
}
