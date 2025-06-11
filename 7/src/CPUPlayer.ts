import { GameBoard } from './GameBoard';

export class CPUPlayer {
  private mode: 'hunt' | 'target' = 'hunt';
  private targetQueue: string[] = [];

  constructor(private readonly board: GameBoard) {}

  public makeMove(): string {
    let guess: string;

    if (this.mode === 'target' && this.targetQueue.length > 0) {
      guess = this.targetQueue.shift()!;
      while (this.board.guesses.includes(guess) && this.targetQueue.length > 0) {
        guess = this.targetQueue.shift()!;
      }
      if (this.board.guesses.includes(guess)) {
        this.mode = 'hunt';
        return this.makeHuntMove();
      }
    } else {
      this.mode = 'hunt';
      guess = this.makeHuntMove();
    }

    return guess;
  }

  private makeHuntMove(): string {
    let guess: string;
    do {
      const row = Math.floor(Math.random() * this.board.board.length);
      const col = Math.floor(Math.random() * this.board.board[0].length);
      guess = `${row}${col}`;
    } while (this.board.guesses.includes(guess));

    return guess;
  }

  public processHit(guess: string): void {
    this.mode = 'target';
    const [row, col] = guess.split('').map(Number);
    
    const adjacentPositions = [
      { row: row - 1, col },
      { row: row + 1, col },
      { row, col: col - 1 },
      { row, col: col + 1 }
    ];

    adjacentPositions.forEach(pos => {
      if (this.isValidPosition(pos)) {
        const newGuess = `${pos.row}${pos.col}`;
        if (!this.board.guesses.includes(newGuess) && !this.targetQueue.includes(newGuess)) {
          this.targetQueue.push(newGuess);
        }
      }
    });
  }

  private isValidPosition(pos: { row: number; col: number }): boolean {
    return pos.row >= 0 && pos.row < this.board.board.length &&
           pos.col >= 0 && pos.col < this.board.board[0].length;
  }

  public resetTargetMode(): void {
    this.mode = 'hunt';
    this.targetQueue = [];
  }
} 